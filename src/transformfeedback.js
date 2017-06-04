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
    PicoGL.TransformFeedback = function TransformFeedback(gl) {
        this.gl = gl;
        this.transformFeedback = gl.createTransformFeedback();
    };

    //TODO(Tarek): Update transform feedback documentation
     /**
        Swap the input and output buffers.

        @method
    */
    PicoGL.TransformFeedback.prototype.captureBuffer = function(index, buffer) {
        this.gl.bindTransformFeedback(this.gl.TRANSFORM_FEEDBACK, this.transformFeedback);
        this.gl.bindBufferBase(this.gl.TRANSFORM_FEEDBACK_BUFFER, index, buffer.buffer);
        this.gl.bindTransformFeedback(this.gl.TRANSFORM_FEEDBACK, null);
        this.gl.bindBufferBase(this.gl.TRANSFORM_FEEDBACK_BUFFER, index, null);

        return this;
    };

    /**
        Delete this transform feedback.

        @method
    */
    PicoGL.TransformFeedback.prototype.delete = function() {
        if (this.transformFeedback) {
            this.gl.deleteTransformFeedback(this.transformFeedback);
            this.transformFeedback = null;
        }
    }; 

    // Bind this transform feedback.
    PicoGL.TransformFeedback.prototype.bind = function() {
        this.gl.bindTransformFeedback(this.gl.TRANSFORM_FEEDBACK, this.transformFeedback);

        return this;
    };

})();
