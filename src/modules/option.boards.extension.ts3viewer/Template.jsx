"use strict";

import React from "react";
import _ from "lodash";
import Moment from "moment";
import Superagent from "superagent";
import User from "./User.jsx";

export default class TS3Viewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    getJson() {
        this.props.debug("Frage Teamspeak Daten ab...");
        Superagent.get(this.props.domains.teamspeak).end(function (err, res) {
            if (err) {
                return this.props.debug("Fehler beim abfragen der Teamspeak Daten: ", err);
            }
            if (res.body.error) {
                return this.props.debug("Teamspeak API meldet einen Fehler: ", res.body.error);
            }
            this.setState(res.body);

            const updateIn = (res.body.lastUpdate + this.props.cacheLifetime) - Date.now();
            this.props.debug("Neue Daten werden in %s Sekunden abgefragt", updateIn / 1000);
            setTimeout(this.getJson.bind(this), updateIn);
        }.bind(this));
    }
    componentDidMount() {
        this.getJson();
        setInterval(this.forceUpdate.bind(this), this.props.refreshInterval);
    }
    render() {
        this.props.debug("Render template...", this.state);
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
                    &nbsp;- Clients: {this.state.clients.length}/{this.state.maxclients}
                    &nbsp;- Channels: {this.state.channels.length}
                    &nbsp;- Online seit: {uptime}
                    &nbsp;- Letzte aktualisierung: <abbr title={lastUpdateFormatted}>{lastUpdateRelative}</abbr>
                </p>
                <p className="smallFont">
                    {this.state.clients.map(function (client, index) {
                        const channel = _.find(this.state.channels, ch => ch.id === client.channel);
                        return <User
                            key={client.name}
                            channel={channel}
                            client={client}
                            needsComma={this.state.clients.legnth > 1 && index !== this.state.clients.legnth - 1}
                        />;
                    }.bind(this))}
                </p>
                <p className="smallFont">Legende:
                    <span style={{fontWeight: "bold", color: "#0000A0"}}>Administratoren</span>,&nbsp;
                    <span style={{fontWeight: "bold", color: "#0E5C0B"}}>Kon-Administratoren</span>,&nbsp;
                    <span style={{fontWeight: "bold", color: "#FF9900"}}>Super Moderatoren</span>,&nbsp;
                    <span style={{fontWeight: "bold", color: "#a52a2a"}}>Moderatoren</span>,&nbsp;
                    <span style={{fontWeight: "bold", color: "#009BFF"}}>Donator's Club</span>,&nbsp;
                    <span>Benutzer</span>
                </p>
            </div>
        </div>);
    }
}
