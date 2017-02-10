function NanoGL(canvas) {
    "use strict";

    this.canvas = canvas;
    this.gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    this.drawCalls = [];

    this.currentProgram = null;

    // TODO (Tarek): expose these via API
    this.gl.clearColor(0, 0, 0, 1.0);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.depthFunc(this.gl.LEQUAL);
    this.gl.viewport(0, 0, canvas.width, canvas.height);
}

NanoGL.dummyObject = {};

NanoGL.prototype.createProgram = function(vsSource, fsSource) {
    return new Program(this.gl, vsSource, fsSource);
};

NanoGL.prototype.createArrayBuffer = function(type, itemSize, data) {
    return new ArrayBuffer(this.gl, type, itemSize, data);
};

NanoGL.prototype.createTexture = function(image, options) {
    return new Texture(this.gl, image, options);
};

NanoGL.prototype.createDrawCall = function(program) {
    return new DrawCall(this.gl, program);
};

NanoGL.prototype.draw = function() {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    for (var i = 0, len = this.drawCalls.length; i < len; i++) {
        this.drawCalls[i].draw(this);
    }
};

function DrawCall(gl, program) {
    this.gl = gl;
    this.program = program || null;
    this.uniforms = {};
    this.attributes = {};
    this.textures = {};
}

DrawCall.prototype.setProgram = function(program) {
    this.program = program;
    this.uniforms = {};
    this.attributes = {};
    this.textures = {};
};

DrawCall.prototype.setUniform = function(name, value) {
    this.uniforms[name] = value;
};

DrawCall.prototype.setAttribute = function(name, buffer) {
    this.attributes[name] = buffer;
};

DrawCall.prototype.setTexture = function(name, unit, texture) {
    var textureUnit = this.gl["TEXTURE" + unit];
    this.uniforms[name] = unit;
    this.textures[textureUnit] = texture;
};

DrawCall.prototype.draw = function(app) {
    var uniforms = this.uniforms;
    var attributes = this.attributes;
    var textures = this.textures;
    var numItems = 0;

    if (app.currentProgram !== this.program) {
        this.program.bind();
        app.currentProgram = this.program;
    }

    for (var uName in uniforms) {
        this.program.setUniform(uName, uniforms[uName]);
    }

    for (var aName in attributes) {
        this.program.bindAttribute(aName, attributes[aName]);
        numItems = attributes[aName].numItems;
    }

    for (var unit in textures) {
        textures[unit].bind(unit);
    }

    this.gl.drawArrays(this.gl.TRIANGLES, 0, numItems);
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

function FloatUniform(gl, handle) {
    this.gl = gl;
    this.handle = handle;
    this.value = 0;
}

FloatUniform.prototype.set = function(value) {
    if (this.value !== value) {
        this.gl.uniform1f(this.handle, value);
        this.value = value;
    }
}

function IntUniform(gl, handle) {
    this.gl = gl;
    this.handle = handle;
    this.value = 0;
}

IntUniform.prototype.set = function(value) {
    if (this.value !== value) {
        this.gl.uniform1i(this.handle, value);
        this.value = value;
    }
}

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
    MAT4: Mat4Uniform,
    INT: IntUniform,
    FLOAT: FloatUniform
};

function ArrayBuffer(gl, type, itemSize, data) {
    this.gl = gl;
    this.buffer = gl.createBuffer();
    this.type = type;
    this.itemSize = itemSize;
    this.numItems = data.length / itemSize;

    gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
}

ArrayBuffer.prototype.bind = function(attribute) {
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
    this.gl.vertexAttribPointer(attribute, this.itemSize, this.type, false, 0, 0);
    this.gl.enableVertexAttribArray(attribute);
};

function Texture(gl, image, options) {
    this.gl = gl;
    this.texture = gl.createTexture();

    options = options || NanoGL.dummyObject;

    var flipY = options.flipY !== undefined ? options.flipY : true;
    var minFilter = options.minFilter || gl.LINEAR_MIPMAP_NEAREST;
    var magFilter = options.magFilter || gl.LINEAR;
    var wrapS = options.wrapS || gl.REPEAT;
    var wrapT = options.wrapT || gl.REPEAT;
    var generateMipmaps = options.generateMipmaps !== false && 
                        (minFilter === gl.LINEAR_MIPMAP_NEAREST || minFilter === gl.LINEAR_MIPMAP_LINEAR);

    var internalFormat = options.internalFormat || gl.RGBA;
    var type = options.type || gl.UNSIGNED_BYTE;

    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, flipY);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magFilter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minFilter);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapS);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapT);

    gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, internalFormat, type, image);

    if (generateMipmaps) {
        gl.generateMipmap(gl.TEXTURE_2D);
    }

}

Texture.prototype.bind = function(unit) {
    this.gl.activeTexture(unit);
    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
}
