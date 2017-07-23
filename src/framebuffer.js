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

var TEXTURE_FORMAT_DEFAULTS = require("./texture-format-defaults");
var Texture = require("./texture");

/**
    Storage for vertex data.

    @class
    @hideconstructor
    @prop {WebGLRenderingContext} gl The WebGL context.
    @prop {WebGLFramebuffer} framebuffer Handle to the framebuffer.
    @prop {number} width The width of the framebuffer.
    @prop {number} height The height of the framebuffer.
    @prop {Array} colorTextures Array of color texture targets.
    @prop {number} numColorTargets Number of color texture targets.
    @prop {Texture} depthTexture Depth texture target.
    @prop {Array} colorAttachments Array of color attachment enums.
    @prop {Object} appState Tracked GL state.
*/
function Framebuffer(gl, appState, width, height) {
    this.gl = gl;
    this.framebuffer = gl.createFramebuffer();
    this.appState = appState;

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
}

/**
    Add a color target to this framebuffer.

    @method
    @param {number} [index=0] Color attachment index.
    @param {Object} [options] Texture options.
    @param {GLEnum} [options.type=UNSIGNED_BYTE] Type of data stored in the texture.
    @param {GLEnum} [options.format=RGBA] Texture data format.
    @param {GLEnum} [options.internalFormat=RGBA] Texture data internal format.
    @param {boolean} [options.flipY=true] Whether th y-axis be flipped when reading the texture.
    @param {GLEnum} [options.minFilter=NEAREST] Minification filter.
    @param {GLEnum} [options.magFilter=NEAREST] Magnification filter.
    @param {GLEnum} [options.wrapS=CLAMP_TO_EDGE] Horizontal wrap mode.
    @param {GLEnum} [options.wrapT=CLAMP_TO_EDGE] Vertical wrap mode.
    @param {GLEnum} [options.compareMode=NONE] Comparison mode.
    @param {GLEnum} [options.compareFunc=LEQUAL] Comparison function.
    @param {GLEnum} [options.baseLevel] Base mipmap level.
    @param {GLEnum} [options.maxLevel] Maximum mipmap level.
    @param {GLEnum} [options.minLOD] Mimimum level of detail.
    @param {GLEnum} [options.maxLOD] Maximum level of detail.
    @param {boolean} [options.generateMipmaps=false] Should mipmaps be generated.
*/
Framebuffer.prototype.colorTarget = function(index, options) {
    index = index || 0;
    options = options || {};
    options.type = options.type || this.gl.UNSIGNED_BYTE;
    options.format = options.format || this.gl.RGBA;
    options.internalFormat = options.internalFormat || TEXTURE_FORMAT_DEFAULTS[options.type][options.format];
    options.minFilter = options.minFilter || this.gl.NEAREST;
    options.magFilter = options.magFilter || this.gl.NEAREST;
    options.wrapS = options.wrapS || this.gl.CLAMP_TO_EDGE;
    options.wrapT = options.wrapT || this.gl.CLAMP_TO_EDGE;
    options.generateMipmaps = options.generateMipmaps === undefined ? false : options.generateMipmaps;

    this.colorAttachments[index] = this.gl.COLOR_ATTACHMENT0 + index;

    var currentFramebuffer = this.bindAndCaptureState();

    this.colorTextures[index] = new Texture(
        this.gl,
        this.appState,
        this.gl.TEXTURE_2D,
        null,
        this.width,
        this.height,
        null,
        false,
        options
    );

    this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.colorAttachments[index], this.gl.TEXTURE_2D, this.colorTextures[index].texture, 0);
    this.gl.drawBuffers(this.colorAttachments);
    this.numColorTargets++;

    this.restoreState(currentFramebuffer);

    return this;
};

