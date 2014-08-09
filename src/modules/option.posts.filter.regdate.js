"use strict";
var $           = require('lib/jquery');
var storage     = require('../storage');
var utils       = require('../utils');
var register    = require("../settings").register;

register({
    'key': 'option.posts.filter.regdate.enabled',
    'name': 'Registrierungsdatum',
    'tab': 'Einstellungen',
    'subtab': 'Beiträge & Nachrichten',
    'category': 'Filter',
    'type': 'toggle',
    'default': false,
    'description': 'Blendet das Registrierungsdatum aus.'
});

if (storage.get('option.posts.filter.regdate.enabled', false) && utils.isTemplate('tplThread')) {
    $('.userCredits p:contains("Registrierungsdatum: ")').remove();
    $('.userCredits').each(function () {
        if ($(this).children().length === 0) {
            $(this).remove();
        }
    });
}