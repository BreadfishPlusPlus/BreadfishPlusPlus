"use strict";

localStorage.setItem("debug", "*");
import {ReferenceModule} from "./api";
const debug = require("debug")("index");
debug("hi");


const mod = require.context("./modules", true, /\module.js$/);
debug(mod.keys());
mod.keys().map(fileName => {
    let moduleName = fileName.slice(2, -3);
    debug("Lade Modul  \"" + moduleName + "\" ...");
    try {
        let Module = mod(fileName);
        let inst = new Module();
        ReferenceModule(moduleName, inst);
    }
    catch (e) {
        debug("Fehler beim laden des Moduls \"" + moduleName + "\":");
        console.error(e);
    }
});


