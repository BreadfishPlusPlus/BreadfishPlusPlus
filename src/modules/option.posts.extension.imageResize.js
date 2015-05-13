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
    'key': 'option.posts.extension.imageResize.modifier',
    'name': 'Bilderzoom Tastenkombination',
    'tab': 'Einstellungen',
    'subtab': 'Beiträge & Nachrichten',
    'category': 'Erweiterungen',
    'type': 'keyboard',
    'default': -1,
    'description': 'Wird diese Option gesetzt, funktioniert der Bilderzoom (siehe Einstellungen -> Beiträge & Nachrichten -> Erweiterungen) nur noch in Verbindung mit dieser Taste + Mausrad.'
});

var STEPS = 30; //TODO: versteckte option

var isModifierActive = function (modifierKey, keyNames) {
    if (modifierKey === -1) {
        return true;
    }
    var activeKeys = KeyboardJS.activeKeys();
    for(var i=0; i<keyNames.length; i++) {
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