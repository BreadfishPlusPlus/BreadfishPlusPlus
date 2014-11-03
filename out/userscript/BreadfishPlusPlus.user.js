// ==UserScript==
// @name            Breadfish++
// @description     Eine Zusammenfassung von Erweiterungen für breadfish.de
// @author          Martin Rump
// @version         3.0.0
// @namespace       https://brpp.ga
// @match           *://forum.sa-mp.de/*
// @exclude         *://forum.sa-mp.de/acp/*
// ==/UserScript==

function bpp_init() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = "http://cdn.brpp.ga/breadfishplusplus.js?"+Math.random();
    var head = document.getElementsByTagName('head')[0];
    if(head) head.appendChild(script);
}
bpp_init();