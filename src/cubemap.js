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

import { 
    GL,
    WEBGL_INFO,
    TEXTURE_FORMATS,
    COMPRESSED_TEXTURE_TYPES,
    DUMMY_OBJECT,
    DUMMY_UNIT_ARRAY,
    // DEPRECATED
    TEXTURE_FORMAT_DEFAULTS
} from "./constants.js";

/**
    Cubemap for environment mapping.

    @class
    @prop {WebGLRenderingContext} gl The WebGL context.
    @prop {WebGLTexture} texture Handle to the texture.
    @prop {GLEnum} type Type of data stored in the texture.
    @prop {GLEnum} format Layout of texture data.
    @prop {GLEnum} internalFormat Internal arrangement of the texture data.
    @prop {Number} currentUnit The current texture unit this cubemap is bound to.
    @prop {boolean} flipY Whether the y-axis is flipped for this cubemap.
    @prop {boolean} premultiplyAlpha Whether alpha should be pre-multiplied when loading this cubemap.
    @prop {Object} appState Tracked GL state.
*/
export class Cubemap {

    constructor(gl, appState, options) {

        this.gl = gl;
        this.texture = null;
        this.appState = appState;

        this.compressed = COMPRESSED_TEXTURE_TYPES[options.internalFormat];
        
        if (options.format !== undefined) {
            console.warn("Cubemap option 'format' is deprecated and will be removed. Use 'internalFormat' with a sized format instead.");
            this.compressed = Boolean(COMPRESSED_TEXTURE_TYPES[options.format]);
            if (options.type === undefined) {
                options.type = options.format === GL.DEPTH_COMPONENT ? GL.UNSIGNED_SHORT : GL.UNSIGNED_BYTE;
            }
            if (options.internalFormat === undefined) {
                if (this.compressed) {
                    options.internalFormat = options.format;
                } else {
                    options.internalFormat = TEXTURE_FORMAT_DEFAULTS[options.type][options.format];
                }
            }
        }

        if (this.compressed) {
            // For compressed textures, just need to provide one of format, internalFormat.
            // The other will be the same.
            this.internalFormat = options.internalFormat;
            this.format = options.internalFormat;
            this.type = GL.UNSIGNED_BYTE;
        } else {
            this.internalFormat = options.internalFormat !== undefined ? options.internalFormat : GL.RGBA8;

            let formatInfo = TEXTURE_FORMATS[this.internalFormat];
            this.format = formatInfo[0];
            this.type = options.type !== undefined ? options.type : formatInfo[1];
        }
        
        // -1 indicates unbound
        this.currentUnit = -1;

        let arrayData = Array.isArray(options.negX);
        let negX = arrayData ? options.negX[0] : options.negX;

        let {
            width = negX.width,
            height = negX.height,
            flipY = false,
            premultiplyAlpha = false,
            minFilter = negX ? GL.LINEAR_MIPMAP_NEAREST : GL.NEAREST,
            magFilter = negX ? GL.LINEAR : GL.NEAREST,
            wrapS = GL.REPEAT,
            wrapT = GL.REPEAT,
            compareMode = GL.NONE,
            compareFunc = GL.LEQUAL,
            minLOD = null,
            maxLOD = null,
            baseLevel = null,
            maxLevel = null,
            maxAnisotropy = 1
        } = options;
        
        this.width = width;
        this.height = height;
        this.flipY = flipY;
        this.premultiplyAlpha = premultiplyAlpha;
        this.minFilter = minFilter;
        this.magFilter = magFilter;
        this.wrapS = wrapS;
        this.wrapT = wrapT;
        this.compareMode = compareMode;
        this.compareFunc = compareFunc;
        this.minLOD = minLOD;
        this.maxLOD = maxLOD;
        this.baseLevel = baseLevel;
        this.maxLevel = maxLevel;
        this.maxAnisotropy = Math.min(maxAnisotropy, WEBGL_INFO.MAX_TEXTURE_ANISOTROPY);
        this.mipmaps = (minFilter === GL.LINEAR_MIPMAP_NEAREST || minFilter === GL.LINEAR_MIPMAP_LINEAR);
        this.miplevelsProvided = arrayData && options.negX.length > 1;
        this.levels = this.mipmaps ? Math.floor(Math.log2(Math.min(this.width, this.height))) + 1 : 1;

        this.restore(options);
    }

