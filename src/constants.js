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

// https://www.khronos.org/registry/webgl/specs/1.0/
// https://www.khronos.org/registry/webgl/specs/latest/2.0/#1.1
export const GL = {
    /**
        @type {GLenum}
        @name PicoGL.DEPTH_BUFFER_BIT
        @private
     */
    DEPTH_BUFFER_BIT: 0x00000100,
    /**
        @type {GLenum}
        @name PicoGL.STENCIL_BUFFER_BIT
        @private
     */
    STENCIL_BUFFER_BIT: 0x00000400,
    /**
        @type {GLenum}
        @name PicoGL.COLOR_BUFFER_BIT
        @private
     */
    COLOR_BUFFER_BIT: 0x00004000,
    /**
        @type {GLenum}
        @name PicoGL.POINTS
        @private
     */
    POINTS: 0x0000,
    /**
        @type {GLenum}
        @name PicoGL.LINES
        @private
     */
    LINES: 0x0001,
    /**
        @type {GLenum}
        @name PicoGL.LINE_LOOP
        @private
     */
    LINE_LOOP: 0x0002,
    /**
        @type {GLenum}
        @name PicoGL.LINE_STRIP
        @private
     */
    LINE_STRIP: 0x0003,
    /**
        @type {GLenum}
        @name PicoGL.TRIANGLES
        @private
     */
    TRIANGLES: 0x0004,
    /**
        @type {GLenum}
        @name PicoGL.TRIANGLE_STRIP
        @private
     */
    TRIANGLE_STRIP: 0x0005,
    /**
        @type {GLenum}
        @name PicoGL.TRIANGLE_FAN
        @private
     */
    TRIANGLE_FAN: 0x0006,
    /**
        @type {GLenum}
        @name PicoGL.ZERO
        @private
     */
    ZERO: 0,
    /**
        @type {GLenum}
        @name PicoGL.ONE
        @private
     */
    ONE: 1,
    /**
        @type {GLenum}
        @name PicoGL.SRC_COLOR
        @private
     */
    SRC_COLOR: 0x0300,
    /**
        @type {GLenum}
        @name PicoGL.ONE_MINUS_SRC_COLOR
        @private
     */
    ONE_MINUS_SRC_COLOR: 0x0301,
    /**
        @type {GLenum}
        @name PicoGL.SRC_ALPHA
        @private
     */
    SRC_ALPHA: 0x0302,
    /**
        @type {GLenum}
        @name PicoGL.ONE_MINUS_SRC_ALPHA
        @private
     */
    ONE_MINUS_SRC_ALPHA: 0x0303,
    /**
        @type {GLenum}
        @name PicoGL.DST_ALPHA
        @private
     */
    DST_ALPHA: 0x0304,
    /**
        @type {GLenum}
        @name PicoGL.ONE_MINUS_DST_ALPHA
        @private
     */
    ONE_MINUS_DST_ALPHA: 0x0305,
    /**
        @type {GLenum}
        @name PicoGL.DST_COLOR
        @private
     */
    DST_COLOR: 0x0306,
    /**
        @type {GLenum}
        @name PicoGL.ONE_MINUS_DST_COLOR
        @private
     */
    ONE_MINUS_DST_COLOR: 0x0307,
    /**
        @type {GLenum}
        @name PicoGL.SRC_ALPHA_SATURATE
        @private
     */
    SRC_ALPHA_SATURATE: 0x0308,
    /**
        @type {GLenum}
        @name PicoGL.FUNC_ADD
        @private
     */
    FUNC_ADD: 0x8006,
    /**
        @type {GLenum}
        @name PicoGL.BLEND_EQUATION
        @private
     */
    BLEND_EQUATION: 0x8009,
    /**
        @type {GLenum}
        @name PicoGL.BLEND_EQUATION_RGB
        @private
     */
    BLEND_EQUATION_RGB: 0x8009,
    /**
        @type {GLenum}
        @name PicoGL.BLEND_EQUATION_ALPHA
        @private
     */
    BLEND_EQUATION_ALPHA: 0x883D,
    /**
        @type {GLenum}
        @name PicoGL.FUNC_SUBTRACT
        @private
     */
    FUNC_SUBTRACT: 0x800A,
    /**
        @type {GLenum}
        @name PicoGL.FUNC_REVERSE_SUBTRACT
        @private
     */
    FUNC_REVERSE_SUBTRACT: 0x800B,
    /**
        @type {GLenum}
        @name PicoGL.BLEND_DST_RGB
        @private
     */
    BLEND_DST_RGB: 0x80C8,
    /**
        @type {GLenum}
        @name PicoGL.BLEND_SRC_RGB
        @private
     */
    BLEND_SRC_RGB: 0x80C9,
    /**
        @type {GLenum}
        @name PicoGL.BLEND_DST_ALPHA
        @private
     */
    BLEND_DST_ALPHA: 0x80CA,
    /**
        @type {GLenum}
        @name PicoGL.BLEND_SRC_ALPHA
        @private
     */
    BLEND_SRC_ALPHA: 0x80CB,
    /**
        @type {GLenum}
        @name PicoGL.CONSTANT_COLOR
        @private
     */
    CONSTANT_COLOR: 0x8001,
    /**
        @type {GLenum}
        @name PicoGL.ONE_MINUS_CONSTANT_COLOR
        @private
     */
    ONE_MINUS_CONSTANT_COLOR: 0x8002,
    /**
        @type {GLenum}
        @name PicoGL.CONSTANT_ALPHA
        @private
     */
    CONSTANT_ALPHA: 0x8003,
    /**
        @type {GLenum}
        @name PicoGL.ONE_MINUS_CONSTANT_ALPHA
        @private
     */
    ONE_MINUS_CONSTANT_ALPHA: 0x8004,
    /**
        @type {GLenum}
        @name PicoGL.BLEND_COLOR
        @private
     */
    BLEND_COLOR: 0x8005,
    /**
        @type {GLenum}
        @name PicoGL.ARRAY_BUFFER
        @private
     */
    ARRAY_BUFFER: 0x8892,
    /**
        @type {GLenum}
        @name PicoGL.ELEMENT_ARRAY_BUFFER
        @private
     */
    ELEMENT_ARRAY_BUFFER: 0x8893,
    /**
        @type {GLenum}
        @name PicoGL.ARRAY_BUFFER_BINDING
        @private
     */
    ARRAY_BUFFER_BINDING: 0x8894,
    /**
        @type {GLenum}
        @name PicoGL.ELEMENT_ARRAY_BUFFER_BINDING
        @private
     */
    ELEMENT_ARRAY_BUFFER_BINDING: 0x8895,
    /**
        @type {GLenum}
        @name PicoGL.STREAM_DRAW
        @private
     */
    STREAM_DRAW: 0x88E0,
    /**
        @type {GLenum}
        @name PicoGL.STATIC_DRAW
        @private
     */
    STATIC_DRAW: 0x88E4,
    /**
        @type {GLenum}
        @name PicoGL.DYNAMIC_DRAW
        @private
     */
    DYNAMIC_DRAW: 0x88E8,
    /**
        @type {GLenum}
        @name PicoGL.BUFFER_SIZE
        @private
     */
    BUFFER_SIZE: 0x8764,
    /**
        @type {GLenum}
        @name PicoGL.BUFFER_USAGE
        @private
     */
    BUFFER_USAGE: 0x8765,
    /**
        @type {GLenum}
        @name PicoGL.CURRENT_VERTEX_ATTRIB
        @private
     */
    CURRENT_VERTEX_ATTRIB: 0x8626,
    /**
        @type {GLenum}
        @name PicoGL.FRONT
        @private
     */
    FRONT: 0x0404,
    /**
        @type {GLenum}
        @name PicoGL.BACK
        @private
     */
    BACK: 0x0405,
    /**
        @type {GLenum}
        @name PicoGL.FRONT_AND_BACK
        @private
     */
    FRONT_AND_BACK: 0x0408,
    /**
        @type {GLenum}
        @name PicoGL.CULL_FACE
        @private
     */
    CULL_FACE: 0x0B44,
    /**
        @type {GLenum}
        @name PicoGL.BLEND
        @private
     */
    BLEND: 0x0BE2,
    /**
        @type {GLenum}
        @name PicoGL.DITHER
        @private
     */
    DITHER: 0x0BD0,
    /**
        @type {GLenum}
        @name PicoGL.STENCIL_TEST
        @private
     */
    STENCIL_TEST: 0x0B90,
    /**
        @type {GLenum}
        @name PicoGL.DEPTH_TEST
        @private
     */
    DEPTH_TEST: 0x0B71,
    /**
        @type {GLenum}
        @name PicoGL.SCISSOR_TEST
        @private
     */
    SCISSOR_TEST: 0x0C11,
    /**
        @type {GLenum}
        @name PicoGL.POLYGON_OFFSET_FILL
        @private
     */
    POLYGON_OFFSET_FILL: 0x8037,
    /**
        @type {GLenum}
        @name PicoGL.SAMPLE_ALPHA_TO_COVERAGE
        @private
     */
    SAMPLE_ALPHA_TO_COVERAGE: 0x809E,
    /**
        @type {GLenum}
        @name PicoGL.SAMPLE_COVERAGE
        @private
     */
    SAMPLE_COVERAGE: 0x80A0,
    /**
        @type {GLenum}
        @name PicoGL.NO_ERROR
        @private
     */
    NO_ERROR: 0,
    /**
        @type {GLenum}
        @name PicoGL.INVALID_ENUM
        @private
     */
    INVALID_ENUM: 0x0500,
    /**
        @type {GLenum}
        @name PicoGL.INVALID_VALUE
        @private
     */
    INVALID_VALUE: 0x0501,
    /**
        @type {GLenum}
        @name PicoGL.INVALID_OPERATION
        @private
     */
    INVALID_OPERATION: 0x0502,
    /**
        @type {GLenum}
        @name PicoGL.OUT_OF_MEMORY
        @private
     */
    OUT_OF_MEMORY: 0x0505,
    /**
        @type {GLenum}
        @name PicoGL.CW
        @private
     */
    CW: 0x0900,
    /**
        @type {GLenum}
        @name PicoGL.CCW
        @private
     */
    CCW: 0x0901,
    /**
        @type {GLenum}
        @name PicoGL.LINE_WIDTH
        @private
     */
    LINE_WIDTH: 0x0B21,
    /**
        @type {GLenum}
        @name PicoGL.ALIASED_POINT_SIZE_RANGE
        @private
     */
    ALIASED_POINT_SIZE_RANGE: 0x846D,
    /**
        @type {GLenum}
        @name PicoGL.ALIASED_LINE_WIDTH_RANGE
        @private
     */
    ALIASED_LINE_WIDTH_RANGE: 0x846E,
    /**
        @type {GLenum}
        @name PicoGL.CULL_FACE_MODE
        @private
     */
    CULL_FACE_MODE: 0x0B45,
    /**
        @type {GLenum}
        @name PicoGL.FRONT_FACE
        @private
     */
    FRONT_FACE: 0x0B46,
    /**
        @type {GLenum}
        @name PicoGL.DEPTH_RANGE
        @private
     */
    DEPTH_RANGE: 0x0B70,
    /**
        @type {GLenum}
        @name PicoGL.DEPTH_WRITEMASK
        @private
     */
    DEPTH_WRITEMASK: 0x0B72,
    /**
        @type {GLenum}
        @name PicoGL.DEPTH_CLEAR_VALUE
        @private
     */
    DEPTH_CLEAR_VALUE: 0x0B73,
    /**
        @type {GLenum}
        @name PicoGL.DEPTH_FUNC
        @private
     */
    DEPTH_FUNC: 0x0B74,
    /**
        @type {GLenum}
        @name PicoGL.STENCIL_CLEAR_VALUE
        @private
     */
    STENCIL_CLEAR_VALUE: 0x0B91,
    /**
        @type {GLenum}
        @name PicoGL.STENCIL_FUNC
        @private
     */
    STENCIL_FUNC: 0x0B92,
    /**
        @type {GLenum}
        @name PicoGL.STENCIL_FAIL
        @private
     */
    STENCIL_FAIL: 0x0B94,
    /**
        @type {GLenum}
        @name PicoGL.STENCIL_PASS_DEPTH_FAIL
        @private
     */
    STENCIL_PASS_DEPTH_FAIL: 0x0B95,
    /**
        @type {GLenum}
        @name PicoGL.STENCIL_PASS_DEPTH_PASS
        @private
     */
    STENCIL_PASS_DEPTH_PASS: 0x0B96,
    /**
        @type {GLenum}
        @name PicoGL.STENCIL_REF
        @private
     */
    STENCIL_REF: 0x0B97,
    /**
        @type {GLenum}
        @name PicoGL.STENCIL_VALUE_MASK
        @private
     */
    STENCIL_VALUE_MASK: 0x0B93,
    /**
        @type {GLenum}
        @name PicoGL.STENCIL_WRITEMASK
        @private
     */
    STENCIL_WRITEMASK: 0x0B98,
    /**
        @type {GLenum}
        @name PicoGL.STENCIL_BACK_FUNC
        @private
     */
    STENCIL_BACK_FUNC: 0x8800,
    /**
        @type {GLenum}
        @name PicoGL.STENCIL_BACK_FAIL
        @private
     */
    STENCIL_BACK_FAIL: 0x8801,
    /**
        @type {GLenum}
        @name PicoGL.STENCIL_BACK_PASS_DEPTH_FAIL
        @private
     */
    STENCIL_BACK_PASS_DEPTH_FAIL: 0x8802,
    /**
        @type {GLenum}
        @name PicoGL.STENCIL_BACK_PASS_DEPTH_PASS
        @private
     */
    STENCIL_BACK_PASS_DEPTH_PASS: 0x8803,
    /**
        @type {GLenum}
        @name PicoGL.STENCIL_BACK_REF
        @private
     */
    STENCIL_BACK_REF: 0x8CA3,
    /**
        @type {GLenum}
        @name PicoGL.STENCIL_BACK_VALUE_MASK
        @private
     */
    STENCIL_BACK_VALUE_MASK: 0x8CA4,
    /**
        @type {GLenum}
        @name PicoGL.STENCIL_BACK_WRITEMASK
        @private
     */
    STENCIL_BACK_WRITEMASK: 0x8CA5,
    /**
        @type {GLenum}
        @name PicoGL.VIEWPORT
        @private
     */
    VIEWPORT: 0x0BA2,
    /**
        @type {GLenum}
        @name PicoGL.SCISSOR_BOX
        @private
     */
    SCISSOR_BOX: 0x0C10,
    /**
        @type {GLenum}
        @name PicoGL.COLOR_CLEAR_VALUE
        @private
     */
    COLOR_CLEAR_VALUE: 0x0C22,
    /**
        @type {GLenum}
        @name PicoGL.COLOR_WRITEMASK
        @private
     */
    COLOR_WRITEMASK: 0x0C23,
    /**
        @type {GLenum}
        @name PicoGL.UNPACK_ALIGNMENT
        @private
     */
    UNPACK_ALIGNMENT: 0x0CF5,
    /**
        @type {GLenum}
        @name PicoGL.PACK_ALIGNMENT
        @private
     */
    PACK_ALIGNMENT: 0x0D05,
    /**
        @type {GLenum}
        @name PicoGL.MAX_TEXTURE_SIZE
        @private
     */
    MAX_TEXTURE_SIZE: 0x0D33,
    /**
        @type {GLenum}
        @name PicoGL.MAX_VIEWPORT_DIMS
        @private
     */
    MAX_VIEWPORT_DIMS: 0x0D3A,
    /**
        @type {GLenum}
        @name PicoGL.SUBPIXEL_BITS
        @private
     */
    SUBPIXEL_BITS: 0x0D50,
    /**
        @type {GLenum}
        @name PicoGL.RED_BITS
        @private
     */
    RED_BITS: 0x0D52,
    /**
        @type {GLenum}
        @name PicoGL.GREEN_BITS
        @private
     */
    GREEN_BITS: 0x0D53,
    /**
        @type {GLenum}
        @name PicoGL.BLUE_BITS
        @private
     */
    BLUE_BITS: 0x0D54,
    /**
        @type {GLenum}
        @name PicoGL.ALPHA_BITS
        @private
     */
    ALPHA_BITS: 0x0D55,
    /**
        @type {GLenum}
        @name PicoGL.DEPTH_BITS
        @private
     */
    DEPTH_BITS: 0x0D56,
    /**
        @type {GLenum}
        @name PicoGL.STENCIL_BITS
        @private
     */
    STENCIL_BITS: 0x0D57,
    /**
        @type {GLenum}
        @name PicoGL.POLYGON_OFFSET_UNITS
        @private
     */
    POLYGON_OFFSET_UNITS: 0x2A00,
    /**
        @type {GLenum}
        @name PicoGL.POLYGON_OFFSET_FACTOR
        @private
     */
    POLYGON_OFFSET_FACTOR: 0x8038,
    /**
        @type {GLenum}
        @name PicoGL.TEXTURE_BINDING_2D
        @private
     */
    TEXTURE_BINDING_2D: 0x8069,
    /**
        @type {GLenum}
        @name PicoGL.SAMPLE_BUFFERS
        @private
     */
    SAMPLE_BUFFERS: 0x80A8,
    /**
        @type {GLenum}
        @name PicoGL.SAMPLES
        @private
     */
    SAMPLES: 0x80A9,
    /**
        @type {GLenum}
        @name PicoGL.SAMPLE_COVERAGE_VALUE
        @private
     */
    SAMPLE_COVERAGE_VALUE: 0x80AA,
    /**
        @type {GLenum}
        @name PicoGL.SAMPLE_COVERAGE_INVERT
        @private
     */
    SAMPLE_COVERAGE_INVERT: 0x80AB,
    /**
        @type {GLenum}
        @name PicoGL.COMPRESSED_TEXTURE_FORMATS
        @private
     */
    COMPRESSED_TEXTURE_FORMATS: 0x86A3,
    /**
        @type {GLenum}
        @name PicoGL.DONT_CARE
        @private
     */
    DONT_CARE: 0x1100,
    /**
        @type {GLenum}
        @name PicoGL.FASTEST
        @private
     */
    FASTEST: 0x1101,
    /**
        @type {GLenum}
        @name PicoGL.NICEST
        @private
     */
    NICEST: 0x1102,
    /**
        @type {GLenum}
        @name PicoGL.GENERATE_MIPMAP_HINT
        @private
     */
    GENERATE_MIPMAP_HINT: 0x8192,
    /**
        @type {GLenum}
        @name PicoGL.BYTE
        @private
     */
    BYTE: 0x1400,
    /**
        @type {GLenum}
        @name PicoGL.UNSIGNED_BYTE
        @private
     */
    UNSIGNED_BYTE: 0x1401,
    /**
        @type {GLenum}
        @name PicoGL.SHORT
        @private
     */
    SHORT: 0x1402,
    /**
        @type {GLenum}
        @name PicoGL.UNSIGNED_SHORT
        @private
     */
    UNSIGNED_SHORT: 0x1403,
    /**
        @type {GLenum}
        @name PicoGL.INT
        @private
     */
    INT: 0x1404,
    /**
        @type {GLenum}
        @name PicoGL.UNSIGNED_INT
        @private
     */
    UNSIGNED_INT: 0x1405,
    /**
        @type {GLenum}
        @name PicoGL.FLOAT
        @private
     */
    FLOAT: 0x1406,
    /**
        @type {GLenum}
        @name PicoGL.DEPTH_COMPONENT
        @private
     */
    DEPTH_COMPONENT: 0x1902,
    /**
        @type {GLenum}
        @name PicoGL.ALPHA
        @private
     */
    ALPHA: 0x1906,
    /**
        @type {GLenum}
        @name PicoGL.RGB
        @private
     */
    RGB: 0x1907,
    /**
        @type {GLenum}
        @name PicoGL.RGBA
        @private
     */
    RGBA: 0x1908,
    /**
        @type {GLenum}
        @name PicoGL.LUMINANCE
        @private
     */
    LUMINANCE: 0x1909,
    /**
        @type {GLenum}
        @name PicoGL.LUMINANCE_ALPHA
        @private
     */
    LUMINANCE_ALPHA: 0x190A,
    /**
        @type {GLenum}
        @name PicoGL.UNSIGNED_SHORT_4_4_4_4
        @private
     */
    UNSIGNED_SHORT_4_4_4_4: 0x8033,
    /**
        @type {GLenum}
        @name PicoGL.UNSIGNED_SHORT_5_5_5_1
        @private
     */
    UNSIGNED_SHORT_5_5_5_1: 0x8034,
    /**
        @type {GLenum}
        @name PicoGL.UNSIGNED_SHORT_5_6_5
        @private
     */
    UNSIGNED_SHORT_5_6_5: 0x8363,
    /**
        @type {GLenum}
        @name PicoGL.FRAGMENT_SHADER
        @private
     */
    FRAGMENT_SHADER: 0x8B30,
    /**
        @type {GLenum}
        @name PicoGL.VERTEX_SHADER
        @private
     */
    VERTEX_SHADER: 0x8B31,
    /**
        @type {GLenum}
        @name PicoGL.MAX_VERTEX_ATTRIBS
        @private
     */
    MAX_VERTEX_ATTRIBS: 0x8869,
    /**
        @type {GLenum}
        @name PicoGL.MAX_VERTEX_UNIFORM_VECTORS
        @private
     */
    MAX_VERTEX_UNIFORM_VECTORS: 0x8DFB,
    /**
        @type {GLenum}
        @name PicoGL.MAX_VARYING_VECTORS
        @private
     */
    MAX_VARYING_VECTORS: 0x8DFC,
    /**
        @type {GLenum}
        @name PicoGL.MAX_COMBINED_TEXTURE_IMAGE_UNITS
        @private
     */
    MAX_COMBINED_TEXTURE_IMAGE_UNITS: 0x8B4D,
    /**
        @type {GLenum}
        @name PicoGL.MAX_VERTEX_TEXTURE_IMAGE_UNITS
        @private
     */
    MAX_VERTEX_TEXTURE_IMAGE_UNITS: 0x8B4C,
    /**
        @type {GLenum}
        @name PicoGL.MAX_TEXTURE_IMAGE_UNITS
        @private
     */
    MAX_TEXTURE_IMAGE_UNITS: 0x8872,
    /**
        @type {GLenum}
        @name PicoGL.MAX_FRAGMENT_UNIFORM_VECTORS
        @private
     */
    MAX_FRAGMENT_UNIFORM_VECTORS: 0x8DFD,
    /**
        @type {GLenum}
        @name PicoGL.SHADER_TYPE
        @private
     */
    SHADER_TYPE: 0x8B4F,
    /**
        @type {GLenum}
        @name PicoGL.DELETE_STATUS
        @private
     */
    DELETE_STATUS: 0x8B80,
    /**
        @type {GLenum}
        @name PicoGL.LINK_STATUS
        @private
     */
    LINK_STATUS: 0x8B82,
    /**
        @type {GLenum}
        @name PicoGL.VALIDATE_STATUS
        @private
     */
    VALIDATE_STATUS: 0x8B83,
    /**
        @type {GLenum}
        @name PicoGL.ATTACHED_SHADERS
        @private
     */
    ATTACHED_SHADERS: 0x8B85,
    /**
        @type {GLenum}
        @name PicoGL.ACTIVE_UNIFORMS
        @private
     */
    ACTIVE_UNIFORMS: 0x8B86,
    /**
        @type {GLenum}
        @name PicoGL.ACTIVE_ATTRIBUTES
        @private
     */
    ACTIVE_ATTRIBUTES: 0x8B89,
    /**
        @type {GLenum}
        @name PicoGL.SHADING_LANGUAGE_VERSION
        @private
     */
    SHADING_LANGUAGE_VERSION: 0x8B8C,
    /**
        @type {GLenum}
        @name PicoGL.CURRENT_PROGRAM
        @private
     */
    CURRENT_PROGRAM: 0x8B8D,
    /**
        @type {GLenum}
        @name PicoGL.NEVER
        @private
     */
    NEVER: 0x0200,
    /**
        @type {GLenum}
        @name PicoGL.LESS
        @private
     */
    LESS: 0x0201,
    /**
        @type {GLenum}
        @name PicoGL.EQUAL
        @private
     */
    EQUAL: 0x0202,
    /**
        @type {GLenum}
        @name PicoGL.LEQUAL
        @private
     */
    LEQUAL: 0x0203,
    /**
        @type {GLenum}
        @name PicoGL.GREATER
        @private
     */
    GREATER: 0x0204,
    /**
        @type {GLenum}
        @name PicoGL.NOTEQUAL
        @private
     */
    NOTEQUAL: 0x0205,
    /**
        @type {GLenum}
        @name PicoGL.GEQUAL
        @private
     */
    GEQUAL: 0x0206,
    /**
        @type {GLenum}
        @name PicoGL.ALWAYS
        @private
     */
    ALWAYS: 0x0207,
    /**
        @type {GLenum}
        @name PicoGL.KEEP
        @private
     */
    KEEP: 0x1E00,
    /**
        @type {GLenum}
        @name PicoGL.REPLACE
        @private
     */
    REPLACE: 0x1E01,
    /**
        @type {GLenum}
        @name PicoGL.INCR
        @private
     */
    INCR: 0x1E02,
    /**
        @type {GLenum}
        @name PicoGL.DECR
        @private
     */
    DECR: 0x1E03,
    /**
        @type {GLenum}
        @name PicoGL.INVERT
        @private
     */
    INVERT: 0x150A,
    /**
        @type {GLenum}
        @name PicoGL.INCR_WRAP
        @private
     */
    INCR_WRAP: 0x8507,
    /**
        @type {GLenum}
        @name PicoGL.DECR_WRAP
        @private
     */
    DECR_WRAP: 0x8508,
    /**
        @type {GLenum}
        @name PicoGL.VENDOR
        @private
     */
    VENDOR: 0x1F00,
    /**
        @type {GLenum}
        @name PicoGL.RENDERER
        @private
     */
    RENDERER: 0x1F01,
    /**
        @type {GLenum}
        @name PicoGL.VERSION
        @private
     */
    VERSION: 0x1F02,
    /**
        @type {GLenum}
        @name PicoGL.NEAREST
        @private
     */
    NEAREST: 0x2600,
    /**
        @type {GLenum}
        @name PicoGL.LINEAR
        @private
     */
    LINEAR: 0x2601,
    /**
        @type {GLenum}
        @name PicoGL.NEAREST_MIPMAP_NEAREST
        @private
     */
    NEAREST_MIPMAP_NEAREST: 0x2700,
    /**
        @type {GLenum}
        @name PicoGL.LINEAR_MIPMAP_NEAREST
        @private
     */
    LINEAR_MIPMAP_NEAREST: 0x2701,
    /**
        @type {GLenum}
        @name PicoGL.NEAREST_MIPMAP_LINEAR
        @private
     */
    NEAREST_MIPMAP_LINEAR: 0x2702,
    /**
        @type {GLenum}
        @name PicoGL.LINEAR_MIPMAP_LINEAR
        @private
     */
    LINEAR_MIPMAP_LINEAR: 0x2703,
    /**
        @type {GLenum}
        @name PicoGL.TEXTURE_MAG_FILTER
        @private
     */
    TEXTURE_MAG_FILTER: 0x2800,
    /**
        @type {GLenum}
        @name PicoGL.TEXTURE_MIN_FILTER
        @private
     */
    TEXTURE_MIN_FILTER: 0x2801,
    /**
        @type {GLenum}
        @name PicoGL.TEXTURE_WRAP_S
        @private
     */
    TEXTURE_WRAP_S: 0x2802,
    /**
        @type {GLenum}
        @name PicoGL.TEXTURE_WRAP_T
        @private
     */
    TEXTURE_WRAP_T: 0x2803,
    /**
        @type {GLenum}
        @name PicoGL.TEXTURE_2D
        @private
     */
    TEXTURE_2D: 0x0DE1,
    /**
        @type {GLenum}
        @name PicoGL.TEXTURE
        @private
     */
    TEXTURE: 0x1702,
    /**
        @type {GLenum}
        @name PicoGL.TEXTURE_CUBE_MAP
        @private
     */
    TEXTURE_CUBE_MAP: 0x8513,
    /**
        @type {GLenum}
        @name PicoGL.TEXTURE_BINDING_CUBE_MAP
        @private
     */
    TEXTURE_BINDING_CUBE_MAP: 0x8514,
    /**
        @type {GLenum}
        @name PicoGL.TEXTURE_CUBE_MAP_POSITIVE_X
        @private
     */
    TEXTURE_CUBE_MAP_POSITIVE_X: 0x8515,
    /**
        @type {GLenum}
        @name PicoGL.TEXTURE_CUBE_MAP_NEGATIVE_X
        @private
     */
    TEXTURE_CUBE_MAP_NEGATIVE_X: 0x8516,
    /**
        @type {GLenum}
        @name PicoGL.TEXTURE_CUBE_MAP_POSITIVE_Y
        @private
     */
    TEXTURE_CUBE_MAP_POSITIVE_Y: 0x8517,
    /**
        @type {GLenum}
        @name PicoGL.TEXTURE_CUBE_MAP_NEGATIVE_Y
        @private
     */
    TEXTURE_CUBE_MAP_NEGATIVE_Y: 0x8518,
    /**
        @type {GLenum}
        @name PicoGL.TEXTURE_CUBE_MAP_POSITIVE_Z
        @private
     */
    TEXTURE_CUBE_MAP_POSITIVE_Z: 0x8519,
    /**
        @type {GLenum}
        @name PicoGL.TEXTURE_CUBE_MAP_NEGATIVE_Z
        @private
     */
    TEXTURE_CUBE_MAP_NEGATIVE_Z: 0x851A,
    /**
        @type {GLenum}
        @name PicoGL.MAX_CUBE_MAP_TEXTURE_SIZE
        @private
     */
    MAX_CUBE_MAP_TEXTURE_SIZE: 0x851C,
    /**
        @type {GLenum}
        @name PicoGL.TEXTURE0
        @private
     */
    TEXTURE0: 0x84C0,
    /**
        @type {GLenum}
        @name PicoGL.TEXTURE1
        @private
     */
    TEXTURE1: 0x84C1,
    /**
        @type {GLenum}
        @name PicoGL.TEXTURE2
        @private
     */
    TEXTURE2: 0x84C2,
    /**
        @type {GLenum}
        @name PicoGL.TEXTURE3
        @private
     */
    TEXTURE3: 0x84C3,
    /**
        @type {GLenum}
        @name PicoGL.TEXTURE4
        @private
     */
    TEXTURE4: 0x84C4,
    /**
        @type {GLenum}
        @name PicoGL.TEXTURE5
        @private
     */
    TEXTURE5: 0x84C5,
    /**
        @type {GLenum}
        @name PicoGL.TEXTURE6
        @private
     */
    TEXTURE6: 0x84C6,
    /**
        @type {GLenum}
        @name PicoGL.TEXTURE7
        @private
     */
    TEXTURE7: 0x84C7,
    /**
        @type {GLenum}
        @name PicoGL.TEXTURE8
        @private
     */
    TEXTURE8: 0x84C8,
    /**
        @type {GLenum}
        @name PicoGL.TEXTURE9
        @private
     */
    TEXTURE9: 0x84C9,
    /**
        @type {GLenum}
        @name PicoGL.TEXTURE10
        @private
     */
    TEXTURE10: 0x84CA,
    /**
        @type {GLenum}
        @name PicoGL.TEXTURE11
        @private
     */
    TEXTURE11: 0x84CB,
    /**
        @type {GLenum}
        @name PicoGL.TEXTURE12
        @private
     */
    TEXTURE12: 0x84CC,
    /**
        @type {GLenum}
        @name PicoGL.TEXTURE13
        @private
     */
    TEXTURE13: 0x84CD,
    /**
        @type {GLenum}
        @name PicoGL.TEXTURE14
        @private
     */
    TEXTURE14: 0x84CE,
    /**
        @type {GLenum}
        @name PicoGL.TEXTURE15
        @private
     */
    TEXTURE15: 0x84CF,
    /**
        @type {GLenum}
        @name PicoGL.TEXTURE16
        @private
     */
    TEXTURE16: 0x84D0,
    /**
        @type {GLenum}
        @name PicoGL.TEXTURE17
        @private
     */
    TEXTURE17: 0x84D1,
    /**
        @type {GLenum}
        @name PicoGL.TEXTURE18
        @private
     */
    TEXTURE18: 0x84D2,
    /**
        @type {GLenum}
        @name PicoGL.TEXTURE19
        @private
     */
    TEXTURE19: 0x84D3,
    /**
        @type {GLenum}
        @name PicoGL.TEXTURE20
        @private
     */
    TEXTURE20: 0x84D4,
    /**
        @type {GLenum}
        @name PicoGL.TEXTURE21
        @private
     */
    TEXTURE21: 0x84D5,
    /**
        @type {GLenum}
        @name PicoGL.TEXTURE22
        @private
     */
    TEXTURE22: 0x84D6,
    /**
        @type {GLenum}
        @name PicoGL.TEXTURE23
        @private
     */
    TEXTURE23: 0x84D7,
    /**
        @type {GLenum}
        @name PicoGL.TEXTURE24
        @private
     */
    TEXTURE24: 0x84D8,
    /**
        @type {GLenum}
        @name PicoGL.TEXTURE25
        @private
     */
    TEXTURE25: 0x84D9,
    /**
        @type {GLenum}
        @name PicoGL.TEXTURE26
        @private
     */
    TEXTURE26: 0x84DA,
    /**
        @type {GLenum}
        @name PicoGL.TEXTURE27
        @private
     */
    TEXTURE27: 0x84DB,
    /**
        @type {GLenum}
        @name PicoGL.TEXTURE28
        @private
     */
    TEXTURE28: 0x84DC,
    /**
        @type {GLenum}
        @name PicoGL.TEXTURE29
        @private
     */
    TEXTURE29: 0x84DD,
    /**
        @type {GLenum}
        @name PicoGL.TEXTURE30
        @private
     */
    TEXTURE30: 0x84DE,
    /**
        @type {GLenum}
        @name PicoGL.TEXTURE31
        @private
     */
    TEXTURE31: 0x84DF,
    /**
        @type {GLenum}
        @name PicoGL.ACTIVE_TEXTURE
        @private
     */
    ACTIVE_TEXTURE: 0x84E0,
    /**
        @type {GLenum}
        @name PicoGL.REPEAT
        @private
     */
    REPEAT: 0x2901,
    /**
        @type {GLenum}
        @name PicoGL.CLAMP_TO_EDGE
        @private
     */
    CLAMP_TO_EDGE: 0x812F,
    /**
        @type {GLenum}
        @name PicoGL.MIRRORED_REPEAT
        @private
     */
    MIRRORED_REPEAT: 0x8370,
    /**
        @type {GLenum}
        @name PicoGL.FLOAT_VEC2
        @private
     */
    FLOAT_VEC2: 0x8B50,
    /**
        @type {GLenum}
        @name PicoGL.FLOAT_VEC3
        @private
     */
    FLOAT_VEC3: 0x8B51,
    /**
        @type {GLenum}
        @name PicoGL.FLOAT_VEC4
        @private
     */
    FLOAT_VEC4: 0x8B52,
    /**
        @type {GLenum}
        @name PicoGL.INT_VEC2
        @private
     */
    INT_VEC2: 0x8B53,
    /**
        @type {GLenum}
        @name PicoGL.INT_VEC3
        @private
     */
    INT_VEC3: 0x8B54,
    /**
        @type {GLenum}
        @name PicoGL.INT_VEC4
        @private
     */
    INT_VEC4: 0x8B55,
    /**
        @type {GLenum}
        @name PicoGL.BOOL
        @private
     */
    BOOL: 0x8B56,
    /**
        @type {GLenum}
        @name PicoGL.BOOL_VEC2
        @private
     */
    BOOL_VEC2: 0x8B57,
    /**
        @type {GLenum}
        @name PicoGL.BOOL_VEC3
        @private
     */
    BOOL_VEC3: 0x8B58,
    /**
        @type {GLenum}
        @name PicoGL.BOOL_VEC4
        @private
     */
    BOOL_VEC4: 0x8B59,
    /**
        @type {GLenum}
        @name PicoGL.FLOAT_MAT2
        @private
     */
    FLOAT_MAT2: 0x8B5A,
    /**
        @type {GLenum}
        @name PicoGL.FLOAT_MAT3
        @private
     */
    FLOAT_MAT3: 0x8B5B,
    /**
        @type {GLenum}
        @name PicoGL.FLOAT_MAT4
        @private
     */
    FLOAT_MAT4: 0x8B5C,
    /**
        @type {GLenum}
        @name PicoGL.SAMPLER_2D
        @private
     */
    SAMPLER_2D: 0x8B5E,
    /**
        @type {GLenum}
        @name PicoGL.SAMPLER_CUBE
        @private
     */
    SAMPLER_CUBE: 0x8B60,
    /**
        @type {GLenum}
        @name PicoGL.VERTEX_ATTRIB_ARRAY_ENABLED
        @private
     */
    VERTEX_ATTRIB_ARRAY_ENABLED: 0x8622,
    /**
        @type {GLenum}
        @name PicoGL.VERTEX_ATTRIB_ARRAY_SIZE
        @private
     */
    VERTEX_ATTRIB_ARRAY_SIZE: 0x8623,
    /**
        @type {GLenum}
        @name PicoGL.VERTEX_ATTRIB_ARRAY_STRIDE
        @private
     */
    VERTEX_ATTRIB_ARRAY_STRIDE: 0x8624,
    /**
        @type {GLenum}
        @name PicoGL.VERTEX_ATTRIB_ARRAY_TYPE
        @private
     */
    VERTEX_ATTRIB_ARRAY_TYPE: 0x8625,
    /**
        @type {GLenum}
        @name PicoGL.VERTEX_ATTRIB_ARRAY_NORMALIZED
        @private
     */
    VERTEX_ATTRIB_ARRAY_NORMALIZED: 0x886A,
    /**
        @type {GLenum}
        @name PicoGL.VERTEX_ATTRIB_ARRAY_POINTER
        @private
     */
    VERTEX_ATTRIB_ARRAY_POINTER: 0x8645,
    /**
        @type {GLenum}
        @name PicoGL.VERTEX_ATTRIB_ARRAY_BUFFER_BINDING
        @private
     */
    VERTEX_ATTRIB_ARRAY_BUFFER_BINDING: 0x889F,
    /**
        @type {GLenum}
        @name PicoGL.IMPLEMENTATION_COLOR_READ_TYPE
        @private
     */
    IMPLEMENTATION_COLOR_READ_TYPE: 0x8B9A,
    /**
        @type {GLenum}
        @name PicoGL.IMPLEMENTATION_COLOR_READ_FORMAT
        @private
     */
    IMPLEMENTATION_COLOR_READ_FORMAT: 0x8B9B,
    /**
        @type {GLenum}
        @name PicoGL.COMPILE_STATUS
        @private
     */
    COMPILE_STATUS: 0x8B81,
    /**
        @type {GLenum}
        @name PicoGL.LOW_FLOAT
        @private
     */
    LOW_FLOAT: 0x8DF0,
    /**
        @type {GLenum}
        @name PicoGL.MEDIUM_FLOAT
        @private
     */
    MEDIUM_FLOAT: 0x8DF1,
    /**
        @type {GLenum}
        @name PicoGL.HIGH_FLOAT
        @private
     */
    HIGH_FLOAT: 0x8DF2,
    /**
        @type {GLenum}
        @name PicoGL.LOW_INT
        @private
     */
    LOW_INT: 0x8DF3,
    /**
        @type {GLenum}
        @name PicoGL.MEDIUM_INT
        @private
     */
    MEDIUM_INT: 0x8DF4,
    /**
        @type {GLenum}
        @name PicoGL.HIGH_INT
        @private
     */
    HIGH_INT: 0x8DF5,
    /**
        @type {GLenum}
        @name PicoGL.FRAMEBUFFER
        @private
     */
    FRAMEBUFFER: 0x8D40,
    /**
        @type {GLenum}
        @name PicoGL.RENDERBUFFER
        @private
     */
    RENDERBUFFER: 0x8D41,
    /**
        @type {GLenum}
        @name PicoGL.RGBA4
        @private
     */
    RGBA4: 0x8056,
    /**
        @type {GLenum}
        @name PicoGL.RGB5_A1
        @private
     */
    RGB5_A1: 0x8057,
    /**
        @type {GLenum}
        @name PicoGL.RGB565
        @private
     */
    RGB565: 0x8D62,
    /**
        @type {GLenum}
        @name PicoGL.DEPTH_COMPONENT16
        @private
     */
    DEPTH_COMPONENT16: 0x81A5,
    /**
        @type {GLenum}
        @name PicoGL.STENCIL_INDEX
        @private
     */
    STENCIL_INDEX: 0x1901,
    /**
        @type {GLenum}
        @name PicoGL.STENCIL_INDEX8
        @private
     */
    STENCIL_INDEX8: 0x8D48,
    /**
        @type {GLenum}
        @name PicoGL.DEPTH_STENCIL
        @private
     */
    DEPTH_STENCIL: 0x84F9,
    /**
        @type {GLenum}
        @name PicoGL.RENDERBUFFER_WIDTH
        @private
     */
    RENDERBUFFER_WIDTH: 0x8D42,
    /**
        @type {GLenum}
        @name PicoGL.RENDERBUFFER_HEIGHT
        @private
     */
    RENDERBUFFER_HEIGHT: 0x8D43,
    /**
        @type {GLenum}
        @name PicoGL.RENDERBUFFER_INTERNAL_FORMAT
        @private
     */
    RENDERBUFFER_INTERNAL_FORMAT: 0x8D44,
    /**
        @type {GLenum}
        @name PicoGL.RENDERBUFFER_RED_SIZE
        @private
     */
    RENDERBUFFER_RED_SIZE: 0x8D50,
    /**
        @type {GLenum}
        @name PicoGL.RENDERBUFFER_GREEN_SIZE
        @private
     */
    RENDERBUFFER_GREEN_SIZE: 0x8D51,
    /**
        @type {GLenum}
        @name PicoGL.RENDERBUFFER_BLUE_SIZE
        @private
     */
    RENDERBUFFER_BLUE_SIZE: 0x8D52,
    /**
        @type {GLenum}
        @name PicoGL.RENDERBUFFER_ALPHA_SIZE
        @private
     */
    RENDERBUFFER_ALPHA_SIZE: 0x8D53,
    /**
        @type {GLenum}
        @name PicoGL.RENDERBUFFER_DEPTH_SIZE
        @private
     */
    RENDERBUFFER_DEPTH_SIZE: 0x8D54,
    /**
        @type {GLenum}
        @name PicoGL.RENDERBUFFER_STENCIL_SIZE
        @private
     */
    RENDERBUFFER_STENCIL_SIZE: 0x8D55,
    /**
        @type {GLenum}
        @name PicoGL.FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE
        @private
     */
    FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE: 0x8CD0,
    /**
        @type {GLenum}
        @name PicoGL.FRAMEBUFFER_ATTACHMENT_OBJECT_NAME
        @private
     */
    FRAMEBUFFER_ATTACHMENT_OBJECT_NAME: 0x8CD1,
    /**
        @type {GLenum}
        @name PicoGL.FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL
        @private
     */
    FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL: 0x8CD2,
    /**
        @type {GLenum}
        @name PicoGL.FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE
        @private
     */
    FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE: 0x8CD3,
    /**
        @type {GLenum}
        @name PicoGL.COLOR_ATTACHMENT0
        @private
     */
    COLOR_ATTACHMENT0: 0x8CE0,
    /**
        @type {GLenum}
        @name PicoGL.DEPTH_ATTACHMENT
        @private
     */
    DEPTH_ATTACHMENT: 0x8D00,
    /**
        @type {GLenum}
        @name PicoGL.STENCIL_ATTACHMENT
        @private
     */
    STENCIL_ATTACHMENT: 0x8D20,
    /**
        @type {GLenum}
        @name PicoGL.DEPTH_STENCIL_ATTACHMENT
        @private
     */
    DEPTH_STENCIL_ATTACHMENT: 0x821A,
    /**
        @type {GLenum}
        @name PicoGL.NONE
        @private
     */
    NONE: 0,
    /**
        @type {GLenum}
        @name PicoGL.FRAMEBUFFER_COMPLETE
        @private
     */
    FRAMEBUFFER_COMPLETE: 0x8CD5,
    /**
        @type {GLenum}
        @name PicoGL.FRAMEBUFFER_INCOMPLETE_ATTACHMENT
        @private
     */
    FRAMEBUFFER_INCOMPLETE_ATTACHMENT: 0x8CD6,
    /**
        @type {GLenum}
        @name PicoGL.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT
        @private
     */
    FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT: 0x8CD7,
    /**
        @type {GLenum}
        @name PicoGL.FRAMEBUFFER_INCOMPLETE_DIMENSIONS
        @private
     */
    FRAMEBUFFER_INCOMPLETE_DIMENSIONS: 0x8CD9,
    /**
        @type {GLenum}
        @name PicoGL.FRAMEBUFFER_UNSUPPORTED
        @private
     */
    FRAMEBUFFER_UNSUPPORTED: 0x8CDD,
    /**
        @type {GLenum}
        @name PicoGL.FRAMEBUFFER_BINDING
        @private
     */
    FRAMEBUFFER_BINDING: 0x8CA6,
    /**
        @type {GLenum}
        @name PicoGL.RENDERBUFFER_BINDING
        @private
     */
    RENDERBUFFER_BINDING: 0x8CA7,
    /**
        @type {GLenum}
        @name PicoGL.MAX_RENDERBUFFER_SIZE
        @private
     */
    MAX_RENDERBUFFER_SIZE: 0x84E8,
    /**
        @type {GLenum}
        @name PicoGL.INVALID_FRAMEBUFFER_OPERATION
        @private
     */
    INVALID_FRAMEBUFFER_OPERATION: 0x0506,
    /**
        @type {GLenum}
        @name PicoGL.UNPACK_FLIP_Y_WEBGL
        @private
     */
    UNPACK_FLIP_Y_WEBGL: 0x9240,
    /**
        @type {GLenum}
        @name PicoGL.UNPACK_PREMULTIPLY_ALPHA_WEBGL
        @private
     */
    UNPACK_PREMULTIPLY_ALPHA_WEBGL: 0x9241,
    /**
        @type {GLenum}
        @name PicoGL.CONTEXT_LOST_WEBGL
        @private
     */
    CONTEXT_LOST_WEBGL: 0x9242,
    /**
        @type {GLenum}
        @name PicoGL.UNPACK_COLORSPACE_CONVERSION_WEBGL
        @private
     */
    UNPACK_COLORSPACE_CONVERSION_WEBGL: 0x9243,
    /**
        @type {GLenum}
        @name PicoGL.BROWSER_DEFAULT_WEBGL
        @private
     */
    BROWSER_DEFAULT_WEBGL: 0x9244,
    /**
        @type {GLenum}
        @name PicoGL.READ_BUFFER
        @private
     */
    READ_BUFFER: 0x0C02,
    /**
        @type {GLenum}
        @name PicoGL.UNPACK_ROW_LENGTH
        @private
     */
    UNPACK_ROW_LENGTH: 0x0CF2,
    /**
        @type {GLenum}
        @name PicoGL.UNPACK_SKIP_ROWS
        @private
     */
    UNPACK_SKIP_ROWS: 0x0CF3,
    /**
        @type {GLenum}
        @name PicoGL.UNPACK_SKIP_PIXELS
        @private
     */
    UNPACK_SKIP_PIXELS: 0x0CF4,
    /**
        @type {GLenum}
        @name PicoGL.PACK_ROW_LENGTH
        @private
     */
    PACK_ROW_LENGTH: 0x0D02,
    /**
        @type {GLenum}
        @name PicoGL.PACK_SKIP_ROWS
        @private
     */
    PACK_SKIP_ROWS: 0x0D03,
    /**
        @type {GLenum}
        @name PicoGL.PACK_SKIP_PIXELS
        @private
     */
    PACK_SKIP_PIXELS: 0x0D04,
    /**
        @type {GLenum}
        @name PicoGL.COLOR
        @private
     */
    COLOR: 0x1800,
    /**
        @type {GLenum}
        @name PicoGL.DEPTH
        @private
     */
    DEPTH: 0x1801,
    /**
        @type {GLenum}
        @name PicoGL.STENCIL
        @private
     */
    STENCIL: 0x1802,
    /**
        @type {GLenum}
        @name PicoGL.RED
        @private
     */
    RED: 0x1903,
    /**
        @type {GLenum}
        @name PicoGL.RGB8
        @private
     */
    RGB8: 0x8051,
    /**
        @type {GLenum}
        @name PicoGL.RGBA8
        @private
     */
    RGBA8: 0x8058,
    /**
        @type {GLenum}
        @name PicoGL.RGB10_A2
        @private
     */
    RGB10_A2: 0x8059,
    /**
        @type {GLenum}
        @name PicoGL.TEXTURE_BINDING_3D
        @private
     */
    TEXTURE_BINDING_3D: 0x806A,
    /**
        @type {GLenum}
        @name PicoGL.UNPACK_SKIP_IMAGES
        @private
     */
    UNPACK_SKIP_IMAGES: 0x806D,
    /**
        @type {GLenum}
        @name PicoGL.UNPACK_IMAGE_HEIGHT
        @private
     */
    UNPACK_IMAGE_HEIGHT: 0x806E,
    /**
        @type {GLenum}
        @name PicoGL.TEXTURE_3D
        @private
     */
    TEXTURE_3D: 0x806F,
    /**
        @type {GLenum}
        @name PicoGL.TEXTURE_WRAP_R
        @private
     */
    TEXTURE_WRAP_R: 0x8072,
    /**
        @type {GLenum}
        @name PicoGL.MAX_3D_TEXTURE_SIZE
        @private
     */
    MAX_3D_TEXTURE_SIZE: 0x8073,
    /**
        @type {GLenum}
        @name PicoGL.UNSIGNED_INT_2_10_10_10_REV
        @private
     */
    UNSIGNED_INT_2_10_10_10_REV: 0x8368,
    /**
        @type {GLenum}
        @name PicoGL.MAX_ELEMENTS_VERTICES
        @private
     */
    MAX_ELEMENTS_VERTICES: 0x80E8,
    /**
        @type {GLenum}
        @name PicoGL.MAX_ELEMENTS_INDICES
        @private
     */
    MAX_ELEMENTS_INDICES: 0x80E9,
    /**
        @type {GLenum}
        @name PicoGL.TEXTURE_MIN_LOD
        @private
     */
    TEXTURE_MIN_LOD: 0x813A,
    /**
        @type {GLenum}
        @name PicoGL.TEXTURE_MAX_LOD
        @private
     */
    TEXTURE_MAX_LOD: 0x813B,
    /**
        @type {GLenum}
        @name PicoGL.TEXTURE_BASE_LEVEL
        @private
     */
    TEXTURE_BASE_LEVEL: 0x813C,
    /**
        @type {GLenum}
        @name PicoGL.TEXTURE_MAX_LEVEL
        @private
     */
    TEXTURE_MAX_LEVEL: 0x813D,
    /**
        @type {GLenum}
        @name PicoGL.MIN
        @private
     */
    MIN: 0x8007,
    /**
        @type {GLenum}
        @name PicoGL.MAX
        @private
     */
    MAX: 0x8008,
    /**
        @type {GLenum}
        @name PicoGL.DEPTH_COMPONENT24
        @private
     */
    DEPTH_COMPONENT24: 0x81A6,
    /**
        @type {GLenum}
        @name PicoGL.MAX_TEXTURE_LOD_BIAS
        @private
     */
    MAX_TEXTURE_LOD_BIAS: 0x84FD,
    /**
        @type {GLenum}
        @name PicoGL.TEXTURE_COMPARE_MODE
        @private
     */
    TEXTURE_COMPARE_MODE: 0x884C,
    /**
        @type {GLenum}
        @name PicoGL.TEXTURE_COMPARE_FUNC
        @private
     */
    TEXTURE_COMPARE_FUNC: 0x884D,
    /**
        @type {GLenum}
        @name PicoGL.CURRENT_QUERY
        @private
     */
    CURRENT_QUERY: 0x8865,
    /**
        @type {GLenum}
        @name PicoGL.QUERY_RESULT
        @private
     */
    QUERY_RESULT: 0x8866,
    /**
        @type {GLenum}
        @name PicoGL.QUERY_RESULT_AVAILABLE
        @private
     */
    QUERY_RESULT_AVAILABLE: 0x8867,
    /**
        @type {GLenum}
        @name PicoGL.STREAM_READ
        @private
     */
    STREAM_READ: 0x88E1,
    /**
        @type {GLenum}
        @name PicoGL.STREAM_COPY
        @private
     */
    STREAM_COPY: 0x88E2,
    /**
        @type {GLenum}
        @name PicoGL.STATIC_READ
        @private
     */
    STATIC_READ: 0x88E5,
    /**
        @type {GLenum}
        @name PicoGL.STATIC_COPY
        @private
     */
    STATIC_COPY: 0x88E6,
    /**
        @type {GLenum}
        @name PicoGL.DYNAMIC_READ
        @private
     */
    DYNAMIC_READ: 0x88E9,
    /**
        @type {GLenum}
        @name PicoGL.DYNAMIC_COPY
        @private
     */
    DYNAMIC_COPY: 0x88EA,
    /**
        @type {GLenum}
        @name PicoGL.MAX_DRAW_BUFFERS
        @private
     */
    MAX_DRAW_BUFFERS: 0x8824,
    /**
        @type {GLenum}
        @name PicoGL.DRAW_BUFFER0
        @private
     */
    DRAW_BUFFER0: 0x8825,
    /**
        @type {GLenum}
        @name PicoGL.DRAW_BUFFER1
        @private
     */
    DRAW_BUFFER1: 0x8826,
    /**
        @type {GLenum}
        @name PicoGL.DRAW_BUFFER2
        @private
     */
    DRAW_BUFFER2: 0x8827,
    /**
        @type {GLenum}
        @name PicoGL.DRAW_BUFFER3
        @private
     */
    DRAW_BUFFER3: 0x8828,
    /**
        @type {GLenum}
        @name PicoGL.DRAW_BUFFER4
        @private
     */
    DRAW_BUFFER4: 0x8829,
    /**
        @type {GLenum}
        @name PicoGL.DRAW_BUFFER5
        @private
     */
    DRAW_BUFFER5: 0x882A,
    /**
        @type {GLenum}
        @name PicoGL.DRAW_BUFFER6
        @private
     */
    DRAW_BUFFER6: 0x882B,
    /**
        @type {GLenum}
        @name PicoGL.DRAW_BUFFER7
        @private
     */
    DRAW_BUFFER7: 0x882C,
    /**
        @type {GLenum}
        @name PicoGL.DRAW_BUFFER8
        @private
     */
    DRAW_BUFFER8: 0x882D,
    /**
        @type {GLenum}
        @name PicoGL.DRAW_BUFFER9
        @private
     */
    DRAW_BUFFER9: 0x882E,
    /**
        @type {GLenum}
        @name PicoGL.DRAW_BUFFER10
        @private
     */
    DRAW_BUFFER10: 0x882F,
    /**
        @type {GLenum}
        @name PicoGL.DRAW_BUFFER11
        @private
     */
    DRAW_BUFFER11: 0x8830,
    /**
        @type {GLenum}
        @name PicoGL.DRAW_BUFFER12
        @private
     */
    DRAW_BUFFER12: 0x8831,
    /**
        @type {GLenum}
        @name PicoGL.DRAW_BUFFER13
        @private
     */
    DRAW_BUFFER13: 0x8832,
    /**
        @type {GLenum}
        @name PicoGL.DRAW_BUFFER14
        @private
     */
    DRAW_BUFFER14: 0x8833,
    /**
        @type {GLenum}
        @name PicoGL.DRAW_BUFFER15
        @private
     */
    DRAW_BUFFER15: 0x8834,
    /**
        @type {GLenum}
        @name PicoGL.MAX_FRAGMENT_UNIFORM_COMPONENTS
        @private
     */
    MAX_FRAGMENT_UNIFORM_COMPONENTS: 0x8B49,
    /**
        @type {GLenum}
        @name PicoGL.MAX_VERTEX_UNIFORM_COMPONENTS
        @private
     */
    MAX_VERTEX_UNIFORM_COMPONENTS: 0x8B4A,
    /**
        @type {GLenum}
        @name PicoGL.SAMPLER_3D
        @private
     */
    SAMPLER_3D: 0x8B5F,
    /**
        @type {GLenum}
        @name PicoGL.SAMPLER_2D_SHADOW
        @private
     */
    SAMPLER_2D_SHADOW: 0x8B62,
    /**
        @type {GLenum}
        @name PicoGL.FRAGMENT_SHADER_DERIVATIVE_HINT
        @private
     */
    FRAGMENT_SHADER_DERIVATIVE_HINT: 0x8B8B,
    /**
        @type {GLenum}
        @name PicoGL.PIXEL_PACK_BUFFER
        @private
     */
    PIXEL_PACK_BUFFER: 0x88EB,
    /**
        @type {GLenum}
        @name PicoGL.PIXEL_UNPACK_BUFFER
        @private
     */
    PIXEL_UNPACK_BUFFER: 0x88EC,
    /**
        @type {GLenum}
        @name PicoGL.PIXEL_PACK_BUFFER_BINDING
        @private
     */
    PIXEL_PACK_BUFFER_BINDING: 0x88ED,
    /**
        @type {GLenum}
        @name PicoGL.PIXEL_UNPACK_BUFFER_BINDING
        @private
     */
    PIXEL_UNPACK_BUFFER_BINDING: 0x88EF,
    /**
        @type {GLenum}
        @name PicoGL.FLOAT_MAT2x3
        @private
     */
    FLOAT_MAT2x3: 0x8B65,
    /**
        @type {GLenum}
        @name PicoGL.FLOAT_MAT2x4
        @private
     */
    FLOAT_MAT2x4: 0x8B66,
    /**
        @type {GLenum}
        @name PicoGL.FLOAT_MAT3x2
        @private
     */
    FLOAT_MAT3x2: 0x8B67,
    /**
        @type {GLenum}
        @name PicoGL.FLOAT_MAT3x4
        @private
     */
    FLOAT_MAT3x4: 0x8B68,
    /**
        @type {GLenum}
        @name PicoGL.FLOAT_MAT4x2
        @private
     */
    FLOAT_MAT4x2: 0x8B69,
    /**
        @type {GLenum}
        @name PicoGL.FLOAT_MAT4x3
        @private
     */
    FLOAT_MAT4x3: 0x8B6A,
    /**
        @type {GLenum}
        @name PicoGL.SRGB
        @private
     */
    SRGB: 0x8C40,
    /**
        @type {GLenum}
        @name PicoGL.SRGB8
        @private
     */
    SRGB8: 0x8C41,
    /**
        @type {GLenum}
        @name PicoGL.SRGB8_ALPHA8
        @private
     */
    SRGB8_ALPHA8: 0x8C43,
    /**
        @type {GLenum}
        @name PicoGL.COMPARE_REF_TO_TEXTURE
        @private
     */
    COMPARE_REF_TO_TEXTURE: 0x884E,
    /**
        @type {GLenum}
        @name PicoGL.RGBA32F
        @private
     */
    RGBA32F: 0x8814,
    /**
        @type {GLenum}
        @name PicoGL.RGB32F
        @private
     */
    RGB32F: 0x8815,
    /**
        @type {GLenum}
        @name PicoGL.RGBA16F
        @private
     */
    RGBA16F: 0x881A,
    /**
        @type {GLenum}
        @name PicoGL.RGB16F
        @private
     */
    RGB16F: 0x881B,
    /**
        @type {GLenum}
        @name PicoGL.VERTEX_ATTRIB_ARRAY_INTEGER
        @private
     */
    VERTEX_ATTRIB_ARRAY_INTEGER: 0x88FD,
    /**
        @type {GLenum}
        @name PicoGL.MAX_ARRAY_TEXTURE_LAYERS
        @private
     */
    MAX_ARRAY_TEXTURE_LAYERS: 0x88FF,
    /**
        @type {GLenum}
        @name PicoGL.MIN_PROGRAM_TEXEL_OFFSET
        @private
     */
    MIN_PROGRAM_TEXEL_OFFSET: 0x8904,
    /**
        @type {GLenum}
        @name PicoGL.MAX_PROGRAM_TEXEL_OFFSET
        @private
     */
    MAX_PROGRAM_TEXEL_OFFSET: 0x8905,
    /**
        @type {GLenum}
        @name PicoGL.MAX_VARYING_COMPONENTS
        @private
     */
    MAX_VARYING_COMPONENTS: 0x8B4B,
    /**
        @type {GLenum}
        @name PicoGL.TEXTURE_2D_ARRAY
        @private
     */
    TEXTURE_2D_ARRAY: 0x8C1A,
    /**
        @type {GLenum}
        @name PicoGL.TEXTURE_BINDING_2D_ARRAY
        @private
     */
    TEXTURE_BINDING_2D_ARRAY: 0x8C1D,
    /**
        @type {GLenum}
        @name PicoGL.R11F_G11F_B10F
        @private
     */
    R11F_G11F_B10F: 0x8C3A,
    /**
        @type {GLenum}
        @name PicoGL.UNSIGNED_INT_10F_11F_11F_REV
        @private
     */
    UNSIGNED_INT_10F_11F_11F_REV: 0x8C3B,
    /**
        @type {GLenum}
        @name PicoGL.RGB9_E5
        @private
     */
    RGB9_E5: 0x8C3D,
    /**
        @type {GLenum}
        @name PicoGL.UNSIGNED_INT_5_9_9_9_REV
        @private
     */
    UNSIGNED_INT_5_9_9_9_REV: 0x8C3E,
    /**
        @type {GLenum}
        @name PicoGL.TRANSFORM_FEEDBACK_BUFFER_MODE
        @private
     */
    TRANSFORM_FEEDBACK_BUFFER_MODE: 0x8C7F,
    /**
        @type {GLenum}
        @name PicoGL.MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS
        @private
     */
    MAX_TRANSFORM_FEEDBACK_SEPARATE_COMPONENTS: 0x8C80,
    /**
        @type {GLenum}
        @name PicoGL.TRANSFORM_FEEDBACK_VARYINGS
        @private
     */
    TRANSFORM_FEEDBACK_VARYINGS: 0x8C83,
    /**
        @type {GLenum}
        @name PicoGL.TRANSFORM_FEEDBACK_BUFFER_START
        @private
     */
    TRANSFORM_FEEDBACK_BUFFER_START: 0x8C84,
    /**
        @type {GLenum}
        @name PicoGL.TRANSFORM_FEEDBACK_BUFFER_SIZE
        @private
     */
    TRANSFORM_FEEDBACK_BUFFER_SIZE: 0x8C85,
    /**
        @type {GLenum}
        @name PicoGL.TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN
        @private
     */
    TRANSFORM_FEEDBACK_PRIMITIVES_WRITTEN: 0x8C88,
    /**
        @type {GLenum}
        @name PicoGL.RASTERIZER_DISCARD
        @private
     */
    RASTERIZER_DISCARD: 0x8C89,
    /**
        @type {GLenum}
        @name PicoGL.MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS
        @private
     */
    MAX_TRANSFORM_FEEDBACK_INTERLEAVED_COMPONENTS: 0x8C8A,
    /**
        @type {GLenum}
        @name PicoGL.MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS
        @private
     */
    MAX_TRANSFORM_FEEDBACK_SEPARATE_ATTRIBS: 0x8C8B,
    /**
        @type {GLenum}
        @name PicoGL.INTERLEAVED_ATTRIBS
        @private
     */
    INTERLEAVED_ATTRIBS: 0x8C8C,
    /**
        @type {GLenum}
        @name PicoGL.SEPARATE_ATTRIBS
        @private
     */
    SEPARATE_ATTRIBS: 0x8C8D,
    /**
        @type {GLenum}
        @name PicoGL.TRANSFORM_FEEDBACK_BUFFER
        @private
     */
    TRANSFORM_FEEDBACK_BUFFER: 0x8C8E,
    /**
        @type {GLenum}
        @name PicoGL.TRANSFORM_FEEDBACK_BUFFER_BINDING
        @private
     */
    TRANSFORM_FEEDBACK_BUFFER_BINDING: 0x8C8F,
    /**
        @type {GLenum}
        @name PicoGL.RGBA32UI
        @private
     */
    RGBA32UI: 0x8D70,
    /**
        @type {GLenum}
        @name PicoGL.RGB32UI
        @private
     */
    RGB32UI: 0x8D71,
    /**
        @type {GLenum}
        @name PicoGL.RGBA16UI
        @private
     */
    RGBA16UI: 0x8D76,
    /**
        @type {GLenum}
        @name PicoGL.RGB16UI
        @private
     */
    RGB16UI: 0x8D77,
    /**
        @type {GLenum}
        @name PicoGL.RGBA8UI
        @private
     */
    RGBA8UI: 0x8D7C,
    /**
        @type {GLenum}
        @name PicoGL.RGB8UI
        @private
     */
    RGB8UI: 0x8D7D,
    /**
        @type {GLenum}
        @name PicoGL.RGBA32I
        @private
     */
    RGBA32I: 0x8D82,
    /**
        @type {GLenum}
        @name PicoGL.RGB32I
        @private
     */
    RGB32I: 0x8D83,
    /**
        @type {GLenum}
        @name PicoGL.RGBA16I
        @private
     */
    RGBA16I: 0x8D88,
    /**
        @type {GLenum}
        @name PicoGL.RGB16I
        @private
     */
    RGB16I: 0x8D89,
    /**
        @type {GLenum}
        @name PicoGL.RGBA8I
        @private
     */
    RGBA8I: 0x8D8E,
    /**
        @type {GLenum}
        @name PicoGL.RGB8I
        @private
     */
    RGB8I: 0x8D8F,
    /**
        @type {GLenum}
        @name PicoGL.RED_INTEGER
        @private
     */
    RED_INTEGER: 0x8D94,
    /**
        @type {GLenum}
        @name PicoGL.RGB_INTEGER
        @private
     */
    RGB_INTEGER: 0x8D98,
    /**
        @type {GLenum}
        @name PicoGL.RGBA_INTEGER
        @private
     */
    RGBA_INTEGER: 0x8D99,
    /**
        @type {GLenum}
        @name PicoGL.SAMPLER_2D_ARRAY
        @private
     */
    SAMPLER_2D_ARRAY: 0x8DC1,
    /**
        @type {GLenum}
        @name PicoGL.SAMPLER_2D_ARRAY_SHADOW
        @private
     */
    SAMPLER_2D_ARRAY_SHADOW: 0x8DC4,
    /**
        @type {GLenum}
        @name PicoGL.SAMPLER_CUBE_SHADOW
        @private
     */
    SAMPLER_CUBE_SHADOW: 0x8DC5,
    /**
        @type {GLenum}
        @name PicoGL.UNSIGNED_INT_VEC2
        @private
     */
    UNSIGNED_INT_VEC2: 0x8DC6,
    /**
        @type {GLenum}
        @name PicoGL.UNSIGNED_INT_VEC3
        @private
     */
    UNSIGNED_INT_VEC3: 0x8DC7,
    /**
        @type {GLenum}
        @name PicoGL.UNSIGNED_INT_VEC4
        @private
     */
    UNSIGNED_INT_VEC4: 0x8DC8,
    /**
        @type {GLenum}
        @name PicoGL.INT_SAMPLER_2D
        @private
     */
    INT_SAMPLER_2D: 0x8DCA,
    /**
        @type {GLenum}
        @name PicoGL.INT_SAMPLER_3D
        @private
     */
    INT_SAMPLER_3D: 0x8DCB,
    /**
        @type {GLenum}
        @name PicoGL.INT_SAMPLER_CUBE
        @private
     */
    INT_SAMPLER_CUBE: 0x8DCC,
    /**
        @type {GLenum}
        @name PicoGL.INT_SAMPLER_2D_ARRAY
        @private
     */
    INT_SAMPLER_2D_ARRAY: 0x8DCF,
    /**
        @type {GLenum}
        @name PicoGL.UNSIGNED_INT_SAMPLER_2D
        @private
     */
    UNSIGNED_INT_SAMPLER_2D: 0x8DD2,
    /**
        @type {GLenum}
        @name PicoGL.UNSIGNED_INT_SAMPLER_3D
        @private
     */
    UNSIGNED_INT_SAMPLER_3D: 0x8DD3,
    /**
        @type {GLenum}
        @name PicoGL.UNSIGNED_INT_SAMPLER_CUBE
        @private
     */
    UNSIGNED_INT_SAMPLER_CUBE: 0x8DD4,
    /**
        @type {GLenum}
        @name PicoGL.UNSIGNED_INT_SAMPLER_2D_ARRAY
        @private
     */
    UNSIGNED_INT_SAMPLER_2D_ARRAY: 0x8DD7,
    /**
        @type {GLenum}
        @name PicoGL.DEPTH_COMPONENT32F
        @private
     */
    DEPTH_COMPONENT32F: 0x8CAC,
    /**
        @type {GLenum}
        @name PicoGL.DEPTH32F_STENCIL8
        @private
     */
    DEPTH32F_STENCIL8: 0x8CAD,
    /**
        @type {GLenum}
        @name PicoGL.FLOAT_32_UNSIGNED_INT_24_8_REV
        @private
     */
    FLOAT_32_UNSIGNED_INT_24_8_REV: 0x8DAD,
    /**
        @type {GLenum}
        @name PicoGL.FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING
        @private
     */
    FRAMEBUFFER_ATTACHMENT_COLOR_ENCODING: 0x8210,
    /**
        @type {GLenum}
        @name PicoGL.FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE
        @private
     */
    FRAMEBUFFER_ATTACHMENT_COMPONENT_TYPE: 0x8211,
    /**
        @type {GLenum}
        @name PicoGL.FRAMEBUFFER_ATTACHMENT_RED_SIZE
        @private
     */
    FRAMEBUFFER_ATTACHMENT_RED_SIZE: 0x8212,
    /**
        @type {GLenum}
        @name PicoGL.FRAMEBUFFER_ATTACHMENT_GREEN_SIZE
        @private
     */
    FRAMEBUFFER_ATTACHMENT_GREEN_SIZE: 0x8213,
    /**
        @type {GLenum}
        @name PicoGL.FRAMEBUFFER_ATTACHMENT_BLUE_SIZE
        @private
     */
    FRAMEBUFFER_ATTACHMENT_BLUE_SIZE: 0x8214,
    /**
        @type {GLenum}
        @name PicoGL.FRAMEBUFFER_ATTACHMENT_ALPHA_SIZE
        @private
     */
    FRAMEBUFFER_ATTACHMENT_ALPHA_SIZE: 0x8215,
    /**
        @type {GLenum}
        @name PicoGL.FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE
        @private
     */
    FRAMEBUFFER_ATTACHMENT_DEPTH_SIZE: 0x8216,
    /**
        @type {GLenum}
        @name PicoGL.FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE
        @private
     */
    FRAMEBUFFER_ATTACHMENT_STENCIL_SIZE: 0x8217,
    /**
        @type {GLenum}
        @name PicoGL.FRAMEBUFFER_DEFAULT
        @private
     */
    FRAMEBUFFER_DEFAULT: 0x8218,
    /**
        @type {GLenum}
        @name PicoGL.UNSIGNED_INT_24_8
        @private
     */
    UNSIGNED_INT_24_8: 0x84FA,
    /**
        @type {GLenum}
        @name PicoGL.DEPTH24_STENCIL8
        @private
     */
    DEPTH24_STENCIL8: 0x88F0,
    /**
        @type {GLenum}
        @name PicoGL.UNSIGNED_NORMALIZED
        @private
     */
    UNSIGNED_NORMALIZED: 0x8C17,
    /**
        @type {GLenum}
        @name PicoGL.DRAW_FRAMEBUFFER_BINDING
        @private
     */
    DRAW_FRAMEBUFFER_BINDING: 0x8CA6,
    /**
        @type {GLenum}
        @name PicoGL.READ_FRAMEBUFFER
        @private
     */
    READ_FRAMEBUFFER: 0x8CA8,
    /**
        @type {GLenum}
        @name PicoGL.DRAW_FRAMEBUFFER
        @private
     */
    DRAW_FRAMEBUFFER: 0x8CA9,
    /**
        @type {GLenum}
        @name PicoGL.READ_FRAMEBUFFER_BINDING
        @private
     */
    READ_FRAMEBUFFER_BINDING: 0x8CAA,
    /**
        @type {GLenum}
        @name PicoGL.RENDERBUFFER_SAMPLES
        @private
     */
    RENDERBUFFER_SAMPLES: 0x8CAB,
    /**
        @type {GLenum}
        @name PicoGL.FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER
        @private
     */
    FRAMEBUFFER_ATTACHMENT_TEXTURE_LAYER: 0x8CD4,
    /**
        @type {GLenum}
        @name PicoGL.MAX_COLOR_ATTACHMENTS
        @private
     */
    MAX_COLOR_ATTACHMENTS: 0x8CDF,
    /**
        @type {GLenum}
        @name PicoGL.COLOR_ATTACHMENT1
        @private
     */
    COLOR_ATTACHMENT1: 0x8CE1,
    /**
        @type {GLenum}
        @name PicoGL.COLOR_ATTACHMENT2
        @private
     */
    COLOR_ATTACHMENT2: 0x8CE2,
    /**
        @type {GLenum}
        @name PicoGL.COLOR_ATTACHMENT3
        @private
     */
    COLOR_ATTACHMENT3: 0x8CE3,
    /**
        @type {GLenum}
        @name PicoGL.COLOR_ATTACHMENT4
        @private
     */
    COLOR_ATTACHMENT4: 0x8CE4,
    /**
        @type {GLenum}
        @name PicoGL.COLOR_ATTACHMENT5
        @private
     */
    COLOR_ATTACHMENT5: 0x8CE5,
    /**
        @type {GLenum}
        @name PicoGL.COLOR_ATTACHMENT6
        @private
     */
    COLOR_ATTACHMENT6: 0x8CE6,
    /**
        @type {GLenum}
        @name PicoGL.COLOR_ATTACHMENT7
        @private
     */
    COLOR_ATTACHMENT7: 0x8CE7,
    /**
        @type {GLenum}
        @name PicoGL.COLOR_ATTACHMENT8
        @private
     */
    COLOR_ATTACHMENT8: 0x8CE8,
    /**
        @type {GLenum}
        @name PicoGL.COLOR_ATTACHMENT9
        @private
     */
    COLOR_ATTACHMENT9: 0x8CE9,
    /**
        @type {GLenum}
        @name PicoGL.COLOR_ATTACHMENT10
        @private
     */
    COLOR_ATTACHMENT10: 0x8CEA,
    /**
        @type {GLenum}
        @name PicoGL.COLOR_ATTACHMENT11
        @private
     */
    COLOR_ATTACHMENT11: 0x8CEB,
    /**
        @type {GLenum}
        @name PicoGL.COLOR_ATTACHMENT12
        @private
     */
    COLOR_ATTACHMENT12: 0x8CEC,
    /**
        @type {GLenum}
        @name PicoGL.COLOR_ATTACHMENT13
        @private
     */
    COLOR_ATTACHMENT13: 0x8CED,
    /**
        @type {GLenum}
        @name PicoGL.COLOR_ATTACHMENT14
        @private
     */
    COLOR_ATTACHMENT14: 0x8CEE,
    /**
        @type {GLenum}
        @name PicoGL.COLOR_ATTACHMENT15
        @private
     */
    COLOR_ATTACHMENT15: 0x8CEF,
    /**
        @type {GLenum}
        @name PicoGL.FRAMEBUFFER_INCOMPLETE_MULTISAMPLE
        @private
     */
    FRAMEBUFFER_INCOMPLETE_MULTISAMPLE: 0x8D56,
    /**
        @type {GLenum}
        @name PicoGL.MAX_SAMPLES
        @private
     */
    MAX_SAMPLES: 0x8D57,
    /**
        @type {GLenum}
        @name PicoGL.HALF_FLOAT
        @private
     */
    HALF_FLOAT: 0x140B,
    /**
        @type {GLenum}
        @name PicoGL.RG
        @private
     */
    RG: 0x8227,
    /**
        @type {GLenum}
        @name PicoGL.RG_INTEGER
        @private
     */
    RG_INTEGER: 0x8228,
    /**
        @type {GLenum}
        @name PicoGL.R8
        @private
     */
    R8: 0x8229,
    /**
        @type {GLenum}
        @name PicoGL.RG8
        @private
     */
    RG8: 0x822B,
    /**
        @type {GLenum}
        @name PicoGL.R16F
        @private
     */
    R16F: 0x822D,
    /**
        @type {GLenum}
        @name PicoGL.R32F
        @private
     */
    R32F: 0x822E,
    /**
        @type {GLenum}
        @name PicoGL.RG16F
        @private
     */
    RG16F: 0x822F,
    /**
        @type {GLenum}
        @name PicoGL.RG32F
        @private
     */
    RG32F: 0x8230,
    /**
        @type {GLenum}
        @name PicoGL.R8I
        @private
     */
    R8I: 0x8231,
    /**
        @type {GLenum}
        @name PicoGL.R8UI
        @private
     */
    R8UI: 0x8232,
    /**
        @type {GLenum}
        @name PicoGL.R16I
        @private
     */
    R16I: 0x8233,
    /**
        @type {GLenum}
        @name PicoGL.R16UI
        @private
     */
    R16UI: 0x8234,
    /**
        @type {GLenum}
        @name PicoGL.R32I
        @private
     */
    R32I: 0x8235,
    /**
        @type {GLenum}
        @name PicoGL.R32UI
        @private
     */
    R32UI: 0x8236,
    /**
        @type {GLenum}
        @name PicoGL.RG8I
        @private
     */
    RG8I: 0x8237,
    /**
        @type {GLenum}
        @name PicoGL.RG8UI
        @private
     */
    RG8UI: 0x8238,
    /**
        @type {GLenum}
        @name PicoGL.RG16I
        @private
     */
    RG16I: 0x8239,
    /**
        @type {GLenum}
        @name PicoGL.RG16UI
        @private
     */
    RG16UI: 0x823A,
    /**
        @type {GLenum}
        @name PicoGL.RG32I
        @private
     */
    RG32I: 0x823B,
    /**
        @type {GLenum}
        @name PicoGL.RG32UI
        @private
     */
    RG32UI: 0x823C,
    /**
        @type {GLenum}
        @name PicoGL.VERTEX_ARRAY_BINDING
        @private
     */
    VERTEX_ARRAY_BINDING: 0x85B5,
    /**
        @type {GLenum}
        @name PicoGL.R8_SNORM
        @private
     */
    R8_SNORM: 0x8F94,
    /**
        @type {GLenum}
        @name PicoGL.RG8_SNORM
        @private
     */
    RG8_SNORM: 0x8F95,
    /**
        @type {GLenum}
        @name PicoGL.RGB8_SNORM
        @private
     */
    RGB8_SNORM: 0x8F96,
    /**
        @type {GLenum}
        @name PicoGL.RGBA8_SNORM
        @private
     */
    RGBA8_SNORM: 0x8F97,
    /**
        @type {GLenum}
        @name PicoGL.SIGNED_NORMALIZED
        @private
     */
    SIGNED_NORMALIZED: 0x8F9C,
    /**
        @type {GLenum}
        @name PicoGL.COPY_READ_BUFFER
        @private
     */
    COPY_READ_BUFFER: 0x8F36,
    /**
        @type {GLenum}
        @name PicoGL.COPY_WRITE_BUFFER
        @private
     */
    COPY_WRITE_BUFFER: 0x8F37,
    /**
        @type {GLenum}
        @name PicoGL.COPY_READ_BUFFER_BINDING
        @private
     */
    COPY_READ_BUFFER_BINDING: 0x8F36,
    /**
        @type {GLenum}
        @name PicoGL.COPY_WRITE_BUFFER_BINDING
        @private
     */
    COPY_WRITE_BUFFER_BINDING: 0x8F37,
    /**
        @type {GLenum}
        @name PicoGL.UNIFORM_BUFFER
        @private
     */
    UNIFORM_BUFFER: 0x8A11,
    /**
        @type {GLenum}
        @name PicoGL.UNIFORM_BUFFER_BINDING
        @private
     */
    UNIFORM_BUFFER_BINDING: 0x8A28,
    /**
        @type {GLenum}
        @name PicoGL.UNIFORM_BUFFER_START
        @private
     */
    UNIFORM_BUFFER_START: 0x8A29,
    /**
        @type {GLenum}
        @name PicoGL.UNIFORM_BUFFER_SIZE
        @private
     */
    UNIFORM_BUFFER_SIZE: 0x8A2A,
    /**
        @type {GLenum}
        @name PicoGL.MAX_VERTEX_UNIFORM_BLOCKS
        @private
     */
    MAX_VERTEX_UNIFORM_BLOCKS: 0x8A2B,
    /**
        @type {GLenum}
        @name PicoGL.MAX_FRAGMENT_UNIFORM_BLOCKS
        @private
     */
    MAX_FRAGMENT_UNIFORM_BLOCKS: 0x8A2D,
    /**
        @type {GLenum}
        @name PicoGL.MAX_COMBINED_UNIFORM_BLOCKS
        @private
     */
    MAX_COMBINED_UNIFORM_BLOCKS: 0x8A2E,
    /**
        @type {GLenum}
        @name PicoGL.MAX_UNIFORM_BUFFER_BINDINGS
        @private
     */
    MAX_UNIFORM_BUFFER_BINDINGS: 0x8A2F,
    /**
        @type {GLenum}
        @name PicoGL.MAX_UNIFORM_BLOCK_SIZE
        @private
     */
    MAX_UNIFORM_BLOCK_SIZE: 0x8A30,
    /**
        @type {GLenum}
        @name PicoGL.MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS
        @private
     */
    MAX_COMBINED_VERTEX_UNIFORM_COMPONENTS: 0x8A31,
    /**
        @type {GLenum}
        @name PicoGL.MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS
        @private
     */
    MAX_COMBINED_FRAGMENT_UNIFORM_COMPONENTS: 0x8A33,
    /**
        @type {GLenum}
        @name PicoGL.UNIFORM_BUFFER_OFFSET_ALIGNMENT
        @private
     */
    UNIFORM_BUFFER_OFFSET_ALIGNMENT: 0x8A34,
    /**
        @type {GLenum}
        @name PicoGL.ACTIVE_UNIFORM_BLOCKS
        @private
     */
    ACTIVE_UNIFORM_BLOCKS: 0x8A36,
    /**
        @type {GLenum}
        @name PicoGL.UNIFORM_TYPE
        @private
     */
    UNIFORM_TYPE: 0x8A37,
    /**
        @type {GLenum}
        @name PicoGL.UNIFORM_SIZE
        @private
     */
    UNIFORM_SIZE: 0x8A38,
    /**
        @type {GLenum}
        @name PicoGL.UNIFORM_BLOCK_INDEX
        @private
     */
    UNIFORM_BLOCK_INDEX: 0x8A3A,
    /**
        @type {GLenum}
        @name PicoGL.UNIFORM_OFFSET
        @private
     */
    UNIFORM_OFFSET: 0x8A3B,
    /**
        @type {GLenum}
        @name PicoGL.UNIFORM_ARRAY_STRIDE
        @private
     */
    UNIFORM_ARRAY_STRIDE: 0x8A3C,
    /**
        @type {GLenum}
        @name PicoGL.UNIFORM_MATRIX_STRIDE
        @private
     */
    UNIFORM_MATRIX_STRIDE: 0x8A3D,
    /**
        @type {GLenum}
        @name PicoGL.UNIFORM_IS_ROW_MAJOR
        @private
     */
    UNIFORM_IS_ROW_MAJOR: 0x8A3E,
    /**
        @type {GLenum}
        @name PicoGL.UNIFORM_BLOCK_BINDING
        @private
     */
    UNIFORM_BLOCK_BINDING: 0x8A3F,
    /**
        @type {GLenum}
        @name PicoGL.UNIFORM_BLOCK_DATA_SIZE
        @private
     */
    UNIFORM_BLOCK_DATA_SIZE: 0x8A40,
    /**
        @type {GLenum}
        @name PicoGL.UNIFORM_BLOCK_ACTIVE_UNIFORMS
        @private
     */
    UNIFORM_BLOCK_ACTIVE_UNIFORMS: 0x8A42,
    /**
        @type {GLenum}
        @name PicoGL.UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES
        @private
     */
    UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES: 0x8A43,
    /**
        @type {GLenum}
        @name PicoGL.UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER
        @private
     */
    UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER: 0x8A44,
    /**
        @type {GLenum}
        @name PicoGL.UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER
        @private
     */
    UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER: 0x8A46,
    /**
        @type {GLenum}
        @name PicoGL.INVALID_INDEX
        @private
     */
    INVALID_INDEX: 0xFFFFFFFF,
    /**
        @type {GLenum}
        @name PicoGL.MAX_VERTEX_OUTPUT_COMPONENTS
        @private
     */
    MAX_VERTEX_OUTPUT_COMPONENTS: 0x9122,
    /**
        @type {GLenum}
        @name PicoGL.MAX_FRAGMENT_INPUT_COMPONENTS
        @private
     */
    MAX_FRAGMENT_INPUT_COMPONENTS: 0x9125,
    /**
        @type {GLenum}
        @name PicoGL.MAX_SERVER_WAIT_TIMEOUT
        @private
     */
    MAX_SERVER_WAIT_TIMEOUT: 0x9111,
    /**
        @type {GLenum}
        @name PicoGL.OBJECT_TYPE
        @private
     */
    OBJECT_TYPE: 0x9112,
    /**
        @type {GLenum}
        @name PicoGL.SYNC_CONDITION
        @private
     */
    SYNC_CONDITION: 0x9113,
    /**
        @type {GLenum}
        @name PicoGL.SYNC_STATUS
        @private
     */
    SYNC_STATUS: 0x9114,
    /**
        @type {GLenum}
        @name PicoGL.SYNC_FLAGS
        @private
     */
    SYNC_FLAGS: 0x9115,
    /**
        @type {GLenum}
        @name PicoGL.SYNC_FENCE
        @private
     */
    SYNC_FENCE: 0x9116,
    /**
        @type {GLenum}
        @name PicoGL.SYNC_GPU_COMMANDS_COMPLETE
        @private
     */
    SYNC_GPU_COMMANDS_COMPLETE: 0x9117,
    /**
        @type {GLenum}
        @name PicoGL.UNSIGNALED
        @private
     */
    UNSIGNALED: 0x9118,
    /**
        @type {GLenum}
        @name PicoGL.SIGNALED
        @private
     */
    SIGNALED: 0x9119,
    /**
        @type {GLenum}
        @name PicoGL.ALREADY_SIGNALED
        @private
     */
    ALREADY_SIGNALED: 0x911A,
    /**
        @type {GLenum}
        @name PicoGL.TIMEOUT_EXPIRED
        @private
     */
    TIMEOUT_EXPIRED: 0x911B,
    /**
        @type {GLenum}
        @name PicoGL.CONDITION_SATISFIED
        @private
     */
    CONDITION_SATISFIED: 0x911C,
    /**
        @type {GLenum}
        @name PicoGL.WAIT_FAILED
        @private
     */
    WAIT_FAILED: 0x911D,
    /**
        @type {GLenum}
        @name PicoGL.SYNC_FLUSH_COMMANDS_BIT
        @private
     */
    SYNC_FLUSH_COMMANDS_BIT: 0x00000001,
    /**
        @type {GLenum}
        @name PicoGL.VERTEX_ATTRIB_ARRAY_DIVISOR
        @private
     */
    VERTEX_ATTRIB_ARRAY_DIVISOR: 0x88FE,
    /**
        @type {GLenum}
        @name PicoGL.ANY_SAMPLES_PASSED
        @private
     */
    ANY_SAMPLES_PASSED: 0x8C2F,
    /**
        @type {GLenum}
        @name PicoGL.ANY_SAMPLES_PASSED_CONSERVATIVE
        @private
     */
    ANY_SAMPLES_PASSED_CONSERVATIVE: 0x8D6A,
    /**
        @type {GLenum}
        @name PicoGL.SAMPLER_BINDING
        @private
     */
    SAMPLER_BINDING: 0x8919,
    /**
        @type {GLenum}
        @name PicoGL.RGB10_A2UI
        @private
     */
    RGB10_A2UI: 0x906F,
    /**
        @type {GLenum}
        @name PicoGL.INT_2_10_10_10_REV
        @private
     */
    INT_2_10_10_10_REV: 0x8D9F,
    /**
        @type {GLenum}
        @name PicoGL.TRANSFORM_FEEDBACK
        @private
     */
    TRANSFORM_FEEDBACK: 0x8E22,
    /**
        @type {GLenum}
        @name PicoGL.TRANSFORM_FEEDBACK_PAUSED
        @private
     */
    TRANSFORM_FEEDBACK_PAUSED: 0x8E23,
    /**
        @type {GLenum}
        @name PicoGL.TRANSFORM_FEEDBACK_ACTIVE
        @private
     */
    TRANSFORM_FEEDBACK_ACTIVE: 0x8E24,
    /**
        @type {GLenum}
        @name PicoGL.TRANSFORM_FEEDBACK_BINDING
        @private
     */
    TRANSFORM_FEEDBACK_BINDING: 0x8E25,
    /**
        @type {GLenum}
        @name PicoGL.TEXTURE_IMMUTABLE_FORMAT
        @private
     */
    TEXTURE_IMMUTABLE_FORMAT: 0x912F,
    /**
        @type {GLenum}
        @name PicoGL.MAX_ELEMENT_INDEX
        @private
     */
    MAX_ELEMENT_INDEX: 0x8D6B,
    /**
        @type {GLenum}
        @name PicoGL.TEXTURE_IMMUTABLE_LEVELS
        @private
     */
    TEXTURE_IMMUTABLE_LEVELS: 0x82DF,
    /**
        @type {GLenum}
        @name PicoGL.TIMEOUT_IGNORED
        @private
     */
    TIMEOUT_IGNORED: -1,
    /**
        @type {GLenum}
        @name PicoGL.MAX_CLIENT_WAIT_TIMEOUT_WEBGL
        @private
     */
    MAX_CLIENT_WAIT_TIMEOUT_WEBGL: 0x9247,

    // https://www.khronos.org/registry/webgl/extensions/EXT_disjoint_timer_query_webgl2/
    /**
        @type {GLenum}
        @name PicoGL.QUERY_COUNTER_BITS_EXT
        @private
     */
    QUERY_COUNTER_BITS_EXT: 0x8864,
    /**
        @type {GLenum}
        @name PicoGL.TIME_ELAPSED_EXT
        @private
     */
    TIME_ELAPSED_EXT: 0x88BF,
    /**
        @type {GLenum}
        @name PicoGL.TIMESTAMP_EXT
        @private
     */
    TIMESTAMP_EXT: 0x8E28,
    /**
        @type {GLenum}
        @name PicoGL.GPU_DISJOINT_EXT
        @private
     */
    GPU_DISJOINT_EXT: 0x8FBB,

    // https://www.khronos.org/registry/webgl/extensions/EXT_texture_filter_anisotropic/
    /**
        @type {GLenum}
        @name PicoGL.TEXTURE_MAX_ANISOTROPY_EXT
        @private
     */
    TEXTURE_MAX_ANISOTROPY_EXT: 0x84FE,
    /**
        @type {GLenum}
        @name PicoGL.MAX_TEXTURE_MAX_ANISOTROPY_EXT
        @private
     */
    MAX_TEXTURE_MAX_ANISOTROPY_EXT: 0x84FF,

    // https://www.khronos.org/registry/webgl/extensions/WEBGL_debug_renderer_info/
    /**
        @type {GLenum}
        @name PicoGL.UNMASKED_VENDOR_WEBGL
        @private
     */
    UNMASKED_VENDOR_WEBGL: 0x9245,
    /**
        @type {GLenum}
        @name PicoGL.UNMASKED_RENDERER_WEBGL
        @private
     */
    UNMASKED_RENDERER_WEBGL: 0x9246,

    // https://www.khronos.org/registry/webgl/extensions/KHR_parallel_shader_compile/
    /**
        @type {GLenum}
        @name PicoGL.COMPLETION_STATUS_KHR
        @private
     */
    COMPLETION_STATUS_KHR: 0x91B1,

    // https://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_s3tc/
    /**
        @type {GLenum}
        @name PicoGL.COMPRESSED_RGB_S3TC_DXT1_EXT
        @private
     */
    COMPRESSED_RGB_S3TC_DXT1_EXT: 0x83F0,
    /**
        @type {GLenum}
        @name PicoGL.COMPRESSED_RGBA_S3TC_DXT1_EXT
        @private
     */
    COMPRESSED_RGBA_S3TC_DXT1_EXT: 0x83F1,
    /**
        @type {GLenum}
        @name PicoGL.COMPRESSED_RGBA_S3TC_DXT3_EXT
        @private
     */
    COMPRESSED_RGBA_S3TC_DXT3_EXT: 0x83F2,
    /**
        @type {GLenum}
        @name PicoGL.COMPRESSED_RGBA_S3TC_DXT5_EXT
        @private
     */
    COMPRESSED_RGBA_S3TC_DXT5_EXT: 0x83F3,

    // https://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_s3tc_srgb/
    /**
        @type {GLenum}
        @name PicoGL.COMPRESSED_SRGB_S3TC_DXT1_EXT
        @private
     */
    COMPRESSED_SRGB_S3TC_DXT1_EXT: 0x8C4C,
    /**
        @type {GLenum}
        @name PicoGL.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT
        @private
     */
    COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT: 0x8C4D,
    /**
        @type {GLenum}
        @name PicoGL.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT
        @private
     */
    COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT: 0x8C4E,
    /**
        @type {GLenum}
        @name PicoGL.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT
        @private
     */
    COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT: 0x8C4F,

    // https://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_etc/
    /**
        @type {GLenum}
        @name PicoGL.COMPRESSED_R11_EAC
        @private
     */
    COMPRESSED_R11_EAC: 0x9270,
    /**
        @type {GLenum}
        @name PicoGL.COMPRESSED_SIGNED_R11_EAC
        @private
     */
    COMPRESSED_SIGNED_R11_EAC: 0x9271,
    /**
        @type {GLenum}
        @name PicoGL.COMPRESSED_RG11_EAC
        @private
     */
    COMPRESSED_RG11_EAC: 0x9272,
    /**
        @type {GLenum}
        @name PicoGL.COMPRESSED_SIGNED_RG11_EAC
        @private
     */
    COMPRESSED_SIGNED_RG11_EAC: 0x9273,
    /**
        @type {GLenum}
        @name PicoGL.COMPRESSED_RGB8_ETC2
        @private
     */
    COMPRESSED_RGB8_ETC2: 0x9274,
    /**
        @type {GLenum}
        @name PicoGL.COMPRESSED_SRGB8_ETC2
        @private
     */
    COMPRESSED_SRGB8_ETC2: 0x9275,
    /**
        @type {GLenum}
        @name PicoGL.COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2
        @private
     */
    COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2: 0x9276,
    /**
        @type {GLenum}
        @name PicoGL.COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2
        @private
     */
    COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2: 0x9277,
    /**
        @type {GLenum}
        @name PicoGL.COMPRESSED_RGBA8_ETC2_EAC
        @private
     */
    COMPRESSED_RGBA8_ETC2_EAC: 0x9278,
    /**
        @type {GLenum}
        @name PicoGL.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC
        @private
     */
    COMPRESSED_SRGB8_ALPHA8_ETC2_EAC: 0x9279,

    // https://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_pvrtc/
    /**
        @type {GLenum}
        @name PicoGL.COMPRESSED_RGB_PVRTC_4BPPV1_IMG
        @private
     */
    COMPRESSED_RGB_PVRTC_4BPPV1_IMG: 0x8C00,
    /**
        @type {GLenum}
        @name PicoGL.COMPRESSED_RGB_PVRTC_2BPPV1_IMG
        @private
     */
    COMPRESSED_RGB_PVRTC_2BPPV1_IMG: 0x8C01,
    /**
        @type {GLenum}
        @name PicoGL.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG
        @private
     */
    COMPRESSED_RGBA_PVRTC_4BPPV1_IMG: 0x8C02,
    /**
        @type {GLenum}
        @name PicoGL.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG
        @private
     */
    COMPRESSED_RGBA_PVRTC_2BPPV1_IMG: 0x8C03,

    // https://www.khronos.org/registry/webgl/extensions/WEBGL_compressed_texture_astc/
    /**
        @type {GLenum}
        @name PicoGL.COMPRESSED_RGBA_ASTC_4x4_KHR
        @private
     */
    COMPRESSED_RGBA_ASTC_4x4_KHR: 0x93B0,
    /**
        @type {GLenum}
        @name PicoGL.COMPRESSED_RGBA_ASTC_5x4_KHR
        @private
     */
    COMPRESSED_RGBA_ASTC_5x4_KHR: 0x93B1,
    /**
        @type {GLenum}
        @name PicoGL.COMPRESSED_RGBA_ASTC_5x5_KHR
        @private
     */
    COMPRESSED_RGBA_ASTC_5x5_KHR: 0x93B2,
    /**
        @type {GLenum}
        @name PicoGL.COMPRESSED_RGBA_ASTC_6x5_KHR
        @private
     */
    COMPRESSED_RGBA_ASTC_6x5_KHR: 0x93B3,
    /**
        @type {GLenum}
        @name PicoGL.COMPRESSED_RGBA_ASTC_6x6_KHR
        @private
     */
    COMPRESSED_RGBA_ASTC_6x6_KHR: 0x93B4,
    /**
        @type {GLenum}
        @name PicoGL.COMPRESSED_RGBA_ASTC_8x5_KHR
        @private
     */
    COMPRESSED_RGBA_ASTC_8x5_KHR: 0x93B5,
    /**
        @type {GLenum}
        @name PicoGL.COMPRESSED_RGBA_ASTC_8x6_KHR
        @private
     */
    COMPRESSED_RGBA_ASTC_8x6_KHR: 0x93B6,
    /**
        @type {GLenum}
        @name PicoGL.COMPRESSED_RGBA_ASTC_8x8_KHR
        @private
     */
    COMPRESSED_RGBA_ASTC_8x8_KHR: 0x93B7,
    /**
        @type {GLenum}
        @name PicoGL.COMPRESSED_RGBA_ASTC_10x5_KHR
        @private
     */
    COMPRESSED_RGBA_ASTC_10x5_KHR: 0x93B8,
    /**
        @type {GLenum}
        @name PicoGL.COMPRESSED_RGBA_ASTC_10x6_KHR
        @private
     */
    COMPRESSED_RGBA_ASTC_10x6_KHR: 0x93B9,
    /**
        @type {GLenum}
        @name PicoGL.COMPRESSED_RGBA_ASTC_10x8_KHR
        @private
     */
    COMPRESSED_RGBA_ASTC_10x8_KHR: 0x93BA,
    /**
        @type {GLenum}
        @name PicoGL.COMPRESSED_RGBA_ASTC_10x10_KHR
        @private
     */
    COMPRESSED_RGBA_ASTC_10x10_KHR: 0x93BB,
    /**
        @type {GLenum}
        @name PicoGL.COMPRESSED_RGBA_ASTC_12x10_KHR
        @private
     */
    COMPRESSED_RGBA_ASTC_12x10_KHR: 0x93BC,
    /**
        @type {GLenum}
        @name PicoGL.COMPRESSED_RGBA_ASTC_12x12_KHR
        @private
     */
    COMPRESSED_RGBA_ASTC_12x12_KHR: 0x93BD,
    /**
        @type {GLenum}
        @name PicoGL.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR
        @private
     */
    COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR: 0x93D0,
    /**
        @type {GLenum}
        @name PicoGL.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR
        @private
     */
    COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR: 0x93D1,
    /**
        @type {GLenum}
        @name PicoGL.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR
        @private
     */
    COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR: 0x93D2,
    /**
        @type {GLenum}
        @name PicoGL.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR
        @private
     */
    COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR: 0x93D3,
    /**
        @type {GLenum}
        @name PicoGL.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR
        @private
     */
    COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR: 0x93D4,
    /**
        @type {GLenum}
        @name PicoGL.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR
        @private
     */
    COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR: 0x93D5,
    /**
        @type {GLenum}
        @name PicoGL.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR
        @private
     */
    COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR: 0x93D6,
    /**
        @type {GLenum}
        @name PicoGL.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR
        @private
     */
    COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR: 0x93D7,
    /**
        @type {GLenum}
        @name PicoGL.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR
        @private
     */
    COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR: 0x93D8,
    /**
        @type {GLenum}
        @name PicoGL.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR
        @private
     */
    COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR: 0x93D9,
    /**
        @type {GLenum}
        @name PicoGL.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR
        @private
     */
    COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR: 0x93DA,
    /**
        @type {GLenum}
        @name PicoGL.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR
        @private
     */
    COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR: 0x93DB,
    /**
        @type {GLenum}
        @name PicoGL.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR
        @private
     */
    COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR: 0x93DC,
    /**
        @type {GLenum}
        @name PicoGL.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR
        @private
     */
    COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR: 0x93DD
};


