"use strict";
var $           = require('lib/jquery');
var storage     = require('../storage');
var utils       = require('../utils');
var register    = require("../settings").register;

register({
    'key': 'option.posts.filter.youtube.enabled',
    'name': 'Youtube-Videos',
    'tab': 'Einstellungen',
    'subtab': 'Beiträge & Nachrichten',
    'category': 'Filter',
    'type': 'toggle',
    'default': false,
    'description': 'Entfernt Youtube-Videos aus Beiträgen und Signaturen und ersetzt sie stattdessen mit dem Link zum jeweiligen Video.'
});

if (storage.get('option.posts.filter.youtube.enabled', false) && utils.isTemplate('tplThread')) {
    $('.message:not(.quickReply):not(.deleted) .messageContentInner object').each(function () {
        var $object = $(this),
            videoId = $object.attr('data').substr(-17, 11);
        $object.replaceWith('<a href="http://www.youtube.com/watch?v=' + videoId + '" class="externalURL">http://www.youtube.com/watch?v=' + videoId + '</a>');
    });
}