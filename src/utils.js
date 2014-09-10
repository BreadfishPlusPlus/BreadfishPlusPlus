/*jslint nomen: true*/
/*globals unsafeWindow*/
"use strict";

var _           = require('lib/underscore');
var $           = require('lib/jquery');
var moment      = require('lib/moment');
var storage     = require('./storage');

var log = {
    error: function () {
        var args = Array.prototype.slice.call(arguments, 0);
        args.splice(0, 0, "background:#4d5460;color:#ff4136;border-top:1px solid #343a45;border-bottom:1px solid #343a45");
        args.splice(0, 0, "background:#4d5460;color:#ff4136;border-top:1px solid #343a45;border-bottom:1px solid #343a45");
        args.splice(0, 0, "background:#4d5460;color:#FFF;border-top:1px solid #343a45;border-bottom:1px solid #343a45");
        args.splice(0, 0, "background:#4d5460;color:#ff4136;border-top:1px solid #343a45;border-left:1px solid #343a45;border-bottom:1px solid #343a45");
        args.splice(0, 0, "%c B%creadfish%c++ %c[ERROR] ");
        console.log.apply(console, args);
    },
    debug: function () {
        if (storage.get('option.debugmode', false)) {
            var args = Array.prototype.slice.call(arguments, 0);
            args.splice(0, 0, "background:#4d5460;color:#FF851B;border-top:1px solid #343a45;border-bottom:1px solid #343a45");
            args.splice(0, 0, "background:#4d5460;color:#ff4136;border-top:1px solid #343a45;border-bottom:1px solid #343a45");
            args.splice(0, 0, "background:#4d5460;color:#FFF;border-top:1px solid #343a45;border-bottom:1px solid #343a45");
            args.splice(0, 0, "background:#4d5460;color:#ff4136;border-top:1px solid #343a45;border-left:1px solid #343a45;border-bottom:1px solid #343a45");
            args.splice(0, 0, "%c B%creadfish%c++ %c[DEBUG] ");
            console.log.apply(console, args);
        }
    }
};
exports.log = log;

var getParameterByName = function (name, from) { //http://stackoverflow.com/a/901144
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(from);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};
exports.getParameterByName = getParameterByName;

var getQuery = function (name) {
    return getParameterByName(name, document.URL) || null;
};
exports.getQuery = getQuery;

var parseWBBTimeFormat = function (str) {
    if (str[0] === '(' && str.slice(-1) === ')') {
        str = str.slice(1, -1);
    }
    if (str.indexOf('Heute') > -1) {
        return moment(str, "[Heute, ]HH:mm");
    }
    if (str.indexOf('Gestern') > -1) {
        var _m = moment(str, "[Gestern, ]HH:mm");
        _m.subtract('days', 1);
        return _m;
    }
    return moment(str, "DD.MM.YYYY[, ]HH:mm");
};
exports.parseWBBTimeFormat = parseWBBTimeFormat;

var formatWBBTimeFormat = function (_m) {
    if (_m.isSame(moment(), 'day')) {
        return _m.format("[Heute, ]HH:mm");
    }
    if (_m.isSame(moment().subtract('days', 1), 'day')) {
        return _m.format("[Gestern, ]HH:mm");
    }
    return _m.format("DD.MM.YYYY[, ]HH:mm");
};
exports.formatWBBTimeFormat = formatWBBTimeFormat;

var templateName = null;
var getTemplateName = function () {
    if (!templateName) {
        templateName = $('body').attr('id');
    }
    return templateName;
};
exports.getTemplateName = getTemplateName;

var isTemplate = function (names) {
    names = _.isArray(names) ? names : [names];
    return names.indexOf(getTemplateName()) > -1;
};
exports.isTemplate = isTemplate;

var getSecurityToken = function () {
    return this.getParameterByName('t', $('#userMenuLogout > a').attr('href'));
};
exports.getSecurityToken = getSecurityToken;

var getWindow = function () {
    return unsafeWindow || window;
};
exports.getWindow = getWindow;