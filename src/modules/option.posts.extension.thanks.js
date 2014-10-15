var $           = require('lib/jquery');
var _           = require('lib/underscore');
var storage     = require('../storage');
var utils       = require('../utils');
var register    = require('../settings').register;

register({
    'key': 'option.posts.extension.thanks.enabled',
    'name': 'Danksagungen anzeigen',
    'tab': 'Einstellungen',
    'subtab': 'Beiträge & Nachrichten',
    'category': 'Erweiterungen',
    'type': 'toggle',
    'default': false,
    'description': 'Zeigt die Anzahl der Danksagungen, die ein Benutzer bekommen hat, in Beiträgen an.'
});
register({
    'key': 'option.posts.extension.thanks.cache',
    'type': 'invis',
    'default': {},
});

if (storage.get('option.posts.extension.thanks.enabled', false) && utils.isTemplate('tplThread')) {
    var thanksCache = storage.get('option.posts.extension.thanks.cache', {});
    var users = [], setSidebarThanks, getThanks;

    setSidebarThanks = function (userID, thanks) {
        var $bppThanks = $('.bpp_thanks[data-userID="' + userID + '"]');
        if (thanks === -2) {
            $bppThanks.parent('p').hide();
        } else if (thanks === -1) {
            $bppThanks.html('<img src="icon/thankS.png" alt="" /> <img src="icon/thankLoadS.gif" alt="" />');
        } else {
            $bppThanks.html('<img src="icon/thankS.png" alt="" /> ' + thanks);
        }
    };
    getThanks = function (userID, callback) {
        $.get('http://forum.sa-mp.de/index.php?page=UserThankList&userID=' + userID).done(function (response) {
            var $data = $(response), arr, pages, thanks;
            if ($data.find('.error').length === 0) {
                arr = $data.find('.pageNavigation ul li:not(.skip):not(.children)').toArray();
                pages = parseInt($(arr[arr.length - 1]).text(), 10);
                thanks = 0;
                if (isNaN(pages)) {
                    thanks = parseInt($data.find('.tableList tbody tr').length, 10);
                    callback(thanks);
                } else {
                    $.get('http://forum.sa-mp.de/index.php?page=UserThankList&userID=' + userID + '&pageNoGot=' + pages).done(function (response2) {
                        thanks = parseInt($(response2).find('.tableList tbody tr').length, 10);
                        thanks += (pages - 1) * 10;
                        thanksCache[userID] = thanks;
                        storage.set('option.posts.extension.thanks.cache', thanksCache);
                        callback(thanks);
                    }).fail(function (jqXHR) {
                        callback(-2);
                        utils.log.error('Konnte keine Danksagungen von #' + userID + ' abrufen.', jqXHR.status, jqXHR.statusText);
                    });
                }
            }
        }).fail(function (jqXHR) {
            thanksCache[userID] = -2;
            storage.set('option.posts.extension.thanks.cache', thanksCache);
            callback(-2);
            if (jqXHR.status === 403) {
                utils.log.debug('Danksagungen von #' + userID + ' sind nicht öffentlich zugänglich.');
            } else {
                utils.log.error('Konnte keine Danksagungen von #' + userID + ' abrufen.', jqXHR.status, jqXHR.statusText);
            }
        });
    };

    $('.message:not(.quickReply):not(.deleted)').each(function () {
        var $elem = $(this),
            userID = parseInt(utils.getParameterByName('userID', $elem.find('.messageAuthor .userName a').attr('href')), 10);
        if (users.indexOf(userID) === -1 && !isNaN(userID)) {
            users.push(userID);
        }
        $elem.find('.userCredits').append('<p><a class="bpp_thanks" data-userID="' + userID + '" href="index.php?page=UserThankList&userID=' + userID + '"><img src="icon/thankS.png" alt="" /> <img src="icon/thankLoadS.gif" alt="" /></a></p>');
    });
    _.each(users, function (userId) {
        var cachedThanks = thanksCache[userId] || -1;
        if (cachedThanks !== -1) {
            setSidebarThanks(userId, cachedThanks);
        }
        getThanks(userId, function (thanks) {
            setSidebarThanks(userId, thanks);
        });
    });
}