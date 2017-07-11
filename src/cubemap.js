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

var PicoGL = require('./picogl');


/**
    Cubemap for environment mapping.

    @class
    @prop {WebGLRenderingContext} gl The WebGL context.
    @prop {WebGLTexture} texture Handle to the texture.
    @prop {GLEnum} type Type of data stored in the texture.
    @prop {GLEnum} format Layout of texture data.
    @prop {GLEnum} internalFormat Internal arrangement of the texture data.
    @prop {Number} unit The texture unit this texture is bound to.
    @prop {GLEnum} unitEnum The GLEnum of texture unit this texture is bound to.
    @prop {Object} appState Tracked GL state.
*/
var Cubemap = function(gl, appState, options) {
    options = options || PicoGL.DUMMY_OBJECT;

    this.gl = gl;
    this.texture = gl.createTexture();
    this.format = options.format !== undefined ? options.format : gl.RGBA;
    this.type = options.type !== undefined ? options.type : gl.UNSIGNED_BYTE;
    this.internalFormat = options.internalFormat !== undefined ? options.internalFormat : PicoGL.TEXTURE_INTERNAL_FORMAT[this.type][this.format];
    this.appState = appState;
    if (appState.freeTextureUnits.length > 0) {
        this.unit = appState.freeTextureUnits.pop();
    } else {
        /////////////////////////////////////////////////////////////////////////////////
        // TODO(Tarek):
        // Workaround for https://bugs.chromium.org/p/chromium/issues/detail?id=722288
        // Use full array when that's fixed
        /////////////////////////////////////////////////////////////////////////////////
        this.unit = appState.textureCount % (appState.textures.length - 1);
        this.unit += 1;

        ++appState.textureCount;
    }
    this.unitEnum = gl.TEXTURE0 + this.unit;

    var negX = options.negX;
    var posX = options.posX;
    var negY = options.negY;
    var posY = options.posY;
    var negZ = options.negZ;
    var posZ = options.posZ;

    var width = options.width || negX.width;
    var height = options.height || negX.height;
    var flipY = options.flipY !== undefined ? options.flipY : false;
    var minFilter = options.minFilter !== undefined ? options.minFilter : gl.LINEAR_MIPMAP_NEAREST;
    var magFilter = options.magFilter !== undefined ? options.magFilter : gl.LINEAR;
    var compareMode = options.compareMode !== undefined ? options.compareMode : gl.NONE;
    var compareFunc = options.compareFunc !== undefined ? options.compareFunc : gl.LEQUAL;
    var generateMipmaps = options.generateMipmaps !== false &&
                        (minFilter === gl.LINEAR_MIPMAP_NEAREST || minFilter === gl.LINEAR_MIPMAP_LINEAR);

    this.bind();
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

    var levels = generateMipmaps ? Math.floor(Math.log2(Math.min(width, height))) + 1 : 1;
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

};

/**
    Delete this cubemap.

    @method
*/
Cubemap.prototype.delete = function() {
    if (this.texture) {
        this.gl.deleteTexture(this.texture);
        this.texture = null;
        this.appState.freeTextureUnits.push(this.unit);
        this.appState.textures[this.unit] = null;
        this.unit = -1;
        this.unitEnum = -1;
    }
};

// Bind this cubemap to a texture unit.
Cubemap.prototype.bind = function() {
    if (this.appState.activeTexture !== this.unit) {
        this.gl.activeTexture(this.unitEnum);
        this.appState.activeTexture = this.unit;
    }
    if (this.appState.textures[this.unit] !== this) {
        this.gl.bindTexture(this.gl.TEXTURE_CUBE_MAP, this.texture);
        this.appState.textures[this.unit] = this;
    }

    return this;
};

module.exports = Cubemap;
