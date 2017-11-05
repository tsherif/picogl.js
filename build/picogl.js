/*
PicoGL.js v0.6.10

The MIT License (MIT)

Copyright (c) 2017 Tarek Sherif

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.PicoGL = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
const CONSTANTS               = require("./constants");
const TEXTURE_FORMAT_DEFAULTS = require("./texture-format-defaults");
const Cubemap                 = require("./cubemap");
const DrawCall                = require("./draw-call");
const Framebuffer             = require("./framebuffer");
const Program                 = require("./program");
const Shader                  = require("./shader");
const Texture                 = require("./texture");
const Timer                   = require("./timer");
const TransformFeedback       = require("./transform-feedback");
const UniformBuffer           = require("./uniform-buffer");
const VertexArray             = require("./vertex-array");
const VertexBuffer            = require("./vertex-buffer");
const Query                   = require("./query");

/**
    Primary entry point to PicoGL. An app will store all parts of the WebGL
    state.

    @class
    @prop {DOMElement} canvas The canvas on which this app drawing.
    @prop {WebGLRenderingContext} gl The WebGL context.
    @prop {number} width The width of the drawing surface.
    @prop {number} height The height of the drawing surface.
    @prop {boolean} floatRenderTargetsEnabled Whether the EXT_color_buffer_float extension is enabled.
    @prop {boolean} linearFloatTexturesEnabled Whether the OES_texture_float_linear extension is enabled.
    @prop {boolean} s3tcTexturesEnabled Whether the WEBGL_compressed_texture_s3tc extension is enabled.
    @prop {boolean} s3tcSRGBTexturesEnabled Whether the WEBGL_compressed_texture_s3tc_srgb extension is enabled.
    @prop {boolean} etcTexturesEnabled Whether the WEBGL_compressed_texture_etc extension is enabled.
    @prop {boolean} astcTexturesEnabled Whether the WEBGL_compressed_texture_astc extension is enabled.
    @prop {boolean} pvrtcTexturesEnabled Whether the WEBGL_compressed_texture_pvrtc extension is enabled.
    @prop {Object} state Tracked GL state.
    @prop {GLEnum} clearBits Current clear mask to use with clear().    
*/
function App(canvas, contextAttributes) {
    this.canvas = canvas;
    this.gl = canvas.getContext("webgl2", contextAttributes);
    this.width = this.gl.drawingBufferWidth;
    this.height = this.gl.drawingBufferHeight;
    this.viewportX = 0;
    this.viewportY = 0;
    this.viewportWidth = 0;
    this.viewportHeight = 0;
    this.currentDrawCalls = null;
    this.emptyFragmentShader = null;

    this.state = {
        program: null,
        vertexArray: null,
        transformFeedback: null,
        activeTexture: -1,
        textures: new Array(CONSTANTS.WEBGL_INFO.MAX_TEXTURE_UNITS),
        // TODO(Tarek): UBO state currently not tracked, due bug
        // with UBO state becoming corrupted between frames in Chrome
        // https://bugs.chromium.org/p/chromium/issues/detail?id=722060
        // Enable UBO state tracking when that's fixed.
        uniformBuffers: new Array(CONSTANTS.WEBGL_INFO.MAX_UNIFORM_BUFFERS),
        uniformBufferCount: 0,
        freeUniformBufferBases: [],
        drawFramebuffer: null,
        readFramebuffer: null
    };

    this.clearBits = this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT| this.gl.STENCIL_BUFFER_BIT;

    this.cpuTime = 0;
    this.gpuTime = 0;

    // Extensions
    this.floatRenderTargetsEnabled = false;
    this.linearFloatTexturesEnabled = false;
    this.s3tcTexturesEnabled = false;
    this.s3tcSRGBTexturesEnabled = false;
    this.etcTexturesEnabled = false;
    this.astcTexturesEnabled = false;
    this.pvrtcTexturesEnabled = false;

    this.viewport(0, 0, this.width, this.height);
}

/**
    Set the color mask to selectively enable or disable particular
    color channels while rendering.

    @method
    @param {boolean} r Red channel.
    @param {boolean} g Green channel.
    @param {boolean} b Blue channel.
    @param {boolean} a Alpha channel.
*/
App.prototype.colorMask = function(r, g, b, a) {
    this.gl.colorMask(r, g, b, a);

    return this;
};

/**
    Set the clear color.

    @method
    @param {number} r Red channel.
    @param {number} g Green channel.
    @param {number} b Blue channel.
    @param {number} a Alpha channel.
*/
App.prototype.clearColor = function(r, g, b, a) {
    this.gl.clearColor(r, g, b, a);

    return this;
};

/**
    Set the clear mask bits to use when calling clear().
    E.g. app.clearMask(PicoGL.COLOR_BUFFER_BIT).

    @method
    @param {GLEnum} mask Bit mask of buffers to clear.
*/
App.prototype.clearMask = function(mask) {
    this.clearBits = mask;

    return this;
};

/**
    Clear the canvas

    @method
*/
App.prototype.clear = function() {
    this.gl.clear(this.clearBits);

    return this;
};

/**
    Bind a draw framebuffer to the WebGL context. Note that 
    this method resets the viewport to match the given framebuffer.

    @method
    @param {Framebuffer} framebuffer The Framebuffer object to bind.
    @see Framebuffer
*/
App.prototype.drawFramebuffer = function(framebuffer) {
    framebuffer.bindForDraw();

    this.viewport(0, 0, framebuffer.width, framebuffer.height);

    return this;
};

/**
    Bind a read framebuffer to the WebGL context.

    @method
    @param {Framebuffer} framebuffer The Framebuffer object to bind.
    @see Framebuffer
*/
App.prototype.readFramebuffer = function(framebuffer) {
    framebuffer.bindForRead();

    return this;
};

/**
    Switch back to the default framebuffer for drawing (i.e. draw to the screen).
    Note that this method resets the viewport to match the default framebuffer.

    @method
*/
App.prototype.defaultDrawFramebuffer = function() {
    if (this.state.drawFramebuffer !== null) {
        this.gl.bindFramebuffer(this.gl.DRAW_FRAMEBUFFER, null);
        this.state.drawFramebuffer = null;
        this.viewport(0, 0, this.width, this.height);
    }

    return this;
};

/**
    Switch back to the default framebuffer for reading (i.e. read from the screen).

    @method
*/
App.prototype.defaultReadFramebuffer = function() {
    if (this.state.readFramebuffer !== null) {
        this.gl.bindFramebuffer(this.gl.READ_FRAMEBUFFER, null);
        this.state.readFramebuffer = null;
    }

    return this;
};

/**
    Set the depth range.

    @method
    @param {number} near Minimum depth value.
    @param {number} far Maximum depth value.
*/
App.prototype.depthRange = function(near, far) {
    this.gl.depthRange(near, far);

    return this;
};

/**
    Enable depth testing.

    @method
*/
App.prototype.depthTest = function() {
    this.gl.enable(this.gl.DEPTH_TEST);

    return this;
};

/**
    Disable depth testing.

    @method
*/
App.prototype.noDepthTest = function() {
    this.gl.disable(this.gl.DEPTH_TEST);

    return this;
};

/**
    Enable or disable writing to the depth buffer.

    @method
    @param {Boolean} mask The depth mask.
*/
App.prototype.depthMask = function(mask) {
    this.gl.depthMask(mask);

    return this;
};

/**
    Set the depth test function. E.g. app.depthFunc(PicoGL.LEQUAL).

    @method
    @param {GLEnum} func The depth testing function to use.
*/
App.prototype.depthFunc = function(func) {
    this.gl.depthFunc(func);

    return this;
};

/**
    Enable blending.

    @method
*/
App.prototype.blend = function() {
    this.gl.enable(this.gl.BLEND);

    return this;
};

/**
    Disable blending

    @method
*/
App.prototype.noBlend = function() {
    this.gl.disable(this.gl.BLEND);

    return this;
};

/**
    Set the blend function. E.g. app.blendFunc(PicoGL.ONE, PicoGL.ONE_MINUS_SRC_ALPHA).

    @method
    @param {GLEnum} src The source blending weight.
    @param {GLEnum} dest The destination blending weight.
*/
App.prototype.blendFunc = function(src, dest) {
    this.gl.blendFunc(src, dest);

    return this;
};

/**
    Set the blend function, with separate weighting for color and alpha channels.
    E.g. app.blendFuncSeparate(PicoGL.ONE, PicoGL.ONE_MINUS_SRC_ALPHA, PicoGL.ONE, PicoGL.ONE).

    @method
    @param {GLEnum} csrc The source blending weight for the RGB channels.
    @param {GLEnum} cdest The destination blending weight for the RGB channels.
    @param {GLEnum} asrc The source blending weight for the alpha channel.
    @param {GLEnum} adest The destination blending weight for the alpha channel.
*/
App.prototype.blendFuncSeparate = function(csrc, cdest, asrc, adest) {
    this.gl.blendFuncSeparate(csrc, cdest, asrc, adest);

    return this;
};

/**
    Enable stencil testing.
    NOTE: Only works if { stencil: true } passed as a
    context attribute when creating the App!

    @method
*/
App.prototype.stencilTest = function() {
    this.gl.enable(this.gl.STENCIL_TEST);

    return this;
};

/**
    Disable stencil testing.

    @method
*/
App.prototype.noStencilTest = function() {
    this.gl.disable(this.gl.STENCIL_TEST);

    return this;
};


/**
    Enable scissor testing.

    @method
*/
App.prototype.scissorTest = function() {
    this.gl.enable(this.gl.SCISSOR_TEST);

    return this;
};

/**
    Disable scissor testing.

    @method
*/
App.prototype.noScissorTest = function() {
    this.gl.disable(this.gl.SCISSOR_TEST);

    return this;
};

/**
    Define the scissor box.

    @method
*/
App.prototype.scissor = function(x, y, width, height) {
    this.gl.scissor(x, y, width, height);

    return this;
};

/**
    Set the bitmask to use for tested stencil values.
    E.g. app.stencilMask(0xFF).
    NOTE: Only works if { stencil: true } passed as a
    context attribute when creating the App!

    @method
    @param {number} mask The mask value.

*/
App.prototype.stencilMask = function(mask) {
    this.gl.stencilMask(mask);

    return this;
};

/**
    Set the bitmask to use for tested stencil values for a particular face orientation.
    E.g. app.stencilMaskSeparate(PicoGL.FRONT, 0xFF).
    NOTE: Only works if { stencil: true } passed as a
    context attribute when creating the App!

    @method
    @param {GLEnum} face The face orientation to apply the mask to.
    @param {number} mask The mask value.

*/
App.prototype.stencilMaskSeparate = function(face, mask) {
    this.gl.stencilMaskSeparate(face, mask);

    return this;
};

/**
    Set the stencil function and reference value.
    E.g. app.stencilFunc(PicoGL.EQUAL, 1, 0xFF).
    NOTE: Only works if { stencil: true } passed as a
    context attribute when creating the App!

    @method
    @param {GLEnum} func The testing function.
    @param {number} ref The reference value.
    @param {GLEnum} mask The bitmask to use against tested values before applying
        the stencil function.
*/
App.prototype.stencilFunc = function(func, ref, mask) {
    this.gl.stencilFunc(func, ref, mask);

    return this;
};

/**
    Set the stencil function and reference value for a particular face orientation.
    E.g. app.stencilFuncSeparate(PicoGL.FRONT, PicoGL.EQUAL, 1, 0xFF).
    NOTE: Only works if { stencil: true } passed as a
    context attribute when creating the App!

    @method
    @param {GLEnum} face The face orientation to apply the function to.
    @param {GLEnum} func The testing function.
    @param {number} ref The reference value.
    @param {GLEnum} mask The bitmask to use against tested values before applying
        the stencil function.
*/
App.prototype.stencilFuncSeparate = function(face, func, ref, mask) {
    this.gl.stencilFuncSeparate(face, func, ref, mask);

    return this;
};

/**
    Set the operations for updating stencil buffer values.
    E.g. app.stencilOp(PicoGL.KEEP, PicoGL.KEEP, PicoGL.REPLACE).
    NOTE: Only works if { stencil: true } passed as a
    context attribute when creating the App!

    @method
    @param {GLEnum} stencilFail Operation to apply if the stencil test fails.
    @param {GLEnum} depthFail Operation to apply if the depth test fails.
    @param {GLEnum} pass Operation to apply if the both the depth and stencil tests pass.
*/
App.prototype.stencilOp = function(stencilFail, depthFail, pass) {
    this.gl.stencilOp(stencilFail, depthFail, pass);

    return this;
};

/**
    Set the operations for updating stencil buffer values for a particular face orientation.
    E.g. app.stencilOpSeparate(PicoGL.FRONT, PicoGL.KEEP, PicoGL.KEEP, PicoGL.REPLACE).
    NOTE: Only works if { stencil: true } passed as a
    context attribute when creating the App!

    @method
    @param {GLEnum} face The face orientation to apply the operations to.
    @param {GLEnum} stencilFail Operation to apply if the stencil test fails.
    @param {GLEnum} depthFail Operation to apply if the depth test fails.
    @param {GLEnum} pass Operation to apply if the both the depth and stencil tests pass.
*/
App.prototype.stencilOpSeparate = function(face, stencilFail, depthFail, pass) {
    this.gl.stencilOpSeparate(face, stencilFail, depthFail, pass);

    return this;
};

/**
    Enable rasterization step.

    @method
*/
App.prototype.rasterize = function() {
    this.gl.disable(this.gl.RASTERIZER_DISCARD);

    return this;
};

/**
    Disable rasterization step.

    @method
*/
App.prototype.noRasterize = function() {
    this.gl.enable(this.gl.RASTERIZER_DISCARD);

    return this;
};

/**
    Enable backface culling.

    @method
*/
App.prototype.cullBackfaces = function() {
    this.gl.enable(this.gl.CULL_FACE);

    return this;
};

/**
    Disable backface culling.

    @method
*/
App.prototype.drawBackfaces = function() {
    this.gl.disable(this.gl.CULL_FACE);

    return this;
};

/**
    Enable the EXT_color_buffer_float extension. Allows for creating float textures as
    render targets on FrameBuffer objects. E.g. app.createFramebuffer().colorTarget(0, PicoGL.FLOAT).

    @method
    @see Framebuffer
*/
App.prototype.floatRenderTargets = function() {
    this.floatRenderTargetsEnabled = !!this.gl.getExtension("EXT_color_buffer_float");

    return this;
};

/**
    Enable the OES_texture_float_linear extension. Allows for linear blending on float textures.

    @method
    @see Framebuffer
*/
App.prototype.linearFloatTextures = function() {
    this.linearFloatTexturesEnabled = !!this.gl.getExtension("OES_texture_float_linear");

    return this;
};


