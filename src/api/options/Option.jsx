"use strict";

import React from "react";
import Storage from "./../storage";
import Notification from "../Notification";

class ToggleOption extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: Storage.get(this.props.optionKey, this.props.default)
        };
    }
    handleChange() {
        Storage.set(this.props.optionKey, !this.state.checked);
        this.setState({checked: !this.state.checked});
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
            description = <div className="formFieldDesc"><p>{this.props.description}</p></div>;
        }
        return (
            <div className="formCheckBox formElement">
                <div className="formField">
                    <label htmlFor={this.props.optionKey}>
                        <input
                            type="checkbox"
                            className="bpp-option"
                            style={{verticalAlign: "middle"}}
                            id={this.props.optionKey}
                            name={this.props.optionKey}
                            checked={this.state.checked}
                            onChange={this.handleChange.bind(this)}
                        /> {this.props.name}
                    </label>
                </div>
                {description}
            </div>
        );
    }
}
class RangeOption extends React.Component {
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
            description = <div className="formFieldDesc"><p>{this.props.description}</p></div>;
        }
        return (
            <div className="formElement">
                <div className="formFieldLabel">
                    <label htmlFor={this.props.optionKey}>{this.props.name}</label>
                </div>
                <div className="formField">
                    <input
                        type="range"
                        id={this.props.optionKey}
                        name={this.props.optionKey}
                        className="bpp-option"
                        style={{verticalAlign: "middle"}}
                        min={this.props.min}
                        max={this.props.max}
                        value={this.state.value}
                        onChange={this.handleChange.bind(this)}
                    />
                    <span className="indicator" style={{
                        verticalAlign: "middle",
                        border: "1px solid #000",
                        padding: "1px 7px",
                        background: "#FFF"
                    }}>{this.state.value}</span>
                </div>
                {description}
            </div>
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

export default class Options extends React.Component {
    render() {
        if (this.props.type_toggle) {
            return <ToggleOption {...this.props} />;
        } else if (this.props.type_range) {
            return <RangeOption {...this.props} />;
        } else if (this.props.type_keyboard) {
            return <KeyboardOption {...this.props} />;
        } else {
            return false;
        }
    }
}
