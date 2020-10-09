/**
 * The correct type for a DOMElement is HTMLElement:
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement
 */
export type DOMElement = HTMLElement;

/**
 * Primary entry point to PicoGL. An app will store all parts of the WebGL
 *     state.
 * @property canvas - The canvas on which this app drawing.
 * @property gl - The WebGL context.
 * @property width - The width of the drawing surface.
 * @property height - The height of the drawing surface.
 * @property state - Tracked GL state.
 * @property state.drawFramebufferBinding - Binding point to bind framebuffers to for draw. Should be set before any binding occurs. Should only have values GL.DRAW_FRAMEBUFFER or GL.FRAMEBUFFER (the latter with state.readFramebufferBinding set to the same).
 * @property state.readFramebufferBinding - Binding point to bind framebuffers to for read. Should be set before any binding occurs. Should only have values GL.READ_FRAMEBUFFER or GL.FRAMEBUFFER (the latter with state.drawFramebufferBinding set to the same).
 * @property clearBits - Current clear mask to use with clear().
 */
export class App {
    constructor(gl: WebGLRenderingContext);
    /**
     * Simulate context loss.
     * @returns The App object.
     */
    loseContext(): App;
    /**
     * Simulate context restoration.
     * @returns The App object.
     */
    restoreContext(): App;
    /**
     * Set function to handle context restoration after loss.
     * @param fn - Context restored handler.
     * @returns The App object.
     */
    onContextRestored(fn: (...params: any[]) => any): App;
    /**
     * Enable WebGL capability (e.g. depth testing, blending, etc.).
     * @param cap - Capability to enable.
     */
    enable(cap: GLenum): void;
    /**
     * Disable WebGL capability (e.g. depth testing, blending, etc.).
     * @param cap - Capability to disable.
     */
    disable(cap: GLenum): void;
    /**
     * Set the color mask to selectively enable or disable particular
     *         color channels while rendering.
     * @param r - Red channel.
     * @param g - Green channel.
     * @param b - Blue channel.
     * @param a - Alpha channel.
     * @returns The App object.
     */
    colorMask(r: boolean, g: boolean, b: boolean, a: boolean): App;
    /**
     * Set the clear color.
     * @param r - Red channel.
     * @param g - Green channel.
     * @param b - Blue channel.
     * @param a - Alpha channel.
     * @returns The App object.
     */
    clearColor(r: number, g: number, b: number, a: number): App;
    /**
     * Set the clear mask bits to use when calling clear().
     *         E.g. app.clearMask(PicoGL.COLOR_BUFFER_BIT).
     * @param mask - Bit mask of buffers to clear.
     * @returns The App object.
     */
    clearMask(mask: GLenum): App;
    /**
     * Clear the canvas
     * @returns The App object.
     */
    clear(): App;
    /**
     * Bind a draw framebuffer to the WebGL context.
     * @param framebuffer - The Framebuffer object to bind.
     * @returns The App object.
     */
    drawFramebuffer(framebuffer: Framebuffer): App;
    /**
     * Bind a read framebuffer to the WebGL context.
     * @param framebuffer - The Framebuffer object to bind.
     * @returns The App object.
     */
    readFramebuffer(framebuffer: Framebuffer): App;
    /**
     * Switch back to the default framebuffer for drawing (i.e. draw to the screen).
     *         Note that this method resets the viewport to match the default framebuffer.
     * @returns The App object.
     */
    defaultDrawFramebuffer(): App;
    /**
     * Switch back to the default framebuffer for reading (i.e. read from the screen).
     * @returns The App object.
     */
    defaultReadFramebuffer(): App;
    /**
     * Copy data from framebuffer attached to READ_FRAMEBUFFER to framebuffer attached to DRAW_FRAMEBUFFER.
     * @param mask - Write mask (e.g. PicoGL.COLOR_BUFFER_BIT).
     * @param [options] - Blit options.
     * @param [options.srcStartX = 0] - Source start x coordinate.
     * @param [options.srcStartY = 0] - Source start y coordinate.
     * @param [options.srcEndX = Width of the read framebuffer] - Source end x coordinate.
     * @param [options.srcEndY = Height of the read framebuffer] - Source end y coordinate.
     * @param [options.dstStartX = 0] - Destination start x coordinate.
     * @param [options.dstStartY = 0] - Destination start y coordinate.
     * @param [options.dstEndX = Width of the draw framebuffer] - Destination end x coordinate.
     * @param [options.dstEndY = Height of the draw framebuffer] - Destination end y coordinate.
     * @param [options.filter = NEAREST] - Sampling filter.
     * @returns The App object.
     */
    blitFramebuffer(mask: GLenum, options?: {
        srcStartX?: number;
        srcStartY?: number;
        srcEndX?: number;
        srcEndY?: number;
        dstStartX?: number;
        dstStartY?: number;
        dstEndX?: number;
        dstEndY?: number;
        filter?: number;
    }): App;
    /**
     * Set the depth range.
     * @param near - Minimum depth value.
     * @param far - Maximum depth value.
     * @returns The App object.
     */
    depthRange(near: number, far: number): App;
    /**
     * Enable or disable writing to the depth buffer.
     * @param mask - The depth mask.
     * @returns The App object.
     */
    depthMask(mask: boolean): App;
    /**
     * Set the depth test function. E.g. app.depthFunc(PicoGL.LEQUAL).
     * @param func - The depth testing function to use.
     * @returns The App object.
     */
    depthFunc(func: GLenum): App;
    /**
     * Set the blend function. E.g. app.blendFunc(PicoGL.ONE, PicoGL.ONE_MINUS_SRC_ALPHA).
     * @param src - The source blending weight.
     * @param dest - The destination blending weight.
     * @returns The App object.
     */
    blendFunc(src: GLenum, dest: GLenum): App;
    /**
     * Set the blend function, with separate weighting for color and alpha channels.
     *         E.g. app.blendFuncSeparate(PicoGL.ONE, PicoGL.ONE_MINUS_SRC_ALPHA, PicoGL.ONE, PicoGL.ONE).
     * @param csrc - The source blending weight for the RGB channels.
     * @param cdest - The destination blending weight for the RGB channels.
     * @param asrc - The source blending weight for the alpha channel.
     * @param adest - The destination blending weight for the alpha channel.
     * @returns The App object.
     */
    blendFuncSeparate(csrc: GLenum, cdest: GLenum, asrc: GLenum, adest: GLenum): App;
    /**
     * Set the blend equation. E.g. app.blendEquation(PicoGL.MIN).
     * @param mode - The operation to use in combining source and destination channels.
     * @returns The App object.
     */
    blendEquation(mode: GLenum): App;
    /**
     * Set the bitmask to use for tested stencil values.
     *         E.g. app.stencilMask(0xFF).
     *         NOTE: Only works if { stencil: true } passed as a
     *         context attribute when creating the App!
     * @param mask - The mask value.
     * @returns The App object.
     */
    stencilMask(mask: number): App;
    /**
     * Set the bitmask to use for tested stencil values for a particular face orientation.
     *         E.g. app.stencilMaskSeparate(PicoGL.FRONT, 0xFF).
     *         NOTE: Only works if { stencil: true } passed as a
     *         context attribute when creating the App!
     * @param face - The face orientation to apply the mask to.
     * @param mask - The mask value.
     * @returns The App object.
     */
    stencilMaskSeparate(face: GLenum, mask: number): App;
    /**
     * Set the stencil function and reference value.
     *         E.g. app.stencilFunc(PicoGL.EQUAL, 1, 0xFF).
     *         NOTE: Only works if { stencil: true } passed as a
     *         context attribute when creating the App!
     * @param func - The testing function.
     * @param ref - The reference value.
     * @param mask - The bitmask to use against tested values before applying
     *             the stencil function.
     * @returns The App object.
     */
    stencilFunc(func: GLenum, ref: number, mask: GLenum): App;
    /**
     * Set the stencil function and reference value for a particular face orientation.
     *         E.g. app.stencilFuncSeparate(PicoGL.FRONT, PicoGL.EQUAL, 1, 0xFF).
     *         NOTE: Only works if { stencil: true } passed as a
     *         context attribute when creating the App!
     * @param face - The face orientation to apply the function to.
     * @param func - The testing function.
     * @param ref - The reference value.
     * @param mask - The bitmask to use against tested values before applying
     *             the stencil function.
     * @returns The App object.
     */
    stencilFuncSeparate(face: GLenum, func: GLenum, ref: number, mask: GLenum): App;
    /**
     * Set the operations for updating stencil buffer values.
     *         E.g. app.stencilOp(PicoGL.KEEP, PicoGL.KEEP, PicoGL.REPLACE).
     *         NOTE: Only works if { stencil: true } passed as a
     *         context attribute when creating the App!
     * @param stencilFail - Operation to apply if the stencil test fails.
     * @param depthFail - Operation to apply if the depth test fails.
     * @param pass - Operation to apply if the both the depth and stencil tests pass.
     * @returns The App object.
     */
    stencilOp(stencilFail: GLenum, depthFail: GLenum, pass: GLenum): App;
    /**
     * Set the operations for updating stencil buffer values for a particular face orientation.
     *         E.g. app.stencilOpSeparate(PicoGL.FRONT, PicoGL.KEEP, PicoGL.KEEP, PicoGL.REPLACE).
     *         NOTE: Only works if { stencil: true } passed as a
     *         context attribute when creating the App!
     * @param face - The face orientation to apply the operations to.
     * @param stencilFail - Operation to apply if the stencil test fails.
     * @param depthFail - Operation to apply if the depth test fails.
     * @param pass - Operation to apply if the both the depth and stencil tests pass.
     * @returns The App object.
     */
    stencilOpSeparate(face: GLenum, stencilFail: GLenum, depthFail: GLenum, pass: GLenum): App;
    /**
     * Define the scissor box.
     * @param x - Horizontal position of the scissor box.
     * @param y - Vertical position of the scissor box.
     * @param width - Width of the scissor box.
     * @param height - Height of the scissor box.
     * @returns The App object.
     */
    scissor(x: number, y: number, width: number, height: number): App;
    /**
     * Set the scale and units used.
     * @param factor - Scale factor used to create a variable depth offset for each polygon.
     * @param units - Constant depth offset.
     * @returns The App object.
     */
    polygonOffset(factor: number, units: number): App;
    /**
     * Read a pixel's color value from the currently-bound framebuffer.
     * @param x - The x coordinate of the pixel.
     * @param y - The y coordinate of the pixel.
     * @param outColor - Typed array to store the pixel's color.
     * @param [options] - Options.
     * @param [options.type = UNSIGNED_BYTE] - Type of data stored in the read framebuffer.
     * @param [options.format = RGBA] - Read framebuffer data format.
     * @returns The App object.
     */
    readPixel(x: number, y: number, outColor: ArrayBufferView, options?: {
        type?: GLenum;
        format?: GLenum;
    }): App;
    /**
     * Set the viewport.
     * @param x - Left bound of the viewport rectangle.
     * @param y - Lower bound of the viewport rectangle.
     * @param width - Width of the viewport rectangle.
     * @param height - Height of the viewport rectangle.
     * @returns The App object.
     */
    viewport(x: number, y: number, width: number, height: number): App;
    /**
     * Set the viewport to the full canvas.
     * @returns The App object.
     */
    defaultViewport(): App;
    /**
     * Resize the drawing surface.
     * @param width - The new canvas width.
     * @param height - The new canvas height.
     * @returns The App object.
     */
    resize(width: number, height: number): App;
    /**
     * Create a program synchronously. It is highly recommended to use <b>createPrograms</b> instead as
     *             that method will compile shaders in parallel where possible.
     * @param vertexShader - Vertex shader object or source code.
     * @param fragmentShader - Fragment shader object or source code.
     * @param [options] - Texture options.
     * @param [options.attributeLocations] - Map of attribute names to locations (useful when using GLSL 1).
     * @param [options.transformFeedbackVaryings] - Array of varying names used for transform feedback output.
     * @returns New Program object.
     */
    createProgram(vertexShader: Shader | string, fragmentShader: Shader | string, options?: {
        attributeLocations?: any;
        transformFeedbackVaryings?: any[];
    }): Program;
    /**
     * Create several programs. Preferred method for program creation as it will compile shaders
     *         in parallel where possible.
     * @param sources - Variable number of 2 or 3 element arrays, each containing:
     *             <ul>
     *                 <li> (Shader|string) Vertex shader object or source code.
     *                 <li> (Shader|string) Fragment shader object or source code.
     *                 <li> (Object - optional) Optional program parameters.
     *                 <ul>
     *                     <li> (Object - optional) <strong><code>attributeLocations</code></strong> Map of attribute names to locations (useful when using GLSL 1).
     *                     <li>(Array - optional) <strong><code>transformFeedbackVaryings</code></strong> Array of varying names used for transform feedback output.
     *                 </ul>
     *                 </ul>
     *             </ul>
     * @returns Promise that will resolve to an array of Programs when compilation and
     *             linking are complete for all programs.
     */
    createPrograms(...sources: any[][]): Promise<Program[]>;
    /**
     * Restore several programs after a context loss. Will do so in parallel where available.
     * @param sources - Variable number of programs to restore.
     * @returns Promise that will resolve once all programs have been restored.
     */
    restorePrograms(...sources: Program[]): Promise<void>;
    /**
     * Create a shader. Creating a shader separately from a program allows for
     *         shader reuse.
     * @param type - Shader type.
     * @param source - Shader source.
     * @returns New Shader object.
     */
    createShader(type: GLenum, source: string): Shader;
    /**
     * Create a vertex array.
     * @returns New VertexArray object.
     */
    createVertexArray(): VertexArray;
    /**
     * Create a transform feedback object.
     * @returns New TransformFeedback object.
     */
    createTransformFeedback(): TransformFeedback;
    /**
     * Create a vertex buffer.
     * @param type - The data type stored in the vertex buffer.
     * @param itemSize - Number of elements per vertex.
     * @param data - Buffer data itself or the total
     *             number of elements to be allocated.
     * @param [usage = STATIC_DRAW] - Buffer usage.
     * @returns New VertexBuffer object.
     */
    createVertexBuffer(type: GLenum, itemSize: number, data: ArrayBufferView | number, usage?: GLenum): VertexBuffer;
    /**
     * Create a per-vertex matrix buffer. Matrix buffers ensure that columns
     *         are correctly split across attribute locations.
     * @param type - The data type stored in the matrix buffer. Valid types
     *         are FLOAT_MAT4, FLOAT_MAT4x2, FLOAT_MAT4x3, FLOAT_MAT3, FLOAT_MAT3x2,
     *         FLOAT_MAT3x4, FLOAT_MAT2, FLOAT_MAT2x3, FLOAT_MAT2x4.
     * @param data - Matrix buffer data.
     * @param [usage = STATIC_DRAW] - Buffer usage.
     * @returns New VertexBuffer object.
     */
    createMatrixBuffer(type: GLenum, data: ArrayBufferView, usage?: GLenum): VertexBuffer;
    /**
     * Create an buffer without any structure information. Structure
     *         must be fully specified when binding to a VertexArray.
     * @param bytesPerVertex - Number of bytes per vertex.
     * @param data - Buffer data itself or the total
     *             number of bytes to be allocated.
     * @param [usage = STATIC_DRAW] - Buffer usage.
     * @returns New VertexBuffer object.
     */
    createInterleavedBuffer(bytesPerVertex: number, data: ArrayBufferView | number, usage?: GLenum): VertexBuffer;
    /**
     * Create an index buffer. If the `itemSize` is not specified, it defaults to 3
     * @param type - The data type stored in the index buffer.
     * @param data - Index buffer data.
     * @param [usage = STATIC_DRAW] - Buffer usage.
     * @returns New VertexBuffer object.
     */
    createIndexBuffer(type: GLenum, data: ArrayBufferView, usage?: GLenum): VertexBuffer;
    /**
     * Create an index buffer.
     * @param type - The data type stored in the index buffer.
     * @param itemSize - Number of elements per primitive.
     * @param data - Index buffer data.
     * @param [usage = STATIC_DRAW] - Buffer usage.
     * @returns New VertexBuffer object.
     */
    createIndexBuffer(type: GLenum, itemSize: number, data: ArrayBufferView, usage?: GLenum): VertexBuffer;
    /**
     * Create a uniform buffer in std140 layout. NOTE: FLOAT_MAT2, FLOAT_MAT3x2, FLOAT_MAT4x2,
     *         FLOAT_MAT3, FLOAT_MAT2x3, FLOAT_MAT4x3 are supported, but must be manually padded to
     *         4-float column alignment by the application!
     * @param layout - Array indicating the order and types of items to
     *                         be stored in the buffer.
     * @param [usage = DYNAMIC_DRAW] - Buffer usage.
     * @returns New UniformBuffer object.
     */
    createUniformBuffer(layout: any[], usage?: GLenum): UniformBuffer;
    /**
     * Create a 2D texture. Can be used in several ways depending on the type of texture data:
     *         <ul>
     *             <li><b>app.createTexture2D(ImageElement, options)</b>: Create texture from a DOM image element.
     *             <li><b>app.createTexture2D(TypedArray, width, height, options)</b>: Create texture from a typed array.
     *             <li><b>app.createTexture2D(width, height, options)</b>: Create empty texture.
     *         </ul>
     * @param [image] - Image data. An array can be passed to manually set all levels
     *             of the mipmap chain. If a single level is passed and mipmap filtering is being used,
     *             generateMipmap() will be called to produce the remaining levels.
     * @param [width] - Texture width. Required for array or empty data.
     * @param [height] - Texture height. Required for array or empty data.
     * @param [options] - Texture options.
     * @param [options.internalFormat = RGBA8] - Texture data internal format. Must be a sized format.
     * @param [options.type] - Type of data stored in the texture. Default based on
     *             <b>internalFormat</b>.
     * @param [options.flipY = false] - Whether the y-axis should be flipped when unpacking the texture.
     * @param [options.premultiplyAlpha = false] - Whether the alpha channel should be pre-multiplied when unpacking the texture.
     * @param [options.minFilter] - Minification filter. Defaults to
     *             LINEAR_MIPMAP_NEAREST if image data is provided, NEAREST otherwise.
     * @param [options.magFilter] - Magnification filter. Defaults to LINEAR
     *             if image data is provided, NEAREST otherwise.
     * @param [options.wrapS = REPEAT] - Horizontal wrap mode.
     * @param [options.wrapT = REPEAT] - Vertical wrap mode.
     * @param [options.compareMode = NONE] - Comparison mode.
     * @param [options.compareFunc = LEQUAL] - Comparison function.
     * @param [options.baseLevel] - Base mipmap level.
     * @param [options.maxLevel] - Maximum mipmap level.
     * @param [options.minLOD] - Mimimum level of detail.
     * @param [options.maxLOD] - Maximum level of detail.
     * @param [options.maxAnisotropy] - Maximum anisotropy in filtering.
     * @returns New Texture object.
     */
    createTexture2D(image?: DOMElement | ArrayBufferView | any[], width?: number, height?: number, options?: {
        internalFormat?: GLenum;
        type?: GLenum;
        flipY?: boolean;
        premultiplyAlpha?: boolean;
        minFilter?: GLenum;
        magFilter?: GLenum;
        wrapS?: GLenum;
        wrapT?: GLenum;
        compareMode?: GLenum;
        compareFunc?: GLenum;
        baseLevel?: GLenum;
        maxLevel?: GLenum;
        minLOD?: GLenum;
        maxLOD?: GLenum;
        maxAnisotropy?: GLenum;
    }): Texture;
    /**
     * Create a 2D texture array.
     * @param image - Pixel data. An array can be passed to manually set all levels
     *             of the mipmap chain. If a single level is passed and mipmap filtering is being used,
     *             generateMipmap() will be called to produce the remaining levels.
     * @param width - Texture width.
     * @param height - Texture height.
     * @param size - Number of images in the array.
     * @param [options] - Texture options.
     * @param [options.internalFormat = RGBA8] - Texture data internal format. Must be a sized format.
     * @param [options.type] - Type of data stored in the texture. Default based on
     *             <b>internalFormat</b>.
     * @param [options.flipY = false] - Whether the y-axis should be flipped when unpacking the texture.
     * @param [options.minFilter] - Minification filter. Defaults to
     *             LINEAR_MIPMAP_NEAREST if image data is provided, NEAREST otherwise.
     * @param [options.magFilter] - Magnification filter. Defaults to LINEAR
     *             if image data is provided, NEAREST otherwise.
     * @param [options.wrapS = REPEAT] - Horizontal wrap mode.
     * @param [options.wrapT = REPEAT] - Vertical wrap mode.
     * @param [options.wrapR = REPEAT] - Depth wrap mode.
     * @param [options.compareMode = NONE] - Comparison mode.
     * @param [options.compareFunc = LEQUAL] - Comparison function.
     * @param [options.baseLevel] - Base mipmap level.
     * @param [options.maxLevel] - Maximum mipmap level.
     * @param [options.minLOD] - Mimimum level of detail.
     * @param [options.maxLOD] - Maximum level of detail.
     * @param [options.maxAnisotropy] - Maximum anisotropy in filtering.
     * @returns New Texture object.
     */
    createTextureArray(image: ArrayBufferView | any[], width: number, height: number, size: number, options?: {
        internalFormat?: GLenum;
        type?: GLenum;
        flipY?: boolean;
        minFilter?: GLenum;
        magFilter?: GLenum;
        wrapS?: GLenum;
        wrapT?: GLenum;
        wrapR?: GLenum;
        compareMode?: GLenum;
        compareFunc?: GLenum;
        baseLevel?: GLenum;
        maxLevel?: GLenum;
        minLOD?: GLenum;
        maxLOD?: GLenum;
        maxAnisotropy?: GLenum;
    }): Texture;
    /**
     * Create a 3D texture.
     * @param image - Pixel data. An array can be passed to manually set all levels
     *             of the mipmap chain. If a single level is passed and mipmap filtering is being used,
     *             generateMipmap() will be called to produce the remaining levels.
     * @param width - Texture width.
     * @param height - Texture height.
     * @param depth - Texture depth.
     * @param [options] - Texture options.
     * @param [options.internalFormat = RGBA8] - Texture data internal format. Must be a sized format.
     * @param [options.type] - Type of data stored in the texture. Default based on
     *             <b>internalFormat</b>.
     * @param [options.flipY = false] - Whether the y-axis should be flipped when unpacking the texture.
     * @param [options.minFilter] - Minification filter. Defaults to
     *             LINEAR_MIPMAP_NEAREST if image data is provided, NEAREST otherwise.
     * @param [options.magFilter] - Magnification filter. Defaults to LINEAR
     *             if image data is provided, NEAREST otherwise.
     * @param [options.wrapS = REPEAT] - Horizontal wrap mode.
     * @param [options.wrapT = REPEAT] - Vertical wrap mode.
     * @param [options.wrapR = REPEAT] - Depth wrap mode.
     * @param [options.compareMode = NONE] - Comparison mode.
     * @param [options.compareFunc = LEQUAL] - Comparison function.
     * @param [options.baseLevel] - Base mipmap level.
     * @param [options.maxLevel] - Maximum mipmap level.
     * @param [options.minLOD] - Mimimum level of detail.
     * @param [options.maxLOD] - Maximum level of detail.
     * @param [options.maxAnisotropy] - Maximum anisotropy in filtering.
     * @returns New Texture object.
     */
    createTexture3D(image: ArrayBufferView | any[], width: number, height: number, depth: number, options?: {
        internalFormat?: GLenum;
        type?: GLenum;
        flipY?: boolean;
        minFilter?: GLenum;
        magFilter?: GLenum;
        wrapS?: GLenum;
        wrapT?: GLenum;
        wrapR?: GLenum;
        compareMode?: GLenum;
        compareFunc?: GLenum;
        baseLevel?: GLenum;
        maxLevel?: GLenum;
        minLOD?: GLenum;
        maxLOD?: GLenum;
        maxAnisotropy?: GLenum;
    }): Texture;
    /**
     * Create a cubemap.
     * @param options - Texture options.
     * @param [options.negX] - The image data for the negative X direction.
     *                 Can be any format that would be accepted by texImage2D.
     * @param [options.posX] - The image data for the positive X direction.
     *                 Can be any format that would be accepted by texImage2D.
     * @param [options.negY] - The image data for the negative Y direction.
     *                 Can be any format that would be accepted by texImage2D.
     * @param [options.posY] - The image data for the positive Y direction.
     *                 Can be any format that would be accepted by texImage2D.
     * @param [options.negZ] - The image data for the negative Z direction.
     *                 Can be any format that would be accepted by texImage2D.
     * @param [options.posZ] - The image data for the positive Z direction.
     *                 Can be any format that would be accepted by texImage2D.
     * @param [options.width] - Cubemap side width. Defaults to the width of negX if negX is an image.
     * @param [options.height] - Cubemap side height. Defaults to the height of negX if negX is an image.
     * @param [options.internalFormat = RGBA8] - Texture data internal format. Must be a sized format.
     * @param [options.type] - Type of data stored in the texture. Default based on
     *             <b>internalFormat</b>.
     * @param [options.flipY = false] - Whether the y-axis should be flipped when unpacking the image.
     * @param [options.premultiplyAlpha = false] - Whether the alpha channel should be pre-multiplied when unpacking the image.
     * @param [options.minFilter] - Minification filter. Defaults to
     *             LINEAR_MIPMAP_NEAREST if image data is provided, NEAREST otherwise.
     * @param [options.magFilter] - Magnification filter. Defaults to LINEAR
     *             if image data is provided, NEAREST otherwise.
     * @param [options.wrapS = REPEAT] - Horizontal wrap mode.
     * @param [options.wrapT = REPEAT] - Vertical wrap mode.
     * @param [options.compareMode = NONE] - Comparison mode.
     * @param [options.compareFunc = LEQUAL] - Comparison function.
     * @param [options.baseLevel] - Base mipmap level.
     * @param [options.maxLevel] - Maximum mipmap level.
     * @param [options.minLOD] - Mimimum level of detail.
     * @param [options.maxLOD] - Maximum level of detail.
     * @param [options.maxAnisotropy] - Maximum anisotropy in filtering.
     * @returns New Cubemap object.
     */
    createCubemap(options: {
        negX?: DOMElement | ArrayBufferView;
        posX?: DOMElement | ArrayBufferView;
        negY?: DOMElement | ArrayBufferView;
        posY?: DOMElement | ArrayBufferView;
        negZ?: DOMElement | ArrayBufferView;
        posZ?: DOMElement | ArrayBufferView;
        width?: number;
        height?: number;
        internalFormat?: GLenum;
        type?: GLenum;
        flipY?: boolean;
        premultiplyAlpha?: boolean;
        minFilter?: GLenum;
        magFilter?: GLenum;
        wrapS?: GLenum;
        wrapT?: GLenum;
        compareMode?: GLenum;
        compareFunc?: GLenum;
        baseLevel?: GLenum;
        maxLevel?: GLenum;
        minLOD?: GLenum;
        maxLOD?: GLenum;
        maxAnisotropy?: GLenum;
    }): Cubemap;
    /**
     * Create a renderbuffer.
     * @param width - Renderbuffer width.
     * @param height - Renderbuffer height.
     * @param internalFormat - Internal arrangement of the renderbuffer data.
     * @param [samples = 0] - Number of MSAA samples.
     * @returns New Renderbuffer object.
     */
    createRenderbuffer(width: number, height: number, internalFormat: GLenum, samples?: number): Renderbuffer;
    /**
     * Create a framebuffer.
     * @returns New Framebuffer object.
     */
    createFramebuffer(): Framebuffer;
    /**
     * Create a query.
     * @param target - Information to query.
     * @returns New Query object.
     */
    createQuery(target: GLenum): Query;
    /**
     * Create a timer.
     * @returns New Timer object.
     */
    createTimer(): Timer;
    /**
     * Create a DrawCall. A DrawCall manages the state associated with
     *         a WebGL draw call including a program and associated vertex data, textures,
     *         uniforms and uniform blocks.
     * @param program - The program to use for this DrawCall.
     * @param [vertexArray = null] - Vertex data to use for drawing.
     * @returns New DrawCall object.
     */
    createDrawCall(program: Program, vertexArray?: VertexArray): DrawCall;
    /**
     * The canvas on which this app drawing.
    */
    canvas: DOMElement;
    /**
     * The WebGL context.
    */
    gl: WebGLRenderingContext;
    /**
     * The width of the drawing surface.
    */
    width: number;
    /**
     * The height of the drawing surface.
    */
    height: number;
    /**
     * Tracked GL state.
    */
    state: {
        drawFramebufferBinding: any;
        readFramebufferBinding: any;
    };
    /**
     * Current clear mask to use with clear().
    */
    clearBits: GLenum;
}

