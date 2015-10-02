"use strict";

import {DefaultModule} from "../../api";
import $ from "jquery";
const debug = require("debug")("B++:module:thread.filter.statistics");

export default class Module extends DefaultModule {
    constructor() {
        super();
        debug("Wird geladen...");

        this.register({
            "key": "option.thread.filter.statistics.enabled",
            "name": "Teilen-Box",
            "tab": "Einstellungen",
            "subtab": "Themenansicht",
            "category": "Filter",
            "type": "toggle",
            "options": ["Anzeigen", "Entfernen"],
            "default": false,
            "description": "Entfernt die Teilen-Optionen aus den Themen."
        });

        if (!this.isTemplate("tplThread")) {
            debug("Falsches template -> SKIP");
            return;
        }

        if (!this.storage.get("option.thread.filter.statistics.enabled", false)) {
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
