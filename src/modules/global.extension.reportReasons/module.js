"use strict";

import {DefaultModule} from "../../api";
import $ from "jquery";
import {debounce} from "lodash";
import React from "react";
import ReportReasons from "./ReportReasons.jsx";
const debug = require("debug")("B++:module:global.extension.reportReasons");

export default class Module extends DefaultModule {
    constructor() {
        super();
        debug("Wird geladen...");

        this.register({
            "key": "option.global.extension.reportReasons.enabled",
            "name": "Meldungsgründe",
            "tab": "Einstellungen",
            "subtab": "Global",
            "category": "Erweiterungen",
            "type": "toggle",
            "default": false,
            "description": "Fügt vordefinierte Gründe beim Melden eines Beitrags/Benutzers hinzu."
        });
        this.register({
            "key": "option.global.extension.reportReasons.thread",
            "type": "invis",
            default: [{
                key: "Anschuldigung ohne Beweise",
                value: "Dieser Beitrag erhebt folgende Anschuldigungen, ohne diese zu beweisen: "
            }, {
                key: "Beleidigung",
                value: "Dieser Beitrag ist Beleidigend, weil "
            }, {
                key: "Crossposting",
                value: "Dieser Beitrag ist ein Doppelpost."
            }, {
                key: "Doppelpost",
                value: "Dieser Beitrag erhebt folgende Anschuldigungen, ohne diese zu beweisen: "
            }, {
                key: "Falscher Bereich",
                value: "Dieser Beitrag ist im Falschen Bereich, weil "
            }, {
                key: "Falscher Umgangston",
                value: "Dieser Beitrag weist einen falschen Umgangston auf, weil "
            }, {
                key: "Threadpushing",
                value: "Dieser Beitrag ist ausschließlich dazu da, das Thema zu Pushen."
            }, {
                key: "Spam",
                value: "Dieser Beitrag ist Spam, weil "
            }]
        });
        this.register({
            "key": "option.global.extension.reportReasons.user",
            "type": "invis",
            default: [{
                key: "Avatar",
                value: "Der Avatar dieses Benutzers sollte überprüft werden, weil "
            }, {
                key: "Benutzername",
                value: "Der Benutzername dieses Benutzers sollte überprüft werden, weil "
            }, {
                key: "Benutzertitel",
                value: "Der Benutzertitel dieses Benutzers sollte überprüft werden, weil "
            }, {
                key: "Multiaccount",
                value: "Dieser Account ist ein Multiaccount mit: <Name des anderen Accounts> (<Link zum Profil>)\nBeweise: "
            }, {
                key: "Signatur",
                value: "Die Signatur dieses Benutzers sollte überprüft werden, weil "
            }]
        });

        if (!this.storage.get("option.global.extension.reportReasons.enabled", false)) {
            debug("Deaktiviert -> SKIP");
            return;
        }

        if (this.isTemplate("thread")) {
            this.wcf.DOMNodeInsertedHandler.addCallback("WCF.Moderation.Report616805285", debounce(this.initThreadReportReasons, 150).bind(this));
        } else if (this.isTemplate("user")) {
            this.wcf.DOMNodeInsertedHandler.addCallback("WCF.Moderation.Report1618977933", debounce(this.initUserReportReasons, 150).bind(this));
        }
    }
    initUserReportReasons() {
        if ($("#moderationReport").legnth === 0) {
            return;
        }
        debug("initUserReportReasons", $("#moderationReport").legnth !== 0);

        const $txtArea = $("#moderationReport textarea");

        $txtArea.after(React.renderToStaticMarkup(<ReportReasons
            reasons={this.storage.get("option.global.extension.reportReasons.user", [])}
        />));


        $(".bpp_reportReason").off().on("click", (event) => {
            debug("click", $(event.target).data());

            $txtArea.val(function(i, text) {
                return text + $(event.target).data("value");
            });
        });
    }
    initThreadReportReasons() {
        if ($("#moderationReport").legnth === 0) {
            return;
        }
        debug("initThreadReportReasons", $("#moderationReport").legnth !== 0);

        const $txtArea = $("#moderationReport textarea");

        $txtArea.after(React.renderToStaticMarkup(<ReportReasons
            reasons={this.storage.get("option.global.extension.reportReasons.thread", [])}
        />));


        $(".bpp_reportReason").off().on("click", (event) => {
            debug("click", $(event.target).data());

            $txtArea.val(function(i, text) {
                return text + $(event.target).data("value");
            });
        });
    }
}
