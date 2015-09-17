"use strict";

import React from "react";
import Option from "./Option";
import SubTabMenu from "./SubTabMenu";

export default class OptionsTab extends React.Component {
    static propTypes = {
        location: React.PropTypes.object.isRequired,
        option: React.PropTypes.object.isRequired,
        parsedHash: React.PropTypes.object.isRequired,
        subtab: React.PropTypes.object.isRequired
    };
    render() {
        const {option, parsedHash, subtab, location} = this.props;

        if (parsedHash.tab !== option.href || parsedHash.subtab !== subtab.href) {
            return false;
        }

        return (<div className="container tabMenuContent ui-tabs-panel ui-widget-content ui-corner-bottom" style={{display: parsedHash.tab === option.href && parsedHash.subtab === subtab.href ? "block": "none"}}>
            <SubTabMenu location={location} option={option} parsedHash={parsedHash} />
            <div className="containerPadding">
                <div className="containerPadding">
                    {subtab.categories.map(category => {
                        return (<fieldset key={category.name}>
                            <legend>{category.name}</legend>
                            {category.options.map(o => <Option optionKey={o.key} {...o} notificationSystem={this.refs.notificationSystem} />)}
                        </fieldset>);
                    })}
                </div>
            </div>
        </div>);
    }
}
