var $           = require('lib/jquery');
var storage     = require('../storage');
var utils       = require('../utils');
var register    = require('../settings').register;

register({
    'key': 'option.boards.filter.birthdays.enabled',
    'name': 'Geburtstage',
    'tab': 'Einstellungen',
    'subtab': 'Forenübersicht',
    'category': 'Filter',
    'type': 'toggle',
    'default': false,
    'description': 'Entfernt die Infobox auf der Startseite, die anzeigt, wer heute Geburtstag hat.'
});

if (storage.get('option.boards.filter.birthdays.enabled', false) && utils.isTemplate('tplIndex')) {
    $('.infoBox .containerContent h3:contains(Geburtstage:)').parent('div').parent('div').remove();
}