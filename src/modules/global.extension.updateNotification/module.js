"use strict";

import {DefaultModule} from "../../api";
const debug = require("debug")("B++:module:global.extension.updateNotification");
import Semver from "semver";

export default class Module extends DefaultModule {
    constructor() {
        super();
        debug("Wird geladen...");

        this.register({
            "key": "option.global.extension.updateNotification.enabled",
            "name": "Update-Benachrichtigung",
            "tab": "Einstellungen",
            "subtab": "Global",
            "category": "Erweiterungen",
            "type": "toggle",
            "default": true,
            "description": "Zeigt eine Benachrichtigt wenn Breadfish++ aktualisiert wurde."
        });
        this.register({
            "key": "option.global.extension.updateNotification.oldVersion",
            "type": "invis",
            "default": BPP_VERSION
        });

        if (!this.storage.get("option.global.extension.updateNotification.enabled", false)) {
            debug("Deaktiviert -> SKIP");
            return;
        }

        setTimeout(() => this.showUpdateNotification(), 2000);
    }
    showUpdateNotification() {
        const newVersion = BPP_VERSION;
        const oldVersion = this.storage.get("option.global.extension.updateNotification.oldVersion", newVersion);
        debug("newVersion", newVersion);
        debug("oldVersion", oldVersion);

        if (!Semver.lt(oldVersion, newVersion)) {
            debug("lt", Semver.lt(oldVersion, newVersion));
            return;
        }

        this.notification.create({
            level: "info",
            title: "Breadfish++ wurde aktualisiert!",
            message: `Breadfish++ wurde auf Version ${newVersion} aktualisiert!`,
            action: {
                label: "Weiterlesen",
                callback: () => {
                    window.location = `${location.origin}/index.php?thread&id=202640&action=firstNew`;
                }
            }
        });
        this.storage.set("option.global.extension.updateNotification.oldVersion", newVersion);
    }
}
