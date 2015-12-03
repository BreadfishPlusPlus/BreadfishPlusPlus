"use strict";

import {DefaultModule} from "../../api";
import $ from "jquery";
const debug = require("debug")("B++:module:thread.extension.codeExpand");

export default class Module extends DefaultModule {
    constructor() {
        super();
        debug("Wird geladen...");

        this.register({
            "key": "option.thread.extension.codeExpand.enabled",
            "name": "Quellcode ausklappen",
            "tab": "Einstellungen",
            "subtab": "Themenansicht",
            "category": "Erweiterungen",
            "type": "toggle",
            "default": false,
            "description": "Zeigt Quollcode-Boxen automatisch im ausgeklappten Zustand an."
        });

        if (!this.storage.get("option.thread.extension.codeExpand.enabled", false)) {
            debug("Deaktiviert -> SKIP");
            return;
        }

        this.expandCode();
    }
    expandCode() {
        $(".codeBox .codeBoxExpand").click();
    }
}
