"use strict";

import {DefaultModule} from "../../api";
const debug = require("debug")("B++:module:thread.keyboard.pageNav");
import KeyboardJS from "keyboardjs";
import $ from "jquery";

export default class Module extends DefaultModule {
    constructor() {
        super();
        debug("Wird geladen...");

        this.register({
            "key": "option.thread.keyboard.pageNav.pagePrevious",
            "name": "Vorherige Seite",
            "tab": "Tastaturnavigation",
            "subtab": "Themenansicht",
            "category": "Seiten",
            "type": "keyboard",
            "default": "",
            "description": "Zur vorherigen Seite navigieren."
        });

        this.register({
            "key": "option.thread.keyboard.pageNav.pageNext",
            "name": "Nächste Seite",
            "tab": "Tastaturnavigation",
            "subtab": "Themenansicht",
            "category": "Seiten",
            "type": "keyboard",
            "default": "",
            "description": "Zur nächsten Seite navigieren."
        });

        if (!this.isTemplate("tplThread")) {
            debug("Falsches template -> SKIP");
            return;
        }

        const pagePrevious = this.storage.get("option.thread.keyboard.pageNav.pagePrevious", "");
        if (pagePrevious.length > 0) {
            KeyboardJS.bind(pagePrevious, event => this.onPreviousKey(event));
        }

        const pageNext = this.storage.get("option.thread.keyboard.pageNav.pageNext", "");
        if (pageNext.length > 0) {
            KeyboardJS.bind(pageNext, event => this.onNextKey(event));
        }
    }
    onPreviousKey(event) {
        debug("onPreviousKey", event);

        if (event.target.tagName.toUpperCase() === "TEXTAREA" || event.target.tagName.toUpperCase() === "INPUT") {
            return;
        }

        event.preventDefault();

        const prevUrl = $("link[rel=\"prev\"]").attr("href");

        if (!prevUrl) {
            return this.notification.create({
                title: "Du hast bereits die erste Seite erreicht!",
                autoDismiss: 2
            });
        }

        this.getWindow().location.href = prevUrl;
    }
    onNextKey(event) {
        debug("onNextKey", event);

        if (event.target.tagName.toUpperCase() === "TEXTAREA" || event.target.tagName.toUpperCase() === "INPUT") {
            return;
        }

        event.preventDefault();

        const nextUrl = $("link[rel=\"next\"]").attr("href");

        if (!nextUrl) {
            return this.notification.create({
                title: "Du hast bereits die letzte Seite erreicht!",
                autoDismiss: 2
            });
        }

        this.getWindow().location.href = nextUrl;
    }
}
