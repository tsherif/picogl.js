import {PicoGL} from "../../src/picogl.js";

const TEST_COLOR_MASK = [true, false, false, true];
const TEST_COLOR = [0, 0.25, 0.5, 0.75];
const TEST_DEPTH_RANGE = [0.25, 0.5];

test("App", (t, canvas) => {
    let app = PicoGL.createApp(canvas);

    t.ok(app.gl, "App contains a gl context");
    t.ok(app.gl instanceof WebGL2RenderingContext, "Created WebGL 2 context");
    t.ok(app.state, "App state tracking initialized");
});

test("App state functions", (t, canvas) => {
    let app = PicoGL.createApp(canvas);

    app.colorMask(...TEST_COLOR_MASK);
    t.deepEqual(app.gl.getParameter(PicoGL.COLOR_WRITEMASK), TEST_COLOR_MASK, "Color mask set");

    app.clearColor(...TEST_COLOR);
    t.deepEqual(Array.from(app.gl.getParameter(PicoGL.COLOR_CLEAR_VALUE)), TEST_COLOR, "Clear color set");

    app.depthRange(...TEST_DEPTH_RANGE);
    t.deepEqual(Array.from(app.gl.getParameter(PicoGL.DEPTH_RANGE)), TEST_DEPTH_RANGE, "Depth range set");
    
    app.depthTest();
    t.equal(app.gl.getParameter(PicoGL.DEPTH_TEST), true, "Depth test set");

    app.noDepthTest();
    t.equal(app.gl.getParameter(PicoGL.DEPTH_TEST), false, "Depth test set");

    app.depthMask(false);
    t.equal(app.gl.getParameter(PicoGL.DEPTH_WRITEMASK), false, "Depth mask set");

    app.depthFunc(PicoGL.NEVER);
    t.equal(app.gl.getParameter(PicoGL.DEPTH_FUNC), PicoGL.NEVER, "Depth func set");
    
    app.blend();
    t.equal(app.gl.getParameter(PicoGL.BLEND), true, "Blend set");
    
    app.noBlend();
    t.equal(app.gl.getParameter(PicoGL.BLEND), false, "Blend set");
    
    app.blendFunc(PicoGL.SRC_ALPHA, PicoGL.ONE_MINUS_SRC_ALPHA);
    t.equal(app.gl.getParameter(PicoGL.BLEND_SRC_RGB), PicoGL.SRC_ALPHA, "Blend func src rgb set");
    t.equal(app.gl.getParameter(PicoGL.BLEND_SRC_ALPHA), PicoGL.SRC_ALPHA, "Blend func src alpha set");
    t.equal(app.gl.getParameter(PicoGL.BLEND_DST_RGB), PicoGL.ONE_MINUS_SRC_ALPHA, "Blend func dst rgb set");
    t.equal(app.gl.getParameter(PicoGL.BLEND_DST_ALPHA), PicoGL.ONE_MINUS_SRC_ALPHA, "Blend func dst alpha set");
    
    app.blendFuncSeparate(PicoGL.ONE, PicoGL.ZERO, PicoGL.ZERO, PicoGL.ONE);
    t.equal(app.gl.getParameter(PicoGL.BLEND_SRC_RGB), PicoGL.ONE, "Blend func src rgb set");
    t.equal(app.gl.getParameter(PicoGL.BLEND_SRC_ALPHA), PicoGL.ZERO, "Blend func src alpha set");
    t.equal(app.gl.getParameter(PicoGL.BLEND_DST_RGB), PicoGL.ZERO, "Blend func dst rgb set");
    t.equal(app.gl.getParameter(PicoGL.BLEND_DST_ALPHA), PicoGL.ONE, "Blend func dst alpha set");
    
    app.blendEquation(PicoGL.MIN);
    t.equal(app.gl.getParameter(PicoGL.BLEND_EQUATION), PicoGL.MIN, "Blend equation set");
});
