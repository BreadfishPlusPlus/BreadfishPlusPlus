"use strict";
var $           = require('lib/jquery');
var storage     = require('../storage');
var utils       = require('../utils');
var register    = require("../settings").register;

register({
    'key': 'option.posts.filter.postcount.enabled',
    'name': 'Beitragscounter',
    'tab': 'Einstellungen',
    'subtab': 'Beiträge & Nachrichten',
    'category': 'Filter',
    'type': 'toggle',
    'default': false,
    'description': 'Blendet den Beitragscounter aus.'
});

if (storage.get('option.posts.filter.postcount.enabled', false) && utils.isTemplate('tplThread')) {
    $('.userCredits p > a:contains("Beiträge")').parent('p').remove();
    $('.userCredits').each(function () {
        if ($(this).children().length === 0) {
            $(this).remove();
        }
    });
}