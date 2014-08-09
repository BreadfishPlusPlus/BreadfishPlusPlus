"use strict";
var $           = require('lib/jquery');
var storage     = require('../storage');
var utils       = require('../utils');
var register    = require("../settings").register;

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

var STEPS = 30;

if (storage.get('option.posts.extension.imageResize.enabled', false) && utils.isTemplate('tplThread')) {
    $(document).on('mousewheel', '.resizeImage,.bpp_resizeImage', function (event) {
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

        $elem.css('height', Math.max(STEPS, $elem.height() + zoom) + "px");
    });
}