"use strict";
var $           = require('lib/jquery');
var storage     = require('../storage');
var utils       = require('../utils');
var register    = require("../settings").register;

register({
    'key': 'option.common.bugfix.imageResize.enabled',
    'name': 'Bildverkleinerung',
    'tab': 'Einstellungen',
    'subtab': 'Allgemeine Einstellungen',
    'category': 'Fehlerbehebungen',
    'type': 'toggle',
    'default': false,
    'description': 'Passt Bilder, die zu groß sind und deshalb vom WBB verkleiner wurde, auf die exakte Breite des Beitrags an.'
});

if (storage.get('option.common.bugfix.imageResize.enabled', false) && utils.isTemplate(['tplPostAdd', 'tplPmNew', 'tplPostEdit', 'tplThread'])) {
    $('.resizeImage').each(function () {
        var $img = $(this),
            parentWidth = $(this).first().closest('div').width();
        $img.removeAttr("width").removeAttr("height");
        $img.css({
            "maxWidth": parentWidth,
            "width": "auto",
            "height": "auto"
        });
        if ($img.closest('a').length === 0) {
            $img.wrap('<a href="' + $img.attr('src') + '" class="externalURL"></a>');
        }
    });
}