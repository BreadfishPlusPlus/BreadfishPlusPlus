"use strict";

import {DefaultModule} from "../../api";
import React from "react";
import Superagent from "superagent";
import $ from "jquery";
const debug = require("debug")("option.boardList.extension.top5box");
import Top5BoxTemplate from "./Template.jsx";

export default class Top5Box extends DefaultModule {
    constructor() {
        super();
        debug("Wird geladen...");

        this.register({
            "key": "option.boardList.extension.top5box.enabled",
            "name": "\"Die letzten 10 Beiträge\"-Aktualisierung",
            "tab": "Einstellungen",
            "subtab": "Startseite",
            "category": "Erweiterungen",
            "type": "toggle",
            "default": false,
            "description": "Aktualisiert die \"Die letzten 10 Beiträge\"-Box auf der Startseite automatisch in regelmäßigen abständen."
        });
        this.register({
            "key": "option.boardList.extension.top5box.refreshInterval",
            "type": "invis",
            "default": 60000
        });

        if (!this.isTemplate("tplBoardList")) {
            debug("Falsches template -> SKIP");
            return;
        }

        if (!this.storage.get("option.boardList.extension.top5box.enabled", false)) {
            debug("Deaktiviert -> SKIP");
            return;
        }

        this.refreshInterval = this.storage.get("option.boardList.extension.top5box.refreshInterval", 60000);
        this.refreshPostsInterval = setInterval(() => this.refreshPosts(), this.refreshInterval);

        const containerHead = document.querySelector(".lastXPosts header");
        containerHead.style.position = "relative";
        const container = document.createElement("div");
        container.style.position = "absolute";
        container.style.top = "12px";
        container.style.right = "10px";
        container.style.fontWeight = "bold";
        containerHead.appendChild(container);
        this.template = React.render(<Top5BoxTemplate
            refreshInterval={this.refreshInterval}
            refreshPosts={() => this.refreshPosts()}
        />, container);
        this.template.setState({isRefreshing: false});
    }
    refreshPosts() {
        debug("Die letzten 10 Beiträge werden aktualisiert...");
        clearInterval(this.refreshPostsInterval);
        this.template.setState({isRefreshing: true}, () => this.template.showDots());

        Superagent.get("http://forum.sa-mp.de/").end((err, res) => {
            if (err) {
                return this.props.debug("Fehler beim abfragen der Top5 Posts: ", err);
            }

            var $data = $(res.text);
            $("#lastXBoardPosts").html($data.find("#lastXBoardPosts").html());

            this.getModule("boardList.extension.lastPosts").trimPosts();

            this.refreshPostsInterval = setInterval(this.refreshPosts.bind(this), this.refreshInterval);

            this.template.setState({isRefreshing: false, lastRefresh: Date.now()});

            this.triggerRelativeTime();
            this.triggerUserPreview();

            debug("Die letzten 10 Beiträge wurden aktualisiert!");
        });
    }
}
