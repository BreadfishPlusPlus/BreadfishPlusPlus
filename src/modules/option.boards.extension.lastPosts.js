var $           = require('lib/jquery');
var storage     = require('../storage');
var utils       = require('../utils');
var register    = require('../settings').register;

register({
    'key': 'option.boards.extension.lastPosts.count',
    'name': 'Die letzten X Beiträge',
    'tab': 'Einstellungen',
    'subtab': 'Forenübersicht',
    'category': 'Erweiterungen',
    'type': 'range',
    'default': 10,
    'min': 0,
    'max': 10,
    'description': 'Passt die Anzahl der "Letzte X Beiträge"-Box auf der Startseite an. "0" Entfernt die Box komplett.'
});

if (utils.isTemplate('tplIndex')) {
    var lastPostsCount = storage.get('option.boards.extension.lastPosts.count', 10);
    if (lastPostsCount > 0) {
        $('.top5box .tableList tr').slice(lastPostsCount, 10).remove();
        $('.top5box .containerContent').html('<img src="icon/postS.png"> Die letzten ' + lastPostsCount + ' Beiträge');
    } else {
        $('.top5box').remove();
    }
}