export const TYPE_SIZE = {
    [GL.BYTE]: 1,
    [GL.UNSIGNED_BYTE]: 1,
    [GL.SHORT]: 2,
    [GL.UNSIGNED_SHORT]: 2,
    [GL.INT]: 4,
    [GL.UNSIGNED_INT]: 4,
    [GL.FLOAT]: 4
};

// Internal format => [format, type]
export const TEXTURE_FORMATS = {
    [GL.R8]: [ GL.RED, GL.UNSIGNED_BYTE ],
    [GL.R8_SNORM]: [ GL.RED, GL.BYTE ],
    [GL.R16F]: [ GL.RED, GL.FLOAT ],
    [GL.R32F]: [ GL.RED, GL.FLOAT ],
    [GL.R8UI]: [ GL.RED_INTEGER, GL.UNSIGNED_BYTE ],
    [GL.R8I]: [ GL.RED_INTEGER, GL.BYTE ],
    [GL.R16UI]: [ GL.RED_INTEGER, GL.UNSIGNED_SHORT ],
    [GL.R16I]: [ GL.RED_INTEGER, GL.SHORT ],
    [GL.R32UI]: [ GL.RED_INTEGER, GL.UNSIGNED_INT ],
    [GL.R32I]: [ GL.RED_INTEGER, GL.INT ],
    [GL.RG8]: [ GL.RG, GL.UNSIGNED_BYTE ],
    [GL.RG8_SNORM]: [ GL.RG, GL.BYTE ],
    [GL.RG16F]: [ GL.RG, GL.FLOAT ],
    [GL.RG32F]: [ GL.RG, GL.FLOAT ],
    [GL.RG8UI]: [ GL.RG_INTEGER, GL.UNSIGNED_BYTE ],
    [GL.RG8I]: [ GL.RG_INTEGER, GL.BYTE ],
    [GL.RG16UI]: [ GL.RG_INTEGER, GL.UNSIGNED_SHORT ],
    [GL.RG16I]: [ GL.RG_INTEGER, GL.SHORT ],
    [GL.RG32UI]: [ GL.RG_INTEGER, GL.UNSIGNED_INT ],
    [GL.RG32I]: [ GL.RG_INTEGER, GL.INT ],
    [GL.RGB8]: [ GL.RGB, GL.UNSIGNED_BYTE ],
    [GL.SRGB8]: [ GL.RGB, GL.UNSIGNED_BYTE ],
    [GL.RGB565]: [ GL.RGB, GL.UNSIGNED_SHORT_5_6_5 ],
    [GL.RGB8_SNORM]: [ GL.RGB, GL.BYTE ],
    [GL.R11F_G11F_B10F]: [ GL.RGB, GL.UNSIGNED_INT_10F_11F_11F_REV ],
    [GL.RGB9_E5]: [ GL.RGB, GL.UNSIGNED_INT_5_9_9_9_REV ],
    [GL.RGB16F]: [ GL.RGB, GL.FLOAT ],
    [GL.RGB32F]: [ GL.RGB, GL.FLOAT ],
    [GL.RGB8UI]: [ GL.RGB_INTEGER, GL.UNSIGNED_BYTE ],
    [GL.RGB8I]: [ GL.RGB_INTEGER, GL.BYTE ],
    [GL.RGB16UI]: [ GL.RGB_INTEGER, GL.UNSIGNED_SHORT ],
    [GL.RGB16I]: [ GL.RGB_INTEGER, GL.SHORT ],
    [GL.RGB32UI]: [ GL.RGB_INTEGER, GL.UNSIGNED_INT ],
    [GL.RGB32I]: [ GL.RGB_INTEGER, GL.INT ],
    [GL.RGBA8]: [ GL.RGBA, GL.UNSIGNED_BYTE ],
    [GL.SRGB8_ALPHA8]: [ GL.RGBA, GL.UNSIGNED_BYTE ],
    [GL.RGBA8_SNORM]: [ GL.RGBA, GL.BYTE ],
    [GL.RGB5_A1]: [ GL.RGBA, GL.UNSIGNED_SHORT_5_5_5_1 ],
    [GL.RGBA4]: [ GL.RGBA, GL.UNSIGNED_SHORT_4_4_4_4 ],
    [GL.RGB10_A2]: [ GL.RGBA, GL.UNSIGNED_INT_2_10_10_10_REV ],
    [GL.RGBA16F]: [ GL.RGBA, GL.FLOAT ],
    [GL.RGBA32F]: [ GL.RGBA, GL.FLOAT ],
    [GL.RGBA8UI]: [ GL.RGBA_INTEGER, GL.UNSIGNED_BYTE ],
    [GL.RGBA8I]: [ GL.RGBA_INTEGER, GL.BYTE ],
    [GL.RGB10_A2UI]: [ GL.RGBA_INTEGER, GL.UNSIGNED_INT_2_10_10_10_REV ],
    [GL.RGBA16UI]: [ GL.RGBA_INTEGER, GL.UNSIGNED_SHORT ],
    [GL.RGBA16I]: [ GL.RGBA_INTEGER, GL.SHORT ],
    [GL.RGBA32I]: [ GL.RGBA_INTEGER, GL.INT ],
    [GL.RGBA32UI]: [ GL.RGBA_INTEGER, GL.UNSIGNED_INT ],
    [GL.DEPTH_COMPONENT16]: [ GL.DEPTH_COMPONENT, GL.UNSIGNED_SHORT ],
    [GL.DEPTH_COMPONENT24]: [ GL.DEPTH_COMPONENT, GL.UNSIGNED_INT ],
    [GL.DEPTH_COMPONENT32F]: [ GL.DEPTH_COMPONENT, GL.FLOAT ],
    [GL.DEPTH24_STENCIL8]: [ GL.DEPTH_STENCIL, GL.UNSIGNED_INT_24_8 ],
    [GL.DEPTH32F_STENCIL8]: [ GL.DEPTH_STENCIL, GL.FLOAT_32_UNSIGNED_INT_24_8_REV ]
};

