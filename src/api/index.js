/*global unsafeWindow:2*/
"use strict";

const WINDOW = typeof unsafeWindow === "undefined" ? window : unsafeWindow;

const debug = require("debug")("B++:API");
import Storage from "./storage";
import $ from "jquery";
import React from "react";
import CSSPropertyOperations from "react/lib/CSSPropertyOperations";
import OptionsWrapper from "./options/OptionsWrapper.jsx";
import Notification from "./Notification";

import Tabmanager from "./Tabmanager.js";
const TabMngr = new Tabmanager(WINDOW);



let optionsArray    = [];
let isOptionsFrameOpen = false;

const showOptions = function () {
    debug("showOptions");

    TabMngr.parse();

    isOptionsFrameOpen = true;

    React.render(<OptionsWrapper
        TabMngr={TabMngr}
        optionsArray={optionsArray}
    />, document.querySelector("#content"));
};

const addPopupMenuEntry = function () {
    $(".interactiveDropdownUserMenu > .interactiveDropdownItemsContainer > .interactiveDropdownItemsUserMenu .containerHeadline h3:contains(Einstellungen)")
        .parent(".containerHeadline")
        .find(".interactiveDropdownUserMenuLinkList")
        .append("<li><a href=\"/index.php?settings/Breadfish++\">Breadfish++</a></li>");
};

const addSettingsMenuEntry = function (active) {
    const className = active ? "active" : "";
    debug("addSettingsMenuEntry(%s)", className);

    if (active) {
        $(".sidebar fieldset:nth-child(2) nav ul li.active").removeClass("active");
    }

    $(".sidebar fieldset:nth-child(2) nav ul")
        .append("<li class=\"" + className + "\"><a href=\"/index.php?settings/Breadfish++\">Breadfish++</a></li>");
};

$(document).ready(function () {
    addPopupMenuEntry();

    debug("window.location.search", WINDOW.location.search);
    if (/^\?settings\/Breadfish\+\+\/?/i.test(WINDOW.location.search)) {
        addSettingsMenuEntry(true);

        WINDOW.onpopstate = () => showOptions();

        TabMngr.parse();

        if (TabMngr.tab === null) {
            TabMngr.changeTab("about");
        }

        showOptions();

    } else if (
        /^\?account-management\/?/i.test(WINDOW.location.search) ||
        /^\?avatar-edit\/?/i.test(WINDOW.location.search) ||
        /^\?signature-edit\/?/i.test(WINDOW.location.search) ||
        /^\?settings\/?/i.test(WINDOW.location.search) ||
        /^\?notification-settings\/?/i.test(WINDOW.location.search) ||
        /^\?paid-subscription-list\/?/i.test(WINDOW.location.search) ||
        /^\?notification-list\/?/i.test(WINDOW.location.search) ||
        /^\?following\/?/i.test(WINDOW.location.search) ||
        /^\?ignored-users\/?/i.test(WINDOW.location.search)
    ) {
        addSettingsMenuEntry();
    }
});

let MODULE_LIST = {};
export const ReferenceModule = function (name, module) {
    debug("ReferenceModule", name, module);
    MODULE_LIST[name] = module;
};

export class DefaultModule {
    constructor() {
        this.storage = Storage;
        this.notification = Notification;
        this.window = WINDOW;
        this.wcf = this.window.WCF;
    }
    getTemplateName() {
        if (!this.templateName) {
            this.templateName = $("body").attr("id");
        }
        return this.templateName;
    }
    isTemplate(...templates) {
        debug("isTemplate", templates, this.getTemplateName());
        return templates.indexOf(this.getTemplateName()) > -1;
    }
    getUsername() {
        return this.getWindow().WCF.User.username;
    }
    getUserId() {
        return this.getWindow().WCF.User.userID;
    }
    getModule(name) {
        debug("getModule", name, MODULE_LIST[name]);
        return MODULE_LIST[name];
    }
    register(options) {
        debug("register", options);
        Storage.setDefault(options.key, options.default);
        optionsArray.push(options);
        if (isOptionsFrameOpen) {
            showOptions();
        }
    }
    addStyle(selector, styles={}) {
        document.styleSheets[0].addRule(selector, CSSPropertyOperations.createMarkupForStyles(styles));
    }
    getWindow() {
        return this.window;
    }
    /* WCF Methoden */
    getWCF() {
        return this.wcf;
    }
    triggerRelativeTime() {
        debug("triggerRelativeTime");
        return new this.wcf.Date.Time();
    }
    triggerUserPreview() {
        debug("triggerUserPreview");
        return new this.wcf.User.ProfilePreview();
    }
    triggerTooltips() {
        debug("triggerTooltips");
        return new this.wcf.Effect.BalloonTooltip();
    }
    wcfProxy(options) {
        return new this.wcf.Action.Proxy(options);
    }
}
