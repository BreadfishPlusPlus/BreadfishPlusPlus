import $ from "jquery";
import {triggerResize} from "./breadfish";
import _debug from "debug";
import {optionsTemplate, applyStyles} from "./optionsTemplate.js";
const log = _debug("bpp:config.js");

const optionsMap = new Map();
export const registerOption = (...options) => {
    log("registerOption", ...options);
    for(const o of options) {
        optionsMap.set(o.id, o);
    }
};

let $configDialog = null;
const setupConfigDialog = (advanced) => {
    if ($configDialog) {
        return;
    }

    $configDialog = $(optionsTemplate(optionsMap, advanced));
    applyStyles();
    $(document).on("change", "[bpp-option-toggle]", (event) => {
        const {id, checked} = event.target;
        log({[id]: checked});

        // onChange handler aufrufen, falls vorhanden
        const option = optionsMap.get(id);
        option.onChange && option.onChange({value: checked});
    });
    $(document).on("change", "[bpp-option-select]", (event) => {
        const {id, value} = event.target;
        log({[id]: value});

        // onChange handler aufrufen, falls vorhanden
        const option = optionsMap.get(id);
        option.onChange && option.onChange({value});
    });
    $(document).on("keyup input mousewheel change", "[bpp-option-number]", (event) => {
        const {id, value} = event.target;
        log({[id]: Number(value)});

        // onChange handler aufrufen, falls vorhanden
        const option = optionsMap.get(id);
        option.onChange && option.onChange({value: Number(value)});
    });

    const onShow = () => {
        const $dialogContent = $configDialog.parent(".dialogContent");
        $dialogContent.css({
            padding: 0
        });
        triggerResize();
    };

    $configDialog.wcfTabs({
        activate: () => triggerResize(),
        heightStyle: "content"
    });
    $configDialog.find(".tabMenuContainer").wcfTabs({
        activate: () => triggerResize()
    });
    $configDialog.wcfDialog({
        title: "Breadfish++ Optionen",
        closable: true,
        hideTitle: false,
        autoOpen: false,
        onShow: onShow
    });
};
const showConfig = window.showConfig = (advanced=false) => {
    setupConfigDialog(advanced);
    $configDialog.wcfDialog("open");
};

export const insertFooterMenu = () => {
    const $li = $(`<li><a href="#">Breadfish++</a></li>`);
    $("#footerNavigation > .navigationMenuItems").append($li);
    $li.find("a").click((event) => {
        event.preventDefault();
        showConfig();
    });
};


