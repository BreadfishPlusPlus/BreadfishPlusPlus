"use strict";

import React from "react";

export default class Dialog extends React.Component {
    static propTypes = {
        postId: React.PropTypes.number.isRequired
    };
    getUrl() {
        return `http://sa-mp.de/B++/p${this.props.postId}-/`;
    }
    render() {
        return (
            <fieldset>
                <legend>
                    <label htmlFor="__shareShortlink">Kurz-URL</label>
                </legend>
                <input
                    className="long bpp_shortLinkInput"
                    id="__shareShortlink"
                    readOnly
                    type="text"
                    value={this.getUrl()}
                />
            </fieldset>
        );
    }
}
