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

picoTest("VertexBuffer and VertexArray lifecycle", (t, canvas) => {
    let app = PicoGL.createApp(canvas);
    let buffer = app.createVertexBuffer(PicoGL.FLOAT, 2, new Float32Array([ 0, 0, 1, 1 ]));
    
    t.ok(buffer.gl, "VertexBuffer contains a gl context");
    t.ok(buffer.appState, "App state tracking initialized");
    t.ok(buffer.buffer, "VertexBuffer created a buffer");
    t.ok(buffer.buffer instanceof WebGLBuffer, "VertexBuffer created buffer instance");
    t.equal(buffer.type, PicoGL.FLOAT, "VertexBuffer type set");
    t.equal(buffer.itemSize, 2, "VertexBuffer item size set");
    t.equal(buffer.numItems, 2, "VertexBuffer number of items set");
    t.equal(buffer.binding, PicoGL.ARRAY_BUFFER, "VertexBuffer binding set");

    app.gl.bindBuffer(PicoGL.ARRAY_BUFFER, buffer.buffer);
    t.bufferEqual(app.gl, PicoGL.ARRAY_BUFFER, [ 0, 0, 1, 1 ], "VertexBuffer data was set");

    buffer.data(new Float32Array([ 2, 2, 3, 3 ]));
    app.gl.bindBuffer(PicoGL.ARRAY_BUFFER, buffer.buffer);
    t.bufferEqual(app.gl, PicoGL.ARRAY_BUFFER, [ 2, 2, 3, 3 ], "VertexBuffer data was set");

    let vertexArray = app.createVertexArray();
    
    t.ok(vertexArray.gl, "VertexArray contains a gl context");
    t.ok(vertexArray.appState, "App state tracking initialized");
    t.equal(vertexArray.vertexArray, null, "VertexArray starts out null");
    t.equal(vertexArray.numElements, 0, "VertexArray starts out with 0 elements");
    t.equal(vertexArray.numInstances, 1, "VertexArray starts out with 1 instance");

    vertexArray.vertexAttributeBuffer(0, buffer);
    t.ok(vertexArray.vertexArray, "VertexArray created a vertexArray");
    t.ok(vertexArray.vertexArray instanceof WebGLVertexArrayObject, "VertexArray created vertexArray instance");
    t.equal(vertexArray.numElements, 2, "VertexArray updates to buffer's number of elements");
    t.equal(vertexArray.numInstances, 1, "VertexArray updates to buffer's number of instances");

    vertexArray.bind();
    t.equal(app.state.vertexArray, vertexArray, "State tracks vertexArray");

    vertexArray.restore();
    t.equal(app.state.vertexArray, null, "Restore resets vertexArray");

    vertexArray.bind();
    t.equal(app.state.vertexArray, vertexArray, "State tracks vertexArray");

    vertexArray.delete();
    t.equal(vertexArray.vertexArray, null, "VertexArray object deleted");
    t.equal(app.state.vertexArray, null, "State resets vertexArray");

    buffer.delete();
    t.equal(buffer.buffer, null, "VertexBuffer object deleted");

    t.done();
});

picoTest("VertexBuffer and VertexArray draw", (t, canvas) => {
    let app = PicoGL.createApp(canvas);
    let vertexPositions = app.createVertexBuffer(PicoGL.FLOAT, 2, new Float32Array([
        -0.5, 0.5,
        -0.5, -0.5,
        0.5, 0.5,
        0.5, -0.5
    ]));
    let instanceOffsets = app.createVertexBuffer(PicoGL.FLOAT, 2, new Float32Array([
        -0.5, 0.5,
        -0.5, -0.5,
        0.5, 0.5,
        0.5, -0.5
    ]));
    let instanceColors = app.createVertexBuffer(PicoGL.UNSIGNED_BYTE, 3, new Uint8Array([
        255, 0, 0,
        0, 255, 0,
        0, 0, 255,
        255, 255, 0
    ]));

    let vertexArray = app.createVertexArray()
        .vertexAttributeBuffer(0, vertexPositions)
        .instanceAttributeBuffer(1, instanceOffsets)
        .instanceAttributeBuffer(2, instanceColors, {normalized: true});

    t.equal(vertexArray.numElements, 4, "VertexArray updates to buffer's number of elements");
    t.equal(vertexArray.numInstances, 4, "VertexArray updates to buffer's number of instances");

    let vs = `
        #version 300 es

        layout(location=0) in vec4 positions;
        layout(location=1) in vec2 offsets;
        layout(location=2) in vec3 colors;

        out vec3 vColor;

        void main() {
            gl_Position = positions;
            gl_Position.xy += offsets;
            vColor = colors;
        }
    `;

    let fs = `
        #version 300 es
        precision highp float;

        in vec3 vColor;

        out vec4 fragColor;

        void main() {
            fragColor = vec4(vColor, 1.0);
        }
    `;

    let program = app.createProgram(vs, fs);

    app.createDrawCall(program, vertexArray)
        .primitive(PicoGL.TRIANGLE_STRIP)
        .draw();

    t.pixelEqual(app.gl, [ 0.25, 0.75 ], [ 255, 0, 0, 255 ], "Top left color is correct");
    t.pixelEqual(app.gl, [ 0.25, 0.25 ], [ 0, 255, 0, 255 ], "Top left color is correct");
    t.pixelEqual(app.gl, [ 0.75, 0.75 ], [ 0, 0, 255, 255 ], "Top left color is correct");
    t.pixelEqual(app.gl, [ 0.75, 0.25 ], [ 255, 255, 0, 255 ], "Top left color is correct");

    t.done();
});


