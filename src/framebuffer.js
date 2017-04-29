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

    /**
        Storage for vertex data.

        @class
        @prop {WebGLRenderingContext} gl The WebGL context.
        @prop {WebGLFramebuffer} framebuffer Handle to the framebuffer.
        @prop {number} width The width of the framebuffer.
        @prop {number} height The height of the framebuffer.
        @prop {Array} colorTextures Array of color texture targets. 
        @prop {number} numColorTargets Number of color texture targets. 
        @prop {Texture} depthTexture Depth texture target. 
        @prop {WebGLDrawBuffers} drawBuffersExtension Hold the draw buffers extension object when enabled.
        @prop {Array} colorAttachments Array of color attachment enums. 
    */
    PicoGL.Framebuffer = function Framebuffer(gl, width, height) {
        this.gl = gl;
        this.framebuffer = gl.createFramebuffer();

        if (width && height) {
            this.width = width;
            this.height = height;
        } else {
            this.width = gl.drawingBufferWidth;
            this.height = gl.drawingBufferHeight;
        }

        this.numColorTargets = 0;

        this.colorTextures = [];
        this.colorAttachments = [];
        this.depthTexture = null;

        gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);
        this.gl.drawBuffers(this.colorAttachments);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }; 

    /**
        Add a color target to this framebuffer.

        @method
        @param {number} [index=0] Color attachment index.
        @param {GLenum} [type=UNSIGNED_BYTE] Texture data type.
        @param {GLenum} [format=RGBA] Texture data format.
        @param {GLenum} [internalFormat=TEXTURE_INTERNAL_FORMAT[type]] Texture data internal format.
    */
    PicoGL.Framebuffer.prototype.colorTarget = function(index, type, format, internalFormat) {
        index = index || 0;
        type = type || this.gl.UNSIGNED_BYTE;
        format = format || this.gl.RGBA;
        internalFormat = internalFormat || PicoGL.TEXTURE_INTERNAL_FORMAT[type][format];

        this.colorAttachments[index] = this.gl["COLOR_ATTACHMENT" + index];
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.framebuffer);

        this.colorTextures[index] = new PicoGL.Texture(
            this.gl,
            this.gl.TEXTURE_2D,
            null, 
            this.width, 
            this.height, 
            null,
            true,
            false,
            {
                type: type,
                format: format,
                internalFormat: internalFormat,
                minFilter: this.gl.NEAREST,
                magFilter: this.gl.NEAREST,
                wrapS: this.gl.CLAMP_TO_EDGE,
                wrapT: this.gl.CLAMP_TO_EDGE,
                generateMipmaps: false
            }
        );

        this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.colorAttachments[index], this.gl.TEXTURE_2D, this.colorTextures[index].texture, 0);
        this.gl.drawBuffers(this.colorAttachments);
        this.numColorTargets++;

        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);

        return this;
    };

    /**
        Add a depth target to this framebuffer.

        @method
        @param {GLenum} [type=UNSIGNED_SHORT] Texture data type.
        @param {GLenum} [internalFormat=TEXTURE_INTERNAL_FORMAT[type]] Texture data internal format.
    */
    PicoGL.Framebuffer.prototype.depthTarget = function(type, internalFormat) {
        var format = this.gl.DEPTH_COMPONENT;  
        type = type || this.gl.UNSIGNED_SHORT;
        internalFormat = internalFormat || PicoGL.TEXTURE_INTERNAL_FORMAT[type][format];

        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.framebuffer);

        this.depthTexture = new PicoGL.Texture(
            this.gl,
            this.gl.TEXTURE_2D,
            null, 
            this.width, 
            this.height, 
            null,
            true,
            false,
            {
                type: type,
                format: format,
                internalFormat: internalFormat,
                minFilter: this.gl.NEAREST,
                magFilter: this.gl.NEAREST,
                wrapS: this.gl.CLAMP_TO_EDGE,
                wrapT: this.gl.CLAMP_TO_EDGE,
                generateMipmaps: false
            }
        );

        this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.gl.DEPTH_ATTACHMENT, this.gl.TEXTURE_2D, this.depthTexture.texture, 0);

        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
        
        return this;
    };

    /**
        Bind a new texture as a color target.

        @method
        @param {number} [index=0] Color attachment to bind the texture to.
        @param {Texture} texture New texture to bind.
    */
    PicoGL.Framebuffer.prototype.replaceTexture = function(index, texture) {
        index = index || 0;
        this.colorTextures[index] = texture;

        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.framebuffer);
        this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.colorAttachments[index], this.gl.TEXTURE_2D, this.colorTextures[index].texture, 0);
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
      
        return this;
    };

    /**
        Resize framebuffer to current default drawing buffer
        size. Should be called after calls to App.resize().

        @method
        @param {number} [width=app.width] New width of the framebuffer.
        @param {number} [height=app.height] New height of the framebuffer.
    */
    PicoGL.Framebuffer.prototype.resize = function(width, height) {

        if (width && height) {
            this.width = width;
            this.height = height;
        } else {
            this.width = this.gl.drawingBufferWidth;
            this.height = this.gl.drawingBufferHeight;
        }

        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, this.framebuffer);

        for (var i = 0; i < this.numColorTargets; ++i) {
            this.colorTextures[i].image(null, this.width, this.height);
        }

        if (this.depthTexture) {
            this.depthTexture.image(null, this.width, this.height);
        }

        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);
      
        return this;
    };

})();
