// ==UserScript==
// @name        Threads
// @namespace   BreadfishPlusPlus
// @include     http://forum.sa-mp.de/*
// @exclude     http://forum.sa-mp.de/acp/*
// @all-frames  false
// @run-at      document-start
// ==/UserScript==
/*global kango, $, BPPUtils*/

BPPUtils.load(function () {
    "use strict";

    //Erweiterungen: Ankündigungen und wichtige Themen
    kango.invokeAsync('kango.storage.getItem', 'option_threads_extension_sticky', function (enabled) {
        if (enabled && BPPUtils.isTemplate('tplBoard')) {
            $('#topThreadsStatus').siblings('.titleBarPanel').first().find('.containerHead .containerContent h3').text('Ankündigungen');
            var announcementCount = $('#topThreadsStatus .columnIcon > img[src*="Announcement"]').length;
            $(BPPUtils.template('importantThreadsHeader')).insertAfter($('#topThreadsStatus tbody tr').eq(announcementCount - 1));
        }
    });

    //Filter: Gelöschte Themen
    kango.invokeAsync('kango.storage.getItem', 'option_threads_filter_deleted', function (enabled) {
        if (enabled && BPPUtils.isTemplate('tplBoard')) {
            $('#normalThreadsStatus tbody > tr .columnIcon > img[src*="Trash"]').closest('tr').remove();

            setTimeout(function () {
                $('#normalThreadsStatus tbody > tr').each(function (index) {
                    $(this).attr('class', (index % 2 === 0) ? 'container-1' : 'container-2');
                });
            }, 1000);
        }
    });

});