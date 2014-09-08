"use strict";
var $           = require('lib/jquery');
var storage     = require('../storage');
var utils       = require('../utils');
var register    = require("../settings").register;

register({
    'key': 'option.posts.filter.origin.enabled',
    'name': 'Origin',
    'tab': 'Einstellungen',
    'subtab': 'Beiträge & Nachrichten',
    'category': 'Filter',
    'type': 'toggle',
    'default': false,
    'description': 'Blendet den Originnamen aus.'
});

if (storage.get('option.posts.filter.origin.enabled', false) && utils.isTemplate('tplThread')) {
    $('.userCredits p:contains("Origin: ")').remove();
    $('.userCredits').each(function () {
        if ($(this).children().length === 0) {
            $(this).remove();
        }
    });
}