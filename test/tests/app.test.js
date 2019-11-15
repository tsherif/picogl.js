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

picoTest("App", (t, canvas) => {
    let app = PicoGL.createApp(canvas);

    t.ok(app.gl, "App contains a gl context");
    t.ok(app.gl instanceof WebGL2RenderingContext, "Created WebGL 2 context");
    t.ok(app.state, "App state tracking initialized");

    t.done();
});

picoTest("App state functions", (t, canvas) => {
    let app = PicoGL.createApp(canvas);
    let gl = app.gl;

    app.colorMask(...TEST_COLOR_MASK);
    t.glParameterEqual(gl, PicoGL.COLOR_WRITEMASK, TEST_COLOR_MASK, "Color mask set");

    app.clearColor(...TEST_COLOR);
    t.glParameterEqual(gl, PicoGL.COLOR_CLEAR_VALUE, TEST_COLOR, "Clear color set");

    app.depthRange(...TEST_DEPTH_RANGE);
    t.glParameterEqual(gl, PicoGL.DEPTH_RANGE, TEST_DEPTH_RANGE, "Depth range set");
    
    app.depthTest();
    t.glParameterEqual(gl, PicoGL.DEPTH_TEST, true, "Depth test set");

    app.noDepthTest();
    t.glParameterEqual(gl, PicoGL.DEPTH_TEST, false, "Depth test set");

    app.depthMask(false);
    t.glParameterEqual(gl, PicoGL.DEPTH_WRITEMASK, false, "Depth mask set");

    app.depthFunc(PicoGL.NEVER);
    t.glParameterEqual(gl, PicoGL.DEPTH_FUNC, PicoGL.NEVER, "Depth func set");
    
    app.blend();
    t.glParameterEqual(gl, PicoGL.BLEND, true, "Blend set");
    
    app.noBlend();
    t.glParameterEqual(gl, PicoGL.BLEND, false, "Blend set");
    
    app.blendFunc(PicoGL.SRC_ALPHA, PicoGL.ONE_MINUS_SRC_ALPHA);
    t.glParameterEqual(gl, PicoGL.BLEND_SRC_RGB, PicoGL.SRC_ALPHA, "Blend func src rgb set");
    t.glParameterEqual(gl, PicoGL.BLEND_SRC_ALPHA, PicoGL.SRC_ALPHA, "Blend func src alpha set");
    t.glParameterEqual(gl, PicoGL.BLEND_DST_RGB, PicoGL.ONE_MINUS_SRC_ALPHA, "Blend func dst rgb set");
    t.glParameterEqual(gl, PicoGL.BLEND_DST_ALPHA, PicoGL.ONE_MINUS_SRC_ALPHA, "Blend func dst alpha set");
    
    app.blendFuncSeparate(PicoGL.ONE, PicoGL.ZERO, PicoGL.ZERO, PicoGL.ONE);
    t.glParameterEqual(gl, PicoGL.BLEND_SRC_RGB, PicoGL.ONE, "Blend func src rgb set");
    t.glParameterEqual(gl, PicoGL.BLEND_SRC_ALPHA, PicoGL.ZERO, "Blend func src alpha set");
    t.glParameterEqual(gl, PicoGL.BLEND_DST_RGB, PicoGL.ZERO, "Blend func dst rgb set");
    t.glParameterEqual(gl, PicoGL.BLEND_DST_ALPHA, PicoGL.ONE, "Blend func dst alpha set");
    
    app.blendEquation(PicoGL.MIN);
    t.glParameterEqual(gl, PicoGL.BLEND_EQUATION, PicoGL.MIN, "Blend equation set");

    app.noRasterize();
    t.glParameterEqual(gl, PicoGL.RASTERIZER_DISCARD, true, "Discarding rasterization");

    app.rasterize();
    t.glParameterEqual(gl, PicoGL.RASTERIZER_DISCARD, false, "Rasterizing");

    app.cullBackfaces();
    t.glParameterEqual(gl, PicoGL.CULL_FACE, true, "Culling set");

    app.drawBackfaces();
    t.glParameterEqual(gl, PicoGL.CULL_FACE, false, "Culling set");


    app.stencilTest();
    t.glParameterEqual(gl, PicoGL.STENCIL_TEST, true, "Stencil test set");

    app.noStencilTest();
    t.glParameterEqual(gl, PicoGL.STENCIL_TEST, false, "Stencil test set");

    app.stencilMask(10101);
    t.glParameterEqual(gl, PicoGL.STENCIL_WRITEMASK, 10101, "Stencil mask set");

    app.stencilMaskSeparate(PicoGL.FRONT, 110011);
    app.stencilMaskSeparate(PicoGL.BACK, 101101);
    t.glParameterEqual(gl, PicoGL.STENCIL_WRITEMASK, 110011, "Stencil front mask set");
    t.glParameterEqual(gl, PicoGL.STENCIL_BACK_WRITEMASK, 101101, "Stencil back mask set");

    app.stencilFunc(PicoGL.NEVER, 1, 1001);
    t.glParameterEqual(gl, PicoGL.STENCIL_FUNC, PicoGL.NEVER, "Stencil func set");
    t.glParameterEqual(gl, PicoGL.STENCIL_REF, 1, "Stencil ref set");
    t.glParameterEqual(gl, PicoGL.STENCIL_VALUE_MASK, 1001, "Stencil value mask set");


    app.stencilFuncSeparate(PicoGL.FRONT, PicoGL.LESS, 2, 101);
    app.stencilFuncSeparate(PicoGL.BACK, PicoGL.GREATER, 4, 111);
    t.glParameterEqual(gl, PicoGL.STENCIL_FUNC, PicoGL.LESS, "Stencil func set");
    t.glParameterEqual(gl, PicoGL.STENCIL_REF, 2, "Stencil ref set");
    t.glParameterEqual(gl, PicoGL.STENCIL_VALUE_MASK, 101, "Stencil value mask set");
    t.glParameterEqual(gl, PicoGL.STENCIL_BACK_FUNC, PicoGL.GREATER, "Stencil back func set");
    t.glParameterEqual(gl, PicoGL.STENCIL_BACK_REF, 4, "Stencil back ref set");
    t.glParameterEqual(gl, PicoGL.STENCIL_BACK_VALUE_MASK, 111, "Stencil back value mask set");

    app.stencilOp(PicoGL.INCR, PicoGL.DECR, PicoGL.INVERT);
    t.glParameterEqual(gl, PicoGL.STENCIL_FAIL, PicoGL.INCR, "Stencil op pass set");
    t.glParameterEqual(gl, PicoGL.STENCIL_PASS_DEPTH_FAIL, PicoGL.DECR, "Stencil op pass, depth fail set");
    t.glParameterEqual(gl, PicoGL.STENCIL_PASS_DEPTH_PASS, PicoGL.INVERT, "Stencil op pass, depth pass set");

    app.stencilOpSeparate(PicoGL.FRONT, PicoGL.ZERO, PicoGL.REPLACE, PicoGL.INCR);
    app.stencilOpSeparate(PicoGL.BACK, PicoGL.INCR_WRAP, PicoGL.DECR, PicoGL.DECR_WRAP);
    t.glParameterEqual(gl, PicoGL.STENCIL_FAIL, PicoGL.ZERO, "Stencil op front pass set");
    t.glParameterEqual(gl, PicoGL.STENCIL_PASS_DEPTH_FAIL, PicoGL.REPLACE, "Stencil op front pass, depth fail set");
    t.glParameterEqual(gl, PicoGL.STENCIL_PASS_DEPTH_PASS, PicoGL.INCR, "Stencil op front pass, depth pass set");
    t.glParameterEqual(gl, PicoGL.STENCIL_BACK_FAIL, PicoGL.INCR_WRAP, "Stencil op back pass set");
    t.glParameterEqual(gl, PicoGL.STENCIL_BACK_PASS_DEPTH_FAIL, PicoGL.DECR, "Stencil op back pass, depth fail set");
    t.glParameterEqual(gl, PicoGL.STENCIL_BACK_PASS_DEPTH_PASS, PicoGL.DECR_WRAP, "Stencil op back pass, depth pass set");

    
    app.scissorTest();
    t.glParameterEqual(gl, PicoGL.SCISSOR_TEST, true, "Scissor test set");

    app.noScissorTest();
    t.glParameterEqual(gl, PicoGL.SCISSOR_TEST, false, "Scissor test set");
    
    app.scissor(...TEST_SCISSOR_BOX);
    t.glParameterEqual(gl, PicoGL.SCISSOR_BOX, TEST_SCISSOR_BOX, "Scissor box set");

    t.done();
});

picoTest("App context loss", (t, canvas) => {
    let app = PicoGL.createApp(canvas);

    app.onContextLost(() => {
        requestAnimationFrame(() => app.restoreContext());
    });

    app.onContextRestored(() => {
        t.ok(true);
        t.done();
    });
    app.loseContext();
});
