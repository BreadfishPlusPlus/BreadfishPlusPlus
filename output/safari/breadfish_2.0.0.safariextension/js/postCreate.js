// ==UserScript==
// @name        PostCreate
// @namespace   BreadfishPlusPlus
// @include     http://forum.sa-mp.de/*
// @exclude     http://forum.sa-mp.de/acp/*
// @all-frames  false
// ==/UserScript==
/*jslint nomen: true*/
/*global kango, $, BPPUtils, _, Smilies*/

BPPUtils.ready(function () {
    "use strict";

    //Erweiterungen: Benutzer-Autovervollständigung
    kango.invokeAsync('kango.storage.getItem', 'option_postCreate_extension_nickcomplete', function (enabled) {
        if (enabled && BPPUtils.isTemplate(['tplPostAdd', 'tplThreadAdd', 'tplPmNew', 'tplPostEdit'])) {
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
                    kango.xhr.send({
                        method: 'POST',
                        url: 'http://forum.sa-mp.de/index.php?page=PublicUserSuggest',
                        async: true,
                        params: {
                            query: nick
                        },
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        contentType: 'text'
                    }, function (data) {
                        $nickCompletionList.hide().find('ul').empty();
                        if (data.status === 200 && data.response !== null) {
                            $($.parseXML(data.response)).find('user').each(function (index) {
                                $nickCompletionList.find('ul').append('<li' + (index === 0 ? ' class="active"' : '') + '><a href="#">' + $(this).text() + '</a></li>');
                            });
                            offset.left -= $nickCompletionList.outerWidth() + 5;
                            $nickCompletionList.css(offset).show();
                        } else {
                            kango.console.log('[B++][ERROR] Konnte keine Benutzervorschläge abrufen. (' + data.status + ')');
                        }
                    });
                } else {
                    $nickCompletionList.hide().find('ul').empty();
                }
            });
        }
    });

    //Smilies
    if (BPPUtils.isTemplate(['tplPostAdd', 'tplThreadAdd', 'tplPmNew', 'tplPostEdit'])) {
        kango.invokeAsync('kango.storage.getItem', 'option_postCreate_smilies_mlp', function (mlp) {
            var smilieCategorys = [];
            if (mlp) {
                smilieCategorys.push({
                    "name": 'My Little Pony',
                    "count": Smilies['My Little Pony'].length,
                    "smilies": Smilies['My Little Pony']
                });
            }
            kango.invokeAsync('kango.storage.getItem', 'option_postCreate_smilies_rage', function (rage) {
                if (rage) {
                    smilieCategorys.push({
                        "name": 'Rageicons',
                        "count": Smilies.Rageicons.length,
                        "smilies": Smilies.Rageicons
                    });
                }
                kango.invokeAsync('kango.storage.getItem', 'option_postCreate_smilies_icq', function (icq) {
                    if (icq) {
                        smilieCategorys.push({
                            "name": 'Kolobok (ICQ)',
                            "count": Smilies['Kolobok (ICQ)'].length,
                            "smilies": Smilies['Kolobok (ICQ)']
                        });
                    }
                    kango.invokeAsync('kango.storage.getItem', 'option_postCreate_smilies_skype', function (skype) {
                        if (skype) {
                            smilieCategorys.push({
                                "name": 'Skype',
                                "count": Smilies.Skype.length,
                                "smilies": Smilies.Skype
                            });
                        }
                        kango.invokeAsync('kango.storage.getItem', 'option_postCreate_smilies_yolks', function (yolks) {
                            if (yolks) {
                                smilieCategorys.push({
                                    "name": 'Y o l k s',
                                    "count": Smilies['Y o l k s'].length,
                                    "smilies": Smilies['Y o l k s']
                                });
                            }
                            kango.invokeAsync('kango.storage.getItem', 'option_postCreate_smilies_emoji', function (emoji) {
                                if (emoji) {
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

                                    /*$(document).on('click', '.bpp_smilie', function () {
                                        var caretPos = $('.editorCodeView')[0].selectionStart,
                                            textAreaTxt = $('.editorCodeView').val(),
                                            txtToAdd = '[img]' + $(this).attr('src') + '[/img]';
                                        $('.editorCodeView').val(textAreaTxt.substring(0, caretPos) + txtToAdd + textAreaTxt.substring(caretPos));
                                    });*/
                                }
                            });
                        });
                    });
                });
            });
        });
    }

    //BBCodes: E-Mail
    kango.invokeAsync('kango.storage.getItem', 'option_postCreate_bbcode_email', function (enabled) {
        if (enabled && BPPUtils.isTemplate(['tplPostAdd', 'tplThreadAdd', 'tplPmNew', 'tplPostEdit'])) {
            $('#mce_editor_0_toolBar ul').last().append(BPPUtils.template('bbcode', {
                name: 'email',
                img: 'http://i.imgur.com/cxDasR7.png',
                title: 'Email einfügen'
            }));
        }
    });

    //BBCodes: Text tiefstellen
    kango.invokeAsync('kango.storage.getItem', 'option_postCreate_bbcode_sub', function (enabled) {
        if (enabled && BPPUtils.isTemplate(['tplPostAdd', 'tplThreadAdd', 'tplPmNew', 'tplPostEdit'])) {
            $('#mce_editor_0_toolBar ul').last().append(BPPUtils.template('bbcode', {
                name: 'sub',
                img: 'http://i.imgur.com/lDbBhzJ.png',
                title: 'Text tiefstellen'
            }));
        }
    });

    //BBCodes: Text hochstellen
    kango.invokeAsync('kango.storage.getItem', 'option_postCreate_bbcode_sup', function (enabled) {
        if (enabled && BPPUtils.isTemplate(['tplPostAdd', 'tplThreadAdd', 'tplPmNew', 'tplPostEdit'])) {
            $('#mce_editor_0_toolBar ul').last().append(BPPUtils.template('bbcode', {
                name: 'sup',
                img: 'http://i.imgur.com/8alKTkm.png',
                title: 'Text hochstellen'
            }));
        }
    });

    //BBCodes: Java-Quelltext
    kango.invokeAsync('kango.storage.getItem', 'option_postCreate_bbcode_java', function (enabled) {
        if (enabled && BPPUtils.isTemplate(['tplPostAdd', 'tplThreadAdd', 'tplPmNew', 'tplPostEdit'])) {
            $('#mce_editor_0_toolBar ul').last().append(BPPUtils.template('bbcode', {
                name: 'java',
                img: 'wcf/icon/wysiwyg/insertJavaM.png',
                title: 'Java-Quelltext'
            }));
        }
    });

    //BBCodes: Cascading Style Sheet
    kango.invokeAsync('kango.storage.getItem', 'option_postCreate_bbcode_css', function (enabled) {
        if (enabled && BPPUtils.isTemplate(['tplPostAdd', 'tplThreadAdd', 'tplPmNew', 'tplPostEdit'])) {
            $('#mce_editor_0_toolBar ul').last().append(BPPUtils.template('bbcode', {
                name: 'css',
                img: 'wcf/icon/wysiwyg/insertCssM.png',
                title: 'Cascading Style Sheet'
            }));
        }
    });

    //BBCodes: HTML-Quelltext
    kango.invokeAsync('kango.storage.getItem', 'option_postCreate_bbcode_html', function (enabled) {
        if (enabled && BPPUtils.isTemplate(['tplPostAdd', 'tplThreadAdd', 'tplPmNew', 'tplPostEdit'])) {
            $('#mce_editor_0_toolBar ul').last().append(BPPUtils.template('bbcode', {
                name: 'html',
                img: 'wcf/icon/wysiwyg/insertHtmlM.png',
                title: 'HTML-Quelltext'
            }));
        }
    });

    //BBCodes: XML-Quelltext
    kango.invokeAsync('kango.storage.getItem', 'option_postCreate_bbcode_xml', function (enabled) {
        if (enabled && BPPUtils.isTemplate(['tplPostAdd', 'tplThreadAdd', 'tplPmNew', 'tplPostEdit'])) {
            $('#mce_editor_0_toolBar ul').last().append(BPPUtils.template('bbcode', {
                name: 'xml',
                img: 'wcf/icon/wysiwyg/insertHtmlM.png',
                title: 'XML-Quelltext'
            }));
        }
    });

    //BBCodes: Javascript-Quelltext
    kango.invokeAsync('kango.storage.getItem', 'option_postCreate_bbcode_js', function (enabled) {
        if (enabled && BPPUtils.isTemplate(['tplPostAdd', 'tplThreadAdd', 'tplPmNew', 'tplPostEdit'])) {
            $('#mce_editor_0_toolBar ul').last().append(BPPUtils.template('bbcode', {
                name: 'js',
                img: 'wcf/icon/wysiwyg/insertJavaScriptM.png',
                title: 'Javascript-Quelltext'
            }));
        }
    });

    //BBCodes: C/C++-Quelltext
    kango.invokeAsync('kango.storage.getItem', 'option_postCreate_bbcode_c', function (enabled) {
        if (enabled && BPPUtils.isTemplate(['tplPostAdd', 'tplThreadAdd', 'tplPmNew', 'tplPostEdit'])) {
            $('#mce_editor_0_toolBar ul').last().append(BPPUtils.template('bbcode', {
                name: 'c',
                img: 'wcf/icon/wysiwyg/insertCM.png',
                title: 'C/C++-Quelltext'
            }));
        }
    });

    //BBCodes: Dropdown
    kango.invokeAsync('kango.storage.getItem', 'option_postCreate_bbcode_dropdown', function (enabled) {
        if (enabled && BPPUtils.isTemplate(['tplPostAdd', 'tplThreadAdd', 'tplPmNew', 'tplPostEdit'])) {
            $('#mce_editor_0_toolBar ul').last().append(BPPUtils.template('bbcode', {
                name: 'dropdown',
                img: 'wcf/icon/wysiwyg/editorResizeM.png',
                title: 'Dropdown'
            }));
        }
    });

    //BBCodes: Sevenload
    kango.invokeAsync('kango.storage.getItem', 'option_postCreate_bbcode_sevenload', function (enabled) {
        if (enabled && BPPUtils.isTemplate(['tplPostAdd', 'tplThreadAdd', 'tplPmNew', 'tplPostEdit'])) {
            $('#mce_editor_0_toolBar ul').last().append(BPPUtils.template('bbcode', {
                name: 'sevenload',
                img: 'wcf/icon/wysiwyg/sevenLoadM.png',
                title: 'Sevenload'
            }));
        }
    });

    //BBCodes: Clipfish
    kango.invokeAsync('kango.storage.getItem', 'option_postCreate_bbcode_clipfish', function (enabled) {
        if (enabled && BPPUtils.isTemplate(['tplPostAdd', 'tplThreadAdd', 'tplPmNew', 'tplPostEdit'])) {
            $('#mce_editor_0_toolBar ul').last().append(BPPUtils.template('bbcode', {
                name: 'clipfish',
                img: 'wcf/icon/wysiwyg/clipfishM.png',
                title: 'Clipfish'
            }));
        }
    });

    //BBCodes: Googlevideo
    kango.invokeAsync('kango.storage.getItem', 'option_postCreate_bbcode_googlevideo', function (enabled) {
        if (enabled && BPPUtils.isTemplate(['tplPostAdd', 'tplThreadAdd', 'tplPmNew', 'tplPostEdit'])) {
            $('#mce_editor_0_toolBar ul').last().append(BPPUtils.template('bbcode', {
                name: 'googlevideo',
                img: 'wcf/icon/wysiwyg/googleVideoM.png',
                title: 'Googlevideo'
            }));
        }
    });

    //BBCodes: MySpace
    kango.invokeAsync('kango.storage.getItem', 'option_postCreate_bbcode_myspace', function (enabled) {
        if (enabled && BPPUtils.isTemplate(['tplPostAdd', 'tplThreadAdd', 'tplPmNew', 'tplPostEdit'])) {
            $('#mce_editor_0_toolBar ul').last().append(BPPUtils.template('bbcode', {
                name: 'myspace',
                img: 'wcf/icon/wysiwyg/mySpaceM.png',
                title: 'MySpace'
            }));
        }
    });

    //BBCodes: MyVideo
    kango.invokeAsync('kango.storage.getItem', 'option_postCreate_bbcode_myvideo', function (enabled) {
        if (enabled && BPPUtils.isTemplate(['tplPostAdd', 'tplThreadAdd', 'tplPmNew', 'tplPostEdit'])) {
            $('#mce_editor_0_toolBar ul').last().append(BPPUtils.template('bbcode', {
                name: 'myvideo',
                img: 'wcf/icon/wysiwyg/myVideoM.png',
                title: 'MyVideo'
            }));
        }
    });
});