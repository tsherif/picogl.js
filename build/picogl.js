/*
PicoGL.js v0.6.11

The MIT License (MIT)

Copyright (c) 2017 Tarek Sherif

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["PicoGL"] = factory();
	else
		root["PicoGL"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

const ACTIVE_ATTRIBUTES = 35721;
/* harmony export (immutable) */ __webpack_exports__["a"] = ACTIVE_ATTRIBUTES;

const ACTIVE_TEXTURE = 34016;
/* harmony export (immutable) */ __webpack_exports__["b"] = ACTIVE_TEXTURE;

const ACTIVE_UNIFORMS = 35718;
/* harmony export (immutable) */ __webpack_exports__["c"] = ACTIVE_UNIFORMS;

const ACTIVE_UNIFORM_BLOCKS = 35382;
/* harmony export (immutable) */ __webpack_exports__["d"] = ACTIVE_UNIFORM_BLOCKS;

const ALIASED_LINE_WIDTH_RANGE = 33902;
/* harmony export (immutable) */ __webpack_exports__["e"] = ALIASED_LINE_WIDTH_RANGE;

const ALIASED_POINT_SIZE_RANGE = 33901;
/* harmony export (immutable) */ __webpack_exports__["f"] = ALIASED_POINT_SIZE_RANGE;

const ALPHA = 6406;
/* harmony export (immutable) */ __webpack_exports__["g"] = ALPHA;

const ALPHA_BITS = 3413;
/* harmony export (immutable) */ __webpack_exports__["h"] = ALPHA_BITS;

const ALREADY_SIGNALED = 37146;
/* harmony export (immutable) */ __webpack_exports__["i"] = ALREADY_SIGNALED;

const ALWAYS = 519;
/* harmony export (immutable) */ __webpack_exports__["j"] = ALWAYS;

const ANY_SAMPLES_PASSED = 35887;
/* harmony export (immutable) */ __webpack_exports__["k"] = ANY_SAMPLES_PASSED;

const ANY_SAMPLES_PASSED_CONSERVATIVE = 36202;
/* harmony export (immutable) */ __webpack_exports__["l"] = ANY_SAMPLES_PASSED_CONSERVATIVE;

const ARRAY_BUFFER = 34962;
/* harmony export (immutable) */ __webpack_exports__["m"] = ARRAY_BUFFER;

const ARRAY_BUFFER_BINDING = 34964;
/* harmony export (immutable) */ __webpack_exports__["n"] = ARRAY_BUFFER_BINDING;

const ATTACHED_SHADERS = 35717;
/* harmony export (immutable) */ __webpack_exports__["o"] = ATTACHED_SHADERS;

const BACK = 1029;
/* harmony export (immutable) */ __webpack_exports__["p"] = BACK;

const BLEND = 3042;
/* harmony export (immutable) */ __webpack_exports__["q"] = BLEND;

const BLEND_COLOR = 32773;
/* harmony export (immutable) */ __webpack_exports__["r"] = BLEND_COLOR;

const BLEND_DST_ALPHA = 32970;
/* harmony export (immutable) */ __webpack_exports__["s"] = BLEND_DST_ALPHA;

const BLEND_DST_RGB = 32968;
/* harmony export (immutable) */ __webpack_exports__["t"] = BLEND_DST_RGB;

const BLEND_EQUATION = 32777;
/* harmony export (immutable) */ __webpack_exports__["u"] = BLEND_EQUATION;

const BLEND_EQUATION_ALPHA = 34877;
/* harmony export (immutable) */ __webpack_exports__["v"] = BLEND_EQUATION_ALPHA;

const BLEND_EQUATION_RGB = 32777;
/* harmony export (immutable) */ __webpack_exports__["w"] = BLEND_EQUATION_RGB;

const BLEND_SRC_ALPHA = 32971;
/* harmony export (immutable) */ __webpack_exports__["x"] = BLEND_SRC_ALPHA;

const BLEND_SRC_RGB = 32969;
/* harmony export (immutable) */ __webpack_exports__["y"] = BLEND_SRC_RGB;

const BLUE_BITS = 3412;
/* harmony export (immutable) */ __webpack_exports__["z"] = BLUE_BITS;

const BOOL = 35670;
/* harmony export (immutable) */ __webpack_exports__["A"] = BOOL;

const BOOL_VEC2 = 35671;
/* harmony export (immutable) */ __webpack_exports__["B"] = BOOL_VEC2;

const BOOL_VEC3 = 35672;
/* harmony export (immutable) */ __webpack_exports__["C"] = BOOL_VEC3;

const BOOL_VEC4 = 35673;
/* harmony export (immutable) */ __webpack_exports__["D"] = BOOL_VEC4;

const BROWSER_DEFAULT_WEBGL = 37444;
/* harmony export (immutable) */ __webpack_exports__["E"] = BROWSER_DEFAULT_WEBGL;

const BUFFER_SIZE = 34660;
/* harmony export (immutable) */ __webpack_exports__["F"] = BUFFER_SIZE;

const BUFFER_USAGE = 34661;
/* harmony export (immutable) */ __webpack_exports__["G"] = BUFFER_USAGE;

const BYTE = 5120;
/* harmony export (immutable) */ __webpack_exports__["H"] = BYTE;

const CCW = 2305;
/* harmony export (immutable) */ __webpack_exports__["I"] = CCW;

const CLAMP_TO_EDGE = 33071;
/* harmony export (immutable) */ __webpack_exports__["J"] = CLAMP_TO_EDGE;

const COLOR = 6144;
/* harmony export (immutable) */ __webpack_exports__["K"] = COLOR;

const COLOR_ATTACHMENT0 = 36064;
/* harmony export (immutable) */ __webpack_exports__["L"] = COLOR_ATTACHMENT0;

const COLOR_ATTACHMENT1 = 36065;
/* harmony export (immutable) */ __webpack_exports__["M"] = COLOR_ATTACHMENT1;

const COLOR_ATTACHMENT2 = 36066;
/* harmony export (immutable) */ __webpack_exports__["T"] = COLOR_ATTACHMENT2;

const COLOR_ATTACHMENT3 = 36067;
/* harmony export (immutable) */ __webpack_exports__["U"] = COLOR_ATTACHMENT3;

const COLOR_ATTACHMENT4 = 36068;
/* harmony export (immutable) */ __webpack_exports__["V"] = COLOR_ATTACHMENT4;

const COLOR_ATTACHMENT5 = 36069;
/* harmony export (immutable) */ __webpack_exports__["W"] = COLOR_ATTACHMENT5;

const COLOR_ATTACHMENT6 = 36070;
/* harmony export (immutable) */ __webpack_exports__["X"] = COLOR_ATTACHMENT6;

const COLOR_ATTACHMENT7 = 36071;
/* harmony export (immutable) */ __webpack_exports__["Y"] = COLOR_ATTACHMENT7;

const COLOR_ATTACHMENT8 = 36072;
/* harmony export (immutable) */ __webpack_exports__["Z"] = COLOR_ATTACHMENT8;

const COLOR_ATTACHMENT9 = 36073;
/* harmony export (immutable) */ __webpack_exports__["_0"] = COLOR_ATTACHMENT9;

const COLOR_ATTACHMENT10 = 36074;
/* harmony export (immutable) */ __webpack_exports__["N"] = COLOR_ATTACHMENT10;

const COLOR_ATTACHMENT11 = 36075;
/* harmony export (immutable) */ __webpack_exports__["O"] = COLOR_ATTACHMENT11;

const COLOR_ATTACHMENT12 = 36076;
/* harmony export (immutable) */ __webpack_exports__["P"] = COLOR_ATTACHMENT12;

const COLOR_ATTACHMENT13 = 36077;
/* harmony export (immutable) */ __webpack_exports__["Q"] = COLOR_ATTACHMENT13;

const COLOR_ATTACHMENT14 = 36078;
/* harmony export (immutable) */ __webpack_exports__["R"] = COLOR_ATTACHMENT14;

const COLOR_ATTACHMENT15 = 36079;
/* harmony export (immutable) */ __webpack_exports__["S"] = COLOR_ATTACHMENT15;

const COLOR_BUFFER_BIT = 16384;
/* harmony export (immutable) */ __webpack_exports__["_1"] = COLOR_BUFFER_BIT;

const COLOR_CLEAR_VALUE = 3106;
/* harmony export (immutable) */ __webpack_exports__["_2"] = COLOR_CLEAR_VALUE;

const COLOR_WRITEMASK = 3107;
/* harmony export (immutable) */ __webpack_exports__["_3"] = COLOR_WRITEMASK;

const COMPARE_REF_TO_TEXTURE = 34894;
/* harmony export (immutable) */ __webpack_exports__["_4"] = COMPARE_REF_TO_TEXTURE;

const COMPILE_STATUS = 35713;
/* harmony export (immutable) */ __webpack_exports__["_5"] = COMPILE_STATUS;

const COMPRESSED_TEXTURE_FORMATS = 34467;
/* harmony export (immutable) */ __webpack_exports__["_56"] = COMPRESSED_TEXTURE_FORMATS;

const CONDITION_SATISFIED = 37148;
/* harmony export (immutable) */ __webpack_exports__["_57"] = CONDITION_SATISFIED;

const CONSTANT_ALPHA = 32771;
/* harmony export (immutable) */ __webpack_exports__["_58"] = CONSTANT_ALPHA;

const CONSTANT_COLOR = 32769;
/* harmony export (immutable) */ __webpack_exports__["_59"] = CONSTANT_COLOR;

const CONTEXT_LOST_WEBGL = 37442;
/* harmony export (immutable) */ __webpack_exports__["_60"] = CONTEXT_LOST_WEBGL;

const COPY_READ_BUFFER = 36662;
/* harmony export (immutable) */ __webpack_exports__["_61"] = COPY_READ_BUFFER;

const COPY_READ_BUFFER_BINDING = 36662;
/* harmony export (immutable) */ __webpack_exports__["_62"] = COPY_READ_BUFFER_BINDING;

const COPY_WRITE_BUFFER = 36663;
/* harmony export (immutable) */ __webpack_exports__["_63"] = COPY_WRITE_BUFFER;

const COPY_WRITE_BUFFER_BINDING = 36663;
/* harmony export (immutable) */ __webpack_exports__["_64"] = COPY_WRITE_BUFFER_BINDING;

const CULL_FACE = 2884;
/* harmony export (immutable) */ __webpack_exports__["_65"] = CULL_FACE;

const CULL_FACE_MODE = 2885;
/* harmony export (immutable) */ __webpack_exports__["_66"] = CULL_FACE_MODE;

const CURRENT_PROGRAM = 35725;
/* harmony export (immutable) */ __webpack_exports__["_67"] = CURRENT_PROGRAM;

const CURRENT_QUERY = 34917;
/* harmony export (immutable) */ __webpack_exports__["_68"] = CURRENT_QUERY;

const CURRENT_VERTEX_ATTRIB = 34342;
/* harmony export (immutable) */ __webpack_exports__["_69"] = CURRENT_VERTEX_ATTRIB;

const CW = 2304;
/* harmony export (immutable) */ __webpack_exports__["_70"] = CW;

const DECR = 7683;
/* harmony export (immutable) */ __webpack_exports__["_71"] = DECR;

const DECR_WRAP = 34056;
/* harmony export (immutable) */ __webpack_exports__["_72"] = DECR_WRAP;

const DELETE_STATUS = 35712;
/* harmony export (immutable) */ __webpack_exports__["_73"] = DELETE_STATUS;

const DEPTH = 6145;
/* harmony export (immutable) */ __webpack_exports__["_74"] = DEPTH;

const DEPTH24_STENCIL8 = 35056;
/* harmony export (immutable) */ __webpack_exports__["_75"] = DEPTH24_STENCIL8;

const DEPTH32F_STENCIL8 = 36013;
/* harmony export (immutable) */ __webpack_exports__["_76"] = DEPTH32F_STENCIL8;

const DEPTH_ATTACHMENT = 36096;
/* harmony export (immutable) */ __webpack_exports__["_77"] = DEPTH_ATTACHMENT;

const DEPTH_BITS = 3414;
/* harmony export (immutable) */ __webpack_exports__["_78"] = DEPTH_BITS;

const DEPTH_BUFFER_BIT = 256;
/* harmony export (immutable) */ __webpack_exports__["_79"] = DEPTH_BUFFER_BIT;

const DEPTH_CLEAR_VALUE = 2931;
/* harmony export (immutable) */ __webpack_exports__["_80"] = DEPTH_CLEAR_VALUE;

const DEPTH_COMPONENT = 6402;
/* harmony export (immutable) */ __webpack_exports__["_81"] = DEPTH_COMPONENT;

const DEPTH_COMPONENT16 = 33189;
/* harmony export (immutable) */ __webpack_exports__["_82"] = DEPTH_COMPONENT16;

const DEPTH_COMPONENT24 = 33190;
/* harmony export (immutable) */ __webpack_exports__["_83"] = DEPTH_COMPONENT24;

const DEPTH_COMPONENT32F = 36012;
/* harmony export (immutable) */ __webpack_exports__["_84"] = DEPTH_COMPONENT32F;

const DEPTH_FUNC = 2932;
/* harmony export (immutable) */ __webpack_exports__["_85"] = DEPTH_FUNC;

const DEPTH_RANGE = 2928;
/* harmony export (immutable) */ __webpack_exports__["_86"] = DEPTH_RANGE;

const DEPTH_STENCIL = 34041;
/* harmony export (immutable) */ __webpack_exports__["_87"] = DEPTH_STENCIL;

const DEPTH_STENCIL_ATTACHMENT = 33306;
/* harmony export (immutable) */ __webpack_exports__["_88"] = DEPTH_STENCIL_ATTACHMENT;

const DEPTH_TEST = 2929;
/* harmony export (immutable) */ __webpack_exports__["_89"] = DEPTH_TEST;

const DEPTH_WRITEMASK = 2930;
/* harmony export (immutable) */ __webpack_exports__["_90"] = DEPTH_WRITEMASK;

const DITHER = 3024;
/* harmony export (immutable) */ __webpack_exports__["_91"] = DITHER;

const DONT_CARE = 4352;
/* harmony export (immutable) */ __webpack_exports__["_92"] = DONT_CARE;

const DRAW_BUFFER0 = 34853;
/* harmony export (immutable) */ __webpack_exports__["_93"] = DRAW_BUFFER0;

const DRAW_BUFFER1 = 34854;
/* harmony export (immutable) */ __webpack_exports__["_94"] = DRAW_BUFFER1;

const DRAW_BUFFER2 = 34855;
/* harmony export (immutable) */ __webpack_exports__["_101"] = DRAW_BUFFER2;

const DRAW_BUFFER3 = 34856;
/* harmony export (immutable) */ __webpack_exports__["_102"] = DRAW_BUFFER3;

const DRAW_BUFFER4 = 34857;
/* harmony export (immutable) */ __webpack_exports__["_103"] = DRAW_BUFFER4;

const DRAW_BUFFER5 = 34858;
/* harmony export (immutable) */ __webpack_exports__["_104"] = DRAW_BUFFER5;

const DRAW_BUFFER6 = 34859;
/* harmony export (immutable) */ __webpack_exports__["_105"] = DRAW_BUFFER6;

const DRAW_BUFFER7 = 34860;
/* harmony export (immutable) */ __webpack_exports__["_106"] = DRAW_BUFFER7;

const DRAW_BUFFER8 = 34861;
/* harmony export (immutable) */ __webpack_exports__["_107"] = DRAW_BUFFER8;

const DRAW_BUFFER9 = 34862;
/* harmony export (immutable) */ __webpack_exports__["_108"] = DRAW_BUFFER9;

const DRAW_BUFFER10 = 34863;
/* harmony export (immutable) */ __webpack_exports__["_95"] = DRAW_BUFFER10;

const DRAW_BUFFER11 = 34864;
/* harmony export (immutable) */ __webpack_exports__["_96"] = DRAW_BUFFER11;

const DRAW_BUFFER12 = 34865;
/* harmony export (immutable) */ __webpack_exports__["_97"] = DRAW_BUFFER12;

const DRAW_BUFFER13 = 34866;
/* harmony export (immutable) */ __webpack_exports__["_98"] = DRAW_BUFFER13;

const DRAW_BUFFER14 = 34867;
/* harmony export (immutable) */ __webpack_exports__["_99"] = DRAW_BUFFER14;

const DRAW_BUFFER15 = 34868;
/* harmony export (immutable) */ __webpack_exports__["_100"] = DRAW_BUFFER15;

const DRAW_FRAMEBUFFER = 36009;
/* harmony export (immutable) */ __webpack_exports__["_109"] = DRAW_FRAMEBUFFER;

const DRAW_FRAMEBUFFER_BINDING = 36006;
/* harmony export (immutable) */ __webpack_exports__["_110"] = DRAW_FRAMEBUFFER_BINDING;

const DST_ALPHA = 772;
/* harmony export (immutable) */ __webpack_exports__["_111"] = DST_ALPHA;

const DST_COLOR = 774;
/* harmony export (immutable) */ __webpack_exports__["_112"] = DST_COLOR;

const DYNAMIC_COPY = 35050;
/* harmony export (immutable) */ __webpack_exports__["_114"] = DYNAMIC_COPY;

const DYNAMIC_DRAW = 35048;
/* harmony export (immutable) */ __webpack_exports__["_115"] = DYNAMIC_DRAW;

const DYNAMIC_READ = 35049;
/* harmony export (immutable) */ __webpack_exports__["_116"] = DYNAMIC_READ;

const ELEMENT_ARRAY_BUFFER = 34963;
/* harmony export (immutable) */ __webpack_exports__["_117"] = ELEMENT_ARRAY_BUFFER;

const ELEMENT_ARRAY_BUFFER_BINDING = 34965;
/* harmony export (immutable) */ __webpack_exports__["_118"] = ELEMENT_ARRAY_BUFFER_BINDING;

const EQUAL = 514;
/* harmony export (immutable) */ __webpack_exports__["_119"] = EQUAL;

const FASTEST = 4353;
/* harmony export (immutable) */ __webpack_exports__["_120"] = FASTEST;

const FLOAT = 5126;
/* harmony export (immutable) */ __webpack_exports__["_121"] = FLOAT;

const FLOAT_32_UNSIGNED_INT_24_8_REV = 36269;
/* harmony export (immutable) */ __webpack_exports__["_122"] = FLOAT_32_UNSIGNED_INT_24_8_REV;

const FLOAT_MAT2 = 35674;
/* harmony export (immutable) */ __webpack_exports__["_123"] = FLOAT_MAT2;

const FLOAT_MAT2x3 = 35685;
/* harmony export (immutable) */ __webpack_exports__["_124"] = FLOAT_MAT2x3;

const FLOAT_MAT2x4 = 35686;
/* harmony export (immutable) */ __webpack_exports__["_125"] = FLOAT_MAT2x4;

const FLOAT_MAT3 = 35675;
/* harmony export (immutable) */ __webpack_exports__["_126"] = FLOAT_MAT3;

const FLOAT_MAT3x2 = 35687;
/* harmony export (immutable) */ __webpack_exports__["_127"] = FLOAT_MAT3x2;

const FLOAT_MAT3x4 = 35688;
/* harmony export (immutable) */ __webpack_exports__["_128"] = FLOAT_MAT3x4;

const FLOAT_MAT4 = 35676;
/* harmony export (immutable) */ __webpack_exports__["_129"] = FLOAT_MAT4;

const FLOAT_MAT4x2 = 35689;
/* harmony export (immutable) */ __webpack_exports__["_130"] = FLOAT_MAT4x2;

const FLOAT_MAT4x3 = 35690;
/* harmony export (immutable) */ __webpack_exports__["_131"] = FLOAT_MAT4x3;

const FLOAT_VEC2 = 35664;
/* harmony export (immutable) */ __webpack_exports__["_132"] = FLOAT_VEC2;

const FLOAT_VEC3 = 35665;
/* harmony export (immutable) */ __webpack_exports__["_133"] = FLOAT_VEC3;

const FLOAT_VEC4 = 35666;
/* harmony export (immutable) */ __webpack_exports__["_134"] = FLOAT_VEC4;

const FRAGMENT_SHADER = 35632;
/* harmony export (immutable) */ __webpack_exports__["_135"] = FRAGMENT_SHADER;

const FRAGMENT_SHADER_DERIVATIVE_HINT = 35723;
/* harmony export (immutable) */ __webpack_exports__["_136"] = FRAGMENT_SHADER_DERIVATIVE_HINT;

const FRAMEBUFFER = 36160;
/* harmony export (immutable) */ __webpack_exports__["_137"] = FRAMEBUFFER;

const FRAMEBUFFER_ATTACHMENT_ALPHA_SIZE = 33301;
/* harmony export (immutable) */ __webpack_exports__["_138"] = FRAMEBUFFER_ATTACHMENT_ALPHA_SIZE;

const FRAMEBUFFER_ATTACHMENT_BLUE_SIZE = 33300;
/* harmony export (immutable) */ __webpack_exports__["_139"] = FRAMEBUFFER_ATTACHMENT_BLUE_SIZE;

const FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING = 33296;
/* harmony export (immutable) */ __webpack_exports__["_140"] = FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING;

const FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE = 33297;
/* harmony export (immutable) */ __webpack_exports__["_141"] = FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE;

const FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE = 33302;
/* harmony export (immutable) */ __webpack_exports__["_142"] = FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE;

const FRAMEBUFFER_ATTACHMENT_GREEN_SIZE = 33299;
/* harmony export (immutable) */ __webpack_exports__["_143"] = FRAMEBUFFER_ATTACHMENT_GREEN_SIZE;

const FRAMEBUFFER_ATTACHMENT_OBJECT_NAME = 36049;
/* harmony export (immutable) */ __webpack_exports__["_144"] = FRAMEBUFFER_ATTACHMENT_OBJECT_NAME;

const FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE = 36048;
/* harmony export (immutable) */ __webpack_exports__["_145"] = FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE;

const FRAMEBUFFER_ATTACHMENT_RED_SIZE = 33298;
/* harmony export (immutable) */ __webpack_exports__["_146"] = FRAMEBUFFER_ATTACHMENT_RED_SIZE;

const FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE = 33303;
/* harmony export (immutable) */ __webpack_exports__["_147"] = FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE;

const FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE = 36051;
/* harmony export (immutable) */ __webpack_exports__["_148"] = FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE;

const FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER = 36052;
/* harmony export (immutable) */ __webpack_exports__["_149"] = FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER;

const FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL = 36050;
/* harmony export (immutable) */ __webpack_exports__["_150"] = FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL;

const FRAMEBUFFER_BINDING = 36006;
/* harmony export (immutable) */ __webpack_exports__["_151"] = FRAMEBUFFER_BINDING;

const FRAMEBUFFER_COMPLETE = 36053;
/* harmony export (immutable) */ __webpack_exports__["_152"] = FRAMEBUFFER_COMPLETE;

const FRAMEBUFFER_DEFAULT = 33304;
/* harmony export (immutable) */ __webpack_exports__["_153"] = FRAMEBUFFER_DEFAULT;

const FRAMEBUFFER_INCOMPLETE_ATTACHMENT = 36054;
/* harmony export (immutable) */ __webpack_exports__["_154"] = FRAMEBUFFER_INCOMPLETE_ATTACHMENT;

const FRAMEBUFFER_INCOMPLETE_DIMENSIONS = 36057;
/* harmony export (immutable) */ __webpack_exports__["_155"] = FRAMEBUFFER_INCOMPLETE_DIMENSIONS;

const FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT = 36055;
/* harmony export (immutable) */ __webpack_exports__["_156"] = FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT;

const FRAMEBUFFER_INCOMPLETE_MULTISAMPLE = 36182;
/* harmony export (immutable) */ __webpack_exports__["_157"] = FRAMEBUFFER_INCOMPLETE_MULTISAMPLE;

const FRAMEBUFFER_UNSUPPORTED = 36061;
/* harmony export (immutable) */ __webpack_exports__["_158"] = FRAMEBUFFER_UNSUPPORTED;

const FRONT = 1028;
/* harmony export (immutable) */ __webpack_exports__["_159"] = FRONT;

const FRONT_AND_BACK = 1032;
/* harmony export (immutable) */ __webpack_exports__["_160"] = FRONT_AND_BACK;

const FRONT_FACE = 2886;
/* harmony export (immutable) */ __webpack_exports__["_161"] = FRONT_FACE;

const FUNC_ADD = 32774;
/* harmony export (immutable) */ __webpack_exports__["_162"] = FUNC_ADD;

const FUNC_REVERSE_SUBTRACT = 32779;
/* harmony export (immutable) */ __webpack_exports__["_163"] = FUNC_REVERSE_SUBTRACT;

const FUNC_SUBTRACT = 32778;
/* harmony export (immutable) */ __webpack_exports__["_164"] = FUNC_SUBTRACT;

const GENERATE_MIPMAP_HINT = 33170;
/* harmony export (immutable) */ __webpack_exports__["_165"] = GENERATE_MIPMAP_HINT;

const GEQUAL = 518;
/* harmony export (immutable) */ __webpack_exports__["_166"] = GEQUAL;

const GREATER = 516;
/* harmony export (immutable) */ __webpack_exports__["_167"] = GREATER;

const GREEN_BITS = 3411;
/* harmony export (immutable) */ __webpack_exports__["_168"] = GREEN_BITS;

const HALF_FLOAT = 5131;
/* harmony export (immutable) */ __webpack_exports__["_169"] = HALF_FLOAT;

const HIGH_FLOAT = 36338;
/* harmony export (immutable) */ __webpack_exports__["_170"] = HIGH_FLOAT;

const HIGH_INT = 36341;
/* harmony export (immutable) */ __webpack_exports__["_171"] = HIGH_INT;

const IMPLEMENTATION_COLOR_READ_FORMAT = 35739;
/* harmony export (immutable) */ __webpack_exports__["_172"] = IMPLEMENTATION_COLOR_READ_FORMAT;

const IMPLEMENTATION_COLOR_READ_TYPE = 35738;
/* harmony export (immutable) */ __webpack_exports__["_173"] = IMPLEMENTATION_COLOR_READ_TYPE;

const INCR = 7682;
/* harmony export (immutable) */ __webpack_exports__["_174"] = INCR;

const INCR_WRAP = 34055;
/* harmony export (immutable) */ __webpack_exports__["_175"] = INCR_WRAP;

const INT = 5124;
/* harmony export (immutable) */ __webpack_exports__["_176"] = INT;

const INTERLEAVED_ATTRIBS = 35980;
/* harmony export (immutable) */ __webpack_exports__["_177"] = INTERLEAVED_ATTRIBS;

const INT_2_10_10_10_REV = 36255;
/* harmony export (immutable) */ __webpack_exports__["_178"] = INT_2_10_10_10_REV;

const INT_SAMPLER_2D = 36298;
/* harmony export (immutable) */ __webpack_exports__["_179"] = INT_SAMPLER_2D;

const INT_SAMPLER_2D_ARRAY = 36303;
/* harmony export (immutable) */ __webpack_exports__["_180"] = INT_SAMPLER_2D_ARRAY;

const INT_SAMPLER_3D = 36299;
/* harmony export (immutable) */ __webpack_exports__["_181"] = INT_SAMPLER_3D;

const INT_SAMPLER_CUBE = 36300;
/* harmony export (immutable) */ __webpack_exports__["_182"] = INT_SAMPLER_CUBE;

const INT_VEC2 = 35667;
/* harmony export (immutable) */ __webpack_exports__["_183"] = INT_VEC2;

const INT_VEC3 = 35668;
/* harmony export (immutable) */ __webpack_exports__["_184"] = INT_VEC3;

const INT_VEC4 = 35669;
/* harmony export (immutable) */ __webpack_exports__["_185"] = INT_VEC4;

const INVALID_ENUM = 1280;
/* harmony export (immutable) */ __webpack_exports__["_186"] = INVALID_ENUM;

const INVALID_FRAMEBUFFER_OPERATION = 1286;
/* harmony export (immutable) */ __webpack_exports__["_187"] = INVALID_FRAMEBUFFER_OPERATION;

const INVALID_INDEX = 4294967295;
/* harmony export (immutable) */ __webpack_exports__["_188"] = INVALID_INDEX;

const INVALID_OPERATION = 1282;
/* harmony export (immutable) */ __webpack_exports__["_189"] = INVALID_OPERATION;

const INVALID_VALUE = 1281;
/* harmony export (immutable) */ __webpack_exports__["_190"] = INVALID_VALUE;

const INVERT = 5386;
/* harmony export (immutable) */ __webpack_exports__["_191"] = INVERT;

const KEEP = 7680;
/* harmony export (immutable) */ __webpack_exports__["_192"] = KEEP;

const LEQUAL = 515;
/* harmony export (immutable) */ __webpack_exports__["_193"] = LEQUAL;

const LESS = 513;
/* harmony export (immutable) */ __webpack_exports__["_194"] = LESS;

const LINEAR = 9729;
/* harmony export (immutable) */ __webpack_exports__["_195"] = LINEAR;

const LINEAR_MIPMAP_LINEAR = 9987;
/* harmony export (immutable) */ __webpack_exports__["_196"] = LINEAR_MIPMAP_LINEAR;

const LINEAR_MIPMAP_NEAREST = 9985;
/* harmony export (immutable) */ __webpack_exports__["_197"] = LINEAR_MIPMAP_NEAREST;

const LINES = 1;
/* harmony export (immutable) */ __webpack_exports__["_198"] = LINES;

const LINE_LOOP = 2;
/* harmony export (immutable) */ __webpack_exports__["_199"] = LINE_LOOP;

const LINE_STRIP = 3;
/* harmony export (immutable) */ __webpack_exports__["_200"] = LINE_STRIP;

const LINE_WIDTH = 2849;
/* harmony export (immutable) */ __webpack_exports__["_201"] = LINE_WIDTH;

const LINK_STATUS = 35714;
/* harmony export (immutable) */ __webpack_exports__["_202"] = LINK_STATUS;

const LOW_FLOAT = 36336;
/* harmony export (immutable) */ __webpack_exports__["_203"] = LOW_FLOAT;

const LOW_INT = 36339;
/* harmony export (immutable) */ __webpack_exports__["_204"] = LOW_INT;

const LUMINANCE = 6409;
/* harmony export (immutable) */ __webpack_exports__["_205"] = LUMINANCE;

