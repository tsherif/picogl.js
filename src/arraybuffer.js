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
        Storage for vertex data.

        @class
        @prop {WebGLRenderingContext} gl The WebGL context.
        @prop {WebGLBuffer} buffer Allocated buffer storage.
        @prop {GLEnum} type The type of data stored in the buffer.
        @prop {number} itemSize Number of array elements per vertex.
        @prop {number} numItems Number of vertices represented.
        @prop {boolean} indexArray Whether this is an index array.
        @prop {GLEnum} binding GL binding point (ARRAY_BUFFER or ELEMENT_ARRAY_BUFFER).
    */
    PicoGL.ArrayBuffer = function ArrayBuffer(gl, type, itemSize, data, usage, indexArray, instanced) {
        var numRows = 1;
        if (type === PicoGL.FLOAT_MAT4) {
            type = PicoGL.FLOAT;
            itemSize = 4;
            numRows = 4;
        } else if (type === PicoGL.FLOAT_MAT3) {
            type = PicoGL.FLOAT;
            itemSize = 3;
            numRows = 3;
        }  else if (type === PicoGL.FLOAT_MAT2) {
            type = PicoGL.FLOAT;
            itemSize = 2;
            numRows = 2;
        }

        this.gl = gl;
        this.buffer = gl.createBuffer();
        this.type = type;
        this.itemSize = itemSize;
        this.numItems = data.length / (itemSize * numRows);
        this.numRows = numRows;
        this.usage = usage || gl.STATIC_DRAW;
        this.indexArray = !!indexArray;
        this.instanced = !!instanced;
        this.binding = this.indexArray ? gl.ELEMENT_ARRAY_BUFFER : gl.ARRAY_BUFFER;

        gl.bindBuffer(this.binding, this.buffer);
        gl.bufferData(this.binding, data, this.usage);
        gl.bindBuffer(this.binding, null);
    };

    PicoGL.ArrayBuffer.prototype.update = function(data) {
        this.gl.bindBuffer(this.binding, this.buffer);
        this.gl.bufferSubData(this.binding, 0, data);
        this.gl.bindBuffer(this.binding, null);

        return this;
    };

    /**
        Bind this array buffer to a program attribute.

        @method
        @param {number} attribute The attribute handle to bind to.
    */
    PicoGL.ArrayBuffer.prototype.bind = function() {
        this.gl.bindBuffer(this.binding, this.buffer);

        return this;
    };

})();
