/*eslint no-console: 0*/
"use strict";

import React from "react";

export default class Dialog extends React.Component {
    static propTypes = {
        debug: React.PropTypes.func.isRequired,
        screenshotUrl: React.PropTypes.string.isRequired
    };
    constructor(props) {
        super(props);
        this.props.debug("constructor", props);

        this.state = {
            status: 0,
            error: null
        };

        this.img = new Image();
        this.img.onload = this.handleLoad.bind(this);
        this.img.onerror = this.handleError.bind(this);
        this.img.src = this.props.screenshotUrl;
    }
    handleLoad(event) {
        this.props.debug("handleLoad", event);
        this.setState({
            status: 2
        });
    }
    handleError(error) {
        this.props.debug("Error: %s", error.toString());
        console.error(error);
        this.setState({
            status: 1,
            error: error.toString()
        });
    }
    handleCkick() {
        React.findDOMNode(this.refs.screenshotUrl).select();
    }
    render() {
        this.props.debug("render", this.state);
        if (this.state.status === 0) {
            return (
                <div style={{ textAlign: "center" }}>
                    <i className="fa fa-spinner fa-spin" style={{ fontSize: "4rem", margin: 20 }} />
                    <div className="formSubmit">
                        <h1 style={{ fontSize: 14 }}>Der Screenshot wird gerade erstellt, einen Moment...</h1>
                    </div>
                </div>
            );
        }
        if (this.state.status === 1) {
            return (
                <div className="error" style={{marginTop: 0}}>{this.state.error}</div>
            );
        }
        if (this.state.status === 2) {
            return (
                <div style={{
                    overflow: "hidden",
                    height: 200,
                    width: 460
                }}>
                    <div style={{
                        position: "absolute",
                        top: 49,
                        left: 0,
                        width: "100%",
                        height: "calc(100% - 49px)",
                        overflow: "hidden",
                        borderRadius: "0 0 7px 7px",
                        backgroundImage: `url(${this.props.screenshotUrl})`,
                        backgroundSize: "cover"
                    }} />
                    <div className="formSubmit" style={{padding: 0,borderTopWidth: 0}}>
                        <input
                            onClick={() => this.handleCkick()}
                            readOnly
                            ref="screenshotUrl"
                            style={{
                                width: "100%",
                                marginBottom: 10,
                                textAlign: "center",
                                margin: 0,
                                padding: "10px 0",
                                borderWidth: "1px 0 0 0",
                                borderRadius: "0 0 7px 7px"
                            }}
                            type="text"
                            value={this.props.screenshotUrl}
                        />
                    </div>
                </div>
            );
        }
    }
}