export const COMPRESSED_TEXTURE_TYPES = {
    [GL.COMPRESSED_RGB_S3TC_DXT1_EXT]: true,
    [GL.COMPRESSED_RGBA_S3TC_DXT1_EXT]: true,
    [GL.COMPRESSED_RGBA_S3TC_DXT3_EXT]: true,
    [GL.COMPRESSED_RGBA_S3TC_DXT5_EXT]: true,
    [GL.COMPRESSED_SRGB_S3TC_DXT1_EXT]: true,
    [GL.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT]: true,
    [GL.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT]: true,
    [GL.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT]: true,
    [GL.COMPRESSED_R11_EAC]: true,
    [GL.COMPRESSED_SIGNED_R11_EAC]: true,
    [GL.COMPRESSED_RG11_EAC]: true,
    [GL.COMPRESSED_SIGNED_RG11_EAC]: true,
    [GL.COMPRESSED_RGB8_ETC2]: true,
    [GL.COMPRESSED_SRGB8_ETC2]: true,
    [GL.COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2]: true,
    [GL.COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2]: true,
    [GL.COMPRESSED_RGBA8_ETC2_EAC]: true,
    [GL.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC]: true,
    [GL.COMPRESSED_RGBA_ASTC_4x4_KHR]: true,
    [GL.COMPRESSED_RGBA_ASTC_5x4_KHR]: true,
    [GL.COMPRESSED_RGBA_ASTC_5x5_KHR]: true,
    [GL.COMPRESSED_RGBA_ASTC_6x5_KHR]: true,
    [GL.COMPRESSED_RGBA_ASTC_6x6_KHR]: true,
    [GL.COMPRESSED_RGBA_ASTC_8x5_KHR]: true,
    [GL.COMPRESSED_RGBA_ASTC_8x6_KHR]: true,
    [GL.COMPRESSED_RGBA_ASTC_8x8_KHR]: true,
    [GL.COMPRESSED_RGBA_ASTC_10x5_KHR]: true,
    [GL.COMPRESSED_RGBA_ASTC_10x6_KHR]: true,
    [GL.COMPRESSED_RGBA_ASTC_10x8_KHR]: true,
    [GL.COMPRESSED_RGBA_ASTC_10x10_KHR]: true,
    [GL.COMPRESSED_RGBA_ASTC_12x10_KHR]: true,
    [GL.COMPRESSED_RGBA_ASTC_12x12_KHR]: true,
    [GL.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR]: true,
    [GL.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR]: true,
    [GL.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR]: true,
    [GL.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR]: true,
    [GL.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR]: true,
    [GL.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR]: true,
    [GL.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR]: true,
    [GL.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR]: true,
    [GL.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR]: true,
    [GL.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR]: true,
    [GL.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR]: true,
    [GL.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR]: true,
    [GL.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR]: true,
    [GL.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR]: true,
    [GL.COMPRESSED_RGB_PVRTC_4BPPV1_IMG]: true,
    [GL.COMPRESSED_RGB_PVRTC_2BPPV1_IMG]: true,
    [GL.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG]: true,
    [GL.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG]: true
};

export const WEBGL_INFO = {};

export const DUMMY_UNIT_ARRAY = new Array(1);

export const DUMMY_OBJECT = {};

// DEPRECATED
export const TEXTURE_FORMAT_DEFAULTS = {
    [GL.UNSIGNED_BYTE]: {
        [GL.RED]: GL.R8,
        [GL.RG]: GL.RG8,
        [GL.RGB]: GL.RGB8,
        [GL.RGBA]: GL.RGBA8
    },

    [GL.UNSIGNED_SHORT]: {
        [GL.DEPTH_COMPONENT]: GL.DEPTH_COMPONENT16
    },

    [GL.FLOAT]: {
        [GL.RED]: GL.R16F,
        [GL.RG]: GL.RG16F,
        [GL.RGB]: GL.RGB16F,
        [GL.RGBA]: GL.RGBA16F,
        [GL.DEPTH_COMPONENT]: GL.DEPTH_COMPONENT32F
    }
};
