"use strict";
var $           = require('lib/jquery');
var storage     = require('../storage');
var utils       = require('../utils');
var register    = require("../settings").register;

register({
    'key': 'option.boards.extension.searchIcon.enabled',
    'name': 'Suche Icon',
    'tab': 'Einstellungen',
    'subtab': 'Forenübersicht',
    'category': 'Fehlerbehebungen',
    'type': 'toggle',
    'default': false,
    'description': 'Zeigt das Icon für die Suche im Footer wieder richtig an.'
});

if (storage.get('option.boards.extension.searchIcon.enabled', false) && utils.isTemplate('tplIndex')) {
    $('img[src="icon/searchS.png"]').attr('src', 'wcf/icon/searchHeadS.png'); //FK U BENVEI
}