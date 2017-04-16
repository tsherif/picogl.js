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

    PicoGL.UniformBuffer = function UniformBuffer(gl, layout, usage) {
        this.gl = gl;
        this.buffer = gl.createBuffer();
        this.data = null;
        this.offsets = new Array(layout.length);
        this.size = 0;
        this.usage = usage || gl.DYNAMIC_DRAW;

        for (var i = 0, len = layout.length; i < len; ++i) {
            var type = layout[i];
            if (type === PicoGL.FLOAT_VEC4) {
                if (this.size % 4 > 0) {
                    this.size += 4 - this.size % 4;
                }
                this.offsets[i] = this.size;

                this.size += 4;
            } else if (type === PicoGL.MAT4) {
                if (this.size % 4 > 0) {
                    this.size += 4 - this.size % 4;
                }
                this.offsets[i] = this.size;

                this.size += 16;
            }
        }

        if (this.size % 4 > 0) {
            this.size += 4 - this.size % 4;
        }

        this.data = new Float32Array(this.size);

        this.gl.bindBuffer(this.gl.UNIFORM_BUFFER, this.buffer);
        this.gl.bufferData(this.gl.UNIFORM_BUFFER, this.size * 4, this.usage);
        this.gl.bindBuffer(this.gl.UNIFORM_BUFFER, null);
    };

    PicoGL.UniformBuffer.prototype.set = function(index, value) {
        this.data.set(value, this.offsets[index]);
    
        return this;
    };

    PicoGL.UniformBuffer.prototype.update = function() {
        this.gl.bindBuffer(this.gl.UNIFORM_BUFFER, this.buffer);
        this.gl.bufferSubData(this.gl.UNIFORM_BUFFER, 0, this.data);
        this.gl.bindBuffer(this.gl.UNIFORM_BUFFER, null);

        return this;
    };

    PicoGL.UniformBuffer.prototype.bind = function(base) {
        this.gl.bindBuffer(this.gl.UNIFORM_BUFFER, this.buffer);
        this.gl.bindBufferBase(this.gl.UNIFORM_BUFFER, base, this.buffer);

        return this;
    };

})();
