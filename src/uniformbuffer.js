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

    PicoGL.UniformBuffer = function UniformBuffer(gl) {
        this.gl = gl;
        this.buffer = gl.createBuffer();
        this.values = [];
        this.offsets = [];
        this.size = 0;
    };

    PicoGL.UniformBuffer.prototype.vec4 = function(value) {
        if (this.size % 4 > 0) {
            this.size += 4 - this.size % 4;
        }
        this.offsets.push(this.size);
        this.values.push(value);

        this.size += 4;

        return this;
    };

    PicoGL.UniformBuffer.prototype.mat4 = function(value) {
        if (this.size % 4 > 0) {
            this.size += 4 - this.size % 4;
        }
        this.offsets.push(this.size);
        this.values.push(value);

        this.size += 16;

        return this;
    };

    PicoGL.UniformBuffer.prototype.build = function() {
        if (this.size % 4 > 0) {
            this.size += 4 - this.size % 4;
        }
        var data = new Float32Array(this.size);

        for (var i = 0, len = this.values.length; i < len; ++i) {
            data.set(this.values[i], this.offsets[i]);
        }

        this.gl.bindBuffer(this.gl.UNIFORM_BUFFER, this.buffer);
        this.gl.bindBufferBase(this.gl.UNIFORM_BUFFER, 0, this.buffer);
        this.gl.bufferData(this.gl.UNIFORM_BUFFER, data, this.gl.STATIC_DRAW);
        this.gl.bindBuffer(this.gl.UNIFORM_BUFFER, null);

        return this;
    };

    PicoGL.UniformBuffer.prototype.bind = function(base) {
        this.gl.bindBuffer(this.gl.UNIFORM_BUFFER, this.buffer);
        this.gl.bindBufferBase(this.gl.UNIFORM_BUFFER, base, this.buffer);

        return this;
    };

})();
