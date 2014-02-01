$(function () {
    "use strict";
    GM_log('executing postCreate.js');

    function getCaretPosition(ctrl) {
        if (ctrl.setSelectionRange) {
            return ctrl.selectionEnd;
        }
        if (document.selection && document.selection.createRange) {
            var range = document.selection.createRange(), start = range.duplicate().moveStart('character', -100000);
            return start + range.text.length;
        }
    }

    function setCaretPosition(ctrl, pos) {
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
    }

    function getNick(text, caret) {
        var result = /\S+$/.exec(text.slice(0, caret));
        return result ? (result[0].indexOf('@') === 0 ? result[0].substr(1) : null) : null;
    }

    function addNickAutocomplete() {
        var $editorCodeView = $('.editorCodeView'),
            $nickCompletionList = $(Template.nickCompletionList),
            reset = false;

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
                GM_xmlhttpRequest({
                    method: 'POST',
                    url: window.location.protocol + '//' + window.location.hostname + '/index.php?page=PublicUserSuggest',
                    data: 'query=' + nick,
                    headers: {"Content-Type": "application/x-www-form-urlencoded"},
                    onload: function (response) {
                        $nickCompletionList.hide().find('ul').empty();
                        if (response.status === 200) {
                            $($.parseXML(response.responseText)).find('user').each(function (index) {
                                $nickCompletionList.find('ul').append('<li' + (index === 0 ? ' class="active"' : '') + '><a href="#">' + $(this).text() + '</a></li>');
                            });
                            offset.left -= $nickCompletionList.outerWidth() + 5;
                            $nickCompletionList.css(offset).show();
                        }
                    }
                });
            } else {
                $nickCompletionList.hide().find('ul').empty();
            }
        });
    }

    function addSmilies(smilieCategorys) {
        if (smilieCategorys.length > 0) {
            var $smileyContainer = $('#smileyContainer');
            $.each(smilieCategorys, function (cIndex, category) {
                unsafeWindow.smileyCategories.set(cIndex + 1, category + ' (' + Smilies[category].length + ')');
                $smileyContainer.append('<ul id="smileyCategory-' + (cIndex + 1) + '" class="hidden"></ul>');
            });
            unsafeWindow.smileyCategorySwitcher.showSmileyCategories();
            $.each(smilieCategorys, function (categoryIndex, categoryName) {
                $.each(Smilies[categoryName], function (sIndex, smilie) {
                    $('ul#smileyCategory-' + (categoryIndex + 1)).append('<li><img onmouseover="this.style.cursor=\'pointer\'" onclick="WysiwygInsert(\'smiley\', \'' + smilie[1] + '\', \'' + smilie[1] + '\', \'[img]' + smilie[1] + '[/img]\');" src="' + smilie[1] + '" alt="" title="' + smilie[0] + '" style="cursor: pointer;"></li>');
                });
            });
            if ($('#smiliesTab.activeTabMenu').length === 0) {
                unsafeWindow.smileyCategorySwitcher.hideSmileyCategories();
            }
            $('#tabMenu li a').click(function () {
                if ($(this).parent('li').attr('id') === 'smiliesTab') {
                    unsafeWindow.smileyCategorySwitcher.showSmileyCategories();
                } else {
                    unsafeWindow.smileyCategorySwitcher.hideSmileyCategories();
                }
            });
        }
    }

    if (BPPUtils.isTemplate(['tplPostAdd', 'tplThreadAdd', 'tplPmNew', 'tplPostEdit'])) {
        if (GM_getValue('option_postCreate_bbcode_email', false)) {
            unsafeWindow.language['email.title'] = 'E-mail address';
            unsafeWindow.language['email.attribute1.promptText'] = 'TODO:';
            unsafeWindow.extraBBCodes.email.icon = 'insertEmailM.png';
        }
        if (GM_getValue('option_postCreate_bbcode_sub', false)) {
            unsafeWindow.language['sub.title'] = 'Text tiefstellen';
            unsafeWindow.extraBBCodes.sub.icon = 'insertSubM.png';
        }
        if (GM_getValue('option_postCreate_bbcode_sup', false)) {
            unsafeWindow.language['sup.title'] = 'Text hochstellen';
            unsafeWindow.extraBBCodes.sup.icon = 'insertSupM.png';
        }
        if (GM_getValue('option_postCreate_bbcode_php', false)) {
            unsafeWindow.extraBBCodes.php.icon = 'insertPhpM.png';
        }
        if (GM_getValue('option_postCreate_bbcode_java', false)) {
            unsafeWindow.extraBBCodes.java.icon = 'insertJavaM.png';
        }
        if (GM_getValue('option_postCreate_bbcode_css', false)) {
            unsafeWindow.extraBBCodes.css.icon = 'insertCssM.png';
        }
        if (GM_getValue('option_postCreate_bbcode_html', false)) {
            unsafeWindow.extraBBCodes.html.icon = 'insertHtmlM.png';
        }
        if (GM_getValue('option_postCreate_bbcode_xml', false)) {
            unsafeWindow.extraBBCodes.xml.icon = 'insertHtmlM.png';
        }
        if (GM_getValue('option_postCreate_bbcode_js', false)) {
            unsafeWindow.extraBBCodes.js.icon = 'insertJavaScriptM.png';
        }
        if (GM_getValue('option_postCreate_bbcode_c', false)) {
            unsafeWindow.extraBBCodes.c.icon = 'insertCM.png';
        }
        if (GM_getValue('option_postCreate_bbcode_dropdown', false)) {
            unsafeWindow.language['dropdown.title'] = 'Dropdown';
            unsafeWindow.extraBBCodes.dropdown.icon = 'editorResizeM.png';
        }
        if (GM_getValue('option_postCreate_bbcode_sevenload', false)) {
            unsafeWindow.extraBBCodes.sevenload.icon = 'sevenLoadM.png';
        }
        if (GM_getValue('option_postCreate_bbcode_clipfish', false)) {
            unsafeWindow.extraBBCodes.clipfish.icon = 'clipfishM.png';
        }
        if (GM_getValue('option_postCreate_bbcode_googlevideo', false)) {
            unsafeWindow.extraBBCodes.googlevideo.icon = 'googleVideoM.png';
        }
        if (GM_getValue('option_postCreate_bbcode_myspace', false)) {
            unsafeWindow.extraBBCodes.myspace.icon = 'mySpaceM.png';
        }
        if (GM_getValue('option_postCreate_bbcode_myvideo', false)) {
            unsafeWindow.extraBBCodes.myvideo.icon = 'myVideoM.png';
        }



        $(document).ready(function () {
            GM_addStyle(Template.css.postCreate);
            if (GM_getValue('option_postCreate_extension_nickcomplete', false)) {
                addNickAutocomplete();
            }
            var smilieCategorys = [];
            if (GM_getValue('option_postCreate_smilies_mlp', false)) {
                smilieCategorys.push('My Little Pony');
            }
            if (GM_getValue('option_postCreate_smilies_rage', false)) {
                smilieCategorys.push('Rageicons');
            }
            if (GM_getValue('option_postCreate_smilies_icq', false)) {
                smilieCategorys.push('Kolobok (ICQ)');
            }
            if (GM_getValue('option_postCreate_smilies_skype', false)) {
                smilieCategorys.push('Skype');
            }
            if (GM_getValue('option_postCreate_smilies_yolks', false)) {
                smilieCategorys.push('Y o l k s');
            }
            if (GM_getValue('option_postCreate_smilies_emoji', false)) {
                smilieCategorys.push('Emojicons');
            }
            addSmilies(smilieCategorys);
            if (GM_getValue('option_postCreate_bbcode_email', false)) {
                $('img[src="wcf/icon/wysiwyg/insertEmailM.png"]').attr('src', 'http://i.imgur.com/cxDasR7.png');
            }
            if (GM_getValue('option_postCreate_bbcode_sub', false)) {
                $('img[src="wcf/icon/wysiwyg/insertSubM.png"]').attr('src', 'http://i.imgur.com/lDbBhzJ.png');
            }
            if (GM_getValue('option_postCreate_bbcode_sup', false)) {
                $('img[src="wcf/icon/wysiwyg/insertSupM.png"]').attr('src', 'http://i.imgur.com/8alKTkm.png');
            }
            if (GM_getValue('option_postCreate_bbcode_dropdown', false)) {
                $('img[src="wcf/icon/wysiwyg/insertSupM.png"]').attr('src', 'http://i.imgur.com/8alKTkm.png');
            }
        });
    }
});