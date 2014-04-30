// ==UserScript==
// @name        Posts
// @namespace   BreadfishPlusPlus
// @include     http://forum.sa-mp.de/*
// @exclude     http://forum.sa-mp.de/acp/*
// @all-frames  false
// @run-at      document-start
// ==/UserScript==
/*global kango, $, BPPUtils, hljs*/

BPPUtils.load(function () {
    "use strict";

    BPPUtils.addStyle('posts');

    //Erweiterungen: Kurz-URL
    kango.invokeAsync('kango.storage.getItem', 'option_posts_extension_shorturl', function (enabled) {
        if (enabled && BPPUtils.isTemplate('tplThread')) {
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
    });

    //Erweiterungen: Youtube Vorschau
    kango.invokeAsync('kango.storage.getItem', 'option_posts_extension_youtubePreview', function (enabled) {
        if (enabled && BPPUtils.isTemplate('tplThread')) {
            kango.invokeAsync('kango.storage.getItem', 'option_posts_filter_youtube', function (enabled) {
                if (!enabled) {
                    var mNames = ['Jan', 'Feb', 'Mrz', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
                        width = $('.message:not(.quickReply):not(.deleted) .messageBody > div').first().width();
                    $('.message:not(.quickReply):not(.deleted) .messageContentInner object').each(function () {
                        var $object = $(this),
                            videoId = $object.attr('data').substr(-17, 11);

                        $object.attr('id', 'object-' + videoId);
                        $object.hide();

                        kango.xhr.send({
                            method: 'GET',
                            url: 'http://gdata.youtube.com/feeds/api/videos/' + videoId + '?v=2&alt=json',
                            async: true,
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded"
                            },
                            contentType: 'json'
                        }, function (data) {
                            if (data.status === 200 && data.response !== null) {
                                var date = new Date(data.response.entry.media$group.yt$uploaded.$t),
                                    $preview = $(BPPUtils.template('youtubePreview', {
                                        'thumbnail': data.response.entry.media$group.media$thumbnail[0].url,
                                        'title': data.response.entry.title.$t,
                                        'author': data.response.entry.author[0].name.$t,
                                        'day': date.getDate(),
                                        'month': mNames[date.getMonth()],
                                        'year': date.getFullYear(),
                                        'hours': date.getHours(),
                                        'minutes': date.getMinutes(),
                                        'length': BPPUtils.formatTime(data.response.entry.media$group.yt$duration.seconds),
                                        'clicks': data.response.entry.yt$statistics.viewCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
                                        'videoId': videoId
                                    }));
                                $object.replaceWith($preview);
                                $preview.find('.bpp_youtube_preview_link').click(function (e) {
                                    e.preventDefault();
                                    $preview.replaceWith('<iframe width="' + width + '" height="' + (width / 16 * 9) + '" src="//www.youtube-nocookie.com/embed/' + videoId + '?rel=0" frameborder="0" allowfullscreen></iframe>');
                                });
                            } else {
                                $object.show();
                                kango.console.log('[B++][ERROR] Konnte keine Daten von gdata.youtube.com abrufen. (' + data.status + ')');
                            }
                        });
                    });
                }
            });
        }
    });

    //Erweiterungen: Danksagungen anzeigen
    kango.invokeAsync('kango.storage.getItem', 'option_posts_extension_thanks', function (enabled) {
        if (enabled && BPPUtils.isTemplate('tplThread')) {
            kango.invokeAsync('kango.storage.getItem', 'thanks_cache', function (thanksCache) {
                thanksCache = thanksCache || {};
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
                    kango.xhr.send({
                        method: 'GET',
                        url: 'http://forum.sa-mp.de/index.php?page=UserThankList&userID=' + userID,
                        async: true,
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        contentType: 'text'
                    }, function (data) {
                        if (data.status === 200 && data.response !== null) {
                            var $data = $(data.response), arr, pages, thanks;
                            if ($data.find('.error').length === 0) {
                                arr = $data.find('.pageNavigation ul li:not(.skip):not(.children)').toArray();
                                pages = parseInt($(arr[arr.length - 1]).text(), 10);
                                thanks = 0;
                                if (isNaN(pages)) {
                                    thanks = parseInt($data.find('.tableList tbody tr').length, 10);
                                    callback(thanks);
                                } else {
                                    kango.xhr.send({
                                        method: 'GET',
                                        url: 'http://forum.sa-mp.de/index.php?page=UserThankList&userID=' + userID + '&pageNoGot=' + pages,
                                        async: true,
                                        headers: {
                                            "Content-Type": "application/x-www-form-urlencoded"
                                        },
                                        contentType: 'text'
                                    }, function (data2) {
                                        if (data2.status === 200 && data2.response !== null) {
                                            thanks = parseInt($(data2.response).find('.tableList tbody tr').length, 10);
                                            thanks += (pages - 1) * 10;
                                            thanksCache[userID] = thanks;
                                            kango.invokeAsync('kango.storage.setItem', 'thanks_cache', thanksCache);
                                            callback(thanks);
                                        } else {
                                            callback(-2);
                                            kango.console.log('[B++][ERROR] Konnte keine Danksagungen von #' + userID + ' abrufen. (' + data.status + ')');
                                        }
                                    });
                                }
                            }
                        } else {
                            thanksCache[userID] = -2;
                            kango.invokeAsync('kango.storage.setItem', 'thanks_cache', thanksCache);
                            callback(-2);
                            if (data.status !== 403) {
                                kango.console.log('[B++][ERROR] Konnte keine Danksagungen von #' + userID + ' abrufen. (' + data.status + ')');
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
            });
        }
    });

    //Erweiterungen: Höhenbegrenzung für Signaturen
    kango.invokeAsync('kango.storage.getItem', 'option_posts_extension_signatureHeight', function (enabled) {
        if (enabled && BPPUtils.isTemplate('tplThread')) {
            $('.signature').css('max-height', 'none');
        }
    });

    //Erweiterungen: Bilderzoom
    kango.invokeAsync('kango.storage.getItem', 'option_posts_extension_imageResize', function (enabled) {
        if (enabled && BPPUtils.isTemplate('tplThread')) {
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
    });

    //Erweiterungen: Deaktivierung von externen Bildern
    kango.invokeAsync('kango.storage.getItem', 'option_posts_extension_removeExternalImages', function (enabled) {
        if (enabled && BPPUtils.isTemplate('tplThread')) {
            $('.externalURL:has(.resizeImage), .externalURL:has(.bpp_resizeImage)').each(function () {
                var url = $(this).find('.resizeImage, .bpp_resizeImage').attr('src');
                $(this).html(url);
            });
            $('.resizeImage, .bpp_resizeImage').each(function () {
                var url = $(this).attr('src');
                $(this).replaceWith('<a href="' + url + '" class="externalURL">' + url + '</a>');
            });
        }
    });

    //Erweiterungen: Syntaxhighlightning
    kango.invokeAsync('kango.storage.getItem', 'option_posts_extension_syntaxhighlightning', function (enabled) {
        if (enabled && BPPUtils.isTemplate('tplThread')) {
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
    });

    //Erweiterungen: Lazyload
    kango.invokeAsync('kango.storage.getItem', 'option_posts_extension_lazyload', function (enabled) {
        if (enabled && BPPUtils.isTemplate('tplThread')) {
            $('.resizeImage, .bpp_resizeImage').each(function () {
                $(this).attr('data-original', $(this).attr('src')).removeAttr('src');
            }).lazyload({
                effect : 'fadeIn',
                skip_invisible : false
            });
        }
    });

    //Filter: Youtube Videos
    kango.invokeAsync('kango.storage.getItem', 'option_posts_filter_youtube', function (enabled) {
        if (enabled && BPPUtils.isTemplate('tplThread')) {
            $('.message:not(.quickReply):not(.deleted) .messageContentInner object').each(function () {
                var $object = $(this),
                    videoId = $object.attr('data').substr(-17, 11);
                $object.replaceWith('<a href="http://www.youtube.com/watch?v=' + videoId + '" class="externalURL">http://www.youtube.com/watch?v=' + videoId + '</a>');
            });
        }
    });

    //Filter: Gelöschte Beiträge
    kango.invokeAsync('kango.storage.getItem', 'option_posts_filter_deleted', function (enabled) {
        if (enabled && BPPUtils.isTemplate('tplThread')) {
            $('.messageMinimized:not(.quickReply) > .messageInner > img[src="icon/postTrashM.png"]').closest('.messageMinimized').remove();
        }
    });

    //Filter: Bedankomat
    kango.invokeAsync('kango.storage.getItem', 'option_posts_filter_thanko', function (enabled) {
        if (enabled && BPPUtils.isTemplate('tplThread')) {
            $('li.postThankButton, .thankStats').remove();
        }
    });

    //Filter: Ignorierte Benutzer
    kango.invokeAsync('kango.storage.getItem', 'option_posts_filter_ignored', function (enabled) {
        if (enabled && BPPUtils.isTemplate('tplThread')) {
            $('.messageMinimized:not(.quickReply) > .messageInner > img[src="wcf/icon/warningM.png"]').closest('.messageMinimized').remove();
        }
    });

    //Filter: Hilfreichste Antwort
    kango.invokeAsync('kango.storage.getItem', 'option_posts_filter_bestans', function (enabled) {
        if (enabled && BPPUtils.isTemplate('tplThread')) {
            BPPUtils.addStyle(null, '#helpfulAnswer{display:none!important;}.helpfulAnswerPost .messageInner .messageSidebar{background-image: none!important;}');
        }
    });

    //Filter: Beitragscounter
    kango.invokeAsync('kango.storage.getItem', 'option_posts_filter_postcount', function (enabled) {
        if (enabled && BPPUtils.isTemplate('tplThread')) {
            $('.userCredits p > a:contains("Beiträge")').parent('p').remove();
            $('.userCredits').each(function () {
                if ($(this).children().length === 0) {
                    $(this).remove();
                }
            });
        }
    });

    //Filter: Benutzertitel
    kango.invokeAsync('kango.storage.getItem', 'option_posts_filter_usertitle', function (enabled) {
        if (enabled && BPPUtils.isTemplate('tplThread')) {
            $('.userTitle').remove();
        }
    });

    //Filter: Benutzerrang
    kango.invokeAsync('kango.storage.getItem', 'option_posts_filter_userrank', function (enabled) {
        if (enabled && BPPUtils.isTemplate('tplThread')) {
            $('.messageAuthor').each(function () {
                $(this).find('.userRank').first().remove();
            });
        }
    });

    //Filter: Zusätzlicher Benutzerrang
    kango.invokeAsync('kango.storage.getItem', 'option_posts_filter_additionalUserrank', function (enabled) {
        if (enabled && BPPUtils.isTemplate('tplThread')) {
            $('.messageAuthor').each(function () {
                if ($(this).find('.userRank').length > 1) {
                    $(this).find('.userRank').last().remove();
                }
            });
        }
    });

    //Filter: Registrierungsdatum
    kango.invokeAsync('kango.storage.getItem', 'option_posts_filter_regdate', function (enabled) {
        if (enabled && BPPUtils.isTemplate('tplThread')) {
            $('.userCredits p:contains("Registrierungsdatum: ")').remove();
            $('.userCredits').each(function () {
                if ($(this).children().length === 0) {
                    $(this).remove();
                }
            });
        }
    });

    //Filter: Geschlecht
    kango.invokeAsync('kango.storage.getItem', 'option_posts_filter_gender', function (enabled) {
        if (enabled && BPPUtils.isTemplate('tplThread')) {
            $('.userSymbols img[src="wcf/icon/genderMaleS.png"], .userSymbols img[src="wcf/icon/genderFemaleS.png"]').parent('li').remove();
            $('.userCredits').each(function () {
                if ($(this).children().length === 0) {
                    $(this).remove();
                }
            });
        }
    });

    //Filter: XBL Gamertag
    kango.invokeAsync('kango.storage.getItem', 'option_posts_filter_xblGamertag', function (enabled) {
        if (enabled && BPPUtils.isTemplate('tplThread')) {
            $('.userCredits p:contains("XBL Gamertag: ")').remove();
            $('.userCredits').each(function () {
                if ($(this).children().length === 0) {
                    $(this).remove();
                }
            });
        }
    });

    //Filter: PSN ID
    kango.invokeAsync('kango.storage.getItem', 'option_posts_filter_psnid', function (enabled) {
        if (enabled && BPPUtils.isTemplate('tplThread')) {
            $('.userCredits p:contains("PSN ID: ")').remove();
            $('.userCredits').each(function () {
                if ($(this).children().length === 0) {
                    $(this).remove();
                }
            });
        }
    });

    //Filter: Steam
    kango.invokeAsync('kango.storage.getItem', 'option_posts_filter_steam', function (enabled) {
        if (enabled && BPPUtils.isTemplate('tplThread')) {
            $('.userCredits p:contains("Steam: ")').remove();
            $('.userCredits').each(function () {
                if ($(this).children().length === 0) {
                    $(this).remove();
                }
            });
        }
    });

    //Filter: Origin
    kango.invokeAsync('kango.storage.getItem', 'option_posts_filter_origin', function (enabled) {
        if (enabled && BPPUtils.isTemplate('tplThread')) {
            $('.userCredits p:contains("Origin: ")').remove();
            $('.userCredits').each(function () {
                if ($(this).children().length === 0) {
                    $(this).remove();
                }
            });
        }
    });

    //Filter: Website
    kango.invokeAsync('kango.storage.getItem', 'option_posts_filter_website', function (enabled) {
        if (enabled && BPPUtils.isTemplate('tplThread')) {
            $('.userMessenger img[src="wcf/icon/websiteS.png"]').closest('li').remove();
            $('.userCredits').each(function () {
                if ($(this).children().length === 0) {
                    $(this).remove();
                }
            });
        }
    });

    //Filter: ICQ
    kango.invokeAsync('kango.storage.getItem', 'option_posts_filter_icq', function (enabled) {
        if (enabled && BPPUtils.isTemplate('tplThread')) {
            $('.userMessenger img[src="wcf/icon/icqS.png"]').closest('li').remove();
            $('.userCredits').each(function () {
                if ($(this).children().length === 0) {
                    $(this).remove();
                }
            });
        }
    });

    //Filter: Windows Live
    kango.invokeAsync('kango.storage.getItem', 'option_posts_filter_msn', function (enabled) {
        if (enabled && BPPUtils.isTemplate('tplThread')) {
            $('.userMessenger img[src="wcf/icon/msnS.png"]').closest('li').remove();
            $('.userCredits').each(function () {
                if ($(this).children().length === 0) {
                    $(this).remove();
                }
            });
        }
    });

    //Filter: Skype
    kango.invokeAsync('kango.storage.getItem', 'option_posts_filter_skype', function (enabled) {
        if (enabled && BPPUtils.isTemplate('tplThread')) {
            $('.userMessenger img[src="wcf/icon/skypeS.png"]').closest('li').remove();
            $('.userCredits').each(function () {
                if ($(this).children().length === 0) {
                    $(this).remove();
                }
            });
        }
    });
});