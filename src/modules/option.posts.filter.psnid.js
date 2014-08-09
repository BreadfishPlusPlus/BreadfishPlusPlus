"use strict";
var $           = require('lib/jquery');
var storage     = require('../storage');
var utils       = require('../utils');
var register    = require("../settings").register;

register({
    'key': 'option.posts.filter.psnid.enabled',
    'name': 'PSN ID',
    'tab': 'Einstellungen',
    'subtab': 'Beiträge & Nachrichten',
    'category': 'Filter',
    'type': 'toggle',
    'default': false,
    'description': 'Blendet die PSN ID aus.'
});

if (storage.get('option.posts.filter.psnid.enabled', false) && utils.isTemplate('tplThread')) {
    $('.userCredits p:contains("PSN ID: ")').remove();
    $('.userCredits').each(function () {
        if ($(this).children().length === 0) {
            $(this).remove();
        }
    });
}