"use strict";

import React from "react";

export default class Button extends React.Component {
    render() {
        return (
            <li>
                <a
                    className="button shortUrlButton jsTooltip"
                    href="#"
                    title="Kurz-URL zu diesem Beitrag"
                >
                    <span className="icon icon16 icon-link"></span>
                    <span className="invisible">Kurz-URL zu diesem Beitrag</span>
                </a>
            </li>
        );
    }
}
