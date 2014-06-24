module.exports = function (grunt) {
    "use strict";

    var path = require('path'),
        CleanCSS = require('clean-css');

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-template-module');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-autoprefixer');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        autoprefixer: {
            build: {
                files: [{
                    expand: true,
                    cwd: '.tmp/css/',
                    src: ['*.css'],
                    dest: '.tmp/css/',
                    ext: '.prefixed.css'
                }]
            }
        },
        uglify: {
            dev: {
                options: {
                    beautify: true,
                    mangle: false,
                    compress: false,
                    //report: 'gzip',
                    preserveComments: 'all'
                },
                files: {
                    '.tmp/BreadfishPlusPlus.min.js': ['.tmp/BreadfishPlusPlus.js'],
                }
            },
            build: {
                options: {
                    mangle: true,
                    compress: true,
                    report: 'gzip',
                    wrap: 'test',
                    preserveComments: false
                },
                files: {
                    '.tmp/BreadfishPlusPlus.min.js': ['.tmp/BreadfishPlusPlus.js'],
                }
            }
        },
        browserify: {
            main: {
                options: {
                    bundleOptions: {
                        debug: true
                    }
                },
                src: 'src/BreadfishPlusPlus.js',
                dest: '.tmp/BreadfishPlusPlus.js'
            }
        },
        concat: {
            styles: {
                files: {
                    'src/styles/index.js': ['.tmp/css/*.prefixed.css']
                },
                options: {
                    process: function (content, filePath) {
                        var name = path.basename(filePath, '.prefixed.css');
                        content = new CleanCSS({
                            keepSpecialComments: 0
                        }).minify(content);
                        content = JSON.stringify(content.toString().replace(/^\s+|\s+$/g, ''));
                        return 'exports["' + name + '"] = ' + content + ';';
                    }
                }
            },
            userscript: {
                options: {
                    separator: '\n',
                    banner: grunt.file.read('src/meta.js')
                },
                files: {
                    'userscript/BreadfishPlusPlus.user.js': ['.tmp/BreadfishPlusPlus.min.js'],
                    'userscript/BreadfishPlusPlus.meta.js': []
                }
            }
        },
        clean: {
            build: ['.tmp/**/*.*'],
        },
        "template-module": {
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
                    "src/templates/index.js": ["src/templates/*.html"]
                }
            }
        },
        less: {
            compile: {
                options: {
                    compress: true,
                    cleancss: true,
                    ieCompat: false,
                    strictMath: true,
                    report: 'gzip'
                },
                files: [{
                    expand: true,
                    cwd: 'src/styles/',
                    src: ['*.less'],
                    dest: '.tmp/css/',
                    ext: '.css'
                }]
            }
        },
        watch: {
            scripts: {
                files: ['src/**/*'],
                tasks: ['less', 'autoprefixer:build', 'concat:styles', 'template-module', 'browserify', 'uglify:dev', 'concat:userscript']
            }
        }
    });

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['less', 'autoprefixer:build', 'concat:styles', 'template-module', 'browserify', 'uglify:build', 'concat:userscript', 'clean']);
    grunt.registerTask('build-dev', ['less', 'autoprefixer:build', 'concat:styles', 'template-module', 'browserify', 'uglify:dev', 'concat:userscript']);
    grunt.registerTask('clean', ['clean']);
};