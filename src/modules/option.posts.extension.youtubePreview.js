"use strict";
var $           = require('lib/jquery');
var moment      = require('lib/moment');
var storage     = require('../storage');
var utils       = require('../utils');
var register    = require("../settings").register;

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
    var mNames = ['Jan', 'Feb', 'Mrz', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
        width = $('.message:not(.quickReply):not(.deleted) .messageBody > div').first().width(),
        formatTime,
        pad;
    pad = function (num) {
        var s = "0" + num;
        return s.substr(s.length - 2);
    };
    formatTime = function (sec_num) {
        var hours = Math.floor(sec_num / 3600),
            minutes = Math.floor((sec_num - (hours * 3600)) / 60),
            seconds = sec_num - (hours * 3600) - (minutes * 60),
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

        $.getJSON('https://gdata.youtube.com/feeds/api/videos/' + videoId + '?v=2&alt=json', function (data) {
            var $preview = $(require('templates').youtubePreview({
                'thumbnail': data.entry.media$group.media$thumbnail[0].url,
                'title': data.entry.title.$t,
                'author': data.entry.author[0].name.$t,
                "uploadTime": moment(data.entry.media$group.yt$uploaded.$t).format("dddd, Do MMM YYYY, HH:mm [Uhr]"),
                'length': formatTime(data.entry.media$group.yt$duration.seconds),
                'clicks': data.entry.yt$statistics.viewCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
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