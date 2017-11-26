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

export const CONSTANTS = {};

let canvas = document.createElement("canvas");
let gl = canvas.getContext("webgl2");

if (gl) {
    for (let enumName in gl) {
        if (enumName.match(/^[A-Z0-9_x]+$/) && typeof(gl[enumName]) === "number") {
            CONSTANTS[enumName] = gl[enumName];
        }
    }
}

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
