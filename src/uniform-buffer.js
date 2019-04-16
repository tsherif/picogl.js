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

import { GL } from "./constants.js";

/**
    Storage for uniform data. Data is stored in std140 layout.

    @class
    @prop {WebGLRenderingContext} gl The WebGL context.
    @prop {WebGLBuffer} buffer Allocated buffer storage.
    @prop {Float32Array} data Buffer data.
    @prop {Object} dataViews Map of base data types to matching ArrayBufferViews of the buffer data.
    @prop {Array} offsets Offsets into the array for each item in the buffer.
    @prop {Array} sizes Size of the item at the given offset.
    @prop {Array} types The base type of the item at the given offset (FLOAT, INT or UNSIGNED_INT).
    @prop {number} size The size of the buffer (in 4-byte items).
    @prop {GLEnum} usage Usage pattern of the buffer.
*/
export class UniformBuffer {

    constructor(gl, appState, layout, usage = gl.DYNAMIC_DRAW) {
        this.gl = gl;
        this.buffer = null;
        this.dataViews = {};
        this.offsets = new Array(layout.length);
        this.sizes = new Array(layout.length);
        this.types = new Array(layout.length);
        this.size = 0;
        this.usage = usage;
        this.appState = appState;

        // -1 indicates unbound
        this.currentBase = -1;

        for (let i = 0, len = layout.length; i < len; ++i) {
            let type = layout[i];
            switch(type) {
                case GL.FLOAT:
                case GL.INT:
                case GL.UNSIGNED_INT:
                case GL.BOOL:
                    this.offsets[i] = this.size;
                    this.sizes[i] = 1;

                    if (type === GL.INT) {
                        this.types[i] = GL.INT;
                    } else if (this.type === GL.UNSIGNED_INT) {
                        this.types[i] = GL.UNSIGNED_INT;
                    } else {
                        this.types[i] = GL.FLOAT;
                    }

                    this.size++;
                    break;
                case GL.FLOAT_VEC2:
                case GL.INT_VEC2:
                case GL.UNSIGNED_INT_VEC2:
                case GL.BOOL_VEC2:
                    this.size += this.size % 2;
                    this.offsets[i] = this.size;
                    this.sizes[i] = 2;

                    if (type === GL.INT_VEC2) {
                        this.types[i] = GL.INT;
                    } else if (this.type === GL.UNSIGNED_INT_VEC2) {
                        this.types[i] = GL.UNSIGNED_INT;
                    } else {
                        this.types[i] = GL.FLOAT;
                    }

                    this.size += 2;
                    break;
                case GL.FLOAT_VEC3:
                case GL.INT_VEC3:
                case GL.UNSIGNED_INT_VEC3:
                case GL.BOOL_VEC3:
                case GL.FLOAT_VEC4:
                case GL.INT_VEC4:
                case GL.UNSIGNED_INT_VEC4:
                case GL.BOOL_VEC4:
                    this.size += (4 - this.size % 4) % 4;
                    this.offsets[i] = this.size;
                    this.sizes[i] = 4;

                    if (type === GL.INT_VEC4 || type === GL.INT_VEC3) {
                        this.types[i] = GL.INT;
                    } else if (this.type === GL.UNSIGNED_INT_VEC4 || this.type === GL.UNSIGNED_INT_VEC3) {
                        this.types[i] = GL.UNSIGNED_INT;
                    } else {
                        this.types[i] = GL.FLOAT;
                    }

                    this.size += 4;
                    break;
                case GL.FLOAT_MAT2:
                case GL.FLOAT_MAT2x3:
                case GL.FLOAT_MAT2x4:
                    this.size += (4 - this.size % 4) % 4;
                    this.offsets[i] = this.size;
                    this.sizes[i] = 8;
                    this.types[i] = GL.FLOAT;

                    this.size += 8;
                    break;
                case GL.FLOAT_MAT3:
                case GL.FLOAT_MAT3x2:
                case GL.FLOAT_MAT3x4:
                    this.size += (4 - this.size % 4) % 4;
                    this.offsets[i] = this.size;
                    this.sizes[i] = 12;
                    this.types[i] = GL.FLOAT;

                    this.size += 12;
                    break;
                case GL.FLOAT_MAT4:
                case GL.FLOAT_MAT4x2:
                case GL.FLOAT_MAT4x3:
                    this.size += (4 - this.size % 4) % 4;
                    this.offsets[i] = this.size;
                    this.sizes[i] = 16;
                    this.types[i] = GL.FLOAT;

                    this.size += 16;
                    break;
                default:
                    console.error("Unsupported type for uniform buffer.");
            }
        }

        this.size += (4 - this.size % 4) % 4;

        this.data = new Float32Array(this.size);
        this.dataViews[GL.FLOAT] = this.data;
        this.dataViews[GL.INT] = new Int32Array(this.data.buffer);
        this.dataViews[GL.UNSIGNED_INT] = new Uint32Array(this.data.buffer);

        this.dirtyStart = this.size;
        this.dirtyEnd = 0;

        this.restore();
    }

