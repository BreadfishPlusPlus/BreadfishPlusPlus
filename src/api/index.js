"use strict";

const debug = require("debug")("api");
import Storage from "./storage";
import $ from "jquery";
import React from "react";
import OptionsWrapper from "./options/OptionsWrapper.jsx";

import Tabmanager from "./Tabmanager.js";
const TabMngr = new Tabmanager();

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

    debug("window.location.search", window.location.search);
    if (/^\?settings\/Breadfish\+\+\/?/i.test(window.location.search)) {
        addSettingsMenuEntry(true);

        window.onpopstate = () => showOptions();

        TabMngr.parse();

        if (TabMngr.tab === null) {
            TabMngr.changeTab("about");
        }

        showOptions();

    } else if (
        /^\?account-management\/?/i.test(window.location.search) ||
        /^\?avatar-edit\/?/i.test(window.location.search) ||
        /^\?signature-edit\/?/i.test(window.location.search) ||
        /^\?settings\/?/i.test(window.location.search) ||
        /^\?notification-settings\/?/i.test(window.location.search) ||
        /^\?paid-subscription-list\/?/i.test(window.location.search) ||
        /^\?notification-list\/?/i.test(window.location.search) ||
        /^\?following\/?/i.test(window.location.search) ||
        /^\?ignored-users\/?/i.test(window.location.search)
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
        return window.WCF.User.username;
    }
    getUserId() {
        return window.WCF.User.userID;
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
    triggerRelativeTime() {
        debug("triggerRelativeTime");
        new window.WCF.Date.Time();
    }
    triggerUserPreview() {
        debug("triggerUserPreview");
        new window.WCF.User.ProfilePreview();
    }
    triggerTooltips() {
        debug("triggerTooltips");
        new window.WCF.Effect.BalloonTooltip();
    }
}
