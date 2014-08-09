"use strict";
var $           = require('lib/jquery');
var storage     = require('../storage');
var utils       = require('../utils');
var register    = require("../settings").register;

register({
    'key': 'option.posts.extension.removeExternalImages.enabled',
    'name': 'Externen Bildern',
    'tab': 'Einstellungen',
    'subtab': 'Beiträge & Nachrichten',
    'category': 'Filter',
    'type': 'toggle',
    'default': false,
    'description': 'Entfernt Bilder, die nicht von sa-mp.de stammen, aus den Themen und zeigt stattdessen nur die URL des Bildes an.'
});

if (storage.get('option.posts.extension.removeExternalImages.enabled', false) && utils.isTemplate('tplThread')) {
    $('.externalURL:has(.resizeImage), .externalURL:has(.bpp_resizeImage)').each(function () {
        var url = $(this).find('.resizeImage, .bpp_resizeImage').attr('src');
        $(this).html(url);
    });
    $('.resizeImage, .bpp_resizeImage').each(function () {
        var url = $(this).attr('src');
        $(this).replaceWith('<a href="' + url + '" class="externalURL">' + url + '</a>');
    });
}