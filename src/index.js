"use strict";

// Debugging aktivieren
localStorage.setItem("debug", "*");

// Moment locale auf Detusch stellen
import Moment from "moment";
import "moment/locale/de";
Moment.locale("de");

import {ReferenceModule} from "./api/index";
const debug = require("debug")("index");
debug("hi");


const mod = require.context("./modules", true, /\module.js$/);
debug(mod.keys());
mod.keys().map(fileName => {
    let moduleName = fileName.slice(2, -3 - 7); // "./" ".js" "module"
    debug("Lade Modul \"%s\" ...", moduleName);
    try {
        let Module = mod(fileName);
        let inst = new Module();
        ReferenceModule(moduleName, inst);
    }
    catch (e) {
        debug("Fehler beim laden des Moduls \"%s\": ", moduleName);
        console.error(e);
    }
});


