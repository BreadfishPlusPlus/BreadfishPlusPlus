"use strict";

import {DefaultModule} from "../../api";
const debug = require("debug")("B++:module:thread.keyboard.postNav");
import KeyboardJS from "keyboardjs";
import $ from "jquery";
import IsNearViewport from "jquery-near-viewport";

export default class Module extends DefaultModule {
    constructor() {
        super();
        debug("Wird geladen...");

        this.register({
            "key": "option.thread.keyboard.postNav.postPrevious",
            "name": "Vorheriger Beitrag",
            "tab": "Tastaturnavigation",
            "subtab": "Themenansicht",
            "category": "Beiträge",
            "type": "keyboard",
            "default": "",
            "description": "Zum vorherigen Beitrag scrollen."
        });

        this.register({
            "key": "option.thread.keyboard.postNav.postNext",
            "name": "Nächster Beitrag",
            "tab": "Tastaturnavigation",
            "subtab": "Themenansicht",
            "category": "Beiträge",
            "type": "keyboard",
            "default": "",
            "description": "Zum nächsten Beitrag scrollen."
        });

        if (!this.isTemplate("tplThread")) {
            debug("Falsches template -> SKIP");
            return;
        }

        const postPrevious = this.storage.get("option.thread.keyboard.postNav.postPrevious", "");
        if (postPrevious.length > 0) {
            KeyboardJS.bind(postPrevious, event => this.onPreviousKey(event));
        }

        const postNext = this.storage.get("option.thread.keyboard.postNav.postNext", "");
        if (postNext.length > 0) {
            KeyboardJS.bind(postNext, event => this.onNextKey(event));
        }
    }
    getPostlist() {
        return $("article.wbbPost:not(.wbbPostDeleted)");
    }
    getFirstPostInViewport() {
        const $post = this.getPostlist().filter((index, element) => {
            return IsNearViewport(element);
        }).first();

        debug("getFirstPostInViewport", $post);
        return $post;
    }
    getIndexOfCurrentPostInPostlist() {
        const $postList = this.getPostlist();
        const $firstPost = this.getFirstPostInViewport();
        const index = $postList.index($firstPost);
        debug("getIndexOfCurrentPostInPostlist", index);
        return index;
    }
    getPreviousPostInViewport() {
        const index = this.getIndexOfCurrentPostInPostlist();

        if (index === 0) {
            return null;
        }

        const $postList = this.getPostlist();
        const $post = $postList.get(index - 1);

        debug("getPreviousPostInViewport", $post);

        return $($post);
    }
    getNextPostInViewport() {
        const $postList = this.getPostlist();
        const index = this.getIndexOfCurrentPostInPostlist();

        if (index === $postList.length - 1) {
            return null;
        }

        const $post = $postList.get(index + 1);

        debug("getNextPostInViewport", $post);

        return $($post);
    }
    onPreviousKey(event) {
        debug("onPreviousKey", event);

        if (event.target.tagName.toUpperCase() === "TEXTAREA" || event.target.tagName.toUpperCase() === "INPUT") {
            return;
        }

        event.preventDefault();

        const $element = this.getPreviousPostInViewport();

        if (!$element) {
            return this.notification.create({
                title: "Du hast bereits den ersten Beitrag dieser Seite erreicht!",
                autoDismiss: 2
            });
        }

        $("html, body").stop(true, true).animate({
            scrollTop: $element.offset().top
        }, 500);
    }
    onNextKey(event) {
        debug("onNextKey", event);

        if (event.target.tagName.toUpperCase() === "TEXTAREA" || event.target.tagName.toUpperCase() === "INPUT") {
            return;
        }

        event.preventDefault();

        const $element = this.getNextPostInViewport();

        if (!$element) {
            return this.notification.create({
                title: "Du hast bereits den letzten Beitrag dieser Seite erreicht!",
                autoDismiss: 2
            });
        }

        $("html, body").stop(true, true).animate({
            scrollTop: $element.offset().top
        }, 500);
    }
}
