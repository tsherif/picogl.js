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

var App = require('./app');

/**
    Global PicoGL module. For convenience, all WebGL enums are stored
    as properties of PicoGL (e.g. PicoGL.FLOAT, PicoGL.ONE_MINUS_SRC_ALPHA).

    @namespace PicoGL
*/
var PicoGL = global.PicoGL = {
    version: "%%VERSION%%"
};

var canvas = document.createElement("canvas");
var gl = canvas.getContext("webgl2");

if (gl) {
    for (var enumName in gl) {
        if (enumName.match(/^[A-Z0-9_x]+$/) && typeof(gl[enumName]) === "number") {
            PicoGL[enumName] = gl[enumName];
        }
    }
}


PicoGL.TEXTURE_INTERNAL_FORMAT = {};
var UNSIGNED_BYTE = PicoGL.TEXTURE_INTERNAL_FORMAT[gl.UNSIGNED_BYTE] = {};
UNSIGNED_BYTE[gl.RED] = gl.R8;
UNSIGNED_BYTE[gl.RG] = gl.RG8;
UNSIGNED_BYTE[gl.RGB] = gl.RGB8;
UNSIGNED_BYTE[gl.RGBA] = gl.RGBA8;

var UNSIGNED_SHORT = PicoGL.TEXTURE_INTERNAL_FORMAT[gl.UNSIGNED_SHORT] = {};
UNSIGNED_SHORT[gl.DEPTH_COMPONENT] = gl.DEPTH_COMPONENT16;

var FLOAT = PicoGL.TEXTURE_INTERNAL_FORMAT[gl.FLOAT] = {};
FLOAT[gl.RED] = gl.R16F;
FLOAT[gl.RG] = gl.RG16F;
FLOAT[gl.RGB] = gl.RGB16F;
FLOAT[gl.RGBA] = gl.RGBA16F;
FLOAT[gl.DEPTH_COMPONENT] = gl.DEPTH_COMPONENT32F;

PicoGL.TYPE_SIZE = {};
PicoGL.TYPE_SIZE[gl.BYTE]              = 1;
PicoGL.TYPE_SIZE[gl.UNSIGNED_BYTE]     = 1;
PicoGL.TYPE_SIZE[gl.SHORT]             = 2;
PicoGL.TYPE_SIZE[gl.UNSIGNED_SHORT]    = 2;
PicoGL.TYPE_SIZE[gl.INT]               = 4;
PicoGL.TYPE_SIZE[gl.UNSIGNED_INT]      = 4;
PicoGL.TYPE_SIZE[gl.FLOAT]             = 4;

