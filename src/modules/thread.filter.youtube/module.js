"use strict";

import {DefaultModule} from "../../api";
import $ from "jquery";
const debug = require("debug")("B++:module:thread.filter.youtube");

export default class Module extends DefaultModule {
    constructor() {
        super();
        debug("Wird geladen...");

        this.register({
            "key": "option.thread.filter.youtube.enabled",
            "name": "YouTube-Videos",
            "tab": "Einstellungen",
            "subtab": "Themenansicht",
            "category": "Filter",
            "type": "toggle",
            "options": ["Anzeigen", "Entfernen"],
            "default": false,
            "description": "Entfernt YouTube-Videos aus Beiträgen und ersetzt sie stattdessen mit dem Link zum jeweiligen Video."
        });

        if (!this.storage.get("option.thread.filter.youtube.enabled", false)) {
            debug("Deaktiviert -> SKIP");
            return;
        }

        if (!this.isTemplate("thread")) {
            debug("Falsches template -> SKIP");
            return;
        }

        this.replaceYoutubeVideos();
    }
    replaceYoutubeVideos() {
        debug("replaceYoutubeVideos");

        $("article.wbbPost iframe[src^=\"https://www.youtube.com\"]").each((index, element) => {
            const $iframe = $(element);
            let url = $iframe.attr("src").replace(/embed\//, "watch?v=").replace(/\?wmode=transparent/, "");

            $iframe.replaceWith(`<a href="${url}" class="externalURL" rel="nofollow" target="_blank">${url}</a>`);
        });
    }
}
