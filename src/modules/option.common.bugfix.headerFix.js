"use strict";
var $           = require('lib/jquery');
var storage     = require('../storage');
var register    = require("../settings").register;

register({
    'key': 'option.common.bugfix.headerFix.enabled',
    'name': 'Header-Fix',
    'tab': 'Einstellungen',
    'subtab': 'Allgemeine Einstellungen',
    'category': 'Fehlerbehebungen',
    'type': 'toggle',
    'default': false,
    'description': 'Behebt den Fehler im Header-Fix Stil, bei dem die Breadcrumbs verschwinden. Mehr Informationen zu diesem Fehler findest du hier: <a target="_blank" href="http://sa-mp.de/B++/p1643494-/">Header Fix buggt</a>.'
});
if (storage.get('option.common.bugfix.headerFix.enabled', false)) {
    if ($('head').html().indexOf('href="http://forum.sa-mp.de/wcf/style/style-5.css"') >= 0) {
        require('./../styles/headerfixBugfix.less');
    }
}