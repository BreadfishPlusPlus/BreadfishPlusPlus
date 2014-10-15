var $           = require('lib/jquery');
var storage     = require('../storage');
var utils       = require('../utils');
var register    = require('../settings').register;

//Da die Filter fast ausnahmslos einzeiler sind, ist es einfacher diese in eine Datei zusammen zu fassen.

/*
Danksagungen
*/

register({
    'key': 'option.profile.filter.thanks.enabled',
    'name': 'Danksagungen',
    'tab': 'Einstellungen',
    'subtab': 'Profil',
    'category': 'Filter',
    'type': 'toggle',
    'default': false,
    'description': 'Blendet die Danksagungen in Benutzerprofilen aus.'
});

if (storage.get('option.profile.filter.thanks.enabled', false) && utils.isTemplate('tplUserProfile')) {
    $('#profileContent ul li a img[src="icon/thankM.png"]').closest('li').remove();
}

/*
Beitragscounter
*/

register({
    'key': 'option.profile.filter.postcount.enabled',
    'name': 'Beitragscounter',
    'tab': 'Einstellungen',
    'subtab': 'Profil',
    'category': 'Filter',
    'type': 'toggle',
    'default': false,
    'description': 'Blendet den Beitragscounter aus.'
});

if (storage.get('option.profile.filter.postcount.enabled', false) && utils.isTemplate('tplUserProfile')) {
    $('ul.dataList > li .containerContent > .smallFont:contains(Beiträge)').closest('li').remove();
    $('.subHeadline > a:contains("Beiträge")').siblings('span').remove();
}

/*
Benutzertitel
*/

register({
    'key': 'option.profile.filter.usertitle.enabled',
    'name': 'Benutzertitel',
    'tab': 'Einstellungen',
    'subtab': 'Profil',
    'category': 'Filter',
    'type': 'toggle',
    'default': false,
    'description': 'Blendet den Benutzertitel aus.'
});

if (storage.get('option.profile.filter.usertitle.enabled', false) && utils.isTemplate('tplUserProfile')) {
    $('.userPersonals .userTitle').remove();
}

/*
Benutzerrang
*/

register({
    'key': 'option.profile.filter.userrank.enabled',
    'name': 'Benutzerrang',
    'tab': 'Einstellungen',
    'subtab': 'Profil',
    'category': 'Filter',
    'type': 'toggle',
    'default': false,
    'description': 'Blendet den Benutzerrang aus.'
});

if (storage.get('option.profile.filter.userrank.enabled', false) && utils.isTemplate('tplUserProfile')) {
    $('.userPersonals .userRank').first().remove();
}

/*
Benutzerrang
*/

register({
    'key': 'option.profile.filter.additionalUserrank.enabled',
    'name': 'Zusätzlicher Benutzerrang',
    'tab': 'Einstellungen',
    'subtab': 'Profil',
    'category': 'Filter',
    'type': 'toggle',
    'default': false,
    'description': 'Blendet den zusätzlichen Benutzerrang (falls vorhanden) aus.'
});

if (storage.get('option.profile.filter.additionalUserrank.enabled', false) && utils.isTemplate('tplUserProfile')) {
    if ($('.userPersonals .userRank').length === 2 || ($('.userPersonals .userRank').length === 1 && storage.get('option.profile.filter.userrank.enabled', false))) {
        $('.userPersonals .userRank').last().remove();
    }
}

/*
Geschlecht
*/

register({
    'key': 'option.profile.filter.gender.enabled',
    'name': 'Geschlecht',
    'tab': 'Einstellungen',
    'subtab': 'Profil',
    'category': 'Filter',
    'type': 'toggle',
    'default': false,
    'description': 'Blendet das Geschlecht aus.'
});

if (storage.get('option.profile.filter.gender.enabled', false) && utils.isTemplate('tplUserProfile')) {
    $('ul.dataList > li.formElement > .formFieldLabel:contains(Geschlecht)').closest('li').remove();
}

/*
Registrierungsdatum
*/

register({
    'key': 'option.profile.filter.regdate.enabled',
    'name': 'Registrierungsdatum',
    'tab': 'Einstellungen',
    'subtab': 'Profil',
    'category': 'Filter',
    'type': 'toggle',
    'default': false,
    'description': 'Blendet das Registrierungsdatum aus.'
});

