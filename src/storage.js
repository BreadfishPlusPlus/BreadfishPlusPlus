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