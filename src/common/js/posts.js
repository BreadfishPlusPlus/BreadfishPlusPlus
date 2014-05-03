// ==UserScript==
// @name        Posts
// @namespace   BreadfishPlusPlus
// @include     http://forum.sa-mp.de/*
// @exclude     http://forum.sa-mp.de/acp/*
// @all-frames  false
// @run-at      document-start
// ==/UserScript==
/*global $, BPPUtils, hljs*/
/*jslint vars: true, unparam: true*/

BPPUtils.load(function () {
    "use strict";

    BPPUtils.addStyle('posts');

    //Erweiterungen: Kurz-URL
    if (BPPUtils.storage.get('option_posts_extension_shorturl', false) && BPPUtils.isTemplate('tplThread')) {
        $('.message:not(.quickReply):not(.deleted)').each(function () {
            var $elem = $(this),
                id = $elem.attr('id').substr(7);
            $elem.find('.messageFooterRight .smallButtons > ul').append(BPPUtils.template('shortUrlButton', {
                "url": 'http://sa-mp.de/B++/p' + id + '-/'
            }));
        });
        $('.bpp_shorturl').click(function (e) {
            e.preventDefault();
            $(this).find('span').hide();
            $(this).find('input').show().select();
        });
        $('.bpp_shorturl_input').blur(function () {
            $(this).siblings('span').show();
            $(this).hide();
        });
    }

    //Erweiterungen: Youtube Vorschau
    if (BPPUtils.storage.get('option_posts_extension_youtubePreview', false) && BPPUtils.isTemplate('tplThread') && !BPPUtils.storage.get('option_posts_filter_youtube', false)) {
        var mNames = ['Jan', 'Feb', 'Mrz', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
            width = $('.message:not(.quickReply):not(.deleted) .messageBody > div').first().width();
        $('.message:not(.quickReply):not(.deleted) .messageContentInner object').each(function () {
            var $object = $(this),
                videoId = $object.attr('data').substr(-17, 11);

            $object.attr('id', 'object-' + videoId);
            $object.hide();

            $.getJSON('https://gdata.youtube.com/feeds/api/videos/' + videoId + '?v=2&alt=json', function (data) {
                var date = new Date(data.entry.media$group.yt$uploaded.$t),
                    $preview = $(BPPUtils.template('youtubePreview', {
                        'thumbnail': data.entry.media$group.media$thumbnail[0].url,
                        'title': data.entry.title.$t,
                        'author': data.entry.author[0].name.$t,
                        'day': date.getDate(),
                        'month': mNames[date.getMonth()],
                        'year': date.getFullYear(),
                        'hours': date.getHours(),
                        'minutes': date.getMinutes(),
                        'length': BPPUtils.formatTime(data.entry.media$group.yt$duration.seconds),
                        'clicks': data.entry.yt$statistics.viewCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
                        'videoId': videoId
                    }));
                $object.replaceWith($preview);
                $preview.find('.bpp_youtube_preview_link').click(function (e) {
                    e.preventDefault();
                    $preview.replaceWith('<iframe width="' + width + '" height="' + (width / 16 * 9) + '" src="//www.youtube-nocookie.com/embed/' + videoId + '?rel=0" frameborder="0" allowfullscreen></iframe>');
                });
            }).fail(function (jqXHR, stauts, errorThrown) {
                $object.show();
                BPPUtils.log.error('Konnte keine Daten von gdata.youtube.com abrufen.', stauts, errorThrown);
            });
        });
    }

    //Erweiterungen: Danksagungen anzeigen
    if (BPPUtils.storage.get('option_posts_extension_thanks', false) && BPPUtils.isTemplate('tplThread')) {
        var thanksCache = BPPUtils.storage.get('thanks_cache', {});
        var users = [], setSidebarThanks, getThanks;

        setSidebarThanks = function (userID, thanks) {
            var $bpp_thanks = $('.bpp_thanks[data-userID="' + userID + '"]');
            if (thanks === -2) {
                $bpp_thanks.parent('p').hide();
            } else if (thanks === -1) {
                $bpp_thanks.html('<img src="icon/thankS.png" alt="" /> <img src="icon/thankLoadS.gif" alt="" />');
            } else {
                $bpp_thanks.html('<img src="icon/thankS.png" alt="" /> ' + thanks);
            }
        };

        getThanks = function (userID, callback) {
            BPPUtils.ajax({
                type: 'GET',
                url: 'http://forum.sa-mp.de/index.php?page=UserThankList&userID=' + userID,
            }, function (response, status, jqXHR) {
                if (status === 200) {
                    var $data = $(response), arr, pages, thanks;
                    if ($data.find('.error').length === 0) {
                        arr = $data.find('.pageNavigation ul li:not(.skip):not(.children)').toArray();
                        pages = parseInt($(arr[arr.length - 1]).text(), 10);
                        thanks = 0;
                        if (isNaN(pages)) {
                            thanks = parseInt($data.find('.tableList tbody tr').length, 10);
                            callback(thanks);
                        } else {
                            BPPUtils.ajax({
                                type: 'GET',
                                url: 'http://forum.sa-mp.de/index.php?page=UserThankList&userID=' + userID + '&pageNoGot=' + pages,
                            }, function (response2, status2, jqXHR2) {
                                if (status === 200) {
                                    thanks = parseInt($(response2).find('.tableList tbody tr').length, 10);
                                    thanks += (pages - 1) * 10;
                                    thanksCache[userID] = thanks;
                                    BPPUtils.storage.set('thanks_cache', thanksCache);
                                    callback(thanks);
                                } else {
                                    callback(-2);
                                    BPPUtils.log.error('Konnte keine Danksagungen von #' + userID + ' abrufen.', jqXHR2.status, jqXHR2.statusText);
                                }
                            });
                        }
                    }
                } else {
                    thanksCache[userID] = -2;
                    BPPUtils.storage.set('thanks_cache', thanksCache);
                    callback(-2);
                    if (status === 403) {
                        BPPUtils.log.debug('Danksagungen von #' + userID + ' sind nicht öffentlich zugänglich.');
                    } else {
                        BPPUtils.log.error('Konnte keine Danksagungen von #' + userID + ' abrufen.', status, jqXHR.statusText);
                    }
                }
            });
        };

        $('.message:not(.quickReply):not(.deleted)').each(function () {
            var $elem = $(this),
                userID = parseInt(BPPUtils.getParameterByName('userID', $elem.find('.messageAuthor .userName a').attr('href')), 10);
            if (users.indexOf(userID) === -1 && !isNaN(userID)) {
                users.push(userID);
            }
            $elem.find('.userCredits').append('<p><a class="bpp_thanks" data-userID="' + userID + '" href="index.php?page=UserThankList&userID=' + userID + '"><img src="icon/thankS.png" alt="" /> <img src="icon/thankLoadS.gif" alt="" /></a></p>');
        });
        $.each(users, function (index, userID) {
            var cachedThanks = thanksCache[userID] || -1;
            if (cachedThanks !== -1) {
                setSidebarThanks(userID, cachedThanks);
            }
            getThanks(userID, function (thanks) {
                setSidebarThanks(userID, thanks);
            });
        });
    }

    //Erweiterungen: Höhenbegrenzung für Signaturen
    if (BPPUtils.storage.get('option_posts_extension_signatureHeight', false) && BPPUtils.isTemplate('tplThread')) {
        $('.signature').css('max-height', 'none');
    }

    //Erweiterungen: Bilderzoom
    if (BPPUtils.storage.get('option_posts_extension_imageResize', false) && BPPUtils.isTemplate('tplThread')) {
        var dragTargetData, getDragSize, resizeImage;
        dragTargetData = {
            imageWidth: 100,
            diagonal: 0,
            dragging: false
        };
        getDragSize = function (event) {
            var rc = event.target.getBoundingClientRect(),
                dragSize = Math.pow(Math.pow(event.clientX - rc.left, 2) + Math.pow(event.clientY - rc.top, 2), 0.5);
            return Math.round(dragSize);
        };
        resizeImage = function (image, newWidth) {
            var currWidth = $(image).width(), thisPH;
            if (newWidth !== currWidth) {
                dragTargetData.hasChangedWidth = true;

                image.style.width = newWidth + 'px';
                image.style.maxWidth = newWidth + 'px';
                image.style.maxHeight = '';
                image.style.height = 'auto';

                thisPH = $(image).data('imagePlaceholder');
                $(thisPH).width($(image).width() + 'px');
                $(thisPH).height($(image).height() + 'px');
            }
        };
        $(document).on('mousedown mousemove mouseup mouseout', '.resizeImage,.bpp_resizeImage', function (event) {
            if (event.type === 'mousedown') {
                if (!event.target.minWidth) {
                    event.target.minWidth = Math.max(1, Math.min($(event.target).width(), 100));
                }
                dragTargetData.imageWidth = $(event.target).width();
                dragTargetData.diagonal = getDragSize(event);
                dragTargetData.dragging = false;
                dragTargetData.hasChangedWidth = false;
                event.preventDefault();
            } else if (event.type === 'mouseup' || event.type === 'mousemove') {
                if (dragTargetData.diagonal) {
                    var newDiagonal = getDragSize(event),
                        oldDiagonal = dragTargetData.diagonal,
                        imageWidth = dragTargetData.imageWidth,
                        maxWidth = Math.max(event.target.minWidth, newDiagonal / oldDiagonal * imageWidth);

                    if (Math.abs(newDiagonal - oldDiagonal) > 5 && event.target.tagName === "VIDEO") {
                        event.target.preventPlayPause = true;
                    }

                    resizeImage(event.target, maxWidth);
                    dragTargetData.dragging = true;
                }

                if (event.type === 'mouseup') {
                    dragTargetData.diagonal = 0;
                }
            } else if (event.type === 'mouseout') {
                dragTargetData.diagonal = 0;
            }
        });
        $('.resizeImage,.bpp_resizeImage').parent('.externalURL').click(function (event) {
            if (dragTargetData.hasChangedWidth) {
                event.preventDefault();
            }
        });
    }

    //Erweiterungen: Deaktivierung von externen Bildern
    if (BPPUtils.storage.get('option_posts_extension_removeExternalImages', false) && BPPUtils.isTemplate('tplThread')) {
        $('.externalURL:has(.resizeImage), .externalURL:has(.bpp_resizeImage)').each(function () {
            var url = $(this).find('.resizeImage, .bpp_resizeImage').attr('src');
            $(this).html(url);
        });
        $('.resizeImage, .bpp_resizeImage').each(function () {
            var url = $(this).attr('src');
            $(this).replaceWith('<a href="' + url + '" class="externalURL">' + url + '</a>');
        });
    }

    //Erweiterungen: Syntaxhighlightning
    if (BPPUtils.storage.get('option_posts_extension_syntaxhighlightning', false) && BPPUtils.isTemplate('tplThread')) {
        BPPUtils.addStyle('highlight');
        $('.codeBox').each(function () {
            var $elem = $(this),
                code = $elem.find('.codeLines pre').text(),
                title = $elem.find('.codeLines h3').text();
            if (title === 'C/C++-Quelltext' || title === 'PAWN Quelltext') {
                $elem.find('.codeLines pre').html(hljs.highlight('cpp', code).value);
            } else if (title === 'Cascading Style Sheet') {
                $elem.find('.codeLines pre').html(hljs.highlight('css', code).value);
            } else if (title === 'HTML' || title === 'XML' || title === 'Template-Quelltext') {
                $elem.find('.codeLines pre').html(hljs.highlight('xml', code).value);
            } else if (title === 'Java-Quelltext') {
                $elem.find('.codeLines pre').html(hljs.highlight('java', code).value);
            } else if (title === 'Javascript-Quelltext') {
                $elem.find('.codeLines pre').html(hljs.highlight('javascript', code).value);
            } else if (title === 'MySQL-Abfrage(n)') {
                $elem.find('.codeLines pre').html(hljs.highlight('sql', code).value);
            } else if (title === 'PHP-Quelltext') {
                $elem.find('.codeLines pre').html(hljs.highlight('php', code).value);
            } else {
                $elem.find('.codeLines pre').html(hljs.highlightAuto(code).value);
            }
        });
    }

    //Erweiterungen: Lazyload
    if (BPPUtils.storage.get('option_posts_extension_lazyload', false) && BPPUtils.isTemplate('tplThread')) {
        $('.resizeImage, .bpp_resizeImage').each(function () {
            $(this).attr('data-original', $(this).attr('src')).removeAttr('src');
        }).lazyload({
            effect : 'fadeIn',
            skip_invisible : false
        });
    }

    //Filter: Youtube Videos
    if (BPPUtils.storage.get('option_posts_filter_youtube', false) && BPPUtils.isTemplate('tplThread')) {
        $('.message:not(.quickReply):not(.deleted) .messageContentInner object').each(function () {
            var $object = $(this),
                videoId = $object.attr('data').substr(-17, 11);
            $object.replaceWith('<a href="http://www.youtube.com/watch?v=' + videoId + '" class="externalURL">http://www.youtube.com/watch?v=' + videoId + '</a>');
        });
    }

    //Filter: Gelöschte Beiträge
    if (BPPUtils.storage.get('option_posts_filter_deleted', false) && BPPUtils.isTemplate('tplThread')) {
        $('.messageMinimized:not(.quickReply) > .messageInner > img[src="icon/postTrashM.png"]').closest('.messageMinimized').remove();
    }

    //Filter: Bedankomat
    if (BPPUtils.storage.get('option_posts_filter_thanko', false) && BPPUtils.isTemplate('tplThread')) {
        $('li.postThankButton, .thankStats').remove();
    }

    //Filter: Ignorierte Benutzer
    if (BPPUtils.storage.get('option_posts_filter_ignored', false) && BPPUtils.isTemplate('tplThread')) {
        $('.messageMinimized:not(.quickReply) > .messageInner > img[src="wcf/icon/warningM.png"]').closest('.messageMinimized').remove();
    }

    //Filter: Hilfreichste Antwort
    if (BPPUtils.storage.get('option_posts_filter_bestans', false) && BPPUtils.isTemplate('tplThread')) {
        BPPUtils.addStyle(null, '#helpfulAnswer{display:none!important;}.helpfulAnswerPost .messageInner .messageSidebar{background-image: none!important;}');
    }

    //Filter: Beitragscounter
    if (BPPUtils.storage.get('option_posts_filter_postcount', false) && BPPUtils.isTemplate('tplThread')) {
        $('.userCredits p > a:contains("Beiträge")').parent('p').remove();
        $('.userCredits').each(function () {
            if ($(this).children().length === 0) {
                $(this).remove();
            }
        });
    }

    //Filter: Benutzertitel
    if (BPPUtils.storage.get('option_posts_filter_usertitle', false) && BPPUtils.isTemplate('tplThread')) {
        $('.userTitle').remove();
    }

    //Filter: Benutzerrang
    if (BPPUtils.storage.get('option_posts_filter_userrank', false) && BPPUtils.isTemplate('tplThread')) {
        $('.messageAuthor').each(function () {
            $(this).find('.userRank').first().remove();
        });
    }

    //Filter: Zusätzlicher Benutzerrang
    if (BPPUtils.storage.get('option_posts_filter_additionalUserrank', false) && BPPUtils.isTemplate('tplThread')) {
        $('.messageAuthor').each(function () {
            if ($(this).find('.userRank').length > 1) {
                $(this).find('.userRank').last().remove();
            }
        });
    }

    //Filter: Registrierungsdatum
    if (BPPUtils.storage.get('option_posts_filter_regdate', false) && BPPUtils.isTemplate('tplThread')) {
        $('.userCredits p:contains("Registrierungsdatum: ")').remove();
        $('.userCredits').each(function () {
            if ($(this).children().length === 0) {
                $(this).remove();
            }
        });
    }

    //Filter: Geschlecht
    if (BPPUtils.storage.get('option_posts_filter_gender', false) && BPPUtils.isTemplate('tplThread')) {
        $('.userSymbols img[src="wcf/icon/genderMaleS.png"], .userSymbols img[src="wcf/icon/genderFemaleS.png"]').parent('li').remove();
        $('.userCredits').each(function () {
            if ($(this).children().length === 0) {
                $(this).remove();
            }
        });
    }

    //Filter: XBL Gamertag
    if (BPPUtils.storage.get('option_posts_filter_xblGamertag', false) && BPPUtils.isTemplate('tplThread')) {
        $('.userCredits p:contains("XBL Gamertag: ")').remove();
        $('.userCredits').each(function () {
            if ($(this).children().length === 0) {
                $(this).remove();
            }
        });
    }

    //Filter: PSN ID
    if (BPPUtils.storage.get('option_posts_filter_psnid', false) && BPPUtils.isTemplate('tplThread')) {
        $('.userCredits p:contains("PSN ID: ")').remove();
        $('.userCredits').each(function () {
            if ($(this).children().length === 0) {
                $(this).remove();
            }
        });
    }

    //Filter: Steam
    if (BPPUtils.storage.get('option_posts_filter_steam', false) && BPPUtils.isTemplate('tplThread')) {
        $('.userCredits p:contains("Steam: ")').remove();
        $('.userCredits').each(function () {
            if ($(this).children().length === 0) {
                $(this).remove();
            }
        });
    }

    //Filter: Origin
    if (BPPUtils.storage.get('option_posts_filter_origin', false) && BPPUtils.isTemplate('tplThread')) {
        $('.userCredits p:contains("Origin: ")').remove();
        $('.userCredits').each(function () {
            if ($(this).children().length === 0) {
                $(this).remove();
            }
        });
    }

    //Filter: Website
    if (BPPUtils.storage.get('option_posts_filter_website', false) && BPPUtils.isTemplate('tplThread')) {
        $('.userMessenger img[src="wcf/icon/websiteS.png"]').closest('li').remove();
        $('.userCredits').each(function () {
            if ($(this).children().length === 0) {
                $(this).remove();
            }
        });
    }

    //Filter: ICQ
    if (BPPUtils.storage.get('option_posts_filter_icq', false) && BPPUtils.isTemplate('tplThread')) {
        $('.userMessenger img[src="wcf/icon/icqS.png"]').closest('li').remove();
        $('.userCredits').each(function () {
            if ($(this).children().length === 0) {
                $(this).remove();
            }
        });
    }

    //Filter: Windows Live
    if (BPPUtils.storage.get('option_posts_filter_msn', false) && BPPUtils.isTemplate('tplThread')) {
        $('.userMessenger img[src="wcf/icon/msnS.png"]').closest('li').remove();
        $('.userCredits').each(function () {
            if ($(this).children().length === 0) {
                $(this).remove();
            }
        });
    }

    //Filter: Skype
    if (BPPUtils.storage.get('option_posts_filter_skype', false) && BPPUtils.isTemplate('tplThread')) {
        $('.userMessenger img[src="wcf/icon/skypeS.png"]').closest('li').remove();
        $('.userCredits').each(function () {
            if ($(this).children().length === 0) {
                $(this).remove();
            }
        });
    }
});