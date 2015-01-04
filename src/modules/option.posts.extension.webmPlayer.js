var $           = require('lib/jquery');
var storage     = require('../storage');
var utils       = require('../utils');
var register    = require('../settings').register;

register({
    'key': 'option.posts.extension.webmPlayer.enabled',
    'name': 'WebM Player',
    'tab': 'Einstellungen',
    'subtab': 'Beiträge & Nachrichten',
    'category': 'Erweiterungen',
    'type': 'toggle',
    'default': false,
    'description': 'Zeigt einen eingebetteten Videoplayer für Direktlinks zu WebM-Dateien an.'
});
if (storage.get('option.posts.extension.webmPlayer.enabled', false) && utils.isTemplate('tplThread')) {
    $('.message:not(.quickReply):not(.deleted) .messageBody > div').each(function () {
        $(this).find('a[href$=".webm"]').each(function () {
            var $link = $(this);
            var videoUrl = $link.attr('href');
            var $video = $('<video/>');
            $video.attr('controls', '');
            $video.attr('src', videoUrl);
            if (storage.get('option.common.bugfix.imageResize.enabled', false)) {
                $video.attr('width', $(this).first().closest('div:visible').width());
            }
            $link.before($video);
        });
    });
}