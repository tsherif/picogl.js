NanoGL.js
========

NanoGL.js is minimal WebGL library. It's meant for developers who understand the GPU rendering pipeline and want to use it, but with a more convenient API. Typical usage of NanoGL.js will involve creating programs, arraybuffers, framebuffers, textures, and combining them into draw calls.

```JavaScript
    var app = NanoGL.createApp(canvas)
    .clearColor(0.0, 0.0, 0.0, 1.0);

    var program = app.createProgram(vertexShaderSource, fragmentShaderSource);

    var positions = app.createArrayBuffer(NanoGL.FLOAT, 2, new Float32Array([
        -0.5, -0.5,
         0.5, -0.5,
         0.0,  0.5
    ]));

    var drawCall = app.createDrawCall(program)
    .attribute("aPosition", positions)
    .uniform("uColor", new Float32Array([1.0, 0.0, 0.0]));

    app.drawCalls([drawCall])
    .clear()
    .draw();

``` 

NanoGL.js makes it fairly easy to set up multi-pass rendering algorithms. It also has convenient utility functions to enable relevant extensions. For example, screen space ambient occlusion might be set up as follows:

```JavaScript
    // SET UP APP
    var app = NanoGL.createApp(canvas)
    .clearColor(0.0, 0.0, 0.0, 1.0)
    .depthTest()
    .depthFunc(NanoGL.LEQUAL)
    .drawBuffers()           // Enable WEBGL_draw_buffers
    .floatTextures()         // Enable OES_texture_float
    .linearFloatTextures();  // Enable OES_texture_float_linear

    // SET UP PROGRAMS AND FRAMEBUFFERS
    // Set up program and framebuffer to gather color and geometry data
    var colorGeoProgram = app.createProgram(colorGeoVsSource, colorGeoFsSource);
    // Framebuffer with 3 float targets: color, positions, normals
    var colorGeoBuffer = app.createFramebuffer(canvas.width, canvas.height, 3, NanoGL.FLOAT);

    // Set up ssao program
    var ssaoProgram = app.createProgram(ssaoVsSource, ssaoFsSource);
    var ssaoBuffer = app.createFramebuffer(canvas.width, canvas.height, 1, NanoGL.FLOAT);

    // Set up ao blend program
    var aoBlendProgram = app.createProgram(aoBlendVsSource, aoBlendFsSource);

    // SET UP ARRAY BUFFERS AND OTHER DATA
    // ...etc.

    // SET UP DRAW CALLS
    var colorGeoDrawCall = app.createDrawCall(colorGeoProgram);
    .attribute("aPosition", positions)
    .attribute("aNormal", normals)
    // ...etc.

    var ssaoDrawCall = app.createDrawCall(ssaoProgram)
    .attribute("aPosition", quadPositions)
    // ...etc.
    // Bind geo targets from colorGeoBuffer
    .texture("uPositionBuffer", 0, colorGeoBuffer.colorTextures[1])
    .texture("uNormalBuffer", 1, colorGeoBuffer.colorTextures[2]);

    var aoBlendDrawCall = app.createDrawCall(aoBlendProgram)
    .attribute("aPosition", quadPositions)
    // Bind color targets from first two passes
    .texture("uColorBuffer", 0, colorGeoBuffer.colorTextures[0])
    .texture("uOcclusionBuffer", 1, ssaoBuffer.colorTextures[0]);

    // DRAW
    // Color/geo pass
    app.framebuffer(colorGeoBuffer)
    .drawCalls([colorGeoDrawCall])
    .clear()
    .draw()
    // SSAO pass
    .framebuffer(ssaoBuffer)
    .drawCalls([ssaoDrawCall])
    .clear()
    .draw()
    // Final blend pass
    .defaultFramebuffer()
    .drawCalls([aoBlendDrawCall])
    .clear()
    .draw();
```

Note that NanoGL.js is **not** a scene graph library. There are no objects, hierarchies, transforms, materials, etc. It has been designed only to make management of GPU state more convenient. Its conceptual model maps fairly directly to the constructs one deals with when writing directly with WebGL. The only higher-level construct is the **draw call**, which manages sets of related lower-level constructs. 