/**
    Add a depth target to this framebuffer.

    @method
    @param {Object} [options] Texture options.
    @param {GLEnum} [options.type=UNSIGNED_BYTE] Type of data stored in the texture.
    @param {GLEnum} [options.format=RGBA] Texture data format.
    @param {GLEnum} [options.internalFormat=RGBA] Texture data internal format.
    @param {boolean} [options.flipY=true] Whether th y-axis be flipped when reading the texture.
    @param {GLEnum} [options.minFilter=NEAREST] Minification filter.
    @param {GLEnum} [options.magFilter=NEAREST] Magnification filter.
    @param {GLEnum} [options.wrapS=CLAMP_TO_EDGE] Horizontal wrap mode.
    @param {GLEnum} [options.wrapT=CLAMP_TO_EDGE] Vertical wrap mode.
    @param {GLEnum} [options.compareMode=NONE] Comparison mode.
    @param {GLEnum} [options.compareFunc=LEQUAL] Comparison function.
    @param {GLEnum} [options.baseLevel] Base mipmap level.
    @param {GLEnum} [options.maxLevel] Maximum mipmap level.
    @param {GLEnum} [options.minLOD] Mimimum level of detail.
    @param {GLEnum} [options.maxLOD] Maximum level of detail.
    @param {boolean} [options.generateMipmaps=false] Should mipmaps be generated.
*/
Framebuffer.prototype.depthTarget = function(options) {
    options = options || {};
    options.format = this.gl.DEPTH_COMPONENT;
    options.type = options.type || this.gl.UNSIGNED_SHORT;
    options.internalFormat = options.internalFormat || TEXTURE_FORMAT_DEFAULTS[options.type][options.format];
    options.minFilter = options.minFilter || this.gl.NEAREST;
    options.magFilter = options.magFilter || this.gl.NEAREST;
    options.wrapS = options.wrapS || this.gl.CLAMP_TO_EDGE;
    options.wrapT = options.wrapT || this.gl.CLAMP_TO_EDGE;
    options.generateMipmaps = options.generateMipmaps === undefined ? false : options.generateMipmaps;

    var currentFramebuffer = this.bindAndCaptureState();

    this.depthTexture = new Texture(
        this.gl,
        this.appState,
        this.gl.TEXTURE_2D,
        null,
        this.width,
        this.height,
        null,
        false,
        options
    );

    this.gl.framebufferTexture2D(this.gl.DRAW_FRAMEBUFFER, this.gl.DEPTH_ATTACHMENT, this.gl.TEXTURE_2D, this.depthTexture.texture, 0);

    this.restoreState(currentFramebuffer);

    return this;
};

/**
    Bind a new texture as a color target.

    @method
    @param {number} index Color attachment to bind the texture to.
    @param {Texture} texture New texture to bind.
*/
Framebuffer.prototype.replaceTexture = function(index, texture) {
    this.colorTextures[index] = texture;

    var currentFramebuffer = this.bindAndCaptureState();
    this.gl.framebufferTexture2D(this.gl.DRAW_FRAMEBUFFER, this.colorAttachments[index], this.gl.TEXTURE_2D, this.colorTextures[index].texture, 0);
    this.restoreState(currentFramebuffer);

    return this;
};

/**
    Resize framebuffer to current default drawing buffer
    size. Should be called after calls to App.resize().

    @method
    @param {number} [width=app.width] New width of the framebuffer.
    @param {number} [height=app.height] New height of the framebuffer.
*/
Framebuffer.prototype.resize = function(width, height) {

    if (width && height) {
        this.width = width;
        this.height = height;
    } else {
        this.width = this.gl.drawingBufferWidth;
        this.height = this.gl.drawingBufferHeight;
    }

    var currentFramebuffer = this.bindAndCaptureState();

    for (var i = 0; i < this.numColorTargets; ++i) {
        this.colorTextures[i].data(null, this.width, this.height);
        this.gl.framebufferTexture2D(this.gl.DRAW_FRAMEBUFFER, this.colorAttachments[i], this.gl.TEXTURE_2D, this.colorTextures[i].texture, 0);
    }

    if (this.depthTexture) {
        this.depthTexture.data(null, this.width, this.height);
        this.gl.framebufferTexture2D(this.gl.DRAW_FRAMEBUFFER, this.gl.DEPTH_ATTACHMENT, this.gl.TEXTURE_2D, this.depthTexture.texture, 0);
    }

    this.restoreState(currentFramebuffer);

    return this;
};

/**
    Delete this framebuffer. NOTE: will delete any currently
    attached textures.

    @method
*/
Framebuffer.prototype.delete = function() {
    for (var i = 0; i < this.numColorTargets; ++i) {
        this.colorTextures[i].delete();
    }

    if (this.depthTexture) {
        this.depthTexture.delete();
    }

    if (this.framebuffer) {
        this.gl.deleteFramebuffer(this.framebuffer);
        this.framebuffer = null;
    }
};

// Bind as the draw framebuffer
Framebuffer.prototype.bindForDraw = function() {
    if (this.appState.drawFramebuffer !== this) {
        this.gl.bindFramebuffer(this.gl.DRAW_FRAMEBUFFER, this.framebuffer);
        this.appState.drawFramebuffer = this;
    }
};

// Bind as the read framebuffer
Framebuffer.prototype.bindForRead = function() {
    if (this.appState.readFramebuffer !== this) {
        this.gl.bindFramebuffer(this.gl.READ_FRAMEBUFFER, this.framebuffer);
        this.appState.readFramebuffer = this;
    }
};

// Bind for a framebuffer state update.
// Capture current binding so we can restore it later.
Framebuffer.prototype.bindAndCaptureState = function() {
    var currentFramebuffer = this.appState.drawFramebuffer;

    if (currentFramebuffer !== this) {
        this.gl.bindFramebuffer(this.gl.DRAW_FRAMEBUFFER, this.framebuffer);
    }

    return currentFramebuffer;
};

// Bind restore previous binding after state update
Framebuffer.prototype.restoreState = function(framebuffer) {
    if (framebuffer !== this) {
        this.gl.bindFramebuffer(this.gl.DRAW_FRAMEBUFFER, framebuffer ? framebuffer.framebuffer : null);
    }
};

module.exports = Framebuffer;
