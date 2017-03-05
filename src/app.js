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

    NanoGL.App = function App(canvas, contextAttributes) {
        this.canvas = canvas;
        this.gl = canvas.getContext("webgl", contextAttributes) || canvas.getContext("experimental-webgl", contextAttributes);
        this.currentDrawCalls = null;

        this.currentState = {
            program: null
        };

        this.clearBits = this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT;
        
        this.gl.viewport(0, 0, canvas.width, canvas.height);

        this.gl.getExtension("WEBGL_depth_texture");
        this.gl.getExtension("OES_texture_float");
        this.gl.getExtension("OES_texture_float_linear");
        
        this.drawBuffers = this.gl.getExtension("WEBGL_draw_buffers");
        this.maxDrawBuffers = this.gl.getParameter(this.drawBuffers.MAX_DRAW_BUFFERS_WEBGL);
    };

    NanoGL.App.prototype.clearMask = function(mask) {
        this.clearBits = mask;

        return this;
    };

    NanoGL.App.prototype.clear = function() {
        this.gl.clear(this.clearBits);

        return this;
    };

    NanoGL.App.prototype.drawCalls = function(drawCallList) {
        this.currentDrawCalls = drawCallList;

        return this;
    };

    NanoGL.App.prototype.framebuffer = function(framebuffer) {
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, framebuffer.framebuffer);

        return this;
    };

    NanoGL.App.prototype.defaultFramebuffer = function() {
        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);

        return this;
    };

    NanoGL.App.prototype.clearColor = function(r, g, b, a) {
        this.gl.clearColor(r, g, b, a);

        return this;
    };

    NanoGL.App.prototype.depthRange = function(near, far) {
        this.gl.depthRange(near, far);

        return this;
    };

    NanoGL.App.prototype.depthTest = function() {
        this.gl.enable(this.gl.DEPTH_TEST);

        return this;
    };

    NanoGL.App.prototype.noDepthTest = function() {
        this.gl.disable(this.gl.DEPTH_TEST);

        return this;
    };

    NanoGL.App.prototype.depthMask = function() {
        this.gl.depthMask(true);

        return this;
    };

    NanoGL.App.prototype.noDepthMask = function() {
        this.gl.depthMask(false);

        return this;
    };

    NanoGL.App.prototype.blend = function() {
        this.gl.enable(this.gl.BLEND);

        return this;
    };

    NanoGL.App.prototype.noBlend = function() {
        this.gl.disable(this.gl.BLEND);

        return this;
    };

    NanoGL.App.prototype.depthFunc = function(func) {
        this.gl.depthFunc(func);

        return this;
    };

    NanoGL.App.prototype.blendFunc = function(src, dest) {
        this.gl.blendFunc(src, dest);

        return this;
    };

    NanoGL.App.prototype.blendFuncSeparate = function(csrc, cdest, asrc, adest) {
        this.gl.blendFuncSeparate(csrc, cdest, asrc, adest);

        return this;
    };

    NanoGL.App.prototype.cullBackfaces = function() {
        this.gl.enable(this.gl.CULL_FACE);

        return this;
    };

    NanoGL.App.prototype.drawBackfaces = function() {
        this.gl.disable(this.gl.CULL_FACE);

        return this;
    };

    NanoGL.App.prototype.readPixel = function(x, y, outVec4) {
        this.gl.readPixels(x, y, 1, 1, this.gl.RGBA, this.gl.UNSIGNED_BYTE, outVec4);

        return this;
    };

    NanoGL.App.prototype.createProgram = function(vsSource, fsSource) {
        return new NanoGL.Program(this.gl, vsSource, fsSource);
    };

    NanoGL.App.prototype.createArrayBuffer = function(type, itemSize, data) {
        return new NanoGL.ArrayBuffer(this.gl, type, itemSize, data);
    };

    NanoGL.App.prototype.createIndexBuffer = function(type, itemSize, data) {
        return new NanoGL.ArrayBuffer(this.gl, type, itemSize, data, true);
    };

    NanoGL.App.prototype.createTexture = function(image, options) {
        return new NanoGL.Texture(this.gl, image, options);
    };

    NanoGL.App.prototype.createCubemap = function(options) {
        return new NanoGL.Cubemap(this.gl, options);
    };

    NanoGL.App.prototype.createFramebuffer = function(width, height, numColorTextures, colorTargetType) {
        return new NanoGL.Framebuffer(this.gl, this.drawBuffers, width, height, numColorTextures, colorTargetType);
    };

    NanoGL.App.prototype.createDrawCall = function(program, primitive) {
        return new NanoGL.DrawCall(this.gl, program, primitive);
    };

    NanoGL.App.prototype.draw = function() {
        for (var i = 0, len = this.currentDrawCalls.length; i < len; i++) {
            this.currentDrawCalls[i].draw(this.currentState);
        }

        return this;
    };

})();
