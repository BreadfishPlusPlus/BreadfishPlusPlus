/*
"use strict";
var $           = require('lib/jquery');
var storage     = require('../storage');
var utils       = require('../utils');
var register    = require("../settings").register;

register({
    'key': 'option.posts.extension.lazyload.enabled',
    'name': 'Lazyload',
    'tab': 'Einstellungen',
    'subtab': 'Beiträge & Nachrichten',
    'category': 'Erweiterungen',
    'type': 'toggle',
    'default': false,
    'description': 'Lädt externe Bilder erst, wenn sie im Sichtfenster des Browsers sind, und beschleunigt dadurch den Aufbau der Seite.'
});

if (storage.get('option.posts.extension.lazyload.enabled', false) && utils.isTemplate('tplThread')) {
    $('.resizeImage, .bpp_resizeImage').each(function () {
        $(this).attr('data-original', $(this).attr('src')).removeAttr('src').removeAttr('width');
    }).lazyload({
        effect : 'fadeIn',
        skip_invisible : false
    });
}
*/