/**
    Enable the WEBGL_compressed_texture_s3tc and WEBGL_compressed_texture_s3tc_srgb extensions, and 
    add the following enums, which can be used as texture formats, to the PicoGL object:

    <ul>
      <li>PicoGL.COMPRESSED_RGB_S3TC_DXT1_EXT
      <li>PicoGL.COMPRESSED_RGBA_S3TC_DXT1_EXT
      <li>PicoGL.COMPRESSED_RGBA_S3TC_DXT3_EXT
      <li>PicoGL.COMPRESSED_RGBA_S3TC_DXT5_EXT
      <li>PicoGL.COMPRESSED_SRGB_S3TC_DXT1_EXT
      <li>PicoGL.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT
      <li>PicoGL.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT
      <li>PicoGL.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT
    </ul>

    @method
*/
App.prototype.s3tcTextures = function() {
    let ext = this.gl.getExtension("WEBGL_compressed_texture_s3tc");
    this.s3tcTexturesEnabled = !!ext;
    
    if (this.s3tcTexturesEnabled) {
        CONSTANTS.COMPRESSED_RGB_S3TC_DXT1_EXT  = ext.COMPRESSED_RGB_S3TC_DXT1_EXT;
        CONSTANTS.COMPRESSED_RGBA_S3TC_DXT1_EXT = ext.COMPRESSED_RGBA_S3TC_DXT1_EXT;
        CONSTANTS.COMPRESSED_RGBA_S3TC_DXT3_EXT = ext.COMPRESSED_RGBA_S3TC_DXT3_EXT;
        CONSTANTS.COMPRESSED_RGBA_S3TC_DXT5_EXT = ext.COMPRESSED_RGBA_S3TC_DXT5_EXT;

        TEXTURE_FORMAT_DEFAULTS.COMPRESSED_TYPES[ext.COMPRESSED_RGB_S3TC_DXT1_EXT]  = true;
        TEXTURE_FORMAT_DEFAULTS.COMPRESSED_TYPES[ext.COMPRESSED_RGBA_S3TC_DXT1_EXT] = true;
        TEXTURE_FORMAT_DEFAULTS.COMPRESSED_TYPES[ext.COMPRESSED_RGBA_S3TC_DXT3_EXT] = true;
        TEXTURE_FORMAT_DEFAULTS.COMPRESSED_TYPES[ext.COMPRESSED_RGBA_S3TC_DXT5_EXT] = true;
    }

    ext = this.gl.getExtension("WEBGL_compressed_texture_s3tc_srgb");
    this.s3tcSRGBTexturesEnabled = !!ext;
    
    if (this.s3tcSRGBTexturesEnabled) {
        CONSTANTS.COMPRESSED_SRGB_S3TC_DXT1_EXT       = ext.COMPRESSED_SRGB_S3TC_DXT1_EXT;
        CONSTANTS.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT = ext.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
        CONSTANTS.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT = ext.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
        CONSTANTS.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT = ext.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
        
        TEXTURE_FORMAT_DEFAULTS.COMPRESSED_TYPES[ext.COMPRESSED_SRGB_S3TC_DXT1_EXT]       = true;
        TEXTURE_FORMAT_DEFAULTS.COMPRESSED_TYPES[ext.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT] = true;
        TEXTURE_FORMAT_DEFAULTS.COMPRESSED_TYPES[ext.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT] = true;
        TEXTURE_FORMAT_DEFAULTS.COMPRESSED_TYPES[ext.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT] = true;
    }

    return this;
};

/**
    Enable the WEBGL_compressed_texture_etc extension  and add the following enums, which can
    be used as texture formats, to the PicoGL object:
    
    <ul>
      <li>PicoGL.COMPRESSED_R11_EAC
      <li>PicoGL.COMPRESSED_SIGNED_R11_EAC
      <li>PicoGL.COMPRESSED_RG11_EAC
      <li>PicoGL.COMPRESSED_SIGNED_RG11_EAC
      <li>PicoGL.COMPRESSED_RGB8_ETC2
      <li>PicoGL.COMPRESSED_SRGB8_ETC2
      <li>PicoGL.COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2
      <li>PicoGL.COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2
      <li>PicoGL.COMPRESSED_RGBA8_ETC2_EAC
      <li>PicoGL.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC
    </ul>

    Note that while WEBGL_compressed_texture_etc1 is not enabled by this method,
    ETC1 textures can be loaded using COMPRESSED_RGB8_ETC2 as the format.

    @method
*/
App.prototype.etcTextures = function() {
    let ext = this.gl.getExtension("WEBGL_compressed_texture_etc");
    this.etcTexturesEnabled = !!ext;

    if (this.etcTexturesEnabled) {
        CONSTANTS.COMPRESSED_R11_EAC                        = ext.COMPRESSED_R11_EAC;
        CONSTANTS.COMPRESSED_SIGNED_R11_EAC                 = ext.COMPRESSED_SIGNED_R11_EAC;
        CONSTANTS.COMPRESSED_RG11_EAC                       = ext.COMPRESSED_RG11_EAC;
        CONSTANTS.COMPRESSED_SIGNED_RG11_EAC                = ext.COMPRESSED_SIGNED_RG11_EAC;
        CONSTANTS.COMPRESSED_RGB8_ETC2                      = ext.COMPRESSED_RGB8_ETC2;
        CONSTANTS.COMPRESSED_SRGB8_ETC2                     = ext.COMPRESSED_SRGB8_ETC2;
        CONSTANTS.COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2  = ext.COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2;
        CONSTANTS.COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2 = ext.COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2;
        CONSTANTS.COMPRESSED_RGBA8_ETC2_EAC                 = ext.COMPRESSED_RGBA8_ETC2_EAC;
        CONSTANTS.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC          = ext.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC;

        TEXTURE_FORMAT_DEFAULTS.COMPRESSED_TYPES[ext.COMPRESSED_R11_EAC]                        = true;
        TEXTURE_FORMAT_DEFAULTS.COMPRESSED_TYPES[ext.COMPRESSED_SIGNED_R11_EAC]                 = true;
        TEXTURE_FORMAT_DEFAULTS.COMPRESSED_TYPES[ext.COMPRESSED_RG11_EAC]                       = true;
        TEXTURE_FORMAT_DEFAULTS.COMPRESSED_TYPES[ext.COMPRESSED_SIGNED_RG11_EAC]                = true;
        TEXTURE_FORMAT_DEFAULTS.COMPRESSED_TYPES[ext.COMPRESSED_RGB8_ETC2]                      = true;
        TEXTURE_FORMAT_DEFAULTS.COMPRESSED_TYPES[ext.COMPRESSED_SRGB8_ETC2]                     = true;
        TEXTURE_FORMAT_DEFAULTS.COMPRESSED_TYPES[ext.COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2]  = true;
        TEXTURE_FORMAT_DEFAULTS.COMPRESSED_TYPES[ext.COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2] = true;
        TEXTURE_FORMAT_DEFAULTS.COMPRESSED_TYPES[ext.COMPRESSED_RGBA8_ETC2_EAC]                 = true;
        TEXTURE_FORMAT_DEFAULTS.COMPRESSED_TYPES[ext.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC]          = true;
    }

    return this;
};

/**
    Enable the WEBGL_compressed_texture_astc extension and add the following enums, which can
    be used as texture formats, to the PicoGL object:
    
    <ul>
      <li>PicoGL.COMPRESSED_RGBA_ASTC_4x4_KHR
      <li>PicoGL.COMPRESSED_RGBA_ASTC_5x4_KHR
      <li>PicoGL.COMPRESSED_RGBA_ASTC_5x5_KHR
      <li>PicoGL.COMPRESSED_RGBA_ASTC_6x5_KHR
      <li>PicoGL.COMPRESSED_RGBA_ASTC_6x6_KHR
      <li>PicoGL.COMPRESSED_RGBA_ASTC_8x5_KHR
      <li>PicoGL.COMPRESSED_RGBA_ASTC_8x6_KHR
      <li>PicoGL.COMPRESSED_RGBA_ASTC_8x8_KHR
      <li>PicoGL.COMPRESSED_RGBA_ASTC_10x5_KHR
      <li>PicoGL.COMPRESSED_RGBA_ASTC_10x6_KHR
      <li>PicoGL.COMPRESSED_RGBA_ASTC_10x8_KHR
      <li>PicoGL.COMPRESSED_RGBA_ASTC_10x10_KHR
      <li>PicoGL.COMPRESSED_RGBA_ASTC_12x10_KHR
      <li>PicoGL.COMPRESSED_RGBA_ASTC_12x12_KHR
      <li>PicoGL.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR
      <li>PicoGL.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR
      <li>PicoGL.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR
      <li>PicoGL.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR
      <li>PicoGL.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR
      <li>PicoGL.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR
      <li>PicoGL.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR
      <li>PicoGL.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR
      <li>PicoGL.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR
      <li>PicoGL.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR
      <li>PicoGL.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR
      <li>PicoGL.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR
      <li>PicoGL.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR
      <li>PicoGL.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR
    </ul>

    @method
*/
App.prototype.astcTextures = function() {
    let ext = this.gl.getExtension("WEBGL_compressed_texture_astc");
    this.astcTexturesEnabled = !!ext;

    if (this.astcTexturesEnabled) {
        CONSTANTS.COMPRESSED_RGBA_ASTC_4x4_KHR           = ext.COMPRESSED_RGBA_ASTC_4x4_KHR;
        CONSTANTS.COMPRESSED_RGBA_ASTC_5x4_KHR           = ext.COMPRESSED_RGBA_ASTC_5x4_KHR;
        CONSTANTS.COMPRESSED_RGBA_ASTC_5x5_KHR           = ext.COMPRESSED_RGBA_ASTC_5x5_KHR;
        CONSTANTS.COMPRESSED_RGBA_ASTC_6x5_KHR           = ext.COMPRESSED_RGBA_ASTC_6x5_KHR;
        CONSTANTS.COMPRESSED_RGBA_ASTC_6x6_KHR           = ext.COMPRESSED_RGBA_ASTC_6x6_KHR;
        CONSTANTS.COMPRESSED_RGBA_ASTC_8x5_KHR           = ext.COMPRESSED_RGBA_ASTC_8x5_KHR;
        CONSTANTS.COMPRESSED_RGBA_ASTC_8x6_KHR           = ext.COMPRESSED_RGBA_ASTC_8x6_KHR;
        CONSTANTS.COMPRESSED_RGBA_ASTC_8x8_KHR           = ext.COMPRESSED_RGBA_ASTC_8x8_KHR;
        CONSTANTS.COMPRESSED_RGBA_ASTC_10x5_KHR          = ext.COMPRESSED_RGBA_ASTC_10x5_KHR;
        CONSTANTS.COMPRESSED_RGBA_ASTC_10x6_KHR          = ext.COMPRESSED_RGBA_ASTC_10x6_KHR;
        CONSTANTS.COMPRESSED_RGBA_ASTC_10x8_KHR          = ext.COMPRESSED_RGBA_ASTC_10x8_KHR;
        CONSTANTS.COMPRESSED_RGBA_ASTC_10x10_KHR         = ext.COMPRESSED_RGBA_ASTC_10x10_KHR;
        CONSTANTS.COMPRESSED_RGBA_ASTC_12x10_KHR         = ext.COMPRESSED_RGBA_ASTC_12x10_KHR;
        CONSTANTS.COMPRESSED_RGBA_ASTC_12x12_KHR         = ext.COMPRESSED_RGBA_ASTC_12x12_KHR;
        CONSTANTS.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR   = ext.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR;
        CONSTANTS.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR   = ext.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR;
        CONSTANTS.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR   = ext.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR;
        CONSTANTS.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR   = ext.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR;
        CONSTANTS.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR   = ext.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR;
        CONSTANTS.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR   = ext.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR;
        CONSTANTS.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR   = ext.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR;
        CONSTANTS.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR   = ext.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR;
        CONSTANTS.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR  = ext.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR;
        CONSTANTS.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR  = ext.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR;
        CONSTANTS.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR  = ext.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR;
        CONSTANTS.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR = ext.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR;
        CONSTANTS.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR = ext.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR;
        CONSTANTS.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR = ext.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR;

        TEXTURE_FORMAT_DEFAULTS.COMPRESSED_TYPES[ext.COMPRESSED_RGBA_ASTC_4x4_KHR]           = true;
        TEXTURE_FORMAT_DEFAULTS.COMPRESSED_TYPES[ext.COMPRESSED_RGBA_ASTC_5x4_KHR]           = true;
        TEXTURE_FORMAT_DEFAULTS.COMPRESSED_TYPES[ext.COMPRESSED_RGBA_ASTC_5x5_KHR]           = true;
        TEXTURE_FORMAT_DEFAULTS.COMPRESSED_TYPES[ext.COMPRESSED_RGBA_ASTC_6x5_KHR]           = true;
        TEXTURE_FORMAT_DEFAULTS.COMPRESSED_TYPES[ext.COMPRESSED_RGBA_ASTC_6x6_KHR]           = true;
        TEXTURE_FORMAT_DEFAULTS.COMPRESSED_TYPES[ext.COMPRESSED_RGBA_ASTC_8x5_KHR]           = true;
        TEXTURE_FORMAT_DEFAULTS.COMPRESSED_TYPES[ext.COMPRESSED_RGBA_ASTC_8x6_KHR]           = true;
        TEXTURE_FORMAT_DEFAULTS.COMPRESSED_TYPES[ext.COMPRESSED_RGBA_ASTC_8x8_KHR]           = true;
        TEXTURE_FORMAT_DEFAULTS.COMPRESSED_TYPES[ext.COMPRESSED_RGBA_ASTC_10x5_KHR]          = true;
        TEXTURE_FORMAT_DEFAULTS.COMPRESSED_TYPES[ext.COMPRESSED_RGBA_ASTC_10x6_KHR]          = true;
        TEXTURE_FORMAT_DEFAULTS.COMPRESSED_TYPES[ext.COMPRESSED_RGBA_ASTC_10x8_KHR]          = true;
        TEXTURE_FORMAT_DEFAULTS.COMPRESSED_TYPES[ext.COMPRESSED_RGBA_ASTC_10x10_KHR]         = true;
        TEXTURE_FORMAT_DEFAULTS.COMPRESSED_TYPES[ext.COMPRESSED_RGBA_ASTC_12x10_KHR]         = true;
        TEXTURE_FORMAT_DEFAULTS.COMPRESSED_TYPES[ext.COMPRESSED_RGBA_ASTC_12x12_KHR]         = true;
        TEXTURE_FORMAT_DEFAULTS.COMPRESSED_TYPES[ext.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR]   = true;
        TEXTURE_FORMAT_DEFAULTS.COMPRESSED_TYPES[ext.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR]   = true;
        TEXTURE_FORMAT_DEFAULTS.COMPRESSED_TYPES[ext.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR]   = true;
        TEXTURE_FORMAT_DEFAULTS.COMPRESSED_TYPES[ext.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR]   = true;
        TEXTURE_FORMAT_DEFAULTS.COMPRESSED_TYPES[ext.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR]   = true;
        TEXTURE_FORMAT_DEFAULTS.COMPRESSED_TYPES[ext.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR]   = true;
        TEXTURE_FORMAT_DEFAULTS.COMPRESSED_TYPES[ext.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR]   = true;
        TEXTURE_FORMAT_DEFAULTS.COMPRESSED_TYPES[ext.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR]   = true;
        TEXTURE_FORMAT_DEFAULTS.COMPRESSED_TYPES[ext.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR]  = true;
        TEXTURE_FORMAT_DEFAULTS.COMPRESSED_TYPES[ext.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR]  = true;
        TEXTURE_FORMAT_DEFAULTS.COMPRESSED_TYPES[ext.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR]  = true;
        TEXTURE_FORMAT_DEFAULTS.COMPRESSED_TYPES[ext.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR] = true;
        TEXTURE_FORMAT_DEFAULTS.COMPRESSED_TYPES[ext.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR] = true;
        TEXTURE_FORMAT_DEFAULTS.COMPRESSED_TYPES[ext.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR] = true;

        // TODO(Tarek): Test for https://bugs.chromium.org/p/chromium/issues/detail?id=757447
        // Remove this when that's fixed
        this.gl.getError();
        this.state.textures[0] = null;
        this.gl.activeTexture(this.gl.TEXTURE0);
        let texture = this.gl.createTexture();
        this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
        this.gl.texStorage2D(this.gl.TEXTURE_2D, 1, ext.COMPRESSED_RGBA_ASTC_4x4_KHR, 4, 4);

        if (this.gl.getError() !== this.gl.NO_ERROR) {
            TEXTURE_FORMAT_DEFAULTS.NO_TEX_STORAGE[ext.COMPRESSED_RGBA_ASTC_4x4_KHR]           = true;
            TEXTURE_FORMAT_DEFAULTS.NO_TEX_STORAGE[ext.COMPRESSED_RGBA_ASTC_5x4_KHR]           = true;
            TEXTURE_FORMAT_DEFAULTS.NO_TEX_STORAGE[ext.COMPRESSED_RGBA_ASTC_5x5_KHR]           = true;
            TEXTURE_FORMAT_DEFAULTS.NO_TEX_STORAGE[ext.COMPRESSED_RGBA_ASTC_6x5_KHR]           = true;
            TEXTURE_FORMAT_DEFAULTS.NO_TEX_STORAGE[ext.COMPRESSED_RGBA_ASTC_6x6_KHR]           = true;
            TEXTURE_FORMAT_DEFAULTS.NO_TEX_STORAGE[ext.COMPRESSED_RGBA_ASTC_8x5_KHR]           = true;
            TEXTURE_FORMAT_DEFAULTS.NO_TEX_STORAGE[ext.COMPRESSED_RGBA_ASTC_8x6_KHR]           = true;
            TEXTURE_FORMAT_DEFAULTS.NO_TEX_STORAGE[ext.COMPRESSED_RGBA_ASTC_8x8_KHR]           = true;
            TEXTURE_FORMAT_DEFAULTS.NO_TEX_STORAGE[ext.COMPRESSED_RGBA_ASTC_10x5_KHR]          = true;
            TEXTURE_FORMAT_DEFAULTS.NO_TEX_STORAGE[ext.COMPRESSED_RGBA_ASTC_10x6_KHR]          = true;
            TEXTURE_FORMAT_DEFAULTS.NO_TEX_STORAGE[ext.COMPRESSED_RGBA_ASTC_10x8_KHR]          = true;
            TEXTURE_FORMAT_DEFAULTS.NO_TEX_STORAGE[ext.COMPRESSED_RGBA_ASTC_10x10_KHR]         = true;
            TEXTURE_FORMAT_DEFAULTS.NO_TEX_STORAGE[ext.COMPRESSED_RGBA_ASTC_12x10_KHR]         = true;
            TEXTURE_FORMAT_DEFAULTS.NO_TEX_STORAGE[ext.COMPRESSED_RGBA_ASTC_12x12_KHR]         = true;
            TEXTURE_FORMAT_DEFAULTS.NO_TEX_STORAGE[ext.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR]   = true;
            TEXTURE_FORMAT_DEFAULTS.NO_TEX_STORAGE[ext.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR]   = true;
            TEXTURE_FORMAT_DEFAULTS.NO_TEX_STORAGE[ext.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR]   = true;
            TEXTURE_FORMAT_DEFAULTS.NO_TEX_STORAGE[ext.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR]   = true;
            TEXTURE_FORMAT_DEFAULTS.NO_TEX_STORAGE[ext.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR]   = true;
            TEXTURE_FORMAT_DEFAULTS.NO_TEX_STORAGE[ext.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR]   = true;
            TEXTURE_FORMAT_DEFAULTS.NO_TEX_STORAGE[ext.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR]   = true;
            TEXTURE_FORMAT_DEFAULTS.NO_TEX_STORAGE[ext.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR]   = true;
            TEXTURE_FORMAT_DEFAULTS.NO_TEX_STORAGE[ext.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR]  = true;
            TEXTURE_FORMAT_DEFAULTS.NO_TEX_STORAGE[ext.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR]  = true;
            TEXTURE_FORMAT_DEFAULTS.NO_TEX_STORAGE[ext.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR]  = true;
            TEXTURE_FORMAT_DEFAULTS.NO_TEX_STORAGE[ext.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR] = true;
            TEXTURE_FORMAT_DEFAULTS.NO_TEX_STORAGE[ext.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR] = true;
            TEXTURE_FORMAT_DEFAULTS.NO_TEX_STORAGE[ext.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR] = true;
        }

        this.gl.deleteTexture(texture);
    }
    
    return this;
};

