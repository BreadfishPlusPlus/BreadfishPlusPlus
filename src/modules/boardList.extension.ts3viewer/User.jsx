"use strict";

import React from "react";

export default class User extends React.Component {
    static propTypes = {
        channel: React.PropTypes.object.isRequired,
        client: React.PropTypes.object.isRequired
    };
    render() {
        const client = this.props.client;
        const channel = this.props.channel;

        let userHref = null;

        if (client.id === -1) {
            userHref = "#";
        } else {
            userHref = "http://breadfish.de/index.php?user/" + client.id + "-" + client.name.toLowerCase() + "/";
        }

        return (
            <li style={{marginRight: 3}}>
                <a className="userLink" data-user-id={client.id} href={userHref}>{client.name}</a> ({channel.name})
            </li>
        );
    }
}
