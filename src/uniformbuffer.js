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

    PicoGL.UniformBuffer = function UniformBuffer(gl, data) {
        this.gl = gl;
        this.buffer = gl.createBuffer();

        gl.bindBuffer(gl.UNIFORM_BUFFER, this.buffer);
        gl.bindBufferBase(gl.UNIFORM_BUFFER, 0, this.buffer);
        gl.bufferData(gl.UNIFORM_BUFFER, data, gl.STATIC_DRAW);
        gl.bindBuffer(gl.UNIFORM_BUFFER, null);
    };

    PicoGL.UniformBuffer.prototype.bind = function(base) {
        this.gl.bindBuffer(this.gl.UNIFORM_BUFFER, this.buffer);
        this.gl.bindBufferBase(this.gl.UNIFORM_BUFFER, base, this.buffer);
    };

})();
