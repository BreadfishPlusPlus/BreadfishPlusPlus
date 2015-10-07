"use strict";

import React from "react";

export default class PostButton extends React.Component {
    render() {
        return (
            <li>
                <a
                    className="button jsTooltip"
                    href="#"
                    title="Screenshot vom Beitrag erstellen"
                >
                    <span className="icon icon16 icon-picture"></span> <span className="invisible">Screenshot vom Beitrag erstellen</span>
                </a>
            </li>
        );
    }
}
