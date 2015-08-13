"use strict";

const debug = require("debug")("api");
import Storage from "./storage";
import $ from "jquery";
import _ from "lodash";
import React from "react";
import Package from "../../package.json";
import UserMenuItemTemplate from "../templates/userMenuItem.hbs";
import OptionsTemplate from "./options/Options.jsx";

let optionsArray    = [];
let isOptionsFrameOpen = false;

const showOptions = function () {
    let optionsObject = generateOptionsObject(),
        parsedHash = parseHash(optionsObject);

    isOptionsFrameOpen = true;

    React.render(<OptionsTemplate
        location={location}
        parsedHash={parsedHash}
        version={Package.version}
        domains={Package.domain}
        optionsObject={optionsObject}
    />, document.querySelector("#main"));
};

const parseHash = function (optionsObject) {
    let ret = {
        tab: null,
        subtab: null,
        highligh: null
    };
    let s;

    if (location.hash.length > 2) {
        s = location.hash.substr(2).split("/");
        if (s.length > 1 && s[0] === "breadfishplusplus" && s[1] === "!") {
            if (s.length > 2 && s[2].length > 0) {
                ret.tab = s[2];
            }
            if (s.length > 3 && s[3].length > 0) {
                ret.subtab = s[3];
            }
            if (s.length > 4 && s[4].length > 0) {
                ret.highligh = s[4];
            }
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
                ["type_" + opt.type]: true
            });

            subtab.options = _.sortBy(subtab.options, function (c) {
                return c.name;
            });
        }
    });
    return tmp;
};

$(document).ready(function () {
    require("./options/style.less");

    let $userMenuItem;

    $userMenuItem = $(UserMenuItemTemplate());

    //Append Menu Item
    $("#userMenu ul").append($userMenuItem);

    $userMenuItem.find("a").click(function (event) {
        event.preventDefault();

        if (!isOptionsFrameOpen) {
            location.hash = "#/breadfishplusplus/!/about/";
        } else {
            location.href = location.origin + location.pathname + location.search;
        }
    });

    $(window).on("hashchange", function () {
        if (location.hash.indexOf("#/breadfishplusplus/!/") === 0) {
            showOptions();
        }
    });
    $(document).ready(function () {
        if (location.hash.indexOf("#/breadfishplusplus/!/") === 0) {
            showOptions();
        }
    });
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
        return templates.indexOf(this.getTemplateName()) > -1;
    }
    getUsername() {
        return document.querySelector("#userNote a").innerText.trim();
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
