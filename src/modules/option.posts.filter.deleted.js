"use strict";
var $           = require('lib/jquery');
var storage     = require('../storage');
var utils       = require('../utils');
var register    = require("../settings").register;

register({
    'key': 'option.posts.filter.deleted.enabled',
    'name': 'Gelöschte Beiträge',
    'tab': 'Einstellungen',
    'subtab': 'Beiträge & Nachrichten',
    'category': 'Filter',
    'type': 'toggle',
    'default': false,
    'description': 'Blendet gelöschte Beiträge komplett aus.'
});

if (storage.get('option.posts.filter.deleted.enabled', false) && utils.isTemplate('tplThread')) {
    $('.messageMinimized:not(.quickReply) > .messageInner > img[src="icon/postTrashM.png"]').closest('.messageMinimized').remove();
}