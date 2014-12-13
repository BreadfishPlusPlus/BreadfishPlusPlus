var $           = require('lib/jquery');
var storage     = require('../storage');
var utils       = require('../utils');
var popup       = require('../ui/popup');
var register    = require('../settings').register;

register({
    'key': 'option.posts.extension.screenshot.enabled',
    'name': 'Screenshot',
    'tab': 'Einstellungen',
    'subtab': 'Beiträge & Nachrichten',
    'category': 'Erweiterungen',
    'type': 'toggle',
    'default': false,
    'description': 'Siehe <a href="http://git.io/LK5njg" target="_blank">Wiki Eintrag zum Screenshot-Modul</a>.'
});

if (storage.get('option.posts.extension.screenshot.enabled', false) && utils.isTemplate('tplThread')) {
    require('../styles/screenshot.less');
    $(document).on('mouseover', '.bpp-screenshot-info input', function () {
        $(this).select();
    });
    var showInfoPopup = function (url) {
        popup.message(require('templates').screenshotMessage({
            url: url
        }), 'info', true);
        $('.bpp-screenshot-info img').one('load', function() {
            $('.bpp-screenshot-info p:first-child').hide();
            $('.bpp-screenshot-info img').show();
        });
    };

    $('.message:not(.quickReply):not(.deleted)').each(function () {
        var $elem = $(this),
            id = $elem.attr('id').substr(7);
        $elem.find('.messageFooterRight .smallButtons > ul').append(require('templates').screenshotButtonPost({
            postId: id
        }));
    });
    var threadId = $('input[name="threadID"]').val(),
        pageNo = $('input[name="pageNo"][value]').val();
    $('.largeButtons').each(function () {
        $(this).find('ul').append(require('templates').screenshotButtonThread({
            threadId: threadId,
            pageNo: pageNo
        }));
    });
    $('.bpp-screenshot-post').click(function (e) {
        e.preventDefault();
        var postId = $(this).attr('href').substr(1);
        showInfoPopup(DOMAIN.screenshot + 'post/' + postId + '.png');
    });
    $('.bpp-screenshot-thread').click(function (e) {
        e.preventDefault();
        var id = $(this).attr('href').substr(1).split('-');
        showInfoPopup(DOMAIN.screenshot + 'thread/' + id[0] + '/' + id[1] + '.png');
    });
}