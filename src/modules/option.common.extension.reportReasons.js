"use strict";
var $           = require('lib/jquery');
var utils       = require('../utils');
var storage     = require('../storage');
var register    = require("../settings").register;

register({
    'key': 'option.common.extension.reportReasons.enabled',
    'name': 'Meldungsgründe',
    'tab': 'Einstellungen',
    'subtab': 'Allgemeine Einstellungen',
    'category': 'Erweiterungen',
    'type': 'toggle',
    'default': false,
    'description': 'Fügt vordefinierte Gründe beim Melden eines Beitrags hinzu.'
});
register({
    'key': 'option.common.extension.reportReasons.list',
    'type': 'invis',
    'default': {
        'Anschuldigung ohne Beweise': 'Dieser Beitrag erhebt folgende Anschuldigungen, ohne diese zu beweisen: ',
        'Beleidigung': 'Dieser Beitrag ist Beleidigend, weil ',
        'Crossposting': 'Dieser Beitrag ist ein Cross-Post von hier: <hier bitte den Link zum anderen Thema/Beitrag einfügen>',
        'Doppelpost': 'Dieser Beitrag ist ein Doppelpost.',
        'Falscher Bereich': 'Dieser Beitrag ist im Falschen Bereich, weil ',
        'Falscher Umgangston': 'Dieser Beitrag weist einen falschen Umgangston auf, weil ',
        'Threadpushing': 'Dieser Beitrag ist ausschließlich dazu da, das Thema zu Pushen.',
        'Spam': 'Dieser Beitrag ist Spam, weil '
    }
});


if (storage.get('option.common.extension.reportReasons.enabled', false) && utils.isTemplate('tplPostReport')) {
    require('./../styles/reportReasons.less');
    var $formElement = $('.formElement'), $text = $('#text'), reportReasons = storage.get('option.common.extension.reportReasons.list', {});
    $formElement.css('position', 'relative');
    $formElement.append(require('templates').reportReasons({
        reasons: Object.keys(reportReasons)
    }));
    $(document).on('click', '.reportReasons a', function (event) {
        event.preventDefault();
        $text.focus();
        var key = $(this).text();
        $text.text(reportReasons[key]);
    });
}