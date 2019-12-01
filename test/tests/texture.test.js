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

import {createQuadDrawCall, loadImages} from "./utils.js";
import {PicoGL} from "../../src/picogl.js";

glcheck("Texture lifecycle", (t, canvas) => {
    let app = PicoGL.createApp(canvas);
    let texture = app.createTexture2D(new Uint8Array([ 255, 255, 255, 255 ]), 1, 1);

    t.ok(texture.gl, "Texture contains a gl context");
    t.ok(texture.appState, "App state tracking initialized");
    t.ok(texture.texture, "Texture created a texture");
    t.ok(texture.texture instanceof WebGLTexture, "Texture created texture instance");
    t.equal(texture.binding, PicoGL.TEXTURE_2D, "Texture binding set");
    t.equal(texture.width, 1, "Texture width set");
    t.equal(texture.height, 1, "Texture height set");

    texture.bind(1);
    t.equal(texture.currentUnit, 1, "Texture tracking its texture unit");
    t.equal(app.state.textures[1], texture, "State tracking tracks texture unit");

    texture.delete();
    t.equal(texture.texture, null, "Texture object deleted");
    t.equal(texture.currentUnit, -1, "Texture unit reset");
    t.equal(app.state.textures[1], null, "State tracking reset");
    t.done();
});

glcheck("Texture empty", (t, canvas) => {
    let app = PicoGL.createApp(canvas);
    let texture = app.createTexture2D(2, 2);

    t.ok(texture.texture, "Texture created a texture");
    t.equal(texture.width, 2, "Texture width set");
    t.equal(texture.height, 2, "Texture height set");

    t.done();
});

glcheck("Texture3D lifecycle", (t, canvas) => {
    let app = PicoGL.createApp(canvas);
    let texture = app.createTexture3D(new Uint8Array([
        255, 255, 255, 255, 
        255, 255, 255, 255, 
        255, 255, 255, 255, 
        255, 255, 255, 255, 
        255, 255, 255, 255, 
        255, 255, 255, 255, 
        255, 255, 255, 255, 
        255, 255, 255, 255
    ]), 2, 2, 2);

    t.ok(texture.gl, "Texture contains a gl context");
    t.ok(texture.appState, "App state tracking initialized");
    t.ok(texture.texture, "Texture created a texture");
    t.ok(texture.texture instanceof WebGLTexture, "Texture created texture instance");
    t.equal(texture.binding, PicoGL.TEXTURE_3D, "Texture binding set");
    t.equal(texture.width, 2, "Texture width set");
    t.equal(texture.height, 2, "Texture height set");
    t.equal(texture.depth, 2, "Texture depth set");

    texture.bind(1);
    t.equal(texture.currentUnit, 1, "Texture tracking its texture unit");
    t.equal(app.state.textures[1], texture, "State tracking tracks texture unit");

    texture.delete();
    t.equal(texture.texture, null, "Texture object deleted");
    t.equal(texture.currentUnit, -1, "Texture unit reset");
    t.equal(app.state.textures[1], null, "State tracking reset");
    t.done();
});

glcheck("Texture3D empty", (t, canvas) => {
    let app = PicoGL.createApp(canvas);
    let texture = app.createTexture3D(2, 2, 2);

    t.ok(texture.texture, "Texture created a texture");
    t.equal(texture.width, 2, "Texture width set");
    t.equal(texture.height, 2, "Texture height set");
    t.equal(texture.depth, 2, "Texture depth set");

    t.done();
});

glcheck("TextureArray lifecycle", (t, canvas) => {
    let app = PicoGL.createApp(canvas);
    let texture = app.createTextureArray(new Uint8Array([
        255, 255, 255, 255, 
        255, 255, 255, 255, 
        255, 255, 255, 255, 
        255, 255, 255, 255, 
        255, 255, 255, 255, 
        255, 255, 255, 255, 
        255, 255, 255, 255, 
        255, 255, 255, 255
    ]), 2, 2, 2);

    t.ok(texture.gl, "Texture contains a gl context");
    t.ok(texture.appState, "App state tracking initialized");
    t.ok(texture.texture, "Texture created a texture");
    t.ok(texture.texture instanceof WebGLTexture, "Texture created texture instance");
    t.equal(texture.binding, PicoGL.TEXTURE_2D_ARRAY, "Texture binding set");
    t.equal(texture.width, 2, "Texture width set");
    t.equal(texture.height, 2, "Texture height set");
    t.equal(texture.depth, 2, "Texture depth set");

    texture.bind(1);
    t.equal(texture.currentUnit, 1, "Texture tracking its texture unit");
    t.equal(app.state.textures[1], texture, "State tracking tracks texture unit");

    texture.delete();
    t.equal(texture.texture, null, "Texture object deleted");
    t.equal(texture.currentUnit, -1, "Texture unit reset");
    t.equal(app.state.textures[1], null, "State tracking reset");
    t.done();
});

