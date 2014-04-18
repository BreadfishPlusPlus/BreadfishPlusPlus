// ==UserScript==
// @name        Nicknames
// @namespace   BreadfishPlusPlus
// @include     http://forum.sa-mp.de/*
// @exclude     http://forum.sa-mp.de/acp/*
// @all-frames  false
// ==/UserScript==
/*jslint nomen: true*/
/*global kango, $, BPPUtils, alertify*/

BPPUtils.ready(function () {
    "use strict";

    var updateProfileNickname = function (name, nick) {
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
                            $element.find('.messageAuthor .userName a span').last().replaceText(nickname.name, nickname.nick);

                            $element.find('.messageAuthor .userName a, .userAvatar a').replaceAttr('title', nickname.name, nickname.nick);
                            $element.find('.messageAuthor .userName img[src="wcf/icon/offlineS.png"]').replaceAttr('title', nickname.name, nickname.nick);

                            $element.find('.messageAuthor .userName img[src="wcf/icon/onlineS.png"]').replaceAttr('title', nickname.name, nickname.nick);
                            $element.find('.userSymbols ul li img[src="wcf/icon/genderMaleS.png"]').replaceAttr('title', nickname.name, nickname.nick);
                            $element.find('.userSymbols ul li img[src="wcf/icon/genderFemaleS.png"]').replaceAttr('title', nickname.name, nickname.nick);
                            $element.find('.userSymbols ul li img[src="icon/threadStarterS.png"]').replaceAttr('title', nickname.name, nickname.nick).replaceAttr('alt', nickname.name, nickname.nick);
                            $element.find('.userMessenger ul li a img[src="wcf/icon/websiteS.png"]').replaceAttr('title', nickname.name, nickname.nick);
                            $element.find('.userMessenger ul li a img[src="wcf/icon/skypeS.png"]').replaceAttr('title', nickname.name, nickname.nick);

                            $element.find('.editNote').replaceHtml(nickname.name, nickname.nick);

                            //TODO: thanko
                        }
                    });
                });
            }
        }
    });
});