"use strict";
var $           = require('lib/jquery');
var storage     = require('../storage');
var utils       = require('../utils');
var register    = require("../settings").register;

//Da die Filter fast ausnahmslos einzeiler sind, ist es einfacher diese in eine Datei zusammen zu fassen.

/*
Hilfreichste Antwort
*/

register({
    'key': 'option.posts.filter.bestans.enabled',
    'name': 'Hilfreichste Antwort',
    'tab': 'Einstellungen',
    'subtab': 'Beiträge & Nachrichten',
    'category': 'Filter',
    'type': 'toggle',
    'default': false,
    'description': 'Entfernt die Markierung der hilfreichsten Antwort.'
});

if (storage.get('option.posts.filter.bestans.enabled', false) && utils.isTemplate('tplThread')) {
    require('./../styles/filterBestans.less');
}

/*
Gelöschte Beiträge
*/

register({
    'key': 'option.posts.filter.deleted.enabled',
    'name': 'Gelöschte Beiträge',
    'tab': 'Einstellungen',
    'subtab': 'Beiträge & Nachrichten',
    'category': 'Filter',
    'type': 'toggle',
    'default': false,
    'description': 'Blendet gelöschte Beiträge komplett aus.'
});

if (storage.get('option.posts.filter.deleted.enabled', false) && utils.isTemplate('tplThread')) {
    $('.messageMinimized:not(.quickReply) > .messageInner > img[src="icon/postTrashM.png"]').closest('.messageMinimized').remove();
}

/*
Geschlecht
*/

register({
    'key': 'option.posts.filter.gender.enabled',
    'name': 'Geschlecht',
    'tab': 'Einstellungen',
    'subtab': 'Beiträge & Nachrichten',
    'category': 'Filter',
    'type': 'toggle',
    'default': false,
    'description': 'Blendet das Geschlecht aus.'
});

if (storage.get('option.posts.filter.gender.enabled', false) && utils.isTemplate('tplThread')) {
    $('.userSymbols img[src="wcf/icon/genderMaleS.png"], .userSymbols img[src="wcf/icon/genderFemaleS.png"]').parent('li').remove();
    $('.userCredits').each(function () {
        if ($(this).children().length === 0) {
            $(this).remove();
        }
    });
}

/*
ICQ
*/

register({
    'key': 'option.posts.filter.icq.enabled',
    'name': 'ICQ',
    'tab': 'Einstellungen',
    'subtab': 'Beiträge & Nachrichten',
    'category': 'Filter',
    'type': 'toggle',
    'default': false,
    'description': 'Blendet die Nummer des ICQ-Accounts aus.'
});

if (storage.get('option.posts.filter.icq.enabled', false) && utils.isTemplate('tplThread')) {
    $('.userMessenger img[src="wcf/icon/icqS.png"]').closest('li').remove();
    $('.userCredits').each(function () {
        if ($(this).children().length === 0) {
            $(this).remove();
        }
    });
}

/*
Zusätzlicher Benutzerrang
*/

register({
    'key': 'option.posts.filter.additionalUserrank.enabled',
    'name': 'Zusätzlicher Benutzerrang',
    'tab': 'Einstellungen',
    'subtab': 'Beiträge & Nachrichten',
    'category': 'Filter',
    'type': 'toggle',
    'default': false,
    'description': 'Blendet den zusätzlichen Benutzerrang (falls vorhanden) aus.'
});

if (storage.get('option.posts.filter.additionalUserrank.enabled', false) && utils.isTemplate('tplThread')) {
    $('.messageAuthor').each(function () {
        if ($(this).find('.userRank').length === 2 || ($(this).find('.userRank').length === 1 && storage.get('option.posts.filter.userrank.enabled', false))) {
            $(this).find('.userRank').last().remove();
        }
    });
}

/*
Ignorierte Benutzer
*/

register({
    'key': 'option.posts.filter.ignored.enabled',
    'name': 'Ignorierte Benutzer',
    'tab': 'Einstellungen',
    'subtab': 'Beiträge & Nachrichten',
    'category': 'Filter',
    'type': 'toggle',
    'default': false,
    'description': 'Blendet Beiträge von ignorierten Benutzern komplett aus.'
});

if (storage.get('option.posts.filter.ignored.enabled', false) && utils.isTemplate('tplThread')) {
    $('.messageMinimized:not(.quickReply) > .messageInner > img[src="wcf/icon/warningM.png"]').closest('.messageMinimized').remove();
}

