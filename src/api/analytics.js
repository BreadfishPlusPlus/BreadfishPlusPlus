"use strict";

const IDENTIFIER = "bpp_tracker";
const debug = require("debug")("B++:Analytics");

let sendEvent;

try {

    window.ga("create", "UA-73093267-2", "auto", IDENTIFIER, {
        userId: window.WCF.User.userID,
        appVersion: BPP_VERSION,
        transport: "beacon"
    });

    const getTracker = () => window.ga.getByName(IDENTIFIER);

    getTracker().send("pageview");

    sendEvent = (_object) => {
        _object.hitCallback = () => {
            debug("Event send", _object);
        };
        return getTracker().send("event", _object);
    };
} catch (e) {
    sendEvent = () => {};
}

export default {
    sendEvent
};
