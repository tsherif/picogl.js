function tester(assert, resolve) {
    return {
        assert,
        ok(...args) {
            return assert.ok(...args);
        },
        equal(...args) {
            return assert.equal(...args);
        },
        arrayEqual(actual, expected, message) {
            return assert.deepEqual(Array.from(actual), Array.from(expected), message);
        },
        glParameterEqual(gl, parameter, expected, message) {
            let actual = gl.getParameter(parameter);
            if (Array.isArray(actual) || ArrayBuffer.isView(actual)) {
                return this.arrayEqual(actual, expected, message);
            } else {
                return this.equal(actual, expected, message);
            }
        },
        deepEqual(...args) {
            return assert.deepEqual(...args);
        },
        done() {
            resolve();
        }
    };
}

export function test(name, fn) {
    QUnit.test(name, (assert) => {
        let canvas = document.createElement("canvas");
        document.body.appendChild(canvas);
    
        return new Promise((resolve, reject) => {
            fn(tester(assert, resolve), canvas);  
            setTimeout(() => reject("Timeout"), 1000);
        }).finally(() => document.body.removeChild(canvas));
    });
}

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
};

export function readPixel(app, uv = [0.5, 0.5]) {
    let x = Math.floor(app.width * uv[0]);
    let y = Math.floor(app.height * uv[1]);

    let result = new Uint8Array(4);

    app.readPixel(x, y, result);

    return result;
};

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
};
