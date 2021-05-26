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

import { GL, TYPE_SIZE } from "./constants.js";

const INTEGER_TYPES = {
    [GL.BYTE]: true,
    [GL.UNSIGNED_BYTE]: true,
    [GL.SHORT]: true,
    [GL.UNSIGNED_SHORT]: true,
    [GL.INT]: true,
    [GL.UNSIGNED_INT]: true
};

/**
    Storage for vertex data.

    @class VertexBuffer
    @prop {WebGLRenderingContext} gl The WebGL context.
    @prop {WebGLBuffer} buffer Allocated buffer storage.
    @prop {GLenum} type The type of data stored in the buffer.
    @prop {number} itemSize Number of array elements per vertex.
    @prop {number} numItems Number of vertices represented.
    @prop {GLenum} usage The usage pattern of the buffer.
    @prop {boolean} indexArray Whether this is an index array.
    @prop {GLenum} binding GL binding point (ARRAY_BUFFER or ELEMENT_ARRAY_BUFFER).
    @prop {Object} appState Tracked GL state.
*/
export class VertexBuffer {

    constructor(gl, appState, type, itemSize, data, usage = gl.STATIC_DRAW, indexArray) {
        let numColumns;
        switch(type) {
            case GL.FLOAT_MAT4:
            case GL.FLOAT_MAT4x2:
            case GL.FLOAT_MAT4x3:
                numColumns = 4;
                break;
            case GL.FLOAT_MAT3:
            case GL.FLOAT_MAT3x2:
            case GL.FLOAT_MAT3x4:
                numColumns = 3;
                break;
            case GL.FLOAT_MAT2:
            case GL.FLOAT_MAT2x3:
            case GL.FLOAT_MAT2x4:
                numColumns = 2;
                break;
            default:
                numColumns = 1;
        }

        switch(type) {
            case GL.FLOAT_MAT4:
            case GL.FLOAT_MAT3x4:
            case GL.FLOAT_MAT2x4:
                itemSize = 4;
                type = GL.FLOAT;
                break;
            case GL.FLOAT_MAT3:
            case GL.FLOAT_MAT4x3:
            case GL.FLOAT_MAT2x3:
                itemSize = 3;
                type = GL.FLOAT;
                break;
            case GL.FLOAT_MAT2:
            case GL.FLOAT_MAT3x2:
            case GL.FLOAT_MAT4x2:
                itemSize = 2;
                type = GL.FLOAT;
                break;
        }

        let dataLength;
        let byteLength;
        if (typeof data === "number") {
            dataLength = data;
            if (type) {
                data *= TYPE_SIZE[type];
            }
            byteLength = data;
        } else {
            dataLength = data.length;
            byteLength = data.byteLength;
        }

        this.gl = gl;
        this.buffer = null;
        this.appState = appState;
        this.type = type;
        this.itemSize = itemSize;  // In bytes for interleaved arrays.
        this.numItems = type ? dataLength / (itemSize * numColumns) : byteLength / itemSize;
        this.numColumns = numColumns;
        this.byteLength = byteLength;
        this.usage = usage;
        this.indexArray = Boolean(indexArray);
        this.integer = Boolean(INTEGER_TYPES[this.type]);
        this.binding = this.indexArray ? GL.ELEMENT_ARRAY_BUFFER : GL.ARRAY_BUFFER;

        this.restore(data);
    }

    /**
        Restore vertex buffer after context loss.

        @method
        @param {ArrayBufferView|number} data Buffer data itself or the total
            number of elements to be allocated.
        @return {VertexBuffer} The VertexBuffer object.
    */
    restore(data) {
        if (!data) {
            data = this.byteLength;
        }

        // Don't want to update vertex array bindings
        if (this.appState.vertexArray) {
            this.gl.bindVertexArray(null);
            this.appState.vertexArray = null;
        }

        this.buffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.binding, this.buffer);
        this.gl.bufferData(this.binding, data, this.usage);
        this.gl.bindBuffer(this.binding, null);

        return this;
    }

    /**
        Update data in this buffer. NOTE: the data must fit
        the originally-allocated buffer!

        @method
        @param {ArrayBufferView} data Data to store in the buffer.
        @param {number} [offset=0] Byte offset into the buffer at which to start writing.
        @param {number} [srcOffset=0] The element index offset to start reading the source buffer.
        @param {number} [length=0] Number of typed elements to copy into the buffer.
        @return {VertexBuffer} The VertexBuffer object.
    */
    data(data, offset = 0, srcOffset = 0, length = 0) {
        // Don't want to update vertex array bindings
        if (this.appState.vertexArray) {
            this.gl.bindVertexArray(null);
            this.appState.vertexArray = null;
        }

        this.gl.bindBuffer(this.binding, this.buffer);
        this.gl.bufferSubData(this.binding, offset, data, srcOffset, length);
        this.gl.bindBuffer(this.binding, null);

        return this;
    }

    /**
        Delete this array buffer.

        @method
        @return {VertexBuffer} The VertexBuffer object.
    */
    delete() {
        if (this.buffer) {
            this.gl.deleteBuffer(this.buffer);
            this.buffer = null;
        }

        return this;
    }

}
