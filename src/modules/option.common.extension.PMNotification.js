/*jslint nomen: true, unparam: true*/
/*global async, unsafeWindow*/
"use strict";

var $                   = require('lib/jquery');
var _                   = require('lib/underscore');
var moment              = require('lib/moment');
var desktopnotify       = require('lib/desktopnotify');
var utils               = require('../utils');
var notification        = require('../ui/notification');
var storage             = require('../storage');
var register            = require("../settings").register;
var messageCache        = [];
var forbiddenFolders    = [
    'http://forum.sa-mp.de/index.php?page=PMList&folderID=0', //Posteingang
    'http://forum.sa-mp.de/index.php?page=PMList&folderID=-1', //Postausgang
    'http://forum.sa-mp.de/index.php?page=PMList&folderID=-2', //Entwürfe
    'http://forum.sa-mp.de/index.php?page=PMList&folderID=-3', //Papierkorb
    'http://forum.sa-mp.de/index.php?form=PMFolderEdit', //Ordner verwalten
    'http://forum.sa-mp.de/index.php?page=PMRuleList' //Regeln verwalten
];
var getDocFromUrl, getMessagesFromDoc, checkForNewMessage, generateNotification;

getDocFromUrl = function (url, fn) {
    $.ajax({
        type: 'GET',
        url: url
    }).done(function (doc) {
        fn(null, doc);
    }).fail(function (jqXHR, textStatus) {
        fn(textStatus, null);
    });
};

getMessagesFromDoc = function (doc, fn) {
    var messages = [];
    $(doc).find('.tableList tr > .columnTitle.new').each(function () {
        var $element = $(this),
            $tr = $element.parent('tr'),
            pmId = parseInt(utils.getParameterByName('pmID', $element.find('a').attr('href')), 10);
        if (messageCache.indexOf(pmId) === -1) {
            messages.push({
                'title': $element.find('a').text(),
                'text': $element.attr('title'),
                'author': $tr.find('.columnAuthor p').text().trim(),
                'authorID': parseInt(utils.getParameterByName('userID', $tr.find('.columnAuthor a').attr('href')) || "-1", 10),
                'moment': utils.parseWBBTimeFormat($tr.find('.columnDate > p').text().split('\n')[0].trim()),
                'id': pmId
            });
            messageCache.push(pmId);
        }
    });
    fn(null, messages);
};

generateNotification = function (messages) {
    var title = 'Du hast ' + messages.length + ' neue Nachricht';
    if (messages.length !== 1) {
        title += 'en';
    }
    title += '!';

    _.map(messages, function (msg) {
        return _.extend(msg, {
            dateStr: storage.get('option.common.extension.timeago.enabled', false) ? msg.moment.from(moment()) : utils.formatWBBTimeFormat(msg.moment)
        });
    });
    notification.create({
        title: title,
        message: require('templates').privateMessagePopupContent({
            messages: messages
        }),
        icon: 'http://forum.sa-mp.de/wcf/icon/pmUnreadM.png',
        hidedelay: null
    });

    //Desktop
    if (!utils.getWindow().document.hasFocus()) {
        desktopnotify.createNotification('Neue nachricht' + (messages.length !== 1 ? 'en!' : '!'), {
            body: title.slice(0, -1) + ' auf SA-MP.de!',
            icon: 'http://cdn.breadfishplusplus.eu/img/breadfish48.png',
            tag: 'b++' + Date.now()
        });
    }
};

checkForNewMessage = function (folderId) {
    $.get("http://forum.sa-mp.de/index.php?page=PMList&folderID=" + folderId, function (data) {
        var folders = [];
        $(data).find('.pmFolders .pageMenu ul li a').each(function () {
            if (forbiddenFolders.indexOf($(this).attr('href')) === -1) {
                folders.push($(this).attr('href'));
            }
        });

        async.map(folders, getDocFromUrl, function (err, docs) {
            docs.push(data);
            async.map(docs, getMessagesFromDoc, function (err, results) {
                var messages = _.flatten(results);
                utils.log.debug('PMNotification.checkForNewMessage', err, messages);
                if (messages.length > 0) {
                    generateNotification(messages);
                }
            });
        });
    });
};

register({
    'key': 'option.common.extension.PMNotification.enabled',
    'name': 'Alternative PN Benachrichtigung',
    'tab': 'Einstellungen',
    'subtab': 'Allgemeine Einstellungen',
    'category': 'Erweiterungen',
    'type': 'toggle',
    'default': false,
    'description': 'Versteckt den Hinweis auf neue Private Nachrichten, und zeigt ihn stattdessen am unteren rechten Bildschirmrand an.<br>Es wird in regelmäßigen Abständen überprüft, ob du eine neue PN hast und die Benachrichtigung wird autmatisch aktualisiert.'
});
register({
    'key': 'option.common.extension.PMNotification.desktop',
    'name': 'Desktopbenachrichtigung bei neuer PN',
    'tab': 'Einstellungen',
    'subtab': 'Allgemeine Einstellungen',
    'category': 'Erweiterungen',
    'type': 'toggle',
    'default': false,
    'description': 'Sendet <u>zusätzlich</u> zur Alternative PN Benachrichtigung eine Desktopbenachrichtigung.'
});
register({
    'key': 'option.common.extension.PMNotification.interval',
    'type': 'invis',
    'default': 300000,
});

if (storage.get('option.common.extension.PMNotification.enabled', false)) {
    if (storage.get('option.common.extension.PMNotification.desktop', false)) {
        if (desktopnotify.permissionLevel() === desktopnotify.PERMISSION_DEFAULT) {
            desktopnotify.requestPermission();
        }
    }

    $(document).ready(function () {
        $('#pmOutstandingNotifications').hide();
    });

    setInterval(function () {
        checkForNewMessage(0);
    }, storage.get('option.common.extension.PMNotification.interval', 300000));

    checkForNewMessage(0);
}