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

import {PicoGL} from "../../src/picogl.js";

glCheck("Query lifecycle", (t, canvas) => {
    let app = PicoGL.createApp(canvas);
    let query = app.createQuery(PicoGL.ANY_SAMPLES_PASSED_CONSERVATIVE);

    t.ok(query.gl, "Query contains a gl context");
    t.ok(query.query, "Query created a query");
    t.ok(query.query instanceof WebGLQuery, "Query created query instance");
    t.equal(query.active, false, "Query starts in inactive state");
    t.equal(query.result, null, "Query starts with null result");
    t.equal(query.target, PicoGL.ANY_SAMPLES_PASSED_CONSERVATIVE, "Query sets target");

    query.delete();
    t.equal(query.query, null, "Query was deleted");

    t.done();
});

glCheck("Query querying", async (t, canvas) => {
    let app = PicoGL.createApp(canvas);
    let query = app.createQuery(PicoGL.ANY_SAMPLES_PASSED_CONSERVATIVE);
    
    query.begin();
    query.end();

    t.equal(query.active, true, "Query active after end");

    await t.loopUntil(() => query.ready());

    t.equal(typeof query.result, "number", "Query result is a number when ready");
    t.done();
});
