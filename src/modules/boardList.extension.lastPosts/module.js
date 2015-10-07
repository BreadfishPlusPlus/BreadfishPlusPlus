"use strict";

import {DefaultModule} from "../../api";
import $ from "jquery";
const debug = require("debug")("B++:module:boardList.extension.lastPosts");

export default class Module extends DefaultModule {
    constructor() {
        super();
        debug("Wird geladen...");

        this.register({
            "key": "option.boardList.extension.lastPosts.count",
            "name": "Die letzten X Beiträge",
            "tab": "Einstellungen",
            "subtab": "Startseite",
            "category": "Erweiterungen",
            "type": "select",
            "options": [
                {name: "Ausblenden", value: 0},
                {name: "1 Beitrag", value: 1},
                {name: "2 Beiträge", value: 2},
                {name: "3 Beiträge", value: 3},
                {name: "4 Beiträge", value: 4},
                {name: "5 Beiträge", value: 5},
                {name: "6 Beiträge", value: 6},
                {name: "7 Beiträge", value: 7},
                {name: "8 Beiträge", value: 8},
                {name: "9 Beiträge", value: 9},
                {name: "10 Beiträge", value: 10}
            ],
            "default": 10,
            "description": "Passt die Anzahl der \"Letzte X Beiträge\"-Box auf der Startseite an."
        });

        if (!this.isTemplate("boardList")) {
            debug("Falsches template -> SKIP");
            return;
        }

        this.trimPosts = this.trimPosts.bind(this);
        this.trimPosts();
    }
    trimPosts() {
        const lastPostsCount = this.storage.get("option.boardList.extension.lastPosts.count", 10);
        if (lastPostsCount === 10) {
            return;
        }
        debug("Kürze die letzten 10 Beiträge auf %s", lastPostsCount);
        if (lastPostsCount > 0) {
            $(".lastXPosts .table tr").slice(lastPostsCount, 10).remove();
            $(".lastXPosts header h2").html("Die letzten " + lastPostsCount + " Beiträge");
        } else {
            $(".lastXPosts").remove();
        }
    }
}
