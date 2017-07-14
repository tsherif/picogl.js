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

var CONSTANTS = {};
var canvas = document.createElement("canvas");
var gl = canvas.getContext("webgl2");

if (gl) {
    for (var enumName in gl) {
        if (enumName.match(/^[A-Z0-9_x]+$/) && typeof(gl[enumName]) === "number") {
            CONSTANTS[enumName] = gl[enumName];
        }
    }
}


CONSTANTS.TEXTURE_INTERNAL_FORMAT = {};
var UNSIGNED_BYTE = CONSTANTS.TEXTURE_INTERNAL_FORMAT[gl.UNSIGNED_BYTE] = {};
UNSIGNED_BYTE[gl.RED] = gl.R8;
UNSIGNED_BYTE[gl.RG] = gl.RG8;
UNSIGNED_BYTE[gl.RGB] = gl.RGB8;
UNSIGNED_BYTE[gl.RGBA] = gl.RGBA8;

var UNSIGNED_SHORT = CONSTANTS.TEXTURE_INTERNAL_FORMAT[gl.UNSIGNED_SHORT] = {};
UNSIGNED_SHORT[gl.DEPTH_COMPONENT] = gl.DEPTH_COMPONENT16;

var FLOAT = CONSTANTS.TEXTURE_INTERNAL_FORMAT[gl.FLOAT] = {};
FLOAT[gl.RED] = gl.R16F;
FLOAT[gl.RG] = gl.RG16F;
FLOAT[gl.RGB] = gl.RGB16F;
FLOAT[gl.RGBA] = gl.RGBA16F;
FLOAT[gl.DEPTH_COMPONENT] = gl.DEPTH_COMPONENT32F;

CONSTANTS.TYPE_SIZE = {};
CONSTANTS.TYPE_SIZE[gl.BYTE]              = 1;
CONSTANTS.TYPE_SIZE[gl.UNSIGNED_BYTE]     = 1;
CONSTANTS.TYPE_SIZE[gl.SHORT]             = 2;
CONSTANTS.TYPE_SIZE[gl.UNSIGNED_SHORT]    = 2;
CONSTANTS.TYPE_SIZE[gl.INT]               = 4;
CONSTANTS.TYPE_SIZE[gl.UNSIGNED_INT]      = 4;
CONSTANTS.TYPE_SIZE[gl.FLOAT]             = 4;

CONSTANTS.WEBGL_INFO = {};
CONSTANTS.WEBGL_INFO.MAX_TEXTURE_UNITS = gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
CONSTANTS.WEBGL_INFO.MAX_UNIFORM_BUFFERS = gl.getParameter(gl.MAX_UNIFORM_BUFFER_BINDINGS);

CONSTANTS.DUMMY_OBJECT = {};

module.exports = CONSTANTS;
