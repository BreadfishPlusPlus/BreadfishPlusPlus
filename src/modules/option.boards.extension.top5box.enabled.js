import {DefaultModule} from "../api.js";
import $ from "jquery";
import Top5boxTemplate from "templates/top5box.hbs";
const debug = require("debug")("option.boards.extension.top5box");

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
        this.refreshTitlebarInterval = setInterval(this.refreshTitlebar.bind(this), 1000);
        this.lastRefresh = Date.now();
        this.isRefreshing = false;

        this.$top5boxrefresh = $(document.createElement("div")).attr("id", "top5boxrefresh").css({
            position: "absolute",
            top: "6px",
            right: "5px"
        });
        $(".top5box").find(".containerHead").css({position: "relative"}).append(this.$top5boxrefresh);
        this.refreshTitlebar();

        $(document).on("click", "#top5boxrefresh a", function (event) {
            event.preventDefault();
            this.refreshPosts();
        }.bind(this));
    }
    refreshPosts() {
        debug("Die letzten 10 Beiträge werden aktualisiert...");
        this.isRefreshing = true;
        this.refreshTitlebar();
        clearInterval(this.refreshPostsInterval);

        $.get("http://forum.sa-mp.de/breadfish-de-die-deutschsprachige-gta-community").done(function (response) {
            var $data = $(response);
            $("#top5").html($data.find("#top5").html());
            this.getModule("option.boards.extension.lastPosts").trimPosts();

            this.refreshPostsInterval = setInterval(this.refreshPosts.bind(this), this.refreshInterval);
            this.lastRefresh = Date.now();

            debug("Die letzten 10 Beiträge wurden aktualisiert!");
            this.isRefreshing = false;


        }.bind(this));
    }
    refreshTitlebar() {
        var remain = Math.round((this.lastRefresh + this.refreshInterval - Date.now()) / 1000);
        this.$top5boxrefresh.html(Top5boxTemplate({
            remain,
            isRefreshing: this.isRefreshing
        }));
    }
}
