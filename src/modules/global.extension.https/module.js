"use strict";

import {DefaultModule} from "../../api";
const debug = require("debug")("B++:module:global.extension.https");

export default class Module extends DefaultModule {
    constructor() {
        super();
        debug("Wird geladen...");

        this.register({
            "key": "option.global.extension.https.enabled",
            "name": "HTTPS Verschlüsselung",
            "tab": "Einstellungen",
            "subtab": "Global",
            "category": "Erweiterungen",
            "type": "toggle",
            "default": false,
            "description": "Leitet automatisch auf HTTPS um wenn das Forum über HTTP besucht wird."
        });

        if (!this.storage.get("option.global.extension.https.enabled", false)) {
            debug("Deaktiviert -> SKIP");
            return;
        }

        if (!this.isHTTPS()) {
            this.redirectToHTTPS();
        }
    }
    isHTTPS() {
        return window.location.protocol === "https:";
    }
    redirectToHTTPS() {
        debug("Leite auf HTTPS um...");
        window.location.href = "https:" + window.location.href.substring(window.location.protocol.length);
    }
}