/**
 * Cubemap for environment mapping.
 * @property gl - The WebGL context.
 * @property texture - Handle to the texture.
 * @property type - Type of data stored in the texture.
 * @property format - Layout of texture data.
 * @property internalFormat - Internal arrangement of the texture data.
 * @property currentUnit - The current texture unit this cubemap is bound to.
 * @property flipY - Whether the y-axis is flipped for this cubemap.
 * @property premultiplyAlpha - Whether alpha should be pre-multiplied when loading this cubemap.
 * @property appState - Tracked GL state.
 */
export class Cubemap {
    /**
     * Restore cubemap after context loss.
     * @param [options] - Texture options.
     * @param [options.negX] - The image data for the negative X direction.
     *                 Can be any format that would be accepted by texImage2D.
     * @param [options.posX] - The image data for the positive X direction.
     *                 Can be any format that would be accepted by texImage2D.
     * @param [options.negY] - The image data for the negative Y direction.
     *                 Can be any format that would be accepted by texImage2D.
     * @param [options.posY] - The image data for the positive Y direction.
     *                 Can be any format that would be accepted by texImage2D.
     * @param [options.negZ] - The image data for the negative Z direction.
     *                 Can be any format that would be accepted by texImage2D.
     * @param [options.posZ] - The image data for the positive Z direction.
     *                 Can be any format that would be accepted by texImage2D.
     * @returns The Cubemap object.
     */
    restore(options?: {
        negX?: DOMElement | ArrayBufferView;
        posX?: DOMElement | ArrayBufferView;
        negY?: DOMElement | ArrayBufferView;
        posY?: DOMElement | ArrayBufferView;
        negZ?: DOMElement | ArrayBufferView;
        posZ?: DOMElement | ArrayBufferView;
    }): Cubemap;
    /**
     * Delete this cubemap.
     * @returns The Cubemap object.
     */
    delete(): Cubemap;
    /**
     * The WebGL context.
    */
    gl: WebGLRenderingContext;
    /**
     * Handle to the texture.
    */
    texture: WebGLTexture;
    /**
     * Type of data stored in the texture.
    */
    type: GLenum;
    /**
     * Layout of texture data.
    */
    format: GLenum;
    /**
     * Internal arrangement of the texture data.
    */
    internalFormat: GLenum;
    /**
     * The current texture unit this cubemap is bound to.
    */
    currentUnit: number;
    /**
     * Whether the y-axis is flipped for this cubemap.
    */
    flipY: boolean;
    /**
     * Whether alpha should be pre-multiplied when loading this cubemap.
    */
    premultiplyAlpha: boolean;
    /**
     * Tracked GL state.
    */
    appState: any;
}

