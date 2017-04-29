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
        Tranform feedback object.

        @class
        @prop {WebGLRenderingContext} gl The WebGL context.
        @prop {WebGLTransformFeedback} transformFeedback Transform feedback object.
        @prop {VertexArray} inputVertexArray Vertex array to use as input to the next pass.
        @prop {array} inputBuffers Transform feedback buffers bound to the input vertex array.
        @prop {VertexArray} outputVertexArray Vertex array to store output from the next pass.
        @prop {array} outputBuffers Transform feedback buffers bound to the output vertex array.
    */
    PicoGL.TransformFeedback = function TransformFeedback(gl, vertexArray1, vertexArray2, varyingBufferIndices) {
        this.gl = gl;
        this.transformFeedback = gl.createTransformFeedback();
        this.inputVertexArray = vertexArray1;
        this.outputVertexArray = vertexArray2;
        this.inputBuffers = new Array(varyingBufferIndices.length);
        this.outputBuffers = new Array(varyingBufferIndices.length);

        for (var i = 0, len = varyingBufferIndices.length; i < len; ++i) {
            this.inputBuffers[i] = vertexArray1.attributeBuffers[varyingBufferIndices[i]];
            this.outputBuffers[i] = vertexArray2.attributeBuffers[varyingBufferIndices[i]];
        }
    };

    /**
        Bind this transform feedback.

        @method
        @param {GLenum} primitive Primitive being drawn.
    */
    PicoGL.TransformFeedback.prototype.bind = function(primitive) {
        this.gl.bindTransformFeedback(this.gl.TRANSFORM_FEEDBACK, this.transformFeedback);
        
        for (var i = 0, len = this.outputBuffers.length; i < len; ++i) {
            this.gl.bindBufferBase(this.gl.TRANSFORM_FEEDBACK_BUFFER, i, this.outputBuffers[i].buffer);
        }

        this.gl.beginTransformFeedback(primitive);

        return this;
    };

     /**
        Swap the input and output buffers.

        @method
    */
    PicoGL.TransformFeedback.prototype.swapBuffers = function() {
        var va = this.inputVertexArray;
        this.inputVertexArray = this.outputVertexArray;
        this.outputVertexArray = va;

        var vb = this.inputBuffers;
        this.inputBuffers = this.outputBuffers;
        this.outputBuffers = vb;

        return this;
    };

     /**
        Unbind this transform feedback.

        @method
    */
    PicoGL.TransformFeedback.prototype.unbind = function() {
        this.gl.endTransformFeedback();    
        this.gl.bindTransformFeedback(this.gl.TRANSFORM_FEEDBACK, null);

        return this;
    };

})();
