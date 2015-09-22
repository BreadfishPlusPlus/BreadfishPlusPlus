"use strict";

import {DefaultModule} from "../../api";
import $ from "jquery";
const debug = require("debug")("option.boards.filter.statistics");

export default class Statistics extends DefaultModule {
    constructor() {
        super();
        debug("Wird geladen...");

        this.register({
            "key": "option.boards.filter.statistics.enabled",
            "name": "Statistik",
            "tab": "Einstellungen",
            "subtab": "Forenübersicht",
            "category": "Filter",
            "type": "toggle",
            "options": ["Anzeigen", "Entfernen"],
            "default": false,
            "description": "Entfernt die Infobox auf der Startseite und in Foren, die die Forenstatistik anzeigt."
        });

        if (!this.isTemplate("tplBoardList") && !this.isTemplate("tplBoard")) {
            debug("Falsches template -> SKIP");
            return;
        }

        if (!this.storage.get("option.boards.filter.statistics.enabled", false)) {
            debug("Deaktiviert -> SKIP");
            return;
        }

        this.removeStatisticBox();
    }
    removeStatisticBox() {
        debug("Forenstatistik wird etnfernt...");
        $(".box32.statsInfoBox").remove();

        if ($(".containerList.infoBoxList").is(":empty")) {
            $(".containerList.infoBoxList").parent(".container.marginTop").remove();
        }
    }
}
