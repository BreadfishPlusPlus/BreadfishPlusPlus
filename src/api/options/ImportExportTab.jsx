"use strict";

import React from "react";

export default class ImportExportTab extends React.Component {
    static propTypes = {
        currentTab: React.PropTypes.string.isRequired
    };
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
                                <input className="bpp-importOptions" name="importOptions" type="file" /><span>Hochladen</span>
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
                            <a className="button bpp-exportOptions" download="breadfishplusplus_options.json">
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
