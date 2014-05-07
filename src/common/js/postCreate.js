// ==UserScript==
// @name        PostCreate
// @namespace   BreadfishPlusPlus
// @include     http://forum.sa-mp.de/*
// @exclude     http://forum.sa-mp.de/acp/*
// @all-frames  false
// @run-at      document-start
// ==/UserScript==
/*jslint nomen: true, unparam: true, vars: true*/
/*global $, BPPUtils, _, Smilies*/

BPPUtils.load(function () {
    "use strict";

    //Erweiterungen: Benutzer-Autovervollständigung
    if (BPPUtils.storage.get('option.postCreate.extension.nickcomplete', false) && BPPUtils.isTemplate(['tplPostAdd', 'tplThreadAdd', 'tplPmNew', 'tplPostEdit'])) {
        var $editorCodeView = $('.editorCodeView'),
            $nickCompletionList = $('<div class="popupMenu pageMenu" id="nickCompletionList"><ul></ul></div>'),
            reset = false,
            setCaretPosition,
            getNick,
            getCaretPosition;

        getCaretPosition = function (ctrl) {
            if (ctrl.setSelectionRange) {
                return ctrl.selectionEnd;
            }
            if (document.selection && document.selection.createRange) {
                var range = document.selection.createRange(), start = range.duplicate().moveStart('character', -100000);
                return start + range.text.length;
            }
        };
        setCaretPosition = function (ctrl, pos) {
            if (ctrl.setSelectionRange) {
                ctrl.focus();
                ctrl.setSelectionRange(pos, pos);
            } else if (ctrl.createTextRange) {
                var range = ctrl.createTextRange();
                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        };
        getNick = function (text, caret) {
            var result = /\S+$/.exec(text.slice(0, caret));
            return result ? (result[0].indexOf('@') === 0 ? result[0].substr(1) : null) : null;
        };

        $nickCompletionList.hide().appendTo('body');
        $editorCodeView.keydown(function (event) {
            var text = $editorCodeView.val(),
                caret = getCaretPosition(this),
                nick = getNick(text, caret),
                offset = $editorCodeView.offset(),
                charCode = event.which || event.keyCode,
                insert,
                listIndex;

            if (charCode === 27) { //ESC = Stop suggesting for this word
                reset = true;
            } else if (charCode === 9) { // Tabulator = select next name in list
                listIndex = $nickCompletionList.find('ul li.active').index();
                if (listIndex !== -1) {
                    $nickCompletionList.find('ul li.active').removeClass('active');
                    if (listIndex === $nickCompletionList.find('ul li').length - 1) {
                        $nickCompletionList.find('ul li').eq(0).addClass('active');
                    } else {
                        $nickCompletionList.find('ul li').eq(listIndex + 1).addClass('active');
                    }
                    event.preventDefault();
                }
            } else if (charCode === 32) { //Space = select current name
                reset = false;
                insert = $nickCompletionList.find('ul li.active a').text();
                if (insert.length !== 0) {
                    insert = insert.substr(nick.length) + ': ';
                    $editorCodeView.val(text.substr(0, caret) + insert + text.substr(caret));
                    setCaretPosition(this, caret + insert.length);
                    $nickCompletionList.hide().find('ul').empty();
                    event.preventDefault();
                    return;
                }
            } else if (nick && nick.length >= 1 && !reset) {//A-Z, 0-9, NUmpad
                BPPUtils.ajax({
                    type: 'POST',
                    url: 'http://forum.sa-mp.de/index.php?page=PublicUserSuggest',
                    data: {
                        query: nick
                    }
                }, function (response, status, jqXHR) {
                    $nickCompletionList.hide().find('ul').empty();
                    if (status === 200) {
                        $($.parseXML(response)).find('user').each(function (index) {
                            $nickCompletionList.find('ul').append('<li' + (index === 0 ? ' class="active"' : '') + '><a href="#">' + $(this).text() + '</a></li>');
                        });
                        offset.left -= $nickCompletionList.outerWidth() + 5;
                        $nickCompletionList.css(offset).show();
                    } else {
                        BPPUtils.log.error('Konnte keine Benutzervorschläge abrufen.', jqXHR.status, jqXHR.statusText);
                    }
                });
            } else {
                $nickCompletionList.hide().find('ul').empty();
            }
        });
    }

    //Smilies
    if (BPPUtils.isTemplate(['tplPostAdd', 'tplThreadAdd', 'tplPmNew', 'tplPostEdit'])) {
        var smilieCategorys = [],
            smiliesActive = BPPUtils.storage.get('option.postCreate.smilies', {});
        if (smiliesActive.rage) {
            smilieCategorys.push({
                "name": 'Rageicons',
                "count": Smilies.Rageicons.length,
                "smilies": Smilies.Rageicons
            });
        }
        if (smiliesActive.skype) {
            smilieCategorys.push({
                "name": 'Skype',
                "count": Smilies.Skype.length,
                "smilies": Smilies.Skype
            });
        }
        if (smiliesActive.yolks) {
            smilieCategorys.push({
                "name": 'Y o l k s',
                "count": Smilies['Y o l k s'].length,
                "smilies": Smilies['Y o l k s']
            });
        }
        if (smiliesActive.emoji) {
            smilieCategorys.push({
                "name": 'Emojicons',
                "count": Smilies.Emojicons.length,
                "smilies": Smilies.Emojicons
            });
        }
        if (Object.keys(smilieCategorys).length > 0) {
            var tabChange, $subTabMenu, $smileyContainer;

            $smileyContainer = $('#smileyContainer');
            $.each(smilieCategorys, function (index, value) {
                var $tmp = $(BPPUtils.template('smileyContainer', {
                    "catName": value.name,
                    "smilies": _.map(value.smilies, function (smilie) {
                        return {
                            "name": smilie[0],
                            "img": smilie[1]
                        };
                    })
                }));
                $tmp.hide();
                $smileyContainer.append($tmp);
            });

            $subTabMenu = $('#subTabMenu');

            tabChange = function () {
                if ($('#smiliesTab').hasClass('activeTabMenu')) {
                    $subTabMenu.html(BPPUtils.template('smilieSubTabMenu', {
                        "smilieCategorys": smilieCategorys
                    }));
                } else {
                    $subTabMenu.html('<div class="containerHead"><div> </div></div>');
                }
            };

            $('#tabMenu a').click(tabChange);
            tabChange();

            $subTabMenu.on('click', 'a', function () {
                var name = $(this).attr('data-name');

                $subTabMenu.find('.activeSubTabMenu').removeClass('activeSubTabMenu');
                $(this).parent('li').addClass('activeSubTabMenu');

                $smileyContainer.find('ul').hide();
                if (name === 'Standard') {
                    $smileyContainer.find('#smileyCategory-0').show();
                } else {
                    $smileyContainer.find('ul[data-name="' + name + '"]').show();
                }
            });
        }
    }

    //BBCodes
    if (BPPUtils.isTemplate(['tplPostAdd', 'tplThreadAdd', 'tplPmNew', 'tplPostEdit', 'tplUserProfileEdit'])) {
        var bbcodesActive = BPPUtils.storage.get('option.postCreate.bbcode', {});
        //E-Mail
        if (bbcodesActive.email) {
            $('#mce_editor_0_toolBar ul').last().append(BPPUtils.template('bbcode', {
                name: 'email',
                img: 'http://breadfishplusplus.eu/bbcodes/email.png',
                title: 'Email einfügen'
            }));
        }

        //Text tiefstellen
        if (bbcodesActive.sub) {
            $('#mce_editor_0_toolBar ul').last().append(BPPUtils.template('bbcode', {
                name: 'sub',
                img: 'http://breadfishplusplus.eu/bbcodes/sub.png',
                title: 'Text tiefstellen'
            }));
        }

        //Text hochstellen
        if (bbcodesActive.sup) {
            $('#mce_editor_0_toolBar ul').last().append(BPPUtils.template('bbcode', {
                name: 'sup',
                img: 'http://breadfishplusplus.eu/bbcodes/sup.png',
                title: 'Text hochstellen'
            }));
        }

        //Java-Quelltext
        if (bbcodesActive.java) {
            $('#mce_editor_0_toolBar ul').last().append(BPPUtils.template('bbcode', {
                name: 'java',
                img: 'wcf/icon/wysiwyg/insertJavaM.png',
                title: 'Java-Quelltext'
            }));
        }

        //Cascading Style Sheet
        if (bbcodesActive.css) {
            $('#mce_editor_0_toolBar ul').last().append(BPPUtils.template('bbcode', {
                name: 'css',
                img: 'wcf/icon/wysiwyg/insertCssM.png',
                title: 'Cascading Style Sheet'
            }));
        }

        //HTML-Quelltext
        if (bbcodesActive.html) {
            $('#mce_editor_0_toolBar ul').last().append(BPPUtils.template('bbcode', {
                name: 'html',
                img: 'wcf/icon/wysiwyg/insertHtmlM.png',
                title: 'HTML-Quelltext'
            }));
        }

        //XML-Quelltext
        if (bbcodesActive.xml) {
            $('#mce_editor_0_toolBar ul').last().append(BPPUtils.template('bbcode', {
                name: 'xml',
                img: 'wcf/icon/wysiwyg/insertHtmlM.png',
                title: 'XML-Quelltext'
            }));
        }

        //Javascript-Quelltext
        if (bbcodesActive.js) {
            $('#mce_editor_0_toolBar ul').last().append(BPPUtils.template('bbcode', {
                name: 'js',
                img: 'wcf/icon/wysiwyg/insertJavaScriptM.png',
                title: 'Javascript-Quelltext'
            }));
        }

        //C/C++-Quelltext
        if (bbcodesActive.c) {
            $('#mce_editor_0_toolBar ul').last().append(BPPUtils.template('bbcode', {
                name: 'c',
                img: 'wcf/icon/wysiwyg/insertCM.png',
                title: 'C/C++-Quelltext'
            }));
        }

        //Dropdown
        if (bbcodesActive.dropdown) {
            $('#mce_editor_0_toolBar ul').last().append(BPPUtils.template('bbcode', {
                name: 'dropdown',
                img: 'wcf/icon/wysiwyg/editorResizeM.png',
                title: 'Dropdown'
            }));
        }

        //Sevenload
        if (bbcodesActive.sevenload) {
            $('#mce_editor_0_toolBar ul').last().append(BPPUtils.template('bbcode', {
                name: 'sevenload',
                img: 'wcf/icon/wysiwyg/sevenLoadM.png',
                title: 'Sevenload'
            }));
        }

        //Clipfish
        if (bbcodesActive.clipfish) {
            $('#mce_editor_0_toolBar ul').last().append(BPPUtils.template('bbcode', {
                name: 'clipfish',
                img: 'wcf/icon/wysiwyg/clipfishM.png',
                title: 'Clipfish'
            }));
        }

        //Googlevideo
        if (bbcodesActive.googlevideo) {
            $('#mce_editor_0_toolBar ul').last().append(BPPUtils.template('bbcode', {
                name: 'googlevideo',
                img: 'wcf/icon/wysiwyg/googleVideoM.png',
                title: 'Googlevideo'
            }));
        }

        //MySpace
        if (bbcodesActive.myspace) {
            $('#mce_editor_0_toolBar ul').last().append(BPPUtils.template('bbcode', {
                name: 'myspace',
                img: 'wcf/icon/wysiwyg/mySpaceM.png',
                title: 'MySpace'
            }));
        }

        //MyVideo
        if (bbcodesActive.myvideo) {
            $('#mce_editor_0_toolBar ul').last().append(BPPUtils.template('bbcode', {
                name: 'myvideo',
                img: 'wcf/icon/wysiwyg/myVideoM.png',
                title: 'MyVideo'
            }));
        }
    }
});