"use strict";

import React from "react";

export default class AboutTab extends React.Component {
    static propTypes = {
        domains: React.PropTypes.object.isRequired,
        currentTab: React.PropTypes.string.isRequired,
        version: React.PropTypes.string.isRequired
    };
    render() {
        const {currentTab, version, domains} = this.props;

        if (currentTab !== "about") {
            return false;
        }

        const releaseHref = "https://github.com/BreadfishPlusPlus/BreadfishPlusPlus/releases/tag/v" + version;
        const iconSrc = domains.cdn + "img/breadfish128.png";
        return (<div className="container tabMenuContent ui-tabs-panel ui-widget-content ui-corner-bottom">
            <div className="containerPadding">
                <div className="bpp-about-header" style={{textAlign: "center",borderBottom: "1px solid #ccc", marginBottom: 15}}>
                    <img src={iconSrc} />
                </div>
                <fieldset>
                    <dl>
                        <dt>Version</dt>
                        <dd>{version} (<a href={releaseHref} target="_blank">Release notes</a>)</dd>
                    </dl>
                    <dl>
                        <dt>Offizille Wobsite</dt>
                        <dd><a href={domains.main} target="_blank">{domains.main}</a></dd>
                    </dl>
                    <dl>
                        <dt>Brauchst du Hilfe?</dt>
                        <dd><a href="http://sa-mp.de/thread/202640/">Dann stell deine Frage im Offiziellen Thema</a>  oder <a href="/index.php?conversation-add/&userID=3066">per privater Nachricht an mich</a></dd>
                    </dl>
                    <dl>
                        <dt>Hast du einen Fehler gefunden?</dt>
                        <dd><a href="http://sa-mp.de/thread/202640/">Dann poste ihn im offiziellen Thema</a>, <a href="http://git.io/hZumZQ">im Breadfish++ issue tracker</a> oder <a href="/index.php?conversation-add/&userID=3066">per privater Nachricht an mich</a></dd>
                    </dl>
                </fieldset>
                <fieldset>
                    <legend>Danke an</legend>
                    <dl>
                        <dt><a href="http://forum.sa-mp.de/index.php?user/25433-ditti/">Ditti</a></dt>
                        <dd>Vorabversionen testen, meine Rechtschreibfehler ausbessern</dd>
                    </dl>
                    <dl>
                        <dt><a href="http://forum.sa-mp.de/index.php?user/26698-jan/">Jan</a></dt>
                        <dd>Vorabversionen testen, hosten des Chatservers</dd>
                    </dl>
                    <dl>
                        <dt><a href="http://forum.sa-mp.de/index.php?user/17121-joshua/">Joshua</a></dt>
                        <dd>Vorabversionen testen, sinnloses Zeug vorschlagen</dd>
                    </dl>
                    <dl>
                        <dt><a href="http://forum.sa-mp.de/index.php?user/13423-seegras/">seegras</a></dt>
                        <dd>Hilfe mit der TS-Query-API</dd>
                    </dl>
                    <dl>
                        <dt><a href="http://forum.sa-mp.de/index.php?user/5871-ssl/">SSL</a></dt>
                        <dd>Vorabversionen testen</dd>
                    </dl>
                    <dl>
                        <dt><a href="http://forum.sa-mp.de/index.php?user/10755-the_cop/">The_Cop</a></dt>
                        <dd>Vorabversionen testen, meine Rechtschreibfehler ausbessern, neue Funktionen vorschlagen</dd>
                    </dl>
                </fieldset>
                <fieldset>
                    <legend>Hinweis</legend>
                    <p>Durch das Benutzen der <strong>Teamspeak 3 Anzeige</strong> wird deine IP-Adresse automatisch an dritte (mich) übermittelt. Dies dient dazu, einzelne Anfragen voneinander zu unterscheiden, und abzuschätzen, wie viele Anfragen verursacht werden.</p>
                    <p><strong>Deine IP-Adresse wird dadurch nicht gespeichert.</strong></p>
                    <p>Solltest du das nicht wollen, reicht es einfach aus diese Option zu deaktivieren (Standard).</p>
                    <p>Den Quellcode der dafür verantwortlich ist findest du hier: <a href="http://git.io/bmtS9w" target="_blank">Teamspeak-Info</a>.</p>
                </fieldset>
            </div>
        </div>);
    }
}
