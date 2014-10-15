var $           = require('lib/jquery');
var storage     = require('../storage');
var utils       = require('../utils');
var register    = require('../settings').register;

register({
    'key': 'option.boards.filter.statistics.enabled',
    'name': 'Statistik',
    'tab': 'Einstellungen',
    'subtab': 'Forenübersicht',
    'category': 'Filter',
    'type': 'toggle',
    'default': false,
    'description': 'Entfernt die Infobox auf der Startseite, die die Forenstatistik anzeigt.'
});

if (storage.get('option.boards.filter.statistics.enabled', false) && utils.isTemplate('tplIndex')) {
    $('.infoBoxStatistics').remove();
}