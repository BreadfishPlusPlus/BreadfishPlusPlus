"use strict";

import React from "react";
import Storage from "./../storage";
import Notification from "../Notification";

class ToggleOption extends React.Component {
    static propTypes = {
        default: React.PropTypes.any.isRequired,
        description: React.PropTypes.string,
        name: React.PropTypes.string.isRequired,
        optionKey: React.PropTypes.string.isRequired,
        options: React.PropTypes.array
    };
    constructor(props) {
        super(props);
        this.state = {
            value: Storage.get(this.props.optionKey, this.props.default) ? 1 : 0
        };
    }
    shandleChange() {
        Storage.set(this.props.optionKey, !this.state.checked);
        this.setState({checked: !this.state.checked});
        Notification.addNotification({
            title: "Optionen gespeichert!",
            level: "info",
            position: "br",
            autoDismiss: 1
        });
    }
    handleChange(event) {
        this.setState({value: ~~event.target.value});
        Storage.set(this.props.optionKey, (~~event.target.value) === 1);
        Notification.addNotification({
            title: "Optionen gespeichert!",
            level: "info",
            position: "br",
            autoDismiss: 1
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
                        <option value={1}>{this.props.options ? this.props.options[0] : "Aktiviert"}</option>
                        <option value={0}>{this.props.options ? this.props.options[1] : "Deaktiviert"}</option>
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
        Notification.addNotification({
            title: "Optionen gespeichert!",
            level: "info",
            position: "br",
            autoDismiss: 1
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
                            return <option key={o.value} value={o.value}>{o.name}</option>;
                        })}
                    </select>
                    {description}
                </dd>
            </dl>
        );
    }
}
class KeyboardOption extends React.Component {
    render() {
        let description = false;
        if (this.props.description) {
            description = <div className="formFieldDesc"><p>{this.props.description}</p></div>;
        }
        return (
            <div className="formElement">
                <div className="formFieldLabel">
                    <label htmlFor={this.props.optionKey}>{this.props.name}</label>
                </div>
                <div className="formField">
                    <input
                        type="button"
                        className="bpp-option"
                        style={{verticalAlign: "middle"}}
                        id={this.props.optionKey}
                        name={this.props.optionKey}
                        value={this.props.default}
                    />
                </div>
                {description}
            </div>
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
        type: React.PropTypes.string.isRequired
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
