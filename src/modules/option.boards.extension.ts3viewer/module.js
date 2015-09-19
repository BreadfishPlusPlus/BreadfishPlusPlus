"use strict";

import {DefaultModule} from "../../api";
import React from "react";
const debug = require("debug")("option.boards.extension.ts3viewer");
import TS3ViewerTemplate from "./Template.jsx";

export default class TS3Viewer extends DefaultModule {
    constructor() {
        super();
        debug("Wird geladen...");

        this.register({
            "key": "option.boards.extension.ts3viewer.enabled",
            "name": "Teamspeak 3 Anzeige",
            "tab": "Einstellungen",
            "subtab": "Forenübersicht",
            "category": "Erweiterungen",
            "type": "toggle",
            "default": false,
            "description": "Fügt auf der Startseite eine Infobox hinzu, welche anzeigt wer gerade auf dem Teamspeak Server ist."
        });
        this.register({
            "key": "option.boards.extension.ts3viewer.refreshInterval",
            "type": "invis",
            "default": 60000
        });

        if (!this.isTemplate("tplBoardList")) {
            debug("Falsches template -> SKIP");
            return;
        }

        //const infobox = document.querySelector(".infoBoxList");
        const container = document.createElement("li");
        //container.className = "box32";
        document.querySelector(".infoBoxList").insertBefore(container, document.querySelector(".box32.statsInfoBox"));
        React.render(<TS3ViewerTemplate
            cacheLifetime={300000} // https://github.com/BreadfishPlusPlus/Teamspeak-Info#cache_lifetime
            debug={debug}
            domains={this.getDomains()}
            nickname={this.getUsername()}
            refreshInterval={this.storage.get("option.boards.extension.top5box.refreshInterval", 60000)}
        />, container);
    }
}
