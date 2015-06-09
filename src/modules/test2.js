import {DefaultModule} from "../api.js";
const debug = require("debug")("test2");

export default class Test2 extends DefaultModule {
    constructor() {
        super();
        debug("constructor");
    }
}
