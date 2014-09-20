"use strict";
var $           = require('lib/jquery');
var KeyboardJS  = require('lib/keyboard');
var storage     = require('../storage');
var utils       = require('../utils');
var register    = require("../settings").register;

register({
    'key': 'option.keyboard.post.previous',
    'name': 'Vorheriger Beitrag',
    'tab': 'Tastaturnavigation',
    'subtab': 'Themen',
    'category': 'Beiträge',
    'type': 'keyboard',
    'default': -1,
    'description': 'Zum vorherigen Beitrag scrollen'
});
register({
    'key': 'option.keyboard.post.next',
    'name': 'Nächster Beitrag',
    'tab': 'Tastaturnavigation',
    'subtab': 'Themen',
    'category': 'Beiträge',
    'type': 'keyboard',
    'default': -1,
    'description': 'Zum nächsten Beitrag scrollen'
});

var getPostInViewport = function () {
    var $messages = $('.message:not(.quickReply):not(.deleted):not(.messageMinimized)'),
        winScroll = $(document).scrollTop(),
        $elements;

    $elements = $.grep($messages, function (item) {
        return $(item).position().top <= winScroll;
    });
    if ($elements.length === 0) {
        return $messages.first();
    }
    return $($elements).last();
};
var getPrevPost = function ($element) {
    var $list = $('.message:not(.quickReply):not(.deleted):not(.messageMinimized)'),
        index = $list.index($element);
    if (index === 0) {
        return $element;
    }
    return $list.eq(index - 1);
};
var getNextPost = function ($element) {
    var $list = $('.message:not(.quickReply):not(.deleted):not(.messageMinimized)'),
        index = $list.index($element);
    if (index === $list.length - 1) {
        return $element;
    }
    return $list.eq(index + 1);
};

if (utils.isTemplate('tplThread')) {
    var keyPrevPost = storage.get('option.keyboard.post.previous', -1),
        keyNextPost = storage.get('option.keyboard.post.next', -1),
        keyName;

    $(window).bind("resize scroll", function () {
        $('.message:not(.quickReply):not(.deleted):not(.messageMinimized)').removeClass("marked");
        var $element = getPostInViewport();
        //utils.log.debug($element[0]);
        $element.addClass("marked");
    });

    if (keyPrevPost !== -1) {
        keyName = KeyboardJS.key.name(keyPrevPost)[0];
        utils.log.debug('KeyboardNav', 'option_keyboard_prev_post: ' + keyName + ' (' + keyPrevPost + ')');

        KeyboardJS.on(keyName, function (event) {
            if (event.target.tagName.toUpperCase() !== 'TEXTAREA' && event.target.tagName.toUpperCase() !== 'INPUT') {
                event.preventDefault();
                utils.log.debug('KeyboardNav', '^ KeyPressed: ' + event.keyIdentifier + ' (' + event.keyCode + ')');

                var $element = getPostInViewport();
                if ($element.length === 0) {
                    return;
                }

                if (Math.round($element.offset().top) > Math.round($(document).scrollTop()) - 5 &&
                        Math.round($element.offset().top) < Math.round($(document).scrollTop()) + 5) {
                    $element = getPrevPost($element);
                    utils.log.debug('prevElement', $element[0]);
                }

                $('html, body').stop(true, true).animate({
                    scrollTop: $element.offset().top
                }, 500);
            }
        });
    }
    if (keyNextPost !== -1) {
        keyName = KeyboardJS.key.name(keyNextPost)[0];
        utils.log.debug('KeyboardNav', 'option_keyboard_next_post: ' + keyName + ' (' + keyNextPost + ')');

        KeyboardJS.on(keyName, function (event) {
            if (event.target.tagName.toUpperCase() !== 'TEXTAREA' && event.target.tagName.toUpperCase() !== 'INPUT') {
                event.preventDefault();

                utils.log.debug('KeyboardNav', 'v KeyPressed: ' + event.keyIdentifier + ' (' + event.keyCode + ')');

                var $element = getPostInViewport();

                if (Math.round($element.offset().top) > Math.round($(document).scrollTop()) - 5 &&
                        Math.round($element.offset().top) < Math.round($(document).scrollTop()) + 5) {
                    $element = getNextPost($element);
                }

                $('html, body').stop().animate({
                    scrollTop: $element.offset().top + 5
                }, 500);
            }
        });
    }
}