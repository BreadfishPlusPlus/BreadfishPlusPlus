var $           = require('lib/jquery');
var storage     = require('../storage');
var utils       = require('../utils');
var KeyboardJS  = require('lib/keyboard');
var register    = require('../settings').register;

register({
    'key': 'option.posts.extension.imageResize.enabled',
    'name': 'Bilderzoom',
    'tab': 'Einstellungen',
    'subtab': 'Beiträge & Nachrichten',
    'category': 'Erweiterungen',
    'type': 'toggle',
    'default': false,
    'description': 'Erlaubt es, die Größe von Bildern in Signaturen und Posts per Mausrad zu ändern.'
});


register({
    'key': 'option.keyboard.imageResize.modifier',
    'name': 'Nächste Seite',
    'tab': 'Tastaturnavigation',
    'subtab': 'Erweiterungen',
    'category': 'Bilderzoom Tastenkombination',
    'type': 'keyboard',
    'default': -1,
    'description': 'Wird diese option gesetzt, funktioniert der Bilderzoom (siehe Einstellungen -> Beiträge & Nachrichten -> Erweiterungen) nur noch in verbindung mit dieser Taste + Mausrad.'
});

var STEPS = 30; //TODO: versteckte option

var isModifierActive = function (modifierKey, keyNames) {
    utils.log.debug('modifierKey', modifierKey);
    if (modifierKey === -1) {
        return true;
    }
    utils.log.debug('keyNames', keyNames);
    var activeKeys = KeyboardJS.activeKeys();
    utils.log.debug('activeKeys', activeKeys);
    for(var i=0; i<keyNames.length; i++) {
        utils.log.debug('indexOf', activeKeys.indexOf(keyNames[i]));
        if (activeKeys.indexOf(keyNames[i]) === -1) {
            return false;
        }
    }
    return true;
};

if (storage.get('option.posts.extension.imageResize.enabled', false) && utils.isTemplate('tplThread')) {
    var modifierKey = storage.get('option.keyboard.imageResize.modifier', -1);
    var keyNames = KeyboardJS.key.name(modifierKey);

    $(document).on('mousewheel', '.resizeImage,.bpp_resizeImage', function (event) {
        if (!isModifierActive(modifierKey, keyNames)) {
            return;
        }

        event.preventDefault();
        var zoom = (event.deltaX || event.deltaY) * STEPS,
            $elem = $(this);

        if ($elem.attr('height')) {
            $elem.css('height', $elem.attr('height') + 'px');
            $elem.removeAttr('height');
        }
        if ($elem.attr('width')) {
            $elem.removeAttr('width');
        }

        $elem.css('height', Math.max(STEPS, $elem.height() + zoom) + 'px');
    });
}