/*
Windows Live
*/

register({
    'key': 'option.posts.filter.msn.enabled',
    'name': 'Windows Live',
    'tab': 'Einstellungen',
    'subtab': 'Beiträge & Nachrichten',
    'category': 'Filter',
    'type': 'toggle',
    'default': false,
    'description': 'Blendet den Windows Live Messenger-Namen aus.'
});

if (storage.get('option.posts.filter.msn.enabled', false) && utils.isTemplate('tplThread')) {
    $('.userMessenger img[src="wcf/icon/msnS.png"]').closest('li').remove();
    $('.userCredits').each(function () {
        if ($(this).children().length === 0) {
            $(this).remove();
        }
    });
}

/*
Origin
*/

register({
    'key': 'option.posts.filter.origin.enabled',
    'name': 'Origin',
    'tab': 'Einstellungen',
    'subtab': 'Beiträge & Nachrichten',
    'category': 'Filter',
    'type': 'toggle',
    'default': false,
    'description': 'Blendet den Originnamen aus.'
});

if (storage.get('option.posts.filter.origin.enabled', false) && utils.isTemplate('tplThread')) {
    $('.userCredits p:contains("Origin: ")').remove();
    $('.userCredits').each(function () {
        if ($(this).children().length === 0) {
            $(this).remove();
        }
    });
}

/*
Beitragscounter
*/

register({
    'key': 'option.posts.filter.postcount.enabled',
    'name': 'Beitragscounter',
    'tab': 'Einstellungen',
    'subtab': 'Beiträge & Nachrichten',
    'category': 'Filter',
    'type': 'toggle',
    'default': false,
    'description': 'Blendet den Beitragscounter aus.'
});

if (storage.get('option.posts.filter.postcount.enabled', false) && utils.isTemplate('tplThread')) {
    $('.userCredits p > a:contains("Beiträge")').parent('p').remove();
    $('.userCredits').each(function () {
        if ($(this).children().length === 0) {
            $(this).remove();
        }
    });
}

/*
PSN ID
*/

register({
    'key': 'option.posts.filter.psnid.enabled',
    'name': 'PSN ID',
    'tab': 'Einstellungen',
    'subtab': 'Beiträge & Nachrichten',
    'category': 'Filter',
    'type': 'toggle',
    'default': false,
    'description': 'Blendet die PSN ID aus.'
});

if (storage.get('option.posts.filter.psnid.enabled', false) && utils.isTemplate('tplThread')) {
    $('.userCredits p:contains("PSN ID: ")').remove();
    $('.userCredits').each(function () {
        if ($(this).children().length === 0) {
            $(this).remove();
        }
    });
}

/*
Registrierungsdatum
*/

register({
    'key': 'option.posts.filter.regdate.enabled',
    'name': 'Registrierungsdatum',
    'tab': 'Einstellungen',
    'subtab': 'Beiträge & Nachrichten',
    'category': 'Filter',
    'type': 'toggle',
    'default': false,
    'description': 'Blendet das Registrierungsdatum aus.'
});

if (storage.get('option.posts.filter.regdate.enabled', false) && utils.isTemplate('tplThread')) {
    $('.userCredits p:contains("Registrierungsdatum: ")').remove();
    $('.userCredits').each(function () {
        if ($(this).children().length === 0) {
            $(this).remove();
        }
    });
}

/*
Skype
*/

register({
    'key': 'option.posts.filter.skype.enabled',
    'name': 'Skype',
    'tab': 'Einstellungen',
    'subtab': 'Beiträge & Nachrichten',
    'category': 'Filter',
    'type': 'toggle',
    'default': false,
    'description': 'Blendet den Skype-Namen aus.'
});

if (storage.get('option.posts.filter.skype.enabled', false) && utils.isTemplate('tplThread')) {
    $('.userMessenger img[src="wcf/icon/skypeS.png"]').closest('li').remove();
    $('.userCredits').each(function () {
        if ($(this).children().length === 0) {
            $(this).remove();
        }
    });
}

/*
Steam
*/

register({
    'key': 'option.posts.filter.steam.enabled',
    'name': 'Steam',
    'tab': 'Einstellungen',
    'subtab': 'Beiträge & Nachrichten',
    'category': 'Filter',
    'type': 'toggle',
    'default': false,
    'description': 'Blendet den Steamnamen aus.'
});

