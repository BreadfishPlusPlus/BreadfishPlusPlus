localStorage.setItem("debug", "*");
const debug = require("debug")("index");
debug("hi");


const mod = require.context("./modules", false, /\.js$/);
mod.keys().map(moduleName => {
    debug("loading", moduleName);
    let Module = mod(moduleName);
    new Module();
});


