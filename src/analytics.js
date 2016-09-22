import {VERSION, ANALYTICS_IDENTIFIER} from "./constants";
import _debug from "debug";
const log = _debug("bpp:analytics.js");

let sendEvent;

try {
    window.ga("create", "UA-73093267-2", "auto", ANALYTICS_IDENTIFIER, {
        userId: window.WCF.User.userID,
        appVersion: VERSION,
        transport: "beacon"
    });

    const getTracker = () => window.ga.getByName(ANALYTICS_IDENTIFIER);

    getTracker().send("pageview");

    sendEvent = (_object) => {
        _object.hitCallback = () => {
            log("Event send", _object);
        };
        return getTracker().send("event", _object);
    };
} catch (e) {
    sendEvent = () => {};
}

export default {
    sendEvent
};
