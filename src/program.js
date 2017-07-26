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

"use strict";

var CONSTANTS = require("./constants");
var Shader   = require("./shader");
var Uniforms = require("./uniforms");

/**
    WebGL program consisting of compiled and linked vertex and fragment
    shaders.

    @class
    @prop {WebGLRenderingContext} gl The WebGL context.
    @prop {WebGLProgram} program The WebGL program.
    @prop {boolean} transformFeedback Whether this program is set up for transform feedback.
    @prop {Object} uniforms Map of uniform names to handles.
    @prop {Object} uniformBlocks Map of uniform block names to handles.
    @prop {Object} appState Tracked GL state.
*/
function Program(gl, appState, vsSource, fsSource, xformFeebackVars) {
    var i;

    var vShader, fShader;

    var ownVertexShader = false;
    var ownFragmentShader = false;
    if (typeof vsSource === "string") {
        vShader = new Shader(gl, gl.VERTEX_SHADER, vsSource);
        ownVertexShader = true;
    } else {
        vShader = vsSource;
    }

    if (typeof fsSource === "string") {
        fShader = new Shader(gl, gl.FRAGMENT_SHADER, fsSource);
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
    this.appState = appState;
    this.transformFeedback = !!xformFeebackVars;
    this.uniforms = {};
    this.uniformBlocks = {};
    this.uniformBlockBindings = {};

    var numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);

    for (i = 0; i < numUniforms; ++i) {
        var uniformInfo = gl.getActiveUniform(program, i);
        var uniformHandle = gl.getUniformLocation(this.program, uniformInfo.name);
        var UniformClass = null;
        var type = uniformInfo.type;
        var numElements = uniformInfo.size;

        switch (type) {
            case CONSTANTS.INT:
            case CONSTANTS.SAMPLER_2D:
            case CONSTANTS.INT_SAMPLER_2D:
            case CONSTANTS.UNSIGNED_INT_SAMPLER_2D:
            case CONSTANTS.SAMPLER_2D_SHADOW:
            case CONSTANTS.SAMPLER_2D_ARRAY:
            case CONSTANTS.INT_SAMPLER_2D_ARRAY:
            case CONSTANTS.UNSIGNED_INT_SAMPLER_2D_ARRAY:
            case CONSTANTS.SAMPLER_2D_ARRAY_SHADOW:
            case CONSTANTS.SAMPLER_CUBE:
            case CONSTANTS.INT_SAMPLER_CUBE:
            case CONSTANTS.UNSIGNED_INT_SAMPLER_CUBE:
            case CONSTANTS.SAMPLER_CUBE_SHADOW:
            case CONSTANTS.SAMPLER_3D:
            case CONSTANTS.INT_SAMPLER_3D:
            case CONSTANTS.UNSIGNED_INT_SAMPLER_3D:
            case CONSTANTS.UNSIGNED_INT:
            case CONSTANTS.FLOAT:
                UniformClass = numElements > 1 ? Uniforms.MultiNumericUniform : Uniforms.SingleComponentUniform;
                break;
            case CONSTANTS.BOOL:
                UniformClass = numElements > 1 ? Uniforms.MultiBoolUniform : Uniforms.SingleComponentUniform;
                break;
            case CONSTANTS.FLOAT_VEC2:
            case CONSTANTS.INT_VEC2:
            case CONSTANTS.UNSIGNED_INT_VEC2:
            case CONSTANTS.FLOAT_VEC3:
            case CONSTANTS.INT_VEC3:
            case CONSTANTS.UNSIGNED_INT_VEC3:
            case CONSTANTS.FLOAT_VEC4:
            case CONSTANTS.INT_VEC4:
            case CONSTANTS.UNSIGNED_INT_VEC4:
                UniformClass = Uniforms.MultiNumericUniform;
                break;
            case CONSTANTS.BOOL_VEC2:
            case CONSTANTS.BOOL_VEC3:
            case CONSTANTS.BOOL_VEC4:
                UniformClass = Uniforms.MultiBoolUniform;
                break;
            case CONSTANTS.FLOAT_MAT2:
            case CONSTANTS.FLOAT_MAT3:
            case CONSTANTS.FLOAT_MAT4:
            case CONSTANTS.FLOAT_MAT2x3:
            case CONSTANTS.FLOAT_MAT2x4:
            case CONSTANTS.FLOAT_MAT3x2:
            case CONSTANTS.FLOAT_MAT3x4:
            case CONSTANTS.FLOAT_MAT4x2:
            case CONSTANTS.FLOAT_MAT4x3:
                UniformClass = Uniforms.MatrixUniform;
                break;
            default:
                console.error("Unrecognized type for uniform ", uniformInfo.name);
                break;
        }

        this.uniforms[uniformInfo.name] = new UniformClass(gl, uniformHandle, type, numElements);
    }

    var numUniformBlocks = gl.getProgramParameter(program, gl.ACTIVE_UNIFORM_BLOCKS);

    for (i = 0; i < numUniformBlocks; ++i) {
        var blockName = gl.getActiveUniformBlockName(this.program, i);
        var blockIndex = gl.getUniformBlockIndex(this.program, blockName);

        this.uniformBlocks[blockName] = blockIndex;
    }
}

/**
    Delete this program.

    @method
*/
Program.prototype.delete = function() {
    if (this.program) {
        this.gl.deleteProgram(this.program);
        this.program = null;
    }
};

// Set the value of a uniform.
Program.prototype.uniform = function(name, value) {
    this.uniforms[name].set(value);
};

// Bind a uniform block to a uniform buffer base.
Program.prototype.uniformBlock = function(name, base) {
    if (this.uniformBlockBindings[name] !== base) {
        this.gl.uniformBlockBinding(this.program, this.uniformBlocks[name], base);
        this.uniformBlockBindings[name] = base;
    }
};

// Use this program.
Program.prototype.bind = function() {
    if (this.appState.program !== this) {
        this.gl.useProgram(this.program);
        this.appState.program = this;
    }
};

module.exports = Program;
