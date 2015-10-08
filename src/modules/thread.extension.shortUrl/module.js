"use strict";

import {DefaultModule} from "../../api";
import React from "react";
import ReactDOMServer from "react-dom/server";
import $ from "jquery";
const debug = require("debug")("B++:module:thread.extension.shortUrl");
import Dialog from "./Dialog.jsx";
import Button from "./Button.jsx";

export default class Module extends DefaultModule {
    constructor() {
        super();
        debug("Wird geladen...");

        this.register({
            "key": "option.thread.extension.shortUrl.enabled",
            "name": "Kurz-URL",
            "tab": "Einstellungen",
            "subtab": "Themenansicht",
            "category": "Erweiterungen",
            "type": "toggle",
            "default": false,
            "description": "Fügt in jedem Beitrag zusätzlich noch einen Button hinzu, mit dem man eine kurze URL zum Beitrag erhält."
        });

        if (!this.isTemplate("thread")) {
            debug("Falsches template -> SKIP");
            return;
        }

        if (!this.storage.get("option.thread.extension.shortUrl.enabled", false)) {
            debug("Deaktiviert -> SKIP");
            return;
        }

        this.addLinks();
    }
    handleClick(event, postId) {
        event.preventDefault();

        $(ReactDOMServer.renderToStaticMarkup(<Dialog postId={postId} />)).wcfDialog({
            title: this.wcf.Language.get("wcf.message.share")
        });
        this.bindSelect();
    }
    handleMessage(index, element) {
        const $message = $(element);
        const postId = ~~$message.attr("data-post-id");

        const $btn = $(ReactDOMServer.renderToStaticMarkup(<Button />));

        $btn.find("a").click(event => this.handleClick(event, postId));
        $btn.insertAfter($message.find("footer .buttonGroupNavigation .buttonGroup li.wcfLikeButton"));
    }
    bindSelect() {
        $(".bpp_shortLinkInput").click(function() { $(this).select(); });
    }
    addLinks() {
        $("article.message").each(this.handleMessage.bind(this));

        this.triggerTooltips();
    }
}
