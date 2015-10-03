"use strict";

const debug = require("debug")("B++:Tabmanager");

export default class Tabmanager {
    constructor(WINDOW) {
        this.tab = null;
        this.subtab = null;
        this.additional = [];
        this.highligh = null;

        this.window = WINDOW;

        this.parse();
    }
    parse() {
        debug("parse");
        const urlParts = this.window.location.search.substr(22).split(/\//);

        if (urlParts.length > 0 && urlParts[0].length > 0) {
            this.tab = urlParts[0];
            debug("parse.tab", this.tab);
        }
        if (urlParts.length > 1) {
            this.subtab = urlParts[1];
            debug("parse.subtab", this.subtab);
        }
        if (urlParts.length > 2) {
            this.additional = urlParts.slice(2);
            debug("parse.additional", this.additional);
        }

        if (this.window.location.hash) {
            this.highligh = this.window.location.hash.substr(1);
            debug("parse.highligh", this.highligh);
        }
    }
    getBaseUrl() {
        return "index.php?settings/Breadfish++";
    }
    generateUrl() {
        debug("generateUrl");
        let url = this.getBaseUrl();
        if (this.tab) {
            url += ("/" + this.tab);
        }
        if (this.subtab) {
            url += ("/" + this.subtab);
        }
        if (this.additional.length > 0) {
            url += ("/" + this.additional.join("/"));
        }
        if (this.highligh) {
            url += ("#" + this.highligh);
        }
        return url;
    }
    pushState() {
        debug("pushState", this.generateUrl());
        this.window.history.pushState(null, null, this.generateUrl());
        this.window.onpopstate();
    }
    changeTab(newTab, event=null) {
        if (event) {
            event.preventDefault();
        }
        this.tab = newTab;

        if (newTab === "einstellungen") {
            this.subtab = "forenansicht";
        } else if (newTab === "tastaturnavigation") {
            this.subtab = "themenansicht";
        } else {
            this.subtab = null;
        }

        this.additional = [];
        this.pushState();
    }
    changeSubTab(newSubTab, event=null) {
        if (event) {
            event.preventDefault();
        }
        this.subtab = newSubTab;
        this.additional = [];
        this.pushState();
    }
}
