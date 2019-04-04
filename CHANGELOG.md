## 0.11.0
- Remove methods `VertexArray.vertexIntegerAttributeBuffer()`, `VertexArray.instanceIntegerAttributeBuffer()`, `VertexArray.vertexNormalizedAttributeBuffer()`, `VertexArray.instanceNormalizedAttributeBuffer()`
    - Integer types are automatically detected based on the type provided.
    - Normalized data can be indicated via `VertexBuffer.normalized()`.
- Simplify Firefox transform feedback workarounds. Still have to provide workaround for: https://bugzilla.mozilla.org/show_bug.cgi?id=1541396
