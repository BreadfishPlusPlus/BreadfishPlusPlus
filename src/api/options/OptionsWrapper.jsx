"use strict";

import React from "react";
import TabMenu from "./TabMenu";
import AboutTab from "./AboutTab";
import ImportExportTab from "./ImportExportTab";
import OptionsTab from "./OptionsTab";
import Tabmanager from "../Tabmanager.js";
import {uniq, compact, filter, isUndefined} from "lodash";

export default class OptionsWrapper extends React.Component {
    static propTypes = {
        TabMngr: React.PropTypes.instanceOf(Tabmanager),
        optionsArray: React.PropTypes.array.isRequired
    };
    sanitizeHref(href) {
        return href.replace(/[^a-z0-9]/gi, "").toLowerCase();
    }
    getTabs() {
        let tabs = this.props.optionsArray.map(o => o.tab);
        tabs = compact(uniq(tabs));
        tabs = tabs.map(name => {
            return {
                name,
                href: this.sanitizeHref(name)
            };
        });
        return tabs;
    }
    getSubtabs() {
        let subtabs = filter(this.props.optionsArray, o => !isUndefined(o.tab));
        subtabs = filter(subtabs, o => this.sanitizeHref(o.tab) === this.props.TabMngr.tab);
        subtabs = subtabs.map(o => o.subtab);
        subtabs = compact(uniq(subtabs));
        subtabs = subtabs.map(name => {
            return {
                name,
                href: this.sanitizeHref(name)
            };
        });
        return subtabs;
    }
    getVisibleOptions() {
        const options = filter(this.props.optionsArray, option => {
            if (isUndefined(option.tab)) {
                return false;
            }
            if (this.sanitizeHref(option.tab) !== this.props.TabMngr.tab) {
                return false;
            }
            if (this.sanitizeHref(option.subtab) !== this.props.TabMngr.subtab) {
                return false;
            }
            return true;
        });
        return options;
    }
    render() {
        const {TabMngr} = this.props;
        return (
            <div className="bpp_options">
                <nav className="breadcrumbs marginTop">
                    <ul>
                        <li title="breadfish.de - DIE deutschsprachige GTA-Community">
                            <a href="http://breadfish.de/">
                                <span>breadfish.de - DIE deutschsprachige GTA-Community</span>
                            </a>
                            <span className="pointer"><span>»</span></span>
                        </li>
                    </ul>
                </nav>
                <header className="boxHeadline">
                    <h1>Breadfish++ <small>v{BPP_VERSION}</small></h1>
                </header>
                <section className="marginTop tabMenuContainer ui-tabs ui-widget ui-widget-content ui-corner-all jsFlexibleMenuEnabled">
                    <TabMenu
                        TabMngr={TabMngr}
                        tabList={this.getTabs()}
                    />
                    <AboutTab currentTab={TabMngr.tab} />
                    <OptionsTab
                        TabMngr={this.props.TabMngr}
                        options={this.getVisibleOptions()}
                        subtabs={this.getSubtabs()}
                    />
                    <ImportExportTab currentTab={TabMngr.tab} />
                </section>
            </div>
        );
    }
}
