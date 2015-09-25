/*eslint no-console: 0*/
"use strict";

if (!window.localStorage) {
    throw new Error("Dein Browser unterstüzt kein LocalStorage. http://caniuse.com/#feat=namevalue-storage");
}
const namespace = "bpp_";
const debug = require("debug")("storage");

const set = function (key, value) {
    debug("set %j=%j", key, value);
    localStorage.setItem(namespace + key, JSON.stringify(value));
};

const setDefault = function (key, defaultValue) {
    if (!localStorage.getItem(namespace + key)) {
        debug("setDefault %j=%j", key, defaultValue);
        localStorage.setItem(namespace + key, JSON.stringify(defaultValue));
    }
};

const get = function (key, defaultValue) {
    let value = localStorage.getItem(namespace + key);
    try {
        value = JSON.parse(value);
    } catch(e) {
        debug(key, defaultValue, value);
        if (console && console.error) {
            console.error(e);
        }
    }
    return value || defaultValue;
};
export default {set, setDefault, get};
