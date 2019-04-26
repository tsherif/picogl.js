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

import { GL, WEBGL_INFO } from "./constants.js";
import { Shader } from "./shader.js";
import {
    SingleComponentUniform,
    MultiNumericUniform,
    MultiBoolUniform,
    MatrixUniform
} from "./uniforms.js";

/**
    WebGL program consisting of compiled and linked vertex and fragment
    shaders.

    @class
    @prop {WebGLRenderingContext} gl The WebGL context.
    @prop {WebGLProgram} program The WebGL program.
    @prop {boolean} transformFeedback Whether this program is set up for transform feedback.
    @prop {Object} uniforms Map of uniform names to handles.
    @prop {Object} appState Tracked GL state.
*/
export class Program {

    constructor(gl, appState, vsSource, fsSource, xformFeebackVars) {
        this.gl = gl;
        this.appState = appState;
        this.program = null;
        this.transformFeedbackVaryings = xformFeebackVars || null;
        this.uniforms = {};
        this.uniformBlocks = {};
        this.uniformBlockCount = 0;
        this.samplers = {};
        this.samplerCount = 0;

        this.vertexSource = null;
        this.vertexShader = null;
        this.fragmentSource = null;
        this.fragmentShader = null;
        this.linked = false;

        if (typeof vsSource === "string") {
            this.vertexSource = vsSource;
        } else {
            this.vertexShader = vsSource;
        }

        if (typeof fsSource === "string") {
            this.fragmentSource = fsSource;
        } else {
            this.fragmentShader = fsSource;
        }

        this.initialize();
    }

    /**
        Restore program after context loss. Note that this
        will stall for completion. <b>App.restorePrograms</b>
        is the preferred method for program restoration as
        it will parallelize compilation where available.

        @method
        @return {Program} The Program object.
    */
    restore() {
        this.initialize();
        this.link();
        this.checkLinkage();

        return this;
    }

    /**
        Get the vertex shader source translated for the platform's API.

        @method
        @return {String} The translated vertex shader source.
    */
    translatedVertexSource() {
        if (this.vertexShader) {
            return this.vertexShader.translatedSource();
        } else {
            let vertexShader = new Shader(this.gl, this.appState, GL.VERTEX_SHADER, this.vertexSource);
            let translatedSource = vertexShader.translatedSource();
            vertexShader.delete();
            return translatedSource;
        }
    }

    /**
        Get the fragment shader source translated for the platform's API.

        @method
        @return {String} The translated fragment shader source.
    */
    translatedFragmentSource() {
        if (this.fragmentShader) {
            return this.fragmentShader.translatedSource();
        } else {
            let fragmentShader = new Shader(this.gl, this.appState, GL.FRAGMENT_SHADER, this.fragmentSource);
            let translatedSource = fragmentShader.translatedSource();
            fragmentShader.delete();
            return translatedSource;
        }
    }

    /**
        Delete this program.

        @method
        @return {Program} The Program object.
    */
    delete() {
        if (this.program) {
            this.gl.deleteProgram(this.program);
            this.program = null;

            if (this.appState.program === this) {
                this.gl.useProgram(null);
                this.appState.program = null;
            }
        }

        return this;
    }

    // Initialize program state
    initialize() {
        if (this.appState.program === this) {
            this.gl.useProgram(null);
            this.appState.program = null;
        }

        this.linked = false;
        this.uniformBlockCount = 0;
        this.samplerCount = 0;

        if (this.vertexSource) {
            this.vertexShader = new Shader(this.gl, this.appState, GL.VERTEX_SHADER, this.vertexSource);
        }

        if (this.fragmentSource) {
            this.fragmentShader = new Shader(this.gl, this.appState, GL.FRAGMENT_SHADER, this.fragmentSource);
        }

        this.program = this.gl.createProgram();

        return this;
    }

    // Attach shaders and link program.
    // Done as a separate step to avoid stalls on compileShader
    // when doing async compile.
    link() {
        this.gl.attachShader(this.program, this.vertexShader.shader);
        this.gl.attachShader(this.program, this.fragmentShader.shader);
        if (this.transformFeedbackVaryings) {
            this.gl.transformFeedbackVaryings(this.program, this.transformFeedbackVaryings, GL.SEPARATE_ATTRIBS);
        }
        this.gl.linkProgram(this.program);

        return this;
    }

    // Check if compilation is complete
    checkCompletion() {
        if (WEBGL_INFO.PARALLEL_SHADER_COMPILE) {
            return this.gl.getProgramParameter(this.program, GL.COMPLETION_STATUS_KHR);
        }

        return true;
    }

