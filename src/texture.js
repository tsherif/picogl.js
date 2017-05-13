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

    /**
        General-purpose texture.

        @class
        @prop {WebGLRenderingContext} gl The WebGL context.
        @prop {WebGLTexture} texture Handle to the texture.
        @prop {GLEnum} binding Binding point for the texture.
        @prop {GLEnum} type Type of data stored in the texture.
        @prop {GLEnum} format Layout of texture data.
        @prop {GLEnum} internalFormat Internal arrangement of the texture data.
        @prop {boolean} is3D Whether this texture contains 3D data.
    */
    PicoGL.Texture = function Texture(gl, appState, binding, image, width, height, depth, is3D, options) {
        options = options || PicoGL.DUMMY_OBJECT;
        width = width || options.width || 0;
        height = height || options.height || 0;
        depth = depth || options.depth || 0;

        this.gl = gl;
        this.binding = binding;
        this.texture = gl.createTexture();
        this.format = options.format || gl.RGBA;
        this.type = options.type || gl.UNSIGNED_BYTE;
        this.internalFormat = options.internalFormat || PicoGL.TEXTURE_INTERNAL_FORMAT[this.type][this.format];
        this.is3D = is3D;
        this.appState = appState;
        if (appState.freeTextureUnits.length > 0) {
            this.unit = appState.freeTextureUnits.pop();
        } else {
            this.unit = appState.textureCount % appState.textures.length;
            ++appState.textureCount;
        }
        this.unitEnum = PicoGL.TEXTURE_UNIT_MAP[this.unit];

        var buffer = !image || !!image.BYTES_PER_ELEMENT;
        var flipY = options.flipY !== undefined ? options.flipY : true;
        var minFilter = options.minFilter || gl.LINEAR_MIPMAP_NEAREST;
        var magFilter = options.magFilter || gl.LINEAR;
        var wrapS = options.wrapS || gl.REPEAT;
        var wrapT = options.wrapT || gl.REPEAT;
        var wrapR = options.wrapR || gl.REPEAT;
        var compareMode = options.compareMode || gl.NONE;
        var compareFunc = options.compareFunc || gl.LEQUAL;
        var generateMipmaps = options.generateMipmaps !== false && 
                            (minFilter === gl.LINEAR_MIPMAP_NEAREST || minFilter === gl.LINEAR_MIPMAP_LINEAR);

        this.bind();
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);
        gl.texParameteri(this.binding, gl.TEXTURE_MAG_FILTER, magFilter);
        gl.texParameteri(this.binding, gl.TEXTURE_MIN_FILTER, minFilter);
        gl.texParameteri(this.binding, gl.TEXTURE_WRAP_S, wrapS);
        gl.texParameteri(this.binding, gl.TEXTURE_WRAP_T, wrapT);
        gl.texParameteri(this.binding, gl.TEXTURE_COMPARE_FUNC, compareFunc);
        gl.texParameteri(this.binding, gl.TEXTURE_COMPARE_MODE, compareMode);
        if (options.baseLevel !== undefined) {
            gl.texParameteri(this.binding, gl.TEXTURE_BASE_LEVEL, options.baseLevel);
        }
        if (options.maxLevel !== undefined) {
            gl.texParameteri(this.binding, gl.TEXTURE_MAX_LEVEL, options.maxLevel);
        }
        if (options.minLOD !== undefined) {
            gl.texParameteri(this.binding, gl.TEXTURE_MIN_LOD, options.minLOD);
        }
        if (options.maxLOD !== undefined) {
            gl.texParameteri(this.binding, gl.TEXTURE_MAX_LOD, options.maxLOD);
        }

        if (this.is3D) {
            gl.texParameteri(this.binding, gl.TEXTURE_WRAP_R, wrapR);
            gl.texImage3D(this.binding, 0, this.internalFormat, width, height, depth, 0, this.format, this.type, image);
        } else {
            if (buffer) {
                gl.texImage2D(this.binding, 0, this.internalFormat, width, height, 0, this.format, this.type, image);
            } else {
                gl.texImage2D(this.binding, 0, this.internalFormat, this.format, this.type, image);
            }
        }

        if (generateMipmaps) {
            gl.generateMipmap(this.binding);
        }
    };

    /**
        Set the image data for the texture.
    
        @method
        @param {ImageElement|ArrayBufferView} image Image data.
        @param {number} [width] Image width. Required when passing ArrayBufferView data.
        @param {number} [height] Image height. Required when passing ArrayBufferView data.
        @param {number} [depth] Image depth or number of images. Required when passing 3D or texture array data.
    */
    PicoGL.Texture.prototype.image = function(image, width, height, depth) {
        this.bind();

        if (this.is3D) {
            this.gl.texImage3D(this.binding, 0, this.internalFormat, width, height, depth, 0, this.format, this.type, image);
        } else {
            if (!image || image.BYTES_PER_ELEMENT !== undefined) {
                this.gl.texImage2D(this.binding, 0, this.internalFormat, width, height, 0, this.format, this.type, image);
            } else {
                this.gl.texImage2D(this.binding, 0, this.internalFormat, this.format, this.type, image);
            }
        }

        return this;
    };  

    /**
        Delete this texture.

        @method
    */
    PicoGL.Texture.prototype.delete = function() {
        if (this.texture) {
            this.gl.deleteTexture(this.texture);
            this.texture = null;
            this.appState.freeTextureUnits.push(this.unit);
            this.appState.textures[this.unit] = null;
            this.unit = -1;
            this.unitEnum = -1;
        }
    }; 

    // Bind this texture to a texture unit.
    PicoGL.Texture.prototype.bind = function() {
        if (this.appState.textures[this.unit] !== this) {
            this.gl.activeTexture(this.unitEnum);
            this.gl.bindTexture(this.binding, this.texture);
            this.appState.textures[this.unit] = this;
        }
        
        return this;
    };   

})();
