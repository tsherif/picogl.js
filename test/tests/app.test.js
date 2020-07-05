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

const TEST_COLOR_MASK = [ true, false, false, true ];
const TEST_COLOR = [ 0, 0.25, 0.5, 0.75 ];
const TEST_DEPTH_RANGE = [ 0.25, 0.5 ];
const TEST_SCISSOR_BOX = [ 10, 10, 10, 10 ];
const TEST_POLYGON_OFFSET = [ 1, 2 ];
const TEST_VIEWPORT = [ 20, 20, 30, 30 ];

glcheck("App", (t, canvas) => {
    let app = PicoGL.createApp(canvas);

    t.ok(app.gl, "App contains a gl context");
    t.ok(app.gl instanceof WebGL2RenderingContext, "Created WebGL 2 context");
    t.ok(app.state, "App state tracking initialized");

    app.resize(20, 30);
    t.equal(app.width, 20, "App width was resized");
    t.equal(app.height, 30, "App height was resized");

    t.done();
});

glcheck("App state functions", (t, canvas) => {
    let app = PicoGL.createApp(canvas);
    let gl = app.gl;

    app.colorMask(...TEST_COLOR_MASK);
    t.parameterEqual(gl, PicoGL.COLOR_WRITEMASK, TEST_COLOR_MASK, "Color mask set");

    app.clearColor(...TEST_COLOR);
    t.parameterEqual(gl, PicoGL.COLOR_CLEAR_VALUE, TEST_COLOR, "Clear color set");

    app.depthRange(...TEST_DEPTH_RANGE);
    t.parameterEqual(gl, PicoGL.DEPTH_RANGE, TEST_DEPTH_RANGE, "Depth range set");
    
    app.depthTest();
    t.parameterEqual(gl, PicoGL.DEPTH_TEST, true, "Depth test set");

    app.noDepthTest();
    t.parameterEqual(gl, PicoGL.DEPTH_TEST, false, "Depth test set");

    app.depthMask(false);
    t.parameterEqual(gl, PicoGL.DEPTH_WRITEMASK, false, "Depth mask set");

    app.depthFunc(PicoGL.NEVER);
    t.parameterEqual(gl, PicoGL.DEPTH_FUNC, PicoGL.NEVER, "Depth func set");
    
    app.blend();
    t.parameterEqual(gl, PicoGL.BLEND, true, "Blend set");
    
    app.noBlend();
    t.parameterEqual(gl, PicoGL.BLEND, false, "Blend set");
    
    app.blendFunc(PicoGL.SRC_ALPHA, PicoGL.ONE_MINUS_SRC_ALPHA);
    t.parameterEqual(gl, PicoGL.BLEND_SRC_RGB, PicoGL.SRC_ALPHA, "Blend func src rgb set");
    t.parameterEqual(gl, PicoGL.BLEND_SRC_ALPHA, PicoGL.SRC_ALPHA, "Blend func src alpha set");
    t.parameterEqual(gl, PicoGL.BLEND_DST_RGB, PicoGL.ONE_MINUS_SRC_ALPHA, "Blend func dst rgb set");
    t.parameterEqual(gl, PicoGL.BLEND_DST_ALPHA, PicoGL.ONE_MINUS_SRC_ALPHA, "Blend func dst alpha set");
    
    app.blendFuncSeparate(PicoGL.ONE, PicoGL.ZERO, PicoGL.ZERO, PicoGL.ONE);
    t.parameterEqual(gl, PicoGL.BLEND_SRC_RGB, PicoGL.ONE, "Blend func src rgb set");
    t.parameterEqual(gl, PicoGL.BLEND_SRC_ALPHA, PicoGL.ZERO, "Blend func src alpha set");
    t.parameterEqual(gl, PicoGL.BLEND_DST_RGB, PicoGL.ZERO, "Blend func dst rgb set");
    t.parameterEqual(gl, PicoGL.BLEND_DST_ALPHA, PicoGL.ONE, "Blend func dst alpha set");
    
    app.blendEquation(PicoGL.MIN);
    t.parameterEqual(gl, PicoGL.BLEND_EQUATION, PicoGL.MIN, "Blend equation set");

    app.noRasterize();
    t.parameterEqual(gl, PicoGL.RASTERIZER_DISCARD, true, "Discarding rasterization");

    app.rasterize();
    t.parameterEqual(gl, PicoGL.RASTERIZER_DISCARD, false, "Rasterizing");

    app.cullBackfaces();
    t.parameterEqual(gl, PicoGL.CULL_FACE, true, "Culling set");

    app.drawBackfaces();
    t.parameterEqual(gl, PicoGL.CULL_FACE, false, "Culling set");

    app.stencilTest();
    t.parameterEqual(gl, PicoGL.STENCIL_TEST, true, "Stencil test set");

    app.noStencilTest();
    t.parameterEqual(gl, PicoGL.STENCIL_TEST, false, "Stencil test set");

    app.stencilMask(10101);
    t.parameterEqual(gl, PicoGL.STENCIL_WRITEMASK, 10101, "Stencil mask set");

    app.stencilMaskSeparate(PicoGL.FRONT, 110011);
    app.stencilMaskSeparate(PicoGL.BACK, 101101);
    t.parameterEqual(gl, PicoGL.STENCIL_WRITEMASK, 110011, "Stencil front mask set");
    t.parameterEqual(gl, PicoGL.STENCIL_BACK_WRITEMASK, 101101, "Stencil back mask set");

    app.stencilFunc(PicoGL.NEVER, 1, 1001);
    t.parameterEqual(gl, PicoGL.STENCIL_FUNC, PicoGL.NEVER, "Stencil func set");
    t.parameterEqual(gl, PicoGL.STENCIL_REF, 1, "Stencil ref set");
    t.parameterEqual(gl, PicoGL.STENCIL_VALUE_MASK, 1001, "Stencil value mask set");


    app.stencilFuncSeparate(PicoGL.FRONT, PicoGL.LESS, 2, 101);
    app.stencilFuncSeparate(PicoGL.BACK, PicoGL.GREATER, 4, 111);
    t.parameterEqual(gl, PicoGL.STENCIL_FUNC, PicoGL.LESS, "Stencil func set");
    t.parameterEqual(gl, PicoGL.STENCIL_REF, 2, "Stencil ref set");
    t.parameterEqual(gl, PicoGL.STENCIL_VALUE_MASK, 101, "Stencil value mask set");
    t.parameterEqual(gl, PicoGL.STENCIL_BACK_FUNC, PicoGL.GREATER, "Stencil back func set");
    t.parameterEqual(gl, PicoGL.STENCIL_BACK_REF, 4, "Stencil back ref set");
    t.parameterEqual(gl, PicoGL.STENCIL_BACK_VALUE_MASK, 111, "Stencil back value mask set");

    app.stencilOp(PicoGL.INCR, PicoGL.DECR, PicoGL.INVERT);
    t.parameterEqual(gl, PicoGL.STENCIL_FAIL, PicoGL.INCR, "Stencil op pass set");
    t.parameterEqual(gl, PicoGL.STENCIL_PASS_DEPTH_FAIL, PicoGL.DECR, "Stencil op pass, depth fail set");
    t.parameterEqual(gl, PicoGL.STENCIL_PASS_DEPTH_PASS, PicoGL.INVERT, "Stencil op pass, depth pass set");

    app.stencilOpSeparate(PicoGL.FRONT, PicoGL.ZERO, PicoGL.REPLACE, PicoGL.INCR);
    app.stencilOpSeparate(PicoGL.BACK, PicoGL.INCR_WRAP, PicoGL.DECR, PicoGL.DECR_WRAP);
    t.parameterEqual(gl, PicoGL.STENCIL_FAIL, PicoGL.ZERO, "Stencil op front pass set");
    t.parameterEqual(gl, PicoGL.STENCIL_PASS_DEPTH_FAIL, PicoGL.REPLACE, "Stencil op front pass, depth fail set");
    t.parameterEqual(gl, PicoGL.STENCIL_PASS_DEPTH_PASS, PicoGL.INCR, "Stencil op front pass, depth pass set");
    t.parameterEqual(gl, PicoGL.STENCIL_BACK_FAIL, PicoGL.INCR_WRAP, "Stencil op back pass set");
    t.parameterEqual(gl, PicoGL.STENCIL_BACK_PASS_DEPTH_FAIL, PicoGL.DECR, "Stencil op back pass, depth fail set");
    t.parameterEqual(gl, PicoGL.STENCIL_BACK_PASS_DEPTH_PASS, PicoGL.DECR_WRAP, "Stencil op back pass, depth pass set");

    
    app.scissorTest();
    t.parameterEqual(gl, PicoGL.SCISSOR_TEST, true, "Scissor test set");

    app.noScissorTest();
    t.parameterEqual(gl, PicoGL.SCISSOR_TEST, false, "Scissor test set");
    
    app.scissor(...TEST_SCISSOR_BOX);
    t.parameterEqual(gl, PicoGL.SCISSOR_BOX, TEST_SCISSOR_BOX, "Scissor box set");

    app.polygonOffset(...TEST_POLYGON_OFFSET);
    t.parameterEqual(gl, PicoGL.POLYGON_OFFSET_FACTOR, TEST_POLYGON_OFFSET[0], "Polygon offset factor set");
    t.parameterEqual(gl, PicoGL.POLYGON_OFFSET_UNITS, TEST_POLYGON_OFFSET[1], "Polygon offset units set");

    app.viewport(...TEST_VIEWPORT);
    t.parameterEqual(gl, PicoGL.VIEWPORT, TEST_VIEWPORT, "Viewport set");    

    app.defaultViewport();
    t.parameterEqual(gl, PicoGL.VIEWPORT, [ 0, 0, app.width, app.height ], "Viewport reset");    

    t.done();
});

