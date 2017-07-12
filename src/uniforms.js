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

// Classes to manage uniform value updates, including
// caching current values.

function SingleComponentUniform(gl, handle, type) {
    this.gl = gl;
    this.handle = handle;
    this.glFuncName = PicoGL.UNIFORM_FUNC_NAME[type];
    this.cache = type === PicoGL.BOOL ? false : 0;
}

SingleComponentUniform.prototype.set = function(value) {
    if (this.cache !== value) {
        this.gl[this.glFuncName](this.handle, value);
        this.cache = value;
    }
};

function MultiNumericUniform(gl, handle, type, count) {
    this.gl = gl;
    this.handle = handle;
    this.glFuncName = PicoGL.UNIFORM_FUNC_NAME[type] + "v";
    this.count = count;
    this.cache = new PicoGL.UNIFORM_CACHE_CLASS[type](PicoGL.UNIFORM_COMPONENT_COUNT[type] * count);
}

MultiNumericUniform.prototype.set = function(value) {
    for (var i = 0, len = value.length; i < len; ++i) {
        if (this.cache[i] !== value[i]) {
            this.gl[this.glFuncName](this.handle, value);
            this.cache.set(value);
            return;
        }
    }
};

function MultiBoolUniform(gl, handle, type, count) {
    this.gl = gl;
    this.handle = handle;
    this.glFuncName = PicoGL.UNIFORM_FUNC_NAME[type] + "v";
    this.count = count;
    this.cache = new Array(PicoGL.UNIFORM_COMPONENT_COUNT[type] * count).fill(false);
}

MultiBoolUniform.prototype.set = function(value) {
    for (var i = 0, len = value.length; i < len; ++i) {
        if (this.cache[i] !== value[i]) {
            this.gl[this.glFuncName](this.handle, value);
            for (var j = i; j < len; j++) {
                this.cache[j] = value[j];
            }
            return;
        }
    }
};

function MatrixUniform(gl, handle, type, count) {
    this.gl = gl;
    this.handle = handle;
    this.glFuncName = PicoGL.UNIFORM_FUNC_NAME[type];
    this.count = count;
    this.cache = new Float32Array(PicoGL.UNIFORM_COMPONENT_COUNT[type] * count);
}

MatrixUniform.prototype.set = function(value) {
    for (var i = 0, len = value.length; i < len; ++i) {
        if (this.cache[i] !== value[i]) {
            this.gl[this.glFuncName](this.handle, false, value);
            this.cache.set(value);
            return;
        }
    }
};

module.exports.MatrixUniform = MatrixUniform;
module.exports.MultiBoolUniform = MultiBoolUniform;
module.exports.MultiNumericUniform = MultiNumericUniform;
module.exports.SingleComponentUniform = SingleComponentUniform;
