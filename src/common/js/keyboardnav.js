// ==UserScript==
// @name        KeyboardNav
// @namespace   BreadfishPlusPlus
// @include     http://forum.sa-mp.de/*
// @exclude     http://forum.sa-mp.de/acp/*
// @all-frames  false
// @run-at      document-start
// ==/UserScript==
/*global BPPUtils, $, KeyboardJS*/
/*jslint unparam: true, vars: true*/

BPPUtils.load(function () {
    "use strict";

    var getPostInViewport, getPrevPost, getNextPost;

    getPostInViewport = function () {
        return $($('.message:not(.quickReply):not(.deleted):not(.messageMinimized)').sort(function (a, b) {
            return Math.abs(1 - (($(window).scrollTop() + $(window).height() / 2 - $(a).height() / 2) / $(a).position().top)) -
                Math.abs(1 - (($(window).scrollTop() + $(window).height() / 2 - $(b).height() / 2) / $(b).position().top));
        })[0]);
    };
    getPrevPost = function ($element) {
        var $list = $('.message:not(.quickReply):not(.deleted):not(.messageMinimized)'),
            index = $list.index($element);
        if (index === 0) {
            return $element;
        }
        return $list.eq(index - 1);
    };
    getNextPost = function ($element) {
        var $list = $('.message:not(.quickReply):not(.deleted):not(.messageMinimized)'),
            index = $list.index($element);
        if (index === $list.length - 1) {
            return $element;
        }
        return $list.eq(index + 1);
    };

    if (BPPUtils.isTemplate('tplThread')) {
        //Erweiterungen: Vorheriger Post
        var keyPrevPost = BPPUtils.storage.get('option.keyboard.post.prev', -1),
            keyNextPost = BPPUtils.storage.get('option.keyboard.post.next', -1),
            keyPrevPage = BPPUtils.storage.get('option.keyboard.page.prev', -1),
            keyNextPage = BPPUtils.storage.get('option.keyboard.page.next', -1),
            keyName;
        if (keyPrevPost !== -1) {
            keyName = KeyboardJS.key.name(keyPrevPost)[0];

            BPPUtils.log.debug('KeyboardNav', 'option_keyboard_prev_post: ' + keyName + ' (' + keyPrevPost + ')');

            KeyboardJS.on(keyName, function (event) {
                if (event.target.tagName.toUpperCase() !== 'TEXTAREA' && event.target.tagName.toUpperCase() !== 'INPUT') {
                    event.preventDefault();

                    BPPUtils.log.debug('KeyboardNav', 'KeyPressed: ' + event.keyIdentifier + ' (' + event.keyCode + ')');

                    var $element = getPostInViewport();

                    if (Math.round($element.offset().top) > Math.round($(document).scrollTop()) - 5 && Math.round($element.offset().top) < Math.round($(document).scrollTop()) + 5) {
                        $element = getPrevPost($element);
                    }

                    $('html, body').stop().animate({
                        scrollTop: $element.offset().top
                    }, 500);
                }
            });
        }

        //Erweiterungen: Nächster Post
        if (keyNextPost !== -1) {
            keyName = KeyboardJS.key.name(keyNextPost)[0];
            BPPUtils.log.debug('KeyboardNav', 'option_keyboard_next_post: ' + keyName + ' (' + keyNextPost + ')');

            KeyboardJS.on(keyName, function (event) {
                if (event.target.tagName.toUpperCase() !== 'TEXTAREA' && event.target.tagName.toUpperCase() !== 'INPUT') {
                    event.preventDefault();

                    BPPUtils.log.debug('KeyboardNav', 'KeyPressed: ' + event.keyIdentifier + ' (' + event.keyCode + ')');

                    var $element = getPostInViewport('.message:not(.quickReply):not(.deleted):not(.messageMinimized)');

                    if (Math.round($element.offset().top) > Math.round($(document).scrollTop()) - 5 && Math.round($element.offset().top) < Math.round($(document).scrollTop()) + 5) {
                        $element = getNextPost($element);
                    }

                    $('html, body').stop().animate({
                        scrollTop: $element.offset().top
                    }, 500);
                }
            });
        }

        //Erweiterungen: Vorherige Seite
        if (keyPrevPage !== -1) {
            keyName = KeyboardJS.key.name(keyPrevPage)[0];
            BPPUtils.log.debug('KeyboardNav', 'option_keyboard_prev_page: ' + keyName + ' (' + keyPrevPage + ')');

            KeyboardJS.on(keyName, function (event) {
                if (event.target.tagName.toUpperCase() !== 'TEXTAREA' && event.target.tagName.toUpperCase() !== 'INPUT') {
                    event.preventDefault();

                    BPPUtils.log.debug('KeyboardNav', 'KeyPressed: ' + event.keyIdentifier + ' (' + event.keyCode + ')');

                    var prevPage = NaN,
                        threadID = $('input[name="threadID"]').val();

                    $('.pageNavigation ul li').each(function (i) {
                        if ($(this).hasClass('active')) {
                            prevPage = parseInt($($('.pageNavigation ul li').get(i - 1)).find('a').text(), 10);
                        }
                    });
                    if (!isNaN(prevPage)) {
                        window.location.href = 'index.php?page=Thread&threadID=' + threadID + '&pageNo=' + prevPage;
                    }
                }
            });
        }

        //Erweiterungen: Nächste Seite
        if (keyNextPage !== -1) {
            keyName = KeyboardJS.key.name(keyNextPage)[0];
            BPPUtils.log.debug('KeyboardNav', 'option_keyboard_next_page: ' + keyName + ' (' + keyNextPage + ')');

            KeyboardJS.on(keyName, function (event) {
                if (event.target.tagName.toUpperCase() !== 'TEXTAREA' && event.target.tagName.toUpperCase() !== 'INPUT') {
                    event.preventDefault();

                    BPPUtils.log.debug('KeyboardNav', 'KeyPressed: ' + event.keyIdentifier + ' (' + event.keyCode + ')');

                    var nextPage = NaN,
                        threadID = $('input[name="threadID"]').val();

                    $('.pageNavigation ul li').each(function (i) {
                        if ($(this).hasClass('active')) {
                            nextPage = parseInt($($('.pageNavigation ul li').get(i + 1)).find('a').text(), 10);
                        }
                    });
                    if (!isNaN(nextPage)) {
                        window.location.href = 'index.php?page=Thread&threadID=' + threadID + '&pageNo=' + nextPage;
                    }
                }
            });
        }
    }
});