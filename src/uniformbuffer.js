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
    PicoGL.UniformBuffer = function UniformBuffer(gl, appState, layout, usage) {
        this.gl = gl;
        this.buffer = gl.createBuffer();
        this.dataViews = {};
        this.offsets = new Array(layout.length);
        this.sizes = new Array(layout.length);
        this.types = new Array(layout.length);
        this.size = 0;
        this.usage = usage || gl.DYNAMIC_DRAW;
        this.appState = appState;
        if (appState.freeUniformBufferBases.length > 0) {
            this.bindingIndex = appState.freeUniformBufferBases.pop();
        } else {
            this.bindingIndex = appState.uniformBufferCount % appState.uniformBuffers.length;
            ++appState.uniformBufferCount;
        }


        for (var i = 0, len = layout.length; i < len; ++i) {
            var type = layout[i];
            switch(type) { 
                case PicoGL.FLOAT:
                case PicoGL.INT:
                case PicoGL.UNSIGNED_INT:
                case PicoGL.BOOL:
                    this.offsets[i] = this.size;
                    this.sizes[i] = 1;

                    if (type === PicoGL.INT) {
                        this.types[i] = PicoGL.INT;
                    } else if (this.type === PicoGL.UNSIGNED_INT) {
                        this.types[i] = PicoGL.UNSIGNED_INT;
                    } else {
                        this.types[i] = PicoGL.FLOAT;
                    }

                    this.size++;
                    break;
                case PicoGL.FLOAT_VEC2:
                case PicoGL.INT_VEC2:
                case PicoGL.UNSIGNED_INT_VEC2:
                case PicoGL.BOOL_VEC2:
                    this.size += this.size % 2;
                    this.offsets[i] = this.size;
                    this.sizes[i] = 2;
                    
                    if (type === PicoGL.INT_VEC2) {
                        this.types[i] = PicoGL.INT;
                    } else if (this.type === PicoGL.UNSIGNED_INT_VEC2) {
                        this.types[i] = PicoGL.UNSIGNED_INT;
                    } else {
                        this.types[i] = PicoGL.FLOAT;
                    }

                    this.size += 2;
                    break;
                case PicoGL.FLOAT_VEC3:
                case PicoGL.INT_VEC3:
                case PicoGL.UNSIGNED_INT_VEC3:
                case PicoGL.BOOL_VEC3:
                case PicoGL.FLOAT_VEC4:
                case PicoGL.INT_VEC4:
                case PicoGL.UNSIGNED_INT_VEC4:
                case PicoGL.BOOL_VEC4:
                    this.size += (4 - this.size % 4) % 4;
                    this.offsets[i] = this.size;
                    this.sizes[i] = 4;
                    
                    if (type === PicoGL.INT_VEC4 || type === PicoGL.INT_VEC3) {
                        this.types[i] = PicoGL.INT;
                    } else if (this.type === PicoGL.UNSIGNED_INT_VEC4 || this.type === PicoGL.UNSIGNED_INT_VEC3) {
                        this.types[i] = PicoGL.UNSIGNED_INT;
                    } else {
                        this.types[i] = PicoGL.FLOAT;
                    }

                    this.size += 4;
                    break;
                case PicoGL.FLOAT_MAT2:
                case PicoGL.FLOAT_MAT2x3:
                case PicoGL.FLOAT_MAT2x4:
                    this.size += (4 - this.size % 4) % 4;
                    this.offsets[i] = this.size;
                    this.sizes[i] = 8;
                    this.types[i] = PicoGL.FLOAT;

                    this.size += 8;
                    break;
                case PicoGL.FLOAT_MAT3:
                case PicoGL.FLOAT_MAT3x2:
                case PicoGL.FLOAT_MAT3x4:
                    this.size += (4 - this.size % 4) % 4;
                    this.offsets[i] = this.size;
                    this.sizes[i] = 12;
                    this.types[i] = PicoGL.FLOAT;

                    this.size += 12;
                    break;
                case PicoGL.FLOAT_MAT4:
                case PicoGL.FLOAT_MAT4x2:
                case PicoGL.FLOAT_MAT4x3:
                    this.size += (4 - this.size % 4) % 4;
                    this.offsets[i] = this.size;
                    this.sizes[i] = 16;
                    this.types[i] = PicoGL.FLOAT;

                    this.size += 16;
                    break;
                default:
                    console.error("Unsupported type for uniform buffer.");
            }
        }

        this.size += (4 - this.size % 4) % 4;

        this.data = new Float32Array(this.size);
        this.dataViews[PicoGL.FLOAT] = this.data;
        this.dataViews[PicoGL.INT] = new Int32Array(this.data.buffer);
        this.dataViews[PicoGL.UNSIGNED_INT] = new Uint32Array(this.data.buffer);

        this.bind(true);
        this.gl.bufferData(this.gl.UNIFORM_BUFFER, this.size * 4, this.usage);
    };

    /**
        Update data for a given item in the buffer. NOTE: Data is not 
        sent the the GPU until the update() method is called!

        @method
        @param {number} index Index in the layout of item to set.
        @param {ArrayBufferView} value Value to store at the layout location.
    */
    PicoGL.UniformBuffer.prototype.set = function(index, value) {
        var view = this.dataViews[this.types[index]];

        if (this.sizes[index] === 1)  {
            view[this.offsets[index]] = value;
        } else {
            view.set(value, this.offsets[index]);
        }
        
        return this;
    };

    /**
        Send stored buffer data to the GPU.

        @param {number} [index] Index in the layout of item to send to the GPU. If ommited, entire buffer is sent.
        @method
    */
    PicoGL.UniformBuffer.prototype.update = function(index) {
        var data;
        var offset;
        if (index === undefined) {
            data = this.data;
            offset = 0;
        } else {
            var begin = this.offsets[index];
            var end = begin + this.sizes[index];
            data = this.data.subarray(begin, end);
            offset = begin * 4;
        }

        this.bind(true);
        this.gl.bufferSubData(this.gl.UNIFORM_BUFFER, offset, data);

        return this;
    };

    /**
        Delete this uniform buffer.

        @method
    */
    PicoGL.UniformBuffer.prototype.delete = function() {
        if (this.buffer) {
            this.gl.deleteBuffer(this.buffer);
            this.buffer = null;
            this.appState.freeUniformBufferBases.push(this.bindingIndex);
            this.appState.uniformBuffers[this.bindingIndex] = null;
            this.bindingIndex = -1;
        }
    };

    // Bind this uniform buffer to the given base.
    PicoGL.UniformBuffer.prototype.bind = function(force) {
        if (force || this.appState.uniformBuffers[this.bindingIndex] !== this) {
            this.gl.bindBufferBase(this.gl.UNIFORM_BUFFER, this.bindingIndex, this.buffer);
            this.appState.uniformBuffers[this.bindingIndex] = this;
        }

        return this;
    };

})();
