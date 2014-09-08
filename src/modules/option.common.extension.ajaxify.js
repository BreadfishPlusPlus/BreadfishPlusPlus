"use strict";

var $               = require('lib/jquery');
var storage         = require('../storage');
var utils           = require('../utils');
var notification    = require('../ui/notification');
var register        = require("../settings").register;

var subscribeThread = function () {
    console.log('subscribeThread', $('.pageOptions > a:first-child'));
    $(document).on('click', '.pageOptions > a:first-child', function (event) {
        event.preventDefault();
        console.log('subscribeThread.click');
        var SECURITY_TOKEN = utils.getSecurityToken(),
            threadID = $('input[name="threadID"]').val(),
            $element = $(this),
            url = $element.attr('href'),
            threadName = $('.headlineContainer h2 a').text().trim(),
            isSubscribed = utils.getParameterByName('action', url) === 'ThreadSubscribe';
        if (isSubscribed) {
            $element.find('img').attr('src', 'icon/thankLoadS.gif');
            $element.find('span').text('Wird abonniert...');
            $.get(url).done(function () {
                $element.attr('href', 'http://forum.sa-mp.de/index.php?action=ThreadUnsubscribe&threadID=' + threadID + '&t=' + SECURITY_TOKEN);
                $element.find('img').attr('src', 'icon/unsubscribeS.png');
                $element.find('span').text('Thema abbestellen');
                console.log(threadName);
                notification.create('Das Thema »' + threadName + '« wurde abboniert!');
            }).fail(function (jqXHR) {
                utils.log.error('Konnte Thema »' + threadName + '« nicht abbonieren.', jqXHR.status, jqXHR.statusText);
            });
        } else {
            $element.find('img').attr('src', 'icon/thankLoadS.gif');
            $element.find('span').text('Wird abbestellt...');
            $.get(url).done(function () {
                $element.attr('href', 'http://forum.sa-mp.de/index.php?action=ThreadSubscribe&threadID=' + threadID + '&t=' + SECURITY_TOKEN);
                $element.find('img').attr('src', 'icon/subscribeS.png');
                $element.find('span').text('Thema abonnieren');
                notification.create('Das Thema »' + threadName + '« wurde abbestellt!');
            }).fail(function (jqXHR) {
                utils.log.error('Konnte Thema »' + threadName + '« nicht abbestellen.', jqXHR.status, jqXHR.statusText);
            });
        }
    });
};

var rateThread = function () {
    var $threadRatingSpan = $('#threadRatingSpan'),
        $loading = $('<img src="icon/thankLoadS.gif" alt="loading" style="display:none" />'),
        rating = $threadRatingSpan.find('img[src="icon/ratingS.png"]').length,
        threadID = $('input[name="threadID"]').val(),
        pageNo = $('.pageOptions form input[name="pageNo"]').val(),
        threadName = $('.headlineContainer h2 a').text().trim();
    if ($threadRatingSpan.length > 0) {
        $threadRatingSpan.replaceWith($threadRatingSpan.clone(false));
    }
    $threadRatingSpan = $('#threadRatingSpan');
    $loading.insertAfter($threadRatingSpan);

    $threadRatingSpan.find('img').css({cursor: 'pointer'}).click(function (event) {
        event.preventDefault();
        rating = parseInt($(this).attr('name'), 10);
        $('#threadRating').val(rating);
        $('#threadRatingSpan img').attr('src', 'icon/noRatingS.png').slice(0, rating).attr('src', 'icon/ratingS.png');

        $loading.show();
        $threadRatingSpan.hide();
        $.ajax({
            type: 'POST',
            url: 'http://forum.sa-mp.de/index.php?page=Thread',
            async: true,
            data: {
                threadID: threadID,
                pageNo: pageNo,
                rating: rating
            }
        }).done(function () {
            $loading.hide();
            $threadRatingSpan.show();
            notification.create('Das Thema »' + threadName + '« wurde mit ' + (rating === 1 ? 'einem Stern' : rating + ' Sternen') + ' bewertet!');
        }).fail(function (jqXHR) {
            utils.log.error('Konnte Thema »' + threadName + '« nicht bewerten.', jqXHR.status, jqXHR.statusText);
        });
    });
    $threadRatingSpan.find('img').mouseover(function () {
        $threadRatingSpan.find('img').attr('src', 'icon/noRatingS.png').slice(0, parseInt($(this).attr('name'), 10)).attr('src', 'icon/ratingS.png');
    }).mouseout(function () {
        $threadRatingSpan.find('img').attr('src', 'icon/noRatingS.png').slice(0, rating).attr('src', 'icon/ratingS.png');
    });
};

