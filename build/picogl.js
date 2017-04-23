/*
PicoGL.js v0.0.5 

The MIT License (MIT)

Copyright (c) 2017 Tarek Sherif

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
(function() {
    "use strict";

    /**
        Global PicoGL module. For convenience, all WebGL enums are stored
        as properties of PicoGL (e.g. PicoGL.FLOAT, PicoGL.ONE_MINUS_SRC_ALPHA).
        
        @namespace PicoGL
        @prop {string} version Current PicoGL version.
    */
    var PicoGL = window.PicoGL = {
        version: "0.0.5"
    };

    (function() {
        // Absorb all GL enums for convenience
        var canvas = document.createElement("canvas");
        var gl = canvas.getContext("webgl2");
        
        if (!gl) {
            return;
        }

        for (var enumName in gl) {
            if (enumName.match(/^[A-Z0-9_]+$/) && typeof(gl[enumName]) === "number") {
                PicoGL[enumName] = gl[enumName];
            }
        }

        PicoGL.FRAMEBUFFER_INTERNAL_FORMAT = {};
        var UNSIGNED_BYTE = PicoGL.FRAMEBUFFER_INTERNAL_FORMAT[gl.UNSIGNED_BYTE] = {};
        UNSIGNED_BYTE[gl.RED] = gl.R8;
        UNSIGNED_BYTE[gl.RG] = gl.RG8;
        UNSIGNED_BYTE[gl.RGBA] = gl.RGBA;

        var UNSIGNED_SHORT = PicoGL.FRAMEBUFFER_INTERNAL_FORMAT[gl.UNSIGNED_SHORT] = {};
        UNSIGNED_SHORT[gl.DEPTH_COMPONENT] = gl.DEPTH_COMPONENT16;

        var FLOAT = PicoGL.FRAMEBUFFER_INTERNAL_FORMAT[gl.FLOAT] = {};
        FLOAT[gl.RED] = gl.R16F;
        FLOAT[gl.RG] = gl.RG16F;
        FLOAT[gl.RGBA] = gl.RGBA16F;
        FLOAT[gl.DEPTH_COMPONENT] = gl.DEPTH_COMPONENT32F;

        PicoGL.TYPE_SIZE = {};
        PicoGL.TYPE_SIZE[gl.BYTE]              = 1;
        PicoGL.TYPE_SIZE[gl.UNSIGNED_BYTE]     = 1;
        PicoGL.TYPE_SIZE[gl.SHORT]             = 2;
        PicoGL.TYPE_SIZE[gl.UNSIGNED_SHORT]    = 2;
        PicoGL.TYPE_SIZE[gl.INT]               = 4;
        PicoGL.TYPE_SIZE[gl.UNSIGNED_INT]      = 4;
        PicoGL.TYPE_SIZE[gl.FLOAT]             = 4;

    })();



    PicoGL.DUMMY_OBJECT = {};

    /**
        Create a PicoGL app. The app is the primary entry point to PicoGL. It stores
        the canvas, the WebGL context and all WebGL state.

        @function PicoGL.createApp
        @param {DOMElement} canvas The canvas on which to create the WebGL context.
        @param {Object} [contextAttributes] Context attributes to pass when calling getContext().
    */
    PicoGL.createApp = function(canvas, contextAttributes) {
        return new PicoGL.App(canvas, contextAttributes);
    };

    PicoGL.compileShader = function(gl, shader, source, debug) {
        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        if (debug && !gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            var i, lines;

            console.error(gl.getShaderInfoLog(shader));
            lines = source.split("\n");
            for (i = 0; i < lines.length; ++i) {
                console.error((i + 1) + ":", lines[i]);
            }
        }
    };

})();

