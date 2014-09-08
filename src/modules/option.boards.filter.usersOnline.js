"use strict";
var $           = require('lib/jquery');
var storage     = require('../storage');
var utils       = require('../utils');
var register    = require("../settings").register;

register({
    'key': 'option.boards.filter.usersOnline.enabled',
    'name': 'Zur Zeit sind X Benutzer online',
    'tab': 'Einstellungen',
    'subtab': 'Forenübersicht',
    'category': 'Filter',
    'type': 'toggle',
    'default': false,
    'description': 'Entfernt die Infobox auf der Startseite, die anzeigt, wer gerade online ist.'
});

if (storage.get('option.boards.filter.usersOnline.enabled', false) && utils.isTemplate('tplIndex')) {
    $('.infoBoxUsersOnline').remove();
}