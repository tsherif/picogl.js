import { PicoGL } from "../../../build/module/picogl.js";
;
var glCheckWindow = window;
var canvas = document.getElementById("gl-canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var app = PicoGL.createApp(canvas)
    .clearColor(0.0, 0.0, 0.0, 1.0);
// PROGRAM 
var vsSource = "\n    #version 300 es\n        \n    layout(location=0) in vec4 position;\n    layout(location=1) in vec3 color;\n    \n    out vec3 vColor; \n    void main() {\n        vColor = color;\n        gl_Position = position;\n    }\n";
var fsSource = "\n    #version 300 es\n    precision highp float;\n    \n    in vec3 vColor;\n    \n    out vec4 fragColor;\n    void main() {\n        fragColor = vec4(vColor, 1.0);\n    }\n";
// GEOMETRY IN VERTEX BUFFERS
var positions = app.createVertexBuffer(PicoGL.FLOAT, 2, new Float32Array([
    -0.5, -0.5,
    0.5, -0.5,
    0.0, 0.5,
]));
var colors = app.createVertexBuffer(PicoGL.UNSIGNED_BYTE, 3, new Uint8Array([
    255, 0, 0,
    0, 255, 0,
    0, 0, 255
]));
// COMBINE VERTEX BUFFERS INTO VERTEX ARRAY
var triangleArray = app.createVertexArray()
    .vertexAttributeBuffer(0, positions)
    .vertexAttributeBuffer(1, colors, { normalized: true });
app.createPrograms([vsSource, fsSource]).then(function (_a) {
    var program = _a[0];
    // CREATE DRAW CALL FROM PROGRAM AND VERTEX ARRAY
    var drawCall = app.createDrawCall(program, triangleArray);
    // DRAW
    app.clear();
    drawCall.draw();
    glCheckWindow.glcheck_renderDone = true;
    // CLEANUP
    program["delete"]();
    positions["delete"]();
    colors["delete"]();
    triangleArray["delete"]();
});