PicoGL.UNIFORM_FUNC_NAME = {};
PicoGL.UNIFORM_FUNC_NAME[gl.BOOL] = "uniform1i";
PicoGL.UNIFORM_FUNC_NAME[gl.INT] = "uniform1i";
PicoGL.UNIFORM_FUNC_NAME[gl.SAMPLER_2D] = "uniform1i";
PicoGL.UNIFORM_FUNC_NAME[gl.INT_SAMPLER_2D] = "uniform1i";
PicoGL.UNIFORM_FUNC_NAME[gl.UNSIGNED_INT_SAMPLER_2D] = "uniform1i";
PicoGL.UNIFORM_FUNC_NAME[gl.SAMPLER_2D_SHADOW] = "uniform1i";
PicoGL.UNIFORM_FUNC_NAME[gl.SAMPLER_2D_ARRAY] = "uniform1i";
PicoGL.UNIFORM_FUNC_NAME[gl.INT_SAMPLER_2D_ARRAY] = "uniform1i";
PicoGL.UNIFORM_FUNC_NAME[gl.UNSIGNED_INT_SAMPLER_2D_ARRAY] = "uniform1i";
PicoGL.UNIFORM_FUNC_NAME[gl.SAMPLER_2D_ARRAY_SHADOW] = "uniform1i";
PicoGL.UNIFORM_FUNC_NAME[gl.SAMPLER_CUBE] = "uniform1i";
PicoGL.UNIFORM_FUNC_NAME[gl.INT_SAMPLER_CUBE] = "uniform1i";
PicoGL.UNIFORM_FUNC_NAME[gl.UNSIGNED_INT_SAMPLER_CUBE] = "uniform1i";
PicoGL.UNIFORM_FUNC_NAME[gl.SAMPLER_CUBE_SHADOW] = "uniform1i";
PicoGL.UNIFORM_FUNC_NAME[gl.SAMPLER_3D] = "uniform1i";
PicoGL.UNIFORM_FUNC_NAME[gl.INT_SAMPLER_3D] = "uniform1i";
PicoGL.UNIFORM_FUNC_NAME[gl.UNSIGNED_INT_SAMPLER_3D] = "uniform1i";
PicoGL.UNIFORM_FUNC_NAME[gl.UNSIGNED_INT] = "uniform1ui";
PicoGL.UNIFORM_FUNC_NAME[gl.FLOAT] = "uniform1f";
PicoGL.UNIFORM_FUNC_NAME[gl.FLOAT_VEC2] = "uniform2f";
PicoGL.UNIFORM_FUNC_NAME[gl.FLOAT_VEC3] = "uniform3f";
PicoGL.UNIFORM_FUNC_NAME[gl.FLOAT_VEC4] = "uniform4f";
PicoGL.UNIFORM_FUNC_NAME[gl.INT_VEC2] = "uniform2i";
PicoGL.UNIFORM_FUNC_NAME[gl.INT_VEC3] = "uniform3i";
PicoGL.UNIFORM_FUNC_NAME[gl.INT_VEC4] = "uniform4i";
PicoGL.UNIFORM_FUNC_NAME[gl.UNSIGNED_INT_VEC2] = "uniform2ui";
PicoGL.UNIFORM_FUNC_NAME[gl.UNSIGNED_INT_VEC3] = "uniform3ui";
PicoGL.UNIFORM_FUNC_NAME[gl.UNSIGNED_INT_VEC4] = "uniform4ui";
PicoGL.UNIFORM_FUNC_NAME[gl.BOOL_VEC2] = "uniform2i";
PicoGL.UNIFORM_FUNC_NAME[gl.BOOL_VEC3] = "uniform3i";
PicoGL.UNIFORM_FUNC_NAME[gl.BOOL_VEC4] = "uniform4i";
PicoGL.UNIFORM_FUNC_NAME[gl.FLOAT_MAT2] = "uniformMatrix2fv";
PicoGL.UNIFORM_FUNC_NAME[gl.FLOAT_MAT3] = "uniformMatrix3fv";
PicoGL.UNIFORM_FUNC_NAME[gl.FLOAT_MAT4] = "uniformMatrix4fv";
PicoGL.UNIFORM_FUNC_NAME[gl.FLOAT_MAT2x3] = "uniformMatrix2x3fv";
PicoGL.UNIFORM_FUNC_NAME[gl.FLOAT_MAT2x4] = "uniformMatrix2x4fv";
PicoGL.UNIFORM_FUNC_NAME[gl.FLOAT_MAT3x2] = "uniformMatrix3x2fv";
PicoGL.UNIFORM_FUNC_NAME[gl.FLOAT_MAT3x4] = "uniformMatrix3x4fv";
PicoGL.UNIFORM_FUNC_NAME[gl.FLOAT_MAT4x2] = "uniformMatrix4x2fv";
PicoGL.UNIFORM_FUNC_NAME[gl.FLOAT_MAT4x3] = "uniformMatrix4x3fv";