;(function() {
    "use strict";

    /**
        Primary entry point to PicoGL. An app will store all parts of the WebGL
        state and manage draw calls.

        @class
        @param {DOMElement} canvas The canvas on which to create the WebGL context.
        @param {Object} [contextAttributes] Context attributes to pass when calling getContext().
        @prop {DOMElement} canvas The canvas on which this app drawing.
        @prop {WebGLRenderingContext} gl The WebGL context.
        @prop {number} width The width of the drawing surface.
        @prop {number} height The height of the drawing surface.
        @prop {number} maxDrawBuffers The maximum number of available draw buffers.
        @prop {boolean} drawBuffersEnabled Whether the WEBGL_draw_buffers extension is enabled.
        @prop {boolean} depthTexturesEnabled Whether the WEBGL_depth_texture extension is enabled.
        @prop {boolean} floatTexturesEnabled Whether the OES_texture_float extension is enabled.
        @prop {boolean} linearFloatTexturesEnabled Whether the OES_texture_float_linear extension is enabled.
        @prop {Object} currentState Tracked GL state.
        @prop {GLEnum} clearBits Current clear mask to use with clear().
        @prop {WebGLDrawBuffers} drawBuffersExtension Hold the draw buffers extension object when enabled.
    */
    PicoGL.App = function App(canvas, contextAttributes) {
        this.canvas = canvas;
        this.gl = canvas.getContext("webgl2", contextAttributes);
        this.width = this.gl.drawingBufferWidth;
        this.height = this.gl.drawingBufferHeight;
        this.currentDrawCalls = null;
        this.emptyFragmentShader = null;

        this.currentState = {
            program: null,
            vertexArray: null
        };

        this.clearBits = this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT;
        
        this.gl.viewport(0, 0, this.width, this.height);    
        
        this.floatRenderTargetsEnabled = false;
        this.linearFloatTexturesEnabled = false;

        this.debugEnabled = false;
    };

    /**
        Set the clear mask bits to use when calling clear().
        E.g. app.clearMask(PicoGL.COLOR_BUFFER_BIT).

        @method
        @param {GLEnum} mask Bit mask of buffers to clear.
    */
    PicoGL.App.prototype.clearMask = function(mask) {
        this.clearBits = mask;

        return this;
    };

    /**
        Set the clear color.

        @method
        @param {number} r Red channel.
        @param {number} g Green channel.
        @param {number} b Blue channel.
        @param {number} a Alpha channel.
    */
    PicoGL.App.prototype.clearColor = function(r, g, b, a) {
        this.gl.clearColor(r, g, b, a);

        return this;
    };

    /**
        Clear the canvas

        @method
    */
    PicoGL.App.prototype.clear = function() {
        this.gl.clear(this.clearBits);

        return this;
    };

    /**
        Set the list of DrawCalls to use when calling draw().

        @method
        @param {Array} drawCallList Array of DrawCall objects.
        @see DrawCall
    */
    PicoGL.App.prototype.drawCalls = function(drawCallList) {
        this.currentDrawCalls = drawCallList;

        return this;
    };

    /**
        Bind a framebuffer to the WebGL context.

        @method
        @param {Framebuffer} framebuffer The Framebuffer object to bind.
        @see Framebuffer
    */
    PicoGL.App.prototype.framebuffer = function(framebuffer) {
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, framebuffer.framebuffer);
        this.gl.viewport(0, 0, framebuffer.width, framebuffer.height);

        return this;
    };

    /**
        Switch back to the default framebuffer (i.e. draw to the screen).

        @method
    */
    PicoGL.App.prototype.defaultFramebuffer = function() {
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
        this.gl.viewport(0, 0, this.width, this.height);

        return this;
    };

    /**
        Set the depth range.

        @method
        @param {number} near Minimum depth value. 
        @param {number} far Maximum depth value.
    */
    PicoGL.App.prototype.depthRange = function(near, far) {
        this.gl.depthRange(near, far);

        return this;
    };

    /**
        Enable depth testing.

        @method
    */
    PicoGL.App.prototype.depthTest = function() {
        this.gl.enable(this.gl.DEPTH_TEST);

        return this;
    };

    /**
        Disable depth testing.

        @method
    */
    PicoGL.App.prototype.noDepthTest = function() {
        this.gl.disable(this.gl.DEPTH_TEST);

        return this;
    };

    /**
        Enable writing to the z buffer.

        @method
    */
    PicoGL.App.prototype.depthMask = function() {
        this.gl.depthMask(true);

        return this;
    };

    /**
        Disable writing to the z buffer.

        @method
    */
    PicoGL.App.prototype.noDepthMask = function() {
        this.gl.depthMask(false);

        return this;
    };

    /**
        Enable blending.

        @method
    */
    PicoGL.App.prototype.blend = function() {
        this.gl.enable(this.gl.BLEND);

        return this;
    };

    /**
        Disable blending

        @method
    */
    PicoGL.App.prototype.noBlend = function() {
        this.gl.disable(this.gl.BLEND);

        return this;
    };

    PicoGL.App.prototype.rasterize = function() {
        this.gl.disable(this.gl.RASTERIZER_DISCARD);

        return this;
    };

    PicoGL.App.prototype.noRasterize = function() {
        this.gl.enable(this.gl.RASTERIZER_DISCARD);

        return this;
    };

    /**
        Set the depth test function. E.g. app.depthFunc(PicoGL.LEQUAL).

        @method
        @param {GLEnum} func The depth testing function to use.
    */
    PicoGL.App.prototype.depthFunc = function(func) {
        this.gl.depthFunc(func);

        return this;
    };

    /**
        Set the blend function. E.g. app.blendFunc(PicoGL.ONE, PicoGL.ONE_MINUS_SRC_ALPHA).

        @method
        @param {GLEnum} src The source blending weight.
        @param {GLEnum} dest The destination blending weight.
    */
    PicoGL.App.prototype.blendFunc = function(src, dest) {
        this.gl.blendFunc(src, dest);

        return this;
    };

    /**
        Set the blend function, with separate weighting for color and alpha channels. 
        E.g. app.blendFuncSeparate(PicoGL.ONE, PicoGL.ONE_MINUS_SRC_ALPHA, PicoGL.ONE, PicoGL.ONE).

        @method
        @param {GLEnum} csrc The source blending weight for the RGB channels.
        @param {GLEnum} cdest The destination blending weight for the RGB channels.
        @param {GLEnum} asrc The source blending weight for the alpha channel.
        @param {GLEnum} adest The destination blending weight for the alpha channel.
    */
    PicoGL.App.prototype.blendFuncSeparate = function(csrc, cdest, asrc, adest) {
        this.gl.blendFuncSeparate(csrc, cdest, asrc, adest);

        return this;
    };

    /**
        Enable backface culling.

        @method
    */
    PicoGL.App.prototype.cullBackfaces = function() {
        this.gl.enable(this.gl.CULL_FACE);

        return this;
    };

    /**
        Disable backface culling.

        @method
    */
    PicoGL.App.prototype.drawBackfaces = function() {
        this.gl.disable(this.gl.CULL_FACE);

        return this;
    };

    /**
        Enable the WEBGL_depth_texture extension. Allows for writing depth values
        to a texture, which will be stored in the depthTexture property of a Framebuffer
        object.

        @method
        @see Framebuffer
    */
    PicoGL.App.prototype.depthTextures = function() {
        this.depthTexturesEnabled = !!this.gl.getExtension("WEBGL_depth_texture");
        
        if (!this.depthTexturesEnabled) {
            console.warn("Extension WEBGL_depth_texture unavailable. Cannot enable depth textures.");
        }
        
        return this;
    };

    /**
        Enable the EXT_color_buffer_float extension. Allows for creating float textures as
        render targets on FrameBuffer objects. E.g. app.createFramebuffer(1, PicoGL.FLOAT).

        @method
        @see Framebuffer
    */
    PicoGL.App.prototype.floatRenderTargets = function() {
        this.floatRenderTargetsEnabled = !!this.gl.getExtension("EXT_color_buffer_float");
        
        if (!this.floatRenderTargetsEnabled) {
            console.warn("Extension EXT_color_buffer_float unavailable. Cannot enable float textures.");
        }
        
        return this;
    };

    /**
        Enable the OES_texture_float_linear extension. Allows for linear blending on float textures.

        @method
        @see Framebuffer
    */
    PicoGL.App.prototype.linearFloatTextures = function() {
        this.linearFloatTexturesEnabled = !!this.gl.getExtension("OES_texture_float_linear");
        
        if (!this.linearFloatTexturesEnabled) {
            console.warn("Extension OES_texture_float_linear unavailable. Cannot enable float texture linear filtering.");
        }
        
        return this;
    };

    /**
        Read a pixel's color value from the canvas. Note that the RGBA values will be encoded 
        as 0-255.

        @method
        @param {number} x The x coordinate of the pixel.
        @param {number} y The y coordinate of the pixel.
        @param {Uint8Array} outColor 4-element Uint8Array to store the pixel's color.
    */
    PicoGL.App.prototype.readPixel = function(x, y, outColor) {
        this.gl.readPixels(x, y, 1, 1, this.gl.RGBA, this.gl.UNSIGNED_BYTE, outColor);

        return this;
    };

    /**
        Resize the drawing surface.

        @method
        @param {number} width The new canvas width.
        @param {number} height The new canvas height.
    */
    PicoGL.App.prototype.resize = function(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;

        this.width = this.gl.drawingBufferWidth;
        this.height = this.gl.drawingBufferHeight;
        this.gl.viewport(0, 0, this.width, this.height);    

        return this;
    };

    /**
        Enable debug logging.

        @method
    */
    PicoGL.App.prototype.debug = function() {
        this.debugEnabled = true; 

        return this;
    };

    /**
        Create a program.

        @method
        @param {WebGLShader|string} vertexShader Vertex shader object or source code.
        @param {WebGLShader|string} fragmentShader Fragment shader object or source code.
    */
    PicoGL.App.prototype.createProgram = function(vsSource, fsSource, xformFeedbackVars) {
        return new PicoGL.Program(this.gl, vsSource, fsSource, xformFeedbackVars, this.debugEnabled);
    };

    /**
        Create a shader.

        @method
        @param {GLEnum} type Shader type.
        @param {string} source Shader source.
    */
    PicoGL.App.prototype.createShader = function(type, source) {
        var shader = this.gl.createShader(type);
        PicoGL.compileShader(this.gl, shader, source, this.debugEnabled);
        
        return shader;
    };

    PicoGL.App.prototype.createVertexArray = function() {
        return new PicoGL.VertexArray(this.gl);
    };

    PicoGL.App.prototype.createTransformFeedback = function(vertexArray1, vertexArray2, varyingBufferIndices) {
        return new PicoGL.TransformFeedback(this.gl, vertexArray1, vertexArray2, varyingBufferIndices);
    };

    /**
        Create an array buffer.

        @method
        @param {GLEnum} type The data type stored in the array buffer.
        @param {number} itemSize Number of elements per vertex.
        @param {ArrayBufferView} data Array buffer data.
    */
    PicoGL.App.prototype.createArrayBuffer = function(type, itemSize, data, usage) {
        return new PicoGL.ArrayBuffer(this.gl, type, itemSize, data, usage);
    };

    PicoGL.App.prototype.createInstancedArrayBuffer = function(type, itemSize, data, usage) {
        return new PicoGL.ArrayBuffer(this.gl, type, itemSize, data, usage, false, true);
    };

    PicoGL.App.prototype.createMatrixBuffer = function(type, data, usage) {
        return new PicoGL.ArrayBuffer(this.gl, type, null, data, usage);
    };

    PicoGL.App.prototype.createInstancedMatrixBuffer = function(type, data, usage) {
        return new PicoGL.ArrayBuffer(this.gl, type, null, data, usage, false, true);
    };

    PicoGL.App.prototype.createUniformBuffer = function(layout, usage) {
        return new PicoGL.UniformBuffer(this.gl, layout, usage);
    };

    /**
        Create an index array buffer.

        @method
        @param {GLEnum} type The data type stored in the index array buffer.
        @param {number} itemSize Number of elements per primitive.
        @param {ArrayBufferView} data Index array buffer data.
    */
    PicoGL.App.prototype.createIndexBuffer = function(type, itemSize, data) {
        return new PicoGL.ArrayBuffer(this.gl, type, itemSize, data, null, true);
    };

    /**
        Create a texture.

        @method
        @param {ImageElement|ArrayBufferView} image The image data. Can be any format that would be accepted by texImage2D.
        @param {Object} [options] Texture options.
        @param {GLEnum} [options.type=UNSIGNED_BYTE] Type of data stored in the texture.
        @param {GLEnum} [options.internalFormat=RGBA] Texture data format.
        @param {boolean} [options.array=false] Whether the texture is being passed as an ArrayBufferView.
        @param {number} [options.width] Width of the texture (only valid when passing array texture data).
        @param {number} [options.height] Height of the texture (only valid when passing array texture data).
        @param {boolean} [options.flipY=true] Whether th y-axis be flipped when reading the texture.
        @param {GLEnum} [options.minFilter=LINEAR_MIPMAP_NEAREST] Minification filter.
        @param {GLEnum} [options.magFilter=LINEAR] Magnification filter.
        @param {GLEnum} [options.wrapS=REPEAT] Horizontal wrap mode.
        @param {GLEnum} [options.wrapT=REPEAT] Vertical wrap mode.
        @param {boolean} [options.generateMipmaps] Should mip maps be generated.
    */
    PicoGL.App.prototype.createTexture = function(image, options) {
        return new PicoGL.Texture(this.gl, image, options);
    };

    /**
        Create a texture.

        @method
        @param {Object} [options] Texture options.
        @param {ImageElement|ArrayBufferView} options.negX The image data for the negative X direction. Can be any format that would be accepted by texImage2D.
        @param {ImageElement|ArrayBufferView} options.posX The image data for the positive X direction. Can be any format that would be accepted by texImage2D.
        @param {ImageElement|ArrayBufferView} options.negY The image data for the negative Y direction. Can be any format that would be accepted by texImage2D.
        @param {ImageElement|ArrayBufferView} options.posY The image data for the positive Y direction. Can be any format that would be accepted by texImage2D.
        @param {ImageElement|ArrayBufferView} options.negZ The image data for the negative Z direction. Can be any format that would be accepted by texImage2D.
        @param {ImageElement|ArrayBufferView} options.posZ The image data for the positive Z direction. Can be any format that would be accepted by texImage2D.
        @param {GLEnum} [options.type=UNSIGNED_BYTE] Type of data stored in the texture.
        @param {GLEnum} [options.internalFormat=RGBA] Texture data format.
        @param {boolean} [options.array=false] Whether the texture is being passed as an ArrayBufferView.
        @param {number} [options.width] Width of the texture (only valid when passing array texture data).
        @param {number} [options.height] Height of the texture (only valid when passing array texture data).
        @param {boolean} [options.flipY=false] Whether th y-axis be flipped when reading the texture.
        @param {GLEnum} [options.minFilter=LINEAR_MIPMAP_NEAREST] Minification filter.
        @param {GLEnum} [options.magFilter=LINEAR] Magnification filter.
        @param {GLEnum} [options.wrapS=REPEAT] Horizontal wrap mode.
        @param {GLEnum} [options.wrapT=REPEAT] Vertical wrap mode.
        @param {boolean} [options.generateMipmaps] Should mip maps be generated.
    */
    PicoGL.App.prototype.createCubemap = function(options) {
        return new PicoGL.Cubemap(this.gl, options);
    };

    /**
        Create a framebuffer.

        @method
        @param {number} numColorTextures The number of color draw targets to create (requires enabled drawBuffers to be greater than 1).
        @param {GLEnum} [colorTargetType=UNSIGNED_BYTE] Type of data stored in the color targets.
        @param {number} [width=app.width] Width of the framebuffer.
        @param {number} [height=app.height] Height of the framebuffer.
    */
    PicoGL.App.prototype.createFramebuffer = function(width, height) {
        return new PicoGL.Framebuffer(this.gl, width, height);
    };

    /**
        Create a DrawCall. A DrawCall manages the state associated with 
        a WebGL draw call including a program and associated attributes, textures and
        uniforms.

        @method
        @param {Program} program The program to use for this DrawCall.
        @param {GLEnum} [primitive=TRIANGLES] Type of primitive to draw.
    */
    PicoGL.App.prototype.createDrawCall = function(program, geometry, primitive) {
        return new PicoGL.DrawCall(this.gl, program, geometry, primitive);
    };

    /** 
        Execute the currently attached list of DrawCalls.

        @method
    */
    PicoGL.App.prototype.draw = function() {
        for (var i = 0, len = this.currentDrawCalls.length; i < len; i++) {
            this.currentDrawCalls[i].draw(this.currentState);
        }

        return this;
    };

})();
;(function() {
    "use strict";


    /**
        WebGL program consisting of compiled and linked vertex and fragment
        shaders.

        @class
        @prop {WebGLRenderingContext} gl The WebGL context.
        @prop {WebGLProgram} program The WebGL program.
        @prop {Object} attributes Map of attribute names to handles. 
        @prop {Object} uniforms Map of uniform names to handles. 
    */
    PicoGL.Program = function Program(gl, vsSource, fsSource, xformFeebackVars, debug) {
        var i;

        var vshader, fshader; 

        if (typeof vsSource === "string") {
            vshader = gl.createShader(gl.VERTEX_SHADER);
            PicoGL.compileShader(gl, vshader, vsSource, debug);
        } else {
            vshader = vsSource;
        }

        if (typeof fsSource === "string") {
            fshader = gl.createShader(gl.FRAGMENT_SHADER);
            PicoGL.compileShader(gl, fshader, fsSource, debug);
        } else {
            fshader = fsSource;
        }

        var program = gl.createProgram();
        gl.attachShader(program, vshader);
        gl.attachShader(program, fshader);
        if (xformFeebackVars) {
            gl.transformFeedbackVaryings(program, xformFeebackVars, gl.SEPARATE_ATTRIBS);
        }
        gl.linkProgram(program);

        if (debug && !gl.getProgramParameter(program, gl.LINK_STATUS)) {
          console.error(gl.getProgramInfoLog(program));
        }

        this.gl = gl;
        this.program = program;
        this.transformFeedback = !!xformFeebackVars;
        this.uniforms = {};
        this.uniformBlocks = {};

        var numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);

        for (i = 0; i < numUniforms; ++i) {
            var uniformInfo = gl.getActiveUniform(program, i);
            var uniformHandle = gl.getUniformLocation(this.program, uniformInfo.name);
            var UniformClass = null;

            switch (uniformInfo.type) {
                case gl.INT: 
                case gl.BOOL: 
                case gl.SAMPLER_2D: 
                case gl.SAMPLER_CUBE: 
                    UniformClass = PicoGL.IntUniform;
                    break;
                case gl.FLOAT: 
                    UniformClass = PicoGL.FloatUniform;
                    break;
                case gl.FLOAT_VEC2: 
                    UniformClass = PicoGL.Vec2Uniform;
                    break;
                case gl.FLOAT_VEC3: 
                    UniformClass = PicoGL.Vec3Uniform;
                    break;
                case gl.FLOAT_VEC4: 
                    UniformClass = PicoGL.Vec4Uniform;
                    break;
                case gl.INT_VEC2: 
                    UniformClass = PicoGL.IntVec2Uniform;
                    break;
                case gl.INT_VEC3: 
                    UniformClass = PicoGL.IntVec3Uniform;
                    break;
                case gl.INT_VEC4: 
                    UniformClass = PicoGL.IntVec4Uniform;
                    break;
                case gl.BOOL_VEC2: 
                    UniformClass = PicoGL.BoolVec2Uniform;
                    break;
                case gl.BOOL_VEC3: 
                    UniformClass = PicoGL.BoolVec3Uniform;
                    break;
                case gl.BOOL_VEC4: 
                    UniformClass = PicoGL.BoolVec4Uniform;
                    break;
                case gl.FLOAT_MAT2: 
                    UniformClass = PicoGL.Mat2Uniform;
                    break;
                case gl.FLOAT_MAT3: 
                    UniformClass = PicoGL.Mat3Uniform;
                    break;
                case gl.FLOAT_MAT4: 
                    UniformClass = PicoGL.Mat4Uniform;
                    break;
                default:
                    console.error("Unrecognized type for uniform ", uniformInfo.name);
                    break;
            }

            this.uniforms[uniformInfo.name] = new UniformClass(gl, uniformHandle);
        }

        var numUniformBlocks = gl.getProgramParameter(program, gl.ACTIVE_UNIFORM_BLOCKS);

        for (i = 0; i < numUniformBlocks; ++i) {
            var blockName = gl.getActiveUniformBlockName(this.program, i);
            var blockIndex = gl.getUniformBlockIndex(this.program, blockName);

            this.uniformBlocks[blockName] = blockIndex;
        }
    };

    /**
        Set the value of a uniform.

        @method
        @param {string} name Uniform name.
        @param {any} value Uniform value.
    */
    PicoGL.Program.prototype.uniform = function(name, value) {
        this.uniforms[name].set(value);
    };

    PicoGL.Program.prototype.uniformBlock = function(name, base) {
        this.gl.uniformBlockBinding(this.program, this.uniformBlocks[name], base);
    };

})();

