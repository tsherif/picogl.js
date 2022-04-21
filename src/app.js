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

import { GL, WEBGL_INFO, DUMMY_OBJECT } from "./constants.js";
import { Cubemap } from "./cubemap.js";
import { DrawCall } from "./draw-call.js";
import { Framebuffer } from "./framebuffer.js";
import { Renderbuffer } from "./renderbuffer.js";
import { Program } from "./program.js";
import { Shader } from "./shader.js";
import { Texture } from "./texture.js";
import { Timer } from "./timer.js";
import { TransformFeedback } from "./transform-feedback.js";
import { UniformBuffer } from "./uniform-buffer.js";
import { VertexArray } from "./vertex-array.js";
import { VertexBuffer } from "./vertex-buffer.js";
import { Query } from "./query.js";

/**
    Primary entry point to PicoGL. An app will store all parts of the WebGL
    state.

    @class App
    @param {WebGLRenderingContext} gl
    @prop {HTMLElement} canvas The canvas on which this app drawing.
    @prop {WebGLRenderingContext} gl The WebGL context.
    @prop {number} width The width of the drawing surface.
    @prop {number} height The height of the drawing surface.
    @prop {Object} state Tracked GL state.
    @prop {Object} state.drawFramebufferBinding=GL.DRAW_FRAMEBUFFER Binding point to bind framebuffers to for draw. Should be set before any binding occurs. Should only have values GL.DRAW_FRAMEBUFFER or GL.FRAMEBUFFER (the latter with state.readFramebufferBinding set to the same).
    @prop {Object} state.readFramebufferBinding=GL.READ_FRAMEBUFFER  Binding point to bind framebuffers to for read. Should be set before any binding occurs. Should only have values GL.READ_FRAMEBUFFER or GL.FRAMEBUFFER (the latter with state.drawFramebufferBinding set to the same).
    @prop {GLenum} clearBits Current clear mask to use with clear().
*/
export class App {

    constructor(gl) {
        this.gl = gl;
        this.canvas = gl.canvas;
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
            textures: new Array(WEBGL_INFO.MAX_TEXTURE_UNITS),
            uniformBuffers: new Array(WEBGL_INFO.MAX_UNIFORM_BUFFERS),
            freeUniformBufferBases: [],
            framebuffers: {},
            drawFramebufferBinding: GL.DRAW_FRAMEBUFFER,
            readFramebufferBinding: GL.READ_FRAMEBUFFER,
            extensions: {}
        };

        this.clearBits = this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT| this.gl.STENCIL_BUFFER_BIT;

        this.cpuTime = 0;
        this.gpuTime = 0;

        this.viewport(0, 0, this.width, this.height);

        this.contextLostExt = null;
        this.contextLostListener = null;
        this.contextRestoredListener = null;
        this.contextRestoredHandler = null;

