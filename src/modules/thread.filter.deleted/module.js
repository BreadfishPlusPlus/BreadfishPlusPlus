"use strict";

import {DefaultModule} from "../../api";
import $ from "jquery";
const debug = require("debug")("B++:module:thread.filter.deleted");

export default class Module extends DefaultModule {
    constructor() {
        super();
        debug("Wird geladen...");

        this.register({
            "key": "option.thread.filter.deleted.enabled",
            "name": "Gelöschte Beiträge",
            "tab": "Einstellungen",
            "subtab": "Themenansicht",
            "category": "Filter",
            "type": "toggle",
            "options": ["Anzeigen", "Entfernen"],
            "default": false,
            "description": "Entfernt gelöschte Beiträge aus der Themenansicht."
        });

        if (!this.storage.get("option.thread.filter.deleted.enabled", false)) {
            debug("Deaktiviert -> SKIP");
            return;
        }

        if (!this.isTemplate("thread")) {
            debug("Falsches template -> SKIP");
            return;
        }

        this.removeDeletedPosts();
    }
    removeDeletedPosts() {
        $("article.wbbPostDeleted").remove();
    }
}