const LUMINANCE_ALPHA = 6410;
/* harmony export (immutable) */ __webpack_exports__["_206"] = LUMINANCE_ALPHA;

const MAX = 32776;
/* harmony export (immutable) */ __webpack_exports__["_207"] = MAX;

const MAX_3D_TEXTURE_SIZE = 32883;
/* harmony export (immutable) */ __webpack_exports__["_208"] = MAX_3D_TEXTURE_SIZE;

const MAX_ARRAY_TEXTURE_LAYERS = 35071;
/* harmony export (immutable) */ __webpack_exports__["_209"] = MAX_ARRAY_TEXTURE_LAYERS;

const MAX_CLIENT_WAIT_TIMEOUT_WEBGL = 37447;
/* harmony export (immutable) */ __webpack_exports__["_210"] = MAX_CLIENT_WAIT_TIMEOUT_WEBGL;

const MAX_COLOR_ATTACHMENTS = 36063;
/* harmony export (immutable) */ __webpack_exports__["_211"] = MAX_COLOR_ATTACHMENTS;

const MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS = 35379;
/* harmony export (immutable) */ __webpack_exports__["_212"] = MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS;

const MAX_COMBINED_TEXTURE_IMAGE_UNITS = 35661;
/* harmony export (immutable) */ __webpack_exports__["_213"] = MAX_COMBINED_TEXTURE_IMAGE_UNITS;

const MAX_COMBINED_UNIFORM_BLOCKS = 35374;
/* harmony export (immutable) */ __webpack_exports__["_214"] = MAX_COMBINED_UNIFORM_BLOCKS;

const MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS = 35377;
/* harmony export (immutable) */ __webpack_exports__["_215"] = MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS;

const MAX_CUBE_MAP_TEXTURE_SIZE = 34076;
/* harmony export (immutable) */ __webpack_exports__["_216"] = MAX_CUBE_MAP_TEXTURE_SIZE;

const MAX_DRAW_BUFFERS = 34852;
/* harmony export (immutable) */ __webpack_exports__["_217"] = MAX_DRAW_BUFFERS;

const MAX_ELEMENTS_INDICES = 33001;
/* harmony export (immutable) */ __webpack_exports__["_218"] = MAX_ELEMENTS_INDICES;

const MAX_ELEMENTS_VERTICES = 33000;
/* harmony export (immutable) */ __webpack_exports__["_219"] = MAX_ELEMENTS_VERTICES;

const MAX_ELEMENT_INDEX = 36203;
/* harmony export (immutable) */ __webpack_exports__["_220"] = MAX_ELEMENT_INDEX;

const MAX_FRAGMENT_INPUT_COMPONENTS = 37157;
/* harmony export (immutable) */ __webpack_exports__["_221"] = MAX_FRAGMENT_INPUT_COMPONENTS;

const MAX_FRAGMENT_UNIFORM_BLOCKS = 35373;
/* harmony export (immutable) */ __webpack_exports__["_222"] = MAX_FRAGMENT_UNIFORM_BLOCKS;

const MAX_FRAGMENT_UNIFORM_COMPONENTS = 35657;
/* harmony export (immutable) */ __webpack_exports__["_223"] = MAX_FRAGMENT_UNIFORM_COMPONENTS;

const MAX_FRAGMENT_UNIFORM_VECTORS = 36349;
/* harmony export (immutable) */ __webpack_exports__["_224"] = MAX_FRAGMENT_UNIFORM_VECTORS;

const MAX_PROGRAM_TEXEL_OFFSET = 35077;
/* harmony export (immutable) */ __webpack_exports__["_225"] = MAX_PROGRAM_TEXEL_OFFSET;

const MAX_RENDERBUFFER_SIZE = 34024;
/* harmony export (immutable) */ __webpack_exports__["_226"] = MAX_RENDERBUFFER_SIZE;

const MAX_SAMPLES = 36183;
/* harmony export (immutable) */ __webpack_exports__["_227"] = MAX_SAMPLES;

const MAX_SERVER_WAIT_TIMEOUT = 37137;
/* harmony export (immutable) */ __webpack_exports__["_228"] = MAX_SERVER_WAIT_TIMEOUT;

const MAX_TEXTURE_IMAGE_UNITS = 34930;
/* harmony export (immutable) */ __webpack_exports__["_229"] = MAX_TEXTURE_IMAGE_UNITS;

const MAX_TEXTURE_LOD_BIAS = 34045;
/* harmony export (immutable) */ __webpack_exports__["_230"] = MAX_TEXTURE_LOD_BIAS;

const MAX_TEXTURE_SIZE = 3379;
/* harmony export (immutable) */ __webpack_exports__["_231"] = MAX_TEXTURE_SIZE;

const MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS = 35978;
/* harmony export (immutable) */ __webpack_exports__["_232"] = MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS;

const MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS = 35979;
/* harmony export (immutable) */ __webpack_exports__["_233"] = MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS;

const MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS = 35968;
/* harmony export (immutable) */ __webpack_exports__["_234"] = MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS;

const MAX_UNIFORM_BLOCK_SIZE = 35376;
/* harmony export (immutable) */ __webpack_exports__["_235"] = MAX_UNIFORM_BLOCK_SIZE;

const MAX_UNIFORM_BUFFER_BINDINGS = 35375;
/* harmony export (immutable) */ __webpack_exports__["_236"] = MAX_UNIFORM_BUFFER_BINDINGS;

const MAX_VARYING_COMPONENTS = 35659;
/* harmony export (immutable) */ __webpack_exports__["_237"] = MAX_VARYING_COMPONENTS;

const MAX_VARYING_VECTORS = 36348;
/* harmony export (immutable) */ __webpack_exports__["_238"] = MAX_VARYING_VECTORS;

const MAX_VERTEX_ATTRIBS = 34921;
/* harmony export (immutable) */ __webpack_exports__["_239"] = MAX_VERTEX_ATTRIBS;

const MAX_VERTEX_OUTPUT_COMPONENTS = 37154;
/* harmony export (immutable) */ __webpack_exports__["_240"] = MAX_VERTEX_OUTPUT_COMPONENTS;

const MAX_VERTEX_TEXTURE_IMAGE_UNITS = 35660;
/* harmony export (immutable) */ __webpack_exports__["_241"] = MAX_VERTEX_TEXTURE_IMAGE_UNITS;

const MAX_VERTEX_UNIFORM_BLOCKS = 35371;
/* harmony export (immutable) */ __webpack_exports__["_242"] = MAX_VERTEX_UNIFORM_BLOCKS;

const MAX_VERTEX_UNIFORM_COMPONENTS = 35658;
/* harmony export (immutable) */ __webpack_exports__["_243"] = MAX_VERTEX_UNIFORM_COMPONENTS;

const MAX_VERTEX_UNIFORM_VECTORS = 36347;
/* harmony export (immutable) */ __webpack_exports__["_244"] = MAX_VERTEX_UNIFORM_VECTORS;

const MAX_VIEWPORT_DIMS = 3386;
/* harmony export (immutable) */ __webpack_exports__["_245"] = MAX_VIEWPORT_DIMS;

const MEDIUM_FLOAT = 36337;
/* harmony export (immutable) */ __webpack_exports__["_246"] = MEDIUM_FLOAT;

const MEDIUM_INT = 36340;
/* harmony export (immutable) */ __webpack_exports__["_247"] = MEDIUM_INT;

const MIN = 32775;
/* harmony export (immutable) */ __webpack_exports__["_248"] = MIN;

const MIN_PROGRAM_TEXEL_OFFSET = 35076;
/* harmony export (immutable) */ __webpack_exports__["_249"] = MIN_PROGRAM_TEXEL_OFFSET;

const MIRRORED_REPEAT = 33648;
/* harmony export (immutable) */ __webpack_exports__["_250"] = MIRRORED_REPEAT;

const NEAREST = 9728;
/* harmony export (immutable) */ __webpack_exports__["_251"] = NEAREST;

const NEAREST_MIPMAP_LINEAR = 9986;
/* harmony export (immutable) */ __webpack_exports__["_252"] = NEAREST_MIPMAP_LINEAR;

const NEAREST_MIPMAP_NEAREST = 9984;
/* harmony export (immutable) */ __webpack_exports__["_253"] = NEAREST_MIPMAP_NEAREST;

const NEVER = 512;
/* harmony export (immutable) */ __webpack_exports__["_254"] = NEVER;

const NICEST = 4354;
/* harmony export (immutable) */ __webpack_exports__["_255"] = NICEST;

const NONE = 0;
/* harmony export (immutable) */ __webpack_exports__["_256"] = NONE;

const NOTEQUAL = 517;
/* harmony export (immutable) */ __webpack_exports__["_257"] = NOTEQUAL;

const NO_ERROR = 0;
/* harmony export (immutable) */ __webpack_exports__["_258"] = NO_ERROR;

const OBJECT_TYPE = 37138;
/* harmony export (immutable) */ __webpack_exports__["_259"] = OBJECT_TYPE;

const ONE = 1;
/* harmony export (immutable) */ __webpack_exports__["_260"] = ONE;

const ONE_MINUS_CONSTANT_ALPHA = 32772;
/* harmony export (immutable) */ __webpack_exports__["_261"] = ONE_MINUS_CONSTANT_ALPHA;

const ONE_MINUS_CONSTANT_COLOR = 32770;
/* harmony export (immutable) */ __webpack_exports__["_262"] = ONE_MINUS_CONSTANT_COLOR;

const ONE_MINUS_DST_ALPHA = 773;
/* harmony export (immutable) */ __webpack_exports__["_263"] = ONE_MINUS_DST_ALPHA;

const ONE_MINUS_DST_COLOR = 775;
/* harmony export (immutable) */ __webpack_exports__["_264"] = ONE_MINUS_DST_COLOR;

const ONE_MINUS_SRC_ALPHA = 771;
/* harmony export (immutable) */ __webpack_exports__["_265"] = ONE_MINUS_SRC_ALPHA;

const ONE_MINUS_SRC_COLOR = 769;
/* harmony export (immutable) */ __webpack_exports__["_266"] = ONE_MINUS_SRC_COLOR;

const OUT_OF_MEMORY = 1285;
/* harmony export (immutable) */ __webpack_exports__["_267"] = OUT_OF_MEMORY;

const PACK_ALIGNMENT = 3333;
/* harmony export (immutable) */ __webpack_exports__["_268"] = PACK_ALIGNMENT;

const PACK_ROW_LENGTH = 3330;
/* harmony export (immutable) */ __webpack_exports__["_269"] = PACK_ROW_LENGTH;

const PACK_SKIP_PIXELS = 3332;
/* harmony export (immutable) */ __webpack_exports__["_270"] = PACK_SKIP_PIXELS;

const PACK_SKIP_ROWS = 3331;
/* harmony export (immutable) */ __webpack_exports__["_271"] = PACK_SKIP_ROWS;

const PIXEL_PACK_BUFFER = 35051;
/* harmony export (immutable) */ __webpack_exports__["_272"] = PIXEL_PACK_BUFFER;

const PIXEL_PACK_BUFFER_BINDING = 35053;
/* harmony export (immutable) */ __webpack_exports__["_273"] = PIXEL_PACK_BUFFER_BINDING;

const PIXEL_UNPACK_BUFFER = 35052;
/* harmony export (immutable) */ __webpack_exports__["_274"] = PIXEL_UNPACK_BUFFER;

const PIXEL_UNPACK_BUFFER_BINDING = 35055;
/* harmony export (immutable) */ __webpack_exports__["_275"] = PIXEL_UNPACK_BUFFER_BINDING;

const POINTS = 0;
/* harmony export (immutable) */ __webpack_exports__["_276"] = POINTS;

const POLYGON_OFFSET_FACTOR = 32824;
/* harmony export (immutable) */ __webpack_exports__["_277"] = POLYGON_OFFSET_FACTOR;

const POLYGON_OFFSET_FILL = 32823;
/* harmony export (immutable) */ __webpack_exports__["_278"] = POLYGON_OFFSET_FILL;

const POLYGON_OFFSET_UNITS = 10752;
/* harmony export (immutable) */ __webpack_exports__["_279"] = POLYGON_OFFSET_UNITS;

const QUERY_RESULT = 34918;
/* harmony export (immutable) */ __webpack_exports__["_280"] = QUERY_RESULT;

const QUERY_RESULT_AVAILABLE = 34919;
/* harmony export (immutable) */ __webpack_exports__["_281"] = QUERY_RESULT_AVAILABLE;

const R8 = 33321;
/* harmony export (immutable) */ __webpack_exports__["_289"] = R8;

const R8I = 33329;
/* harmony export (immutable) */ __webpack_exports__["_290"] = R8I;

const R8UI = 33330;
/* harmony export (immutable) */ __webpack_exports__["_291"] = R8UI;

const R8_SNORM = 36756;
/* harmony export (immutable) */ __webpack_exports__["_292"] = R8_SNORM;

const R11F_G11F_B10F = 35898;
/* harmony export (immutable) */ __webpack_exports__["_282"] = R11F_G11F_B10F;

const R16F = 33325;
/* harmony export (immutable) */ __webpack_exports__["_283"] = R16F;

const R16I = 33331;
/* harmony export (immutable) */ __webpack_exports__["_284"] = R16I;

const R16UI = 33332;
/* harmony export (immutable) */ __webpack_exports__["_285"] = R16UI;

const R32F = 33326;
/* harmony export (immutable) */ __webpack_exports__["_286"] = R32F;

const R32I = 33333;
/* harmony export (immutable) */ __webpack_exports__["_287"] = R32I;

const R32UI = 33334;
/* harmony export (immutable) */ __webpack_exports__["_288"] = R32UI;

const RASTERIZER_DISCARD = 35977;
/* harmony export (immutable) */ __webpack_exports__["_293"] = RASTERIZER_DISCARD;

const READ_BUFFER = 3074;
/* harmony export (immutable) */ __webpack_exports__["_294"] = READ_BUFFER;

const READ_FRAMEBUFFER = 36008;
/* harmony export (immutable) */ __webpack_exports__["_295"] = READ_FRAMEBUFFER;

const READ_FRAMEBUFFER_BINDING = 36010;
/* harmony export (immutable) */ __webpack_exports__["_296"] = READ_FRAMEBUFFER_BINDING;

const RED = 6403;
/* harmony export (immutable) */ __webpack_exports__["_297"] = RED;

const RED_BITS = 3410;
/* harmony export (immutable) */ __webpack_exports__["_298"] = RED_BITS;

const RED_INTEGER = 36244;
/* harmony export (immutable) */ __webpack_exports__["_299"] = RED_INTEGER;

const RENDERBUFFER = 36161;
/* harmony export (immutable) */ __webpack_exports__["_300"] = RENDERBUFFER;

const RENDERBUFFER_ALPHA_SIZE = 36179;
/* harmony export (immutable) */ __webpack_exports__["_301"] = RENDERBUFFER_ALPHA_SIZE;

const RENDERBUFFER_BINDING = 36007;
/* harmony export (immutable) */ __webpack_exports__["_302"] = RENDERBUFFER_BINDING;

const RENDERBUFFER_BLUE_SIZE = 36178;
/* harmony export (immutable) */ __webpack_exports__["_303"] = RENDERBUFFER_BLUE_SIZE;

const RENDERBUFFER_DEPTH_SIZE = 36180;
/* harmony export (immutable) */ __webpack_exports__["_304"] = RENDERBUFFER_DEPTH_SIZE;

const RENDERBUFFER_GREEN_SIZE = 36177;
/* harmony export (immutable) */ __webpack_exports__["_305"] = RENDERBUFFER_GREEN_SIZE;

const RENDERBUFFER_HEIGHT = 36163;
/* harmony export (immutable) */ __webpack_exports__["_306"] = RENDERBUFFER_HEIGHT;

const RENDERBUFFER_INTERNAL_FORMAT = 36164;
/* harmony export (immutable) */ __webpack_exports__["_307"] = RENDERBUFFER_INTERNAL_FORMAT;

const RENDERBUFFER_RED_SIZE = 36176;
/* harmony export (immutable) */ __webpack_exports__["_308"] = RENDERBUFFER_RED_SIZE;

const RENDERBUFFER_SAMPLES = 36011;
/* harmony export (immutable) */ __webpack_exports__["_309"] = RENDERBUFFER_SAMPLES;

const RENDERBUFFER_STENCIL_SIZE = 36181;
/* harmony export (immutable) */ __webpack_exports__["_310"] = RENDERBUFFER_STENCIL_SIZE;

const RENDERBUFFER_WIDTH = 36162;
/* harmony export (immutable) */ __webpack_exports__["_311"] = RENDERBUFFER_WIDTH;

const RENDERER = 7937;
/* harmony export (immutable) */ __webpack_exports__["_312"] = RENDERER;

const REPEAT = 10497;
/* harmony export (immutable) */ __webpack_exports__["_313"] = REPEAT;

const REPLACE = 7681;
/* harmony export (immutable) */ __webpack_exports__["_314"] = REPLACE;

const RG = 33319;
/* harmony export (immutable) */ __webpack_exports__["_315"] = RG;

const RG8 = 33323;
/* harmony export (immutable) */ __webpack_exports__["_322"] = RG8;

const RG8I = 33335;
/* harmony export (immutable) */ __webpack_exports__["_323"] = RG8I;

const RG8UI = 33336;
/* harmony export (immutable) */ __webpack_exports__["_324"] = RG8UI;

const RG8_SNORM = 36757;
/* harmony export (immutable) */ __webpack_exports__["_325"] = RG8_SNORM;

const RG16F = 33327;
/* harmony export (immutable) */ __webpack_exports__["_316"] = RG16F;

const RG16I = 33337;
/* harmony export (immutable) */ __webpack_exports__["_317"] = RG16I;

const RG16UI = 33338;
/* harmony export (immutable) */ __webpack_exports__["_318"] = RG16UI;

const RG32F = 33328;
/* harmony export (immutable) */ __webpack_exports__["_319"] = RG32F;

const RG32I = 33339;
/* harmony export (immutable) */ __webpack_exports__["_320"] = RG32I;

const RG32UI = 33340;
/* harmony export (immutable) */ __webpack_exports__["_321"] = RG32UI;

const RGB = 6407;
/* harmony export (immutable) */ __webpack_exports__["_326"] = RGB;

const RGB5_A1 = 32855;
/* harmony export (immutable) */ __webpack_exports__["_336"] = RGB5_A1;

const RGB8 = 32849;
/* harmony export (immutable) */ __webpack_exports__["_337"] = RGB8;

const RGB8I = 36239;
/* harmony export (immutable) */ __webpack_exports__["_338"] = RGB8I;

const RGB8UI = 36221;
/* harmony export (immutable) */ __webpack_exports__["_339"] = RGB8UI;

const RGB8_SNORM = 36758;
/* harmony export (immutable) */ __webpack_exports__["_340"] = RGB8_SNORM;

const RGB9_E5 = 35901;
/* harmony export (immutable) */ __webpack_exports__["_341"] = RGB9_E5;

const RGB10_A2 = 32857;
/* harmony export (immutable) */ __webpack_exports__["_327"] = RGB10_A2;

const RGB10_A2UI = 36975;
/* harmony export (immutable) */ __webpack_exports__["_328"] = RGB10_A2UI;

const RGB16F = 34843;
/* harmony export (immutable) */ __webpack_exports__["_329"] = RGB16F;

const RGB16I = 36233;
/* harmony export (immutable) */ __webpack_exports__["_330"] = RGB16I;

const RGB16UI = 36215;
/* harmony export (immutable) */ __webpack_exports__["_331"] = RGB16UI;

const RGB32F = 34837;
/* harmony export (immutable) */ __webpack_exports__["_332"] = RGB32F;

const RGB32I = 36227;
/* harmony export (immutable) */ __webpack_exports__["_333"] = RGB32I;

const RGB32UI = 36209;
/* harmony export (immutable) */ __webpack_exports__["_334"] = RGB32UI;

const RGB565 = 36194;
/* harmony export (immutable) */ __webpack_exports__["_335"] = RGB565;

const RGBA = 6408;
/* harmony export (immutable) */ __webpack_exports__["_342"] = RGBA;

const RGBA4 = 32854;
/* harmony export (immutable) */ __webpack_exports__["_349"] = RGBA4;

const RGBA8 = 32856;
/* harmony export (immutable) */ __webpack_exports__["_350"] = RGBA8;

const RGBA8I = 36238;
/* harmony export (immutable) */ __webpack_exports__["_351"] = RGBA8I;

const RGBA8UI = 36220;
/* harmony export (immutable) */ __webpack_exports__["_352"] = RGBA8UI;

const RGBA8_SNORM = 36759;
/* harmony export (immutable) */ __webpack_exports__["_353"] = RGBA8_SNORM;

const RGBA16F = 34842;
/* harmony export (immutable) */ __webpack_exports__["_343"] = RGBA16F;

const RGBA16I = 36232;
/* harmony export (immutable) */ __webpack_exports__["_344"] = RGBA16I;

const RGBA16UI = 36214;
/* harmony export (immutable) */ __webpack_exports__["_345"] = RGBA16UI;

const RGBA32F = 34836;
/* harmony export (immutable) */ __webpack_exports__["_346"] = RGBA32F;

const RGBA32I = 36226;
/* harmony export (immutable) */ __webpack_exports__["_347"] = RGBA32I;

const RGBA32UI = 36208;
/* harmony export (immutable) */ __webpack_exports__["_348"] = RGBA32UI;

const RGBA_INTEGER = 36249;
/* harmony export (immutable) */ __webpack_exports__["_354"] = RGBA_INTEGER;

const RGB_INTEGER = 36248;
/* harmony export (immutable) */ __webpack_exports__["_355"] = RGB_INTEGER;

const RG_INTEGER = 33320;
/* harmony export (immutable) */ __webpack_exports__["_356"] = RG_INTEGER;

const SAMPLER_2D = 35678;
/* harmony export (immutable) */ __webpack_exports__["_357"] = SAMPLER_2D;

const SAMPLER_2D_ARRAY = 36289;
/* harmony export (immutable) */ __webpack_exports__["_358"] = SAMPLER_2D_ARRAY;

const SAMPLER_2D_ARRAY_SHADOW = 36292;
/* harmony export (immutable) */ __webpack_exports__["_359"] = SAMPLER_2D_ARRAY_SHADOW;

const SAMPLER_2D_SHADOW = 35682;
/* harmony export (immutable) */ __webpack_exports__["_360"] = SAMPLER_2D_SHADOW;

const SAMPLER_3D = 35679;
/* harmony export (immutable) */ __webpack_exports__["_361"] = SAMPLER_3D;

const SAMPLER_BINDING = 35097;
/* harmony export (immutable) */ __webpack_exports__["_362"] = SAMPLER_BINDING;

const SAMPLER_CUBE = 35680;
/* harmony export (immutable) */ __webpack_exports__["_363"] = SAMPLER_CUBE;

const SAMPLER_CUBE_SHADOW = 36293;
/* harmony export (immutable) */ __webpack_exports__["_364"] = SAMPLER_CUBE_SHADOW;

const SAMPLES = 32937;
/* harmony export (immutable) */ __webpack_exports__["_365"] = SAMPLES;

const SAMPLE_ALPHA_TO_COVERAGE = 32926;
/* harmony export (immutable) */ __webpack_exports__["_366"] = SAMPLE_ALPHA_TO_COVERAGE;

const SAMPLE_BUFFERS = 32936;
/* harmony export (immutable) */ __webpack_exports__["_367"] = SAMPLE_BUFFERS;

const SAMPLE_COVERAGE = 32928;
/* harmony export (immutable) */ __webpack_exports__["_368"] = SAMPLE_COVERAGE;

const SAMPLE_COVERAGE_INVERT = 32939;
/* harmony export (immutable) */ __webpack_exports__["_369"] = SAMPLE_COVERAGE_INVERT;

const SAMPLE_COVERAGE_VALUE = 32938;
/* harmony export (immutable) */ __webpack_exports__["_370"] = SAMPLE_COVERAGE_VALUE;

const SCISSOR_BOX = 3088;
/* harmony export (immutable) */ __webpack_exports__["_371"] = SCISSOR_BOX;

const SCISSOR_TEST = 3089;
/* harmony export (immutable) */ __webpack_exports__["_372"] = SCISSOR_TEST;

const SEPARATE_ATTRIBS = 35981;
/* harmony export (immutable) */ __webpack_exports__["_373"] = SEPARATE_ATTRIBS;

const SHADER_TYPE = 35663;
/* harmony export (immutable) */ __webpack_exports__["_374"] = SHADER_TYPE;

const SHADING_LANGUAGE_VERSION = 35724;
/* harmony export (immutable) */ __webpack_exports__["_375"] = SHADING_LANGUAGE_VERSION;

const SHORT = 5122;
/* harmony export (immutable) */ __webpack_exports__["_376"] = SHORT;

const SIGNALED = 37145;
/* harmony export (immutable) */ __webpack_exports__["_377"] = SIGNALED;

const SIGNED_NORMALIZED = 36764;
/* harmony export (immutable) */ __webpack_exports__["_378"] = SIGNED_NORMALIZED;

const SRC_ALPHA = 770;
/* harmony export (immutable) */ __webpack_exports__["_379"] = SRC_ALPHA;

const SRC_ALPHA_SATURATE = 776;
/* harmony export (immutable) */ __webpack_exports__["_380"] = SRC_ALPHA_SATURATE;

const SRC_COLOR = 768;
/* harmony export (immutable) */ __webpack_exports__["_381"] = SRC_COLOR;

const SRGB = 35904;
/* harmony export (immutable) */ __webpack_exports__["_382"] = SRGB;

const SRGB8 = 35905;
/* harmony export (immutable) */ __webpack_exports__["_383"] = SRGB8;

const SRGB8_ALPHA8 = 35907;
/* harmony export (immutable) */ __webpack_exports__["_384"] = SRGB8_ALPHA8;

const STATIC_COPY = 35046;
/* harmony export (immutable) */ __webpack_exports__["_385"] = STATIC_COPY;

const STATIC_DRAW = 35044;
/* harmony export (immutable) */ __webpack_exports__["_386"] = STATIC_DRAW;

const STATIC_READ = 35045;
/* harmony export (immutable) */ __webpack_exports__["_387"] = STATIC_READ;

const STENCIL = 6146;
/* harmony export (immutable) */ __webpack_exports__["_388"] = STENCIL;

const STENCIL_ATTACHMENT = 36128;
/* harmony export (immutable) */ __webpack_exports__["_389"] = STENCIL_ATTACHMENT;

const STENCIL_BACK_FAIL = 34817;
/* harmony export (immutable) */ __webpack_exports__["_390"] = STENCIL_BACK_FAIL;

const STENCIL_BACK_FUNC = 34816;
/* harmony export (immutable) */ __webpack_exports__["_391"] = STENCIL_BACK_FUNC;

const STENCIL_BACK_PASS_DEPTH_FAIL = 34818;
/* harmony export (immutable) */ __webpack_exports__["_392"] = STENCIL_BACK_PASS_DEPTH_FAIL;

const STENCIL_BACK_PASS_DEPTH_PASS = 34819;
/* harmony export (immutable) */ __webpack_exports__["_393"] = STENCIL_BACK_PASS_DEPTH_PASS;

const STENCIL_BACK_REF = 36003;
/* harmony export (immutable) */ __webpack_exports__["_394"] = STENCIL_BACK_REF;

const STENCIL_BACK_VALUE_MASK = 36004;
/* harmony export (immutable) */ __webpack_exports__["_395"] = STENCIL_BACK_VALUE_MASK;

const STENCIL_BACK_WRITEMASK = 36005;
/* harmony export (immutable) */ __webpack_exports__["_396"] = STENCIL_BACK_WRITEMASK;

const STENCIL_BITS = 3415;
/* harmony export (immutable) */ __webpack_exports__["_397"] = STENCIL_BITS;

const STENCIL_BUFFER_BIT = 1024;
/* harmony export (immutable) */ __webpack_exports__["_398"] = STENCIL_BUFFER_BIT;

const STENCIL_CLEAR_VALUE = 2961;
/* harmony export (immutable) */ __webpack_exports__["_399"] = STENCIL_CLEAR_VALUE;

const STENCIL_FAIL = 2964;
/* harmony export (immutable) */ __webpack_exports__["_400"] = STENCIL_FAIL;

const STENCIL_FUNC = 2962;
/* harmony export (immutable) */ __webpack_exports__["_401"] = STENCIL_FUNC;

const STENCIL_INDEX8 = 36168;
/* harmony export (immutable) */ __webpack_exports__["_402"] = STENCIL_INDEX8;

const STENCIL_PASS_DEPTH_FAIL = 2965;
/* harmony export (immutable) */ __webpack_exports__["_403"] = STENCIL_PASS_DEPTH_FAIL;

const STENCIL_PASS_DEPTH_PASS = 2966;
/* harmony export (immutable) */ __webpack_exports__["_404"] = STENCIL_PASS_DEPTH_PASS;

const STENCIL_REF = 2967;
/* harmony export (immutable) */ __webpack_exports__["_405"] = STENCIL_REF;

const STENCIL_TEST = 2960;
/* harmony export (immutable) */ __webpack_exports__["_406"] = STENCIL_TEST;

const STENCIL_VALUE_MASK = 2963;
/* harmony export (immutable) */ __webpack_exports__["_407"] = STENCIL_VALUE_MASK;

const STENCIL_WRITEMASK = 2968;
/* harmony export (immutable) */ __webpack_exports__["_408"] = STENCIL_WRITEMASK;

const STREAM_COPY = 35042;
/* harmony export (immutable) */ __webpack_exports__["_409"] = STREAM_COPY;

const STREAM_DRAW = 35040;
/* harmony export (immutable) */ __webpack_exports__["_410"] = STREAM_DRAW;

const STREAM_READ = 35041;
/* harmony export (immutable) */ __webpack_exports__["_411"] = STREAM_READ;

const SUBPIXEL_BITS = 3408;
/* harmony export (immutable) */ __webpack_exports__["_412"] = SUBPIXEL_BITS;

const SYNC_CONDITION = 37139;
/* harmony export (immutable) */ __webpack_exports__["_413"] = SYNC_CONDITION;

const SYNC_FENCE = 37142;
/* harmony export (immutable) */ __webpack_exports__["_414"] = SYNC_FENCE;

