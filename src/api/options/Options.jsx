"use strict";

import React from "react";
import TabMenu from "./TabMenu";
import SubTabMenu from "./SubTabMenu";
import AboutTab from "./AboutTab";
import ImportExportTab from "./ImportExportTab";
import Option from "./Option";

export default class Options extends React.Component {
    render() {
        const {parsedHash, location, version, optionsObject, domains} = this.props;
        const iconSrc = domains.cdn + "img/breadfish48.png";

        return (
            <div className="bpp_options">
                <div className="mainHeadline">
                    <img src={iconSrc} />
                    <div className="headlineContainer">
                        <h2>Breadfish++</h2>
                        <p>Version {version}</p>
                    </div>
                </div>
                <TabMenu parsedHash={parsedHash} optionsObject={optionsObject} location={location} />
                <SubTabMenu parsedHash={parsedHash} optionsObject={optionsObject} location={location} />
                <div className="border tabMenuContent">
                    <AboutTab parsedHash={parsedHash} version={version} domains={domains} />
                    {optionsObject.map(option => {
                        return option.subtabs.map(subtab => {
                            return (<div className="container-1" style={{display: parsedHash.tab === option.href && parsedHash.subtab === subtab.href ? "block": "none"}} key={option.href + subtab.href}>
                                {subtab.categories.map(category => {
                                    return (<fieldset key={category.name}>
                                        <legend>{category.name}</legend>
                                        {category.options.map(option => <Option {...option} />)}
                                    </fieldset>);
                                })}
                            </div>);
                        });
                    })}
                    <ImportExportTab parsedHash={parsedHash} />
                </div>
            </div>
        );
    }
}
