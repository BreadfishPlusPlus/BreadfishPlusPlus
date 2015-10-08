/*eslint no-console: 0*/
"use strict";

import {DefaultModule} from "../../api";
import $ from "jquery";
import React from "react";
import ReactDOMServer from "react-dom/server";
const debug = require("debug")("B++:module:postAdd.extension.smilies");
import CategoryLink from "./CategoryLink.jsx";
import SmileyContainer from "./SmileyContainer.jsx";
import ImagesLoaded from "imagesloaded";

export default class Module extends DefaultModule {
    constructor() {
        super();
        debug("Wird geladen...");

        this.register({
            "key": "option.postAdd.extension.smilies.anime",
            "name": "Anime",
            "tab": "Einstellungen",
            "subtab": "Themenerstellung",
            "category": "Smileys",
            "type": "toggle",
            "default": false,
            "description": "Fügt dem Text-Editor eine neue Smiley-Kategorie mit Anime Bildchen hinzu."
        });
        this.register({
            "key": "option.postAdd.extension.smilies.ragefaces",
            "name": "Ragefaces",
            "tab": "Einstellungen",
            "subtab": "Themenerstellung",
            "category": "Smileys",
            "type": "toggle",
            "default": false,
            "description": "Fügt dem Text-Editor eine neue Smiley-Kategorie mit Ragefaces Bildchen hinzu."
        });
        this.register({
            "key": "option.postAdd.extension.smilies.twemoji",
            "name": "Twemoji",
            "tab": "Einstellungen",
            "subtab": "Themenerstellung",
            "category": "Smileys",
            "type": "toggle",
            "default": false,
            "description": "Fügt dem Text-Editor eine neue Smiley-Kategorie mit Twemoji (Emoji) hinzu."
        });

        if (!this.isTemplate("postAdd")) {
            debug("Falsches template -> SKIP");
            return;
        }

        if (!this.storage.get("option.postAdd.extension.smilies.anime", false) &&
            !this.storage.get("option.postAdd.extension.smilies.ragefaces", false) &&
            !this.storage.get("option.postAdd.extension.smilies.twemoji", false)) {
            debug("Alle deaktiviert -> SKIP");
            return;
        }

        this.loadedCategories = [];

        this.loadSmilies();
    }
    loadSmilies() {
        $.getJSON("https://api.github.com/repos/BreadfishPlusPlus/static/contents/smileys/smileys.json").done((data) => {
            this.setUpSmilies(JSON.parse(window.atob(data.content)));
        }).fail((jqXHR, textStatus, errorThrown) => {
            this.notification.create({
                level: "error",
                title: "Fehler beim laden der Smileys!",
                message: "Beim laden der Smileys ist ein Fehler aufgetreten! Mehr Infos gibts in der Konsole."
            });
            console.error(textStatus);
            console.error(errorThrown);
        });
    }
    setUpSmilies(smilies) {
        debug("smilies", smilies);

        smilies = smilies.filter(s => {
            return this.storage.get(`option.postAdd.extension.smilies.${s.name.toLowerCase()}`, false);
        });

        smilies.forEach((category, index) => {
            $("#smilies-text nav ul").append(ReactDOMServer.renderToStaticMarkup(<CategoryLink
                index={index + 2}
                name={category.name}
            />));

            $("#smilies-text").append(`<div id="smilies-text-${index + 2}"><ul class="smileyList" /></div>`);
        });

        $(".messageTabMenu#smilies-text").data("wcf-messageTabMenu")._create();

        $("#smilies-text").on("messagetabmenushow", (event, data) => {
            const categoryId = ~~data.activeTab.tab.data("smileyCategoryID");

            if (categoryId < 2) {
                return;
            }

            if (this.loadedCategories.indexOf(categoryId) !== -1) {
                return;
            }

            this.showWcfLoading();

            debug("categoryId", categoryId);

            $(`#smilies-text-${categoryId}`).html(ReactDOMServer.renderToStaticMarkup(<SmileyContainer
                smileys={smilies[categoryId - 2].smileys}
            />));

            debug("messagetabmenushow", event, data);

            ImagesLoaded(`#smilies-text-${categoryId} img`, () => this.hideWcfLoading());
        });
    }
}
