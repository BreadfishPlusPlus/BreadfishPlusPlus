"use strict";
var $           = require('lib/jquery');
var storage     = require('../storage');
var utils       = require('../utils');
var register    = require("../settings").register;

register({
    'key': 'option.posts.filter.ignored.enabled',
    'name': 'Ignorierte Benutzer',
    'tab': 'Einstellungen',
    'subtab': 'Beiträge & Nachrichten',
    'category': 'Filter',
    'type': 'toggle',
    'default': false,
    'description': 'Blendet Beiträge von ignorierten Benutzern komplett aus.'
});

if (storage.get('option.posts.filter.ignored.enabled', false) && utils.isTemplate('tplThread')) {
    $('.messageMinimized:not(.quickReply) > .messageInner > img[src="wcf/icon/warningM.png"]').closest('.messageMinimized').remove();
}