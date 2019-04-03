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

let webglInfoInitialized = false;

import { GL, WEBGL_INFO } from "./constants";
import { App } from "./app";

/**
    Global PicoGL module. For convenience, all WebGL enums are stored
    as properties of PicoGL (e.g. PicoGL.FLOAT, PicoGL.ONE_MINUS_SRC_ALPHA).

    @namespace PicoGL
*/
export const PicoGL = Object.assign({ 
    version: "%%VERSION%%",

    WEBGL_INFO,

    /**
        Create a PicoGL app. The app is the primary entry point to PicoGL. It stores
        the canvas, the WebGL context and all WebGL state.

        @function PicoGL.createApp
        @param {DOMElement} canvas The canvas on which to create the WebGL context.
        @param {Object} [contextAttributes] Context attributes to pass when calling getContext().
        @return {App} New App object.
    */
    createApp(canvas, contextAttributes) {
        let gl = canvas.getContext("webgl2", contextAttributes);
        if (!webglInfoInitialized) {
            WEBGL_INFO.MAX_TEXTURE_UNITS = gl.getParameter(GL.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
            WEBGL_INFO.MAX_UNIFORM_BUFFERS = gl.getParameter(GL.MAX_UNIFORM_BUFFER_BINDINGS);
            WEBGL_INFO.MAX_UNIFORMS = Math.min(
                gl.getParameter(GL.MAX_VERTEX_UNIFORM_VECTORS),
                gl.getParameter(GL.MAX_FRAGMENT_UNIFORM_VECTORS)
            );
            WEBGL_INFO.SAMPLES = gl.getParameter(GL.SAMPLES);
            webglInfoInitialized = true;      
        }
        return new App(gl, canvas);
    }
}, GL);
