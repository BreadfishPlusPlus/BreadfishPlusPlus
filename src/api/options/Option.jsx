"use strict";

import React from "react";

class ToggleOption extends React.Component {
    render() {
        let description = false;
        if (this.props.description) {
            description = <div className="formFieldDesc"><p>{this.props.description}</p></div>;
        }
        return (
            <div className="formCheckBox formElement">
                <div className="formField">
                    <label htmlFor={this.props.key}>
                        <input
                            type="checkbox"
                            className="bpp-option"
                        style={{verticalAlign: "middle"}}
                            id={this.props.key}
                            name={this.props.key}
                            checked={this.props.default}
                        /> {this.props.name}
                    </label>
                </div>
                {description}
            </div>
        );
    }
}
class RangeOption extends React.Component {
    render() {
        let description = false;
        if (this.props.description) {
            description = <div className="formFieldDesc"><p>{this.props.description}</p></div>;
        }
        return (
            <div className="formElement">
                <div className="formFieldLabel">
                    <label htmlFor={this.props.key}>{this.props.name}</label>
                </div>
                <div className="formField">
                    <input
                        type="range"
                        id={this.props.key}
                        name={this.props.key}
                        className="bpp-option"
                        style={{verticalAlign: "middle"}}
                        min={this.props.min}
                        max={this.props.max}
                        value={this.props.default}
                    />
                    <span className="indicator" style={{
                        verticalAlign: "middle",
                        border: "1px solid #000",
                        padding: "1px 7px",
                        background: "#FFF"
                    }}>{this.props.default}</span>
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
                    <label htmlFor={this.props.key}>{this.props.name}</label>
                </div>
                <div className="formField">
                    <input
                        type="button"
                        className="bpp-option"
                        style={{verticalAlign: "middle"}}
                        id={this.props.key}
                        name={this.props.key}
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
