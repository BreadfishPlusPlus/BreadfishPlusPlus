import {get} from "./storage";
import {addStyle} from "./breadfish";

export const applyStyles = () => {
    addStyle(".bpp_config .ui-tabs-nav li.ui-tabs-active .button", {
        backgroundColor: "#666666",
        borderColor: "#595959",
        color: "#f9f9f9",
        boxShadow: "inset 0 1px 1px 0 rgba(0,0,0,0.1)"
    });
    addStyle(".bpp_config > nav > ul", {
        backgroundColor: "#f4f4f4"
    });
    addStyle(".bpp_config > nav > ul > li", {
        display: "inline-block",
        margin: "5px 0"
    });
    addStyle(".bpp_config > nav > ul > li:first-child", {
        margin: "5px 0 5px 5px"
    });
    addStyle(".bpp_config > nav > ul > li > a", {
        borderRadius: "3px",
        minHeight: "13px",
        margin: "0 2px"
    });
    addStyle(".bpp_config > .tabMenuContent", {
        borderWidth: "1px 0 0 0"
    });
    addStyle(".bpp_config label", {
        fontWeight: "bold"
    });
    addStyle(".bpp_config:not(.advanced) [bpp-option-advanced]", {
        display: "none"
    });
};


let optionTypes = {};
optionTypes.toggle = (option) => `<dl>
    <dt>
        <label for="${option.id}">${option.name}</label>
    </dt>
    <dd>
        <input
            type="checkbox"
            autocomplete="off"
            bpp-option-toggle
            id="${option.id}"
            name="${option.id}"
            ${option._value ? "checked" : ""}
        />
        <small style="margin-left:0">${option.description}</small>
    </dd>
</dl>`;
optionTypes.select = (option) => `<dl>
    <dt>
        <label for="${option.id}">${option.name}</label>
    </dt>
    <dd>
        <select id="${option.id}" name="${option.id}" bpp-option-select>
            ${option.options.map((o) => `<option
                value="${o.value}"
                ${option._value === o.value ? "selected" : ""}
            >${o.label}</option>`).join("")}
        </select>
        <small>${option.description}</small>
    </dd>
</dl>`;
optionTypes.number = (option) => `<dl>
    <dt>
        <label for="${option.id}">${option.name}</label>
    </dt>
    <dd>
        <input
            type="number"
            autocomplete="off"
            bpp-option-number
            id="${option.id}"
            name="${option.id}"
            class="medium"
            value="${option._value}"
        />
        <small>${option.description}</small>
    </dd>
</dl>`;

export const optionsTemplate = (optionsMap, advanced) => {
    let options = {};
    for (let option of optionsMap.values()) {
        option._value = get(option.id, option.default);

        const tabs = Array.isArray(option.tab) ? option.tab : [option.tab];
        for(let tab of tabs) {
            options[tab] = options[tab] || [];
            options[tab].push(option);
        }
    }
    const tabs = Object.keys(options);

    return `<div class="bpp_config ${advanced?"advanced":""}">
    <nav>
        <ul>
            ${tabs.map((tabName) => {
                return `<li>
                    <a href="#${tabName}" class="button">${tabName}</a>
                </li>`;
            }).join("")}
        </ul>
    </nav>
    ${tabs.map((tabName) => `<ul class="container tabMenuContent containerList hidden" id="${tabName}">
        ${options[tabName].map((option) => `<li class="box32" bpp-option-id="${option.id}" ${option.advanced?"bpp-option-advanced":""}>
            ${optionTypes[option.type](option)}
        </li>`).join("")}
    </ul>`).join("")}
</div>`;
};

