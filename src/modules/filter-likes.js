import {isTemplate, addDOMinsertedListener} from "../breadfish";
import $ from "jquery";
import {get, set} from "../storage";
import {registerOption} from "../config";

const toggle = ({value=get("filterLikes", false), init=false} = {}) => {
    if (!init) {
        set("filterLikes", value);
    }
    // letzten x beiträge
    if (isTemplate("boardList")) {
        if (value) {
            $(".columnLikes").hide();
        } else if(!init) {
            $(".columnLikes").show();
        }
    }
    // themenauflistung
    if (isTemplate("board")) {
        if (value) {
            $(".columnLikes").hide();
        } else if(!init) {
            $(".columnLikes").show();
        }
    }
    // posts
    if (isTemplate("thread")) {
        if (value) {
            $(".likesBadge, .likesSummary, .wcfLikeButton").hide();
        } else if(!init) {
            $(".likesBadge, .likesSummary, .wcfLikeButton").show();
        }
    }
    // profil
    if (isTemplate("user")) {
        if (value) {
            // sidebar
            const children = $(".statsDataList").children();
            children.each((index, element) => {
                if (element.innerText === "Erhaltene Likes") {
                    $(element).hide();
                    children.eq(index - 1).hide();
                    return false;
                }
            });
            // tab nav, pinnwand kommentare, pinnwand kommentare like button
            $(`[aria-controls="likes"], .likesBadge, .wcfLikeButton`).hide();
        } else if(!init) {
            $(`[aria-controls="likes"], .likesBadge, .wcfLikeButton`).show();
            $(".statsDataList > *:hidden").show();
        }
    }
    // usercard
    if (value) {
        const children = $(".userProfilePreview .userStats:first").children();
        children.each((index, element) => {
            if (element.innerText === "Erhaltene Likes") {
                $(element).hide();
                children.eq(index + 1).hide();
                return false;
            }
        });
    }
};
toggle({init: true});
addDOMinsertedListener(() => toggle());

registerOption({
    id: "filterLikes",
    name: "Likes ausblenden",
    tab: "Allgemein",
    type: "toggle",
    default: false,
    description: "Blendet alles was mit Likes zu tun hat aus.",
    onChange: toggle
});
