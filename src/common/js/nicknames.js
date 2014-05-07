// ==UserScript==
// @name        Nicknames
// @namespace   BreadfishPlusPlus
// @include     http://forum.sa-mp.de/*
// @exclude     http://forum.sa-mp.de/acp/*
// @all-frames  false
// @run-at      document-start
// ==/UserScript==
/*jslint nomen: true, vars: true*/
/*global $, BPPUtils, _, PNotify*/

BPPUtils.load(function () {
    "use strict";
    var updateProfileNickname, updateThreadNickname, updateIndexNickname;

    updateProfileNickname = function (name, nick) {
        document.title = document.title.replace(new RegExp($.ui.autocomplete.escapeRegex(name), 'i'), nick);

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
        $('div[id^="thankUser-"] .smallFont a:not([onclick]):contains(' + nickname.name + ')').filter(function () {
            return $(this).text() === nickname.name;
        }).replaceHtml(nickname.name, nickname.nick);

        //Quotes
        $('blockquote .quoteHeader h3 a:contains(Zitat von »' + nickname.name + '«)').replaceText(nickname.name, nickname.nick);
    };
    updateIndexNickname = function (nickname) {
        //Die letzten X Beiträge
        $('.columnTop5LastPost .containerContentSmall .smallFont a').filter(function () {
            return $(this).text() === nickname.name;
        }).text(nickname.nick);

        //User in Board online
        $('.boardlistUsersOnline a').filter(function () {
            return $(this).text() === nickname.name;
        }).replaceHtml(nickname.name, nickname.nick);

        //Last post in board
        $('.boardlistLastPost .containerContentSmall p a').filter(function () {
            return $(this).text() === nickname.name;
        }).text(nickname.nick);

        //Zurzeit sind X Benutzer online
        $('.infoBoxUsersOnline .containerContent .smallFont a:contains(' + nickname.name + ')').filter(function () {
            return $(this).text() === nickname.name;
        }).replaceHtml(nickname.name, nickname.nick);
    };

    if (BPPUtils.storage.get('option.common.extension.nicknames.active', false)) {
        if (BPPUtils.isTemplate('tplUserProfile')) {

            BPPUtils.addMStyle(['pnotify_custom', 'jquery-ui', 'pnotify']);

            var userId = parseInt($('input[name="userID"]').val(), 10),
                name = $('.userName > span').text(),
                nickname = BPPUtils.storage.get('option.common.extension.nicknames.' + userId, {
                    "name": name,
                    "nick": ''
                }),
                $editNickname = $('<a href="#" title="Spitznamen bearbeiten"><img src="wcf/icon/editS.png" alt=""></a>');

            $('.userName').append($editNickname);

            if (name !== nickname.nick && nickname.nick.length !== 0) {
                updateProfileNickname(name, nickname.nick);
            }
            $editNickname.click(function (event) {
                event.preventDefault();
                new PNotify({
                    title: '<b>Neuer Spitzname:</b>',
                    text: '<input type="text" style="width:100%" id="newNickname" value="' + (nickname.nick || nickname.name) + '">',
                    hide: false,
                    width: 'auto',
                    buttons: {
                        closer: false,
                        sticker: false
                    },
                    history: {
                        history: false
                    },
                    confirm: {
                        confirm: true,
                        buttons: [{
                            text: 'Spitzname Speichern',
                            click: function (notice) {
                                var newNick = $('#newNickname').val();
                                if (newNick.length > 0) {
                                    if (newNick === name) {
                                        BPPUtils.storage.set('option.common.extension.nicknames.' + userId, undefined);
                                        updateProfileNickname(name, name);
                                        notice.remove();
                                    } else {
                                        nickname.nick = newNick;
                                        BPPUtils.storage.set('option.common.extension.nicknames.' + userId, nickname);
                                        updateProfileNickname(name, newNick);
                                        notice.update({
                                            title: 'Spitzname gespeichert!',
                                            text: 'Spitzname von »' + name + '« wurde zu »' + newNick + '« geändert.',
                                            icon: true,
                                            type: 'info',
                                            hide: true,
                                            confirm: {
                                                confirm: false
                                            },
                                            buttons: {
                                                closer: true,
                                                sticker: true
                                            }
                                        });
                                    }
                                } else {
                                    notice.remove();
                                }
                            }
                        }, {
                            text: 'Spitzname löschen',
                            click: function (notice) {
                                BPPUtils.storage.set('option.common.extension.nicknames.' + userId, undefined);
                                updateProfileNickname(nickname.nick || name, name);
                                nickname.nick = '';
                                notice.update({
                                    title: 'Spitzname gelöscht!',
                                    text: 'Spitzname von »' + name + '« wurde gelöscht.',
                                    icon: true,
                                    type: 'info',
                                    hide: true,
                                    confirm: {
                                        confirm: false
                                    },
                                    buttons: {
                                        closer: true,
                                        sticker: true
                                    }
                                });
                            }
                        }]
                    }
                });
            });
        } else if (BPPUtils.isTemplate('tplThread')) {
            $('.message:not(.quickReply):not(.deleted)').each(function () {
                var $element = $(this),
                    uID = parseInt(BPPUtils.getParameterByName('userID', $element.find('.messageSidebar .messageAuthor .userName a').attr('href')), 10),
                    nick = BPPUtils.storage.get('option.common.extension.nicknames.' + uID, null);
                if (nick) {
                    updateThreadNickname(nick);
                }
            });
        } else if (BPPUtils.isTemplate('tplIndex')) {
            _.each(BPPUtils.storage.get('option.common.extension.nicknames', {}), function (nickname, uID) {
                if (uID === 'active') {
                    return;
                }
                updateIndexNickname(nickname);
            });
        }
    }
});