glcheck("App context loss", async (t, canvas) => {
    let app = PicoGL.createApp(canvas);

    app.onContextRestored(() => {
        t.ok(true, "Context restored handler was called");

        app.onContextRestored(null);
        t.equal(app.contextRestoredHandler, null, "Context restored handler was removed");

        t.done();
    });

    app.loseContext();

    await t.loopUntil(() => app.gl.isContextLost());

    app.restoreContext();
});

glcheck("App clear", (t, canvas) => {
    let app = PicoGL.createApp(canvas);

    app.clearColor(1, 0, 0, 1);
    app.clearMask(PicoGL.COLOR_BUFFER_BIT);
    app.clear();
    t.pixelEqual(app.gl, [ 255, 0, 0, 255 ], "Framebuffer cleared");

    app.clearColor(0, 0, 1, 1);
    app.clearMask(PicoGL.DEPTH_BUFFER_BIT);
    app.clear();
    t.pixelNotEqual(app.gl, [ 0, 0, 255, 255 ], "Framebuffer not cleared");

    app.clearMask(PicoGL.COLOR_BUFFER_BIT);
    app.clear();
    t.pixelEqual(app.gl, [ 0, 0, 255, 255 ], "Framebuffer not cleared");

    t.done();
});

glcheck("App readPixel", (t, canvas) => {
    let app = PicoGL.createApp(canvas);

    app.clearColor(1, 0, 0, 1);
    app.clearMask(PicoGL.COLOR_BUFFER_BIT);
    app.clear();

    let result = new Uint8Array(4);

    app.readPixel(app.width / 2, app.height / 2, result);

    t.pixelEqual(app.gl, result, "Pixel read");

    t.done();
});
