module.exports = function(grunt) {
    "use strict";

    var pkg = grunt.file.readJSON("package.json");

    grunt.initConfig({
        pkg: pkg,
        licence: grunt.file.read("LICENSE"),
        packageName: pkg.name.split(".")[0],
        uglify: {
            options: {
                banner: "/*\nNanoGL.js v<%= pkg.version %> \n\n<%= licence %>*/\n",
                preserveComments: "some"
            },
            src: {
                src: "build/<%= packageName %>.js",
                dest: "build/<%= packageName %>.min.js"
            }
        },
        jshint: {
            options: {
                eqeqeq: true,
                undef: true,
                unused: true,
                strict: true,
                indent: 4,
                immed: true,
                latedef: "nofunc",
                newcap: true,
                nonew: true,
                trailing: true
            },
            grunt: {
                options: {
                    node: true
                },
                src: "Gruntfile.js"
            },
            nanogl: {
                options: {
                    browser: true,
                    devel: true,
                    globals: {
                        NanoGL: true
                    }
                },
                src: "<%= concat.src.src %>"
            }
        },
        concat: {
            options: {
                separator: ";",
                process: true
            },
            src: {
                src: [
                  "src/nanogl.js",
                  "src/app.js",
                  "src/program.js",
                  "src/arraybuffer.js",
                  "src/uniforms.js",
                  "src/texture.js",
                  "src/cubemap.js",
                  "src/framebuffer.js",
                  "src/drawcall.js",

                ],
                dest: "build/<%= packageName %>.js"
            }
        },
        jsdoc : {
            src : {
                src: "<%= concat.src.src %>",
                dest: "docs"
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-jsdoc");

    grunt.registerTask("lint", ["jshint"]);
    grunt.registerTask("build", ["jshint", "concat", "uglify"]);
    grunt.registerTask("default", ["build"]);
};
