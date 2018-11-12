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
const Texture = require("./texture");
const Renderbuffer = require("./renderbuffer");

/**
    Storage for vertex data.

    @class
    @prop {WebGLRenderingContext} gl The WebGL context.
    @prop {WebGLFramebuffer} framebuffer Handle to the framebuffer.
    @prop {Array} colorAttachments Array of color texture targets.
    @prop {number} numColorTargets Number of color texture targets.
    @prop {Texture|Renderbuffer} depthAttachment Depth texture target.
    @prop {Array} colorAttachmentPoints Array of color attachment enums.
    @prop {Object} appState Tracked GL state.
*/
class Framebuffer {

    constructor(gl, appState) {
        this.gl = gl;
        this.framebuffer = null;
        this.appState = appState;

        this.numColorTargets = 0;

        this.colorAttachments = [];
        this.colorAttachmentPoints = [];
        this.colorAttachmentTargets = [];
        this.depthAttachment = null;
        this.depthAttachmentTarget = null;

        this.restore();
    }

    /**
        Restore framebuffer after context loss.

        @method
        @return {Framebuffer} The Framebuffer object.
    */
    restore() {
        if (this.appState.drawFramebuffer === this) {
            this.appState.drawFramebuffer = null;
        }

        if (this.appState.readFramebuffer === this) {
            this.appState.readFramebuffer = null;
        }

        this.framebuffer = this.gl.createFramebuffer();

        return this;
    }

    /**
        Attach a color target to this framebuffer.

        @method
        @param {number} index Color attachment index.
        @param {Texture|Cubemap|Renderbuffer} attachment The texture, cubemap or renderbuffer to attach.
        @param {GLEnum} [target] The texture target or layer to attach. If the texture is 3D or a texture array,
            defaults to 0, otherwise to TEXTURE_2D. Unused for renderbuffers.
        @return {Framebuffer} The Framebuffer object.
    */
    colorTarget(index, attachment, target = attachment.is3D ? 0 : CONSTANTS.TEXTURE_2D) {

        if (index >= this.numColorTargets) {
            let numColorTargets = index + 1;
            this.colorAttachmentPoints.length = numColorTargets;
            this.colorAttachments.length = numColorTargets;
            this.colorAttachmentTargets.length = numColorTargets;

            for (let i = this.numColorTargets; i < numColorTargets; ++i) {
                this.colorAttachmentPoints[i] = CONSTANTS.NONE;
                this.colorAttachments[i] = null;
                this.colorAttachmentTargets[i] = 0;
            }

            this.numColorTargets = numColorTargets;
        }        

        this.colorAttachmentPoints[index] = CONSTANTS.COLOR_ATTACHMENT0 + index;
        this.colorAttachments[index] = attachment;
        this.colorAttachmentTargets[index] = target;

        let currentFramebuffer = this.bindAndCaptureState();


        if (attachment instanceof Renderbuffer) {
            this.gl.framebufferRenderbuffer(CONSTANTS.DRAW_FRAMEBUFFER, this.colorAttachmentPoints[index], CONSTANTS.RENDERBUFFER, attachment.renderbuffer);
        } else if (attachment.is3D) {
            this.gl.framebufferTextureLayer(CONSTANTS.DRAW_FRAMEBUFFER, this.colorAttachmentPoints[index], attachment.texture, 0, target);
        } else {
            this.gl.framebufferTexture2D(CONSTANTS.DRAW_FRAMEBUFFER, this.colorAttachmentPoints[index], target, attachment.texture, 0);
        }

        this.gl.drawBuffers(this.colorAttachmentPoints);

        this.restoreState(currentFramebuffer);

        return this;
    }

    /**
        Attach a depth target to this framebuffer.

        @method
        @param {Texture|Cubemap|Renderbuffer} texture The texture, cubemap or renderbuffer to attach.
        @param {GLEnum} [target] The texture target or layer to attach. If the texture is 3D or a texture array or renderbuffer,
            defaults to 0, otherwise to TEXTURE_2D. Unused for renderbuffers.
        @return {Framebuffer} The Framebuffer object.
    */
    depthTarget(attachment, target = attachment.is3D ? 0 : CONSTANTS.TEXTURE_2D) {

        let currentFramebuffer = this.bindAndCaptureState();

        this.depthAttachment = attachment;
        this.depthAttachmentTarget = target;

        if (attachment instanceof Renderbuffer) {
            this.gl.framebufferRenderbuffer(CONSTANTS.DRAW_FRAMEBUFFER, CONSTANTS.DEPTH_ATTACHMENT, CONSTANTS.RENDERBUFFER, attachment.renderbuffer);
        } else if (attachment.is3D) {
            this.gl.framebufferTextureLayer(CONSTANTS.DRAW_FRAMEBUFFER, CONSTANTS.DEPTH_ATTACHMENT, attachment.texture, 0, target);
        } else {
            this.gl.framebufferTexture2D(CONSTANTS.DRAW_FRAMEBUFFER, CONSTANTS.DEPTH_ATTACHMENT, target, attachment.texture, 0);
        }

        this.restoreState(currentFramebuffer);

        return this;
    }

