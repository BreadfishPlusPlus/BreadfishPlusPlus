"use strict";

import React from "react";

export default class ReportReasons extends React.Component {
    static propTypes = {
        reasons: React.PropTypes.array.isRequired
    };
    render() {
        return (
            <div>
                {this.props.reasons.map((reason, index) => {
                    return (
                        <button
                            className="btn small bpp_reportReason"
                            data-value={reason.value}
                            key={index}
                        >{reason.key}</button>);
                })}
            </div>
        );
    }
}
