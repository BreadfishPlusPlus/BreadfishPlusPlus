var CleanCSS = require('clean-css');

module.exports = function (grunt) {
    "use strict";

    grunt.initConfig({
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
                    cwd: 'src/common/less/',
                    src: ['*.less'],
                    dest: 'src/common/css/',
                    ext: '.min.css'
                }]
            }
        },
        concat: {
            cssHtml: {
                files: {
                    'src/common/js/templates.js': ['src/common/html/*.html', 'src/common/css/**/*.css']
                },
                options: {
                    banner: 'var Template = {\n    html: {},\n    css: {}\n};\n',
                    process: function (content, path) {
                        var name = path.match(/^src\/common\/(?:html|css)(?:\/lib)?\/([^.]+)\.(?:html|(?:min\.)?css)$/)[1],
                            process;
                        if (path.substr(-4) === 'html') {
                            content = JSON.stringify(content.toString().replace(/^\s+|\s+$/g, '').replace(/\s*\n\s*/g, ''));
                            process = 'Template.html["' + name + '"] = ' + content + ';';
                        } else {
                            content = new CleanCSS({
                                keepSpecialComments: 0
                            }).minify(content);
                            content = JSON.stringify(content.toString().replace(/^\s+|\s+$/g, ''));
                            process = 'Template.css["' + name + '"] = ' + content + ';';
                        }
                        return process;
                    }
                }
            },
        },
        shell: {
            buildChrome: {
                options: {
                    stdout: true
                },
                command: 'python D:\\kango\\kango.py build "%CD%" --no-pack --target chrome'
            },
            buildAll: {
                options: {
                    stdout: true
                },
                command: 'python D:\\kango\\kango.py build "%CD%"'
            }
        },
        copy: {
            chrome: {
                cwd: 'output/',
                src: 'breadfish_*.*.*.crx',
                dest: 'releases/chrome/',
                expand: true,
                rename: function (dest, src) {
                    return dest + src.substr(10);
                }
            },
            chromeLatest: {
                cwd: 'output/',
                src: 'breadfish_*.*.*.crx',
                dest: 'releases/chrome/',
                expand: true,
                rename: function (dest) {
                    return dest + 'latest.crx';
                }
            },
            opera: {
                cwd: 'output/',
                src: 'breadfish_*.*.*.crx',
                dest: 'releases/opera/',
                expand: true,
                rename: function (dest, src) {
                    return dest + src.substr(10);
                }
            },
            operaLatest: {
                cwd: 'output/',
                src: 'breadfish_*.*.*.crx',
                dest: 'releases/opera/',
                expand: true,
                rename: function (dest) {
                    return dest + 'latest.crx';
                }
            },
            firefox: {
                cwd: 'output/',
                src: 'breadfish_*.*.*.xpi',
                dest: 'releases/firefox/',
                expand: true,
                rename: function (dest, src) {
                    return dest + src.substr(10);
                }
            },
            firefoxLatest: {
                cwd: 'output/',
                src: 'breadfish_*.*.*.xpi',
                dest: 'releases/firefox/',
                expand: true,
                rename: function (dest) {
                    return dest + 'latest.xpi';
                }
            }
        },
        clean: {
            output: {
                src: ["output/*", "!output/chrome", "!output/safari"]
            }
        },
        watch: {
            default: {
                files: ['src/**'],
                tasks: ['less', 'concat', 'shell:buildChrome'],
                options: {
                    spawn: false
                }
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('less2css', ['less', 'concat']);
    grunt.registerTask('build', ['shell:buildAll', 'copy', 'clean']);
};