PicoGL.UNIFORM_COMPONENT_COUNT = {};
PicoGL.UNIFORM_COMPONENT_COUNT[gl.BOOL] = 1;
PicoGL.UNIFORM_COMPONENT_COUNT[gl.INT] = 1;
PicoGL.UNIFORM_COMPONENT_COUNT[gl.SAMPLER_2D] = 1;
PicoGL.UNIFORM_COMPONENT_COUNT[gl.INT_SAMPLER_2D] = 1;
PicoGL.UNIFORM_COMPONENT_COUNT[gl.UNSIGNED_INT_SAMPLER_2D] = 1;
PicoGL.UNIFORM_COMPONENT_COUNT[gl.SAMPLER_2D_SHADOW] = 1;
PicoGL.UNIFORM_COMPONENT_COUNT[gl.SAMPLER_2D_ARRAY] = 1;
PicoGL.UNIFORM_COMPONENT_COUNT[gl.INT_SAMPLER_2D_ARRAY] = 1;
PicoGL.UNIFORM_COMPONENT_COUNT[gl.UNSIGNED_INT_SAMPLER_2D_ARRAY] = 1;
PicoGL.UNIFORM_COMPONENT_COUNT[gl.SAMPLER_2D_ARRAY_SHADOW] = 1;
PicoGL.UNIFORM_COMPONENT_COUNT[gl.SAMPLER_CUBE] = 1;
PicoGL.UNIFORM_COMPONENT_COUNT[gl.INT_SAMPLER_CUBE] = 1;
PicoGL.UNIFORM_COMPONENT_COUNT[gl.UNSIGNED_INT_SAMPLER_CUBE] = 1;
PicoGL.UNIFORM_COMPONENT_COUNT[gl.SAMPLER_CUBE_SHADOW] = 1;
PicoGL.UNIFORM_COMPONENT_COUNT[gl.SAMPLER_3D] = 1;
PicoGL.UNIFORM_COMPONENT_COUNT[gl.INT_SAMPLER_3D] = 1;
PicoGL.UNIFORM_COMPONENT_COUNT[gl.UNSIGNED_INT_SAMPLER_3D] = 1;
PicoGL.UNIFORM_COMPONENT_COUNT[gl.UNSIGNED_INT] = 1;
PicoGL.UNIFORM_COMPONENT_COUNT[gl.FLOAT] = 1;
PicoGL.UNIFORM_COMPONENT_COUNT[gl.FLOAT_VEC2] = 2;
PicoGL.UNIFORM_COMPONENT_COUNT[gl.FLOAT_VEC3] = 3;
PicoGL.UNIFORM_COMPONENT_COUNT[gl.FLOAT_VEC4] = 4;
PicoGL.UNIFORM_COMPONENT_COUNT[gl.INT_VEC2] = 2;
PicoGL.UNIFORM_COMPONENT_COUNT[gl.INT_VEC3] = 3;
PicoGL.UNIFORM_COMPONENT_COUNT[gl.INT_VEC4] = 4;
PicoGL.UNIFORM_COMPONENT_COUNT[gl.UNSIGNED_INT_VEC2] = 2;
PicoGL.UNIFORM_COMPONENT_COUNT[gl.UNSIGNED_INT_VEC3] = 3;
PicoGL.UNIFORM_COMPONENT_COUNT[gl.UNSIGNED_INT_VEC4] = 4;
PicoGL.UNIFORM_COMPONENT_COUNT[gl.BOOL_VEC2] = 2;
PicoGL.UNIFORM_COMPONENT_COUNT[gl.BOOL_VEC3] = 3;
PicoGL.UNIFORM_COMPONENT_COUNT[gl.BOOL_VEC4] = 4;
PicoGL.UNIFORM_COMPONENT_COUNT[gl.FLOAT_MAT2] = 4;
PicoGL.UNIFORM_COMPONENT_COUNT[gl.FLOAT_MAT3] = 9;
PicoGL.UNIFORM_COMPONENT_COUNT[gl.FLOAT_MAT4] = 16;
PicoGL.UNIFORM_COMPONENT_COUNT[gl.FLOAT_MAT2x3] = 6;
PicoGL.UNIFORM_COMPONENT_COUNT[gl.FLOAT_MAT2x4] = 8;
PicoGL.UNIFORM_COMPONENT_COUNT[gl.FLOAT_MAT3x2] = 6;
PicoGL.UNIFORM_COMPONENT_COUNT[gl.FLOAT_MAT3x4] = 12;
PicoGL.UNIFORM_COMPONENT_COUNT[gl.FLOAT_MAT4x2] = 8;
PicoGL.UNIFORM_COMPONENT_COUNT[gl.FLOAT_MAT4x3] = 12;

