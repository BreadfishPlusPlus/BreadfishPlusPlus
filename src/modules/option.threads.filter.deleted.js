"use strict";
var $           = require('lib/jquery');
var storage     = require('../storage');
var utils       = require('../utils');
var register    = require("../settings").register;

register({
    'key': 'option.threads.filter.deleted.enabled',
    'name': 'Gelöschte Themen',
    'tab': 'Einstellungen',
    'subtab': 'Themenübersicht',
    'category': 'Filter',
    'type': 'toggle',
    'default': false,
    'description': 'Blendet gelöschte Themen komplett aus.'
});

if (storage.get('option.threads.filter.deleted.enabled', false) && utils.isTemplate('tplBoard')) {
    $('#normalThreadsStatus tbody > tr .columnIcon > img[src*="Trash"]').closest('tr').remove();

    setTimeout(function () {
        $('#normalThreadsStatus tbody > tr').each(function (index) {
            $(this).attr('class', (index % 2 === 0) ? 'container-1' : 'container-2');
        });
    }, 1000);
}