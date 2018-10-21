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
class Cubemap {

    constructor(gl, appState, options) {
        let { negX, posX, negY, posY, negZ, posZ } = options;

        let defaultType = options.format === CONSTANTS.DEPTH_COMPONENT ? CONSTANTS.UNSIGNED_SHORT : CONSTANTS.UNSIGNED_BYTE;

        this.gl = gl;
        this.texture = null;
        this.format = options.format !== undefined ? options.format : gl.RGBA;
        this.type = options.type !== undefined ? options.type : defaultType;
        this.internalFormat = options.internalFormat !== undefined ? options.internalFormat : TEXTURE_FORMAT_DEFAULTS[this.type][this.format];
        this.appState = appState;
        
        // -1 indicates unbound
        this.currentUnit = -1;

        let {
            width = negX.width,
            height = negX.height,
            flipY = false,
            minFilter = negX ? gl.LINEAR_MIPMAP_NEAREST : gl.NEAREST,
            magFilter = negX ? gl.LINEAR : gl.NEAREST,
            wrapS = gl.REPEAT,
            wrapT = gl.REPEAT,
            compareMode = gl.NONE,
            compareFunc = gl.LEQUAL,
            minLOD = null,
            maxLOD = null,
            baseLevel = null,
            maxLevel = null,
        } = options;
        
        this.width = width;
        this.height = height;
        this.flipY = flipY;
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
        this.mipmaps = (minFilter === gl.LINEAR_MIPMAP_NEAREST || minFilter === gl.LINEAR_MIPMAP_LINEAR);
        this.levels = this.mipmaps ? Math.floor(Math.log2(Math.min(this.width, this.height))) + 1 : 1;

        this.restore(options);
    }

    restore(options = CONSTANTS.DUMMY_OBJECT) {
        this.texture = this.gl.createTexture();

        this.bind(0);
        this.gl.pixelStorei(CONSTANTS.UNPACK_FLIP_Y_WEBGL, this.flipY);
        this.gl.texParameteri(CONSTANTS.TEXTURE_CUBE_MAP, CONSTANTS.TEXTURE_MAG_FILTER, this.magFilter);
        this.gl.texParameteri(CONSTANTS.TEXTURE_CUBE_MAP, CONSTANTS.TEXTURE_MIN_FILTER, this.minFilter);
        this.gl.texParameteri(CONSTANTS.TEXTURE_CUBE_MAP, CONSTANTS.TEXTURE_WRAP_S, this.wrapS);
        this.gl.texParameteri(CONSTANTS.TEXTURE_CUBE_MAP, CONSTANTS.TEXTURE_WRAP_T, this.wrapT);
        this.gl.texParameteri(CONSTANTS.TEXTURE_CUBE_MAP, CONSTANTS.TEXTURE_COMPARE_FUNC, this.compareFunc);
        this.gl.texParameteri(CONSTANTS.TEXTURE_CUBE_MAP, CONSTANTS.TEXTURE_COMPARE_MODE, this.compareMode);
        if (this.baseLevel !== null) {
            this.gl.texParameteri(CONSTANTS.TEXTURE_CUBE_MAP, CONSTANTS.TEXTURE_BASE_LEVEL, this.baseLevel);
        }
        if (this.maxLevel !== null) {
            this.gl.texParameteri(CONSTANTS.TEXTURE_CUBE_MAP, CONSTANTS.TEXTURE_MAX_LEVEL, this.maxLevel);
        }
        if (this.minLOD !== null) {
            this.gl.texParameteri(CONSTANTS.TEXTURE_CUBE_MAP, CONSTANTS.TEXTURE_MIN_LOD, this.minLOD);
        }
        if (this.maxLOD !== null) {
            this.gl.texParameteri(CONSTANTS.TEXTURE_CUBE_MAP, CONSTANTS.TEXTURE_MAX_LOD, this.maxLOD);
        }

        this.gl.texStorage2D(CONSTANTS.TEXTURE_CUBE_MAP, this.levels, this.internalFormat, this.width, this.height);

        let { negX, posX, negY, posY, negZ, posZ } = options;

        if (negX) {
            this.gl.texSubImage2D(CONSTANTS.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, 0, 0, this.width, this.height, this.format, this.type, negX);
            this.gl.texSubImage2D(CONSTANTS.TEXTURE_CUBE_MAP_POSITIVE_X, 0, 0, 0, this.width, this.height, this.format, this.type, posX);
            this.gl.texSubImage2D(CONSTANTS.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, 0, 0, this.width, this.height, this.format, this.type, negY);
            this.gl.texSubImage2D(CONSTANTS.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, 0, 0, this.width, this.height, this.format, this.type, posY);
            this.gl.texSubImage2D(CONSTANTS.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, 0, 0, this.width, this.height, this.format, this.type, negZ);
            this.gl.texSubImage2D(CONSTANTS.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, 0, 0, this.width, this.height, this.format, this.type, posZ);
        }

        if (this.mipmaps) {
            this.gl.generateMipmap(CONSTANTS.TEXTURE_CUBE_MAP);
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

    /**
        Bind this cubemap to a texture unit.

        @method
        @ignore
        @return {Cubemap} The Cubemap object.
    */
    bind(unit) {
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
    }

}

module.exports = Cubemap;
