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

picoTest("Cubemap lifecycle", (t, canvas) => {
    let app = PicoGL.createApp(canvas);
    let cubemap = app.createCubemap({
        negX: new Uint8Array([ 255, 255, 255, 255 ]),
        posX: new Uint8Array([ 255, 255, 255, 255 ]),
        negY: new Uint8Array([ 255, 255, 255, 255 ]),
        posY: new Uint8Array([ 255, 255, 255, 255 ]),
        negZ: new Uint8Array([ 255, 255, 255, 255 ]),
        posZ: new Uint8Array([ 255, 255, 255, 255 ]),
        width: 1,
        height: 1
    });

    t.ok(cubemap.gl, "Cubemap contains a gl context");
    t.ok(cubemap.appState, "App state tracking initialized");
    t.ok(cubemap.texture, "Cubemap created a texture");
    t.ok(cubemap.texture instanceof WebGLTexture, "Cubemap created texture instance");
    t.equal(cubemap.width, 1, "Cubemap width set");
    t.equal(cubemap.height, 1, "Cubemap height set");

    cubemap.bind(1);
    t.equal(cubemap.currentUnit, 1, "Cubemap tracking its texture unit");
    t.equal(app.state.textures[1], cubemap, "State tracking tracks texture unit");

    cubemap.delete();
    t.equal(cubemap.texture, null, "Texture object deleted");
    t.equal(cubemap.currentUnit, -1, "Texture unit reset");
    t.equal(app.state.textures[1], null, "State tracking reset");
    t.done();
});

picoTest("Cubemap draw", (t, canvas) => {
    let app = PicoGL.createApp(canvas);
    
    let cubemap = app.createCubemap({
        negX: new Uint8Array([ 255, 255, 255, 255 ]),
        posX: new Uint8Array([ 255, 255, 255, 255 ]),
        negY: new Uint8Array([ 255, 255, 255, 255 ]),
        posY: new Uint8Array([ 255, 255, 255, 255 ]),
        negZ: new Uint8Array([ 255, 255, 255, 255 ]),
        posZ: new Uint8Array([ 255, 255, 255, 255 ]),
        width: 1,
        height: 1
    });

    let fs = `
        #version 300 es
        precision highp float;

        uniform samplerCube cubemap;

        out vec4 fragColor;

        void main() {
            fragColor = texture(cubemap, vec3(0.0, 0.0, -1.0));
        }
    `;

    let drawCall = createQuadDrawCall(app, fs)
        .texture("cubemap", cubemap);

    drawCall.draw();
    t.pixelEqual(app.gl, [ 255, 255, 255, 255 ], "Drew correctly");

    cubemap.faceData(PicoGL.TEXTURE_CUBE_MAP_NEGATIVE_Z, new Uint8Array([ 255, 0, 0, 255 ]));
    drawCall.draw();
    t.pixelEqual(app.gl, [ 255, 0, 0, 255 ], "Updated face");
    t.done();
});
