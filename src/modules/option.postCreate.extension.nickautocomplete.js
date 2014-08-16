/*jslint nomen:true*/
"use strict";
var $           = require('lib/jquery');
var _           = require('lib/underscore');
var storage     = require('../storage');
var utils       = require('../utils');
var register    = require("../settings").register;

register({
    'key': 'option.postCreate.extension.nickautocomplete',
    'name': 'Benutzer-Autovervollständigung',
    'tab': 'Einstellungen',
    'subtab': 'Beitrag & Nachrichten erstellen',
    'category': 'Erweiterungen',
    'type': 'toggle',
    'default': false,
    'description': 'Schlägt beim Zitieren automatisch Benutzer vor, auf die die bereits geschriebenen Buchstaben passen.'
});

if (storage.get('option.postCreate.extension.nickautocomplete', false) && utils.isTemplate(['tplPostAdd', 'tplThreadAdd', 'tplPmNew', 'tplPostEdit'])) {
    var $editorCodeView = $('.editorCodeView'),
        nickCompletionlist = [],
        $nickCompletionList = null,
        getCaretPosition,
        setCaretPosition,
        getNick,
        reset = false,
        renderNickCompletionList,
        removeNickCompletionList,
        getActiveIndex,
        increaseIndex,
        addActiveSuggestedNick;

    getCaretPosition = function () {
        if ($editorCodeView[0].setSelectionRange) {
            return $editorCodeView[0].selectionEnd;
        }
        if (document.selection && document.selection.createRange) {
            var range = document.selection.createRange(), start = range.duplicate().moveStart('character', -100000);
            return start + range.text.length;
        }
    };
    setCaretPosition = function (pos) {
        if ($editorCodeView[0].setSelectionRange) {
            $editorCodeView[0].focus();
            $editorCodeView[0].setSelectionRange(pos, pos);
        } else if ($editorCodeView[0].createTextRange) {
            var range = $editorCodeView[0].createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    };
    getNick = function () {
        var result = /\S+$/.exec($editorCodeView.val().slice(0, getCaretPosition()));
        return result ? (result[0].indexOf('@') === 0 ? result[0].substr(1) : null) : null;
    };
    getActiveIndex = function () {
        var i;
        for (i = 0; i < nickCompletionlist.length; i += 1) {
            if (nickCompletionlist[i].active) {
                return i;
            }
        }
        return -1;
    };
    increaseIndex = function () {
        if (!$nickCompletionList) {
            return false;
        }
        var curIndex = getActiveIndex();
        if (curIndex === -1) {
            return false;
        }
        nickCompletionlist[curIndex].active = false;
        if (curIndex < nickCompletionlist.length - 1) {
            nickCompletionlist[curIndex + 1].active = true;
        } else {
            nickCompletionlist[0].active = true;
        }
        renderNickCompletionList();
        return true;
    };
    renderNickCompletionList = function () {
        removeNickCompletionList();

        $nickCompletionList = $(require('templates').nickAutocompleteList({
            nickList: nickCompletionlist
        }));
        $nickCompletionList.appendTo('body');

        var offset = $editorCodeView.offset();
        offset.left -= $nickCompletionList.outerWidth() + 5;
        $nickCompletionList.css(offset).show();
    };
    removeNickCompletionList = function () {
        if ($nickCompletionList) {
            $nickCompletionList.empty().remove();
            $nickCompletionList = null;
        }
    };
    addActiveSuggestedNick = function () {
        if (!$nickCompletionList) {
            return false;
        }
        var curIndex = getActiveIndex(),
            suggestedNick = nickCompletionlist[curIndex].nick,
            insert = '',
            text = $editorCodeView.val(),
            caret = getCaretPosition(),
            nick = getNick();

        if (suggestedNick && suggestedNick.length !== 0) {
            insert = suggestedNick + ': ';
            $editorCodeView.val(text.substr(0, caret - nick.length) + insert + text.substr(caret));
            setCaretPosition((text.substr(0, caret - nick.length) + insert).length);
            $nickCompletionList.hide().find('ul').empty();
            return true;
        }
        return false;
    };
    $(document).on('click', '#nickCompletionList li a', function (event) {
        nickCompletionlist[getActiveIndex()].active = false;
        nickCompletionlist[parseInt($(this).attr('data-index'), 10)].active = true;
        addActiveSuggestedNick();
        event.preventDefault();
    });

    $editorCodeView.on('keydown', function (event) {
        var nick = getNick(),
            charCode = event.which || event.keyCode;

        if (charCode === 27) { //ESC = Vorschläge ausblenden und entfernen
            reset = true;
            removeNickCompletionList();
        } else if (charCode === 9) { // Tabulator = nächsten Namen in der Liste anwählen
            if (increaseIndex()) {
                event.preventDefault();
            }
        } else if (charCode === 32) { //Space = aktuellen namen aus der liste auswählen
            reset = false;
            if (addActiveSuggestedNick()) {
                event.preventDefault();
            }
        } else if (nick && nick.length >= 1 && !reset) {//A-Z, 0-9, Numpad
            $.post('index.php?page=PublicUserSuggest', {
                query: nick
            }, 'xml').done(function (xmlDoc) {
                nickCompletionlist = $.map($(xmlDoc).find('user').toArray(), function (val, i) {
                    return {
                        "index": i,
                        "active": i === 0,
                        "nick": val.textContent
                    };
                });
                renderNickCompletionList();
            }).fail(function (jqXHR) {
                removeNickCompletionList();
                utils.log.error('Konnte keine Benutzervorschläge für »' + nick + '« abrufen.', jqXHR.status, jqXHR.statusText);
            });
        } else {
            removeNickCompletionList();
        }
    });
}