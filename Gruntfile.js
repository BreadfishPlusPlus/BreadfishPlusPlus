module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jslint: {
            development: {
                src: ['source/**/*.js'],
                directives: {
                    browser: true,
                    newcap: true,
                    devel: true,
                    unparam: true,
                    predef: ['$', 'addEventListener', 'GM_log', 'GM_notification', 'GM_info', 'GM_openInTab', 'GM_getValue', 'GM_setValue', 'GM_xmlhttpRequest', 'GM_listValues', 'GM_addStyle', 'BPPUtils', 'DefaultOptions', 'Smilies', 'Template', 'unsafeWindow']
                },
                options: {
                    failOnError: true
                }
            }
        },
        uglify: {
            defaultOptions: {
                files: {
                    'compiled/defaultOptions.js': ['source/defaultOptions.js']
                }
            },
            smilies: {
                files: {
                    'compiled/smilies.js': ['source/smilies.js']
                }
            }
        },
        concat: {
            js: {
                options: {
                    separator: '\n'
                },
                src: ['source/BPP.js', 'source/js/*.js'],
                dest: 'compiled/userscript.js'
            },
            cssHtml: {
                files: {
                    'compiled/templates.js': ['source/html/*.html', 'source/css/*.css']
                },
                options: {
                    banner: '\nvar Template = { html: {}, css: {} };\n',
                    process: function(content, path) {
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
            userscript: {
                options: {
                    separator: '\n',
                    banner: grunt.file.read('source/meta.js')
                },
                files: {
                    'dist/BreadfishPlusPlus.user.js': ['compiled/templates.js', 'compiled/defaultOptions.js', 'compiled/smilies.js', 'compiled/userscript.js', 'compiled/css.js'],
                    'dist/BreadfishPlusPlus.meta.js': []
                }
            },
        },
        watch: {
            development: {
                files: ['source/**/*.*'],
                tasks: ['jslint', 'uglify', 'concat', 'clean'],
                options: {
                    spawn: false
                }
            },
        },
        clean: {
            build: ['compiled'],
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-jslint');

    grunt.registerTask('default', ['watch']);
};