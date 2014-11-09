var $               = require('lib/jquery');
var _               = require('lib/underscore');
var utils           = require('../utils');
var storage         = require('../storage');
var popup           = require('../ui/popup');
var notification    = require('../ui/notification');
var register    = require('../settings').register;

var Nick = {
    get: {
        name: function (name) {
            var nicks = storage.get('option.common.extension.nicknames.list', []);
            if (!name || !nicks.length) {
                return null;
            }
            return _.find(nicks, function (n) {
                return n.name === name;
            }) || null;
        },
        nick: function (nick) {
            var nicks = storage.get('option.common.extension.nicknames.list', []);
            if (!nick || !nicks.length) {
                return null;
            }
            return _.find(nicks, function (n) {
                return n.nick === nick;
            }) || null;
        },
        id: function (id) {
            var nicks = storage.get('option.common.extension.nicknames.list', []);
            if (!id || !nicks.length) {
                return null;
            }
            return _.find(nicks, function (n) {
                return n.userId === id;
            }) || null;
        },
        all: function () {
            var nicks = storage.get('option.common.extension.nicknames.list', []);
            return nicks || null;
        }
    },
    set: function (O) {
        var nicks = storage.get('option.common.extension.nicknames.list', []),
            index = nicks.indexOf(O);

        if (index > -1) {
            nicks[index] = O;
        } else {
            nicks.push(O);
        }
        storage.set('option.common.extension.nicknames.list', nicks);
    },
    rem: {
        name: function (name) {
            storage.set('option.common.extension.nicknames.list', _.filter(storage.get('option.common.extension.nicknames.list', []), function (O) {
                return O.name !== name;
            }));
        },
        nick: function (nick) {
            storage.set('option.common.extension.nicknames.list', _.filter(storage.get('option.common.extension.nicknames.list', []), function (O) {
                return O.nick !== nick;
            }));
        },
        id: function (id) {
            storage.set('option.common.extension.nicknames.list', _.filter(storage.get('option.common.extension.nicknames.list', []), function (O) {
                return O.userId !== id;
            }));
        },
    }
};

$.fn.replaceAttr = function (attr, search, replace) {
    this.each(function () {
        var val = $(this).attr(attr);
        if (val) {
            $(this).attr(attr, val.replace(new RegExp($.ui.autocomplete.escapeRegex(search), 'i'), replace));
        }
    });
    return this;
};
$.fn.replaceText = function (search, replace) {
    this.each(function () {
        var val = $(this).text();
        if (val) {
            $(this).text(val.replace(new RegExp($.ui.autocomplete.escapeRegex(search), 'i'), replace));
        }
    });
    return this;
};
$.fn.replaceHtml = function (search, replace) {
    this.each(function () {
        var val = $(this).html();
        if (val) {
            $(this).html(val.replace(new RegExp($.ui.autocomplete.escapeRegex(search), 'i'), replace));
        }
    });
    return this;
};


var updateProfileNickname = function (oldName, newName) {
    utils.log.debug('nickname.updateProfileNickname', oldName, newName, Nick.get.name(oldName));

    //Doukumet Titel: Profil von »[NAME]« - Mitglieder - breadfish.de - DIE deutschsprachige GTA-Community
    document.title = document.title.replace(new RegExp($.ui.autocomplete.escapeRegex(oldName), 'i'), newName);

    //Headline: Profil von »[NAME]«
    $('.headlineContainer h2 a').replaceText(oldName, newName);

    //Benutzername neben dem online/offline Icon
    $('.userName > span').replaceText(oldName, newName);

    //Sidebar: vCard [NAME]
    $('.twoRows li a img[src="wcf/icon/vCardM.png"]').parent('a').find('span').replaceText(oldName, newName);

    //Usercard: Ihre Verbindung zu »[NAME]«
    $('.friendsConnection > h3.light').replaceText(oldName, newName);

    //Usercard: online/offline Icon Title:»[NAME]« ist online/offline
    $('.userName img[src="wcf/icon/onlineS.png"]').replaceAttr('title', oldName, newName);
    $('.userName img[src="wcf/icon/onlineS.png"]').replaceAttr('data-original-title', oldName, newName);
    $('.userName img[src="wcf/icon/offlineS.png"]').replaceAttr('title', oldName, newName);
    $('.userName img[src="wcf/icon/offlineS.png"]').replaceAttr('data-original-title', oldName, newName);

    //Usercard: männlich/weiblich Icon Title:»[NAME]« ist männlich/weiblich
    $('.userStatus img[src="wcf/icon/genderMaleS.png"]').replaceAttr('title', oldName, newName);
    $('.userStatus img[src="wcf/icon/genderMaleS.png"]').replaceAttr('data-original-title', oldName, newName);
    $('.userStatus img[src="wcf/icon/genderFemaleS.png"]').replaceAttr('title', oldName, newName);
    $('.userStatus img[src="wcf/icon/genderFemaleS.png"]').replaceAttr('data-original-title', oldName, newName);

    //Sidebar: Title: Beiträge von »[NAME]« suchen
    $('ul.dataList .smallFont:contains(Beiträge)').parent('.containerContent').find('a').replaceAttr('title', oldName, newName);
    $('ul.dataList .smallFont:contains(Beiträge)').parent('.containerContent').find('a').replaceAttr('data-original-title', oldName, newName);
};

