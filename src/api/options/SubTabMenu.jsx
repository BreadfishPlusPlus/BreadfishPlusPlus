"use strict";

import React from "react";
import Tabmanager from "../Tabmanager.js";
const debug = require("debug")("SubTabMenu");

export default class SubTabMenu extends React.Component {
    static propTypes = {
        TabMngr: React.PropTypes.instanceOf(Tabmanager),
        option: React.PropTypes.object.isRequired,
    };
    render() {
        const {TabMngr, option} = this.props;
        //.messageTabMenu > div > nav
        return (
            <div className="messageTabMenu" style={{borderWidth: 0}}>
                <div style={{display: "block", borderWidth: 0, borderRadius: "6px 6px 0 0"}}>
                    <nav style={{margin: 0, borderRadius: "6px 6px 0 0"}}>
                        <ul key={option.href} style={{display: TabMngr.tab === option.href ? "block": "none"}}>
                            {option.subtabs.map(s => {
                                const href = TabMngr.getBaseUrl() + "/" + option.href + "/" + s.href;
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
