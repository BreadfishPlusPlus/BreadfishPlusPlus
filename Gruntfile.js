/*jshint node: true */
module.exports = function (grunt) {
    var path    = require('path');
    var fs      = require('fs');

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-template-module');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-notify');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        'template-module': {
            compile: {
                options: {
                    module: true,
                    provider: 'underscore',
                    prettify: true,
                    processName: function (filepath) {
                        return path.basename(filepath, '.html');
                    }
                },
                files: {
                    '.tmp/templates.js': ['src/templates/*.html']
                }
            }
        },
        browserify: {
            build: {
                options: {
                    banner: grunt.file.read('src/banner.js'),
                    browserifyOptions: {
                        entries: ['./BreadfishPlusPlus.js'],
                        basedir: __dirname + '/src/',
                        fullPaths: false,
                        bundleExternal: true,
                        debug: true
                    },
                    transform: ['browserify-shim', 'node-lessify'],
                    preBundleCB: function (b) {
                        var files = fs.readdirSync('src/modules/');
                        files.forEach(function (fileName) {
                            b.add('./modules/' + fileName);
                        });
                        b.require('../.tmp/templates.js', {expose: 'templates'});
                    }
                },
                src: 'src/BreadfishPlusPlus.js',
                dest: '.tmp/breadfishplusplus.js'
            }
        },
        uglify: {
            dev: {
                options: {
                    beautify: true,
                    mangle: false,
                    compress: false,
                    report: 'min',
                    preserveComments: 'all'
                },
                files: {
                    '.tmp/breadfishplusplus.uglified.js': ['.tmp/breadfishplusplus.js'],
                }
            },
            build: {
                options: {
                    mangle: true,
                    compress: {},
                    report: 'min',
                    preserveComments: false
                },
                files: {
                    '.tmp/breadfishplusplus.uglified.js': ['.tmp/breadfishplusplus.js'],
                }
            }
        },
        concat: {
            libraries: {
                options: {
                    separator: '\n',
                },
                src: [
                    'libraries/underscore.js',
                    'libraries/jquery.js',
                    'libraries/jquery-ui.js',

                    'libraries/Autolinker.js',
                    'libraries/async.js',
                    'libraries/desktop-notify.js',
                    'libraries/highlight.js',
                    'libraries/jquery.mousewheel.js',
                    'libraries/jquery.withinViewport.js',
                    'libraries/keyboard.js',
                    'libraries/moment-with-locales.js',
                    'libraries/socket-io.js',
                    'libraries/tooltip.js'
                ],
                dest: '.tmp/libraries.js',
            },
            script: {
                options: {
                    banner: '/**\n* DEPENDENCIES\n**/\n\n',
                    separator: '\n\n/**\n* USERSCRIPT\n**/\n\n',
                    message: 'Server is ready!'
                },
                src: [
                    '.tmp/libraries.js',
                    '.tmp/breadfishplusplus.uglified.js'
                ],
                dest: 'out/static/breadfishplusplus.js',
            }
        },
        clean: {
            build: ['.tmp/**/*.*'],
        },
        copy: {
            final: {
                src: 'out/static/breadfishplusplus.js',
                dest: '../static/breadfishplusplus.js'
            },
        },
        connect: {
            watch: {
                options: {
                    base: __dirname + '/out/static/',
                    port: 8080,
                    hostname: '0.0.0.0',
                    debug: true
                }
            },
            serve: {
                options: {
                    base: __dirname + '/out/static/',
                    port: 8080,
                    hostname: '0.0.0.0',
                    debug: true,
                    keepalive: true
                }
            }
        },
        watch: {
            scripts: {
                files: ['src/**/*'],
                tasks: ['build-dev']
            }
        },
        notify: {
            defualt: {
                options: {
                    title: 'Breadfish++',  // optional
                    message: 'Script wurde erstellt!', //required
                }
            }
        }
    });

    grunt.registerTask('default', ['connect:watch', 'watch']);
    grunt.registerTask('serve', ['connect:serve']);
    grunt.registerTask('build', ['template-module', 'browserify', 'uglify:build', 'concat', 'clean', 'copy:final', 'notify']);
    grunt.registerTask('build-dev', ['template-module', 'browserify', 'uglify:dev', 'concat', 'notify']);
};