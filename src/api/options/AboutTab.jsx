"use strict";

import React from "react";

export default class AboutTab extends React.Component {
    render() {
        const {parsedHash, version, domains} = this.props;
        const releaseHref = "https://github.com/BreadfishPlusPlus/BreadfishPlusPlus/releases/tag/v" + version;
        const iconSrc = domains.cdn + "img/breadfish128.png";
        return (<div className="container-2" style={{display: parsedHash.tab === "about" ? "block": "none"}}>
            <div className="columnInner">
                <div className="bpp-about-header" style={{textAlign: "center",borderBottom: "1px solid #d7d7f4", marginBottom: 15}}>
                    <img src={iconSrc} />
                </div>
                <div className="formElement">
                    <div className="formFieldLabel"><label>Version</label></div>
                    <div className="formField">{version} (<a href={releaseHref}>Release notes</a>)</div>
                </div>
                <div className="formElement">
                    <div className="formFieldLabel"><label>Offizille Wobsite</label></div>
                    <div className="formField"><a target="_blank" href={domains.main}>{domains.main}</a></div>
                </div>
                <div className="formElement">
                    <div className="formFieldLabel"><label>Brauchst du Hilfe?</label></div>
                    <div className="formField"><a href="http://sa-mp.de/B++/p1886959-/">Dann stell deine Frage im Offiziellen Thema</a>  oder <a href="http://forum.sa-mp.de/index.php?form=PMNew&amp;userID=3066">per privater Nachricht an mich</a></div>
                </div>
                <div className="formElement">
                    <div className="formFieldLabel"><label>Hast du einen Fehler gefunden?</label></div>
                    <div className="formField"><a href="http://sa-mp.de/B++/p1886959-/">Dann poste ihn im offiziellen Thema</a>, <a href="http://git.io/hZumZQ">im Breadfish++ issue tracker</a> oder <a href="http://forum.sa-mp.de/index.php?form=PMNew&amp;userID=3066">per privater Nachricht an mich</a></div>
                </div>
                <h3 className="subHeadline" style={{margin: "15px 0 10px"}}>Danke an</h3>
                <ul>
                    <li><a href="http://forum.sa-mp.de/index.php?page=User&amp;userID=25433">Ditti</a> <small>(Vorabversionen testen, meine Rechtschreibfehler ausbessern)</small></li>
                    <li><a href="http://forum.sa-mp.de/index.php?page=User&amp;userID=26698">JJJan</a> <small>(Vorabversionen testen, hosten des Chatservers)</small></li>
                    <li><a href="http://forum.sa-mp.de/index.php?page=User&amp;userID=17121">Joshua</a> <small>(Vorabversionen testen, sinnloses Zeug vorschlagen)</small></li>
                    <li><a href="http://forum.sa-mp.de/index.php?page=User&amp;userID=13423">seegras</a> <small>(Hilfe mit der TS-Query-API)</small></li>
                    <li><a href="http://forum.sa-mp.de/index.php?page=User&amp;userID=5871">SSL</a> <small>(Vorabversionen testen)</small></li>
                    <li><a href="http://forum.sa-mp.de/index.php?page=User&amp;userID=10755">The_Cop</a> <small>(Vorabversionen testen, meine Rechtschreibfehler ausbessern, neue Funktionen vorschlagen)</small></li>
                </ul>
                <h3 className="subHeadline" style={{margin: "15px 0 10px"}}>Hinweis</h3>
                <p>Durch das Benutzen der <strong>Teamspeak 3 Anzeige</strong> wird deine IP-Adresse automatisch an dritte (mich) übermittelt.
                Dies dient dazu, einzelne Anfragen voneinander zu unterscheiden, und abzuschätzen, wie viele Anfragen verursacht werden.</p>
                <p><strong>Deine IP-Adresse wird dadurch nicht gespeichert.</strong></p>
                <p>Solltest du das nicht wollen, reicht es einfach aus diese Option zu deaktivieren (Standard).</p>
                <p>Den Quellcode der dafür verantwortlich ist findest du hier: <a target="_blank" href="http://git.io/bmtS9w">Teamspeak-Info</a>.</p>
            </div>
        </div>);
    }
}
