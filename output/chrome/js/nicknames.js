// ==UserScript==
// @name        Nicknames
// @namespace   BreadfishPlusPlus
// @include     http://forum.sa-mp.de/*
// @exclude     http://forum.sa-mp.de/acp/*
// @all-frames  false
// @run-at      document-start
// ==/UserScript==
/*jslint nomen: true*/
/*global kango, $, BPPUtils, alertify, _*/

BPPUtils.load(function () {
    "use strict";
    var updateProfileNickname, updateThreadNickname, updateIndexNickname;

    updateProfileNickname = function (name, nick) {
        document.title = document.title.replace(new RegExp(name, 'i'), nick);

        $('.headlineContainer h2 a').replaceText(name, nick);
        $('.userName > span').replaceText(name, nick);
        $('.twoRows li a img[src="wcf/icon/vCardM.png"]').parent('a').find('span').replaceText(name, nick);
        $('.friendsConnection > h3.light').replaceText(name, nick);

        $('.userName img[src="wcf/icon/onlineS.png"]').replaceAttr('title', name, nick);
        $('.userName img[src="wcf/icon/offlineS.png"]').replaceAttr('title', name, nick);
        $('.userStatus img[src="wcf/icon/genderMaleS.png"]').replaceAttr('title', name, nick);
        $('.userStatus img[src="wcf/icon/genderFemaleS.png"]').replaceAttr('title', name, nick);

        $('ul.dataList .smallFont:contains(Beiträge)').parent('.containerContent').find('a').replaceAttr('title', name, nick);
    };
    updateThreadNickname = function (nickname) {
        $('.messageAuthor .userName a span:contains(' + nickname.name + ')').replaceHtml(nickname.name, nickname.nick);

        $([
            '.messageAuthor .userName a[title="Benutzerprofil von »' + nickname.name + '« aufrufen"]',
            '.userAvatar a[title="Benutzerprofil von »' + nickname.name + '« aufrufen"]',
            '.messageAuthor .userName img[title="»' + nickname.name + '« ist online"]',
            '.messageAuthor .userName img[title="»' + nickname.name + '« ist offline"]',
            '.userSymbols ul li img[title="»' + nickname.name + '« ist männlich"]',
            '.userSymbols ul li img[title="»' + nickname.name + '« ist weiblich"]',
            '.userSymbols ul li img[title="»' + nickname.name + '« ist der Autor dieses Themas"]',
            '.userMessenger ul li a img[title="Persönliche Website von »' + nickname.name + '« besuchen"]',
            '.userMessenger ul li a img[title="»' + nickname.name + '« über ICQ kontaktieren"]',
            '.userMessenger ul li a img[title="»' + nickname.name + '« über Windows Live Messenger kontaktieren"]',
            '.userMessenger ul li a img[title="»' + nickname.name + '« über Skype kontaktieren"]'
        ].join(', ')).replaceAttr('title', nickname.name, nickname.nick);

        //Thanko
        $('div[id^="thankUser-"] .smallFont a:not([onclick]):contains(' + nickname.name + ')').replaceHtml(nickname.name, nickname.nick);

        //Quotes
        $('blockquote .quoteHeader h3 a:contains(Zitat von »maddin«)').replaceText(nickname.name, nickname.nick);
    };
    updateIndexNickname = function (nickname) {
        //Die letzten X Beiträge
        $('.columnTop5LastPost .containerContentSmall .smallFont a:contains(' + nickname.name + ')').replaceText(nickname.name, nickname.nick);

        //User in Board online
        $('.boardlistUsersOnline a:contains(' + nickname.name + ')').replaceHtml(nickname.name, nickname.nick);

        //Last post in board
        $('.boardlistLastPost .containerContentSmall p a:contains(' + nickname.name + ')').replaceText(nickname.name, nickname.nick);

        //Zurzeit sind X Benutzer online
        $('.infoBoxUsersOnline .containerContent .smallFont a:contains(' + nickname.name + ')').replaceHtml(nickname.name, nickname.nick);
    };

    kango.invokeAsync('kango.storage.getItem', 'option_common_extension_nicknames', function (enabled) {
        if (enabled) {
            if (BPPUtils.isTemplate('tplUserProfile')) {
                kango.invokeAsync('kango.storage.getItem', 'nicknames', function (nicknames) {
                    nicknames = nicknames || {};
                    BPPUtils.addStyle('alertify');

                    var userId = parseInt($('input[name="userID"]').val(), 10),
                        name = $('.userName > span').text(),
                        nickname = nicknames[userId] || {
                            "name": name,
                            "nick": ''
                        },
                        $editNickname = $('<a href="#" title="Spitznamen bearbeiten"><img src="wcf/icon/editS.png" alt=""></a>');

                    $('.userName').append($editNickname);

                    if (name !== nickname.nick && nickname.nick.length !== 0) {
                        updateProfileNickname(name, nickname.nick);
                    }
                    $editNickname.click(function (event) {
                        event.preventDefault();
                        alertify.set({labels: {
                            ok: 'Spitzname Speichern',
                            cancel: 'Spitzname löschen'
                        }});
                        alertify.prompt('Neuer Spitzname:', function (ok, newNick) {
                            if (ok && newNick.length !== 0) {
                                if (newNick === name) {
                                    delete nicknames[userId];
                                    kango.invokeAsync('kango.storage.setItem', 'nicknames', nicknames);
                                    updateProfileNickname(name, name);
                                } else {
                                    alertify.success('Spitzname von »' + name + '« wurde zu »' + newNick + '« geändert.');
                                    nickname.nick = newNick;
                                    nicknames[userId] = nickname;
                                    kango.invokeAsync('kango.storage.setItem', 'nicknames', nicknames);
                                    updateProfileNickname(name, newNick);
                                }
                            } else {
                                alertify.success('Spitzname von »' + name + '« wurde gelöscht.');
                                delete nicknames[userId];
                                kango.invokeAsync('kango.storage.setItem', 'nicknames', nicknames);
                                updateProfileNickname(nickname.nick || name, name);
                                nickname.nick = '';
                            }
                        }, nickname.nick || nickname.name);
                    });
                });
            } else if (BPPUtils.isTemplate('tplThread')) {
                kango.invokeAsync('kango.storage.getItem', 'nicknames', function (nicknames) {
                    nicknames = nicknames || {};
                    $('.message:not(.quickReply):not(.deleted)').each(function () {
                        var $element = $(this),
                            userId = parseInt(BPPUtils.getParameterByName('userID', $element.find('.messageSidebar .messageAuthor .userName a').attr('href')), 10),
                            nickname = nicknames[userId] || null;
                        if (nickname) {
                            updateThreadNickname(nickname);
                        }
                    });
                });
            } else if (BPPUtils.isTemplate('tplIndex')) {
                kango.invokeAsync('kango.storage.getItem', 'nicknames', function (nicknames) {
                    nicknames = nicknames || {};
                    _.each(nicknames, function (nickname, userId) {
                        updateIndexNickname(nickname);
                    });
                });
            }
        }
    });
});