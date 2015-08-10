"use strict";

import {DefaultModule} from "../../api.js";
import _ from "lodash";
import $ from "jquery";
import Moment from "moment";
import React from "react";
const debug = require("debug")("option.boards.extension.ts3viewer");

export default class Template extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    getJson() {
        debug("Frage Teamspeak Daten ab...");
        $.getJSON(this.props.domains.teamspeak).done(function (response) {
            this.setState(response);
        }.bind(this));
    }
    componentDidMount() {
        this.getJson();
        setInterval(this.getJson.bind(this), 60 * 1000);
    }
    render() {
        debug("Render template...", this.state);
        if (_.isEmpty(this.state)) {
            return false;
        }
        const iconSrc = this.props.domains.cdn + "img/ts3/icon24.png";
        if (this.state.error) {
            return (
                <div className="container-2 infoBoxts3viewer">
                    <div className="containerIcon"><img src={iconSrc} alt="" /></div>
                    <div className="containerContent">
                        <div className="error" style={{marginBottom: 0}}>{this.state.error}</div>
                    </div>
                </div>
            );
        }

        const connectHref = "ts3server://" + this.state.address + "?port=" + this.state.port + "&amp;nickname=" + this.props.nickname;

        const uptime = Moment.duration(this.state.uptime, "s").humanize();

        const lastUpdate = Moment.utc(new Date(this.state.lastUpdate));
        const lastUpdateFormatted = lastUpdate.format("LLLL");
        const lastUpdateRelative = lastUpdate.fromNow();

        return (<div className="container-2 infoBoxts3viewer">
            <div className="containerIcon"><img src={iconSrc} alt="" /></div>
            <div className="containerContent">
                <h3>
                    <a href={connectHref}>{this.state.name} - {this.state.welcomemessage}</a>
                    <span> (<a href="http://sa-mp.de/B++/p1064020-/"><small>Teamspeak-Wächter</small></a>)</span>
                </h3>
                <p className="smallFont">
                    {this.state.plattform} {this.state.version}
                    - Clients: {this.state.clients.length}/{this.state.maxclients}
                    - Channels: {this.state.channels.length}
                    - Online seit: {uptime}
                    - Letzte aktualisierung: <abbr title={lastUpdateFormatted}>{lastUpdateRelative}</abbr>
                </p>
                <p className="smallFont">
                    {this.state.clients.map(function (client) {
                        const channel = _.find(this.state.channels, ch => ch.id === client.channel);

                        if (!client.breadfish) {
                            return (<span>
                                <span style={{fontWeight: "bold", textDecoration: "underline"}}>{client.name}</span> ({channel.name})
                            </span>);
                        }

                        const userHref = "http://forum.sa-mp.de/index.php?page=User&userID=" + client.breadfish.id;

                        if (client.breadfish.rank === "Administrator") {
                            return (<span>
                                <a href={userHref}>
                                    <span style={{fontWeight: "bold", color: "#0000A0"}}>{client.breadfish.name}</span>
                                </a> ({channel.name})
                            </span>);
                        }
                        if (client.breadfish.rank === "Kon-Administrator") {
                            return (<span>
                                <a href={userHref}>
                                    <span style={{fontWeight: "bold", color: "#0E5C0B"}}>{client.breadfish.name}</span>
                                </a> ({channel.name})
                            </span>);
                        }
                        if (client.breadfish.rank === "Super Moderator") {
                            return (<span>
                                <a href={userHref}>
                                    <span style={{fontWeight: "bold", color: "#FF9900"}}>{client.breadfish.name}</span>
                                </a> ({channel.name})
                            </span>);
                        }
                        if (client.breadfish.rank === "Moderator") {
                            return (<span>
                                <a href={userHref}>
                                    <span style={{fontWeight: "bold", color: "#a52a2a"}}>{client.breadfish.name}</span>
                                </a> ({channel.name})
                            </span>);
                        }
                        if (client.breadfish.rank === "Donator") {
                            return (<span>
                                <a href={userHref}>
                                    <span style={{fontWeight: "bold", color: "#009BFF"}}>{client.breadfish.name}</span>
                                </a> ({channel.name})
                            </span>);
                        }

                        return (<span>
                            <a href={userHref}>
                                <span>{client.breadfish.name}</span>
                            </a> ({channel.name})
                        </span>);
                    }.bind(this))}
                </p>
                <p className="smallFont">Legende:
                    <span style={{fontWeight: "bold", color: "#0000A0"}}>Administratoren</span>,
                    <span style={{fontWeight: "bold", color: "#0E5C0B"}}>Kon-Administratoren</span>,
                    <span style={{fontWeight: "bold", color: "#FF9900"}}>Super Moderatoren</span>,
                    <span style={{fontWeight: "bold", color: "#a52a2a"}}>Moderatoren</span>,
                    <span style={{fontWeight: "bold", color: "#009BFF"}}>Donator's Club</span>,
                    <span>Benutzer</span>
                </p>
            </div>
        </div>);
    }
}

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

        const infobox = document.querySelector(".border.infoBox");
        const container = document.createElement("div");
        infobox.insertBefore(container, infobox.firstChild);
        React.render(<Template
            domains={this.getDomains()}
            nickname={$("#userNote a").text().trim()}
            refreshInterval={300000} // https://github.com/BreadfishPlusPlus/Teamspeak-Info#cache_lifetime
        />, container);
    }
}
