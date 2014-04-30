// ==UserScript==
// @name        Common
// @namespace   BreadfishPlusPlus
// @include     http://forum.sa-mp.de/*
// @exclude     http://forum.sa-mp.de/acp/*
// @all-frames  false
// @run-at      document-start
// ==/UserScript==
/*global kango, $, BPPUtils, InstantClick*/

BPPUtils.load(function () {
    "use strict";

    BPPUtils.addStyle('common');

    //Erweiterungen: Alternative PN Benachrichtigung
    kango.invokeAsync('kango.storage.getItem', 'option_common_extension_privateMessageNotification', function (enabled) {
        if (enabled) {
            var $pmNotification = $(), showPrivateMessageNotification;

            showPrivateMessageNotification = function () {
                kango.xhr.send({
                    method: 'GET',
                    url: 'http://forum.sa-mp.de/index.php',
                    async: true,
                    params: {
                        page: 'PMList'
                    },
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    contentType: 'text'
                }, function (data) {
                    if (data.status === 200 && data.response !== null) {
                        var messages = [];
                        $(data.response).find('.tableList tr > .columnTitle.new').each(function () {
                            var $element = $(this),
                                $tr = $element.parent('tr');
                            messages.push({
                                'title': $element.find('a').text(),
                                'text': $element.attr('title'),
                                'author': $tr.find('.columnAuthor a').text(),
                                'authorID': BPPUtils.getParameterByName('userID', $tr.find('.columnAuthor a').attr('href')),
                                'date': $tr.find('.columnDate > p').text().split('\n')[0].trim(),
                                'id': BPPUtils.getParameterByName('pmID', $element.find('a').attr('href'))
                            });
                        });
                        $pmNotification.remove();
                        if (messages.length > 0) {
                            $pmNotification = $(BPPUtils.template('privateMessageNotification', {
                                'messages': messages
                            }));
                            $pmNotification.show();
                            $('body').append($pmNotification);
                        }
                    } else {
                        kango.console.log('[B++][ERROR] Konnte keine Privaten Nachrichten abrufen. (' + data.status + ')');
                    }
                });
            };

            $('#pmOutstandingNotifications').hide();

            showPrivateMessageNotification();

            setInterval(function () {
                showPrivateMessageNotification();
            }, 60 * 5 * 1000);
        }
    });

    //Erweiterungen: Asynchrone Datenübertragung
    kango.invokeAsync('kango.storage.getItem', 'option_common_extension_ajaxify', function (enabled) {
        if (enabled) {
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
                        kango.xhr.send({
                            method: 'GET',
                            url: url,
                            async: true,
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            }
                        }, function (data) {
                            if (data.status === 200 && data.response !== null) {
                                $element.attr('href', 'http://forum.sa-mp.de/index.php?action=ThreadUnsubscribe&threadID=' + threadID + '&t=' + SECURITY_TOKEN);
                                $element.find('img').attr('src', 'icon/unsubscribeS.png');
                                $element.find('span').text('Thema abbestellen');
                            } else {
                                kango.console.log('[B++][ERROR] Konnte Thema nicht abbonieren. (' + data.status + ')');
                            }
                        });
                    } else {
                        $element.find('img').attr('src', 'icon/thankLoadS.gif');
                        $element.find('span').text('Wird abbestellt...');
                        kango.xhr.send({
                            method: 'GET',
                            url: url,
                            async: true,
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            }
                        }, function (data) {
                            if (data.status === 200 && data.response !== null) {
                                $element.attr('href', 'http://forum.sa-mp.de/index.php?action=ThreadSubscribe&threadID=' + threadID + '&t=' + SECURITY_TOKEN);
                                $element.find('img').attr('src', 'icon/subscribeS.png');
                                $element.find('span').text('Thema abonnieren');
                            } else {
                                kango.console.log('[B++][ERROR] Konnte Thema nicht abbestellen. (' + data.status + ')');
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
                    kango.xhr.send({
                        method: 'POST',
                        url: 'http://forum.sa-mp.de/index.php?page=Thread',
                        async: false,
                        params: {
                            threadID: threadID,
                            pageNo: pageNo,
                            rating: rating
                        },
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        }
                    }, function (data) {
                        if (data.status === 200 && data.response !== null) {
                            $loading.hide();
                            $threadRatingSpan.show();
                        } else {
                            kango.console.log('[B++][ERROR] Konnte Thema nicht bewerten. (' + data.status + ')');
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
                        kango.xhr.send({
                            method: 'GET',
                            url: url,
                            async: true,
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            }
                        }, function (data) {
                            if (data.status === 200 && data.response !== null) {
                                $element.attr('href', 'http://forum.sa-mp.de/index.php?action=BoardUnsubscribe&boardID=' + boardID + '&t=' + SECURITY_TOKEN);
                                $element.find('img').attr('src', 'icon/unsubscribeS.png');
                                $element.find('span').text('Forum abbestellen');
                            } else {
                                kango.console.log('[B++][ERROR] Konnte Forum nicht abbonieren. (' + data.status + ')');
                            }
                        });
                    } else {
                        $element.find('img').attr('src', 'icon/thankLoadS.gif');
                        $element.find('span').text('Wird abbestellt...');
                        kango.xhr.send({
                            method: 'GET',
                            url: url,
                            async: true,
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            }
                        }, function (data) {
                            if (data.status === 200 && data.response !== null) {
                                $element.attr('href', 'http://forum.sa-mp.de/index.php?action=BoardSubscribe&boardID=' + boardID + '&t=' + SECURITY_TOKEN);
                                $element.find('img').attr('src', 'icon/subscribeS.png');
                                $element.find('span').text('Forum abonnieren');
                            } else {
                                kango.console.log('[B++][ERROR] Konnte Forum nicht abbestellen. (' + data.status + ')');
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
                    kango.xhr.send({
                        method: 'GET',
                        url: url,
                        async: true,
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        }
                    }, function (data) {
                        if (data.status === 200 && data.response !== null) {
                            $element.find('img').attr('src', 'icon/boardMarkAsReadS.png');
                            $element.find('span').text('Forum wurde als gelesen markiert');
                            $('.topic.new').each(function () {
                                $(this).removeClass('new');
                                $(this).find(' > a').remove();
                            });
                            $('img[src$="threadNewM.png"]').attr('src', 'icon/threadM.png');
                            $('img[src$="threadNewOptionsM.png"]').attr('src', 'icon/threadOptionsM.png');
                        } else {
                            kango.console.log('[B++][ERROR] Konnte Forum nicht als gelesen markieren. (' + data.status + ')');
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
                    kango.xhr.send({
                        method: 'GET',
                        url: url,
                        async: true,
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        }
                    }, function (data) {
                        if (data.status === 200 && data.response !== null) {
                            $element.find('img').attr('src', 'icon/boardMarkAsReadS.png');
                            $element.find('span').text('Alle Foren wurden als gelesen markiert');
                            $('a[id^="boardLink"]').removeClass('new').find('span').remove();
                            $('.columnTop5TopicTitle > a.new').each(function () {
                                $(this).removeClass('new');
                                $(this).parent('.columnTop5TopicTitle').find(' > img').attr('src', 'icon/threadS.png');
                            });
                        } else {
                            kango.console.log('[B++][ERROR] Konnte nicht alle Foren als gelesen markieren. (' + data.status + ')');
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
                kango.xhr.send({
                    method: 'GET',
                    url: styleURL,
                    async: true,
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }, function (data) {
                    if (data.status !== 200 || data.response === null) {
                        kango.console.log('[B++][ERROR] Konnte Style nicht wechseln. (' + data.status + ')');
                    }
                });
            });
        }
    });

    //Erweiterungen: Alternative Tooltips
    kango.invokeAsync('kango.storage.getItem', 'option_common_extension_tooltip', function (enabled) {
        if (enabled) {
            BPPUtils.addStyle('tooltip');
            $('body').tooltip({
                html: false,
                placement: 'auto',
                container: 'body',
                selector: '[title]'
            });
        }
    });

    //Erweiterungen: Meldungsgründe
    kango.invokeAsync('kango.storage.getItem', 'option_common_extension_reportReasons', function (enabled) {
        if (enabled && BPPUtils.isTemplate('tplPostReport')) {
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
    });

    //Fehlerbehebungen: Header-Fix
    kango.invokeAsync('kango.storage.getItem', 'option_common_bugfix_headerFix', function (enabled) {
        if (enabled) {
            if ($('head').html().indexOf('href="http://forum.sa-mp.de/wcf/style/style-5.css"') >= 0) {
                $('#main').css('margin-top', '162px');
            }
        }
    });

    //Fehlerbehebungen: Expander
    kango.invokeAsync('kango.storage.getItem', 'option_common_bugfix_expander', function (enabled) {
        if (enabled && BPPUtils.isTemplate(['tplPostAdd', 'tplThreadAdd', 'tplPmNew', 'tplPostEdit', 'tplThread', 'tplUserProfile'])) {
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
    });

    //Fehlerbehebungen: Tabmenu
    kango.invokeAsync('kango.storage.getItem', 'option_common_bugfix_tabmenu', function (enabled) {
        if (enabled) {
            if ($('head').html().indexOf('href="http://forum.sa-mp.de/wcf/style/style-8.css"') >= 0) {
                BPPUtils.addStyle(null, '.tabMenu li:not(.activeTabMenu) a:hover{color: #FFF;}');
            }
        }
    });

    //Fehlerbehebungen: Bildverkleinerung
    kango.invokeAsync('kango.storage.getItem', 'option_common_bugfix_imageResize', function (enabled) {
        if (enabled && BPPUtils.isTemplate(['tplPostAdd', 'tplPmNew', 'tplPostEdit', 'tplThread'])) {
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

    //Filter: Ankündigungen
    kango.invokeAsync('kango.storage.getItem', 'option_common_filter_announce', function (enabled) {
        if (enabled) {
            $('#globalAnnouncement').hide();
        }
    });
});