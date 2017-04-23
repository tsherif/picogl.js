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

    /**
        A DrawCall represents the program and values of associated
        attributes, uniforms and textures for a single draw call.

        @class
        @prop {WebGLRenderingContext} gl The WebGL context.
        @prop {WebGLProgram} program Handle to the program to use for this drawcall.
        @prop {Object} attributes Map of attribute handles to ArrayBuffers.
        @prop {Object} uniform Map of uniform handles to values.
        @prop {Object} textures Map of texture units to Textures.
        @prop {number} textureCount The number of active textures for this draw call. 
        @prop {ArrayBuffer} indexArray Index array to use for indexed drawing.
        @prop {GLEnum} primitive The primitive type being drawn. 
    */
    PicoGL.DrawCall = function DrawCall(gl, program, geometry, primitive) {
        this.gl = gl;
        this.currentProgram = program;
        
        if (program.transformFeedback) {
            this.currentVertexArray = null;
            this.currentTransformFeedback = geometry;
        } else {
            this.currentVertexArray = geometry;
            this.currentTransformFeedback = null;    
        }
        
        this.uniforms = {};
        this.uniformBlocks = {};
        this.uniformBlockBases = {};
        this.uniformBlockCount = 0;
        this.textures = {};
        this.textureCount = 0;
        this.indexArray = null;
        this.primitive = primitive !== undefined ? primitive : PicoGL.TRIANGLES;
    };

    /**
        Set the value for a uniform.

        @method
        @param {string} name Uniform name.
        @param {any} value Uniform value.
    */
    PicoGL.DrawCall.prototype.uniform = function(name, value) {
        this.uniforms[name] = value;

        return this;
    };

    /**
        Set texture to bind to a sampler uniform.

        @method
        @param {string} name Sampler uniform name.
        @param {Texture} texture Texture to bind.
    */
    PicoGL.DrawCall.prototype.texture = function(name, texture) {
        var unit = this.uniforms[name];
        if (unit === undefined) {
            unit = this.textureCount++;
            this.uniforms[name] = unit;
        }
        
        var textureUnit = this.gl["TEXTURE" + unit];   
        this.textures[textureUnit] = texture;
        
        return this;
    };

    PicoGL.DrawCall.prototype.uniformBlock = function(name, block) {
        var base = this.uniformBlockBases[name];
        if (base === undefined) {
            base = this.uniformBlockCount++;
            this.uniformBlockBases[name] = base;
        }
        
        this.uniformBlocks[base] = block;
        
        return this;
    };

    /**
        Draw something.

        @method
        @param {Object} state Current app state.
    */
    PicoGL.DrawCall.prototype.draw = function(state) {
        var uniforms = this.uniforms;
        var uniformBlocks = this.uniformBlocks;
        var uniformBlockBases = this.uniformBlockBases;
        var textures = this.textures;

        if (state.program !== this.currentProgram) {
            this.gl.useProgram(this.currentProgram.program);
            state.program = this.currentProgram;
        }

        for (var uName in uniforms) {
            this.currentProgram.uniform(uName, uniforms[uName]);
        }

        for (var ubName in uniformBlockBases) {
            var base = uniformBlockBases[ubName];
            this.currentProgram.uniformBlock(ubName, base);
            uniformBlocks[base].bind(base);
        }

        for (var unit in textures) {
            textures[unit].bind(unit);
        }

        if (this.currentTransformFeedback) {
            this.currentTransformFeedback.bind(this.primitive);
            this.currentVertexArray = this.currentTransformFeedback.inputVertexArray;
        }

        if (state.vertexArray !== this.currentVertexArray) {
            this.currentVertexArray.bind();
            state.vertexArray = this.currentVertexArray;
        }


        if (this.currentVertexArray.instanced) {
            if (this.currentVertexArray.indexed) {
                this.gl.drawElementsInstanced(this.primitive, this.currentVertexArray.numElements, this.currentVertexArray.indexType, 0, this.currentVertexArray.numInstances);
            } else {
                this.gl.drawArraysInstanced(this.primitive, 0, this.currentVertexArray.numElements, this.currentVertexArray.numInstances);
            }
        } else {
            if (this.currentVertexArray.indexed) {
                this.gl.drawElements(this.primitive, this.currentVertexArray.numElements, this.currentVertexArray.indexType, 0);
            } else {
                this.gl.drawArrays(this.primitive, 0, this.currentVertexArray.numElements);
            }
        }

        if (this.currentTransformFeedback) {
            this.currentTransformFeedback.unbind();
        }

    };

})();


