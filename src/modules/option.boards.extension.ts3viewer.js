import {DefaultModule} from "../api.js";
import $ from "jquery";
import Moment from "moment";
import _ from "lodash";
import TS3ViewerTemplate from "templates/ts3Viewer.hbs";
const debug = require("debug")("option.boards.extension.ts3viewer");

export default class Top5Box extends DefaultModule {
    constructor() {
        super();
        debug("Wird geladen...");

        this.register({
            "key": "option.boards.extension.ts3viewer.enabled",
            "name": "Teamspeak 3 Anzeige",
            "tab": "Einstellungen",
            "subtab": "Forenübersicht",
            "category": "Erweiterungen",
            "type": "toggle",
            "default": false,
            "description": "Fügt auf der Startseite eine Infobox hinzu, welche anzeigt wer gerade auf dem Teamspeak Server ist."
        });

        if (!this.isTemplate("tplIndex")) {
            debug("Falsches template -> SKIP");
            return;
        }

        this.loadData();
    }
    showBox(data) {
        const lastUpdate = Moment.utc(new Date(data.lastUpdate));
        $(TS3ViewerTemplate({
            CDNDomain: this.getDomains().cdn,
            ts3data: data,
            nickname: $("#userNote a").text().trim(),
            uptime: Moment.duration(data.uptime, "s").humanize(),
            lastUpdateFormatted: lastUpdate.format("LLLL"),
            lastUpdateRelative: lastUpdate.fromNow(),
            userListFormatted: _.map(data.clients, function (cl) {
                let user = "";
                const channel = _.find(data.channels, ch => ch.id === cl.channel);
                if (cl.breadfish) {
                    user += "<a href=\"http://forum.sa-mp.de/index.php?page=User&amp;userID=" + cl.breadfish.id + "\">";
                    if (cl.breadfish.rank === "Administrator") {
                        user += "<span style=\"font-weight:bold; color:#0000A0\">" + cl.breadfish.name + "</span>";
                    } else if (cl.breadfish.rank === "Kon-Administrator") {
                        user += "<span style=\"font-weight:bold; color:#0E5C0B\">" + cl.breadfish.name + "</span>";
                    } else if (cl.breadfish.rank === "Super Moderator") {
                        user += "<span style=\"font-weight:bold; color:#FF9900\">" + cl.breadfish.name + "</span>";
                    } else if (cl.breadfish.rank === "Moderator") {
                        user += "<span style=\"font-weight:bold; color:#a52a2a\">" + cl.breadfish.name + "</span>";
                    } else if (cl.breadfish.rank === "Donator") {
                        user += "<span style=\"font-weight:bold; color:#009BFF\">" + cl.breadfish.name + "</span>";
                    } else {
                        user += "<span>" + cl.breadfish.name + "</span>";
                    }
                    user += "</a>";
                } else {
                    user += "<span style=\"font-weight:bold;text-decoration:underline;\">" + cl.name + "</span>";
                }
                user += " (" + channel.name + ")";
                return user;
            }).join(", ")
        })).prependTo(".border.infoBox");

        $(".infoBox > div").each(function (index) {
            $(this).removeClass("container-1").removeClass("container-2").addClass("container-" + ((index % 2) + 1));
        });
    }
    loadData() {
        $.getJSON(this.getDomains().teamspeak).done(function (response) {
            this.showBox(response);
        }.bind(this));
    }
}
