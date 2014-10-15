var $               = require('lib/jquery');
var _               = require('lib/underscore');
var moment          = require('lib/moment');
var storage         = require('../storage');
var utils           = require('../utils');
var notification    = require('../ui/notification');
var register        = require('../settings').register;

var showNotification = function (quotes) {
    if (quotes.length > 0) {
        var title = 'Du hast ';
        if (quotes.length === 1) {
            title += 'ein neues Zitat!';
        } else {
            title += quotes.length + ' neue Zitate!';
        }

        _.map(quotes, function (q) {
            return _.extend(q, {
                dateStr: storage.get('option.common.extension.timeago.enabled', false) ? q.moment.from(moment()) : utils.formatWBBTimeFormat(q.moment)
            });
        });

        notification.create({
            title: title,
            message: require('templates').quotePopupContent({
                quotes: quotes
            }),
            icon: 'http://forum.sa-mp.de/wcf/icon/wqmM.png',
            hidedelay: null
        });
    }
};

var checkForNewQuotes = function () {
    $.get('http://forum.sa-mp.de/index.php?page=WQM', function (data) {
        var quotes = [];
        $(data).find('#wqmTab .tableList tr:not(.tableHead)').each(function () {
            var $element = $(this);
            quotes.push({
                'author': $element.find('.new').eq(2).find('a').text().trim(),
                'authorId': parseInt(utils.getParameterByName('userID', $element.find('.new').eq(2).find('a').attr('href')) || '-1', 10),
                'url': $element.find('.new').eq(3).find('a').attr('href'),
                'thread': $element.find('.new').eq(1).find('a').text().trim(),
                'moment': utils.parseWBBTimeFormat($element.find('.columnDate').text().trim()),
            });
        });
        showNotification(quotes);
    });
};

register({
    'key': 'option.common.extension.WQMNotification.enabled',
    'name': 'Alternative Zitat Benachrichtigung',
    'tab': 'Einstellungen',
    'subtab': 'Allgemeine Einstellungen',
    'category': 'Erweiterungen',
    'type': 'toggle',
    'default': false,
    'description': 'Versteckt den Hinweis für neue Zitate, und zeigt diese stattdessen am unteren rechten Bildschirmrand an.<br>Es wird in regelmäßigen Abständen überprüft, ob du eine neues Zitat hast und die Benachrichtigung wird autmatisch aktualisiert.'
});
register({
    'key': 'option.common.extension.WQMNotification.interval',
    'type': 'invis',
    'default': 300000,
});
if (storage.get('option.common.extension.WQMNotification.enabled', false)) {

    $(document).ready(function () {
        $('.info > a[href="http://forum.sa-mp.de/index.php?page=WQM"]').parent('.info').hide();
    });

    setInterval(function () {
        checkForNewQuotes();
    }, storage.get('option.common.extension.WQMNotification.interval', 300000));

    checkForNewQuotes();
}