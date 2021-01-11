import { PicoGL } from "../../../../build/module/picogl.js";

interface GLCheckWindow extends Window {
    glcheck_renderDone?: boolean;
};

const glCheckWindow : GLCheckWindow = window;

const canvas = document.getElementById("gl-canvas") as HTMLCanvasElement;
canvas.width = window.innerWidth
canvas.height = window.innerHeight;

const app = PicoGL.createApp(canvas);

// PROGRAM 
const vsSource =  `
    #version 300 es
    
    layout(location=0) in vec4 position;
    layout(location=1) in vec2 uv;
    
    out vec2 vUV;
    void main() {
        vUV = uv;
        gl_Position = position;
    }
`;
const fsSource = `
    #version 300 es
    precision highp float;

    in vec2 vUV;

    uniform sampler2D tex;

    out vec4 fragColor;
    void main() {
        fragColor = texture(tex, vUV);
    }
`;

let program = app.createProgram(vsSource, fsSource);

// FRAMEBUFFER
let colorTarget = app.createTexture2D(app.width, app.height);
let depthTarget = app.createTexture2D(app.width, app.height, {
    internalFormat: PicoGL.DEPTH_COMPONENT16
});

let rttBuffer = app.createFramebuffer().colorTarget(0, colorTarget).depthTarget(depthTarget);

// GEOMETRY
let positions = app.createVertexBuffer(PicoGL.FLOAT, 2, new Float32Array([
    -0.5, 0.5,
    -0.5, -0.5,
    0.5, -0.5,
    -0.5, 0.5,
    0.5, -0.5,
    0.5, 0.5
]));
let uv = app.createVertexBuffer(PicoGL.FLOAT, 2, new Float32Array([
    0, 1,
    0, 0,
    1, 0,
    0, 1,
    1, 0,
    1, 1
]));

let quadArray = app.createVertexArray()
.vertexAttributeBuffer(0, positions)
.vertexAttributeBuffer(1, uv);

let image = new Image();

image.onload = function() {
    let texture = app.createTexture2D(image, { flipY: true });

    let drawCall = app.createDrawCall(program, quadArray);

    // RENDER TO OFFSCREEN TEXTURE
    app.drawFramebuffer(rttBuffer).clearColor(0.4, 0.4, 0.4, 1.0).clear();
    drawCall.texture("tex", texture).draw();
    
    // RENDER TO SCREEN
    app.defaultDrawFramebuffer().clearColor(0.0, 0.0, 0.0, 1.0).clear();
    drawCall.texture("tex", rttBuffer.colorAttachments[0]).draw();

    glCheckWindow.glcheck_renderDone = true;
}

image.src = "../../../../examples/img/webgl-logo.png";
