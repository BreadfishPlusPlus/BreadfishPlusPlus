/*global io */
"use strict";
var $           = require('lib/jquery');
var storage     = require('../storage');
var utils       = require('../utils');
var register    = require("../settings").register;

register({
    'key': 'option.common.extension.chat.enabled',
    'name': 'Chat aktivieren',
    'tab': 'Einstellungen',
    'subtab': 'Allgemeine Einstellungen',
    'category': 'Chat',
    'type': 'toggle',
    'default': false,
    'description': '//TODO'
});
register({
    'key': 'option.boards.extension.ircChat.open',
    'type': 'invis',
    'default': true,
});

if (storage.get('option.common.extension.chat.enabled', false)) {
    require('./../styles/chat.less');
    var socket, $msgs, $chat, sendMessage, addMessage, getuserInfo, chatMsgTemplate, createConnection, cachedMsg = {
        type: 'message'
    };

    chatMsgTemplate = require('templates').chatMessage;

    getuserInfo = function (callback) {
        var userinfo = {
            name: null,
            avatar: null,
            userId: utils.getParameterByName('userID', $("#userNote > a").attr('href'))
        };
        $.get($("#userNote > a").attr('href')).done(function (data) {
            var $profile = $(data);
            userinfo.name = $profile.find('.userName span').text();
            userinfo.avatar = 'http://forum.sa-mp.de/' + $profile.find('.userAvatar a img').attr('src');
            callback(userinfo);
        }).fail(function (jqXHR) {
            utils.log.error('Konnte eigenes Benutzerprofil nicht aufrufen.', jqXHR.status, jqXHR.statusText);
            callback(null);
        });
    };

    sendMessage = function () {
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

    addMessage = function (data) {
        data.type = data.type || 'message';
        $msgs.append(chatMsgTemplate(data));
        $msgs[0].scrollTop = $msgs[0].scrollHeight;
    };

    createConnection = function (userinfo) {
        socket = io('http://localhost:1337', { //Wird im Final Release angepasst.
            reconnection: true,
        });
        socket.on('connect', function () {
            addMessage({
                type: 'system',
                message: 'Verbindung wurde hergestellt!'
            });
            utils.log.debug('Verbindung wurde hergestellt.');
            socket.emit('userinfo', userinfo);
        });
        socket.on('connect_error', function (err) {
            addMessage({
                type: 'system',
                message: 'Verbindung konnte nicht hergestellt werden! :('
            });
            utils.log.error('Die Verbindung zum Chatserver konnte nicht hergestellt werden.', err);
        });
        socket.on('connect_timeout', function () {
            addMessage({
                type: 'system',
                message: 'Deine Verbindung zum Chatserver wurde verloren!'
            });
            utils.log.error('Deine Verbindung zum Chatserver wurde verloren');
        });
        socket.on('reconnect', function (num) {
            utils.log.debug('Verbindung wurde wiederhergestelllt.', num);
        });
        socket.on('reconnecting', function (num) {
            addMessage({
                type: 'system',
                message: 'Versuche Verbindung wiederherzustellen... (' + num + ')'
            });
            utils.log.error('Versuche Verbindung wiederherzustellen...', num);
        });
        socket.on('reconnect_error', function (err) {
            utils.log.error('Die Verbindung zum Chatserver konnte nicht wiederhergestellt werden.', err);
        });
        socket.on('reconnect_failed', function () {
            addMessage({
                type: 'system',
                message: 'Konnte verbindung nicht wiederherstellen! :('
            });
            utils.log.error('Die Verbindung zum Chatserver konnte nicht wiederhergestellt werden.');
        });
        socket.on('smessage', function (data) {
            utils.log.debug('Chatnachricht empfangen.', data);
            addMessage(data);
        });
        socket.on('clearchat', function () {
            $msgs.empty();
            addMessage({
                type: 'system',
                message: 'Der Chatlog wurde gelöscht!'
            });
        });
    };

    $.getScript('https://cdn.socket.io/socket.io-1.0.6.js').done(function () {
        $chat = $(require('templates').chat());
        $(".top5box").before($chat);

        $msgs = $chat.find('.bpp-chat-messages');

        addMessage({
            type: 'system',
            message: 'Verbindung wird hergestellt...'
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

        getuserInfo(function (data) {
            if (data) {
                createConnection(data);
            }
        });
    }).fail(function (jqXHR) {
        utils.log.error('Konnte socket.io Bilbiothek nicht laden.', jqXHR.status, jqXHR.statusText);
    });
}