if (storage.get('option.profile.filter.regdate.enabled', false) && utils.isTemplate('tplUserProfile')) {
    $('ul.dataList > li .containerContent > .smallFont:contains(Registrierungsdatum)').closest('li').remove();
}

/*
Über Mich
*/

register({
    'key': 'option.profile.filter.aboutMe.enabled',
    'name': 'Über Mich',
    'tab': 'Einstellungen',
    'subtab': 'Profil',
    'category': 'Filter',
    'type': 'toggle',
    'default': false,
    'description': 'Blendet den "Über mich"-Block aus.'
});

if (storage.get('option.profile.filter.aboutMe.enabled', false) && utils.isTemplate('tplUserProfile')) {
    var $subH = $('h3.subHeadline:contains(Über mich)');
    $subH.parent('.contentBox').find('> .dataList').remove();
    $subH.parent('.contentBox').find('.signature').css('border-top', 'none');
    $subH.remove();
}

/*
Geburtstag
*/

register({
    'key': 'option.profile.filter.birthday.enabled',
    'name': 'Geburtstag',
    'tab': 'Einstellungen',
    'subtab': 'Profil',
    'category': 'Filter',
    'type': 'toggle',
    'default': false,
    'description': 'Blendet den Geburtstag aus.'
});

if (storage.get('option.profile.filter.birthday.enabled', false) && utils.isTemplate('tplUserProfile')) {
    $('ul.dataList > li.formElement > .formFieldLabel:contains(Geburtstag)').closest('li').remove();
}

/*
Wohnort
*/

register({
    'key': 'option.profile.filter.location.enabled',
    'name': 'Wohnort',
    'tab': 'Einstellungen',
    'subtab': 'Profil',
    'category': 'Filter',
    'type': 'toggle',
    'default': false,
    'description': 'Blendet den Wohnort aus.'
});

if (storage.get('option.profile.filter.location.enabled', false) && utils.isTemplate('tplUserProfile')) {
    $('ul.dataList > li.formElement > .formFieldLabel:contains(Wohnort)').closest('li').remove();
}

/*
Beruf
*/

register({
    'key': 'option.profile.filter.occupation.enabled',
    'name': 'Beruf',
    'tab': 'Einstellungen',
    'subtab': 'Profil',
    'category': 'Filter',
    'type': 'toggle',
    'default': false,
    'description': 'Blendet den Beruf aus.'
});

if (storage.get('option.profile.filter.occupation.enabled', false) && utils.isTemplate('tplUserProfile')) {
    $('ul.dataList > li.formElement > .formFieldLabel:contains(Beruf)').closest('li').remove();
}

/*
Hobbys
*/

register({
    'key': 'option.profile.filter.hobbys.enabled',
    'name': 'Hobbys',
    'tab': 'Einstellungen',
    'subtab': 'Profil',
    'category': 'Filter',
    'type': 'toggle',
    'default': false,
    'description': 'Blendet die Hobbys aus.'
});

if (storage.get('option.profile.filter.hobbys.enabled', false) && utils.isTemplate('tplUserProfile')) {
    $('ul.dataList > li.formElement > .formFieldLabel:contains(Hobbys)').closest('li').remove();
}

/*
Teamspeak UID
*/

register({
    'key': 'option.profile.filter.tsuid.enabled',
    'name': 'Teamspeak UID',
    'tab': 'Einstellungen',
    'subtab': 'Profil',
    'category': 'Filter',
    'type': 'toggle',
    'default': false,
    'description': 'Blendet die Teamspeak UID aus.'
});

if (storage.get('option.profile.filter.tsuid.enabled', false) && utils.isTemplate('tplUserProfile')) {
    $('ul.dataList > li.formElement > .formFieldLabel:contains(Teamspeak UID)').closest('li').remove();
}

/*
XBL Gamertag
*/

register({
    'key': 'option.profile.filter.xblGamertag.enabled',
    'name': 'XBL Gamertag',
    'tab': 'Einstellungen',
    'subtab': 'Profil',
    'category': 'Filter',
    'type': 'toggle',
    'default': false,
    'description': 'Blendet den XBL Gamertag aus.'
});

