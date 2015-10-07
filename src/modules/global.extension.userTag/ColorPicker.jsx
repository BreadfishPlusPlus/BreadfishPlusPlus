"use strict";

import React from "react";
import $ from "jquery";
import {uniqueId} from "lodash";
const debug = require("debug")("B++:ColorPicker");

export default class ColorPicker extends React.Component {
    static propTypes = {
        color: React.PropTypes.string.isRequired,

        onChange: React.PropTypes.func
    };
    constructor(props) {
        super(props);

        this.state = {
            color: this.props.color,
            id: uniqueId(),

            pickerActivated: false
        };
    }
    componentDidMount() {
        debug(this.state.id, "componentDidMount");
        const element = `colorpicker_store_${this.state.id}`;
        const ref = this.refs[element];
        const node = React.findDOMNode(ref);
        $(node).on("change", () => this.handleColorChange(node));
    }
    handleColorChange(node) {
        debug(this.state.id, "handleColorChange", node.value);
        this.setState({ color: node.value });
        if (this.props.onChange) {
            this.props.onChange(node.value);
        }
    }
    showColorpicker(event) {
        event.preventDefault();
        debug(this.state.id, "showColorpicker");
        if (!this.state.pickerActivated) {
            debug(this.state.id, "!pickerActivated");
            new this.wcf.ColorPicker(`#colorpicker_${this.state.id}`);
            this.setState({
                pickerActivated: true
            }, () => {
                $(React.findDOMNode(this.refs[`colorpicker_${this.state.id}`])).click();
            });
        }
    }
    render() {
        debug(this.state.id, "render", this.state);
        const store = `colorpicker_store_${this.state.id}`;
        const element = `colorpicker_${this.state.id}`;
        return (
            <div className="colorPreview" style={{width: "100%"}}>
                <div
                    data-color={this.state.color}
                    data-store={store}
                    id={element}
                    onClick={e => this.showColorpicker(e)}
                    ref={element}
                    style={{
                        backgroundColor: this.state.color,
                        width: "auto",
                        height: 19
                    }}
                />
                <input
                    id={store}
                    name={store}
                    ref={store}
                    type="hidden"
                    value={this.state.color}
                />
            </div>
        );
    }
}
