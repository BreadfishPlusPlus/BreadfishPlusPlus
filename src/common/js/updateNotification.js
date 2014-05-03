// ==UserScript==
// @name        updateNotification
// @namespace   BreadfishPlusPlus
// @include     http://forum.sa-mp.de/*
// @exclude     http://forum.sa-mp.de/acp/*
// @all-frames  false
// @run-at      document-start
// ==/UserScript==
/*jslint nomen: true*/
/*global $, BPPUtils, _, PNotify*/

BPPUtils.load(function () {
    "use strict";

    BPPUtils.addMStyle(['pnotify_custom', 'jquery-ui', 'pnotify']);

    var getVersion, isNewVersion, curVer, extVer, notice;

    getVersion = function (version) {
        return _.map(version.split('.'), function (num) {
            return parseInt(num, 10);
        });
    };

    isNewVersion = function (v1, v2) {
        return v1[0] < v2[0] || (v1[0] === v2[0] && v1[1] < v2[1]) || (v1[0] === v2[0] && v1[1] === v2[1] && v1[2] < v2[2]);
    };

    curVer = getVersion(BPPUtils.version);
    $.getJSON('https://raw.githubusercontent.com/BreadfishPlusPlus/BreadfishPlusPlus/v2/package.json', function (packageInfo) {
        extVer = getVersion(packageInfo.version);
        if (isNewVersion(curVer, extVer)) {
            notice = new PNotify({
                title: '<strong>Eine neue Breadfish++ Version ist verfügbar!</srong>',
                text: 'Deine Version: ' + BPPUtils.version + '\nAktuelle Version: ' + packageInfo.version + '\n\nKlicke hier um zur neuen Version zu gelangen.',
                hide: false,
                buttons: {
                    sticker: false
                },
                width: 'auto'
            });
            notice.get().click(function (e) {
                if (!$(e.target).is('.ui-pnotify-closer *, .ui-pnotify-sticker *')) {
                    window.open('https://github.com/BreadfishPlusPlus/BreadfishPlusPlus/releases/tag/v' + packageInfo.version, '_blank');
                    notice.remove();
                }
            });
        }
    });
});