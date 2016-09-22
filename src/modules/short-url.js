import {isTemplate, triggerTooltips, triggerDOMInserted} from "../breadfish";
import $ from "jquery";
import {get, set} from "../storage";
import {registerOption} from "../config";

const handleClick = (event, postId) => {
    event.preventDefault();

    const $dialog = $(`<fieldset>
        <legend>
            <label for="__shareShortlink">Kurz-URL</label>
        </legend>
        <input class="long" id="__shareShortlink" readOnly onClick="this.setSelectionRange(0, this.value.length)"
        type="text" value="http://sa-mp.de/B++/p${postId}-/" />
    </fieldset>`);

    $dialog.wcfDialog({
        title: window.WCF.Language.get("wcf.message.share")
    });
};
const insertButton = (index, element) => {
    const $message = $(element);
    const postId = ~~$message.attr("data-post-id");

    const $btn = $(`<li short-url-button>
        <a class="button jsTooltip" href="#" title="Kurz-URL zu diesem Beitrag">
            <span class="icon icon16 icon-link"></span>
            <span class="invisible">Kurz-URL zu diesem Beitrag</span>
        </a>
    </li>`);

    $btn.find("a").click((event) => handleClick(event, postId));
    $btn.insertAfter($message.find("footer .buttonGroupNavigation .buttonGroup li.wcfLikeButton"));
};

const toggle = ({ value = get("shortUrl", false), init = false } = {}) => {
    if (!init) {
        set("shortUrl", value);
    }
    if (!isTemplate("thread")) {
        return;
    }
    if (value) {
        $("article.wbbPost:not(.wbbPostDeleted)").each(insertButton);
        triggerDOMInserted();
        triggerTooltips();
    } else if(!init) {
        $("li[short-url-button]").remove();
        triggerDOMInserted();
        triggerTooltips();
    }
};
toggle({init: true});

registerOption({
    id: "shortUrl",
    name: "Kurz-URL",
    tab: "Beiträge",
    type: "toggle",
    default: false,
    description: "Fügt in jedem Beitrag zusätzlich einen Button hinzu, mit dem man eine kurze URL zum Beitrag erhält.",
    onChange: toggle
});