/**
 * A DrawCall represents the program and values of associated
 *     attributes, uniforms and textures for a single draw call.
 * @property gl - The WebGL context.
 * @property currentProgram - The program to use for this draw call.
 * @property currentVertexArray - Vertex array to use for this draw call.
 * @property currentTransformFeedback - Transform feedback to use for this draw call.
 * @property uniformBuffers - Ordered list of active uniform buffers.
 * @property uniformBlockNames - Ordered list of uniform block names.
 * @property uniformBlockCount - Number of active uniform blocks for this draw call.
 * @property uniformIndices - Map of uniform names to indices in the uniform arrays.
 * @property uniformNames - Ordered list of uniform names.
 * @property uniformValue - Ordered list of uniform values.
 * @property uniformCount - The number of active uniforms for this draw call.
 * @property textures - Array of active textures.
 * @property textureCount - The number of active textures for this draw call.
 * @property appState - Tracked GL state.
 * @property numElements - The number of element to draw.
 * @property numInstances - The number of instances to draw.
 */
export class DrawCall {
    /**
     * Set the current draw primitive for this draw call.
     * @param primitive - Primitive to draw.
     * @returns The DrawCall object.
     */
    primitive(primitive: GLenum): DrawCall;
    /**
     * Set the current TransformFeedback object for draw.
     * @param transformFeedback - Transform Feedback to set.
     * @returns The DrawCall object.
     */
    transformFeedback(transformFeedback: TransformFeedback): DrawCall;
    /**
     * Set the value for a uniform. Array uniforms are supported by
     *         using appending "[0]" to the array name and passing a flat array
     *         with all required values.
     * @param name - Uniform name.
     * @param value - Uniform value.
     * @returns The DrawCall object.
     */
    uniform(name: string, value: any): DrawCall;
    /**
     * Set texture to bind to a sampler uniform.
     * @param name - Sampler uniform name.
     * @param texture - Texture or Cubemap to bind.
     * @returns The DrawCall object.
     */
    texture(name: string, texture: Texture | Cubemap): DrawCall;
    /**
     * Set uniform buffer to bind to a uniform block.
     * @param name - Uniform block name.
     * @param buffer - Uniform buffer to bind.
     * @returns The DrawCall object.
     */
    uniformBlock(name: string, buffer: UniformBuffer): DrawCall;
    /**
     * Ranges in the vertex array to draw. Multiple arguments can be provided to set up
     *         a multi-draw. Note that after this method is called, draw counts will no longer
     *         automatically be pulled from the VertexArray.
     * @param counts - Variable number of 2 or 3 element arrays, each containing:
     *             <ul>
     *                 <li> (Number) Number of elements to skip at the start of the array.
     *                 <li> (Number) Number of elements to draw.
     *                 <li> (Number - optional) Number of instances to draw of the given range.
     *             </ul>
     * @returns The DrawCall object.
     */
    drawRanges(...counts: any[][]): DrawCall;
    /**
     * Draw based on current state.
     * @returns The DrawCall object.
     */
    draw(): DrawCall;
    /**
     * The WebGL context.
    */
    gl: WebGLRenderingContext;
    /**
     * The program to use for this draw call.
    */
    currentProgram: Program;
    /**
     * Vertex array to use for this draw call.
    */
    currentVertexArray: VertexArray;
    /**
     * Transform feedback to use for this draw call.
    */
    currentTransformFeedback: TransformFeedback;
    /**
     * Ordered list of active uniform buffers.
    */
    uniformBuffers: any[];
    /**
     * Ordered list of uniform block names.
    */
    uniformBlockNames: any[];
    /**
     * Number of active uniform blocks for this draw call.
    */
    uniformBlockCount: number;
    /**
     * Map of uniform names to indices in the uniform arrays.
    */
    uniformIndices: any;
    /**
     * Ordered list of uniform names.
    */
    uniformNames: any[];
    /**
     * Ordered list of uniform values.
    */
    uniformValue: any[];
    /**
     * The number of active uniforms for this draw call.
    */
    uniformCount: number;
    /**
     * Array of active textures.
    */
    textures: any[];
    /**
     * The number of active textures for this draw call.
    */
    textureCount: number;
    /**
     * Tracked GL state.
    */
    appState: any;
    /**
     * The number of element to draw.
    */
    numElements: GLsizei;
    /**
     * The number of instances to draw.
    */
    numInstances: GLsizei;
}

