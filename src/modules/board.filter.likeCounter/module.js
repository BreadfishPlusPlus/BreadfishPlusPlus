"use strict";

import {DefaultModule} from "../../api";
import $ from "jquery";
const debug = require("debug")("B++:module:board.filter.likeCounter");

export default class Module extends DefaultModule {
    constructor() {
        super();
        debug("Wird geladen...");

        this.register({
            "key": "option.board.filter.likeCounter.enabled",
            "name": "Like-Counter",
            "tab": "Einstellungen",
            "subtab": "Forenansicht",
            "category": "Filter",
            "type": "toggle",
            "options": ["Anzeigen", "Entfernen"],
            "default": false,
            "description": "Entfernt den Like-Counter von Themen aus der Forenansicht."
        });

        if (!this.isTemplate("board")) {
            debug("Falsches template -> SKIP");
            return;
        }

        if (!this.storage.get("option.board.filter.likeCounter.enabled", false)) {
            debug("Deaktiviert -> SKIP");
            return;
        }

        this.removeLikeColumn();
    }
    removeLikeColumn() {
        debug("Like-Counter werden entfernt...");

        $(".wbbThreadList .table tr th.columnLikes, .wbbThreadList .table tr td.columnLikes").remove();
    }
}
