"use strict";

import {DefaultModule} from "../../api";
import $ from "jquery";
const debug = require("debug")("B++:module:board.filter.deleted");

export default class Module extends DefaultModule {
    constructor() {
        super();
        debug("Wird geladen...");

        this.register({
            "key": "option.board.filter.deleted.enabled",
            "name": "Gelöschte Themen",
            "tab": "Einstellungen",
            "subtab": "Forenansicht",
            "category": "Filter",
            "type": "toggle",
            "options": ["Anzeigen", "Entfernen"],
            "default": false,
            "description": "Entfernt gelöschte Themen aus der Forenansicht."
        });

        if (!this.storage.get("option.board.filter.deleted.enabled", false)) {
            debug("Deaktiviert -> SKIP");
            return;
        }

        if (!this.isTemplate("board")) {
            debug("Falsches template -> SKIP");
            return;
        }

        this.removeDeletedThreads();
    }
    removeDeletedThreads() {
        $(".wbbThreadList > table > tbody > tr.wbbThread.messageDeleted").remove();
    }
}
