"use strict";

import {DefaultModule} from "../../api";
import $ from "jquery";
const debug = require("debug")("B++:module:global.fix.toTopLink");

export default class Module extends DefaultModule {
    constructor() {
        super();
        debug("Wird geladen...");

        this.register({
            "key": "option.global.fix.toTopLink.enabled",
            "name": "Zum Seitenanfang",
            "tab": "Einstellungen",
            "subtab": "Global",
            "category": "Fix",
            "type": "toggle",
            "default": false,
            "description": `Zeigt den "Zum Seitenanfang"-Pfeil im Footer wieder an (Nur im "breadfish.de #2"-Design)`
        });

        if (!this.storage.get("option.global.fix.toTopLink.enabled", false)) {
            debug("Deaktiviert -> SKIP");
            return;
        }

        if (this.isCorrectDesign()) {
            this.showArrow();
        }
    }
    isCorrectDesign() {
        return $(`link[rel="stylesheet"][href*="style-9.css"]`).length > 0;
    }
    showArrow() {
        $("#toTopLink a .icon").css({
            display: "inline-block",
            color: "#f0f0f0"
        });
    }
}
