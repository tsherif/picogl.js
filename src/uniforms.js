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


    NanoGL.FloatUniform = function FloatUniform(gl, handle) {
        this.gl = gl;
        this.handle = handle;
        this.value = 0;
    };

    NanoGL.FloatUniform.prototype.set = function(value) {
        if (this.value !== value) {
            this.gl.uniform1f(this.handle, value);
            this.value = value;
        }
    };

    NanoGL.IntUniform = function IntUniform(gl, handle) {
        this.gl = gl;
        this.handle = handle;
        this.value = 0;
    };

    NanoGL.IntUniform.prototype.set = function(value) {
        if (this.value !== value) {
            this.gl.uniform1i(this.handle, value);
            this.value = value;
        }
    };

    NanoGL.Vec2Uniform = function Vec2Uniform(gl, handle) {
        this.gl = gl;
        this.handle = handle;
        this.value = new Float32Array(2);
    };

    NanoGL.Vec2Uniform.prototype.set = function(value) {
        if (this.value[0] !== value[0] ||
            this.value[1] !== value[1]) {
            this.gl.uniform2fv(this.handle, value);
            this.value.set(value);
        }
    };

    NanoGL.Vec3Uniform = function Vec3Uniform(gl, handle) {
        this.gl = gl;
        this.handle = handle;
        this.value = new Float32Array(3);
    };

    NanoGL.Vec3Uniform.prototype.set = function(value) {
        if (this.value[0] !== value[0] ||
            this.value[1] !== value[1] ||
            this.value[2] !== value[2]) {
            this.gl.uniform3fv(this.handle, value);
            this.value.set(value);
        }
    };

    NanoGL.Vec4Uniform = function Vec4Uniform(gl, handle) {
        this.gl = gl;
        this.handle = handle;
        this.value = new Float32Array(4);
    };

    NanoGL.Vec4Uniform.prototype.set = function(value) {
        if (this.value[0] !== value[0] ||
            this.value[1] !== value[1] ||
            this.value[2] !== value[2] ||
            this.value[3] !== value[3]) {
            this.gl.uniform4fv(this.handle, value);
            this.value.set(value);
        }
    };

    NanoGL.Mat4Uniform = function Mat4Uniform(gl, handle) {
        this.gl = gl;
        this.handle = handle;
        this.value = new Float32Array(16);
    };

    NanoGL.Mat4Uniform.prototype.set = function(value) {
        if (this.value[0] !== value[0] ||
            this.value[1] !== value[1] ||
            this.value[2] !== value[2] ||
            this.value[3] !== value[3] ||
            this.value[4] !== value[4] ||
            this.value[5] !== value[5] ||
            this.value[6] !== value[6] ||
            this.value[7] !== value[7] ||
            this.value[8] !== value[8] ||
            this.value[9] !== value[9] ||
            this.value[10] !== value[10] ||
            this.value[11] !== value[11] ||
            this.value[12] !== value[12] ||
            this.value[13] !== value[13] ||
            this.value[14] !== value[14] ||
            this.value[15] !== value[15]) {
            this.gl.uniformMatrix4fv(this.handle, false, value);
            this.value.set(value);
        }
    };

})();
