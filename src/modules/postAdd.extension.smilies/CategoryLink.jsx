"use strict";

import React from "react";

export default class CategoryLink extends React.Component {
    static propTypes = {
        index: React.PropTypes.number.isRequired,
        name: React.PropTypes.string.isRequired
    };
    render() {
        const name = "smilies-" + this.props.index;
        return (
            <li data-name={name} data-smiley-category-id={this.props.index}>
                <a>{this.props.name}</a>
            </li>
        );
    }
}