    /**
        Restore cubemap after context loss.

        @method
        @param {Object} [options] Texture options.
        @param {DOMElement|ArrayBufferView} [options.negX] The image data for the negative X direction.
                Can be any format that would be accepted by texImage2D.
        @param {DOMElement|ArrayBufferView} [options.posX] The image data for the positive X direction.
                Can be any format that would be accepted by texImage2D.
        @param {DOMElement|ArrayBufferView} [options.negY] The image data for the negative Y direction.
                Can be any format that would be accepted by texImage2D.
        @param {DOMElement|ArrayBufferView} [options.posY] The image data for the positive Y direction.
                Can be any format that would be accepted by texImage2D.
        @param {DOMElement|ArrayBufferView} [options.negZ] The image data for the negative Z direction.
                Can be any format that would be accepted by texImage2D.
        @param {DOMElement|ArrayBufferView} [options.posZ] The image data for the positive Z direction.
                Can be any format that would be accepted by texImage2D.
        @return {Cubemap} The Cubemap object.
    */
    restore(options = DUMMY_OBJECT) {
        this.texture = this.gl.createTexture();

        if (this.currentUnit !== -1) {
            this.appState.textures[this.currentUnit] = null;
        }

        this.bind(0);
        this.gl.pixelStorei(GL.UNPACK_FLIP_Y_WEBGL, this.flipY);
        this.gl.pixelStorei(GL.UNPACK_PREMULTIPLY_ALPHA_WEBGL, this.premultiplyAlpha);
        this.gl.texParameteri(GL.TEXTURE_CUBE_MAP, GL.TEXTURE_MAG_FILTER, this.magFilter);
        this.gl.texParameteri(GL.TEXTURE_CUBE_MAP, GL.TEXTURE_MIN_FILTER, this.minFilter);
        this.gl.texParameteri(GL.TEXTURE_CUBE_MAP, GL.TEXTURE_WRAP_S, this.wrapS);
        this.gl.texParameteri(GL.TEXTURE_CUBE_MAP, GL.TEXTURE_WRAP_T, this.wrapT);
        this.gl.texParameteri(GL.TEXTURE_CUBE_MAP, GL.TEXTURE_COMPARE_FUNC, this.compareFunc);
        this.gl.texParameteri(GL.TEXTURE_CUBE_MAP, GL.TEXTURE_COMPARE_MODE, this.compareMode);
        
        if (this.baseLevel !== null) {
            this.gl.texParameteri(GL.TEXTURE_CUBE_MAP, GL.TEXTURE_BASE_LEVEL, this.baseLevel);
        }
        
        if (this.maxLevel !== null) {
            this.gl.texParameteri(GL.TEXTURE_CUBE_MAP, GL.TEXTURE_MAX_LEVEL, this.maxLevel);
        }
        
        if (this.minLOD !== null) {
            this.gl.texParameteri(GL.TEXTURE_CUBE_MAP, GL.TEXTURE_MIN_LOD, this.minLOD);
        }
        
        if (this.maxLOD !== null) {
            this.gl.texParameteri(GL.TEXTURE_CUBE_MAP, GL.TEXTURE_MAX_LOD, this.maxLOD);
        }

        if (this.maxAnisotropy > 1) {
            this.gl.texParameteri(GL.TEXTURE_CUBE_MAP, GL.TEXTURE_MAX_ANISOTROPY_EXT, this.maxAnisotropy);
        }

        this.gl.texStorage2D(GL.TEXTURE_CUBE_MAP, this.levels, this.internalFormat, this.width, this.height);

        let { negX, posX, negY, posY, negZ, posZ } = options;

        if (negX) {
            this.faceData(GL.TEXTURE_CUBE_MAP_NEGATIVE_X, negX);
            this.faceData(GL.TEXTURE_CUBE_MAP_POSITIVE_X, posX);
            this.faceData(GL.TEXTURE_CUBE_MAP_NEGATIVE_Y, negY);
            this.faceData(GL.TEXTURE_CUBE_MAP_POSITIVE_Y, posY);
            this.faceData(GL.TEXTURE_CUBE_MAP_NEGATIVE_Z, negZ);
            this.faceData(GL.TEXTURE_CUBE_MAP_POSITIVE_Z, posZ);
        }

        if (this.mipmaps && !this.miplevelsProvided) {
            this.gl.generateMipmap(GL.TEXTURE_CUBE_MAP);
        }

        return this;
    }

    /**
        Delete this cubemap.

        @method
        @return {Cubemap} The Cubemap object.
    */
    delete() {
        if (this.texture) {
            this.gl.deleteTexture(this.texture);
            this.texture = null;
            this.appState.textures[this.currentUnit] = null;
            this.currentUnit = -1;
        }

        return this;
    }

    // Input data for one cubemap face.
    faceData(face, data) {
        if (!Array.isArray(data)) {
            DUMMY_UNIT_ARRAY[0] = data;
            data = DUMMY_UNIT_ARRAY;
        }

        let numLevels = this.mipmaps ? data.length : 1;
        let width = this.width;
        let height = this.height;
        let i;

        if (this.compressed) {
            for (i = 0; i < numLevels; ++i) {
                this.gl.compressedTexSubImage2D(face, i, 0, 0, width, height, this.format, data[i]);
                width = Math.max(width >> 1, 1);
                height = Math.max(height >> 1, 1);
            }
        } else {
            for (i = 0; i < numLevels; ++i) {
                this.gl.texSubImage2D(face, i, 0, 0, width, height, this.format, this.type, data[i]);
                width = Math.max(width >> 1, 1);
                height = Math.max(height >> 1, 1);
            }
        }

        return this;
    }

    // Bind this cubemap to a texture unit.
    bind(unit) {
        let currentTexture = this.appState.textures[unit];
        
        if (currentTexture !== this) {
            if (currentTexture) {
                currentTexture.currentUnit = -1;
            }

            if (this.currentUnit !== -1) {
                this.appState.textures[this.currentUnit] = null;
            }

            this.gl.activeTexture(GL.TEXTURE0 + unit);
            this.gl.bindTexture(GL.TEXTURE_CUBE_MAP, this.texture);

            this.appState.textures[unit] = this;
            this.currentUnit = unit;
        }

        return this;
    }

}
