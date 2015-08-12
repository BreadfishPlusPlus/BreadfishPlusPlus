"use strict";

import React from "react";

export default class TabMenu extends React.Component {
    render() {
        const {parsedHash, optionsObject, location} = this.props;
        const aboutHref = location.pathname + location.search + "#/breadfishplusplus/!/about";
        const ieHref = location.pathname + location.search + "#/breadfishplusplus/!/importexport";
        return (<div id="profileEditContent" className="tabMenu">
            <ul>
                <li className={parsedHash.tab === "about" ? "activeTabMenu": ""}>
                    <a href={aboutHref}>
                        <img src="wcf/icon/infoM.png" /> <span>Info</span>
                    </a>
                </li>
                {optionsObject.map(o => {
                    const href = location.pathname + location.search + "#/breadfishplusplus/!/" + o.href;
                    return (<li className={parsedHash.tab === o.href ? "activeTabMenu": ""} key={o.href}>
                        <a href={href}>
                            <img src="wcf/icon/settingsM.png" /> <span>{o.name}</span>
                        </a>
                    </li>);
                })}
                <li className={parsedHash.tab === "importexport" ? "activeTabMenu": ""}>
                    <a href={ieHref}>
                        <img src="wcf/icon/dbExportM.png" /> <span>Einstellungen Importieren/Exportieren</span>
                    </a>
                </li>
            </ul>
        </div>);
    }
}