/**
 * Offscreen drawing surface.
 * @property gl - The WebGL context.
 * @property framebuffer - Handle to the framebuffer.
 * @property width - Framebuffer width.
 * @property height - Framebuffer height.
 * @property colorAttachments - Array of color attachments.
 * @property depthAttachment - Depth attachment.
 * @property appState - Tracked GL state.
 */
export class Framebuffer {
    /**
     * Restore framebuffer after context loss.
     * @returns The Framebuffer object.
     */
    restore(): Framebuffer;
    /**
     * Attach a color target to this framebuffer.
     * @param index - Color attachment index.
     * @param attachment - The texture, cubemap or renderbuffer to attach.
     * @param [target] - The texture target or layer to attach. If the texture is 3D or a texture array,
     *             defaults to 0, otherwise to TEXTURE_2D. Ignored for renderbuffers.
     * @returns The Framebuffer object.
     */
    colorTarget(index: number, attachment: Texture | Cubemap | Renderbuffer, target?: GLenum): Framebuffer;
    /**
     * Attach a depth target to this framebuffer.
     * @param texture - The texture, cubemap or renderbuffer to attach.
     * @param [target] - The texture target or layer to attach. If the texture is 3D or a texture array or renderbuffer,
     *             defaults to 0, otherwise to TEXTURE_2D. Ignored for renderbuffers.
     * @returns The Framebuffer object.
     */
    depthTarget(texture: Texture | Cubemap | Renderbuffer, target?: GLenum): Framebuffer;
    /**
     * Resize all attachments.
     * @param [width = app.width] - New width of the framebuffer.
     * @param [height = app.height] - New height of the framebuffer.
     * @returns The Framebuffer object.
     */
    resize(width?: number, height?: number): Framebuffer;
    /**
     * Delete this framebuffer.
     * @returns The Framebuffer object.
     */
    delete(): Framebuffer;
    /**
     * Get the current status of this framebuffer.
     * @returns The current status of this framebuffer.
     */
    getStatus(): GLenum;
    /**
     * The WebGL context.
    */
    gl: WebGLRenderingContext;
    /**
     * Handle to the framebuffer.
    */
    framebuffer: WebGLFramebuffer;
    /**
     * Framebuffer width.
    */
    width: number;
    /**
     * Framebuffer height.
    */
    height: number;
    /**
     * Array of color attachments.
    */
    colorAttachments: any[];
    /**
     * Depth attachment.
    */
    depthAttachment: Texture | Renderbuffer;
    /**
     * Tracked GL state.
    */
    appState: any;
}

