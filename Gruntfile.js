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
                    "src/common/css/tooltip.css": "src/common/less/tooltip.less"
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
        watch: {
            less2css: {
                files: ['src/common/less/*.less', '!src/common/less/bless.less'],
                tasks: ['less'],
                options: {
                    spawn: false
                }
            },
            template: {
                files: ['src/common/css/*.css', 'src/common/html/*.html'],
                tasks: ['concat'],
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

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('less2css', ['less']);
};