var $           = require('lib/jquery');
var storage     = require('../storage');
var utils       = require('../utils');
var register    = require('../settings').register;

register({
    'key': 'option.posts.extension.shorturl.enabled',
    'name': 'Kurz-URL',
    'tab': 'Einstellungen',
    'subtab': 'Beiträge & Nachrichten',
    'category': 'Erweiterungen',
    'type': 'toggle',
    'default': false,
    'description': 'Zeigt in der Beitragsansicht zu jedem Beitrag einen kurzen Link (~25 Zeichen) an, der direkt zum Beitrag führt.'
});
if (storage.get('option.posts.extension.shorturl.enabled', false) && utils.isTemplate('tplThread')) {
    require('../styles/shortUrl.less');
    $('.message:not(.quickReply):not(.deleted)').each(function () {
        var $elem = $(this),
            id = $elem.attr('id').substr(7);
        $elem.find('.messageFooterRight .smallButtons > ul').append(require('templates').shortUrlButton({
            'url': 'http://sa-mp.de/B++/p' + id + '-/'
        }));
    });
    $('.bpp-shorturl').click(function (e) {
        e.preventDefault();
        $(this).find('span').hide();
        $(this).find('input').show().focus().select();
    });
    $('.bpp-shorturl-input').blur(function () {
        $(this).siblings('span').show();
        $(this).hide();
    });
}