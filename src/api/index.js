"use strict";

const debug = require("debug")("api");
import Storage from "./storage";
import $ from "jquery";
import _ from "lodash";
import React from "react";
import Package from "../../package.json";
import OptionsTemplate from "./options/Options.jsx";

let optionsArray    = [];
let isOptionsFrameOpen = false;

const showOptions = function () {
    let optionsObject = generateOptionsObject(),
        parsedHash = parseHash(optionsObject);

    isOptionsFrameOpen = true;

    React.render(<OptionsTemplate
        domains={Package.domain}
        location={location}
        optionsObject={optionsObject}
        parsedHash={parsedHash}
        version={Package.version}
    />, document.querySelector("#content"));
};

const parseHash = function (optionsObject) {
    let ret = {
        tab: null,
        subtab: null,
        highligh: null
    };

    if (location.hash.length > 2) {
        let s = location.hash.substr(1).split("/");

        if (s.length > 0) {
            ret.tab = s[0];
        }
        if (s.length > 1) {
            ret.subtab = s[1];
        }
        if (s.length > 2) {
            ret.highligh = s[2];
        }
    }

    if (!ret.tab) {
        ret.tab = "about";
    }

    if (!ret.subtab) {
        if (ret.tab !== "importexport" && ret.tab !== "about") {
            ret.subtab = optionsObject[optionsObject.indexOf(_.find(optionsObject, function (opt) {
                return opt.href === ret.tab;
            }))].subtabs[0].href;
        }
    }

    debug("parseHash", ret);

    return ret;
};

const generateHref = function (name) {
    return name.replace(/[\W]/gi, "").toLowerCase();
};

const generateOptionsObject = function () {
    let tmp = [];
    _.each(optionsArray, function (opt) {
        if (opt.type !== "invis") {
            let tab, subtab, category;

            tab = _.find(tmp, function (_tab) {
                return _tab.name === opt.tab;
            });
            if (tab === undefined) {
                tab = {
                    name: opt.tab,
                    href: generateHref(opt.tab),
                    subtabs: []
                };
                tmp.push(tab);
            }

            subtab = _.find(tab.subtabs, function (_subtab) {
                return _subtab.name === opt.subtab;
            });
            if (subtab === undefined) {
                subtab = {
                    name: opt.subtab,
                    href: generateHref(opt.subtab),
                    categories: []
                };
                tab.subtabs.push(subtab);
            }

            category = _.find(subtab.categories, function (_category) {
                return _category.name === opt.category;
            });
            if (category === undefined) {
                category = {
                    name: opt.category,
                    options: []
                };
                subtab.categories.push(category);
            }
            subtab.categories = _.sortBy(subtab.categories, function (c) {
                return c.name;
            });

            category.options.push({
                key: opt.key,
                name: opt.name,
                min: opt.min,
                max: opt.max,
                default: opt.default,
                description: opt.description,
                type: opt.type,
                options: opt.options
            });

            subtab.options = _.sortBy(subtab.options, function (c) {
                return c.name;
            });
        }
    });
    return tmp;
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
        showOptions();
        $(window).on("hashchange", showOptions);
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
    getDomains() {
        debug("getDomains", Package.domain);
        return Package.domain;
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
}
