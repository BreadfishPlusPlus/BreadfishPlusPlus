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
                files: {
                    "src/common/css/alertify.css": "src/common/less/alertify.less",
                    "src/common/css/common.css": "src/common/less/common.less",
                    "src/common/css/highlight.css": "src/common/less/highlight.less",
                    "src/common/css/options.css": "src/common/less/options.less",
                    "src/common/css/postCreate.css": "src/common/less/postCreate.less",
                    "src/common/css/posts.css": "src/common/less/posts.less",
                    "src/common/css/tooltip.css": "src/common/less/tooltip.less",
                    "src/common/css/design_flat.css": "src/common/less/design_flat.less"
                }
            }
        },
        concat: {
            cssHtml: {
                files: {
                    'src/common/js/templates.js': ['src/common/html/*.html', 'src/common/css/*.css']
                },
                options: {
                    banner: 'var Template = {\n    html: {},\n    css: {}\n};\n',
                    process: function (content, path) {
                        var name = path.replace(/^.+\/|\..+$/g, '');
                        content = JSON.stringify(content.toString().replace(/^\s+|\s+$/g, '').replace(/\s*\n\s*/g, "\n"));
                        if (/\.css$/.test(path)) {
                            return 'Template.css[\'' + name + '\'] = ' + content + ';';
                        } else {
                            return 'Template.html[\'' + name + '\'] = ' + content + ';';
                        }
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
                src: ["output/*", "!output/chrome"]
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
    grunt.registerTask('less2css', ['less']);
    grunt.registerTask('build', ['shell:buildAll', 'copy', 'clean']);
};