"use strict";

import {DefaultModule} from "../../api";
import $ from "jquery";
const debug = require("debug")("B++:module:thread.filter.userTitle");

export default class Module extends DefaultModule {
    constructor() {
        super();
        debug("Wird geladen...");

        this.register({
            "key": "option.thread.filter.userTitle.enabled",
            "name": "Benutzertitel",
            "tab": "Einstellungen",
            "subtab": "Themenansicht",
            "category": "Filter",
            "type": "toggle",
            "options": ["Anzeigen", "Entfernen"],
            "default": false,
            "description": "Entfernt den Benutzertitel eines jeden Benutzers aus der Themenansicht."
        });

        if (!this.storage.get("option.thread.filter.userTitle.enabled", false)) {
            debug("Deaktiviert -> SKIP");
            return;
        }

        if (!this.isTemplate("thread")) {
            debug("Falsches template -> SKIP");
            return;
        }

        this.removeUserRank();
    }
    removeUserRank() {
        $("article.wbbPost .userTitle").remove();
    }
}