/**
    Enable the WEBGL_compressed_texture_pvrtc extension and add the following enums, which can
    be used as texture formats, to the PicoGL object:

    <ul>
      <li>PicoGL.COMPRESSED_RGB_PVRTC_4BPPV1_IMG
      <li>PicoGL.COMPRESSED_RGB_PVRTC_2BPPV1_IMG
      <li>PicoGL.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG
      <li>PicoGL.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG
    </ul>

    @method
*/
App.prototype.pvrtcTextures = function() {
    let ext = this.gl.getExtension("WEBGL_compressed_texture_pvrtc");
    this.pvrtcTexturesEnabled = !!ext;
    
    if (this.pvrtcTexturesEnabled) {
        CONSTANTS.COMPRESSED_RGB_PVRTC_4BPPV1_IMG = ext.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
        CONSTANTS.COMPRESSED_RGB_PVRTC_2BPPV1_IMG = ext.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
        CONSTANTS.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG = ext.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
        CONSTANTS.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG = ext.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;

        TEXTURE_FORMAT_DEFAULTS.COMPRESSED_TYPES[ext.COMPRESSED_RGB_PVRTC_4BPPV1_IMG] = true;
        TEXTURE_FORMAT_DEFAULTS.COMPRESSED_TYPES[ext.COMPRESSED_RGB_PVRTC_2BPPV1_IMG] = true;
        TEXTURE_FORMAT_DEFAULTS.COMPRESSED_TYPES[ext.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG] = true;
        TEXTURE_FORMAT_DEFAULTS.COMPRESSED_TYPES[ext.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG] = true;
    }

    return this;
};

/**
    Read a pixel's color value from the currently-bound framebuffer.

    @method
    @param {number} x The x coordinate of the pixel.
    @param {number} y The y coordinate of the pixel.
    @param {ArrayBufferView} outColor Typed array to store the pixel's color.
    @param {object} [options] Options.
    @param {GLEnum} [options.type=UNSIGNED_BYTE] Type of data stored in the read framebuffer.
    @param {GLEnum} [options.format=RGBA] Read framebuffer data format.
*/
App.prototype.readPixel = function(x, y, outColor, options = CONSTANTS.DUMMY_OBJECT) {
    let format = options.format || CONSTANTS.RGBA;
    let type = options.type || CONSTANTS.UNSIGNED_BYTE;

    this.gl.readPixels(x, y, 1, 1, format, type, outColor);

    return this;
};

/**
    Set the viewport.

    @method
    @param {number} x Left bound of the viewport rectangle.
    @param {number} y Lower bound of the viewport rectangle.
    @param {number} width Width of the viewport rectangle.
    @param {number} height Height of the viewport rectangle.
*/
App.prototype.viewport = function(x, y, width, height) {

    if (this.viewportWidth !== width || this.viewportHeight !== height ||
            this.viewportX !== x || this.viewportY !== y) {
        this.viewportX = x;
        this.viewportY = y;
        this.viewportWidth = width;
        this.viewportHeight = height;
        this.gl.viewport(x, y, this.viewportWidth, this.viewportHeight);
    }

    return this;
};

/**
    Resize the drawing surface.

    @method
    @param {number} width The new canvas width.
    @param {number} height The new canvas height.
*/
App.prototype.resize = function(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;

    this.width = this.gl.drawingBufferWidth;
    this.height = this.gl.drawingBufferHeight;
    this.viewport(0, 0, this.width, this.height);

    return this;
};
/**
    Create a program.

    @method
    @param {Shader|string} vertexShader Vertex shader object or source code.
    @param {Shader|string} fragmentShader Fragment shader object or source code.
    @param {Array} [xformFeedbackVars] Transform feedback varyings.
*/
App.prototype.createProgram = function(vsSource, fsSource, xformFeedbackVars) {
    return new Program(this.gl, this.state, vsSource, fsSource, xformFeedbackVars);
};

/**
    Create a shader. Creating a shader separately from a program allows for
    shader reuse.

    @method
    @param {GLEnum} type Shader type.
    @param {string} source Shader source.
*/
App.prototype.createShader = function(type, source) {
    return new Shader(this.gl, type, source);
};

/**
    Create a vertex array.

    @method
*/
App.prototype.createVertexArray = function() {
    return new VertexArray(this.gl, this.state);
};

/**
    Create a transform feedback object.

    @method
*/
App.prototype.createTransformFeedback = function() {
    return new TransformFeedback(this.gl, this.state);
};

/**
    Create a vertex buffer.

    @method
    @param {GLEnum} type The data type stored in the vertex buffer.
    @param {number} itemSize Number of elements per vertex.
    @param {ArrayBufferView} data Buffer data.
    @param {GLEnum} [usage=STATIC_DRAW] Buffer usage.
*/
App.prototype.createVertexBuffer = function(type, itemSize, data, usage) {
    return new VertexBuffer(this.gl, this.state, type, itemSize, data, usage);
};

/**
    Create a per-vertex matrix buffer. Matrix buffers ensure that columns
    are correctly split across attribute locations.

    @method
    @param {GLEnum} type The data type stored in the matrix buffer. Valid types
    are FLOAT_MAT4, FLOAT_MAT4x2, FLOAT_MAT4x3, FLOAT_MAT3, FLOAT_MAT3x2,
    FLOAT_MAT3x4, FLOAT_MAT2, FLOAT_MAT2x3, FLOAT_MAT2x4.
    @param {ArrayBufferView} data Matrix buffer data.
    @param {GLEnum} [usage=STATIC_DRAW] Buffer usage.
*/
App.prototype.createMatrixBuffer = function(type, data, usage) {
    return new VertexBuffer(this.gl, this.state, type, 0, data, usage);
};

/**
    Create an index buffer.

    @method
    @param {GLEnum} type The data type stored in the index buffer.
    @param {number} itemSize Number of elements per primitive.
    @param {ArrayBufferView} data Index buffer data.
    @param {GLEnum} [usage=STATIC_DRAW] Buffer usage.
*/
App.prototype.createIndexBuffer = function(type, itemSize, data, usage) {
    return new VertexBuffer(this.gl, this.state, type, itemSize, data, usage, true);
};

/**
    Create a uniform buffer in std140 layout. NOTE: FLOAT_MAT2, FLOAT_MAT3x2, FLOAT_MAT4x2,
    FLOAT_MAT3, FLOAT_MAT2x3, FLOAT_MAT4x3 are supported, but must be manually padded to
    4-float column alignment by the application!

    @method
    @param {Array} layout Array indicating the order and types of items to
                    be stored in the buffer.
    @param {GLEnum} [usage=DYNAMIC_DRAW] Buffer usage.
*/
App.prototype.createUniformBuffer = function(layout, usage) {
    return new UniformBuffer(this.gl, layout, usage);
};

/**
    Create a 2D texture.

    @method
    @param {DOMElement|ArrayBufferView|Array} image Image data. An array can be passed to manually set all levels 
        of the mipmap chain. If a single level is passed and mipmap filtering is being used,
        generateMipmap() will be called to produce the remaining levels.
    @param {number} [width] Texture width. Required for array data.
    @param {number} [height] Texture height. Required for array data.
    @param {Object} [options] Texture options.
    @param {GLEnum} [options.type=UNSIGNED_BYTE] Type of data stored in the texture.
    @param {GLEnum} [options.format=RGBA] Texture data format.
    @param {GLEnum} [options.internalFormat=RGBA] Texture data internal format.
    @param {boolean} [options.flipY=false] Whether the y-axis be flipped when unpacking the texture.
    @param {GLEnum} [options.minFilter=LINEAR_MIPMAP_NEAREST] Minification filter.
    @param {GLEnum} [options.magFilter=LINEAR] Magnification filter.
    @param {GLEnum} [options.wrapS=REPEAT] Horizontal wrap mode.
    @param {GLEnum} [options.wrapT=REPEAT] Vertical wrap mode.
    @param {GLEnum} [options.compareMode=NONE] Comparison mode.
    @param {GLEnum} [options.compareFunc=LEQUAL] Comparison function.
    @param {GLEnum} [options.baseLevel] Base mipmap level.
    @param {GLEnum} [options.maxLevel] Maximum mipmap level.
    @param {GLEnum} [options.minLOD] Mimimum level of detail.
    @param {GLEnum} [options.maxLOD] Maximum level of detail.
    @param {boolean} [options.generateMipmaps] Should mipmaps be generated.
*/
App.prototype.createTexture2D = function(image, width, height, options) {
    if (height === undefined) {
        // Passing in a DOM element. Height/width not required.
        options = width;
        width = image.width;
        height = image.height;
    }

    return new Texture(this.gl, this.state, this.gl.TEXTURE_2D, image, width, height, undefined, false, options);
};

/**
    Create a 2D texture array.

    @method
    @param {ArrayBufferView|Array} image Pixel data. An array can be passed to manually set all levels 
        of the mipmap chain. If a single level is passed and mipmap filtering is being used,
        generateMipmap() will be called to produce the remaining levels.
    @param {number} width Texture width.
    @param {number} height Texture height.
    @param {number} size Number of images in the array.
    @param {Object} [options] Texture options.
    @param {GLEnum} [options.type=UNSIGNED_BYTE] Type of data stored in the texture.
    @param {GLEnum} [options.format=RGBA] Texture data format.
    @param {GLEnum} [options.internalFormat=RGBA] Texture data internal format.
    @param {boolean} [options.flipY=false] Whether the y-axis be flipped when unpacking the texture.
    @param {GLEnum} [options.minFilter=LINEAR_MIPMAP_NEAREST] Minification filter.
    @param {GLEnum} [options.magFilter=LINEAR] Magnification filter.
    @param {GLEnum} [options.wrapS=REPEAT] Horizontal wrap mode.
    @param {GLEnum} [options.wrapT=REPEAT] Vertical wrap mode.
    @param {GLEnum} [options.compareMode=NONE] Comparison mode.
    @param {GLEnum} [options.compareFunc=LEQUAL] Comparison function.
    @param {GLEnum} [options.baseLevel] Base mipmap level.
    @param {GLEnum} [options.maxLevel] Maximum mipmap level.
    @param {GLEnum} [options.minLOD] Mimimum level of detail.
    @param {GLEnum} [options.maxLOD] Maximum level of detail.
    @param {boolean} [options.generateMipmaps] Should mipmaps be generated.
*/
App.prototype.createTextureArray = function(image, width, height, depth, options) {
    return new Texture(this.gl, this.state, this.gl.TEXTURE_2D_ARRAY, image, width, height, depth, true, options);
};

/**
    Create a 3D texture.

    @method
    @param {ArrayBufferView|Array} image Pixel data. An array can be passed to manually set all levels 
        of the mipmap chain. If a single level is passed and mipmap filtering is being used,
        generateMipmap() will be called to produce the remaining levels.
    @param {number} width Texture width.
    @param {number} height Texture height.
    @param {number} depth Texture depth.
    @param {Object} [options] Texture options.
    @param {GLEnum} [options.type=UNSIGNED_BYTE] Type of data stored in the texture.
    @param {GLEnum} [options.format=RGBA] Texture data format.
    @param {GLEnum} [options.internalFormat=RGBA] Texture data internal format.
    @param {boolean} [options.flipY=false] Whether the y-axis be flipped when unpacking the texture.
    @param {GLEnum} [options.minFilter=LINEAR_MIPMAP_NEAREST] Minification filter.
    @param {GLEnum} [options.magFilter=LINEAR] Magnification filter.
    @param {GLEnum} [options.wrapS=REPEAT] Horizontal wrap mode.
    @param {GLEnum} [options.wrapT=REPEAT] Vertical wrap mode.
    @param {GLEnum} [options.wrapR=REPEAT] Depth wrap mode.
    @param {GLEnum} [options.compareMode=NONE] Comparison mode.
    @param {GLEnum} [options.compareFunc=LEQUAL] Comparison function.
    @param {GLEnum} [options.baseLevel] Base mipmap level.
    @param {GLEnum} [options.maxLevel] Maximum mipmap level.
    @param {GLEnum} [options.minLOD] Mimimum level of detail.
    @param {GLEnum} [options.maxLOD] Maximum level of detail.
    @param {boolean} [options.generateMipmaps] Should mipmaps be generated.
*/
App.prototype.createTexture3D = function(image, width, height, depth, options) {
    return new Texture(this.gl, this.state, this.gl.TEXTURE_3D, image, width, height, depth, true, options);
};

