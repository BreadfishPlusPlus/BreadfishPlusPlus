"use strict";

import React from "react";

export default class UserTagBadge extends React.Component {
    static propTypes = {
        background: React.PropTypes.string,
        foreground: React.PropTypes.string,
        link: React.PropTypes.string,
        tag: React.PropTypes.string
    };
    render() {
        if (!this.props.tag) {
            return false;
        }
        const style = {
            backgroundColor: this.props.background,
            color: this.props.foreground
        };
        if (!this.props.link) {
            return <p className="badge userTitleBadge userTagBadge" style={style}>{this.props.tag}</p>;
        } else {
            return <a className="badge userTitleBadge userTagBadge" href={this.props.link} style={style}>{this.props.tag}</a>;
        }
    }
}
