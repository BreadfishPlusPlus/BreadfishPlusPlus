var $           = require('lib/jquery');
var io          = require('lib/socket');
var storage     = require('../storage');
var utils       = require('../utils');
var register    = require('../settings').register;

register({
    'key': 'option.common.extension.chat.enabled',
    'name': 'Chat aktivieren',
    'tab': 'Einstellungen',
    'subtab': 'Allgemeine Einstellungen',
    'category': 'Chat',
    'type': 'toggle',
    'default': false,
    'description': 'Zeigt eine Chatbox auf der Startseite an. Optional kann diese auch an den Unterren Bildschirmrand gesetzt werden, wo sie auf jeder Seite zu finden ist.'
});
register({
    'key': 'option.boards.extension.ircChat.open',
    'type': 'invis',
    'default': true,
});
register({
    'key': 'option.boards.extension.ircChat.small',
    'type': 'invis',
    'default': false,
});

var socket, $messages;

var getuserInfo = function (callback) {
    var userinfo = {
        name: null,
        avatar: null,
        userId: utils.getParameterByName('userID', $('#userNote > a').attr('href'))
    };
    $.get($('#userNote > a').attr('href')).done(function (data) {
        var $profile = $(data);
        userinfo.name = $profile.find('.userName span').text();
        userinfo.avatar = 'http://forum.sa-mp.de/' + $profile.find('.userAvatar a img').attr('src');
        callback(userinfo);
    }).fail(function (jqXHR) {
        utils.log.error('Konnte eigenes Benutzerprofil nicht aufrufen.', jqXHR.status, jqXHR.statusText);
        callback(null);
    });
};

var sendMessage = function () {
    if (!socket) {
        return;
    }
    var message = $('.bpp-chat-input').val();
    $('.bpp-chat-input').val('');
    if (!message.length) {
        return;
    }
    socket.emit('cmessage', message);
};

var addMessage = function (data) {
    data.type = data.type || 'message';
    $messages.append(require('templates').chatMessage(data));
    $messages[0].scrollTop = $messages[0].scrollHeight;
};

var connectToSocket = function (userinfo) {
    $.getScript('https://cdn.socket.io/socket.io-1.0.6.js').done(function () {
        socket = io(DOMAIN.chat, {
            reconnection: true
        });
        socket.on('connect', function () {
            addMessage({type: 'system', message: 'Verbindung wurde hergestellt!'});
            utils.log.debug('Verbindung wurde hergestellt.');
            socket.emit('userinfo', userinfo);
        });
        socket.on('connect_error', function (err) {
            addMessage({type: 'system', message: 'Verbindung konnte nicht hergestellt werden! :('});
            utils.log.error('Die Verbindung zum Chatserver konnte nicht hergestellt werden.', err);
        });
        socket.on('connect_timeout', function () {
            addMessage({type: 'system', message: 'Deine Verbindung zum Chatserver wurde verloren!'});
            utils.log.error('Deine Verbindung zum Chatserver wurde verloren');
        });
        socket.on('reconnect', function (num) {
            utils.log.debug('Verbindung wurde wiederhergestelllt.', num);
        });
        socket.on('reconnecting', function (num) {
            addMessage({type: 'system', message: 'Versuche Verbindung wiederherzustellen... (' + num + ')'});
            utils.log.error('Versuche Verbindung wiederherzustellen...', num);
        });
        socket.on('reconnect_error', function (err) {
            utils.log.error('Die Verbindung zum Chatserver konnte nicht wiederhergestellt werden.', err);
        });
        socket.on('reconnect_failed', function () {
            addMessage({type: 'system', message: 'Konnte verbindung nicht wiederherstellen! :('});
            utils.log.error('Die Verbindung zum Chatserver konnte nicht wiederhergestellt werden.');
        });
        socket.on('smessage', function (data) {
            utils.log.debug('Chatnachricht empfangen.', data);
            addMessage(data);
        });
        socket.on('clearchat', function () {
            $messages.empty();
            addMessage({type: 'system', message: 'Der Chatlog wurde gelöscht!'});
        });
        socket.on('banned', function (name) {
            if (name) {
                addMessage({type: 'system', message: 'Du wurdest von <b>' + name + '</b> gebannt. Du kannst nun keine Nachrichten mehr im Chat verfassen.'});
            } else {
                addMessage({type: 'system', message: 'Du wurdest im Chat gebannt. Du kannst keine Nachrichten verfassen.'});
            }
            $('#bpp-chat').addClass('banned');
        });
        socket.on('unbanned', function (name) {
            addMessage({type: 'system', message: 'Du wurdest von <b>' + name + '</b> entbannt. Du kannst nun wieder Nachrichten im Chat verfassen.'});
            $('#bpp-chat').removeClass('banned');
        });
    }).fail(function (jqXHR) {
        utils.log.error('Konnte socket.io Bilbiothek nicht laden.', jqXHR.status, jqXHR.statusText);
    });
};

var createChat = function () {
    var $chat = $(require('templates').chat({
        open: storage.get('option.common.extension.chat.open', true),
        small: storage.get('option.common.extension.chat.small', false)
    }));

    $chat.insertAfter('.mainHeadline');

    $messages = $chat.find('.bpp-chat-messages');

    addMessage({type: 'system', message: 'Verbindung wird hergestellt...'});

    getuserInfo(function (data) {
        if (data) {
            connectToSocket(data);
        }
    });

    $('.bpp-chat-input').keyup(function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            sendMessage();
        }
    });
    $('.bpp-chat-submit').click(function (event) {
        event.preventDefault();
        sendMessage();
    });
    $('#bpp-toggleChat').click(function (event) {
        event.preventDefault();
        var open = storage.get('option.common.extension.chat.open', true);
        if (open) {
            $('.bpp-chat-contents').slideUp();
        } else {
            $('.bpp-chat-contents').slideDown();
        }
        $(this).find('img').attr('src', !open ? 'wcf/icon/minusS.png' : 'wcf/icon/plusS.png');
        storage.set('option.common.extension.chat.open', !open);
    });
    $('.bpp-toggleSize').click(function (event) {
        event.preventDefault();
        if ($('#bpp-chat').hasClass('bpp-chat-small')) {
            $('#bpp-chat').removeClass('bpp-chat-small').addClass('bpp-chat-large');
            storage.set('option.common.extension.chat.small', false);
        } else {
            $('#bpp-chat').removeClass('bpp-chat-large').addClass('bpp-chat-small');
            storage.set('option.common.extension.chat.small', true);
        }
    });
};

if (storage.get('option.common.extension.chat.enabled', false)) {
    if ((utils.isTemplate('tplIndex') && !storage.get('option.common.extension.chat.small', false)) ||
            storage.get('option.common.extension.chat.small', false)) {
        require('./../styles/chat.less');
        createChat();
    }
}