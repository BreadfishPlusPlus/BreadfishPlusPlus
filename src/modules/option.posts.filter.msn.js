"use strict";
var $           = require('lib/jquery');
var storage     = require('../storage');
var utils       = require('../utils');
var register    = require("../settings").register;

register({
    'key': 'option.posts.filter.msn.enabled',
    'name': 'Windows Live',
    'tab': 'Einstellungen',
    'subtab': 'Beiträge & Nachrichten',
    'category': 'Filter',
    'type': 'toggle',
    'default': false,
    'description': 'Blendet den Windows Live Messenger-Namen aus.'
});

if (storage.get('option.posts.filter.msn.enabled', false) && utils.isTemplate('tplThread')) {
    $('.userMessenger img[src="wcf/icon/msnS.png"]').closest('li').remove();
    $('.userCredits').each(function () {
        if ($(this).children().length === 0) {
            $(this).remove();
        }
    });
}