/**
 * Global PicoGL module. For convenience, all WebGL enums are stored
 *     as properties of PicoGL (e.g. PicoGL.FLOAT, PicoGL.ONE_MINUS_SRC_ALPHA).
 */
export namespace PicoGL {
    /**
     * Create a PicoGL app. The app is the primary entry point to PicoGL. It stores
     *         the canvas, the WebGL context and all WebGL state.
     * @param canvas - The canvas on which to create the WebGL context.
     * @param [contextAttributes] - Context attributes to pass when calling getContext().
     * @returns New App object.
     */
    function createApp(canvas: DOMElement, contextAttributes?: any): App;
}

/**
 * WebGL program consisting of compiled and linked vertex and fragment
 *     shaders.
 * @property gl - The WebGL context.
 * @property program - The WebGL program.
 * @property transformFeedbackVaryings - Names of transform feedback varyings, if any.
 * @property attributeLocations - Map of user-provided attribute names to indices, if any.
 * @property uniforms - Map of uniform names to handles.
 * @property appState - Tracked GL state.
 */
export class Program {
    /**
     * Restore program after context loss. Note that this
     *         will stall for completion. <b>App.restorePrograms</b>
     *         is the preferred method for program restoration as
     *         it will parallelize compilation where available.
     * @returns The Program object.
     */
    restore(): Program;
    /**
     * Get the vertex shader source translated for the platform's API.
     * @returns The translated vertex shader source.
     */
    translatedVertexSource(): string;
    /**
     * Get the fragment shader source translated for the platform's API.
     * @returns The translated fragment shader source.
     */
    translatedFragmentSource(): string;
    /**
     * Delete this program.
     * @returns The Program object.
     */
    delete(): Program;
    /**
     * The WebGL context.
    */
    gl: WebGLRenderingContext;
    /**
     * The WebGL program.
    */
    program: WebGLProgram;
    /**
     * Names of transform feedback varyings, if any.
    */
    transformFeedbackVaryings: any[];
    /**
     * Map of user-provided attribute names to indices, if any.
    */
    attributeLocations: {
        [key: string]: number;
    };
    /**
     * Map of uniform names to handles.
    */
    uniforms: any;
    /**
     * Tracked GL state.
    */
    appState: any;
}

