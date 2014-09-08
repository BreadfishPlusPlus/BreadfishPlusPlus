"use strict";
var $           = require('lib/jquery');
var storage     = require('../storage');
var utils       = require('../utils');
var register    = require("../settings").register;

register({
    'key': 'option.posts.filter.userrank.enabled',
    'name': 'Benutzerrang',
    'tab': 'Einstellungen',
    'subtab': 'Beiträge & Nachrichten',
    'category': 'Filter',
    'type': 'toggle',
    'default': false,
    'description': 'Blendet den Benutzerrang aus.'
});

if (storage.get('option.posts.filter.userrank.enabled', false) && utils.isTemplate('tplThread')) {
    $('.messageAuthor').each(function () {
        $(this).find('.userRank').first().remove();
    });
}