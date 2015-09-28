"use strict";

import React from "react";
import Option from "./Option";

export default class OptionsCategory extends React.Component {
    static propTypes = {
        name: React.PropTypes.string.isRequired,
        options: React.PropTypes.array.isRequired
    };
    render() {
        const {name, options} = this.props;

        return (
            <fieldset>
                <legend>{name}</legend>
                {options.map(option => <Option optionKey={option.key} {...option} notificationSystem={this.refs.notificationSystem} />)}
            </fieldset>
        );
    }
}
