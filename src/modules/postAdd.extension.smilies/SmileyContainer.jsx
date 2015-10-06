"use strict";

import React from "react";

export default class SmileyContainer extends React.Component {
    static propTypes = {
        smileys: React.PropTypes.array.isRequired
    };
    render() {
        return (
            <ul className="smileyList">
                {this.props.smileys.map(smiley => {
                    const fullPath = `${BPP_CDN_DOMAIN}${smiley.path}`;
                    return (<li key={smiley.name}>
                        <a
                            className="jsSmiley"
                            data-smiley-code={"[IMG]" + fullPath + "[/IMG]"}
                            data-smiley-path={fullPath}
                        >
                            <img alt={smiley.file} src={fullPath} />
                        </a>
                    </li>);
                })}
            </ul>
        );
    }
}
