## v0.14.0

- `DrawCall`
    - Support for multi-draw (WEBGL_multi_draw_instanced) via `DrawCall.drawRanges()`
    - `VertexArray` no longer required
    - Deprecate passing primitive to `App.createDrawCall`. Use `DrawCall.primitive()` instead.
- `Texture`
    - Deprecate `format` parameter to `App.createTexture*()` and `App.createCubemap()`. `internalFormat` is now the primary parameter. `type` and `format` will be automatically determined, and `type` can be overridden if desired.
    - Support for anisotropic filtering (EXT_texture_filter_anisotropic)
- Support for getting platform translations of shaders (WEBGL_debug_shaders) via `Shader.translatedSource`, `Program.translatedVertexSource` and `Program.translatedFragmentSource`.
- Renderer information now stored in `PicoGL.WEBGL_INFO.VENDOR` and `PicoGL.WEBGL_INFO.RENDERER`. 
- Use recommended polling pattern for shader compilation and program linking.

## v0.13.0

- Support for parallel shader compilation (KHR_parallel_shader_compile)
- Support importing directly into the browser without bundling
- Auto-enable extensions
	- Remove methods `App.floatRenderTargets`, `App.linearFloatTextures`, `App.s3tcTextures`, `App.etcTextures`, `App.astcTextures`, `App.pvrtcTextures`, as they are no longer needed.

## v0.12.0

- Support for compressed cubemaps
- UniformBuffers only send modified subrange of data to GPU on `update()`
- Remove `VertexBuffer.normalized`, `VertexBuffer.unnormalized`


## v0.11.0

- `VertexArray`
    - Remove methods `vertexIntegerAttributeBuffer()`, `instanceIntegerAttributeBuffer()`, `vertexNormalizedAttributeBuffer()`, `instanceNormalizedAttributeBuffer()`
    - `vertexAttributeBuffer()` and `instanceAttributeBuffer()` can fully specify pointer information (size, type, etc.) via an optional `options` argument.
- `VertexBuffer`  
    - Track whether they contain integer data based on the type provided. Used for attribute pointer.
    - `normalized()` and `unnormalized()` methods to indicate whether they contain normalized integer data.
- `App.createInterleavedBuffer()` to create a buffer without any attribute pointer information (site, type, etc.).
- Simplify Firefox transform feedback workarounds. Still have to provide workaround for: https://bugzilla.mozilla.org/show_bug.cgi?id=1541396
- Remove unused properties in `DrawCall`
