// ==UserScript==
// @name        Profile
// @namespace   BreadfishPlusPlus
// @include     http://forum.sa-mp.de/*
// @exclude     http://forum.sa-mp.de/acp/*
// @all-frames  false
// @run-at      document-start
// ==/UserScript==
/*jslint nomen: true*/
/*global $, BPPUtils*/

BPPUtils.load(function () {
    "use strict";

    //Filter: Danksagungen
    if (BPPUtils.storage.get('option.profile.filter.thanks', false) && BPPUtils.isTemplate('tplUserProfile')) {
        $('#profileContent ul li a img[src="icon/thankM.png"]').closest('li').remove();
    }

    //Filter: Beitragscounter
    if (BPPUtils.storage.get('option.profile.filter.postcount', false) && BPPUtils.isTemplate('tplUserProfile')) {
        $('ul.dataList > li .containerContent > .smallFont:contains(Beiträge)').closest('li').remove();
        $('.subHeadline > a:contains("Beiträge")').siblings('span').remove();
    }

    //Filter: Benutzertitel
    if (BPPUtils.storage.get('option.profile.filter.usertitle', false) && BPPUtils.isTemplate('tplUserProfile')) {
        $('.userPersonals .userTitle').remove();
    }

    //Filter: Benutzerrang
    if (BPPUtils.storage.get('option.profile.filter.userrank', false) && BPPUtils.isTemplate('tplUserProfile')) {
        $('.userPersonals .userRank').first().remove();
    }

    //Filter: Zusätzlicher Benutzerrang
    if (BPPUtils.storage.get('option.profile.filter.additionalUserrank', false) && BPPUtils.isTemplate('tplUserProfile')) {
        $('.userPersonals .userRank').last().remove();
    }

    //Filter: Geschlecht
    if (BPPUtils.storage.get('option.profile.filter.gender', false) && BPPUtils.isTemplate('tplUserProfile')) {
        $('ul.dataList > li.formElement > .formFieldLabel:contains(Geschlecht)').closest('li').remove();
    }

    //Filter: Registrierungsdatum
    if (BPPUtils.storage.get('option.profile.filter.regdate', false) && BPPUtils.isTemplate('tplUserProfile')) {
        $('ul.dataList > li .containerContent > .smallFont:contains(Registrierungsdatum)').closest('li').remove();
    }

    //Filter: Über Mich
    if (BPPUtils.storage.get('option.profile.filter.aboutMe', false) && BPPUtils.isTemplate('tplUserProfile')) {
        var $subH = $('h3.subHeadline:contains(Über mich)');
        $subH.parent('.contentBox').find('> .dataList').remove();
        $subH.parent('.contentBox').find('.signature').css('border-top', 'none');
        $subH.remove();
    }

    //Filter: Geburtstag
    if (BPPUtils.storage.get('option.profile.filter.aboutMe', false) && BPPUtils.isTemplate('tplUserProfile')) {
        $('ul.dataList > li.formElement > .formFieldLabel:contains(Geburtstag)').closest('li').remove();
    }

    //Filter: Wohnort
    if (BPPUtils.storage.get('option.profile.filter.location', false) && BPPUtils.isTemplate('tplUserProfile')) {
        $('ul.dataList > li.formElement > .formFieldLabel:contains(Wohnort)').closest('li').remove();
    }

    //Filter: Beruf
    if (BPPUtils.storage.get('option.profile.filter.occupation', false) && BPPUtils.isTemplate('tplUserProfile')) {
        $('ul.dataList > li.formElement > .formFieldLabel:contains(Beruf)').closest('li').remove();
    }

    //Filter: Hobbys
    if (BPPUtils.storage.get('option.profile.filter.hobbys', false) && BPPUtils.isTemplate('tplUserProfile')) {
        $('ul.dataList > li.formElement > .formFieldLabel:contains(Hobbys)').closest('li').remove();
    }

    //Filter: Teamspeak UID
    if (BPPUtils.storage.get('option.profile.filter.tsuid', false) && BPPUtils.isTemplate('tplUserProfile')) {
        $('ul.dataList > li.formElement > .formFieldLabel:contains(Teamspeak UID)').closest('li').remove();
    }

    //Filter: XBL Gamertag
    if (BPPUtils.storage.get('option.profile.filter.xblGamertag', false) && BPPUtils.isTemplate('tplUserProfile')) {
        $('ul.dataList > li.formElement > .formFieldLabel:contains(XBL Gamertag)').closest('li').remove();
    }

    //Filter: PSN ID
    if (BPPUtils.storage.get('option.profile.filter.psnid', false) && BPPUtils.isTemplate('tplUserProfile')) {
        $('ul.dataList > li.formElement > .formFieldLabel:contains(PSN ID)').closest('li').remove();
    }

    //Filter: Steam
    if (BPPUtils.storage.get('option.profile.filter.steam', false) && BPPUtils.isTemplate('tplUserProfile')) {
        $('ul.dataList > li.formElement > .formFieldLabel:contains(Steam)').closest('li').remove();
    }

    //Filter: Origin
    if (BPPUtils.storage.get('option.profile.filter.origin', false) && BPPUtils.isTemplate('tplUserProfile')) {
        $('ul.dataList > li.formElement > .formFieldLabel:contains(Origin)').closest('li').remove();
    }

    //Filter: Website
    if (BPPUtils.storage.get('option.profile.filter.website', false) && BPPUtils.isTemplate('tplUserProfile')) {
        $('ul.twoRows > li > a > .smallFont:contains(Website)').closest('li').remove();
    }

    //Filter: ICQ
    if (BPPUtils.storage.get('option.profile.filter.icq', false) && BPPUtils.isTemplate('tplUserProfile')) {
        $('ul.twoRows > li > a > .smallFont:contains(ICQ)').closest('li').remove();
    }

    //Filter: Windows Live
    if (BPPUtils.storage.get('option.profile.filter.msn', false) && BPPUtils.isTemplate('tplUserProfile')) {
        $('ul.twoRows > li > a > .smallFont:contains(Windows Live)').closest('li').remove();
    }

    //Filter: Skype
    if (BPPUtils.storage.get('option.profile.filter.skype', false) && BPPUtils.isTemplate('tplUserProfile')) {
        $('ul.twoRows > li > a > .smallFont:contains(Skype)').closest('li').remove();
    }
});