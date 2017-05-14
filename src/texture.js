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
        @prop {Number} unit The texture unit this texture is bound to.
        @prop {GLEnum} unitEnum The GLEnum of texture unit this texture is bound to.
        @prop {boolean} is3D Whether this texture contains 3D data.
        @prop {Object} appState Tracked GL state.
    */
    PicoGL.Texture = function Texture(gl, appState, binding, image, width, height, depth, is3D, options) {
        options = options || PicoGL.DUMMY_OBJECT;

        this.gl = gl;
        this.binding = binding;
        this.texture = gl.createTexture();
        this.width = width || 0;
        this.height = height || 0;
        this.depth = depth || 0;
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
        this.unitEnum = gl.TEXTURE0 + this.unit;

        this.flipY = options.flipY !== undefined ? options.flipY : true;
        this.minFilter = options.minFilter || gl.LINEAR_MIPMAP_NEAREST;
        this.magFilter = options.magFilter || gl.LINEAR;
        this.wrapS = options.wrapS || gl.REPEAT;
        this.wrapT = options.wrapT || gl.REPEAT;
        this.wrapR = options.wrapR || gl.REPEAT;
        this.compareMode = options.compareMode || gl.NONE;
        this.compareFunc = options.compareFunc || gl.LEQUAL;
        this.baseLevel = options.baseLevel || null;
        this.maxLevel = options.maxLevel || null;
        this.minLOD = options.minLOD || null;
        this.maxLOD = options.maxLOD || null;
        this.generateMipmaps = options.generateMipmaps !== false && 
                            (this.minFilter === gl.LINEAR_MIPMAP_NEAREST || this.minFilter === gl.LINEAR_MIPMAP_LINEAR);

        this.bind();
        this.build(image);
    };

    PicoGL.Texture.prototype.build = function(image) {
        this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, this.flipY);
        this.gl.texParameteri(this.binding, this.gl.TEXTURE_MAG_FILTER, this.magFilter);
        this.gl.texParameteri(this.binding, this.gl.TEXTURE_MIN_FILTER, this.minFilter);
        this.gl.texParameteri(this.binding, this.gl.TEXTURE_WRAP_S, this.wrapS);
        this.gl.texParameteri(this.binding, this.gl.TEXTURE_WRAP_T, this.wrapT);
        this.gl.texParameteri(this.binding, this.gl.TEXTURE_COMPARE_FUNC, this.compareFunc);
        this.gl.texParameteri(this.binding, this.gl.TEXTURE_COMPARE_MODE, this.compareMode);
        if (this.baseLevel !== null) {
            this.gl.texParameteri(this.binding, this.gl.TEXTURE_BASE_LEVEL, this.baseLevel);
        }
        if (this.maxLevel !== null) {
            this.gl.texParameteri(this.binding, this.gl.TEXTURE_MAX_LEVEL, this.maxLevel);
        }
        if (this.minLOD !== null) {
            this.gl.texParameteri(this.binding, this.gl.TEXTURE_MIN_LOD, this.minLOD);
        }
        if (this.maxLOD !== null) {
            this.gl.texParameteri(this.binding, this.gl.TEXTURE_MAX_LOD, this.maxLOD);
        }

        if (this.is3D) {
            this.gl.texParameteri(this.binding, this.gl.TEXTURE_WRAP_R, this.wrapR);
            this.gl.texStorage3D(this.binding, 1, this.internalFormat, this.width, this.height, this.depth);
            if (image) {
                this.gl.texSubImage3D(this.binding, 0, 0, 0, 0, this.width, this.height, this.depth, this.format, this.type, image);
            }
        } else {
            this.gl.texStorage2D(this.binding, 1, this.internalFormat, this.width, this.height);
            if (image) {
                this.gl.texSubImage2D(this.binding, 0, 0, 0, this.width, this.height, this.format, this.type, image);
            }
        }

        if (this.generateMipmaps) {
            this.gl.generateMipmap(this.binding);
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
        width = width || image.width;
        height = height || image.height;
        depth = depth || 0;

        if (width === this.width && height === this.height && depth === this.depth) {
            return this;
        }
        
        this.gl.deleteTexture(this.texture);
        this.texture = this.gl.createTexture();

        this.bind(true);

        this.width = width || image.width;
        this.height = height || image.height;
        this.depth = depth || 0;

        this.build(image);

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

    // Activate this texture's texture unit.
    PicoGL.Texture.prototype.activate = function(force) {
        if (force || this.appState.activeTexture !== this.unit) {
            this.gl.activeTexture(this.unitEnum);
            this.appState.activeTexture = this.unit;
        }
        
        return this;
    }; 

    // Bind this texture to a texture unit.
    PicoGL.Texture.prototype.bind = function(force) {
        if (force || this.appState.textures[this.unit] !== this) {
            this.activate(force);
            this.gl.bindTexture(this.binding, this.texture);
            this.appState.textures[this.unit] = this;
        }
        
        return this;
    };   

})();
