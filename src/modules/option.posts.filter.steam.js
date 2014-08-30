"use strict";
var $           = require('lib/jquery');
var storage     = require('../storage');
var utils       = require('../utils');
var register    = require("../settings").register;

register({
    'key': 'option.posts.filter.steam.enabled',
    'name': 'Steam',
    'tab': 'Einstellungen',
    'subtab': 'Beiträge & Nachrichten',
    'category': 'Filter',
    'type': 'toggle',
    'default': false,
    'description': 'Blendet den Steamnamen aus.'
});

if (storage.get('option.posts.filter.steam.enabled', false) && utils.isTemplate('tplThread')) {
    $('.userCredits p:contains("Steam: ")').remove();
    $('.userCredits').each(function () {
        if ($(this).children().length === 0) {
            $(this).remove();
        }
    });
}