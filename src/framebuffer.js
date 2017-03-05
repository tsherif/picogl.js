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

    NanoGL.Framebuffer = function Framebuffer(gl, drawBuffers, width, height, numColorTargets, colorTargetType) {
        this.gl = gl;
        this.drawBuffers = drawBuffers;
        this.framebuffer = gl.createFramebuffer();
        this.width = width;
        this.height = height;
        this.numColorTargets = numColorTargets !== undefined ? numColorTargets : 1;
        this.colorTextures = new Array(this.numColorTargets);
        var i;

        for (i = 0; i < this.numColorTargets; ++i) {
            this.colorTextures[i] = new NanoGL.Texture(gl, null, {
                array: true,
                type: colorTargetType || gl.UNSIGNED_BYTE,
                width: width,
                height: height,
                minFilter: gl.NEAREST,
                magFilter: gl.NEAREST,
                wrapS: gl.CLAMP_TO_EDGE,
                wrapT: gl.CLAMP_TO_EDGE,
                generateMipmaps: false
            });
        }

        this.depthTexture = new NanoGL.Texture(gl, null, {
            array: true,
            internalFormat: this.gl.DEPTH_COMPONENT,
            type: this.gl.UNSIGNED_INT,
            width: width,
            height: height,
            minFilter: gl.NEAREST,
            magFilter: gl.NEAREST,
            wrapS: gl.CLAMP_TO_EDGE,
            wrapT: gl.CLAMP_TO_EDGE,
            generateMipmaps: false
        });

        this.colorAttachments = new Array(this.numColorTargets);

        gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
        for (i = 0; i < this.numColorTargets; ++i) {
            this.colorAttachments[i] = this.drawBuffers["COLOR_ATTACHMENT" + i + "_WEBGL"];
            gl.framebufferTexture2D(gl.FRAMEBUFFER, this.colorAttachments[i], gl.TEXTURE_2D, this.colorTextures[i].texture, 0);
        }
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.TEXTURE_2D, this.depthTexture.texture, 0);

        if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
            console.log("Frame buffer error: " + gl.checkFramebufferStatus(gl.FRAMEBUFFER).toString());
        }

        this.drawBuffers.drawBuffersWEBGL(this.colorAttachments);

        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }; 

})();
