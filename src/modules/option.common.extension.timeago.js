"use strict";
var $           = require('lib/jquery');
var moment      = require('lib/moment');
var utils       = require('../utils');
var storage     = require('../storage');
var register    = require("../settings").register;

register({
    'key': 'option.common.extension.timeago.enabled',
    'name': 'Relative Zeitangaben',
    'tab': 'Einstellungen',
    'subtab': 'Allgemeine Einstellungen',
    'category': 'Erweiterungen',
    'type': 'toggle',
    'default': false,
    'description': 'Ersetzt die Zeitangaben im Forum. Aus "Heute, 12:34" wird dann z.b "vor 12 Minuten".'
});
if (storage.get('option.common.extension.timeago.enabled', false)) {
    if (utils.isTemplate('tplIndex')) {
        $('.top5box .tableList tr .columnTop5LastPost .smallFont .light, .boardlistLastPost .containerContentSmall .light, .columnLastPost .containerContentSmall .smallFont.light').each(function () {
            var dateStr = $(this).text().substr(1, $(this).text().length - 2);
            $(this).html('(<abbr title="' + dateStr + '">' + utils.parseWBBTimeFormat(dateStr).from(moment()) + '</abbr>)');
        });
    } else if (utils.isTemplate('tplBoard')) {
        $('.boardlistLastPost .containerContentSmall .light, .columnLastPost .containerContentSmall .smallFont.light').each(function () {
            var dateStr = $(this).text().substr(1, $(this).text().length - 2);
            $(this).html('(<abbr title="' + dateStr + '">' + utils.parseWBBTimeFormat(dateStr).from(moment()) + '</abbr>)');
        });
    } else if (utils.isTemplate('tplThread')) {
        $('.message .messageContentInner .messageHeader .containerContent .smallFont.light').each(function () {
            var dateStr = $(this).text();
            $(this).html('<abbr title="' + dateStr + '">' + utils.parseWBBTimeFormat(dateStr).from(moment()) + '</abbr>');
        });
    } else if (utils.isTemplate('tplUserProfile')) {
        //Letzte Aktivität
        var $elem = $('ul.dataList .smallFont:contains(Letzte Aktivität)').parent('.containerContent').find('p').first();
        var dateStr = $elem.text();
        $elem.html('<abbr title="' + dateStr + '">' + utils.parseWBBTimeFormat(dateStr).from(moment()) + '</abbr>');

        //Profilbesucher
        $('.contentBox .containerHead h3:contains(Profilbesucher)').parent('.containerHead').parent('.border').find('.dataList li .containerContent .smallFont.light').each(function () {
            var dateStr = $(this).text();
            $(this).html('<abbr title="' + dateStr + '">' + utils.parseWBBTimeFormat(dateStr).from(moment()) + '</abbr>');
        });

        //Beiträge
        $('.contentBox h3.subHeadline a:contains(Beiträge)').parent('.subHeadline').parent('.contentBox').find('.dataList li .containerContent .smallFont.light').each(function () {
            var dateStr = $(this).text();
            $(this).html('<abbr title="' + dateStr + '">' + utils.parseWBBTimeFormat(dateStr).from(moment()) + '</abbr>');
        });
    }
}