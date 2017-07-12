module.exports = function(grunt) {
    "use strict";

    var pkg = grunt.file.readJSON("package.json");
    var banner = "/*\nPicoGL.js v<%= pkg.version %> \n\n<%= licence %>*/\n";
    var files = [
        "src/picogl.js",
        "src/app.js",
        "src/program.js",
        "src/shader.js",
        "src/vertexarray.js",
        "src/transformfeedback.js",
        "src/vertexbuffer.js",
        "src/uniforms.js",
        "src/uniformbuffer.js",
        "src/texture.js",
        "src/cubemap.js",
        "src/framebuffer.js",
        "src/drawcall.js",
        "src/timer.js"
    ];

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
                    browserify: true,
                    globals: {
                        PicoGL: true
                    }
                },
                src: files
            }
        },
        browserify: {
            src: {
                src: [ "src/picogl.js" ],
                dest: "build/<%= packageName %>.js"
            },
            options: {
                banner: banner,
                transform: [
                    [   "browserify-replace", {
                            replace: [
                                { from: "%%VERSION%%", to: "<%= VERSION %>" }
                            ]
                        }
                    ]
                ]
            },
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
                  "src/vertexbuffer.js",
                  "src/uniforms.js",
                  "src/uniformbuffer.js",
                  "src/texture.js",
                  "src/cubemap.js",
                  "src/framebuffer.js",
                  "src/drawcall.js",
                  "src/timer.js"
                ],
                dest: "build/<%= packageName %>.js"
            }
        },
        jsdoc : {
            src : {
                src: files,
                dest: "docs"
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("grunt-jsdoc");

    grunt.registerTask("lint", ["jshint"]);
    grunt.registerTask("build", ["jshint", "browserify", "uglify"]);
    grunt.registerTask("default", ["build"]);
};
