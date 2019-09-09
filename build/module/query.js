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

import { GL } from "./constants.js";

/**
    Generic query object.

    @class
    @prop {WebGLRenderingContext} gl The WebGL context.
    @prop {WebGLQuery} query Query object.
    @prop {GLEnum} target The type of information being queried.
    @prop {boolean} active Whether or not a query is currently in progress.
    @prop {Any} result The result of the query (only available after a call to ready() returns true). 
*/
export class Query {

    constructor(gl, target) {
        this.gl = gl;
        this.query = null;
        this.target = target;
        this.active = false;
        this.result = null;

        this.restore();
    }

    /**
        Restore query after context loss.

        @method
        @return {Query} The Query object.
    */
    restore() {
        this.query = this.gl.createQuery();
        this.active = false;
        this.result = null;

        return this;
    }

    /**
        Begin a query.

        @method
        @return {Query} The Query object.
    */
    begin() {
        if (!this.active) {
            this.gl.beginQuery(this.target, this.query);
            this.result = null;
        }

        return this;
    }

    /**
        End a query.

        @method
        @return {Query} The Query object.
    */
    end() {
        if (!this.active) {
            this.gl.endQuery(this.target);
            this.active = true;
        }

        return this;
    }

    /**
        Check if query result is available.

        @method
        @return {boolean} If results are available.
    */
    ready() {
        if (this.active && this.gl.getQueryParameter(this.query, GL.QUERY_RESULT_AVAILABLE)) {
            this.active = false;
            // Note(Tarek): Casting because FF incorrectly returns booleans.
            // https://bugzilla.mozilla.org/show_bug.cgi?id=1422714 
            this.result = Number(this.gl.getQueryParameter(this.query, GL.QUERY_RESULT));
            return true;
        }

        return false;
    }

    /**
        Delete this query.

        @method
        @return {Query} The Query object.
    */
    delete() {
        if (this.query) {
            this.gl.deleteQuery(this.query);
            this.query = null;
        }

        return this;
    }

}