const SYNC_FLAGS = 37141;
/* harmony export (immutable) */ __webpack_exports__["_415"] = SYNC_FLAGS;

const SYNC_FLUSH_COMMANDS_BIT = 1;
/* harmony export (immutable) */ __webpack_exports__["_416"] = SYNC_FLUSH_COMMANDS_BIT;

const SYNC_GPU_COMMANDS_COMPLETE = 37143;
/* harmony export (immutable) */ __webpack_exports__["_417"] = SYNC_GPU_COMMANDS_COMPLETE;

const SYNC_STATUS = 37140;
/* harmony export (immutable) */ __webpack_exports__["_418"] = SYNC_STATUS;

const TEXTURE = 5890;
/* harmony export (immutable) */ __webpack_exports__["_419"] = TEXTURE;

const TEXTURE0 = 33984;
/* harmony export (immutable) */ __webpack_exports__["_420"] = TEXTURE0;

const TEXTURE1 = 33985;
/* harmony export (immutable) */ __webpack_exports__["_421"] = TEXTURE1;

const TEXTURE2 = 33986;
/* harmony export (immutable) */ __webpack_exports__["_432"] = TEXTURE2;

const TEXTURE3 = 33987;
/* harmony export (immutable) */ __webpack_exports__["_443"] = TEXTURE3;

const TEXTURE4 = 33988;
/* harmony export (immutable) */ __webpack_exports__["_446"] = TEXTURE4;

const TEXTURE5 = 33989;
/* harmony export (immutable) */ __webpack_exports__["_447"] = TEXTURE5;

const TEXTURE6 = 33990;
/* harmony export (immutable) */ __webpack_exports__["_448"] = TEXTURE6;

const TEXTURE7 = 33991;
/* harmony export (immutable) */ __webpack_exports__["_449"] = TEXTURE7;

const TEXTURE8 = 33992;
/* harmony export (immutable) */ __webpack_exports__["_450"] = TEXTURE8;

const TEXTURE9 = 33993;
/* harmony export (immutable) */ __webpack_exports__["_451"] = TEXTURE9;

const TEXTURE10 = 33994;
/* harmony export (immutable) */ __webpack_exports__["_422"] = TEXTURE10;

const TEXTURE11 = 33995;
/* harmony export (immutable) */ __webpack_exports__["_423"] = TEXTURE11;

const TEXTURE12 = 33996;
/* harmony export (immutable) */ __webpack_exports__["_424"] = TEXTURE12;

const TEXTURE13 = 33997;
/* harmony export (immutable) */ __webpack_exports__["_425"] = TEXTURE13;

const TEXTURE14 = 33998;
/* harmony export (immutable) */ __webpack_exports__["_426"] = TEXTURE14;

const TEXTURE15 = 33999;
/* harmony export (immutable) */ __webpack_exports__["_427"] = TEXTURE15;

const TEXTURE16 = 34000;
/* harmony export (immutable) */ __webpack_exports__["_428"] = TEXTURE16;

const TEXTURE17 = 34001;
/* harmony export (immutable) */ __webpack_exports__["_429"] = TEXTURE17;

const TEXTURE18 = 34002;
/* harmony export (immutable) */ __webpack_exports__["_430"] = TEXTURE18;

const TEXTURE19 = 34003;
/* harmony export (immutable) */ __webpack_exports__["_431"] = TEXTURE19;

const TEXTURE20 = 34004;
/* harmony export (immutable) */ __webpack_exports__["_433"] = TEXTURE20;

const TEXTURE21 = 34005;
/* harmony export (immutable) */ __webpack_exports__["_434"] = TEXTURE21;

const TEXTURE22 = 34006;
/* harmony export (immutable) */ __webpack_exports__["_435"] = TEXTURE22;

const TEXTURE23 = 34007;
/* harmony export (immutable) */ __webpack_exports__["_436"] = TEXTURE23;

const TEXTURE24 = 34008;
/* harmony export (immutable) */ __webpack_exports__["_437"] = TEXTURE24;

const TEXTURE25 = 34009;
/* harmony export (immutable) */ __webpack_exports__["_438"] = TEXTURE25;

const TEXTURE26 = 34010;
/* harmony export (immutable) */ __webpack_exports__["_439"] = TEXTURE26;

const TEXTURE27 = 34011;
/* harmony export (immutable) */ __webpack_exports__["_440"] = TEXTURE27;

const TEXTURE28 = 34012;
/* harmony export (immutable) */ __webpack_exports__["_441"] = TEXTURE28;

const TEXTURE29 = 34013;
/* harmony export (immutable) */ __webpack_exports__["_442"] = TEXTURE29;

const TEXTURE30 = 34014;
/* harmony export (immutable) */ __webpack_exports__["_444"] = TEXTURE30;

const TEXTURE31 = 34015;
/* harmony export (immutable) */ __webpack_exports__["_445"] = TEXTURE31;

const TEXTURE_2D = 3553;
/* harmony export (immutable) */ __webpack_exports__["_452"] = TEXTURE_2D;

const TEXTURE_2D_ARRAY = 35866;
/* harmony export (immutable) */ __webpack_exports__["_453"] = TEXTURE_2D_ARRAY;

const TEXTURE_3D = 32879;
/* harmony export (immutable) */ __webpack_exports__["_454"] = TEXTURE_3D;

const TEXTURE_BASE_LEVEL = 33084;
/* harmony export (immutable) */ __webpack_exports__["_455"] = TEXTURE_BASE_LEVEL;

const TEXTURE_BINDING_2D = 32873;
/* harmony export (immutable) */ __webpack_exports__["_456"] = TEXTURE_BINDING_2D;

const TEXTURE_BINDING_2D_ARRAY = 35869;
/* harmony export (immutable) */ __webpack_exports__["_457"] = TEXTURE_BINDING_2D_ARRAY;

const TEXTURE_BINDING_3D = 32874;
/* harmony export (immutable) */ __webpack_exports__["_458"] = TEXTURE_BINDING_3D;

const TEXTURE_BINDING_CUBE_MAP = 34068;
/* harmony export (immutable) */ __webpack_exports__["_459"] = TEXTURE_BINDING_CUBE_MAP;

const TEXTURE_COMPARE_FUNC = 34893;
/* harmony export (immutable) */ __webpack_exports__["_460"] = TEXTURE_COMPARE_FUNC;

const TEXTURE_COMPARE_MODE = 34892;
/* harmony export (immutable) */ __webpack_exports__["_461"] = TEXTURE_COMPARE_MODE;

const TEXTURE_CUBE_MAP = 34067;
/* harmony export (immutable) */ __webpack_exports__["_462"] = TEXTURE_CUBE_MAP;

const TEXTURE_CUBE_MAP_NEGATIVE_X = 34070;
/* harmony export (immutable) */ __webpack_exports__["_463"] = TEXTURE_CUBE_MAP_NEGATIVE_X;

const TEXTURE_CUBE_MAP_NEGATIVE_Y = 34072;
/* harmony export (immutable) */ __webpack_exports__["_464"] = TEXTURE_CUBE_MAP_NEGATIVE_Y;

const TEXTURE_CUBE_MAP_NEGATIVE_Z = 34074;
/* harmony export (immutable) */ __webpack_exports__["_465"] = TEXTURE_CUBE_MAP_NEGATIVE_Z;

const TEXTURE_CUBE_MAP_POSITIVE_X = 34069;
/* harmony export (immutable) */ __webpack_exports__["_466"] = TEXTURE_CUBE_MAP_POSITIVE_X;

const TEXTURE_CUBE_MAP_POSITIVE_Y = 34071;
/* harmony export (immutable) */ __webpack_exports__["_467"] = TEXTURE_CUBE_MAP_POSITIVE_Y;

const TEXTURE_CUBE_MAP_POSITIVE_Z = 34073;
/* harmony export (immutable) */ __webpack_exports__["_468"] = TEXTURE_CUBE_MAP_POSITIVE_Z;

const TEXTURE_IMMUTABLE_FORMAT = 37167;
/* harmony export (immutable) */ __webpack_exports__["_469"] = TEXTURE_IMMUTABLE_FORMAT;

const TEXTURE_IMMUTABLE_LEVELS = 33503;
/* harmony export (immutable) */ __webpack_exports__["_470"] = TEXTURE_IMMUTABLE_LEVELS;

const TEXTURE_MAG_FILTER = 10240;
/* harmony export (immutable) */ __webpack_exports__["_471"] = TEXTURE_MAG_FILTER;

const TEXTURE_MAX_LEVEL = 33085;
/* harmony export (immutable) */ __webpack_exports__["_472"] = TEXTURE_MAX_LEVEL;

const TEXTURE_MAX_LOD = 33083;
/* harmony export (immutable) */ __webpack_exports__["_473"] = TEXTURE_MAX_LOD;

const TEXTURE_MIN_FILTER = 10241;
/* harmony export (immutable) */ __webpack_exports__["_474"] = TEXTURE_MIN_FILTER;

const TEXTURE_MIN_LOD = 33082;
/* harmony export (immutable) */ __webpack_exports__["_475"] = TEXTURE_MIN_LOD;

const TEXTURE_WRAP_R = 32882;
/* harmony export (immutable) */ __webpack_exports__["_476"] = TEXTURE_WRAP_R;

const TEXTURE_WRAP_S = 10242;
/* harmony export (immutable) */ __webpack_exports__["_477"] = TEXTURE_WRAP_S;

const TEXTURE_WRAP_T = 10243;
/* harmony export (immutable) */ __webpack_exports__["_478"] = TEXTURE_WRAP_T;

const TIMEOUT_EXPIRED = 37147;
/* harmony export (immutable) */ __webpack_exports__["_479"] = TIMEOUT_EXPIRED;

const TIMEOUT_IGNORED = -1;
/* harmony export (immutable) */ __webpack_exports__["_480"] = TIMEOUT_IGNORED;

const TRANSFORM_FEEDBACK = 36386;
/* harmony export (immutable) */ __webpack_exports__["_481"] = TRANSFORM_FEEDBACK;

const TRANSFORM_FEEDBACK_ACTIVE = 36388;
/* harmony export (immutable) */ __webpack_exports__["_482"] = TRANSFORM_FEEDBACK_ACTIVE;

const TRANSFORM_FEEDBACK_BINDING = 36389;
/* harmony export (immutable) */ __webpack_exports__["_483"] = TRANSFORM_FEEDBACK_BINDING;

const TRANSFORM_FEEDBACK_BUFFER = 35982;
/* harmony export (immutable) */ __webpack_exports__["_484"] = TRANSFORM_FEEDBACK_BUFFER;

const TRANSFORM_FEEDBACK_BUFFER_BINDING = 35983;
/* harmony export (immutable) */ __webpack_exports__["_485"] = TRANSFORM_FEEDBACK_BUFFER_BINDING;

const TRANSFORM_FEEDBACK_BUFFER_MODE = 35967;
/* harmony export (immutable) */ __webpack_exports__["_486"] = TRANSFORM_FEEDBACK_BUFFER_MODE;

const TRANSFORM_FEEDBACK_BUFFER_SIZE = 35973;
/* harmony export (immutable) */ __webpack_exports__["_487"] = TRANSFORM_FEEDBACK_BUFFER_SIZE;

const TRANSFORM_FEEDBACK_BUFFER_START = 35972;
/* harmony export (immutable) */ __webpack_exports__["_488"] = TRANSFORM_FEEDBACK_BUFFER_START;

const TRANSFORM_FEEDBACK_PAUSED = 36387;
/* harmony export (immutable) */ __webpack_exports__["_489"] = TRANSFORM_FEEDBACK_PAUSED;

const TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN = 35976;
/* harmony export (immutable) */ __webpack_exports__["_490"] = TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN;

const TRANSFORM_FEEDBACK_VARYINGS = 35971;
/* harmony export (immutable) */ __webpack_exports__["_491"] = TRANSFORM_FEEDBACK_VARYINGS;

const TRIANGLES = 4;
/* harmony export (immutable) */ __webpack_exports__["_492"] = TRIANGLES;

const TRIANGLE_FAN = 6;
/* harmony export (immutable) */ __webpack_exports__["_493"] = TRIANGLE_FAN;

const TRIANGLE_STRIP = 5;
/* harmony export (immutable) */ __webpack_exports__["_494"] = TRIANGLE_STRIP;

const UNIFORM_ARRAY_STRIDE = 35388;
/* harmony export (immutable) */ __webpack_exports__["_496"] = UNIFORM_ARRAY_STRIDE;

const UNIFORM_BLOCK_ACTIVE_UNIFORMS = 35394;
/* harmony export (immutable) */ __webpack_exports__["_497"] = UNIFORM_BLOCK_ACTIVE_UNIFORMS;

const UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES = 35395;
/* harmony export (immutable) */ __webpack_exports__["_498"] = UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES;

const UNIFORM_BLOCK_BINDING = 35391;
/* harmony export (immutable) */ __webpack_exports__["_499"] = UNIFORM_BLOCK_BINDING;

const UNIFORM_BLOCK_DATA_SIZE = 35392;
/* harmony export (immutable) */ __webpack_exports__["_500"] = UNIFORM_BLOCK_DATA_SIZE;

const UNIFORM_BLOCK_INDEX = 35386;
/* harmony export (immutable) */ __webpack_exports__["_501"] = UNIFORM_BLOCK_INDEX;

const UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER = 35398;
/* harmony export (immutable) */ __webpack_exports__["_502"] = UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER;

const UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER = 35396;
/* harmony export (immutable) */ __webpack_exports__["_503"] = UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER;

const UNIFORM_BUFFER = 35345;
/* harmony export (immutable) */ __webpack_exports__["_504"] = UNIFORM_BUFFER;

const UNIFORM_BUFFER_BINDING = 35368;
/* harmony export (immutable) */ __webpack_exports__["_505"] = UNIFORM_BUFFER_BINDING;

const UNIFORM_BUFFER_OFFSET_ALIGNMENT = 35380;
/* harmony export (immutable) */ __webpack_exports__["_506"] = UNIFORM_BUFFER_OFFSET_ALIGNMENT;

const UNIFORM_BUFFER_SIZE = 35370;
/* harmony export (immutable) */ __webpack_exports__["_507"] = UNIFORM_BUFFER_SIZE;

const UNIFORM_BUFFER_START = 35369;
/* harmony export (immutable) */ __webpack_exports__["_508"] = UNIFORM_BUFFER_START;

const UNIFORM_IS_ROW_MAJOR = 35390;
/* harmony export (immutable) */ __webpack_exports__["_509"] = UNIFORM_IS_ROW_MAJOR;

const UNIFORM_MATRIX_STRIDE = 35389;
/* harmony export (immutable) */ __webpack_exports__["_510"] = UNIFORM_MATRIX_STRIDE;

const UNIFORM_OFFSET = 35387;
/* harmony export (immutable) */ __webpack_exports__["_511"] = UNIFORM_OFFSET;

const UNIFORM_SIZE = 35384;
/* harmony export (immutable) */ __webpack_exports__["_512"] = UNIFORM_SIZE;

const UNIFORM_TYPE = 35383;
/* harmony export (immutable) */ __webpack_exports__["_513"] = UNIFORM_TYPE;

const UNPACK_ALIGNMENT = 3317;
/* harmony export (immutable) */ __webpack_exports__["_514"] = UNPACK_ALIGNMENT;

const UNPACK_COLORSPACE_CONVERSION_WEBGL = 37443;
/* harmony export (immutable) */ __webpack_exports__["_515"] = UNPACK_COLORSPACE_CONVERSION_WEBGL;

const UNPACK_FLIP_Y_WEBGL = 37440;
/* harmony export (immutable) */ __webpack_exports__["_516"] = UNPACK_FLIP_Y_WEBGL;

const UNPACK_IMAGE_HEIGHT = 32878;
/* harmony export (immutable) */ __webpack_exports__["_517"] = UNPACK_IMAGE_HEIGHT;

const UNPACK_PREMULTIPLY_ALPHA_WEBGL = 37441;
/* harmony export (immutable) */ __webpack_exports__["_518"] = UNPACK_PREMULTIPLY_ALPHA_WEBGL;

const UNPACK_ROW_LENGTH = 3314;
/* harmony export (immutable) */ __webpack_exports__["_519"] = UNPACK_ROW_LENGTH;

const UNPACK_SKIP_IMAGES = 32877;
/* harmony export (immutable) */ __webpack_exports__["_520"] = UNPACK_SKIP_IMAGES;

const UNPACK_SKIP_PIXELS = 3316;
/* harmony export (immutable) */ __webpack_exports__["_521"] = UNPACK_SKIP_PIXELS;

const UNPACK_SKIP_ROWS = 3315;
/* harmony export (immutable) */ __webpack_exports__["_522"] = UNPACK_SKIP_ROWS;

const UNSIGNALED = 37144;
/* harmony export (immutable) */ __webpack_exports__["_523"] = UNSIGNALED;

const UNSIGNED_BYTE = 5121;
/* harmony export (immutable) */ __webpack_exports__["_524"] = UNSIGNED_BYTE;

const UNSIGNED_INT = 5125;
/* harmony export (immutable) */ __webpack_exports__["_525"] = UNSIGNED_INT;

const UNSIGNED_INT_2_10_10_10_REV = 33640;
/* harmony export (immutable) */ __webpack_exports__["_528"] = UNSIGNED_INT_2_10_10_10_REV;

const UNSIGNED_INT_5_9_9_9_REV = 35902;
/* harmony export (immutable) */ __webpack_exports__["_529"] = UNSIGNED_INT_5_9_9_9_REV;

const UNSIGNED_INT_10F_11F_11F_REV = 35899;
/* harmony export (immutable) */ __webpack_exports__["_526"] = UNSIGNED_INT_10F_11F_11F_REV;

const UNSIGNED_INT_24_8 = 34042;
/* harmony export (immutable) */ __webpack_exports__["_527"] = UNSIGNED_INT_24_8;

const UNSIGNED_INT_SAMPLER_2D = 36306;
/* harmony export (immutable) */ __webpack_exports__["_530"] = UNSIGNED_INT_SAMPLER_2D;

const UNSIGNED_INT_SAMPLER_2D_ARRAY = 36311;
/* harmony export (immutable) */ __webpack_exports__["_531"] = UNSIGNED_INT_SAMPLER_2D_ARRAY;

const UNSIGNED_INT_SAMPLER_3D = 36307;
/* harmony export (immutable) */ __webpack_exports__["_532"] = UNSIGNED_INT_SAMPLER_3D;

const UNSIGNED_INT_SAMPLER_CUBE = 36308;
/* harmony export (immutable) */ __webpack_exports__["_533"] = UNSIGNED_INT_SAMPLER_CUBE;

const UNSIGNED_INT_VEC2 = 36294;
/* harmony export (immutable) */ __webpack_exports__["_534"] = UNSIGNED_INT_VEC2;

const UNSIGNED_INT_VEC3 = 36295;
/* harmony export (immutable) */ __webpack_exports__["_535"] = UNSIGNED_INT_VEC3;

const UNSIGNED_INT_VEC4 = 36296;
/* harmony export (immutable) */ __webpack_exports__["_536"] = UNSIGNED_INT_VEC4;

const UNSIGNED_NORMALIZED = 35863;
/* harmony export (immutable) */ __webpack_exports__["_537"] = UNSIGNED_NORMALIZED;

const UNSIGNED_SHORT = 5123;
/* harmony export (immutable) */ __webpack_exports__["_538"] = UNSIGNED_SHORT;

const UNSIGNED_SHORT_4_4_4_4 = 32819;
/* harmony export (immutable) */ __webpack_exports__["_539"] = UNSIGNED_SHORT_4_4_4_4;

const UNSIGNED_SHORT_5_5_5_1 = 32820;
/* harmony export (immutable) */ __webpack_exports__["_540"] = UNSIGNED_SHORT_5_5_5_1;

const UNSIGNED_SHORT_5_6_5 = 33635;
/* harmony export (immutable) */ __webpack_exports__["_541"] = UNSIGNED_SHORT_5_6_5;

const VALIDATE_STATUS = 35715;
/* harmony export (immutable) */ __webpack_exports__["_542"] = VALIDATE_STATUS;

const VENDOR = 7936;
/* harmony export (immutable) */ __webpack_exports__["_543"] = VENDOR;

const VERSION = 7938;
/* harmony export (immutable) */ __webpack_exports__["_544"] = VERSION;

const VERTEX_ARRAY_BINDING = 34229;
/* harmony export (immutable) */ __webpack_exports__["_545"] = VERTEX_ARRAY_BINDING;

const VERTEX_ATTRIB_ARRAY_BUFFER_BINDING = 34975;
/* harmony export (immutable) */ __webpack_exports__["_546"] = VERTEX_ATTRIB_ARRAY_BUFFER_BINDING;

const VERTEX_ATTRIB_ARRAY_DIVISOR = 35070;
/* harmony export (immutable) */ __webpack_exports__["_547"] = VERTEX_ATTRIB_ARRAY_DIVISOR;

const VERTEX_ATTRIB_ARRAY_ENABLED = 34338;
/* harmony export (immutable) */ __webpack_exports__["_548"] = VERTEX_ATTRIB_ARRAY_ENABLED;

const VERTEX_ATTRIB_ARRAY_INTEGER = 35069;
/* harmony export (immutable) */ __webpack_exports__["_549"] = VERTEX_ATTRIB_ARRAY_INTEGER;

const VERTEX_ATTRIB_ARRAY_NORMALIZED = 34922;
/* harmony export (immutable) */ __webpack_exports__["_550"] = VERTEX_ATTRIB_ARRAY_NORMALIZED;

const VERTEX_ATTRIB_ARRAY_POINTER = 34373;
/* harmony export (immutable) */ __webpack_exports__["_551"] = VERTEX_ATTRIB_ARRAY_POINTER;

const VERTEX_ATTRIB_ARRAY_SIZE = 34339;
/* harmony export (immutable) */ __webpack_exports__["_552"] = VERTEX_ATTRIB_ARRAY_SIZE;

const VERTEX_ATTRIB_ARRAY_STRIDE = 34340;
/* harmony export (immutable) */ __webpack_exports__["_553"] = VERTEX_ATTRIB_ARRAY_STRIDE;

const VERTEX_ATTRIB_ARRAY_TYPE = 34341;
/* harmony export (immutable) */ __webpack_exports__["_554"] = VERTEX_ATTRIB_ARRAY_TYPE;

const VERTEX_SHADER = 35633;
/* harmony export (immutable) */ __webpack_exports__["_555"] = VERTEX_SHADER;

const VIEWPORT = 2978;
/* harmony export (immutable) */ __webpack_exports__["_556"] = VIEWPORT;

const WAIT_FAILED = 37149;
/* harmony export (immutable) */ __webpack_exports__["_557"] = WAIT_FAILED;

const ZERO = 0;
/* harmony export (immutable) */ __webpack_exports__["_559"] = ZERO;


const COMPRESSED_RGB_S3TC_DXT1_EXT        = 0x83F0;
/* harmony export (immutable) */ __webpack_exports__["_32"] = COMPRESSED_RGB_S3TC_DXT1_EXT;

const COMPRESSED_RGBA_S3TC_DXT1_EXT       = 0x83F1;
/* harmony export (immutable) */ __webpack_exports__["_27"] = COMPRESSED_RGBA_S3TC_DXT1_EXT;

const COMPRESSED_RGBA_S3TC_DXT3_EXT       = 0x83F2;
/* harmony export (immutable) */ __webpack_exports__["_28"] = COMPRESSED_RGBA_S3TC_DXT3_EXT;

const COMPRESSED_RGBA_S3TC_DXT5_EXT       = 0x83F3;
/* harmony export (immutable) */ __webpack_exports__["_29"] = COMPRESSED_RGBA_S3TC_DXT5_EXT;


const COMPRESSED_SRGB_S3TC_DXT1_EXT        = 0x8C4C;
/* harmony export (immutable) */ __webpack_exports__["_55"] = COMPRESSED_SRGB_S3TC_DXT1_EXT;

const COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT  = 0x8C4D;
/* harmony export (immutable) */ __webpack_exports__["_52"] = COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;

const COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT  = 0x8C4E;
/* harmony export (immutable) */ __webpack_exports__["_53"] = COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;

const COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT  = 0x8C4F;
/* harmony export (immutable) */ __webpack_exports__["_54"] = COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;


const COMPRESSED_R11_EAC                        = 0x9270;
/* harmony export (immutable) */ __webpack_exports__["_6"] = COMPRESSED_R11_EAC;

const COMPRESSED_SIGNED_R11_EAC                 = 0x9271;
/* harmony export (immutable) */ __webpack_exports__["_33"] = COMPRESSED_SIGNED_R11_EAC;

const COMPRESSED_RG11_EAC                       = 0x9272;
/* harmony export (immutable) */ __webpack_exports__["_7"] = COMPRESSED_RG11_EAC;

const COMPRESSED_SIGNED_RG11_EAC                = 0x9273;
/* harmony export (immutable) */ __webpack_exports__["_34"] = COMPRESSED_SIGNED_RG11_EAC;

const COMPRESSED_RGB8_ETC2                      = 0x9274;
/* harmony export (immutable) */ __webpack_exports__["_8"] = COMPRESSED_RGB8_ETC2;

const COMPRESSED_SRGB8_ETC2                     = 0x9275;
/* harmony export (immutable) */ __webpack_exports__["_50"] = COMPRESSED_SRGB8_ETC2;

const COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2  = 0x9276;
/* harmony export (immutable) */ __webpack_exports__["_9"] = COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2;

const COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2 = 0x9277;
/* harmony export (immutable) */ __webpack_exports__["_51"] = COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2;

const COMPRESSED_RGBA8_ETC2_EAC                 = 0x9278;
/* harmony export (immutable) */ __webpack_exports__["_10"] = COMPRESSED_RGBA8_ETC2_EAC;

const COMPRESSED_SRGB8_ALPHA8_ETC2_EAC          = 0x9279;
/* harmony export (immutable) */ __webpack_exports__["_49"] = COMPRESSED_SRGB8_ALPHA8_ETC2_EAC;


const COMPRESSED_RGB_PVRTC_4BPPV1_IMG      = 0x8C00;
/* harmony export (immutable) */ __webpack_exports__["_31"] = COMPRESSED_RGB_PVRTC_4BPPV1_IMG;

const COMPRESSED_RGB_PVRTC_2BPPV1_IMG      = 0x8C01;
/* harmony export (immutable) */ __webpack_exports__["_30"] = COMPRESSED_RGB_PVRTC_2BPPV1_IMG;

const COMPRESSED_RGBA_PVRTC_4BPPV1_IMG     = 0x8C02;
/* harmony export (immutable) */ __webpack_exports__["_26"] = COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;

const COMPRESSED_RGBA_PVRTC_2BPPV1_IMG     = 0x8C03;
/* harmony export (immutable) */ __webpack_exports__["_25"] = COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;


const COMPRESSED_RGBA_ASTC_4x4_KHR = 0x93B0;
/* harmony export (immutable) */ __webpack_exports__["_17"] = COMPRESSED_RGBA_ASTC_4x4_KHR;

const COMPRESSED_RGBA_ASTC_5x4_KHR = 0x93B1;
/* harmony export (immutable) */ __webpack_exports__["_18"] = COMPRESSED_RGBA_ASTC_5x4_KHR;

const COMPRESSED_RGBA_ASTC_5x5_KHR = 0x93B2;
/* harmony export (immutable) */ __webpack_exports__["_19"] = COMPRESSED_RGBA_ASTC_5x5_KHR;

const COMPRESSED_RGBA_ASTC_6x5_KHR = 0x93B3;
/* harmony export (immutable) */ __webpack_exports__["_20"] = COMPRESSED_RGBA_ASTC_6x5_KHR;

const COMPRESSED_RGBA_ASTC_6x6_KHR = 0x93B4;
/* harmony export (immutable) */ __webpack_exports__["_21"] = COMPRESSED_RGBA_ASTC_6x6_KHR;

const COMPRESSED_RGBA_ASTC_8x5_KHR = 0x93B5;
/* harmony export (immutable) */ __webpack_exports__["_22"] = COMPRESSED_RGBA_ASTC_8x5_KHR;

const COMPRESSED_RGBA_ASTC_8x6_KHR = 0x93B6;
/* harmony export (immutable) */ __webpack_exports__["_23"] = COMPRESSED_RGBA_ASTC_8x6_KHR;

const COMPRESSED_RGBA_ASTC_8x8_KHR = 0x93B7;
/* harmony export (immutable) */ __webpack_exports__["_24"] = COMPRESSED_RGBA_ASTC_8x8_KHR;

const COMPRESSED_RGBA_ASTC_10x5_KHR = 0x93B8;
/* harmony export (immutable) */ __webpack_exports__["_12"] = COMPRESSED_RGBA_ASTC_10x5_KHR;

const COMPRESSED_RGBA_ASTC_10x6_KHR = 0x93B9;
/* harmony export (immutable) */ __webpack_exports__["_13"] = COMPRESSED_RGBA_ASTC_10x6_KHR;

const COMPRESSED_RGBA_ASTC_10x8_KHR = 0x93BA;
/* harmony export (immutable) */ __webpack_exports__["_14"] = COMPRESSED_RGBA_ASTC_10x8_KHR;

const COMPRESSED_RGBA_ASTC_10x10_KHR = 0x93BB;
/* harmony export (immutable) */ __webpack_exports__["_11"] = COMPRESSED_RGBA_ASTC_10x10_KHR;

const COMPRESSED_RGBA_ASTC_12x10_KHR = 0x93BC;
/* harmony export (immutable) */ __webpack_exports__["_15"] = COMPRESSED_RGBA_ASTC_12x10_KHR;

const COMPRESSED_RGBA_ASTC_12x12_KHR = 0x93BD;
/* harmony export (immutable) */ __webpack_exports__["_16"] = COMPRESSED_RGBA_ASTC_12x12_KHR;


const COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR = 0x93D0;
/* harmony export (immutable) */ __webpack_exports__["_41"] = COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR;

const COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR = 0x93D1;
/* harmony export (immutable) */ __webpack_exports__["_42"] = COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR;

const COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR = 0x93D2;
/* harmony export (immutable) */ __webpack_exports__["_43"] = COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR;

const COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR = 0x93D3;
/* harmony export (immutable) */ __webpack_exports__["_44"] = COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR;

const COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR = 0x93D4;
/* harmony export (immutable) */ __webpack_exports__["_45"] = COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR;

const COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR = 0x93D5;
/* harmony export (immutable) */ __webpack_exports__["_46"] = COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR;

const COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR = 0x93D6;
/* harmony export (immutable) */ __webpack_exports__["_47"] = COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR;

const COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR = 0x93D7;
/* harmony export (immutable) */ __webpack_exports__["_48"] = COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR;

const COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR = 0x93D8;
/* harmony export (immutable) */ __webpack_exports__["_36"] = COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR;

const COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR = 0x93D9;
/* harmony export (immutable) */ __webpack_exports__["_37"] = COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR;

const COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR = 0x93DA;
/* harmony export (immutable) */ __webpack_exports__["_38"] = COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR;

const COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR = 0x93DB;
/* harmony export (immutable) */ __webpack_exports__["_35"] = COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR;

const COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR = 0x93DC;
/* harmony export (immutable) */ __webpack_exports__["_39"] = COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR;

const COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR = 0x93DD;
/* harmony export (immutable) */ __webpack_exports__["_40"] = COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR;


const TYPE_SIZE = {};
/* harmony export (immutable) */ __webpack_exports__["_495"] = TYPE_SIZE;

TYPE_SIZE[BYTE]              = 1;
TYPE_SIZE[UNSIGNED_BYTE]     = 1;
TYPE_SIZE[SHORT]             = 2;
TYPE_SIZE[UNSIGNED_SHORT]    = 2;
TYPE_SIZE[INT]               = 4;
TYPE_SIZE[UNSIGNED_INT]      = 4;
TYPE_SIZE[FLOAT]             = 4;


let canvas = document.createElement("canvas");
let gl = canvas.getContext("webgl2");

const WEBGL_INFO = {};
/* harmony export (immutable) */ __webpack_exports__["_558"] = WEBGL_INFO;

WEBGL_INFO.MAX_TEXTURE_UNITS = gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
WEBGL_INFO.MAX_UNIFORM_BUFFERS = gl.getParameter(gl.MAX_UNIFORM_BUFFER_BINDINGS);

const DUMMY_OBJECT = {};
/* harmony export (immutable) */ __webpack_exports__["_113"] = DUMMY_OBJECT;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_js__ = __webpack_require__(0);
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



const TEXTURE_FORMAT_DEFAULTS = {};
/* harmony export (immutable) */ __webpack_exports__["a"] = TEXTURE_FORMAT_DEFAULTS;


