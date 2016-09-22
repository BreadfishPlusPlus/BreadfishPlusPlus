import {isTemplate, triggerTooltips, triggerDOMInserted, parseStyle} from "../breadfish";
import $ from "jquery";
import {get, set} from "../storage";
import {SCREENSHOT_DOMAIN} from "../constants";
import {registerOption} from "../config";

const showDialog = (screenshotUrl) => {
    event.preventDefault();

    const $dialog = $(`<div style="${parseStyle({textAlign: "center"})}">
        <span class="fa fa-spinner fa-spin" style="${parseStyle({fontSize:"4rem",margin: "20px"})}"></span>
        <div class="formSubmit">
            <h1 style="font-size: 14px">Der Screenshot wird gerade erstellt, einen Moment...</h1>
        </div>
    </div>`);

    const img = new Image();
    img.onload = () => {
        $dialog.css({
            overflow: "hidden",
            height: "200px",
            width: "460px"
        }).html(`<div style="${parseStyle({
            position: "absolute",
            top: "49px",
            left: 0,
            width: "100%",
            height: "calc(100% - 49px)",
            overflow: "hidden",
            borderRadius: "0 0 7px 7px",
            backgroundImage: `url(${screenshotUrl})`,
            backgroundSize: "cover"
        })}"></div>
        <div class="formSubmit" style="${parseStyle({padding:0,borderTopWidth:0})}">
            <input
                onClick="this.setSelectionRange(0, this.value.length)"
                readOnly
                type="text"
                value="${screenshotUrl}"
                style="${parseStyle({
                    width: "100%",
                    marginBottom: "10px",
                    textAlign: "center",
                    margin: 0,
                    padding: "10px 0",
                    borderWidth: "1px 0 0 0",
                    borderRadius: "0 0 7px 7px"
                })}"
            />
        </div>`);
    };
    img.onerror = (error) => {
        $dialog.addClass("error").css("margin-top", 0).text(error.toString())
            .parent().css("margin-bottom", 0);
    };
    img.src = screenshotUrl;
    $dialog.wcfDialog({
        title: "Screenshot"
    });
};
const insertPostButton = (index, element) => {
    const $message = $(element);
    const postId = ~~$message.attr("data-post-id");

    const $btn = $(`<li screenshot-button>
        <a class="button jsTooltip" href="#" title="Screenshot vom Beitrag erstellen">
            <span class="icon icon16 icon-picture"></span>
            <span class="invisible">Screenshot vom Beitrag erstellen</span>
        </a>
    </li>`);

    $btn.find("a").click((event) => {
        event.preventDefault();
        showDialog(`${SCREENSHOT_DOMAIN}post/${postId}.png`);
    });
    $btn.insertAfter($message.find("footer .buttonGroupNavigation .buttonGroup li.wcfLikeButton"));
};
const insertThreadButtons = () => {
    const threadId = Number($("[data-is-subscribed]").data("object-id"));
    const pageNo = Number($("link[rel=\"canonical\"]").attr("href").split("/&pageNo=")[1]);

    const $btn = $(`<li screenshot-button>
        <a class="button" href="#" title="Screenshot vom Thema erstellen">
            <span class="icon icon16 icon-picture"></span> <span>Screenshot erstellen</span>
        </a>
    </li>`);
    $btn.find("a").click((event) => {
        event.preventDefault();
        showDialog(`${SCREENSHOT_DOMAIN}thread/${threadId}/${pageNo}.png`);
    });
    $(".contentNavigation nav:not(.pageNavigation):not(.jsClipboardEditor) ul").prepend($btn);
};

const toggle = ({value=get("screenshot", false), init=false} = {}) => {
    if (!init) {
        set("screenshot", value);
    }
    if (!isTemplate("thread")) {
        return;
    }
    if (value) {
        $("article.wbbPost:not(.wbbPostDeleted)").each(insertPostButton);
        insertThreadButtons();
        triggerDOMInserted();
        triggerTooltips();
    } else if(!init) {
        $("li[screenshot-button]").remove();
        triggerDOMInserted();
        triggerTooltips();
    }
};
toggle({init: true});

registerOption({
    id: "screenshot",
    name: "Screenshot",
    tab: "Thread",
    type: "toggle",
    default: false,
    description: "Siehe <a href=\"http://git.io/LK5njg\" target=\"_blank\">Wiki Eintrag zum Screenshot-Modul</a>.",
    onChange: toggle
});
