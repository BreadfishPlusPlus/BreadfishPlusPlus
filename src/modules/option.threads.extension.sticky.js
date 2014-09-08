"use strict";
var $           = require('lib/jquery');
var storage     = require('../storage');
var utils       = require('../utils');
var register    = require("../settings").register;

register({
    'key': 'option.threads.extension.sticky.enabled',
    'name': 'Ankündigungen und wichtige Themen trennen',
    'tab': 'Einstellungen',
    'subtab': 'Themenübersicht',
    'category': 'Erweiterungen',
    'type': 'toggle',
    'default': false,
    'description': 'Trennt Ankündigungen und wichtige Themen voneinander.'
});

if (storage.get('option.threads.extension.sticky.enabled', false) && utils.isTemplate('tplBoard')) {
    $('#topThreadsStatus').siblings('.titleBarPanel').first().find('.containerHead .containerContent h3').text('Ankündigungen');
    var announcementCount = $('#topThreadsStatus .columnIcon > img[src*="Announcement"]').length,
        importantThreadsCount = $('#topThreadsStatus .columnIcon > img[src*="Important"]').length;
    if (importantThreadsCount > 0) {
        $(require('templates').importantThreadsHeader()).insertAfter($('#topThreadsStatus tbody tr').eq(announcementCount - 1));
    }
}