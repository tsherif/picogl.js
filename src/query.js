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

/**
    Generic query object.

    @class
    @prop {WebGLRenderingContext} gl The WebGL context.
    @prop {WebGLQuery} query Query object.
    @prop {GLEnum} target The type of information being queried.
    @prop {boolean} active Whether or not a query is currently in progress.
    @prop {Any} result The result of the query (only available after a call to ready() returns true). 
*/
function Query(gl, target) {
    this.gl = gl;
    this.query = gl.createQuery();
    this.target = target;
    this.active = false;
    this.result = null;
}

/**
    Begin a query.

    @method
*/
Query.prototype.begin = function() {
    if (!this.active) {
        this.gl.beginQuery(this.target, this.query);
        this.result = null;
    }    
};

/**
    End a query.

    @method
*/
Query.prototype.end = function() {
    if (!this.active) {
        this.gl.endQuery(this.target);
        this.active = true;
    }
};

/**
    Check if query result is available.

    @method
*/
Query.prototype.ready = function() {
    if (this.active && this.gl.getQueryParameter(this.query, this.gl.QUERY_RESULT_AVAILABLE)) {
        this.active = false;
        this.result = this.gl.getQueryParameter(this.query, this.gl.QUERY_RESULT);
        return true;
    }

    return false;
};

module.exports = Query;
