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


    NanoGL.Program = function Program(gl, vsSource, fsSource) {
        var lines, i;

        var vshader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vshader, vsSource);
        gl.compileShader(vshader);
        if (!gl.getShaderParameter(vshader, gl.COMPILE_STATUS)) {
            console.error(gl.getShaderInfoLog(vshader));
            lines = vsSource.split("\n");
            for (i = 0; i < lines.length; ++i) {
                console.error((i + 1) + ":", lines[i]);
            }
        }

        var fshader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fshader, fsSource);
        gl.compileShader(fshader);
        if (!gl.getShaderParameter(fshader, gl.COMPILE_STATUS)) {
            console.error(gl.getShaderInfoLog(fshader));
            lines = fsSource.split("\n");
            for (i = 0; i < lines.length; ++i) {
                console.error((i + 1) + ":", lines[i]);
            }
        }

        var program = gl.createProgram();
        gl.attachShader(program, vshader);
        gl.attachShader(program, fshader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
          console.error(gl.getProgramInfoLog(program));
        }

        this.gl = gl;
        this.program = program;
        this.attributes = {};
        this.uniforms = {};

        var numAttributes = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
        var numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);

        for (i = 0; i < numAttributes; ++i) {
            var attributeInfo = gl.getActiveAttrib(program, i);
            var attributeHandle = this.gl.getAttribLocation(this.program, attributeInfo.name);
            this.attributes[attributeInfo.name] = attributeHandle;
        }

        for (i = 0; i < numUniforms; ++i) {
            var uniformInfo = gl.getActiveUniform(program, i);
            var uniformHandle = gl.getUniformLocation(this.program, uniformInfo.name);
            var UniformClass = null;
            switch (uniformInfo.type) {
                case gl.INT: 
                case gl.SAMPLER_2D: 
                    UniformClass = NanoGL.IntUniform;
                    break;
                case gl.SAMPLER_CUBE: 
                    UniformClass = NanoGL.IntUniform;
                    break;
                case gl.FLOAT: 
                    UniformClass = NanoGL.FloatUniform;
                    break;
                case gl.FLOAT_VEC2: 
                    UniformClass = NanoGL.Vec2Uniform;
                    break;
                case gl.FLOAT_VEC3: 
                    UniformClass = NanoGL.Vec3Uniform;
                    break;
                case gl.FLOAT_VEC4: 
                    UniformClass = NanoGL.Vec4Uniform;
                    break;
                case gl.FLOAT_MAT4: 
                    UniformClass = NanoGL.Mat4Uniform;
                    break;
            }

            this.uniforms[uniformInfo.name] = new UniformClass(gl, uniformHandle);
        }
    };

    NanoGL.Program.prototype.bind = function() {
        this.gl.useProgram(this.program);
    };

    NanoGL.Program.prototype.bindAttribute = function(name, buffer) {
        buffer.bind(this.attributes[name]);
    };

    NanoGL.Program.prototype.setUniform = function(name, value) {
        this.uniforms[name].set(value);
    };

})();

