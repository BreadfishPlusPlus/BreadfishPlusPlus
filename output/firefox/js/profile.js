// ==UserScript==
// @name        Profile
// @namespace   BreadfishPlusPlus
// @include     http://forum.sa-mp.de/*
// @exclude     http://forum.sa-mp.de/acp/*
// @all-frames  false
// ==/UserScript==
/*jslint nomen: true*/
/*global kango, $, BPPUtils*/

BPPUtils.ready(function () {
    "use strict";

    //Filter: Danksagungen
    kango.invokeAsync('kango.storage.getItem', 'option_profile_filter_thanks', function (enabled) {
        if (enabled && BPPUtils.isTemplate('tplUserProfile')) {
            $('#profileContent ul li a img[src="icon/thankM.png"]').closest('li').remove();
        }
    });

    //Filter: Beitragscounter
    kango.invokeAsync('kango.storage.getItem', 'option_profile_filter_postcount', function (enabled) {
        if (enabled && BPPUtils.isTemplate('tplUserProfile')) {
            $('ul.dataList > li .containerContent > .smallFont:contains(Beiträge)').closest('li').remove();
            $('.subHeadline > a:contains("Beiträge")').siblings('span').remove();
        }
    });

    //Filter: Benutzertitel
    kango.invokeAsync('kango.storage.getItem', 'option_profile_filter_usertitle', function (enabled) {
        if (enabled && BPPUtils.isTemplate('tplUserProfile')) {
            $('.userPersonals .userTitle').remove();
        }
    });

    //Filter: Benutzerrang
    kango.invokeAsync('kango.storage.getItem', 'option_profile_filter_userrank', function (enabled) {
        if (enabled && BPPUtils.isTemplate('tplUserProfile')) {
            $('.userPersonals .userRank').first().remove();
        }
    });

    //Filter: Zusätzlicher Benutzerrang
    kango.invokeAsync('kango.storage.getItem', 'option_profile_filter_additionalUserrank', function (enabled) {
        if (enabled && BPPUtils.isTemplate('tplUserProfile')) {
            $('.userPersonals .userRank').last().remove();
        }
    });

    //Filter: Geschlecht
    kango.invokeAsync('kango.storage.getItem', 'option_profile_filter_gender', function (enabled) {
        if (enabled && BPPUtils.isTemplate('tplUserProfile')) {
            $('ul.dataList > li.formElement > .formFieldLabel:contains(Geschlecht)').closest('li').remove();
        }
    });

    //Filter: Registrierungsdatum
    kango.invokeAsync('kango.storage.getItem', 'option_profile_filter_regdate', function (enabled) {
        if (enabled && BPPUtils.isTemplate('tplUserProfile')) {
            $('ul.dataList > li .containerContent > .smallFont:contains(Registrierungsdatum)').closest('li').remove();
        }
    });

    //Filter: Über Mich
    kango.invokeAsync('kango.storage.getItem', 'option_profile_filter_aboutMe', function (enabled) {
        if (enabled && BPPUtils.isTemplate('tplUserProfile')) {
            var $subH = $('h3.subHeadline:contains(Über mich)');
            $subH.parent('.contentBox').find('> .dataList').remove();
            $subH.parent('.contentBox').find('.signature').css('border-top', 'none');
            $subH.remove();
        }
    });

    //Filter: Geburtstag
    kango.invokeAsync('kango.storage.getItem', 'option_profile_filter_aboutMe', function (enabled) {
        if (enabled && BPPUtils.isTemplate('tplUserProfile')) {
            $('ul.dataList > li.formElement > .formFieldLabel:contains(Geburtstag)').closest('li').remove();
        }
    });

    //Filter: Wohnort
    kango.invokeAsync('kango.storage.getItem', 'option_profile_filter_location', function (enabled) {
        if (enabled && BPPUtils.isTemplate('tplUserProfile')) {
            $('ul.dataList > li.formElement > .formFieldLabel:contains(Wohnort)').closest('li').remove();
        }
    });

    //Filter: Beruf
    kango.invokeAsync('kango.storage.getItem', 'option_profile_filter_occupation', function (enabled) {
        if (enabled && BPPUtils.isTemplate('tplUserProfile')) {
            $('ul.dataList > li.formElement > .formFieldLabel:contains(Beruf)').closest('li').remove();
        }
    });

    //Filter: Hobbys
    kango.invokeAsync('kango.storage.getItem', 'option_profile_filter_hobbys', function (enabled) {
        if (enabled && BPPUtils.isTemplate('tplUserProfile')) {
            $('ul.dataList > li.formElement > .formFieldLabel:contains(Hobbys)').closest('li').remove();
        }
    });

    //Filter: Teamspeak UID
    kango.invokeAsync('kango.storage.getItem', 'option_profile_filter_tsuid', function (enabled) {
        if (enabled && BPPUtils.isTemplate('tplUserProfile')) {
            $('ul.dataList > li.formElement > .formFieldLabel:contains(Teamspeak UID)').closest('li').remove();
        }
    });

    //Filter: XBL Gamertag
    kango.invokeAsync('kango.storage.getItem', 'option_profile_filter_xblGamertag', function (enabled) {
        if (enabled && BPPUtils.isTemplate('tplUserProfile')) {
            $('ul.dataList > li.formElement > .formFieldLabel:contains(XBL Gamertag)').closest('li').remove();
        }
    });

    //Filter: PSN ID
    kango.invokeAsync('kango.storage.getItem', 'option_profile_filter_psnid', function (enabled) {
        if (enabled && BPPUtils.isTemplate('tplUserProfile')) {
            $('ul.dataList > li.formElement > .formFieldLabel:contains(PSN ID)').closest('li').remove();
        }
    });

    //Filter: Steam
    kango.invokeAsync('kango.storage.getItem', 'option_profile_filter_steam', function (enabled) {
        if (enabled && BPPUtils.isTemplate('tplUserProfile')) {
            $('ul.dataList > li.formElement > .formFieldLabel:contains(Steam)').closest('li').remove();
        }
    });

    //Filter: Origin
    kango.invokeAsync('kango.storage.getItem', 'option_profile_filter_origin', function (enabled) {
        if (enabled && BPPUtils.isTemplate('tplUserProfile')) {
            $('ul.dataList > li.formElement > .formFieldLabel:contains(Origin)').closest('li').remove();
        }
    });

    //Filter: Website
    kango.invokeAsync('kango.storage.getItem', 'option_profile_filter_website', function (enabled) {
        if (enabled && BPPUtils.isTemplate('tplUserProfile')) {
            $('ul.twoRows > li > a > .smallFont:contains(Website)').closest('li').remove();
        }
    });

    //Filter: ICQ
    kango.invokeAsync('kango.storage.getItem', 'option_profile_filter_icq', function (enabled) {
        if (enabled && BPPUtils.isTemplate('tplUserProfile')) {
            $('ul.twoRows > li > a > .smallFont:contains(ICQ)').closest('li').remove();
        }
    });

    //Filter: Windows Live
    kango.invokeAsync('kango.storage.getItem', 'option_profile_filter_msn', function (enabled) {
        if (enabled && BPPUtils.isTemplate('tplUserProfile')) {
            $('ul.twoRows > li > a > .smallFont:contains(Windows Live)').closest('li').remove();
        }
    });

    //Filter: Skype
    kango.invokeAsync('kango.storage.getItem', 'option_profile_filter_skype', function (enabled) {
        if (enabled && BPPUtils.isTemplate('tplUserProfile')) {
            $('ul.twoRows > li > a > .smallFont:contains(Skype)').closest('li').remove();
        }
    });
});