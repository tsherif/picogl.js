import {test, createQuadDrawCall, loadImages, readPixel} from "../utils/test-utils.js";
import {PicoGL} from "../../src/picogl.js";

test("Texure flip y", async (t, canvas) => {

    let app = PicoGL.createApp(canvas);

    let [ bw, rb ] = await loadImages([ "../img/top-white-bottom-black.png", "../img/top-red-bottom-blue.png" ]);

    let textureBW = app.createTexture2D(bw, {
        minFilter: PicoGL.NEAREST,
        magFilter: PicoGL.NEAREST,
        flipY: true
    });
    let textureRB = app.createTexture2D(rb, {
        minFilter: PicoGL.NEAREST,
        magFilter: PicoGL.NEAREST
    });

    let fs = `
        #version 300 es
        precision highp float;

        in vec2 vUV;

        uniform sampler2D tex;

        out vec4 fragColor;

        void main() {
            fragColor = texture(tex, vUV);
        }
    `;

    let drawCall = createQuadDrawCall(app, fs)
        .texture("tex", textureBW);

    drawCall.draw();
    t.arrayEqual(readPixel(app, [ 0.5, 0.75 ]), [ 255, 255, 255, 255 ], "Top drew correctly with y flip");
    t.arrayEqual(readPixel(app, [ 0.5, 0.25 ]), [ 0, 0, 0, 255 ], "Bottom drew correctly with y flip");

    drawCall.texture("tex", textureRB)
        .draw();
    t.arrayEqual(readPixel(app, [ 0.5, 0.75 ]), [ 0, 0, 255, 255 ], "Top drew correctly without y flip");
    t.arrayEqual(readPixel(app, [ 0.5, 0.25 ]), [ 255, 0, 0, 255 ], "Bottom drew correctly without y flip");

    textureBW.data(rb);
    drawCall.texture("tex", textureBW)
        .draw();
    t.arrayEqual(readPixel(app, [ 0.5, 0.75 ]), [ 255, 0, 0, 255 ], "Top drew correctly with y flip after update");
    t.arrayEqual(readPixel(app, [ 0.5, 0.25 ]), [ 0, 0, 255, 255 ], "Bottom drew correctly with y flip after update");

    t.done();
});
