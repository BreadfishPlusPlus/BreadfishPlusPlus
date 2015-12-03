/*eslint no-console: 0*/
"use strict";

if (!window.localStorage) {
    throw new Error("Dein Browser unterstüzt kein LocalStorage. http://caniuse.com/#feat=namevalue-storage");
}
const namespace = "bpp_";
const debug = require("debug")("B++:Storage");
import {isUndefined, isNull} from "lodash";

const set = function (key, value) {
    debug("set", {key, value});
    localStorage.setItem(namespace + key, JSON.stringify(value));
};

const setDefault = function (key, defaultValue) {
    if (!localStorage.getItem(namespace + key)) {
        debug("setDefault", {key, defaultValue});
        localStorage.setItem(namespace + key, JSON.stringify(defaultValue));
    }
};

const get = function (key, defaultValue) {
    let value = localStorage.getItem(namespace + key);
    try {
        value = JSON.parse(value);
    } catch(e) {
        debug("catch", {key, defaultValue, value});
        if (console && console.error) {
            console.error(e);
        }
    }
    debug("get", {key, value, defaultValue});
    return !isUndefined(value) && !isNull(value) ? value : defaultValue;
};

const getAll = function () {
    let options = [];
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (!key.startsWith(namespace)) {
            continue;
        }
        key = key.substr(namespace.length);
        options.push({
            key,
            value: get(key)
        });
    }
    return options;
};
export default {set, setDefault, get, getAll};
