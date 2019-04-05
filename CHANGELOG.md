## 0.11.0

- `VertexArray`
    - Remove methods `vertexIntegerAttributeBuffer()`, `instanceIntegerAttributeBuffer()`, `vertexNormalizedAttributeBuffer()`, `instanceNormalizedAttributeBuffer()`
    - `vertexAttributeBuffer()` and `instanceAttributeBuffer()` can fully specify pointer information (size, type, etc.) via an optional `options` argument.
- `VertexBuffer`  
    - Track whether they contain integer data based on the type provided. Used for attribute pointer.
    - `normalized()` and `unnormalized()` methods to indicate whether they contain normalized integer data.
- `App.createInterleavedBuffer` to create a buffer without any attribute pointer information (site, type, etc.).
- Simplify Firefox transform feedback workarounds. Still have to provide workaround for: https://bugzilla.mozilla.org/show_bug.cgi?id=1541396
