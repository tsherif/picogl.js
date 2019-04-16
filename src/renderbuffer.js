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

/**
    Offscreen drawing attachment.

    @class
    @prop {WebGLRenderingContext} gl The WebGL context.
    @prop {WebGLRenderbuffer} renderbuffer Handle to the renderbuffer.
    @prop {number} width Renderbuffer width.
    @prop {number} height Renderbuffer height.
    @prop {GLEnum} internalFormat Internal arrangement of the renderbuffer data.
    @prop {number} samples Number of MSAA samples.
*/
export class Renderbuffer {
    constructor(gl, width, height, internalFormat, samples = 0) {
        this.gl = gl;
        this.renderbuffer = null;
        this.width = width;
        this.height = height;
        this.internalFormat = internalFormat;
        this.samples = samples;
        this.restore();
    }

    /**
        Restore renderbuffer after context loss.

        @method
        @return {Renderbuffer} The Renderbuffer object.
    */
    restore() {
        this.renderbuffer = this.gl.createRenderbuffer();
        this.resize(this.width, this.height);

        return this;
    }

    /**
        Resize the renderbuffer.

        @method
        @param {number} width New width of the renderbuffer.
        @param {number} height New height of the renderbuffer.
        @return {Renderbuffer} The Renderbuffer object.
    */
    resize(width, height) {
        this.width = width;
        this.height = height;
        this.gl.bindRenderbuffer(GL.RENDERBUFFER, this.renderbuffer);
        this.gl.renderbufferStorageMultisample(GL.RENDERBUFFER, this.samples, this.internalFormat, this.width, this.height);
        this.gl.bindRenderbuffer(GL.RENDERBUFFER, null);
        
        return this;
    }

    /**
        Delete this renderbuffer.

        @method
        @return {Renderbuffer} The Renderbuffer object.
    */
    delete() {
        this.gl.deleteRenderbuffer(this.renderbuffer);
        this.renderbuffer = null;

        return this;
    }   
}
