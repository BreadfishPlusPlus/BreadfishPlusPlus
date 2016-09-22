import {isTemplate} from "../breadfish";
import $ from "jquery";
import {get, set} from "../storage";
import {registerOption} from "../config";

const toggle = ({value=get("filterDeleted", false), init=false} = {}) => {
    if (!init) {
        set("filterDeleted", value);
    }
    if (isTemplate("thread")) {
        if (value) {
            $("article.wbbPostDeleted").hide();
        } else if(!init) {
            $("article.wbbPostDeleted").show();
        }
    } else if (isTemplate("board")) {
        if (value) {
            $(".wbbThreadList > table > tbody > tr.wbbThread.messageDeleted").hide();
        } else if(!init) {
            $(".wbbThreadList > table > tbody > tr.wbbThread.messageDeleted").show();
        }
    }
};
toggle({init: true});

registerOption({
    id: "filterLikes",
    name: "Likes ausblenden",
    tab: ["Posts", "Thread"],
    type: "toggle",
    default: false,
    description: "Blendet alles was mit Likes zu tun hat aus.",
    onChange: toggle
});
