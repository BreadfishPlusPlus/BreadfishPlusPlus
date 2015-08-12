"use strict";

import {DefaultModule} from "../../api";
import React from "react";
import Superagent from "superagent";
import $ from "jquery";
const debug = require("debug")("option.boards.extension.top5box");
import Top5BoxTemplate from "./Template.jsx";

export default class Top5Box extends DefaultModule {
    constructor() {
        super();
        debug("Wird geladen...");

        this.register({
            "key": "option.boards.extension.top5box.enabled",
            "name": "\"Die letzten 10 Beiträge\"-Aktualisierung",
            "tab": "Einstellungen",
            "subtab": "Forenübersicht",
            "category": "Erweiterungen",
            "type": "toggle",
            "default": false,
            "description": "Aktualisiert die \"Die letzten 10 Beiträge\"-Box auf der Startseite automatisch in regelmäßigen abständen."
        });
        this.register({
            "key": "option.boards.extension.top5box.refreshInterval",
            "type": "invis",
            "default": 60000
        });

        if (!this.isTemplate("tplIndex")) {
            debug("Falsches template -> SKIP");
            return;
        }

        this.refreshInterval = this.storage.get("option.boards.extension.top5box.refreshInterval", 60000);
        this.refreshPostsInterval = setInterval(this.refreshPosts.bind(this), this.refreshInterval);

        const containerHead = document.querySelector(".top5box .containerHead");
        containerHead.style.position = "relative";
        const container = document.createElement("div");
        containerHead.appendChild(container);
        this.template = React.render(<Top5BoxTemplate
            refreshInterval={this.refreshInterval}
            refreshPosts={this.refreshPosts.bind(this)}
        />, container);
        this.template.setState({isRefreshing: false});
    }
    refreshPosts() {
        debug("Die letzten 10 Beiträge werden aktualisiert...");
        clearInterval(this.refreshPostsInterval);
        this.template.setState({isRefreshing: true}, () => this.template.showDots());

        Superagent.get("http://forum.sa-mp.de/breadfish-de-die-deutschsprachige-gta-community").end(function (err, res) {
            if (err) {
                return this.props.debug("Fehler beim abfragen der Top5 Posts: ", err);
            }

            var $data = $(res.text);
            $("#top5").html($data.find("#top5").html());

            this.getModule("option.boards.extension.lastPosts").trimPosts();

            this.refreshPostsInterval = setInterval(this.refreshPosts.bind(this), this.refreshInterval);

            this.template.setState({isRefreshing: false, lastRefresh: Date.now()});

            debug("Die letzten 10 Beiträge wurden aktualisiert!");
        }.bind(this));
    }
}
