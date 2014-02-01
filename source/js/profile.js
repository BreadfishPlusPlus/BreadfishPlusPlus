$(function () {
    "use strict";
    GM_log('executing profile.js');

    function setProfileNickname(userId, nick, name) {
        nick = nick || name;
        document.title = 'Profil von »' + nick + '« - Mitglieder - breadfish.de - DIE deutschsprachige GTA-Community';
        $('.headlineContainer h2 a').text('Profil von »' + nick + '«');
        $('.userName > span').text(nick);
        $('.twoRows li a img[src="wcf/icon/vCardM.png"]').parent('a').find('span').text(nick);
        $('.friendsConnection > h3.light').text('Ihre Verbindung zu »' + nick + '«');
        $('.userName img[src="wcf/icon/onlineS.png"]').attr('title', '»' + nick + '« ist online');
        $('.userName img[src="wcf/icon/offlineS.png"]').attr('title', '»' + nick + '« ist offline');
        $('.userStatus img[src="wcf/icon/genderMaleS.png"]').attr('title', '»' + nick + '« männlich');
        $('.userStatus img[src="wcf/icon/genderFemaleS.png"]').attr('title', '»' + nick + '« weiblich');
        $('ul.dataList .smallFont:contains(Beiträge)').parent('.containerContent').find('a').attr('title', 'Beiträge von »' + nick + '« suchen');
    }

    function setupNickname() {
        var userId = parseInt($('input[name="userID"]').val(), 10),
            $contentBox = $('.container-1.column.first .columnInner .contentBox .subHeadline:contains("Persönliche Informationen")').parent('.contentBox'),
            container = $contentBox.find('.dataList li').last().hasClass('container-1') ? 'container-2' : 'container-1',
            nick = BPPUtils.nicknames.get(userId),
            name = $('.userName > span').text(),
            $alert = $('<div class="success" id="nicknameMessage"></div>');
        $alert.insertAfter($contentBox.find('.subHeadline'));
        $alert.hide();
        $contentBox.find('.dataList').append('<li class="' + container + ' formElement"><p class="formFieldLabel">Spitzname</p><p class="formField"><input type="text" id="bpp_nickname_input" value="' + nick + '"><button id="bpp_nickname_submit">Speichern</button></p></li>');
        $('#bpp_nickname_submit').click(function (event) {
            event.preventDefault();
            nick = $('#bpp_nickname_input').val();
            if (nick.length > 0) {
                BPPUtils.nicknames.set(userId, name, nick);
                $alert.text('Spitzname gespeichert!').show().delay(5000).fadeOut();
            } else {
                BPPUtils.nicknames.remove(userId);
                $alert.text('Spitzname entfernt!').show().delay(5000).fadeOut();
            }
            setProfileNickname(userId, nick, name);
        });
        setProfileNickname(userId, nick, name);
    }

    function setupUsernote() {
        var userId = parseInt($('input[name="userID"]').val(), 10), $userNoteMessage;

        if ($("#profileContent").length !== 0) {
            $('#profileContent > ul').append('<li><a href="index.php?page=User&amp;userID=' + userId + '&userNote=go" id="editUserNote"><img src="wcf/icon/fileTypeIconTextM.png" alt=""> <span>Notiz</span></a></li>');
        } else {
            $("#main > .border:not(#userCard)").first().before('<div id="profileContent" class="tabMenu"><ul><li class="activeTabMenu"><a href="index.php?page=User&amp;userID=' + userId + '"><img src="wcf/icon/profileM.png" alt=""> <span>Profil</span></a></li><li><a href="index.php?page=User&amp;userID=' + userId + '&userNote=go" id="editUserNote"><img src="wcf/icon/fileTypeIconTextM.png" alt=""> <span>Notiz</span></a></li></ul></div><div class="subTabMenu"><div class="containerHead"><div></div></div></div>');
        }
        if (BPPUtils.getParameterByName('userNote', document.URL).length !== 0) {
            $("#profileContent li.activeTabMenu").removeClass("activeTabMenu");
            $('#editUserNote').closest("li").addClass("activeTabMenu");

            $(".columnContainer, .tabMenuContent").html('<div class="container-1 column first"><div class="columnInner"><div class="contentBox"><h3 class="subHeadline">Notiz</h3><div class="success" id="userNoteMessage">Notiz gespeichert!</div><textarea id="userNoteInput" style="min-height: 200px;">' + BPPUtils.usernotes.get(userId) + '</textarea><div class="formSubmit"><input type="submit" id="userNoteSubmit"></div></div></div></div>');
            $userNoteMessage = $('#userNoteMessage');
            $userNoteMessage.hide();
            $('#userNoteSubmit').click(function (event) {
                event.preventDefault();
                var note = $('#userNoteInput').val();
                if (note.length === 0) {
                    BPPUtils.usernotes.remove(userId);
                    $userNoteMessage.show().delay(5000).fadeOut();
                } else {
                    BPPUtils.usernotes.set(userId, $('.userName > span').text(), note);
                    $userNoteMessage.show().delay(5000).fadeOut();
                }
            });
        }
    }

    $(document).ready(function () {
        if (BPPUtils.isTemplate('tplUserProfile')) {
            if (GM_getValue('option_profile_filter_thanks', false)) {
                $('#profileContent ul li a img[src="icon/thankM.png"]').closest('li').remove();
            }
            if (GM_getValue('option_profile_filter_postcount', false)) {
                $('ul.dataList > li .containerContent > .smallFont:contains(Beiträge)').closest('li').remove();
                $('.subHeadline > a:contains("Beiträge")').siblings('span').remove();
            }
            if (GM_getValue('option_profile_filter_usertitle', false)) {
                $('.userPersonals .userTitle').remove();
            }
            if (GM_getValue('option_profile_filter_userrank', false)) {
                $('.userPersonals .userRank').first().remove();
            }
            if (GM_getValue('option_profile_filter_additionalUserrank', false)) {
                $('.userPersonals .userRank').last().remove();
            }
            if (GM_getValue('option_profile_filter_gender', false)) {
                $('ul.dataList > li.formElement > .formFieldLabel:contains(Geschlecht)').closest('li').remove();
            }
            if (GM_getValue('option_profile_filter_regdate', false)) {
                $('ul.dataList > li .containerContent > .smallFont:contains(Registrierungsdatum)').closest('li').remove();
            }
            if (GM_getValue('option_profile_filter_aboutMe', false)) {
                var $subH = $('h3.subHeadline:contains(Über mich)');
                $subH.parent('.contentBox').find('> .dataList').remove();
                $subH.parent('.contentBox').find('.signature').css('border-top', 'none');
                $subH.remove();
            }
            if (GM_getValue('option_profile_filter_birthday', false)) {
                $('ul.dataList > li.formElement > .formFieldLabel:contains(Geburtstag)').closest('li').remove();
            }
            if (GM_getValue('option_profile_filter_location', false)) {
                $('ul.dataList > li.formElement > .formFieldLabel:contains(Wohnort)').closest('li').remove();
            }
            if (GM_getValue('option_profile_filter_occupation', false)) {
                $('ul.dataList > li.formElement > .formFieldLabel:contains(Beruf)').closest('li').remove();
            }
            if (GM_getValue('option_profile_filter_hobbys', false)) {
                $('ul.dataList > li.formElement > .formFieldLabel:contains(Hobbys)').closest('li').remove();
            }
            if (GM_getValue('option_profile_filter_tsuid', false)) {
                $('ul.dataList > li.formElement > .formFieldLabel:contains(Teamspeak UID)').closest('li').remove();
            }
            if (GM_getValue('option_profile_filter_xblGamertag', false)) {
                $('ul.dataList > li.formElement > .formFieldLabel:contains(XBL Gamertag)').closest('li').remove();
            }
            if (GM_getValue('option_profile_filter_psnid', false)) {
                $('ul.dataList > li.formElement > .formFieldLabel:contains(PSN ID)').closest('li').remove();
            }
            if (GM_getValue('option_profile_filter_steam', false)) {
                $('ul.dataList > li.formElement > .formFieldLabel:contains(Steam)').closest('li').remove();
            }
            if (GM_getValue('option_profile_filter_origin', false)) {
                $('ul.dataList > li.formElement > .formFieldLabel:contains(Origin)').closest('li').remove();
            }
            if (GM_getValue('option_profile_filter_website', false)) {
                $('ul.twoRows > li > a > .smallFont:contains(Website)').closest('li').remove();
            }
            if (GM_getValue('option_profile_filter_icq', false)) {
                $('ul.twoRows > li > a > .smallFont:contains(ICQ)').closest('li').remove();
            }
            if (GM_getValue('option_profile_filter_msn', false)) {
                $('ul.twoRows > li > a > .smallFont:contains(Windows Live)').closest('li').remove();
            }
            if (GM_getValue('option_profile_filter_skype', false)) {
                $('ul.twoRows > li > a > .smallFont:contains(Skype)').closest('li').remove();
            }
            setupNickname();
            setupUsernote();
        }
    });
});