/**
    Create a cubemap.

    @method
    @param {Object} options Texture options.
    @param {DOMElement|ArrayBufferView} options.negX The image data for the negative X direction.
            Can be any format that would be accepted by texImage2D.
    @param {DOMElement|ArrayBufferView} options.posX The image data for the positive X direction.
            Can be any format that would be accepted by texImage2D.
    @param {DOMElement|ArrayBufferView} options.negY The image data for the negative Y direction.
            Can be any format that would be accepted by texImage2D.
    @param {DOMElement|ArrayBufferView} options.posY The image data for the positive Y direction.
            Can be any format that would be accepted by texImage2D.
    @param {DOMElement|ArrayBufferView} options.negZ The image data for the negative Z direction.
            Can be any format that would be accepted by texImage2D.
    @param {DOMElement|ArrayBufferView} options.posZ The image data for the positive Z direction.
            Can be any format that would be accepted by texImage2D.
    @param {GLEnum} [options.type=UNSIGNED_BYTE] Type of data stored in the texture.
    @param {GLEnum} [options.format=RGBA] Texture data format.
    @param {GLEnum} [options.internalFormat=RGBA] Texture data internal format.
    @param {number} [options.width] Texture width. Required when passing array data.
    @param {number} [options.height] Texture height. Required when passing array data.
    @param {boolean} [options.flipY=false] Whether the y-axis be flipped when unpacking the texture.
    @param {GLEnum} [options.minFilter=LINEAR_MIPMAP_NEAREST] Minification filter.
    @param {GLEnum} [options.magFilter=LINEAR] Magnification filter.
    @param {GLEnum} [options.wrapS=REPEAT] Horizontal wrap mode.
    @param {GLEnum} [options.wrapT=REPEAT] Vertical wrap mode.
    @param {GLEnum} [options.compareMode=NONE] Comparison mode.
    @param {GLEnum} [options.compareFunc=LEQUAL] Comparison function.
    @param {boolean} [options.generateMipmaps] Should mipmaps be generated.
*/
App.prototype.createCubemap = function(options) {
    return new Cubemap(this.gl, this.state, options);
};

/**
    Create a framebuffer.

    @method
    @param {number} [width=app.width] Width of the framebuffer.
    @param {number} [height=app.height] Height of the framebuffer.
*/
App.prototype.createFramebuffer = function(width, height) {
    return new Framebuffer(this.gl, this.state, width, height);
};

/**
    Create a query.

    @method
    @param {GLEnum} target Information to query.
*/
App.prototype.createQuery = function(target) {
    return new Query(this.gl, target);
};

/**
    Create a timer.

    @method
*/
App.prototype.createTimer = function() {
    return new Timer(this.gl);
};

/**
    Create a DrawCall. A DrawCall manages the state associated with
    a WebGL draw call including a program and associated vertex data, textures,
    uniforms and uniform blocks.

    @method
    @param {Program} program The program to use for this DrawCall.
    @param {VertexArray} vertexArray Vertex data to use for drawing.
    @param {GLEnum} [primitive=TRIANGLES] Type of primitive to draw.
*/
App.prototype.createDrawCall = function(program, vertexArray, primitive) {
    return new DrawCall(this.gl, this.state, program, vertexArray, primitive);
};

module.exports = App;

},{"./constants":2,"./cubemap":3,"./draw-call":4,"./framebuffer":5,"./program":7,"./query":8,"./shader":9,"./texture":11,"./texture-format-defaults":10,"./timer":12,"./transform-feedback":13,"./uniform-buffer":14,"./vertex-array":16,"./vertex-buffer":17}],2:[function(require,module,exports){
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

const CONSTANTS = {};
let canvas = document.createElement("canvas");
let gl = canvas.getContext("webgl2");

if (gl) {
    for (let enumName in gl) {
        if (enumName.match(/^[A-Z0-9_x]+$/) && typeof(gl[enumName]) === "number") {
            CONSTANTS[enumName] = gl[enumName];
        }
    }
}

CONSTANTS.TYPE_SIZE = {};
CONSTANTS.TYPE_SIZE[gl.BYTE]              = 1;
CONSTANTS.TYPE_SIZE[gl.UNSIGNED_BYTE]     = 1;
CONSTANTS.TYPE_SIZE[gl.SHORT]             = 2;
CONSTANTS.TYPE_SIZE[gl.UNSIGNED_SHORT]    = 2;
CONSTANTS.TYPE_SIZE[gl.INT]               = 4;
CONSTANTS.TYPE_SIZE[gl.UNSIGNED_INT]      = 4;
CONSTANTS.TYPE_SIZE[gl.FLOAT]             = 4;

CONSTANTS.WEBGL_INFO = {};
CONSTANTS.WEBGL_INFO.MAX_TEXTURE_UNITS = gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
CONSTANTS.WEBGL_INFO.MAX_UNIFORM_BUFFERS = gl.getParameter(gl.MAX_UNIFORM_BUFFER_BINDINGS);

CONSTANTS.DUMMY_OBJECT = {};

module.exports = CONSTANTS;

},{}],3:[function(require,module,exports){
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

const TEXTURE_FORMAT_DEFAULTS = require("./texture-format-defaults");

/**
    Cubemap for environment mapping.

    @class
    @prop {WebGLRenderingContext} gl The WebGL context.
    @prop {WebGLTexture} texture Handle to the texture.
    @prop {GLEnum} type Type of data stored in the texture.
    @prop {GLEnum} format Layout of texture data.
    @prop {GLEnum} internalFormat Internal arrangement of the texture data.
    @prop {Number} currentUnit The current texture unit this cubemap is bound to.
    @prop {Object} appState Tracked GL state.
*/
function Cubemap(gl, appState, options) {
    
    this.gl = gl;
    this.texture = gl.createTexture();
    this.format = options.format !== undefined ? options.format : gl.RGBA;
    this.type = options.type !== undefined ? options.type : gl.UNSIGNED_BYTE;
    this.internalFormat = options.internalFormat !== undefined ? options.internalFormat : TEXTURE_FORMAT_DEFAULTS[this.type][this.format];
    this.appState = appState;
    
    // -1 indicates unbound
    this.currentUnit = -1;

    let negX = options.negX;
    let posX = options.posX;
    let negY = options.negY;
    let posY = options.posY;
    let negZ = options.negZ;
    let posZ = options.posZ;

    let width = options.width || negX.width;
    let height = options.height || negX.height;
    let flipY = options.flipY !== undefined ? options.flipY : false;
    let minFilter = options.minFilter !== undefined ? options.minFilter : gl.LINEAR_MIPMAP_NEAREST;
    let magFilter = options.magFilter !== undefined ? options.magFilter : gl.LINEAR;
    let compareMode = options.compareMode !== undefined ? options.compareMode : gl.NONE;
    let compareFunc = options.compareFunc !== undefined ? options.compareFunc : gl.LEQUAL;
    let generateMipmaps = options.generateMipmaps !== false &&
                        (minFilter === gl.LINEAR_MIPMAP_NEAREST || minFilter === gl.LINEAR_MIPMAP_LINEAR);

    this.bind(1);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, magFilter);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, minFilter);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_COMPARE_FUNC, compareFunc);
    gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_COMPARE_MODE, compareMode);
    if (options.baseLevel !== undefined) {
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_BASE_LEVEL, options.baseLevel);
    }
    if (options.maxLevel !== undefined) {
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAX_LEVEL, options.maxLevel);
    }
    if (options.minLOD !== undefined) {
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_LOD, options.minLOD);
    }
    if (options.maxLOD !== undefined) {
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAX_LOD, options.maxLOD);
    }

    let levels = generateMipmaps ? Math.floor(Math.log2(Math.min(width, height))) + 1 : 1;
    gl.texStorage2D(gl.TEXTURE_CUBE_MAP, levels, this.internalFormat, width, height);

    gl.texSubImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, 0, 0, width, height, this.format, this.type, negX);
    gl.texSubImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, 0, 0, width, height, this.format, this.type, posX);
    gl.texSubImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, 0, 0, width, height, this.format, this.type, negY);
    gl.texSubImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, 0, 0, width, height, this.format, this.type, posY);
    gl.texSubImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, 0, 0, width, height, this.format, this.type, negZ);
    gl.texSubImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, 0, 0, width, height, this.format, this.type, posZ);

    if (generateMipmaps) {
        gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
    }

}

/**
    Delete this cubemap.

    @method
*/
Cubemap.prototype.delete = function() {
    if (this.texture) {
        this.gl.deleteTexture(this.texture);
        this.texture = null;
        this.appState.textures[this.currentUnit] = null;
        this.currentUnit = -1;
    }
};

// Bind this cubemap to a texture unit.
Cubemap.prototype.bind = function(unit) {
    let currentTexture = this.appState.textures[unit];
    
    if (currentTexture !== this) {
        if (currentTexture) {
            currentTexture.currentUnit = -1;
        }

        if (this.currentUnit !== -1) {
            this.appState.textures[this.currentUnit] = null;
        }

        this.gl.activeTexture(this.gl.TEXTURE0 + unit);
        this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP, this.texture);

        this.appState.textures[unit] = this;
        this.currentUnit = unit;
    }

    return this;
};