if (storage.get('option.profile.filter.xblGamertag.enabled', false) && utils.isTemplate('tplUserProfile')) {
    $('ul.dataList > li.formElement > .formFieldLabel:contains(XBL Gamertag)').closest('li').remove();
}

/*
PSN ID
*/

register({
    'key': 'option.profile.filter.psnid.enabled',
    'name': 'PSN ID',
    'tab': 'Einstellungen',
    'subtab': 'Profil',
    'category': 'Filter',
    'type': 'toggle',
    'default': false,
    'description': 'Blendet die PSN ID aus.'
});

if (storage.get('option.profile.filter.psnid.enabled', false) && utils.isTemplate('tplUserProfile')) {
    $('ul.dataList > li.formElement > .formFieldLabel:contains(PSN ID)').closest('li').remove();
}

/*
Steam
*/

register({
    'key': 'option.profile.filter.steam.enabled',
    'name': 'Steam',
    'tab': 'Einstellungen',
    'subtab': 'Profil',
    'category': 'Filter',
    'type': 'toggle',
    'default': false,
    'description': 'Blendet den Steam-Namen aus.'
});

if (storage.get('option.profile.filter.steam.enabled', false) && utils.isTemplate('tplUserProfile')) {
    $('ul.dataList > li.formElement > .formFieldLabel:contains(Steam)').closest('li').remove();
}

/*
Origin
*/

register({
    'key': 'option.profile.filter.origin.enabled',
    'name': 'Origin',
    'tab': 'Einstellungen',
    'subtab': 'Profil',
    'category': 'Filter',
    'type': 'toggle',
    'default': false,
    'description': 'Blendet den Origin-Namen aus.'
});

if (storage.get('option.profile.filter.origin.enabled', false) && utils.isTemplate('tplUserProfile')) {
    $('ul.dataList > li.formElement > .formFieldLabel:contains(Origin)').closest('li').remove();
}

/*
Website
*/

register({
    'key': 'option.profile.filter.website.enabled',
    'name': 'Website',
    'tab': 'Einstellungen',
    'subtab': 'Profil',
    'category': 'Filter',
    'type': 'toggle',
    'default': false,
    'description': 'Blendet die Website aus.'
});

if (storage.get('option.profile.filter.website.enabled', false) && utils.isTemplate('tplUserProfile')) {
    $('ul.twoRows > li > a > .smallFont:contains(Website)').closest('li').remove();
}

/*
ICQ
*/

register({
    'key': 'option.profile.filter.icq.enabled',
    'name': 'ICQ',
    'tab': 'Einstellungen',
    'subtab': 'Profil',
    'category': 'Filter',
    'type': 'toggle',
    'default': false,
    'description': 'Blendet die Nummer des ICQ-Accounts aus.'
});

if (storage.get('option.profile.filter.icq.enabled', false) && utils.isTemplate('tplUserProfile')) {
    $('ul.twoRows > li > a > .smallFont:contains(ICQ)').closest('li').remove();
}

/*
Windows Live
*/

register({
    'key': 'option.profile.filter.msn.enabled',
    'name': 'Windows Live',
    'tab': 'Einstellungen',
    'subtab': 'Profil',
    'category': 'Filter',
    'type': 'toggle',
    'default': false,
    'description': 'Blendet den Windows Live Messenger Namen aus.'
});

if (storage.get('option.profile.filter.msn.enabled', false) && utils.isTemplate('tplUserProfile')) {
    $('ul.twoRows > li > a > .smallFont:contains(Windows Live)').closest('li').remove();
}

/*
Skype
*/

register({
    'key': 'option.profile.filter.skype.enabled',
    'name': 'Skype',
    'tab': 'Einstellungen',
    'subtab': 'Profil',
    'category': 'Filter',
    'type': 'toggle',
    'default': false,
    'description': 'Blendet den Skype-Namen aus.'
});

if (storage.get('option.profile.filter.skype.enabled', false) && utils.isTemplate('tplUserProfile')) {
    $('ul.twoRows > li > a > .smallFont:contains(Skype)').closest('li').remove();
}