/**
 * Generic query object.
 * @property gl - The WebGL context.
 * @property query - Query object.
 * @property target - The type of information being queried.
 * @property active - Whether or not a query is currently in progress.
 * @property result - The result of the query (only available after a call to ready() returns true).
 */
export class Query {
    /**
     * Restore query after context loss.
     * @returns The Query object.
     */
    restore(): Query;
    /**
     * Begin a query.
     * @returns The Query object.
     */
    begin(): Query;
    /**
     * End a query.
     * @returns The Query object.
     */
    end(): Query;
    /**
     * Check if query result is available.
     * @returns If results are available.
     */
    ready(): boolean;
    /**
     * Delete this query.
     * @returns The Query object.
     */
    delete(): Query;
    /**
     * The WebGL context.
    */
    gl: WebGLRenderingContext;
    /**
     * Query object.
    */
    query: WebGLQuery;
    /**
     * The type of information being queried.
    */
    target: GLenum;
    /**
     * Whether or not a query is currently in progress.
    */
    active: boolean;
    /**
     * The result of the query (only available after a call to ready() returns true).
    */
    result: any;
}

/**
 * Offscreen drawing attachment.
 * @property gl - The WebGL context.
 * @property renderbuffer - Handle to the renderbuffer.
 * @property width - Renderbuffer width.
 * @property height - Renderbuffer height.
 * @property internalFormat - Internal arrangement of the renderbuffer data.
 * @property samples - Number of MSAA samples.
 */
export class Renderbuffer {
    /**
     * Restore renderbuffer after context loss.
     * @returns The Renderbuffer object.
     */
    restore(): Renderbuffer;
    /**
     * Resize the renderbuffer.
     * @param width - New width of the renderbuffer.
     * @param height - New height of the renderbuffer.
     * @returns The Renderbuffer object.
     */
    resize(width: number, height: number): Renderbuffer;
    /**
     * Delete this renderbuffer.
     * @returns The Renderbuffer object.
     */
    delete(): Renderbuffer;
    /**
     * The WebGL context.
    */
    gl: WebGLRenderingContext;
    /**
     * Handle to the renderbuffer.
    */
    renderbuffer: WebGLRenderbuffer;
    /**
     * Renderbuffer width.
    */
    width: number;
    /**
     * Renderbuffer height.
    */
    height: number;
    /**
     * Internal arrangement of the renderbuffer data.
    */
    internalFormat: GLenum;
    /**
     * Number of MSAA samples.
    */
    samples: number;
}

