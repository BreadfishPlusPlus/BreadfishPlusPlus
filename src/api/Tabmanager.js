"use strict";

const debug = require("debug")("Tabmanager");

export default class Tabmanager {
    constructor() {
        this.tab = null;
        this.subtab = null;
        this.additional = [];
        this.highligh = null;

        this.parse();
    }
    parse() {
        debug("parse");
        const urlParts = window.location.search.substr(22).split(/\//);

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

        if (window.location.hash) {
            this.highligh = window.location.hash.substr(1);
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
        window.history.pushState(null, null, this.generateUrl());
        window.onpopstate();
    }
    changeTab(newTab, event=null) {
        if (event) {
            event.preventDefault();
        }
        this.tab = newTab;

        if (newTab === "einstellungen") {
            this.subtab = "forenbersicht";
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
