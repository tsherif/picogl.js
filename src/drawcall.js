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

    NanoGL.DrawCall = function DrawCall(gl, program, primitive) {
            this.gl = gl;
        this.program = program || null;
        this.uniforms = {};
        this.attributes = {};
        this.textures = {};
        this.numItems = 0;
        this.indices = null;
        this.primitive = primitive !== undefined ? primitive : NanoGL.TRIANGLES;
    };

    NanoGL.DrawCall.prototype.setUniform = function(name, value) {
        this.uniforms[name] = value;
    };

    NanoGL.DrawCall.prototype.setAttribute = function(name, buffer) {
        this.attributes[name] = buffer;
        if (this.numItems === 0) {
            this.numItems = buffer.numItems;
        }
    };

    NanoGL.DrawCall.prototype.setIndices = function(buffer) {
        this.indices = buffer;
        this.numItems = buffer.numItems;
    };

    NanoGL.DrawCall.prototype.setTexture = function(name, unit, texture) {
        var textureUnit = this.gl["TEXTURE" + unit];
        this.uniforms[name] = unit;
        this.textures[textureUnit] = texture;
    };

    NanoGL.DrawCall.prototype.draw = function(state) {
        var uniforms = this.uniforms;
        var attributes = this.attributes;
        var textures = this.textures;

        if (state.program !== this.program) {
            this.program.bind();
            state.program = this.program;
        }

        for (var uName in uniforms) {
            this.program.setUniform(uName, uniforms[uName]);
        }

        for (var aName in attributes) {
            this.program.bindAttribute(aName, attributes[aName]);
        }

        for (var unit in textures) {
            textures[unit].bind(unit);
        }

        if (this.indices) {
            this.indices.bind();
            this.gl.drawElements(this.primitive, this.numItems * 3, this.indices.type, 0);
        } else {
            this.gl.drawArrays(this.primitive, 0, this.numItems);
        }
    };

})();


