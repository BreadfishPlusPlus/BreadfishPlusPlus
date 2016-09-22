import {LOCALSTORAGE_PREFIX} from "./constants";
//import Analytics from "./analytics";
import _debug from "debug";
const log = _debug("bpp:storage.js");
import isUndefined from "lodash-es/isUndefined";
import isNull from "lodash-es/isNull";

export const set = (key, value) => {
    const keyName = `${LOCALSTORAGE_PREFIX}${key}`;
    log("set", {key, keyName, value});
    localStorage.setItem(keyName, JSON.stringify(value));
    /*Analytics.sendEvent({
        eventCategory: "option",
        eventAction: "change",
        eventLabel: key,
        eventValue: value
    });*/
};

export const setDefault = (key, defaultValue) => {
    const keyName = `${LOCALSTORAGE_PREFIX}${key}`;
    if (!localStorage.getItem(keyName)) {
        log("setDefault", {key, keyName, defaultValue});
        localStorage.setItem(keyName, JSON.stringify(defaultValue));
    }
};

export const get = (key, defaultValue) => {
    const keyName = `${LOCALSTORAGE_PREFIX}${key}`;
    let value = localStorage.getItem(keyName);
    try {
        value = JSON.parse(value);
    } catch(e) {
        log("catch", {key, keyName, defaultValue, value});
        if (console && console.error) {
            console.error(e);
        }
    }
    log("get", {key, keyName, value, defaultValue});
    return !isUndefined(value) && !isNull(value) ? value : defaultValue;
};

export const getAll = () => {
    let options = [];
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (!key.startsWith(LOCALSTORAGE_PREFIX)) {
            continue;
        }
        key = key.substr(LOCALSTORAGE_PREFIX.length);
        options.push({
            key,
            value: get(key)
        });
    }
    return options;
};