var updateThreadNicknames = function () {
    var userList = [];
    $('.message:not(.quickReply):not(.deleted)').each(function () {
        userList.push($(this).find('.messageSidebar .messageAuthor .userName a').text().trim());
    });
    userList = _.uniq(userList);
    utils.log.debug('nickname.updateThreadNicknames', userList);
    _.each(userList, function (name) {
        var NickO = Nick.get.name(name);
        if (NickO) {

            //Name
            $('.messageAuthor .userName a span:contains(' + NickO.name + ')').replaceHtml(NickO.name, NickO.nick);

            //Tooltipps
            $([
                '.messageAuthor .userName a[title="Benutzerprofil von »' + NickO.name + '« aufrufen"]',
                '.userAvatar a[title="Benutzerprofil von »' + NickO.name + '« aufrufen"]',
                '.messageAuthor .userName img[title="»' + NickO.name + '« ist online"]',
                '.messageAuthor .userName img[title="»' + NickO.name + '« ist offline"]',
                '.userSymbols ul li img[title="»' + NickO.name + '« ist männlich"]',
                '.userSymbols ul li img[title="»' + NickO.name + '« ist weiblich"]',
                '.userSymbols ul li img[title="»' + NickO.name + '« ist der Autor dieses Themas"]',
                '.userMessenger ul li a img[title="Persönliche Website von »' + NickO.name + '« besuchen"]',
                '.userMessenger ul li a img[title="»' + NickO.name + '« über ICQ kontaktieren"]',
                '.userMessenger ul li a img[title="»' + NickO.name + '« über Windows Live Messenger kontaktieren"]',
                '.userMessenger ul li a img[title="»' + NickO.name + '« über Skype kontaktieren"]'
            ].join(', ')).replaceAttr('title', NickO.name, NickO.nick);

            //Thanko
            $('div[id^="thankUser-"] .smallFont a:not([onclick]):contains(' + NickO.name + ')').filter(function () {
                return $(this).text() === NickO.name;
            }).replaceHtml(NickO.name, NickO.nick);

            //Quotes
            $('blockquote .quoteHeader h3 a:contains(Zitat von »' + NickO.name + '«)').replaceText(NickO.name, NickO.nick);
        }
    });
};

var updateIndexNicknames = function () {
    var nicks = Nick.get.all();
    _.each(nicks, function (NickO) {
        //Die letzten X Beiträge
        $('.columnTop5LastPost .containerContentSmall .smallFont a').filter(function () {
            return $(this).text() === NickO.name;
        }).text(NickO.nick);

        //User in Board online
        $('.boardlistUsersOnline a').filter(function () {
            return $(this).text() === NickO.name;
        }).replaceHtml(NickO.name, NickO.nick);

        //Last post in board
        $('.boardlistLastPost .containerContentSmall p a').filter(function () {
            return $(this).text() === NickO.name;
        }).text(NickO.nick);

        //Zurzeit sind X Benutzer online
        $('.infoBoxUsersOnline .containerContent .smallFont a:contains(' + NickO.name + ')').filter(function () {
            return $(this).text() === NickO.name;
        }).replaceHtml(NickO.name, NickO.nick);
    });
};

var setupNickEdit = function () {
    var userId = parseInt($('input[name="userID"]').val(), 10),
        name = $('.userName > span').text(),
        nickO = Nick.get.id(userId),
        $editNickname = $('<li><a href="#" title="Spitzname ändern"><img src="wcf/icon/avatarEditM.png" style="width:24px;"><span>Spitzname ändern</span></a></li>');
    $('.userCardOptions ul').append($editNickname);

    $editNickname.find('a').click(function (event) {
        event.preventDefault();
        popup.prompt({
            question: 'Neuer Spitzname:',
            leftLabel: 'Spitzname Speichern',
            rightLabel: 'Spitzname löschen',
            placeholder: name,
            value: nickO ? nickO.nick : ''
        }, function (num, input) {
            if (num === 1 || num === 3) {
                if (input.length > 0) {
                    if (input !== name) {
                        nickO = {
                            'name': name,
                            'nick': input,
                            'userId': userId
                        };
                        Nick.set(nickO);
                        updateProfileNickname(name, input);
                        notification.create({
                            title: 'Spitzname gespeichert!',
                            message: 'Spitzname von »' + name + '« wurde zu »' + input + '« geändert.'
                        });
                    } else {
                        Nick.rem.id(userId);
                        updateProfileNickname(nickO ? nickO.nick : name, name);
                        nickO = null;
                        notification.create({
                            title: 'Spitzname gelöscht!',
                            message: 'Spitzname von »' + name + '« wurde gelöscht.'
                        });
                    }
                }
            } else if (num === 2) {
                Nick.rem.id(userId);
                updateProfileNickname(nickO ? nickO.nick : name, name);
                nickO = null;
                notification.create({
                    title: 'Spitzname gelöscht!',
                    message: 'Spitzname von »' + name + '« wurde gelöscht.'
                });
            }
        });
    });
};

register({
    'key': 'option.common.extension.nicknames.enabled',
    'name': 'Spitznamen für Benutzer',
    'tab': 'Einstellungen',
    'subtab': 'Allgemeine Einstellungen',
    'category': 'Erweiterungen',
    'type': 'toggle',
    'default': false,
    'description': 'Fügt im Benutzerprofil eine Option hinzu, die es ermöglicht dem Benutzer einen eigenen Spitznamen zu geben.<br>Dieser Spitzname wird dann, anstatt des eigentlichen Benutzernamens, im Forum angezeigt.'
});
register({
    'key': 'option.common.extension.nicknames.list',
    'type': 'invis',
    'default': [],
});

if (storage.get('option.common.extension.nicknames.enabled', false)) {
    if (utils.isTemplate('tplUserProfile')) {
        setupNickEdit();
        var n = $('.userName > span').text();
        var nickO = Nick.get.name(n);
        if (nickO) {
            updateProfileNickname(n, nickO.nick);
        }
    } else if (utils.isTemplate('tplThread')) {
        updateThreadNicknames();
    } else if (utils.isTemplate('tplIndex')) {
        updateIndexNicknames();
    }
}