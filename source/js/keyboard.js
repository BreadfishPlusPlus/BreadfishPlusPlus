$(function () {
    "use strict";

    function navigateThread() {
        $(document).keydown(function (event) {
            if (event.target.tagName.toLowerCase() !== 'input' && event.target.tagName.toLowerCase() !== 'textarea') {
                var vpDistance = $(window).scrollTop(),
                    $element = null,
                    $prev = null,
                    $next = null,
                    $messages = $('.message:not(.quickReply):not(.deleted)'),
                    prevPage = NaN,
                    nextPage = NaN;
                if (GM_getValue('option_keyboard_prev_page', -1) !== -1 && event.keyCode === GM_getValue('option_keyboard_prev_page', -1)) {
                    $('.pageNavigation ul li').each(function (i) {
                        if ($(this).hasClass('active')) {
                            prevPage = parseInt($($('.pageNavigation ul li').get(i - 1)).find('a').text(), 10);
                        }
                    });
                    if (!isNaN(prevPage)) {
                        window.location.href = 'index.php?page=Thread&threadID=' + unsafeWindow.threadID + '&pageNo=' + prevPage;
                    }
                    return false;
                }
                if (GM_getValue('option_keyboard_prev_post', -1) !== -1 && event.keyCode === GM_getValue('option_keyboard_prev_post', -1)) {
                    $('html, body').finish();
                    $messages.each(function (i) {
                        if ($element === null || Math.abs($(this).offset().top - vpDistance) < Math.abs($element.offset().top - vpDistance)) {
                            $element = $(this);
                            if (i > 0) {
                                $prev = $($messages.get(i - 1));
                            } else {
                                $prev = null;
                            }
                        }
                    });
                    if ((Math.round($element.offset().top) < (vpDistance + 10) && Math.round($element.offset().top) > (vpDistance - 10))) {
                        if ($prev !== null) {
                            $element = $prev;
                        } else {
                            $('.pageNavigation ul li').each(function (i) {
                                if ($(this).hasClass('active')) {
                                    prevPage = parseInt($($('.pageNavigation ul li').get(i - 1)).find('a').text(), 10);
                                }
                            });
                            if (!isNaN(prevPage)) {
                                window.location.href = 'index.php?page=Thread&threadID=' + unsafeWindow.threadID + '&pageNo=' + prevPage;
                            }
                        }
                    }
                    $('html, body').stop().animate({
                        scrollTop: $element.offset().top
                    }, 500);
                    return false;
                }
                if (GM_getValue('option_keyboard_next_page', -1) !== -1 && event.keyCode === GM_getValue('option_keyboard_next_page', -1)) {
                    $('.pageNavigation ul li').each(function (i) {
                        if ($(this).hasClass('active')) {
                            nextPage = parseInt($($('.pageNavigation ul li').get(i + 1)).find('a').text(), 10);
                        }
                    });
                    if (!isNaN(nextPage)) {
                        window.location.href = 'index.php?page=Thread&threadID=' + unsafeWindow.threadID + '&pageNo=' + nextPage;
                    }
                    return false;
                }
                if (GM_getValue('option_keyboard_next_post', -1) !== -1 && event.keyCode === GM_getValue('option_keyboard_next_post', -1)) {
                    $('html, body').finish();
                    $messages.each(function (i) {
                        if ($element === null || Math.abs($(this).offset().top - vpDistance) < Math.abs($element.offset().top - vpDistance)) {
                            $element = $(this);
                            if (i < $messages.length - 1) {
                                $next = $($messages.get(i + 1));
                            } else {
                                $next = null;
                            }
                        }
                    });
                    if ((Math.round($element.offset().top) < (vpDistance + 10) && Math.round($element.offset().top) > (vpDistance - 10))) {
                        if ($next !== null && ($(window).scrollTop() + $(window).height() !== $(document).height())) {
                            $element = $next;
                        } else {
                            $('.pageNavigation ul li').each(function (i) {
                                if ($(this).hasClass('active')) {
                                    nextPage = parseInt($($('.pageNavigation ul li').get(i + 1)).find('a').text(), 10);
                                }
                            });
                            if (!isNaN(nextPage)) {
                                window.location.href = 'index.php?page=Thread&threadID=' + unsafeWindow.threadID + '&pageNo=' + nextPage;
                            }
                        }
                    }
                    $('html, body').animate({
                        scrollTop: $element.offset().top
                    }, 500);
                    return false;
                }
            }
        });
    }

    window.addEventListener('load', function () {
        GM_log('executing keyboard.js');
        if (BPPUtils.isTemplate('tplThread')) {
            navigateThread();
        }
    }, false);

});