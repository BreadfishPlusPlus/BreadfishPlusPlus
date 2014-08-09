/*jslint nomen: true*/
"use strict";

var _ = require('lib/underscore');

if (!window.localStorage) {
    throw new Error("Dein Browser unterstüzt kein LocalStorage. http://caniuse.com/#feat=namevalue-storage");
}

var get, set, setDefault;

set = function (key, value) {
    localStorage.setItem('bpp_' + key, Object.toJSON(value));
};
exports.set = set;

setDefault = function (key, defaultValue) {
    if (!localStorage.getItem('bpp_' + key)) {
        localStorage.setItem('bpp_' + key, Object.toJSON(defaultValue));
    }
};
exports.setDefault = setDefault;

get = function (key, defaultValue) {
    var item = localStorage.getItem('bpp_' + key);
    if (item) {
        return item.evalJSON();
    }
    return defaultValue || null;
};
exports.get = get;

/*module.exports = function () {
    var config, _get, _getAll, _set, _setObj, _setAll;

    if (!window.localStorage) {
        throw new Error("Dein Browser unterstüzt kein LocalStorage. http://caniuse.com/#feat=namevalue-storage");
    }
    config = JSON.parse(localStorage.getItem('bpp_options') || "{}");

    _get = function (keyPath, defaultValue) {
        var i,
            path = keyPath.split('.'),
            len = path.length,
            obj = config;
        for (i = 0; i < len; i += 1) {
            if (!obj || typeof obj !== 'object') {
                _set(keyPath, defaultValue);
                return defaultValue;
            }
            obj = obj[path[i]];
        }

        if (obj === undefined) {
            _set(keyPath, defaultValue);
            return defaultValue;
        }
        return obj;
    };

    _getAll = function () {
        return JSON.parse(localStorage.getItem('bpp_options') || "{}");
    };

    _setObj = function (obj, key, value) {
        if (key.length === 1) {
            obj[key[0]] = value;
        } else {
            if (!obj.hasOwnProperty(key[0])) {
                obj[key[0]] = {};
            }
            return _setObj(obj[key[0]], key.slice(1), value);
        }
    };

    _set = function (keyPath, value) {
        _setObj(config, keyPath.split("."), value);
        localStorage.setItem('bpp_options', JSON.stringify(config));
    };

    _setAll = function (json) {
        config = json;
        localStorage.setItem('bpp_options', JSON.stringify(config));
    };

    return {
        get: _get,
        set: _set,
        getAll: _getAll,
        setAll: _setAll
    };
};*/