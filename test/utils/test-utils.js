function tester(assert) {
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
        glArrayParameter(gl, parameter, expected, message) {
            return this.arrayEqual(gl.getParameter(parameter), expected, message);
        },
        deepEqual(...args) {
            return assert.deepEqual(...args);
        }
    };
}

export function test(name, fn) {
    QUnit.test(name, (assert) => {
        let canvas = document.createElement("canvas");
        document.body.appendChild(canvas);

        let result = fn(tester(assert), canvas);

        if (result instanceof Promise) {
            result.then(() => document.body.removeChild(canvas));
        } else {
            document.body.removeChild(canvas);
        }
    
        return result;
    });
}

export function asyncResult(t, message, fn) {
    return new Promise((resolve, reject) => {
        fn(() => {
            t.ok(true);
            resolve(message);
        });
        setTimeout(() => reject(message), 500);
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

export function readCenterPixel(app) {
    let x = Math.floor(app.width / 2);
    let y = Math.floor(app.height / 2);

    let result = new Uint8Array(4);

    app.readPixel(x, y, result);

    return result;
};