    /**
        Resize all currently attached textures.

        @method
        @param {number} [width=app.width] New width of the framebuffer.
        @param {number} [height=app.height] New height of the framebuffer.
        @return {Framebuffer} The Framebuffer object.
    */
    resize(width = this.gl.drawingBufferWidth, height = this.gl.drawingBufferHeight, depth) {

        let currentFramebuffer = this.bindAndCaptureState();

        for (let i = 0; i < this.numColorTargets; ++i) {
            let attachment = this.colorAttachments[i];

            if (!attachment) {
                continue;
            }

            attachment.resize(width, height, depth);
            if (attachment instanceof Texture) {
                // Texture resizing recreates the texture object.
                if (attachment.is3D) {
                    this.gl.framebufferTextureLayer(CONSTANTS.DRAW_FRAMEBUFFER, this.colorAttachmentPoints[i], attachment.texture, 0, this.colorAttachmentTargets[i]);
                } else {
                    this.gl.framebufferTexture2D(CONSTANTS.DRAW_FRAMEBUFFER, this.colorAttachmentPoints[i], this.colorAttachmentTargets[i], attachment.texture, 0);
                }
            }
        }

        if (this.depthAttachment) {
            this.depthAttachment.resize(width, height, depth);
            if (this.depthAttachment instanceof Texture) {
                // Texture resizing recreates the texture object.
                if (this.depthAttachment.is3D) {
                    this.gl.framebufferTextureLayer(CONSTANTS.DRAW_FRAMEBUFFER, CONSTANTS.DEPTH_ATTACHMENT, this.depthAttachment.texture, 0, this.depthAttachmentTarget);
                } else {
                    this.gl.framebufferTexture2D(CONSTANTS.DRAW_FRAMEBUFFER, CONSTANTS.DEPTH_ATTACHMENT, this.depthAttachmentTarget, this.depthAttachment.texture, 0);
                }
            }
        }

        this.restoreState(currentFramebuffer);

        return this;
    }

    /**
        Delete this framebuffer.

        @method
        @return {Framebuffer} The Framebuffer object.
    */
    delete() {
        if (this.framebuffer) {
            this.gl.deleteFramebuffer(this.framebuffer);
            this.framebuffer = null;

            if (this.appState.drawFramebuffer === this) {
                this.gl.bindFramebuffer(CONSTANTS.DRAW_FRAMEBUFFER, null);
                this.appState.drawFramebuffer = null;
            }

            if (this.appState.readFramebuffer === this) {
                this.gl.bindFramebuffer(CONSTANTS.READ_FRAMEBUFFER, null);
                this.appState.readFramebuffer = null;
            }
        }

        return this;
    }

    /**
        Get the current status of this framebuffer.

        @method
        @return {GLEnum} The current status of this framebuffer.
    */
    getStatus() {
        let currentFramebuffer = this.bindAndCaptureState();
        let status = this.gl.checkFramebufferStatus(CONSTANTS.DRAW_FRAMEBUFFER);
        this.restoreState(currentFramebuffer);

        return status;
    }

    /**
        Bind as the draw framebuffer

        @method
        @ignore
        @return {Framebuffer} The Framebuffer object.
    */
    bindForDraw() {
        if (this.appState.drawFramebuffer !== this) {
            this.gl.bindFramebuffer(CONSTANTS.DRAW_FRAMEBUFFER, this.framebuffer);
            this.appState.drawFramebuffer = this;
        }

        return this;
    }

    /**
        Bind as the read framebuffer

        @method
        @ignore
        @return {Framebuffer} The Framebuffer object.
    */
    bindForRead() {
        if (this.appState.readFramebuffer !== this) {
            this.gl.bindFramebuffer(this.gl.READ_FRAMEBUFFER, this.framebuffer);
            this.appState.readFramebuffer = this;
        }

        return this;
    }

    /**
        Bind for a framebuffer state update.
        Capture current binding so we can restore it later.

        @method
        @ignore
        @return {Framebuffer} The Framebuffer object.
    */
    bindAndCaptureState() {
        let currentFramebuffer = this.appState.drawFramebuffer;

        if (currentFramebuffer !== this) {
            this.gl.bindFramebuffer(CONSTANTS.DRAW_FRAMEBUFFER, this.framebuffer);
        }

        return currentFramebuffer;
    }

    /**
        Bind restore previous binding after state update

        @method
        @ignore
        @return {Framebuffer} The Framebuffer object.
    */
    restoreState(framebuffer) {
        if (framebuffer !== this) {
            this.gl.bindFramebuffer(CONSTANTS.DRAW_FRAMEBUFFER, framebuffer ? framebuffer.framebuffer : null);
        }

        return this;
    }

    get colorTextures() {
        console.error("Framebuffer.colorTextures is deprecated and will be removed. Please use Framebuffer.colorAttachments.");
        return this.colorAttachments;
    }

    get depthTexture() {
        console.error("Framebuffer.depthTexture is deprecated and will be removed. Please use Framebuffer.depthAttachment.");
        return this.depthAttachment;
    }

}

module.exports = Framebuffer;
