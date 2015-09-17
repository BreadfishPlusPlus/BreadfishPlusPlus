"use strict";

if (!window.localStorage) {
    throw new Error("Dein Browser unterstüzt kein LocalStorage. http://caniuse.com/#feat=namevalue-storage");
}

const debug = require("debug")("storage");

const set = function (key, value) {
    debug("set %j=%j", key, value);
    localStorage.setItem("bpp_" + key, JSON.stringify(value));
};

const setDefault = function (key, defaultValue) {
    if (!localStorage.getItem("bpp_" + key)) {
        debug("setDefault %j=%j", key, defaultValue);
        localStorage.setItem("bpp_" + key, JSON.stringify(defaultValue));
    }
};

const get = function (key, defaultValue) {
    let item = localStorage.getItem("bpp_" + key);
    if (item) {
        item = JSON.parse(item);
        debug("get %j(%j)=%j", key, defaultValue, item);
        return item;
    }
    debug("get %j(%j)=%j", key, defaultValue, defaultValue || null);
    return defaultValue || null;
};
export default {set, setDefault, get};
