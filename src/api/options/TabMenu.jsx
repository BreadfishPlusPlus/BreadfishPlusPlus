"use strict";

import React from "react";
import Tabmanager from "../Tabmanager.js";

export default class TabMenu extends React.Component {
    static propTypes = {
        TabMngr: React.PropTypes.instanceOf(Tabmanager),
        tabList: React.PropTypes.array.isRequired
    };
    render() {
        const {TabMngr, tabList} = this.props;

        return (<nav className="tabMenu">
            <ul className="ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all">
                <li className={TabMngr.tab === "about" ? "ui-state-default ui-corner-top ui-tabs-active ui-state-active": "ui-state-default ui-corner-top"}>
                    <a href={"index.php?settings/Breadfish++/about"} onClick={(event) => TabMngr.changeTab("about", event)}>
                        <span>Info</span>
                    </a>
                </li>
                {tabList.map(tab => {
                    const href = TabMngr.getBaseUrl() + "/" + tab.href;
                    return (<li className={TabMngr.tab === tab.href ? "ui-state-default ui-corner-top ui-tabs-active ui-state-active": "ui-state-default ui-corner-top"} key={tab.href}>
                        <a href={href} onClick={(event) => TabMngr.changeTab(tab.href, event)}>
                            <span>{tab.name}</span>
                        </a>
                    </li>);
                })}
                <li className={TabMngr.tab === "importexport" ? "ui-state-default ui-corner-top ui-tabs-active ui-state-active": "ui-state-default ui-corner-top"}>
                    <a href={"index.php?settings/Breadfish++/importexport"} onClick={(event) => TabMngr.changeTab("importexport", event)}>
                        <span>Einstellungen Importieren/Exportieren</span>
                    </a>
                </li>
            </ul>
        </nav>);
    }
}
