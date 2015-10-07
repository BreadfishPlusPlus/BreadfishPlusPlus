"use strict";

import {DefaultModule} from "../../api";
import $ from "jquery";
const debug = require("debug")("B++:module:thread.filter.usersOnline");

export default class Module extends DefaultModule {
    constructor() {
        super();
        debug("Wird geladen...");

        this.register({
            "key": "option.thread.filter.usersOnline.enabled",
            "name": "Benutzer Online",
            "tab": "Einstellungen",
            "subtab": "Themenansicht",
            "category": "Filter",
            "type": "toggle",
            "default": false,
            "options": ["Anzeigen", "Entfernen"],
            "description": "Entfernt die Infobox aus Themen, die anzeigt, wer gerade online ist."
        });

        if (!this.isTemplate("thread")) {
            debug("Falsches template -> SKIP");
            return;
        }

        if (!this.storage.get("option.thread.filter.usersOnline.enabled", false)) {
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
