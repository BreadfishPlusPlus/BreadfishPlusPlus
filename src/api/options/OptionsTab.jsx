"use strict";

import React from "react";
import Option from "./Option";
import SubTabMenu from "./SubTabMenu";
import Tabmanager from "../Tabmanager.js";

export default class OptionsTab extends React.Component {
    static propTypes = {
        option: React.PropTypes.object.isRequired,
        TabMngr: React.PropTypes.instanceOf(Tabmanager),
        subtab: React.PropTypes.object.isRequired
    };
    render() {
        const {option, TabMngr, subtab, location} = this.props;

        console.log("OptionsTab", TabMngr.tab, option.href, TabMngr.subtab, subtab.href);

        if (TabMngr.tab !== option.href || TabMngr.subtab !== subtab.href) {
            return false;
        }

        return (<div className="container tabMenuContent ui-tabs-panel ui-widget-content ui-corner-bottom">
            <SubTabMenu option={option} TabMngr={TabMngr} />
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
