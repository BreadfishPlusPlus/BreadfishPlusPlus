"use strict";

import {DefaultModule} from "../../api";
import $ from "jquery";
import React from "react";
import ReactDOM from "react-dom";
import ReactDOMServer from "react-dom/server";
import PostButton from "./PostButton.jsx";
import ThreadButton from "./ThreadButton.jsx";
import Dialog from "./Dialog.jsx";
const debug = require("debug")("B++:module:thread.extension.screenshot");

export default class Module extends DefaultModule {
    constructor() {
        super();
        debug("Wird geladen...");

        this.register({
            "key": "option.thread.extension.screenshot.enabled",
            "name": "Screenshot",
            "tab": "Einstellungen",
            "subtab": "Themenansicht",
            "category": "Erweiterungen",
            "type": "toggle",
            "default": false,
            "description": `Siehe <a href="http://git.io/LK5njg" target="_blank">Wiki Eintrag zum Screenshot-Modul</a>.`
        });

        if (!this.storage.get("option.thread.extension.screenshot.enabled", false)) {
            debug("Deaktiviert -> SKIP");
            return;
        }

        if (!this.isTemplate("thread")) {
            debug("Falsches template -> SKIP");
            return;
        }

        this.showThreadButtons();
        this.showPostButtons();
    }
    showScreenshotModal(event, screenshotUrl) {
        event.preventDefault();

        this.$dialog = $("<div />");

        this.$dialog.wcfDialog({
            title: "Screenshot"
        });

        this.template = ReactDOM.render(<Dialog
            debug={debug}
            screenshotUrl={screenshotUrl}
        />, this.$dialog[0]);

        this.$dialog.wcfDialog("render");
    }
    showPostButtons() {
        $("article.message").each((index, element) => {
            const $message = $(element);
            const postId = ~~$message.attr("data-post-id");

            const $btn = $(ReactDOMServer.renderToStaticMarkup(<PostButton />));

            $btn.find("a").click((event) => {
                this.showScreenshotModal(event, `${BPP_SCREENSHOT_DOMAIN}post/${postId}.png`);
            });
            $btn.insertAfter($message.find("footer .buttonGroupNavigation .buttonGroup li.wcfLikeButton"));
        });
    }
    showThreadButtons() {
        const threadId = ~~$("[data-is-subscribed]").data("object-id");
        const pageNo = ~~$("link[rel=\"canonical\"]").attr("href").split("/&pageNo=")[1];

        const $btn = $(ReactDOMServer.renderToStaticMarkup(<ThreadButton />));
        $btn.find("a").click((event) => {
            this.showScreenshotModal(event, `${BPP_SCREENSHOT_DOMAIN}thread/${threadId}/${pageNo}.png`);
        });

        $(".contentNavigation nav:not(.pageNavigation):not(.jsClipboardEditor) ul").prepend($btn);

        this.addRawStyle(`@media only screen and (max-width: 800px) {
            .bpp_screenshot_thread {display: block !important;}
            .bpp_screenshot_thread span:not(.icon) {display: none}
        }`);
    }
}
