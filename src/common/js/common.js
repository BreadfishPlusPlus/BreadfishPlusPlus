// ==UserScript==
// @name        Common
// @namespace   BreadfishPlusPlus
// @include     http://forum.sa-mp.de/*
// @exclude     http://forum.sa-mp.de/acp/*
// @all-frames  false
// @run-at      document-start
// ==/UserScript==
/*global $, BPPUtils, moment, PNotify*/
/*jslint vars: true, unparam: true*/

BPPUtils.ready(function () {
    "use strict";

    BPPUtils.addStyle('common');

    //Erweiterungen: Alternative PN Benachrichtigung
    if (BPPUtils.storage.get('option.common.extension.privateMessageNotification', false)) {
        var checkForNewMessage, notifiedMessages = [];

        checkForNewMessage = function () {
            BPPUtils.ajax({
                type: 'GET',
                url: 'http://forum.sa-mp.de/index.php',
                data: {
                    page: 'PMList'
                }
            }, function (response, status, jqXHR) {
                if (status === 200) {
                    var messages = [];
                    $(response).find('.tableList tr > .columnTitle.new').each(function () {
                        var $element = $(this),
                            $tr = $element.parent('tr'),
                            pmId = parseInt(BPPUtils.getParameterByName('pmID', $element.find('a').attr('href')), 10);
                        if (notifiedMessages.indexOf(pmId) === -1) {
                            messages.push({
                                'title': $element.find('a').text(),
                                'text': $element.attr('title'),
                                'author': $tr.find('.columnAuthor a').text(),
                                'authorID': BPPUtils.getParameterByName('userID', $tr.find('.columnAuthor a').attr('href')),
                                'date': $tr.find('.columnDate > p').text().split('\n')[0].trim(),
                                'id': pmId
                            });
                            notifiedMessages.push(pmId);
                        }
                    });
                    if (messages.length > 0) {
                        new PNotify({
                            title: messages.length > 1 ? '<strong>Du hast ' + messages.length + ' neue Nachrichten!</srong>' : '<strong>Du hast eine neue Nachricht!</srong>',
                            text: BPPUtils.template('privateMessageNotification', {
                                'messages': messages
                            }),
                            width: 'auto',
                            type: 'info',
                            icon: 'pm',
                            hide: false
                        });
                    }
                } else {
                    BPPUtils.log.error('Konnte keine Privaten Nachrichten abrufen.', jqXHR.status, jqXHR.statusText);
                }
            });
        };

        $('#pmOutstandingNotifications').hide();

        checkForNewMessage();

        setInterval(function () {
            checkForNewMessage();
        }, 60 * 5 * 1000);
    }

    //Erweiterungen: Asynchrone Datenübertragung
    if (BPPUtils.storage.get('option.common.extension.ajaxify', false)) {
        if (BPPUtils.isTemplate('tplThread')) {
            //Subscribe Thread
            $('.pageOptions > a:first-child').click(function (event) {
                event.preventDefault();
                var SECURITY_TOKEN = BPPUtils.getSecurityToken(),
                    threadID = $('input[name="threadID"]').val(),
                    $element = $(this),
                    url = $element.attr('href'),
                    isSubscribed = BPPUtils.getParameterByName('action', url) === 'ThreadSubscribe';
                if (isSubscribed) {
                    $element.find('img').attr('src', 'icon/thankLoadS.gif');
                    $element.find('span').text('Wird abonniert...');
                    BPPUtils.ajax({
                        type: 'GET',
                        url: url
                    }, function (response, status, jqXHR) {
                        if (status === 200) {
                            $element.attr('href', 'http://forum.sa-mp.de/index.php?action=ThreadUnsubscribe&threadID=' + threadID + '&t=' + SECURITY_TOKEN);
                            $element.find('img').attr('src', 'icon/unsubscribeS.png');
                            $element.find('span').text('Thema abbestellen');
                        } else {
                            BPPUtils.log.error('Konnte Thema nicht abbonieren.', jqXHR.status, jqXHR.statusText);
                        }
                    });
                } else {
                    $element.find('img').attr('src', 'icon/thankLoadS.gif');
                    $element.find('span').text('Wird abbestellt...');
                    BPPUtils.ajax({
                        type: 'GET',
                        url: url
                    }, function (response, status, jqXHR) {
                        if (status === 200) {
                            $element.attr('href', 'http://forum.sa-mp.de/index.php?action=ThreadSubscribe&threadID=' + threadID + '&t=' + SECURITY_TOKEN);
                            $element.find('img').attr('src', 'icon/subscribeS.png');
                            $element.find('span').text('Thema abonnieren');
                        } else {
                            BPPUtils.log.error('Konnte Thema nicht abbestellen.', jqXHR.status, jqXHR.statusText);
                        }
                    });
                }
            });

            //Rate Thread
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
                BPPUtils.ajax({
                    type: 'GET',
                    url: 'http://forum.sa-mp.de/index.php?page=Thread',
                    async: false,
                    data: {
                        threadID: threadID,
                        pageNo: pageNo,
                        rating: rating
                    }
                }, function (response, status, jqXHR) {
                    if (status === 200) {
                        $loading.hide();
                        $threadRatingSpan.show();
                    } else {
                        BPPUtils.log.error('Konnte Thema nicht bewerten.', jqXHR.status, jqXHR.statusText);
                    }
                });
            });
            $threadRatingSpan.find('img').mouseover(function () {
                $threadRatingSpan.find('img').attr('src', 'icon/noRatingS.png').slice(0, parseInt($(this).attr('name'), 10)).attr('src', 'icon/ratingS.png');
            }).mouseout(function () {
                $threadRatingSpan.find('img').attr('src', 'icon/noRatingS.png').slice(0, rating).attr('src', 'icon/ratingS.png');
            });
        } else if (BPPUtils.isTemplate('tplBoard')) {
            //Subscribe Board
            $('.pageOptions > a:first-child').click(function (event) {
                event.preventDefault();
                var SECURITY_TOKEN = BPPUtils.getSecurityToken(),
                    boardID = $('input[name="boardID"]').val(),
                    $element = $(this),
                    url = $element.attr('href'),
                    isSubscribed = BPPUtils.getParameterByName('action', url) === 'BoardSubscribe';
                if (isSubscribed) {
                    $element.find('img').attr('src', 'icon/thankLoadS.gif');
                    $element.find('span').text('Wird abonniert...');
                    BPPUtils.ajax({
                        type: 'GET',
                        url: url
                    }, function (response, status, jqXHR) {
                        if (status === 200) {
                            $element.attr('href', 'http://forum.sa-mp.de/index.php?action=BoardUnsubscribe&boardID=' + boardID + '&t=' + SECURITY_TOKEN);
                            $element.find('img').attr('src', 'icon/unsubscribeS.png');
                            $element.find('span').text('Forum abbestellen');
                        } else {
                            BPPUtils.log.error('Konnte Forum nicht abbonieren.', jqXHR.status, jqXHR.statusText);
                        }
                    });
                } else {
                    $element.find('img').attr('src', 'icon/thankLoadS.gif');
                    $element.find('span').text('Wird abbestellt...');
                    BPPUtils.ajax({
                        type: 'GET',
                        url: url
                    }, function (response, status, jqXHR) {
                        if (status === 200) {
                            $element.attr('href', 'http://forum.sa-mp.de/index.php?action=BoardSubscribe&boardID=' + boardID + '&t=' + SECURITY_TOKEN);
                            $element.find('img').attr('src', 'icon/subscribeS.png');
                            $element.find('span').text('Forum abonnieren');
                        } else {
                            BPPUtils.log.error('Konnte Forum nicht abbestellen.', jqXHR.status, jqXHR.statusText);
                        }
                    });
                }
            });

            //Mark Board as Read
            $('.pageOptions > a:last-child').click(function (event) {
                event.preventDefault();
                var $element = $(this),
                    url = $element.attr('href');
                $element.find('img').attr('src', 'icon/thankLoadS.gif');
                $element.find('span').text('Wird als gelesen markiert...');
                BPPUtils.ajax({
                    type: 'GET',
                    url: url
                }, function (response, status, jqXHR) {
                    if (status === 200) {
                        $element.find('img').attr('src', 'icon/boardMarkAsReadS.png');
                        $element.find('span').text('Forum wurde als gelesen markiert');
                        $('.topic.new').each(function () {
                            $(this).removeClass('new');
                            $(this).find(' > a').remove();
                        });
                        $('img[src$="threadNewM.png"]').attr('src', 'icon/threadM.png');
                        $('img[src$="threadNewOptionsM.png"]').attr('src', 'icon/threadOptionsM.png');
                    } else {
                        BPPUtils.log.error('Konnte Forum nicht als gelesen markieren.', jqXHR.status, jqXHR.statusText);
                    }
                });
            });
        } else if (BPPUtils.isTemplate('tplIndex')) {
            //Mark all boards as read
            $('.pageOptions > a:last-child').click(function (event) {
                event.preventDefault();
                var $element = $(this),
                    url = $element.attr('href');
                $element.find('img').attr('src', 'icon/thankLoadS.gif');
                $element.find('span').text('Alle Foren werden als gelesen markiert...');
                BPPUtils.ajax({
                    type: 'GET',
                    url: url
                }, function (response, status, jqXHR) {
                    if (status === 200) {
                        $element.find('img').attr('src', 'icon/boardMarkAsReadS.png');
                        $element.find('span').text('Alle Foren wurden als gelesen markiert');
                        $('a[id^="boardLink"]').removeClass('new').find('span').remove();
                        $('.columnTop5TopicTitle > a.new').each(function () {
                            $(this).removeClass('new');
                            $(this).parent('.columnTop5TopicTitle').find(' > img').attr('src', 'icon/threadS.png');
                        });
                    } else {
                        BPPUtils.log.error('Konnte nicht alle Foren als gelesen markieren.', jqXHR.status, jqXHR.statusText);
                    }
                });
            });
        }

        //Change Style
        $('#changeStyleMenu > ul > li > a').click(function (event) {
            event.preventDefault();
            var styleURL = 'http://forum.sa-mp.de/' + $(this).attr('href'),
                styleID = BPPUtils.getParameterByName('styleID', styleURL),
                styleElement = $('link[href^="http://forum.sa-mp.de/wcf/style/style-"]');
            $('#changeStyleMenu > ul > li.active').removeClass('active');
            $(this).parent('li').addClass('active');

            styleElement[0].disabled = true;
            styleElement.attr('href', 'http://forum.sa-mp.de/wcf/style/style-' + styleID + '.css');
            styleElement[0].disabled = false;
            BPPUtils.ajax({
                type: 'GET',
                url: styleURL
            }, function (response, status, jqXHR) {
                if (status !== 200) {
                    BPPUtils.log.error('Konnte Style nicht wechseln.', jqXHR.status, jqXHR.statusText);
                }
            });
        });
    }

    //Erweiterungen: Alternative Tooltips
    if (BPPUtils.storage.get('option.common.extension.tooltip', false)) {
        BPPUtils.addStyle('tooltip');
        $('body').tooltip({
            delay: {
                show: 1000,
                hide: 100
            },
            html: false,
            placement: 'auto',
            container: 'body',
            selector: '[title]'
        });
    }

    //Erweiterungen: Meldungsgründe
    if (BPPUtils.storage.get('option.common.extension.reportReasons', false) && BPPUtils.isTemplate('tplPostReport')) {
        var reasons = ['Anschuldigung ohne Beweise', 'Beleidigung', 'Crossposting', 'Doppelpost', 'Falscher Bereich', 'Falscher Umgangston', 'Threadpushing', 'Spam'], $formElement = $('.formElement'), $text = $('#text');
        $formElement.css('position', 'relative');
        $formElement.append('<div class="smallButtons reportReasons"><ul><li><a href="#">' + reasons.join('</a></li><li><a href="#">') + '</a></li></ul></div>');
        $('.reportReasons a').click(function (event) {
            event.preventDefault();
            $text.focus();
            var text = $(this).text();
            if (text === reasons[0]) {
                $text.text('Dieser Beitrag erhebt folgende Anschuldigungen, ohne diese zu beweisen: ');
            } else if (text === reasons[1]) {
                $text.text('Dieser Beitrag ist Beleidigend, weil ');
            } else if (text === reasons[2]) {
                $text.text('Dieser Beitrag ist ein Cross-Post von hier: <hier bitte den Link zum anderen Thema/Beitrag einfügen>');
            } else if (text === reasons[3]) {
                $text.text('Dieser Beitrag ist ein Doppelpost.');
            } else if (text === reasons[4]) {
                $text.text('Dieser Beitrag ist im Falschen Bereich, weil ');
            } else if (text === reasons[5]) {
                $text.text('Dieser Beitrag weist einen falschen Umgangston auf, weil ');
            } else if (text === reasons[6]) {
                $text.text('Dieser Beitrag ist ausschließlich dazu da, das Thema zu Pushen.');
            } else if (text === reasons[7]) {
                $text.text('Dieser Beitrag ist Spam, weil ');
            }
        });
    }

    //Erweiterungen: Relative Zeitangaben
    var getRelativeTime = function (dateStr) {
        var momentDate, time, date = new Date();
        if (dateStr.substr(0, 5) === 'Heute') {
            time = dateStr.substr(-5, 5).split(':');
            date.setHours(time[0]);
            date.setMinutes(time[1]);
            momentDate = moment(date);
        } else if (dateStr.substr(0, 7) === 'Gestern') {
            time = dateStr.substr(-5, 5).split(':');
            date.setHours(time[0]);
            date.setMinutes(time[1]);
            momentDate = moment(date);
            momentDate.subtract('days', 1);
        } else {
            momentDate = moment(dateStr, "DD.MM.YYYY, HH:ss");
        }
        return momentDate.from(moment());
    };
    if (BPPUtils.storage.get('option.common.extension.timeago', false)) {
        if (BPPUtils.isTemplate('tplIndex')) {
            $('.top5box .tableList tr .columnTop5LastPost .smallFont .light, .boardlistLastPost .containerContentSmall .light, .columnLastPost .containerContentSmall .smallFont.light').each(function () {
                var dateStr = $(this).text().substr(1, $(this).text().length - 2);
                $(this).html('(<abbr title="' + dateStr + '">' + getRelativeTime(dateStr) + '</abbr>)');
            });
        } else if (BPPUtils.isTemplate('tplBoard')) {
            $('.boardlistLastPost .containerContentSmall .light, .columnLastPost .containerContentSmall .smallFont.light').each(function () {
                var dateStr = $(this).text().substr(1, $(this).text().length - 2);
                $(this).html('(<abbr title="' + dateStr + '">' + getRelativeTime(dateStr) + '</abbr>)');
            });
        } else if (BPPUtils.isTemplate('tplThread')) {
            $('.message .messageContentInner .messageHeader .containerContent .smallFont.light').each(function () {
                var dateStr = $(this).text();
                $(this).html('<abbr title="' + dateStr + '">' + getRelativeTime(dateStr) + '</abbr>');
            });
        }
    }

    //Filter: Ankündigungen
    if (BPPUtils.storage.get('option.common.filter.announcement.active', false)) {
        var $globalAnnouncement = $('#globalAnnouncement'),
            text = $globalAnnouncement.text().trim(),
            suppressedGlobalAnnouncement = BPPUtils.storage.get('option.common.filter.announcement.suppressed', []);

        if (suppressedGlobalAnnouncement.indexOf(text) !== -1) {
            $globalAnnouncement.hide();
        } else {
            $globalAnnouncement.addClass('deletable');
            $globalAnnouncement.prepend('<a href="#" style="float:right;" class="close deleteButton"><img src="wcf/icon/closeS.png" alt="" title="Ankündigung ausblenden"></a>');

            $globalAnnouncement.find('.close').click(function (event) {
                event.preventDefault();
                suppressedGlobalAnnouncement.push(text);
                BPPUtils.storage.set('option.common.filter.announcement.suppressed', suppressedGlobalAnnouncement);
                $globalAnnouncement.fadeOut();
            });
        }
    }
});

