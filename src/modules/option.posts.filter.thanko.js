"use strict";
var $           = require('lib/jquery');
var storage     = require('../storage');
var utils       = require('../utils');
var register    = require("../settings").register;

register({
    'key': 'option.posts.filter.thanko.enabled',
    'name': 'Bedankomat',
    'tab': 'Einstellungen',
    'subtab': 'Beiträge & Nachrichten',
    'category': 'Filter',
    'type': 'toggle',
    'default': false,
    'description': 'Blendet den Bedankomat in Beiträgen aus.'
});

if (storage.get('option.posts.filter.thanko.enabled', false) && utils.isTemplate('tplThread')) {
    $('li.postThankButton, .thankStats').remove();
}