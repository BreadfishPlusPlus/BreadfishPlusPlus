"use strict";

const IDENTIFIER = "bpp_tracker";
const debug = require("debug")("B++:Analytics");

window.ga("create", "UA-73093267-2", "auto", IDENTIFIER, {
    userId: window.WCF.User.userID,
    appVersion: BPP_VERSION,
    transport: "beacon"
});

const getTracker = () => window.ga.getByName(IDENTIFIER);

getTracker().send("pageview");

const sendEvent = (_object) => {
    _object.hitCallback = () => {
        debug("Event send", _object);
    };
    return getTracker().send("event", _object);
};

export default {
    getTracker,
    sendEvent
};
