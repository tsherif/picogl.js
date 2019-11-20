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

glTest("Timer CPU timing", async (t, canvas) => {
    let app = PicoGL.createApp(canvas);
    let timer = app.createTimer();

    t.ok(timer.gl, "Timer contains a gl context");
    t.ok(timer.cpuTimer, "Timer created a cpu timer");

    timer.start();
    timer.end();

    await t.loopUntil(() => timer.ready());

    t.equal(typeof timer.cpuTime, "number", "CPU time is number");
    t.done();

});

glTest("Timer GPU timing", async (t, canvas) => {
    if (!PicoGL.WEBGL_INFO.GPU_TIMER) {
        t.ok(true, "GPU Timing not supported");
        t.done();
        return;
    }

    let app = PicoGL.createApp(canvas);
    let timer = app.createTimer();

    t.ok(timer.gl, "Timer contains a gl context");
    t.ok(timer.gpuTimerQuery, "Timer created a gpu timer");

    timer.start();
    timer.end();

    await t.loopUntil(() => timer.ready()); 
        
    t.equal(typeof timer.gpuTime, "number", "GPU time is number");

    timer.delete();
    t.equal(timer.gpuTimerQuery, null, "Timer was deleted");

    t.done();
});
