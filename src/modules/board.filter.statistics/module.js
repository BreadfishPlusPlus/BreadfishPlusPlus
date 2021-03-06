"use strict";

import {DefaultModule} from "../../api";
import $ from "jquery";
const debug = require("debug")("B++:module:board.filter.statistics");

export default class Module extends DefaultModule {
    constructor() {
        super();
        debug("Wird geladen...");

        this.register({
            "key": "option.board.filter.statistics.enabled",
            "name": "Statistik",
            "tab": "Einstellungen",
            "subtab": "Forenansicht",
            "category": "Filter",
            "type": "toggle",
            "options": ["Anzeigen", "Entfernen"],
            "default": false,
            "description": "Entfernt die Infobox aus Foren, die die Forenstatistik anzeigt."
        });

        if (!this.isTemplate("board")) {
            debug("Falsches template -> SKIP");
            return;
        }

        if (!this.storage.get("option.board.filter.statistics.enabled", false)) {
            debug("Deaktiviert -> SKIP");
            return;
        }

        this.removeStatisticBox();
    }
    removeStatisticBox() {
        debug("Forenstatistik wird entfernt...");
        $(".box32.statsInfoBox").remove();

        if ($(".containerList.infoBoxList").is(":empty")) {
            $(".containerList.infoBoxList").parent(".container.marginTop").remove();
        }
    }
}