glcheck("TextureArray empty", (t, canvas) => {
    let app = PicoGL.createApp(canvas);
    let texture = app.createTextureArray(2, 2, 2);

    t.ok(texture.texture, "Texture created a texture");
    t.equal(texture.width, 2, "Texture width set");
    t.equal(texture.height, 2, "Texture height set");
    t.equal(texture.depth, 2, "Texture depth set");

    t.done();
});

glcheck("Texure flip y", async (t, canvas) => {

    let app = PicoGL.createApp(canvas);

    let [ bw, rb ] = await loadImages([ "assets/img/top-white-bottom-black.png", "assets/img/top-red-bottom-blue.png" ]);

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
    t.pixelEqual(app.gl, [ 0.5, 0.75 ], [ 255, 255, 255, 255 ], "Top drew correctly with y flip");
    t.pixelEqual(app.gl, [ 0.5, 0.25 ], [ 0, 0, 0, 255 ], "Bottom drew correctly with y flip");

    drawCall.texture("tex", textureRB)
        .draw();
    t.pixelEqual(app.gl, [ 0.5, 0.75 ], [ 0, 0, 255, 255 ], "Top drew correctly without y flip");
    t.pixelEqual(app.gl, [ 0.5, 0.25 ], [ 255, 0, 0, 255 ], "Bottom drew correctly without y flip");

    textureBW.data(rb);
    drawCall.texture("tex", textureBW)
        .draw();
    t.pixelEqual(app.gl, [ 0.5, 0.75 ], [ 255, 0, 0, 255 ], "Top drew correctly with y flip after update");
    t.pixelEqual(app.gl, [ 0.5, 0.25 ], [ 0, 0, 255, 255 ], "Bottom drew correctly with y flip after update");

    t.done();
});

glcheck("Texure draw after update", (t, canvas) => {

    let app = PicoGL.createApp(canvas);

    let red = new Uint8Array([ 255, 0, 0, 255 ]);
    let blue = new Uint8Array([ 0, 0, 255, 255 ]);

    let texture1 = app.createTexture2D(red, 1, 1, {
        minFilter: PicoGL.NEAREST,
        magFilter: PicoGL.NEAREST
    });

    let texture2 = app.createTexture2D(blue, 1, 1, {
        minFilter: PicoGL.NEAREST,
        magFilter: PicoGL.NEAREST
    });

    let fs = `
        #version 300 es
        precision highp float;

        in vec2 vUV;

        uniform sampler2D tex1;
        uniform sampler2D tex2;

        uniform float whichTex;

        out vec4 fragColor;

        void main() {
            if (whichTex == 1.0) {
                fragColor = texture(tex1, vUV);
            } else {
                fragColor = texture(tex2, vUV);
            }
        }
    `;

    let drawCall = createQuadDrawCall(app, fs)
        .texture("tex1", texture1)
        .texture("tex2", texture2);

    drawCall.uniform("whichTex", 1).draw();
    t.pixelEqual(app.gl, [ 255, 0, 0, 255 ], "Drew correctly before update");

    drawCall.uniform("whichTex", 2).draw();
    t.pixelEqual(app.gl, [ 0, 0, 255, 255 ], "Drew correctly before update");

    texture1.data(blue);
    texture2.data(red);

    drawCall.uniform("whichTex", 1).draw();
    t.pixelEqual(app.gl, [ 0, 0, 255, 255 ], "Drew correctly after update");


    drawCall.uniform("whichTex", 2).draw();
    t.pixelEqual(app.gl, [ 255, 0, 0, 255 ], "Drew correctly after update");

    t.done();
});
