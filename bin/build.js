#!/usr/bin/env node
var fs          = require('fs');
var _           = require('underscore');
var path        = require('path');
var browserify  = require('browserify');
var async       = require('async');
var uglify      = require('uglify-js');
var pkg         = require(__dirname + '/../package.json');

var staticPath = __dirname + '/../../static';

var libraries = [
    'underscore.min.js',
    'jquery.min.js',
    'jquery-ui.min.js',

    'Autolinker.min.js',
    'async.min.js',
    'desktop-notify-min.js',
    'highlight.min.js',
    'jquery.mousewheel.min.js',
    'jquery.withinViewport.min.js',
    'keyboard.min.js',
    'moment-with-locales.min.js',
    'tooltip.min.js'
];

async.series([
    /**
    * tmp dir
    **/
    function (callback) {
        console.log('erstelle Verzeichnisse');
        async.series([
            function (_callback) {
                console.log('    ./.tmp/    ...');
                fs.mkdir(__dirname + '/../.tmp/', function () {
                    console.log('    ./.tmp/    OK');
                    _callback(null);
                });
            },
            function (_callback) {
                console.log('    ./out/    ...');
                fs.mkdir(__dirname + '/../out/', function () {
                    console.log('    ./out/    OK');
                    _callback(null);
                });
            },
        ], callback);
    },

    /**
    * Templates
    **/
    function (callback) {
        console.log('erstelle templates.js');
        var templates = 'var templates = {};\n';
        console.log('    lese verzeichniss ' + __dirname + '/../src/templates/');
        fs.readdir(__dirname + '/../src/templates/', function (err, files) {
            if (err) {
                return callback(err);
            }
            async.each(files, function (fileName, _callback) {
                console.log('        lese datei ' + __dirname + '/../src/templates/' + fileName);
                fs.readFile(__dirname + '/../src/templates/' + fileName, {encoding: 'utf8'}, function (err, content) {
                    if (err) {
                        return _callback(err);
                    }
                    content = _.template(content).source;
                    content = content.replace(/\n|\t/gi, '');
                    var name = path.basename(fileName, path.extname(fileName));
                    templates += 'templates["' + name + '"] = ' + content + ';\n';
                    _callback(null);
                });
            }, function (err) {
                if (err) {
                    return callback(err);
                }
                console.log('    schreibe datei ' + __dirname + '/../.tmp/templates.js');
                templates += 'module.exports = templates;\n';
                fs.writeFile(__dirname + '/../.tmp/templates.js', templates, {encoding: 'utf8'}, callback);
            });
        });
    },

    /**
    * Browserify
    **/
    function (callback) {
        console.log('erstelle browserify bundle');
        fs.readdir(__dirname + '/../src/modules/', function (err, files) {
            var b = browserify({
                entries: ['./BreadfishPlusPlus.js'],
                basedir: __dirname + '/../src/',
                fullPaths: false,
                bundleExternal: true,
                debug: false
            });
            var writer = fs.createWriteStream(__dirname + '/../.tmp/BreadfishPlusPlus.js', {encoding: 'utf8'});
            b.transform('browserify-shim');
            b.transform('node-lessify');
            files.forEach(function (fileName) {
                b.add('./../src/modules/' + fileName);
            });
            b.require('./../.tmp/templates.js', {expose: 'templates'});
            b.bundle({
                debug: true
            }).pipe(writer);
            writer.on('finish', function() {
                console.log('    ' + __dirname + '/../.tmp/BreadfishPlusPlus.js gespeichert');
                return callback(null);
            });
        });
    },

    /**
    * Final Script
    **/
    function (callback) {
        console.log('erstelle script');
        async.waterfall([
            function (_callback) {
                console.log('    lese ' + __dirname + '/../libraries/');
                var userscript = '/**\n* DEPENDENCIES\n**/\n\n';
              
                async.map(libraries, function (fileName, __callback) {
                    console.log('        lese ' + __dirname + '/../libraries/' + fileName);
                    fs.readFile(__dirname + '/../libraries/' + fileName, {encoding: 'utf8'}, __callback);
                }, function (err, libraries) {
                    if (err) {
                        return _callback(err);
                    }
                    userscript += libraries.join('\n');
                    return _callback(null, userscript);
                });
            },
            function (userscript, _callback) {
                console.log('    lese ' + __dirname + '/../.tmp/BreadfishPlusPlus.js');
                userscript += '\n\n/**\n* USERSCRIPT\n**/\n';
                userscript += '\nvar VERSION = "' + pkg.version + '";';
                userscript += '\nvar DOMAIN = "' + pkg.domain + '";';
                userscript += '\nvar CDNDOMAIN = "' + pkg.cdndomain + '";\n';

                userscript += uglify.minify(__dirname + '/../.tmp/BreadfishPlusPlus.js', {
                    output: {
                        beautify: false
                    },
                    mangle: true,
                    compress: true
                }).code;

                _callback(null, userscript);
            }
        ], function (error, userscript) {
            if (error) {
                return callback(error);
            }
            console.log('schreibe ' + __dirname + '/../out/breadfishplusplus.js');
            //fs.writeFileSync(__dirname + '/../out/breadfishplusplus.js', userscript, {encoding: 'utf8'});
            fs.writeFileSync(staticPath + '/breadfishplusplus.js', userscript, {encoding: 'utf8'});
            callback(null);
        });
    }
], function (error) {
    if (error) {
        throw error;
    }
    console.log('Done');
});