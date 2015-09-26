"use strict";

import React from "react";
import Storage from "../storage";
import Notification from "../Notification";
import {isArray} from "lodash";
const debug = require("debug")("ImportExportTab");

export default class ImportExportTab extends React.Component {
    static propTypes = {
        currentTab: React.PropTypes.string.isRequired
    };
    onDownload() {
        const options = Storage.getAll();
        const optionsString = JSON.stringify(options, null, 4);
        const content = new Blob([optionsString], {type: "application/json"});
        React.findDOMNode(this.refs.download).setAttribute("href", URL.createObjectURL(content));

        React.findDOMNode(this.refs.download).setAttribute("download", `Breadfish++ v${BPP_VERSION}-${Date.now()}.json`);
    }
    onUpload(event) {
        if (event.target.files.length === 0) {
            Notification.error("Du hast keine Datei angegeben! :(");
            return;
        }
        const reader = new FileReader();
        reader.onloadend = function (evt) {
            let options = null;
            try {
                options = JSON.parse(evt.target.result);
            } catch (e) {
                debug(e);
            }
            if (!options || !isArray(options)) {
                Notification.error("Die Datei ist ungültig! :(");
                return;
            }

            options.forEach(o => {
                Storage.set(o.key, o.value);
            });

            Notification.success("Einstellungen wurde importiert!", `Es wurden ${options.length} Einstellungen importiert.`,);
        };
        reader.readAsBinaryString(event.target.files[0]);
    }
    render() {
        const {currentTab} = this.props;

        if (currentTab !== "importexport") {
            return false;
        }

        return (<div className="container tabMenuContent ui-tabs-panel ui-widget-content ui-corner-bottom">
            <div className="containerPadding">
                <fieldset>
                    <legend>Einstellungen importieren</legend>
                    <dl>
                        <dt>
                            <p className="button uploadButton">
                                <input name="importOptions" onChange={e => this.onUpload(e)} ref="upload" type="file" /><span>Hochladen</span>
                            </p>
                        </dt>
                        <dd>
                            <small>Wähle eine Sicherungsdatei von deinem Computer aus, um deine Einstellungen zu importieren.</small>
                        </dd>
                    </dl>
                </fieldset>
                <fieldset>
                    <legend>Einstellungen exportieren</legend>
                    <dl>
                        <dt>
                            <a className="button" onClick={e => this.onDownload(e)} ref="download">
                                <span>Herunterladen</span>
                            </a>
                        </dt>
                        <dd>
                            <small>Speichere deine Einstellungen in einer Sicherungsdatei auf deinem Coputer.</small>
                        </dd>
                    </dl>
                </fieldset>
            </div>
        </div>);
    }
}
