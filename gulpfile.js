/*jslint node: true, stupid: true */
"use strict";

var gulp        = require('gulp');
var browserify  = require('browserify');
var source      = require('vinyl-source-stream');
var uglify      = require('gulp-uglify');
var fs          = require('fs');
var header      = require('gulp-header');
var rename      = require("gulp-rename");
var ejs         = require("gulp-ejs");
var insert      = require('gulp-insert');
var pkg         = require('./package.json');
var html2tpl    = require('gulp-html2tpl');
var concat      = require('gulp-concat');
var notify      = require("gulp-notify");


gulp.task('templates', function () {
    return gulp.src('./src/templates/*.html')
        .pipe(html2tpl('templates.js'))
        .pipe(insert.append('\nmodule.exports = templates;'))
        .pipe(gulp.dest('./.tmp/'));
});

gulp.task('browserify', ['templates'], function () {
    var b = browserify({
        entries: ['./BreadfishPlusPlus.js'],
        basedir: './src/',
        fullPaths: false,
        bundleExternal: true
    });

    b.transform('browserify-shim');
    b.transform('node-lessify');

    fs.readdirSync('./src/modules/').forEach(function (fileName) {
        b.add('./../src/modules/' + fileName);
    });

    b.require('./../.tmp/templates.js', {expose: 'templates'});

    return b.bundle({
        debug: true
    })
        .on('error', function (err) {
            console.log(err.toString());
            this.emit('end');
        })
        .pipe(source('BreadfishPlusPlus.js'))
        .pipe(gulp.dest('./.tmp/'));
});

gulp.task('uglify', ['browserify'], function () {
    return gulp.src('./.tmp/BreadfishPlusPlus.js')
        .pipe(uglify({
            output: {
                beautify: false
            },
            mangle: true,
            compress: true
        }))
        .pipe(gulp.dest('./.tmp/'));
});

gulp.task('beautify', ['browserify'], function () {
    return gulp.src('./.tmp/BreadfishPlusPlus.js')
        .pipe(uglify({
            output: {
                beautify: true
            },
            mangle: false,
            compress: false
        }))
        .pipe(gulp.dest('./.tmp/'));
});

gulp.task('userscript-dev', ['beautify'], function () {
    var meta = fs.readFileSync('./src/meta.js');

    //BreadfishPlusPlus.meta.js
    gulp.src('./src/meta.js')
        .pipe(ejs({
            pkg: pkg
        }))
        .pipe(rename('BreadfishPlusPlus.meta.js'))
        .pipe(gulp.dest('./out/userscript/'));

    //BreadfishPlusPlus.user.js
    return gulp.src('./.tmp/BreadfishPlusPlus.js')
        .pipe(insert.prepend('\nvar VERSION = "' + pkg.version + '";\n'))
        .pipe(header(meta, {
            pkg : pkg
        }))
        .pipe(rename('BreadfishPlusPlus.user.js'))
        .pipe(gulp.dest('./out/userscript/'))
        .pipe(notify("BreadfishPlusPlus.user.js generated"));
});

gulp.task('userscript', ['uglify'], function () {
    var meta = fs.readFileSync('./src/meta.js');

    //BreadfishPlusPlus.meta.js
    gulp.src('./src/meta.js')
        .pipe(ejs({
            pkg: pkg
        }))
        .pipe(rename('BreadfishPlusPlus.meta.js'))
        .pipe(gulp.dest('./out/userscript/'));

    //BreadfishPlusPlus.user.js
    return gulp.src('./.tmp/BreadfishPlusPlus.js')
        .pipe(insert.prepend('\nvar VERSION = "' + pkg.version + '";\n'))
        .pipe(header(meta, {
            pkg : pkg
        }))
        .pipe(rename('BreadfishPlusPlus.user.js'))
        .pipe(gulp.dest('./out/userscript/'))
        .pipe(notify("BreadfishPlusPlus.user.js generated"));
});

gulp.task('default', ['watch']);
gulp.task('build-dev', ['templates', 'browserify', 'beautify', 'userscript-dev']);
gulp.task('build', ['templates', 'browserify', 'uglify', 'userscript']);

gulp.task('watch', function () {
    gulp.watch(['./src/**/*'], ['build-dev']);
});

