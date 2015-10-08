"use strict";

const debug = require("debug")("B++:API");
import Storage from "./storage";
import $ from "jquery";
import React from "react";
import ReactDOM from "react-dom";
import CSSPropertyOperations from "react/lib/CSSPropertyOperations";
import OptionsWrapper from "./options/OptionsWrapper.jsx";
import Notification from "./Notification";

import Tabmanager from "./Tabmanager.js";
const TabMngr = new Tabmanager();



let optionsArray    = [];
let isOptionsFrameOpen = false;

const showOptions = function () {
    debug("showOptions");

    TabMngr.parse();

    isOptionsFrameOpen = true;

    ReactDOM.render(<OptionsWrapper
        TabMngr={TabMngr}
        optionsArray={optionsArray}
    />, document.querySelector("#content"));
    //TODO: .mobileSidebarToggleButton
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
        this._templateName = null;
    }
    /* properties */
    get wcf() {
        return window.WCF;
    }
    get notification() {
        return Notification;
    }
    get storage() {
        return Storage;
    }
    get templateName() {
        if (!this._templateName) {
            this._templateName = $("body").data("template");
        }
        return this._templateName;
    }
    isTemplate(...templates) {
        debug("isTemplate", templates, this.templateName);
        return templates.indexOf(this.templateName) > -1;
    }
    get userName() {
        return window.WCF.User.username;
    }
    get userId() {
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
    addRawStyle(cssString, index=null) {
        const styleSheet = document.styleSheets[0];
        if (index === null) {
            index = styleSheet.cssRules.length;
        }

        debug("addRawStyle", {cssString, index});

        styleSheet.insertRule(cssString, index);
    }
    addStyle(selector, styles={}, index=null) {
        const styleSheet = document.styleSheets[0];
        const rules = CSSPropertyOperations.createMarkupForStyles(styles);
        if (index === null) {
            index = styleSheet.cssRules.length;
        }

        debug("addStyle", {selector, styles, index});

        if("insertRule" in styleSheet) {
            styleSheet.insertRule(selector + "{" + rules + "}", index);
        } else if("addRule" in styleSheet) {
            styleSheet.addRule(selector, rules, index);
        }
    }
    /* WCF Methoden */
    showWcfLoading() {
        debug("showWcfLoading");
        return this.wcf.LoadingOverlayHandler.show();
    }
    hideWcfLoading() {
        debug("hideWcfLoading");
        return this.wcf.LoadingOverlayHandler.hide();
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
