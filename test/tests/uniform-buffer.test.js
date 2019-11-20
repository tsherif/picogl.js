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

import {createQuadDrawCall} from "./utils.js";
import {PicoGL} from "../../src/picogl.js";

glTest("UniformBuffer lifecycle", (t, canvas) => {
    let app = PicoGL.createApp(canvas);
    let ubo = app.createUniformBuffer([ PicoGL.FLOAT_VEC4 ]);

    t.ok(ubo.gl, "UBO contains a gl context");
    t.ok(ubo.appState, "App state tracking initialized");
    t.ok(ubo.buffer, "UBO created a uniformBuffer");
    t.ok(ubo.buffer instanceof WebGLBuffer, "UBO created uniformBuffer instance");
    t.equal(ubo.currentBase, -1, "UBO starts unbound");
    t.equal(ubo.dirtyEnd, 0, "UBO starts not dirty");

    ubo.bind(1);
    t.equal(ubo.currentBase, 1, "UBO tracking its base");
    t.equal(app.state.uniformBuffers[1], ubo, "State tracking tracks uniform buffer base");


    ubo.delete();
    t.equal(ubo.buffer, null, "UBO was deleted");
    t.equal(ubo.currentBase, -1, "UBO resets base");
    t.equal(app.state.uniformBuffers[1], null, "State tracking resets uniform buffer base");

    t.done();
});

glTest("UniformBuffer setting", (t, canvas) => {
    let app = PicoGL.createApp(canvas);
    let ubo = app.createUniformBuffer([
        PicoGL.FLOAT_VEC4,
        PicoGL.FLOAT_VEC2,
        PicoGL.FLOAT_MAT4
    ]);

    t.equal(ubo.size, 24, "Size is correct");
    t.arrayEqual(ubo.data, [
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0
    ], "UBO starts empty");

    ubo.set(1, [ 1, 2 ]);
    t.equal(ubo.dirtyStart, 4, "UBO dirty start reset after udpate");
    t.equal(ubo.dirtyEnd, 6, "UBO dirty end set");
    t.arrayEqual(ubo.data, [
        0, 0, 0, 0,
        1, 2, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0
    ], "UBO data updated");

    ubo.set(0, [ 1, 2, 3, 4 ]);
    t.equal(ubo.dirtyStart, 0, "UBO dirty start set");
    t.equal(ubo.dirtyEnd, 6, "UBO dirty end set");
    t.arrayEqual(ubo.data, [
        1, 2, 3, 4,
        1, 2, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0,
        0, 0, 0, 0
    ], "UBO data updated");

    ubo.set(2, [
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, 10, 11, 12,
        13, 14, 15, 16
    ]);
    t.equal(ubo.dirtyStart, 0, "UBO dirty start set");
    t.equal(ubo.dirtyEnd, 24, "UBO dirty end set");
    t.arrayEqual(ubo.data, [
        1, 2, 3, 4,
        1, 2, 0, 0,
        1, 2, 3, 4,
        5, 6, 7, 8,
        9, 10, 11, 12,
        13, 14, 15, 16
    ], "UBO data updated");

    ubo.update();
    t.equal(ubo.dirtyStart, ubo.size, "UBO dirty start reset after udpate");
    t.equal(ubo.dirtyEnd, 0, "UBO dirty end reset after udpate");
    

    t.done();
});

glTest("UniformBuffer drawing", (t, canvas) => {
    let app = PicoGL.createApp(canvas);
    let leftUBO = app.createUniformBuffer([
        PicoGL.FLOAT_VEC4,
        PicoGL.FLOAT_VEC4
    ]).set(0, [ 1, 0, 0, 1 ])
        .set(1, [ 0, 1, 0, 1 ])
        .update();

    let rightUBO = app.createUniformBuffer([
        PicoGL.FLOAT_VEC4,
        PicoGL.FLOAT_VEC4
    ]).set(0, [ 0, 0, 1, 1 ])
        .set(1, [ 1, 1, 0, 1 ])
        .update();

    let fs = `
        #version 300 es
        precision highp float;

        in vec2 vUV;

        layout(std140) uniform LeftColorUniforms {
            vec4 topLeftColor;
            vec4 bottomLeftColor;
        };

        layout(std140) uniform RightColorUniforms {
            vec4 topRightColor;
            vec4 bottomRightColor;
        };

        out vec4 fragColor;

        void main() {
            vec4 topColor;
            vec4 bottomColor;
            
            if (vUV.x > 0.5) {
                topColor = topRightColor;
                bottomColor = bottomRightColor;
            } else {
                topColor = topLeftColor;
                bottomColor = bottomLeftColor;
            }
            
            if (vUV.y > 0.5) {
                fragColor = topColor; 
            } else {
                fragColor = bottomColor;
            }
        }
    `;

    createQuadDrawCall(app, fs)
        .uniformBlock("LeftColorUniforms", leftUBO)
        .uniformBlock("RightColorUniforms", rightUBO)
        .draw();

    t.pixelEqual(app.gl, [ 0.25, 0.75 ], [ 255, 0, 0, 255 ], "Top left drew correctly");
    t.pixelEqual(app.gl, [ 0.25, 0.25 ], [ 0, 255, 0, 255 ], "Bottom left drew correctly");
    t.pixelEqual(app.gl, [ 0.75, 0.75 ], [ 0, 0, 255, 255 ], "Top right drew correctly");
    t.pixelEqual(app.gl, [ 0.75, 0.25 ], [ 255, 255, 0, 255 ], "Bottom right drew correctly");
    t.done();
});
