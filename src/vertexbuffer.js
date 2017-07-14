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

/**
    Storage for vertex data.

    @class
    @hideconstructor
    @prop {WebGLRenderingContext} gl The WebGL context.
    @prop {WebGLBuffer} buffer Allocated buffer storage.
    @prop {GLEnum} type The type of data stored in the buffer.
    @prop {number} itemSize Number of array elements per vertex.
    @prop {number} numItems Number of vertices represented.
    @prop {GLEnum} usage The usage pattern of the buffer.
    @prop {boolean} indexArray Whether this is an index array.
    @prop {GLEnum} binding GL binding point (ARRAY_BUFFER or ELEMENT_ARRAY_BUFFER).
*/
function VertexBuffer(gl, type, itemSize, data, usage, indexArray) {
    var numColumns;
    switch(type) {
        case CONSTANTS.FLOAT_MAT4:
        case CONSTANTS.FLOAT_MAT4x2:
        case CONSTANTS.FLOAT_MAT4x3:
            numColumns = 4;
            break;
        case CONSTANTS.FLOAT_MAT3:
        case CONSTANTS.FLOAT_MAT3x2:
        case CONSTANTS.FLOAT_MAT3x4:
            numColumns = 3;
            break;
        case CONSTANTS.FLOAT_MAT2:
        case CONSTANTS.FLOAT_MAT2x3:
        case CONSTANTS.FLOAT_MAT2x4:
            numColumns = 2;
            break;
        default:
            numColumns = 1;
    }

    switch(type) {
        case CONSTANTS.FLOAT_MAT4:
        case CONSTANTS.FLOAT_MAT3x4:
        case CONSTANTS.FLOAT_MAT2x4:
            itemSize = 4;
            type = CONSTANTS.FLOAT;
            break;
        case CONSTANTS.FLOAT_MAT3:
        case CONSTANTS.FLOAT_MAT4x3:
        case CONSTANTS.FLOAT_MAT2x3:
            itemSize = 3;
            type = CONSTANTS.FLOAT;
            break;
        case CONSTANTS.FLOAT_MAT2:
        case CONSTANTS.FLOAT_MAT3x2:
        case CONSTANTS.FLOAT_MAT4x2:
            itemSize = 2;
            type = CONSTANTS.FLOAT;
            break;
    }

    var dataLength;
    if (typeof data === "number") {
        dataLength = data;
        data *= CONSTANTS.TYPE_SIZE[type];
    } else {
        dataLength = data.length;
    }

    this.gl = gl;
    this.buffer = gl.createBuffer();
    this.type = type;
    this.itemSize = itemSize;
    this.numItems = dataLength / (itemSize * numColumns);
    this.numColumns = numColumns;
    this.usage = usage || gl.STATIC_DRAW;
    this.indexArray = !!indexArray;
    this.binding = this.indexArray ? gl.ELEMENT_ARRAY_BUFFER : gl.ARRAY_BUFFER;

    gl.bindBuffer(this.binding, this.buffer);
    gl.bufferData(this.binding, data, this.usage);
    gl.bindBuffer(this.binding, null);
}

/**
    Update data in this buffer.

    @method
    @param {VertexBufferView} data Data to store in the buffer.
*/
VertexBuffer.prototype.data = function(data) {
    this.gl.bindBuffer(this.binding, this.buffer);
    this.gl.bufferSubData(this.binding, 0, data);
    this.gl.bindBuffer(this.binding, null);

    return this;
};

/**
    Delete this array buffer.

    @method
*/
VertexBuffer.prototype.delete = function() {
    if (this.buffer) {
        this.gl.deleteBuffer(this.buffer);
        this.buffer = null;
    }
};

module.exports = VertexBuffer;
