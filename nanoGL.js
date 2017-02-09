function NanoGL(canvas) {
    "use strict";

    this.canvas = canvas;
    this.gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    this.drawCalls = [];

    // TODO (Tarek): expose these via API
    this.gl.clearColor(0, 0, 0, 1.0);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.depthFunc(this.gl.LEQUAL);
    this.gl.viewport(0, 0, canvas.width, canvas.height);
}

NanoGL.prototype.createProgram = function(vsSource, fsSource) {
    return new Program(this.gl, vsSource, fsSource);
};

NanoGL.prototype.createArrayBuffer = function(type, itemSize, data) {
    return new ArrayBuffer(this.gl, type, itemSize, data);
};

NanoGL.prototype.createDrawCall = function(program) {
    return new DrawCall(this.gl, program);
};

NanoGL.prototype.draw = function() {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    for (var i = 0, len = this.drawCalls.length; i < len; i++) {
        this.drawCalls[i].draw();
    }
};

function DrawCall(gl, program) {
    this.gl = gl;
    this.program = program || null;
    this.uniformNames = [];
    this.uniformValues = [];
    this.attributeNames = [];
    this.attributeBuffers = [];
}

DrawCall.prototype.setProgram = function(program) {
    this.program = program;
    this.uniformNames.length = 0;
    this.uniformValues.length = 0;
    this.attributeNames.length = 0;
    this.attributeBuffers.length = 0;
};

DrawCall.prototype.setUniform = function(name, value) {
    this.uniformNames.push(name);
    this.uniformValues.push(value);
};

DrawCall.prototype.setAttribute = function(name, buffer) {
    this.attributeNames.push(name);
    this.attributeBuffers.push(buffer);
};

DrawCall.prototype.draw = function() {
    var uNames = this.uniformNames;
    var uValues = this.uniformValues;
    var aNames = this.attributeNames;
    var aBuffers = this.attributeBuffers;

    this.program.bind();

    for (var i = 0, len = uNames.length; i < len; i++) {
        this.program.setUniform(uNames[i], uValues[i]);
    }

    for (var i = 0, len = aNames.length; i < len; i++) {
        this.program.bindAttribute(aNames[i], aBuffers[i]);
    }

    this.gl.drawArrays(this.gl.TRIANGLES, 0, aBuffers[0].numItems);
};

function Program(gl, vsSource, fsSource) {
    var vshader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vshader, vsSource);
    gl.compileShader(vshader);
    if (!gl.getShaderParameter(vshader, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(vshader));
    }

    var fshader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fshader, fsSource);
    gl.compileShader(fshader);
    if (!gl.getShaderParameter(fshader, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(fshader));
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
    this.uniforms = {};
    this.attributes = {};
}

Program.prototype.bind = function() {
    this.gl.useProgram(this.program);
};

Program.prototype.enableUniform = function(name, Type) {
    var handle = this.gl.getUniformLocation(this.program, name);
    this.uniforms[name] = new Type(this.gl, handle);
};

Program.prototype.setUniform = function(name, value) {
    this.uniforms[name].set(value);
};

Program.prototype.enableAttribute = function(name) {
    this.attributes[name] = this.gl.getAttribLocation(this.program, name);
};

Program.prototype.bindAttribute = function(name, buffer) {
    buffer.bind(this.attributes[name]);
};

function Vec3Uniform(gl, handle) {
    this.gl = gl;
    this.handle = handle;
    this.value = new Float32Array(3);
}

Vec3Uniform.prototype.set = function(value) {
    if (this.value[0] !== value[0] ||
        this.value[1] !== value[1] ||
        this.value[2] !== value[2]) {
        this.gl.uniform3fv(this.handle, value);
        this.value.set(value);
    }
}

function Mat4Uniform(gl, handle) {
    this.gl = gl;
    this.handle = handle;
    this.value = new Float32Array(16);
}

Mat4Uniform.prototype.set = function(value) {
    if (this.value[0] !== value[0] ||
        this.value[1] !== value[1] ||
        this.value[2] !== value[2] ||
        this.value[3] !== value[3] ||
        this.value[4] !== value[4] ||
        this.value[5] !== value[5] ||
        this.value[6] !== value[6] ||
        this.value[7] !== value[7] ||
        this.value[8] !== value[8] ||
        this.value[9] !== value[9] ||
        this.value[10] !== value[10] ||
        this.value[11] !== value[11] ||
        this.value[12] !== value[12] ||
        this.value[13] !== value[13] ||
        this.value[14] !== value[14] ||
        this.value[15] !== value[15]) {
        this.gl.uniformMatrix4fv(this.handle, false, value);
        this.value.set(value);
    }
}

NanoGL.UNIFORM_TYPES = {
    VEC3: Vec3Uniform,
    MAT4: Mat4Uniform
};

function ArrayBuffer(gl, type, itemSize, data) {
    this.gl = gl;
    this.type = type;
    this.itemSize = itemSize;
    this.numItems = data.length / itemSize;
    this.buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
}

ArrayBuffer.prototype.bind = function(attribute) {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
    this.gl.vertexAttribPointer(attribute, this.itemSize, this.type, false, 0, 0);
    this.gl.enableVertexAttribArray(attribute);
};
