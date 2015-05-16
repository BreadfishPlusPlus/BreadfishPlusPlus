var $           = require('lib/jquery');
var storage     = require('../storage');
var register    = require('../settings').register;

register({
    'key': 'option.common.filter.gamekeyBanner.enabled',
    'name': 'Breadfish-Gamekeys Banner',
    'tab': 'Einstellungen',
    'subtab': 'Allgemeine Einstellungen',
    'category': 'Filter',
    'type': 'toggle',
    'default': false,
    'description': 'Entfernt den Breadfish-Gamekeys Banner im Footer'
});

if (storage.get('option.common.filter.gamekeyBanner.enabled', false)) {
    $('#footer a[href*="breadfish-gamekeys.de"]').parent('div').hide();
}
