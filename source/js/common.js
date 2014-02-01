$(function () {
    "use strict";
    GM_log('executing common.js');
    var $pmNotification;

    function showPrivateMessageNotification() {
        $('#pmOutstandingNotifications').hide();
        GM_xmlhttpRequest({
            method: 'GET',
            url: window.location.protocol + '//' + window.location.hostname + '/index.php?page=PMList',
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            onload: function (response) {
                if (response.status === 200) {
                    var $body = $(response.responseText),
                        messages = [];
                    $body.find('.tableList tr > .columnTitle.new').each(function () {
                        var $element = $(this),
                            tr = $element.parent('tr');
                        messages.push({
                            'title': $element.find('a').text(),
                            'text': $element.attr('title'),
                            'author': tr.find('.columnAuthor a').text(),
                            'authorID': BPPUtils.getParameterByName('userID', tr.find('.columnAuthor a').attr('href')),
                            'date': tr.find('.columnDate > p').text().split('\n')[0].trim(),
                            'id': BPPUtils.getParameterByName('pmID', $element.find('a').attr('href'))
                        });
                    });
                    if (messages.length > 0) {
                        //Fuck You Firefox
                        try {
                            $.each(messages, function (index, pm) {
                                GM_notification(pm.text, pm.title + ' von ' + pm.author + ' (' + pm.date + ')', 'http://forum.sa-mp.de/wcf/icon/pmNewL.png', function () {
                                    GM_openInTab(window.location.protocol + '//' + window.location.hostname + '/index.php?page=PMView&pmID=' + pm.id + '#pm' + pm.id);
                                }, {
                                    timeout: 5000
                                });
                            });
                        } catch (e) {
                            $pmNotification.find('.itemList').empty();
                            $.each(messages, function (index, pm) {
                                $pmNotification.find('.itemList').append('<li class="deletable"><p class="itemListTitle"><a href="index.php?page=PMView&pmID=' + pm.id + '#pm' + pm.id + '" title="' + pm.text + '">' + pm.title + '</a> von <a href="index.php?page=User&userID=' + pm.authorID + '">' + pm.author + '</a> (' + pm.date + ')</p></li>');
                            });
                            $pmNotification.show();
                        }
                    } else {
                        $pmNotification.hide();
                    }
                }
            }
        });
    }

    function setupPrivateMessageNotification() {
        showPrivateMessageNotification();
        $pmNotification = $('<div class="bpp_privateMessageNotification"><img src="wcf/icon/infoM.png"/><ul class="itemList"></ul></div>');
        $('body').append($pmNotification);

        setInterval(function () {
            showPrivateMessageNotification();
        }, 1000 * 60);
    }

    function setupTooltips() {
        var $tooltip = $('<div class="bpp_tooltip">Tooltip</div>');
        $('body').append($tooltip);
        $(document).on('mouseenter mouseleave', '[title],[data-title]', function (event) {
            var $elem = $(this),
                title = BPPUtils.escapeHtml($elem.attr('title') || $elem.attr('data-title')),
                offset = $elem.offset();
            if (event.type === 'mouseenter') {
                $elem.attr('data-title', title);
                $elem.removeAttr('title');
                $tooltip.html(title.replace(/\n/g, '<br />')).show();

                $tooltip.css({
                    'top': offset.top - $tooltip[0].offsetHeight - 5,
                    'left': offset.left + ($elem[0].offsetWidth / 2) - ($tooltip[0].offsetWidth / 2)
                });
            } else if (event.type === 'mouseleave') {
                $elem.attr('title', title);
                $elem.removeAttr('data-title');
                $tooltip.html('').hide();
            }
        });
    }

    function fixHeader() {
        if ($('head').html().indexOf('href="http://forum.sa-mp.de/wcf/style/style-5.css"') >= 0) {
            $('#main').css('margin-top', '162px');
        }
    }

    function hideGlobalAnnouncement() {
        $('#globalAnnouncement').hide();
    }

    function ajaxify_subscribeThread() {
        $('.pageOptions > a:first-child').click(function (e) {
            e.preventDefault();
            var $element = $(this),
                url = $element.attr('href'),
                isSubscribed = BPPUtils.getParameterByName('action', url) === 'ThreadSubscribe',
                baseUrl = window.location.protocol + '//' + window.location.hostname + '/';
            if (isSubscribed) {
                $element.find('img').attr('src', 'icon/thankLoadS.gif');
                $element.find('span').text('Wird abonniert...');
                GM_xmlhttpRequest({
                    method: 'GET',
                    url: url,
                    headers : {"Content-Type": "application/x-www-form-urlencoded"},
                    onload: function () {
                        $element.attr('href', baseUrl + 'index.php?action=ThreadUnsubscribe&threadID=' + unsafeWindow.threadID + '&t=' + unsafeWindow.SECURITY_TOKEN);
                        $element.find('img').attr('src', 'icon/unsubscribeS.png');
                        $element.find('span').text('Thema abbestellen');
                    }
                });
            } else {
                $element.find('img').attr('src', 'icon/thankLoadS.gif');
                $element.find('span').text('Wird abbestellt...');
                GM_xmlhttpRequest({
                    method: 'GET',
                    url: url,
                    headers : {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    onload: function () {
                        $element.attr('href', baseUrl + 'index.php?action=ThreadSubscribe&threadID=' + unsafeWindow.threadID + '&t=' + unsafeWindow.SECURITY_TOKEN);
                        $element.find('img').attr('src', 'icon/subscribeS.png');
                        $element.find('span').text('Thema abonnieren');
                    }
                });
            }
        });
    }

    function ajaxify_rateThread() {
        var $threadRatingSpan = $('#threadRatingSpan'),
            $loading = $('<img src="icon/thankLoadS.gif" alt="loading" style="display:none" />'),
            rating = $threadRatingSpan.find('img[src="icon/ratingS.png"]').length,
            threadID = unsafeWindow.threadID,
            pageNo = $('.pageOptions form input[name="pageNo"]').val();
        $threadRatingSpan.find('img').each(function () {
            $(this)[0].onclick = null;
            $(this)[0].onmouseover = null;
        });
        if ($threadRatingSpan.length > 0) {
            $threadRatingSpan[0].onmouseout = null;
        }

        $loading.insertAfter($threadRatingSpan);

        $threadRatingSpan.find('img').css({cursor: 'pointer'}).click(function (event) {
            event.preventDefault();
            rating = parseInt($(this).attr('name'), 10);
            $('#threadRating').val(rating);
            $threadRatingSpan.find('img').attr('src', 'icon/noRatingS.png').slice(0, rating).attr('src', 'icon/ratingS.png');

            $loading.show();
            $threadRatingSpan.hide();
            var baseUrl = window.location.protocol + '//' + window.location.hostname + '/';
            GM_xmlhttpRequest({
                method: "POST",
                synchronous: true,
                url: baseUrl + 'index.php?page=Thread',
                data: 'threadID=' + threadID + '&pageNo=' + pageNo + '&rating=' + rating,
                headers : {"Content-Type": "application/x-www-form-urlencoded"},
                onload: function () {
                    $loading.hide();
                    $threadRatingSpan.show();
                }
            });
        });
        $threadRatingSpan.find('img').mouseover(function () {
            $threadRatingSpan.find('img').attr('src', 'icon/noRatingS.png').slice(0, parseInt($(this).attr('name'), 10)).attr('src', 'icon/ratingS.png');
        }).mouseout(function () {
            $threadRatingSpan.find('img').attr('src', 'icon/noRatingS.png').slice(0, rating).attr('src', 'icon/ratingS.png');
        });
    }

    function ajaxify_subscribeBoard() {
        $('.pageOptions > a:first-child').click(function (event) {
            event.preventDefault();
            var $element = $(this),
                url = $element.attr('href'),
                isSubscribed = BPPUtils.getParameterByName('action', url) === 'BoardSubscribe',
                baseUrl = window.location.protocol + '//' + window.location.hostname + '/';
            if (isSubscribed) {
                $element.find('img').attr('src', 'icon/thankLoadS.gif');
                $element.find('span').text('Wird abonniert...');
                GM_xmlhttpRequest({
                    method: 'GET',
                    url: url,
                    headers : {"Content-Type": "application/x-www-form-urlencoded"},
                    onload: function () {
                        $element.attr('href', baseUrl + 'index.php?action=BoardUnsubscribe&boardID=' + unsafeWindow.boardID + '&t=' + unsafeWindow.SECURITY_TOKEN);
                        $element.find('img').attr('src', 'icon/unsubscribeS.png');
                        $element.find('span').text('Forum abbestellen');
                    }
                });
            } else {
                $element.find('img').attr('src', 'icon/thankLoadS.gif');
                $element.find('span').text('Wird abbestellt...');
                GM_xmlhttpRequest({
                    method: 'GET',
                    url: url,
                    headers : {"Content-Type": "application/x-www-form-urlencoded"},
                    onload: function () {
                        $element.attr('href', baseUrl + 'index.php?action=BoardSubscribe&boardID=' + unsafeWindow.boardID + '&t=' + unsafeWindow.SECURITY_TOKEN);
                        $element.find('img').attr('src', 'icon/subscribeS.png');
                        $element.find('span').text('Forum abonnieren');
                    }
                });
            }
        });
    }

    function ajaxify_markBoardAsRead() {
        $('.pageOptions > a:last-child').click(function (event) {
            event.preventDefault();
            var $element = $(this),
                url = $element.attr('href');
            $element.find('img').attr('src', 'icon/thankLoadS.gif');
            $element.find('span').text('Wird als gelesen markiert...');
            GM_xmlhttpRequest({
                method: 'GET',
                url: url,
                headers : {"Content-Type": "application/x-www-form-urlencoded"},
                onload: function () {
                    $element.find('img').attr('src', 'icon/boardMarkAsReadS.png');
                    $element.find('span').text('Forum wurde als gelesen markiert');
                    $('.topic.new').each(function () {
                        $(this).removeClass('new');
                        $(this).find(' > a').remove();
                    });
                    $('img[src$="threadNewM.png"]').attr('src', 'icon/threadM.png');
                    $('img[src$="threadNewOptionsM.png"]').attr('src', 'icon/threadOptionsM.png');
                }
            });
        });
    }

    function ajaxify_markAllBoardsAsRead() {
        $('.pageOptions > a:last-child').click(function (event) {
            event.preventDefault();
            var $element = $(this),
                url = $element.attr('href');
            $element.find('img').attr('src', 'icon/thankLoadS.gif');
            $element.find('span').text('Alle Foren werden als gelesen markiert...');
            GM_xmlhttpRequest({
                method: 'GET',
                url: url,
                headers : {"Content-Type": "application/x-www-form-urlencoded"},
                onload: function () {
                    $element.find('img').attr('src', 'icon/boardMarkAsReadS.png');
                    $element.find('span').text('Alle Foren wurden als gelesen markiert');
                    $('a[id^="boardLink"]').removeClass('new').find('span').remove();
                    $('.columnTop5TopicTitle > a.new').each(function () {
                        $(this).removeClass('new');
                        $(this).parent('.columnTop5TopicTitle').find(' > img').attr('src', 'icon/threadS.png');
                    });
                }
            });
        });
    }

    function ajaxify_changeStyle() {
        $('#changeStyleMenu > ul > li > a').click(function (event) {
            event.preventDefault();
            var styleURL = $(this).attr('href'),
                styleID = BPPUtils.getParameterByName('styleID', styleURL),
                baseUrl = window.location.protocol + '//' + window.location.hostname + '/',
                styleElement = $('link[href^="' + baseUrl + 'wcf/style/style-"]');
            $('#changeStyleMenu > ul > li.active').removeClass('active');
            $(this).parent('li').addClass('active');

            styleElement[0].disabled = true;
            styleElement.attr('href', baseUrl + 'wcf/style/style-' + styleID + '.css');
            styleElement[0].disabled = false;
            GM_xmlhttpRequest({
                method: 'GET',
                url: styleURL,
                headers : {"Content-Type": "application/x-www-form-urlencoded"}
            });
        });
    }

    function fixTabmenu() {
        if ($('head').html().indexOf('href="http://forum.sa-mp.de/wcf/style/style-8.css"') >= 0) {
            GM_addStyle('.tabMenu li:not(.activeTabMenu) a:hover{color: #FFF;}');
        }
    }

    function fixExpander() {
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

    function fixImageResize() {
        var width = $('.message:not(.quickReply):not(.deleted) .messageBody > div').first().width() - 20;
        $('.resizeImage').each(function () {
            var $img = $(this);
            $img.attr('class', 'bpp_resizeImage').css({
                maxWidth: width
            });
            if ($img.closest('a').length === 0) {
                $img.wrap('<a href="' + $img.attr('src') + '" class="externalURL"></a>');
            }
        });
    }

    $(document).ready(function () {
        GM_addStyle(Template.css.common);
        if (GM_getValue('option_common_extension_privateMessageNotification', false)) {
            setupPrivateMessageNotification();
        }
        if (GM_getValue('option_common_extension_tooltip', false)) {
            setupTooltips();
        }
        if (GM_getValue('option_common_bugfix_headerFix', false)) {
            fixHeader();
        }
        if (GM_getValue('option_common_bugfix_tabmenu', false)) {
            fixTabmenu();
        }
        if (GM_getValue('option_common_bugfix_expander', false)) {
            if (BPPUtils.isTemplate(['tplPostAdd', 'tplThreadAdd', 'tplPmNew', 'tplPostEdit', 'tplThread', 'tplUserProfile'])) {
                fixExpander();
            }
        }
        if (GM_getValue('option_common_bugfix_imageResize', false)) {
            if (BPPUtils.isTemplate(['tplPostAdd', 'tplPmNew', 'tplPostEdit', 'tplThread'])) {
                fixImageResize();
            }
        }
        if (GM_getValue('option_common_filter_announce', false)) {
            hideGlobalAnnouncement();
        }
        if (GM_getValue('option_common_extension_ajaxify', false)) {
            if (BPPUtils.isTemplate('tplThread')) {
                ajaxify_subscribeThread();
                ajaxify_rateThread();
            } else if (BPPUtils.isTemplate('tplBoard')) {
                ajaxify_subscribeBoard();
                ajaxify_markBoardAsRead();
            } else if (BPPUtils.isTemplate('tplIndex')) {
                ajaxify_markAllBoardsAsRead();
            }
            ajaxify_changeStyle();
        }
    });
});