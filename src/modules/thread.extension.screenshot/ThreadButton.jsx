"use strict";

import React from "react";

export default class ThreadButton extends React.Component {
    render() {
        return (
           <li>
                <a
                    className="button bpp_screenshot_thread"
                    href="#"
                    title="Screenshot vom Thema erstellen"
                >
                    <span className="icon icon16 icon-picture"></span> <span>Screenshot erstellen</span>
                </a>
            </li>
        );
    }
}
