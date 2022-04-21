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

/**
    A DrawCall represents the program and values of associated
    attributes, uniforms and textures for a single draw call.

    @class DrawCall
    @prop {WebGLRenderingContext} gl The WebGL context.
    @prop {Program} currentProgram The program to use for this draw call.
    @prop {VertexArray} currentVertexArray Vertex array to use for this draw call.
    @prop {TransformFeedback} currentTransformFeedback Transform feedback to use for this draw call.
    @prop {Array} uniformBuffers Ordered list of active uniform buffers.
    @prop {Array} uniformBlockNames Ordered list of uniform block names.
    @prop {Number} uniformBlockCount Number of active uniform blocks for this draw call.
    @prop {Object} uniformIndices Map of uniform names to indices in the uniform arrays.
    @prop {Array} uniformNames Ordered list of uniform names.
    @prop {Array} uniformValue Ordered list of uniform values.
    @prop {number} uniformCount The number of active uniforms for this draw call.
    @prop {Array} textures Array of active textures.
    @prop {number} textureCount The number of active textures for this draw call.
    @prop {Object} appState Tracked GL state.
    @prop {GLsizei} numElements The number of element to draw.
    @prop {GLsizei} numInstances The number of instances to draw.
*/
export class DrawCall {

    constructor(gl, appState, program, vertexArray = null, primitive) {
        this.gl = gl;
        this.currentProgram = program;
        this.drawPrimitive = GL.TRIANGLES;
        this.currentVertexArray = vertexArray;
        this.currentTransformFeedback = null;
        this.appState = appState;

        this.uniformIndices = {};
        this.uniformNames = new Array(WEBGL_INFO.MAX_UNIFORMS);
        this.uniformValues = new Array(WEBGL_INFO.MAX_UNIFORMS);
        this.uniformCount = 0;
        this.uniformBuffers = new Array(WEBGL_INFO.MAX_UNIFORM_BUFFERS);
        this.uniformBlockNames = new Array(WEBGL_INFO.MAX_UNIFORM_BUFFERS);
        this.uniformBlockCount = 0;
        this.textures = new Array(WEBGL_INFO.MAX_TEXTURE_UNITS);
        this.textureCount = 0;

        this.offsets = new Int32Array(1);
        this.numElements = new Int32Array(1);
        this.numInstances = new Int32Array(1);
        this.baseVertices = new Int32Array(1);
        this.baseInstances = new Uint32Array(1);

        this.hasBaseInstancesOrBaseVertices = false;

        this.numDraws = 1;
        this.drawCountsFromVertexArray = true;

        if (primitive !== undefined) {
            console.warn("Primitive argument to 'App.createDrawCall' is deprecated and will be removed. Use 'DrawCall.primitive' instead.");
            this.primitive(primitive);
        }
    }

    /**
        Set the current draw primitive for this draw call.

        @method
        @param {GLenum} primitive Primitive to draw.
        @return {DrawCall} The DrawCall object.
    */
    primitive(primitive) {
        this.drawPrimitive = primitive;

        return this;
    }

    /**
        Set the current TransformFeedback object for draw.

        @method
        @param {TransformFeedback} transformFeedback Transform Feedback to set.
        @return {DrawCall} The DrawCall object.
    */
    transformFeedback(transformFeedback) {
        this.currentTransformFeedback = transformFeedback;

        return this;
    }

    /**
        Set the value for a uniform. Array uniforms are supported by
        using appending "[0]" to the array name and passing a flat array
        with all required values.

        @method
        @param {string} name Uniform name.
        @param {any} value Uniform value.
        @return {DrawCall} The DrawCall object.
    */
    uniform(name, value) {
        let index = this.uniformIndices[name];
        if (index === undefined) {
            index = this.uniformCount++;
            this.uniformIndices[name] = index;
            this.uniformNames[index] = name;
        }
        this.uniformValues[index] = value;

        return this;
    }

    /**
        Set texture to bind to a sampler uniform.

        @method
        @param {string} name Sampler uniform name.
        @param {Texture|Cubemap} texture Texture or Cubemap to bind.
        @return {DrawCall} The DrawCall object.
    */
    texture(name, texture) {
        let unit = this.currentProgram.samplers[name];
        this.textures[unit] = texture;

        return this;
    }

    /**
        Set uniform buffer to bind to a uniform block.

        @method
        @param {string} name Uniform block name.
        @param {UniformBuffer} buffer Uniform buffer to bind.
        @return {DrawCall} The DrawCall object.
    */
    uniformBlock(name, buffer) {
        let base = this.currentProgram.uniformBlocks[name];
        this.uniformBuffers[base] = buffer;

        return this;
    }

    /**
        Ranges in the vertex array to draw. Multiple arguments can be provided to set up
        a multi-draw. Note that after this method is called, draw counts will no longer
        automatically be pulled from the VertexArray.

        @method
        @param {...Array} counts Variable number of 2 or 3 element arrays, each containing:
            <ul>
                <li> (Number) Number of elements to skip at the start of the array.
                <li> (Number) Number of elements to draw.
                <li> (Number - optional) Number of instances to draw of the given range.
                <li> (Number - optional) Base instance to begin drawing.
                <li> (Number - optional) Base vertex to begin drawing.
            </ul>
        @return {DrawCall} The DrawCall object.
    */
    drawRanges(...counts) {
        this.numDraws = counts.length;

        if (this.offsets.length < this.numDraws) {
            this.offsets = new Int32Array(this.numDraws);
        }

        if (this.numElements.length < this.numDraws) {
            this.numElements = new Int32Array(this.numDraws);
        }

        if (this.numInstances.length < this.numDraws) {
            this.numInstances = new Int32Array(this.numDraws);
        }

        if (this.baseInstances.length < this.numDraws) {
            this.baseInstances = new Uint32Array(this.numDraws);
        }

        if (this.baseVertices.length < this.numDraws) {
            this.baseVertices = new Int32Array(this.numDraws);
        }

        for (let i = 0; i < this.numDraws; ++i) {
            let count = counts[i];

            this.offsets[i] = count[0];
            this.numElements[i] = count[1];
            this.numInstances[i] = count[2] || 1;
            this.baseInstances[i] = count[3] || 0;
            this.baseVertices[i] = count[4] || 0;

            this.hasBaseInstancesOrBaseVertices = this.hasBaseInstancesOrBaseVertices
                || this.baseInstances[i]
                || this.baseVertices[i];
        }

        this.drawCountsFromVertexArray = false;

        return this;
    }

