var _           = require('lib/underscore');
var $           = require('lib/jquery');
var moment      = require('lib/moment');
var storage     = require('./storage');

var log = {
    error: function () {
        var args = Array.prototype.slice.call(arguments, 0);
        args.splice(0, 0, 'background:#4d5460;color:#ff4136;border-top:1px solid #343a45;border-bottom:1px solid #343a45');
        args.splice(0, 0, 'background:#4d5460;color:#ff4136;border-top:1px solid #343a45;border-bottom:1px solid #343a45');
        args.splice(0, 0, 'background:#4d5460;color:#FFF;border-top:1px solid #343a45;border-bottom:1px solid #343a45');
        args.splice(0, 0, 'background:#4d5460;color:#ff4136;border-top:1px solid #343a45;border-left:1px solid #343a45;border-bottom:1px solid #343a45');
        args.splice(0, 0, '%c B%creadfish%c++ %c[ERROR] ');
        console.log.apply(console, args);
    },
    debug: function () {
        if (storage.get('option.debugmode', false)) {
            var args = Array.prototype.slice.call(arguments, 0);
            args.splice(0, 0, 'background:#4d5460;color:#FF851B;border-top:1px solid #343a45;border-bottom:1px solid #343a45');
            args.splice(0, 0, 'background:#4d5460;color:#ff4136;border-top:1px solid #343a45;border-bottom:1px solid #343a45');
            args.splice(0, 0, 'background:#4d5460;color:#FFF;border-top:1px solid #343a45;border-bottom:1px solid #343a45');
            args.splice(0, 0, 'background:#4d5460;color:#ff4136;border-top:1px solid #343a45;border-left:1px solid #343a45;border-bottom:1px solid #343a45');
            args.splice(0, 0, '%c B%creadfish%c++ %c[DEBUG] ');
            console.log.apply(console, args);
        }
    }
};
exports.log = log;

var getParameterByName = function (name, from) { //http://stackoverflow.com/a/901144
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'), results = regex.exec(from);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
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
        return moment(str, '[Heute, ]HH:mm');
    }
    if (str.indexOf('Gestern') > -1) {
        var _m = moment(str, '[Gestern, ]HH:mm');
        _m.subtract('days', 1);
        return _m;
    }
    return moment(str, 'DD.MM.YYYY[, ]HH:mm');
};
exports.parseWBBTimeFormat = parseWBBTimeFormat;

var formatWBBTimeFormat = function (_m, html) {
    html = html || false;
    if (_m.isSame(moment(), 'day')) {
        return _m.format(html ? '[<b>Heute</b>, ]HH:mm' : '[Heute, ]HH:mm');
    }
    if (_m.isSame(moment().subtract('days', 1), 'day')) {
        return _m.format(html ? '[<b>Gestern</b>, ]HH:mm' : '[Gestern, ]HH:mm');
    }
    return _m.format('DD.MM.YYYY[, ]HH:mm');
};
exports.formatWBBTimeFormat = formatWBBTimeFormat;

var humanReadableTimespan = function (ms) {
    var str = '';
    if (moment.duration(ms).years() > 0) {
        str += (moment.duration(ms).years() + ' Jahr' + (moment.duration(ms).years() === 1 ? '' : 'en') + ', ');
    }
    if (moment.duration(ms).months() > 0) {
        str += (moment.duration(ms).months() + ' Monat' + (moment.duration(ms).months() === 1 ? '' : 'en') + ', ');
    }
    if (moment.duration(ms).days() > 0 || str.length > 0) {
        str += (moment.duration(ms).days() + ' Tag' + (moment.duration(ms).days() === 1 ? '' : 'en') + ', ');
    }
    if (moment.duration(ms).hours() > 0 || str.length > 0) {
        str += (moment.duration(ms).hours() + ' Stunde' + (moment.duration(ms).hours() === 1 ? '' : 'n') + ', ');
    }
    if (moment.duration(ms).minutes() > 0 || str.length > 0) {
        str += (moment.duration(ms).minutes() + ' Minute' + (moment.duration(ms).minutes() === 1 ? '' : 'n') + ', ');
    }
    if (moment.duration(ms).seconds() > 0 || str.length > 0) {
        str += (moment.duration(ms).seconds() + ' Sekunde' + (moment.duration(ms).seconds() === 1 ? '' : 'n') + ', ');
    }
    return str.slice(0, -2);
};
exports.humanReadableTimespan = humanReadableTimespan;

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