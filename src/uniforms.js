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

    // Classes to manage uniform value updates, including
    // caching current values.

    PicoGL.FloatUniform = function FloatUniform(gl, handle) {
        this.gl = gl;
        this.handle = handle;
        this.cache = 0;
    };

    PicoGL.FloatUniform.prototype.set = function(value) {
        if (this.cache !== value) {
            this.gl.uniform1f(this.handle, value);
            this.cache = value;
        }
    };

    PicoGL.FloatArrayUniform = function FloatArrayUniform(gl, handle, count) {
        this.gl = gl;
        this.handle = handle;
        this.count = count;
        this.cache = new Float32Array(count);
    };

    PicoGL.FloatArrayUniform.prototype.set = function(value) {
        for (var i = 0, len = value.length; i < len; i++) {
            if (this.cache[i] !== value[i]) {
                this.gl.uniform1fv(this.handle, value);
                this.cache.set(value);
                return;
            }
        }
    };

    PicoGL.IntUniform = function IntUniform(gl, handle) {
        this.gl = gl;
        this.handle = handle;
        this.cache = 0;
    };

    PicoGL.IntUniform.prototype.set = function(value) {
        if (this.cache !== value) {
            this.gl.uniform1i(this.handle, value);
            this.cache = value;
        }
    };

    PicoGL.IntArrayUniform = function IntArrayUniform(gl, handle, count) {
        this.gl = gl;
        this.handle = handle;
        this.count = count;
        this.cache = new Int32Array(count);
    };

    PicoGL.IntArrayUniform.prototype.set = function(value) {
        for (var i = 0, len = value.length; i < len; i++) {
            if (this.cache[i] !== value[i]) {
                this.gl.uniform1iv(this.handle, value);
                this.cache.set(value);
                return;
            }
        }
    };

    PicoGL.UintUniform = function UintUniform(gl, handle) {
        this.gl = gl;
        this.handle = handle;
        this.cache = 0;
    };

    PicoGL.UintUniform.prototype.set = function(value) {
        if (this.cache !== value) {
            this.gl.uniform1ui(this.handle, value);
            this.cache = value;
        }
    };

    PicoGL.UintArrayUniform = function UintArrayUniform(gl, handle, count) {
        this.gl = gl;
        this.handle = handle;
        this.count = count;
        this.cache = new Uint32Array(count);
    };

    PicoGL.UintArrayUniform.prototype.set = function(value) {
        for (var i = 0, len = value.length; i < len; i++) {
            if (this.cache[i] !== value[i]) {
                this.gl.uniform1uiv(this.handle, value);
                this.cache.set(value);
                return;
            }
        }
    };

    PicoGL.BoolArrayUniform = function BoolArrayUniform(gl, handle, count) {
        this.gl = gl;
        this.handle = handle;
        this.count = count;
        this.cache = new Array(count).fill(false);
    };

    PicoGL.BoolArrayUniform.prototype.set = function(value) {
        var len = value.length;
        for (var i = 0; i < len; i++) {
            if (this.cache[i] !== value[i]) {
                this.gl.uniform1iv(this.handle, value);
                for (var j = i; j < len; j++) {
                    this.cache[j] = value[j];
                }
                return;
            }
        }
    };

    PicoGL.Vec2Uniform = function Vec2Uniform(gl, handle, count) {
        this.gl = gl;
        this.handle = handle;
        this.count = count;
        this.cache = new Float32Array(2 * count);
    };

    PicoGL.Vec2Uniform.prototype.set = function(value) {
        for (var i = 0, len = value.length; i < len; i++) {
            if (this.cache[i] !== value[i]) {
                this.gl.uniform2fv(this.handle, value);
                this.cache.set(value);
                return;
            }
        }
    };

    PicoGL.Vec3Uniform = function Vec3Uniform(gl, handle, count) {
        this.gl = gl;
        this.handle = handle;
        this.count = count;
        this.cache = new Float32Array(3 * count);
    };

    PicoGL.Vec3Uniform.prototype.set = function(value) {
        for (var i = 0, len = value.length; i < len; i++) {
            if (this.cache[i] !== value[i]) {
                this.gl.uniform3fv(this.handle, value);
                this.cache.set(value);
                return;
            }
        }
    };

    PicoGL.Vec4Uniform = function Vec4Uniform(gl, handle, count) {
        this.gl = gl;
        this.handle = handle;
        this.count = count;
        this.cache = new Float32Array(4 * count);
    };

    PicoGL.Vec4Uniform.prototype.set = function(value) {
        for (var i = 0, len = value.length; i < len; i++) {
            if (this.cache[i] !== value[i]) {
                this.gl.uniform4fv(this.handle, value);
                this.cache.set(value);
                return;
            }
        }
    };

    PicoGL.IntVec2Uniform = function IntVec2Uniform(gl, handle, count) {
        this.gl = gl;
        this.handle = handle;
        this.count = count;
        this.cache = new Int32Array(2 * count);
    };

    PicoGL.IntVec2Uniform.prototype.set = function(value) {
        for (var i = 0, len = value.length; i < len; i++) {
            if (this.cache[i] !== value[i]) {
                this.gl.uniform2iv(this.handle, value);
                this.cache.set(value);
                return;
            }
        }
    };

    PicoGL.IntVec3Uniform = function IntVec3Uniform(gl, handle, count) {
        this.gl = gl;
        this.handle = handle;
        this.count = count;
        this.cache = new Int32Array(3 * count);
    };

    PicoGL.IntVec3Uniform.prototype.set = function(value) {
        for (var i = 0, len = value.length; i < len; i++) {
            if (this.cache[i] !== value[i]) {
                this.gl.uniform3iv(this.handle, value);
                this.cache.set(value);
                return;
            }
        }
    };

    PicoGL.IntVec4Uniform = function IntVec4Uniform(gl, handle, count) {
        this.gl = gl;
        this.handle = handle;
        this.count = count;
        this.cache = new Int32Array(4 * count);
    };

    PicoGL.IntVec4Uniform.prototype.set = function(value) {
        for (var i = 0, len = value.length; i < len; i++) {
            if (this.cache[i] !== value[i]) {
                this.gl.uniform4iv(this.handle, value);
                this.cache.set(value);
                return;
            }
        }
    };

    PicoGL.UintVec2Uniform = function UintVec2Uniform(gl, handle, count) {
        this.gl = gl;
        this.handle = handle;
        this.count = count;
        this.cache = new Uint32Array(2 * count);
    };

    PicoGL.UintVec2Uniform.prototype.set = function(value) {
        for (var i = 0, len = value.length; i < len; i++) {
            if (this.cache[i] !== value[i]) {
                this.gl.uniform2uiv(this.handle, value);
                this.cache.set(value);
                return;
            }
        }
    };

    PicoGL.UintVec3Uniform = function UintVec3Uniform(gl, handle, count) {
        this.gl = gl;
        this.handle = handle;
        this.count = count;
        this.cache = new Uint32Array(3 * count);
    };

    PicoGL.UintVec3Uniform.prototype.set = function(value) {
        for (var i = 0, len = value.length; i < len; i++) {
            if (this.cache[i] !== value[i]) {
                this.gl.uniform3uiv(this.handle, value);
                this.cache.set(value);
                return;
            }
        }
    };

    PicoGL.UintVec4Uniform = function UintVec4Uniform(gl, handle, count) {
        this.gl = gl;
        this.handle = handle;
        this.count = count;
        this.cache = new Uint32Array(4 * count);
    };

    PicoGL.UintVec4Uniform.prototype.set = function(value) {
        for (var i = 0, len = value.length; i < len; i++) {
            if (this.cache[i] !== value[i]) {
                this.gl.uniform4uiv(this.handle, value);
                this.cache.set(value);
                return;
            }
        }
    };

    PicoGL.BoolVec2Uniform = function BoolVec2Uniform(gl, handle, count) {
        this.gl = gl;
        this.handle = handle;
        this.count = count;
        this.cache = new Array(2 * count).fill(false);
    };

    PicoGL.BoolVec2Uniform.prototype.set = function(value) {
        var len = value.length;
        for (var i = 0; i < len; i++) {
            if (this.cache[i] !== value[i]) {
                this.gl.uniform2iv(this.handle, value);
                for (var j = i; j < len; j++) {
                    this.cache[j] = value[j];
                }
                return;
            }
        }
    };

    PicoGL.BoolVec3Uniform = function BoolVec3Uniform(gl, handle, count) {
        this.gl = gl;
        this.handle = handle;
        this.count = count;
        this.cache = new Array(3 * count).fill(false);
    };

    PicoGL.BoolVec3Uniform.prototype.set = function(value) {
        var len = value.length;
        for (var i = 0; i < len; i++) {
            if (this.cache[i] !== value[i]) {
                this.gl.uniform3iv(this.handle, value);
                for (var j = i; j < len; j++) {
                    this.cache[j] = value[j];
                }
                return;
            }
        }
    };

    PicoGL.BoolVec4Uniform = function BoolVec4Uniform(gl, handle, count) {
        this.gl = gl;
        this.handle = handle;
        this.count = count;
        this.cache = new Array(4 * count).fill(false);
    };

    PicoGL.BoolVec4Uniform.prototype.set = function(value) {
        var len = value.length;
        for (var i = 0; i < len; i++) {
            if (this.cache[i] !== value[i]) {
                this.gl.uniform4iv(this.handle, value);
                for (var j = i; j < len; j++) {
                    this.cache[j] = value[j];
                }
                return;
            }
        }
    };

    PicoGL.Mat2Uniform = function Mat2Uniform(gl, handle, count) {
        this.gl = gl;
        this.handle = handle;
        this.count = count;
        this.cache = new Float32Array(4 * count);
    };

    PicoGL.Mat2Uniform.prototype.set = function(value) {
        for (var i = 0, len = value.length; i < len; i++) {
            if (this.cache[i] !== value[i]) {
                this.gl.uniformMatrix2fv(this.handle, false, value);
                this.cache.set(value);
                return;
            }
        }
    };

    PicoGL.Mat3Uniform = function Mat3Uniform(gl, handle, count) {
        this.gl = gl;
        this.handle = handle;
        this.count = count;
        this.cache = new Float32Array(9 * count);
    };

    PicoGL.Mat3Uniform.prototype.set = function(value) {
        for (var i = 0, len = value.length; i < len; i++) {
            if (this.cache[i] !== value[i]) {
                this.gl.uniformMatrix3fv(this.handle, false, value);
                this.cache.set(value);
                return;
            }
        }
    };

    PicoGL.Mat4Uniform = function Mat4Uniform(gl, handle, count) {
        this.gl = gl;
        this.handle = handle;
        this.count = count;
        this.cache = new Float32Array(16 * count);
    };

    PicoGL.Mat4Uniform.prototype.set = function(value) {
        for (var i = 0, len = value.length; i < len; i++) {
            if (this.cache[i] !== value[i]) {
                this.gl.uniformMatrix4fv(this.handle, false, value);
                this.cache.set(value);
                return;
            }
        }
    };

    PicoGL.Mat2x3Uniform = function Mat2x3Uniform(gl, handle, count) {
        this.gl = gl;
        this.handle = handle;
        this.count = count;
        this.cache = new Float32Array(6 * count);
    };

    PicoGL.Mat2x3Uniform.prototype.set = function(value) {
        for (var i = 0, len = value.length; i < len; i++) {
            if (this.cache[i] !== value[i]) {
                this.gl.uniformMatrix2x3fv(this.handle, false, value);
                this.cache.set(value);
                return;
            }
        }
    };

    PicoGL.Mat2x4Uniform = function Mat2x4Uniform(gl, handle, count) {
        this.gl = gl;
        this.handle = handle;
        this.count = count;
        this.cache = new Float32Array(8 * count);
    };

    PicoGL.Mat2x4Uniform.prototype.set = function(value) {
        for (var i = 0, len = value.length; i < len; i++) {
            if (this.cache[i] !== value[i]) {
                this.gl.uniformMatrix2x4fv(this.handle, false, value);
                this.cache.set(value);
                return;
            }
        }
    };

    PicoGL.Mat3x2Uniform = function Mat3x2Uniform(gl, handle, count) {
        this.gl = gl;
        this.handle = handle;
        this.count = count;
        this.cache = new Float32Array(6 * count);
    };

    PicoGL.Mat3x2Uniform.prototype.set = function(value) {
        for (var i = 0, len = value.length; i < len; i++) {
            if (this.cache[i] !== value[i]) {
                this.gl.uniformMatrix3x2fv(this.handle, false, value);
                this.cache.set(value);
                return;
            }
        }
    };

    PicoGL.Mat3x4Uniform = function Mat3x4Uniform(gl, handle, count) {
        this.gl = gl;
        this.handle = handle;
        this.count = count;
        this.cache = new Float32Array(12 * count);
    };

    PicoGL.Mat3x4Uniform.prototype.set = function(value) {
        for (var i = 0, len = value.length; i < len; i++) {
            if (this.cache[i] !== value[i]) {
                this.gl.uniformMatrix3x4fv(this.handle, false, value);
                this.cache.set(value);
                return;
            }
        }
    };

    PicoGL.Mat4x2Uniform = function Mat4x2Uniform(gl, handle, count) {
        this.gl = gl;
        this.handle = handle;
        this.count = count;
        this.cache = new Float32Array(8 * count);
    };

    PicoGL.Mat4x2Uniform.prototype.set = function(value) {
        for (var i = 0, len = value.length; i < len; i++) {
            if (this.cache[i] !== value[i]) {
                this.gl.uniformMatrix4x2fv(this.handle, false, value);
                this.cache.set(value);
                return;
            }
        }
    };

    PicoGL.Mat4x3Uniform = function Mat4x3Uniform(gl, handle, count) {
        this.gl = gl;
        this.handle = handle;
        this.count = count;
        this.cache = new Float32Array(12 * count);
    };

    PicoGL.Mat4x3Uniform.prototype.set = function(value) {
        for (var i = 0, len = value.length; i < len; i++) {
            if (this.cache[i] !== value[i]) {
                this.gl.uniformMatrix4x3fv(this.handle, false, value);
                this.cache.set(value);
                return;
            }
        }
    };

})();
