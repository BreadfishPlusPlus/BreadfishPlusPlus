"use strict";

import {DefaultModule} from "../../api";
const debug = require("debug")("B++:module:thread.extension.mobileSignature");

export default class Module extends DefaultModule {
    constructor() {
        super();
        debug("Wird geladen...");

        this.register({
            "key": "option.thread.extension.mobileSignature.enabled",
            "name": "Mobil-Signatur",
            "tab": "Einstellungen",
            "subtab": "Themenansicht",
            "category": "Erweiterungen",
            "type": "toggle",
            "default": false,
            "description": "Aktiviert die Signatur (für Mobile geräte)."
        });

        if (!this.isTemplate("tplThread")) {
            debug("Falsches template -> SKIP");
            return;
        }

        if (!this.storage.get("option.thread.extension.mobileSignature.enabled", false)) {
            debug("Deaktiviert -> SKIP");
            return;
        }

        this.addStyle(".message .messageBody .messageSignature", {
            display: "block"
        });
    }
}
