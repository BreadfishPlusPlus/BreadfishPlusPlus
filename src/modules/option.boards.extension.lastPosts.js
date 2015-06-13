import {DefaultModule} from "../api.js";
import $ from "jquery";
const debug = require("debug")("option.boards.extension.lastPosts");

export default class LastPosts extends DefaultModule {
    constructor() {
        super();
        debug("Wird geladen...");

        this.register({
            "key": "option.boards.extension.lastPosts.count",
            "name": "Die letzten X Beiträge",
            "tab": "Einstellungen",
            "subtab": "Forenübersicht",
            "category": "Erweiterungen",
            "type": "range",
            "default": 10,
            "min": 0,
            "max": 10,
            "description": "Passt die Anzahl der \"Letzte X Beiträge\"-Box auf der Startseite an. \"0\" Entfernt die Box komplett."
        });

        if (!this.isTemplate("tplIndex")) {
            debug("Falsches template -> SKIP");
            return;
        }

        this.trimPosts = this.trimPosts.bind(this);
        this.trimPosts();
    }
    trimPosts() {
        const lastPostsCount = this.storage.get("option.boards.extension.lastPosts.count", 10);
        debug("trimPosts", lastPostsCount);
        if (lastPostsCount > 0) {
            $(".top5box .tableList tr").slice(lastPostsCount, 10).remove();
            $(".top5box .containerContent").html("<img src=\"icon/postS.png\"> Die letzten " + lastPostsCount + " Beiträge");
        } else {
            $(".top5box").remove();
        }
    }
}
