///////////////////////////////////////////////////////////////////////////////////
// The MIT License (MIT)
//
// Copyright (c) 2019 Tarek Sherif
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

import {PicoGL} from "../../src/picogl.js";

glcheck("Program lifecycle", async (t, canvas) => {
    let app = PicoGL.createApp(canvas);
    let vsSource = `
        #version 300 es

        void main() {}
    `;
    let fsSource = `
        #version 300 es

        void main() {}
    `;

    let vShader = app.createShader(PicoGL.VERTEX_SHADER, vsSource);
    let fShader = app.createShader(PicoGL.FRAGMENT_SHADER, fsSource);

    let [ programSource, programShader ] = await app.createPrograms([ vsSource, fsSource ], [ vShader, fShader ]);

    t.ok(programSource.gl, "Program contains a gl context");
    t.ok(programSource.appState, "App state tracking initialized");
    t.ok(programSource.program instanceof WebGLProgram, "Program created program instance");
    t.equal(typeof programSource.vertexSource, "string", "Source program maintains vertex source");
    t.equal(typeof programSource.fragmentSource, "string", "Source program maintains fragment source");
    t.equal(programSource.vertexShader, null, "Source program does not maintain vertex shader");
    t.equal(programSource.fragmentShader, null, "Source program does not maintain fragment shader");
    t.equal(typeof programSource.translatedVertexSource(), "string", "Source program translates vertex source");
    t.equal(typeof programSource.translatedVertexSource(), "string", "Source program translates fragment source");
    
    t.ok(programShader.gl, "Program contains a gl context");
    t.ok(programShader.appState, "App state tracking initialized");
    t.ok(programShader.program instanceof WebGLProgram, "Program created program instance");
    t.equal(programShader.vertexSource, null, "Shader program does not maintain vertex source");
    t.equal(programShader.fragmentSource, null, "Shader program does not maintain fragment source");
    t.ok(programShader.vertexShader, "Shader program maintains vertex shader");
    t.ok(programShader.fragmentShader, "Shader program maintains fragment shader");
    t.equal(typeof programShader.translatedVertexSource(), "string", "Shader program translates vertex source");
    t.equal(typeof programShader.translatedVertexSource(), "string", "Shader program translates fragment source");
    
    programSource.bind();
    t.equal(app.state.program, programSource, "State tracking tracks program");

    programSource.delete();
    t.equal(programSource.program, null, "Program object deleted");
    t.equal(app.state.program, null, "State tracking reset");
    
    programShader.bind();
    t.equal(app.state.program, programShader, "State tracking tracks program");

    programShader.delete();
    t.equal(programShader.program, null, "Program object deleted");
    t.equal(app.state.program, null, "State tracking reset");

    t.done();
});