    /**
        Draw based on current state.

        @method
        @return {DrawCall} The DrawCall object.
    */
    draw() {
        let uniformNames = this.uniformNames;
        let uniformValues = this.uniformValues;
        let uniformBuffers = this.uniformBuffers;
        let uniformBlockCount = this.currentProgram.uniformBlockCount;
        let textures = this.textures;
        let textureCount = this.currentProgram.samplerCount;
        let indexed = false;

        this.currentProgram.bind();

        if (this.currentVertexArray) {
            this.currentVertexArray.bind();
            indexed = this.currentVertexArray.indexed;

            if (this.drawCountsFromVertexArray) {
                this.numElements[0] = this.currentVertexArray.numElements;
                this.numInstances[0] = this.currentVertexArray.numInstances;
            }
        }

        for (let uIndex = 0; uIndex < this.uniformCount; ++uIndex) {
            this.currentProgram.uniform(uniformNames[uIndex], uniformValues[uIndex]);
        }

        for (let base = 0; base < uniformBlockCount; ++base) {
            uniformBuffers[base].bind(base);
        }

        for (let tIndex = 0; tIndex < textureCount; ++tIndex) {
            textures[tIndex].bind(tIndex);
        }

        if (this.currentTransformFeedback) {
            this.currentTransformFeedback.bind();
            this.gl.beginTransformFeedback(this.drawPrimitive);
        } else if (this.appState.transformFeedback) {
            this.gl.bindTransformFeedback(GL.TRANSFORM_FEEDBACK, null);
            this.appState.transformFeedback = null;
        }

        if (this.hasBaseInstancesOrBaseVertices && !(WEBGL_INFO.DRAW_INSTANCED_BASE_VERTEX_BASE_INSTANCE || WEBGL_INFO.MULTI_DRAW_INSTANCED_BASE_VERTEX_BASE_INSTANCE)) {
            console.warn("DrawCall.draw 'baseInstances' or 'baseVertices' have been set but the required WebGL extensions are not available; 'WEBGL_multidraw_instanced_base_vertex_base_instance' or 'WEBGL_draw_instanced_base_vertex_base_instance' are needed.");
        }

        if (WEBGL_INFO.MULTI_DRAW_INSTANCED_BASE_VERTEX_BASE_INSTANCE) {
            let ext = this.appState.extensions.multiDrawInstancedBaseVertexBaseInstance;
            if (indexed) {
                ext.multiDrawElementsInstancedBaseVertexBaseInstanceWEBGL(this.drawPrimitive, this.numElements, 0, this.currentVertexArray.indexType, this.offsets, 0, this.numInstances, 0, this.baseVertices, 0, this.baseInstances, 0, this.numDraws);
            } else {
                ext.multiDrawArraysInstancedBaseInstanceWEBGL(this.drawPrimitive, this.offsets, 0, this.numElements, 0, this.numInstances, 0, this.baseInstances, 0, this.numDraws);
            }
        } else if (this.hasBaseInstancesOrBaseVertices && WEBGL_INFO.DRAW_INSTANCED_BASE_VERTEX_BASE_INSTANCE) {
            let ext = this.appState.extensions.drawInstancedBaseVertexBaseInstance;
            if (indexed) {
                for (let i = 0; i < this.numDraws; ++i) {
                    ext.drawElementsInstancedBaseVertexBaseInstanceWEBGL(this.drawPrimitive, this.numElements[i], this.currentVertexArray.indexType, this.offsets[i], this.numInstances[i], this.baseVertices[i], this.baseInstances[i]);
                }
            } else {
                for (let i = 0; i < this.numDraws; ++i) {
                    ext.drawArraysInstancedBaseInstanceWEBGL(this.drawPrimitive, this.offsets[i], this.numElements[i], this.numInstances[i], this.baseInstances[i]);
                }
            }
        } else if (WEBGL_INFO.MULTI_DRAW_INSTANCED) {
            let ext = this.appState.extensions.multiDrawInstanced;
            if (indexed) {
                ext.multiDrawElementsInstancedWEBGL(this.drawPrimitive, this.numElements, 0, this.currentVertexArray.indexType, this.offsets, 0, this.numInstances, 0, this.numDraws);
            } else {
                ext.multiDrawArraysInstancedWEBGL(this.drawPrimitive, this.offsets, 0, this.numElements, 0, this.numInstances, 0, this.numDraws);
            }
        } else if (indexed) {
            for (let i = 0; i < this.numDraws; ++i) {
                this.gl.drawElementsInstanced(this.drawPrimitive, this.numElements[i], this.currentVertexArray.indexType, this.offsets[i], this.numInstances[i]);
            }
        } else {
            for (let i = 0; i < this.numDraws; ++i) {
                this.gl.drawArraysInstanced(this.drawPrimitive, this.offsets[i], this.numElements[i], this.numInstances[i]);
            }
        }

        if (this.currentTransformFeedback) {
            this.gl.endTransformFeedback();
        }

        return this;
    }

}
