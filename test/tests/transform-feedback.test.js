///////////////////////////////////////////////////////////////////////////////////
// The MIT License (MIT)
//
// Copyright (c) 2019 Tarek Sherif
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

import {PicoGL} from "../../src/picogl.js";

picoTest("TransformFeedback lifecycle", (t, canvas) => {
    let app = PicoGL.createApp(canvas);
    let transformFeedback = app.createTransformFeedback();
    
    t.ok(transformFeedback.gl, "TransformFeedback contains a gl context");
    t.ok(transformFeedback.appState, "App state tracking initialized");
    t.ok(transformFeedback.transformFeedback instanceof WebGLTransformFeedback, "TransformFeedback created transformFeedback instance");

    transformFeedback.bind();
    t.equal(app.state.transformFeedback, transformFeedback, "State tracks transformFeedback");

    transformFeedback.delete();
    t.equal(transformFeedback.transformFeedback, null, "TransformFeedback was deleted");
    t.equal(app.state.transformFeedback, null, "State tracking of transformFeedback reset");

    t.done();
});

picoTest("TransformFeedback draw", (t, canvas) => {
    let app = PicoGL.createApp(canvas);
    let inputBuffer = app.createVertexBuffer(PicoGL.FLOAT, 4, new Float32Array([ 1, 2, 3, 4 ]));
    let feedbackBuffer = app.createVertexBuffer(PicoGL.FLOAT, 4, 4);

    let vertexArray = app.createVertexArray()
        .vertexAttributeBuffer(0, inputBuffer);

    let transformFeedback = app.createTransformFeedback()
        .feedbackBuffer(0, feedbackBuffer);

    let vs = `
        #version 300 es

        layout(location=0) in vec4 inputData;
        out vec4 outputData;

        void main() {
            outputData = inputData * 2.0;
        }
    `;

    let fs = `
        #version 300 es
        precision highp float;

        out vec4 fragColor;

        void main() {
            fragColor = vec4(0.0);
        }
    `;

    let program = app.createProgram(vs, fs, [ "outputData" ]);

    app.createDrawCall(program, vertexArray)
        .primitive(PicoGL.POINTS)
        .transformFeedback(transformFeedback)
        .draw();

    app.gl.bindBuffer(PicoGL.TRANSFORM_FEEDBACK_BUFFER, feedbackBuffer.buffer);
    t.bufferEqual(app.gl, PicoGL.TRANSFORM_FEEDBACK_BUFFER, [ 2, 4, 6, 8 ], "Buffer was updated");

    t.done();
});
