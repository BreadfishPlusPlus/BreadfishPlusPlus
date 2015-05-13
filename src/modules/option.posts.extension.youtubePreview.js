var $           = require('lib/jquery');
var moment      = require('lib/moment');
var storage     = require('../storage');
var utils       = require('../utils');
var register    = require('../settings').register;

register({
    'key': 'option.posts.extension.youtubePreview.enabled',
    'name': 'Youtube Vorschau',
    'tab': 'Einstellungen',
    'subtab': 'Beiträge & Nachrichten',
    'category': 'Erweiterungen',
    'type': 'toggle',
    'default': false,
    'description': 'Ersetzt Youtube-Videos durch eine Vorschau-Box mit Informationen zu dem Video.'
});
register({
    'key': 'option.posts.filter.youtube.enabled',
    'type': 'invis',
    'default': false,
});
if (storage.get('option.posts.extension.youtubePreview.enabled', false) && utils.isTemplate('tplThread') && !storage.get('option.posts.filter.youtube.enabled', false)) {
    require('../styles/youtubePreview.less');
    var width = $('.message:not(.quickReply):not(.deleted) .messageBody > div').first().width(),
        formatTime,
        pad;
    pad = function (num) {
        var s = '0' + num;
        return s.substr(s.length - 2);
    };
    formatTime = function (secNum) {
        var hours = Math.floor(secNum / 3600),
            minutes = Math.floor((secNum - (hours * 3600)) / 60),
            seconds = secNum - (hours * 3600) - (minutes * 60),
            time = '';

        if (hours > 0) {
            time += (hours + ':');
            time += (pad(minutes, 2) + ':');
        } else {
            time += (minutes + ':');
        }
        time += pad(seconds, 2);
        return time;
    };
    $('.message:not(.quickReply):not(.deleted) .messageContentInner object').each(function () {
        var $object = $(this),
            videoId = $object.attr('data').substr(-17, 11);

        $object.attr('id', 'object-' + videoId);
        $object.hide();

        $.getJSON('https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet,statistics&id=' + videoId + window.atob('JmtleT1BSXphU3lCN25lRTE5YzY5MGtFWktETUNrUG40QXNURUVJMkJmbGM='), function (data) {

            var $preview = $(require('templates').youtubePreview({
                'thumbnail': data.items[0].snippet.thumbnails.default.url,
                'title': data.items[0].snippet.title,
                'author': data.items[0].snippet.channelTitle,
                'uploadTime': moment(data.items[0].snippet.publishedAt).format('dddd, Do MMM YYYY, HH:mm [Uhr]'),
                'length': formatTime(moment.duration(data.items[0].contentDetails.duration).asSeconds()),
                'clicks': data.items[0].statistics.viewCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.'),
                'videoId': videoId
            }));
            $object.replaceWith($preview);
            $preview.find('.bpp-youtube-preview-link').click(function (e) {
                e.preventDefault();
                $preview.replaceWith('<iframe width="' + width + '" height="' + (width / 16 * 9) + '" src="//www.youtube-nocookie.com/embed/' + videoId + '?rel=0" frameborder="0" allowfullscreen></iframe>');
            });
            utils.log.debug('youtubePreview ' + videoId, data);
        }).fail(function (jqXHR, stauts, errorThrown) {
            $object.show();
            utils.log.error('Konnte keine Daten von gdata.youtube.com abrufen.', stauts, errorThrown);
        });
    });
}