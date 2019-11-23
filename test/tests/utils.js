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

export function createQuadDrawCall(app, fs) {
    let vertexArray = app.createVertexArray()
        .vertexAttributeBuffer(0, 
            app.createVertexBuffer(app.gl.FLOAT, 2, new Float32Array([
                -1, -1,
                1, -1,
                -1, 1,
                1, 1
            ]))
        );
    let program = app.createProgram(`
        #version 300 es
        
        layout(location=0) in vec4 position;
        
        out vec2 vUV;
        void main() {
            vUV = position.xy * 0.5 + 0.5;
            gl_Position = position;
        }
    `,
    fs);

    app.cullBackfaces();

    return app.createDrawCall(program, vertexArray).primitive(app.gl.TRIANGLE_STRIP);
}

export function loadImages(urls) {
    return new Promise((resolve) => {
        let numImages = urls.length;

        let images = new Array(numImages);

        function onload() {
            if (--numImages === 0) {
                resolve(images);
            }
        }

        for (let i = 0; i < numImages; ++i) {
            images[i] = new Image();
            images[i].onload = onload;
            images[i].src = urls[i];
        }
    });
}
