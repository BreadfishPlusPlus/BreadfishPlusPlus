"use strict";
var $           = require('lib/jquery');
var storage     = require('../storage');
var utils       = require('../utils');
var register    = require("../settings").register;

register({
    'key': 'option.posts.filter.xblGamertag.enabled',
    'name': 'XBL Gamertag',
    'tab': 'Einstellungen',
    'subtab': 'Beiträge & Nachrichten',
    'category': 'Filter',
    'type': 'toggle',
    'default': false,
    'description': 'Blendet den XBL Gamertag aus.'
});

if (storage.get('option.posts.filter.xblGamertag.enabled', false) && utils.isTemplate('tplThread')) {
    $('.userCredits p:contains("XBL Gamertag: ")').remove();
    $('.userCredits').each(function () {
        if ($(this).children().length === 0) {
            $(this).remove();
        }
    });
}