/**
 * WebGL shader.
 * @property gl - The WebGL context.
 * @property shader - The shader.
 */
export class Shader {
    /**
     * Restore shader after context loss.
     * @returns The Shader object.
     */
    restore(): Shader;
    /**
     * Get the shader source translated for the platform's API.
     * @returns The translated shader source.
     */
    translatedSource(): string;
    /**
     * Delete this shader.
     * @returns The Shader object.
     */
    delete(): Shader;
    /**
     * The WebGL context.
    */
    gl: WebGLRenderingContext;
    /**
     * The shader.
    */
    shader: WebGLShader;
}

/**
 * General-purpose texture.
 * @property gl - The WebGL context.
 * @property texture - Handle to the texture.
 * @property width - Texture width.
 * @property height - Texture height.
 * @property depth - Texture depth.
 * @property binding - Binding point for the texture.
 * @property type - Type of data stored in the texture.
 * @property format - Layout of texture data.
 * @property internalFormat - Internal arrangement of the texture data.
 * @property currentUnit - The current texture unit this texture is bound to.
 * @property is3D - Whether this texture contains 3D data.
 * @property flipY - Whether the y-axis is flipped for this texture.
 * @property premultiplyAlpha - Whether alpha should be pre-multiplied when loading this texture.
 * @property mipmaps - Whether this texture is using mipmap filtering
 *         (and thus should have a complete mipmap chain).
 * @property appState - Tracked GL state.
 */
export class Texture {
    /**
     * Restore texture after context loss.
     * @param [image] - Image data. An array can be passed to manually set all levels
     *             of the mipmap chain. If a single level is passed and mipmap filtering is being used,
     *             generateMipmap() will be called to produce the remaining levels.
     * @returns The Texture object.
     */
    restore(image?: DOMElement | ArrayBufferView | any[]): Texture;
    /**
     * Re-allocate texture storage.
     * @param width - Image width.
     * @param height - Image height.
     * @param [depth] - Image depth or number of images. Required when passing 3D or texture array data.
     * @returns The Texture object.
     */
    resize(width: number, height: number, depth?: number): Texture;
    /**
     * Set the image data for the texture. An array can be passed to manually set all levels
     *         of the mipmap chain. If a single level is passed and mipmap filtering is being used,
     *         generateMipmap() will be called to produce the remaining levels.
     *         NOTE: the data must fit the currently-allocated storage!
     * @param data - Image data. If an array is passed, it will be
     *             used to set mip map levels.
     * @returns The Texture object.
     */
    data(data: HTMLImageElement | ArrayBufferView | any[]): Texture;
    /**
     * Delete this texture.
     * @returns The Texture object.
     */
    delete(): Texture;
    /**
     * The WebGL context.
    */
    gl: WebGLRenderingContext;
    /**
     * Handle to the texture.
    */
    texture: WebGLTexture;
    /**
     * Texture width.
    */
    width: number;
    /**
     * Texture height.
    */
    height: number;
    /**
     * Texture depth.
    */
    depth: number;
    /**
     * Binding point for the texture.
    */
    binding: GLenum;
    /**
     * Type of data stored in the texture.
    */
    type: GLenum;
    /**
     * Layout of texture data.
    */
    format: GLenum;
    /**
     * Internal arrangement of the texture data.
    */
    internalFormat: GLenum;
    /**
     * The current texture unit this texture is bound to.
    */
    currentUnit: number;
    /**
     * Whether this texture contains 3D data.
    */
    is3D: boolean;
    /**
     * Whether the y-axis is flipped for this texture.
    */
    flipY: boolean;
    /**
     * Whether alpha should be pre-multiplied when loading this texture.
    */
    premultiplyAlpha: boolean;
    /**
     * Whether this texture is using mipmap filtering
            (and thus should have a complete mipmap chain).
    */
    mipmaps: boolean;
    /**
     * Tracked GL state.
    */
    appState: any;
}

/**
 * Rendering timer.
 * @property gl - The WebGL context.
 * @property cpuTimer - Timer for CPU. Will be window.performance, if available, or window.Date.
 * @property gpuTimerQuery - Timer query object for GPU (if gpu timing is supported).
 * @property gpuTimerQueryInProgress - Whether a gpu timer query is currently in progress.
 * @property cpuStartTime - When the last CPU timing started.
 * @property cpuTime - Time spent on CPU during last timing. Only valid if ready() returns true.
 * @property gpuTime - Time spent on GPU during last timing. Only valid if ready() returns true.
 *             Will remain 0 if extension EXT_disjoint_timer_query_webgl2 is unavailable.
 */
export class Timer {
    /**
     * Restore timer after context loss.
     * @returns The Timer object.
     */
    restore(): Timer;
    /**
     * Start timing.
     * @returns The Timer object.
     */
    start(): Timer;
    /**
     * Stop timing.
     * @returns The Timer object.
     */
    end(): Timer;
    /**
     * Check if timing results are available. If
     *         this method returns true, the cpuTime and
     *         gpuTime properties will be set to valid
     *         values.
     * @returns If results are available.
     */
    ready(): boolean;
    /**
     * Delete this timer.
     * @returns The Timer object.
     */
    delete(): Timer;
    /**
     * The WebGL context.
    */
    gl: WebGLRenderingContext;
    /**
     * Timer for CPU. Will be window.performance, if available, or window.Date.
    */
    cpuTimer: any;
    /**
     * Timer query object for GPU (if gpu timing is supported).
    */
    gpuTimerQuery: WebGLQuery;
    /**
     * Whether a gpu timer query is currently in progress.
    */
    gpuTimerQueryInProgress: boolean;
    /**
     * When the last CPU timing started.
    */
    cpuStartTime: number;
    /**
     * Time spent on CPU during last timing. Only valid if ready() returns true.
    */
    cpuTime: number;
    /**
     * Time spent on GPU during last timing. Only valid if ready() returns true.
                Will remain 0 if extension EXT_disjoint_timer_query_webgl2 is unavailable.
    */
    gpuTime: number;
}

/**
 * Tranform feedback object.
 * @property gl - The WebGL context.
 * @property transformFeedback - Transform feedback object.
 * @property appState - Tracked GL state.
 */
export class TransformFeedback {
    /**
     * Restore transform feedback after context loss.
     * @returns The TransformFeedback object.
     */
    restore(): TransformFeedback;
    /**
     * Bind a feedback buffer to capture transform output.
     * @param index - Index of transform feedback varying to capture.
     * @param buffer - Buffer to record output into.
     * @returns The TransformFeedback object.
     */
    feedbackBuffer(index: number, buffer: VertexBuffer): TransformFeedback;
    /**
     * Delete this transform feedback.
     * @returns The TransformFeedback object.
     */
    delete(): TransformFeedback;
    /**
     * The WebGL context.
    */
    gl: WebGLRenderingContext;
    /**
     * Transform feedback object.
    */
    transformFeedback: WebGLTransformFeedback;
    /**
     * Tracked GL state.
    */
    appState: any;
}

/**
 * Storage for uniform data. Data is stored in std140 layout.
 * @property gl - The WebGL context.
 * @property buffer - Allocated buffer storage.
 * @property data - Buffer data.
 * @property dataViews - Map of base data types to matching ArrayBufferViews of the buffer data.
 * @property offsets - Offsets into the array for each item in the buffer.
 * @property sizes - Size of the item at the given offset.
 * @property types - The base type of the item at the given offset (FLOAT, INT or UNSIGNED_INT).
 * @property size - The size of the buffer (in 4-byte items).
 * @property usage - Usage pattern of the buffer.
 */
