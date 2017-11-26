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

import * as CONSTANTS from "./constants.js";

export const TEXTURE_FORMAT_DEFAULTS = {};

const UNSIGNED_BYTE = TEXTURE_FORMAT_DEFAULTS[CONSTANTS.UNSIGNED_BYTE] = {};
UNSIGNED_BYTE[CONSTANTS.RED] = CONSTANTS.R8;
UNSIGNED_BYTE[CONSTANTS.RG] = CONSTANTS.RG8;
UNSIGNED_BYTE[CONSTANTS.RGB] = CONSTANTS.RGB8;
UNSIGNED_BYTE[CONSTANTS.RGBA] = CONSTANTS.RGBA8;

const UNSIGNED_SHORT = TEXTURE_FORMAT_DEFAULTS[CONSTANTS.UNSIGNED_SHORT] = {};
UNSIGNED_SHORT[CONSTANTS.DEPTH_COMPONENT] = CONSTANTS.DEPTH_COMPONENT16;

const FLOAT = TEXTURE_FORMAT_DEFAULTS[CONSTANTS.FLOAT] = {};
FLOAT[CONSTANTS.RED] = CONSTANTS.R16F;
FLOAT[CONSTANTS.RG] = CONSTANTS.RG16F;
FLOAT[CONSTANTS.RGB] = CONSTANTS.RGB16F;
FLOAT[CONSTANTS.RGBA] = CONSTANTS.RGBA16F;
FLOAT[CONSTANTS.DEPTH_COMPONENT] = CONSTANTS.DEPTH_COMPONENT32F;

TEXTURE_FORMAT_DEFAULTS.COMPRESSED_TYPES = {};

// TODO(Tarek): For https://bugs.chromium.org/p/chromium/issues/detail?id=757447
// Remove this when that's fixed
TEXTURE_FORMAT_DEFAULTS.NO_TEX_STORAGE = {};
