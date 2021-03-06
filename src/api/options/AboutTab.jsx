"use strict";

import React from "react";

export default class AboutTab extends React.Component {
    static propTypes = {
        currentTab: React.PropTypes.string.isRequired
    };
    render() {
        const {currentTab} = this.props;

        if (currentTab !== "about") {
            return false;
        }

        const iconSrc = BPP_CDN_DOMAIN + "icons/breadfish128.png";
        return (<div className="container tabMenuContent ui-tabs-panel ui-widget-content ui-corner-bottom">
            <div className="containerPadding">
                <div className="bpp-about-header" style={{textAlign: "center",borderBottom: "1px solid #ccc", marginBottom: 15}}>
                    <img src={iconSrc} />
                </div>
                <fieldset>
                    <dl>
                        <dt>Version</dt>
                        <dd>{BPP_VERSION} (Changelog gibts im <a href="/thread/202640" target="_blank">Thema</a>)</dd>
                    </dl>
                    <dl>
                        <dt>Thema im Forum</dt>
                        <dd><a href="/thread/202640" target="_blank">Breadfish++ - Die inoffizielle Erweiterung für breadfish.de</a></dd>
                    </dl>
                    <dl>
                        <dt>Brauchst du Hilfe?</dt>
                        <dd><a href="/thread/202640/">Dann stell deine Frage im Offiziellen Thema</a>  oder <a href="/conversation-add/?userID=3066">per privater Nachricht an mich</a></dd>
                    </dl>
                    <dl>
                        <dt>Hast du einen Fehler gefunden?</dt>
                        <dd><a href="/thread/202640/">Dann poste ihn im offiziellen Thema</a>, <a href="http://git.io/hZumZQ">im Breadfish++ issue tracker</a> oder <a href="/conversation-add/?userID=3066">per privater Nachricht an mich</a></dd>
                    </dl>
                </fieldset>
                <fieldset>
                    <legend>Danke an</legend>
                    <dl>
                        <dt><a href="/user/25433/">Ditti</a></dt>
                        <dd>Vorabversionen testen, meine Rechtschreibfehler ausbessern</dd>
                    </dl>
                    <dl>
                        <dt><a href="/user/26698/">Jan</a></dt>
                        <dd>Vorabversionen testen, hosten des Chatservers</dd>
                    </dl>
                    <dl>
                        <dt><a href="/user/17121/">Joshua</a></dt>
                        <dd>Vorabversionen testen, sinnloses Zeug vorschlagen</dd>
                    </dl>
                    <dl>
                        <dt><a href="/user/13423/">seegras</a></dt>
                        <dd>Hilfe mit der TS-Query-API</dd>
                    </dl>
                    <dl>
                        <dt><a href="/user/5871/">SSL</a></dt>
                        <dd>Vorabversionen testen</dd>
                    </dl>
                    <dl>
                        <dt><a href="/user/10755/">The_Cop</a></dt>
                        <dd>Vorabversionen testen, meine Rechtschreibfehler ausbessern, neue Funktionen vorschlagen</dd>
                    </dl>
                    <dl>
                        <dt><a href="/user/2520/">Trooper[Y]</a></dt>
                        <dd>Für die original-Idee und die Integration ins Forum.</dd>
                    </dl>
                </fieldset>
                <fieldset>
                    <legend>Hinweis</legend>
                    <div className="info">
                        <p>Durch das Benutzen der <strong>Teamspeak 3 Anzeige</strong> wird deine IP-Adresse automatisch an dritte (mich) übermittelt. Dies dient dazu, einzelne Anfragen voneinander zu unterscheiden, und abzuschätzen, wie viele Anfragen verursacht werden.</p>
                        <p style={{fontWeight: "bold", textDecoration: "underline"}}>Deine IP-Adresse wird dadurch nicht gespeichert.</p>
                        <p>Solltest du das nicht wollen, reicht es einfach aus diese Option zu deaktivieren (Standard).</p>
                        <p>Den Quellcode der dafür verantwortlich ist findest du hier: <a href="http://git.io/bmtS9w" target="_blank">Teamspeak-Info</a>.</p>
                    </div>
                </fieldset>
            </div>
        </div>);
    }
}
