module.exports = function(grunt) {
    "use strict";

    var pkg = grunt.file.readJSON("package.json");
    var banner = "/*\nPicoGL.js v<%= pkg.version %> \n\n<%= licence %>*/\n";

    grunt.initConfig({
        pkg: pkg,
        licence: grunt.file.read("LICENSE"),
        packageName: "picogl",
        VERSION: pkg.version,
        uglify: {
            options: {
                banner: banner
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
            picogl: {
                options: {
                    browser: true,
                    devel: true,
                    globals: {
                        PicoGL: true
                    }
                },
                src: "<%= concat.src.src %>"
            }
        },
        concat: {
            options: {
                separator: ";",
                banner: banner,
                stripBanners: {
                    line: true,
                    block: true
                },
                process: true
            },
            src: {
                src: [
                  "src/picogl.js",
                  "src/app.js",
                  "src/program.js",
                  "src/shader.js",
                  "src/vertexarray.js",
                  "src/transformfeedback.js",
                  "src/arraybuffer.js",
                  "src/uniforms.js",
                  "src/uniformbuffer.js",
                  "src/texture.js",
                  "src/cubemap.js",
                  "src/framebuffer.js",
                  "src/drawcall.js"
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
