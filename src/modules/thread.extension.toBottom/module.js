"use strict";

import {DefaultModule} from "../../api";
import $ from "jquery";
const debug = require("debug")("B++:module:thread.extension.toBottom");

export default class Module extends DefaultModule {
    constructor() {
        super();
        debug("Wird geladen...");

        this.register({
            "key": "option.thread.extension.toBottom.enabled",
            "name": "Zum Seitenende",
            "tab": "Einstellungen",
            "subtab": "Themenansicht",
            "category": "Erweiterungen",
            "type": "toggle",
            "default": false,
            "description": "Fügt in jedem Beitrag einen Button hinzu mit dem man zum Seitenende springen kann."
        });

        if (!this.isTemplate("tplThread")) {
            debug("Falsches template -> SKIP");
            return;
        }

        if (!this.storage.get("option.thread.extension.toBottom.enabled", false)) {
            debug("Deaktiviert -> SKIP");
            return;
        }

        this.addLinks();
    }
    addLinks() {
        $("article.message").each(function () {
            $("<li><a href=\"#bottom\" class=\"button jsTooltip\" title=\"Zum Seitenende\"><span class=\"icon icon16 icon-arrow-down\"></span> <span class=\"invisible\">Zum Seitenende</span></a></li>")
                .insertBefore($(this).find("footer .buttonGroupNavigation .buttonGroup li.toTopLink"));
        });
        this.triggerTooltips();
    }
}
