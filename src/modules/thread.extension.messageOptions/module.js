"use strict";

import {DefaultModule} from "../../api";
const debug = require("debug")("option.thread.extension.messageOptions");

export default class Module extends DefaultModule {
    constructor() {
        super();
        debug("Wird geladen...");

        this.register({
            "key": "option.thread.extension.messageOptions.enabled",
            "name": "Beitragsoptionen dauerhaft anzeigen",
            "tab": "Einstellungen",
            "subtab": "Themenansicht",
            "category": "Erweiterungen",
            "type": "toggle",
            "default": false,
            "description": "Zeit die Beitragsoptionen (Bearbeiten, Liken, etc.) dauerhaft an."
        });

        if (!this.storage.get("option.thread.extension.messageOptions.enabled", false)) {
            debug("Deaktiviert -> SKIP");
            return;
        }

        this.showHiddenButtons();
    }
    showHiddenButtons() {
        this.addStyle(".message .messageOptions nav", {opacity: 1});
    }
}
