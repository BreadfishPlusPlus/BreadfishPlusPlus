// ==UserScript==
// @name        KeyboardNav
// @namespace   BreadfishPlusPlus
// @include     http://forum.sa-mp.de/*
// @exclude     http://forum.sa-mp.de/acp/*
// @all-frames  false
// ==/UserScript==
/*global kango, BPPUtils, $, KeyboardJS*/
/*jslint unparam: true*/

BPPUtils.ready(function () {
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
        kango.invokeAsync('kango.storage.getItem', 'option_keyboard_prev_post', function (key) {
            if (key && key !== -1) {
                var keyname = KeyboardJS.key.name(key)[0];

                BPPUtils.debug('KeyboardNav', 'option_keyboard_prev_post: ' + keyname + ' (' + key + ')');

                KeyboardJS.on(keyname, function (event) {
                    if (event.target.tagName.toUpperCase() !== 'TEXTAREA' && event.target.tagName.toUpperCase() !== 'INPUT') {
                        event.preventDefault();

                        BPPUtils.debug('KeyboardNav', 'KeyPressed: ' + event.keyIdentifier + ' (' + event.keyCode + ')');

                        var $element = getPostInViewport();

                        //debug
                        $('.marked').removeClass('marked');
                        $element.addClass('marked');
                        //!debug

                        if (Math.round($element.offset().top) > Math.round($(document).scrollTop()) - 5 && Math.round($element.offset().top) < Math.round($(document).scrollTop()) + 5) {
                            $element = getPrevPost($element);
                        }

                        $('html, body').stop().animate({
                            scrollTop: $element.offset().top
                        }, 500);
                    }
                });
            }
        });

        //Erweiterungen: Nächster Post
        kango.invokeAsync('kango.storage.getItem', 'option_keyboard_next_post', function (key) {
            if (key && key !== -1) {
                var keyname = KeyboardJS.key.name(key)[0];
                BPPUtils.debug('KeyboardNav', 'option_keyboard_next_post: ' + keyname + ' (' + key + ')');

                KeyboardJS.on(keyname, function (event) {
                    if (event.target.tagName.toUpperCase() !== 'TEXTAREA' && event.target.tagName.toUpperCase() !== 'INPUT') {
                        event.preventDefault();

                        BPPUtils.debug('KeyboardNav', 'KeyPressed: ' + event.keyIdentifier + ' (' + event.keyCode + ')');

                        var $element = getPostInViewport('.message:not(.quickReply):not(.deleted):not(.messageMinimized)');

                        //debug
                        $('.marked').removeClass('marked');
                        $element.addClass('marked');
                        //!debug

                        if (Math.round($element.offset().top) > Math.round($(document).scrollTop()) - 5 && Math.round($element.offset().top) < Math.round($(document).scrollTop()) + 5) {
                            $element = getNextPost($element);
                        }

                        $('html, body').stop().animate({
                            scrollTop: $element.offset().top
                        }, 500);
                    }
                });
            }
        });

        //Erweiterungen: Vorherige Seite
        kango.invokeAsync('kango.storage.getItem', 'option_keyboard_prev_page', function (key) {
            if (key && key !== -1) {
                var keyname = KeyboardJS.key.name(key)[0];
                BPPUtils.debug('KeyboardNav', 'option_keyboard_prev_page: ' + keyname + ' (' + key + ')');

                KeyboardJS.on(keyname, function (event) {
                    if (event.target.tagName.toUpperCase() !== 'TEXTAREA' && event.target.tagName.toUpperCase() !== 'INPUT') {
                        event.preventDefault();

                        BPPUtils.debug('KeyboardNav', 'KeyPressed: ' + event.keyIdentifier + ' (' + event.keyCode + ')');

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
        });

        //Erweiterungen: Nächste Seite
        kango.invokeAsync('kango.storage.getItem', 'option_keyboard_next_page', function (key) {
            if (key && key !== -1) {
                var keyname = KeyboardJS.key.name(key)[0];
                BPPUtils.debug('KeyboardNav', 'option_keyboard_next_page: ' + keyname + ' (' + key + ')');

                KeyboardJS.on(keyname, function (event) {
                    if (event.target.tagName.toUpperCase() !== 'TEXTAREA' && event.target.tagName.toUpperCase() !== 'INPUT') {
                        event.preventDefault();

                        BPPUtils.debug('KeyboardNav', 'KeyPressed: ' + event.keyIdentifier + ' (' + event.keyCode + ')');

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
        });
    }
});