    // Check if program linked.
    // Will stall for completion.
    checkLinkage() {
        if (this.linked) {
            return this;
        }

        if (this.gl.getProgramParameter(this.program, GL.LINK_STATUS)) {
            this.linked = true;
            this.initVariables();
        } else {
            console.error(this.gl.getProgramInfoLog(this.program));
            this.vertexShader.checkCompilation();
            this.fragmentShader.checkCompilation();
        }

        if (this.vertexSource) {
            this.vertexShader.delete();
            this.vertexShader = null;
        }

        if (this.fragmentSource) {
            this.fragmentShader.delete();
            this.fragmentShader = null;
        }

        return this;
    }

    // Get variable handles from program
    initVariables() {
        this.bind();

        let numUniforms = this.gl.getProgramParameter(this.program, GL.ACTIVE_UNIFORMS);
        let textureUnit;

        for (let i = 0; i < numUniforms; ++i) {
            let uniformInfo = this.gl.getActiveUniform(this.program, i);
            let uniformHandle = this.gl.getUniformLocation(this.program, uniformInfo.name);
            let UniformClass = null;
            let type = uniformInfo.type;
            let numElements = uniformInfo.size;

            switch (type) {
                case GL.SAMPLER_2D:
                case GL.INT_SAMPLER_2D:
                case GL.UNSIGNED_INT_SAMPLER_2D:
                case GL.SAMPLER_2D_SHADOW:
                case GL.SAMPLER_2D_ARRAY:
                case GL.INT_SAMPLER_2D_ARRAY:
                case GL.UNSIGNED_INT_SAMPLER_2D_ARRAY:
                case GL.SAMPLER_2D_ARRAY_SHADOW:
                case GL.SAMPLER_CUBE:
                case GL.INT_SAMPLER_CUBE:
                case GL.UNSIGNED_INT_SAMPLER_CUBE:
                case GL.SAMPLER_CUBE_SHADOW:
                case GL.SAMPLER_3D:
                case GL.INT_SAMPLER_3D:
                case GL.UNSIGNED_INT_SAMPLER_3D:
                    textureUnit = this.samplerCount++;
                    this.samplers[uniformInfo.name] = textureUnit;
                    this.gl.uniform1i(uniformHandle, textureUnit);
                    break;
                case GL.INT:
                case GL.UNSIGNED_INT:
                case GL.FLOAT:
                    UniformClass = numElements > 1 ? MultiNumericUniform : SingleComponentUniform;
                    break;
                case GL.BOOL:
                    UniformClass = numElements > 1 ? MultiBoolUniform : SingleComponentUniform;
                    break;
                case GL.FLOAT_VEC2:
                case GL.INT_VEC2:
                case GL.UNSIGNED_INT_VEC2:
                case GL.FLOAT_VEC3:
                case GL.INT_VEC3:
                case GL.UNSIGNED_INT_VEC3:
                case GL.FLOAT_VEC4:
                case GL.INT_VEC4:
                case GL.UNSIGNED_INT_VEC4:
                    UniformClass = MultiNumericUniform;
                    break;
                case GL.BOOL_VEC2:
                case GL.BOOL_VEC3:
                case GL.BOOL_VEC4:
                    UniformClass = MultiBoolUniform;
                    break;
                case GL.FLOAT_MAT2:
                case GL.FLOAT_MAT3:
                case GL.FLOAT_MAT4:
                case GL.FLOAT_MAT2x3:
                case GL.FLOAT_MAT2x4:
                case GL.FLOAT_MAT3x2:
                case GL.FLOAT_MAT3x4:
                case GL.FLOAT_MAT4x2:
                case GL.FLOAT_MAT4x3:
                    UniformClass = MatrixUniform;
                    break;
                default:
                    console.error("Unrecognized type for uniform ", uniformInfo.name);
                    break;
            }

            if (UniformClass) {
                this.uniforms[uniformInfo.name] = new UniformClass(this.gl, uniformHandle, type, numElements);
            }
        }

        let numUniformBlocks = this.gl.getProgramParameter(this.program, GL.ACTIVE_UNIFORM_BLOCKS);

        for (let i = 0; i < numUniformBlocks; ++i) {
            let blockName = this.gl.getActiveUniformBlockName(this.program, i);
            let blockIndex = this.gl.getUniformBlockIndex(this.program, blockName);

            let uniformBlockBase = this.uniformBlockCount++;
            this.gl.uniformBlockBinding(this.program, blockIndex, uniformBlockBase);
            this.uniformBlocks[blockName] = uniformBlockBase;
        }
    }

    // Set the value of a uniform.
    uniform(name, value) {
        this.uniforms[name].set(value);

        return this;
    }

    // Use this program.
    bind() {
        if (this.appState.program !== this) {
            this.gl.useProgram(this.program);
            this.appState.program = this;
        }

        return this;
    }
}
