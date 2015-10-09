"use strict";

import {DefaultModule} from "../../api";
import $ from "jquery";
const debug = require("debug")("B++:module:global.filter.unreadPostsCounter");

export default class Module extends DefaultModule {
    constructor() {
        super();
        debug("Wird geladen...");

        this.register({
            "key": "option.global.filter.unreadPostsCounter.enabled",
            "name": "\"Ungelesene Beiträge\"-Counter",
            "tab": "Einstellungen",
            "subtab": "Global",
            "category": "Filter",
            "type": "toggle",
            "options": ["Anzeigen", "Entfernen"],
            "default": false,
            "description": "Entfernt die Zahl neben dem \"Forum\" Menüpunkt."
        });

        if (!this.storage.get("option.global.filter.unreadPostsCounter.enabled", false)) {
            debug("Deaktiviert -> SKIP");
            return;
        }

        this.removePostCounter();
    }
    removePostCounter() {
        $("[data-menu-item=\"wbb.header.menu.board\"] .badge").remove();
    }
}
