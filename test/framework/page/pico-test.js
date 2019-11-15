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

(function() {

    function picoTest(name, fn) {
        QUnit.test(name, (assert) => runTest(assert, fn));
    }

    picoTest.only = function picoTest(name, fn) {
        QUnit.only(name, (assert) => runTest(assert, fn));
    };

    function runTest(assert, fn) {
        let canvas = document.createElement("canvas");
        document.body.appendChild(canvas);
        
        return new Promise((resolve, reject) => {
            fn(tester(assert, resolve), canvas);  
            setTimeout(() => reject("Timeout"), 1000);
        }).finally(() => document.body.removeChild(canvas));
    }

    function tester(assert, resolve) {
        return {
            ok(...args) {
                return assert.ok(...args);
            },
            noOk(...args) {
                return assert.noOk(...args);
            },
            equal(...args) {
                return assert.equal(...args);
            },
            notEqual(...args) {
                return assert.notEqual(...args);
            },
            deepEqual(...args) {
                return assert.deepEqual(...args);
            },
            notDeepEqual(...args) {
                return assert.notDeepEqual(...args);
            },
            arrayEqual(actual, expected, message) {
                return this.deepEqual(Array.from(actual), Array.from(expected), message);
            },
            notArrayEqual(actual, expected, message) {
                return this.notDeepEqual(Array.from(actual), Array.from(expected), message);
            },
            glParameterEqual(gl, parameter, expected, message) {
                let actual = gl.getParameter(parameter);
                if (Array.isArray(actual) || ArrayBuffer.isView(actual)) {
                    return this.arrayEqual(actual, expected, message);
                } else {
                    return this.equal(actual, expected, message);
                }
            },
            notGLParameterEqual(gl, parameter, expected, message) {
                let actual = gl.getParameter(parameter);
                if (Array.isArray(actual) || ArrayBuffer.isView(actual)) {
                    return this.notArrayEqual(actual, expected, message);
                } else {
                    return this.notEqual(actual, expected, message);
                }
            },
            pixelEqual(gl, uv, expected, message) {
                if (!expected || typeof expected === "string") {
                    message = expected;
                    expected = uv;
                    uv = [0.5, 0.5];
                }
                return this.arrayEqual(readPixel(gl, uv), expected, message);
            },
            notPixelEqual(gl, uv, expected, message) {
                if (!expected || typeof expected === "string") {
                    message = expected;
                    expected = uv;
                    uv = [0.5, 0.5];
                }
                return this.notArrayEqual(readPixel(gl, uv), expected, message);
            },
            throws(...args) {
                return assert.throws(...args);
            },
            done() {
                resolve();
            }
        };
    } 

    function readPixel(gl, uv) {
        let x = Math.floor(gl.drawingBufferWidth * uv[0]);
        let y = Math.floor(gl.drawingBufferHeight * uv[1]);

        let actual = new Uint8Array(4);
        gl.readPixels(x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, actual);

        return actual;
    }

    window.picoTest = picoTest;
})();
