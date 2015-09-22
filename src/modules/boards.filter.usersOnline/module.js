"use strict";

import {DefaultModule} from "../../api";
import $ from "jquery";
const debug = require("debug")("option.boards.filter.usersOnline");

export default class Statistics extends DefaultModule {
    constructor() {
        super();
        debug("Wird geladen...");

        this.register({
            "key": "option.boards.filter.usersOnline.enabled",
            "name": "Benutzer Online",
            "tab": "Einstellungen",
            "subtab": "Forenübersicht",
            "category": "Filter",
            "type": "toggle",
            "options": ["Anzeigen", "Entfernen"],
            "default": false,
            "description": "Entfernt die Infobox auf der Startseite und in Foren, die anzeigt, wer gerade online ist."
        });

        if (!this.isTemplate("tplBoardList") && !this.isTemplate("tplBoard")) {
            debug("Falsches template -> SKIP");
            return;
        }

        if (!this.storage.get("option.boards.filter.usersOnline.enabled", false)) {
            debug("Deaktiviert -> SKIP");
            return;
        }

        this.removeStatisticBox();
    }
    removeStatisticBox() {
        debug("Benutzer Online wird etnfernt...");
        $(".box32.usersOnlineInfoBox").remove();

        if ($(".containerList.infoBoxList").is(":empty")) {
            $(".containerList.infoBoxList").parent(".container.marginTop").remove();
        }
    }
}
