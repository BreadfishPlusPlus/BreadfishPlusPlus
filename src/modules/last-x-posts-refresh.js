import {isTemplate, triggerDOMInserted} from "../breadfish";
import $ from "jquery";
import {get, set} from "../storage";
import {registerOption} from "../config";
import _debug from "debug";
const log = _debug("bpp:last-x-posts-refresh.js");

let counterTimeout = undefined;
let lastRefresh = undefined;
let lastXPostsRefreshInterval = undefined;
let $headerBadge = undefined;

const setBadge = () => {
    // berechnen, wie viele sekunden noch übrig bleiben bis wir automatisch aktualisieren wollen
    const remain = Math.round((lastRefresh + lastXPostsRefreshInterval - Date.now()) / 1000);
    log("setBadge", remain);

    // text des badges setzen
    $headerBadge.text(`Automatische Aktualisierung in ${remain} Sekunden`);

    // wenn noch mindestens eine sekunde zeit ist noch einen runter zählen
    if (remain > 0) {
        counterTimeout = setTimeout(setBadge, 1000);
        return;
    }

    // zeit ist um, #updaten jetzt!
    refreshPosts();
};

const refreshPosts = () => {
    log("refreshPosts");
    // text setzen, damit der user weiss das gerade etwas passiert
    $headerBadge.text(`Wird aktualisiert ...`);

    // click handler entfernen, damit man nicht mehrere updates gleichzeitig triggern kann
    $headerBadge.off("click", refreshPosts);

    // pointer-events abschalten, damit man kein feedback mehr bekommt beim klicken
    $headerBadge.css("pointer-events", "none");

    // timeout clearen. falls manuell via klick aktualsiert wurde darf der time nicht weiter laufen,
    // sonst passiert ein zweites, unnötiges update
    clearTimeout(counterTimeout);

    // HTML dokument laden
    $.get(`${window.location.protocol}//breadfish.de/`).done((data) => {
        // HTML dokument in separates jQuery objekt laden
        const $data = $(data);

        // DOM node finden, das wir kopieren wollen
        const $lastXBoardPosts = $data.find("#lastXBoardPosts");
        log("$lastXBoardPosts", $lastXBoardPosts[0]);

        // DOM node in aktuellen DOM einfügen
        $("#lastXBoardPosts").html($lastXBoardPosts.html());

        // lastRefresh Zeitpunkt zurücksetzen, damit der Counter aktuell ist
        lastRefresh = Date.now();

        // WCF event aufrufen, das sich um tooltips und user-/postcards kümmert
        triggerDOMInserted();

        // aktuellen code aufräumen ...
        stopInterval();
        // ... und neu aufsetzen
        setupInterval();

        log("Die letzten 10 Beiträge wurden aktualisiert!");
    }).fail((jqXHR, textStatus, errorThrown) => {
        console.error("fail", {jqXHR, textStatus, errorThrown});
        // request failed :<

        // success -> error badge
        $headerBadge.removeClass("green").addClass("red");

        // pointer-events wieder aktivieren
        $headerBadge.css("pointer-events", "initial");

        // click handler attachen, damit man wieder manuell aktualsieren kann
        $headerBadge.on("click", refreshPosts);

        // fehlermeldung anzeigen
        $headerBadge.text(`Error: ${textStatus}`);
    });
};

const setupInterval = () => {
    log("setupInterval");
    // lastRefresh auf den aktuellen Zeitpunkt setzen
    lastRefresh = Date.now();

    // badge element erstellen
    $headerBadge = $(`<a class="badge green" style="float:right"></a>`);

    // badge element click handler setzen
    $headerBadge.on("click", refreshPosts);

    // badge element dem header hinzufügen
    $(".lastXPosts header h2").append($headerBadge);

    // badge aktualisieren
    setBadge();
};
const stopInterval = () => {
    // timeout clearen
    clearTimeout(counterTimeout);

    // badge entfernen
    $headerBadge.remove();
};

const toggle = ({value=get("lastXPostsRefresh", false), init=false} = {}) => {
    if (!init) {
        set("lastXPostsRefresh", value);
    }
    if (!isTemplate("boardList")) {
        return;
    }
    log("toggle", value);
    if (value) {
        lastXPostsRefreshInterval = get("lastXPostsRefreshInterval", 10000);
        setupInterval();
    } else if (!init) {
        stopInterval();
    }
};
toggle({init: true});


registerOption({
    id: "lastXPostsRefresh",
    name: "\"Die letzten X Beiträge\"-Aktualisierung",
    tab: "Startseite",
    type: "toggle",
    default: false,
    description: "Aktualisiert die \"Die letzten X Beiträge\"-Box auf der Startseite automatisch in regelmäßigen abständen.",
    onChange: toggle
});
registerOption({
    id: "lastXPostsRefreshInterval",
    name: "\"Die letzten X Beiträge\"-Aktualisierungsinterval",
    tab: "Startseite",
    type: "number",
    advanced: true,
    default: 60000,
    description: "Anzahl in Millisekunden in deren Abstand die Beiträge aktualisiert werden sollen.",
    onChange: ({value}) => set("lastXPostsRefreshInterval", Number(value))
});
