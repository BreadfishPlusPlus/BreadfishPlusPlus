"use strict";
var $           = require('lib/jquery');
var storage     = require('../storage');
var utils       = require('../utils');
var register    = require("../settings").register;

register({
    'key': 'option.posts.filter.additionalUserrank.enabled',
    'name': 'Zusätzlicher Benutzerrang',
    'tab': 'Einstellungen',
    'subtab': 'Beiträge & Nachrichten',
    'category': 'Filter',
    'type': 'toggle',
    'default': false,
    'description': 'Blendet den zusätzlichen Benutzerrang (falls vorhanden) aus.'
});

if (storage.get('option.posts.filter.additionalUserrank.enabled', false) && utils.isTemplate('tplThread')) {
    $('.messageAuthor').each(function () {
        if ($(this).find('.userRank').length === 2 || ($(this).find('.userRank').length === 1 && storage.get('option.posts.filter.userrank.enabled', false))) {
            $(this).find('.userRank').last().remove();
        }
    });
}