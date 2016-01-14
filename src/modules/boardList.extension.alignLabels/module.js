//
"use strict";

import {DefaultModule} from "../../api";
import $ from "jquery";
const debug = require("debug")("B++:module:boardList.extension.alignLabels");

export default class Module extends DefaultModule {
    constructor() {
        super();
        debug("Wird geladen...");

        this.register({
            "key": "option.boardList.extension.alignLabels.enabled",
            "name": "Themen-Label Ausrichtung",
            "tab": "Einstellungen",
            "subtab": "Startseite",
            "category": "Erweiterungen",
            "type": "toggle",
            "default": false,
            "description": "Richtet die Themen-Label Linksbündig mit Ankündigung/Angepinnt/usw. aus."
        });

        if (!this.isTemplate("boardList")) {
            debug("Falsches template -> SKIP");
            return;
        }

        if (!this.storage.get("option.boardList.extension.alignLabels.enabled", false)) {
            debug("Deaktiviert -> SKIP");
            return;
        }

        this.alignLabels();
    }
    alignLabels() {
        debug("Themen-Label werden ausgerichtet...");
        $("#lastXBoardPosts .labelList li a").unwrap().unwrap();
    }
}
