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

import { GL } from "./constants.js";
import { Texture } from "./texture.js";
import { Renderbuffer } from "./renderbuffer.js";

/**
    Offscreen drawing surface.

    @class
    @prop {WebGLRenderingContext} gl The WebGL context.
    @prop {WebGLFramebuffer} framebuffer Handle to the framebuffer.
    @prop {number} width Framebuffer width.
    @prop {number} height Framebuffer height.
    @prop {Array} colorAttachments Array of color attachments.
    @prop {Texture|Renderbuffer} depthAttachment Depth attachment.
    @prop {Object} appState Tracked GL state.
*/
export class Framebuffer {

    constructor(gl, appState) {
        this.gl = gl;
        this.framebuffer = null;
        this.appState = appState;

        this.numColorTargets = 0;

        this.colorAttachments = [];
        this.colorAttachmentEnums = [];
        this.colorAttachmentTargets = [];
        this.depthAttachment = null;
        this.depthAttachmentTarget = null;

        this.width = 0;
        this.height = 0;

        this.restore();
    }

    /**
        Restore framebuffer after context loss.

        @method
        @return {Framebuffer} The Framebuffer object.
    */
    restore() {
        let currentFramebuffers = this.appState.framebuffers;
        for (let binding in currentFramebuffers) {
            if (currentFramebuffers[binding] === this) {
                currentFramebuffers[binding] = null;
            }
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
            defaults to 0, otherwise to TEXTURE_2D. Ignored for renderbuffers.
        @return {Framebuffer} The Framebuffer object.
    */
    colorTarget(index, attachment, target = attachment.is3D ? 0 : GL.TEXTURE_2D) {

        if (index >= this.numColorTargets) {
            let numColorTargets = index + 1;
            this.colorAttachmentEnums.length = numColorTargets;
            this.colorAttachments.length = numColorTargets;
            this.colorAttachmentTargets.length = numColorTargets;

            for (let i = this.numColorTargets; i < numColorTargets - 1; ++i) {
                this.colorAttachmentEnums[i] = GL.NONE;
                this.colorAttachments[i] = null;
                this.colorAttachmentTargets[i] = 0;
            }

            this.numColorTargets = numColorTargets;
        }        

        this.colorAttachmentEnums[index] = GL.COLOR_ATTACHMENT0 + index;
        this.colorAttachments[index] = attachment;
        this.colorAttachmentTargets[index] = target;

        let currentFramebuffer = this.bindAndCaptureState();
        let binding = this.appState.drawFramebufferBinding;

        if (attachment instanceof Renderbuffer) {
            this.gl.framebufferRenderbuffer(binding, this.colorAttachmentEnums[index], GL.RENDERBUFFER, attachment.renderbuffer);
        } else if (attachment.is3D) {
            this.gl.framebufferTextureLayer(binding, this.colorAttachmentEnums[index], attachment.texture, 0, target);
        } else {
            this.gl.framebufferTexture2D(binding, this.colorAttachmentEnums[index], target, attachment.texture, 0);
        }

        this.gl.drawBuffers(this.colorAttachmentEnums);

        this.width = attachment.width;
        this.height = attachment.height;

        this.restoreState(currentFramebuffer);

        return this;
    }

    /**
        Attach a depth target to this framebuffer.

        @method
        @param {Texture|Cubemap|Renderbuffer} texture The texture, cubemap or renderbuffer to attach.
        @param {GLEnum} [target] The texture target or layer to attach. If the texture is 3D or a texture array or renderbuffer,
            defaults to 0, otherwise to TEXTURE_2D. Ignored for renderbuffers.
        @return {Framebuffer} The Framebuffer object.
    */
    depthTarget(attachment, target = attachment.is3D ? 0 : GL.TEXTURE_2D) {

        let currentFramebuffer = this.bindAndCaptureState();
        let binding = this.appState.drawFramebufferBinding;

        this.depthAttachment = attachment;
        this.depthAttachmentTarget = target;

        if (attachment instanceof Renderbuffer) {
            this.gl.framebufferRenderbuffer(binding, GL.DEPTH_ATTACHMENT, GL.RENDERBUFFER, attachment.renderbuffer);
        } else if (attachment.is3D) {
            this.gl.framebufferTextureLayer(binding, GL.DEPTH_ATTACHMENT, attachment.texture, 0, target);
        } else {
            this.gl.framebufferTexture2D(binding, GL.DEPTH_ATTACHMENT, target, attachment.texture, 0);
        }

        this.width = attachment.width;
        this.height = attachment.height;

        this.restoreState(currentFramebuffer);

        return this;
    }

    /**
        Resize all attachments.

        @method
        @param {number} [width=app.width] New width of the framebuffer.
        @param {number} [height=app.height] New height of the framebuffer.
        @return {Framebuffer} The Framebuffer object.
    */
    resize(width = this.gl.drawingBufferWidth, height = this.gl.drawingBufferHeight) {

        let currentFramebuffer = this.bindAndCaptureState();
        let binding = this.appState.drawFramebufferBinding;

        for (let i = 0; i < this.numColorTargets; ++i) {
            let attachment = this.colorAttachments[i];

            if (!attachment) {
                continue;
            }

            attachment.resize(width, height);
            if (attachment instanceof Texture) {
                // Texture resizing recreates the texture object.
                if (attachment.is3D) {
                    this.gl.framebufferTextureLayer(binding, this.colorAttachmentEnums[i], attachment.texture, 0, this.colorAttachmentTargets[i]);
                } else {
                    this.gl.framebufferTexture2D(binding, this.colorAttachmentEnums[i], this.colorAttachmentTargets[i], attachment.texture, 0);
                }
            }
        }

        if (this.depthAttachment) {
            this.depthAttachment.resize(width, height);
            if (this.depthAttachment instanceof Texture) {
                // Texture resizing recreates the texture object.
                if (this.depthAttachment.is3D) {
                    this.gl.framebufferTextureLayer(binding, GL.DEPTH_ATTACHMENT, this.depthAttachment.texture, 0, this.depthAttachmentTarget);
                } else {
                    this.gl.framebufferTexture2D(binding, GL.DEPTH_ATTACHMENT, this.depthAttachmentTarget, this.depthAttachment.texture, 0);
                }
            }
        }

        this.width = width;
        this.height = height;

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

            let currentFramebuffers = this.appState.framebuffers;
            for (let binding in currentFramebuffers) {
                if (currentFramebuffers[binding] === this) {
                    this.gl.bindFramebuffer(binding, null);
                    currentFramebuffers[binding] = null;
                }
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
        let binding = this.appState.drawFramebufferBinding;
        let status = this.gl.checkFramebufferStatus(binding);
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
        let binding = this.appState.drawFramebufferBinding;
        let currentFramebuffers = this.appState.framebuffers;
        if (currentFramebuffers[binding] !== this) {
            this.gl.bindFramebuffer(binding, this.framebuffer);
            currentFramebuffers[binding] = this;
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
        let binding = this.appState.readFramebufferBinding;
        let currentFramebuffers = this.appState.framebuffers;
        if (currentFramebuffers[binding] !== this) {
            this.gl.bindFramebuffer(binding, this.framebuffer);
            currentFramebuffers[binding] = this;
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
        let binding = this.appState.drawFramebufferBinding;
        let currentFramebuffer = this.appState.framebuffers[binding];

        if (currentFramebuffer !== this) {
            this.gl.bindFramebuffer(binding, this.framebuffer);
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
            let binding = this.appState.drawFramebufferBinding;
            this.gl.bindFramebuffer(binding, framebuffer ? framebuffer.framebuffer : null);
        }

        return this;
    }

    // TODO(Tarek): Transitional support for deprecated properties.
    get colorTextures() {
        console.error("Framebuffer.colorTextures is deprecated and will be removed. Please use Framebuffer.colorAttachments.");
        return this.colorAttachments;
    }

    get depthTexture() {
        console.error("Framebuffer.depthTexture is deprecated and will be removed. Please use Framebuffer.depthAttachment.");
        return this.depthAttachment;
    }

}
