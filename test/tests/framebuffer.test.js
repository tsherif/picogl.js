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

glcheck("Framebuffer lifecycle", (t, canvas) => {
    let app = PicoGL.createApp(canvas);
    let framebuffer = app.createFramebuffer();

    t.ok(framebuffer.gl, "Framebuffer contains a gl context");
    t.ok(framebuffer.appState, "App state tracking initialized");
    t.ok(framebuffer.framebuffer, "Framebuffer created a framebuffer");
    t.ok(framebuffer.framebuffer instanceof WebGLFramebuffer, "Framebuffer created framebuffer instance");
    t.notEqual(framebuffer.getStatus(), PicoGL.COMPLETE, "Framebuffer does not start with COMPLETE status");

    framebuffer.bindForRead();
    t.equal(app.state.readFramebuffer, framebuffer, "State tracking tracks read framebuffer");

    framebuffer.bindForDraw();
    t.equal(app.state.drawFramebuffer, framebuffer, "State tracking tracks draw framebuffer");

    framebuffer.restore();
    t.equal(app.state.readFramebuffer, null, "Restore resets read framebuffer");
    t.equal(app.state.drawFramebuffer, null, "Restore resets draw framebuffer");
    
    framebuffer.bindForRead();
    t.equal(app.state.readFramebuffer, framebuffer, "State tracking tracks read framebuffer");

    framebuffer.bindForDraw();
    t.equal(app.state.drawFramebuffer, framebuffer, "State tracking tracks draw framebuffer");

    app.defaultReadFramebuffer();
    t.equal(app.state.readFramebuffer, null, "Set default read framebuffer");

    app.defaultDrawFramebuffer();
    t.equal(app.state.drawFramebuffer, null, "Set default draw framebuffer");

    framebuffer.bindForRead();
    t.equal(app.state.readFramebuffer, framebuffer, "State tracking tracks read framebuffer");

    framebuffer.bindForDraw();
    t.equal(app.state.drawFramebuffer, framebuffer, "State tracking tracks draw framebuffer");

    framebuffer.delete();
    t.equal(framebuffer.framebuffer, null, "Framebuffer object deleted");
    t.equal(app.state.readFramebuffer, null, "State tracking resets read framebuffer");
    t.equal(app.state.drawFramebuffer, null, "State tracking resets draw framebuffer");
    t.done();
});

glcheck("Framebuffer attachments", (t, canvas) => {
    let app = PicoGL.createApp(canvas);

    let textureColorTarget = app.createTexture2D(app.width, app.height);
    let renderbufferColorTarget = app.createRenderbuffer(app.width, app.height, PicoGL.RGBA8);
    let depthTarget = app.createRenderbuffer(app.width, app.height, PicoGL.DEPTH_COMPONENT16);

    let framebuffer = app.createFramebuffer()
        .colorTarget(0, textureColorTarget)
        .colorTarget(1, renderbufferColorTarget)
        .depthTarget(depthTarget);

    t.equal(framebuffer.getStatus(), PicoGL.FRAMEBUFFER_COMPLETE, "Framebuffer has COMPLETE status after attachments");
    t.equal(framebuffer.colorAttachmentEnums[0], PicoGL.COLOR_ATTACHMENT0, "Framebuffer tracks color attachment enums");
    t.equal(framebuffer.colorAttachments[0], textureColorTarget, "Framebuffer tracks color target");
    t.equal(framebuffer.colorAttachmentEnums[1], PicoGL.COLOR_ATTACHMENT1, "Framebuffer tracks color attachment enums");
    t.equal(framebuffer.colorAttachments[1], renderbufferColorTarget, "Framebuffer tracks color target");
    t.equal(framebuffer.depthAttachment, depthTarget, "Framebuffer tracks depth target");

    framebuffer.resize(100, 200);
    t.equal(framebuffer.width, 100, "Framebuffer width updated");
    t.equal(framebuffer.height, 200, "Framebuffer height updated");
    t.equal(textureColorTarget.width, 100, "Texture color taget width updated");
    t.equal(textureColorTarget.height, 200, "Texture color taget height updated");
    t.equal(renderbufferColorTarget.width, 100, "Renderbuffer color taget width updated");
    t.equal(renderbufferColorTarget.height, 200, "Renderbuffer color taget height updated");
    t.equal(depthTarget.width, 100, "Depth taget width updated");
    t.equal(depthTarget.height, 200, "Depth taget height updated");

    framebuffer.bindForDraw();
    t.parameterEqual(app.gl, PicoGL.DRAW_BUFFER0, PicoGL.COLOR_ATTACHMENT0, "Draw buffer 0 set when bound");
    t.parameterEqual(app.gl, PicoGL.DRAW_BUFFER1, PicoGL.COLOR_ATTACHMENT1, "Draw buffer 1 set when bound");

    t.done();
});

glcheck("Framebuffer blit", (t, canvas) => {
    let app = PicoGL.createApp(canvas);

    let readTarget = app.createRenderbuffer(app.width, app.height, PicoGL.RGBA8);
    let readFramebuffer = app.createFramebuffer()
        .colorTarget(0, readTarget);

    let writeTarget = app.createRenderbuffer(app.width, app.height, PicoGL.RGBA8);
    let writeFramebuffer = app.createFramebuffer()
        .colorTarget(0, writeTarget);

    app.drawFramebuffer(readFramebuffer)
        .clearColor(1, 0, 0, 1)
        .clear()
        .readFramebuffer(readFramebuffer);
    t.pixelEqual(app.gl, [  255, 0, 0, 255 ], "Read framebuffer starts red");

    app.drawFramebuffer(writeFramebuffer)
        .clearColor(0, 0, 0, 1)
        .clear()
        .readFramebuffer(writeFramebuffer);
    t.pixelEqual(app.gl, [  0, 0, 0, 255 ], "Write framebuffer starts black");


    app.readFramebuffer(readFramebuffer)
        .drawFramebuffer(writeFramebuffer)
        .blitFramebuffer(PicoGL.COLOR_BUFFER_BIT);

    app.readFramebuffer(writeFramebuffer);  
    t.pixelEqual(app.gl, [ 255, 0, 0, 255 ], "Framebuffer blit successful");

    t.done();
});
