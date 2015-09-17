"use strict";

import React from "react";
import TabMenu from "./TabMenu";
import AboutTab from "./AboutTab";
import ImportExportTab from "./ImportExportTab";
import OptionsTab from "./OptionsTab";

export default class Options extends React.Component {
    static propTypes = {
        domains: React.PropTypes.object.isRequired,
        location: React.PropTypes.object.isRequired,
        optionsObject: React.PropTypes.array.isRequired,
        parsedHash: React.PropTypes.object.isRequired,
        version: React.PropTypes.string.isRequired
    };
    render() {
        const {parsedHash, location, version, optionsObject, domains} = this.props;
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
                    <TabMenu location={location} optionsObject={optionsObject} parsedHash={parsedHash} />
                    <AboutTab domains={domains} parsedHash={parsedHash} version={version} />
                    {optionsObject.map(option => {
                        return option.subtabs.map(subtab => {
                            return (<OptionsTab
                                key={option.href + subtab.href}
                                location={location}
                                option={option}
                                parsedHash={parsedHash}
                                subtab={subtab}
                            />);
                        });
                    })}
                    {/*optionsObject.map(option => {
                        return option.subtabs.map(subtab => {
                            return (
                                <div
                                    className="container tabMenuContent ui-tabs-panel ui-widget-content ui-corner-bottom"
                                    key={option.href + subtab.href}
                                    style={{display: parsedHash.tab === option.href && parsedHash.subtab === subtab.href ? "block": "none"}}
                                >
                                    <div className="containerPadding">
                                        {subtab.categories.map(category => {
                                            return (<fieldset key={category.name}>
                                                <legend>{category.name}</legend>
                                                {category.options.map(option => <Option optionKey={option.key} {...option} notificationSystem={this.refs.notificationSystem} />)}
                                            </fieldset>);
                                        })}
                                    </div>
                                </div>
                            );
                        });
                    })*/}
                    <ImportExportTab parsedHash={parsedHash} />
                </section>
            </div>
        );
    }
}
