import {PicoGL} from "../../src/picogl.js";

test("App", (t, canvas) => {
    let app = PicoGL.createApp(canvas);

    t.ok(app.gl, "App contains a gl context");
    t.ok(app.gl instanceof WebGL2RenderingContext, "Created WebGL 2 context");
    t.ok(app.state, "App state tracking initialized");
});
