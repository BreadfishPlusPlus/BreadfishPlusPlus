$(function () {
    "use strict";
    GM_log('executing boards.js');

    function changeLastPosts() {
        var posts = GM_getValue('option_boards_extension_lastPosts', 10);
        $('.top5box .tableList tr').slice(posts, 10).remove();
        $('.top5box .containerContent').html('<img src="icon/postS.png" alt=""> Die letzten ' + posts + ' Beiträge');
    }

    function showShoutbox() {
        var ircShoutbox_open = GM_getValue('ircShoutbox_open', true),
            $ircShoutbox = $(BPPUtils.nano('ircShoutbox', {
                icon: ircShoutbox_open ? 'wcf/icon/minusS.png' : 'scf/icon/plusS.png'
            })),
            width = 0,
            $iFrame;

        $(".top5box").before($ircShoutbox);
        width = $ircShoutbox.width();
        $ircShoutbox.hide();

        $iFrame = $('<iframe id="ircShoutboxIframe" src="http://webchat.kerat.net:3988/?nick=' + $("#userNote > a").text() + '&channels=#sa-mp.de&fg_color=57595A&fg_sec_color=57595A&bg_color=FFFFFF&prompt=0" width="' + width + '" height="400"></iframe>');
        $iFrame.css({
            'border': 'none',
            'margin-bottom': '-3px'
        });
        $ircShoutbox.append($iFrame);
        $iFrame.load(function () {
            if (!ircShoutbox_open) {
                $iFrame.hide();
            }
            $ircShoutbox.show();
        });

        $ircShoutbox.find('.containerIcon > a').click(function (e) {
            e.preventDefault();
            if (ircShoutbox_open) {
                $iFrame.slideUp();
            } else {
                $iFrame.slideDown();
            }
            ircShoutbox_open = !ircShoutbox_open;
            GM_setValue('ircShoutbox_open', ircShoutbox_open);
            $(this).find('img').attr('src', ircShoutbox_open ? 'wcf/icon/minusS.png' : 'wcf/icon/plusS.png');
        });
    }

    $(document).ready(function () {
        if (BPPUtils.isTemplate('tplIndex')) {
            if (GM_getValue('option_boards_extension_lastPosts', 10) !== 10) {
                changeLastPosts();
            }
            if (GM_getValue('option_boards_extension_ircShoutbox', false)) {
                showShoutbox();
            }
            if (GM_getValue('option_boards_extension_searchIcon', false)) {
                $('img[src="icon/searchS.png"]').attr('src', 'wcf/icon/searchHeadS.png'); //FK U BENVEI
            }
            if (GM_getValue('option_boards_filter_usersOnline', false)) {
                $('.infoBoxUsersOnline').remove();
            }
            if (GM_getValue('option_boards_filter_statistics', false)) {
                $('.infoBoxStatistics').remove();
            }
            if (GM_getValue('option_boards_filter_birthdays', false)) {
                $('.infoBox .container-1').not('.infoBoxUsersOnline').remove();
            }
        }
    });
});