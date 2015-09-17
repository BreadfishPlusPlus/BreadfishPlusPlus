"use strict";

import React from "react";
const debug = require("debug")("SubTabMenu");

export default class SubTabMenu extends React.Component {
    static propTypes = {
        location: React.PropTypes.object.isRequired,
        option: React.PropTypes.object.isRequired,
        parsedHash: React.PropTypes.object.isRequired
    };
    render() {
        const {parsedHash, option, location} = this.props;
        //.messageTabMenu > div > nav
        return (
            <div className="messageTabMenu" style={{borderWidth: 0}}>
                <div style={{display: "block", borderWidth: 0, borderRadius: "6px 6px 0 0"}}>
                    <nav style={{margin: 0, borderRadius: "6px 6px 0 0"}}>
                        <ul key={option.href} style={{display: parsedHash.tab === option.href ? "block": "none"}}>
                            {option.subtabs.map(s => {
                                const href = location.pathname +
                                            location.search +
                                            "#" +
                                            option.href +
                                            "/" +
                                            s.href;
                                return (<li className={parsedHash.subtab === s.href ? "active": ""} key={s.href}>
                                    <a href={href}>
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