PicoGL.UNIFORM_CACHE_CLASS = {};
PicoGL.UNIFORM_CACHE_CLASS[gl.INT] = Int32Array;
PicoGL.UNIFORM_CACHE_CLASS[gl.SAMPLER_2D] = Int32Array;
PicoGL.UNIFORM_CACHE_CLASS[gl.INT_SAMPLER_2D] = Int32Array;
PicoGL.UNIFORM_CACHE_CLASS[gl.UNSIGNED_INT_SAMPLER_2D] = Int32Array;
PicoGL.UNIFORM_CACHE_CLASS[gl.SAMPLER_2D_SHADOW] = Int32Array;
PicoGL.UNIFORM_CACHE_CLASS[gl.SAMPLER_2D_ARRAY] = Int32Array;
PicoGL.UNIFORM_CACHE_CLASS[gl.INT_SAMPLER_2D_ARRAY] = Int32Array;
PicoGL.UNIFORM_CACHE_CLASS[gl.UNSIGNED_INT_SAMPLER_2D_ARRAY] = Int32Array;
PicoGL.UNIFORM_CACHE_CLASS[gl.SAMPLER_2D_ARRAY_SHADOW] = Int32Array;
PicoGL.UNIFORM_CACHE_CLASS[gl.SAMPLER_CUBE] = Int32Array;
PicoGL.UNIFORM_CACHE_CLASS[gl.INT_SAMPLER_CUBE] = Int32Array;
PicoGL.UNIFORM_CACHE_CLASS[gl.UNSIGNED_INT_SAMPLER_CUBE] = Int32Array;
PicoGL.UNIFORM_CACHE_CLASS[gl.SAMPLER_CUBE_SHADOW] = Int32Array;
PicoGL.UNIFORM_CACHE_CLASS[gl.SAMPLER_3D] = Int32Array;
PicoGL.UNIFORM_CACHE_CLASS[gl.INT_SAMPLER_3D] = Int32Array;
PicoGL.UNIFORM_CACHE_CLASS[gl.UNSIGNED_INT_SAMPLER_3D] = Int32Array;
PicoGL.UNIFORM_CACHE_CLASS[gl.UNSIGNED_INT] = Uint32Array;
PicoGL.UNIFORM_CACHE_CLASS[gl.FLOAT] = Float32Array;
PicoGL.UNIFORM_CACHE_CLASS[gl.FLOAT_VEC2] = Float32Array;
PicoGL.UNIFORM_CACHE_CLASS[gl.FLOAT_VEC3] = Float32Array;
PicoGL.UNIFORM_CACHE_CLASS[gl.FLOAT_VEC4] = Float32Array;
PicoGL.UNIFORM_CACHE_CLASS[gl.INT_VEC2] = Int32Array;
PicoGL.UNIFORM_CACHE_CLASS[gl.INT_VEC3] = Int32Array;
PicoGL.UNIFORM_CACHE_CLASS[gl.INT_VEC4] = Int32Array;
PicoGL.UNIFORM_CACHE_CLASS[gl.UNSIGNED_INT_VEC2] = Uint32Array;
PicoGL.UNIFORM_CACHE_CLASS[gl.UNSIGNED_INT_VEC3] = Uint32Array;
PicoGL.UNIFORM_CACHE_CLASS[gl.UNSIGNED_INT_VEC4] = Uint32Array;


PicoGL.WEBGL_INFO = {};
PicoGL.WEBGL_INFO.MAX_TEXTURE_UNITS = gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
PicoGL.WEBGL_INFO.MAX_UNIFORM_BUFFERS = gl.getParameter(gl.MAX_UNIFORM_BUFFER_BINDINGS);


PicoGL.DUMMY_OBJECT = {};

/**
    Create a PicoGL app. The app is the primary entry point to PicoGL. It stores
    the canvas, the WebGL context and all WebGL state.

    @function PicoGL.createApp
    @param {DOMElement} canvas The canvas on which to create the WebGL context.
    @param {Object} [contextAttributes] Context attributes to pass when calling getContext().
*/
PicoGL.createApp = function(canvas, contextAttributes) {
    return new App(canvas, contextAttributes);
};

module.exports = PicoGL;
