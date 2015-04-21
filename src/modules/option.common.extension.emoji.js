/* global twemoji */
var $           = require('lib/jquery');
var storage     = require('../storage');
var register    = require('../settings').register;

register({
    'key': 'option.common.extension.emoji.enabled',
    'name': 'Emoji support',
    'tab': 'Einstellungen',
    'subtab': 'Allgemeine Einstellungen',
    'category': 'Erweiterungen',
    'type': 'toggle',
    'default': false,
    'description': 'Ersetzt im ganzen Forum Emoji-Unicode-Zeichen durch Bilder.'
});

if (storage.get('option.common.extension.emoji.enabled', false)) {
    $.getScript('https://cdnjs.cloudflare.com/ajax/libs/twemoji/1.3.2/twemoji.min.js').done(function () {
        twemoji.size = '16x16';
        twemoji.parse(document.body);
    });
}