module.exports = Cubemap;

},{"./texture-format-defaults":10}],4:[function(require,module,exports){
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
    A DrawCall represents the program and values of associated
    attributes, uniforms and textures for a single draw call.

    @class
    @prop {WebGLRenderingContext} gl The WebGL context.
    @prop {Program} currentProgram The program to use for this draw call.
    @prop {VertexArray} currentVertexArray Vertex array to use for this draw call.
    @prop {TransformFeedback} currentTransformFeedback Transform feedback to use for this draw call.
    @prop {Array} uniformBuffers Ordered list of active uniform buffers.
    @prop {Array} uniformBlockNames Ordered list of uniform block names.
    @prop {Object} uniformBlockBases Map of uniform blocks to uniform buffer bases.
    @prop {Number} uniformBlockCount Number of active uniform blocks for this draw call.
    @prop {Object} uniformIndices Map of uniform names to indices in the uniform arrays.
    @prop {Array} uniformNames Ordered list of uniform names.
    @prop {Array} uniformValue Ordered list of uniform values.
    @prop {number} uniformCount The number of active uniforms for this draw call.
    @prop {Array} textures Array of active textures.
    @prop {number} textureCount The number of active textures for this draw call.
    @prop {GLEnum} primitive The primitive type being drawn.
    @prop {Object} appState Tracked GL state.
*/
function DrawCall(gl, appState, program, vertexArray, primitive = CONSTANTS.TRIANGLES) {
    this.gl = gl;
    this.currentProgram = program;
    this.currentVertexArray = vertexArray;
    this.currentTransformFeedback = null;
    this.appState = appState;

    this.uniformIndices = {};
    this.uniformNames = new Array(CONSTANTS.WEBGL_INFO.MAX_UNIFORMS);
    this.uniformValues = new Array(CONSTANTS.WEBGL_INFO.MAX_UNIFORMS);
    this.uniformCount = 0;
    this.uniformBuffers = new Array(CONSTANTS.WEBGL_INFO.MAX_UNIFORM_BUFFERS);
    this.uniformBlockNames = new Array(CONSTANTS.WEBGL_INFO.MAX_UNIFORM_BUFFERS);
    this.uniformBlockBases = {};
    this.uniformBlockCount = 0;
    this.samplerIndices = {};
    this.textures = new Array(CONSTANTS.WEBGL_INFO.MAX_TEXTURE_UNITS);
    this.textureCount = 0;
    this.primitive = primitive;
}

DrawCall.prototype.transformFeedback = function(transformFeedback) {
    this.currentTransformFeedback = transformFeedback;

    return this;
};

/**
    Set the value for a uniform. Array uniforms are supported by
    using appending "[0]" to the array name and passing a flat array
    with all required values.

    @method
    @param {string} name Uniform name.
    @param {any} value Uniform value.
*/
DrawCall.prototype.uniform = function(name, value) {
    let index = this.uniformIndices[name];
    if (index === undefined) {
        index = this.uniformCount++;
        this.uniformIndices[name] = index;
        this.uniformNames[index] = name;
    }
    this.uniformValues[index] = value;

    return this;
};

/**
    Set texture to bind to a sampler uniform.

    @method
    @param {string} name Sampler uniform name.
    @param {Texture} texture Texture to bind.
*/
DrawCall.prototype.texture = function(name, texture) {
    let unit = this.currentProgram.samplers[name];
    this.textures[unit] = texture;

    return this;
};

/**
    Set uniform buffer to bind to a uniform block.

    @method
    @param {string} name Uniform block name.
    @param {UniformBuffer} buffer Uniform buffer to bind.
*/
DrawCall.prototype.uniformBlock = function(name, buffer) {
    let base = this.uniformBlockBases[name];
    if (base === undefined) {
        base = this.uniformBlockCount++;
        this.uniformBlockBases[name] = base;
        this.uniformBlockNames[base] = name;
    }

    this.uniformBuffers[base] = buffer;

    return this;
};

/**
    Draw based on current state.

    @method
*/
DrawCall.prototype.draw = function() {
    let uniformNames = this.uniformNames;
    let uniformValues = this.uniformValues;
    let uniformBuffers = this.uniformBuffers;
    let uniformBlockNames = this.uniformBlockNames;
    let textures = this.textures;
    let textureCount = this.currentProgram.samplerCount;

    this.currentProgram.bind();
    this.currentVertexArray.bind();

    for (let uIndex = 0; uIndex < this.uniformCount; ++uIndex) {
        this.currentProgram.uniform(uniformNames[uIndex], uniformValues[uIndex]);
    }

    for (let base = 0; base < this.uniformBlockCount; ++base) {
        this.currentProgram.uniformBlock(uniformBlockNames[base], base);
        uniformBuffers[base].bind(base);
    }

    /////////////////////////////////////////////////////////////////////////////////
    // TODO(Tarek):
    // Workaround for https://bugs.chromium.org/p/chromium/issues/detail?id=722288
    // Start at 0 when that's fixed
    /////////////////////////////////////////////////////////////////////////////////
    for (let tIndex = 1; tIndex < textureCount; ++tIndex) {
        textures[tIndex].bind(tIndex);
    }

    if (this.currentTransformFeedback) {
        this.currentTransformFeedback.bind();
        this.gl.beginTransformFeedback(this.primitive);
    }

    if (this.currentVertexArray.instanced) {
        if (this.currentVertexArray.indexed) {
            this.gl.drawElementsInstanced(this.primitive, this.currentVertexArray.numElements, this.currentVertexArray.indexType, 0, this.currentVertexArray.numInstances);
        } else {
            this.gl.drawArraysInstanced(this.primitive, 0, this.currentVertexArray.numElements, this.currentVertexArray.numInstances);
        }
    } else if (this.currentVertexArray.indexed) {
        this.gl.drawElements(this.primitive, this.currentVertexArray.numElements, this.currentVertexArray.indexType, 0);
    } else {
        this.gl.drawArrays(this.primitive, 0, this.currentVertexArray.numElements);
    }

    if (this.currentTransformFeedback) {
        this.gl.endTransformFeedback();
        // TODO(Tarek): Need to rebind buffers due to bug in ANGLE.
        // Remove this when that's fixed.
        for (let i = 0, len = this.currentTransformFeedback.angleBugBuffers.length; i < len; ++i) {
            this.gl.bindBufferBase(this.gl.TRANSFORM_FEEDBACK_BUFFER, i, null);
        }
    }
};

module.exports = DrawCall;

},{"./constants":2}],5:[function(require,module,exports){
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

const TEXTURE_FORMAT_DEFAULTS = require("./texture-format-defaults");
const Texture = require("./texture");

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
Framebuffer.prototype.colorTarget = function(index = 0, options = {}) {
    options.type = options.type || this.gl.UNSIGNED_BYTE;
    options.format = options.format || this.gl.RGBA;
    options.internalFormat = options.internalFormat || TEXTURE_FORMAT_DEFAULTS[options.type][options.format];
    options.minFilter = options.minFilter || this.gl.NEAREST;
    options.magFilter = options.magFilter || this.gl.NEAREST;
    options.wrapS = options.wrapS || this.gl.CLAMP_TO_EDGE;
    options.wrapT = options.wrapT || this.gl.CLAMP_TO_EDGE;
    options.generateMipmaps = options.generateMipmaps === undefined ? false : options.generateMipmaps;

    this.colorAttachments[index] = this.gl.COLOR_ATTACHMENT0 + index;

    let currentFramebuffer = this.bindAndCaptureState();

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
Framebuffer.prototype.depthTarget = function(options = {}) {
    options.format = this.gl.DEPTH_COMPONENT;
    options.type = options.type || this.gl.UNSIGNED_SHORT;
    options.internalFormat = options.internalFormat || TEXTURE_FORMAT_DEFAULTS[options.type][options.format];
    options.minFilter = options.minFilter || this.gl.NEAREST;
    options.magFilter = options.magFilter || this.gl.NEAREST;
    options.wrapS = options.wrapS || this.gl.CLAMP_TO_EDGE;
    options.wrapT = options.wrapT || this.gl.CLAMP_TO_EDGE;
    options.generateMipmaps = options.generateMipmaps === undefined ? false : options.generateMipmaps;

    let currentFramebuffer = this.bindAndCaptureState();

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

    let currentFramebuffer = this.bindAndCaptureState();
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

    let currentFramebuffer = this.bindAndCaptureState();

    for (let i = 0; i < this.numColorTargets; ++i) {
        this.colorTextures[i].resize(this.width, this.height);
        this.gl.framebufferTexture2D(this.gl.DRAW_FRAMEBUFFER, this.colorAttachments[i], this.gl.TEXTURE_2D, this.colorTextures[i].texture, 0);
    }

    if (this.depthTexture) {
        this.depthTexture.resize(this.width, this.height);
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
    for (let i = 0; i < this.numColorTargets; ++i) {
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
    let currentFramebuffer = this.appState.drawFramebuffer;

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

},{"./texture":11,"./texture-format-defaults":10}],6:[function(require,module,exports){
(function (global){
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

const App = require("./app");

/**
    Global PicoGL module. For convenience, all WebGL enums are stored
    as properties of PicoGL (e.g. PicoGL.FLOAT, PicoGL.ONE_MINUS_SRC_ALPHA).

    @namespace PicoGL
*/
const PicoGL = global.PicoGL = require("./constants");    
PicoGL.version = "0.6.10";

/**
    Create a PicoGL app. The app is the primary entry point to PicoGL. It stores
    the canvas, the WebGL context and all WebGL state.

    @function PicoGL.createApp
    @param {DOMElement} canvas The canvas on which to create the WebGL context.
    @param {Object} [contextAttributes] Context attributes to pass when calling getContext().
*/
PicoGL.createApp = function(canvas, contextAttributes) {
    return new App(canvas, contextAttributes);
};

module.exports = PicoGL;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./app":1,"./constants":2}],7:[function(require,module,exports){
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
const Shader   = require("./shader");
const Uniforms = require("./uniforms");

/**
    WebGL program consisting of compiled and linked vertex and fragment
    shaders.

    @class
    @prop {WebGLRenderingContext} gl The WebGL context.
    @prop {WebGLProgram} program The WebGL program.
    @prop {boolean} transformFeedback Whether this program is set up for transform feedback.
    @prop {Object} uniforms Map of uniform names to handles.
    @prop {Object} uniformBlocks Map of uniform block names to handles.
    @prop {Object} appState Tracked GL state.
*/
function Program(gl, appState, vsSource, fsSource, xformFeebackVars) {
    let i;

    let vShader, fShader;

    let ownVertexShader = false;
    let ownFragmentShader = false;
    if (typeof vsSource === "string") {
        vShader = new Shader(gl, gl.VERTEX_SHADER, vsSource);
        ownVertexShader = true;
    } else {
        vShader = vsSource;
    }

    if (typeof fsSource === "string") {
        fShader = new Shader(gl, gl.FRAGMENT_SHADER, fsSource);
        ownFragmentShader = true;
    } else {
        fShader = fsSource;
    }

    let program = gl.createProgram();
    gl.attachShader(program, vShader.shader);
    gl.attachShader(program, fShader.shader);
    if (xformFeebackVars) {
        gl.transformFeedbackVaryings(program, xformFeebackVars, gl.SEPARATE_ATTRIBS);
    }
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(program));
    }

    if (ownVertexShader) {
        vShader.delete();
    }

    if (ownFragmentShader) {
        fShader.delete();
    }

    this.gl = gl;
    this.program = program;
    this.appState = appState;
    this.transformFeedback = !!xformFeebackVars;
    this.uniforms = {};
    this.uniformBlocks = {};
    this.uniformBlockBindings = {};
    this.samplers = {};
    /////////////////////////////////////////////////////////////////////////////////
    // TODO(Tarek):
    // Workaround for https://bugs.chromium.org/p/chromium/issues/detail?id=722288
    // Start at unit 0 when that's fixed
    /////////////////////////////////////////////////////////////////////////////////
    this.samplerCount = 1;

    gl.useProgram(program);

    let numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);

    for (i = 0; i < numUniforms; ++i) {
        let uniformInfo = gl.getActiveUniform(program, i);
        let uniformHandle = gl.getUniformLocation(this.program, uniformInfo.name);
        let UniformClass = null;
        let type = uniformInfo.type;
        let numElements = uniformInfo.size;

        switch (type) {
            case CONSTANTS.SAMPLER_2D:
            case CONSTANTS.INT_SAMPLER_2D:
            case CONSTANTS.UNSIGNED_INT_SAMPLER_2D:
            case CONSTANTS.SAMPLER_2D_SHADOW:
            case CONSTANTS.SAMPLER_2D_ARRAY:
            case CONSTANTS.INT_SAMPLER_2D_ARRAY:
            case CONSTANTS.UNSIGNED_INT_SAMPLER_2D_ARRAY:
            case CONSTANTS.SAMPLER_2D_ARRAY_SHADOW:
            case CONSTANTS.SAMPLER_CUBE:
            case CONSTANTS.INT_SAMPLER_CUBE:
            case CONSTANTS.UNSIGNED_INT_SAMPLER_CUBE:
            case CONSTANTS.SAMPLER_CUBE_SHADOW:
            case CONSTANTS.SAMPLER_3D:
            case CONSTANTS.INT_SAMPLER_3D:
            case CONSTANTS.UNSIGNED_INT_SAMPLER_3D:
                let textureUnit = this.samplerCount++;
                this.samplers[uniformInfo.name] = textureUnit;
                this.gl.uniform1i(uniformHandle, textureUnit);
                break;
            case CONSTANTS.INT:
            case CONSTANTS.UNSIGNED_INT:
            case CONSTANTS.FLOAT:
                UniformClass = numElements > 1 ? Uniforms.MultiNumericUniform : Uniforms.SingleComponentUniform;
                break;
            case CONSTANTS.BOOL:
                UniformClass = numElements > 1 ? Uniforms.MultiBoolUniform : Uniforms.SingleComponentUniform;
                break;
            case CONSTANTS.FLOAT_VEC2:
            case CONSTANTS.INT_VEC2:
            case CONSTANTS.UNSIGNED_INT_VEC2:
            case CONSTANTS.FLOAT_VEC3:
            case CONSTANTS.INT_VEC3:
            case CONSTANTS.UNSIGNED_INT_VEC3:
            case CONSTANTS.FLOAT_VEC4:
            case CONSTANTS.INT_VEC4:
            case CONSTANTS.UNSIGNED_INT_VEC4:
                UniformClass = Uniforms.MultiNumericUniform;
                break;
            case CONSTANTS.BOOL_VEC2:
            case CONSTANTS.BOOL_VEC3:
            case CONSTANTS.BOOL_VEC4:
                UniformClass = Uniforms.MultiBoolUniform;
                break;
            case CONSTANTS.FLOAT_MAT2:
            case CONSTANTS.FLOAT_MAT3:
            case CONSTANTS.FLOAT_MAT4:
            case CONSTANTS.FLOAT_MAT2x3:
            case CONSTANTS.FLOAT_MAT2x4:
            case CONSTANTS.FLOAT_MAT3x2:
            case CONSTANTS.FLOAT_MAT3x4:
            case CONSTANTS.FLOAT_MAT4x2:
            case CONSTANTS.FLOAT_MAT4x3:
                UniformClass = Uniforms.MatrixUniform;
                break;
            default:
                console.error("Unrecognized type for uniform ", uniformInfo.name);
                break;
        }

        if (UniformClass) {
            this.uniforms[uniformInfo.name] = new UniformClass(gl, uniformHandle, type, numElements);
        }
    }

    let numUniformBlocks = gl.getProgramParameter(program, gl.ACTIVE_UNIFORM_BLOCKS);

    for (i = 0; i < numUniformBlocks; ++i) {
        let blockName = gl.getActiveUniformBlockName(this.program, i);
        let blockIndex = gl.getUniformBlockIndex(this.program, blockName);

        this.uniformBlocks[blockName] = blockIndex;
    }

    gl.useProgram(null);
}

/**
    Delete this program.

    @method
*/
Program.prototype.delete = function() {
    if (this.program) {
        this.gl.deleteProgram(this.program);
        this.program = null;
    }
};

// Set the value of a uniform.
Program.prototype.uniform = function(name, value) {
    this.uniforms[name].set(value);
};

// Bind a uniform block to a uniform buffer base.
Program.prototype.uniformBlock = function(name, base) {
    if (this.uniformBlockBindings[name] !== base) {
        this.gl.uniformBlockBinding(this.program, this.uniformBlocks[name], base);
        this.uniformBlockBindings[name] = base;
    }
};

// Use this program.
Program.prototype.bind = function() {
    if (this.appState.program !== this) {
        this.gl.useProgram(this.program);
        this.appState.program = this;
    }
};

module.exports = Program;

},{"./constants":2,"./shader":9,"./uniforms":15}],8:[function(require,module,exports){
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

/**
    Generic query object.

    @class
    @prop {WebGLRenderingContext} gl The WebGL context.
    @prop {WebGLQuery} query Query object.
    @prop {GLEnum} target The type of information being queried.
    @prop {boolean} active Whether or not a query is currently in progress.
    @prop {Any} result The result of the query (only available after a call to ready() returns true). 
*/
function Query(gl, target) {
    this.gl = gl;
    this.query = gl.createQuery();
    this.target = target;
    this.active = false;
    this.result = null;
}

/**
    Begin a query.

    @method
*/
Query.prototype.begin = function() {
    if (!this.active) {
        this.gl.beginQuery(this.target, this.query);
        this.result = null;
    }    
};

/**
    End a query.

    @method
*/
Query.prototype.end = function() {
    if (!this.active) {
        this.gl.endQuery(this.target);
        this.active = true;
    }
};

/**
    Check if query result is available.

    @method
*/
Query.prototype.ready = function() {
    if (this.active && this.gl.getQueryParameter(this.query, this.gl.QUERY_RESULT_AVAILABLE)) {
        this.active = false;
        this.result = this.gl.getQueryParameter(this.query, this.gl.QUERY_RESULT);
        return true;
    }

    return false;
};

module.exports = Query;

},{}],9:[function(require,module,exports){
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

/**
    WebGL shader.

    @class
    @prop {WebGLRenderingContext} gl The WebGL context.
    @prop {WebGLShader} shader The shader.
*/
function Shader(gl, type, source) {
    this.gl = gl;
    this.shader = gl.createShader(type);
    gl.shaderSource(this.shader, source);
    gl.compileShader(this.shader);

    if (!gl.getShaderParameter(this.shader, gl.COMPILE_STATUS)) {
        let i, lines;

        console.error(gl.getShaderInfoLog(this.shader));
        lines = source.split("\n");
        for (i = 0; i < lines.length; ++i) {
            console.error((i + 1) + ":", lines[i]);
        }
    }
}

/**
    Delete this shader.

    @method
*/
Shader.prototype.delete = function() {
    if (this.shader) {
        this.gl.deleteShader(this.shader);
        this.shader = null;
    }
};

module.exports = Shader;

},{}],10:[function(require,module,exports){
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

const TEXTURE_FORMAT_DEFAULTS = {};
const UNSIGNED_BYTE = TEXTURE_FORMAT_DEFAULTS[CONSTANTS.UNSIGNED_BYTE] = {};
UNSIGNED_BYTE[CONSTANTS.RED] = CONSTANTS.R8;
UNSIGNED_BYTE[CONSTANTS.RG] = CONSTANTS.RG8;
UNSIGNED_BYTE[CONSTANTS.RGB] = CONSTANTS.RGB8;
UNSIGNED_BYTE[CONSTANTS.RGBA] = CONSTANTS.RGBA8;

const UNSIGNED_SHORT = TEXTURE_FORMAT_DEFAULTS[CONSTANTS.UNSIGNED_SHORT] = {};
UNSIGNED_SHORT[CONSTANTS.DEPTH_COMPONENT] = CONSTANTS.DEPTH_COMPONENT16;

const FLOAT = TEXTURE_FORMAT_DEFAULTS[CONSTANTS.FLOAT] = {};
FLOAT[CONSTANTS.RED] = CONSTANTS.R16F;
FLOAT[CONSTANTS.RG] = CONSTANTS.RG16F;
FLOAT[CONSTANTS.RGB] = CONSTANTS.RGB16F;
FLOAT[CONSTANTS.RGBA] = CONSTANTS.RGBA16F;
FLOAT[CONSTANTS.DEPTH_COMPONENT] = CONSTANTS.DEPTH_COMPONENT32F;

TEXTURE_FORMAT_DEFAULTS.COMPRESSED_TYPES = {};

// TODO(Tarek): For https://bugs.chromium.org/p/chromium/issues/detail?id=757447
// Remove this when that's fixed
TEXTURE_FORMAT_DEFAULTS.NO_TEX_STORAGE = {};

module.exports = TEXTURE_FORMAT_DEFAULTS;

},{"./constants":2}],11:[function(require,module,exports){
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
const TEXTURE_FORMAT_DEFAULTS = require("./texture-format-defaults");
const DUMMY_ARRAY = new Array(1);

/**
    General-purpose texture.

    @class
    @prop {WebGLRenderingContext} gl The WebGL context.
    @prop {WebGLTexture} texture Handle to the texture.
    @prop {WebGLSamler} sampler Sampler object.
    @prop {GLEnum} binding Binding point for the texture.
    @prop {GLEnum} type Type of data stored in the texture.
    @prop {GLEnum} format Layout of texture data.
    @prop {GLEnum} internalFormat Internal arrangement of the texture data.
    @prop {number} currentUnit The current texture unit this texture is bound to.
    @prop {boolean} is3D Whether this texture contains 3D data.
    @prop {boolean} flipY Whether the y-axis is being flipped for this texture.
    @prop {boolean} mipmaps Whether this texture is using mipmap filtering 
        (and thus should have a complete mipmap chain).
    @prop {Object} appState Tracked GL state.
*/
function Texture(gl, appState, binding, image, width = image.width, height = image.height, depth, is3D, options = CONSTANTS.DUMMY_OBJECT) {
    this.gl = gl;
    this.binding = binding;
    this.texture = null;
    this.width = -1;
    this.height = -1;
    this.depth = -1;
    this.type = options.type !== undefined ? options.type : gl.UNSIGNED_BYTE;
    this.is3D = is3D;
    this.appState = appState;

    this.format = null;
    this.internalFormat = null;
    this.compressed = !!(TEXTURE_FORMAT_DEFAULTS.COMPRESSED_TYPES[options.format] || TEXTURE_FORMAT_DEFAULTS.COMPRESSED_TYPES[options.internalFormat]);
    
    if (this.compressed) {
        // For compressed textures, just need to provide one of format, internalFormat.
        // The other will be the same.
        this.format = options.format !== undefined ? options.format : options.internalFormat;
        this.internalFormat = options.internalFormat !== undefined ? options.internalFormat : options.format;
    } else {
        this.format = options.format !== undefined ? options.format : gl.RGBA;
        this.internalFormat = options.internalFormat !== undefined ? options.internalFormat : TEXTURE_FORMAT_DEFAULTS[this.type][this.format];
    }

    this.noTexStorage = !!TEXTURE_FORMAT_DEFAULTS.NO_TEX_STORAGE[this.internalFormat];

    // -1 indicates unbound
    this.currentUnit = -1;

    // Sampler parameters
    let minFilter = options.minFilter !== undefined ? options.minFilter : gl.LINEAR_MIPMAP_NEAREST;
    let magFilter = options.magFilter !== undefined ? options.magFilter : gl.LINEAR;
    let wrapS = options.wrapS !== undefined ? options.wrapS : gl.REPEAT;
    let wrapT = options.wrapT !== undefined ? options.wrapT : gl.REPEAT;
    let wrapR = options.wrapR !== undefined ? options.wrapR : gl.REPEAT;
    let compareMode = options.compareMode !== undefined ? options.compareMode : gl.NONE;
    let compareFunc = options.compareFunc !== undefined ? options.compareFunc : gl.LEQUAL;
    let minLOD = options.minLOD !== undefined ? options.minLOD : null;
    let maxLOD = options.maxLOD !== undefined ? options.maxLOD : null;

    this.sampler = gl.createSampler();
    gl.samplerParameteri(this.sampler, gl.TEXTURE_MIN_FILTER, minFilter);
    gl.samplerParameteri(this.sampler, gl.TEXTURE_MAG_FILTER, magFilter);
    gl.samplerParameteri(this.sampler, gl.TEXTURE_WRAP_S, wrapS);
    gl.samplerParameteri(this.sampler, gl.TEXTURE_WRAP_T, wrapT);
    gl.samplerParameteri(this.sampler, gl.TEXTURE_WRAP_R, wrapR);
    gl.samplerParameteri(this.sampler, gl.TEXTURE_COMPARE_FUNC, compareFunc);
    gl.samplerParameteri(this.sampler, gl.TEXTURE_COMPARE_MODE, compareMode);
    if (minLOD !== null) {
        gl.samplerParameterf(this.sampler, gl.TEXTURE_MIN_LOD, minLOD);
    }
    if (maxLOD !== null) {
        gl.samplerParameterf(this.sampler, gl.TEXTURE_MAX_LOD, maxLOD);
    }

    // Texture parameters
    this.flipY = options.flipY !== undefined ? options.flipY : false;
    this.baseLevel = options.baseLevel !== undefined ? options.baseLevel : null;
    this.maxLevel = options.maxLevel !== undefined ? options.maxLevel : null;
    this.mipmaps = (minFilter === gl.LINEAR_MIPMAP_NEAREST || minFilter === gl.LINEAR_MIPMAP_LINEAR);

    this.resize(width, height, depth);

    if (image) {
        this.data(image);
    }
}

/**
    Re-allocate texture storage.

    @method
    @param {number} width Image width.
    @param {number} height Image height.
    @param {number} [depth] Image depth or number of images. Required when passing 3D or texture array data.
*/
Texture.prototype.resize = function(width, height, depth) {
    depth = depth || 0;

    if (width === this.width && height === this.height && depth === this.depth) {
        return; 
    }

    this.gl.deleteTexture(this.texture);
    if (this.currentUnit !== -1) {
        this.appState.textures[this.currentUnit] = null;
    }

    this.texture = this.gl.createTexture();
    this.bind(Math.max(this.currentUnit, 1));

    this.width = width;
    this.height = height;
    this.depth = depth;

    this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, this.flipY);

    if (this.baseLevel !== null) {
        this.gl.texParameteri(this.binding, this.gl.TEXTURE_BASE_LEVEL, this.baseLevel);
    }

    if (this.maxLevel !== null) {
        this.gl.texParameteri(this.binding, this.gl.TEXTURE_MAX_LEVEL, this.maxLevel);
    }

    // TODO(Tarek): For https://bugs.chromium.org/p/chromium/issues/detail?id=757447
    // Remove this when that's fixed
    if (this.noTexStorage) {
        return;
    }

    let levels;
    if (this.is3D) {
        if (this.mipmaps) {
            levels = Math.floor(Math.log2(Math.max(Math.max(this.width, this.height), this.depth))) + 1;
        } else {
            levels = 1;
        }
        this.gl.texStorage3D(this.binding, levels, this.internalFormat, this.width, this.height, this.depth);
    } else {
        if (this.mipmaps) {
            levels = Math.floor(Math.log2(Math.max(this.width, this.height))) + 1;
        } else {
            levels = 1;
        }
        this.gl.texStorage2D(this.binding, levels, this.internalFormat, this.width, this.height);
    }
};

/**
    Set the image data for the texture. An array can be passed to manually set all levels 
    of the mipmap chain. If a single level is passed and mipmap filtering is being used,
    generateMipmap() will be called to produce the remaining levels.
    NOTE: the data must fit the currently-allocated storage!

    @method
    @param {ImageElement|ArrayBufferView|Array} data Image data. If an array is passed, it will be 
        used to set mip map levels.
*/
Texture.prototype.data = function(data) {
    if (!Array.isArray(data)) {
        DUMMY_ARRAY[0] = data;
        data = DUMMY_ARRAY;
    }

    let numLevels = this.mipmaps ? data.length : 1;
    let width = this.width;
    let height = this.height;
    let depth = this.depth;
    let generateMipmaps = this.mipmaps && data.length === 1;
    let i;

    this.bind(Math.max(this.currentUnit, 0));

    if (this.compressed) {

        // TODO(Tarek): For https://bugs.chromium.org/p/chromium/issues/detail?id=757447
        // Remove this when that's fixed
        if (this.noTexStorage) {
            if (this.is3D) {
                for (i = 0; i < numLevels; ++i) {
                    this.gl.compressedTexImage3D(this.binding, i, this.internalFormat, width, height, depth, 0, data[i]);
                    width = Math.max(width >> 1, 1);
                    height = Math.max(height >> 1, 1);
                    depth = Math.max(depth >> 1, 1);
                }
            } else {
                for (i = 0; i < numLevels; ++i) {
                    this.gl.compressedTexImage2D(this.binding, i, this.internalFormat, width, height, 0, data[i]);
                    width = Math.max(width >> 1, 1);
                    height = Math.max(height >> 1, 1);
                }
            }
        } else if (this.is3D) {
            for (i = 0; i < numLevels; ++i) {
                this.gl.compressedTexSubImage3D(this.binding, i, 0, 0, 0, width, height, depth, this.format, data[i]);
                width = Math.max(width >> 1, 1);
                height = Math.max(height >> 1, 1);
                depth = Math.max(depth >> 1, 1);
            }
        } else {
            for (i = 0; i < numLevels; ++i) {
                this.gl.compressedTexSubImage2D(this.binding, i, 0, 0, width, height, this.format, data[i]);
                width = Math.max(width >> 1, 1);
                height = Math.max(height >> 1, 1);
            }
        }
    } else if (this.is3D) {
        for (i = 0; i < numLevels; ++i) {
            this.gl.texSubImage3D(this.binding, i, 0, 0, 0, width, height, depth, this.format, this.type, data[i]);
            width = Math.max(width >> 1, 1);
            height = Math.max(height >> 1, 1);
            depth = Math.max(depth >> 1, 1);
        }
    } else {
        for (i = 0; i < numLevels; ++i) {
            this.gl.texSubImage2D(this.binding, i, 0, 0, width, height, this.format, this.type, data[i]);
            width = Math.max(width >> 1, 1);
            height = Math.max(height >> 1, 1);
        }
    }

    if (generateMipmaps) {
        this.gl.generateMipmap(this.binding);
    }

    return this;
};

/**
    Delete this texture.

    @method
*/
Texture.prototype.delete = function() {
    if (this.texture) {
        this.gl.deleteTexture(this.texture);
        this.gl.deleteSampler(this.sampler);
        this.texture = null;
        this.sampler = null;
        this.appState.textures[this.currentUnit] = null;
        this.currentUnit = -1;
    }
};

// Bind this texture to a texture unit.
Texture.prototype.bind = function(unit) {
    let currentTexture = this.appState.textures[unit];
    
    if (currentTexture !== this) {
        if (currentTexture) {
            currentTexture.currentUnit = -1;
        }

        if (this.currentUnit !== -1) {
            this.appState.textures[this.currentUnit] = null;
        }

        this.gl.activeTexture(this.gl.TEXTURE0 + unit);
        this.gl.bindTexture(this.binding, this.texture);
        this.gl.bindSampler(unit, this.sampler);

        this.appState.textures[unit] = this;
        this.currentUnit = unit;
    }

    return this;
};

module.exports = Texture;

},{"./constants":2,"./texture-format-defaults":10}],12:[function(require,module,exports){
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

const Query = require("./query");

/**
    Rendering timer.

    @class
    @prop {WebGLRenderingContext} gl The WebGL context.
    @prop {Object} cpuTimer Timer for CPU. Will be window.performance, if available, or window.Date.
    @prop {boolean} gpuTimer Whether the gpu timing is available (EXT_disjoint_timer_query_webgl2 or
            EXT_disjoint_timer_query are supported).
    @prop {WebGLQuery} gpuTimerQuery Timer query object for GPU (if gpu timing is supported).
    @prop {boolean} gpuTimerQueryInProgress Whether a gpu timer query is currently in progress.
    @prop {number} cpuStartTime When the last CPU timing started.
    @prop {number} cpuTime Time spent on CPU during last timing. Only valid if ready() returns true.
    @prop {number} gpuTime Time spent on GPU during last timing. Only valid if ready() returns true.
            Will remain 0 if extension EXT_disjoint_timer_query_webgl2 is unavailable.
*/
function Timer(gl) {
    this.gl = gl;
    this.cpuTimer = window.performance || window.Date;

    // Note(Tarek): Firefox for some reason only supports EXT_disjoint_timer_query, so have to try both
    var gpuTimerExtension = this.gl.getExtension("EXT_disjoint_timer_query_webgl2") || this.gl.getExtension("EXT_disjoint_timer_query");
    if (gpuTimerExtension) {
        this.gpuTimer = true;
        this.gpuTimerQuery = new Query(this.gl, gpuTimerExtension.TIME_ELAPSED_EXT);
        this.GPU_DISJOINT_EXT = gpuTimerExtension.GPU_DISJOINT_EXT;
    } else {
        this.gpuTimer = false;
        this.gpuTimerQuery = null;
        this.GPU_DISJOINT_EXT = null;
    }

    this.cpuStartTime = 0;
    this.cpuTime = 0;
    this.gpuTime = 0;
}


/**
    Start timing.

    @method
*/
Timer.prototype.start = function() {
    if (this.gpuTimer) {
        if (!this.gpuTimerQuery.active) {
            this.gpuTimerQuery.begin();
            this.cpuStartTime = this.cpuTimer.now();
        }
    } else {
        this.cpuStartTime = this.cpuTimer.now();
    }
};


/**
    Stop timing.

    @method
*/
Timer.prototype.end = function() {
    if (this.gpuTimer) {
        if (!this.gpuTimerQuery.active) {
            this.gpuTimerQuery.end();
            this.cpuTime = this.cpuTimer.now() - this.cpuStartTime;
        }
    } else {
        this.cpuTime = this.cpuTimer.now() - this.cpuStartTime;
    }
};

/**
    Check if timing results are available. If
    this method returns true, the cpuTime and
    gpuTime properties will be set to valid
    values.

    @method
*/
Timer.prototype.ready = function() {
    if (this.gpuTimer) {
        if (!this.gpuTimerQuery.active) {
            return false;
        }

        var gpuTimerAvailable = this.gpuTimerQuery.ready();
        var gpuTimerDisjoint = this.gl.getParameter(this.GPU_DISJOINT_EXT);

        if (gpuTimerAvailable && !gpuTimerDisjoint) {
            this.gpuTime = this.gpuTimerQuery.result  / 1000000;
            return true;
        } else {
            return false;
        }
    } else {
        return !!this.cpuStartTime;
    }
};

module.exports = Timer;

},{"./query":8}],13:[function(require,module,exports){
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

/**
    Tranform feedback object.

    @class
    @prop {WebGLRenderingContext} gl The WebGL context.
    @prop {WebGLTransformFeedback} transformFeedback Transform feedback object.
    @prop {Object} appState Tracked GL state.
*/
function TransformFeedback(gl, appState) {
    this.gl = gl;
    this.transformFeedback = gl.createTransformFeedback();
    this.appState = appState;
    // TODO(Tarek): Need to rebind buffers due to bug in ANGLE.
    // Remove this when that's fixed.
    this.angleBugBuffers = [];
}

/**
    Bind a feedback buffer to capture transform output.

    @method
    @param {number} index Index of transform feedback varying to capture.
    @param {VertexBuffer} buffer Buffer to record output into.
*/
TransformFeedback.prototype.feedbackBuffer = function(index, buffer) {
    this.gl.bindTransformFeedback(this.gl.TRANSFORM_FEEDBACK, this.transformFeedback);
    this.gl.bindBufferBase(this.gl.TRANSFORM_FEEDBACK_BUFFER, index, buffer.buffer);
    this.gl.bindTransformFeedback(this.gl.TRANSFORM_FEEDBACK, null);
    this.gl.bindBufferBase(this.gl.TRANSFORM_FEEDBACK_BUFFER, index, null);

    this.angleBugBuffers[index] = buffer;

    return this;
};

/**
    Delete this transform feedback.

    @method
*/
TransformFeedback.prototype.delete = function() {
    if (this.transformFeedback) {
        this.gl.deleteTransformFeedback(this.transformFeedback);
        this.transformFeedback = null;
    }
};

// Bind this transform feedback.
TransformFeedback.prototype.bind = function() {
    if (this.appState.transformFeedback !== this) {
        this.gl.bindTransformFeedback(this.gl.TRANSFORM_FEEDBACK, this.transformFeedback);

        for (let i = 0, len = this.angleBugBuffers.length; i < len; ++i) {
            this.gl.bindBufferBase(this.gl.TRANSFORM_FEEDBACK_BUFFER, i, this.angleBugBuffers[i].buffer);
        }

        this.appState.transformFeedback = this;
    }

    return this;
};

module.exports = TransformFeedback;

},{}],14:[function(require,module,exports){
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
    Storage for uniform data. Data is stored in std140 layout.

    @class
    @prop {WebGLRenderingContext} gl The WebGL context.
    @prop {WebGLBuffer} buffer Allocated buffer storage.
    @prop {Float32Array} data Buffer data.
    @prop {Object} dataViews Map of base data types to matching ArrayBufferViews of the buffer data.
    @prop {Array} offsets Offsets into the array for each item in the buffer.
    @prop {Array} sizes Size of the item at the given offset.
    @prop {Array} types The base type of the item at the given offset (FLOAT, INT or UNSIGNED_INT).
    @prop {number} size The size of the buffer (in 4-byte items).
    @prop {GLEnum} usage Usage pattern of the buffer.
*/
function UniformBuffer(gl, layout, usage = gl.DYNAMIC_DRAW) {
    this.gl = gl;
    this.buffer = gl.createBuffer();
    this.dataViews = {};
    this.offsets = new Array(layout.length);
    this.sizes = new Array(layout.length);
    this.types = new Array(layout.length);
    this.size = 0;
    this.usage = usage;

    for (let i = 0, len = layout.length; i < len; ++i) {
        let type = layout[i];
        switch(type) {
            case CONSTANTS.FLOAT:
            case CONSTANTS.INT:
            case CONSTANTS.UNSIGNED_INT:
            case CONSTANTS.BOOL:
                this.offsets[i] = this.size;
                this.sizes[i] = 1;

                if (type === CONSTANTS.INT) {
                    this.types[i] = CONSTANTS.INT;
                } else if (this.type === CONSTANTS.UNSIGNED_INT) {
                    this.types[i] = CONSTANTS.UNSIGNED_INT;
                } else {
                    this.types[i] = CONSTANTS.FLOAT;
                }

                this.size++;
                break;
            case CONSTANTS.FLOAT_VEC2:
            case CONSTANTS.INT_VEC2:
            case CONSTANTS.UNSIGNED_INT_VEC2:
            case CONSTANTS.BOOL_VEC2:
                this.size += this.size % 2;
                this.offsets[i] = this.size;
                this.sizes[i] = 2;

                if (type === CONSTANTS.INT_VEC2) {
                    this.types[i] = CONSTANTS.INT;
                } else if (this.type === CONSTANTS.UNSIGNED_INT_VEC2) {
                    this.types[i] = CONSTANTS.UNSIGNED_INT;
                } else {
                    this.types[i] = CONSTANTS.FLOAT;
                }

                this.size += 2;
                break;
            case CONSTANTS.FLOAT_VEC3:
            case CONSTANTS.INT_VEC3:
            case CONSTANTS.UNSIGNED_INT_VEC3:
            case CONSTANTS.BOOL_VEC3:
            case CONSTANTS.FLOAT_VEC4:
            case CONSTANTS.INT_VEC4:
            case CONSTANTS.UNSIGNED_INT_VEC4:
            case CONSTANTS.BOOL_VEC4:
                this.size += (4 - this.size % 4) % 4;
                this.offsets[i] = this.size;
                this.sizes[i] = 4;

                if (type === CONSTANTS.INT_VEC4 || type === CONSTANTS.INT_VEC3) {
                    this.types[i] = CONSTANTS.INT;
                } else if (this.type === CONSTANTS.UNSIGNED_INT_VEC4 || this.type === CONSTANTS.UNSIGNED_INT_VEC3) {
                    this.types[i] = CONSTANTS.UNSIGNED_INT;
                } else {
                    this.types[i] = CONSTANTS.FLOAT;
                }

                this.size += 4;
                break;
            case CONSTANTS.FLOAT_MAT2:
            case CONSTANTS.FLOAT_MAT2x3:
            case CONSTANTS.FLOAT_MAT2x4:
                this.size += (4 - this.size % 4) % 4;
                this.offsets[i] = this.size;
                this.sizes[i] = 8;
                this.types[i] = CONSTANTS.FLOAT;

                this.size += 8;
                break;
            case CONSTANTS.FLOAT_MAT3:
            case CONSTANTS.FLOAT_MAT3x2:
            case CONSTANTS.FLOAT_MAT3x4:
                this.size += (4 - this.size % 4) % 4;
                this.offsets[i] = this.size;
                this.sizes[i] = 12;
                this.types[i] = CONSTANTS.FLOAT;

                this.size += 12;
                break;
            case CONSTANTS.FLOAT_MAT4:
            case CONSTANTS.FLOAT_MAT4x2:
            case CONSTANTS.FLOAT_MAT4x3:
                this.size += (4 - this.size % 4) % 4;
                this.offsets[i] = this.size;
                this.sizes[i] = 16;
                this.types[i] = CONSTANTS.FLOAT;

                this.size += 16;
                break;
            default:
                console.error("Unsupported type for uniform buffer.");
        }
    }

    this.size += (4 - this.size % 4) % 4;

    this.data = new Float32Array(this.size);
    this.dataViews[CONSTANTS.FLOAT] = this.data;
    this.dataViews[CONSTANTS.INT] = new Int32Array(this.data.buffer);
    this.dataViews[CONSTANTS.UNSIGNED_INT] = new Uint32Array(this.data.buffer);

    this.gl.bindBufferBase(this.gl.UNIFORM_BUFFER, 0, this.buffer);
    this.gl.bufferData(this.gl.UNIFORM_BUFFER, this.size * 4, this.usage);
    this.gl.bindBufferBase(this.gl.UNIFORM_BUFFER, 0, null);
}

/**
    Update data for a given item in the buffer. NOTE: Data is not
    sent the the GPU until the update() method is called!

    @method
    @param {number} index Index in the layout of item to set.
    @param {ArrayBufferView} value Value to store at the layout location.
*/
UniformBuffer.prototype.set = function(index, value) {
    let view = this.dataViews[this.types[index]];

    if (this.sizes[index] === 1)  {
        view[this.offsets[index]] = value;
    } else {
        view.set(value, this.offsets[index]);
    }

    return this;
};

/**
    Send stored buffer data to the GPU.

    @param {number} [index] Index in the layout of item to send to the GPU. If ommited, entire buffer is sent.
    @method
*/
UniformBuffer.prototype.update = function(index) {
    let data;
    let offset;
    if (index === undefined) {
        data = this.data;
        offset = 0;
    } else {
        let begin = this.offsets[index];
        let end = begin + this.sizes[index];
        data = this.data.subarray(begin, end);
        offset = begin * 4;
    }

    this.gl.bindBufferBase(this.gl.UNIFORM_BUFFER, 0, this.buffer);
    this.gl.bufferSubData(this.gl.UNIFORM_BUFFER, offset, data);
    this.gl.bindBufferBase(this.gl.UNIFORM_BUFFER, 0, null);

    return this;
};

/**
    Delete this uniform buffer.

    @method
*/
UniformBuffer.prototype.delete = function() {
    if (this.buffer) {
        this.gl.deleteBuffer(this.buffer);
        this.buffer = null;
    }
};

// Bind this uniform buffer to the given base.
UniformBuffer.prototype.bind = function(base) {
    this.gl.bindBufferBase(this.gl.UNIFORM_BUFFER, base, this.buffer);

    return this;
};

module.exports = UniformBuffer;

},{"./constants":2}],15:[function(require,module,exports){
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

// Classes to manage uniform value updates, including
// caching current values.

const UNIFORM_FUNC_NAME = {};
UNIFORM_FUNC_NAME[CONSTANTS.BOOL] = "uniform1i";
UNIFORM_FUNC_NAME[CONSTANTS.INT] = "uniform1i";
UNIFORM_FUNC_NAME[CONSTANTS.SAMPLER_2D] = "uniform1i";
UNIFORM_FUNC_NAME[CONSTANTS.INT_SAMPLER_2D] = "uniform1i";
UNIFORM_FUNC_NAME[CONSTANTS.UNSIGNED_INT_SAMPLER_2D] = "uniform1i";
UNIFORM_FUNC_NAME[CONSTANTS.SAMPLER_2D_SHADOW] = "uniform1i";
UNIFORM_FUNC_NAME[CONSTANTS.SAMPLER_2D_ARRAY] = "uniform1i";
UNIFORM_FUNC_NAME[CONSTANTS.INT_SAMPLER_2D_ARRAY] = "uniform1i";
UNIFORM_FUNC_NAME[CONSTANTS.UNSIGNED_INT_SAMPLER_2D_ARRAY] = "uniform1i";
UNIFORM_FUNC_NAME[CONSTANTS.SAMPLER_2D_ARRAY_SHADOW] = "uniform1i";
UNIFORM_FUNC_NAME[CONSTANTS.SAMPLER_CUBE] = "uniform1i";
UNIFORM_FUNC_NAME[CONSTANTS.INT_SAMPLER_CUBE] = "uniform1i";
UNIFORM_FUNC_NAME[CONSTANTS.UNSIGNED_INT_SAMPLER_CUBE] = "uniform1i";
UNIFORM_FUNC_NAME[CONSTANTS.SAMPLER_CUBE_SHADOW] = "uniform1i";
UNIFORM_FUNC_NAME[CONSTANTS.SAMPLER_3D] = "uniform1i";
UNIFORM_FUNC_NAME[CONSTANTS.INT_SAMPLER_3D] = "uniform1i";
UNIFORM_FUNC_NAME[CONSTANTS.UNSIGNED_INT_SAMPLER_3D] = "uniform1i";
UNIFORM_FUNC_NAME[CONSTANTS.UNSIGNED_INT] = "uniform1ui";
UNIFORM_FUNC_NAME[CONSTANTS.FLOAT] = "uniform1f";
UNIFORM_FUNC_NAME[CONSTANTS.FLOAT_VEC2] = "uniform2f";
UNIFORM_FUNC_NAME[CONSTANTS.FLOAT_VEC3] = "uniform3f";
UNIFORM_FUNC_NAME[CONSTANTS.FLOAT_VEC4] = "uniform4f";
UNIFORM_FUNC_NAME[CONSTANTS.INT_VEC2] = "uniform2i";
UNIFORM_FUNC_NAME[CONSTANTS.INT_VEC3] = "uniform3i";
UNIFORM_FUNC_NAME[CONSTANTS.INT_VEC4] = "uniform4i";
UNIFORM_FUNC_NAME[CONSTANTS.UNSIGNED_INT_VEC2] = "uniform2ui";
UNIFORM_FUNC_NAME[CONSTANTS.UNSIGNED_INT_VEC3] = "uniform3ui";
UNIFORM_FUNC_NAME[CONSTANTS.UNSIGNED_INT_VEC4] = "uniform4ui";
UNIFORM_FUNC_NAME[CONSTANTS.BOOL_VEC2] = "uniform2i";
UNIFORM_FUNC_NAME[CONSTANTS.BOOL_VEC3] = "uniform3i";
UNIFORM_FUNC_NAME[CONSTANTS.BOOL_VEC4] = "uniform4i";
UNIFORM_FUNC_NAME[CONSTANTS.FLOAT_MAT2] = "uniformMatrix2fv";
UNIFORM_FUNC_NAME[CONSTANTS.FLOAT_MAT3] = "uniformMatrix3fv";
UNIFORM_FUNC_NAME[CONSTANTS.FLOAT_MAT4] = "uniformMatrix4fv";
UNIFORM_FUNC_NAME[CONSTANTS.FLOAT_MAT2x3] = "uniformMatrix2x3fv";
UNIFORM_FUNC_NAME[CONSTANTS.FLOAT_MAT2x4] = "uniformMatrix2x4fv";
UNIFORM_FUNC_NAME[CONSTANTS.FLOAT_MAT3x2] = "uniformMatrix3x2fv";
UNIFORM_FUNC_NAME[CONSTANTS.FLOAT_MAT3x4] = "uniformMatrix3x4fv";
UNIFORM_FUNC_NAME[CONSTANTS.FLOAT_MAT4x2] = "uniformMatrix4x2fv";
UNIFORM_FUNC_NAME[CONSTANTS.FLOAT_MAT4x3] = "uniformMatrix4x3fv";

const UNIFORM_COMPONENT_COUNT = {};
UNIFORM_COMPONENT_COUNT[CONSTANTS.BOOL] = 1;
UNIFORM_COMPONENT_COUNT[CONSTANTS.INT] = 1;
UNIFORM_COMPONENT_COUNT[CONSTANTS.SAMPLER_2D] = 1;
UNIFORM_COMPONENT_COUNT[CONSTANTS.INT_SAMPLER_2D] = 1;
UNIFORM_COMPONENT_COUNT[CONSTANTS.UNSIGNED_INT_SAMPLER_2D] = 1;
UNIFORM_COMPONENT_COUNT[CONSTANTS.SAMPLER_2D_SHADOW] = 1;
UNIFORM_COMPONENT_COUNT[CONSTANTS.SAMPLER_2D_ARRAY] = 1;
UNIFORM_COMPONENT_COUNT[CONSTANTS.INT_SAMPLER_2D_ARRAY] = 1;
UNIFORM_COMPONENT_COUNT[CONSTANTS.UNSIGNED_INT_SAMPLER_2D_ARRAY] = 1;
UNIFORM_COMPONENT_COUNT[CONSTANTS.SAMPLER_2D_ARRAY_SHADOW] = 1;
UNIFORM_COMPONENT_COUNT[CONSTANTS.SAMPLER_CUBE] = 1;
UNIFORM_COMPONENT_COUNT[CONSTANTS.INT_SAMPLER_CUBE] = 1;
UNIFORM_COMPONENT_COUNT[CONSTANTS.UNSIGNED_INT_SAMPLER_CUBE] = 1;
UNIFORM_COMPONENT_COUNT[CONSTANTS.SAMPLER_CUBE_SHADOW] = 1;
UNIFORM_COMPONENT_COUNT[CONSTANTS.SAMPLER_3D] = 1;
UNIFORM_COMPONENT_COUNT[CONSTANTS.INT_SAMPLER_3D] = 1;
UNIFORM_COMPONENT_COUNT[CONSTANTS.UNSIGNED_INT_SAMPLER_3D] = 1;
UNIFORM_COMPONENT_COUNT[CONSTANTS.UNSIGNED_INT] = 1;
UNIFORM_COMPONENT_COUNT[CONSTANTS.FLOAT] = 1;
UNIFORM_COMPONENT_COUNT[CONSTANTS.FLOAT_VEC2] = 2;
UNIFORM_COMPONENT_COUNT[CONSTANTS.FLOAT_VEC3] = 3;
UNIFORM_COMPONENT_COUNT[CONSTANTS.FLOAT_VEC4] = 4;
UNIFORM_COMPONENT_COUNT[CONSTANTS.INT_VEC2] = 2;
UNIFORM_COMPONENT_COUNT[CONSTANTS.INT_VEC3] = 3;
UNIFORM_COMPONENT_COUNT[CONSTANTS.INT_VEC4] = 4;
UNIFORM_COMPONENT_COUNT[CONSTANTS.UNSIGNED_INT_VEC2] = 2;
UNIFORM_COMPONENT_COUNT[CONSTANTS.UNSIGNED_INT_VEC3] = 3;
UNIFORM_COMPONENT_COUNT[CONSTANTS.UNSIGNED_INT_VEC4] = 4;
UNIFORM_COMPONENT_COUNT[CONSTANTS.BOOL_VEC2] = 2;
UNIFORM_COMPONENT_COUNT[CONSTANTS.BOOL_VEC3] = 3;
UNIFORM_COMPONENT_COUNT[CONSTANTS.BOOL_VEC4] = 4;
UNIFORM_COMPONENT_COUNT[CONSTANTS.FLOAT_MAT2] = 4;
UNIFORM_COMPONENT_COUNT[CONSTANTS.FLOAT_MAT3] = 9;
UNIFORM_COMPONENT_COUNT[CONSTANTS.FLOAT_MAT4] = 16;
UNIFORM_COMPONENT_COUNT[CONSTANTS.FLOAT_MAT2x3] = 6;
UNIFORM_COMPONENT_COUNT[CONSTANTS.FLOAT_MAT2x4] = 8;
UNIFORM_COMPONENT_COUNT[CONSTANTS.FLOAT_MAT3x2] = 6;
UNIFORM_COMPONENT_COUNT[CONSTANTS.FLOAT_MAT3x4] = 12;
UNIFORM_COMPONENT_COUNT[CONSTANTS.FLOAT_MAT4x2] = 8;
UNIFORM_COMPONENT_COUNT[CONSTANTS.FLOAT_MAT4x3] = 12;

const UNIFORM_CACHE_CLASS = {};
UNIFORM_CACHE_CLASS[CONSTANTS.INT] = Int32Array;
UNIFORM_CACHE_CLASS[CONSTANTS.SAMPLER_2D] = Int32Array;
UNIFORM_CACHE_CLASS[CONSTANTS.INT_SAMPLER_2D] = Int32Array;
UNIFORM_CACHE_CLASS[CONSTANTS.UNSIGNED_INT_SAMPLER_2D] = Int32Array;
UNIFORM_CACHE_CLASS[CONSTANTS.SAMPLER_2D_SHADOW] = Int32Array;
UNIFORM_CACHE_CLASS[CONSTANTS.SAMPLER_2D_ARRAY] = Int32Array;
UNIFORM_CACHE_CLASS[CONSTANTS.INT_SAMPLER_2D_ARRAY] = Int32Array;
UNIFORM_CACHE_CLASS[CONSTANTS.UNSIGNED_INT_SAMPLER_2D_ARRAY] = Int32Array;
UNIFORM_CACHE_CLASS[CONSTANTS.SAMPLER_2D_ARRAY_SHADOW] = Int32Array;
UNIFORM_CACHE_CLASS[CONSTANTS.SAMPLER_CUBE] = Int32Array;
UNIFORM_CACHE_CLASS[CONSTANTS.INT_SAMPLER_CUBE] = Int32Array;
UNIFORM_CACHE_CLASS[CONSTANTS.UNSIGNED_INT_SAMPLER_CUBE] = Int32Array;
UNIFORM_CACHE_CLASS[CONSTANTS.SAMPLER_CUBE_SHADOW] = Int32Array;
UNIFORM_CACHE_CLASS[CONSTANTS.SAMPLER_3D] = Int32Array;
UNIFORM_CACHE_CLASS[CONSTANTS.INT_SAMPLER_3D] = Int32Array;
UNIFORM_CACHE_CLASS[CONSTANTS.UNSIGNED_INT_SAMPLER_3D] = Int32Array;
UNIFORM_CACHE_CLASS[CONSTANTS.UNSIGNED_INT] = Uint32Array;
UNIFORM_CACHE_CLASS[CONSTANTS.FLOAT] = Float32Array;
UNIFORM_CACHE_CLASS[CONSTANTS.FLOAT_VEC2] = Float32Array;
UNIFORM_CACHE_CLASS[CONSTANTS.FLOAT_VEC3] = Float32Array;
UNIFORM_CACHE_CLASS[CONSTANTS.FLOAT_VEC4] = Float32Array;
UNIFORM_CACHE_CLASS[CONSTANTS.INT_VEC2] = Int32Array;
UNIFORM_CACHE_CLASS[CONSTANTS.INT_VEC3] = Int32Array;
UNIFORM_CACHE_CLASS[CONSTANTS.INT_VEC4] = Int32Array;
UNIFORM_CACHE_CLASS[CONSTANTS.UNSIGNED_INT_VEC2] = Uint32Array;
UNIFORM_CACHE_CLASS[CONSTANTS.UNSIGNED_INT_VEC3] = Uint32Array;
UNIFORM_CACHE_CLASS[CONSTANTS.UNSIGNED_INT_VEC4] = Uint32Array;

function SingleComponentUniform(gl, handle, type) {
    this.gl = gl;
    this.handle = handle;
    this.glFuncName = UNIFORM_FUNC_NAME[type];
    this.cache = type === CONSTANTS.BOOL ? false : 0;
}

SingleComponentUniform.prototype.set = function(value) {
    if (this.cache !== value) {
        this.gl[this.glFuncName](this.handle, value);
        this.cache = value;
    }
};

function MultiNumericUniform(gl, handle, type, count) {
    this.gl = gl;
    this.handle = handle;
    this.glFuncName = UNIFORM_FUNC_NAME[type] + "v";
    this.count = count;
    this.cache = new UNIFORM_CACHE_CLASS[type](UNIFORM_COMPONENT_COUNT[type] * count);
}

MultiNumericUniform.prototype.set = function(value) {
    for (let i = 0, len = value.length; i < len; ++i) {
        if (this.cache[i] !== value[i]) {
            this.gl[this.glFuncName](this.handle, value);
            this.cache.set(value);
            return;
        }
    }
};

function MultiBoolUniform(gl, handle, type, count) {
    this.gl = gl;
    this.handle = handle;
    this.glFuncName = UNIFORM_FUNC_NAME[type] + "v";
    this.count = count;
    this.cache = new Array(UNIFORM_COMPONENT_COUNT[type] * count).fill(false);
}

MultiBoolUniform.prototype.set = function(value) {
    for (let i = 0, len = value.length; i < len; ++i) {
        if (this.cache[i] !== value[i]) {
            this.gl[this.glFuncName](this.handle, value);
            for (let j = i; j < len; j++) {
                this.cache[j] = value[j];
            }
            return;
        }
    }
};

function MatrixUniform(gl, handle, type, count) {
    this.gl = gl;
    this.handle = handle;
    this.glFuncName = UNIFORM_FUNC_NAME[type];
    this.count = count;
    this.cache = new Float32Array(UNIFORM_COMPONENT_COUNT[type] * count);
}

MatrixUniform.prototype.set = function(value) {
    for (let i = 0, len = value.length; i < len; ++i) {
        if (this.cache[i] !== value[i]) {
            this.gl[this.glFuncName](this.handle, false, value);
            this.cache.set(value);
            return;
        }
    }
};

module.exports.MatrixUniform = MatrixUniform;
module.exports.MultiBoolUniform = MultiBoolUniform;
module.exports.MultiNumericUniform = MultiNumericUniform;
module.exports.SingleComponentUniform = SingleComponentUniform;

},{"./constants":2}],16:[function(require,module,exports){
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
    Organizes vertex buffer and attribute state.

    @class
    @prop {WebGLRenderingContext} gl The WebGL context.
    @prop {WebGLVertexArrayObject} vertexArray Vertex array object.
    @prop {number} numElements Number of elements in the vertex array.
    @prop {boolean} indexed Whether this vertex array is set up for indexed drawing.
    @prop {GLenum} indexType Data type of the indices.
    @prop {boolean} instanced Whether this vertex array is set up for instanced drawing.
    @prop {number} numInstances Number of instances to draw with this vertex array.
    @prop {Object} appState Tracked GL state.
*/
function VertexArray(gl, appState) {
    this.gl = gl;
    this.vertexArray = gl.createVertexArray();
    this.appState = appState;
    this.numElements = 0;
    this.indexType = null;
    this.instancedBuffers = 0;
    this.indexed = false;
    this.numInstances = 0;
}

/**
    Bind an per-vertex attribute buffer to this vertex array.

    @method
    @param {number} attributeIndex The attribute location to bind to.
    @param {VertexBuffer} vertexBuffer The VertexBuffer to bind.
*/
VertexArray.prototype.vertexAttributeBuffer = function(attributeIndex, vertexBuffer) {
    this.attributeBuffer(attributeIndex, vertexBuffer, false, false, false);

    return this;
};

/**
    Bind an per-instance attribute buffer to this vertex array.

    @method
    @param {number} attributeIndex The attribute location to bind to.
    @param {VertexBuffer} vertexBuffer The VertexBuffer to bind.
*/
VertexArray.prototype.instanceAttributeBuffer = function(attributeIndex, vertexBuffer) {
    this.attributeBuffer(attributeIndex, vertexBuffer, true, false, false);

    return this;
};

/**
    Bind an per-vertex integer attribute buffer to this vertex array.
    Note that this refers to the attribute in the shader being an integer,
    not the data stored in the vertex buffer.

    @method
    @param {number} attributeIndex The attribute location to bind to.
    @param {VertexBuffer} vertexBuffer The VertexBuffer to bind.
*/
VertexArray.prototype.vertexIntegerAttributeBuffer = function(attributeIndex, vertexBuffer) {
    this.attributeBuffer(attributeIndex, vertexBuffer, false, true, false);

    return this;
};

/**
    Bind an per-instance integer attribute buffer to this vertex array.
    Note that this refers to the attribute in the shader being an integer,
    not the data stored in the vertex buffer.

    @method
    @param {number} attributeIndex The attribute location to bind to.
    @param {VertexBuffer} vertexBuffer The VertexBuffer to bind.
*/
VertexArray.prototype.instanceIntegerAttributeBuffer = function(attributeIndex, vertexBuffer) {
    this.attributeBuffer(attributeIndex, vertexBuffer, true, true, false);

    return this;
};

/**
    Bind an per-vertex normalized attribute buffer to this vertex array.
    Integer data in the vertex buffer will be normalized to [-1.0, 1.0] if
    signed, [0.0, 1.0] if unsigned.

    @method
    @param {number} attributeIndex The attribute location to bind to.
    @param {VertexBuffer} vertexBuffer The VertexBuffer to bind.
*/
VertexArray.prototype.vertexNormalizedAttributeBuffer = function(attributeIndex, vertexBuffer) {
    this.attributeBuffer(attributeIndex, vertexBuffer, false, false, true);

    return this;
};

/**
    Bind an per-instance normalized attribute buffer to this vertex array.
    Integer data in the vertex buffer will be normalized to [-1.0, 1.0] if
    signed, [0.0, 1.0] if unsigned.
    
    @method
    @param {number} attributeIndex The attribute location to bind to.
    @param {VertexBuffer} vertexBuffer The VertexBuffer to bind.
*/
VertexArray.prototype.instanceNormalizedAttributeBuffer = function(attributeIndex, vertexBuffer) {
    this.attributeBuffer(attributeIndex, vertexBuffer, true, false, true);

    return this;
};

/**
    Bind an index buffer to this vertex array.

    @method
    @param {VertexBuffer} vertexBuffer The VertexBuffer to bind.
*/
VertexArray.prototype.indexBuffer = function(vertexBuffer) {
    this.gl.bindVertexArray(this.vertexArray);
    this.gl.bindBuffer(vertexBuffer.binding, vertexBuffer.buffer);

    this.numElements = vertexBuffer.numItems * 3;
    this.indexType = vertexBuffer.type;
    this.indexed = true;

    this.gl.bindVertexArray(null);
    this.gl.bindBuffer(vertexBuffer.binding, null);

    return this;
};

/**
    Delete this vertex array.

    @method
*/
VertexArray.prototype.delete = function() {
    if (this.vertexArray) {
        this.gl.deleteVertexArray(this.vertexArray);
        this.vertexArray = null;
    }
    this.gl.bindVertexArray(null);

    return this;
};

// Bind this vertex array.
VertexArray.prototype.bind = function() {
    if (this.appState.vertexArray !== this) {
        this.gl.bindVertexArray(this.vertexArray);
        this.appState.vertexArray = this;
    }

    return this;
};

// Attach an attribute buffer
VertexArray.prototype.attributeBuffer = function(attributeIndex, vertexBuffer, instanced, integer, normalized) {
    this.gl.bindVertexArray(this.vertexArray);
    this.gl.bindBuffer(vertexBuffer.binding, vertexBuffer.buffer);

    let numColumns = vertexBuffer.numColumns;

    for (let i = 0; i < numColumns; ++i) {
        if (integer) {
            this.gl.vertexAttribIPointer(
                attributeIndex + i,
                vertexBuffer.itemSize,
                vertexBuffer.type,
                numColumns * vertexBuffer.itemSize * CONSTANTS.TYPE_SIZE[vertexBuffer.type],
                i * vertexBuffer.itemSize * CONSTANTS.TYPE_SIZE[vertexBuffer.type]);
        } else {
            this.gl.vertexAttribPointer(
                attributeIndex + i,
                vertexBuffer.itemSize,
                vertexBuffer.type,
                normalized,
                numColumns * vertexBuffer.itemSize * CONSTANTS.TYPE_SIZE[vertexBuffer.type],
                i * vertexBuffer.itemSize * CONSTANTS.TYPE_SIZE[vertexBuffer.type]);
        }

        if (instanced) {
            this.gl.vertexAttribDivisor(attributeIndex + i, 1);
        }

        this.gl.enableVertexAttribArray(attributeIndex + i);
    }

    this.instanced = this.instanced || instanced;

    if (instanced) {
        this.numInstances = vertexBuffer.numItems;
    } else {
        this.numElements = this.numElements || vertexBuffer.numItems;
    }

    this.gl.bindVertexArray(null);
    this.gl.bindBuffer(vertexBuffer.binding, null);

    return this;
};

module.exports = VertexArray;

},{"./constants":2}],17:[function(require,module,exports){
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
    @prop {WebGLBuffer} buffer Allocated buffer storage.
    @prop {GLEnum} type The type of data stored in the buffer.
    @prop {number} itemSize Number of array elements per vertex.
    @prop {number} numItems Number of vertices represented.
    @prop {GLEnum} usage The usage pattern of the buffer.
    @prop {boolean} indexArray Whether this is an index array.
    @prop {GLEnum} binding GL binding point (ARRAY_BUFFER or ELEMENT_ARRAY_BUFFER).
    @prop {Object} appState Tracked GL state.
*/
function VertexBuffer(gl, appState, type, itemSize, data, usage = gl.STATIC_DRAW, indexArray) {
    let numColumns;
    switch(type) {
        case CONSTANTS.FLOAT_MAT4:
        case CONSTANTS.FLOAT_MAT4x2:
        case CONSTANTS.FLOAT_MAT4x3:
            numColumns = 4;
            break;
        case CONSTANTS.FLOAT_MAT3:
        case CONSTANTS.FLOAT_MAT3x2:
        case CONSTANTS.FLOAT_MAT3x4:
            numColumns = 3;
            break;
        case CONSTANTS.FLOAT_MAT2:
        case CONSTANTS.FLOAT_MAT2x3:
        case CONSTANTS.FLOAT_MAT2x4:
            numColumns = 2;
            break;
        default:
            numColumns = 1;
    }

    switch(type) {
        case CONSTANTS.FLOAT_MAT4:
        case CONSTANTS.FLOAT_MAT3x4:
        case CONSTANTS.FLOAT_MAT2x4:
            itemSize = 4;
            type = CONSTANTS.FLOAT;
            break;
        case CONSTANTS.FLOAT_MAT3:
        case CONSTANTS.FLOAT_MAT4x3:
        case CONSTANTS.FLOAT_MAT2x3:
            itemSize = 3;
            type = CONSTANTS.FLOAT;
            break;
        case CONSTANTS.FLOAT_MAT2:
        case CONSTANTS.FLOAT_MAT3x2:
        case CONSTANTS.FLOAT_MAT4x2:
            itemSize = 2;
            type = CONSTANTS.FLOAT;
            break;
    }

    let dataLength;
    if (typeof data === "number") {
        dataLength = data;
        data *= CONSTANTS.TYPE_SIZE[type];
    } else {
        dataLength = data.length;
    }

    this.gl = gl;
    this.buffer = gl.createBuffer();
    this.appState = appState;
    this.type = type;
    this.itemSize = itemSize;
    this.numItems = dataLength / (itemSize * numColumns);
    this.numColumns = numColumns;
    this.usage = usage;
    this.indexArray = !!indexArray;
    this.binding = this.indexArray ? gl.ELEMENT_ARRAY_BUFFER : gl.ARRAY_BUFFER;

    gl.bindBuffer(this.binding, this.buffer);
    gl.bufferData(this.binding, data, this.usage);
    gl.bindBuffer(this.binding, null);
}

/**
    Update data in this buffer. NOTE: the data must fit
    the originally-allocated buffer!

    @method
    @param {VertexBufferView} data Data to store in the buffer.
*/
VertexBuffer.prototype.data = function(data) {
    // Don't want to update vertex array bindings
    let currentVertexArray = this.appState.vertexArray;
    if (currentVertexArray) {
        this.gl.bindVertexArray(null);
    }

    this.gl.bindBuffer(this.binding, this.buffer);
    this.gl.bufferSubData(this.binding, 0, data);
    this.gl.bindBuffer(this.binding, null);

    if (currentVertexArray) {
        this.gl.bindVertexArray(currentVertexArray.vertexArray);
    }

    return this;
};

/**
    Delete this array buffer.

    @method
*/
VertexBuffer.prototype.delete = function() {
    if (this.buffer) {
        this.gl.deleteBuffer(this.buffer);
        this.buffer = null;
    }
};

module.exports = VertexBuffer;

},{"./constants":2}]},{},[6])(6)
});