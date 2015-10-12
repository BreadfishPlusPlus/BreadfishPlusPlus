"use strict";

import {DefaultModule} from "../../api";
import $ from "jquery";
const debug = require("debug")("B++:module:thread.filter.likedUsers");

export default class Module extends DefaultModule {
    constructor() {
        super();
        debug("Wird geladen...");

        this.register({
            "key": "option.thread.filter.likedUsers.enabled",
            "name": "Gelikte User",
            "tab": "Einstellungen",
            "subtab": "Themenansicht",
            "category": "Filter",
            "type": "toggle",
            "options": ["Anzeigen", "Entfernen"],
            "default": false,
            "description": "Entfernt die Anzeige der Benutzer, die einen Beitrag geliked haben."
        });

        if (!this.storage.get("option.thread.filter.likedUsers.enabled", false)) {
            debug("Deaktiviert -> SKIP");
            return;
        }

        if (!this.isTemplate("thread")) {
            debug("Falsches template -> SKIP");
            return;
        }

        $("p.likesSummary.messageFooterNote>span.pointer:contains('gefällt das')").parent().remove();
    }
}
