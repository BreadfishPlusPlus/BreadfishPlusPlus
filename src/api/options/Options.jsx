"use strict";

import React from "react";
import TabMenu from "./TabMenu";
import AboutTab from "./AboutTab";
import ImportExportTab from "./ImportExportTab";
import OptionsTab from "./OptionsTab";
import Tabmanager from "../Tabmanager.js";

export default class Options extends React.Component {
    static propTypes = {
        domains: React.PropTypes.object.isRequired,
        optionsObject: React.PropTypes.array.isRequired,
        TabMngr: React.PropTypes.instanceOf(Tabmanager),
        version: React.PropTypes.string.isRequired
    };
    render() {
        const {version, optionsObject, domains, TabMngr} = this.props;
        console.log(optionsObject);
        return (
            <div className="bpp_options">
                <nav className="breadcrumbs marginTop">
                    <ul>
                        <li title="breadfish.de - DIE deutschsprachige GTA-Community">
                            <a href="http://forum.sa-mp.de/">
                                <span>breadfish.de - DIE deutschsprachige GTA-Community</span>
                            </a>
                            <span className="pointer"><span>»</span></span>
                        </li>
                    </ul>
                </nav>
                <header className="boxHeadline">
                    <h1>Breadfish++ <small>v{version}</small></h1>
                </header>
                <section className="marginTop tabMenuContainer ui-tabs ui-widget ui-widget-content ui-corner-all jsFlexibleMenuEnabled">
                    <TabMenu
                        optionsObject={optionsObject}
                        TabMngr={TabMngr}
                    />
                    <AboutTab domains={domains} currentTab={TabMngr.tab} version={version} />
                    {optionsObject.map(option => {
                        return option.subtabs.map(subtab => {
                            return (<OptionsTab
                                key={option.href + subtab.href}
                                option={option}
                                TabMngr={TabMngr}
                                subtab={subtab}
                            />);
                        });
                    })}
                    <ImportExportTab currentTab={TabMngr.tab} />
                </section>
            </div>
        );
    }
}
