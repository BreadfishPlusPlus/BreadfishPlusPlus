"use strict";

import React from "react";
import Tabmanager from "../Tabmanager.js";

export default class SubTabMenu extends React.Component {
    static propTypes = {
        TabMngr: React.PropTypes.instanceOf(Tabmanager),
        subtabs: React.PropTypes.array.isRequired
    };
    render() {
        const {TabMngr, subtabs} = this.props;

        if (subtabs.length === 0) {
            return false;
        }
        //.messageTabMenu > div > nav
        return (
            <div className="messageTabMenu" style={{borderWidth: 0}}>
                <div style={{display: "block", borderWidth: 0, borderRadius: "6px 6px 0 0"}}>
                    <nav style={{margin: 0, borderRadius: "6px 6px 0 0"}}>
                        <ul>
                            {subtabs.map(s => {
                                const href = TabMngr.getBaseUrl() + "/" + TabMngr.tab + "/" + s.href;
                                return (<li className={TabMngr.subtab === s.href ? "active": ""} key={s.href}>
                                    <a href={href} onClick={(event) => TabMngr.changeSubTab(s.href, event)}>
                                        <span>{s.name}</span>
                                    </a>
                                </li>);
                            })}
                        </ul>
                    </nav>
                </div>
            </div>
        );
    }
}
