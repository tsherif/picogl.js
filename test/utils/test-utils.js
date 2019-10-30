(function() {
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

    window.test = function test(name, fn) {
        QUnit.test(name, (assert) => {
            let canvas = document.createElement("canvas");
            document.body.appendChild(canvas);

            let result = fn(tester(assert), canvas);
            
            document.body.removeChild(canvas);
        
            return result;
        });
    }
})();
