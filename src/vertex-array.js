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

import { GL, TYPE_SIZE } from "./constants";

/**
    Organizes vertex buffer and attribute state.

    @class
    @prop {WebGLRenderingContext} gl The WebGL context.
    @prop {WebGLVertexArrayObject} vertexArray Vertex array object.
    @prop {number} numElements Number of elements in the vertex array.
    @prop {boolean} indexed Whether this vertex array is set up for indexed drawing.
    @prop {GLenum} indexType Data type of the indices.
    @prop {boolean} instanced Whether this vertex array is set up for instanced drawing.
    @prop {number} numInstances Number of instances to draw with this vertex array.
    @prop {Object} appState Tracked GL state.
*/
export class VertexArray {
    
    constructor(gl, appState, numElements = 0, numInstances = 0) {
        this.gl = gl;
        this.appState = appState;
        this.vertexArray = null;
        this.numElements = numElements;
        this.indexType = null;
        this.instancedBuffers = 0;
        this.indexed = false;
        this.numInstances = numInstances;
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
        @return {VertexArray} The VertexArray object.
    */
    vertexAttributeBuffer(attributeIndex, vertexBuffer) {
        this.attributeBuffer(attributeIndex, vertexBuffer, false);

        return this;
    }

    /**
        Bind an per-instance attribute buffer to this vertex array.

        @method
        @param {number} attributeIndex The attribute location to bind to.
        @param {VertexBuffer} vertexBuffer The VertexBuffer to bind.
        @return {VertexArray} The VertexArray object.
    */
    instanceAttributeBuffer(attributeIndex, vertexBuffer) {
        this.attributeBuffer(attributeIndex, vertexBuffer, true);

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

    /**
        Bind this vertex array.

        @method
        @ignore
        @return {VertexArray} The VertexArray object.
    */
    bind() {
        if (this.appState.vertexArray !== this) {
            this.gl.bindVertexArray(this.vertexArray);
            this.appState.vertexArray = this;
        }

        return this;
    }

    /**
        Attach an attribute buffer

        @method
        @ignore
        @return {VertexArray} The VertexArray object.
    */
    attributeBuffer(attributeIndex, vertexBuffer, instanced) {
        // allocate at gl level, if necessary
        if (this.vertexArray === null) {
            this.vertexArray = this.gl.createVertexArray();
        }

        this.bind();
        this.gl.bindBuffer(GL.ARRAY_BUFFER, vertexBuffer.buffer);

        let iPointer = vertexBuffer.integer && !vertexBuffer.normalizedIntegers;
        let numColumns = vertexBuffer.numColumns;

        for (let i = 0; i < numColumns; ++i) {
            if (iPointer) {
                this.gl.vertexAttribIPointer(
                    attributeIndex + i,
                    vertexBuffer.itemSize,
                    vertexBuffer.type,
                    numColumns * vertexBuffer.itemSize * TYPE_SIZE[vertexBuffer.type],
                    i * vertexBuffer.itemSize * TYPE_SIZE[vertexBuffer.type]);
            } else {
                this.gl.vertexAttribPointer(
                    attributeIndex + i,
                    vertexBuffer.itemSize,
                    vertexBuffer.type,
                    vertexBuffer.normalizedIntegers,
                    numColumns * vertexBuffer.itemSize * TYPE_SIZE[vertexBuffer.type],
                    i * vertexBuffer.itemSize * TYPE_SIZE[vertexBuffer.type]);
            }

            if (instanced) {
                this.gl.vertexAttribDivisor(attributeIndex + i, 1);
            }

            this.gl.enableVertexAttribArray(attributeIndex + i);
        }

        this.instanced = this.instanced || instanced;

        if (instanced) {
            this.numInstances = vertexBuffer.numItems;
        } else {
            this.numElements = this.numElements || vertexBuffer.numItems;
        }

        this.gl.bindBuffer(GL.ARRAY_BUFFER, null);

        return this;
    }
}