var subscribeBoard = function () {
    $(document).on('click', '.pageOptions > a:first-child', function (event) {
        event.preventDefault();
        var SECURITY_TOKEN = utils.getSecurityToken(),
            boardID = $('input[name="boardID"]').val(),
            $element = $(this),
            url = $element.attr('href'),
            isSubscribed = utils.getParameterByName('action', url) === 'BoardSubscribe',
            boardName = $('.headlineContainer h2 a').text().trim();
        if (isSubscribed) {
            $element.find('img').attr('src', 'icon/thankLoadS.gif');
            $element.find('span').text('Wird abonniert...');
            $.get(url).done(function () {
                $element.attr('href', 'http://forum.sa-mp.de/index.php?action=BoardUnsubscribe&boardID=' + boardID + '&t=' + SECURITY_TOKEN);
                $element.find('img').attr('src', 'icon/unsubscribeS.png');
                $element.find('span').text('Forum abbestellen');
                notification.create('Das Forum »' + boardName + '« wurde abboniert!');
            }).fail(function (jqXHR) {
                utils.log.error('Konnte Forum »' + boardName + '« nicht abbonieren.', jqXHR.status, jqXHR.statusText);
            });
        } else {
            $element.find('img').attr('src', 'icon/thankLoadS.gif');
            $element.find('span').text('Wird abbestellt...');
            $.get(url).done(function () {
                $element.attr('href', 'http://forum.sa-mp.de/index.php?action=BoardSubscribe&boardID=' + boardID + '&t=' + SECURITY_TOKEN);
                $element.find('img').attr('src', 'icon/subscribeS.png');
                $element.find('span').text('Forum abonnieren');
                notification.create('Das Forum »' + boardName + '« wurde abbestellt!');
            }).fail(function (jqXHR) {
                utils.log.error('Konnte Forum »' + boardName + '« nicht abbestellen.', jqXHR.status, jqXHR.statusText);
            });
        }
    });
};

var markBoardAsRead = function () {
    $(document).on('click', '.pageOptions > a:last-child', function (event) {
        event.preventDefault();
        var $element = $(this),
            url = $element.attr('href'),
            boardName = $('.headlineContainer h2 a').text().trim();
        $element.find('img').attr('src', 'icon/thankLoadS.gif');
        $element.find('span').text('Wird als gelesen markiert...');
        $.get(url).done(function () {
            $element.find('img').attr('src', 'icon/boardMarkAsReadS.png');
            $element.find('span').text('Forum wurde als gelesen markiert');
            $('.topic.new').each(function () {
                $(this).removeClass('new');
                $(this).find(' > a').remove();
            });
            $('img[src$="threadNewM.png"]').attr('src', 'icon/threadM.png');
            $('img[src$="threadNewOptionsM.png"]').attr('src', 'icon/threadOptionsM.png');
            notification.create('Das Forum »' + boardName + '« wurde als gelesen markiert!');
        }).fail(function (jqXHR) {
            utils.log.error('Konnte Forum »' + boardName + '« nicht als gelesen markieren.', jqXHR.status, jqXHR.statusText);
        });
    });
};

var markAllBoardsAsRead = function () {
    $(document).on('click', '.pageOptions > a:last-child', function (event) {
        event.preventDefault();
        var $element = $(this),
            url = $element.attr('href');
        $element.find('img').attr('src', 'icon/thankLoadS.gif');
        $element.find('span').text('Alle Foren werden als gelesen markiert...');
        $.get(url).done(function () {
            $element.find('img').attr('src', 'icon/boardMarkAsReadS.png');
            $element.find('span').text('Alle Foren wurden als gelesen markiert');
            $('a[id^="boardLink"]').removeClass('new').find('span').remove();
            $('.columnTop5TopicTitle > a.new').each(function () {
                $(this).removeClass('new');
                $(this).parent('.columnTop5TopicTitle').find(' > img').attr('src', 'icon/threadS.png');
            });
            notification.create('Alle Foren wurde als gelesen markiert!');
        }).fail(function (jqXHR) {
            utils.log.error('Konnte nicht alle Foren als gelesen markieren.', jqXHR.status, jqXHR.statusText);
        });
    });
};


register({
    'key': 'option.common.extension.ajaxify.enabled',
    'name': 'Asynchrone Datenübertragung',
    'tab': 'Einstellungen',
    'subtab': 'Allgemeine Einstellungen',
    'category': 'Erweiterungen',
    'type': 'toggle',
    'default': false,
    'description': 'Lässt verschiedene Operationen durch <a href="http://de.wikipedia.org/wiki/Ajax_(Programmierung)">Ajax</a> im Hintergrund ausführen anstatt die Seite neu zu laden.'
});

if (storage.get('option.common.extension.ajaxify.enabled', false)) {
    if (utils.isTemplate('tplThread')) {
        subscribeThread();
        rateThread();
    } else if (utils.isTemplate('tplBoard')) {
        subscribeBoard();
        markBoardAsRead();
    } else if (utils.isTemplate('tplIndex')) {
        markAllBoardsAsRead();
    }
}