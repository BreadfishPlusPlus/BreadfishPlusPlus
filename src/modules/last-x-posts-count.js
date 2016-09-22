import {isTemplate} from "../breadfish";
import $ from "jquery";
import {get, set} from "../storage";
import {registerOption} from "../config";

const change = ({value=get("lastXPostsCount", 10), init=false} = {}) => {
    value = Number(value);
    if (!init) {
        set("lastXPostsCount", value);
    }
    if (!isTemplate("boardList")) {
        return;
    }
    if (value === 0) {
        $(".lastXPosts:visible").hide();
    } else if (!init) {
        $(".lastXPosts:hidden").show();
        $(".lastXPosts .table tr").slice(0, value + 1).show();
        $(".lastXPosts .table tr").slice(value + 1, 11).hide();
    }
};
change({init: true});

registerOption({
    id: "lastXPostsCount",
    name: "Die letzten X Beiträge",
    tab: "Startseite",
    type: "select",
    options: [
        {label: "Ausblenden", value: 0},
        {label: "1 Beitrag", value: 1},
        {label: "2 Beiträge", value: 2},
        {label: "3 Beiträge", value: 3},
        {label: "4 Beiträge", value: 4},
        {label: "5 Beiträge", value: 5},
        {label: "6 Beiträge", value: 6},
        {label: "7 Beiträge", value: 7},
        {label: "8 Beiträge", value: 8},
        {label: "9 Beiträge", value: 9},
        {label: "10 Beiträge", value: 10}
    ],
    default: 10,
    description: "Passt die Anzahl der \"Letzte X Beiträge\"-Box auf der Startseite an.",
    onChange: change
});
