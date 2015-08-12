"use strict";

import React from "react";

export default class SubTabMenu extends React.Component {
    render() {
        const {parsedHash, optionsObject, location} = this.props;
        return (<div className="subTabMenu">
            <div className="containerHead">
                {optionsObject.map(o => {
                    const style = {display: parsedHash.tab === o.href ? "block": "none"};
                    return (<ul style={style} key={o.href}>
                        {o.subtabs.map(s => {
                            const href = location.pathname +
                                        location.search +
                                        "#/breadfishplusplus/!/" +
                                        o.href +
                                        "/" +
                                        s.href;
                            return (<li className={parsedHash.subtab === s.href ? "activeSubTabMenu": ""}  key={s.href}>
                                <a href={href}>
                                    <span>{s.name}</span>
                                </a>
                            </li>);
                        })}
                    </ul>);
                })}
            </div>
        </div>);
    }
}
