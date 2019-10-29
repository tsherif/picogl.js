function test(name, fn) {
    QUnit.test(name, (assert) => {
        let canvas = document.createElement("canvas");
        document.body.appendChild(canvas);

        fn(assert, canvas);
        
        document.body.removeChild(canvas);
    });
}
