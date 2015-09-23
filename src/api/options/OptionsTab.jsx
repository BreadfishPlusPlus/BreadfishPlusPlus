"use strict";

import React from "react";
import SubTabMenu from "./SubTabMenu";
import OptionCategory from "./OptionCategory";
import Tabmanager from "../Tabmanager.js";
import {groupBy, mapValues, values} from "lodash";

export default class OptionsTab extends React.Component {
    static propTypes = {
        TabMngr: React.PropTypes.instanceOf(Tabmanager),
        options: React.PropTypes.array.isRequired,
        subtabs: React.PropTypes.array.isRequired
    };
    getCategories() {
        const categories = groupBy(this.props.options, o => o.category);

        return values(mapValues(categories, (options, categoryName) => {
            return <OptionCategory key={categoryName} name={categoryName} options={options} />;
        }));
    }
    render() {
        const {TabMngr, options, subtabs} = this.props;

        if (options.length === 0) {
            return false;
        }

        return (<div className="container tabMenuContent ui-tabs-panel ui-widget-content ui-corner-bottom">
            <SubTabMenu TabMngr={TabMngr} subtabs={subtabs}  />
            <div className="containerPadding">
                <div className="containerPadding">
                    {this.getCategories()}
                </div>
            </div>
        </div>);
    }
}