;(function() {
    "use strict";

    /**
        Storage for vertex data.

        @class
        @prop {WebGLRenderingContext} gl The WebGL context.
        @prop {WebGLBuffer} buffer Allocated buffer storage.
        @prop {GLEnum} type The type of data stored in the buffer.
        @prop {number} itemSize Number of array elements per vertex.
        @prop {number} numItems Number of vertices represented.
        @prop {boolean} indexArray Whether this is an index array.
        @prop {GLEnum} binding GL binding point (ARRAY_BUFFER or ELEMENT_ARRAY_BUFFER).
    */
    PicoGL.VertexArray = function VertexArray(gl) {
        this.gl = gl;
        this.vertexArray = gl.createVertexArray();
        this.attributeBuffers = [];
        this.numElements = 0;
        this.indexType = null;
        this.indexed = false;
        this.numInstances = 0;
    };

    PicoGL.VertexArray.prototype.attributeBuffer = function(attributeIndex, arrayBuffer) {
        this.gl.bindVertexArray(this.vertexArray);

        this.attributeBuffers[attributeIndex] = arrayBuffer;
        var numRows = arrayBuffer.numRows;
        
        arrayBuffer.bind();

        for (var i = 0; i < numRows; ++i) {
            this.gl.vertexAttribPointer(
                attributeIndex + i, 
                arrayBuffer.itemSize, 
                arrayBuffer.type, 
                false, 
                numRows * arrayBuffer.itemSize * PicoGL.TYPE_SIZE[arrayBuffer.type], 
                i * arrayBuffer.itemSize * PicoGL.TYPE_SIZE[arrayBuffer.type]);

            if (arrayBuffer.instanced) {
                this.gl.vertexAttribDivisor(attributeIndex + i, 1);
            }

            this.gl.enableVertexAttribArray(attributeIndex + i);
        }
        
        this.instanced = this.instanced || arrayBuffer.instanced;

        if (arrayBuffer.instanced) {
            this.numInstances = arrayBuffer.numItems; 
        } else {
            this.numElements = this.numElements || arrayBuffer.numItems; 
        }

        this.gl.bindVertexArray(null);

        return this;
    };

    PicoGL.VertexArray.prototype.indexBuffer = function(arrayBuffer) {
        this.gl.bindVertexArray(this.vertexArray);
        arrayBuffer.bind();

        this.numElements = arrayBuffer.numItems * 3;
        this.indexType = arrayBuffer.type;
        this.indexed = true;

        this.gl.bindVertexArray(null);

        return this;
    };

    PicoGL.VertexArray.prototype.bind = function() {
        this.gl.bindVertexArray(this.vertexArray);

        return this;
    };

    PicoGL.VertexArray.prototype.unbind = function() {
        this.gl.bindVertexArray(null);

        return this;
    };

})();
;(function() {
    "use strict";

    /**
        Storage for vertex data.

        @class
        @prop {WebGLRenderingContext} gl The WebGL context.
        @prop {WebGLBuffer} buffer Allocated buffer storage.
        @prop {GLEnum} type The type of data stored in the buffer.
        @prop {number} itemSize Number of array elements per vertex.
        @prop {number} numItems Number of vertices represented.
        @prop {boolean} indexArray Whether this is an index array.
        @prop {GLEnum} binding GL binding point (ARRAY_BUFFER or ELEMENT_ARRAY_BUFFER).
    */
    PicoGL.TransformFeedback = function TransformFeedback(gl, vertexArray1, vertexArray2, varyingBufferIndices) {
        this.gl = gl;
        this.transformFeedback = gl.createTransformFeedback();
        this.inputVertexArray = vertexArray1;
        this.outputVertexArray = vertexArray2;
        this.inputBuffers = new Array(varyingBufferIndices.length);
        this.outputBuffers = new Array(varyingBufferIndices.length);

        for (var i = 0, len = varyingBufferIndices.length; i < len; ++i) {
            this.inputBuffers[i] = vertexArray1.attributeBuffers[varyingBufferIndices[i]];
            this.outputBuffers[i] = vertexArray2.attributeBuffers[varyingBufferIndices[i]];
        }
    };

    PicoGL.TransformFeedback.prototype.bind = function(primitive) {
        this.gl.bindTransformFeedback(this.gl.TRANSFORM_FEEDBACK, this.transformFeedback);
        
        for (var i = 0, len = this.outputBuffers.length; i < len; ++i) {
            this.gl.bindBufferBase(this.gl.TRANSFORM_FEEDBACK_BUFFER, i, this.outputBuffers[i].buffer);
        }

        this.gl.beginTransformFeedback(primitive);

        return this;
    };

    PicoGL.TransformFeedback.prototype.swapBuffers = function() {
        var va = this.inputVertexArray;
        this.inputVertexArray = this.outputVertexArray;
        this.outputVertexArray = va;

        var vb = this.inputBuffers;
        this.inputBuffers = this.outputBuffers;
        this.outputBuffers = vb;

        return this;
    };

    PicoGL.TransformFeedback.prototype.unbind = function() {
        this.gl.endTransformFeedback();    
        this.gl.bindTransformFeedback(this.gl.TRANSFORM_FEEDBACK, null);

        return this;
    };

})();
;(function() {
    "use strict";

    /**
        Storage for vertex data.

        @class
        @prop {WebGLRenderingContext} gl The WebGL context.
        @prop {WebGLBuffer} buffer Allocated buffer storage.
        @prop {GLEnum} type The type of data stored in the buffer.
        @prop {number} itemSize Number of array elements per vertex.
        @prop {number} numItems Number of vertices represented.
        @prop {boolean} indexArray Whether this is an index array.
        @prop {GLEnum} binding GL binding point (ARRAY_BUFFER or ELEMENT_ARRAY_BUFFER).
    */
    // TODO(Tarek): Allow buffer to be initialized with size
    PicoGL.ArrayBuffer = function ArrayBuffer(gl, type, itemSize, data, usage, indexArray, instanced) {
        var numRows = 1;
        if (type === PicoGL.FLOAT_MAT4) {
            type = PicoGL.FLOAT;
            itemSize = 4;
            numRows = 4;
        } else if (type === PicoGL.FLOAT_MAT3) {
            type = PicoGL.FLOAT;
            itemSize = 3;
            numRows = 3;
        }  else if (type === PicoGL.FLOAT_MAT2) {
            type = PicoGL.FLOAT;
            itemSize = 2;
            numRows = 2;
        }

        this.gl = gl;
        this.buffer = gl.createBuffer();
        this.type = type;
        this.itemSize = itemSize;
        this.numItems = data.length / (itemSize * numRows);
        this.numRows = numRows;
        this.usage = usage || gl.STATIC_DRAW;
        this.indexArray = !!indexArray;
        this.instanced = !!instanced;
        this.binding = this.indexArray ? gl.ELEMENT_ARRAY_BUFFER : gl.ARRAY_BUFFER;

        gl.bindBuffer(this.binding, this.buffer);
        gl.bufferData(this.binding, data, this.usage);
        gl.bindBuffer(this.binding, null);
    };

    PicoGL.ArrayBuffer.prototype.update = function(data) {
        this.gl.bindBuffer(this.binding, this.buffer);
        this.gl.bufferSubData(this.binding, 0, data);
        this.gl.bindBuffer(this.binding, null);

        return this;
    };

    /**
        Bind this array buffer to a program attribute.

        @method
        @param {number} attribute The attribute handle to bind to.
    */
    PicoGL.ArrayBuffer.prototype.bind = function() {
        this.gl.bindBuffer(this.binding, this.buffer);

        return this;
    };

})();
;(function() {
    "use strict";


    PicoGL.FloatUniform = function FloatUniform(gl, handle) {
        this.gl = gl;
        this.handle = handle;
        this.cache = 0;
    };

    PicoGL.FloatUniform.prototype.set = function(value) {
        if (this.cache !== value) {
            this.gl.uniform1f(this.handle, value);
            this.cache = value;
        }
    };

    PicoGL.IntUniform = function IntUniform(gl, handle) {
        this.gl = gl;
        this.handle = handle;
        this.cache = 0;
    };

    PicoGL.IntUniform.prototype.set = function(value) {
        if (this.cache !== value) {
            this.gl.uniform1i(this.handle, value);
            this.cache = value;
        }
    };

    PicoGL.Vec2Uniform = function Vec2Uniform(gl, handle) {
        this.gl = gl;
        this.handle = handle;
        this.cache = new Float32Array(2);
    };

    PicoGL.Vec2Uniform.prototype.set = function(value) {
        if (this.cache[0] !== value[0] ||
            this.cache[1] !== value[1]) {
            this.gl.uniform2fv(this.handle, value);
            this.cache.set(value);
        }
    };

    PicoGL.Vec3Uniform = function Vec3Uniform(gl, handle) {
        this.gl = gl;
        this.handle = handle;
        this.cache = new Float32Array(3);
    };

    PicoGL.Vec3Uniform.prototype.set = function(value) {
        if (this.cache[0] !== value[0] ||
            this.cache[1] !== value[1] ||
            this.cache[2] !== value[2]) {
            this.gl.uniform3fv(this.handle, value);
            this.cache.set(value);
        }
    };

    PicoGL.Vec4Uniform = function Vec4Uniform(gl, handle) {
        this.gl = gl;
        this.handle = handle;
        this.cache = new Float32Array(4);
    };

    PicoGL.Vec4Uniform.prototype.set = function(value) {
        if (this.cache[0] !== value[0] ||
            this.cache[1] !== value[1] ||
            this.cache[2] !== value[2] ||
            this.cache[3] !== value[3]) {
            this.gl.uniform4fv(this.handle, value);
            this.cache.set(value);
        }
    };

    PicoGL.IntVec2Uniform = function IntVec2Uniform(gl, handle) {
        this.gl = gl;
        this.handle = handle;
        this.cache = new Int32Array(2);
    };

    PicoGL.IntVec2Uniform.prototype.set = function(value) {
        if (this.cache[0] !== value[0] ||
            this.cache[1] !== value[1]) {
            this.gl.uniform2iv(this.handle, value);
            this.cache.set(value);
        }
    };

    PicoGL.IntVec3Uniform = function IntVec3Uniform(gl, handle) {
        this.gl = gl;
        this.handle = handle;
        this.cache = new Int32Array(3);
    };

    PicoGL.IntVec3Uniform.prototype.set = function(value) {
        if (this.cache[0] !== value[0] ||
            this.cache[1] !== value[1] ||
            this.cache[2] !== value[2]) {
            this.gl.uniform3iv(this.handle, value);
            this.cache.set(value);
        }
    };

    PicoGL.IntVec4Uniform = function IntVec4Uniform(gl, handle) {
        this.gl = gl;
        this.handle = handle;
        this.cache = new Int32Array(4);
    };

    PicoGL.IntVec4Uniform.prototype.set = function(value) {
        if (this.cache[0] !== value[0] ||
            this.cache[1] !== value[1] ||
            this.cache[2] !== value[2] ||
            this.cache[3] !== value[3]) {
            this.gl.uniform4iv(this.handle, value);
            this.cache.set(value);
        }
    };

    PicoGL.BoolVec2Uniform = function BoolVec2Uniform(gl, handle) {
        this.gl = gl;
        this.handle = handle;
        this.cache = [false, false];
    };

    PicoGL.BoolVec2Uniform.prototype.set = function(value) {
        if (this.cache[0] !== value[0] ||
            this.cache[1] !== value[1]) {
            this.gl.uniform2iv(this.handle, value);
            this.cache[0] = value[0];
            this.cache[1] = value[1];
        }
    };

    PicoGL.BoolVec3Uniform = function BoolVec3Uniform(gl, handle) {
        this.gl = gl;
        this.handle = handle;
        this.cache = [false, false, false];
    };

    PicoGL.BoolVec3Uniform.prototype.set = function(value) {
        if (this.cache[0] !== value[0] ||
            this.cache[1] !== value[1] ||
            this.cache[2] !== value[2]) {
            this.gl.uniform3iv(this.handle, value);
            this.cache[0] = value[0];
            this.cache[1] = value[1];
            this.cache[2] = value[2];
        }
    };

    PicoGL.BoolVec4Uniform = function BoolVec4Uniform(gl, handle) {
        this.gl = gl;
        this.handle = handle;
        this.cache = [false, false, false, false];
    };

    PicoGL.BoolVec4Uniform.prototype.set = function(value) {
        if (this.cache[0] !== value[0] ||
            this.cache[1] !== value[1] ||
            this.cache[2] !== value[2] ||
            this.cache[3] !== value[3]) {
            this.gl.uniform4iv(this.handle, value);
            this.cache[0] = value[0];
            this.cache[1] = value[1];
            this.cache[2] = value[2];
            this.cache[3] = value[3];
        }
    };

    PicoGL.Mat2Uniform = function Mat2Uniform(gl, handle) {
        this.gl = gl;
        this.handle = handle;
        this.cache = new Float32Array(4);
    };

    PicoGL.Mat2Uniform.prototype.set = function(value) {
        if (this.cache[0] !== value[0] ||
            this.cache[1] !== value[1] ||
            this.cache[2] !== value[2] ||
            this.cache[3] !== value[3]) {
            this.gl.uniformMatrix2fv(this.handle, false, value);
            this.cache.set(value);
        }
    };

    PicoGL.Mat3Uniform = function Mat3Uniform(gl, handle) {
        this.gl = gl;
        this.handle = handle;
        this.cache = new Float32Array(9);
    };

    PicoGL.Mat3Uniform.prototype.set = function(value) {
        if (this.cache[0] !== value[0] ||
            this.cache[1] !== value[1] ||
            this.cache[2] !== value[2] ||
            this.cache[3] !== value[3] ||
            this.cache[4] !== value[4] ||
            this.cache[5] !== value[5] ||
            this.cache[6] !== value[6] ||
            this.cache[7] !== value[7] ||
            this.cache[8] !== value[8]) {
            this.gl.uniformMatrix3fv(this.handle, false, value);
            this.cache.set(value);
        }
    };

    PicoGL.Mat4Uniform = function Mat4Uniform(gl, handle) {
        this.gl = gl;
        this.handle = handle;
        this.cache = new Float32Array(16);
    };

    PicoGL.Mat4Uniform.prototype.set = function(value) {
        if (this.cache[0] !== value[0] ||
            this.cache[1] !== value[1] ||
            this.cache[2] !== value[2] ||
            this.cache[3] !== value[3] ||
            this.cache[4] !== value[4] ||
            this.cache[5] !== value[5] ||
            this.cache[6] !== value[6] ||
            this.cache[7] !== value[7] ||
            this.cache[8] !== value[8] ||
            this.cache[9] !== value[9] ||
            this.cache[10] !== value[10] ||
            this.cache[11] !== value[11] ||
            this.cache[12] !== value[12] ||
            this.cache[13] !== value[13] ||
            this.cache[14] !== value[14] ||
            this.cache[15] !== value[15]) {
            this.gl.uniformMatrix4fv(this.handle, false, value);
            this.cache.set(value);
        }
    };

})();
;(function() {
    "use strict";

    PicoGL.UniformBuffer = function UniformBuffer(gl, layout, usage) {
        this.gl = gl;
        this.buffer = gl.createBuffer();
        this.floatView = null;
        this.offsets = new Array(layout.length);
        this.sizes = new Array(layout.length);
        this.integer = new Array(layout.length);
        this.size = 0;
        this.usage = usage || gl.DYNAMIC_DRAW;

        // TODO(Tarek): MAT2/MAT3?
        for (var i = 0, len = layout.length; i < len; ++i) {
            var type = layout[i];
            switch(type) { 
                case PicoGL.FLOAT:
                case PicoGL.INT:
                case PicoGL.BOOL:
                    this.offsets[i] = this.size;
                    this.sizes[i] = 1;
                    this.integer[i] = type === PicoGL.INT;

                    this.size++;
                    break;
                case PicoGL.FLOAT_VEC2:
                case PicoGL.INT_VEC2:
                case PicoGL.BOOL_VEC2:
                    this.size += this.size % 2;
                    this.offsets[i] = this.size;
                    this.sizes[i] = 2;
                    this.integer[i] = type === PicoGL.INT_VEC2;

                    this.size += 2;
                    break;
                case PicoGL.FLOAT_VEC4:
                case PicoGL.INT_VEC4:
                case PicoGL.BOOL_VEC4:
                    this.size += (4 - this.size % 4) % 4;
                    this.offsets[i] = this.size;
                    this.sizes[i] = 4;
                    this.integer[i] = type === PicoGL.INT_VEC4;

                    this.size += 4;
                    break;
                case PicoGL.FLOAT_MAT4:
                    this.size += (4 - this.size % 4) % 4;
                    this.offsets[i] = this.size;
                    this.sizes[i] = 16;

                    this.size += 16;
                    break;
                default:
                    console.error("Unsupported type for uniform buffer.");
            }
        }

        this.size += (4 - this.size % 4) % 4;

        this.floatView = new Float32Array(this.size);
        this.integerView = new Int32Array(this.floatView.buffer);

        this.gl.bindBufferBase(this.gl.UNIFORM_BUFFER, 0, this.buffer);
        this.gl.bufferData(this.gl.UNIFORM_BUFFER, this.size * 4, this.usage);
        this.gl.bindBufferBase(this.gl.UNIFORM_BUFFER, 0, null);
    };

    PicoGL.UniformBuffer.prototype.set = function(index, value) {
        var view = this.integer[index] ? this.integerView : this.floatView;

        if (this.sizes[index] === 1)  {
            view[this.offsets[index]] = value;
        } else {
            view.set(value, this.offsets[index]);
        }
        
        return this;
    };

    PicoGL.UniformBuffer.prototype.update = function() {
        this.gl.bindBufferBase(this.gl.UNIFORM_BUFFER, 0, this.buffer);
        this.gl.bufferSubData(this.gl.UNIFORM_BUFFER, 0, this.floatView);
        this.gl.bindBufferBase(this.gl.UNIFORM_BUFFER, 0, null);

        return this;
    };

    PicoGL.UniformBuffer.prototype.bind = function(base) {
        this.gl.bindBufferBase(this.gl.UNIFORM_BUFFER, base, this.buffer);

        return this;
    };

})();
;(function() {
    "use strict";

    /**
        General-purpose texture.

        @class
        @prop {WebGLRenderingContext} gl The WebGL context.
        @prop {WebGLTexture} texture Handle to the texture.
        @prop {GLEnum} internalFormat Internal arrangement of the texture data.
        @prop {GLEnum} type Type of data stored in the texture.
    */
    PicoGL.Texture = function Texture(gl, image, options) {
        options = options || PicoGL.DUMMY_OBJECT;

        this.gl = gl;
        this.texture = gl.createTexture();
        this.format = options.format || gl.RGBA;
        this.internalFormat = options.internalFormat || gl.RGBA;
        this.type = options.type || gl.UNSIGNED_BYTE;

        var array = options.array || false;
        var width = options.width || 0;
        var height = options.height || 0;
        var flipY = options.flipY !== undefined ? options.flipY : true;
        var minFilter = options.minFilter || gl.LINEAR_MIPMAP_NEAREST;
        var magFilter = options.magFilter || gl.LINEAR;
        var wrapS = options.wrapS || gl.REPEAT;
        var wrapT = options.wrapT || gl.REPEAT;
        var generateMipmaps = options.generateMipmaps !== false && 
                            (minFilter === gl.LINEAR_MIPMAP_NEAREST || minFilter === gl.LINEAR_MIPMAP_LINEAR);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magFilter);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minFilter);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapS);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapT);

        if (array) {
            gl.texImage2D(gl.TEXTURE_2D, 0, this.internalFormat, width, height, 0, this.format, this.type, image);
        } else {
            gl.texImage2D(gl.TEXTURE_2D, 0, this.internalFormat, this.format, this.type, image);
        }

        if (generateMipmaps) {
            gl.generateMipmap(gl.TEXTURE_2D);
        }

        gl.bindTexture(gl.TEXTURE_2D, null);

    };

    /**
        Set the image data for the texture. Width and height should only
        be passed for ArrayBufferView data.
    
        @method
        @param {ImageElement|ArrayBufferView} image Image data.
        @param {number} [width] Image width (should only be passed for ArrayBufferView data).
        @param {number} [height] Image height (should only be passed for ArrayBufferView data).
    */
    PicoGL.Texture.prototype.image = function(image, width, height) {
        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);

        if (width && height) {
            this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.internalFormat, width, height, 0, this.format, this.type, image);
        } else {
            this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.internalFormat, this.format, this.type, image);
        }

        this.gl.bindTexture(this.gl.TEXTURE_2D, null);

        return this;
    };  

    /**
        Bind this texture to a texture unit.

        @method
        @param {number} unit The texture unit to bind to.
    */
    PicoGL.Texture.prototype.bind = function(unit) {
        this.gl.activeTexture(unit);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);

        return this;
    };   

})();
;(function() {
    "use strict";

    /**
        Cubemap for environment mapping.

        @class
        @prop {WebGLRenderingContext} gl The WebGL context.
        @prop {WebGLTexture} texture Handle to the texture.
    */
    PicoGL.Cubemap = function Texture(gl, options) {
        this.gl = gl;
        this.texture = gl.createTexture();

        options = options || PicoGL.DUMMY_OBJECT;
        var negX = options.negX;
        var posX = options.posX;
        var negY = options.negY;
        var posY = options.posY;
        var negZ = options.negZ;
        var posZ = options.posZ;
        
        var array = options.array || false;
        var width = options.width || 0;
        var height = options.height || 0;
        var flipY = options.flipY !== undefined ? options.flipY : false;
        var minFilter = options.minFilter || gl.LINEAR_MIPMAP_NEAREST;
        var magFilter = options.magFilter || gl.LINEAR;
        var wrapS = options.wrapS || gl.REPEAT;
        var wrapT = options.wrapT || gl.REPEAT;
        var generateMipmaps = options.generateMipmaps !== false && 
                            (minFilter === gl.LINEAR_MIPMAP_NEAREST || minFilter === gl.LINEAR_MIPMAP_LINEAR);

        var internalFormat = options.internalFormat || gl.RGBA;
        var type = options.type || gl.UNSIGNED_BYTE;

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.texture);
        
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, magFilter);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, minFilter);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, wrapS);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, wrapT);

        if (array) {
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, internalFormat, width, height, 0, internalFormat, type, negX);
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, internalFormat, width, height, 0, internalFormat, type, posX);
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, internalFormat, width, height, 0, internalFormat, type, negY);
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, internalFormat, width, height, 0, internalFormat, type, posY);
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, internalFormat, width, height, 0, internalFormat, type, negZ);
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, internalFormat, width, height, 0, internalFormat, type, posZ);
        } else {
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, internalFormat, internalFormat, type, negX);
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, internalFormat, internalFormat, type, posX);
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, internalFormat, internalFormat, type, negY);
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, internalFormat, internalFormat, type, posY);
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, internalFormat, internalFormat, type, negZ);
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, internalFormat, internalFormat, type, posZ);
        }

        if (generateMipmaps) {
            gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
        }

    };

    /**
        Bind this cubemap to a texture unit.

        @method
        @param {number} unit The texture unit to bind to.
    */
    PicoGL.Cubemap.prototype.bind = function(unit) {
        this.gl.activeTexture(unit);
        this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP, this.texture);
    };    

})();
;(function() {
    "use strict";

    /**
        Storage for vertex data.

        @class
        @prop {WebGLRenderingContext} gl The WebGL context.
        @prop {WebGLFramebuffer} framebuffer Handle to the framebuffer.
        @prop {number} width The width of the framebuffer.
        @prop {number} height The height of the framebuffer.
        @prop {Array} colorTextures Array of color texture targets. 
        @prop {number} numColorTargets Number of color texture targets. 
        @prop {Texture} depthTexture Depth texture target (only available if depthTextures is enabled). 
        @prop {WebGLRenderbuffer} depthBuffer Depth renderbuffer (only available if depthTextures is not enabled). 
        @prop {WebGLDrawBuffers} drawBuffersExtension Hold the draw buffers extension object when enabled.
        @prop {Array} colorAttachments Array of color attachment enums. 
    */
    PicoGL.Framebuffer = function Framebuffer(gl, width, height) {
        this.gl = gl;
        this.framebuffer = gl.createFramebuffer();

        if (width && height) {
            this.width = width;
            this.height = height;
        } else {
            this.width = gl.drawingBufferWidth;
            this.height = gl.drawingBufferHeight;
        }

        this.numColorTargets = 0;

        this.colorTextures = [];
        this.colorAttachments = [];
        this.depthTexture = null;
        this.depthBuffer =  null;

        
        for (var i = 0; i < this.numColorTargets; ++i) {
            this.colorAttachments[i] = this.gl["COLOR_ATTACHMENT" + i];
            
        }

        gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
        this.gl.drawBuffers(this.colorAttachments);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }; 

    PicoGL.Framebuffer.prototype.colorTarget = function(index, type, format, internalFormat) {
        index = index || 0;
        type = type || this.gl.UNSIGNED_BYTE;
        format = format || this.gl.RGBA;
        internalFormat = internalFormat || PicoGL.FRAMEBUFFER_INTERNAL_FORMAT[type][format];

        this.colorAttachments[index] = this.gl["COLOR_ATTACHMENT" + index];
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.framebuffer);

        this.colorTextures[index] = new PicoGL.Texture(this.gl, null, {
            array: true,
            type: type,
            format: format,
            internalFormat: internalFormat,
            width: this.width,
            height: this.height,
            minFilter: this.gl.NEAREST,
            magFilter: this.gl.NEAREST,
            wrapS: this.gl.CLAMP_TO_EDGE,
            wrapT: this.gl.CLAMP_TO_EDGE,
            generateMipmaps: false
        });

        this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.colorAttachments[index], this.gl.TEXTURE_2D, this.colorTextures[index].texture, 0);
        this.gl.drawBuffers(this.colorAttachments);
        this.numColorTargets++;

        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);

        return this;
    };

    PicoGL.Framebuffer.prototype.depthTarget = function(type, internalFormat) {
        var format = this.gl.DEPTH_COMPONENT;  
        type = type || this.gl.UNSIGNED_SHORT;
        internalFormat = internalFormat || PicoGL.FRAMEBUFFER_INTERNAL_FORMAT[type][format];

        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.framebuffer);

        this.depthTexture = new PicoGL.Texture(this.gl, null, {
            array: true,
            format: format,
            internalFormat: internalFormat,
            type: type,
            width: this.width,
            height: this.height,
            minFilter: this.gl.NEAREST,
            magFilter: this.gl.NEAREST,
            wrapS: this.gl.CLAMP_TO_EDGE,
            wrapT: this.gl.CLAMP_TO_EDGE,
            generateMipmaps: false
        });

        this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.DEPTH_ATTACHMENT, this.gl.TEXTURE_2D, this.depthTexture.texture, 0);

        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
        
        return this;
    };

    /**
        Bind a new texture as a color target.

        @method
        @param {Texture} texture New texture to bind.
        @param {number} [index=0] Color attachment to bind the texture to.
    */
    PicoGL.Framebuffer.prototype.replaceTexture = function(index, texture) {
        index = index || 0;
        this.colorTextures[index] = texture;

        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.framebuffer);
        this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.colorAttachments[index], this.gl.TEXTURE_2D, this.colorTextures[index].texture, 0);
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
      
        return this;
    };

    /**
        Resize framebuffer to current default drawing buffer
        size. Should be called after calls to App.resize().

        @method
        @param {number} [width=app.width] New width of the framebuffer.
        @param {number} [height=app.height] New height of the framebuffer.
    */
    PicoGL.Framebuffer.prototype.resize = function(width, height) {

        if (width && height) {
            this.width = width;
            this.height = height;
        } else {
            this.width = this.gl.drawingBufferWidth;
            this.height = this.gl.drawingBufferHeight;
        }

        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.framebuffer);

        for (var i = 0; i < this.numColorTargets; ++i) {
            this.colorTextures[i].image(null, this.width, this.height);
        }

        if (this.depthTexture) {
            this.depthTexture.image(null, this.width, this.height);
        }

        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
      
        return this;
    };

})();
;(function() {
    "use strict";

    /**
        A DrawCall represents the program and values of associated
        attributes, uniforms and textures for a single draw call.

        @class
        @prop {WebGLRenderingContext} gl The WebGL context.
        @prop {WebGLProgram} program Handle to the program to use for this drawcall.
        @prop {Object} attributes Map of attribute handles to ArrayBuffers.
        @prop {Object} uniform Map of uniform handles to values.
        @prop {Object} textures Map of texture units to Textures.
        @prop {number} textureCount The number of active textures for this draw call. 
        @prop {ArrayBuffer} indexArray Index array to use for indexed drawing.
        @prop {GLEnum} primitive The primitive type being drawn. 
    */
    PicoGL.DrawCall = function DrawCall(gl, program, geometry, primitive) {
        this.gl = gl;
        this.currentProgram = program;
        
        if (program.transformFeedback) {
            this.currentVertexArray = null;
            this.currentTransformFeedback = geometry;
        } else {
            this.currentVertexArray = geometry;
            this.currentTransformFeedback = null;    
        }
        
        this.uniforms = {};
        this.uniformBlocks = {};
        this.uniformBlockBases = {};
        this.uniformBlockCount = 0;
        this.textures = {};
        this.textureCount = 0;
        this.indexArray = null;
        this.primitive = primitive !== undefined ? primitive : PicoGL.TRIANGLES;
    };

    /**
        Set the value for a uniform.

        @method
        @param {string} name Uniform name.
        @param {any} value Uniform value.
    */
    PicoGL.DrawCall.prototype.uniform = function(name, value) {
        this.uniforms[name] = value;

        return this;
    };

    /**
        Set texture to bind to a sampler uniform.

        @method
        @param {string} name Sampler uniform name.
        @param {Texture} texture Texture to bind.
    */
    PicoGL.DrawCall.prototype.texture = function(name, texture) {
        var unit = this.uniforms[name];
        if (unit === undefined) {
            unit = this.textureCount++;
            this.uniforms[name] = unit;
        }
        
        var textureUnit = this.gl["TEXTURE" + unit];   
        this.textures[textureUnit] = texture;
        
        return this;
    };

    PicoGL.DrawCall.prototype.uniformBlock = function(name, block) {
        var base = this.uniformBlockBases[name];
        if (base === undefined) {
            base = this.uniformBlockCount++;
            this.uniformBlockBases[name] = base;
        }
        
        this.uniformBlocks[base] = block;
        
        return this;
    };

    /**
        Draw something.

        @method
        @param {Object} state Current app state.
    */
    PicoGL.DrawCall.prototype.draw = function(state) {
        var uniforms = this.uniforms;
        var uniformBlocks = this.uniformBlocks;
        var uniformBlockBases = this.uniformBlockBases;
        var textures = this.textures;

        if (state.program !== this.currentProgram) {
            this.gl.useProgram(this.currentProgram.program);
            state.program = this.currentProgram;
        }

        for (var uName in uniforms) {
            this.currentProgram.uniform(uName, uniforms[uName]);
        }

        for (var ubName in uniformBlockBases) {
            var base = uniformBlockBases[ubName];
            this.currentProgram.uniformBlock(ubName, base);
            uniformBlocks[base].bind(base);
        }

        for (var unit in textures) {
            textures[unit].bind(unit);
        }

        if (this.currentTransformFeedback) {
            this.currentTransformFeedback.bind(this.primitive);
            this.currentVertexArray = this.currentTransformFeedback.inputVertexArray;
        }

        if (state.vertexArray !== this.currentVertexArray) {
            this.currentVertexArray.bind();
            state.vertexArray = this.currentVertexArray;
        }


        if (this.currentVertexArray.instanced) {
            if (this.currentVertexArray.indexed) {
                this.gl.drawElementsInstanced(this.primitive, this.currentVertexArray.numElements, this.currentVertexArray.indexType, 0, this.currentVertexArray.numInstances);
            } else {
                this.gl.drawArraysInstanced(this.primitive, 0, this.currentVertexArray.numElements, this.currentVertexArray.numInstances);
            }
        } else {
            if (this.currentVertexArray.indexed) {
                this.gl.drawElements(this.primitive, this.currentVertexArray.numElements, this.currentVertexArray.indexType, 0);
            } else {
                this.gl.drawArrays(this.primitive, 0, this.currentVertexArray.numElements);
            }
        }

        if (this.currentTransformFeedback) {
            this.currentTransformFeedback.unbind();
        }

    };

})();


