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


    /**
        WebGL program consisting of compiled and linked vertex and fragment
        shaders.

        @class
        @prop {WebGLRenderingContext} gl The WebGL context.
        @prop {WebGLProgram} program The WebGL program.
        @prop {Object} attributes Map of attribute names to handles. 
        @prop {Object} uniforms Map of uniform names to handles. 
    */
    PicoGL.Program = function Program(gl, vsSource, fsSource, debug) {
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
        gl.linkProgram(program);

        if (debug && !gl.getProgramParameter(program, gl.LINK_STATUS)) {
          console.error(gl.getProgramInfoLog(program));
        }

        this.gl = gl;
        this.program = program;
        this.attributes = {};
        this.uniforms = {};

        var numAttributes = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
        var numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);

        for (i = 0; i < numAttributes; ++i) {
            var attributeInfo = gl.getActiveAttrib(program, i);
            var attributeHandle = this.gl.getAttribLocation(this.program, attributeInfo.name);
            this.attributes[attributeInfo.name] = attributeHandle;
        }

        for (i = 0; i < numUniforms; ++i) {
            var uniformInfo = gl.getActiveUniform(program, i);
            var uniformHandle = gl.getUniformLocation(this.program, uniformInfo.name);
            var UniformClass = null;

            /*
                const GLenum FLOAT_VEC2                     = 0x8B50;
                    const GLenum FLOAT_VEC3                     = 0x8B51;
                    const GLenum FLOAT_VEC4                     = 0x8B52;
                    const GLenum INT_VEC2                       = 0x8B53;
                    const GLenum INT_VEC3                       = 0x8B54;
                    const GLenum INT_VEC4                       = 0x8B55;
                    const GLenum BOOL                           = 0x8B56;
                    const GLenum BOOL_VEC2                      = 0x8B57;
                    const GLenum BOOL_VEC3                      = 0x8B58;
                    const GLenum BOOL_VEC4                      = 0x8B59;
                    const GLenum FLOAT_MAT2                     = 0x8B5A;
                    const GLenum FLOAT_MAT3                     = 0x8B5B;
                    const GLenum FLOAT_MAT4                     = 0x8B5C;
                    const GLenum SAMPLER_2D                     = 0x8B5E;
                    const GLenum SAMPLER_CUBE 
            */

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
    };

    /**
        Bind an Arraybuffer to a program attribute.

        @method
        @param {string} name Attribute name.
        @param {Arraybuffer} buffer Arraybuffer to bind.
    */
    PicoGL.Program.prototype.attribute = function(name, buffer) {
        buffer.bind(this.attributes[name]);
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

})();

