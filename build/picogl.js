/*
PicoGL.js v0.2.2 

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
        @prop {object} TEXTURE_INTERNAL_FORMAT Map of framebuffer texture formats to internal formats.
        @prop {object} TYPE_SIZE Map of data types to sizes in bytes.
        @prop {object} WEBGL_INFO WebGL context information.
        @prop {object} TEXTURE_UNIT_MAP Map of texture unit indices to GL enums, e.g. 0 => gl.TEXTURE0.
    */
    var PicoGL = window.PicoGL = {
        version: "0.2.2"
    };

    (function() {
        // Absorb all GL enums for convenience
        var canvas = document.createElement("canvas");
        var gl = canvas.getContext("webgl2");
        
        if (!gl) {
            return;
        }

        for (var enumName in gl) {
            if (enumName.match(/^[A-Z0-9_x]+$/) && typeof(gl[enumName]) === "number") {
                PicoGL[enumName] = gl[enumName];
            }
        }

        PicoGL.TEXTURE_INTERNAL_FORMAT = {};
        var UNSIGNED_BYTE = PicoGL.TEXTURE_INTERNAL_FORMAT[gl.UNSIGNED_BYTE] = {};
        UNSIGNED_BYTE[gl.RED] = gl.R8;
        UNSIGNED_BYTE[gl.RG] = gl.RG8;
        UNSIGNED_BYTE[gl.RGB] = gl.RGB;
        UNSIGNED_BYTE[gl.RGBA] = gl.RGBA;

        var UNSIGNED_SHORT = PicoGL.TEXTURE_INTERNAL_FORMAT[gl.UNSIGNED_SHORT] = {};
        UNSIGNED_SHORT[gl.DEPTH_COMPONENT] = gl.DEPTH_COMPONENT16;

        var FLOAT = PicoGL.TEXTURE_INTERNAL_FORMAT[gl.FLOAT] = {};
        FLOAT[gl.RED] = gl.R16F;
        FLOAT[gl.RG] = gl.RG16F;
        FLOAT[gl.RGB] = gl.RGB16F;
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

        PicoGL.WEBGL_INFO = {};
        PicoGL.WEBGL_INFO.MAX_TEXTURE_UNITS = gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
        PicoGL.WEBGL_INFO.MAX_UNIFORM_BUFFERS = gl.getParameter(gl.MAX_UNIFORM_BUFFER_BINDINGS);

        PicoGL.TEXTURE_UNIT_MAP = new Array(PicoGL.WEBGL_INFO.MAX_TEXTURE_UNITS);

        for (var i = 0, len = PicoGL.TEXTURE_UNIT_MAP.length; i < len; ++i) {
            PicoGL.TEXTURE_UNIT_MAP[i] = gl["TEXTURE" + i];
        }

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

})();

