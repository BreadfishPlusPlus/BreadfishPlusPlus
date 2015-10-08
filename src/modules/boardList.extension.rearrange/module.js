"use strict";

import {DefaultModule} from "../../api";
const debug = require("debug")("B++:module:boardList.extension.rearrange");
import Dragula from "dragula";
import {debounce} from "lodash";
import $ from "jquery";

export default class Module extends DefaultModule {
    constructor() {
        super();
        debug("Wird geladen...");

        this.register({
            "key": "option.boardList.extension.rearrange.enabled",
            "name": "Kategorie-Anordnung",
            "tab": "Einstellungen",
            "subtab": "Startseite",
            "category": "Erweiterungen",
            "type": "toggle",
            "default": false,
            "description": "blabla"
        });

        if (!this.isTemplate("boardList")) {
            debug("Falsches template -> SKIP");
            return;
        }

        if (!this.storage.get("option.boardList.extension.rearrange.enabled", false)) {
            debug("Deaktiviert -> SKIP");
            return;
        }

        this.setupCSS();
        this.enableRearrange();
    }
    getNodeData($node) {
        const id = $node.data("board-id");
        const isLink = $node.hasClass("wbbExternalLink");
        const isCategory = $node.hasClass("wbbCategory");
        const isBoard = !isLink && !isCategory;

        let name = "";
        if (isCategory) {
            name = $node.find("> header > h2 > a").text().trim();
        } else {
            name = $node.find(".containerHeadline > h3 > a").text().trim();
        }

        const childs = this.getNodes($node.find("> ul > li"));

        return {
            id,
            name,
            childs,
            isLink,
            isCategory,
            isBoard
        };
    }
    getNodes($nodeList) {
        if ($nodeList.length === 0) {
            return [];
        }

        let nodes = [];

        $($nodeList).each((index, element) => {
            nodes.push(this.getNodeData($(element)));
        });

        return nodes;
    }
    setupCSS() {
        this.addStyle(".wbbBoardListReduced.wbbBoardList > li > header > h2 > .fa", {
            color: "#FFF",
            cursor: "pointer",
            float: "right"
        });

        this.addStyle(".gu-mirror", {
            position: "fixed !important",
            margin: 0,
            zIndex: 9999,
            opacity: 0.8
        });
        this.addStyle(".gu-hide", {
            display: "none !important"
        });
        this.addStyle(".gu-unselectable", {
            userSelect: "none"
        });
        this.addStyle(".gu-transit", {
            opacity: 0.2
        });
    }
    initDragula() {
        if (document.querySelectorAll(".wbbBoardListReduced").length === 0) {
            return;
        }

        const $elements = $(".wbbBoardListReduced.wbbBoardList");
        $elements.find("> li > header > h2").each((index, element) => {
            $(element).append(`<i class="fa fa-arrows" />`);
        });

        Dragula($elements.get(), {
            direction: "vertical",
            revertOnSpill: true,
            moves: (el, container, handle) => {
                return handle.className === "fa fa-arrows";
            }
        });
    }
    enableRearrange() {
        this.wcf.DOMNodeInsertedHandler.addCallback("WCF.Popover..ignoreBoardsButton", debounce(this.initDragula, 150).bind(this));
    }
}
