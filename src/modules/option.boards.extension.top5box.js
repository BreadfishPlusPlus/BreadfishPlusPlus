var $           = require('lib/jquery');
var utils       = require('../utils');
var storage     = require('../storage');
var register    = require('../settings').register;

register({
    'key': 'option.boards.extension.top5box.enabled',
    'name': '"Die letzten 10 Beiträge"-Aktualisierung',
    'tab': 'Einstellungen',
    'subtab': 'Forenübersicht',
    'category': 'Erweiterungen',
    'type': 'toggle',
    'default': false,
    'description': 'Aktualisiert die "Die letzten 10 Beiträge"-Box auf der Startseite automatisch in regelmäßigen abständen.'
});
register({
    'key': 'option.boards.extension.top5box.refreshInterval',
    'type': 'invis',
    'default': 60000,
});

if (storage.get('option.boards.extension.top5box.enabled', false) && utils.isTemplate('tplIndex')) {

    var refreshPostsInterval, refreshTitlebarInterval;

    var refreshInterval = storage.get('option.boards.extension.top5box.refreshInterval', 60000);

    var $top5box = $('.top5box');

    var lastRefresh = Date.now();

    var $top5 = $('#top5');

    $top5box.find('.containerContent').append($(require('templates').top5box()));

    var $top5boxrefresh = $('#top5boxrefresh');

    var refreshPosts = function () {
        utils.log.debug('Die letzten 10 Beiträge werden aktualisiert...');
        clearInterval(refreshPostsInterval);

        $.get('http://forum.sa-mp.de/breadfish-de-die-deutschsprachige-gta-community').done(function (response) {
            var $data = $(response);
            $top5.html($data.find('#top5').html());

            refreshPostsInterval = setInterval(refreshPosts, refreshInterval);
            lastRefresh = Date.now();

            utils.log.debug('Die letzten 10 Beiträge wurden aktualisiert!');
        });
    };

    var refreshTitlebar = function () {
        var remain = Math.round((lastRefresh + refreshInterval - Date.now()) / 1000);
        $top5boxrefresh.find('span').text(remain);
    };

    $('#top5boxrefresh a').click(function (event) {
        event.preventDefault();
        refreshPosts();
    });

    refreshTitlebar();

    refreshPostsInterval = setInterval(refreshPosts, refreshInterval);

    refreshTitlebarInterval = setInterval(refreshTitlebar, 1000);
}
