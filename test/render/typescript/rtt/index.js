import { PicoGL } from "../../../../build/module/picogl.js";
;
var glCheckWindow = window;
var canvas = document.getElementById("gl-canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var app = PicoGL.createApp(canvas);
// PROGRAM 
var vsSource = "\n    #version 300 es\n    \n    layout(location=0) in vec4 position;\n    layout(location=1) in vec2 uv;\n    \n    out vec2 vUV;\n    void main() {\n        vUV = uv;\n        gl_Position = position;\n    }\n";
var fsSource = "\n    #version 300 es\n    precision highp float;\n\n    in vec2 vUV;\n\n    uniform sampler2D tex;\n\n    out vec4 fragColor;\n    void main() {\n        fragColor = texture(tex, vUV);\n    }\n";
var program = app.createProgram(vsSource, fsSource);
// FRAMEBUFFER
var colorTarget = app.createTexture2D(app.width, app.height);
var depthTarget = app.createTexture2D(app.width, app.height, {
    internalFormat: PicoGL.DEPTH_COMPONENT16
});
var rttBuffer = app.createFramebuffer().colorTarget(0, colorTarget).depthTarget(depthTarget);
// GEOMETRY
var positions = app.createVertexBuffer(PicoGL.FLOAT, 2, new Float32Array([
    -0.5, 0.5,
    -0.5, -0.5,
    0.5, -0.5,
    -0.5, 0.5,
    0.5, -0.5,
    0.5, 0.5
]));
var uv = app.createVertexBuffer(PicoGL.FLOAT, 2, new Float32Array([
    0, 1,
    0, 0,
    1, 0,
    0, 1,
    1, 0,
    1, 1
]));
var quadArray = app.createVertexArray()
    .vertexAttributeBuffer(0, positions)
    .vertexAttributeBuffer(1, uv);
var image = new Image();
image.onload = function () {
    var texture = app.createTexture2D(image, { flipY: true });
    var drawCall = app.createDrawCall(program, quadArray);
    // RENDER TO OFFSCREEN TEXTURE
    app.drawFramebuffer(rttBuffer).clearColor(0.4, 0.4, 0.4, 1.0).clear();
    drawCall.texture("tex", texture).draw();
    // RENDER TO SCREEN
    app.defaultDrawFramebuffer().clearColor(0.0, 0.0, 0.0, 1.0).clear();
    drawCall.texture("tex", rttBuffer.colorAttachments[0]).draw();
    glCheckWindow.glcheck_renderDone = true;
};
image.src = "../../../../examples/img/webgl-logo.png";
