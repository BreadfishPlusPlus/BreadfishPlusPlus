"use strict";

import {DefaultModule} from "../../api";
import $ from "jquery";
const debug = require("debug")("B++:module:global.extension.christmas");

export default class Module extends DefaultModule {
    constructor() {
        super();
        debug("Wird geladen...");

        if (!this.isChristmas()) {
            return;
        }

        this.register({
            "key": "option.global.extension.christmas.enabled",
            "name": "Schnee",
            "tab": "Einstellungen",
            "subtab": "Global",
            "category": "Erweiterungen",
            "type": "toggle",
            "default": true,
            "description": "(De-)Aktiviert den Schnee \\o/. Die Berechnung des Schnees ist unter umständen recht CPU lastig, wenn du Probleme bemerkst oder auf einem älteren Grät/Handy unterwegs bist solltest du den Schnee lieber deaktivieren."
        });
        this.register({
            "key": "option.global.extension.christmas.notified",
            "type": "invis",
            "default": false
        });

        if (!this.storage.get("option.global.extension.christmas.enabled", false)) {
            debug("Deaktiviert -> SKIP");
            return;
        }

        this.ILOVECOCAINE();

        if (!this.storage.get("option.global.extension.christmas.notified", false)) {
            this.showB0wm();
            this.storage.set("option.global.extension.christmas.notified", true);
        }
    }
    isChristmas() {
        var d = new Date();
        return d.getMonth() === 11 && (d.getDate() === 24 || d.getDate() === 25 || d.getDate() === 26);
    }
    showB0wm() {
        debug("showB0wm");
        const $b0wm = $(`<div><pre>
       wow        *
                 ^^^    so happy
                ^^^o^              such fest
               ^^^o^^^
  such b0wm   ^^^^^^^o^
             ^o^^^^^^^^^
            ^^^^^^^^^^^o^   so weihnachten
                  .
        </pre><br><small>(Du kannst den Schnee in den <a href="index.php?settings/Breadfish++/einstellungen/global">B++ Einstellungen</a> deaktivieren)</small><div>`);

        $b0wm.css({
            textAlign: "center"
        });
        $b0wm.find("pre").css({
            textAlign: "left",
            display: "inline-block"
        });

        $b0wm.wcfDialog({
            title: "B++ wünscht fröhliche Weihnachten!"
        });
    }
    ILOVECOCAINE() {
        debug("ILOVECOCAINE");
        $.getScript("https://cdnjs.cloudflare.com/ajax/libs/Snowstorm/20131208/snowstorm-min.js").done(() => {
            this.getWindow().snowStorm.className = "bpp_snowFlake";
            this.getWindow().snowStorm.excludeMobile = false;
            this.addStyle(".bpp_snowFlake", {
                textShadow: "rgb(0, 0, 0) 0px 1px 3px",
                pointerEvents: "none"
            });
        });
    }
}
