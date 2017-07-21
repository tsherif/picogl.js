///////////////////////////////////////////////////////////////////////////////////
// The MIT License (MIT)
//
// Copyright (c) 2017 Tarek Sherif
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

"use strict";

var Query = require("./query");

/**
    Rendering timer.

    @class
    @hideconstructor
    @prop {WebGLRenderingContext} gl The WebGL context.
    @prop {Object} cpuTimer Timer for CPU. Will be window.performance, if available, or window.Date.
    @prop {boolean} gpuTimer Whether the gpu timing is available (EXT_disjoint_timer_query_webgl2 or
            EXT_disjoint_timer_query are supported).
    @prop {WebGLQuery} gpuTimerQuery Timer query object for GPU (if gpu timing is supported).
    @prop {boolean} gpuTimerQueryInProgress Whether a gpu timer query is currently in progress.
    @prop {number} cpuStartTime When the last CPU timing started.
    @prop {number} cpuTime Time spent on the CPU during the last timing. Only valid if App.timerReady() returns true.
    @prop {number} gpuTime Time spent on the GPU during the last timing. Only valid if App.timerReady() returns true.
*/
function Timer(gl) {
    this.gl = gl;
    this.cpuTimer = window.performance || window.Date;

    // Note(Tarek): Firefox for some reason only supports EXT_disjoint_timer_query, so have to try both
    var gpuTimerExtension = this.gl.getExtension("EXT_disjoint_timer_query_webgl2") || this.gl.getExtension("EXT_disjoint_timer_query");
    if (gpuTimerExtension) {
        this.gpuTimer = true;
        this.gpuTimerQuery = new Query(this.gl, gpuTimerExtension.TIME_ELAPSED_EXT);
        this.GPU_DISJOINT_EXT = gpuTimerExtension.GPU_DISJOINT_EXT;
    } else {
        this.gpuTimer = false;
        this.gpuTimerQuery = null;
        this.GPU_DISJOINT_EXT = null;
    }

    this.cpuStartTime = 0;
    this.cpuTime = 0;
    this.gpuTime = 0;
}


/**
    Start timing.

    @method
*/
Timer.prototype.start = function() {
    if (this.gpuTimer) {
        if (!this.gpuTimerQuery.active) {
            this.gpuTimerQuery.begin();
            this.cpuStartTime = this.cpuTimer.now();
        }
    } else {
        this.cpuStartTime = this.cpuTimer.now();
    }
};


/**
    Stop timing.

    @method
*/
Timer.prototype.end = function() {
    if (this.gpuTimer) {
        if (!this.gpuTimerQuery.active) {
            this.gpuTimerQuery.end();
            this.cpuTime = this.cpuTimer.now() - this.cpuStartTime;
        }
    } else {
        this.cpuTime = this.cpuTimer.now() - this.cpuStartTime;
    }
};

/**
    Check if timing results are available. If
    this method returns true, the cpuTime and
    gpuTime properties will be set to valid
    values.

    @method
*/
Timer.prototype.ready = function() {
    if (this.gpuTimer) {
        if (!this.gpuTimerQuery.active) {
            return false;
        }

        var gpuTimerAvailable = this.gpuTimerQuery.ready();
        var gpuTimerDisjoint = this.gl.getParameter(this.GPU_DISJOINT_EXT);

        if (gpuTimerAvailable && !gpuTimerDisjoint) {
            this.gpuTime = this.gpuTimerQuery.result  / 1000000;
            return true;
        } else {
            return false;
        }
    } else {
        return !!this.cpuStartTime;
    }
};

module.exports = Timer;
