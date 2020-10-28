import { PicoGL } from "../../../build/module/picogl.js";

interface GLCheckWindow extends Window {
    glcheck_renderDone?: boolean;
};

const glCheckWindow : GLCheckWindow = window;

const canvas = document.getElementById("gl-canvas") as HTMLCanvasElement;
canvas.width = window.innerWidth
canvas.height = window.innerHeight;

const app = PicoGL.createApp(canvas)
.clearColor(0.0, 0.0, 0.0, 1.0);

// PROGRAM 
const vsSource =  `
    #version 300 es
        
    layout(location=0) in vec4 position;
    layout(location=1) in vec3 color;
    
    out vec3 vColor; 
    void main() {
        vColor = color;
        gl_Position = position;
    }
`;
const fsSource = `
    #version 300 es
    precision highp float;
    
    in vec3 vColor;
    
    out vec4 fragColor;
    void main() {
        fragColor = vec4(vColor, 1.0);
    }
`;

// GEOMETRY IN VERTEX BUFFERS
const positions = app.createVertexBuffer(PicoGL.FLOAT, 2, new Float32Array([
    -0.5, -0.5,
     0.5, -0.5,
     0.0, 0.5, 
]));

const colors = app.createVertexBuffer(PicoGL.UNSIGNED_BYTE, 3, new Uint8Array([
    255, 0, 0,
    0, 255, 0,
    0, 0, 255
]));

// COMBINE VERTEX BUFFERS INTO VERTEX ARRAY
const triangleArray = app.createVertexArray()
.vertexAttributeBuffer(0, positions)
.vertexAttributeBuffer(1, colors, { normalized: true });

app.createPrograms([vsSource, fsSource]).then(function([program]) {
    // CREATE DRAW CALL FROM PROGRAM AND VERTEX ARRAY
    const drawCall = app.createDrawCall(program, triangleArray);

    // DRAW
    app.clear();
    drawCall.draw();

    glCheckWindow.glcheck_renderDone = true;

    // CLEANUP
    program.delete();
    positions.delete();
    colors.delete();
    triangleArray.delete();
});
