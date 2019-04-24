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

import { GL, WEBGL_INFO } from "./constants.js";
import { App } from "./app.js";

let webglInfoInitialized = false;

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
            WEBGL_INFO.VENDOR = "(Unknown)";
            WEBGL_INFO.RENDERER = "(Unknown)";

            // Extensions
            WEBGL_INFO.FLOAT_RENDER_TARGETS = Boolean(gl.getExtension("EXT_color_buffer_float"));
            WEBGL_INFO.LINEAR_FLOAT_TEXTURES = Boolean(gl.getExtension("OES_texture_float_linear"));
            WEBGL_INFO.S3TC_TEXTURES = Boolean(gl.getExtension("WEBGL_compressed_texture_s3tc"));
            WEBGL_INFO.S3TC_SRGB_TEXTURES = Boolean(gl.getExtension("WEBGL_compressed_texture_s3tc_srgb"));
            WEBGL_INFO.ETC_TEXTURES = Boolean(gl.getExtension("WEBGL_compressed_texture_etc"));
            WEBGL_INFO.ASTC_TEXTURES = Boolean(gl.getExtension("WEBGL_compressed_texture_astc"));
            WEBGL_INFO.PVRTC_TEXTURES = Boolean(gl.getExtension("WEBGL_compressed_texture_pvrtc"));
            WEBGL_INFO.LOSE_CONTEXT = Boolean(gl.getExtension("WEBGL_lose_context"));
            WEBGL_INFO.DEBUG_SHADERS = Boolean(gl.getExtension("WEBGL_debug_shaders"));
            WEBGL_INFO.GPU_TIMER = Boolean(gl.getExtension("EXT_disjoint_timer_query_webgl2") || gl.getExtension("EXT_disjoint_timer_query"));
            
            WEBGL_INFO.TEXTURE_ANISOTROPY = Boolean(gl.getExtension("EXT_texture_filter_anisotropic"));
            WEBGL_INFO.MAX_TEXTURE_ANISOTROPY = WEBGL_INFO.TEXTURE_ANISOTROPY ? gl.getParameter(GL.MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 1;

            WEBGL_INFO.DEBUG_RENDERER_INFO = Boolean(gl.getExtension("WEBGL_debug_renderer_info"));
            if (WEBGL_INFO.DEBUG_RENDERER_INFO) {
                WEBGL_INFO.VENDOR = gl.getParameter(GL.UNMASKED_VENDOR_WEBGL);
                WEBGL_INFO.RENDERER = gl.getParameter(GL.UNMASKED_RENDERER_WEBGL);
            }

            // Draft extensions
            WEBGL_INFO.PARALLEL_SHADER_COMPILE = Boolean(gl.getExtension("KHR_parallel_shader_compile"));
            WEBGL_INFO.MULTI_DRAW_INSTANCED = Boolean(gl.getExtension("WEBGL_multi_draw_instanced"));

            webglInfoInitialized = true;
        }
        return new App(gl, canvas);
    }
}, GL);
