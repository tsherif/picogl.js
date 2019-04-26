PicoGL.js
=========

[![Build Status](https://travis-ci.org/tsherif/picogl.js.svg?branch=master)](https://travis-ci.org/tsherif/picogl.js) [![GZIP size](https://badge-size.herokuapp.com/tsherif/picogl.js/master/build/picogl.min.js.svg?compression=gzip)](https://github.com/tsherif/picogl.js/blob/master/build/picogl.min.js) [![Gitter](https://img.shields.io/gitter/room/picogl.js/general.svg)](https://gitter.im/picogl-js/general) [![License](https://img.shields.io/github/license/tsherif/picogl.js.svg)](https://github.com/tsherif/picogl.js/blob/master/LICENSE) [![NPM](https://img.shields.io/npm/v/picogl.svg)](https://www.npmjs.com/package/picogl)

**[API Docs](https://tsherif.github.io/picogl.js/docs/)** | **[Tutorial](https://tsherif.wordpress.com/2017/07/26/webgl-2-development-with-picogl-js/)** | **[Chat](https://gitter.im/picogl-js/general)**

PicoGL.js is a minimal WebGL 2 rendering library. It's meant for developers who understand the WebGL 2 rendering pipeline and want to use it, but with a more convenient API. Typical usage of PicoGL.js will involve creating programs, vertex buffers, vertex arrays, uniform buffers, framebuffers, textures, transform feedbacks, and combining them into draw calls.

```JavaScript

    // Create App which manages all GL state
    let app = PicoGL.createApp(canvas)
    .clearColor(0.0, 0.0, 0.0, 1.0);
    
    // Create Program
    // Shaders are compiled in parallel if supported by the platform.
    app.createPrograms([vertexShaderSource, fragmentShaderSource]).then(([program]) => {
        // Create a buffer of vertex attributes
        let positions = app.createVertexBuffer(PicoGL.FLOAT, 2, new Float32Array([
            -0.5, -0.5,
             0.5, -0.5,
             0.0,  0.5
        ]));

        // VertexArray manages attribute buffer state
        let vertexArray = app.createVertexArray()
        .vertexAttributeBuffer(0, positions);

        // UniformBuffer allows multiple uniforms to be bound
        // as a single block of memory.
        // First part defines layout of the UniformBuffer.
        // Second part updates values.
        let uniformBuffer = app.createUniformBuffer([
            PicoGL.FLOAT_VEC4,
            PicoGL.FLOAT_VEC4
        ])
        .set(0, new Float32Array([1.0, 0.0, 0.0, 0.3]))
        .set(1, new Float32Array([0.0, 0.0, 1.0, 0.7]))
        .update();

        // Create DrawCall from Program and VertexArray (both required),
        // and a UniformBuffer.
        let drawCall = app.createDrawCall(program, vertexArray)
        .uniformBlock("ColorUniforms", uniformBuffer);

        // Draw
        app.clear();
        drawCall.draw();
    });

``` 

Note that PicoGL.js is **not** a scene graph library. There are no objects, hierarchies, transforms, materials, etc. It has been designed only to make management of GPU state more convenient. Its conceptual model maps fairly directly to the constructs one deals with when writing directly with the WebGL 2 API. The only higher-level construct is the **draw call**, which manages sets of related lower-level constructs.



Usage
-----
PicoGL.js can be used directly by downloading the [built source](https://tsherif.github.io/picogl.js/build/picogl.min.js) and loading it via a script tag:

```HTML
    <script src="js/picogl.min.js"></script>
```

or it can be installed via [npm](https://www.npmjs.com/package/picogl):

```bash
    npm install picogl
```

and loaded via ES6-style `import`:   

```JavaScript
    import PicoGL from "picogl";
```

Features
--------

PicoGL.js simplifies usage of some more complex WebGL 2 features, such as multiple render targets, uniform buffers, transform feedback and instanced drawing.

**Multiple Render Targets**

```JavaScript
    let app = PicoGL.createApp(canvas)
    .clearColor(0.0, 0.0, 0.0, 1.0);


    // Texture render targets
    let colorTarget0 = app.createTexture2D(app.width, app.height);
    let colorTarget1 = app.createTexture2D(app.width, app.height);
    let depthTarget = app.createTexture2D(app.width, app.height, {
        internalFormat: PicoGL.DEPTH_COMPONENT16
    });


    // Create framebuffer with color targets at attachments 
    // 0 and 1, and a depth target.
    let framebuffer = app.createFramebuffer()
    .colorTarget(0, colorTarget0)
    .colorTarget(1, colorTarget1)
    .depthTarget(depthTarget);
    
    // ... set up programs and vertex arrays for offscreen and
    // main draw passes...
    
    let offscreenDrawCall = app.createDrawCall(offscreenProgram, offscreenVAO);

    // Bind main program texture samplers to framebuffer targets
    let mainDrawCall = app.createDrawCall(mainProgram, mainVAO)
    .texture("texture1", framebuffer.colorAttachments[0])
    .texture("texture2", framebuffer.colorAttachments[1])
    .texture("depthTexture", framebuffer.depthAttachment);

    // Offscreen pass
    app.drawFramebuffer(framebuffer).clear();
    offscreenDrawCall.draw();
    
    // Main draw pass
    app.defaultDrawFramebuffer().clear()
    mainDrawCall.draw();
```

**Uniform Buffers**

```JavaScript
    let app = PicoGL.createApp(canvas)
    .clearColor(0.0, 0.0, 0.0, 1.0);
    
    // ... set up program and vertex array...

    // Layout is std140
    let uniformBuffer = app.createUniformBuffer([
        PicoGL.FLOAT_MAT4,
        PicoGL.FLOAT_VEC4,
        PicoGL.INT_VEC4,
        PicoGL.FLOAT
    ])
    .set(0, matrix)
    .set(1, float32Vector)
    .set(2, int32Vector)
    .set(3, scalar)
    .update();      // Data only sent to GPU when update() is called

    let drawCall = app.createDrawCall(program, vertexArray)
    .uniformBlock("UniformBlock", uniformBuffer);
```

**Transform Feedback**

```JavaScript
    let app = PicoGL.createApp(canvas)
    .clearColor(0.0, 0.0, 0.0, 1.0);

    // Last argument is transform feedback varyings
    app.createProgramx([vertexShaderSource, fragmentShaderSource, ["vPosition"]]).then(([program]) => {
        let positions1 = app.createVertexBuffer(PicoGL.FLOAT, 2, new Float32Array([
            -0.5, -0.5,
             0.5, -0.5,
             0.0,  0.5
        ]));
        let vertexArray = app.createVertexArray()
        .vertexAttributeBuffer(0, positions1);

        // Empty destination buffer of 6 floats
        let positions2 = app.createVertexBuffer(PicoGL.FLOAT, 2, 6);  

        // Capture transform results into positions2 buffer
        let transformFeedback = app.createTransformFeedback()
        .feedbackBuffer(0, positions2);

        let drawCall = app.createDrawCall(program, vertexArray)
        .transformFeedback(transformFeedback);

        app.clear();
        drawCall.draw();
    });
``` 

**Instanced Drawing**

```JavaScript
    let app = PicoGL.createApp(canvas)
    .clearColor(0.0, 0.0, 0.0, 1.0);

    // The starting positions of the triangle. Each pair of coordinates
    // will be passed per-vertex
    let positions = app.createVertexBuffer(PicoGL.FLOAT, 2, new Float32Array([
        -0.3, -0.3,
         0.3, -0.3,
         0.0,  0.3
    ]));

    // This is an instance buffer meaning each pair of numbers will be passed
    // per-instance, rather than per-vertex
    let offsets = app.createVertexBuffer(PicoGL.FLOAT, 2, new Float32Array([
        -0.5, 0.0,
         0.0, 0.2,
         0.5, 0.0
    ]));

    // This vertex array is set up to draw 3 instanced triangles 
    // with the offsets given above
    let vertexArray = app.createVertexArray()
    .vertexAttributeBuffer(0, positions); // Pass positions per-vertex
    .instanceAttributeBuffer(1, offset); // Pass offsets per-instance
```
