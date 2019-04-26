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

import { GL, TYPE_SIZE, DUMMY_OBJECT } from "./constants.js";

/**
    Organizes vertex buffer and attribute state.

    @class
    @prop {WebGLRenderingContext} gl The WebGL context.
    @prop {WebGLVertexArrayObject} vertexArray Vertex array object.
    @prop {number} numElements Number of elements in the vertex array.
    @prop {boolean} indexed Whether this vertex array is set up for indexed drawing.
    @prop {GLenum} indexType Data type of the indices.
    @prop {number} numInstances Number of instances to draw with this vertex array.
    @prop {Object} appState Tracked GL state.
*/
export class VertexArray {

    constructor(gl, appState) {
        this.gl = gl;
        this.appState = appState;
        this.vertexArray = null;
        this.indexType = null;
        this.indexed = false;
        this.numElements = 0;
        this.numInstances = 1;
        this.offsets = 0;
        this.numDraws = 1;
    }

    /**
        Restore vertex array after context loss.

        @method
        @return {VertexArray} The VertexArray object.
    */
    restore() {
        if (this.appState.vertexArray === this) {
            this.appState.vertexArray = null;
        }

        // re-allocate at gl level, if necessary
        if (this.vertexArray !== null) {
            this.vertexArray = this.gl.createVertexArray();
        }

        return this;
    }


    /**
        Bind an per-vertex attribute buffer to this vertex array.

        @method
        @param {number} attributeIndex The attribute location to bind to.
        @param {VertexBuffer} vertexBuffer The VertexBuffer to bind.
        @param {Object} [options] Attribute pointer options. These will override those provided in the
            VertexBuffer.
        @param {GLEnum} [options.type] Type of data stored in the buffer.
        @param {GLEnum} [options.size] Number of components per vertex.
        @param {GLEnum} [options.stride] Number of bytes between the start of data for each vertex.
        @param {GLEnum} [options.offset] Number of bytes before the start of data for the first vertex.
        @param {GLEnum} [options.normalized] Data is integer data that should be normalized to a float.
        @param {GLEnum} [options.integer] Pass data as integers.
        @return {VertexArray} The VertexArray object.
    */
    vertexAttributeBuffer(attributeIndex, vertexBuffer, options = DUMMY_OBJECT) {
        this.attributeBuffer(attributeIndex, vertexBuffer, options, false);

        return this;
    }

    /**
        Bind an per-instance attribute buffer to this vertex array.

        @method
        @param {number} attributeIndex The attribute location to bind to.
        @param {VertexBuffer} vertexBuffer The VertexBuffer to bind.
        @param {Object} [options] Attribute pointer options. These will override those provided in the
            VertexBuffer.
        @param {GLEnum} [options.type] Type of data stored in the buffer.
        @param {GLEnum} [options.size] Number of components per vertex.
        @param {GLEnum} [options.stride] Number of bytes between the start of data for each vertex.
        @param {GLEnum} [options.offset] Number of bytes before the start of data for the first vertex.
        @param {GLEnum} [options.normalized] Data is integer data that should be normalized to a float.
        @param {GLEnum} [options.integer] Pass data as integers.
        @return {VertexArray} The VertexArray object.
    */
    instanceAttributeBuffer(attributeIndex, vertexBuffer, options = DUMMY_OBJECT) {
        this.attributeBuffer(attributeIndex, vertexBuffer, options, true);

        return this;
    }

    /**
        Bind an index buffer to this vertex array.

        @method
        @param {VertexBuffer} vertexBuffer The VertexBuffer to bind.
        @return {VertexArray} The VertexArray object.
    */
    indexBuffer(vertexBuffer) {
        // allocate at gl level, if necessary
        if (this.vertexArray === null) {
            this.vertexArray = this.gl.createVertexArray();
        }

        this.bind();
        this.gl.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, vertexBuffer.buffer);

        this.numElements = vertexBuffer.numItems * 3;
        this.indexType = vertexBuffer.type;
        this.indexed = true;

        return this;
    }

    /**
        Delete this vertex array.

        @method
        @return {VertexArray} The VertexArray object.
    */
    delete() {
        if (this.vertexArray) {
            this.gl.deleteVertexArray(this.vertexArray);
            this.vertexArray = null;

            if (this.appState.vertexArray === this) {
                this.gl.bindVertexArray(null);
                this.appState.vertexArray = null;
            }
        }

        return this;
    }

    // Bind this vertex array.
    bind() {
        if (this.appState.vertexArray !== this) {
            this.gl.bindVertexArray(this.vertexArray);
            this.appState.vertexArray = this;
        }

        return this;
    }

    // Generic attribute buffer attachment
    attributeBuffer(attributeIndex, vertexBuffer, options = {}, instanced) {
        // allocate at gl level, if necessary
        if (this.vertexArray === null) {
            this.vertexArray = this.gl.createVertexArray();
        }

        this.bind();
        this.gl.bindBuffer(GL.ARRAY_BUFFER, vertexBuffer.buffer);

        let {
            type = vertexBuffer.type,
            size = vertexBuffer.itemSize,
            stride = 0,
            offset = 0,
            normalized = false,
            integer = Boolean(vertexBuffer.integer && !normalized)
        } = options;

        let numColumns = vertexBuffer.numColumns;

        if (stride === 0) {
            // Set explicitly for matrix buffers
            stride = numColumns * size * TYPE_SIZE[type];
        }

        for (let i = 0; i < numColumns; ++i) {
            if (integer) {
                this.gl.vertexAttribIPointer(
                    attributeIndex + i,
                    size,
                    type,
                    stride,
                    offset + i * size * TYPE_SIZE[type]);
            } else {
                this.gl.vertexAttribPointer(
                    attributeIndex + i,
                    size,
                    type,
                    normalized,
                    stride,
                    offset + i * size * TYPE_SIZE[type]);
            }

            if (instanced) {
                this.gl.vertexAttribDivisor(attributeIndex + i, 1);
            }

            this.gl.enableVertexAttribArray(attributeIndex + i);
        }

        if (this.numDraws === 1) {
            if (instanced) {
                this.numInstances = vertexBuffer.numItems;
            } else {
                this.numElements = this.numElements || vertexBuffer.numItems;
            }
        }

        this.gl.bindBuffer(GL.ARRAY_BUFFER, null);

        return this;
    }
}
