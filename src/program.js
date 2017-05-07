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

