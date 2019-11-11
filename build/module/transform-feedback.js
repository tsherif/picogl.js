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

import { GL } from "./constants.js";

/**
    Tranform feedback object.

    @class
    @prop {WebGLRenderingContext} gl The WebGL context.
    @prop {WebGLTransformFeedback} transformFeedback Transform feedback object.
    @prop {Object} appState Tracked GL state.
*/
export class TransformFeedback {

    constructor(gl, appState) {
        this.gl = gl;
        this.appState = appState;
        this.transformFeedback = null;

        this.restore();
    }

    /**
        Restore transform feedback after context loss.

        @method
        @return {TransformFeedback} The TransformFeedback object.
    */
    restore() {
        if (this.appState.transformFeedback === this) {
            this.appState.transformFeedback = null;
        }

        this.transformFeedback = this.gl.createTransformFeedback();

        return this;
    }

    /**
        Bind a feedback buffer to capture transform output.

        @method
        @param {number} index Index of transform feedback varying to capture.
        @param {VertexBuffer} buffer Buffer to record output into.
        @return {TransformFeedback} The TransformFeedback object.
    */
    feedbackBuffer(index, buffer) {
        this.gl.bindTransformFeedback(GL.TRANSFORM_FEEDBACK, this.transformFeedback);
        this.gl.bindBufferBase(GL.TRANSFORM_FEEDBACK_BUFFER, index, buffer.buffer);

        // TODO(Tarek): Firefox doesn't properly unbind TRANSFORM_FEEDBACK_BUFFER
        // bindings when TRANSFORM_FEEDBACK is unbound.
        // https://bugzilla.mozilla.org/show_bug.cgi?id=1541396
        this.gl.bindTransformFeedback(GL.TRANSFORM_FEEDBACK, null);
        this.gl.bindBufferBase(GL.TRANSFORM_FEEDBACK_BUFFER, index, null);

        return this;
    }

    /**
        Delete this transform feedback.

        @method
        @return {TransformFeedback} The TransformFeedback object.
    */
    delete() {
        if (this.transformFeedback) {
            this.gl.deleteTransformFeedback(this.transformFeedback);
            this.transformFeedback = null;

            if (this.appState.transformFeedback === this) {
                this.gl.bindTransformFeedback(GL.TRANSFORM_FEEDBACK, null);
                this.appState.transformFeedback = null;
            }
        }

        return this;
    }

    /**
        Bind this transform feedback.

        @method
        @ignore
        @return {TransformFeedback} The TransformFeedback object.
    */
    bind() {
        if (this.appState.transformFeedback !== this) {
            this.gl.bindTransformFeedback(GL.TRANSFORM_FEEDBACK, this.transformFeedback);
            this.appState.transformFeedback = this;
        }

        return this;
    }

}
