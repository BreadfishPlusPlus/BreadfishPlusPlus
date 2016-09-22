import _debug from "debug";
const log = _debug("bpp:breadfish.js");
import hyphenateStyleName from "hyphenate-style-name";
import $ from "jquery";


/**
 * Gibt den Namen des aktuell genutzten WCF Templates aus.
 *
 * @returns {String} Der Name des Templates
 */
let __tempalte_name = null;
export const getTemplateName = () => {
    if (!__tempalte_name) {
        log("__tempalte_name", document.body.getAttribute("data-template"));
        __tempalte_name = document.body.getAttribute("data-template");
    }
    return __tempalte_name;
};


/**
 * Überprüft, ob das aktuelle WCF Template eines der angegebenen ist.
 *
 * @param {String} ...templates Name des Templates
 * @returns {boolean} ob das aktuelle WCF Template mit einem der angegebenen übereinstimmt
 */
export const isTemplate = (...templates) => {
    log("isTemplate", {templates});
    return templates.includes(getTemplateName());
};


/**
 * Löst das WCF DOMNodeInsertedHandler Event aus.
 */
export const triggerDOMInserted = () => window.WCF.DOMNodeInsertedHandler.execute();


/**
 * Löst das WCF Tooltip Event aus.
 */
export const triggerTooltips = () => window.WCF.Effect.BalloonTooltip();


/**
 * Nimmt ein Objekt mit CSS Properties und verwandet diese in einen String.
 */
export const parseStyle = (css) => {
    return Object.keys(css)
        .map((key) => `${hyphenateStyleName(key)}: ${css[key]}`)
        .join(";");
};

/**
 * Fügt der Seite globale CSS Regeln hinzu
 */
export const addStyle = (selector, style, index=null) => {
    let styleElement = document.querySelector("#bpp_style");
    if (!styleElement) {
        styleElement = document.createElement("style");
        styleElement.id = "#bpp_style";
        styleElement.appendChild(document.createTextNode("")); //Webkit hack
        document.head.appendChild(styleElement);
    }
    const {sheet} = styleElement;

    sheet.insertRule(`${selector}{${parseStyle(style)}}`, index || sheet.cssRules.length);
};

/**
 * Triggert das resize event. Wird für das re-rendern von bestimmten Elementen benötigt.
 */
export const triggerResize = () => {
    $(document).trigger("resize");
};

/**
 * Injiziert ein script-tag mit dem angegebenen `src` attribut in `head`.
 * Optional kann ein `callback` angegeben werden, welches aufgerufen wird wenn das script geladen wurde.
 */
export const insertScript = (src, callback=undefined) => {
    let script = document.createElement("script");
    if (callback) {
        script.onreadystatechange = callback;
        script.onload = callback;
    }
    script.type = "text/javascript";
    script.src = src;
    const head = document.getElementsByTagName("head")[0];
    head.appendChild(script);
};
