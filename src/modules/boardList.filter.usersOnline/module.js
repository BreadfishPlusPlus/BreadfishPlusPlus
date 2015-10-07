"use strict";

import {DefaultModule} from "../../api";
import $ from "jquery";
const debug = require("debug")("B++:module:boardList.filter.usersOnline");

export default class Module extends DefaultModule {
    constructor() {
        super();
        debug("Wird geladen...");

        this.register({
            "key": "option.boardList.filter.usersOnline.enabled",
            "name": "Benutzer Online",
            "tab": "Einstellungen",
            "subtab": "Startseite",
            "category": "Filter",
            "type": "toggle",
            "options": ["Anzeigen", "Entfernen"],
            "default": false,
            "description": "Entfernt die Infobox auf der Startseite, die anzeigt, wer gerade online ist."
        });

        if (!this.isTemplate("boardList")) {
            debug("Falsches template -> SKIP");
            return;
        }

        if (!this.storage.get("option.boardList.filter.usersOnline.enabled", false)) {
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
