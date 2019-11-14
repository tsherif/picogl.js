import {PicoGL} from "../../src/picogl.js";

picoTest("PicoGL", (t) => {
    t.ok(PicoGL, "PicoGL was loaded");
    t.ok(typeof PicoGL.FLOAT === "number", "PicoGL.FLOAT is a number");
    t.ok(typeof PicoGL.COMPRESSED_SRGB_S3TC_DXT1_EXT === "number", "PicoGL.COMPRESSED_SRGB_S3TC_DXT1_EXT is a number");
    t.done();
});

picoTest("PicoGL.createApp", (t, canvas) => {
    let app = PicoGL.createApp(canvas);

    t.ok(app, "App was created");
    t.ok(typeof PicoGL.WEBGL_INFO.MAX_TEXTURE_UNITS === "number", "WEBGL_INFO initialized");
    t.done();
});
