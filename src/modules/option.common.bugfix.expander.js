"use strict";
var $           = require('lib/jquery');
var storage     = require('../storage');
var utils       = require('../utils');
var register    = require("../settings").register;

register({
    'key': 'option.common.bugfix.expander.enabled',
    'name': 'Expander',
    'tab': 'Einstellungen',
    'subtab': 'Allgemeine Einstellungen',
    'category': 'Fehlerbehebungen',
    'type': 'toggle',
    'default': false,
    'description': 'Behebt den Expander-Bug, der auftritt, wenn ein Benutzer mehrere Expander auf einer Seite nutzt. Mehr Informationen zu diesem Fehler findest du hier: <a target="_blank" href="http://sa-mp.de/B++/p1701085-/">Spoiler</a>.'
});

if (storage.get('option.common.bugfix.expander.enabled', false) && utils.isTemplate(['tplPostAdd', 'tplThreadAdd', 'tplPmNew', 'tplPostEdit', 'tplThread', 'tplUserProfile'])) {
    $('.expander').each(function (i) {
        var $expander = $(this);
        $expander.parent('.expanderContainer').find('img').first().attr('onclick', 'openList(\'expander' + i + '\', { save: false })').unbind('click').attr('id', 'expander' + i + 'Image');
        $expander.parent('.expanderContainer').find('span').first().attr('id', 'expander' + i + 'Teaser');
        $expander.attr('id', 'expander' + i);
        $('#expander' + i).hide();
    });
}