    /**
        Restore uniform buffer after context loss.

        @method
        @return {UniformBuffer} The UniformBuffer object.
    */
    restore() {
        if (this.currentBase !== -1 && this.appState.uniformBuffers[this.currentBase] === this) {
            this.appState.uniformBuffers[this.currentBase] = null;
        }

        this.buffer = this.gl.createBuffer();
        this.gl.bindBuffer(GL.UNIFORM_BUFFER, this.buffer);
        this.gl.bufferData(GL.UNIFORM_BUFFER, this.size * 4, this.usage);
        this.gl.bindBuffer(GL.UNIFORM_BUFFER, null);

        return this;
    }

    /**
        Update data for a given item in the buffer. NOTE: Data is not
        sent the the GPU until the update() method is called!

        @method
        @param {number} index Index in the layout of item to set.
        @param {ArrayBufferView} value Value to store at the layout location.
        @return {UniformBuffer} The UniformBuffer object.
    */
    set(index, value) {
        let view = this.dataViews[this.types[index]];
        let offset = this.offsets[index];
        let size = this.sizes[index];

        if (this.sizes[index] === 1)  {
            view[offset] = value;
        } else {
            view.set(value, offset);
        }

        if (offset < this.dirtyStart) {
            this.dirtyStart = offset;
        }

        if (this.dirtyEnd < offset + size) {
            this.dirtyEnd = offset + size;
        }

        return this;
    }

    /**
        Send stored buffer data to the GPU.

        @method
        @return {UniformBuffer} The UniformBuffer object.
    */
    update() {
        if (this.dirtyStart >= this.dirtyEnd) {
            return this;
        }

        let data = this.data.subarray(this.dirtyStart, this.dirtyEnd);
        let offset = this.dirtyStart * 4;

        this.gl.bindBuffer(this.gl.UNIFORM_BUFFER, this.buffer);
        this.gl.bufferSubData(this.gl.UNIFORM_BUFFER, offset, data);
        this.gl.bindBuffer(this.gl.UNIFORM_BUFFER, null);

        this.dirtyStart = this.size;
        this.dirtyEnd = 0;

        return this;
    }

    /**
        Delete this uniform buffer.

        @method
        @return {UniformBuffer} The UniformBuffer object.
    */
    delete() {
        if (this.buffer) {
            this.gl.deleteBuffer(this.buffer);
            this.buffer = null;

            if (this.currentBase !== -1 && this.appState.uniformBuffers[this.currentBase] === this) {
                this.appState.uniformBuffers[this.currentBase] = null;
            }
        }

        return this;
    }

    /**
        Bind this uniform buffer to the given base.

        @method
        @ignore
        @return {UniformBuffer} The UniformBuffer object.
    */
    bind(base) {
        let currentBuffer = this.appState.uniformBuffers[base];

        if (currentBuffer !== this) {

            if (currentBuffer) {
                currentBuffer.currentBase = -1;
            }

            if (this.currentBase !== -1) {
                this.appState.uniformBuffers[this.currentBase] = null;
            }

            this.gl.bindBufferBase(this.gl.UNIFORM_BUFFER, base, this.buffer);
            
            this.appState.uniformBuffers[base] = this;
            this.currentBase = base;
        }

        return this;
    }

}
