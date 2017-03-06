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

(function() {
    "use strict";

    NanoGL.Framebuffer = function Framebuffer(gl, drawBuffers, numColorTargets, colorTargetType, depthTexturesEnabled) {
        this.gl = gl;
        this.drawBuffers = drawBuffers;
        this.framebuffer = gl.createFramebuffer();
        this.width = gl.drawingBufferWidth;
        this.height = gl.drawingBufferHeight;
        this.numColorTargets = numColorTargets !== undefined ? numColorTargets : 1;

        if (!drawBuffers) {
            this.numColorTargets = 1;
        }

        this.colorTextures = new Array(this.numColorTargets);
        this.colorAttachments = new Array(this.numColorTargets);
        this.depthTexture = null;
        this.depthBuffer =  null;

        gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
        
        for (var i = 0; i < this.numColorTargets; ++i) {
            this.colorTextures[i] = new NanoGL.Texture(gl, null, {
                array: true,
                type: colorTargetType || gl.UNSIGNED_BYTE,
                width: this.width,
                height: this.height,
                minFilter: gl.NEAREST,
                magFilter: gl.NEAREST,
                wrapS: gl.CLAMP_TO_EDGE,
                wrapT: gl.CLAMP_TO_EDGE,
                generateMipmaps: false
            });

            if (this.drawBuffers) {
                this.colorAttachments[i] = this.drawBuffers["COLOR_ATTACHMENT" + i + "_WEBGL"];
            } else {
                this.colorAttachments[i] = gl.COLOR_ATTACHMENT0;
            }
            
            gl.framebufferTexture2D(gl.FRAMEBUFFER, this.colorAttachments[i], gl.TEXTURE_2D, this.colorTextures[i].texture, 0);
        }

        if (depthTexturesEnabled) {
            this.depthTexture = new NanoGL.Texture(gl, null, {
                array: true,
                internalFormat: this.gl.DEPTH_COMPONENT,
                type: this.gl.UNSIGNED_INT,
                width: this.width,
                height: this.height,
                minFilter: gl.NEAREST,
                magFilter: gl.NEAREST,
                wrapS: gl.CLAMP_TO_EDGE,
                wrapT: gl.CLAMP_TO_EDGE,
                generateMipmaps: false
            });

            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, this.depthTexture.texture, 0);
        } else {
            this.depthBuffer = gl.createRenderbuffer();
            gl.bindRenderbuffer(gl.RENDERBUFFER, this.depthBuffer);
            gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.width, this.height);
            gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.depthBuffer);
            gl.bindRenderbuffer(gl.RENDERBUFFER, null);
        }

        if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
            console.log("Frame buffer error: " + gl.checkFramebufferStatus(gl.FRAMEBUFFER).toString());
        }

        if (this.drawBuffers) {
            this.drawBuffers.drawBuffersWEBGL(this.colorAttachments);
        } 

        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }; 

    NanoGL.Framebuffer.prototype.resize = function() {

        this.width = this.gl.drawingBufferWidth;
        this.height = this.gl.drawingBufferHeight;

        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.framebuffer);

        for (var i = 0; i < this.numColorTargets; ++i) {
            this.colorTextures[i].image(null, this.width, this.height);
            // this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.colorAttachments[i], this.gl.TEXTURE_2D, this.colorTextures[i].texture, 0);
        }

        if (this.depthTexture) {
            this.depthTexture.image(null, this.width, this.height);
            // this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.DEPTH_ATTACHMENT, this.gl.TEXTURE_2D, this.depthTexture.texture, 0);
        } else {
            this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, this.depthBuffer);
            this.gl.renderbufferStorage(this.gl.RENDERBUFFER, this.gl.DEPTH_COMPONENT16, this.width, this.height);
            this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, null);
        }

        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
    };

})();
