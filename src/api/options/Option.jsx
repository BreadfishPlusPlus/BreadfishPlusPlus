/*eslint react/no-multi-comp: 0*/
"use strict";

import React from "react";
import Storage from "./../storage";
import Notification from "../Notification";
import KeyboardJS from "keyboardjs";
import $ from "jquery";

class ToggleOption extends React.Component {
    static propTypes = {
        default: React.PropTypes.any.isRequired,
        description: React.PropTypes.string,
        name: React.PropTypes.string.isRequired,
        optionKey: React.PropTypes.string.isRequired,
        options: React.PropTypes.array,
        validate: React.PropTypes.func
    };
    constructor(props) {
        super(props);
        this.state = {
            value: Storage.get(this.props.optionKey, this.props.default) ? 1 : 0
        };
    }
    handleChange(event) {
        const value = ~~event.target.value;
        if (this.props.validate && !this.props.validate(value)) {
            return;
        }
        this.setState({value});
        Storage.set(this.props.optionKey, value === 1);
        Notification.create({
            title: "Optionen gespeichert!",
            message: `Option „${this.props.name}“ wurde gespeichert`,
            autoDismiss: 2
        });
    }
    getOption(value) {
        const defaultLabel = value === 0 ? "Deaktiviert" : "Aktiviert";
        let label = this.props.options ? this.props.options[value] : defaultLabel;
        if (value === ~~this.props.default) {
            label += " (Standard)";
        }
        return <option value={value}>{label}</option>;
    }
    render() {
        let description = false;
        if (this.props.description) {
            description = <small>{this.props.description}</small>;
        }
        return (
            <dl>
                <dt>
                    <label htmlFor={this.props.optionKey}>{this.props.name}</label>
                </dt>
                <dd>
                    <select
                        id={this.props.optionKey}
                        name={this.props.optionKey}
                        onChange={event => this.handleChange(event)}
                        value={this.state.value}
                    >
                        {this.getOption(0)}
                        {this.getOption(1)}
                    </select>
                    {description}
                </dd>
            </dl>
        );
    }
}

class SelectOption extends React.Component {
    static propTypes = {
        default: React.PropTypes.any.isRequired,
        description: React.PropTypes.string,
        name: React.PropTypes.string.isRequired,
        optionKey: React.PropTypes.string.isRequired,
        options: React.PropTypes.array.isRequired
    };
    constructor(props) {
        super(props);
        this.state = {
            value: Storage.get(this.props.optionKey, this.props.default)
        };
    }
    handleChange(event) {
        this.setState({value: ~~event.target.value});
        Storage.set(this.props.optionKey, ~~event.target.value);
        Notification.create({
            title: "Optionen gespeichert!",
            message: `Option „${this.props.name}“ wurde gespeichert`,
            autoDismiss: 2
        });
    }
    render() {
        let description = false;
        if (this.props.description) {
            description = <small>{this.props.description}</small>;
        }
        return (
            <dl>
                <dt>
                    <label htmlFor={this.props.optionKey}>{this.props.name}</label>
                </dt>
                <dd>
                    <select
                        id={this.props.optionKey}
                        name={this.props.optionKey}
                        onChange={event => this.handleChange(event)}
                        value={this.state.value}
                    >
                        {this.props.options.map(o => {
                            let name = o.name;
                            if (o.value === ~~this.props.default) {
                                name += " (Standard)";
                            }
                            return <option key={o.value} value={o.value}>{name}</option>;
                        })}
                    </select>
                    {description}
                </dd>
            </dl>
        );
    }
}

class KeyboardOption extends React.Component {
    static propTypes = {
        default: React.PropTypes.any.isRequired,
        description: React.PropTypes.string,
        name: React.PropTypes.string.isRequired,
        optionKey: React.PropTypes.string.isRequired
    };
    constructor(props) {
        super(props);
        this.state = {
            key: Storage.get(this.props.optionKey, this.props.default)
        };
        this._wcfDialog = null;
        this.onKeyDown = this.onKeyDown.bind(this);
    }
    getKeyName(key) {
        return KeyboardJS.getLocale("de")._keyMap[key][0];
    }
    onKeyDown(event) {
        console.log(event);
        event.preventDefault();

        if (!(event instanceof KeyboardEvent)) {
            return;
        }

        if (event.preventRepeat) {
            event.preventRepeat();
        }

        let keyCombo = this.getKeyName(event.which || event.keyCode);
        if (event.pressedKeys) {
            keyCombo = event.pressedKeys.join(" + ");
        }

        this.setState({ key: keyCombo });
        Storage.set(this.props.optionKey, keyCombo);

        this._wcfDialog.wcfDialog("close");
        KeyboardJS.unbind(null, this.onKeyDown);
    }
    showDialog() {
        const $dialog = $("<h1>Zuzuweisende Taste drücken...</h1>");

        $dialog.css({
            fontSize: "1.7rem",
            textAlign: "center",
            marginTop: "10px"
        });

        $dialog.find("input").css({
            opacity: 0,
            position: "absolute",
            top: 0,
            left: 0,
            pointerEvents: "none"
        }).on("keydown", this.onKeyDown);

        this._wcfDialog = $dialog.wcfDialog({
            closable: false,
            hideTitle: true
        });

        KeyboardJS.bind(null, this.onKeyDown);
    }
    onClick(event) {
        event.preventDefault();
        this.showDialog();

    }
    render() {
        let description = false;
        if (this.props.description) {
            description = <small>{this.props.description}</small>;
        }
        let btnClass = "btn";
        if (this.state.key !== null) {
            btnClass += " buttonPrimary";
        }
        return (
            <dl>
                <dt>
                    <label htmlFor={this.props.optionKey}>{this.props.name}</label>
                </dt>
                <dd>
                    <button className={btnClass} onClick={event => this.onClick(event)}>
                        <span className="icon icon16 icon-keyboard" /> {this.state.key || "Keine Taste zugewiesen"}
                    </button>
                    {description}
                </dd>
            </dl>
        );
    }
}

export default class Option extends React.Component {
    static propTypes = {
        category: React.PropTypes.string,
        default: React.PropTypes.any.isRequired,
        description: React.PropTypes.string,
        name: React.PropTypes.string,
        optionKey: React.PropTypes.string.isRequired,
        options: React.PropTypes.array,
        subtab: React.PropTypes.string,
        tab: React.PropTypes.string,
        type: React.PropTypes.string.isRequired,
        validate: React.PropTypes.func
    };
    render() {
        if (this.props.type === "toggle") {
            return <ToggleOption {...this.props} />;
        } else if (this.props.type === "select") {
            return <SelectOption {...this.props} />;
        } else if (this.props.type === "keyboard") {
            return <KeyboardOption {...this.props} />;
        } else {
            return false;
        }
    }
}
