/*eslint no-console: 0*/
"use strict";

import {DefaultModule} from "../../api";
import $ from "jquery";
const debug = require("debug")("B++:module:global.extension.emoji");

export default class Module extends DefaultModule {
    constructor() {
        super();
        debug("Wird geladen...");

        const DEFUALT_EXCLUDE_EMOJI = [
            "a9",   // © copyright
            "ae",   // ® registered trademark
            "2122"  // ™ trademark
        ];

        this.register({
            "key": "option.global.extension.emoji.enabled",
            "name": "Emoji",
            "tab": "Einstellungen",
            "subtab": "Global",
            "category": "Erweiterungen",
            "type": "toggle",
            "default": false,
            "description": "Ersetzt im ganzen Forum Emoji-Unicode-Zeichen durch Bilder (Für Geräte die das nicht können)."
        });
        this.register({
            "key": "option.global.extension.emoji.excluded",
            "type": "invis",
            "default": DEFUALT_EXCLUDE_EMOJI
        });

        if (!this.storage.get("option.global.extension.emoji.enabled", false)) {
            debug("Deaktiviert -> SKIP");
            return;
        }

        this.EXCLUDE_EMOJI = this.storage.get("option.global.extension.emoji.excluded", DEFUALT_EXCLUDE_EMOJI);

        this.loadTwemoji();
    }
    loadTwemoji() {
        $.getScript("https://cdnjs.cloudflare.com/ajax/libs/twemoji/1.4.1/twemoji.min.js")
            .done(() => this.showEmoji())
            .fail((jqXHR, textStatus, errorThrown) => {
                this.notification.create({
                    level: "error",
                    title: "Fehler beim laden der Twemoji Bibliothek!",
                    message: "Beim laden der Twemoji Bibliothek ist ein Fehler aufgetreten! Mehr Infos gibts in der Konsole."
                });
                console.error(textStatus);
                console.error(errorThrown);
            });
    }
    showEmoji() {
        this.addStyle("img.emoji", {
            height: "1em",
            width: "1em",
            margin: "0 .05em 0 .1em",
            verticalAlign: "-0.1em"
        });
        window.twemoji.size = "36x36";
        window.twemoji.parse(document.body, {
            callback: (icon, options) => {
                if (this.EXCLUDE_EMOJI.indexOf(icon) > -1) {
                    return false;
                }
                return `${options.base}${options.size}/${icon}${options.ext}`;
            }
        });
    }
}
