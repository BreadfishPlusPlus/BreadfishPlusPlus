"use strict";

import {DefaultModule} from "../../api";
import $ from "jquery";
const debug = require("debug")("B++:module:thread.filter.userLikes");

export default class Module extends DefaultModule {
    constructor() {
        super();
        debug("Wird geladen...");

        this.register({
            "key": "option.thread.filter.userLikes.enabled",
            "name": "Erhaltene Likes",
            "tab": "Einstellungen",
            "subtab": "Themenansicht",
            "category": "Filter",
            "type": "toggle",
            "options": ["Anzeigen", "Entfernen"],
            "default": false,
            "description": "Entfernt die anzeige der erhaltenen Likes eines jeden Benutzers aus der Themenansicht."
        });

        if (!this.storage.get("option.thread.filter.userLikes.enabled", false)) {
            debug("Deaktiviert -> SKIP");
            return;
        }

        if (!this.isTemplate("thread")) {
            debug("Falsches template -> SKIP");
            return;
        }

        this.removeUserLikes();
    }
    removeUserLikes() {
        $(".userCredits > .dataList > dt > a:contains(Erhaltene Likes)").parent("dt").each((index, element) => {
            const $dataList = $(element).parent(".dataList");

            $(element).next("dd").remove();
            $(element).remove();

            if ($dataList.children().length === 0) {
                $dataList.parent(".userCredits").remove();
            }
        });
    }
}
