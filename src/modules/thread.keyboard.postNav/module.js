"use strict";

import {DefaultModule} from "../../api";
const debug = require("debug")("B++:module:thread.keyboard.postNav");
//import KeyboardJS from "keyboardjs";

export default class Module extends DefaultModule {
    constructor() {
        super();
        debug("Wird geladen...");

        this.register({
            "key": "option.thread.keyboard.postNav.postPrevious",
            "name": "Vorheriger Beitrag",
            "tab": "Tastaturnavigation",
            "subtab": "Themenansicht",
            "category": "Beiträge",
            "type": "keyboard",
            "default": null,
            "description": "Zum vorherigen Beitrag scrollen."
        });

        this.register({
            "key": "option.thread.keyboard.postNav.postNext",
            "name": "Nächster Beitrag",
            "tab": "Tastaturnavigation",
            "subtab": "Themenansicht",
            "category": "Beiträge",
            "type": "keyboard",
            "default": null,
            "description": "Zum nächsten Beitrag scrollen."
        });
    }
}
