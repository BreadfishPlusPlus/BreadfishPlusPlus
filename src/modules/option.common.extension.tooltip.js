"use strict";
var $           = require('lib/jquery');
var utils       = require('../utils');
var storage     = require('../storage');
var register    = require("../settings").register;

register({
    'key': 'option.common.extension.tooltip.enabled',
    'name': 'Alternative Tooltips',
    'tab': 'Einstellungen',
    'subtab': 'Allgemeine Einstellungen',
    'category': 'Erweiterungen',
    'type': 'toggle',
    'default': false,
    'description': 'Ersetzt die Standard-Browser-Tooltips durch eigene.'
});
register({
    'key': 'option.common.extension.tooltip.showDelay',
    'type': 'invis',
    'default': 1000,
});
register({
    'key': 'option.common.extension.tooltip.hideDelay',
    'type': 'invis',
    'default': 100,
});


if (storage.get('option.common.extension.tooltip.enabled', false)) {
    require('./../styles/tooltip.less');
    $('body').tooltip({
        delay: {
            show: storage.get('option.common.extension.tooltip.showDelay', 1000),
            hide: storage.get('option.common.extension.tooltip.hideDelay', 100)
        },
        html: false,
        placement: 'auto',
        container: 'body',
        selector: '[title]'
    });
    $(document).on('hidden.bs.tooltip', '[title]', function () {
        $(this).css('display', '');
    });
}