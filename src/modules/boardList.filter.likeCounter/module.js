"use strict";

import {DefaultModule} from "../../api";
import $ from "jquery";
const debug = require("debug")("B++:module:boardList.filter.likeCounter");

export default class Module extends DefaultModule {
    constructor() {
        super();
        debug("Wird geladen...");

        this.register({
            "key": "option.boardList.filter.likeCounter.enabled",
            "name": "Like-Counter",
            "tab": "Einstellungen",
            "subtab": "Startseite",
            "category": "Filter",
            "type": "toggle",
            "options": ["Anzeigen", "Entfernen"],
            "default": false,
            "description": "Entfernt den Like-Counter von Themen aus der Startseite."
        });

        if (!this.isTemplate("boardList")) {
            debug("Falsches template -> SKIP");
            return;
        }

        if (!this.storage.get("option.boardList.filter.likeCounter.enabled", false)) {
            debug("Deaktiviert -> SKIP");
            return;
        }

        this.removeLikeColumn();
    }
    removeLikeColumn() {
        debug("Like-Counter werden etnfernt...");

        $(".wbbThreadList .table tr th.columnLikes, .wbbThreadList .table tr td.columnLikes").remove();
    }
}