if (storage.get('option.posts.filter.steam.enabled', false) && utils.isTemplate('tplThread')) {
    $('.userCredits p:contains("Steam: ")').remove();
    $('.userCredits').each(function () {
        if ($(this).children().length === 0) {
            $(this).remove();
        }
    });
}

/*
Bedankomat
*/

register({
    'key': 'option.posts.filter.thanko.enabled',
    'name': 'Bedankomat',
    'tab': 'Einstellungen',
    'subtab': 'Beiträge & Nachrichten',
    'category': 'Filter',
    'type': 'toggle',
    'default': false,
    'description': 'Blendet den Bedankomat in Beiträgen aus.'
});

if (storage.get('option.posts.filter.thanko.enabled', false) && utils.isTemplate('tplThread')) {
    $('li.postThankButton, .thankStats').remove();
}

/*
Benutzerrang
*/


register({
    'key': 'option.posts.filter.userrank.enabled',
    'name': 'Benutzerrang',
    'tab': 'Einstellungen',
    'subtab': 'Beiträge & Nachrichten',
    'category': 'Filter',
    'type': 'toggle',
    'default': false,
    'description': 'Blendet den Benutzerrang aus.'
});

if (storage.get('option.posts.filter.userrank.enabled', false) && utils.isTemplate('tplThread')) {
    $('.messageAuthor').each(function () {
        $(this).find('.userRank').first().remove();
    });
}

/*
Benutzertitel
*/


register({
    'key': 'option.posts.filter.usertitle.enabled',
    'name': 'Benutzertitel',
    'tab': 'Einstellungen',
    'subtab': 'Beiträge & Nachrichten',
    'category': 'Filter',
    'type': 'toggle',
    'default': false,
    'description': 'Blendet den Benutzertitel aus.'
});

if (storage.get('option.posts.filter.usertitle.enabled', false) && utils.isTemplate('tplThread')) {
    $('.userTitle').remove();
}

/*
Website
*/

register({
    'key': 'option.posts.filter.website.enabled',
    'name': 'Website',
    'tab': 'Einstellungen',
    'subtab': 'Beiträge & Nachrichten',
    'category': 'Filter',
    'type': 'toggle',
    'default': false,
    'description': 'Blendet die Website aus.'
});

if (storage.get('option.posts.filter.website.enabled', false) && utils.isTemplate('tplThread')) {
    $('.userMessenger img[src="wcf/icon/websiteS.png"]').closest('li').remove();
    $('.userCredits').each(function () {
        if ($(this).children().length === 0) {
            $(this).remove();
        }
    });
}

/*
XBL Gamertag
*/

register({
    'key': 'option.posts.filter.xblGamertag.enabled',
    'name': 'XBL Gamertag',
    'tab': 'Einstellungen',
    'subtab': 'Beiträge & Nachrichten',
    'category': 'Filter',
    'type': 'toggle',
    'default': false,
    'description': 'Blendet den XBL Gamertag aus.'
});

if (storage.get('option.posts.filter.xblGamertag.enabled', false) && utils.isTemplate('tplThread')) {
    $('.userCredits p:contains("XBL Gamertag: ")').remove();
    $('.userCredits').each(function () {
        if ($(this).children().length === 0) {
            $(this).remove();
        }
    });
}

/*
Youtube-Videos
*/

register({
    'key': 'option.posts.filter.youtube.enabled',
    'name': 'Youtube-Videos',
    'tab': 'Einstellungen',
    'subtab': 'Beiträge & Nachrichten',
    'category': 'Filter',
    'type': 'toggle',
    'default': false,
    'description': 'Entfernt Youtube-Videos aus Beiträgen und Signaturen und ersetzt sie stattdessen mit dem Link zum jeweiligen Video.'
});

if (storage.get('option.posts.filter.youtube.enabled', false) && utils.isTemplate('tplThread')) {
    $('.message:not(.quickReply):not(.deleted) .messageContentInner object').each(function () {
        var $object = $(this),
            videoId = $object.attr('data').substr(-17, 11);
        $object.replaceWith('<a href="http://www.youtube.com/watch?v=' + videoId + '" class="externalURL">http://www.youtube.com/watch?v=' + videoId + '</a>');
    });
}