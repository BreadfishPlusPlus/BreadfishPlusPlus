"use strict";

import React from "react";
import {findWhere} from "lodash";

export default class User extends React.Component {
    static propTypes = {
        channel: React.PropTypes.object.isRequired,
        client: React.PropTypes.object.isRequired,
        wcfProxy: React.PropTypes.func.isRequired
    };
    constructor(props) {
        super(props);
        this.state = {
            userName: props.client.name,
            userId: null,

            channelName: props.channel.name
        };
    }
    componentDidMount() {
        this.props.wcfProxy({
            autoSend: true,
            showLoadingOverlay: false,
            success: (data) => this.onProxyLoaded(data.returnValues),
            data: {
                actionName: "getSearchResultList",
                className: "wcf\\data\\user\\UserAction",
                interfaceName: "wcf\\data\\ISearchAction",
                parameters: {
                    data: {
                        includeUserGroups: false,
                        searchString: this.props.client.name
                    }
                }
            }
        });
    }
    onProxyLoaded(returnValues) {
        const user = findWhere(returnValues, {label: this.props.client.name});
        this.setState({
            userName: user.label,
            userId: user.objectID
        });
    }
    render() {
        if (this.state.userId === null) {
            return <li style={{marginRight: 3}}>{this.state.userName} ({this.state.channelName})</li>;
        }

        const userHref = "//breadfish.de/index.php?user/" + this.state.userId + "-" + this.state.userName.toLowerCase() + "/";
        return (
            <li style={{marginRight: 3}}>
                <a className="userLink" data-user-id={this.state.userId} href={userHref}>{this.state.userName}</a>
                <span> </span>
                ({this.state.channelName})
            </li>
        );
    }
}
