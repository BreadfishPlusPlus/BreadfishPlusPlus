"use strict";

import React from "react";

export default class Top5Box extends React.Component {
    static propTypes = {
        refreshInterval: React.PropTypes.number.isRequired,
        refreshPosts: React.PropTypes.func.isRequired
    };
    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: false,
            lastRefresh: Date.now(),
            dots: 3
        };
    }
    componentDidMount() {
        setInterval(this.forceUpdate.bind(this), 100);
        this.showDots();
    }
    showDots() {
        if (this.state.isRefreshing) {
            this.setState({dots: this.state.dots > 2 ? 1 : this.state.dots + 1});
            setTimeout(this.showDots.bind(this), 300);
        }
    }
    render() {
        if (this.state.isRefreshing) {
            const dots = new Array(this.state.dots + 1).join(".");
            return <small>(Wird aktualisiert {dots})</small>;
        }

        var remain = Math.round((this.state.lastRefresh + this.props.refreshInterval - Date.now()) / 1000);
        return <small onClick={this.props.refreshPosts} style={{cursor: "pointer"}}>(Automatische Aktualisierung in {remain} Sekunden)</small>;
    }
}
