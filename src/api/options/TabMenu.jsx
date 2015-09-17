"use strict";

import React from "react";

export default class TabMenu extends React.Component {
    static propTypes = {
        location: React.PropTypes.object.isRequired,
        optionsObject: React.PropTypes.array.isRequired,
        parsedHash: React.PropTypes.object.isRequired
    };
    render() {
        const {parsedHash, optionsObject, location} = this.props;
        const aboutHref = location.pathname + location.search + "#about";
        const ieHref = location.pathname + location.search + "#importexport";

        return (<nav className="tabMenu">
            <ul className="ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all">
                <li className={parsedHash.tab === "about" ? "ui-state-default ui-corner-top ui-tabs-active ui-state-active": "ui-state-default ui-corner-top"}>
                    <a href={aboutHref}>
                        <span>Info</span>
                    </a>
                </li>
                {optionsObject.map(o => {
                    const href = location.pathname + location.search + "#" + o.href;
                    return (<li className={parsedHash.tab === o.href ? "ui-state-default ui-corner-top ui-tabs-active ui-state-active": "ui-state-default ui-corner-top"} key={o.href}>
                        <a href={href}>
                            <span>{o.name}</span>
                        </a>
                    </li>);
                })}
                <li className={parsedHash.tab === "importexport" ? "ui-state-default ui-corner-top ui-tabs-active ui-state-active": "ui-state-default ui-corner-top"}>
                    <a href={ieHref}>
                        <span>Einstellungen Importieren/Exportieren</span>
                    </a>
                </li>
            </ul>
        </nav>);
    }
}
