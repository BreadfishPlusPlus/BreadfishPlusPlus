/*eslint no-console: 0*/
"use strict";

// Debugging aktivieren
if(DEBUG_MOE) {
    localStorage.setItem("debug", "*");
}

// Moment locale auf Detusch stellen
import Moment from "moment";
import "moment/locale/de";
Moment.locale("de");

// NotificationLayer laden
import "api/Notification";

import {ReferenceModule} from "./api/index";
const debug = require("debug")("B++:Index");
debug("hi");


const mod = require.context("./modules", true, /\module.js$/);
debug(mod.keys());
mod.keys().map(fileName => {
    let moduleName = fileName.slice(2, -3 - 7); // "./" ".js" "module"
    debug("Lade Modul \"%s\" ...", moduleName);
    try {
        let Module = mod(fileName);
        let inst = new Module.default();
        ReferenceModule(moduleName, inst);
    }
    catch (e) {
        debug("Fehler beim laden des Moduls \"%s\": ", moduleName);
        console.error(e);
    }
});

import "./api/analytics";

