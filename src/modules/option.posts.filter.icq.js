"use strict";
var $           = require('lib/jquery');
var storage     = require('../storage');
var utils       = require('../utils');
var register    = require("../settings").register;

register({
    'key': 'option.posts.filter.icq.enabled',
    'name': 'ICQ',
    'tab': 'Einstellungen',
    'subtab': 'Beiträge & Nachrichten',
    'category': 'Filter',
    'type': 'toggle',
    'default': false,
    'description': 'Blendet die Nummer des ICQ-Accounts aus.'
});

if (storage.get('option.posts.filter.icq.enabled', false) && utils.isTemplate('tplThread')) {
    $('.userMessenger img[src="wcf/icon/icqS.png"]').closest('li').remove();
    $('.userCredits').each(function () {
        if ($(this).children().length === 0) {
            $(this).remove();
        }
    });
}