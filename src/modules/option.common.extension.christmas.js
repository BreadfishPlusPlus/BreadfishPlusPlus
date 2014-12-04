var $               = require('lib/jquery');
var utils           = require('../utils');
var register        = require('../settings').register;
var storage         = require('../storage');
var notification    = require('../ui/notification');

var isChristmas = function () {
    var d = new Date();
    return d.getMonth() === 11 && (d.getDate() === 24 || d.getDate() === 25 || d.getDate() === 26);
};

var createSnow = function () {
    $('head').append('<style type="text/css">.bpp_snowFlake {text-shadow:rgb(0, 0, 0) 0px 1px 3px;pointer-events:none;}</style>');
    $.getScript('https://cdnjs.cloudflare.com/ajax/libs/Snowstorm/20131208/snowstorm-min.js').done(function () {
        utils.getWindow().snowStorm.className = 'bpp_snowFlake';
    });
};


if (isChristmas()) {
    register({
        'key': 'option.common.extension.snow.enabled',
        'name': 'Schnee',
        'tab': 'Einstellungen',
        'subtab': 'Allgemeine Einstellungen',
        'category': 'Erweiterungen',
        'type': 'toggle',
        'default': true,
        'description': '(De-)Aktiviert den Schnee \\o/'
    });
} else {
    register({
        'key': 'option.common.extension.snow.enabled',
        'type': 'invis',
        'default': true
    });
}
register({
    'key': 'option.common.extension.christmas.notified',
    'type': 'invis',
    'default': false
});

var b0wm = '<pre style="font-weight:bold;">       wow        *      \n' +
'                 ^^^    so happy\n' +
'                ^^^o^              such fest\n' +
'               ^^^o^^^\n' +
'  such b0wm   ^^^^^^^o^\n' +
'             ^o^^^^^^^^^\n' +
'            ^^^^^^^^^^^o^   so weihnachten\n' +
'                  .</pre>' +
'<small>(Du kannst den Schnee in den B++ Einstellungen deaktivieren)</small>';


if (isChristmas() && storage.get('option.common.extension.snow.enabled', false)) {
    createSnow();

    if (!storage.get('option.common.extension.christmas.notified', false)) {
        storage.set('option.common.extension.christmas.notified', true);
        notification.create({
            title: 'B++ wünscht fröhliche Weihnachten!',
            message: b0wm,
            icon: 'http://icons.iconarchive.com/icons/psdblast/flat-christmas/32/santa-icon.png',
            type: 'success',
            hidedelay: null
        });
    }
}