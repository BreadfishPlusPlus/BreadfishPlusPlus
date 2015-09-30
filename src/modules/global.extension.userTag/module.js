"use strict";

import {DefaultModule} from "../../api";
import $ from "jquery";
import React from "react";
const debug = require("debug")("option.global.extension.userTag");
import Dialog from "./Dialog.jsx";
import UserTagBadge from "./UserTagBadge.jsx";

export default class Module extends DefaultModule {
    constructor() {
        super();
        debug("Wird geladen...");

        this.register({
            "key": "option.global.extension.userTag.enabled",
            "name": "Benutzer-Tags",
            "tab": "Einstellungen",
            "subtab": "Global",
            "category": "Erweiterungen",
            "type": "toggle",
            "default": false,
            "description": "Bietet die möglichkeit, Benutzer mit einem Tag zu versehen."
        });
        this.register({
            "key": "option.global.extension.userTag.db",
            "type": "invis",
            "default": {}
        });

        if (!this.storage.get("option.global.extension.userTag.enabled", false)) {
            debug("Deaktiviert -> SKIP");
            return;
        }

        window.WCF.Language.addObject({
            "wcf.style.colorPicker": "Farbwähler",
            "wcf.style.colorPicker.new": "neu",
            "wcf.style.colorPicker.current": "aktuell",
            "wcf.style.colorPicker.button.apply": "Übernehmen"
        });

        this.tagDb = this.storage.get("option.global.extension.userNote.db", {});
        debug("this.tagDb", this.tagDb);

        if (this.isTemplate("tplThread")) {
            this.setupThread();
        } else if (this.isTemplate("tplConversation")) {
            this.setupConversation();
        }
        this.setupPopupListener();
    }
    getUserTagData(userId) {
        return this.tagDb[userId];
    }
    setUserTag(userId, tag, link, background, foreground) {
        if (!tag) {
            delete this.tagDb[userId];
        } else {
            this.tagDb[userId] = {tag, link, background, foreground};
        }
        this.storage.set("option.global.extension.userNote.db", this.tagDb);
    }
    onClose(userId, userName, tag, link, background, foreground) {
        debug("module.onClose", arguments);
        this.setUserTag(userId, tag, link, background, foreground);
        this.$dialog.wcfDialog("close");

        if (this.isTemplate("tplThread")) {
            this.setupThread();
        } else if (this.isTemplate("tplConversation")) {
            this.setupConversation();
        }
    }
    showDialog(event, userId, userName) {
        event.preventDefault();
        debug("userId", userId, userName);
        $(".popover .userProfilePreview").parent(".popoverContent").parent(".popover").hide();

        //$("<div id=\"bpp_tag_dialog_content\"><div class=\"formSubmit\"></div></div>").wcfDialog({

        this.$dialog = $("<div />");

        this.$dialog.wcfDialog({
            title: "Benutzer-Tag"
        });

        this.template = React.render(<Dialog
            debug={debug}
            onClose={this.onClose.bind(this, userId, userName)}
            userName={userName}
            {...this.getUserTagData(userId)}
        />, this.$dialog[0]);

        this.$dialog.wcfDialog("render");
    }
    setupPopupListener() {
        window.WCF.DOMNodeInsertedHandler.addCallback("WCF.Popover..userLink", () => {
            const $iconList = $(".popover .userProfilePreview .userInformation .buttonGroupNavigation .iconList");
            if ($iconList.length > 0) {
                //http://breadfish.de/index.php?user/36685-instagram/
                const $user = $(".popover .userProfilePreview > a");
                const userid = ~~$user.attr("href").slice(0, -1).split("/").pop().split("-")[0];
                let $btn = $(`<li><a href="#" class="jsTooltip" title="Benutzer-Tag"><span class="icon icon16 fa-sticky-note-o"></span></a></li>`);
                $btn.find("a").click(event => this.showDialog(event, userid, $user.attr("title").trim()));
                $iconList.prepend($btn);

                this.triggerTooltips();
            }
        });
    }
    setupThread() {
        $(".userTagBadge").remove();
        $("article.message").each((index, element) => {
            const userId = ~~$(element).data("user-id");
            const tagData = this.getUserTagData(userId);
            debug("setupThread", userId, tagData);
            $(element)
                .find(".messageSidebar.member header")
                .append(React.renderToStaticMarkup(<UserTagBadge {...tagData} />));
        });
    }
    setupConversation() {
        $(".userTagBadge").remove();
        $("article.message").each((index, element) => {
            const userId = ~~$(element).find(".messageSidebar.member header .userLink").data("user-id");
            const tagData = this.getUserTagData(userId);
            debug("setupConversation", userId, tagData);
            $(element)
                .find(".messageSidebar.member header")
                .append(React.renderToStaticMarkup(<UserTagBadge {...tagData} />));
        });
    }
}