;(function() {
    "use strict";

    /**
        Primary entry point to PicoGL. An app will store all parts of the WebGL
        state and manage draw calls.

        @class
        @prop {DOMElement} canvas The canvas on which this app drawing.
        @prop {WebGLRenderingContext} gl The WebGL context.
        @prop {number} width The width of the drawing surface.
        @prop {number} height The height of the drawing surface.
        @prop {boolean} floatRenderTargetsEnabled Whether the EXT_color_buffer_float extension is enabled.
        @prop {boolean} linearFloatTexturesEnabled Whether the OES_texture_float_linear extension is enabled.
        @prop {Object} currentState Tracked GL state.
        @prop {GLEnum} clearBits Current clear mask to use with clear().
        @prop {Timer} timer Rendering timer.
        @prop {number} cpuTime Time spent on CPU during last timing. Only valid if timerReady() returns true.
        @prop {number} gpuTime Time spent on GPU during last timing. Only valid if timerReady() returns true.
                Will remain 0 if extension EXT_disjoint_timer_query_webgl2 is unavailable.
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
        
        this.timer = new PicoGL.Timer(this.gl);
        this.cpuTime = 0;
        this.gpuTime = 0;

        this.floatRenderTargetsEnabled = false;
        this.linearFloatTexturesEnabled = false;
        
        this.gl.viewport(0, 0, this.width, this.height);
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

    /**
        Enable rasterization step.

        @method
    */
    PicoGL.App.prototype.rasterize = function() {
        this.gl.disable(this.gl.RASTERIZER_DISCARD);

        return this;
    };

    /**
        Disable rasterization step.

        @method
    */
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
        Enable the EXT_color_buffer_float extension. Allows for creating float textures as
        render targets on FrameBuffer objects. E.g. app.createFramebuffer().colorTarget(0, PicoGL.FLOAT).

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
        Create a program.

        @method
        @param {Shader|string} vertexShader Vertex shader object or source code.
        @param {Shader|string} fragmentShader Fragment shader object or source code.
        @param {Array} [xformFeedbackVars] Transform feedback varyings.
    */
    PicoGL.App.prototype.createProgram = function(vsSource, fsSource, xformFeedbackVars) {
        return new PicoGL.Program(this.gl, vsSource, fsSource, xformFeedbackVars);
    };

    /**
        Create a shader. Creating a shader separately from a program allows for 
        shader reuse.

        @method
        @param {GLEnum} type Shader type.
        @param {string} source Shader source.
    */
    PicoGL.App.prototype.createShader = function(type, source) {
        return new PicoGL.Shader(this.gl, type, source);
    };

    /**
        Create a vertex array.

        @method
    */
    PicoGL.App.prototype.createVertexArray = function() {
        return new PicoGL.VertexArray(this.gl);
    };

    /**
        Create a transform feedback object.

        @method
        @param {VertexArray} vertexArray1 Vertex array containing first set of transform feedback buffers.
        @param {VertexArray} vertexArray2 Vertex array containing second set of transform feedback buffers.
        @param {Array} varryingBufferIndices Locations in the vertex arrays of buffers to use for transform feedback.
    */
    PicoGL.App.prototype.createTransformFeedback = function(vertexArray1, vertexArray2, varyingBufferIndices) {
        return new PicoGL.TransformFeedback(this.gl, vertexArray1, vertexArray2, varyingBufferIndices);
    };

    /**
        Create a vertex buffer.

        @method
        @param {GLEnum} type The data type stored in the vertex buffer.
        @param {number} itemSize Number of elements per vertex.
        @param {ArrayBufferView} data Buffer data.
        @param {GLEnum} [usage=STATIC_DRAW] Buffer usage.
    */
    PicoGL.App.prototype.createVertexBuffer = function(type, itemSize, data, usage) {
        return new PicoGL.VertexBuffer(this.gl, type, itemSize, data, usage);
    };

    /**
        Create an instance buffer. Data items will be per-instance
        rather than per-vertex.

        @method
        @param {GLEnum} type The data type stored in the instance buffer.
        @param {number} itemSize Number of elements per instance.
        @param {ArrayBufferView} data Buffer data.
        @param {GLEnum} [usage=STATIC_DRAW] Buffer usage.
    */
    PicoGL.App.prototype.createInstanceBuffer = function(type, itemSize, data, usage) {
        return new PicoGL.VertexBuffer(this.gl, type, itemSize, data, usage, false, true);
    };

    /**
        Create a per-vertex matrix buffer. Matrix buffers ensure that columns
        are correctly split across attribute locations.

        @method
        @param {GLEnum} type The data type stored in the matrix buffer. Valid types
        are FLOAT_MAT4, FLOAT_MAT3, FLOAT_MAT2.
        @param {ArrayBufferView} data Matrix buffer data.
        @param {GLEnum} [usage=STATIC_DRAW] Buffer usage.
    */
    PicoGL.App.prototype.createVertexMatrixBuffer = function(type, data, usage) {
        return new PicoGL.VertexBuffer(this.gl, type, null, data, usage);
    };

    /**
        Create an instanced matrix buffer. Matrix buffers ensure that columns
        are correctly split across attribute locations. Data items will be per-instance
        rather than per-vertex.

        @method
        @param {GLEnum} type The data type stored in the matrix buffer. Valid types
        are FLOAT_MAT4, FLOAT_MAT3, FLOAT_MAT2.
        @param {ArrayBufferView} data Matrix buffer data.
        @param {GLEnum} [usage=STATIC_DRAW] Buffer usage.
    */
    PicoGL.App.prototype.createInstanceMatrixBuffer = function(type, data, usage) {
        return new PicoGL.VertexBuffer(this.gl, type, null, data, usage, false, true);
    };

    /**
        Create an index buffer.

        @method
        @param {GLEnum} type The data type stored in the index buffer.
        @param {number} itemSize Number of elements per primitive.
        @param {ArrayBufferView} data Index buffer data.
    */
    PicoGL.App.prototype.createIndexBuffer = function(type, itemSize, data) {
        return new PicoGL.VertexBuffer(this.gl, type, itemSize, data, null, true);
    };

    /**
        Create a uniform buffer in std140 layout. NOTE: FLOAT_MAT2, FLOAT_MAT3x2, FLOAT_MAT4x2, 
        FLOAT_MAT3, FLOAT_MAT2x3, FLOAT_MAT4x3 are supported, but must be manually padded to
        4-float column alignment by the application!

        @method
        @param {Array} layout Array indicating the order and types of items to 
                        be stored in the buffer.
        @param {GLEnum} [usage=DYNAMIC_DRAW] Buffer usage.
    */
    PicoGL.App.prototype.createUniformBuffer = function(layout, usage) {
        return new PicoGL.UniformBuffer(this.gl, layout, usage);
    };

    /**
        Create a 2D texture.

        @method
        @param {DOMElement|ArrayBufferView} image Image data. Can be any format that would be accepted 
                by texImage2D. 
        @param {number} [width] Texture width. Required for array data.
        @param {number} [height] Texture height. Required for array data.
        @param {Object} [options] Texture options.
        @param {GLEnum} [options.type=UNSIGNED_BYTE] Type of data stored in the texture.
        @param {GLEnum} [options.format=RGBA] Texture data format.
        @param {GLEnum} [options.internalFormat=RGBA] Texture data internal format.
        @param {boolean} [options.flipY=true] Whether th y-axis be flipped when reading the texture.
        @param {GLEnum} [options.minFilter=LINEAR_MIPMAP_NEAREST] Minification filter.
        @param {GLEnum} [options.magFilter=LINEAR] Magnification filter.
        @param {GLEnum} [options.wrapS=REPEAT] Horizontal wrap mode.
        @param {GLEnum} [options.wrapT=REPEAT] Vertical wrap mode.
        @param {boolean} [options.generateMipmaps] Should mip maps be generated.
    */
    PicoGL.App.prototype.createTexture2D = function(image, width, height, options) {
        if (height === undefined) {
            // Passing in a DOM element. Height/width not required.
            options = width;
        }

        return new PicoGL.Texture(this.gl, this.gl.TEXTURE_2D, image, width, height, null, false, options);
    };

    /**
        Create a 2D texture array.

        @method
        @param {ArrayBufferView} image Typed array containing pixel data.
        @param {number} width Texture width.
        @param {number} height Texture height.
        @param {number} size Number of images in the array.
        @param {Object} [options] Texture options.
        @param {GLEnum} [options.type=UNSIGNED_BYTE] Type of data stored in the texture.
        @param {GLEnum} [options.format=RGBA] Texture data format.
        @param {GLEnum} [options.internalFormat=RGBA] Texture data internal format.
        @param {GLEnum} [options.minFilter=LINEAR_MIPMAP_NEAREST] Minification filter.
        @param {GLEnum} [options.magFilter=LINEAR] Magnification filter.
        @param {GLEnum} [options.wrapS=REPEAT] Horizontal wrap mode.
        @param {GLEnum} [options.wrapT=REPEAT] Vertical wrap mode.
        @param {boolean} [options.generateMipmaps] Should mip maps be generated.
    */
    PicoGL.App.prototype.createTextureArray = function(image, width, height, depth, options) {
        return new PicoGL.Texture(this.gl, this.gl.TEXTURE_2D_ARRAY, image, width, height, depth, true, options);
    };

    /**
        Create a 3D texture.

        @method
        @param {ArrayBufferView} image Typed array containing pixel data.
        @param {number} width Texture width.
        @param {number} height Texture height.
        @param {number} depth Texture depth.
        @param {Object} [options] Texture options.
        @param {GLEnum} [options.type=UNSIGNED_BYTE] Type of data stored in the texture.
        @param {GLEnum} [options.format=RGBA] Texture data format.
        @param {GLEnum} [options.internalFormat=RGBA] Texture data internal format.
        @param {GLEnum} [options.minFilter=LINEAR_MIPMAP_NEAREST] Minification filter.
        @param {GLEnum} [options.magFilter=LINEAR] Magnification filter.
        @param {GLEnum} [options.wrapS=REPEAT] Horizontal wrap mode.
        @param {GLEnum} [options.wrapT=REPEAT] Vertical wrap mode.
        @param {boolean} [options.generateMipmaps] Should mip maps be generated.
    */
    PicoGL.App.prototype.createTexture3D = function(image, width, height, depth, options) {
        return new PicoGL.Texture(this.gl, this.gl.TEXTURE_3D, image, width, height, depth, true, options);
    };

    /**
        Create a cubemap.

        @method
        @param {Object} options Texture options.
        @param {DOMElement|ArrayBufferView} options.negX The image data for the negative X direction.
                Can be any format that would be accepted by texImage2D.
        @param {DOMElement|ArrayBufferView} options.posX The image data for the positive X direction.
                Can be any format that would be accepted by texImage2D.
        @param {DOMElement|ArrayBufferView} options.negY The image data for the negative Y direction.
                Can be any format that would be accepted by texImage2D.
        @param {DOMElement|ArrayBufferView} options.posY The image data for the positive Y direction.
                Can be any format that would be accepted by texImage2D.
        @param {DOMElement|ArrayBufferView} options.negZ The image data for the negative Z direction.
                Can be any format that would be accepted by texImage2D.
        @param {DOMElement|ArrayBufferView} options.posZ The image data for the positive Z direction.
                Can be any format that would be accepted by texImage2D.
        @param {GLEnum} [options.type=UNSIGNED_BYTE] Type of data stored in the texture.
        @param {GLEnum} [options.format=RGBA] Texture data format.
        @param {GLEnum} [options.internalFormat=RGBA] Texture data internal format.
        @param {number} [options.width] Texture width. Required when passing array data.
        @param {number} [options.height] Texture height. Required when passing array data.
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
        @param {number} [width=app.width] Width of the framebuffer.
        @param {number} [height=app.height] Height of the framebuffer.
    */
    PicoGL.App.prototype.createFramebuffer = function(width, height) {
        return new PicoGL.Framebuffer(this.gl, width, height);
    };

    /**
        Create a DrawCall. A DrawCall manages the state associated with 
        a WebGL draw call including a program and associated vertex data, textures, 
        uniforms and uniform blocks.

        @method
        @param {Program} program The program to use for this DrawCall.
        @param {VertexArray|TransformFeedback} geometry Vertex data to use for drawing.
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

    /** 
        Start the rendering timer.

        @method
    */
    PicoGL.App.prototype.timerStart = function() {
        this.timer.start();

        return this;
    };

    /** 
        Stop the rendering timer.

        @method
    */
    PicoGL.App.prototype.timerEnd = function() {
        this.timer.end();

        return this;
    };

    /** 
        Check if the rendering time is available. If
        this method returns true, the cpuTime and
        gpuTime properties will be set to valid 
        values.

        @method
    */
    PicoGL.App.prototype.timerReady = function() {
        if (this.timer.ready()) {
            this.cpuTime = this.timer.cpuTime;
            this.gpuTime = this.timer.gpuTime;
            return true;
        } else {
            return false;
        }
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
        @prop {boolean} transformFeedback Whether this program is set up for transform feedback. 
        @prop {Object} uniforms Map of uniform names to handles. 
        @prop {Object} uniformBlocks Map of uniform block names to handles. 
    */
    PicoGL.Program = function Program(gl, vsSource, fsSource, xformFeebackVars) {
        var i;

        var vShader, fShader; 

        var ownVertexShader = false;
        var ownFragmentShader = false;
        if (typeof vsSource === "string") {
            vShader = new PicoGL.Shader(gl, gl.VERTEX_SHADER, vsSource);
            ownVertexShader = true;
        } else {
            vShader = vsSource;
        }

        if (typeof fsSource === "string") {
            fShader = new PicoGL.Shader(gl, gl.FRAGMENT_SHADER, fsSource);
            ownFragmentShader = true;
        } else {
            fShader = fsSource;
        }

        var program = gl.createProgram();
        gl.attachShader(program, vShader.shader);
        gl.attachShader(program, fShader.shader);
        if (xformFeebackVars) {
            gl.transformFeedbackVaryings(program, xformFeebackVars, gl.SEPARATE_ATTRIBS);
        }
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
          console.error(gl.getProgramInfoLog(program));
        }

        if (ownVertexShader) {
            vShader.delete();
        }

        if (ownFragmentShader) {
           fShader.delete();
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
                case PicoGL.INT: 
                case PicoGL.BOOL:
                case PicoGL.SAMPLER_2D:
                case PicoGL.INT_SAMPLER_2D:
                case PicoGL.UNSIGNED_INT_SAMPLER_2D:
                case PicoGL.SAMPLER_2D_SHADOW:
                case PicoGL.SAMPLER_2D_ARRAY:
                case PicoGL.INT_SAMPLER_2D_ARRAY:
                case PicoGL.UNSIGNED_INT_SAMPLER_2D_ARRAY:
                case PicoGL.SAMPLER_2D_ARRAY_SHADOW:
                case PicoGL.SAMPLER_CUBE:
                case PicoGL.INT_SAMPLER_CUBE:
                case PicoGL.UNSIGNED_INT_SAMPLER_CUBE:
                case PicoGL.SAMPLER_CUBE_SHADOW:
                case PicoGL.SAMPLER_3D:
                case PicoGL.INT_SAMPLER_3D:
                case PicoGL.UNSIGNED_INT_SAMPLER_3D:
                    UniformClass = PicoGL.IntUniform;
                    break;
                case PicoGL.UNSIGNED_INT: 
                    UniformClass = PicoGL.UintUniform;
                    break;
                case PicoGL.FLOAT: 
                    UniformClass = PicoGL.FloatUniform;
                    break;
                case PicoGL.FLOAT_VEC2: 
                    UniformClass = PicoGL.Vec2Uniform;
                    break;
                case PicoGL.FLOAT_VEC3: 
                    UniformClass = PicoGL.Vec3Uniform;
                    break;
                case PicoGL.FLOAT_VEC4: 
                    UniformClass = PicoGL.Vec4Uniform;
                    break;
                case PicoGL.INT_VEC2: 
                    UniformClass = PicoGL.IntVec2Uniform;
                    break;
                case PicoGL.INT_VEC3: 
                    UniformClass = PicoGL.IntVec3Uniform;
                    break;
                case PicoGL.INT_VEC4: 
                    UniformClass = PicoGL.IntVec4Uniform;
                    break;
                case PicoGL.UNSIGNED_INT_VEC2: 
                    UniformClass = PicoGL.UintVec2Uniform;
                    break;
                case PicoGL.UNSIGNED_INT_VEC3: 
                    UniformClass = PicoGL.UintVec3Uniform;
                    break;
                case PicoGL.UNSIGNED_INT_VEC4: 
                    UniformClass = PicoGL.UintVec4Uniform;
                    break;
                case PicoGL.BOOL_VEC2: 
                    UniformClass = PicoGL.BoolVec2Uniform;
                    break;
                case PicoGL.BOOL_VEC3: 
                    UniformClass = PicoGL.BoolVec3Uniform;
                    break;
                case PicoGL.BOOL_VEC4: 
                    UniformClass = PicoGL.BoolVec4Uniform;
                    break;
                case PicoGL.FLOAT_MAT2: 
                    UniformClass = PicoGL.Mat2Uniform;
                    break;
                case PicoGL.FLOAT_MAT3: 
                    UniformClass = PicoGL.Mat3Uniform;
                    break;
                case PicoGL.FLOAT_MAT4: 
                    UniformClass = PicoGL.Mat4Uniform;
                    break;
                case PicoGL.FLOAT_MAT2x3: 
                    UniformClass = PicoGL.Mat2x3Uniform;
                    break;
                case PicoGL.FLOAT_MAT2x4: 
                    UniformClass = PicoGL.Mat2x4Uniform;
                    break;
                case PicoGL.FLOAT_MAT3x2: 
                    UniformClass = PicoGL.Mat3x2Uniform;
                    break;
                case PicoGL.FLOAT_MAT3x4: 
                    UniformClass = PicoGL.Mat3x4Uniform;
                    break;
                case PicoGL.FLOAT_MAT4x2: 
                    UniformClass = PicoGL.Mat4x2Uniform;
                    break;
                case PicoGL.FLOAT_MAT4x3: 
                    UniformClass = PicoGL.Mat4x3Uniform;
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
        Delete this program.

        @method
    */
    PicoGL.Program.prototype.delete = function() {
        if (this.program) {
            this.gl.deleteProgram(this.program);
            this.program = null;
        }
    };

    // Set the value of a uniform.
    PicoGL.Program.prototype.uniform = function(name, value) {
        this.uniforms[name].set(value);
    };

    // Bind a uniform block to a uniform buffer base.
    PicoGL.Program.prototype.uniformBlock = function(name, base) {
        this.gl.uniformBlockBinding(this.program, this.uniformBlocks[name], base);
    };

})();

;(function() {
    "use strict";

    /**
        WebGL shader.

        @class
        @prop {WebGLRenderingContext} gl The WebGL context.
        @prop {WebGLShader} shader The shader.
    */
    PicoGL.Shader = function(gl, type, source) {
        this.gl = gl;
        this.shader = gl.createShader(type);
        gl.shaderSource(this.shader, source);
        gl.compileShader(this.shader);

        if (!gl.getShaderParameter(this.shader, gl.COMPILE_STATUS)) {
            var i, lines;

            console.error(gl.getShaderInfoLog(this.shader));
            lines = source.split("\n");
            for (i = 0; i < lines.length; ++i) {
                console.error((i + 1) + ":", lines[i]);
            }
        }
    };

    /**
        Delete this shader.

        @method
    */
    PicoGL.Shader.prototype.delete = function() {
        if (this.shader) {
            this.gl.deleteShader(this.shader);
            this.shader = null;
        }
    };

})();
;(function() {
    "use strict";

    /**
        Storage for vertex data.

        @class
        @prop {WebGLRenderingContext} gl The WebGL context.
        @prop {WebGLVertexArrayObject} vertexArray Vertex array object.
        @prop {array} attributeBuffers The attribute VertexBuffers associated with this vertex array.
        @prop {number} numElements Number of elements in the vertex array.
        @prop {boolean} indexed Whether this vertex array is set up for indexed drawing.
        @prop {GLenum} indexType Data type of the indices.
        @prop {boolean} instanced Whether this vertex array is set up for instanced drawing.
        @prop {number} numInstances Number of instances to draw with this vertex array.
    */
    PicoGL.VertexArray = function VertexArray(gl) {
        this.gl = gl;
        this.vertexArray = gl.createVertexArray();
        this.attributeBuffers = [];
        this.numElements = 0;
        this.indexType = null;
        this.instanced = false;
        this.indexed = false;
        this.numInstances = 0;
    };

    /**
        Bind an attribute buffer to this vertex array.

        @method
        @param {number} attributeIndex The attribute location to bind to.
        @param {VertexBuffer} vertexBuffer The VertexBuffer to bind.
    */
    PicoGL.VertexArray.prototype.attributeBuffer = function(attributeIndex, vertexBuffer) {
        this.gl.bindVertexArray(this.vertexArray);

        this.attributeBuffers[attributeIndex] = vertexBuffer;
        var numRows = vertexBuffer.numRows;
        
        vertexBuffer.bind();

        for (var i = 0; i < numRows; ++i) {
            this.gl.vertexAttribPointer(
                attributeIndex + i, 
                vertexBuffer.itemSize, 
                vertexBuffer.type, 
                false, 
                numRows * vertexBuffer.itemSize * PicoGL.TYPE_SIZE[vertexBuffer.type], 
                i * vertexBuffer.itemSize * PicoGL.TYPE_SIZE[vertexBuffer.type]);

            if (vertexBuffer.instanced) {
                this.gl.vertexAttribDivisor(attributeIndex + i, 1);
            }

            this.gl.enableVertexAttribArray(attributeIndex + i);
        }
        
        this.instanced = this.instanced || vertexBuffer.instanced;

        if (vertexBuffer.instanced) {
            this.numInstances = vertexBuffer.numItems; 
        } else {
            this.numElements = this.numElements || vertexBuffer.numItems; 
        }

        this.gl.bindVertexArray(null);

        return this;
    };

    /**
        Bind an index buffer to this vertex array.

        @method
        @param {VertexBuffer} vertexBuffer The VertexBuffer to bind.
    */
    PicoGL.VertexArray.prototype.indexBuffer = function(vertexBuffer) {
        this.gl.bindVertexArray(this.vertexArray);
        vertexBuffer.bind();

        this.numElements = vertexBuffer.numItems * 3;
        this.indexType = vertexBuffer.type;
        this.indexed = true;

        this.gl.bindVertexArray(null);

        return this;
    };

    /**
        Delete this vertex array.

        @method
    */
    PicoGL.VertexArray.prototype.delete = function() {
        if (this.vertexArray) {
            this.gl.deleteVertexArray(this.vertexArray);
            this.vertexArray = null;
        }
    };

    // Bind this vertex array.
    PicoGL.VertexArray.prototype.bind = function() {
        this.gl.bindVertexArray(this.vertexArray);

        return this;
    };

    // Unbind this vertex array.
    PicoGL.VertexArray.prototype.unbind = function() {
        this.gl.bindVertexArray(null);

        return this;
    };

})();
;(function() {
    "use strict";

    /**
        Tranform feedback object.

        @class
        @prop {WebGLRenderingContext} gl The WebGL context.
        @prop {WebGLTransformFeedback} transformFeedback Transform feedback object.
        @prop {VertexArray} inputVertexArray Vertex array to use as input to the next pass.
        @prop {array} inputBuffers Transform feedback buffers bound to the input vertex array.
        @prop {VertexArray} outputVertexArray Vertex array to store output from the next pass.
        @prop {array} outputBuffers Transform feedback buffers bound to the output vertex array.
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

     /**
        Swap the input and output buffers.

        @method
    */
    PicoGL.TransformFeedback.prototype.swapBuffers = function() {
        var va = this.inputVertexArray;
        this.inputVertexArray = this.outputVertexArray;
        this.outputVertexArray = va;

        var vb = this.inputBuffers;
        this.inputBuffers = this.outputBuffers;
        this.outputBuffers = vb;

        return this;
    };

    /**
        Delete this transform feedback.

        @method
    */
    PicoGL.TransformFeedback.prototype.delete = function() {
        if (this.transformFeedback) {
            this.gl.deleteTransformFeedback(this.transformFeedback);
            this.transformFeedback = null;
        }
    }; 

    // Bind this transform feedback.
    PicoGL.TransformFeedback.prototype.bind = function(primitive) {
        this.gl.bindTransformFeedback(this.gl.TRANSFORM_FEEDBACK, this.transformFeedback);
        
        for (var i = 0, len = this.outputBuffers.length; i < len; ++i) {
            this.gl.bindBufferBase(this.gl.TRANSFORM_FEEDBACK_BUFFER, i, this.outputBuffers[i].buffer);
        }

        this.gl.beginTransformFeedback(primitive);

        return this;
    };

    // Unbind this transform feedback.
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
        @prop {GLEnum} usage The usage pattern of the buffer.
        @prop {boolean} indexArray Whether this is an index array.
        @prop {boolean} instanced Whether this is an instanced array.
        @prop {GLEnum} binding GL binding point (ARRAY_BUFFER or ELEMENT_ARRAY_BUFFER).
    */
    PicoGL.VertexBuffer = function VertexBuffer(gl, type, itemSize, data, usage, indexArray, instanced) {
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

        var dataLength;
        if (typeof data === "number") {
            dataLength = data;
            data *= PicoGL.TYPE_SIZE[type];
        } else {
            dataLength = data.length;
        }

        this.gl = gl;
        this.buffer = gl.createBuffer();
        this.type = type;
        this.itemSize = itemSize;
        this.numItems = dataLength / (itemSize * numRows);
        this.numRows = numRows;
        this.usage = usage || gl.STATIC_DRAW;
        this.indexArray = !!indexArray;
        this.instanced = !!instanced;
        this.binding = this.indexArray ? gl.ELEMENT_ARRAY_BUFFER : gl.ARRAY_BUFFER;

        gl.bindBuffer(this.binding, this.buffer);
        gl.bufferData(this.binding, data, this.usage);
        gl.bindBuffer(this.binding, null);
    };

    /**
        Update data in this buffer.

        @method
        @param {VertexBufferView} data Data to store in the buffer.
    */
    PicoGL.VertexBuffer.prototype.data = function(data) {
        this.gl.bindBuffer(this.binding, this.buffer);
        this.gl.bufferSubData(this.binding, 0, data);
        this.gl.bindBuffer(this.binding, null);

        return this;
    };

    /**
        Delete this array buffer.

        @method
    */
    PicoGL.VertexBuffer.prototype.delete = function() {
        if (this.buffer) {
            this.gl.deleteBuffer(this.buffer);
            this.buffer = null;    
        }
    };

    // Bind this array buffer.
    PicoGL.VertexBuffer.prototype.bind = function() {
        this.gl.bindBuffer(this.binding, this.buffer);

        return this;
    };

})();
;(function() {
    "use strict";

    // Classes to manage uniform value updates, including
    // caching current values.

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

    PicoGL.UintUniform = function UintUniform(gl, handle) {
        this.gl = gl;
        this.handle = handle;
        this.cache = 0;
    };

    PicoGL.UintUniform.prototype.set = function(value) {
        if (this.cache !== value) {
            this.gl.uniform1ui(this.handle, value);
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

    PicoGL.UintVec2Uniform = function UintVec2Uniform(gl, handle) {
        this.gl = gl;
        this.handle = handle;
        this.cache = new Uint32Array(2);
    };

    PicoGL.UintVec2Uniform.prototype.set = function(value) {
        if (this.cache[0] !== value[0] ||
            this.cache[1] !== value[1]) {
            this.gl.uniform2uiv(this.handle, value);
            this.cache.set(value);
        }
    };

    PicoGL.UintVec3Uniform = function UintVec3Uniform(gl, handle) {
        this.gl = gl;
        this.handle = handle;
        this.cache = new Uint32Array(3);
    };

    PicoGL.UintVec3Uniform.prototype.set = function(value) {
        if (this.cache[0] !== value[0] ||
            this.cache[1] !== value[1] ||
            this.cache[2] !== value[2]) {
            this.gl.uniform3uiv(this.handle, value);
            this.cache.set(value);
        }
    };

    PicoGL.UintVec4Uniform = function UintVec4Uniform(gl, handle) {
        this.gl = gl;
        this.handle = handle;
        this.cache = new Uint32Array(4);
    };

    PicoGL.UintVec4Uniform.prototype.set = function(value) {
        if (this.cache[0] !== value[0] ||
            this.cache[1] !== value[1] ||
            this.cache[2] !== value[2] ||
            this.cache[3] !== value[3]) {
            this.gl.uniform4uiv(this.handle, value);
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

    PicoGL.Mat2x3Uniform = function Mat2x3Uniform(gl, handle) {
        this.gl = gl;
        this.handle = handle;
        this.cache = new Float32Array(6);
    };

    PicoGL.Mat2x3Uniform.prototype.set = function(value) {
        if (this.cache[0] !== value[0] ||
            this.cache[1] !== value[1] ||
            this.cache[2] !== value[2] ||
            this.cache[3] !== value[3] ||
            this.cache[4] !== value[4] ||
            this.cache[5] !== value[5]) {
            this.gl.uniformMatrix2x3fv(this.handle, false, value);
            this.cache.set(value);
        }
    };

    PicoGL.Mat2x4Uniform = function Mat2x4Uniform(gl, handle) {
        this.gl = gl;
        this.handle = handle;
        this.cache = new Float32Array(8);
    };

    PicoGL.Mat2x4Uniform.prototype.set = function(value) {
        if (this.cache[0] !== value[0] ||
            this.cache[1] !== value[1] ||
            this.cache[2] !== value[2] ||
            this.cache[3] !== value[3] ||
            this.cache[4] !== value[4] ||
            this.cache[5] !== value[5] ||
            this.cache[6] !== value[6] ||
            this.cache[7] !== value[7]) {
            this.gl.uniformMatrix2x4fv(this.handle, false, value);
            this.cache.set(value);
        }
    };

    PicoGL.Mat3x2Uniform = function Mat3x2Uniform(gl, handle) {
        this.gl = gl;
        this.handle = handle;
        this.cache = new Float32Array(6);
    };

    PicoGL.Mat3x2Uniform.prototype.set = function(value) {
        if (this.cache[0] !== value[0] ||
            this.cache[1] !== value[1] ||
            this.cache[2] !== value[2] ||
            this.cache[3] !== value[3] ||
            this.cache[4] !== value[4] ||
            this.cache[5] !== value[5]) {
            this.gl.uniformMatrix3x2fv(this.handle, false, value);
            this.cache.set(value);
        }
    };

    PicoGL.Mat3x4Uniform = function Mat3x4Uniform(gl, handle) {
        this.gl = gl;
        this.handle = handle;
        this.cache = new Float32Array(12);
    };

    PicoGL.Mat3x4Uniform.prototype.set = function(value) {
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
            this.cache[11] !== value[11]) {
            this.gl.uniformMatrix3x4fv(this.handle, false, value);
            this.cache.set(value);
        }
    };

    PicoGL.Mat4x2Uniform = function Mat4x2Uniform(gl, handle) {
        this.gl = gl;
        this.handle = handle;
        this.cache = new Float32Array(8);
    };

    PicoGL.Mat4x2Uniform.prototype.set = function(value) {
        if (this.cache[0] !== value[0] ||
            this.cache[1] !== value[1] ||
            this.cache[2] !== value[2] ||
            this.cache[3] !== value[3] ||
            this.cache[4] !== value[4] ||
            this.cache[5] !== value[5] ||
            this.cache[6] !== value[6] ||
            this.cache[7] !== value[7]) {
            this.gl.uniformMatrix4x2fv(this.handle, false, value);
            this.cache.set(value);
        }
    };

    PicoGL.Mat4x3Uniform = function Mat4x3Uniform(gl, handle) {
        this.gl = gl;
        this.handle = handle;
        this.cache = new Float32Array(12);
    };

    PicoGL.Mat4x3Uniform.prototype.set = function(value) {
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
            this.cache[11] !== value[11]) {
            this.gl.uniformMatrix4x3fv(this.handle, false, value);
            this.cache.set(value);
        }
    };

})();
;(function() {
    "use strict";

    /**
        Storage for uniform data. Data is stored in std140 layout.

        @class
        @prop {WebGLRenderingContext} gl The WebGL context.
        @prop {WebGLBuffer} buffer Allocated buffer storage.
        @prop {Float32Array} data Buffer data.
        @prop {Object} dataViews Map of base data types to matching ArrayBufferViews of the buffer data.
        @prop {Array} offsets Offsets into the array for each item in the buffer.
        @prop {Array} sizes Size of the item at the given offset.
        @prop {Array} types The base type of the item at the given offset (FLOAT, INT or UNSIGNED_INT).
        @prop {number} size The size of the buffer (in 4-byte items).
        @prop {GLEnum} usage Usage pattern of the buffer.
    */
    PicoGL.UniformBuffer = function UniformBuffer(gl, layout, usage) {
        this.gl = gl;
        this.buffer = gl.createBuffer();
        this.dataViews = {};
        this.offsets = new Array(layout.length);
        this.sizes = new Array(layout.length);
        this.types = new Array(layout.length);
        this.size = 0;
        this.usage = usage || gl.DYNAMIC_DRAW;

        for (var i = 0, len = layout.length; i < len; ++i) {
            var type = layout[i];
            switch(type) { 
                case PicoGL.FLOAT:
                case PicoGL.INT:
                case PicoGL.UNSIGNED_INT:
                case PicoGL.BOOL:
                    this.offsets[i] = this.size;
                    this.sizes[i] = 1;

                    if (type === PicoGL.INT) {
                        this.types[i] = PicoGL.INT;
                    } else if (this.type === PicoGL.UNSIGNED_INT) {
                        this.types[i] = PicoGL.UNSIGNED_INT;
                    } else {
                        this.types[i] = PicoGL.FLOAT;
                    }

                    this.size++;
                    break;
                case PicoGL.FLOAT_VEC2:
                case PicoGL.INT_VEC2:
                case PicoGL.UNSIGNED_INT_VEC2:
                case PicoGL.BOOL_VEC2:
                    this.size += this.size % 2;
                    this.offsets[i] = this.size;
                    this.sizes[i] = 2;
                    
                    if (type === PicoGL.INT_VEC2) {
                        this.types[i] = PicoGL.INT;
                    } else if (this.type === PicoGL.UNSIGNED_INT_VEC2) {
                        this.types[i] = PicoGL.UNSIGNED_INT;
                    } else {
                        this.types[i] = PicoGL.FLOAT;
                    }

                    this.size += 2;
                    break;
                case PicoGL.FLOAT_VEC3:
                case PicoGL.INT_VEC3:
                case PicoGL.UNSIGNED_INT_VEC3:
                case PicoGL.BOOL_VEC3:
                case PicoGL.FLOAT_VEC4:
                case PicoGL.INT_VEC4:
                case PicoGL.UNSIGNED_INT_VEC4:
                case PicoGL.BOOL_VEC4:
                    this.size += (4 - this.size % 4) % 4;
                    this.offsets[i] = this.size;
                    this.sizes[i] = 4;
                    
                    if (type === PicoGL.INT_VEC4 || type === PicoGL.INT_VEC3) {
                        this.types[i] = PicoGL.INT;
                    } else if (this.type === PicoGL.UNSIGNED_INT_VEC4 || this.type === PicoGL.UNSIGNED_INT_VEC3) {
                        this.types[i] = PicoGL.UNSIGNED_INT;
                    } else {
                        this.types[i] = PicoGL.FLOAT;
                    }

                    this.size += 4;
                    break;
                case PicoGL.FLOAT_MAT2:
                case PicoGL.FLOAT_MAT2x3:
                case PicoGL.FLOAT_MAT2x4:
                    this.size += (4 - this.size % 4) % 4;
                    this.offsets[i] = this.size;
                    this.sizes[i] = 8;
                    this.types[i] = PicoGL.FLOAT;

                    this.size += 8;
                    break;
                case PicoGL.FLOAT_MAT3:
                case PicoGL.FLOAT_MAT3x2:
                case PicoGL.FLOAT_MAT3x4:
                    this.size += (4 - this.size % 4) % 4;
                    this.offsets[i] = this.size;
                    this.sizes[i] = 12;
                    this.types[i] = PicoGL.FLOAT;

                    this.size += 12;
                    break;
                case PicoGL.FLOAT_MAT4:
                case PicoGL.FLOAT_MAT4x2:
                case PicoGL.FLOAT_MAT4x3:
                    this.size += (4 - this.size % 4) % 4;
                    this.offsets[i] = this.size;
                    this.sizes[i] = 16;
                    this.types[i] = PicoGL.FLOAT;

                    this.size += 16;
                    break;
                default:
                    console.error("Unsupported type for uniform buffer.");
            }
        }

        this.size += (4 - this.size % 4) % 4;

        this.data = new Float32Array(this.size);
        this.dataViews[PicoGL.FLOAT] = this.data;
        this.dataViews[PicoGL.INT] = new Int32Array(this.data.buffer);
        this.dataViews[PicoGL.UNSIGNED_INT] = new Uint32Array(this.data.buffer);

        this.gl.bindBufferBase(this.gl.UNIFORM_BUFFER, 0, this.buffer);
        this.gl.bufferData(this.gl.UNIFORM_BUFFER, this.size * 4, this.usage);
        this.gl.bindBufferBase(this.gl.UNIFORM_BUFFER, 0, null);
    };

    /**
        Update data for a given item in the buffer. NOTE: Data is not 
        sent the the GPU until the update() method is called!

        @method
        @param {number} index Location in the layout to update.
        @param {ArrayBufferView} value Value to store at the layout location.
    */
    PicoGL.UniformBuffer.prototype.set = function(index, value) {
        var view = this.dataViews[this.types[index]];

        if (this.sizes[index] === 1)  {
            view[this.offsets[index]] = value;
        } else {
            view.set(value, this.offsets[index]);
        }
        
        return this;
    };

    /**
        Send stored buffer data to the GPU.

        @method
    */
    PicoGL.UniformBuffer.prototype.update = function() {
        this.gl.bindBufferBase(this.gl.UNIFORM_BUFFER, 0, this.buffer);
        this.gl.bufferSubData(this.gl.UNIFORM_BUFFER, 0, this.data);
        this.gl.bindBufferBase(this.gl.UNIFORM_BUFFER, 0, null);

        return this;
    };

    /**
        Delete this uniform buffer.

        @method
    */
    PicoGL.UniformBuffer.prototype.delete = function() {
        if (this.buffer) {
            this.gl.deleteBuffer(this.buffer);
            this.buffer = null;
        }
    };

    // Bind this uniform buffer to the given base.
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
        @prop {GLEnum} binding Binding point for the texture.
        @prop {GLEnum} type Type of data stored in the texture.
        @prop {GLEnum} format Layout of texture data.
        @prop {GLEnum} internalFormat Internal arrangement of the texture data.
        @prop {boolean} is3D Whether this texture contains 3D data.
    */
    PicoGL.Texture = function Texture(gl, binding, image, width, height, depth, is3D, options) {
        options = options || PicoGL.DUMMY_OBJECT;
        width = width || options.width || 0;
        height = height || options.height || 0;
        depth = depth || options.depth || 0;

        this.gl = gl;
        this.binding = binding;
        this.texture = gl.createTexture();
        this.format = options.format || gl.RGBA;
        this.type = options.type || gl.UNSIGNED_BYTE;
        this.internalFormat = options.internalFormat || PicoGL.TEXTURE_INTERNAL_FORMAT[this.type][this.format];
        this.is3D = is3D;

        var buffer = !image || !!image.BYTES_PER_ELEMENT;
        var flipY = options.flipY !== undefined ? options.flipY : true;
        var minFilter = options.minFilter || gl.LINEAR_MIPMAP_NEAREST;
        var magFilter = options.magFilter || gl.LINEAR;
        var wrapS = options.wrapS || gl.REPEAT;
        var wrapT = options.wrapT || gl.REPEAT;
        var wrapR = options.wrapR || gl.REPEAT;
        var generateMipmaps = options.generateMipmaps !== false && 
                            (minFilter === gl.LINEAR_MIPMAP_NEAREST || minFilter === gl.LINEAR_MIPMAP_LINEAR);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(this.binding, this.texture);
        
        gl.texParameteri(this.binding, gl.TEXTURE_MAG_FILTER, magFilter);
        gl.texParameteri(this.binding, gl.TEXTURE_MIN_FILTER, minFilter);
        gl.texParameteri(this.binding, gl.TEXTURE_WRAP_S, wrapS);
        gl.texParameteri(this.binding, gl.TEXTURE_WRAP_T, wrapT);

        if (this.is3D) {
            gl.texParameteri(this.binding, gl.TEXTURE_WRAP_R, wrapR);
            gl.texImage3D(this.binding, 0, this.internalFormat, width, height, depth, 0, this.format, this.type, image);
        } else {
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);
            if (buffer) {
                gl.texImage2D(this.binding, 0, this.internalFormat, width, height, 0, this.format, this.type, image);
            } else {
                gl.texImage2D(this.binding, 0, this.internalFormat, this.format, this.type, image);
            }
        }

        if (generateMipmaps) {
            gl.generateMipmap(this.binding);
        }

        gl.bindTexture(this.binding, null);

    };

    /**
        Set the image data for the texture.
    
        @method
        @param {ImageElement|ArrayBufferView} image Image data.
        @param {number} [width] Image width. Required when passing ArrayBufferView data.
        @param {number} [height] Image height. Required when passing ArrayBufferView data.
        @param {number} [depth] Image depth or number of images. Required when passing 3D or texture array data.
    */
    PicoGL.Texture.prototype.image = function(image, width, height, depth) {
        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.bindTexture(this.binding, this.texture);

        if (this.is3D) {
            this.gl.texImage3D(this.binding, 0, this.internalFormat, width, height, depth, 0, this.format, this.type, image);
        } else {
            if (!image || image.BYTES_PER_ELEMENT !== undefined) {
                this.gl.texImage2D(this.binding, 0, this.internalFormat, width, height, 0, this.format, this.type, image);
            } else {
                this.gl.texImage2D(this.binding, 0, this.internalFormat, this.format, this.type, image);
            }
        }

        this.gl.bindTexture(this.binding, null);

        return this;
    };  

    /**
        Delete this texture.

        @method
    */
    PicoGL.Texture.prototype.delete = function() {
        if (this.texture) {
            this.gl.deleteTexture(this.texture);
            this.texture = null;
        }
    }; 

    // Bind this texture to a texture unit.
    PicoGL.Texture.prototype.bind = function(unit) {
        this.gl.activeTexture(PicoGL.TEXTURE_UNIT_MAP[unit]);
        this.gl.bindTexture(this.binding, this.texture);

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
        @prop {GLEnum} type Type of data stored in the texture.
        @prop {GLEnum} format Layout of texture data.
        @prop {GLEnum} internalFormat Internal arrangement of the texture data.
    */
    PicoGL.Cubemap = function Texture(gl, options) {
        options = options || PicoGL.DUMMY_OBJECT;

        this.gl = gl;
        this.texture = gl.createTexture();
        this.format = options.format || gl.RGBA;
        this.type = options.type || gl.UNSIGNED_BYTE;
        this.internalFormat = options.internalFormat || PicoGL.TEXTURE_INTERNAL_FORMAT[this.type][this.format];

        var negX = options.negX;
        var posX = options.posX;
        var negY = options.negY;
        var posY = options.posY;
        var negZ = options.negZ;
        var posZ = options.posZ;
        
        var buffer = !negX || !!negX.BYTES_PER_ELEMENT;
        var width = options.width || 0;
        var height = options.height || 0;
        var flipY = options.flipY !== undefined ? options.flipY : false;
        var minFilter = options.minFilter || gl.LINEAR_MIPMAP_NEAREST;
        var magFilter = options.magFilter || gl.LINEAR;
        var wrapS = options.wrapS || gl.REPEAT;
        var wrapT = options.wrapT || gl.REPEAT;
        var generateMipmaps = options.generateMipmaps !== false && 
                            (minFilter === gl.LINEAR_MIPMAP_NEAREST || minFilter === gl.LINEAR_MIPMAP_LINEAR);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.texture);
        
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, magFilter);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, minFilter);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, wrapS);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, wrapT);

        if (buffer) {
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, this.internalFormat, width, height, 0, this.format, this.type, negX);
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, this.internalFormat, width, height, 0, this.format, this.type, posX);
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, this.internalFormat, width, height, 0, this.format, this.type, negY);
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, this.internalFormat, width, height, 0, this.format, this.type, posY);
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, this.internalFormat, width, height, 0, this.format, this.type, negZ);
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, this.internalFormat, width, height, 0, this.format, this.type, posZ);
        } else {
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, this.internalFormat, this.format, this.type, negX);
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, this.internalFormat, this.format, this.type, posX);
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, this.internalFormat, this.format, this.type, negY);
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, this.internalFormat, this.format, this.type, posY);
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, this.internalFormat, this.format, this.type, negZ);
            gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, this.internalFormat, this.format, this.type, posZ);
        }

        if (generateMipmaps) {
            gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
        }

    };

    /**
        Delete this cubemap.

        @method
    */
    PicoGL.Cubemap.prototype.delete = function() {
        if (this.texture) {
            this.gl.deleteTexture(this.texture);
            this.texture = null;
        }
    };

    // Bind this cubemap to a texture unit.
    PicoGL.Cubemap.prototype.bind = function(unit) {
        this.gl.activeTexture(PicoGL.TEXTURE_UNIT_MAP[unit]);
        this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP, this.texture);

        return this;
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
        @prop {Texture} depthTexture Depth texture target. 
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
    }; 

    /**
        Add a color target to this framebuffer.

        @method
        @param {number} [index=0] Color attachment index.
        @param {GLenum} [type=UNSIGNED_BYTE] Texture data type.
        @param {GLenum} [format=RGBA] Texture data format.
        @param {GLenum} [internalFormat=TEXTURE_INTERNAL_FORMAT[type]] Texture data internal format.
    */
    PicoGL.Framebuffer.prototype.colorTarget = function(index, type, format, internalFormat) {
        index = index || 0;
        type = type || this.gl.UNSIGNED_BYTE;
        format = format || this.gl.RGBA;
        internalFormat = internalFormat || PicoGL.TEXTURE_INTERNAL_FORMAT[type][format];

        this.colorAttachments[index] = this.gl["COLOR_ATTACHMENT" + index];
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.framebuffer);

        this.colorTextures[index] = new PicoGL.Texture(
            this.gl,
            this.gl.TEXTURE_2D,
            null, 
            this.width, 
            this.height, 
            null,
            false,
            {
                type: type,
                format: format,
                internalFormat: internalFormat,
                minFilter: this.gl.NEAREST,
                magFilter: this.gl.NEAREST,
                wrapS: this.gl.CLAMP_TO_EDGE,
                wrapT: this.gl.CLAMP_TO_EDGE,
                generateMipmaps: false
            }
        );

        this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.colorAttachments[index], this.gl.TEXTURE_2D, this.colorTextures[index].texture, 0);
        this.gl.drawBuffers(this.colorAttachments);
        this.numColorTargets++;

        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);

        return this;
    };

    /**
        Add a depth target to this framebuffer.

        @method
        @param {GLenum} [type=UNSIGNED_SHORT] Texture data type.
        @param {GLenum} [internalFormat=TEXTURE_INTERNAL_FORMAT[type]] Texture data internal format.
    */
    PicoGL.Framebuffer.prototype.depthTarget = function(type, internalFormat) {
        var format = this.gl.DEPTH_COMPONENT;  
        type = type || this.gl.UNSIGNED_SHORT;
        internalFormat = internalFormat || PicoGL.TEXTURE_INTERNAL_FORMAT[type][format];

        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.framebuffer);

        this.depthTexture = new PicoGL.Texture(
            this.gl,
            this.gl.TEXTURE_2D,
            null, 
            this.width, 
            this.height, 
            null,
            false,
            {
                type: type,
                format: format,
                internalFormat: internalFormat,
                minFilter: this.gl.NEAREST,
                magFilter: this.gl.NEAREST,
                wrapS: this.gl.CLAMP_TO_EDGE,
                wrapT: this.gl.CLAMP_TO_EDGE,
                generateMipmaps: false
            }
        );

        this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.DEPTH_ATTACHMENT, this.gl.TEXTURE_2D, this.depthTexture.texture, 0);

        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
        
        return this;
    };

    /**
        Bind a new texture as a color target.

        @method
        @param {number} index Color attachment to bind the texture to.
        @param {Texture} texture New texture to bind.
    */
    PicoGL.Framebuffer.prototype.replaceTexture = function(index, texture) {
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

    /**
        Delete this framebuffer.

        @method
    */
    PicoGL.Framebuffer.prototype.delete = function() {
        for (var i = 0; i < this.numColorTargets; ++i) {
            this.colorTextures[i].delete();
        }

        if (this.depthTexture) {
            this.depthTexture.delete();
        }

        if (this.framebuffer) {
            this.gl.deleteFramebuffer(this.framebuffer);
            this.framebuffer = null;
        }
    };

})();
;(function() {
    "use strict";

    /**
        A DrawCall represents the program and values of associated
        attributes, uniforms and textures for a single draw call.

        @class
        @prop {WebGLRenderingContext} gl The WebGL context.
        @prop {Program} currentProgram The program to use for this draw call.
        @prop {VertexArray} currentVertexArray Vertex array to use for this draw call.
        @prop {TransformFeedback} currentTransformFeedback Transform feedback to use for this draw call.
        @prop {Array} uniformBuffers Ordered list of active uniform buffers.
        @prop {Array} uniformBlockNames Ordered list of uniform block names.
        @prop {Object} uniformBlockBases Map of uniform blocks to uniform buffer bases.
        @prop {Number} uniformBlockCount Number of active uniform blocks for this draw call.
        @prop {Object} uniformIndices Map of uniform names to indices in the uniform arrays.
        @prop {Array} uniformNames Ordered list of uniform names.
        @prop {Array} uniformValue Ordered list of uniform values.
        @prop {number} uniformCount The number of active uniforms for this draw call.
        @prop {Array} textures Array of active textures.
        @prop {number} textureCount The number of active textures for this draw call. 
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
        
        this.uniformIndices = {};
        this.uniformNames = new Array(PicoGL.WEBGL_INFO.MAX_UNIFORMS);
        this.uniformValues = new Array(PicoGL.WEBGL_INFO.MAX_UNIFORMS);
        this.uniformCount = 0;
        this.uniformBuffers = new Array(PicoGL.WEBGL_INFO.MAX_UNIFORM_BUFFERS);
        this.uniformBlockNames = new Array(PicoGL.WEBGL_INFO.MAX_UNIFORM_BUFFERS);
        this.uniformBlockBases = {};
        this.uniformBlockCount = 0;
        this.textures = new Array(PicoGL.WEBGL_INFO.MAX_TEXTURE_UNITS);
        this.textureCount = 0;
        this.primitive = primitive !== undefined ? primitive : PicoGL.TRIANGLES;
    };

    /**
        Set the value for a uniform.

        @method
        @param {string} name Uniform name.
        @param {any} value Uniform value.
    */
    PicoGL.DrawCall.prototype.uniform = function(name, value) {
        var index = this.uniformIndices[name];
        if (index === undefined) {
            index = this.uniformCount++;
            this.uniformIndices[name] = index;
            this.uniformNames[index] = name;
        }
        this.uniformValues[index] = value;

        return this;
    };

    /**
        Set texture to bind to a sampler uniform.

        @method
        @param {string} name Sampler uniform name.
        @param {Texture} texture Texture to bind.
    */
    PicoGL.DrawCall.prototype.texture = function(name, texture) {
        var unit;
        var index = this.uniformIndices[name];
        if (index === undefined) {
            unit = this.textureCount++;
            this.uniform(name, unit);
        } else {
            unit = this.uniformValues[index];
        }
        
        this.textures[unit] = texture;
        
        return this;
    };

    /**
        Set uniform buffer to bind to a uniform block.

        @method
        @param {string} name Uniform block name.
        @param {UniformBuffer} buffer Uniform buffer to bind.
    */
    PicoGL.DrawCall.prototype.uniformBlock = function(name, buffer) {
        var base = this.uniformBlockBases[name];
        if (base === undefined) {
            base = this.uniformBlockCount++;
            this.uniformBlockBases[name] = base;
            this.uniformBlockNames[base] = name;
        }
        
        this.uniformBuffers[base] = buffer;
        
        return this;
    };

    // Draw something.
    PicoGL.DrawCall.prototype.draw = function(state) {
        var uniformNames = this.uniformNames;
        var uniformValues = this.uniformValues;
        var uniformBuffers = this.uniformBuffers;
        var uniformBlockNames = this.uniformBlockNames;
        var textures = this.textures;

        if (state.program !== this.currentProgram) {
            this.gl.useProgram(this.currentProgram.program);
            state.program = this.currentProgram;
        }

        for (var uIndex = 0; uIndex < this.uniformCount; ++uIndex) {
            this.currentProgram.uniform(uniformNames[uIndex], uniformValues[uIndex]);
        }

        for (var base = 0; base < this.uniformBlockCount; ++base) {
            this.currentProgram.uniformBlock(uniformBlockNames[base], base);
            uniformBuffers[base].bind(base);
        }

        for (var unit = 0; unit < this.textureCount; ++unit) {
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


;(function() {
    "use strict";

    /**
        Rendering timer.

        @class
        @prop {WebGLRenderingContext} gl The WebGL context.
        @prop {Object} cpuTimer Timer for CPU. Will be window.performance, if available, or window.Date.
        @prop {EXTDisjointTimerQueryWebGL2} gpuTimer Timer for GPU. Only available if 
                EXT_disjoint_timer_query_webgl2 is supported.
        @prop {WebGLQuery} gpuTimerQuery Timer query object for GPU. Only available if 
                EXT_disjoint_timer_query_webgl2 is supported. 
        @prop {boolean} gpuTimerQueryInProgress Whether a gpu timer query is currently in progress.    
        @prop {number} cpuStartTime When the last CPU timing started.
        @prop {number} cpuTime Time spent on the CPU during the last timing. Only valid if App.timerReady() returns true.
        @prop {number} gpuTime Time spent on the GPU during the last timing. Only valid if App.timerReady() returns true.
    */
    PicoGL.Timer = function(gl) {
        this.gl = gl;
        this.cpuTimer = window.performance || window.Date;
        this.gpuTimer = this.gl.getExtension("EXT_disjoint_timer_query_webgl2") || null;
        this.gpuTimerQuery = null;
        if (this.gpuTimer) {
            this.gpuTimerQuery = this.gl.createQuery();
        }
        this.gpuTimerQueryInProgress = false;
        this.cpuStartTime = 0;
        this.cpuTime = 0;
        this.gpuTime = 0;
    };

    // Start the rendering timer.
    PicoGL.Timer.prototype.start = function() {
        if (this.gpuTimer) {
            if (!this.gpuTimerQueryInProgress) {
                this.gl.beginQuery(this.gpuTimer.TIME_ELAPSED_EXT, this.gpuTimerQuery);
                this.cpuStartTime = this.cpuTimer.now();
            }
        } else {
            this.cpuStartTime = this.cpuTimer.now();
        }
    };

    // Stop the rendering timer.
    PicoGL.Timer.prototype.end = function() {
        if (this.gpuTimer) {
            if (!this.gpuTimerQueryInProgress) {
                this.gl.endQuery(this.gpuTimer.TIME_ELAPSED_EXT);
                this.cpuTime = this.cpuTimer.now() - this.cpuStartTime;
                this.gpuTimerQueryInProgress = true;
            }
        } else {
            this.cpuTime = this.cpuTimer.now() - this.cpuStartTime;
        }
    };

    // Check if the rendering time is available. If
    // this method returns true, the cpuTime and
    // gpuTime properties will be set to valid 
    // values.
    PicoGL.Timer.prototype.ready = function() {
        if (this.gpuTimer) {
            if (!this.gpuTimerQueryInProgress) {
                return false;
            }

            var gpuTimerAvailable = this.gl.getQueryParameter(this.gpuTimerQuery, this.gl.QUERY_RESULT_AVAILABLE);
            var gpuTimerDisjoint = this.gl.getParameter(this.gpuTimer.GPU_DISJOINT_EXT);

            if (gpuTimerAvailable) {
                this.gpuTimerQueryInProgress = false;
            }

            if (gpuTimerAvailable && !gpuTimerDisjoint) {
                this.gpuTime = this.gl.getQueryParameter(this.gpuTimerQuery, this.gl.QUERY_RESULT)  / 1000000;
                return true;
            } else {
                return false;
            }
        } else {
            return !!this.cpuStartTime;
        }
    };

})();
