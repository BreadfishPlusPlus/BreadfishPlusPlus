"use strict";

import {DefaultModule} from "../../api";
import $ from "jquery";
import Moment from "moment";
const debug = require("debug")("B++:module:global.extension.timeFormat");

export default class Module extends DefaultModule {
    constructor() {
        super();
        debug("Wird geladen...");

        this.register({
            "key": "option.global.extension.timeFormat",
            "name": "Zeitformat",
            "tab": "Einstellungen",
            "subtab": "Global",
            "category": "Erweiterungen",
            "type": "select",
            "options": [
                {name: "Relative Zeit (Vor 2 Stunden; Mittwoch, 12:01; 1. April 2015)", value: 0},
                {name: "Halb-Relative Zeit (Heute, 12:01; Gestern, 12:01; 01. April 2015, 12:01)", value: 1},
                {name: "Absolute Zeit (01. April 2015, 12:01)", value: 2}
            ],
            "default": 0,
            "description": "Ändert das Zeitformat im ganzen Forum."
        });

        if (!this.storage.get("option.global.extension.timeFormat", 0)) {
            debug("Deaktiviert -> SKIP");
            return;
        }

        this.wcf.Date.Time = () => {
            this.formatTime();
        };

        this.formatTime();

        this.wcf.DOMNodeInsertedHandler.addCallback("WCF.Date.Time", () => {
            this.formatTime();
        });
    }
    formatAbsolute(mom) {
        return mom.format("DD. MMMM YYYY, HH:mm");
    }
    formatHalfRelative(mom) {
        if (mom.isSame(Moment(), "day")) {
            return mom.format("[Heute,] HH:mm");
        } else if (mom.isSame(Moment().subtract(1, "days"), "day")) {
            return mom.format("[Gestern,] HH:mm");
        } else {
            return mom.format("DD. MMMM YYYY, HH:mm");
        }
    }
    formatTimeForElement(index, element) {
        const option = this.storage.get("option.global.extension.timeFormat", 0);
        const $element = $(element);
        const timestamp = ~~$element.attr("data-timestamp");
        const mom = Moment(timestamp * 1000);

        if (option === 1) {
            $element.text(this.formatHalfRelative(mom));
        } else if (option === 2) {
            $element.text(this.formatAbsolute(mom));
        }
    }
    formatTime() {
        $("time.datetime").each(this.formatTimeForElement.bind(this));
    }
}
