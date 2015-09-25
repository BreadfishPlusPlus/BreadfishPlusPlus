"use strict";

import {DefaultModule} from "../../api";
import $ from "jquery";
import Moment from "moment";
const debug = require("debug")("option.global.extension.timeFormat");

export default class Timeformat extends DefaultModule {
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

        window.WCF.Date.Time = () => {
            this.formatTime();
        };

        this.formatTime();
    }
    formatAbsolute(mom) {
        return mom.format("DD. MMMM YYYY, HH:mm");
    }
    formatHalfRelative(mom) {
        if (mom.isSame(Moment(), "day")) {
            return mom.format("[Heute,] HH:MM");
        } else if (mom.isSame(Moment().subtract(1, "days"), "day")) {
            return mom.format("[Gestern,] HH:MM");
        } else {
            return mom.format("DD. MMMM YYYY, HH:mm");
        }
    }
    formatTimeForElement(index, element) {
        const $element = $(element);
        const timestamp = ~~$element.attr("data-timestamp");
        const mom = Moment(timestamp * 1000);

        if (this.storage.get("option.global.extension.timeFormat", 0) === 1) {
            $element.text(this.formatHalfRelative(mom));
        } else if (this.storage.get("option.global.extension.timeFormat", 0) === 2) {
            $element.text(this.formatAbsolute(mom));
        }

        //if (mom.isSame(Moment(), "day")) {

        //}

    }
    formatTime() {
        $("time.datetime").each(this.formatTimeForElement.bind(this));
    }
}
