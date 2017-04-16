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

    PicoGL.UniformBuffer = function UniformBuffer(gl, usage) {
        this.gl = gl;
        this.buffer = gl.createBuffer();
        this.data = null;
        this.initValues = {};
        this.offsets = {};
        this.size = 0;
        this.usage = usage || gl.STATIC_DRAW;
    };

    PicoGL.UniformBuffer.prototype.vec4 = function(name, value) {
        if (this.offsets[name]) {
            this.data.set(value, this.offsets[name]);
        } else {
            if (this.size % 4 > 0) {
                this.size += 4 - this.size % 4;
            }
            this.offsets[name] = this.size;
            this.initValues[name] = value;

            this.size += 4;
        }
    
        return this;
    };

    PicoGL.UniformBuffer.prototype.mat4 = function(name, value) {
        if (this.offsets[name]) {
            this.data.set(value, this.offsets[name]);
        } else {
            if (this.size % 4 > 0) {
                this.size += 4 - this.size % 4;
            }
            this.offsets[name] = this.size;
            this.initValues[name] = value;

            this.size += 16;
        }

        return this;
    };

    PicoGL.UniformBuffer.prototype.update = function() {
        this.gl.bindBuffer(this.gl.UNIFORM_BUFFER, this.buffer);
        
        if (this.data) {
            this.gl.bufferSubData(this.gl.UNIFORM_BUFFER, 0, this.data);
        } else {
            if (this.size % 4 > 0) {
                this.size += 4 - this.size % 4;
            }
            this.data = new Float32Array(this.size);

            for (var name in this.initValues) {
                this.data.set(this.initValues[name], this.offsets[name]);
            }
            
            this.initValues = null;

            this.gl.bufferData(this.gl.UNIFORM_BUFFER, this.data, this.usage);
        }

        this.gl.bindBuffer(this.gl.UNIFORM_BUFFER, null);

        return this;
    };

    PicoGL.UniformBuffer.prototype.bind = function(base) {
        this.gl.bindBuffer(this.gl.UNIFORM_BUFFER, this.buffer);
        this.gl.bindBufferBase(this.gl.UNIFORM_BUFFER, base, this.buffer);

        return this;
    };

})();
