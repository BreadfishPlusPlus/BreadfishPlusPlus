// ==UserScript==
// @name        Boards
// @namespace   BreadfishPlusPlus
// @include     http://forum.sa-mp.de/*
// @exclude     http://forum.sa-mp.de/acp/*
// @all-frames  false
// @run-at      document-start
// ==/UserScript==
/*global $, BPPUtils*/

BPPUtils.load(function () {
    "use strict";

    if (BPPUtils.isTemplate('tplIndex')) {

        //Erweiterungen: Die letzten X Beiträge
        if (BPPUtils.storage.get('option_boards_extension_lastPosts', 10) !== 10) {
            $('.top5box .tableList tr').slice(BPPUtils.storage.get('option_boards_extension_lastPosts', 10), 10).remove();
            $('.top5box .containerContent').html('<img src="icon/postS.png" alt=""> Die letzten ' + BPPUtils.storage.get('option_boards_extension_lastPosts', 10) + ' Beiträge');
        }

        //Erweiterungen: IRC Shoutbox
        if (BPPUtils.storage.get('option_boards_extension_ircShoutbox', false)) {
            var open = BPPUtils.storage.get('ircShoutbox_open', false),
                $ircShoutbox = $(BPPUtils.template('ircShoutbox', {
                    open: open,
                    nick: $("#userNote > a").text()
                }));
            $(".top5box").before($ircShoutbox);

            $ircShoutbox.on('click', 'a[href="#toggleIrcShoutbox"]', function (e) {
                e.preventDefault();
                if (open) {
                    $ircShoutbox.find('iframe').slideUp();
                } else {
                    $ircShoutbox.find('iframe').slideDown();
                }
                open = !open;
                BPPUtils.storage.set('ircShoutbox_open', open);
                $(this).find('img').attr('src', open ? 'wcf/icon/minusS.png' : 'wcf/icon/plusS.png');
            });
        }

        //Fehlerbehebungen: Suche Icon
        if (BPPUtils.storage.get('option_boards_extension_searchIcon', false)) {
            $('img[src="icon/searchS.png"]').attr('src', 'wcf/icon/searchHeadS.png'); //FK U BENVEI
        }

        //Filter: Zur Zeit sind X Benutzer online
        if (BPPUtils.storage.get('option_boards_filter_usersOnline', false)) {
            $('.infoBoxUsersOnline').remove();
        }

        //Filter: Statistik
        if (BPPUtils.storage.get('option_boards_filter_statistics', false)) {
            $('.infoBoxStatistics').remove();
        }

        //Filter: Geburtstage
        if (BPPUtils.storage.get('option_boards_filter_birthdays', false)) {
            $('.infoBox .container-1').not('.infoBoxUsersOnline').remove();
        }
    }
});