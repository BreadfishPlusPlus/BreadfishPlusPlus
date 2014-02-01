$(function () {
    "use strict";
    GM_log('executing options.js');
    var keyNames = {8: "Backspace", 9: "Tab", 13: "Enter", 16: "Shift", 17: "Ctrl", 18: "Alt", 19: "Pause/Break", 20: "Caps Lock", 27: "Esc", 32: "Space", 33: "Page Up", 34: "Page Down", 35: "End", 36: "Home", 37: "Left", 38: "Up", 39: "Right", 40: "Down", 45: "Insert", 46: "Delete", 48: "0", 49: "1", 50: "2", 51: "3", 52: "4", 53: "5", 54: "6", 55: "7", 56: "8", 57: "9", 65: "A", 66: "B", 67: "C", 68: "D", 69: "E", 70: "F", 71: "G", 72: "H", 73: "I", 74: "J", 75: "K", 76: "L", 77: "M", 78: "N", 79: "O", 80: "P", 81: "Q", 82: "R", 83: "S", 84: "T", 85: "U", 86: "V", 87: "W", 88: "X", 89: "Y", 90: "Z", 91: "Windows", 93: "Right Click", 96: "Numpad 0", 97: "Numpad 1", 98: "Numpad 2", 99: "Numpad 3", 100: "Numpad 4", 101: "Numpad 5", 102: "Numpad 6", 103: "Numpad 7", 104: "Numpad 8", 105: "Numpad 9", 106: "Numpad *", 107: "Numpad +", 109: "Numpad -", 110: "Numpad .", 111: "Numpad /", 112: "F1", 113: "F2", 114: "F3", 115: "F4", 116: "F5", 117: "F6", 118: "F7", 119: "F8", 120: "F9", 121: "F10", 122: "F11", 123: "F12", 144: "Num Lock", 145: "Scroll Lock", 182: "My Computer", 183: "My Calculator", 186: ";", 187: "=", 188: ", ", 189: "-", 190: ".", 191: "/", 192: "`", 219: "[", 220: "\\", 221: "]", 222: "'"};

    function getKeyName(key) {
        return keyNames[key] || 'Keine Taste zugewiesen';
    }

    function addNicknameOptions() {
        $('.subTabMenu ul').append('<li><a href="#nicknames"><span>Spitznamen</span></a></li>');
        var body = '', alert = '', nicknames = BPPUtils.nicknames.getAll(), index = 0;
        if (Object.keys(nicknames).length === 0) {
            alert = '<p class="info">Keine Spitznamen vergeben.</p>';
        }
        $.each(nicknames, function (userId, value) {
            body += '<tr class="container-' + ((index % 2) + 1) + '">';
            body += '<td style="text-align:center;"><a href="index.php?page=User&userID=' + userId + '#bpp_nickname_input">' + value.name + '</a></td>';
            body += '<td style="text-align:center;">' + value.nick + '</td>';
            body += '</tr>';
            index += 1;
        });
        $('.tabMenuContent').append($(BPPUtils.nano('optionNicknames', {
            'body': body,
            'alert': alert,
            'count': Object.keys(nicknames).length
        })));
        if (alert.length !== 0) {
            $('#nicknames .border').hide();
        }
    }

    function addUsernotes() {
        $('.subTabMenu ul').append('<li><a href="#usernotes"><span>Benutzernotizen</span></a></li>');
        var body = '', alert = '', usernotes = BPPUtils.usernotes.getAll(), index = 0;
        if (Object.keys(usernotes).length === 0) {
            alert = '<p class="info">Keine Notizen vorhanden.</p>';
        }
        $.each(usernotes, function (userId, value) {
            body += '<tr class="container-' + ((index % 2) + 1) + '">';
            body += '<td style="text-align:center;"><a href="index.php?page=User&userID=' + userId + '&userNote=go">' + value.name + '</a></td>';
            body += '<td style="text-align:center;">' + value.note + '</td>';
            body += '</tr>';
            index += 1;
        });
        $('.tabMenuContent').append($(BPPUtils.nano('optionUsernotes', {
            'body': body,
            'alert': alert,
            'count': Object.keys(usernotes).length
        })));
        if (alert.length !== 0) {
            $('#usernotes .border').hide();
        }
    }

    function getOption(option) {
        if (option.type === 'toggle') {
            GM_setValue(option.key, GM_getValue(option.key, false));
            return $(BPPUtils.nano('optionToggle', {
                'key': option.key,
                'name': option.name,
                'desc': option.desc,
                'checked': GM_getValue(option.key, false) ? 'checked="checked"' : ''
            }));
        }
        if (option.type === 'range') {
            GM_setValue(option.key, GM_getValue(option.key, 10));
            return $(BPPUtils.nano('optionRange', {
                'key': option.key,
                'name': option.name,
                'desc': option.desc,
                'min': option.range[0],
                'max': option.range[1],
                'value': GM_getValue(option.key, 10)
            }));
        }
        if (option.type === 'keyboard') {
            GM_setValue(option.key, GM_getValue(option.key, -1));
            return $(BPPUtils.nano('optionKeyboard', {
                'key': option.key,
                'name': option.name,
                'desc': option.desc,
                'value': getKeyName(GM_getValue(option.key, -1))
            }));
        }
    }

    function showOptions() {
        var $tabMenuContent = $('.tabMenuContent'),
            $subTabMenu = $('.subTabMenu ul');
        $tabMenuContent.empty();
        $subTabMenu.empty();

        $.each(DefaultOptions, function (key, category) {
            $subTabMenu.append('<li><a href="#' + category.key + '"><span>' + category.name + '</span></a></li>');

            var $bpp_option_category = $('<div id="' + category.key + '" class="container-1 bpp_option_category"><h3 class="subHeadline">' + category.name + '</h3></div>');
            $tabMenuContent.append($bpp_option_category);

            $.each(category.panels, function (name, options) {
                var $bpp_option_panel = $('<fieldset></fieldset>');
                if (name !== 'null') {
                    $bpp_option_panel.append('<legend>' + name + '</legend>');
                }
                $.each(options, function (index, option) {
                    $bpp_option_panel.append(getOption(option));
                });
                $bpp_option_category.append($bpp_option_panel);
            });
        });
        addNicknameOptions();
        addUsernotes();
        $subTabMenu.find('li').first().addClass('activeSubTabMenu');
        $tabMenuContent.find('.bpp_option_category').first().show();
        $('.formSubmit').remove();

        $subTabMenu.find('a').click(function (event) {
            event.preventDefault();
            $('.activeSubTabMenu').removeClass('activeSubTabMenu');
            $(this).parent('li').addClass('activeSubTabMenu');

            var key = $(this).attr('href').substr(1);
            $('.bpp_option_category').hide();
            $('.bpp_option_category#' + key).show();
        });

        $tabMenuContent.find('input[type="checkbox"]').change(function () {
            GM_setValue($(this).attr('name'), $(this).is(':checked'));
        });
        $tabMenuContent.find('input[type="range"]').change(function () {
            var val = parseInt($(this).val(), 10);
            GM_setValue($(this).attr('name'), val);
            $(this).parent('.formField').find('.indicator').text(val);
        });
        $tabMenuContent.find('input[type="button"]').click(function (e) {
            e.preventDefault();
            var $btn = $(this),
                name = $btn.attr('name');
            $btn.focus().val('Zuzuweisende Taste drücken...').addClass('disabled').on('keydown', function (event) {
                event.preventDefault();
                var charCode = event.which || event.keyCode;
                if (charCode === 27) {
                    GM_setValue(name, -1);
                    $btn.blur().val('Keine Taste zugewiesen').removeClass('disabled').off(event).unbind('blur');
                } else {
                    GM_setValue(name, charCode);
                    $btn.blur().val(getKeyName(charCode)).removeClass('disabled').off(event).unbind('blur');
                }
            }).on('blur', function (event) {
                event.preventDefault();
                $btn.val('Keine Taste zugewiesen').removeClass('disabled').off(event).unbind('blur');
            });
        });
    }

    $(document).ready(function () {
        GM_addStyle(Template.css.options);
        $('#userMenu ul').append('<li><a href="index.php?form=UserProfileEdit&category=settings.general&show=BreadfishPlusPlus"><img src="http://forum.sa-mp.de/favicon.ico" alt=""> <span>Breadfish++</span></a></li>');
        if (BPPUtils.isTemplate(['tplUserProfileEdit', 'tplSubscriptions', 'tplModerationOverview', 'tplAccountManagement', 'tplAvatarEdit', 'tplSignatureEdit', 'tplBoardIgnore', 'tplWhiteListEdit', 'tplBlackListEdit', 'tplUserAttachmentList', 'tplModerationReports', 'tplModerationPosts', 'tplModerationThreads'])) {
            $('#profileEditContent ul').append('<li><a href="index.php?form=UserProfileEdit&category=settings.general&show=BreadfishPlusPlus" id="bpp_options_open"><img height="24" src="data:image/png;base64,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" alt=""> <span>Breadfish++</span></a></li>');
        }
        if (BPPUtils.getQuery('form') === 'UserProfileEdit' && BPPUtils.getQuery('category') === 'settings.general' && BPPUtils.getQuery('show') === 'BreadfishPlusPlus') {
            $('#profileEditContent ul li.activeTabMenu').removeClass('activeTabMenu');
            $('#bpp_options_open').parent('li').addClass('activeTabMenu');
            showOptions();
        }
    });
});