BPPUtils.load(function () {
    "use strict";

    //Fehlerbehebungen: Header-Fix
    if (BPPUtils.storage.get('option.common.bugfix.headerFix', false)) {
        if ($('head').html().indexOf('href="http://forum.sa-mp.de/wcf/style/style-5.css"') >= 0) {
            $('#main').css('margin-top', '162px');
        }
    }

    //Fehlerbehebungen: Expander
    if (BPPUtils.storage.get('option.common.bugfix.expander', false) && BPPUtils.isTemplate(['tplPostAdd', 'tplThreadAdd', 'tplPmNew', 'tplPostEdit', 'tplThread', 'tplUserProfile'])) {
        if ($('.expander').length !== 0) {
            $('.expander').each(function (i) {
                var element = $(this);
                element.parent('.expanderContainer').find('img').first().attr('onclick', 'openList(\'expander' + i + '\', { save: false })').unbind('click').attr('id', 'expander' + i + 'Image');
                element.parent('.expanderContainer').find('span').first().attr('id', 'expander' + i + 'Teaser');
                element.attr('id', 'expander' + i);
                $('#expander' + i).hide();
            });
        }
    }

    //Fehlerbehebungen: Tabmenu
    if (BPPUtils.storage.get('option.common.bugfix.tabmenu', false)) {
        if ($('head').html().indexOf('href="http://forum.sa-mp.de/wcf/style/style-8.css"') >= 0) {
            BPPUtils.addStyle(null, '.tabMenu li:not(.activeTabMenu) a:hover{color: #FFF;}');
        }
    }

    //Fehlerbehebungen: Bildverkleinerung
    if (BPPUtils.storage.get('option.common.bugfix.imageResize', false) && BPPUtils.isTemplate(['tplPostAdd', 'tplPmNew', 'tplPostEdit', 'tplThread'])) {
        var width = $('.message:not(.quickReply):not(.deleted) .messageBody > div').first().width() - 20;
        $('.resizeImage').each(function () {
            var $img = $(this);
            $img.attr('class', 'bpp_resizeImage');
            $img.removeAttr("width").removeAttr("height");
            $img.css({
                "maxWidth": width,
                "width": "auto",
                "height": "auto"
            });
            if ($img.closest('a').length === 0) {
                $img.wrap('<a href="' + $img.attr('src') + '" class="externalURL"></a>');
            }
        });
    }
});