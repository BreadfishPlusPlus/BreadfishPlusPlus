"use strict";
var $           = require('lib/jquery');
var storage     = require('../storage');
var utils       = require('../utils');
var register    = require("../settings").register;

register({
    'key': 'option.posts.filter.bestans.enabled',
    'name': 'Hilfreichste Antwort',
    'tab': 'Einstellungen',
    'subtab': 'Beiträge & Nachrichten',
    'category': 'Filter',
    'type': 'toggle',
    'default': false,
    'description': 'Entfernt die Markierung der hilfreichsten Antwort.'
});

if (storage.get('option.posts.filter.bestans.enabled', false) && utils.isTemplate('tplThread')) {
    require('./../styles/filterBestans.less');
}