"use strict";

import {DefaultModule} from "../../api";
import $ from "jquery";
const debug = require("debug")("option.threads.filter.statistics");

export default class Statistics extends DefaultModule {
    constructor() {
        super();
        debug("Wird geladen...");

        this.register({
            "key": "option.threads.filter.statistics.enabled",
            "name": "Teilen-Box",
            "tab": "Einstellungen",
            "subtab": "Themenübersicht",
            "category": "Filter",
            "type": "toggle",
            "default": false,
            "description": "Entfernt die Teilen-Optionen aus den Themen."
        });

        if (!this.isTemplate("tplThread")) {
            debug("Falsches template -> SKIP");
            return;
        }

        if (!this.storage.get("option.threads.filter.statistics.enabled", false)) {
            debug("Deaktiviert -> SKIP");
            return;
        }

        this.removeStatisticBox();
    }
    removeStatisticBox() {
        debug("Teilen-Box wird etnfernt...");
        $(".box32.shareInfoBox").remove();

        if ($(".containerList.infoBoxList").is(":empty")) {
            $(".containerList.infoBoxList").parent(".container.marginTop").remove();
        }
    }
}
