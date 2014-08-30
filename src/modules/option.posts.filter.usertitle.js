"use strict";
var $           = require('lib/jquery');
var storage     = require('../storage');
var utils       = require('../utils');
var register    = require("../settings").register;

register({
    'key': 'option.posts.filter.usertitle.enabled',
    'name': 'Benutzertitel',
    'tab': 'Einstellungen',
    'subtab': 'Beiträge & Nachrichten',
    'category': 'Filter',
    'type': 'toggle',
    'default': false,
    'description': 'Blendet den Benutzertitel aus.'
});

if (storage.get('option.posts.filter.usertitle.enabled', false) && utils.isTemplate('tplThread')) {
    $('.userTitle').remove();
}