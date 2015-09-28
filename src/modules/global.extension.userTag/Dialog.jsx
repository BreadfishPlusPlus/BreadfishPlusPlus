"use strict";

import React from "react";
//import Storage from "../storage";
import ColorPicker from "./ColorPicker.jsx";

export default class Dialog extends React.Component {
    static propTypes = {
        background: React.PropTypes.string,
        debug: React.PropTypes.func.isRequired,
        foreground: React.PropTypes.string,
        link: React.PropTypes.string,
        onClose: React.PropTypes.func.isRequired,
        tag: React.PropTypes.string,
        userName: React.PropTypes.string.isRequired
    };
    constructor(props) {
        super(props);

        this.state = {
            link: this.props.link || window.location.href,
            tag: this.props.tag || "",
            backgroundColor: this.props.background || "rgba(255,0,0,1)",
            foregroundColor: this.props.foreground || "rgba(255,255,255,1)",

            backgroundColorPickerActivated: false,
            foregroundColorPickerActivated: false
        };
    }
    onClose(event) {
        event.preventDefault();
        this.props.onClose(this.state.tag, this.state.link, this.state.backgroundColor, this.state.foregroundColor);
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    render() {
        this.props.debug("render", this.state);
        return (
            <div>
                <fieldset>
                    <dl>
                        <dt>Benutzer</dt>
                        <dd>{this.props.userName}</dd>
                    </dl>
                    <dl>
                        <dt>Tag</dt>
                        <dd>
                            <input
                                name="tag"
                                onChange={e => this.handleChange(e)}
                                style={{width: "100%"}}
                                type="text"
                                value={this.state.tag}
                            />
                            <small>Wird dieses Feld leer gelassen wird der Tag gelöscht.</small>
                        </dd>
                    </dl>
                    <dl>
                        <dt>Hintergrundfarbe</dt>
                        <dd>
                            <ColorPicker
                                color={this.state.backgroundColor}
                                onChange={color => this.setState({backgroundColor: color})}
                            />
                        </dd>
                    </dl>
                    <dl>
                        <dt>Schriftfarbe</dt>
                        <dd>
                            <ColorPicker
                                color={this.state.foregroundColor}
                                onChange={color => this.setState({foregroundColor: color})}
                            />
                        </dd>
                    </dl>
                    <dl>
                        <dt>Vorschau</dt>
                        <dd>
                            <span
                                className="badge label"
                                style={{
                                    backgroundColor: this.state.backgroundColor,
                                    color: this.state.foregroundColor
                                }}
                            >{this.state.tag || "Vorschau"}</span>
                        </dd>
                    </dl>
                    <dl>
                        <dt>Link</dt>
                        <dd>
                            <input
                                name="link"
                                onChange={e => this.handleChange(e)}
                                style={{width: "100%"}}
                                type="text"
                                value={this.state.link}
                            />
                            <small>Wenn angegeben, führt ein Klick auf den Tag automatisch zu diesem Link.</small>
                        </dd>
                    </dl>
                </fieldset>
                <div className="formSubmit">
                    <button className="buttonPrimary" onClick={e => this.onClose(e)}>
                        {window.WCF.Language.get("wcf.global.button.save")}
                    </button>
                </div>
            </div>
        );
    }
}
