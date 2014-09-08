"use strict";
var $           = require('lib/jquery');
var storage     = require('../storage');
var utils       = require('../utils');
var register    = require("../settings").register;

register({
    'key': 'option.posts.filter.website.enabled',
    'name': 'Website',
    'tab': 'Einstellungen',
    'subtab': 'Beiträge & Nachrichten',
    'category': 'Filter',
    'type': 'toggle',
    'default': false,
    'description': 'Blendet die Website aus.'
});

if (storage.get('option.posts.filter.website.enabled', false) && utils.isTemplate('tplThread')) {
    $('.userMessenger img[src="wcf/icon/websiteS.png"]').closest('li').remove();
    $('.userCredits').each(function () {
        if ($(this).children().length === 0) {
            $(this).remove();
        }
    });
}