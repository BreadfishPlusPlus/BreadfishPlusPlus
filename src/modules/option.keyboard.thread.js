var $           = require('lib/jquery');
var KeyboardJS  = require('lib/keyboard');
var storage     = require('../storage');
var utils       = require('../utils');
var register    = require('../settings').register;

register({
    'key': 'option.keyboard.thread.postPrevious',
    'name': 'Vorheriger Beitrag',
    'tab': 'Tastaturnavigation',
    'subtab': 'Beiträge & Nachrichten',
    'category': 'Beiträge',
    'type': 'keyboard',
    'default': -1,
    'description': 'Zum vorherigen Beitrag scrollen'
});
register({
    'key': 'option.keyboard.thread.postNext',
    'name': 'Nächster Beitrag',
    'tab': 'Tastaturnavigation',
    'subtab': 'Beiträge & Nachrichten',
    'category': 'Beiträge',
    'type': 'keyboard',
    'default': -1,
    'description': 'Zum nächsten Beitrag scrollen'
});
register({
    'key': 'option.keyboard.thread.pagePrevious',
    'name': 'Vorherige Seite',
    'tab': 'Tastaturnavigation',
    'subtab': 'Beiträge & Nachrichten',
    'category': 'Seiten',
    'type': 'keyboard',
    'default': -1,
    'description': 'Zur vorherigen Seite springen'
});
register({
    'key': 'option.keyboard.thread.pageNext',
    'name': 'Nächste Seite',
    'tab': 'Tastaturnavigation',
    'subtab': 'Beiträge & Nachrichten',
    'category': 'Seiten',
    'type': 'keyboard',
    'default': -1,
    'description': 'Zur nächsten Seite springen'
});

var getPostInViewport = function () {
    var $messages = $('.message:not(.quickReply):not(.deleted):not(.messageMinimized)'),
        winScroll = $(document).scrollTop() + 50,
        $elements;

    $elements = $.grep($messages, function (item) {
        return $(item).position().top <= winScroll;
    });
    if ($elements.length === 0) {
        return $messages.first();
    }
    return $($elements).last();
};
var getNextPostInList = function (postId, list) {
    var index = list.indexOf(postId);
    if (index > -1 && index < list.length - 1) {
        return list[index + 1];
    } else {
        return postId;
    }
};
var getPrevPostInList = function (postId, list) {
    var index = list.indexOf(postId);
    if (index > -1 && index > 0) {
        return list[index - 1];
    } else {
        return postId;
    }
};

if (utils.isTemplate('tplThread')) {
    var keyPrevPost = storage.get('option.keyboard.thread.postPrevious', -1),
        keyNextPost = storage.get('option.keyboard.thread.postNext', -1),
        keyPrevPage = storage.get('option.keyboard.thread.pagePrevious', -1),
        keyNextPage = storage.get('option.keyboard.thread.pageNext', -1),
        keyName,
        activePostId = 0,
        idList = $('.message:not(.quickReply):not(.deleted):not(.messageMinimized)').map(function () {
            return parseInt($(this).attr('id').substr(7), 10);
        }).toArray(),
        postChangeEvent;

    postChangeEvent = function () {
        $('.message:not(.quickReply):not(.deleted):not(.messageMinimized)').removeClass('marked');
        var $element = getPostInViewport();
        activePostId = parseInt($element.attr('id').substr(7), 10);
    };

    $(window).bind('resize scroll', postChangeEvent);
    $(document).bind('ready', postChangeEvent);

    //Vorheriger Post
    if (keyPrevPost !== -1) {
        keyName = KeyboardJS.key.name(keyPrevPost)[0];
        utils.log.debug('KeyboardNav', 'option.keyboard.thread.postPrevious: ' + keyName + ' (' + keyPrevPost + ')');

        KeyboardJS.on(keyName, function (event) {
            if (event.target.tagName.toUpperCase() !== 'TEXTAREA' && event.target.tagName.toUpperCase() !== 'INPUT') {
                event.preventDefault();
                utils.log.debug('KeyboardNav', '^ KeyPressed: ' + event.keyIdentifier + ' (' + event.keyCode + ')');

                var next = getPrevPostInList(activePostId, idList);

                $('html, body').stop(true, true).animate({
                    scrollTop: $('#postRow' + next).offset().top
                }, 500);
            }
        });
    }
    //Nächster Post
    if (keyNextPost !== -1) {
        keyName = KeyboardJS.key.name(keyNextPost)[0];
        utils.log.debug('KeyboardNav', 'option.keyboard.thread.postNext: ' + keyName + ' (' + keyNextPost + ')');

        KeyboardJS.on(keyName, function (event) {
            if (event.target.tagName.toUpperCase() !== 'TEXTAREA' && event.target.tagName.toUpperCase() !== 'INPUT') {
                event.preventDefault();
                utils.log.debug('KeyboardNav', 'v KeyPressed: ' + event.keyIdentifier + ' (' + event.keyCode + ')');

                var next = getNextPostInList(activePostId, idList);

                $('html, body').stop(true, true).animate({
                    scrollTop: $('#postRow' + next).offset().top
                }, 500);
            }
        });
    }
    //Vorherige Seite
    if (keyPrevPage !== -1) {
        keyName = KeyboardJS.key.name(keyPrevPage)[0];
        utils.log.debug('KeyboardNav', 'option.keyboard.thread.pagePrevious: ' + keyName + ' (' + keyPrevPage + ')');

        KeyboardJS.on(keyName, function (event) {
            if (event.target.tagName.toUpperCase() !== 'TEXTAREA' && event.target.tagName.toUpperCase() !== 'INPUT') {
                event.preventDefault();

                utils.log.debug('KeyboardNav', 'KeyPressed: ' + event.keyIdentifier + ' (' + event.keyCode + ')');

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
    //Nächste Seite
    if (keyNextPage !== -1) {
        keyName = KeyboardJS.key.name(keyNextPage)[0];
        utils.log.debug('KeyboardNav', 'option.keyboard.thread.pageNext: ' + keyName + ' (' + keyNextPage + ')');

        KeyboardJS.on(keyName, function (event) {
            if (event.target.tagName.toUpperCase() !== 'TEXTAREA' && event.target.tagName.toUpperCase() !== 'INPUT') {
                event.preventDefault();

                utils.log.debug('KeyboardNav', 'KeyPressed: ' + event.keyIdentifier + ' (' + event.keyCode + ')');

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