export class UniformBuffer {
    /**
     * Restore uniform buffer after context loss.
     * @returns The UniformBuffer object.
     */
    restore(): UniformBuffer;
    /**
     * Update data for a given item in the buffer. NOTE: Data is not
     *         sent the the GPU until the update() method is called!
     * @param index - Index in the layout of item to set.
     * @param value - Value to store at the layout location.
     * @returns The UniformBuffer object.
     */
    set(index: number, value: ArrayBufferView): UniformBuffer;
    /**
     * Send stored buffer data to the GPU.
     * @returns The UniformBuffer object.
     */
    update(): UniformBuffer;
    /**
     * Delete this uniform buffer.
     * @returns The UniformBuffer object.
     */
    delete(): UniformBuffer;
    /**
     * The WebGL context.
    */
    gl: WebGLRenderingContext;
    /**
     * Allocated buffer storage.
    */
    buffer: WebGLBuffer;
    /**
     * Buffer data.
    */
    data: Float32Array;
    /**
     * Map of base data types to matching ArrayBufferViews of the buffer data.
    */
    dataViews: any;
    /**
     * Offsets into the array for each item in the buffer.
    */
    offsets: any[];
    /**
     * Size of the item at the given offset.
    */
    sizes: any[];
    /**
     * The base type of the item at the given offset (FLOAT, INT or UNSIGNED_INT).
    */
    types: any[];
    /**
     * The size of the buffer (in 4-byte items).
    */
    size: number;
    /**
     * Usage pattern of the buffer.
    */
    usage: GLenum;
}

/**
 * Organizes vertex buffer and attribute state.
 * @property gl - The WebGL context.
 * @property vertexArray - Vertex array object.
 * @property numElements - Number of elements in the vertex array.
 * @property indexed - Whether this vertex array is set up for indexed drawing.
 * @property indexType - Data type of the indices.
 * @property numInstances - Number of instances to draw with this vertex array.
 * @property appState - Tracked GL state.
 */
export class VertexArray {
    /**
     * Restore vertex array after context loss.
     * @returns The VertexArray object.
     */
    restore(): VertexArray;
    /**
     * Bind an per-vertex attribute buffer to this vertex array.
     * @param attributeIndex - The attribute location to bind to.
     * @param vertexBuffer - The VertexBuffer to bind.
     * @param [options] - Attribute pointer options. These will override those provided in the
     *             VertexBuffer.
     * @param [options.type] - Type of data stored in the buffer.
     * @param [options.size] - Number of components per vertex.
     * @param [options.stride] - Number of bytes between the start of data for each vertex.
     * @param [options.offset] - Number of bytes before the start of data for the first vertex.
     * @param [options.normalized] - Data is integer data that should be normalized to a float.
     * @param [options.integer] - Pass data as integers.
     * @returns The VertexArray object.
     */
    vertexAttributeBuffer(attributeIndex: number, vertexBuffer: VertexBuffer, options?: {
        type?: GLenum;
        size?: GLenum;
        stride?: GLenum;
        offset?: GLenum;
        normalized?: GLenum;
        integer?: GLenum;
    }): VertexArray;
    /**
     * Bind an per-instance attribute buffer to this vertex array.
     * @param attributeIndex - The attribute location to bind to.
     * @param vertexBuffer - The VertexBuffer to bind.
     * @param [options] - Attribute pointer options. These will override those provided in the
     *             VertexBuffer.
     * @param [options.type] - Type of data stored in the buffer.
     * @param [options.size] - Number of components per vertex.
     * @param [options.stride] - Number of bytes between the start of data for each vertex.
     * @param [options.offset] - Number of bytes before the start of data for the first vertex.
     * @param [options.normalized] - Data is integer data that should be normalized to a float.
     * @param [options.integer] - Pass data as integers.
     * @returns The VertexArray object.
     */
    instanceAttributeBuffer(attributeIndex: number, vertexBuffer: VertexBuffer, options?: {
        type?: GLenum;
        size?: GLenum;
        stride?: GLenum;
        offset?: GLenum;
        normalized?: GLenum;
        integer?: GLenum;
    }): VertexArray;
    /**
     * Bind an index buffer to this vertex array.
     * @param vertexBuffer - The VertexBuffer to bind.
     * @returns The VertexArray object.
     */
    indexBuffer(vertexBuffer: VertexBuffer): VertexArray;
    /**
     * Delete this vertex array.
     * @returns The VertexArray object.
     */
    delete(): VertexArray;
    /**
     * The WebGL context.
    */
    gl: WebGLRenderingContext;
    /**
     * Vertex array object.
    */
    vertexArray: WebGLVertexArrayObject;
    /**
     * Number of elements in the vertex array.
    */
    numElements: number;
    /**
     * Whether this vertex array is set up for indexed drawing.
    */
    indexed: boolean;
    /**
     * Data type of the indices.
    */
    indexType: GLenum;
    /**
     * Number of instances to draw with this vertex array.
    */
    numInstances: number;
    /**
     * Tracked GL state.
    */
    appState: any;
}

/**
 * Storage for vertex data.
 * @property gl - The WebGL context.
 * @property buffer - Allocated buffer storage.
 * @property type - The type of data stored in the buffer.
 * @property itemSize - Number of array elements per vertex.
 * @property numItems - Number of vertices represented.
 * @property usage - The usage pattern of the buffer.
 * @property indexArray - Whether this is an index array.
 * @property binding - GL binding point (ARRAY_BUFFER or ELEMENT_ARRAY_BUFFER).
 * @property appState - Tracked GL state.
 */
export class VertexBuffer {
    /**
     * Restore vertex buffer after context loss.
     * @param data - Buffer data itself or the total
     *             number of elements to be allocated.
     * @returns The VertexBuffer object.
     */
    restore(data: ArrayBufferView | number): VertexBuffer;
    /**
     * Update data in this buffer. NOTE: the data must fit
     *         the originally-allocated buffer!
     * @param data - Data to store in the buffer.
     * @param [offset = 0] - Byte offset into the buffer at which to start writing.
     * @returns The VertexBuffer object.
     */
    data(data: ArrayBufferView, offset?: number): VertexBuffer;
    /**
     * Delete this array buffer.
     * @returns The VertexBuffer object.
     */
    delete(): VertexBuffer;
    /**
     * The WebGL context.
    */
    gl: WebGLRenderingContext;
    /**
     * Allocated buffer storage.
    */
    buffer: WebGLBuffer;
    /**
     * The type of data stored in the buffer.
    */
    type: GLenum;
    /**
     * Number of array elements per vertex.
    */
    itemSize: number;
    /**
     * Number of vertices represented.
    */
    numItems: number;
    /**
     * The usage pattern of the buffer.
    */
    usage: GLenum;
    /**
     * Whether this is an index array.
    */
    indexArray: boolean;
    /**
     * GL binding point (ARRAY_BUFFER or ELEMENT_ARRAY_BUFFER).
    */
    binding: GLenum;
    /**
     * Tracked GL state.
    */
    appState: any;
}