        this.initExtensions();
    }

    /**
        Simulate context loss.

        @method
        @return {App} The App object.
    */
    loseContext() {
        if (this.contextLostExt) {
            this.contextLostExt.loseContext();
        }

        return this;
    }

    /**
        Simulate context restoration.

        @method
        @return {App} The App object.
    */
    restoreContext() {
        if (this.contextLostExt) {
            this.contextLostExt.restoreContext();
        }

        return this;
    }

    /**
        Set function to handle context restoration after loss.

        @method
        @param {function} fn Context restored handler.
        @return {App} The App object.
    */
    onContextRestored(fn) {
        this.contextRestoredHandler = fn;

        this.initContextListeners();

        return this;
    }

    /**
        Enable WebGL capability (e.g. depth testing, blending, etc.).

        @method
        @param {GLenum} cap Capability to enable.
        @return {App} The App object.
    */
    enable(cap) {
        this.gl.enable(cap);

        return this;
    }

    /**
        Disable WebGL capability (e.g. depth testing, blending, etc.).

        @method
        @param {GLenum} cap Capability to disable.
        @return {App} The App object.
    */
    disable(cap) {
        this.gl.disable(cap);

        return this;
    }

    /**
        Set the color mask to selectively enable or disable particular
        color channels while rendering.

        @method
        @param {boolean} r Red channel.
        @param {boolean} g Green channel.
        @param {boolean} b Blue channel.
        @param {boolean} a Alpha channel.
        @return {App} The App object.
    */
    colorMask(r, g, b, a) {
        this.gl.colorMask(r, g, b, a);

        return this;
    }

    /**
        Set the clear color.

        @method
        @param {number} r Red channel.
        @param {number} g Green channel.
        @param {number} b Blue channel.
        @param {number} a Alpha channel.
        @return {App} The App object.
    */
    clearColor(r, g, b, a) {
        this.gl.clearColor(r, g, b, a);

        return this;
    }

    /**
        Set the clear mask bits to use when calling clear().
        E.g. app.clearMask(PicoGL.COLOR_BUFFER_BIT).

        @method
        @param {GLenum} mask Bit mask of buffers to clear.
        @return {App} The App object.
    */
    clearMask(mask) {
        this.clearBits = mask;

        return this;
    }

    /**
        Clear the canvas

        @method
        @return {App} The App object.
    */
    clear() {
        this.gl.clear(this.clearBits);

        return this;
    }

    /**
        Bind a draw framebuffer to the WebGL context.

        @method
        @param {Framebuffer} framebuffer The Framebuffer object to bind.
        @see Framebuffer
        @return {App} The App object.
    */
    drawFramebuffer(framebuffer) {
        framebuffer.bindForDraw();

        return this;
    }

    /**
        Bind a read framebuffer to the WebGL context.

        @method
        @param {Framebuffer} framebuffer The Framebuffer object to bind.
        @see Framebuffer
        @return {App} The App object.
    */
    readFramebuffer(framebuffer) {
        framebuffer.bindForRead();

        return this;
    }

    /**
        Switch back to the default framebuffer for drawing (i.e. draw to the screen).
        Note that this method resets the viewport to match the default framebuffer.

        @method
        @return {App} The App object.
    */
    defaultDrawFramebuffer() {
        let binding = this.state.drawFramebufferBinding;
        if (this.state.framebuffers[binding] !== null) {
            this.gl.bindFramebuffer(binding, null);
            this.state.framebuffers[binding] = null;
        }

        return this;
    }

    /**
        Switch back to the default framebuffer for reading (i.e. read from the screen).

        @method
        @return {App} The App object.
    */
    defaultReadFramebuffer() {
        let binding = this.state.readFramebufferBinding;
        if (this.state.framebuffers[binding] !== null) {
            this.gl.bindFramebuffer(binding, null);
            this.state.framebuffers[binding] = null;
        }

        return this;
    }

    /**
        Copy data from framebuffer attached to READ_FRAMEBUFFER to framebuffer attached to DRAW_FRAMEBUFFER.

        @method
        @param {GLenum} mask Write mask (e.g. PicoGL.COLOR_BUFFER_BIT).
        @param {Object} [options] Blit options.
        @param {number} [options.srcStartX=0] Source start x coordinate.
        @param {number} [options.srcStartY=0] Source start y coordinate.
        @param {number} [options.srcEndX=Width of the read framebuffer] Source end x coordinate.
        @param {number} [options.srcEndY=Height of the read framebuffer] Source end y coordinate.
        @param {number} [options.dstStartX=0] Destination start x coordinate.
        @param {number} [options.dstStartY=0] Destination start y coordinate.
        @param {number} [options.dstEndX=Width of the draw framebuffer] Destination end x coordinate.
        @param {number} [options.dstEndY=Height of the draw framebuffer] Destination end y coordinate.
        @param {number} [options.filter=NEAREST] Sampling filter.
        @return {App} The App object.
    */
    blitFramebuffer(mask, options = DUMMY_OBJECT) {
        let readBinding = this.state.readFramebufferBinding;
        let drawBinding = this.state.drawFramebufferBinding;
        let readFramebuffer = this.state.framebuffers[readBinding];
        let drawFramebuffer = this.state.framebuffers[drawBinding];
        let defaultReadWidth = readFramebuffer ? readFramebuffer.width : this.width;
        let defaultReadHeight = readFramebuffer ? readFramebuffer.height : this.height;
        let defaultDrawWidth = drawFramebuffer ? drawFramebuffer.width : this.width;
        let defaultDrawHeight = drawFramebuffer ? drawFramebuffer.height : this.height;

        let {
            srcStartX = 0,
            srcStartY = 0,
            srcEndX = defaultReadWidth,
            srcEndY = defaultReadHeight,
            dstStartX = 0,
            dstStartY = 0,
            dstEndX = defaultDrawWidth,
            dstEndY = defaultDrawHeight,
            filter = GL.NEAREST
        } = options;

        this.gl.blitFramebuffer(srcStartX, srcStartY, srcEndX, srcEndY, dstStartX, dstStartY, dstEndX, dstEndY, mask, filter);

        return this;
    }

    /**
        Set the depth range.

        @method
        @param {number} near Minimum depth value.
        @param {number} far Maximum depth value.
        @return {App} The App object.
    */
    depthRange(near, far) {
        this.gl.depthRange(near, far);

        return this;
    }

    /**
        Enable or disable writing to the depth buffer.

        @method
        @param {Boolean} mask The depth mask.
        @return {App} The App object.
    */
    depthMask(mask) {
        this.gl.depthMask(mask);

        return this;
    }

    /**
        Set the depth test function. E.g. app.depthFunc(PicoGL.LEQUAL).

        @method
        @param {GLenum} func The depth testing function to use.
        @return {App} The App object.
    */
    depthFunc(func) {
        this.gl.depthFunc(func);

        return this;
    }

    /**
        Set the blend function. E.g. app.blendFunc(PicoGL.ONE, PicoGL.ONE_MINUS_SRC_ALPHA).

        @method
        @param {GLenum} src The source blending weight.
        @param {GLenum} dest The destination blending weight.
        @return {App} The App object.
    */
    blendFunc(src, dest) {
        this.gl.blendFunc(src, dest);

        return this;
    }

    /**
        Set the blend function, with separate weighting for color and alpha channels.
        E.g. app.blendFuncSeparate(PicoGL.ONE, PicoGL.ONE_MINUS_SRC_ALPHA, PicoGL.ONE, PicoGL.ONE).

        @method
        @param {GLenum} csrc The source blending weight for the RGB channels.
        @param {GLenum} cdest The destination blending weight for the RGB channels.
        @param {GLenum} asrc The source blending weight for the alpha channel.
        @param {GLenum} adest The destination blending weight for the alpha channel.
        @return {App} The App object.
    */
    blendFuncSeparate(csrc, cdest, asrc, adest) {
        this.gl.blendFuncSeparate(csrc, cdest, asrc, adest);

        return this;
    }

    /**
        Set the blend equation. E.g. app.blendEquation(PicoGL.MIN).

        @method
        @param {GLenum} mode The operation to use in combining source and destination channels.
        @return {App} The App object.
    */
    blendEquation(mode) {
        this.gl.blendEquation(mode);

        return this;
    }

    /**
        Set the bitmask to use for tested stencil values.
        E.g. app.stencilMask(0xFF).
        NOTE: Only works if { stencil: true } passed as a
        context attribute when creating the App!

        @method
        @param {number} mask The mask value.
        @return {App} The App object.

    */
    stencilMask(mask) {
        this.gl.stencilMask(mask);

        return this;
    }

    /**
        Set the bitmask to use for tested stencil values for a particular face orientation.
        E.g. app.stencilMaskSeparate(PicoGL.FRONT, 0xFF).
        NOTE: Only works if { stencil: true } passed as a
        context attribute when creating the App!

        @method
        @param {GLenum} face The face orientation to apply the mask to.
        @param {number} mask The mask value.
        @return {App} The App object.
    */
    stencilMaskSeparate(face, mask) {
        this.gl.stencilMaskSeparate(face, mask);

        return this;
    }

    /**
        Set the stencil function and reference value.
        E.g. app.stencilFunc(PicoGL.EQUAL, 1, 0xFF).
        NOTE: Only works if { stencil: true } passed as a
        context attribute when creating the App!

        @method
        @param {GLenum} func The testing function.
        @param {number} ref The reference value.
        @param {GLenum} mask The bitmask to use against tested values before applying
            the stencil function.
        @return {App} The App object.
    */
    stencilFunc(func, ref, mask) {
        this.gl.stencilFunc(func, ref, mask);

        return this;
    }

    /**
        Set the stencil function and reference value for a particular face orientation.
        E.g. app.stencilFuncSeparate(PicoGL.FRONT, PicoGL.EQUAL, 1, 0xFF).
        NOTE: Only works if { stencil: true } passed as a
        context attribute when creating the App!

        @method
        @param {GLenum} face The face orientation to apply the function to.
        @param {GLenum} func The testing function.
        @param {number} ref The reference value.
        @param {GLenum} mask The bitmask to use against tested values before applying
            the stencil function.
        @return {App} The App object.
    */
    stencilFuncSeparate(face, func, ref, mask) {
        this.gl.stencilFuncSeparate(face, func, ref, mask);

        return this;
    }

    /**
        Set the operations for updating stencil buffer values.
        E.g. app.stencilOp(PicoGL.KEEP, PicoGL.KEEP, PicoGL.REPLACE).
        NOTE: Only works if { stencil: true } passed as a
        context attribute when creating the App!

        @method
        @param {GLenum} stencilFail Operation to apply if the stencil test fails.
        @param {GLenum} depthFail Operation to apply if the depth test fails.
        @param {GLenum} pass Operation to apply if the both the depth and stencil tests pass.
        @return {App} The App object.
    */
    stencilOp(stencilFail, depthFail, pass) {
        this.gl.stencilOp(stencilFail, depthFail, pass);

        return this;
    }

    /**
        Set the operations for updating stencil buffer values for a particular face orientation.
        E.g. app.stencilOpSeparate(PicoGL.FRONT, PicoGL.KEEP, PicoGL.KEEP, PicoGL.REPLACE).
        NOTE: Only works if { stencil: true } passed as a
        context attribute when creating the App!

        @method
        @param {GLenum} face The face orientation to apply the operations to.
        @param {GLenum} stencilFail Operation to apply if the stencil test fails.
        @param {GLenum} depthFail Operation to apply if the depth test fails.
        @param {GLenum} pass Operation to apply if the both the depth and stencil tests pass.
        @return {App} The App object.
    */
    stencilOpSeparate(face, stencilFail, depthFail, pass) {
        this.gl.stencilOpSeparate(face, stencilFail, depthFail, pass);

        return this;
    }

    /**
        Define the scissor box.

        @method
        @param {Number} x Horizontal position of the scissor box.
        @param {Number} y Vertical position of the scissor box.
        @param {Number} width Width of the scissor box.
        @param {Number} height Height of the scissor box.
        @return {App} The App object.
    */
    scissor(x, y, width, height) {
        this.gl.scissor(x, y, width, height);

        return this;
    }

    /**
        Set the scale and units used.

        @method
        @param {Number} factor Scale factor used to create a variable depth offset for each polygon.
        @param {Number} units Constant depth offset.
        @return {App} The App object.
    */
    polygonOffset(factor, units) {
        this.gl.polygonOffset(factor, units);

        return this;
    }

    /**
        Read a pixel's color value from the currently-bound framebuffer.

        @method
        @param {number} x The x coordinate of the pixel.
        @param {number} y The y coordinate of the pixel.
        @param {ArrayBufferView} outColor Typed array to store the pixel's color.
        @param {object} [options] Options.
        @param {GLenum} [options.type=UNSIGNED_BYTE] Type of data stored in the read framebuffer.
        @param {GLenum} [options.format=RGBA] Read framebuffer data format.
        @return {App} The App object.
    */
    readPixel(x, y, outColor, options = DUMMY_OBJECT) {
        let {
            format = GL.RGBA,
            type = GL.UNSIGNED_BYTE
        } = options;

        this.gl.readPixels(x, y, 1, 1, format, type, outColor);

        return this;
    }

    /**
        Set the viewport.

        @method
        @param {number} x Left bound of the viewport rectangle.
        @param {number} y Lower bound of the viewport rectangle.
        @param {number} width Width of the viewport rectangle.
        @param {number} height Height of the viewport rectangle.
        @return {App} The App object.
    */
    viewport(x, y, width, height) {

        if (this.viewportWidth !== width || this.viewportHeight !== height ||
                this.viewportX !== x || this.viewportY !== y) {
            this.viewportX = x;
            this.viewportY = y;
            this.viewportWidth = width;
            this.viewportHeight = height;
            this.gl.viewport(x, y, this.viewportWidth, this.viewportHeight);
        }

        return this;
    }

    /**
        Set the viewport to the full canvas.

        @method
        @return {App} The App object.
    */
    defaultViewport() {
        this.viewport(0, 0, this.width, this.height);

        return this;
    }

    /**
        Resize the drawing surface.

        @method
        @param {number} width The new canvas width.
        @param {number} height The new canvas height.
        @return {App} The App object.
    */
    resize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;

        this.width = this.gl.drawingBufferWidth;
        this.height = this.gl.drawingBufferHeight;
        this.viewport(0, 0, this.width, this.height);

        return this;
    }

    /**
        Create a program synchronously. It is highly recommended to use <b>createPrograms</b> instead as
            that method will compile shaders in parallel where possible.
        @method
        @param {Shader|string} vertexShader Vertex shader object or source code.
        @param {Shader|string} fragmentShader Fragment shader object or source code.
        @param {Object} [options] Texture options.
        @param {Object} [options.attributeLocations] Map of attribute names to locations (useful when using GLSL 1).
        @param {Array} [options.transformFeedbackVaryings] Array of varying names used for transform feedback output.
        @param {GLenum} [options.transformFeedbackMode] Capture mode of the transform feedback. (Default: PicoGL.SEPARATE_ATTRIBS).
        @return {Program} New Program object.
    */
    createProgram(vsSource, fsSource, opts = {}) {
        let {transformFeedbackVaryings, attributeLocations, transformFeedbackMode} = opts;

        return new Program(this.gl, this.state, vsSource, fsSource, transformFeedbackVaryings, attributeLocations, transformFeedbackMode)
            .link()
            .checkLinkage();
    }

    /**
        Create several programs. Preferred method for program creation as it will compile shaders
        in parallel where possible.

        @method
        @param {...Array} sources Variable number of 2 or 3 element arrays, each containing:
            <ul>
                <li> (Shader|string) Vertex shader object or source code.
                <li> (Shader|string) Fragment shader object or source code.
                <li> (Object - optional) Optional program parameters.
                <ul>
                    <li>(Object - optional) <strong><code>attributeLocations</code></strong> Map of attribute names to locations (useful when using GLSL 1).
                    <li>(Array - optional) <strong><code>transformFeedbackVaryings</code></strong> Array of varying names used for transform feedback output.
                    <li>(GLenum - optional) <strong><code>transformFeedbackMode</code></strong> Capture mode of the transform feedback. (Default: PicoGL.SEPARATE_ATTRIBS).
                </ul>
                </ul>
            </ul>
        @return {Promise<Program[]>} Promise that will resolve to an array of Programs when compilation and
            linking are complete for all programs.
    */
    createPrograms(...sources) {
        return new Promise((resolve, reject) => {
            let numPrograms = sources.length;
            let programs = new Array(numPrograms);
            let pendingPrograms = new Array(numPrograms);
            let numPending = numPrograms;

            for (let i = 0; i < numPrograms; ++i) {
                let source = sources[i];
                let vsSource = source[0];
                let fsSource = source[1];
                let opts = source[2] || {};
                let {transformFeedbackVaryings, attributeLocations, transformFeedbackMode} = opts;
                programs[i] = new Program(this.gl, this.state, vsSource, fsSource, transformFeedbackVaryings, attributeLocations, transformFeedbackMode);
                pendingPrograms[i] = programs[i];
            }

            for (let i = 0; i < numPrograms; ++i) {
                programs[i].link();
            }

            let poll = () => {
                let linked = 0;
                for (let i = 0; i < numPending; ++i) {
                    if (pendingPrograms[i].checkCompletion()) {
                        pendingPrograms[i].checkLinkage();
                        if (pendingPrograms[i].linked) {
                            ++linked;
                        } else {
                            reject(new Error("Program linkage failed"));
                            return;
                        }
                    } else {
                        pendingPrograms[i - linked] = pendingPrograms[i];
                    }
                }

                numPending -= linked;

                if (numPending === 0) {
                    resolve(programs);
                } else {
                    requestAnimationFrame(poll);
                }
            };

            poll();
        });
    }

    /**
        Restore several programs after a context loss. Will do so in parallel where available.

        @method
        @param {...Program} sources Variable number of programs to restore.

        @return {Promise<void>} Promise that will resolve once all programs have been restored.
    */
    restorePrograms(...programs) {
        return new Promise((resolve, reject) => {
            let numPrograms = programs.length;
            let pendingPrograms = programs.slice();
            let numPending = numPrograms;

            for (let i = 0; i < numPrograms; ++i) {
                programs[i].initialize();
            }

            for (let i = 0; i < numPrograms; ++i) {
                programs[i].link();
            }

            for (let i = 0; i < numPrograms; ++i) {
                programs[i].checkCompletion();
            }

            let poll = () => {
                let linked = 0;
                for (let i = 0; i < numPending; ++i) {
                    if (pendingPrograms[i].checkCompletion()) {
                        pendingPrograms[i].checkLinkage();
                        if (pendingPrograms[i].linked) {
                            ++linked;
                        } else {
                            reject(new Error("Program linkage failed"));
                            return;
                        }
                    } else {
                        pendingPrograms[i - linked] = pendingPrograms[i];
                    }
                }

                numPending -= linked;

                if (numPending === 0) {
                    resolve();
                } else {
                    requestAnimationFrame(poll);
                }
            };

            poll();
        });
    }

    /**
        Create a shader. Creating a shader separately from a program allows for
        shader reuse.

        @method
        @param {GLenum} type Shader type.
        @param {string} source Shader source.
        @return {Shader} New Shader object.
    */
    createShader(type, source) {
        return new Shader(this.gl, this.state, type, source);
    }

    /**
        Create a vertex array.

        @method
        @return {VertexArray} New VertexArray object.
    */
    createVertexArray() {
        return new VertexArray(this.gl, this.state);
    }

    /**
        Create a transform feedback object.

        @method
        @return {TransformFeedback} New TransformFeedback object.
    */
    createTransformFeedback() {
        return new TransformFeedback(this.gl, this.state);
    }

    /**
        Create a vertex buffer.

        @method
        @param {GLenum} type The data type stored in the vertex buffer.
        @param {number} itemSize Number of elements per vertex.
        @param {ArrayBufferView|number} data Buffer data itself or the total
            number of elements to be allocated.
        @param {GLenum} [usage=STATIC_DRAW] Buffer usage.
        @return {VertexBuffer} New VertexBuffer object.
    */
    createVertexBuffer(type, itemSize, data, usage) {
        return new VertexBuffer(this.gl, this.state, type, itemSize, data, usage);
    }

    /**
        Create a per-vertex matrix buffer. Matrix buffers ensure that columns
        are correctly split across attribute locations.

        @method
        @param {GLenum} type The data type stored in the matrix buffer. Valid types
        are FLOAT_MAT4, FLOAT_MAT4x2, FLOAT_MAT4x3, FLOAT_MAT3, FLOAT_MAT3x2,
        FLOAT_MAT3x4, FLOAT_MAT2, FLOAT_MAT2x3, FLOAT_MAT2x4.
        @param {ArrayBufferView} data Matrix buffer data.
        @param {GLenum} [usage=STATIC_DRAW] Buffer usage.
        @return {VertexBuffer} New VertexBuffer object.
    */
    createMatrixBuffer(type, data, usage) {
        return new VertexBuffer(this.gl, this.state, type, 0, data, usage);
    }

    /**
        Create an buffer without any structure information. Structure
        must be fully specified when binding to a VertexArray.

        @method
        @param {number} bytesPerVertex Number of bytes per vertex.
        @param {ArrayBufferView|number} data Buffer data itself or the total
            number of bytes to be allocated.
        @param {GLenum} [usage=STATIC_DRAW] Buffer usage.
        @return {VertexBuffer} New VertexBuffer object.
    */
    createInterleavedBuffer(bytesPerVertex, data, usage) {
        return new VertexBuffer(this.gl, this.state, null, bytesPerVertex, data, usage);
    }

    /**
        Create an index buffer. If the `itemSize` is not specified, it defaults to 3

        @method
        @variation 1
        @param {GLenum} type The data type stored in the index buffer.
        @param {ArrayBufferView} data Index buffer data.
        @param {GLenum} [usage=STATIC_DRAW] Buffer usage.
        @return {VertexBuffer} New VertexBuffer object.
    *//**
        Create an index buffer.

        @method
        @variation 2
        @param {GLenum} type The data type stored in the index buffer.
        @param {number} itemSize Number of elements per primitive.
        @param {ArrayBufferView} data Index buffer data.
        @param {GLenum} [usage=STATIC_DRAW] Buffer usage.
        @return {VertexBuffer} New VertexBuffer object.
    */
    createIndexBuffer(type, itemSize, data, usage) {
        if (ArrayBuffer.isView(itemSize)) {
            usage = data;
            data = itemSize;
            itemSize = 3;
        }
        return new VertexBuffer(this.gl, this.state, type, itemSize, data, usage, true);
    }

    /**
        Create a uniform buffer in std140 layout. NOTE: FLOAT_MAT2, FLOAT_MAT3x2, FLOAT_MAT4x2,
        FLOAT_MAT3, FLOAT_MAT2x3, FLOAT_MAT4x3 are supported, but must be manually padded to
        4-float column alignment by the application!

        @method
        @param {Array} layout Array indicating the order and types of items to
                        be stored in the buffer.
        @param {GLenum} [usage=DYNAMIC_DRAW] Buffer usage.
        @return {UniformBuffer} New UniformBuffer object.
    */
    createUniformBuffer(layout, usage) {
        return new UniformBuffer(this.gl, this.state, layout, usage);
    }

    /**
        Create empty 2D texture.
        @method
        @variation 1
        @param {number} width - Texture width. Required for array or empty data.
        @param {number} height - Texture height. Required for array or empty data.
        @param {Object} [options] Texture options.
        @param {GLenum} [options.internalFormat=RGBA8] Texture data internal format. Must be a sized format.
        @param {GLenum} [options.type] Type of data stored in the texture. Default based on
            <b>internalFormat</b>.
        @param {boolean} [options.flipY=false] Whether the y-axis should be flipped when unpacking the texture.
        @param {boolean} [options.premultiplyAlpha=false] Whether the alpha channel should be pre-multiplied when unpacking the texture.
        @param {GLenum} [options.minFilter] Minification filter. Defaults to
            LINEAR_MIPMAP_NEAREST if image data is provided, NEAREST otherwise.
        @param {GLenum} [options.magFilter] Magnification filter. Defaults to LINEAR
            if image data is provided, NEAREST otherwise.
        @param {GLenum} [options.wrapS=REPEAT] Horizontal wrap mode.
        @param {GLenum} [options.wrapT=REPEAT] Vertical wrap mode.
        @param {GLenum} [options.compareMode=NONE] Comparison mode.
        @param {GLenum} [options.compareFunc=LEQUAL] Comparison function.
        @param {GLenum} [options.baseLevel] Base mipmap level.
        @param {GLenum} [options.maxLevel] Maximum mipmap level.
        @param {GLenum} [options.minLOD] Mimimum level of detail.
        @param {GLenum} [options.maxLOD] Maximum level of detail.
        @param {GLenum} [options.maxAnisotropy] Maximum anisotropy in filtering.
        @return {Texture} New Texture object.
    *//**
        Create a 2D texture from a DOM image element.
        @method
        @variation 2
        @param {HTMLImageElement|HTMLImageElement[]} image - Image data. An array can be passed to manually set all levels
            of the mipmap chain. If a single level is passed and mipmap filtering is being used,
            generateMipmap() will be called to produce the remaining levels.
        @param {Object} [options] Texture options.
        @param {GLenum} [options.internalFormat=RGBA8] Texture data internal format. Must be a sized format.
        @param {GLenum} [options.type] Type of data stored in the texture. Default based on
            <b>intrnalFormat</b>.
        @param {boolean} [options.flipY=false] Whether the y-axis should be flipped when unpacking the texture.
        @param {boolean} [options.premultiplyAlpha=false] Whether the alpha channel should be pre-multiplied when unpacking the texture.
        @param {GLenum} [options.minFilter] Minification filter. Defaults to
            LINEAR_MIPMAP_NEAREST if image data is provided, NEAREST otherwise.
        @param {GLenum} [options.magFilter] Magnification filter. Defaults to LINEAR
            if image data is provided, NEAREST otherwise.
        @param {GLenum} [options.wrapS=REPEAT] Horizontal wrap mode.
        @param {GLenum} [options.wrapT=REPEAT] Vertical wrap mode.
        @param {GLenum} [options.compareMode=NONE] Comparison mode.
        @param {GLenum} [options.compareFunc=LEQUAL] Comparison function.
        @param {GLenum} [options.baseLevel] Base mipmap level.
        @param {GLenum} [options.maxLevel] Maximum mipmap level.
        @param {GLenum} [options.minLOD] Mimimum level of detail.
        @param {GLenum} [options.maxLOD] Maximum level of detail.
        @param {GLenum} [options.maxAnisotropy] Maximum anisotropy in filtering.
        @return {Texture} New Texture object.
    *//**
        Create 2D texture from a typed array.
        @method
        @variation 3
        @param {ArrayBufferView|ArrayBufferView[]} image - Image data. An array can be passed to manually set all levels
            of the mipmap chain. If a single level is passed and mipmap filtering is being used,
            generateMipmap() will be called to produce the remaining levels.
        @param {number} width - Texture width. Required for array or empty data.
        @param {number} height - Texture height. Required for array or empty data.
        @param {Object} [options] Texture options.
        @param {GLenum} [options.internalFormat=RGBA8] Texture data internal format. Must be a sized format.
        @param {GLenum} [options.type] Type of data stored in the texture. Default based on
            <b>internalFormat</b>.
        @param {boolean} [options.flipY=false] Whether the y-axis should be flipped when unpacking the texture.
        @param {boolean} [options.premultiplyAlpha=false] Whether the alpha channel should be pre-multiplied when unpacking the texture.
        @param {GLenum} [options.minFilter] Minification filter. Defaults to
            LINEAR_MIPMAP_NEAREST if image data is provided, NEAREST otherwise.
        @param {GLenum} [options.magFilter] Magnification filter. Defaults to LINEAR
            if image data is provided, NEAREST otherwise.
        @param {GLenum} [options.wrapS=REPEAT] Horizontal wrap mode.
        @param {GLenum} [options.wrapT=REPEAT] Vertical wrap mode.
        @param {GLenum} [options.compareMode=NONE] Comparison mode.
        @param {GLenum} [options.compareFunc=LEQUAL] Comparison function.
        @param {GLenum} [options.baseLevel] Base mipmap level.
        @param {GLenum} [options.maxLevel] Maximum mipmap level.
        @param {GLenum} [options.minLOD] Mimimum level of detail.
        @param {GLenum} [options.maxLOD] Maximum level of detail.
        @param {GLenum} [options.maxAnisotropy] Maximum anisotropy in filtering.
        @return {Texture} New Texture object.
    */
    createTexture2D(image, width, height, options) {
        if (typeof image === "number") {
            // Create empty texture just give width/height.
            options = height;
            height = width;
            width = image;
            image = null;
        } else if (height === undefined) {
            // Passing in a DOM element. Height/width not required.
            options = width;
            width = image.width;
            height = image.height;
        }

        return new Texture(this.gl, this.state, this.gl.TEXTURE_2D, image, width, height, undefined, false, options);
    }

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
        @param {GLenum} [options.internalFormat=RGBA8] Texture data internal format. Must be a sized format.
        @param {GLenum} [options.type] Type of data stored in the texture. Default based on
            <b>internalFormat</b>.
        @param {boolean} [options.flipY=false] Whether the y-axis should be flipped when unpacking the texture.
        @param {GLenum} [options.minFilter] Minification filter. Defaults to
            LINEAR_MIPMAP_NEAREST if image data is provided, NEAREST otherwise.
        @param {GLenum} [options.magFilter] Magnification filter. Defaults to LINEAR
            if image data is provided, NEAREST otherwise.
        @param {GLenum} [options.wrapS=REPEAT] Horizontal wrap mode.
        @param {GLenum} [options.wrapT=REPEAT] Vertical wrap mode.
        @param {GLenum} [options.wrapR=REPEAT] Depth wrap mode.
        @param {GLenum} [options.compareMode=NONE] Comparison mode.
        @param {GLenum} [options.compareFunc=LEQUAL] Comparison function.
        @param {GLenum} [options.baseLevel] Base mipmap level.
        @param {GLenum} [options.maxLevel] Maximum mipmap level.
        @param {GLenum} [options.minLOD] Mimimum level of detail.
        @param {GLenum} [options.maxLOD] Maximum level of detail.
        @param {GLenum} [options.maxAnisotropy] Maximum anisotropy in filtering.
        @return {Texture} New Texture object.
    */
    createTextureArray(image, width, height, depth, options) {
        if (typeof image === "number") {
            // Create empty texture just give width/height/depth.
            options = depth;
            depth = height;
            height = width;
            width = image;
            image = null;
        }
        return new Texture(this.gl, this.state, this.gl.TEXTURE_2D_ARRAY, image, width, height, depth, true, options);
    }

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
        @param {GLenum} [options.internalFormat=RGBA8] Texture data internal format. Must be a sized format.
        @param {GLenum} [options.type] Type of data stored in the texture. Default based on
            <b>internalFormat</b>.
        @param {boolean} [options.flipY=false] Whether the y-axis should be flipped when unpacking the texture.
        @param {GLenum} [options.minFilter] Minification filter. Defaults to
            LINEAR_MIPMAP_NEAREST if image data is provided, NEAREST otherwise.
        @param {GLenum} [options.magFilter] Magnification filter. Defaults to LINEAR
            if image data is provided, NEAREST otherwise.
        @param {GLenum} [options.wrapS=REPEAT] Horizontal wrap mode.
        @param {GLenum} [options.wrapT=REPEAT] Vertical wrap mode.
        @param {GLenum} [options.wrapR=REPEAT] Depth wrap mode.
        @param {GLenum} [options.compareMode=NONE] Comparison mode.
        @param {GLenum} [options.compareFunc=LEQUAL] Comparison function.
        @param {GLenum} [options.baseLevel] Base mipmap level.
        @param {GLenum} [options.maxLevel] Maximum mipmap level.
        @param {GLenum} [options.minLOD] Mimimum level of detail.
        @param {GLenum} [options.maxLOD] Maximum level of detail.
        @param {GLenum} [options.maxAnisotropy] Maximum anisotropy in filtering.
        @return {Texture} New Texture object.
    */
    createTexture3D(image, width, height, depth, options) {
        if (typeof image === "number") {
            // Create empty texture just give width/height/depth.
            options = depth;
            depth = height;
            height = width;
            width = image;
            image = null;
        }
        return new Texture(this.gl, this.state, this.gl.TEXTURE_3D, image, width, height, depth, true, options);
    }

    /**
        Create a cubemap.

        @method
        @param {Object} options Texture options.
        @param {HTMLElement|ArrayBufferView} [options.negX] The image data for the negative X direction.
                Can be any format that would be accepted by texImage2D.
        @param {HTMLElement|ArrayBufferView} [options.posX] The image data for the positive X direction.
                Can be any format that would be accepted by texImage2D.
        @param {HTMLElement|ArrayBufferView} [options.negY] The image data for the negative Y direction.
                Can be any format that would be accepted by texImage2D.
        @param {HTMLElement|ArrayBufferView} [options.posY] The image data for the positive Y direction.
                Can be any format that would be accepted by texImage2D.
        @param {HTMLElement|ArrayBufferView} [options.negZ] The image data for the negative Z direction.
                Can be any format that would be accepted by texImage2D.
        @param {HTMLElement|ArrayBufferView} [options.posZ] The image data for the positive Z direction.
                Can be any format that would be accepted by texImage2D.
        @param {number} [options.width] Cubemap side width. Defaults to the width of negX if negX is an image.
        @param {number} [options.height] Cubemap side height. Defaults to the height of negX if negX is an image.
        @param {GLenum} [options.internalFormat=RGBA8] Texture data internal format. Must be a sized format.
        @param {GLenum} [options.type] Type of data stored in the texture. Default based on
            <b>internalFormat</b>.
        @param {boolean} [options.flipY=false] Whether the y-axis should be flipped when unpacking the image.
        @param {boolean} [options.premultiplyAlpha=false] Whether the alpha channel should be pre-multiplied when unpacking the image.
        @param {GLenum} [options.minFilter] Minification filter. Defaults to
            LINEAR_MIPMAP_NEAREST if image data is provided, NEAREST otherwise.
        @param {GLenum} [options.magFilter] Magnification filter. Defaults to LINEAR
            if image data is provided, NEAREST otherwise.
        @param {GLenum} [options.wrapS=REPEAT] Horizontal wrap mode.
        @param {GLenum} [options.wrapT=REPEAT] Vertical wrap mode.
        @param {GLenum} [options.compareMode=NONE] Comparison mode.
        @param {GLenum} [options.compareFunc=LEQUAL] Comparison function.
        @param {GLenum} [options.baseLevel] Base mipmap level.
        @param {GLenum} [options.maxLevel] Maximum mipmap level.
        @param {GLenum} [options.minLOD] Mimimum level of detail.
        @param {GLenum} [options.maxLOD] Maximum level of detail.
        @param {GLenum} [options.maxAnisotropy] Maximum anisotropy in filtering.
        @return {Cubemap} New Cubemap object.
    */
    createCubemap(options) {
        return new Cubemap(this.gl, this.state, options);
    }

    /**
        Create a renderbuffer.

        @method
        @param {number} width Renderbuffer width.
        @param {number} height Renderbuffer height.
        @param {GLenum} internalFormat Internal arrangement of the renderbuffer data.
        @param {number} [samples=0] Number of MSAA samples.
        @return {Renderbuffer} New Renderbuffer object.
    */
    createRenderbuffer(width, height, internalFormat, samples = 0) {
        return new Renderbuffer(this.gl, width, height, internalFormat, samples);
    }

    /**
        Create a framebuffer.

        @method
        @return {Framebuffer} New Framebuffer object.
    */
    createFramebuffer() {
        return new Framebuffer(this.gl, this.state);
    }

    /**
        Create a query.

        @method
        @param {GLenum} target Information to query.
        @return {Query} New Query object.
    */
    createQuery(target) {
        return new Query(this.gl, target);
    }

    /**
        Create a timer.

        @method
        @return {Timer} New Timer object.
    */
    createTimer() {
        return new Timer(this.gl);
    }

    /**
        Create a DrawCall. A DrawCall manages the state associated with
        a WebGL draw call including a program and associated vertex data, textures,
        uniforms and uniform blocks.

        @method
        @param {Program} program The program to use for this DrawCall.
        @param {VertexArray} [vertexArray=null] Vertex data to use for drawing.
        @return {DrawCall} New DrawCall object.
    */
    createDrawCall(program, vertexArray, primitive) {
        return new DrawCall(this.gl, this.state, program, vertexArray, primitive);
    }

    // Enable extensions
    initExtensions() {
        this.gl.getExtension("EXT_color_buffer_float");
        this.gl.getExtension("OES_texture_float_linear");
        this.gl.getExtension("WEBGL_compressed_texture_s3tc");
        this.gl.getExtension("WEBGL_compressed_texture_s3tc_srgb");
        this.gl.getExtension("WEBGL_compressed_texture_etc");
        this.gl.getExtension("WEBGL_compressed_texture_astc");
        this.gl.getExtension("WEBGL_compressed_texture_pvrtc");
        this.gl.getExtension("EXT_disjoint_timer_query_webgl2");
        this.gl.getExtension("EXT_disjoint_timer_query");
        this.gl.getExtension("EXT_texture_filter_anisotropic");

        this.state.extensions.debugShaders = this.gl.getExtension("WEBGL_debug_shaders");
        this.contextLostExt = this.gl.getExtension("WEBGL_lose_context");

        // Draft extensions
        this.gl.getExtension("KHR_parallel_shader_compile");
        this.state.extensions.multiDrawInstanced = this.gl.getExtension("WEBGL_multi_draw_instanced");
        this.state.extensions.drawInstancedBaseVertexBaseInstance = this.gl.getExtension("WEBGL_draw_instanced_base_vertex_base_instance");
        this.state.extensions.multiDrawInstancedBaseVertexBaseInstance = this.gl.getExtension("WEBGL_multi_draw_instanced_base_vertex_base_instance");
    }

    initContextListeners() {
        if (this.contextRestoredHandler) {
            this.contextLostListener = (e) => {
                e.preventDefault();
            };
            this.contextRestoredListener = () => {
                this.initExtensions();
                this.contextRestoredHandler();
            };
            this.canvas.addEventListener("webglcontextlost", this.contextLostListener);
            this.canvas.addEventListener("webglcontextrestored", this.contextRestoredListener);
        } else {
            this.canvas.removeEventListener("webglcontextlost", this.contextLostListener);
            this.canvas.removeEventListener("webglcontextrestored", this.contextRestoredListener);
            this.contextLostListener = null;
            this.contextRestoredListener = null;
        }
    }

    // DEPRECATED

    depthTest() {
        console.warn("App.depthTest is deprecated. Use App.enable(PicoGL.DEPTH_TEST) instead.");
        this.enable(GL.DEPTH_TEST);

        return this;
    }

    noDepthTest() {
        console.warn("App.noDepthTest is deprecated. Use App.disable(PicoGL.DEPTH_TEST) instead.");
        this.disable(GL.DEPTH_TEST);

        return this;
    }

    blend() {
        console.warn("App.blend is deprecated. Use App.enable(PicoGL.BLEND) instead.");
        this.enable(GL.BLEND);

        return this;
    }

    noBlend() {
        console.warn("App.noBlend is deprecated. Use App.disable(PicoGL.BLEND) instead.");
        this.disable(GL.BLEND);

        return this;
    }

    stencilTest() {
        console.warn("App.stencilTest is deprecated. Use App.enable(PicoGL.STENCIL_TEST) instead.");
        this.enable(GL.STENCIL_TEST);

        return this;
    }

    noStencilTest() {
        console.warn("App.noStencilTest is deprecated. Use App.disable(PicoGL.STENCIL_TEST) instead.");
        this.disable(GL.STENCIL_TEST);

        return this;
    }

    scissorTest() {
        console.warn("App.scissorTest is deprecated. Use App.enable(PicoGL.SCISSOR_TEST) instead.");
        this.enable(GL.SCISSOR_TEST);

        return this;
    }

    noScissorTest() {
        console.warn("App.noScissorTest is deprecated. Use App.disable(PicoGL.SCISSOR_TEST) instead.");
        this.disable(GL.SCISSOR_TEST);

        return this;
    }

    rasterize() {
        console.warn("App.noRasterize is deprecated. Use App.disable(PicoGL.RASTERIZER_DISCARD) instead.");
        this.disable(GL.RASTERIZER_DISCARD);

        return this;
    }

    noRasterize() {
        console.warn("App.rasterize is deprecated. Use App.enable(PicoGL.RASTERIZER_DISCARD) instead.");
        this.enable(GL.RASTERIZER_DISCARD);

        return this;
    }

    cullBackfaces() {
        console.warn("App.cullBackfaces is deprecated. Use App.enable(PicoGL.CULL_FACE) instead.");
        this.enable(GL.CULL_FACE);

        return this;
    }

    drawBackfaces() {
        console.warn("App.drawBackfaces is deprecated. Use App.disable(PicoGL.CULL_FACE) instead.");
        this.disable(GL.CULL_FACE);

        return this;
    }

}
