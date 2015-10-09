"use strict";

import {DefaultModule} from "../../api";
import $ from "jquery";
const debug = require("debug")("B++:module:thread.filter.userPosts");

export default class Module extends DefaultModule {
    constructor() {
        super();
        debug("Wird geladen...");

        this.register({
            "key": "option.thread.filter.userPosts.enabled",
            "name": "Beitragscounter",
            "tab": "Einstellungen",
            "subtab": "Themenansicht",
            "category": "Filter",
            "type": "toggle",
            "options": ["Anzeigen", "Entfernen"],
            "default": false,
            "description": "Entfernt die anzeige der der Anzahl der Beiträge eines jeden Benutzers aus der Themenansicht."
        });

        if (!this.storage.get("option.thread.filter.userPosts.enabled", false)) {
            debug("Deaktiviert -> SKIP");
            return;
        }

        if (!this.isTemplate("thread")) {
            debug("Falsches template -> SKIP");
            return;
        }

        this.remvoeUserPosts();
    }
    remvoeUserPosts() {
        $(".userCredits > .dataList > dt > a:contains(Beiträge)").parent("dt").each((index, element) => {
            const $dataList = $(element).parent(".dataList");

            $(element).next("dd").remove();
            $(element).remove();

            if ($dataList.children().length === 0) {
                $dataList.parent(".userCredits").remove();
            }
        });
    }
}
