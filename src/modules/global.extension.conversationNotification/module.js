"use strict";

import {DefaultModule} from "../../api";
import $ from "jquery";
import {uniqueId} from "lodash";
const debug = require("debug")("B++:module:global.extension.conversationNotification");

export default class Module extends DefaultModule {
    constructor() {
        super();
        debug("Wird geladen...");

        this.register({
            "key": "option.global.extension.conversationNotification.enabled",
            "name": "Konversationsbenachrichtigung",
            "tab": "Einstellungen",
            "subtab": "Global",
            "category": "Erweiterungen",
            "type": "toggle",
            "default": false,
            "description": "Informiert über ungelesene Konversationen via Desktopbenachrichtigung.",
            "validate": value => this.validateToggle(value)
        });
        this.register({
            "key": "option.global.extension.conversationNotification.refreshInterval",
            "type": "invis",
            "default": 60000 * 5
        });
        this._refreshInterval = this.storage.get("option.global.extension.conversationNotification.refreshInterval", 60000 * 5);
        this.register({
            "key": "option.global.extension.conversationNotification.cache",
            "type": "invis",
            "default": {}
        });
        this._cache = this.storage.get("option.global.extension.conversationNotification.cache", {});

        if (!this.storage.get("option.global.extension.conversationNotification.enabled", false)) {
            debug("Deaktiviert -> SKIP");
            return;
        }

        this._tag = uniqueId("notification");

        this.loadProxy();
        setInterval(() => {
            this.loadProxy();
        }, this.storage.get("option.global.extension.conversationNotification.refreshInterval", 60000 * 5) + 1);
    }
    loadProxy() {
        debug("Frage Konversationen ab...");
        this.wcfProxy({
            autoSend: true,
            showLoadingOverlay: false,
            success: data => this.onProxyLoaded(data.returnValues),
            data: {
                actionName: "getMixedConversationList",
                className: "wcf\\data\\conversation\\ConversationAction"
            }
        });
    }
    onProxyLoaded(returnValues) {
        debug("Behandle ergebniss...");
        if (returnValues.count < 1) {
            debug("Keine neuen nachrichten -> SKIP");
            return;
        }

        const conversations = $("<ul>" + returnValues.template + "</ul>").find("li[data-is-read=\"false\"]")
            .map(function() {
                return {
                    id: ~~$(this).attr("data-object-id").trim(),
                    betreff: $(this).find("h3 > a").text().trim(),
                    from: $(this).find("small > a").text().trim()
                };
            })
            .get()
            .filter(c => {
                const ts = this._cache[c.id];
                if (!ts) {
                    return true;
                }
                return (ts + this._refreshInterval) < Date.now();
            });

        this.showNotification(conversations);
    }
    showNotification(conversations) {
        if (conversations.length === 0) {
            return;
        }
        const count = conversations.length;
        let body;
        let en;
        if (count > 1) {
            const names = conversations.map((c, i) => {
                let ret;
                if (i === count - 1) {
                    ret = " und ";
                } else if (i !== 0) {
                    ret = ", ";
                } else {
                    ret = "";
                }
                return `${ret}${c.from} (Betreff: ${c.betreff})`;
            }).join("");
            body = `Du hast ${conversations.length} ungelesene Konversationen mit ${names}.`;
            en = "en";
        } else {
            body = `Du hast eine ungelesene Konversation mit ${conversations[0].from}`;
            en = "";
        }
        debug(`${conversations.length} ungelesene Konversation${en}!`);
        this._notification = new Notification(`Neue Konversation${en}!`, {
            icon: "//breadfish.de/wcf/images/apple-touch-icon.png",
            body: body,
            tag: this._tag
        });
        this._notification.onClick = () => {
            window.open("//breadfish.de/index.php?conversation-list/", "_blank");
        };

        conversations.forEach(c => {
            this._cache[c.id] = Date.now();
        });
        this.storage.set("option.global.extension.conversationNotification.cache", this._cache);
    }
    validateToggle(value) {
        if (value === 0) {
            debug("Option wurde Deaktiviert, kein bedarf permission zu checken.");
            return true;
        }

        if (!("Notification" in window)) {
            debug("Browser ist ein Toaster und kann keine Desktop Benachrichtigungen");
            this.notification.create({
                level: "error",
                title: "Nope!",
                message: "Dein Browser unterstützt keine Desktopbenachrichtigungen!",
                action: {
                    label: "Mehr Infos",
                    callback: () => {
                        window.open("http://caniuse.com/#feat=notifications", "_blank");
                    }
                }
            });
            return false;
        }

        if (window.Notification.permission === "granted") {
            debug("Browser hat erlaubniss bereits erteilt.");
            return true;
        }

        debug("Erfrage erlaubniss...");
        window.Notification.requestPermission(permission => {
            debug(`permission=${permission}`);
            if (permission === "granted") {
                this.notification.create({
                    level: "success",
                    title: "Erlaubnis erteilt!",
                    message: "Du kannst die Option nun erneut aktivieren."
                });
            } else {
                this.notification.create({
                    level: "error",
                    title: "Erlaubnis verweigert!",
                    message: "Ohne Erlaubniss können auch keine Benachrichtigungen angezeigt werden."
                });
            }
        });

        return false;
    }
}
