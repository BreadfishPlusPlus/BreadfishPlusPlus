"use strict";

var storage         = require('storage')();
var utils           = require('utils');
var $               = require('lib/jquery');
var notification    = require('ui/notification');

var subscribeThread = function () {
    $('.pageOptions > a:first-child').click(function (event) {
        event.preventDefault();
        var SECURITY_TOKEN = utils.getSecurityToken(),
            threadID = $('input[name="threadID"]').val(),
            $element = $(this),
            url = $element.attr('href'),
            isSubscribed = utils.getParameterByName('action', url) === 'ThreadSubscribe';
        if (isSubscribed) {
            $element.find('img').attr('src', 'icon/thankLoadS.gif');
            $element.find('span').text('Wird abonniert...');
            $.get(url).done(function () {
                $element.attr('href', 'http://forum.sa-mp.de/index.php?action=ThreadUnsubscribe&threadID=' + threadID + '&t=' + SECURITY_TOKEN);
                $element.find('img').attr('src', 'icon/unsubscribeS.png');
                $element.find('span').text('Thema abbestellen');
                notification.create('Das Thema wurde abboniert!');
            }).fail(function (jqXHR) {
                utils.log.error('Konnte Thema nicht abbonieren.', jqXHR.status, jqXHR.statusText);
            });
        } else {
            $element.find('img').attr('src', 'icon/thankLoadS.gif');
            $element.find('span').text('Wird abbestellt...');
            $.get(url).done(function () {
                $element.attr('href', 'http://forum.sa-mp.de/index.php?action=ThreadSubscribe&threadID=' + threadID + '&t=' + SECURITY_TOKEN);
                $element.find('img').attr('src', 'icon/subscribeS.png');
                $element.find('span').text('Thema abonnieren');
                notification.create('Das Thema wurde abbestellt!');
            }).fail(function (jqXHR) {
                utils.log.error('Konnte Thema nicht abbestellen.', jqXHR.status, jqXHR.statusText);
            });
        }
    });
};

var rateThread = function () {
    var $threadRatingSpan = $('#threadRatingSpan'),
        $loading = $('<img src="icon/thankLoadS.gif" alt="loading" style="display:none" />'),
        rating = $threadRatingSpan.find('img[src="icon/ratingS.png"]').length,
        threadID = $('input[name="threadID"]').val(),
        pageNo = $('.pageOptions form input[name="pageNo"]').val();
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
            notification.create('Das Thema wurde mit ' + (rating === 1 ? 'einem Stern' : rating + ' Sternen') + ' bewertet!');
        }).fail(function (jqXHR) {
            utils.log.error('Konnte Thema nicht bewerten.', jqXHR.status, jqXHR.statusText);
        });
    });
    $threadRatingSpan.find('img').mouseover(function () {
        $threadRatingSpan.find('img').attr('src', 'icon/noRatingS.png').slice(0, parseInt($(this).attr('name'), 10)).attr('src', 'icon/ratingS.png');
    }).mouseout(function () {
        $threadRatingSpan.find('img').attr('src', 'icon/noRatingS.png').slice(0, rating).attr('src', 'icon/ratingS.png');
    });
};

var subscribeBoard = function () {
    $('.pageOptions > a:first-child').click(function (event) {
        event.preventDefault();
        var SECURITY_TOKEN = utils.getSecurityToken(),
            boardID = $('input[name="boardID"]').val(),
            $element = $(this),
            url = $element.attr('href'),
            isSubscribed = utils.getParameterByName('action', url) === 'BoardSubscribe';
        if (isSubscribed) {
            $element.find('img').attr('src', 'icon/thankLoadS.gif');
            $element.find('span').text('Wird abonniert...');
            $.get(url).done(function () {
                $element.attr('href', 'http://forum.sa-mp.de/index.php?action=BoardUnsubscribe&boardID=' + boardID + '&t=' + SECURITY_TOKEN);
                $element.find('img').attr('src', 'icon/unsubscribeS.png');
                $element.find('span').text('Forum abbestellen');
                notification.create('Das Forum wurde abboniert!');
            }).fail(function (jqXHR) {
                utils.log.error('Konnte Forum nicht abbonieren.', jqXHR.status, jqXHR.statusText);
            });
        } else {
            $element.find('img').attr('src', 'icon/thankLoadS.gif');
            $element.find('span').text('Wird abbestellt...');
            $.get(url).done(function () {
                $element.attr('href', 'http://forum.sa-mp.de/index.php?action=BoardSubscribe&boardID=' + boardID + '&t=' + SECURITY_TOKEN);
                $element.find('img').attr('src', 'icon/subscribeS.png');
                $element.find('span').text('Forum abonnieren');
                notification.create('Das Forum wurde abbestellt!');
            }).fail(function (jqXHR) {
                utils.log.error('Konnte Forum nicht abbestellen.', jqXHR.status, jqXHR.statusText);
            });
        }
    });
};

var markBoardAsRead = function () {
    $('.pageOptions > a:last-child').click(function (event) {
        event.preventDefault();
        var $element = $(this),
            url = $element.attr('href');
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
            notification.create('Das Forum wurde als gelesen markiert!');
        }).fail(function (jqXHR) {
            utils.log.error('Konnte Forum nicht als gelesen markieren.', jqXHR.status, jqXHR.statusText);
        });
    });
};

var markAllBoardsAsRead = function () {
    $('.pageOptions > a:last-child').click(function (event) {
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

module.exports = function () {
    if (storage.get('option.common.extension.ajaxify', false)) {
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
};