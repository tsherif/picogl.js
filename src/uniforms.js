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
    };

    PicoGL.FloatArrayUniform.prototype.set = function(value) {
        this.gl.uniform1fv(this.handle, value);
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
    };

    PicoGL.IntArrayUniform.prototype.set = function(value) {
        this.gl.uniform1iv(this.handle, value);
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
    };

    PicoGL.UintArrayUniform.prototype.set = function(value) {
        this.gl.uniform1uiv(this.handle, value);
    };

    PicoGL.Vec2Uniform = function Vec2Uniform(gl, handle) {
        this.gl = gl;
        this.handle = handle;
        this.cache = new Float32Array(2);
    };

    PicoGL.Vec2Uniform.prototype.set = function(value) {
        if (this.cache[0] !== value[0] ||
            this.cache[1] !== value[1]) {
            this.gl.uniform2fv(this.handle, value);
            this.cache.set(value);
        }
    };

    PicoGL.Vec2ArrayUniform = function Vec2ArrayUniform(gl, handle, count) {
        this.gl = gl;
        this.handle = handle;
        this.count = count;
    };

    PicoGL.Vec2ArrayUniform.prototype.set = function(value) {
        this.gl.uniform2fv(this.handle, value);
    };

    PicoGL.Vec3Uniform = function Vec3Uniform(gl, handle) {
        this.gl = gl;
        this.handle = handle;
        this.cache = new Float32Array(3);
    };

    PicoGL.Vec3Uniform.prototype.set = function(value) {
        if (this.cache[0] !== value[0] ||
            this.cache[1] !== value[1] ||
            this.cache[2] !== value[2]) {
            this.gl.uniform3fv(this.handle, value);
            this.cache.set(value);
        }
    };

    PicoGL.Vec3ArrayUniform = function Vec3ArrayUniform(gl, handle, count) {
        this.gl = gl;
        this.handle = handle;
        this.count = count;
    };

    PicoGL.Vec3ArrayUniform.prototype.set = function(value) {
        this.gl.uniform3fv(this.handle, value);
    };

    PicoGL.Vec4Uniform = function Vec4Uniform(gl, handle) {
        this.gl = gl;
        this.handle = handle;
        this.cache = new Float32Array(4);
    };

    PicoGL.Vec4Uniform.prototype.set = function(value) {
        if (this.cache[0] !== value[0] ||
            this.cache[1] !== value[1] ||
            this.cache[2] !== value[2] ||
            this.cache[3] !== value[3]) {
            this.gl.uniform4fv(this.handle, value);
            this.cache.set(value);
        }
    };

    PicoGL.Vec4ArrayUniform = function Vec4ArrayUniform(gl, handle, count) {
        this.gl = gl;
        this.handle = handle;
        this.count = count;
    };

    PicoGL.Vec4ArrayUniform.prototype.set = function(value) {
        this.gl.uniform4fv(this.handle, value);
    };

    PicoGL.IntVec2Uniform = function IntVec2Uniform(gl, handle) {
        this.gl = gl;
        this.handle = handle;
        this.cache = new Int32Array(2);
    };

    PicoGL.IntVec2Uniform.prototype.set = function(value) {
        if (this.cache[0] !== value[0] ||
            this.cache[1] !== value[1]) {
            this.gl.uniform2iv(this.handle, value);
            this.cache.set(value);
        }
    };

    PicoGL.IntVec2ArrayUniform = function IntVec2ArrayUniform(gl, handle, count) {
        this.gl = gl;
        this.handle = handle;
        this.count = count;
    };

    PicoGL.IntVec2ArrayUniform.prototype.set = function(value) {
        this.gl.uniform2iv(this.handle, value);
    };

    PicoGL.IntVec3Uniform = function IntVec3Uniform(gl, handle) {
        this.gl = gl;
        this.handle = handle;
        this.cache = new Int32Array(3);
    };

    PicoGL.IntVec3Uniform.prototype.set = function(value) {
        if (this.cache[0] !== value[0] ||
            this.cache[1] !== value[1] ||
            this.cache[2] !== value[2]) {
            this.gl.uniform3iv(this.handle, value);
            this.cache.set(value);
        }
    };

    PicoGL.IntVec3ArrayUniform = function IntVec3ArrayUniform(gl, handle, count) {
        this.gl = gl;
        this.handle = handle;
        this.count = count;
    };

    PicoGL.IntVec3ArrayUniform.prototype.set = function(value) {
        this.gl.uniform3iv(this.handle, value);
    };

    PicoGL.IntVec4Uniform = function IntVec4Uniform(gl, handle) {
        this.gl = gl;
        this.handle = handle;
        this.cache = new Int32Array(4);
    };

    PicoGL.IntVec4Uniform.prototype.set = function(value) {
        if (this.cache[0] !== value[0] ||
            this.cache[1] !== value[1] ||
            this.cache[2] !== value[2] ||
            this.cache[3] !== value[3]) {
            this.gl.uniform4iv(this.handle, value);
            this.cache.set(value);
        }
    };

    PicoGL.IntVec4ArrayUniform = function IntVec4ArrayUniform(gl, handle, count) {
        this.gl = gl;
        this.handle = handle;
        this.count = count;
    };

    PicoGL.IntVec4ArrayUniform.prototype.set = function(value) {
        this.gl.uniform4iv(this.handle, value);
    };

    PicoGL.UintVec2Uniform = function UintVec2Uniform(gl, handle) {
        this.gl = gl;
        this.handle = handle;
        this.cache = new Uint32Array(2);
    };

    PicoGL.UintVec2Uniform.prototype.set = function(value) {
        if (this.cache[0] !== value[0] ||
            this.cache[1] !== value[1]) {
            this.gl.uniform2uiv(this.handle, value);
            this.cache.set(value);
        }
    };

    PicoGL.UintVec2ArrayUniform = function UintVec2ArrayUniform(gl, handle, count) {
        this.gl = gl;
        this.handle = handle;
        this.count = count;
    };

    PicoGL.UintVec2ArrayUniform.prototype.set = function(value) {
        this.gl.uniform2uiv(this.handle, value);
    };

    PicoGL.UintVec3Uniform = function UintVec3Uniform(gl, handle) {
        this.gl = gl;
        this.handle = handle;
        this.cache = new Uint32Array(3);
    };

    PicoGL.UintVec3Uniform.prototype.set = function(value) {
        if (this.cache[0] !== value[0] ||
            this.cache[1] !== value[1] ||
            this.cache[2] !== value[2]) {
            this.gl.uniform3uiv(this.handle, value);
            this.cache.set(value);
        }
    };

    PicoGL.UintVec3ArrayUniform = function UintVec3ArrayUniform(gl, handle, count) {
        this.gl = gl;
        this.handle = handle;
        this.count = count;
    };

    PicoGL.UintVec3ArrayUniform.prototype.set = function(value) {
        this.gl.uniform3uiv(this.handle, value);
    };

    PicoGL.UintVec4Uniform = function UintVec4Uniform(gl, handle) {
        this.gl = gl;
        this.handle = handle;
        this.cache = new Uint32Array(4);
    };

    PicoGL.UintVec4Uniform.prototype.set = function(value) {
        if (this.cache[0] !== value[0] ||
            this.cache[1] !== value[1] ||
            this.cache[2] !== value[2] ||
            this.cache[3] !== value[3]) {
            this.gl.uniform4uiv(this.handle, value);
            this.cache.set(value);
        }
    };

    PicoGL.UintVec4ArrayUniform = function UintVec4ArrayUniform(gl, handle, count) {
        this.gl = gl;
        this.handle = handle;
        this.count = count;
    };

    PicoGL.UintVec4ArrayUniform.prototype.set = function(value) {
        this.gl.uniform4uiv(this.handle, value);
    };

    PicoGL.BoolVec2Uniform = function BoolVec2Uniform(gl, handle) {
        this.gl = gl;
        this.handle = handle;
        this.cache = [false, false];
    };

    PicoGL.BoolVec2Uniform.prototype.set = function(value) {
        if (this.cache[0] !== value[0] ||
            this.cache[1] !== value[1]) {
            this.gl.uniform2iv(this.handle, value);
            this.cache[0] = value[0];
            this.cache[1] = value[1];
        }
    };

    PicoGL.BoolVec2ArrayUniform = function BoolVec2ArrayUniform(gl, handle, count) {
        this.gl = gl;
        this.handle = handle;
        this.count = count;
    };

    PicoGL.BoolVec2ArrayUniform.prototype.set = function(value) {
        this.gl.uniform2iv(this.handle, value);
    };

    PicoGL.BoolVec3Uniform = function BoolVec3Uniform(gl, handle) {
        this.gl = gl;
        this.handle = handle;
        this.cache = [false, false, false];
    };

    PicoGL.BoolVec3Uniform.prototype.set = function(value) {
        if (this.cache[0] !== value[0] ||
            this.cache[1] !== value[1] ||
            this.cache[2] !== value[2]) {
            this.gl.uniform3iv(this.handle, value);
            this.cache[0] = value[0];
            this.cache[1] = value[1];
            this.cache[2] = value[2];
        }
    };

    PicoGL.BoolVec3ArrayUniform = function BoolVec3ArrayUniform(gl, handle, count) {
        this.gl = gl;
        this.handle = handle;
        this.count = count;
    };

    PicoGL.BoolVec3ArrayUniform.prototype.set = function(value) {
        this.gl.uniform3iv(this.handle, value);
    };

    PicoGL.BoolVec4Uniform = function BoolVec4Uniform(gl, handle) {
        this.gl = gl;
        this.handle = handle;
        this.cache = [false, false, false, false];
    };

    PicoGL.BoolVec4Uniform.prototype.set = function(value) {
        if (this.cache[0] !== value[0] ||
            this.cache[1] !== value[1] ||
            this.cache[2] !== value[2] ||
            this.cache[3] !== value[3]) {
            this.gl.uniform4iv(this.handle, value);
            this.cache[0] = value[0];
            this.cache[1] = value[1];
            this.cache[2] = value[2];
            this.cache[3] = value[3];
        }
    };

    PicoGL.BoolVec3ArrayUniform = function BoolVec3ArrayUniform(gl, handle, count) {
        this.gl = gl;
        this.handle = handle;
        this.count = count;
    };

    PicoGL.BoolVec3ArrayUniform.prototype.set = function(value) {
        this.gl.uniform3iv(this.handle, value);
    };

    PicoGL.Mat2Uniform = function Mat2Uniform(gl, handle) {
        this.gl = gl;
        this.handle = handle;
        this.cache = new Float32Array(4);
    };

    PicoGL.Mat2Uniform.prototype.set = function(value) {
        if (this.cache[0] !== value[0] ||
            this.cache[1] !== value[1] ||
            this.cache[2] !== value[2] ||
            this.cache[3] !== value[3]) {
            this.gl.uniformMatrix2fv(this.handle, false, value);
            this.cache.set(value);
        }
    };

    PicoGL.Mat2ArrayUniform = function Mat2ArrayUniform(gl, handle, count) {
        this.gl = gl;
        this.handle = handle;
        this.count = count;
    };

    PicoGL.Mat2ArrayUniform.prototype.set = function(value) {
        this.gl.uniformMatrix2fv(this.handle, false, value);
    };

    PicoGL.Mat3Uniform = function Mat3Uniform(gl, handle) {
        this.gl = gl;
        this.handle = handle;
        this.cache = new Float32Array(9);
    };

    PicoGL.Mat3Uniform.prototype.set = function(value) {
        if (this.cache[0] !== value[0] ||
            this.cache[1] !== value[1] ||
            this.cache[2] !== value[2] ||
            this.cache[3] !== value[3] ||
            this.cache[4] !== value[4] ||
            this.cache[5] !== value[5] ||
            this.cache[6] !== value[6] ||
            this.cache[7] !== value[7] ||
            this.cache[8] !== value[8]) {
            this.gl.uniformMatrix3fv(this.handle, false, value);
            this.cache.set(value);
        }
    };

    PicoGL.Mat3ArrayUniform = function Mat3ArrayUniform(gl, handle, count) {
        this.gl = gl;
        this.handle = handle;
        this.count = count;
    };

    PicoGL.Mat3ArrayUniform.prototype.set = function(value) {
        this.gl.uniformMatrix3fv(this.handle, false, value);
    };

    PicoGL.Mat4Uniform = function Mat4Uniform(gl, handle) {
        this.gl = gl;
        this.handle = handle;
        this.cache = new Float32Array(16);
    };

    PicoGL.Mat4Uniform.prototype.set = function(value) {
        if (this.cache[0] !== value[0] ||
            this.cache[1] !== value[1] ||
            this.cache[2] !== value[2] ||
            this.cache[3] !== value[3] ||
            this.cache[4] !== value[4] ||
            this.cache[5] !== value[5] ||
            this.cache[6] !== value[6] ||
            this.cache[7] !== value[7] ||
            this.cache[8] !== value[8] ||
            this.cache[9] !== value[9] ||
            this.cache[10] !== value[10] ||
            this.cache[11] !== value[11] ||
            this.cache[12] !== value[12] ||
            this.cache[13] !== value[13] ||
            this.cache[14] !== value[14] ||
            this.cache[15] !== value[15]) {
            this.gl.uniformMatrix4fv(this.handle, false, value);
            this.cache.set(value);
        }
    };

    PicoGL.Mat4ArrayUniform = function Mat4ArrayUniform(gl, handle, count) {
        this.gl = gl;
        this.handle = handle;
        this.count = count;
    };

    PicoGL.Mat4ArrayUniform.prototype.set = function(value) {
        this.gl.uniformMatrix4fv(this.handle, false, value);
    };

    PicoGL.Mat2x3Uniform = function Mat2x3Uniform(gl, handle) {
        this.gl = gl;
        this.handle = handle;
        this.cache = new Float32Array(6);
    };

    PicoGL.Mat2x3Uniform.prototype.set = function(value) {
        if (this.cache[0] !== value[0] ||
            this.cache[1] !== value[1] ||
            this.cache[2] !== value[2] ||
            this.cache[3] !== value[3] ||
            this.cache[4] !== value[4] ||
            this.cache[5] !== value[5]) {
            this.gl.uniformMatrix2x3fv(this.handle, false, value);
            this.cache.set(value);
        }
    };

    PicoGL.Mat2x3ArrayUniform = function Mat2x3ArrayUniform(gl, handle, count) {
        this.gl = gl;
        this.handle = handle;
        this.count = count;
    };

    PicoGL.Mat2x3ArrayUniform.prototype.set = function(value) {
        this.gl.uniformMatrix2x3fv(this.handle, false, value);
    };

    PicoGL.Mat2x4Uniform = function Mat2x4Uniform(gl, handle) {
        this.gl = gl;
        this.handle = handle;
        this.cache = new Float32Array(8);
    };

    PicoGL.Mat2x4Uniform.prototype.set = function(value) {
        if (this.cache[0] !== value[0] ||
            this.cache[1] !== value[1] ||
            this.cache[2] !== value[2] ||
            this.cache[3] !== value[3] ||
            this.cache[4] !== value[4] ||
            this.cache[5] !== value[5] ||
            this.cache[6] !== value[6] ||
            this.cache[7] !== value[7]) {
            this.gl.uniformMatrix2x4fv(this.handle, false, value);
            this.cache.set(value);
        }
    };

    PicoGL.Mat2x4ArrayUniform = function Mat2x4ArrayUniform(gl, handle, count) {
        this.gl = gl;
        this.handle = handle;
        this.count = count;
    };

    PicoGL.Mat2x4ArrayUniform.prototype.set = function(value) {
        this.gl.uniformMatrix2x4fv(this.handle, false, value);
    };

    PicoGL.Mat3x2Uniform = function Mat3x2Uniform(gl, handle) {
        this.gl = gl;
        this.handle = handle;
        this.cache = new Float32Array(6);
    };

    PicoGL.Mat3x2Uniform.prototype.set = function(value) {
        if (this.cache[0] !== value[0] ||
            this.cache[1] !== value[1] ||
            this.cache[2] !== value[2] ||
            this.cache[3] !== value[3] ||
            this.cache[4] !== value[4] ||
            this.cache[5] !== value[5]) {
            this.gl.uniformMatrix3x2fv(this.handle, false, value);
            this.cache.set(value);
        }
    };

    PicoGL.Mat3x2ArrayUniform = function Mat3x2ArrayUniform(gl, handle, count) {
        this.gl = gl;
        this.handle = handle;
        this.count = count;
    };

    PicoGL.Mat3x2ArrayUniform.prototype.set = function(value) {
        this.gl.uniformMatrix3x2fv(this.handle, false, value);
    };

    PicoGL.Mat3x4Uniform = function Mat3x4Uniform(gl, handle) {
        this.gl = gl;
        this.handle = handle;
        this.cache = new Float32Array(12);
    };

    PicoGL.Mat3x4Uniform.prototype.set = function(value) {
        if (this.cache[0] !== value[0] ||
            this.cache[1] !== value[1] ||
            this.cache[2] !== value[2] ||
            this.cache[3] !== value[3] ||
            this.cache[4] !== value[4] ||
            this.cache[5] !== value[5] ||
            this.cache[6] !== value[6] ||
            this.cache[7] !== value[7] ||
            this.cache[8] !== value[8] ||
            this.cache[9] !== value[9] ||
            this.cache[10] !== value[10] ||
            this.cache[11] !== value[11]) {
            this.gl.uniformMatrix3x4fv(this.handle, false, value);
            this.cache.set(value);
        }
    };

    PicoGL.Mat3x4ArrayUniform = function Mat3x4ArrayUniform(gl, handle, count) {
        this.gl = gl;
        this.handle = handle;
        this.count = count;
    };

    PicoGL.Mat3x4ArrayUniform.prototype.set = function(value) {
        this.gl.uniformMatrix3x4fv(this.handle, false, value);
    };

    PicoGL.Mat4x2Uniform = function Mat4x2Uniform(gl, handle) {
        this.gl = gl;
        this.handle = handle;
        this.cache = new Float32Array(8);
    };

    PicoGL.Mat4x2Uniform.prototype.set = function(value) {
        if (this.cache[0] !== value[0] ||
            this.cache[1] !== value[1] ||
            this.cache[2] !== value[2] ||
            this.cache[3] !== value[3] ||
            this.cache[4] !== value[4] ||
            this.cache[5] !== value[5] ||
            this.cache[6] !== value[6] ||
            this.cache[7] !== value[7]) {
            this.gl.uniformMatrix4x2fv(this.handle, false, value);
            this.cache.set(value);
        }
    };

    PicoGL.Mat4x2ArrayUniform = function Mat4x2ArrayUniform(gl, handle, count) {
        this.gl = gl;
        this.handle = handle;
        this.count = count;
    };

    PicoGL.Mat4x2ArrayUniform.prototype.set = function(value) {
        this.gl.uniformMatrix4x2fv(this.handle, false, value);
    };

    PicoGL.Mat4x3Uniform = function Mat4x3Uniform(gl, handle) {
        this.gl = gl;
        this.handle = handle;
        this.cache = new Float32Array(12);
    };

    PicoGL.Mat4x3Uniform.prototype.set = function(value) {
        if (this.cache[0] !== value[0] ||
            this.cache[1] !== value[1] ||
            this.cache[2] !== value[2] ||
            this.cache[3] !== value[3] ||
            this.cache[4] !== value[4] ||
            this.cache[5] !== value[5] ||
            this.cache[6] !== value[6] ||
            this.cache[7] !== value[7] ||
            this.cache[8] !== value[8] ||
            this.cache[9] !== value[9] ||
            this.cache[10] !== value[10] ||
            this.cache[11] !== value[11]) {
            this.gl.uniformMatrix4x3fv(this.handle, false, value);
            this.cache.set(value);
        }
    };

    PicoGL.Mat4x3ArrayUniform = function Mat4x3ArrayUniform(gl, handle, count) {
        this.gl = gl;
        this.handle = handle;
        this.count = count;
    };

    PicoGL.Mat4x3ArrayUniform.prototype.set = function(value) {
        this.gl.uniformMatrix4x3fv(this.handle, false, value);
    };

})();
