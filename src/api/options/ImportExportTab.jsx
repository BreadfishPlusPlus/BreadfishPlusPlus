"use strict";

import React from "react";

export default class ImportExportTab extends React.Component {
    render() {
        const {parsedHash} = this.props;
        return (<div className="container-1" style={{display: parsedHash.tab === "importexport" ? "block": "none"}}>
            <h3 className="subHeadline">Einstellungen importieren</h3>
            <fieldset>
                <div className="formElement">
                    <div className="formField">
                        <label htmlFor="importOptions">
                            <input type="file" name="importOptions" className="bpp-importOptions" />
                        </label>
                    </div>
                    <div className="formFieldDesc"><p>Wähle eine Sicherungsdatei von deinem Computer aus, um deine Einstellungen zu importieren.</p></div>
                </div>
            </fieldset>
            <h3 className="subHeadline">Einstellungen exportieren</h3>
            <fieldset>
                <div className="formElement">
                    <div className="formField">
                        <label htmlFor="exportOptions">
                            <a href="#" className="bpp-exportOptions" download="breadfishplusplus_options.json">Klicke hier, um deine aktuellen Einstellungen als Sicherungsdatei auf deinem Computer zu speichern.</a>
                        </label>
                    </div>
                </div>
            </fieldset>
        </div>);
    }
}
