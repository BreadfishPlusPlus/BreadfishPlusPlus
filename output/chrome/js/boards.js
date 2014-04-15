// ==UserScript==
// @name        Boards
// @namespace   BreadfishPlusPlus
// @include     http://forum.sa-mp.de/*
// @exclude     http://forum.sa-mp.de/acp/*
// @all-frames  false
// ==/UserScript==
/*global kango, $, BPPUtils*/

BPPUtils.ready(function () {
    "use strict";

    if (BPPUtils.isTemplate('tplIndex')) {

        //Erweiterungen: Die letzten X Beiträge
        kango.invokeAsync('kango.storage.getItem', 'option_boards_extension_lastPosts', function (postCount) {
            if (postCount && postCount !== 10) {
                $('.top5box .tableList tr').slice(postCount, 10).remove();
                $('.top5box .containerContent').html('<img src="icon/postS.png" alt=""> Die letzten ' + postCount + ' Beiträge');
            }
        });

        //Erweiterungen: IRC Shoutbox
        kango.invokeAsync('kango.storage.getItem', 'option_boards_extension_ircShoutbox', function (enabled) {
            if (enabled) {
                kango.invokeAsync('kango.storage.getItem', 'ircShoutbox_open', function (open) {
                    open = open || false;
                    var $ircShoutbox = $(BPPUtils.template('ircShoutbox', {
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
                        kango.invokeAsync('kango.storage.setItem', 'ircShoutbox_open', open);
                        $(this).find('img').attr('src', open ? 'wcf/icon/minusS.png' : 'wcf/icon/plusS.png');
                    });
                });
            }
        });

        //Fehlerbehebungen: Suche Icon
        kango.invokeAsync('kango.storage.getItem', 'option_boards_extension_searchIcon', function (enabled) {
            if (enabled) {
                $('img[src="icon/searchS.png"]').attr('src', 'wcf/icon/searchHeadS.png'); //FK U BENVEI
            }
        });

        //Filter: Zur Zeit sind X Benutzer online
        kango.invokeAsync('kango.storage.getItem', 'option_boards_filter_usersOnline', function (enabled) {
            if (enabled) {
                $('.infoBoxUsersOnline').remove();
            }
        });

        //Filter: Statistik
        kango.invokeAsync('kango.storage.getItem', 'option_boards_filter_statistics', function (enabled) {
            if (enabled) {
                $('.infoBoxStatistics').remove();
            }
        });

        //Filter: Geburtstage
        kango.invokeAsync('kango.storage.getItem', 'option_boards_filter_birthdays', function (enabled) {
            if (enabled) {
                $('.infoBox .container-1').not('.infoBoxUsersOnline').remove();
            }
        });
    }
});