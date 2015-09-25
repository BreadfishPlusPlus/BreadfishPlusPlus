"use strict";

import React from "react";
import _ from "lodash";
import Moment from "moment";
import Superagent from "superagent";
import User from "./User.jsx";

export default class TS3Viewer extends React.Component {
    static propTypes = {
        cacheLifetime: React.PropTypes.number.isRequired,
        debug: React.PropTypes.func.isRequired,
        nickname: React.PropTypes.string.isRequired,
        refreshInterval: React.PropTypes.number.isRequired
    };
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        this.getJson();
        setInterval(this.getJson.bind(this), this.props.refreshInterval);
    }
    getJson() {
        this.props.debug("Frage Teamspeak Daten ab...");
        Superagent.get(BPP_TS_DOMAIN).end(function (err, res) {
            if (res.body && res.body.error) {
                this.setState({error: res.body.error});
                return this.props.debug("Teamspeak API meldet einen Fehler: ", res.body.error);
            }

            this.setState(res.body);

            const updateIn = (res.body.lastUpdate + this.props.cacheLifetime) - Date.now();
            this.props.debug("Neue Daten werden in %s Sekunden abgefragt", updateIn / 1000);
            setTimeout(this.getJson.bind(this), updateIn);
        }.bind(this));
    }
    render() {
        this.props.debug("Render template...", this.state);
        if (_.isEmpty(this.state)) {
            return false;
        }

        if (this.state.error) {
            return (
                <div className="box32">
                    <span className="icon icon32 icon-headphones"></span>
                    <div className="error" style={{marginTop: 0}}>{this.state.error}</div>
                </div>
            );
        }

        const connectHref = "ts3server://" + this.state.address + "?port=" + this.state.port + "&amp;nickname=" + this.props.nickname;
        const uptime = Moment.duration(this.state.uptime, "s").humanize();

        const lastUpdate = Moment.utc(new Date(this.state.lastUpdate));
        const lastUpdateFormatted = lastUpdate.format("LLLL");
        const lastUpdateRelative = lastUpdate.fromNow();
        return (
            <div className="box32">
                <span className="icon icon32 icon-headphones"></span>
                <div>
                    <div className="containerHeadline">
                        <h3>
                            <a href={connectHref}>{this.state.name} - {this.state.welcomemessage}</a> <span className="badge">{this.state.clients.length}</span>
                        </h3>
                        <p>
                            {this.state.plattform} {this.state.version}
                            &nbsp;- Clients: {this.state.clients.length}/{this.state.maxclients}
                            &nbsp;- Channels: {this.state.channels.length}
                            &nbsp;- Online seit: {uptime}
                            &nbsp;- Letzte aktualisierung: <abbr title={lastUpdateFormatted}>{lastUpdateRelative}</abbr>
                        </p>
                    </div>
                    <ul className="dataList">
                        {this.state.clients.map(client => {
                            const channel = _.find(this.state.channels, ch => ch.id === client.channel);
                            return (<User
                                channel={channel}
                                client={client}
                                key={client.name}
                            />);
                        })}
                    </ul>
                </div>
            </div>
        );
    }
}
