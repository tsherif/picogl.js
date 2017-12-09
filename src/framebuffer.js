///////////////////////////////////////////////////////////////////////////////////
// The MIT License (MIT)
//
// Copyright (c) 2017 Tarek Sherif
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

"use strict";

const CONSTANTS = require("./constants");

/**
    Storage for vertex data.

    @class
    @prop {WebGLRenderingContext} gl The WebGL context.
    @prop {WebGLFramebuffer} framebuffer Handle to the framebuffer.
    @prop {Array} colorTextures Array of color texture targets.
    @prop {number} numColorTargets Number of color texture targets.
    @prop {Texture} depthTexture Depth texture target.
    @prop {Array} colorAttachments Array of color attachment enums.
    @prop {Object} appState Tracked GL state.
*/
class Framebuffer {

    constructor(gl, appState) {
        this.gl = gl;
        this.framebuffer = gl.createFramebuffer();
        this.appState = appState;

        this.numColorTargets = 0;

        this.colorTextures = [];
        this.colorAttachments = [];
        this.colorTextureTargets = [];
        this.depthTexture = null;
        this.depthTextureTarget = null;
    }

    /**
        Attach a color target to this framebuffer.

        @method
        @param {number} index Color attachment index.
        @param {Texture} texture The texture to attach.
        @param {GLEnum} [target] The texture target or layer to attach. If the texture is 3D or a texture array,
            defaults to 0, otherwise to TEXTURE_2D.
    */
    colorTarget(index, texture, target = texture.is3D ? 0 : CONSTANTS.TEXTURE_2D) {

        this.colorAttachments[index] = CONSTANTS.COLOR_ATTACHMENT0 + index;

        let currentFramebuffer = this.bindAndCaptureState();

        this.colorTextures[index] = texture;
        this.colorTextureTargets[index] = target;

        if (texture.is3D) {
            this.gl.framebufferTextureLayer(this.gl.DRAW_FRAMEBUFFER, this.colorAttachments[index], texture.texture, 0, target);
        } else {
            this.gl.framebufferTexture2D(this.gl.DRAW_FRAMEBUFFER, this.colorAttachments[index], target, texture.texture, 0);
        }

        this.gl.drawBuffers(this.colorAttachments);
        this.numColorTargets++;

        this.restoreState(currentFramebuffer);

        return this;
    }

    /**
        Attach a depth target to this framebuffer.

        @method
        @param {Texture} texture The texture to attach.
        @param {GLEnum} [target] The texture target or layer to attach. If the texture is 3D or a texture array,
            defaults to 0, otherwise to TEXTURE_2D.
    */
    depthTarget(texture, target = texture.is3D ? 0 : CONSTANTS.TEXTURE_2D) {

        let currentFramebuffer = this.bindAndCaptureState();

        this.depthTexture = texture;
        this.depthTextureTarget = target;

        if (texture.is3D) {
            this.gl.framebufferTextureLayer(this.gl.DRAW_FRAMEBUFFER, CONSTANTS.DEPTH_ATTACHMENT, texture.texture, 0, target);
        } else {
            this.gl.framebufferTexture2D(this.gl.DRAW_FRAMEBUFFER, CONSTANTS.DEPTH_ATTACHMENT, target, texture.texture, 0);
        }

        this.restoreState(currentFramebuffer);

        return this;
    }

    /**
        Resize all currently attached textures.

        @method
        @param {number} [width=app.width] New width of the framebuffer.
        @param {number} [height=app.height] New height of the framebuffer.
    */
    resize(width = this.gl.drawingBufferWidth, height = this.gl.drawingBufferHeight, depth) {

        let currentFramebuffer = this.bindAndCaptureState();

        for (let i = 0; i < this.numColorTargets; ++i) {
            var texture = this.colorTextures[i];
            texture.resize(width, height, depth);
            if (texture.is3D) {
                this.gl.framebufferTextureLayer(this.gl.DRAW_FRAMEBUFFER, this.colorAttachments[i], texture.texture, 0, this.colorTextureTargets[i]);
            } else {
                this.gl.framebufferTexture2D(this.gl.DRAW_FRAMEBUFFER, this.colorAttachments[i], this.colorTextureTargets[i], texture.texture, 0);
            }
        }

        if (this.depthTexture) {
            this.depthTexture.resize(width, height, depth);
            if (this.depthTexture.is3D) {
                this.gl.framebufferTextureLayer(this.gl.DRAW_FRAMEBUFFER, CONSTANTS.DEPTH_ATTACHMENT, this.depthTexture.texture, 0, this.depthTextureTarget);
            } else {
                this.gl.framebufferTexture2D(this.gl.DRAW_FRAMEBUFFER, CONSTANTS.DEPTH_ATTACHMENT, this.depthTextureTarget, this.depthTexture.texture, 0);
            }
        }

        this.restoreState(currentFramebuffer);

        return this;
    }

    /**
        Delete this framebuffer.

        @method
    */
    delete() {
        if (this.framebuffer) {
            this.gl.deleteFramebuffer(this.framebuffer);
            this.framebuffer = null;
        }
    }

    // Bind as the draw framebuffer
    bindForDraw() {
        if (this.appState.drawFramebuffer !== this) {
            this.gl.bindFramebuffer(this.gl.DRAW_FRAMEBUFFER, this.framebuffer);
            this.appState.drawFramebuffer = this;
        }
    }

    // Bind as the read framebuffer
    bindForRead() {
        if (this.appState.readFramebuffer !== this) {
            this.gl.bindFramebuffer(this.gl.READ_FRAMEBUFFER, this.framebuffer);
            this.appState.readFramebuffer = this;
        }
    }

    // Bind for a framebuffer state update.
    // Capture current binding so we can restore it later.
    bindAndCaptureState() {
        let currentFramebuffer = this.appState.drawFramebuffer;

        if (currentFramebuffer !== this) {
            this.gl.bindFramebuffer(this.gl.DRAW_FRAMEBUFFER, this.framebuffer);
        }

        return currentFramebuffer;
    }

    // Bind restore previous binding after state update
    restoreState(framebuffer) {
        if (framebuffer !== this) {
            this.gl.bindFramebuffer(this.gl.DRAW_FRAMEBUFFER, framebuffer ? framebuffer.framebuffer : null);
        }
    }

}

module.exports = Framebuffer;
