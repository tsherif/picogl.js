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

/**
    A DrawCall represents the program and values of associated
    attributes, uniforms and textures for a single draw call.

    @class
    @memberof PicoGL
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
var DrawCall = function(gl, program, vertexArray, primitive) {
    this.gl = gl;
    this.currentProgram = program;
    this.currentVertexArray = vertexArray;
    this.currentTransformFeedback = null;

    this.uniformIndices = {};
    this.uniformNames = new Array(PicoGL.WEBGL_INFO.MAX_UNIFORMS);
    this.uniformValues = new Array(PicoGL.WEBGL_INFO.MAX_UNIFORMS);
    this.uniformCount = 0;
    this.uniformBuffers = new Array(PicoGL.WEBGL_INFO.MAX_UNIFORM_BUFFERS);
    this.uniformBlockNames = new Array(PicoGL.WEBGL_INFO.MAX_UNIFORM_BUFFERS);
    this.uniformBlockBases = {};
    this.uniformBlockCount = 0;
    this.samplerIndices = {};
    this.textures = new Array(PicoGL.WEBGL_INFO.MAX_TEXTURE_UNITS);
    this.textureCount = 0;
    this.primitive = primitive !== undefined ? primitive : PicoGL.TRIANGLES;
};

DrawCall.prototype.transformFeedback = function(transformFeedback) {
    this.currentTransformFeedback = transformFeedback;

    return this;
};

/**
    Set the value for a uniform. Array uniforms are supported by
    using appending "[0]" to the array name and passing a flat array
    with all required values.

    @method
    @param {string} name Uniform name.
    @param {any} value Uniform value.
*/
DrawCall.prototype.uniform = function(name, value) {
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
DrawCall.prototype.texture = function(name, texture) {
    var textureIndex = this.samplerIndices[name];
    if (textureIndex === undefined) {
        textureIndex = this.textureCount++;
        this.samplerIndices[name] = textureIndex;
    }

    this.uniform(name, texture.unit);
    this.textures[textureIndex] = texture;

    return this;
};

/**
    Set uniform buffer to bind to a uniform block.

    @method
    @param {string} name Uniform block name.
    @param {UniformBuffer} buffer Uniform buffer to bind.
*/
DrawCall.prototype.uniformBlock = function(name, buffer) {
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
DrawCall.prototype.draw = function(state) {
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

    for (var tIndex = 0; tIndex < this.textureCount; ++tIndex) {
        textures[tIndex].bind();
    }

    if (state.vertexArray !== this.currentVertexArray) {
        this.currentVertexArray.bind();
        state.vertexArray = this.currentVertexArray;
    }

    if (this.currentTransformFeedback) {
        if (state.transformFeedback !== this.currentTransformFeedback) {
            this.currentTransformFeedback.bind();
        }
        this.gl.beginTransformFeedback(this.primitive);
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
        this.gl.endTransformFeedback();
        // TODO(Tarek): Need to rebind buffers due to bug in ANGLE.
        // Remove this when that's fixed.
        for (var i = 0, len = this.currentTransformFeedback.angleBugBuffers.length; i < len; ++i) {
            this.gl.bindBufferBase(this.gl.TRANSFORM_FEEDBACK_BUFFER, i, null);
        }
    }
};

module.exports = DrawCall;
