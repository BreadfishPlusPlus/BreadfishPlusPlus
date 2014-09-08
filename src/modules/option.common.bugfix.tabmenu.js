"use strict";
var $           = require('lib/jquery');
var storage     = require('../storage');
var utils       = require('../utils');
var register    = require("../settings").register;

register({
    'key': 'option.common.bugfix.tabmenu.enabled',
    'name': 'Tabmenu',
    'tab': 'Einstellungen',
    'subtab': 'Allgemeine Einstellungen',
    'category': 'Fehlerbehebungen',
    'type': 'toggle',
    'default': false,
    'description': 'Behebt den Fehler im Tumek Design, bei dem die Schrift im Tabmenu nur schwer erkennbar ist. Mehr Informationen zu diesem Fehler findest du hier: <a target="_blank" href="http://sa-mp.de/B++/p1662628-/">Manglhafte Farbwahl beim neuen Design</a>.'
});

if (storage.get('option.common.bugfix.tabmenu.enabled', false)) {
    if ($('head').html().indexOf('href="http://forum.sa-mp.de/wcf/style/style-8.css"') >= 0) {
        require('./../styles/tabmenuBugfix.less');
    }
}