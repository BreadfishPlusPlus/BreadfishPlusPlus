"use strict";

import React from "react";

export default class User extends React.Component {
    render() {
        const client = this.props.client;
        const channel = this.props.channel;

        let userHref = null;
        let style = {fontWeight: "bold"};
        let name = null;

        if (!client.breadfish) {
            style.textDecoration = "underline";
            userHref = "#";
            name = client.name;
        } else {
            userHref = "http://forum.sa-mp.de/index.php?page=User&userID=" + client.breadfish.id;
            name = client.breadfish.name;

            if (client.breadfish.rank === "Administrator") {
                style.color = "#0000A0";
            } else if (client.breadfish.rank === "Kon-Administrator") {
                style.color = "#0E5C0B";
            } else if (client.breadfish.rank === "Super Moderator") {
                style.color = "#FF9900";
            } else if (client.breadfish.rank === "Moderator") {
                style.color = "#A52A2A";
            } else if (client.breadfish.rank === "Donator") {
                style.color = "#009BFF";
            } else {
                delete style.fontWeight;
            }
        }

        return (<span>
            <a href={userHref}>
                <span style={style}>{name}</span>
            </a> ({channel.name}){this.props.needsComma ? ", ": ""}
        </span>);
    }
}
