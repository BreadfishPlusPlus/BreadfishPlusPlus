"use strict";

import {DefaultModule} from "../../api";
import $ from "jquery";
const debug = require("debug")("option.threads.filter.usersOnline");

export default class Statistics extends DefaultModule {
    constructor() {
        super();
        debug("Wird geladen...");

        this.register({
            "key": "option.threads.filter.usersOnline.enabled",
            "name": "Benutzer Online",
            "tab": "Einstellungen",
            "subtab": "Themenübersicht",
            "category": "Filter",
            "type": "toggle",
            "default": false,
            "description": "Entfernt die Infobox aus Themen, die anzeigt, wer gerade online ist."
        });

        if (!this.isTemplate("tplThread")) {
            debug("Falsches template -> SKIP");
            return;
        }

        if (!this.storage.get("option.threads.filter.usersOnline.enabled", false)) {
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
