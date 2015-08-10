"use strict";

const debug = require("debug")("api");
import Storage from "./storage";
import $ from "jquery";
import _ from "lodash";
import Moment from "moment";
import "moment/locale/de";
Moment.locale("de");
import Package from "../package.json";
import KeyboardJS from "keyboardjs";
import Notification from "./notification";
import OptionsTemplate from "templates/options.hbs";
import UserMenuItemTemplate from "templates/userMenuItem.hbs";

let optionsArray    = [];

let $optionsFrame, isOptionsFrameOpen = false, setOptionsToValues, getKeyName, showOptions, generateHref, parseHash, generateOptionsObject;

getKeyName = function (key) {
    const names = KeyboardJS.key.name(key);
    if (names.length === 0) {
        return "Keine Taste zugewiesen";
    }
    if (names.length === 1) {
        return names[0].toUpperCase();
    }
    if (names.length > 1) {
        return names[0].toUpperCase() + " (" + names[1].toUpperCase() + ")";
    }
};

setOptionsToValues = function () {
    $(".bpp-option").each(function () {
        let name = $(this).attr("name"),
            type = $(this).attr("type"),
            value;
        if (type === "checkbox") {
            $(this).prop("checked", Storage.get(name, false));
        } else if (type === "range") {
            value = Storage.get(name, $(this).attr("value"));
            $(this).val(value).parent(".formField").find(".indicator").text(value);
        } else if (type === "button") {
            $(this).val(getKeyName(Storage.get(name, -1)));
        }
    });
};

showOptions = function () {
    $("#main").hide();

    let optionsObject = generateOptionsObject(),
        parsedHash = parseHash(optionsObject);

    if ($optionsFrame) {
        $optionsFrame.remove();
        $optionsFrame = null;
    }

    $optionsFrame = $(OptionsTemplate({
        location: location,
        VERSION: Package.version,
        DOMAIN: Package.domain,
        optionsObject: optionsObject
    }));

    $optionsFrame.insertAfter("#headerContainer");
    $optionsFrame.find("li[data-tab=\"" + parsedHash.tab + "\"]").addClass("activeTabMenu");
    $optionsFrame.find("ul[data-tab=\"" + parsedHash.tab + "\"]").show();
    $optionsFrame.find("li[data-subtab=\"" + parsedHash.subtab + "\"]").addClass("activeSubTabMenu");
    $optionsFrame.find("div[data-tab=\"" + parsedHash.tab + "\"][data-subtab=\"" + parsedHash.subtab + "\"]").show();

    $optionsFrame.show();
    isOptionsFrameOpen = true;

    setOptionsToValues();
};

parseHash = function (optionsObject) {
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

generateHref = function (name) {
    return name.replace(/[\W]/gi, "").toLowerCase();
};

generateOptionsObject = function () {
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

const showSaveBadge = function (elem) {
    let $label = $(elem).parent("label");
    if ($label.find(".bpp-saved-badge").length > 0) {
        $label.find(".bpp-saved-badge").remove();
    }
    $("<span class=\"bpp-saved-badge\">Gespeichert!</span>").appendTo($label).fadeOut(1000, function () {
        $(this).remove();
    });
};

$(document).ready(function () {
    require("styles/options.less");

    let $userMenuItem;

    $userMenuItem = $(UserMenuItemTemplate());

    //Append Menu Item
    $("#userMenu ul").append($userMenuItem);

    $userMenuItem.find("a").click(function (event) {
        event.preventDefault();

        if (!$optionsFrame) {
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

    $(document).on("change", "input[type=\"checkbox\"].bpp-option", function () {
        Storage.set($(this).attr("name"), $(this).is(":checked"));
        showSaveBadge(this);
    });
    $(document).on("change", "input[type=\"range\"].bpp-option", function () {
        let val = parseInt($(this).val(), 10);
        Storage.set($(this).attr("name"), val);
        $(this).parent(".formField").find(".indicator").text(val);
        showSaveBadge(this);
    });
    $(document).on("click", "input[type=\"button\"].bpp-option", function (e) {
        e.preventDefault();
        let $btn = $(this),
            name = $btn.attr("name");
        $btn.focus().val("Zuzuweisende Taste drücken...").addClass("disabled").on("keydown", function (event) {
            event.preventDefault();
            let charCode = event.which || event.keyCode;
            if (charCode === 27) {
                Storage.set(name, -1);
                $btn.blur().val("Keine Taste zugewiesen").removeClass("disabled").off(event).unbind("blur");
            } else {
                Storage.set(name, charCode);
                $btn.blur().val(getKeyName(charCode)).removeClass("disabled").off(event).unbind("blur");
            }
        }).on("blur", function (event) {
            event.preventDefault();
            $btn.val("Keine Taste zugewiesen").removeClass("disabled").off(event).unbind("blur");
        });
        showSaveBadge(this);
    });
    $(document).on("click", ".bpp-exportOptions", function () {
        let url = window.webkitURL || window.URL, obj = {};
        _.each(optionsArray, function (opt) {
            obj[opt.key] = Storage.get(opt.key, opt.default);
        });
        $(this).attr("href", url.createObjectURL(new Blob([Object.toJSON(obj, null, 4)], {type: "application/json"})));
    });
    $(document).on("change", ".bpp-importOptions", function (event) {
        if (event.target.files.length > 0) {
            let file = event.target.files[0],
                reader = new FileReader();
            reader.onloadend = function (evt) {
                try {
                    let importedOptions = evt.target.result.evalJSON();
                    debug("Einstellungen werden importiert:", importedOptions);
                    _.each(importedOptions, function (value, key) {
                        Storage.set(key, value);
                    });
                    setOptionsToValues();
                    Notification({
                        type: "success",
                        message: "Es wurden " + Object.keys(importedOptions).length + " Einstellungen importiert!"
                    });
                } catch (e) {
                    Notification({
                        type: "error",
                        message: "Die Sicherungsdatei ist ungültig!"
                    });
                }
            };
            reader.readAsBinaryString(file);
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
