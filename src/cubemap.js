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

import * as CONSTANTS from "./constants.js";
import { TEXTURE_FORMAT_DEFAULTS } from "./texture-format-defaults.js";

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
export class Cubemap {

    constructor(gl, appState, options) {
        let negX = options.negX;
        let posX = options.posX;
        let negY = options.negY;
        let posY = options.posY;
        let negZ = options.negZ;
        let posZ = options.posZ;

        let defaultMinFilter = negX ? gl.LINEAR_MIPMAP_NEAREST : gl.NEAREST;
        let defaultMagFilter = negX ? gl.LINEAR : gl.NEAREST;
        let defaultType = options.format === CONSTANTS.DEPTH_COMPONENT ? CONSTANTS.UNSIGNED_SHORT : CONSTANTS.UNSIGNED_BYTE;

        this.gl = gl;
        this.texture = gl.createTexture();
        this.format = options.format !== undefined ? options.format : gl.RGBA;
        this.type = options.type !== undefined ? options.type : defaultType;
        this.internalFormat = options.internalFormat !== undefined ? options.internalFormat : TEXTURE_FORMAT_DEFAULTS[this.type][this.format];
        this.appState = appState;
        
        // -1 indicates unbound
        this.currentUnit = -1;

        let width = options.width || negX.width;
        let height = options.height || negX.height;
        let flipY = options.flipY !== undefined ? options.flipY : false;
        let minFilter = options.minFilter !== undefined ? options.minFilter : defaultMinFilter;
        let magFilter = options.magFilter !== undefined ? options.magFilter : defaultMagFilter;
        let wrapS = options.wrapS !== undefined ? options.wrapS : gl.REPEAT;
        let wrapT = options.wrapT !== undefined ? options.wrapT : gl.REPEAT;
        let compareMode = options.compareMode !== undefined ? options.compareMode : gl.NONE;
        let compareFunc = options.compareFunc !== undefined ? options.compareFunc : gl.LEQUAL;
        let generateMipmaps = negX && options.generateMipmaps !== false &&
                            (minFilter === gl.LINEAR_MIPMAP_NEAREST || minFilter === gl.LINEAR_MIPMAP_LINEAR);

        this.bind(0);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, magFilter);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, minFilter);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, wrapS);
        gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, wrapT);
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

        if (negX) {
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


    }

    /**
        Delete this cubemap.

        @method
    */
    delete() {
        if (this.texture) {
            this.gl.deleteTexture(this.texture);
            this.texture = null;
            this.appState.textures[this.currentUnit] = null;
            this.currentUnit = -1;
        }
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

            this.gl.activeTexture(this.gl.TEXTURE0 + unit);
            this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP, this.texture);

            this.appState.textures[unit] = this;
            this.currentUnit = unit;
        }

        return this;
    }

}
