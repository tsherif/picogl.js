///////////////////////////////////////////////////////////////////////////////////
// The MIT License (MIT)
//
// Copyright (c) 2017 Tarek Sherif
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of
// this software and associated documentation files (the "Software"), to deal in
// the Software without restriction, including without limitation the rights to
// use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
// the Software, and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
// COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
// IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
// CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
///////////////////////////////////////////////////////////////////////////////////

(function() {
    "use strict";

    var NanoGL = window.NanoGL = {};

    (function() {
        var canvas = document.createElement("canvas");
        var gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        
        // Data types
        NanoGL.FLOAT = gl.FLOAT;
        NanoGL.INT = gl.INT;
        NanoGL.SHORT = gl.SHORT;
        NanoGL.BYTE = gl.BYTE;
        NanoGL.UNSIGNED_INT = gl.UNSIGNED_INT;
        NanoGL.UNSIGNED_SHORT = gl.UNSIGNED_SHORT;
        NanoGL.UNSIGNED_BYTE = gl.UNSIGNED_BYTE;
        
        // Depth functions
        NanoGL.NEVER = gl.NEVER;
        NanoGL.LESS = gl.LESS;
        NanoGL.EQUAL = gl.EQUAL;
        NanoGL.LEQUAL = gl.LEQUAL;
        NanoGL.GREATER = gl.GREATER;
        NanoGL.NOTEQUAL = gl.NOTEQUAL;
        NanoGL.GEQUAL = gl.GEQUAL;
        NanoGL.ALWAYS = gl.ALWAYS;
        
        // Blend functions
        NanoGL.ZERO = gl.ZERO;
        NanoGL.ONE = gl.ONE;
        NanoGL.SRC_COLOR = gl.SRC_COLOR;
        NanoGL.ONE_MINUS_SRC_COLOR = gl.ONE_MINUS_SRC_COLOR;
        NanoGL.DST_COLOR = gl.DST_COLOR;
        NanoGL.ONE_MINUS_DST_COLOR = gl.ONE_MINUS_DST_COLOR;
        NanoGL.SRC_ALPHA = gl.SRC_ALPHA;
        NanoGL.ONE_MINUS_SRC_ALPHA = gl.ONE_MINUS_SRC_ALPHA;
        NanoGL.DST_ALPHA = gl.DST_ALPHA;
        NanoGL.ONE_MINUS_DST_ALPHA = gl.ONE_MINUS_DST_ALPHA;
        NanoGL.CONSTANT_COLOR = gl.CONSTANT_COLOR;
        NanoGL.ONE_MINUS_CONSTANT_COLOR = gl.ONE_MINUS_CONSTANT_COLOR;
        NanoGL.CONSTANT_ALPHA = gl.CONSTANT_ALPHA;
        NanoGL.ONE_MINUS_CONSTANT_ALPHA = gl.ONE_MINUS_CONSTANT_ALPHA;
        NanoGL.SRC_ALPHA_SATURATE = gl.SRC_ALPHA_SATURATE;

        // Drawing primitives
        NanoGL.POINTS = gl.POINTS;
        NanoGL.LINE_STRIP = gl.LINE_STRIP;
        NanoGL.LINE_LOOP = gl.LINE_LOOP;
        NanoGL.LINES = gl.LINES;
        NanoGL.TRIANGLE_STRIP = gl.TRIANGLE_STRIP;
        NanoGL.TRIANGLE_FAN = gl.TRIANGLE_FAN;
        NanoGL.TRIANGLES = gl.TRIANGLES;
    })();

    NanoGL.DUMMY_OBJECT = {};
    NanoGL.tmpColor = new Uint8Array(4);

    NanoGL.createApp = function(canvas) {
        return new NanoGL.App(canvas);
    };

    NanoGL.App = function App(canvas) {
        this.canvas = canvas;
        this.gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        this.drawCalls = [];

        this.program = null;
        
        this.gl.viewport(0, 0, canvas.width, canvas.height);

        this.gl.getExtension("WEBGL_depth_texture");
        
        this.drawBuffers = this.gl.getExtension("WEBGL_draw_buffers");
        this.maxDrawBuffers = this.gl.getParameter(this.drawBuffers.MAX_DRAW_BUFFERS_WEBGL);
    }

    NanoGL.App.prototype.clearColor = function(r, g, b, a) {
        this.gl.clearColor(r, g, b, a);
    };

    NanoGL.App.prototype.depthTest = function() {
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.depthMask(true);
        this.gl.disable(this.gl.BLEND);
    };

    NanoGL.App.prototype.depthFunc = function(func) {
        this.gl.depthFunc(func);
    };

    NanoGL.App.prototype.blend = function() {
        this.gl.enable(this.gl.BLEND);
        this.gl.disable(this.gl.DEPTH_TEST);
        this.gl.depthMask(false);
    };

    NanoGL.App.prototype.blendFunc = function(src, dest) {
        this.gl.blendFunc(src, dest);
    };

    NanoGL.App.prototype.cullBackfaces = function() {
        this.gl.enable(this.gl.CULL_FACE);
    };

    NanoGL.App.prototype.drawBackfaces = function() {
        this.gl.disable(this.gl.CULL_FACE);
    };

    NanoGL.App.prototype.readPixel = function(x, y, outVec4) {
        this.gl.readPixels(x, y, 1, 1, this.gl.RGBA, this.gl.UNSIGNED_BYTE, NanoGL.tmpColor);
        outVec4.set(NanoGL.tmpColor);
    };

    NanoGL.App.prototype.createProgram = function(vsSource, fsSource) {
        return new NanoGL.Program(this.gl, vsSource, fsSource);
    };

    NanoGL.App.prototype.createArrayBuffer = function(type, itemSize, data) {
        return new NanoGL.ArrayBuffer(this.gl, type, itemSize, data);
    };

    NanoGL.App.prototype.createIndexBuffer = function(type, itemSize, data) {
        return new NanoGL.ArrayBuffer(this.gl, type, itemSize, data, true);
    };

    NanoGL.App.prototype.createTexture = function(image, options) {
        return new NanoGL.Texture(this.gl, image, options);
    };

    NanoGL.App.prototype.createFramebuffer = function(width, height, numColorTextures) {
        return new NanoGL.Framebuffer(this.gl, this.drawBuffers, width, height, numColorTextures);
    };

    NanoGL.App.prototype.createDrawCall = function(program, primitive) {
        return new NanoGL.DrawCall(this.gl, program, primitive);
    };

    NanoGL.App.prototype.draw = function() {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        for (var i = 0, len = this.drawCalls.length; i < len; i++) {
            this.drawCalls[i].draw(this.currentState);
        }
    };

    NanoGL.DrawCall = function DrawCall(gl, program, primitive) {
        this.gl = gl;
        this.program = program || null;
        this.uniforms = {};
        this.attributes = {};
        this.textures = {};
        this.numItems = 0;
        this.indices = null;
        this.primitive = primitive !== undefined ? primitive : NanoGL.TRIANGLES;
    }

    NanoGL.DrawCall.prototype.setUniform = function(name, value) {
        this.uniforms[name] = value;
    };

    NanoGL.DrawCall.prototype.setAttribute = function(name, buffer) {
        this.attributes[name] = buffer;
        if (this.numItems === 0) {
            this.numItems = buffer.numItems;
        }
    };

    NanoGL.DrawCall.prototype.setIndices = function(buffer) {
        this.indices = buffer;
        this.numItems = buffer.numItems;
    };

    NanoGL.DrawCall.prototype.setTexture = function(name, unit, texture) {
        var textureUnit = this.gl["TEXTURE" + unit];
        this.uniforms[name] = unit;
        this.textures[textureUnit] = texture;
    };

    NanoGL.DrawCall.prototype.draw = function(state) {
        var uniforms = this.uniforms;
        var attributes = this.attributes;
        var textures = this.textures;

        if (app.currentProgram !== this.program) {
            this.program.bind();
            app.currentProgram = this.program;
        }

        for (var uName in uniforms) {
            this.program.setUniform(uName, uniforms[uName]);
        }

        for (var aName in attributes) {
            this.program.bindAttribute(aName, attributes[aName]);
        }

        for (var unit in textures) {
            textures[unit].bind(unit);
        }

        if (this.indices) {
            this.indices.bind();
            this.gl.drawElements(this.primitive, this.numItems * 3, this.indices.type, 0);
        } else {
            this.gl.drawArrays(this.primitive, 0, this.numItems);
        }
    };

    NanoGL.Program = function Program(gl, vsSource, fsSource) {
        var vshader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vshader, vsSource);
        gl.compileShader(vshader);
        if (!gl.getShaderParameter(vshader, gl.COMPILE_STATUS)) {
            console.error(gl.getShaderInfoLog(vshader));
            var lines = vsSource.split("\n");
            for (var i = 0; i < lines.length; ++i) {
                console.error((i + 1) + ":", lines[i]);
            }
        }

        var fshader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fshader, fsSource);
        gl.compileShader(fshader);
        if (!gl.getShaderParameter(fshader, gl.COMPILE_STATUS)) {
            console.error(gl.getShaderInfoLog(fshader));
            var lines = fsSource.split("\n");
            for (var i = 0; i < lines.length; ++i) {
                console.error((i + 1) + ":", lines[i]);
            }
        }

        var program = gl.createProgram();
        gl.attachShader(program, vshader);
        gl.attachShader(program, fshader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
          console.error(gl.getProgramInfoLog(program));
        }

        this.gl = gl;
        this.program = program;
        this.attributes = {};
        this.uniforms = {};

        var numAttributes = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
        var numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);

        for (var i = 0; i < numAttributes; ++i) {
            var attributeInfo = gl.getActiveAttrib(program, i);
            var attributeHandle = this.gl.getAttribLocation(this.program, attributeInfo.name);
            this.attributes[attributeInfo.name] = attributeHandle;
        }

        for (var i = 0; i < numUniforms; ++i) {
            var uniformInfo = gl.getActiveUniform(program, i);
            var uniformHandle = gl.getUniformLocation(this.program, uniformInfo.name);
            var UniformClass = null;
            switch (uniformInfo.type) {
                case gl.INT: 
                case gl.SAMPLER_2D: 
                    UniformClass = NanoGL.IntUniform;
                    break;
                case gl.FLOAT: 
                    UniformClass = NanoGL.FloatUniform;
                    break;
                case gl.FLOAT_VEC2: 
                    UniformClass = NanoGL.Vec2Uniform;
                    break;
                case gl.FLOAT_VEC3: 
                    UniformClass = NanoGL.Vec3Uniform;
                    break;
                case gl.FLOAT_MAT4: 
                    UniformClass = NanoGL.Mat4Uniform;
                    break;
            }

            this.uniforms[uniformInfo.name] = new UniformClass(gl, uniformHandle);
        }
    }

    NanoGL.Program.prototype.bind = function() {
        this.gl.useProgram(this.program);
    };

    NanoGL.Program.prototype.bindAttribute = function(name, buffer) {
        buffer.bind(this.attributes[name]);
    };

    NanoGL.Program.prototype.setUniform = function(name, value) {
        this.uniforms[name].set(value);
    };

    NanoGL.FloatUniform = function FloatUniform(gl, handle) {
        this.gl = gl;
        this.handle = handle;
        this.value = 0;
    }

    NanoGL.FloatUniform.prototype.set = function(value) {
        if (this.value !== value) {
            this.gl.uniform1f(this.handle, value);
            this.value = value;
        }
    }

    NanoGL.IntUniform = function IntUniform(gl, handle) {
        this.gl = gl;
        this.handle = handle;
        this.value = 0;
    }

    NanoGL.IntUniform.prototype.set = function(value) {
        if (this.value !== value) {
            this.gl.uniform1i(this.handle, value);
            this.value = value;
        }
    }

    NanoGL.Vec2Uniform = function Vec2Uniform(gl, handle) {
        this.gl = gl;
        this.handle = handle;
        this.value = new Float32Array(2);
    }

    NanoGL.Vec2Uniform.prototype.set = function(value) {
        if (this.value[0] !== value[0] ||
            this.value[1] !== value[1]) {
            this.gl.uniform2fv(this.handle, value);
            this.value.set(value);
        }
    }

    NanoGL.Vec3Uniform = function Vec3Uniform(gl, handle) {
        this.gl = gl;
        this.handle = handle;
        this.value = new Float32Array(3);
    }

    NanoGL.Vec3Uniform.prototype.set = function(value) {
        if (this.value[0] !== value[0] ||
            this.value[1] !== value[1] ||
            this.value[2] !== value[2]) {
            this.gl.uniform3fv(this.handle, value);
            this.value.set(value);
        }
    }

    NanoGL.Mat4Uniform = function Mat4Uniform(gl, handle) {
        this.gl = gl;
        this.handle = handle;
        this.value = new Float32Array(16);
    }

    NanoGL.Mat4Uniform.prototype.set = function(value) {
        if (this.value[0] !== value[0] ||
            this.value[1] !== value[1] ||
            this.value[2] !== value[2] ||
            this.value[3] !== value[3] ||
            this.value[4] !== value[4] ||
            this.value[5] !== value[5] ||
            this.value[6] !== value[6] ||
            this.value[7] !== value[7] ||
            this.value[8] !== value[8] ||
            this.value[9] !== value[9] ||
            this.value[10] !== value[10] ||
            this.value[11] !== value[11] ||
            this.value[12] !== value[12] ||
            this.value[13] !== value[13] ||
            this.value[14] !== value[14] ||
            this.value[15] !== value[15]) {
            this.gl.uniformMatrix4fv(this.handle, false, value);
            this.value.set(value);
        }
    }

    NanoGL.ArrayBuffer = function ArrayBuffer(gl, type, itemSize, data, indexArray) {
        this.gl = gl;
        this.buffer = gl.createBuffer();
        this.type = type;
        this.itemSize = itemSize;
        this.numItems = data.length / itemSize;
        this.indexArray = !!indexArray;
        this.binding = this.indexArray ? gl.ELEMENT_ARRAY_BUFFER : gl.ARRAY_BUFFER;

        gl.bindBuffer(this.binding, this.buffer);
        gl.bufferData(this.binding, data, gl.STATIC_DRAW);
        gl.bindBuffer(this.binding, null);
    }

    NanoGL.ArrayBuffer.prototype.bind = function(attribute) {
        this.gl.bindBuffer(this.binding, this.buffer);

        if (!this.indexArray) {
            this.gl.vertexAttribPointer(attribute, this.itemSize, this.type, false, 0, 0);
            this.gl.enableVertexAttribArray(attribute); 
        }
    };

    NanoGL.Texture = function Texture(gl, image, options) {
        this.gl = gl;
        this.texture = gl.createTexture();

        options = options || NanoGL.DUMMY_OBJECT;

        var array = options.array || false;;
        var width = options.width || 0;
        var height = options.height || 0;
        var flipY = options.flipY !== undefined ? options.flipY : true;
        var minFilter = options.minFilter || gl.LINEAR_MIPMAP_NEAREST;
        var magFilter = options.magFilter || gl.LINEAR;
        var wrapS = options.wrapS || gl.REPEAT;
        var wrapT = options.wrapT || gl.REPEAT;
        var generateMipmaps = options.generateMipmaps !== false && 
                            (minFilter === gl.LINEAR_MIPMAP_NEAREST || minFilter === gl.LINEAR_MIPMAP_LINEAR);

        var internalFormat = options.internalFormat || gl.RGBA;
        var type = options.type || gl.UNSIGNED_BYTE;

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magFilter);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minFilter);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapS);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapT);

        if (array) {
            gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, width, height, 0, internalFormat, type, null);
        } else {
            gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, internalFormat, type, image);
        }

        if (generateMipmaps) {
            gl.generateMipmap(gl.TEXTURE_2D);
        }

    }

    NanoGL.Texture.prototype.bind = function(unit) {
        this.gl.activeTexture(unit);
        this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
    }

    NanoGL.Framebuffer = function Framebuffer(gl, drawBuffers, width, height, numColorTargets) {
        this.gl = gl;
        this.drawBuffers = drawBuffers;
        this.framebuffer = gl.createFramebuffer();
        this.width = width;
        this.height = height;
        this.numColorTargets = numColorTargets !== undefined ? numColorTargets : 1;
        this.colorTextures = new Array(this.numColorTargets);

        for (var i = 0; i < this.numColorTargets; ++i) {
            this.colorTextures[i] = new NanoGL.Texture(gl, null, {
                array: true,
                width: width,
                height: height,
                minFilter: gl.NEAREST,
                magFilter: gl.NEAREST,
                wrapS: gl.CLAMP_TO_EDGE,
                wrapT: gl.CLAMP_TO_EDGE,
                generateMipmaps: false
            });
        }

        this.depthTexture = new NanoGL.Texture(gl, null, {
            array: true,
            internalFormat: this.gl.DEPTH_COMPONENT,
            type: this.gl.UNSIGNED_INT,
            width: width,
            height: height,
            minFilter: gl.NEAREST,
            magFilter: gl.NEAREST,
            wrapS: gl.CLAMP_TO_EDGE,
            wrapT: gl.CLAMP_TO_EDGE,
            generateMipmaps: false
        });

        this.colorAttachments = new Array(this.numColorTargets);

        gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
        for (var i = 0; i < this.numColorTargets; ++i) {
            this.colorAttachments[i] = this.drawBuffers["COLOR_ATTACHMENT" + i + "_WEBGL"];
            gl.framebufferTexture2D(gl.FRAMEBUFFER, this.colorAttachments[i], gl.TEXTURE_2D, this.colorTextures[i].texture, 0);
        }
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, this.depthTexture.texture, 0);

        if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
            console.log("Frame buffer error: " + gl.checkFramebufferStatus(gl.FRAMEBUFFER).toString());
        }

        this.drawBuffers.drawBuffersWEBGL(this.colorAttachments);

        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }

    NanoGL.Framebuffer.prototype.bind = function() {
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.framebuffer);
    };

    NanoGL.Framebuffer.prototype.unbind = function() {
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
    };

})();

