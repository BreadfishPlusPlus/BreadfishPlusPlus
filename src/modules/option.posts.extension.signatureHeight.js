/*jslint nomen: true*/
"use strict";
var $           = require('lib/jquery');
var storage     = require('../storage');
var utils       = require('../utils');
var register    = require("../settings").register;

register({
    'key': 'option.posts.extension.signatureHeight.enabled',
    'name': 'Höhenbegrenzung für Signaturen',
    'tab': 'Einstellungen',
    'subtab': 'Beiträge & Nachrichten',
    'category': 'Erweiterungen',
    'type': 'toggle',
    'default': false,
    'description': 'Entfernt die Scrollbars aus den Signaturen und zeigt sie in voller Höhe an.'
});

if (storage.get('option.posts.extension.signatureHeight.enabled', false) && utils.isTemplate('tplThread')) {
    $('.signature').css('max-height', 'none');
}