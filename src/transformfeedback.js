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
        this.transformFeedbackA = gl.createTransformFeedback();
        this.transformFeedbackB = gl.createTransformFeedback();
        this.currentTransformFeedback = this.transformFeedbackB;
        this.vertexArrayA = vertexArray1;
        this.vertexArrayB = vertexArray2;
        this.currentVertexArray = this.vertexArrayA;

        var i, len;
        this.gl.bindTransformFeedback(this.gl.TRANSFORM_FEEDBACK, this.transformFeedbackA);
        for (i = 0, len = varyingBufferIndices.length; i < len; ++i) {
            this.gl.bindBufferBase(this.gl.TRANSFORM_FEEDBACK_BUFFER, i, vertexArray1.attributeBuffers[varyingBufferIndices[i]].buffer);
        }
        this.gl.bindTransformFeedback(this.gl.TRANSFORM_FEEDBACK, this.transformFeedbackB);
        for (i = 0, len = varyingBufferIndices.length; i < len; ++i) {
            this.gl.bindBufferBase(this.gl.TRANSFORM_FEEDBACK_BUFFER, i, vertexArray2.attributeBuffers[varyingBufferIndices[i]].buffer);
        }
        this.gl.bindTransformFeedback(this.gl.TRANSFORM_FEEDBACK, null);
        for (i = 0, len = varyingBufferIndices.length; i < len; ++i) {
            this.gl.bindBufferBase(this.gl.TRANSFORM_FEEDBACK_BUFFER, i, null);
        }
    };

     /**
        Swap the input and output buffers.

        @method
    */
    PicoGL.TransformFeedback.prototype.swapBuffers = function() {
        this.currentTransformFeedback = this.currentTransformFeedback === this.transformFeedbackA ? this.transformFeedbackB : this.transformFeedbackA;
        this.currentVertexArray = this.currentVertexArray === this.vertexArrayA ? this.vertexArrayB : this.vertexArrayA;

        return this;
    };

    /**
        Delete this transform feedback.

        @method
    */
    PicoGL.TransformFeedback.prototype.delete = function() {
        if (this.currentTransformFeedback) {
            this.gl.deleteTransformFeedback(this.currentTransformFeedback);
            this.currentTransformFeedback = null;
        }
    }; 

    // Bind this transform feedback.
    PicoGL.TransformFeedback.prototype.bind = function(primitive) {
        this.gl.bindTransformFeedback(this.gl.TRANSFORM_FEEDBACK, this.currentTransformFeedback);
        this.gl.beginTransformFeedback(primitive);

        return this;
    };

    // Unbind this transform feedback.
    PicoGL.TransformFeedback.prototype.unbind = function() {
        this.gl.endTransformFeedback();    
        this.gl.bindTransformFeedback(this.gl.TRANSFORM_FEEDBACK, null);

        return this;
    };

})();