const UNSIGNED_BYTE = TEXTURE_FORMAT_DEFAULTS[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_524" /* UNSIGNED_BYTE */]] = {};
UNSIGNED_BYTE[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_297" /* RED */]] = __WEBPACK_IMPORTED_MODULE_0__constants_js__["_289" /* R8 */];
UNSIGNED_BYTE[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_315" /* RG */]] = __WEBPACK_IMPORTED_MODULE_0__constants_js__["_322" /* RG8 */];
UNSIGNED_BYTE[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_326" /* RGB */]] = __WEBPACK_IMPORTED_MODULE_0__constants_js__["_337" /* RGB8 */];
UNSIGNED_BYTE[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_342" /* RGBA */]] = __WEBPACK_IMPORTED_MODULE_0__constants_js__["_350" /* RGBA8 */];

const UNSIGNED_SHORT = TEXTURE_FORMAT_DEFAULTS[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_538" /* UNSIGNED_SHORT */]] = {};
UNSIGNED_SHORT[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_81" /* DEPTH_COMPONENT */]] = __WEBPACK_IMPORTED_MODULE_0__constants_js__["_82" /* DEPTH_COMPONENT16 */];

const FLOAT = TEXTURE_FORMAT_DEFAULTS[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_121" /* FLOAT */]] = {};
FLOAT[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_297" /* RED */]] = __WEBPACK_IMPORTED_MODULE_0__constants_js__["_283" /* R16F */];
FLOAT[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_315" /* RG */]] = __WEBPACK_IMPORTED_MODULE_0__constants_js__["_316" /* RG16F */];
FLOAT[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_326" /* RGB */]] = __WEBPACK_IMPORTED_MODULE_0__constants_js__["_329" /* RGB16F */];
FLOAT[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_342" /* RGBA */]] = __WEBPACK_IMPORTED_MODULE_0__constants_js__["_343" /* RGBA16F */];
FLOAT[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_81" /* DEPTH_COMPONENT */]] = __WEBPACK_IMPORTED_MODULE_0__constants_js__["_84" /* DEPTH_COMPONENT32F */];

TEXTURE_FORMAT_DEFAULTS.COMPRESSED_TYPES = {};

// TODO(Tarek): For https://bugs.chromium.org/p/chromium/issues/detail?id=757447
// Remove this when that's fixed
TEXTURE_FORMAT_DEFAULTS.NO_TEX_STORAGE = {};


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__ = __webpack_require__(1);
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




const DUMMY_ARRAY = new Array(1);

/**
    General-purpose texture.

    @class
    @prop {WebGLRenderingContext} gl The WebGL context.
    @prop {WebGLTexture} texture Handle to the texture.
    @prop {WebGLSamler} sampler Sampler object.
    @prop {GLEnum} binding Binding point for the texture.
    @prop {GLEnum} type Type of data stored in the texture.
    @prop {GLEnum} format Layout of texture data.
    @prop {GLEnum} internalFormat Internal arrangement of the texture data.
    @prop {number} currentUnit The current texture unit this texture is bound to.
    @prop {boolean} is3D Whether this texture contains 3D data.
    @prop {boolean} flipY Whether the y-axis is being flipped for this texture.
    @prop {boolean} mipmaps Whether this texture is using mipmap filtering 
        (and thus should have a complete mipmap chain).
    @prop {Object} appState Tracked GL state.
*/
class Texture {
    constructor(gl, appState, binding, image, width = image.width, height = image.height, depth, is3D, options = __WEBPACK_IMPORTED_MODULE_0__constants_js__["_113" /* DUMMY_OBJECT */]) {
        this.gl = gl;
        this.binding = binding;
        this.texture = null;
        this.width = -1;
        this.height = -1;
        this.depth = -1;
        this.type = options.type !== undefined ? options.type : gl.UNSIGNED_BYTE;
        this.is3D = is3D;
        this.appState = appState;

        this.format = null;
        this.internalFormat = null;
        this.compressed = !!(__WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].COMPRESSED_TYPES[options.format] || __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].COMPRESSED_TYPES[options.internalFormat]);
        
        if (this.compressed) {
            // For compressed textures, just need to provide one of format, internalFormat.
            // The other will be the same.
            this.format = options.format !== undefined ? options.format : options.internalFormat;
            this.internalFormat = options.internalFormat !== undefined ? options.internalFormat : options.format;
        } else {
            this.format = options.format !== undefined ? options.format : gl.RGBA;
            this.internalFormat = options.internalFormat !== undefined ? options.internalFormat : __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */][this.type][this.format];
        }

        this.noTexStorage = !!__WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].NO_TEX_STORAGE[this.internalFormat];

        // -1 indicates unbound
        this.currentUnit = -1;

        // Sampler parameters
        let minFilter = options.minFilter !== undefined ? options.minFilter : gl.LINEAR_MIPMAP_NEAREST;
        let magFilter = options.magFilter !== undefined ? options.magFilter : gl.LINEAR;
        let wrapS = options.wrapS !== undefined ? options.wrapS : gl.REPEAT;
        let wrapT = options.wrapT !== undefined ? options.wrapT : gl.REPEAT;
        let wrapR = options.wrapR !== undefined ? options.wrapR : gl.REPEAT;
        let compareMode = options.compareMode !== undefined ? options.compareMode : gl.NONE;
        let compareFunc = options.compareFunc !== undefined ? options.compareFunc : gl.LEQUAL;
        let minLOD = options.minLOD !== undefined ? options.minLOD : null;
        let maxLOD = options.maxLOD !== undefined ? options.maxLOD : null;

        this.sampler = gl.createSampler();
        gl.samplerParameteri(this.sampler, gl.TEXTURE_MIN_FILTER, minFilter);
        gl.samplerParameteri(this.sampler, gl.TEXTURE_MAG_FILTER, magFilter);
        gl.samplerParameteri(this.sampler, gl.TEXTURE_WRAP_S, wrapS);
        gl.samplerParameteri(this.sampler, gl.TEXTURE_WRAP_T, wrapT);
        gl.samplerParameteri(this.sampler, gl.TEXTURE_WRAP_R, wrapR);
        gl.samplerParameteri(this.sampler, gl.TEXTURE_COMPARE_FUNC, compareFunc);
        gl.samplerParameteri(this.sampler, gl.TEXTURE_COMPARE_MODE, compareMode);
        if (minLOD !== null) {
            gl.samplerParameterf(this.sampler, gl.TEXTURE_MIN_LOD, minLOD);
        }
        if (maxLOD !== null) {
            gl.samplerParameterf(this.sampler, gl.TEXTURE_MAX_LOD, maxLOD);
        }

        // Texture parameters
        this.flipY = options.flipY !== undefined ? options.flipY : false;
        this.baseLevel = options.baseLevel !== undefined ? options.baseLevel : null;
        this.maxLevel = options.maxLevel !== undefined ? options.maxLevel : null;
        this.mipmaps = (minFilter === gl.LINEAR_MIPMAP_NEAREST || minFilter === gl.LINEAR_MIPMAP_LINEAR);

        this.resize(width, height, depth);

        if (image) {
            this.data(image);
        }
    }

    /**
        Re-allocate texture storage.

        @method
        @param {number} width Image width.
        @param {number} height Image height.
        @param {number} [depth] Image depth or number of images. Required when passing 3D or texture array data.
    */
    resize(width, height, depth) {
        depth = depth || 0;

        if (width === this.width && height === this.height && depth === this.depth) {
            return; 
        }

        this.gl.deleteTexture(this.texture);
        if (this.currentUnit !== -1) {
            this.appState.textures[this.currentUnit] = null;
        }

        this.texture = this.gl.createTexture();
        this.bind(Math.max(this.currentUnit, 1));

        this.width = width;
        this.height = height;
        this.depth = depth;

        this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, this.flipY);

        if (this.baseLevel !== null) {
            this.gl.texParameteri(this.binding, this.gl.TEXTURE_BASE_LEVEL, this.baseLevel);
        }

        if (this.maxLevel !== null) {
            this.gl.texParameteri(this.binding, this.gl.TEXTURE_MAX_LEVEL, this.maxLevel);
        }

        // TODO(Tarek): For https://bugs.chromium.org/p/chromium/issues/detail?id=757447
        // Remove this when that's fixed
        if (this.noTexStorage) {
            return;
        }

        let levels;
        if (this.is3D) {
            if (this.mipmaps) {
                levels = Math.floor(Math.log2(Math.max(Math.max(this.width, this.height), this.depth))) + 1;
            } else {
                levels = 1;
            }
            this.gl.texStorage3D(this.binding, levels, this.internalFormat, this.width, this.height, this.depth);
        } else {
            if (this.mipmaps) {
                levels = Math.floor(Math.log2(Math.max(this.width, this.height))) + 1;
            } else {
                levels = 1;
            }
            this.gl.texStorage2D(this.binding, levels, this.internalFormat, this.width, this.height);
        }
    }

    /**
        Set the image data for the texture. An array can be passed to manually set all levels 
        of the mipmap chain. If a single level is passed and mipmap filtering is being used,
        generateMipmap() will be called to produce the remaining levels.
        NOTE: the data must fit the currently-allocated storage!

        @method
        @param {ImageElement|ArrayBufferView|Array} data Image data. If an array is passed, it will be 
            used to set mip map levels.
    */
    data(data) {
        if (!Array.isArray(data)) {
            DUMMY_ARRAY[0] = data;
            data = DUMMY_ARRAY;
        }

        let numLevels = this.mipmaps ? data.length : 1;
        let width = this.width;
        let height = this.height;
        let depth = this.depth;
        let generateMipmaps = this.mipmaps && data.length === 1;
        let i;

        this.bind(Math.max(this.currentUnit, 0));

        if (this.compressed) {

            // TODO(Tarek): For https://bugs.chromium.org/p/chromium/issues/detail?id=757447
            // Remove this when that's fixed
            if (this.noTexStorage) {
                if (this.is3D) {
                    for (i = 0; i < numLevels; ++i) {
                        this.gl.compressedTexImage3D(this.binding, i, this.internalFormat, width, height, depth, 0, data[i]);
                        width = Math.max(width >> 1, 1);
                        height = Math.max(height >> 1, 1);
                        depth = Math.max(depth >> 1, 1);
                    }
                } else {
                    for (i = 0; i < numLevels; ++i) {
                        this.gl.compressedTexImage2D(this.binding, i, this.internalFormat, width, height, 0, data[i]);
                        width = Math.max(width >> 1, 1);
                        height = Math.max(height >> 1, 1);
                    }
                }
            } else if (this.is3D) {
                for (i = 0; i < numLevels; ++i) {
                    this.gl.compressedTexSubImage3D(this.binding, i, 0, 0, 0, width, height, depth, this.format, data[i]);
                    width = Math.max(width >> 1, 1);
                    height = Math.max(height >> 1, 1);
                    depth = Math.max(depth >> 1, 1);
                }
            } else {
                for (i = 0; i < numLevels; ++i) {
                    this.gl.compressedTexSubImage2D(this.binding, i, 0, 0, width, height, this.format, data[i]);
                    width = Math.max(width >> 1, 1);
                    height = Math.max(height >> 1, 1);
                }
            }
        } else if (this.is3D) {
            for (i = 0; i < numLevels; ++i) {
                this.gl.texSubImage3D(this.binding, i, 0, 0, 0, width, height, depth, this.format, this.type, data[i]);
                width = Math.max(width >> 1, 1);
                height = Math.max(height >> 1, 1);
                depth = Math.max(depth >> 1, 1);
            }
        } else {
            for (i = 0; i < numLevels; ++i) {
                this.gl.texSubImage2D(this.binding, i, 0, 0, width, height, this.format, this.type, data[i]);
                width = Math.max(width >> 1, 1);
                height = Math.max(height >> 1, 1);
            }
        }

        if (generateMipmaps) {
            this.gl.generateMipmap(this.binding);
        }

        return this;
    }

    /**
        Delete this texture.

        @method
    */
    delete() {
        if (this.texture) {
            this.gl.deleteTexture(this.texture);
            this.gl.deleteSampler(this.sampler);
            this.texture = null;
            this.sampler = null;
            this.appState.textures[this.currentUnit] = null;
            this.currentUnit = -1;
        }
    }

    // Bind this texture to a texture unit.
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
            this.gl.bindTexture(this.binding, this.texture);
            this.gl.bindSampler(unit, this.sampler);

            this.appState.textures[unit] = this;
            this.currentUnit = unit;
        }

        return this;
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Texture;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/**
    WebGL shader.

    @class
    @prop {WebGLRenderingContext} gl The WebGL context.
    @prop {WebGLShader} shader The shader.
*/
class Shader {
    
    constructor(gl, type, source) {
        this.gl = gl;
        this.shader = gl.createShader(type);
        gl.shaderSource(this.shader, source);
        gl.compileShader(this.shader);

        if (!gl.getShaderParameter(this.shader, gl.COMPILE_STATUS)) {
            let i, lines;

            console.error(gl.getShaderInfoLog(this.shader));
            lines = source.split("\n");
            for (i = 0; i < lines.length; ++i) {
                console.error((i + 1) + ":", lines[i]);
            }
        }
    }

    /**
        Delete this shader.

        @method
    */
    delete() {
        if (this.shader) {
            this.gl.deleteShader(this.shader);
            this.shader = null;
        }
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Shader;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/**
    Generic query object.

    @class
    @prop {WebGLRenderingContext} gl The WebGL context.
    @prop {WebGLQuery} query Query object.
    @prop {GLEnum} target The type of information being queried.
    @prop {boolean} active Whether or not a query is currently in progress.
    @prop {Any} result The result of the query (only available after a call to ready() returns true). 
*/
class Query {

    constructor(gl, target) {
        this.gl = gl;
        this.query = gl.createQuery();
        this.target = target;
        this.active = false;
        this.result = null;
    }

    /**
        Begin a query.

        @method
    */
    begin() {
        if (!this.active) {
            this.gl.beginQuery(this.target, this.query);
            this.result = null;
        }    
    }

    /**
        End a query.

        @method
    */
    end() {
        if (!this.active) {
            this.gl.endQuery(this.target);
            this.active = true;
        }
    }

    /**
        Check if query result is available.

        @method
    */
    ready() {
        if (this.active && this.gl.getQueryParameter(this.query, this.gl.QUERY_RESULT_AVAILABLE)) {
            this.active = false;
            this.result = this.gl.getQueryParameter(this.query, this.gl.QUERY_RESULT);
            return true;
        }

        return false;
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Query;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["createApp"] = createApp;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__constants_js__ = __webpack_require__(0);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ACTIVE_ATTRIBUTES", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ACTIVE_TEXTURE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ACTIVE_UNIFORMS", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ACTIVE_UNIFORM_BLOCKS", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["d"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ALIASED_LINE_WIDTH_RANGE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["e"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ALIASED_POINT_SIZE_RANGE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["f"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ALPHA", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["g"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ALPHA_BITS", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["h"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ALREADY_SIGNALED", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["i"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ALWAYS", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["j"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ANY_SAMPLES_PASSED", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["k"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ANY_SAMPLES_PASSED_CONSERVATIVE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["l"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ARRAY_BUFFER", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["m"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ARRAY_BUFFER_BINDING", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["n"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ATTACHED_SHADERS", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["o"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "BACK", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["p"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "BLEND", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["q"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "BLEND_COLOR", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["r"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "BLEND_DST_ALPHA", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["s"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "BLEND_DST_RGB", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["t"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "BLEND_EQUATION", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["u"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "BLEND_EQUATION_ALPHA", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["v"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "BLEND_EQUATION_RGB", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["w"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "BLEND_SRC_ALPHA", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["x"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "BLEND_SRC_RGB", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["y"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "BLUE_BITS", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["z"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "BOOL", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["A"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "BOOL_VEC2", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["B"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "BOOL_VEC3", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["C"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "BOOL_VEC4", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["D"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "BROWSER_DEFAULT_WEBGL", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["E"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "BUFFER_SIZE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["F"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "BUFFER_USAGE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["G"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "BYTE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["H"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CCW", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["I"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CLAMP_TO_EDGE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["J"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COLOR", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["K"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COLOR_ATTACHMENT0", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["L"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COLOR_ATTACHMENT1", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["M"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COLOR_ATTACHMENT2", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["T"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COLOR_ATTACHMENT3", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["U"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COLOR_ATTACHMENT4", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["V"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COLOR_ATTACHMENT5", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["W"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COLOR_ATTACHMENT6", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["X"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COLOR_ATTACHMENT7", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["Y"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COLOR_ATTACHMENT8", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["Z"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COLOR_ATTACHMENT9", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_0"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COLOR_ATTACHMENT10", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["N"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COLOR_ATTACHMENT11", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["O"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COLOR_ATTACHMENT12", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["P"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COLOR_ATTACHMENT13", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["Q"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COLOR_ATTACHMENT14", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["R"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COLOR_ATTACHMENT15", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["S"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COLOR_BUFFER_BIT", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_1"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COLOR_CLEAR_VALUE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_2"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COLOR_WRITEMASK", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_3"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COMPARE_REF_TO_TEXTURE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_4"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COMPILE_STATUS", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_5"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COMPRESSED_TEXTURE_FORMATS", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_56"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CONDITION_SATISFIED", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_57"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CONSTANT_ALPHA", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_58"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CONSTANT_COLOR", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_59"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CONTEXT_LOST_WEBGL", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_60"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COPY_READ_BUFFER", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_61"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COPY_READ_BUFFER_BINDING", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_62"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COPY_WRITE_BUFFER", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_63"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COPY_WRITE_BUFFER_BINDING", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_64"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CULL_FACE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_65"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CULL_FACE_MODE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_66"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CURRENT_PROGRAM", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_67"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CURRENT_QUERY", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_68"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CURRENT_VERTEX_ATTRIB", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_69"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "CW", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_70"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DECR", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_71"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DECR_WRAP", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_72"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DELETE_STATUS", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_73"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DEPTH", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_74"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DEPTH24_STENCIL8", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_75"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DEPTH32F_STENCIL8", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_76"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DEPTH_ATTACHMENT", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_77"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DEPTH_BITS", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_78"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DEPTH_BUFFER_BIT", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_79"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DEPTH_CLEAR_VALUE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_80"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DEPTH_COMPONENT", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_81"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DEPTH_COMPONENT16", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_82"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DEPTH_COMPONENT24", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_83"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DEPTH_COMPONENT32F", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_84"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DEPTH_FUNC", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_85"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DEPTH_RANGE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_86"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DEPTH_STENCIL", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_87"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DEPTH_STENCIL_ATTACHMENT", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_88"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DEPTH_TEST", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_89"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DEPTH_WRITEMASK", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_90"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DITHER", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_91"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DONT_CARE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_92"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DRAW_BUFFER0", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_93"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DRAW_BUFFER1", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_94"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DRAW_BUFFER2", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_101"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DRAW_BUFFER3", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_102"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DRAW_BUFFER4", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_103"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DRAW_BUFFER5", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_104"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DRAW_BUFFER6", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_105"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DRAW_BUFFER7", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_106"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DRAW_BUFFER8", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_107"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DRAW_BUFFER9", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_108"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DRAW_BUFFER10", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_95"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DRAW_BUFFER11", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_96"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DRAW_BUFFER12", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_97"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DRAW_BUFFER13", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_98"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DRAW_BUFFER14", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_99"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DRAW_BUFFER15", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_100"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DRAW_FRAMEBUFFER", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_109"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DRAW_FRAMEBUFFER_BINDING", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_110"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DST_ALPHA", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_111"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DST_COLOR", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_112"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DYNAMIC_COPY", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_114"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DYNAMIC_DRAW", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_115"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DYNAMIC_READ", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_116"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ELEMENT_ARRAY_BUFFER", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_117"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ELEMENT_ARRAY_BUFFER_BINDING", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_118"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "EQUAL", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_119"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FASTEST", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_120"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FLOAT", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_121"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FLOAT_32_UNSIGNED_INT_24_8_REV", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_122"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FLOAT_MAT2", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_123"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FLOAT_MAT2x3", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_124"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FLOAT_MAT2x4", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_125"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FLOAT_MAT3", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_126"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FLOAT_MAT3x2", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_127"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FLOAT_MAT3x4", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_128"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FLOAT_MAT4", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_129"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FLOAT_MAT4x2", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_130"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FLOAT_MAT4x3", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_131"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FLOAT_VEC2", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_132"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FLOAT_VEC3", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_133"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FLOAT_VEC4", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_134"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FRAGMENT_SHADER", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_135"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FRAGMENT_SHADER_DERIVATIVE_HINT", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_136"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FRAMEBUFFER", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_137"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FRAMEBUFFER_ATTACHMENT_ALPHA_SIZE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_138"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FRAMEBUFFER_ATTACHMENT_BLUE_SIZE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_139"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_140"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_141"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_142"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FRAMEBUFFER_ATTACHMENT_GREEN_SIZE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_143"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FRAMEBUFFER_ATTACHMENT_OBJECT_NAME", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_144"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_145"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FRAMEBUFFER_ATTACHMENT_RED_SIZE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_146"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_147"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_148"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_149"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_150"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FRAMEBUFFER_BINDING", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_151"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FRAMEBUFFER_COMPLETE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_152"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FRAMEBUFFER_DEFAULT", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_153"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FRAMEBUFFER_INCOMPLETE_ATTACHMENT", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_154"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FRAMEBUFFER_INCOMPLETE_DIMENSIONS", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_155"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_156"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FRAMEBUFFER_INCOMPLETE_MULTISAMPLE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_157"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FRAMEBUFFER_UNSUPPORTED", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_158"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FRONT", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_159"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FRONT_AND_BACK", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_160"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FRONT_FACE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_161"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FUNC_ADD", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_162"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FUNC_REVERSE_SUBTRACT", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_163"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "FUNC_SUBTRACT", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_164"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "GENERATE_MIPMAP_HINT", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_165"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "GEQUAL", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_166"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "GREATER", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_167"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "GREEN_BITS", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_168"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "HALF_FLOAT", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_169"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "HIGH_FLOAT", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_170"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "HIGH_INT", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_171"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "IMPLEMENTATION_COLOR_READ_FORMAT", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_172"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "IMPLEMENTATION_COLOR_READ_TYPE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_173"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "INCR", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_174"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "INCR_WRAP", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_175"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "INT", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_176"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "INTERLEAVED_ATTRIBS", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_177"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "INT_2_10_10_10_REV", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_178"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "INT_SAMPLER_2D", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_179"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "INT_SAMPLER_2D_ARRAY", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_180"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "INT_SAMPLER_3D", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_181"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "INT_SAMPLER_CUBE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_182"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "INT_VEC2", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_183"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "INT_VEC3", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_184"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "INT_VEC4", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_185"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "INVALID_ENUM", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_186"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "INVALID_FRAMEBUFFER_OPERATION", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_187"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "INVALID_INDEX", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_188"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "INVALID_OPERATION", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_189"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "INVALID_VALUE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_190"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "INVERT", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_191"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "KEEP", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_192"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "LEQUAL", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_193"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "LESS", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_194"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "LINEAR", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_195"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "LINEAR_MIPMAP_LINEAR", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_196"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "LINEAR_MIPMAP_NEAREST", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_197"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "LINES", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_198"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "LINE_LOOP", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_199"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "LINE_STRIP", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_200"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "LINE_WIDTH", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_201"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "LINK_STATUS", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_202"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "LOW_FLOAT", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_203"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "LOW_INT", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_204"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "LUMINANCE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_205"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "LUMINANCE_ALPHA", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_206"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MAX", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_207"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MAX_3D_TEXTURE_SIZE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_208"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MAX_ARRAY_TEXTURE_LAYERS", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_209"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MAX_CLIENT_WAIT_TIMEOUT_WEBGL", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_210"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MAX_COLOR_ATTACHMENTS", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_211"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_212"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MAX_COMBINED_TEXTURE_IMAGE_UNITS", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_213"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MAX_COMBINED_UNIFORM_BLOCKS", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_214"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_215"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MAX_CUBE_MAP_TEXTURE_SIZE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_216"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MAX_DRAW_BUFFERS", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_217"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MAX_ELEMENTS_INDICES", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_218"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MAX_ELEMENTS_VERTICES", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_219"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MAX_ELEMENT_INDEX", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_220"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MAX_FRAGMENT_INPUT_COMPONENTS", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_221"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MAX_FRAGMENT_UNIFORM_BLOCKS", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_222"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MAX_FRAGMENT_UNIFORM_COMPONENTS", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_223"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MAX_FRAGMENT_UNIFORM_VECTORS", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_224"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MAX_PROGRAM_TEXEL_OFFSET", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_225"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MAX_RENDERBUFFER_SIZE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_226"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MAX_SAMPLES", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_227"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MAX_SERVER_WAIT_TIMEOUT", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_228"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MAX_TEXTURE_IMAGE_UNITS", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_229"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MAX_TEXTURE_LOD_BIAS", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_230"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MAX_TEXTURE_SIZE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_231"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_232"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_233"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_234"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MAX_UNIFORM_BLOCK_SIZE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_235"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MAX_UNIFORM_BUFFER_BINDINGS", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_236"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MAX_VARYING_COMPONENTS", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_237"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MAX_VARYING_VECTORS", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_238"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MAX_VERTEX_ATTRIBS", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_239"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MAX_VERTEX_OUTPUT_COMPONENTS", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_240"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MAX_VERTEX_TEXTURE_IMAGE_UNITS", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_241"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MAX_VERTEX_UNIFORM_BLOCKS", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_242"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MAX_VERTEX_UNIFORM_COMPONENTS", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_243"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MAX_VERTEX_UNIFORM_VECTORS", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_244"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MAX_VIEWPORT_DIMS", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_245"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MEDIUM_FLOAT", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_246"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MEDIUM_INT", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_247"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MIN", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_248"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MIN_PROGRAM_TEXEL_OFFSET", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_249"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "MIRRORED_REPEAT", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_250"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "NEAREST", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_251"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "NEAREST_MIPMAP_LINEAR", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_252"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "NEAREST_MIPMAP_NEAREST", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_253"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "NEVER", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_254"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "NICEST", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_255"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "NONE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_256"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "NOTEQUAL", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_257"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "NO_ERROR", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_258"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "OBJECT_TYPE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_259"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ONE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_260"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ONE_MINUS_CONSTANT_ALPHA", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_261"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ONE_MINUS_CONSTANT_COLOR", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_262"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ONE_MINUS_DST_ALPHA", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_263"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ONE_MINUS_DST_COLOR", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_264"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ONE_MINUS_SRC_ALPHA", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_265"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ONE_MINUS_SRC_COLOR", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_266"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "OUT_OF_MEMORY", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_267"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "PACK_ALIGNMENT", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_268"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "PACK_ROW_LENGTH", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_269"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "PACK_SKIP_PIXELS", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_270"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "PACK_SKIP_ROWS", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_271"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "PIXEL_PACK_BUFFER", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_272"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "PIXEL_PACK_BUFFER_BINDING", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_273"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "PIXEL_UNPACK_BUFFER", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_274"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "PIXEL_UNPACK_BUFFER_BINDING", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_275"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "POINTS", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_276"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "POLYGON_OFFSET_FACTOR", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_277"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "POLYGON_OFFSET_FILL", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_278"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "POLYGON_OFFSET_UNITS", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_279"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "QUERY_RESULT", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_280"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "QUERY_RESULT_AVAILABLE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_281"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "R8", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_289"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "R8I", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_290"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "R8UI", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_291"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "R8_SNORM", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_292"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "R11F_G11F_B10F", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_282"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "R16F", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_283"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "R16I", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_284"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "R16UI", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_285"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "R32F", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_286"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "R32I", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_287"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "R32UI", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_288"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RASTERIZER_DISCARD", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_293"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "READ_BUFFER", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_294"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "READ_FRAMEBUFFER", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_295"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "READ_FRAMEBUFFER_BINDING", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_296"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RED", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_297"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RED_BITS", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_298"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RED_INTEGER", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_299"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RENDERBUFFER", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_300"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RENDERBUFFER_ALPHA_SIZE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_301"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RENDERBUFFER_BINDING", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_302"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RENDERBUFFER_BLUE_SIZE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_303"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RENDERBUFFER_DEPTH_SIZE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_304"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RENDERBUFFER_GREEN_SIZE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_305"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RENDERBUFFER_HEIGHT", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_306"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RENDERBUFFER_INTERNAL_FORMAT", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_307"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RENDERBUFFER_RED_SIZE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_308"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RENDERBUFFER_SAMPLES", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_309"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RENDERBUFFER_STENCIL_SIZE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_310"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RENDERBUFFER_WIDTH", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_311"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RENDERER", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_312"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "REPEAT", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_313"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "REPLACE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_314"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RG", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_315"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RG8", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_322"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RG8I", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_323"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RG8UI", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_324"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RG8_SNORM", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_325"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RG16F", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_316"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RG16I", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_317"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RG16UI", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_318"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RG32F", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_319"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RG32I", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_320"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RG32UI", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_321"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RGB", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_326"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RGB5_A1", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_336"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RGB8", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_337"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RGB8I", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_338"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RGB8UI", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_339"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RGB8_SNORM", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_340"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RGB9_E5", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_341"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RGB10_A2", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_327"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RGB10_A2UI", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_328"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RGB16F", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_329"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RGB16I", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_330"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RGB16UI", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_331"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RGB32F", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_332"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RGB32I", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_333"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RGB32UI", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_334"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RGB565", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_335"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RGBA", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_342"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RGBA4", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_349"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RGBA8", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_350"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RGBA8I", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_351"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RGBA8UI", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_352"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RGBA8_SNORM", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_353"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RGBA16F", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_343"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RGBA16I", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_344"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RGBA16UI", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_345"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RGBA32F", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_346"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RGBA32I", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_347"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RGBA32UI", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_348"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RGBA_INTEGER", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_354"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RGB_INTEGER", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_355"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "RG_INTEGER", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_356"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SAMPLER_2D", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_357"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SAMPLER_2D_ARRAY", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_358"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SAMPLER_2D_ARRAY_SHADOW", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_359"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SAMPLER_2D_SHADOW", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_360"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SAMPLER_3D", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_361"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SAMPLER_BINDING", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_362"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SAMPLER_CUBE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_363"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SAMPLER_CUBE_SHADOW", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_364"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SAMPLES", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_365"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SAMPLE_ALPHA_TO_COVERAGE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_366"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SAMPLE_BUFFERS", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_367"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SAMPLE_COVERAGE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_368"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SAMPLE_COVERAGE_INVERT", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_369"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SAMPLE_COVERAGE_VALUE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_370"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SCISSOR_BOX", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_371"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SCISSOR_TEST", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_372"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SEPARATE_ATTRIBS", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_373"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SHADER_TYPE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_374"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SHADING_LANGUAGE_VERSION", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_375"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SHORT", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_376"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SIGNALED", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_377"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SIGNED_NORMALIZED", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_378"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SRC_ALPHA", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_379"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SRC_ALPHA_SATURATE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_380"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SRC_COLOR", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_381"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SRGB", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_382"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SRGB8", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_383"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SRGB8_ALPHA8", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_384"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "STATIC_COPY", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_385"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "STATIC_DRAW", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_386"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "STATIC_READ", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_387"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "STENCIL", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_388"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "STENCIL_ATTACHMENT", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_389"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "STENCIL_BACK_FAIL", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_390"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "STENCIL_BACK_FUNC", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_391"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "STENCIL_BACK_PASS_DEPTH_FAIL", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_392"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "STENCIL_BACK_PASS_DEPTH_PASS", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_393"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "STENCIL_BACK_REF", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_394"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "STENCIL_BACK_VALUE_MASK", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_395"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "STENCIL_BACK_WRITEMASK", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_396"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "STENCIL_BITS", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_397"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "STENCIL_BUFFER_BIT", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_398"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "STENCIL_CLEAR_VALUE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_399"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "STENCIL_FAIL", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_400"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "STENCIL_FUNC", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_401"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "STENCIL_INDEX8", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_402"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "STENCIL_PASS_DEPTH_FAIL", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_403"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "STENCIL_PASS_DEPTH_PASS", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_404"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "STENCIL_REF", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_405"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "STENCIL_TEST", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_406"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "STENCIL_VALUE_MASK", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_407"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "STENCIL_WRITEMASK", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_408"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "STREAM_COPY", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_409"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "STREAM_DRAW", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_410"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "STREAM_READ", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_411"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SUBPIXEL_BITS", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_412"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SYNC_CONDITION", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_413"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SYNC_FENCE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_414"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SYNC_FLAGS", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_415"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SYNC_FLUSH_COMMANDS_BIT", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_416"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SYNC_GPU_COMMANDS_COMPLETE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_417"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SYNC_STATUS", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_418"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TEXTURE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_419"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TEXTURE0", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_420"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TEXTURE1", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_421"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TEXTURE2", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_432"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TEXTURE3", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_443"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TEXTURE4", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_446"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TEXTURE5", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_447"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TEXTURE6", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_448"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TEXTURE7", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_449"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TEXTURE8", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_450"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TEXTURE9", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_451"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TEXTURE10", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_422"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TEXTURE11", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_423"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TEXTURE12", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_424"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TEXTURE13", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_425"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TEXTURE14", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_426"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TEXTURE15", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_427"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TEXTURE16", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_428"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TEXTURE17", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_429"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TEXTURE18", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_430"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TEXTURE19", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_431"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TEXTURE20", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_433"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TEXTURE21", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_434"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TEXTURE22", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_435"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TEXTURE23", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_436"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TEXTURE24", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_437"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TEXTURE25", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_438"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TEXTURE26", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_439"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TEXTURE27", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_440"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TEXTURE28", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_441"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TEXTURE29", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_442"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TEXTURE30", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_444"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TEXTURE31", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_445"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TEXTURE_2D", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_452"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TEXTURE_2D_ARRAY", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_453"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TEXTURE_3D", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_454"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TEXTURE_BASE_LEVEL", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_455"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TEXTURE_BINDING_2D", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_456"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TEXTURE_BINDING_2D_ARRAY", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_457"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TEXTURE_BINDING_3D", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_458"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TEXTURE_BINDING_CUBE_MAP", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_459"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TEXTURE_COMPARE_FUNC", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_460"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TEXTURE_COMPARE_MODE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_461"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TEXTURE_CUBE_MAP", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_462"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TEXTURE_CUBE_MAP_NEGATIVE_X", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_463"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TEXTURE_CUBE_MAP_NEGATIVE_Y", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_464"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TEXTURE_CUBE_MAP_NEGATIVE_Z", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_465"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TEXTURE_CUBE_MAP_POSITIVE_X", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_466"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TEXTURE_CUBE_MAP_POSITIVE_Y", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_467"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TEXTURE_CUBE_MAP_POSITIVE_Z", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_468"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TEXTURE_IMMUTABLE_FORMAT", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_469"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TEXTURE_IMMUTABLE_LEVELS", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_470"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TEXTURE_MAG_FILTER", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_471"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TEXTURE_MAX_LEVEL", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_472"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TEXTURE_MAX_LOD", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_473"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TEXTURE_MIN_FILTER", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_474"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TEXTURE_MIN_LOD", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_475"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TEXTURE_WRAP_R", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_476"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TEXTURE_WRAP_S", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_477"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TEXTURE_WRAP_T", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_478"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TIMEOUT_EXPIRED", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_479"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TIMEOUT_IGNORED", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_480"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TRANSFORM_FEEDBACK", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_481"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TRANSFORM_FEEDBACK_ACTIVE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_482"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TRANSFORM_FEEDBACK_BINDING", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_483"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TRANSFORM_FEEDBACK_BUFFER", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_484"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TRANSFORM_FEEDBACK_BUFFER_BINDING", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_485"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TRANSFORM_FEEDBACK_BUFFER_MODE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_486"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TRANSFORM_FEEDBACK_BUFFER_SIZE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_487"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TRANSFORM_FEEDBACK_BUFFER_START", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_488"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TRANSFORM_FEEDBACK_PAUSED", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_489"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_490"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TRANSFORM_FEEDBACK_VARYINGS", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_491"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TRIANGLES", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_492"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TRIANGLE_FAN", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_493"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TRIANGLE_STRIP", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_494"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "UNIFORM_ARRAY_STRIDE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_496"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "UNIFORM_BLOCK_ACTIVE_UNIFORMS", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_497"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_498"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "UNIFORM_BLOCK_BINDING", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_499"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "UNIFORM_BLOCK_DATA_SIZE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_500"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "UNIFORM_BLOCK_INDEX", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_501"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_502"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_503"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "UNIFORM_BUFFER", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_504"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "UNIFORM_BUFFER_BINDING", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_505"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "UNIFORM_BUFFER_OFFSET_ALIGNMENT", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_506"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "UNIFORM_BUFFER_SIZE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_507"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "UNIFORM_BUFFER_START", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_508"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "UNIFORM_IS_ROW_MAJOR", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_509"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "UNIFORM_MATRIX_STRIDE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_510"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "UNIFORM_OFFSET", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_511"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "UNIFORM_SIZE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_512"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "UNIFORM_TYPE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_513"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "UNPACK_ALIGNMENT", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_514"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "UNPACK_COLORSPACE_CONVERSION_WEBGL", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_515"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "UNPACK_FLIP_Y_WEBGL", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_516"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "UNPACK_IMAGE_HEIGHT", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_517"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "UNPACK_PREMULTIPLY_ALPHA_WEBGL", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_518"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "UNPACK_ROW_LENGTH", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_519"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "UNPACK_SKIP_IMAGES", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_520"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "UNPACK_SKIP_PIXELS", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_521"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "UNPACK_SKIP_ROWS", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_522"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "UNSIGNALED", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_523"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "UNSIGNED_BYTE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_524"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "UNSIGNED_INT", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_525"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "UNSIGNED_INT_2_10_10_10_REV", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_528"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "UNSIGNED_INT_5_9_9_9_REV", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_529"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "UNSIGNED_INT_10F_11F_11F_REV", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_526"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "UNSIGNED_INT_24_8", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_527"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "UNSIGNED_INT_SAMPLER_2D", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_530"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "UNSIGNED_INT_SAMPLER_2D_ARRAY", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_531"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "UNSIGNED_INT_SAMPLER_3D", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_532"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "UNSIGNED_INT_SAMPLER_CUBE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_533"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "UNSIGNED_INT_VEC2", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_534"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "UNSIGNED_INT_VEC3", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_535"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "UNSIGNED_INT_VEC4", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_536"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "UNSIGNED_NORMALIZED", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_537"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "UNSIGNED_SHORT", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_538"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "UNSIGNED_SHORT_4_4_4_4", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_539"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "UNSIGNED_SHORT_5_5_5_1", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_540"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "UNSIGNED_SHORT_5_6_5", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_541"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "VALIDATE_STATUS", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_542"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "VENDOR", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_543"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "VERSION", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_544"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "VERTEX_ARRAY_BINDING", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_545"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "VERTEX_ATTRIB_ARRAY_BUFFER_BINDING", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_546"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "VERTEX_ATTRIB_ARRAY_DIVISOR", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_547"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "VERTEX_ATTRIB_ARRAY_ENABLED", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_548"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "VERTEX_ATTRIB_ARRAY_INTEGER", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_549"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "VERTEX_ATTRIB_ARRAY_NORMALIZED", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_550"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "VERTEX_ATTRIB_ARRAY_POINTER", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_551"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "VERTEX_ATTRIB_ARRAY_SIZE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_552"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "VERTEX_ATTRIB_ARRAY_STRIDE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_553"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "VERTEX_ATTRIB_ARRAY_TYPE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_554"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "VERTEX_SHADER", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_555"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "VIEWPORT", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_556"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "WAIT_FAILED", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_557"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "ZERO", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_559"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COMPRESSED_RGB_S3TC_DXT1_EXT", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_32"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COMPRESSED_RGBA_S3TC_DXT1_EXT", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_27"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COMPRESSED_RGBA_S3TC_DXT3_EXT", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_28"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COMPRESSED_RGBA_S3TC_DXT5_EXT", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_29"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COMPRESSED_SRGB_S3TC_DXT1_EXT", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_55"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_52"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_53"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_54"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COMPRESSED_R11_EAC", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_6"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COMPRESSED_SIGNED_R11_EAC", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_33"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COMPRESSED_RG11_EAC", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_7"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COMPRESSED_SIGNED_RG11_EAC", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_34"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COMPRESSED_RGB8_ETC2", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_8"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COMPRESSED_SRGB8_ETC2", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_50"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_9"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_51"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COMPRESSED_RGBA8_ETC2_EAC", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_10"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COMPRESSED_SRGB8_ALPHA8_ETC2_EAC", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_49"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COMPRESSED_RGB_PVRTC_4BPPV1_IMG", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_31"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COMPRESSED_RGB_PVRTC_2BPPV1_IMG", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_30"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COMPRESSED_RGBA_PVRTC_4BPPV1_IMG", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_26"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COMPRESSED_RGBA_PVRTC_2BPPV1_IMG", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_25"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COMPRESSED_RGBA_ASTC_4x4_KHR", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_17"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COMPRESSED_RGBA_ASTC_5x4_KHR", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_18"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COMPRESSED_RGBA_ASTC_5x5_KHR", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_19"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COMPRESSED_RGBA_ASTC_6x5_KHR", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_20"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COMPRESSED_RGBA_ASTC_6x6_KHR", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_21"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COMPRESSED_RGBA_ASTC_8x5_KHR", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_22"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COMPRESSED_RGBA_ASTC_8x6_KHR", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_23"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COMPRESSED_RGBA_ASTC_8x8_KHR", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_24"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COMPRESSED_RGBA_ASTC_10x5_KHR", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_12"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COMPRESSED_RGBA_ASTC_10x6_KHR", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_13"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COMPRESSED_RGBA_ASTC_10x8_KHR", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_14"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COMPRESSED_RGBA_ASTC_10x10_KHR", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_11"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COMPRESSED_RGBA_ASTC_12x10_KHR", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_15"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COMPRESSED_RGBA_ASTC_12x12_KHR", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_16"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_41"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_42"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_43"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_44"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_45"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_46"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_47"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_48"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_36"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_37"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_38"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_35"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_39"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_40"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TYPE_SIZE", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_495"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "WEBGL_INFO", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_558"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "DUMMY_OBJECT", function() { return __WEBPACK_IMPORTED_MODULE_1__constants_js__["_113"]; });
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



/**
    Global PicoGL module. For convenience, all WebGL enums are stored
    as properties of PicoGL (e.g. PicoGL.FLOAT, PicoGL.ONE_MINUS_SRC_ALPHA).

    @namespace PicoGL
*/

const version = "0.6.11";
/* harmony export (immutable) */ __webpack_exports__["version"] = version;


/**
    Create a PicoGL app. The app is the primary entry point to PicoGL. It stores
    the canvas, the WebGL context and all WebGL state.

    @function PicoGL.createApp
    @param {DOMElement} canvas The canvas on which to create the WebGL context.
    @param {Object} [contextAttributes] Context attributes to pass when calling getContext().
*/
function createApp(canvas, contextAttributes) {
    return new __WEBPACK_IMPORTED_MODULE_0__app_js__["a" /* App */](canvas, contextAttributes);
}


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cubemap_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__draw_call_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__framebuffer_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__program_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__shader_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__texture_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__timer_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__transform_feedback_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__uniform_buffer_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__vertex_array_js__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__vertex_buffer_js__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__query_js__ = __webpack_require__(4);
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
















/**
    Primary entry point to PicoGL. An app will store all parts of the WebGL
    state.

    @class
    @prop {DOMElement} canvas The canvas on which this app drawing.
    @prop {WebGLRenderingContext} gl The WebGL context.
    @prop {number} width The width of the drawing surface.
    @prop {number} height The height of the drawing surface.
    @prop {boolean} floatRenderTargetsEnabled Whether the EXT_color_buffer_float extension is enabled.
    @prop {boolean} linearFloatTexturesEnabled Whether the OES_texture_float_linear extension is enabled.
    @prop {boolean} s3tcTexturesEnabled Whether the WEBGL_compressed_texture_s3tc extension is enabled.
    @prop {boolean} s3tcSRGBTexturesEnabled Whether the WEBGL_compressed_texture_s3tc_srgb extension is enabled.
    @prop {boolean} etcTexturesEnabled Whether the WEBGL_compressed_texture_etc extension is enabled.
    @prop {boolean} astcTexturesEnabled Whether the WEBGL_compressed_texture_astc extension is enabled.
    @prop {boolean} pvrtcTexturesEnabled Whether the WEBGL_compressed_texture_pvrtc extension is enabled.
    @prop {Object} state Tracked GL state.
    @prop {GLEnum} clearBits Current clear mask to use with clear().    
*/
class App {
    
    constructor(canvas, contextAttributes) {
        this.canvas = canvas;
        this.gl = canvas.getContext("webgl2", contextAttributes);
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
            textures: new Array(__WEBPACK_IMPORTED_MODULE_0__constants_js__["_558" /* WEBGL_INFO */].MAX_TEXTURE_UNITS),
            // TODO(Tarek): UBO state currently not tracked, due bug
            // with UBO state becoming corrupted between frames in Chrome
            // https://bugs.chromium.org/p/chromium/issues/detail?id=722060
            // Enable UBO state tracking when that's fixed.
            uniformBuffers: new Array(__WEBPACK_IMPORTED_MODULE_0__constants_js__["_558" /* WEBGL_INFO */].MAX_UNIFORM_BUFFERS),
            uniformBufferCount: 0,
            freeUniformBufferBases: [],
            drawFramebuffer: null,
            readFramebuffer: null
        };

        this.clearBits = this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT| this.gl.STENCIL_BUFFER_BIT;

        this.cpuTime = 0;
        this.gpuTime = 0;

        // Extensions
        this.floatRenderTargetsEnabled = false;
        this.linearFloatTexturesEnabled = false;
        this.s3tcTexturesEnabled = false;
        this.s3tcSRGBTexturesEnabled = false;
        this.etcTexturesEnabled = false;
        this.astcTexturesEnabled = false;
        this.pvrtcTexturesEnabled = false;

        this.viewport(0, 0, this.width, this.height);
    }

    /**
        Set the color mask to selectively enable or disable particular
        color channels while rendering.

        @method
        @param {boolean} r Red channel.
        @param {boolean} g Green channel.
        @param {boolean} b Blue channel.
        @param {boolean} a Alpha channel.
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
    */
    clearColor(r, g, b, a) {
        this.gl.clearColor(r, g, b, a);

        return this;
    }

    /**
        Set the clear mask bits to use when calling clear().
        E.g. app.clearMask(PicoGL.COLOR_BUFFER_BIT).

        @method
        @param {GLEnum} mask Bit mask of buffers to clear.
    */
    clearMask(mask) {
        this.clearBits = mask;

        return this;
    }

    /**
        Clear the canvas

        @method
    */
    clear() {
        this.gl.clear(this.clearBits);

        return this;
    }

    /**
        Bind a draw framebuffer to the WebGL context. Note that 
        this method resets the viewport to match the given framebuffer.

        @method
        @param {Framebuffer} framebuffer The Framebuffer object to bind.
        @see Framebuffer
    */
    drawFramebuffer(framebuffer) {
        framebuffer.bindForDraw();

        this.viewport(0, 0, framebuffer.width, framebuffer.height);

        return this;
    }

    /**
        Bind a read framebuffer to the WebGL context.

        @method
        @param {Framebuffer} framebuffer The Framebuffer object to bind.
        @see Framebuffer
    */
    readFramebuffer(framebuffer) {
        framebuffer.bindForRead();

        return this;
    }

    /**
        Switch back to the default framebuffer for drawing (i.e. draw to the screen).
        Note that this method resets the viewport to match the default framebuffer.

        @method
    */
    defaultDrawFramebuffer() {
        if (this.state.drawFramebuffer !== null) {
            this.gl.bindFramebuffer(this.gl.DRAW_FRAMEBUFFER, null);
            this.state.drawFramebuffer = null;
            this.viewport(0, 0, this.width, this.height);
        }

        return this;
    }

    /**
        Switch back to the default framebuffer for reading (i.e. read from the screen).

        @method
    */
    defaultReadFramebuffer() {
        if (this.state.readFramebuffer !== null) {
            this.gl.bindFramebuffer(this.gl.READ_FRAMEBUFFER, null);
            this.state.readFramebuffer = null;
        }

        return this;
    }

    /**
        Set the depth range.

        @method
        @param {number} near Minimum depth value.
        @param {number} far Maximum depth value.
    */
    depthRange(near, far) {
        this.gl.depthRange(near, far);

        return this;
    }

    /**
        Enable depth testing.

        @method
    */
    depthTest() {
        this.gl.enable(this.gl.DEPTH_TEST);

        return this;
    }

    /**
        Disable depth testing.

        @method
    */
    noDepthTest() {
        this.gl.disable(this.gl.DEPTH_TEST);

        return this;
    }

    /**
        Enable or disable writing to the depth buffer.

        @method
        @param {Boolean} mask The depth mask.
    */
    depthMask(mask) {
        this.gl.depthMask(mask);

        return this;
    }

    /**
        Set the depth test function. E.g. app.depthFunc(PicoGL.LEQUAL).

        @method
        @param {GLEnum} func The depth testing function to use.
    */
    depthFunc(func) {
        this.gl.depthFunc(func);

        return this;
    }

    /**
        Enable blending.

        @method
    */
    blend() {
        this.gl.enable(this.gl.BLEND);

        return this;
    }

    /**
        Disable blending

        @method
    */
    noBlend() {
        this.gl.disable(this.gl.BLEND);

        return this;
    }

    /**
        Set the blend function. E.g. app.blendFunc(PicoGL.ONE, PicoGL.ONE_MINUS_SRC_ALPHA).

        @method
        @param {GLEnum} src The source blending weight.
        @param {GLEnum} dest The destination blending weight.
    */
    blendFunc(src, dest) {
        this.gl.blendFunc(src, dest);

        return this;
    }

    /**
        Set the blend function, with separate weighting for color and alpha channels.
        E.g. app.blendFuncSeparate(PicoGL.ONE, PicoGL.ONE_MINUS_SRC_ALPHA, PicoGL.ONE, PicoGL.ONE).

        @method
        @param {GLEnum} csrc The source blending weight for the RGB channels.
        @param {GLEnum} cdest The destination blending weight for the RGB channels.
        @param {GLEnum} asrc The source blending weight for the alpha channel.
        @param {GLEnum} adest The destination blending weight for the alpha channel.
    */
    blendFuncSeparate(csrc, cdest, asrc, adest) {
        this.gl.blendFuncSeparate(csrc, cdest, asrc, adest);

        return this;
    }

    /**
        Enable stencil testing.
        NOTE: Only works if { stencil: true } passed as a
        context attribute when creating the App!

        @method
    */
    stencilTest() {
        this.gl.enable(this.gl.STENCIL_TEST);

        return this;
    }

    /**
        Disable stencil testing.

        @method
    */
    noStencilTest() {
        this.gl.disable(this.gl.STENCIL_TEST);

        return this;
    }


    /**
        Enable scissor testing.

        @method
    */
    scissorTest() {
        this.gl.enable(this.gl.SCISSOR_TEST);

        return this;
    }

    /**
        Disable scissor testing.

        @method
    */
    noScissorTest() {
        this.gl.disable(this.gl.SCISSOR_TEST);

        return this;
    }

    /**
        Define the scissor box.

        @method
    */
    scissor(x, y, width, height) {
        this.gl.scissor(x, y, width, height);

        return this;
    }

    /**
        Set the bitmask to use for tested stencil values.
        E.g. app.stencilMask(0xFF).
        NOTE: Only works if { stencil: true } passed as a
        context attribute when creating the App!

        @method
        @param {number} mask The mask value.

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
        @param {GLEnum} face The face orientation to apply the mask to.
        @param {number} mask The mask value.

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
        @param {GLEnum} func The testing function.
        @param {number} ref The reference value.
        @param {GLEnum} mask The bitmask to use against tested values before applying
            the stencil function.
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
        @param {GLEnum} face The face orientation to apply the function to.
        @param {GLEnum} func The testing function.
        @param {number} ref The reference value.
        @param {GLEnum} mask The bitmask to use against tested values before applying
            the stencil function.
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
        @param {GLEnum} stencilFail Operation to apply if the stencil test fails.
        @param {GLEnum} depthFail Operation to apply if the depth test fails.
        @param {GLEnum} pass Operation to apply if the both the depth and stencil tests pass.
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
        @param {GLEnum} face The face orientation to apply the operations to.
        @param {GLEnum} stencilFail Operation to apply if the stencil test fails.
        @param {GLEnum} depthFail Operation to apply if the depth test fails.
        @param {GLEnum} pass Operation to apply if the both the depth and stencil tests pass.
    */
    stencilOpSeparate(face, stencilFail, depthFail, pass) {
        this.gl.stencilOpSeparate(face, stencilFail, depthFail, pass);

        return this;
    }

    /**
        Enable rasterization step.

        @method
    */
    rasterize() {
        this.gl.disable(this.gl.RASTERIZER_DISCARD);

        return this;
    }

    /**
        Disable rasterization step.

        @method
    */
    noRasterize() {
        this.gl.enable(this.gl.RASTERIZER_DISCARD);

        return this;
    }

    /**
        Enable backface culling.

        @method
    */
    cullBackfaces() {
        this.gl.enable(this.gl.CULL_FACE);

        return this;
    }

    /**
        Disable backface culling.

        @method
    */
    drawBackfaces() {
        this.gl.disable(this.gl.CULL_FACE);

        return this;
    }

    /**
        Enable the EXT_color_buffer_float extension. Allows for creating float textures as
        render targets on FrameBuffer objects. E.g. app.createFramebuffer().colorTarget(0, PicoGL.FLOAT).

        @method
        @see Framebuffer
    */
    floatRenderTargets() {
        this.floatRenderTargetsEnabled = !!this.gl.getExtension("EXT_color_buffer_float");

        return this;
    }

    /**
        Enable the OES_texture_float_linear extension. Allows for linear blending on float textures.

        @method
        @see Framebuffer
    */
    linearFloatTextures() {
        this.linearFloatTexturesEnabled = !!this.gl.getExtension("OES_texture_float_linear");

        return this;
    }


    /**
        Enable the WEBGL_compressed_texture_s3tc and WEBGL_compressed_texture_s3tc_srgb extensions, and 
        add the following enums, which can be used as texture formats, to the PicoGL object:

        <ul>
          <li>PicoGL.COMPRESSED_RGB_S3TC_DXT1_EXT
          <li>PicoGL.COMPRESSED_RGBA_S3TC_DXT1_EXT
          <li>PicoGL.COMPRESSED_RGBA_S3TC_DXT3_EXT
          <li>PicoGL.COMPRESSED_RGBA_S3TC_DXT5_EXT
          <li>PicoGL.COMPRESSED_SRGB_S3TC_DXT1_EXT
          <li>PicoGL.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT
          <li>PicoGL.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT
          <li>PicoGL.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT
        </ul>

        @method
    */
    s3tcTextures() {
        let ext = this.gl.getExtension("WEBGL_compressed_texture_s3tc");
        this.s3tcTexturesEnabled = !!ext;
        
        if (this.s3tcTexturesEnabled) {
            __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].COMPRESSED_TYPES[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_32" /* COMPRESSED_RGB_S3TC_DXT1_EXT */]]  = true;
            __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].COMPRESSED_TYPES[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_27" /* COMPRESSED_RGBA_S3TC_DXT1_EXT */]] = true;
            __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].COMPRESSED_TYPES[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_28" /* COMPRESSED_RGBA_S3TC_DXT3_EXT */]] = true;
            __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].COMPRESSED_TYPES[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_29" /* COMPRESSED_RGBA_S3TC_DXT5_EXT */]] = true;
        }

        ext = this.gl.getExtension("WEBGL_compressed_texture_s3tc_srgb");
        this.s3tcSRGBTexturesEnabled = !!ext;
        
        if (this.s3tcSRGBTexturesEnabled) {
            __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].COMPRESSED_TYPES[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_55" /* COMPRESSED_SRGB_S3TC_DXT1_EXT */]]       = true;
            __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].COMPRESSED_TYPES[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_52" /* COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT */]] = true;
            __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].COMPRESSED_TYPES[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_53" /* COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT */]] = true;
            __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].COMPRESSED_TYPES[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_54" /* COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT */]] = true;
        }

        return this;
    }

    /**
        Enable the WEBGL_compressed_texture_etc extension  and add the following enums, which can
        be used as texture formats, to the PicoGL object:
        
        <ul>
          <li>PicoGL.COMPRESSED_R11_EAC
          <li>PicoGL.COMPRESSED_SIGNED_R11_EAC
          <li>PicoGL.COMPRESSED_RG11_EAC
          <li>PicoGL.COMPRESSED_SIGNED_RG11_EAC
          <li>PicoGL.COMPRESSED_RGB8_ETC2
          <li>PicoGL.COMPRESSED_SRGB8_ETC2
          <li>PicoGL.COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2
          <li>PicoGL.COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2
          <li>PicoGL.COMPRESSED_RGBA8_ETC2_EAC
          <li>PicoGL.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC
        </ul>

        Note that while WEBGL_compressed_texture_etc1 is not enabled by this method,
        ETC1 textures can be loaded using COMPRESSED_RGB8_ETC2 as the format.

        @method
    */
    etcTextures() {
        let ext = this.gl.getExtension("WEBGL_compressed_texture_etc");
        this.etcTexturesEnabled = !!ext;

        if (this.etcTexturesEnabled) {
            __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].COMPRESSED_TYPES[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_6" /* COMPRESSED_R11_EAC */]]                        = true;
            __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].COMPRESSED_TYPES[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_33" /* COMPRESSED_SIGNED_R11_EAC */]]                 = true;
            __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].COMPRESSED_TYPES[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_7" /* COMPRESSED_RG11_EAC */]]                       = true;
            __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].COMPRESSED_TYPES[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_34" /* COMPRESSED_SIGNED_RG11_EAC */]]                = true;
            __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].COMPRESSED_TYPES[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_8" /* COMPRESSED_RGB8_ETC2 */]]                      = true;
            __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].COMPRESSED_TYPES[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_50" /* COMPRESSED_SRGB8_ETC2 */]]                     = true;
            __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].COMPRESSED_TYPES[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_9" /* COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2 */]]  = true;
            __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].COMPRESSED_TYPES[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_51" /* COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2 */]] = true;
            __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].COMPRESSED_TYPES[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_10" /* COMPRESSED_RGBA8_ETC2_EAC */]]                 = true;
            __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].COMPRESSED_TYPES[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_49" /* COMPRESSED_SRGB8_ALPHA8_ETC2_EAC */]]          = true;
        }

        return this;
    }

    /**
        Enable the WEBGL_compressed_texture_astc extension and add the following enums, which can
        be used as texture formats, to the PicoGL object:
        
        <ul>
          <li>PicoGL.COMPRESSED_RGBA_ASTC_4x4_KHR
          <li>PicoGL.COMPRESSED_RGBA_ASTC_5x4_KHR
          <li>PicoGL.COMPRESSED_RGBA_ASTC_5x5_KHR
          <li>PicoGL.COMPRESSED_RGBA_ASTC_6x5_KHR
          <li>PicoGL.COMPRESSED_RGBA_ASTC_6x6_KHR
          <li>PicoGL.COMPRESSED_RGBA_ASTC_8x5_KHR
          <li>PicoGL.COMPRESSED_RGBA_ASTC_8x6_KHR
          <li>PicoGL.COMPRESSED_RGBA_ASTC_8x8_KHR
          <li>PicoGL.COMPRESSED_RGBA_ASTC_10x5_KHR
          <li>PicoGL.COMPRESSED_RGBA_ASTC_10x6_KHR
          <li>PicoGL.COMPRESSED_RGBA_ASTC_10x8_KHR
          <li>PicoGL.COMPRESSED_RGBA_ASTC_10x10_KHR
          <li>PicoGL.COMPRESSED_RGBA_ASTC_12x10_KHR
          <li>PicoGL.COMPRESSED_RGBA_ASTC_12x12_KHR
          <li>PicoGL.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR
          <li>PicoGL.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR
          <li>PicoGL.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR
          <li>PicoGL.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR
          <li>PicoGL.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR
          <li>PicoGL.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR
          <li>PicoGL.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR
          <li>PicoGL.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR
          <li>PicoGL.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR
          <li>PicoGL.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR
          <li>PicoGL.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR
          <li>PicoGL.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR
          <li>PicoGL.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR
          <li>PicoGL.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR
        </ul>

        @method
    */
    astcTextures() {
        let ext = this.gl.getExtension("WEBGL_compressed_texture_astc");
        this.astcTexturesEnabled = !!ext;

        if (this.astcTexturesEnabled) {
            __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].COMPRESSED_TYPES[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_17" /* COMPRESSED_RGBA_ASTC_4x4_KHR */]]           = true;
            __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].COMPRESSED_TYPES[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_18" /* COMPRESSED_RGBA_ASTC_5x4_KHR */]]           = true;
            __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].COMPRESSED_TYPES[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_19" /* COMPRESSED_RGBA_ASTC_5x5_KHR */]]           = true;
            __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].COMPRESSED_TYPES[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_20" /* COMPRESSED_RGBA_ASTC_6x5_KHR */]]           = true;
            __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].COMPRESSED_TYPES[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_21" /* COMPRESSED_RGBA_ASTC_6x6_KHR */]]           = true;
            __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].COMPRESSED_TYPES[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_22" /* COMPRESSED_RGBA_ASTC_8x5_KHR */]]           = true;
            __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].COMPRESSED_TYPES[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_23" /* COMPRESSED_RGBA_ASTC_8x6_KHR */]]           = true;
            __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].COMPRESSED_TYPES[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_24" /* COMPRESSED_RGBA_ASTC_8x8_KHR */]]           = true;
            __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].COMPRESSED_TYPES[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_12" /* COMPRESSED_RGBA_ASTC_10x5_KHR */]]          = true;
            __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].COMPRESSED_TYPES[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_13" /* COMPRESSED_RGBA_ASTC_10x6_KHR */]]          = true;
            __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].COMPRESSED_TYPES[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_14" /* COMPRESSED_RGBA_ASTC_10x8_KHR */]]          = true;
            __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].COMPRESSED_TYPES[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_11" /* COMPRESSED_RGBA_ASTC_10x10_KHR */]]         = true;
            __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].COMPRESSED_TYPES[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_15" /* COMPRESSED_RGBA_ASTC_12x10_KHR */]]         = true;
            __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].COMPRESSED_TYPES[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_16" /* COMPRESSED_RGBA_ASTC_12x12_KHR */]]         = true;
            __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].COMPRESSED_TYPES[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_41" /* COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR */]]   = true;
            __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].COMPRESSED_TYPES[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_42" /* COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR */]]   = true;
            __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].COMPRESSED_TYPES[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_43" /* COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR */]]   = true;
            __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].COMPRESSED_TYPES[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_44" /* COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR */]]   = true;
            __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].COMPRESSED_TYPES[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_45" /* COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR */]]   = true;
            __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].COMPRESSED_TYPES[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_46" /* COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR */]]   = true;
            __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].COMPRESSED_TYPES[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_47" /* COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR */]]   = true;
            __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].COMPRESSED_TYPES[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_48" /* COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR */]]   = true;
            __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].COMPRESSED_TYPES[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_36" /* COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR */]]  = true;
            __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].COMPRESSED_TYPES[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_37" /* COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR */]]  = true;
            __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].COMPRESSED_TYPES[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_38" /* COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR */]]  = true;
            __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].COMPRESSED_TYPES[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_35" /* COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR */]] = true;
            __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].COMPRESSED_TYPES[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_39" /* COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR */]] = true;
            __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].COMPRESSED_TYPES[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_40" /* COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR */]] = true;

            // TODO(Tarek): Test for https://bugs.chromium.org/p/chromium/issues/detail?id=757447
            // Remove this when that's fixed
            this.gl.getError();
            this.state.textures[0] = null;
            this.gl.activeTexture(this.gl.TEXTURE0);
            let texture = this.gl.createTexture();
            this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
            this.gl.texStorage2D(this.gl.TEXTURE_2D, 1, __WEBPACK_IMPORTED_MODULE_0__constants_js__["_17" /* COMPRESSED_RGBA_ASTC_4x4_KHR */], 4, 4);

            if (this.gl.getError() !== this.gl.NO_ERROR) {
                __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].NO_TEX_STORAGE[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_17" /* COMPRESSED_RGBA_ASTC_4x4_KHR */]]           = true;
                __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].NO_TEX_STORAGE[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_18" /* COMPRESSED_RGBA_ASTC_5x4_KHR */]]           = true;
                __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].NO_TEX_STORAGE[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_19" /* COMPRESSED_RGBA_ASTC_5x5_KHR */]]           = true;
                __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].NO_TEX_STORAGE[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_20" /* COMPRESSED_RGBA_ASTC_6x5_KHR */]]           = true;
                __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].NO_TEX_STORAGE[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_21" /* COMPRESSED_RGBA_ASTC_6x6_KHR */]]           = true;
                __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].NO_TEX_STORAGE[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_22" /* COMPRESSED_RGBA_ASTC_8x5_KHR */]]           = true;
                __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].NO_TEX_STORAGE[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_23" /* COMPRESSED_RGBA_ASTC_8x6_KHR */]]           = true;
                __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].NO_TEX_STORAGE[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_24" /* COMPRESSED_RGBA_ASTC_8x8_KHR */]]           = true;
                __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].NO_TEX_STORAGE[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_12" /* COMPRESSED_RGBA_ASTC_10x5_KHR */]]          = true;
                __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].NO_TEX_STORAGE[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_13" /* COMPRESSED_RGBA_ASTC_10x6_KHR */]]          = true;
                __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].NO_TEX_STORAGE[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_14" /* COMPRESSED_RGBA_ASTC_10x8_KHR */]]          = true;
                __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].NO_TEX_STORAGE[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_11" /* COMPRESSED_RGBA_ASTC_10x10_KHR */]]         = true;
                __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].NO_TEX_STORAGE[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_15" /* COMPRESSED_RGBA_ASTC_12x10_KHR */]]         = true;
                __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].NO_TEX_STORAGE[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_16" /* COMPRESSED_RGBA_ASTC_12x12_KHR */]]         = true;
                __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].NO_TEX_STORAGE[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_41" /* COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR */]]   = true;
                __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].NO_TEX_STORAGE[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_42" /* COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR */]]   = true;
                __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].NO_TEX_STORAGE[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_43" /* COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR */]]   = true;
                __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].NO_TEX_STORAGE[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_44" /* COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR */]]   = true;
                __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].NO_TEX_STORAGE[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_45" /* COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR */]]   = true;
                __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].NO_TEX_STORAGE[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_46" /* COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR */]]   = true;
                __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].NO_TEX_STORAGE[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_47" /* COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR */]]   = true;
                __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].NO_TEX_STORAGE[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_48" /* COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR */]]   = true;
                __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].NO_TEX_STORAGE[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_36" /* COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR */]]  = true;
                __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].NO_TEX_STORAGE[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_37" /* COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR */]]  = true;
                __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].NO_TEX_STORAGE[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_38" /* COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR */]]  = true;
                __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].NO_TEX_STORAGE[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_35" /* COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR */]] = true;
                __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].NO_TEX_STORAGE[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_39" /* COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR */]] = true;
                __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].NO_TEX_STORAGE[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_40" /* COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR */]] = true;
            }

            this.gl.deleteTexture(texture);
        }
        
        return this;
    }

    /**
        Enable the WEBGL_compressed_texture_pvrtc extension and add the following enums, which can
        be used as texture formats, to the PicoGL object:

        <ul>
          <li>PicoGL.COMPRESSED_RGB_PVRTC_4BPPV1_IMG
          <li>PicoGL.COMPRESSED_RGB_PVRTC_2BPPV1_IMG
          <li>PicoGL.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG
          <li>PicoGL.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG
        </ul>

        @method
    */
    pvrtcTextures() {
        let ext = this.gl.getExtension("WEBGL_compressed_texture_pvrtc");
        this.pvrtcTexturesEnabled = !!ext;
        
        if (this.pvrtcTexturesEnabled) {
            __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].COMPRESSED_TYPES[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_31" /* COMPRESSED_RGB_PVRTC_4BPPV1_IMG */]] = true;
            __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].COMPRESSED_TYPES[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_30" /* COMPRESSED_RGB_PVRTC_2BPPV1_IMG */]] = true;
            __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].COMPRESSED_TYPES[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_26" /* COMPRESSED_RGBA_PVRTC_4BPPV1_IMG */]] = true;
            __WEBPACK_IMPORTED_MODULE_1__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */].COMPRESSED_TYPES[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_25" /* COMPRESSED_RGBA_PVRTC_2BPPV1_IMG */]] = true;
        }

        return this;
    }

    /**
        Read a pixel's color value from the currently-bound framebuffer.

        @method
        @param {number} x The x coordinate of the pixel.
        @param {number} y The y coordinate of the pixel.
        @param {ArrayBufferView} outColor Typed array to store the pixel's color.
        @param {object} [options] Options.
        @param {GLEnum} [options.type=UNSIGNED_BYTE] Type of data stored in the read framebuffer.
        @param {GLEnum} [options.format=RGBA] Read framebuffer data format.
    */
    readPixel(x, y, outColor, options = __WEBPACK_IMPORTED_MODULE_0__constants_js__["_113" /* DUMMY_OBJECT */]) {
        let format = options.format || __WEBPACK_IMPORTED_MODULE_0__constants_js__["_342" /* RGBA */];
        let type = options.type || __WEBPACK_IMPORTED_MODULE_0__constants_js__["_524" /* UNSIGNED_BYTE */];

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
        Resize the drawing surface.

        @method
        @param {number} width The new canvas width.
        @param {number} height The new canvas height.
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
        Create a program.

        @method
        @param {Shader|string} vertexShader Vertex shader object or source code.
        @param {Shader|string} fragmentShader Fragment shader object or source code.
        @param {Array} [xformFeedbackVars] Transform feedback varyings.
    */
    createProgram(vsSource, fsSource, xformFeedbackVars) {
        return new __WEBPACK_IMPORTED_MODULE_5__program_js__["a" /* Program */](this.gl, this.state, vsSource, fsSource, xformFeedbackVars);
    }

    /**
        Create a shader. Creating a shader separately from a program allows for
        shader reuse.

        @method
        @param {GLEnum} type Shader type.
        @param {string} source Shader source.
    */
    createShader(type, source) {
        return new __WEBPACK_IMPORTED_MODULE_6__shader_js__["a" /* Shader */](this.gl, type, source);
    }

    /**
        Create a vertex array.

        @method
    */
    createVertexArray() {
        return new __WEBPACK_IMPORTED_MODULE_11__vertex_array_js__["a" /* VertexArray */](this.gl, this.state);
    }

    /**
        Create a transform feedback object.

        @method
    */
    createTransformFeedback() {
        return new __WEBPACK_IMPORTED_MODULE_9__transform_feedback_js__["a" /* TransformFeedback */](this.gl, this.state);
    }

    /**
        Create a vertex buffer.

        @method
        @param {GLEnum} type The data type stored in the vertex buffer.
        @param {number} itemSize Number of elements per vertex.
        @param {ArrayBufferView} data Buffer data.
        @param {GLEnum} [usage=STATIC_DRAW] Buffer usage.
    */
    createVertexBuffer(type, itemSize, data, usage) {
        return new __WEBPACK_IMPORTED_MODULE_12__vertex_buffer_js__["a" /* VertexBuffer */](this.gl, this.state, type, itemSize, data, usage);
    }

    /**
        Create a per-vertex matrix buffer. Matrix buffers ensure that columns
        are correctly split across attribute locations.

        @method
        @param {GLEnum} type The data type stored in the matrix buffer. Valid types
        are FLOAT_MAT4, FLOAT_MAT4x2, FLOAT_MAT4x3, FLOAT_MAT3, FLOAT_MAT3x2,
        FLOAT_MAT3x4, FLOAT_MAT2, FLOAT_MAT2x3, FLOAT_MAT2x4.
        @param {ArrayBufferView} data Matrix buffer data.
        @param {GLEnum} [usage=STATIC_DRAW] Buffer usage.
    */
    createMatrixBuffer(type, data, usage) {
        return new __WEBPACK_IMPORTED_MODULE_12__vertex_buffer_js__["a" /* VertexBuffer */](this.gl, this.state, type, 0, data, usage);
    }

    /**
        Create an index buffer.

        @method
        @param {GLEnum} type The data type stored in the index buffer.
        @param {number} itemSize Number of elements per primitive.
        @param {ArrayBufferView} data Index buffer data.
        @param {GLEnum} [usage=STATIC_DRAW] Buffer usage.
    */
    createIndexBuffer(type, itemSize, data, usage) {
        return new __WEBPACK_IMPORTED_MODULE_12__vertex_buffer_js__["a" /* VertexBuffer */](this.gl, this.state, type, itemSize, data, usage, true);
    }

    /**
        Create a uniform buffer in std140 layout. NOTE: FLOAT_MAT2, FLOAT_MAT3x2, FLOAT_MAT4x2,
        FLOAT_MAT3, FLOAT_MAT2x3, FLOAT_MAT4x3 are supported, but must be manually padded to
        4-float column alignment by the application!

        @method
        @param {Array} layout Array indicating the order and types of items to
                        be stored in the buffer.
        @param {GLEnum} [usage=DYNAMIC_DRAW] Buffer usage.
    */
    createUniformBuffer(layout, usage) {
        return new __WEBPACK_IMPORTED_MODULE_10__uniform_buffer_js__["a" /* UniformBuffer */](this.gl, layout, usage);
    }

    /**
        Create a 2D texture.

        @method
        @param {DOMElement|ArrayBufferView|Array} image Image data. An array can be passed to manually set all levels 
            of the mipmap chain. If a single level is passed and mipmap filtering is being used,
            generateMipmap() will be called to produce the remaining levels.
        @param {number} [width] Texture width. Required for array data.
        @param {number} [height] Texture height. Required for array data.
        @param {Object} [options] Texture options.
        @param {GLEnum} [options.type=UNSIGNED_BYTE] Type of data stored in the texture.
        @param {GLEnum} [options.format=RGBA] Texture data format.
        @param {GLEnum} [options.internalFormat=RGBA] Texture data internal format.
        @param {boolean} [options.flipY=false] Whether the y-axis be flipped when unpacking the texture.
        @param {GLEnum} [options.minFilter=LINEAR_MIPMAP_NEAREST] Minification filter.
        @param {GLEnum} [options.magFilter=LINEAR] Magnification filter.
        @param {GLEnum} [options.wrapS=REPEAT] Horizontal wrap mode.
        @param {GLEnum} [options.wrapT=REPEAT] Vertical wrap mode.
        @param {GLEnum} [options.compareMode=NONE] Comparison mode.
        @param {GLEnum} [options.compareFunc=LEQUAL] Comparison function.
        @param {GLEnum} [options.baseLevel] Base mipmap level.
        @param {GLEnum} [options.maxLevel] Maximum mipmap level.
        @param {GLEnum} [options.minLOD] Mimimum level of detail.
        @param {GLEnum} [options.maxLOD] Maximum level of detail.
        @param {boolean} [options.generateMipmaps] Should mipmaps be generated.
    */
    createTexture2D(image, width, height, options) {
        if (height === undefined) {
            // Passing in a DOM element. Height/width not required.
            options = width;
            width = image.width;
            height = image.height;
        }

        return new __WEBPACK_IMPORTED_MODULE_7__texture_js__["a" /* Texture */](this.gl, this.state, this.gl.TEXTURE_2D, image, width, height, undefined, false, options);
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
        @param {GLEnum} [options.type=UNSIGNED_BYTE] Type of data stored in the texture.
        @param {GLEnum} [options.format=RGBA] Texture data format.
        @param {GLEnum} [options.internalFormat=RGBA] Texture data internal format.
        @param {boolean} [options.flipY=false] Whether the y-axis be flipped when unpacking the texture.
        @param {GLEnum} [options.minFilter=LINEAR_MIPMAP_NEAREST] Minification filter.
        @param {GLEnum} [options.magFilter=LINEAR] Magnification filter.
        @param {GLEnum} [options.wrapS=REPEAT] Horizontal wrap mode.
        @param {GLEnum} [options.wrapT=REPEAT] Vertical wrap mode.
        @param {GLEnum} [options.compareMode=NONE] Comparison mode.
        @param {GLEnum} [options.compareFunc=LEQUAL] Comparison function.
        @param {GLEnum} [options.baseLevel] Base mipmap level.
        @param {GLEnum} [options.maxLevel] Maximum mipmap level.
        @param {GLEnum} [options.minLOD] Mimimum level of detail.
        @param {GLEnum} [options.maxLOD] Maximum level of detail.
        @param {boolean} [options.generateMipmaps] Should mipmaps be generated.
    */
    createTextureArray(image, width, height, depth, options) {
        return new __WEBPACK_IMPORTED_MODULE_7__texture_js__["a" /* Texture */](this.gl, this.state, this.gl.TEXTURE_2D_ARRAY, image, width, height, depth, true, options);
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
        @param {GLEnum} [options.type=UNSIGNED_BYTE] Type of data stored in the texture.
        @param {GLEnum} [options.format=RGBA] Texture data format.
        @param {GLEnum} [options.internalFormat=RGBA] Texture data internal format.
        @param {boolean} [options.flipY=false] Whether the y-axis be flipped when unpacking the texture.
        @param {GLEnum} [options.minFilter=LINEAR_MIPMAP_NEAREST] Minification filter.
        @param {GLEnum} [options.magFilter=LINEAR] Magnification filter.
        @param {GLEnum} [options.wrapS=REPEAT] Horizontal wrap mode.
        @param {GLEnum} [options.wrapT=REPEAT] Vertical wrap mode.
        @param {GLEnum} [options.wrapR=REPEAT] Depth wrap mode.
        @param {GLEnum} [options.compareMode=NONE] Comparison mode.
        @param {GLEnum} [options.compareFunc=LEQUAL] Comparison function.
        @param {GLEnum} [options.baseLevel] Base mipmap level.
        @param {GLEnum} [options.maxLevel] Maximum mipmap level.
        @param {GLEnum} [options.minLOD] Mimimum level of detail.
        @param {GLEnum} [options.maxLOD] Maximum level of detail.
        @param {boolean} [options.generateMipmaps] Should mipmaps be generated.
    */
    createTexture3D(image, width, height, depth, options) {
        return new __WEBPACK_IMPORTED_MODULE_7__texture_js__["a" /* Texture */](this.gl, this.state, this.gl.TEXTURE_3D, image, width, height, depth, true, options);
    }

    /**
        Create a cubemap.

        @method
        @param {Object} options Texture options.
        @param {DOMElement|ArrayBufferView} options.negX The image data for the negative X direction.
                Can be any format that would be accepted by texImage2D.
        @param {DOMElement|ArrayBufferView} options.posX The image data for the positive X direction.
                Can be any format that would be accepted by texImage2D.
        @param {DOMElement|ArrayBufferView} options.negY The image data for the negative Y direction.
                Can be any format that would be accepted by texImage2D.
        @param {DOMElement|ArrayBufferView} options.posY The image data for the positive Y direction.
                Can be any format that would be accepted by texImage2D.
        @param {DOMElement|ArrayBufferView} options.negZ The image data for the negative Z direction.
                Can be any format that would be accepted by texImage2D.
        @param {DOMElement|ArrayBufferView} options.posZ The image data for the positive Z direction.
                Can be any format that would be accepted by texImage2D.
        @param {GLEnum} [options.type=UNSIGNED_BYTE] Type of data stored in the texture.
        @param {GLEnum} [options.format=RGBA] Texture data format.
        @param {GLEnum} [options.internalFormat=RGBA] Texture data internal format.
        @param {number} [options.width] Texture width. Required when passing array data.
        @param {number} [options.height] Texture height. Required when passing array data.
        @param {boolean} [options.flipY=false] Whether the y-axis be flipped when unpacking the texture.
        @param {GLEnum} [options.minFilter=LINEAR_MIPMAP_NEAREST] Minification filter.
        @param {GLEnum} [options.magFilter=LINEAR] Magnification filter.
        @param {GLEnum} [options.wrapS=REPEAT] Horizontal wrap mode.
        @param {GLEnum} [options.wrapT=REPEAT] Vertical wrap mode.
        @param {GLEnum} [options.compareMode=NONE] Comparison mode.
        @param {GLEnum} [options.compareFunc=LEQUAL] Comparison function.
        @param {boolean} [options.generateMipmaps] Should mipmaps be generated.
    */
    createCubemap(options) {
        return new __WEBPACK_IMPORTED_MODULE_2__cubemap_js__["a" /* Cubemap */](this.gl, this.state, options);
    }

    /**
        Create a framebuffer.

        @method
        @param {number} [width=app.width] Width of the framebuffer.
        @param {number} [height=app.height] Height of the framebuffer.
    */
    createFramebuffer(width, height) {
        return new __WEBPACK_IMPORTED_MODULE_4__framebuffer_js__["a" /* Framebuffer */](this.gl, this.state, width, height);
    }

    /**
        Create a query.

        @method
        @param {GLEnum} target Information to query.
    */
    createQuery(target) {
        return new __WEBPACK_IMPORTED_MODULE_13__query_js__["a" /* Query */](this.gl, target);
    }

    /**
        Create a timer.

        @method
    */
    createTimer() {
        return new __WEBPACK_IMPORTED_MODULE_8__timer_js__["a" /* Timer */](this.gl);
    }

    /**
        Create a DrawCall. A DrawCall manages the state associated with
        a WebGL draw call including a program and associated vertex data, textures,
        uniforms and uniform blocks.

        @method
        @param {Program} program The program to use for this DrawCall.
        @param {VertexArray} vertexArray Vertex data to use for drawing.
        @param {GLEnum} [primitive=TRIANGLES] Type of primitive to draw.
    */
    createDrawCall(program, vertexArray, primitive) {
        return new __WEBPACK_IMPORTED_MODULE_3__draw_call_js__["a" /* DrawCall */](this.gl, this.state, program, vertexArray, primitive);
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = App;



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__texture_format_defaults_js__ = __webpack_require__(1);
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
    
        this.gl = gl;
        this.texture = gl.createTexture();
        this.format = options.format !== undefined ? options.format : gl.RGBA;
        this.type = options.type !== undefined ? options.type : gl.UNSIGNED_BYTE;
        this.internalFormat = options.internalFormat !== undefined ? options.internalFormat : __WEBPACK_IMPORTED_MODULE_0__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */][this.type][this.format];
        this.appState = appState;
        
        // -1 indicates unbound
        this.currentUnit = -1;

        let negX = options.negX;
        let posX = options.posX;
        let negY = options.negY;
        let posY = options.posY;
        let negZ = options.negZ;
        let posZ = options.posZ;

        let width = options.width || negX.width;
        let height = options.height || negX.height;
        let flipY = options.flipY !== undefined ? options.flipY : false;
        let minFilter = options.minFilter !== undefined ? options.minFilter : gl.LINEAR_MIPMAP_NEAREST;
        let magFilter = options.magFilter !== undefined ? options.magFilter : gl.LINEAR;
        let compareMode = options.compareMode !== undefined ? options.compareMode : gl.NONE;
        let compareFunc = options.compareFunc !== undefined ? options.compareFunc : gl.LEQUAL;
        let generateMipmaps = options.generateMipmaps !== false &&
                            (minFilter === gl.LINEAR_MIPMAP_NEAREST || minFilter === gl.LINEAR_MIPMAP_LINEAR);

        this.bind(1);
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

        let levels = generateMipmaps ? Math.floor(Math.log2(Math.min(width, height))) + 1 : 1;
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Cubemap;



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_js__ = __webpack_require__(0);
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



/**
    A DrawCall represents the program and values of associated
    attributes, uniforms and textures for a single draw call.

    @class
    @prop {WebGLRenderingContext} gl The WebGL context.
    @prop {Program} currentProgram The program to use for this draw call.
    @prop {VertexArray} currentVertexArray Vertex array to use for this draw call.
    @prop {TransformFeedback} currentTransformFeedback Transform feedback to use for this draw call.
    @prop {Array} uniformBuffers Ordered list of active uniform buffers.
    @prop {Array} uniformBlockNames Ordered list of uniform block names.
    @prop {Object} uniformBlockBases Map of uniform blocks to uniform buffer bases.
    @prop {Number} uniformBlockCount Number of active uniform blocks for this draw call.
    @prop {Object} uniformIndices Map of uniform names to indices in the uniform arrays.
    @prop {Array} uniformNames Ordered list of uniform names.
    @prop {Array} uniformValue Ordered list of uniform values.
    @prop {number} uniformCount The number of active uniforms for this draw call.
    @prop {Array} textures Array of active textures.
    @prop {number} textureCount The number of active textures for this draw call.
    @prop {GLEnum} primitive The primitive type being drawn.
    @prop {Object} appState Tracked GL state.
*/
class DrawCall {

    constructor(gl, appState, program, vertexArray, primitive = __WEBPACK_IMPORTED_MODULE_0__constants_js__["_492" /* TRIANGLES */]) {
        this.gl = gl;
        this.currentProgram = program;
        this.currentVertexArray = vertexArray;
        this.currentTransformFeedback = null;
        this.appState = appState;

        this.uniformIndices = {};
        this.uniformNames = new Array(__WEBPACK_IMPORTED_MODULE_0__constants_js__["_558" /* WEBGL_INFO */].MAX_UNIFORMS);
        this.uniformValues = new Array(__WEBPACK_IMPORTED_MODULE_0__constants_js__["_558" /* WEBGL_INFO */].MAX_UNIFORMS);
        this.uniformCount = 0;
        this.uniformBuffers = new Array(__WEBPACK_IMPORTED_MODULE_0__constants_js__["_558" /* WEBGL_INFO */].MAX_UNIFORM_BUFFERS);
        this.uniformBlockNames = new Array(__WEBPACK_IMPORTED_MODULE_0__constants_js__["_558" /* WEBGL_INFO */].MAX_UNIFORM_BUFFERS);
        this.uniformBlockBases = {};
        this.uniformBlockCount = 0;
        this.samplerIndices = {};
        this.textures = new Array(__WEBPACK_IMPORTED_MODULE_0__constants_js__["_558" /* WEBGL_INFO */].MAX_TEXTURE_UNITS);
        this.textureCount = 0;
        this.primitive = primitive;
    }

    transformFeedback(transformFeedback) {
        this.currentTransformFeedback = transformFeedback;

        return this;
    }

    /**
        Set the value for a uniform. Array uniforms are supported by
        using appending "[0]" to the array name and passing a flat array
        with all required values.

        @method
        @param {string} name Uniform name.
        @param {any} value Uniform value.
    */
    uniform(name, value) {
        let index = this.uniformIndices[name];
        if (index === undefined) {
            index = this.uniformCount++;
            this.uniformIndices[name] = index;
            this.uniformNames[index] = name;
        }
        this.uniformValues[index] = value;

        return this;
    }

    /**
        Set texture to bind to a sampler uniform.

        @method
        @param {string} name Sampler uniform name.
        @param {Texture} texture Texture to bind.
    */
    texture(name, texture) {
        let unit = this.currentProgram.samplers[name];
        this.textures[unit] = texture;

        return this;
    }

    /**
        Set uniform buffer to bind to a uniform block.

        @method
        @param {string} name Uniform block name.
        @param {UniformBuffer} buffer Uniform buffer to bind.
    */
    uniformBlock(name, buffer) {
        let base = this.uniformBlockBases[name];
        if (base === undefined) {
            base = this.uniformBlockCount++;
            this.uniformBlockBases[name] = base;
            this.uniformBlockNames[base] = name;
        }

        this.uniformBuffers[base] = buffer;

        return this;
    }

    /**
        Draw based on current state.

        @method
    */
    draw() {
        let uniformNames = this.uniformNames;
        let uniformValues = this.uniformValues;
        let uniformBuffers = this.uniformBuffers;
        let uniformBlockNames = this.uniformBlockNames;
        let textures = this.textures;
        let textureCount = this.currentProgram.samplerCount;

        this.currentProgram.bind();
        this.currentVertexArray.bind();

        for (let uIndex = 0; uIndex < this.uniformCount; ++uIndex) {
            this.currentProgram.uniform(uniformNames[uIndex], uniformValues[uIndex]);
        }

        for (let base = 0; base < this.uniformBlockCount; ++base) {
            this.currentProgram.uniformBlock(uniformBlockNames[base], base);
            uniformBuffers[base].bind(base);
        }

        /////////////////////////////////////////////////////////////////////////////////
        // TODO(Tarek):
        // Workaround for https://bugs.chromium.org/p/chromium/issues/detail?id=722288
        // Start at 0 when that's fixed
        /////////////////////////////////////////////////////////////////////////////////
        for (let tIndex = 1; tIndex < textureCount; ++tIndex) {
            textures[tIndex].bind(tIndex);
        }

        if (this.currentTransformFeedback) {
            this.currentTransformFeedback.bind();
            this.gl.beginTransformFeedback(this.primitive);
        }

        if (this.currentVertexArray.instanced) {
            if (this.currentVertexArray.indexed) {
                this.gl.drawElementsInstanced(this.primitive, this.currentVertexArray.numElements, this.currentVertexArray.indexType, 0, this.currentVertexArray.numInstances);
            } else {
                this.gl.drawArraysInstanced(this.primitive, 0, this.currentVertexArray.numElements, this.currentVertexArray.numInstances);
            }
        } else if (this.currentVertexArray.indexed) {
            this.gl.drawElements(this.primitive, this.currentVertexArray.numElements, this.currentVertexArray.indexType, 0);
        } else {
            this.gl.drawArrays(this.primitive, 0, this.currentVertexArray.numElements);
        }

        if (this.currentTransformFeedback) {
            this.gl.endTransformFeedback();
            // TODO(Tarek): Need to rebind buffers due to bug in ANGLE.
            // Remove this when that's fixed.
            for (let i = 0, len = this.currentTransformFeedback.angleBugBuffers.length; i < len; ++i) {
                this.gl.bindBufferBase(this.gl.TRANSFORM_FEEDBACK_BUFFER, i, null);
            }
        }
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = DrawCall;



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__texture_format_defaults_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__texture_js__ = __webpack_require__(2);
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




/**
    Storage for vertex data.

    @class
    @prop {WebGLRenderingContext} gl The WebGL context.
    @prop {WebGLFramebuffer} framebuffer Handle to the framebuffer.
    @prop {number} width The width of the framebuffer.
    @prop {number} height The height of the framebuffer.
    @prop {Array} colorTextures Array of color texture targets.
    @prop {number} numColorTargets Number of color texture targets.
    @prop {Texture} depthTexture Depth texture target.
    @prop {Array} colorAttachments Array of color attachment enums.
    @prop {Object} appState Tracked GL state.
*/
class Framebuffer {

    constructor(gl, appState, width, height) {
        this.gl = gl;
        this.framebuffer = gl.createFramebuffer();
        this.appState = appState;

        if (width && height) {
            this.width = width;
            this.height = height;
        } else {
            this.width = gl.drawingBufferWidth;
            this.height = gl.drawingBufferHeight;
        }

        this.numColorTargets = 0;

        this.colorTextures = [];
        this.colorAttachments = [];
        this.depthTexture = null;
    }

    /**
        Add a color target to this framebuffer.

        @method
        @param {number} [index=0] Color attachment index.
        @param {Object} [options] Texture options.
        @param {GLEnum} [options.type=UNSIGNED_BYTE] Type of data stored in the texture.
        @param {GLEnum} [options.format=RGBA] Texture data format.
        @param {GLEnum} [options.internalFormat=RGBA] Texture data internal format.
        @param {boolean} [options.flipY=true] Whether th y-axis be flipped when reading the texture.
        @param {GLEnum} [options.minFilter=NEAREST] Minification filter.
        @param {GLEnum} [options.magFilter=NEAREST] Magnification filter.
        @param {GLEnum} [options.wrapS=CLAMP_TO_EDGE] Horizontal wrap mode.
        @param {GLEnum} [options.wrapT=CLAMP_TO_EDGE] Vertical wrap mode.
        @param {GLEnum} [options.compareMode=NONE] Comparison mode.
        @param {GLEnum} [options.compareFunc=LEQUAL] Comparison function.
        @param {GLEnum} [options.baseLevel] Base mipmap level.
        @param {GLEnum} [options.maxLevel] Maximum mipmap level.
        @param {GLEnum} [options.minLOD] Mimimum level of detail.
        @param {GLEnum} [options.maxLOD] Maximum level of detail.
        @param {boolean} [options.generateMipmaps=false] Should mipmaps be generated.
    */
    colorTarget(index = 0, options = {}) {
        options.type = options.type || this.gl.UNSIGNED_BYTE;
        options.format = options.format || this.gl.RGBA;
        options.internalFormat = options.internalFormat || __WEBPACK_IMPORTED_MODULE_0__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */][options.type][options.format];
        options.minFilter = options.minFilter || this.gl.NEAREST;
        options.magFilter = options.magFilter || this.gl.NEAREST;
        options.wrapS = options.wrapS || this.gl.CLAMP_TO_EDGE;
        options.wrapT = options.wrapT || this.gl.CLAMP_TO_EDGE;
        options.generateMipmaps = options.generateMipmaps === undefined ? false : options.generateMipmaps;

        this.colorAttachments[index] = this.gl.COLOR_ATTACHMENT0 + index;

        let currentFramebuffer = this.bindAndCaptureState();

        this.colorTextures[index] = new __WEBPACK_IMPORTED_MODULE_1__texture_js__["a" /* Texture */](
            this.gl,
            this.appState,
            this.gl.TEXTURE_2D,
            null,
            this.width,
            this.height,
            null,
            false,
            options
        );

        this.gl.framebufferTexture2D(this.gl.FRAMEBUFFER, this.colorAttachments[index], this.gl.TEXTURE_2D, this.colorTextures[index].texture, 0);
        this.gl.drawBuffers(this.colorAttachments);
        this.numColorTargets++;

        this.restoreState(currentFramebuffer);

        return this;
    }

    /**
        Add a depth target to this framebuffer.

        @method
        @param {Object} [options] Texture options.
        @param {GLEnum} [options.type=UNSIGNED_BYTE] Type of data stored in the texture.
        @param {GLEnum} [options.format=RGBA] Texture data format.
        @param {GLEnum} [options.internalFormat=RGBA] Texture data internal format.
        @param {boolean} [options.flipY=true] Whether th y-axis be flipped when reading the texture.
        @param {GLEnum} [options.minFilter=NEAREST] Minification filter.
        @param {GLEnum} [options.magFilter=NEAREST] Magnification filter.
        @param {GLEnum} [options.wrapS=CLAMP_TO_EDGE] Horizontal wrap mode.
        @param {GLEnum} [options.wrapT=CLAMP_TO_EDGE] Vertical wrap mode.
        @param {GLEnum} [options.compareMode=NONE] Comparison mode.
        @param {GLEnum} [options.compareFunc=LEQUAL] Comparison function.
        @param {GLEnum} [options.baseLevel] Base mipmap level.
        @param {GLEnum} [options.maxLevel] Maximum mipmap level.
        @param {GLEnum} [options.minLOD] Mimimum level of detail.
        @param {GLEnum} [options.maxLOD] Maximum level of detail.
        @param {boolean} [options.generateMipmaps=false] Should mipmaps be generated.
    */
    depthTarget(options = {}) {
        options.format = this.gl.DEPTH_COMPONENT;
        options.type = options.type || this.gl.UNSIGNED_SHORT;
        options.internalFormat = options.internalFormat || __WEBPACK_IMPORTED_MODULE_0__texture_format_defaults_js__["a" /* TEXTURE_FORMAT_DEFAULTS */][options.type][options.format];
        options.minFilter = options.minFilter || this.gl.NEAREST;
        options.magFilter = options.magFilter || this.gl.NEAREST;
        options.wrapS = options.wrapS || this.gl.CLAMP_TO_EDGE;
        options.wrapT = options.wrapT || this.gl.CLAMP_TO_EDGE;
        options.generateMipmaps = options.generateMipmaps === undefined ? false : options.generateMipmaps;

        let currentFramebuffer = this.bindAndCaptureState();

        this.depthTexture = new __WEBPACK_IMPORTED_MODULE_1__texture_js__["a" /* Texture */](
            this.gl,
            this.appState,
            this.gl.TEXTURE_2D,
            null,
            this.width,
            this.height,
            null,
            false,
            options
        );

        this.gl.framebufferTexture2D(this.gl.DRAW_FRAMEBUFFER, this.gl.DEPTH_ATTACHMENT, this.gl.TEXTURE_2D, this.depthTexture.texture, 0);

        this.restoreState(currentFramebuffer);

        return this;
    }

    /**
        Bind a new texture as a color target.

        @method
        @param {number} index Color attachment to bind the texture to.
        @param {Texture} texture New texture to bind.
    */
    replaceTexture(index, texture) {
        this.colorTextures[index] = texture;

        let currentFramebuffer = this.bindAndCaptureState();
        this.gl.framebufferTexture2D(this.gl.DRAW_FRAMEBUFFER, this.colorAttachments[index], this.gl.TEXTURE_2D, this.colorTextures[index].texture, 0);
        this.restoreState(currentFramebuffer);

        return this;
    }

    /**
        Resize framebuffer to current default drawing buffer
        size. Should be called after calls to App.resize().

        @method
        @param {number} [width=app.width] New width of the framebuffer.
        @param {number} [height=app.height] New height of the framebuffer.
    */
    resize(width, height) {

        if (width && height) {
            this.width = width;
            this.height = height;
        } else {
            this.width = this.gl.drawingBufferWidth;
            this.height = this.gl.drawingBufferHeight;
        }

        let currentFramebuffer = this.bindAndCaptureState();

        for (let i = 0; i < this.numColorTargets; ++i) {
            this.colorTextures[i].resize(this.width, this.height);
            this.gl.framebufferTexture2D(this.gl.DRAW_FRAMEBUFFER, this.colorAttachments[i], this.gl.TEXTURE_2D, this.colorTextures[i].texture, 0);
        }

        if (this.depthTexture) {
            this.depthTexture.resize(this.width, this.height);
            this.gl.framebufferTexture2D(this.gl.DRAW_FRAMEBUFFER, this.gl.DEPTH_ATTACHMENT, this.gl.TEXTURE_2D, this.depthTexture.texture, 0);
        }

        this.restoreState(currentFramebuffer);

        return this;
    }

    /**
        Delete this framebuffer. NOTE: will delete any currently
        attached textures.

        @method
    */
    delete() {
        for (let i = 0; i < this.numColorTargets; ++i) {
            this.colorTextures[i].delete();
        }

        if (this.depthTexture) {
            this.depthTexture.delete();
        }

        if (this.framebuffer) {
            this.gl.deleteFramebuffer(this.framebuffer);
            this.framebuffer = null;
        }
    }

    // Bind as the draw framebuffer
    bindForDraw() {
        if (this.appState.drawFramebuffer !== this) {
            this.gl.bindFramebuffer(this.gl.DRAW_FRAMEBUFFER, this.framebuffer);
            this.appState.drawFramebuffer = this;
        }
    }

    // Bind as the read framebuffer
    bindForRead() {
        if (this.appState.readFramebuffer !== this) {
            this.gl.bindFramebuffer(this.gl.READ_FRAMEBUFFER, this.framebuffer);
            this.appState.readFramebuffer = this;
        }
    }

    // Bind for a framebuffer state update.
    // Capture current binding so we can restore it later.
    bindAndCaptureState() {
        let currentFramebuffer = this.appState.drawFramebuffer;

        if (currentFramebuffer !== this) {
            this.gl.bindFramebuffer(this.gl.DRAW_FRAMEBUFFER, this.framebuffer);
        }

        return currentFramebuffer;
    }

    // Bind restore previous binding after state update
    restoreState(framebuffer) {
        if (framebuffer !== this) {
            this.gl.bindFramebuffer(this.gl.DRAW_FRAMEBUFFER, framebuffer ? framebuffer.framebuffer : null);
        }
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Framebuffer;



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shader_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__uniforms_js__ = __webpack_require__(11);
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





/**
    WebGL program consisting of compiled and linked vertex and fragment
    shaders.

    @class
    @prop {WebGLRenderingContext} gl The WebGL context.
    @prop {WebGLProgram} program The WebGL program.
    @prop {boolean} transformFeedback Whether this program is set up for transform feedback.
    @prop {Object} uniforms Map of uniform names to handles.
    @prop {Object} uniformBlocks Map of uniform block names to handles.
    @prop {Object} appState Tracked GL state.
*/
class Program {

    constructor(gl, appState, vsSource, fsSource, xformFeebackVars) {
        let i;

        let vShader, fShader;

        let ownVertexShader = false;
        let ownFragmentShader = false;
        if (typeof vsSource === "string") {
            vShader = new __WEBPACK_IMPORTED_MODULE_1__shader_js__["a" /* Shader */](gl, gl.VERTEX_SHADER, vsSource);
            ownVertexShader = true;
        } else {
            vShader = vsSource;
        }

        if (typeof fsSource === "string") {
            fShader = new __WEBPACK_IMPORTED_MODULE_1__shader_js__["a" /* Shader */](gl, gl.FRAGMENT_SHADER, fsSource);
            ownFragmentShader = true;
        } else {
            fShader = fsSource;
        }

        let program = gl.createProgram();
        gl.attachShader(program, vShader.shader);
        gl.attachShader(program, fShader.shader);
        if (xformFeebackVars) {
            gl.transformFeedbackVaryings(program, xformFeebackVars, gl.SEPARATE_ATTRIBS);
        }
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error(gl.getProgramInfoLog(program));
        }

        if (ownVertexShader) {
            vShader.delete();
        }

        if (ownFragmentShader) {
            fShader.delete();
        }

        this.gl = gl;
        this.program = program;
        this.appState = appState;
        this.transformFeedback = !!xformFeebackVars;
        this.uniforms = {};
        this.uniformBlocks = {};
        this.uniformBlockBindings = {};
        this.samplers = {};
        /////////////////////////////////////////////////////////////////////////////////
        // TODO(Tarek):
        // Workaround for https://bugs.chromium.org/p/chromium/issues/detail?id=722288
        // Start at unit 0 when that's fixed
        /////////////////////////////////////////////////////////////////////////////////
        this.samplerCount = 1;

        gl.useProgram(program);

        let numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);

        for (i = 0; i < numUniforms; ++i) {
            let uniformInfo = gl.getActiveUniform(program, i);
            let uniformHandle = gl.getUniformLocation(this.program, uniformInfo.name);
            let UniformClass = null;
            let type = uniformInfo.type;
            let numElements = uniformInfo.size;

            switch (type) {
                case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_357" /* SAMPLER_2D */]:
                case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_179" /* INT_SAMPLER_2D */]:
                case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_530" /* UNSIGNED_INT_SAMPLER_2D */]:
                case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_360" /* SAMPLER_2D_SHADOW */]:
                case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_358" /* SAMPLER_2D_ARRAY */]:
                case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_180" /* INT_SAMPLER_2D_ARRAY */]:
                case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_531" /* UNSIGNED_INT_SAMPLER_2D_ARRAY */]:
                case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_359" /* SAMPLER_2D_ARRAY_SHADOW */]:
                case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_363" /* SAMPLER_CUBE */]:
                case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_182" /* INT_SAMPLER_CUBE */]:
                case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_533" /* UNSIGNED_INT_SAMPLER_CUBE */]:
                case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_364" /* SAMPLER_CUBE_SHADOW */]:
                case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_361" /* SAMPLER_3D */]:
                case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_181" /* INT_SAMPLER_3D */]:
                case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_532" /* UNSIGNED_INT_SAMPLER_3D */]:
                    let textureUnit = this.samplerCount++;
                    this.samplers[uniformInfo.name] = textureUnit;
                    this.gl.uniform1i(uniformHandle, textureUnit);
                    break;
                case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_176" /* INT */]:
                case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_525" /* UNSIGNED_INT */]:
                case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_121" /* FLOAT */]:
                    UniformClass = numElements > 1 ? __WEBPACK_IMPORTED_MODULE_2__uniforms_js__["c" /* MultiNumericUniform */] : __WEBPACK_IMPORTED_MODULE_2__uniforms_js__["d" /* SingleComponentUniform */];
                    break;
                case __WEBPACK_IMPORTED_MODULE_0__constants_js__["A" /* BOOL */]:
                    UniformClass = numElements > 1 ? __WEBPACK_IMPORTED_MODULE_2__uniforms_js__["b" /* MultiBoolUniform */] : __WEBPACK_IMPORTED_MODULE_2__uniforms_js__["d" /* SingleComponentUniform */];
                    break;
                case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_132" /* FLOAT_VEC2 */]:
                case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_183" /* INT_VEC2 */]:
                case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_534" /* UNSIGNED_INT_VEC2 */]:
                case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_133" /* FLOAT_VEC3 */]:
                case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_184" /* INT_VEC3 */]:
                case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_535" /* UNSIGNED_INT_VEC3 */]:
                case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_134" /* FLOAT_VEC4 */]:
                case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_185" /* INT_VEC4 */]:
                case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_536" /* UNSIGNED_INT_VEC4 */]:
                    UniformClass = __WEBPACK_IMPORTED_MODULE_2__uniforms_js__["c" /* MultiNumericUniform */];
                    break;
                case __WEBPACK_IMPORTED_MODULE_0__constants_js__["B" /* BOOL_VEC2 */]:
                case __WEBPACK_IMPORTED_MODULE_0__constants_js__["C" /* BOOL_VEC3 */]:
                case __WEBPACK_IMPORTED_MODULE_0__constants_js__["D" /* BOOL_VEC4 */]:
                    UniformClass = __WEBPACK_IMPORTED_MODULE_2__uniforms_js__["b" /* MultiBoolUniform */];
                    break;
                case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_123" /* FLOAT_MAT2 */]:
                case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_126" /* FLOAT_MAT3 */]:
                case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_129" /* FLOAT_MAT4 */]:
                case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_124" /* FLOAT_MAT2x3 */]:
                case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_125" /* FLOAT_MAT2x4 */]:
                case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_127" /* FLOAT_MAT3x2 */]:
                case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_128" /* FLOAT_MAT3x4 */]:
                case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_130" /* FLOAT_MAT4x2 */]:
                case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_131" /* FLOAT_MAT4x3 */]:
                    UniformClass = __WEBPACK_IMPORTED_MODULE_2__uniforms_js__["a" /* MatrixUniform */];
                    break;
                default:
                    console.error("Unrecognized type for uniform ", uniformInfo.name);
                    break;
            }

            if (UniformClass) {
                this.uniforms[uniformInfo.name] = new UniformClass(gl, uniformHandle, type, numElements);
            }
        }

        let numUniformBlocks = gl.getProgramParameter(program, gl.ACTIVE_UNIFORM_BLOCKS);

        for (i = 0; i < numUniformBlocks; ++i) {
            let blockName = gl.getActiveUniformBlockName(this.program, i);
            let blockIndex = gl.getUniformBlockIndex(this.program, blockName);

            this.uniformBlocks[blockName] = blockIndex;
        }

        gl.useProgram(null);
    }

    /**
        Delete this program.

        @method
    */
    delete() {
        if (this.program) {
            this.gl.deleteProgram(this.program);
            this.program = null;
        }
    }

    // Set the value of a uniform.
    uniform(name, value) {
        this.uniforms[name].set(value);
    }

    // Bind a uniform block to a uniform buffer base.
    uniformBlock(name, base) {
        if (this.uniformBlockBindings[name] !== base) {
            this.gl.uniformBlockBinding(this.program, this.uniformBlocks[name], base);
            this.uniformBlockBindings[name] = base;
        }
    }

    // Use this program.
    bind() {
        if (this.appState.program !== this) {
            this.gl.useProgram(this.program);
            this.appState.program = this;
        }
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Program;



/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_js__ = __webpack_require__(0);
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



// Classes to manage uniform value updates, including
// caching current values.

const UNIFORM_FUNC_NAME = {};
UNIFORM_FUNC_NAME[__WEBPACK_IMPORTED_MODULE_0__constants_js__["A" /* BOOL */]] = "uniform1i";
UNIFORM_FUNC_NAME[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_176" /* INT */]] = "uniform1i";
UNIFORM_FUNC_NAME[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_357" /* SAMPLER_2D */]] = "uniform1i";
UNIFORM_FUNC_NAME[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_179" /* INT_SAMPLER_2D */]] = "uniform1i";
UNIFORM_FUNC_NAME[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_530" /* UNSIGNED_INT_SAMPLER_2D */]] = "uniform1i";
UNIFORM_FUNC_NAME[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_360" /* SAMPLER_2D_SHADOW */]] = "uniform1i";
UNIFORM_FUNC_NAME[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_358" /* SAMPLER_2D_ARRAY */]] = "uniform1i";
UNIFORM_FUNC_NAME[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_180" /* INT_SAMPLER_2D_ARRAY */]] = "uniform1i";
UNIFORM_FUNC_NAME[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_531" /* UNSIGNED_INT_SAMPLER_2D_ARRAY */]] = "uniform1i";
UNIFORM_FUNC_NAME[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_359" /* SAMPLER_2D_ARRAY_SHADOW */]] = "uniform1i";
UNIFORM_FUNC_NAME[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_363" /* SAMPLER_CUBE */]] = "uniform1i";
UNIFORM_FUNC_NAME[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_182" /* INT_SAMPLER_CUBE */]] = "uniform1i";
UNIFORM_FUNC_NAME[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_533" /* UNSIGNED_INT_SAMPLER_CUBE */]] = "uniform1i";
UNIFORM_FUNC_NAME[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_364" /* SAMPLER_CUBE_SHADOW */]] = "uniform1i";
UNIFORM_FUNC_NAME[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_361" /* SAMPLER_3D */]] = "uniform1i";
UNIFORM_FUNC_NAME[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_181" /* INT_SAMPLER_3D */]] = "uniform1i";
UNIFORM_FUNC_NAME[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_532" /* UNSIGNED_INT_SAMPLER_3D */]] = "uniform1i";
UNIFORM_FUNC_NAME[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_525" /* UNSIGNED_INT */]] = "uniform1ui";
UNIFORM_FUNC_NAME[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_121" /* FLOAT */]] = "uniform1f";
UNIFORM_FUNC_NAME[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_132" /* FLOAT_VEC2 */]] = "uniform2f";
UNIFORM_FUNC_NAME[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_133" /* FLOAT_VEC3 */]] = "uniform3f";
UNIFORM_FUNC_NAME[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_134" /* FLOAT_VEC4 */]] = "uniform4f";
UNIFORM_FUNC_NAME[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_183" /* INT_VEC2 */]] = "uniform2i";
UNIFORM_FUNC_NAME[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_184" /* INT_VEC3 */]] = "uniform3i";
UNIFORM_FUNC_NAME[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_185" /* INT_VEC4 */]] = "uniform4i";
UNIFORM_FUNC_NAME[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_534" /* UNSIGNED_INT_VEC2 */]] = "uniform2ui";
UNIFORM_FUNC_NAME[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_535" /* UNSIGNED_INT_VEC3 */]] = "uniform3ui";
UNIFORM_FUNC_NAME[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_536" /* UNSIGNED_INT_VEC4 */]] = "uniform4ui";
UNIFORM_FUNC_NAME[__WEBPACK_IMPORTED_MODULE_0__constants_js__["B" /* BOOL_VEC2 */]] = "uniform2i";
UNIFORM_FUNC_NAME[__WEBPACK_IMPORTED_MODULE_0__constants_js__["C" /* BOOL_VEC3 */]] = "uniform3i";
UNIFORM_FUNC_NAME[__WEBPACK_IMPORTED_MODULE_0__constants_js__["D" /* BOOL_VEC4 */]] = "uniform4i";
UNIFORM_FUNC_NAME[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_123" /* FLOAT_MAT2 */]] = "uniformMatrix2fv";
UNIFORM_FUNC_NAME[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_126" /* FLOAT_MAT3 */]] = "uniformMatrix3fv";
UNIFORM_FUNC_NAME[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_129" /* FLOAT_MAT4 */]] = "uniformMatrix4fv";
UNIFORM_FUNC_NAME[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_124" /* FLOAT_MAT2x3 */]] = "uniformMatrix2x3fv";
UNIFORM_FUNC_NAME[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_125" /* FLOAT_MAT2x4 */]] = "uniformMatrix2x4fv";
UNIFORM_FUNC_NAME[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_127" /* FLOAT_MAT3x2 */]] = "uniformMatrix3x2fv";
UNIFORM_FUNC_NAME[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_128" /* FLOAT_MAT3x4 */]] = "uniformMatrix3x4fv";
UNIFORM_FUNC_NAME[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_130" /* FLOAT_MAT4x2 */]] = "uniformMatrix4x2fv";
UNIFORM_FUNC_NAME[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_131" /* FLOAT_MAT4x3 */]] = "uniformMatrix4x3fv";

const UNIFORM_COMPONENT_COUNT = {};
UNIFORM_COMPONENT_COUNT[__WEBPACK_IMPORTED_MODULE_0__constants_js__["A" /* BOOL */]] = 1;
UNIFORM_COMPONENT_COUNT[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_176" /* INT */]] = 1;
UNIFORM_COMPONENT_COUNT[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_357" /* SAMPLER_2D */]] = 1;
UNIFORM_COMPONENT_COUNT[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_179" /* INT_SAMPLER_2D */]] = 1;
UNIFORM_COMPONENT_COUNT[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_530" /* UNSIGNED_INT_SAMPLER_2D */]] = 1;
UNIFORM_COMPONENT_COUNT[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_360" /* SAMPLER_2D_SHADOW */]] = 1;
UNIFORM_COMPONENT_COUNT[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_358" /* SAMPLER_2D_ARRAY */]] = 1;
UNIFORM_COMPONENT_COUNT[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_180" /* INT_SAMPLER_2D_ARRAY */]] = 1;
UNIFORM_COMPONENT_COUNT[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_531" /* UNSIGNED_INT_SAMPLER_2D_ARRAY */]] = 1;
UNIFORM_COMPONENT_COUNT[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_359" /* SAMPLER_2D_ARRAY_SHADOW */]] = 1;
UNIFORM_COMPONENT_COUNT[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_363" /* SAMPLER_CUBE */]] = 1;
UNIFORM_COMPONENT_COUNT[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_182" /* INT_SAMPLER_CUBE */]] = 1;
UNIFORM_COMPONENT_COUNT[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_533" /* UNSIGNED_INT_SAMPLER_CUBE */]] = 1;
UNIFORM_COMPONENT_COUNT[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_364" /* SAMPLER_CUBE_SHADOW */]] = 1;
UNIFORM_COMPONENT_COUNT[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_361" /* SAMPLER_3D */]] = 1;
UNIFORM_COMPONENT_COUNT[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_181" /* INT_SAMPLER_3D */]] = 1;
UNIFORM_COMPONENT_COUNT[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_532" /* UNSIGNED_INT_SAMPLER_3D */]] = 1;
UNIFORM_COMPONENT_COUNT[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_525" /* UNSIGNED_INT */]] = 1;
UNIFORM_COMPONENT_COUNT[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_121" /* FLOAT */]] = 1;
UNIFORM_COMPONENT_COUNT[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_132" /* FLOAT_VEC2 */]] = 2;
UNIFORM_COMPONENT_COUNT[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_133" /* FLOAT_VEC3 */]] = 3;
UNIFORM_COMPONENT_COUNT[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_134" /* FLOAT_VEC4 */]] = 4;
UNIFORM_COMPONENT_COUNT[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_183" /* INT_VEC2 */]] = 2;
UNIFORM_COMPONENT_COUNT[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_184" /* INT_VEC3 */]] = 3;
UNIFORM_COMPONENT_COUNT[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_185" /* INT_VEC4 */]] = 4;
UNIFORM_COMPONENT_COUNT[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_534" /* UNSIGNED_INT_VEC2 */]] = 2;
UNIFORM_COMPONENT_COUNT[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_535" /* UNSIGNED_INT_VEC3 */]] = 3;
UNIFORM_COMPONENT_COUNT[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_536" /* UNSIGNED_INT_VEC4 */]] = 4;
UNIFORM_COMPONENT_COUNT[__WEBPACK_IMPORTED_MODULE_0__constants_js__["B" /* BOOL_VEC2 */]] = 2;
UNIFORM_COMPONENT_COUNT[__WEBPACK_IMPORTED_MODULE_0__constants_js__["C" /* BOOL_VEC3 */]] = 3;
UNIFORM_COMPONENT_COUNT[__WEBPACK_IMPORTED_MODULE_0__constants_js__["D" /* BOOL_VEC4 */]] = 4;
UNIFORM_COMPONENT_COUNT[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_123" /* FLOAT_MAT2 */]] = 4;
UNIFORM_COMPONENT_COUNT[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_126" /* FLOAT_MAT3 */]] = 9;
UNIFORM_COMPONENT_COUNT[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_129" /* FLOAT_MAT4 */]] = 16;
UNIFORM_COMPONENT_COUNT[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_124" /* FLOAT_MAT2x3 */]] = 6;
UNIFORM_COMPONENT_COUNT[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_125" /* FLOAT_MAT2x4 */]] = 8;
UNIFORM_COMPONENT_COUNT[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_127" /* FLOAT_MAT3x2 */]] = 6;
UNIFORM_COMPONENT_COUNT[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_128" /* FLOAT_MAT3x4 */]] = 12;
UNIFORM_COMPONENT_COUNT[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_130" /* FLOAT_MAT4x2 */]] = 8;
UNIFORM_COMPONENT_COUNT[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_131" /* FLOAT_MAT4x3 */]] = 12;

const UNIFORM_CACHE_CLASS = {};
UNIFORM_CACHE_CLASS[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_176" /* INT */]] = Int32Array;
UNIFORM_CACHE_CLASS[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_357" /* SAMPLER_2D */]] = Int32Array;
UNIFORM_CACHE_CLASS[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_179" /* INT_SAMPLER_2D */]] = Int32Array;
UNIFORM_CACHE_CLASS[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_530" /* UNSIGNED_INT_SAMPLER_2D */]] = Int32Array;
UNIFORM_CACHE_CLASS[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_360" /* SAMPLER_2D_SHADOW */]] = Int32Array;
UNIFORM_CACHE_CLASS[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_358" /* SAMPLER_2D_ARRAY */]] = Int32Array;
UNIFORM_CACHE_CLASS[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_180" /* INT_SAMPLER_2D_ARRAY */]] = Int32Array;
UNIFORM_CACHE_CLASS[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_531" /* UNSIGNED_INT_SAMPLER_2D_ARRAY */]] = Int32Array;
UNIFORM_CACHE_CLASS[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_359" /* SAMPLER_2D_ARRAY_SHADOW */]] = Int32Array;
UNIFORM_CACHE_CLASS[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_363" /* SAMPLER_CUBE */]] = Int32Array;
UNIFORM_CACHE_CLASS[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_182" /* INT_SAMPLER_CUBE */]] = Int32Array;
UNIFORM_CACHE_CLASS[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_533" /* UNSIGNED_INT_SAMPLER_CUBE */]] = Int32Array;
UNIFORM_CACHE_CLASS[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_364" /* SAMPLER_CUBE_SHADOW */]] = Int32Array;
UNIFORM_CACHE_CLASS[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_361" /* SAMPLER_3D */]] = Int32Array;
UNIFORM_CACHE_CLASS[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_181" /* INT_SAMPLER_3D */]] = Int32Array;
UNIFORM_CACHE_CLASS[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_532" /* UNSIGNED_INT_SAMPLER_3D */]] = Int32Array;
UNIFORM_CACHE_CLASS[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_525" /* UNSIGNED_INT */]] = Uint32Array;
UNIFORM_CACHE_CLASS[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_121" /* FLOAT */]] = Float32Array;
UNIFORM_CACHE_CLASS[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_132" /* FLOAT_VEC2 */]] = Float32Array;
UNIFORM_CACHE_CLASS[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_133" /* FLOAT_VEC3 */]] = Float32Array;
UNIFORM_CACHE_CLASS[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_134" /* FLOAT_VEC4 */]] = Float32Array;
UNIFORM_CACHE_CLASS[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_183" /* INT_VEC2 */]] = Int32Array;
UNIFORM_CACHE_CLASS[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_184" /* INT_VEC3 */]] = Int32Array;
UNIFORM_CACHE_CLASS[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_185" /* INT_VEC4 */]] = Int32Array;
UNIFORM_CACHE_CLASS[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_534" /* UNSIGNED_INT_VEC2 */]] = Uint32Array;
UNIFORM_CACHE_CLASS[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_535" /* UNSIGNED_INT_VEC3 */]] = Uint32Array;
UNIFORM_CACHE_CLASS[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_536" /* UNSIGNED_INT_VEC4 */]] = Uint32Array;

class SingleComponentUniform {
    
    constructor(gl, handle, type) {
        this.gl = gl;
        this.handle = handle;
        this.glFuncName = UNIFORM_FUNC_NAME[type];
        this.cache = type === __WEBPACK_IMPORTED_MODULE_0__constants_js__["A" /* BOOL */] ? false : 0;
    }

    set(value) {
        if (this.cache !== value) {
            this.gl[this.glFuncName](this.handle, value);
            this.cache = value;
        }
    }

}
/* harmony export (immutable) */ __webpack_exports__["d"] = SingleComponentUniform;


class MultiNumericUniform {

    constructor(gl, handle, type, count) {
        this.gl = gl;
        this.handle = handle;
        this.glFuncName = UNIFORM_FUNC_NAME[type] + "v";
        this.count = count;
        this.cache = new UNIFORM_CACHE_CLASS[type](UNIFORM_COMPONENT_COUNT[type] * count);
    }

    set(value) {
        for (let i = 0, len = value.length; i < len; ++i) {
            if (this.cache[i] !== value[i]) {
                this.gl[this.glFuncName](this.handle, value);
                this.cache.set(value);
                return;
            }
        }
    }

}
/* harmony export (immutable) */ __webpack_exports__["c"] = MultiNumericUniform;


class MultiBoolUniform {

    constructor(gl, handle, type, count) {
        this.gl = gl;
        this.handle = handle;
        this.glFuncName = UNIFORM_FUNC_NAME[type] + "v";
        this.count = count;
        this.cache = new Array(UNIFORM_COMPONENT_COUNT[type] * count).fill(false);
    }

    set(value) {
        for (let i = 0, len = value.length; i < len; ++i) {
            if (this.cache[i] !== value[i]) {
                this.gl[this.glFuncName](this.handle, value);
                for (let j = i; j < len; j++) {
                    this.cache[j] = value[j];
                }
                return;
            }
        }
    }

}
/* harmony export (immutable) */ __webpack_exports__["b"] = MultiBoolUniform;


class MatrixUniform {

    constructor(gl, handle, type, count) {
        this.gl = gl;
        this.handle = handle;
        this.glFuncName = UNIFORM_FUNC_NAME[type];
        this.count = count;
        this.cache = new Float32Array(UNIFORM_COMPONENT_COUNT[type] * count);
    }

    set(value) {
        for (let i = 0, len = value.length; i < len; ++i) {
            if (this.cache[i] !== value[i]) {
                this.gl[this.glFuncName](this.handle, false, value);
                this.cache.set(value);
                return;
            }
        }
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = MatrixUniform;



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__query_js__ = __webpack_require__(4);
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



/**
    Rendering timer.

    @class
    @prop {WebGLRenderingContext} gl The WebGL context.
    @prop {Object} cpuTimer Timer for CPU. Will be window.performance, if available, or window.Date.
    @prop {boolean} gpuTimer Whether the gpu timing is available (EXT_disjoint_timer_query_webgl2 or
            EXT_disjoint_timer_query are supported).
    @prop {WebGLQuery} gpuTimerQuery Timer query object for GPU (if gpu timing is supported).
    @prop {boolean} gpuTimerQueryInProgress Whether a gpu timer query is currently in progress.
    @prop {number} cpuStartTime When the last CPU timing started.
    @prop {number} cpuTime Time spent on CPU during last timing. Only valid if ready() returns true.
    @prop {number} gpuTime Time spent on GPU during last timing. Only valid if ready() returns true.
            Will remain 0 if extension EXT_disjoint_timer_query_webgl2 is unavailable.
*/
class Timer {

    constructor(gl) {
        this.gl = gl;
        this.cpuTimer = window.performance || window.Date;

        // Note(Tarek): Firefox for some reason only supports EXT_disjoint_timer_query, so have to try both
        var gpuTimerExtension = this.gl.getExtension("EXT_disjoint_timer_query_webgl2") || this.gl.getExtension("EXT_disjoint_timer_query");
        if (gpuTimerExtension) {
            this.gpuTimer = true;
            this.gpuTimerQuery = new __WEBPACK_IMPORTED_MODULE_0__query_js__["a" /* Query */](this.gl, gpuTimerExtension.TIME_ELAPSED_EXT);
            this.GPU_DISJOINT_EXT = gpuTimerExtension.GPU_DISJOINT_EXT;
        } else {
            this.gpuTimer = false;
            this.gpuTimerQuery = null;
            this.GPU_DISJOINT_EXT = null;
        }

        this.cpuStartTime = 0;
        this.cpuTime = 0;
        this.gpuTime = 0;
    }


    /**
        Start timing.

        @method
    */
    start() {
        if (this.gpuTimer) {
            if (!this.gpuTimerQuery.active) {
                this.gpuTimerQuery.begin();
                this.cpuStartTime = this.cpuTimer.now();
            }
        } else {
            this.cpuStartTime = this.cpuTimer.now();
        }
    }


    /**
        Stop timing.

        @method
    */
    end() {
        if (this.gpuTimer) {
            if (!this.gpuTimerQuery.active) {
                this.gpuTimerQuery.end();
                this.cpuTime = this.cpuTimer.now() - this.cpuStartTime;
            }
        } else {
            this.cpuTime = this.cpuTimer.now() - this.cpuStartTime;
        }
    }

    /**
        Check if timing results are available. If
        this method returns true, the cpuTime and
        gpuTime properties will be set to valid
        values.

        @method
    */
    ready() {
        if (this.gpuTimer) {
            if (!this.gpuTimerQuery.active) {
                return false;
            }

            var gpuTimerAvailable = this.gpuTimerQuery.ready();
            var gpuTimerDisjoint = this.gl.getParameter(this.GPU_DISJOINT_EXT);

            if (gpuTimerAvailable && !gpuTimerDisjoint) {
                this.gpuTime = this.gpuTimerQuery.result  / 1000000;
                return true;
            } else {
                return false;
            }
        } else {
            return !!this.cpuStartTime;
        }
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Timer;



/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/**
    Tranform feedback object.

    @class
    @prop {WebGLRenderingContext} gl The WebGL context.
    @prop {WebGLTransformFeedback} transformFeedback Transform feedback object.
    @prop {Object} appState Tracked GL state.
*/
class TransformFeedback {

    constructor(gl, appState) {
        this.gl = gl;
        this.transformFeedback = gl.createTransformFeedback();
        this.appState = appState;
        // TODO(Tarek): Need to rebind buffers due to bug in ANGLE.
        // Remove this when that's fixed.
        this.angleBugBuffers = [];
    }

    /**
        Bind a feedback buffer to capture transform output.

        @method
        @param {number} index Index of transform feedback varying to capture.
        @param {VertexBuffer} buffer Buffer to record output into.
    */
    feedbackBuffer(index, buffer) {
        this.gl.bindTransformFeedback(this.gl.TRANSFORM_FEEDBACK, this.transformFeedback);
        this.gl.bindBufferBase(this.gl.TRANSFORM_FEEDBACK_BUFFER, index, buffer.buffer);
        this.gl.bindTransformFeedback(this.gl.TRANSFORM_FEEDBACK, null);
        this.gl.bindBufferBase(this.gl.TRANSFORM_FEEDBACK_BUFFER, index, null);

        this.angleBugBuffers[index] = buffer;

        return this;
    }

    /**
        Delete this transform feedback.

        @method
    */
    delete() {
        if (this.transformFeedback) {
            this.gl.deleteTransformFeedback(this.transformFeedback);
            this.transformFeedback = null;
        }
    }

    // Bind this transform feedback.
    bind() {
        if (this.appState.transformFeedback !== this) {
            this.gl.bindTransformFeedback(this.gl.TRANSFORM_FEEDBACK, this.transformFeedback);

            for (let i = 0, len = this.angleBugBuffers.length; i < len; ++i) {
                this.gl.bindBufferBase(this.gl.TRANSFORM_FEEDBACK_BUFFER, i, this.angleBugBuffers[i].buffer);
            }

            this.appState.transformFeedback = this;
        }

        return this;
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = TransformFeedback;



/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_js__ = __webpack_require__(0);
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



/**
    Storage for uniform data. Data is stored in std140 layout.

    @class
    @prop {WebGLRenderingContext} gl The WebGL context.
    @prop {WebGLBuffer} buffer Allocated buffer storage.
    @prop {Float32Array} data Buffer data.
    @prop {Object} dataViews Map of base data types to matching ArrayBufferViews of the buffer data.
    @prop {Array} offsets Offsets into the array for each item in the buffer.
    @prop {Array} sizes Size of the item at the given offset.
    @prop {Array} types The base type of the item at the given offset (FLOAT, INT or UNSIGNED_INT).
    @prop {number} size The size of the buffer (in 4-byte items).
    @prop {GLEnum} usage Usage pattern of the buffer.
*/
class UniformBuffer {

    constructor(gl, layout, usage = gl.DYNAMIC_DRAW) {
        this.gl = gl;
        this.buffer = gl.createBuffer();
        this.dataViews = {};
        this.offsets = new Array(layout.length);
        this.sizes = new Array(layout.length);
        this.types = new Array(layout.length);
        this.size = 0;
        this.usage = usage;

        for (let i = 0, len = layout.length; i < len; ++i) {
            let type = layout[i];
            switch(type) {
                case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_121" /* FLOAT */]:
                case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_176" /* INT */]:
                case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_525" /* UNSIGNED_INT */]:
                case __WEBPACK_IMPORTED_MODULE_0__constants_js__["A" /* BOOL */]:
                    this.offsets[i] = this.size;
                    this.sizes[i] = 1;

                    if (type === __WEBPACK_IMPORTED_MODULE_0__constants_js__["_176" /* INT */]) {
                        this.types[i] = __WEBPACK_IMPORTED_MODULE_0__constants_js__["_176" /* INT */];
                    } else if (this.type === __WEBPACK_IMPORTED_MODULE_0__constants_js__["_525" /* UNSIGNED_INT */]) {
                        this.types[i] = __WEBPACK_IMPORTED_MODULE_0__constants_js__["_525" /* UNSIGNED_INT */];
                    } else {
                        this.types[i] = __WEBPACK_IMPORTED_MODULE_0__constants_js__["_121" /* FLOAT */];
                    }

                    this.size++;
                    break;
                case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_132" /* FLOAT_VEC2 */]:
                case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_183" /* INT_VEC2 */]:
                case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_534" /* UNSIGNED_INT_VEC2 */]:
                case __WEBPACK_IMPORTED_MODULE_0__constants_js__["B" /* BOOL_VEC2 */]:
                    this.size += this.size % 2;
                    this.offsets[i] = this.size;
                    this.sizes[i] = 2;

                    if (type === __WEBPACK_IMPORTED_MODULE_0__constants_js__["_183" /* INT_VEC2 */]) {
                        this.types[i] = __WEBPACK_IMPORTED_MODULE_0__constants_js__["_176" /* INT */];
                    } else if (this.type === __WEBPACK_IMPORTED_MODULE_0__constants_js__["_534" /* UNSIGNED_INT_VEC2 */]) {
                        this.types[i] = __WEBPACK_IMPORTED_MODULE_0__constants_js__["_525" /* UNSIGNED_INT */];
                    } else {
                        this.types[i] = __WEBPACK_IMPORTED_MODULE_0__constants_js__["_121" /* FLOAT */];
                    }

                    this.size += 2;
                    break;
                case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_133" /* FLOAT_VEC3 */]:
                case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_184" /* INT_VEC3 */]:
                case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_535" /* UNSIGNED_INT_VEC3 */]:
                case __WEBPACK_IMPORTED_MODULE_0__constants_js__["C" /* BOOL_VEC3 */]:
                case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_134" /* FLOAT_VEC4 */]:
                case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_185" /* INT_VEC4 */]:
                case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_536" /* UNSIGNED_INT_VEC4 */]:
                case __WEBPACK_IMPORTED_MODULE_0__constants_js__["D" /* BOOL_VEC4 */]:
                    this.size += (4 - this.size % 4) % 4;
                    this.offsets[i] = this.size;
                    this.sizes[i] = 4;

                    if (type === __WEBPACK_IMPORTED_MODULE_0__constants_js__["_185" /* INT_VEC4 */] || type === __WEBPACK_IMPORTED_MODULE_0__constants_js__["_184" /* INT_VEC3 */]) {
                        this.types[i] = __WEBPACK_IMPORTED_MODULE_0__constants_js__["_176" /* INT */];
                    } else if (this.type === __WEBPACK_IMPORTED_MODULE_0__constants_js__["_536" /* UNSIGNED_INT_VEC4 */] || this.type === __WEBPACK_IMPORTED_MODULE_0__constants_js__["_535" /* UNSIGNED_INT_VEC3 */]) {
                        this.types[i] = __WEBPACK_IMPORTED_MODULE_0__constants_js__["_525" /* UNSIGNED_INT */];
                    } else {
                        this.types[i] = __WEBPACK_IMPORTED_MODULE_0__constants_js__["_121" /* FLOAT */];
                    }

                    this.size += 4;
                    break;
                case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_123" /* FLOAT_MAT2 */]:
                case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_124" /* FLOAT_MAT2x3 */]:
                case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_125" /* FLOAT_MAT2x4 */]:
                    this.size += (4 - this.size % 4) % 4;
                    this.offsets[i] = this.size;
                    this.sizes[i] = 8;
                    this.types[i] = __WEBPACK_IMPORTED_MODULE_0__constants_js__["_121" /* FLOAT */];

                    this.size += 8;
                    break;
                case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_126" /* FLOAT_MAT3 */]:
                case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_127" /* FLOAT_MAT3x2 */]:
                case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_128" /* FLOAT_MAT3x4 */]:
                    this.size += (4 - this.size % 4) % 4;
                    this.offsets[i] = this.size;
                    this.sizes[i] = 12;
                    this.types[i] = __WEBPACK_IMPORTED_MODULE_0__constants_js__["_121" /* FLOAT */];

                    this.size += 12;
                    break;
                case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_129" /* FLOAT_MAT4 */]:
                case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_130" /* FLOAT_MAT4x2 */]:
                case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_131" /* FLOAT_MAT4x3 */]:
                    this.size += (4 - this.size % 4) % 4;
                    this.offsets[i] = this.size;
                    this.sizes[i] = 16;
                    this.types[i] = __WEBPACK_IMPORTED_MODULE_0__constants_js__["_121" /* FLOAT */];

                    this.size += 16;
                    break;
                default:
                    console.error("Unsupported type for uniform buffer.");
            }
        }

        this.size += (4 - this.size % 4) % 4;

        this.data = new Float32Array(this.size);
        this.dataViews[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_121" /* FLOAT */]] = this.data;
        this.dataViews[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_176" /* INT */]] = new Int32Array(this.data.buffer);
        this.dataViews[__WEBPACK_IMPORTED_MODULE_0__constants_js__["_525" /* UNSIGNED_INT */]] = new Uint32Array(this.data.buffer);

        this.gl.bindBufferBase(this.gl.UNIFORM_BUFFER, 0, this.buffer);
        this.gl.bufferData(this.gl.UNIFORM_BUFFER, this.size * 4, this.usage);
        this.gl.bindBufferBase(this.gl.UNIFORM_BUFFER, 0, null);
    }

    /**
        Update data for a given item in the buffer. NOTE: Data is not
        sent the the GPU until the update() method is called!

        @method
        @param {number} index Index in the layout of item to set.
        @param {ArrayBufferView} value Value to store at the layout location.
    */
    set(index, value) {
        let view = this.dataViews[this.types[index]];

        if (this.sizes[index] === 1)  {
            view[this.offsets[index]] = value;
        } else {
            view.set(value, this.offsets[index]);
        }

        return this;
    }

    /**
        Send stored buffer data to the GPU.

        @param {number} [index] Index in the layout of item to send to the GPU. If ommited, entire buffer is sent.
        @method
    */
    update(index) {
        let data;
        let offset;
        if (index === undefined) {
            data = this.data;
            offset = 0;
        } else {
            let begin = this.offsets[index];
            let end = begin + this.sizes[index];
            data = this.data.subarray(begin, end);
            offset = begin * 4;
        }

        this.gl.bindBufferBase(this.gl.UNIFORM_BUFFER, 0, this.buffer);
        this.gl.bufferSubData(this.gl.UNIFORM_BUFFER, offset, data);
        this.gl.bindBufferBase(this.gl.UNIFORM_BUFFER, 0, null);

        return this;
    }

    /**
        Delete this uniform buffer.

        @method
    */
    delete() {
        if (this.buffer) {
            this.gl.deleteBuffer(this.buffer);
            this.buffer = null;
        }
    }

    // Bind this uniform buffer to the given base.
    bind(base) {
        this.gl.bindBufferBase(this.gl.UNIFORM_BUFFER, base, this.buffer);

        return this;
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = UniformBuffer;



/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_js__ = __webpack_require__(0);
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



/**
    Organizes vertex buffer and attribute state.

    @class
    @prop {WebGLRenderingContext} gl The WebGL context.
    @prop {WebGLVertexArrayObject} vertexArray Vertex array object.
    @prop {number} numElements Number of elements in the vertex array.
    @prop {boolean} indexed Whether this vertex array is set up for indexed drawing.
    @prop {GLenum} indexType Data type of the indices.
    @prop {boolean} instanced Whether this vertex array is set up for instanced drawing.
    @prop {number} numInstances Number of instances to draw with this vertex array.
    @prop {Object} appState Tracked GL state.
*/
class VertexArray {
    
    constructor(gl, appState) {
        this.gl = gl;
        this.vertexArray = gl.createVertexArray();
        this.appState = appState;
        this.numElements = 0;
        this.indexType = null;
        this.instancedBuffers = 0;
        this.indexed = false;
        this.numInstances = 0;
    }

    /**
        Bind an per-vertex attribute buffer to this vertex array.

        @method
        @param {number} attributeIndex The attribute location to bind to.
        @param {VertexBuffer} vertexBuffer The VertexBuffer to bind.
    */
    vertexAttributeBuffer(attributeIndex, vertexBuffer) {
        this.attributeBuffer(attributeIndex, vertexBuffer, false, false, false);

        return this;
    }

    /**
        Bind an per-instance attribute buffer to this vertex array.

        @method
        @param {number} attributeIndex The attribute location to bind to.
        @param {VertexBuffer} vertexBuffer The VertexBuffer to bind.
    */
    instanceAttributeBuffer(attributeIndex, vertexBuffer) {
        this.attributeBuffer(attributeIndex, vertexBuffer, true, false, false);

        return this;
    }

    /**
        Bind an per-vertex integer attribute buffer to this vertex array.
        Note that this refers to the attribute in the shader being an integer,
        not the data stored in the vertex buffer.

        @method
        @param {number} attributeIndex The attribute location to bind to.
        @param {VertexBuffer} vertexBuffer The VertexBuffer to bind.
    */
    vertexIntegerAttributeBuffer(attributeIndex, vertexBuffer) {
        this.attributeBuffer(attributeIndex, vertexBuffer, false, true, false);

        return this;
    }

    /**
        Bind an per-instance integer attribute buffer to this vertex array.
        Note that this refers to the attribute in the shader being an integer,
        not the data stored in the vertex buffer.

        @method
        @param {number} attributeIndex The attribute location to bind to.
        @param {VertexBuffer} vertexBuffer The VertexBuffer to bind.
    */
    instanceIntegerAttributeBuffer(attributeIndex, vertexBuffer) {
        this.attributeBuffer(attributeIndex, vertexBuffer, true, true, false);

        return this;
    }

    /**
        Bind an per-vertex normalized attribute buffer to this vertex array.
        Integer data in the vertex buffer will be normalized to [-1.0, 1.0] if
        signed, [0.0, 1.0] if unsigned.

        @method
        @param {number} attributeIndex The attribute location to bind to.
        @param {VertexBuffer} vertexBuffer The VertexBuffer to bind.
    */
    vertexNormalizedAttributeBuffer(attributeIndex, vertexBuffer) {
        this.attributeBuffer(attributeIndex, vertexBuffer, false, false, true);

        return this;
    }

    /**
        Bind an per-instance normalized attribute buffer to this vertex array.
        Integer data in the vertex buffer will be normalized to [-1.0, 1.0] if
        signed, [0.0, 1.0] if unsigned.
        
        @method
        @param {number} attributeIndex The attribute location to bind to.
        @param {VertexBuffer} vertexBuffer The VertexBuffer to bind.
    */
    instanceNormalizedAttributeBuffer(attributeIndex, vertexBuffer) {
        this.attributeBuffer(attributeIndex, vertexBuffer, true, false, true);

        return this;
    }

    /**
        Bind an index buffer to this vertex array.

        @method
        @param {VertexBuffer} vertexBuffer The VertexBuffer to bind.
    */
    indexBuffer(vertexBuffer) {
        this.gl.bindVertexArray(this.vertexArray);
        this.gl.bindBuffer(vertexBuffer.binding, vertexBuffer.buffer);

        this.numElements = vertexBuffer.numItems * 3;
        this.indexType = vertexBuffer.type;
        this.indexed = true;

        this.gl.bindVertexArray(null);
        this.gl.bindBuffer(vertexBuffer.binding, null);

        return this;
    }

    /**
        Delete this vertex array.

        @method
    */
    delete() {
        if (this.vertexArray) {
            this.gl.deleteVertexArray(this.vertexArray);
            this.vertexArray = null;
        }
        this.gl.bindVertexArray(null);

        return this;
    }

    // Bind this vertex array.
    bind() {
        if (this.appState.vertexArray !== this) {
            this.gl.bindVertexArray(this.vertexArray);
            this.appState.vertexArray = this;
        }

        return this;
    }

    // Attach an attribute buffer
    attributeBuffer(attributeIndex, vertexBuffer, instanced, integer, normalized) {
        this.gl.bindVertexArray(this.vertexArray);
        this.gl.bindBuffer(vertexBuffer.binding, vertexBuffer.buffer);

        let numColumns = vertexBuffer.numColumns;

        for (let i = 0; i < numColumns; ++i) {
            if (integer) {
                this.gl.vertexAttribIPointer(
                    attributeIndex + i,
                    vertexBuffer.itemSize,
                    vertexBuffer.type,
                    numColumns * vertexBuffer.itemSize * __WEBPACK_IMPORTED_MODULE_0__constants_js__["_495" /* TYPE_SIZE */][vertexBuffer.type],
                    i * vertexBuffer.itemSize * __WEBPACK_IMPORTED_MODULE_0__constants_js__["_495" /* TYPE_SIZE */][vertexBuffer.type]);
            } else {
                this.gl.vertexAttribPointer(
                    attributeIndex + i,
                    vertexBuffer.itemSize,
                    vertexBuffer.type,
                    normalized,
                    numColumns * vertexBuffer.itemSize * __WEBPACK_IMPORTED_MODULE_0__constants_js__["_495" /* TYPE_SIZE */][vertexBuffer.type],
                    i * vertexBuffer.itemSize * __WEBPACK_IMPORTED_MODULE_0__constants_js__["_495" /* TYPE_SIZE */][vertexBuffer.type]);
            }

            if (instanced) {
                this.gl.vertexAttribDivisor(attributeIndex + i, 1);
            }

            this.gl.enableVertexAttribArray(attributeIndex + i);
        }

        this.instanced = this.instanced || instanced;

        if (instanced) {
            this.numInstances = vertexBuffer.numItems;
        } else {
            this.numElements = this.numElements || vertexBuffer.numItems;
        }

        this.gl.bindVertexArray(null);
        this.gl.bindBuffer(vertexBuffer.binding, null);

        return this;
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = VertexArray;



/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants_js__ = __webpack_require__(0);
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



/**
    Storage for vertex data.

    @class
    @prop {WebGLRenderingContext} gl The WebGL context.
    @prop {WebGLBuffer} buffer Allocated buffer storage.
    @prop {GLEnum} type The type of data stored in the buffer.
    @prop {number} itemSize Number of array elements per vertex.
    @prop {number} numItems Number of vertices represented.
    @prop {GLEnum} usage The usage pattern of the buffer.
    @prop {boolean} indexArray Whether this is an index array.
    @prop {GLEnum} binding GL binding point (ARRAY_BUFFER or ELEMENT_ARRAY_BUFFER).
    @prop {Object} appState Tracked GL state.
*/
class VertexBuffer {

    constructor(gl, appState, type, itemSize, data, usage = gl.STATIC_DRAW, indexArray) {
        let numColumns;
        switch(type) {
            case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_129" /* FLOAT_MAT4 */]:
            case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_130" /* FLOAT_MAT4x2 */]:
            case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_131" /* FLOAT_MAT4x3 */]:
                numColumns = 4;
                break;
            case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_126" /* FLOAT_MAT3 */]:
            case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_127" /* FLOAT_MAT3x2 */]:
            case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_128" /* FLOAT_MAT3x4 */]:
                numColumns = 3;
                break;
            case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_123" /* FLOAT_MAT2 */]:
            case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_124" /* FLOAT_MAT2x3 */]:
            case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_125" /* FLOAT_MAT2x4 */]:
                numColumns = 2;
                break;
            default:
                numColumns = 1;
        }

        switch(type) {
            case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_129" /* FLOAT_MAT4 */]:
            case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_128" /* FLOAT_MAT3x4 */]:
            case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_125" /* FLOAT_MAT2x4 */]:
                itemSize = 4;
                type = __WEBPACK_IMPORTED_MODULE_0__constants_js__["_121" /* FLOAT */];
                break;
            case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_126" /* FLOAT_MAT3 */]:
            case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_131" /* FLOAT_MAT4x3 */]:
            case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_124" /* FLOAT_MAT2x3 */]:
                itemSize = 3;
                type = __WEBPACK_IMPORTED_MODULE_0__constants_js__["_121" /* FLOAT */];
                break;
            case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_123" /* FLOAT_MAT2 */]:
            case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_127" /* FLOAT_MAT3x2 */]:
            case __WEBPACK_IMPORTED_MODULE_0__constants_js__["_130" /* FLOAT_MAT4x2 */]:
                itemSize = 2;
                type = __WEBPACK_IMPORTED_MODULE_0__constants_js__["_121" /* FLOAT */];
                break;
        }

        let dataLength;
        if (typeof data === "number") {
            dataLength = data;
            data *= __WEBPACK_IMPORTED_MODULE_0__constants_js__["_495" /* TYPE_SIZE */][type];
        } else {
            dataLength = data.length;
        }

        this.gl = gl;
        this.buffer = gl.createBuffer();
        this.appState = appState;
        this.type = type;
        this.itemSize = itemSize;
        this.numItems = dataLength / (itemSize * numColumns);
        this.numColumns = numColumns;
        this.usage = usage;
        this.indexArray = !!indexArray;
        this.binding = this.indexArray ? gl.ELEMENT_ARRAY_BUFFER : gl.ARRAY_BUFFER;

        gl.bindBuffer(this.binding, this.buffer);
        gl.bufferData(this.binding, data, this.usage);
        gl.bindBuffer(this.binding, null);
    }

    /**
        Update data in this buffer. NOTE: the data must fit
        the originally-allocated buffer!

        @method
        @param {VertexBufferView} data Data to store in the buffer.
    */
    data(data) {
        // Don't want to update vertex array bindings
        let currentVertexArray = this.appState.vertexArray;
        if (currentVertexArray) {
            this.gl.bindVertexArray(null);
        }

        this.gl.bindBuffer(this.binding, this.buffer);
        this.gl.bufferSubData(this.binding, 0, data);
        this.gl.bindBuffer(this.binding, null);

        if (currentVertexArray) {
            this.gl.bindVertexArray(currentVertexArray.vertexArray);
        }

        return this;
    }

    /**
        Delete this array buffer.

        @method
    */
    delete() {
        if (this.buffer) {
            this.gl.deleteBuffer(this.buffer);
            this.buffer = null;
        }
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = VertexBuffer;



/***/ })
/******/ ]);
});