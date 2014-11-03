var $           = require('lib/jquery');
var moment      = require('lib/moment');
var utils       = require('../utils');
var storage     = require('../storage');
var register    = require('../settings').register;

register({
    'key': 'option.boards.extension.ts3viewer.enabled',
    'name': 'Teamspeak 3 Anzeige',
    'tab': 'Einstellungen',
    'subtab': 'Forenübersicht',
    'category': 'Erweiterungen',
    'type': 'toggle',
    'default': false,
    'description': 'Fügt auf der Startseite eine Infobox hinzu, welche anzeigt wer gerade auf dem Teamspeak server ist.'
});

if (storage.get('option.boards.extension.ts3viewer.enabled', false)) {
    if (utils.isTemplate('tplIndex')) {
        $.ajax({
            type: 'GET',
            url: 'https://breadfishts.maddin.ga/',
            dataType: 'JSON',
            success: function (data) {
                var $ts3viewer = $(require('templates').ts3Viewer({
                    ts3data: data,
                    nickname: $('#userNote a').text(),
                    uptime: utils.humanReadableTimespan(data.uptime * 1000),
                    lastUpdateTime: utils.formatWBBTimeFormat(moment(data.lastUpdate), true)
                }));
                $ts3viewer.prependTo('.border.infoBox');

                $('.infoBox > div').each(function (index) {
                    $(this).removeClass('container-1').removeClass('container-2').addClass('container-' + ((index % 2) + 1));
                });
            }
        });
    }
}