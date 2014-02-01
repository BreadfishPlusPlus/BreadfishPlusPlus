$(function () {
    "use strict";
    GM_log('executing posts.js');

    function getYoutubeLength(totalSec) {
        var hours = parseInt(totalSec / 3600, 10) % 24, minutes = parseInt(totalSec / 60, 10) % 60, seconds = parseInt(totalSec % 60, 10);
        return (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds);
    }

    function showYoutubePreview() {
        var mNames = ['Jan', 'Feb', 'Mrz', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
            width = $('.message:not(.quickReply):not(.deleted) .messageBody > div').first().width();
        $('.message:not(.quickReply):not(.deleted) .messageContentInner object').each(function () {
            var $object = $(this),
                videoId = $object.attr('data').substr(-17, 11);

            $object.attr('id', 'object-' + videoId);
            $object.hide();

            GM_xmlhttpRequest({
                method: 'GET',
                url: 'http://gdata.youtube.com/feeds/api/videos/' + videoId + '?v=2&alt=json',
                headers : {"Content-Type": "application/x-www-form-urlencoded"},
                onload: function (response) {
                    if (response.status === 200) {
                        var data = JSON.parse(response.responseText),
                            date = new Date(data.entry.media$group.yt$uploaded.$t),
                            $preview = $(BPPUtils.nano('youtubePreview', {
                                'thumbnail': data.entry.media$group.media$thumbnail[0].url,
                                'title': data.entry.title.$t,
                                'author': data.entry.author[0].name.$t,
                                'day': date.getDate(),
                                'month': mNames[date.getMonth()],
                                'year': date.getFullYear(),
                                'hours': date.getHours(),
                                'minutes': date.getMinutes(),
                                'length': getYoutubeLength(data.entry.media$group.yt$duration.seconds),
                                'clicks': data.entry.yt$statistics.viewCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
                                'videoId': videoId
                            }));
                        $object.replaceWith($preview);
                        $preview.find('.bpp_youtube_preview_link').click(function (e) {
                            e.preventDefault();
                            $preview.replaceWith('<iframe width="' + width + '" height="' + (width / 16 * 9) + '" src="//www.youtube-nocookie.com/embed/' + videoId + '?rel=0" frameborder="0" allowfullscreen></iframe>');
                        });
                    } else {
                        $object.show();
                    }
                }
            });
        });
    }

    function addShortUrls() {
        $('.message:not(.quickReply):not(.deleted)').each(function () {
            var $elem = $(this),
                id = $elem.attr('id').substr(7),
                url = 'http://sa-mp.de/B++/p' + id + '-/';
            $elem.find('.messageFooterRight .smallButtons > ul').append('<li><a class="bpp_shorturl" href="' + url + '" title="Kurz-URL zu diesem Beitrag"><img src="wcf/icon/wysiwyg/linkInsertM.png" height="14" alt=""> <span>Kurz-URL</span><input class="bpp_shorturl_input" type="text" value="' + url + '" /></a></li>');
        });
        $('.bpp_shorturl').click(function (e) {
            e.preventDefault();
            $(this).find('span').hide();
            $(this).find('input').show().select();
        });
        $('.bpp_shorturl_input').blur(function () {
            $(this).siblings('span').show();
            $(this).hide();
        });
    }

    function setSidebarThanks(userID, thanks) {
        var $bpp_thanks = $('.bpp_thanks[data-userID="' + userID + '"]');
        if (thanks === -2) {
            $bpp_thanks.parent('p').hide();
        } else if (thanks === -1) {
            $bpp_thanks.html('<img src="icon/thankS.png" alt="" /> <img src="icon/thankLoadS.gif" alt="" />');
        } else {
            $bpp_thanks.html('<img src="icon/thankS.png" alt="" /> ' + thanks);
        }
    }

    function getThanks(userID, callback) {
        var baseUrl = window.location.protocol + '//' + window.location.hostname + '/';
        GM_xmlhttpRequest({
            method: "GET",
            url: baseUrl + 'index.php?page=UserThankList&userID=' + userID,
            headers : {"Content-Type": "application/x-www-form-urlencoded"},
            onload: function (resp) {
                if (resp.status === 200) {
                    var data = $(resp.responseText), arr, pages, thanks;
                    if (data.find('.error').length === 0) {
                        arr = data.find('.pageNavigation ul li:not(.skip):not(.children)').toArray();
                        pages = parseInt($(arr[arr.length - 1]).text(), 10);
                        thanks = 0;
                        if (isNaN(pages)) {
                            thanks = parseInt(data.find('.tableList tbody tr').length, 10);
                            callback(thanks);
                        } else {
                            GM_xmlhttpRequest({
                                method: "GET",
                                url: baseUrl + 'index.php?page=UserThankList&userID=' + userID + '&pageNoGot=' + pages,
                                headers : {"Content-Type": "application/x-www-form-urlencoded"},
                                onload: function (resp2) {
                                    var data2 = $(resp2.responseText);
                                    thanks = parseInt(data2.find('.tableList tbody tr').length, 10);
                                    thanks += (pages - 1) * 10;
                                    BPPUtils.thanks.set(userID, thanks);
                                    callback(thanks);
                                }
                            });
                        }
                    }
                } else {
                    BPPUtils.thanks.set(userID, -2);
                    callback(-2);
                }
            }
        });
    }

    function showThanks() {
        var users = [];
        $('.message:not(.quickReply):not(.deleted)').each(function () {
            var $elem = $(this),
                userID = parseInt(BPPUtils.getParameterByName('userID', $elem.find('.messageAuthor .userName a').attr('href')), 10);
            if (users.indexOf(userID) === -1 && !isNaN(userID)) {
                users.push(userID);
            }
            $elem.find('.userCredits').append('<p><a class="bpp_thanks" data-userID="' + userID + '" href="index.php?page=UserThankList&userID=' + userID + '"><img src="icon/thankS.png" alt="" /> <img src="icon/thankLoadS.gif" alt="" /></a></p>');
        });
        $.each(users, function (index, userID) {
            var cachedThanks = BPPUtils.thanks.get(userID);
            if (cachedThanks !== -1) {
                setSidebarThanks(userID, cachedThanks);
            }
            getThanks(userID, function (thanks) {
                setSidebarThanks(userID, thanks);
            });
        });
    }

    function setupImageresize() {
        var pos = null;
        $(document).on('mousedown mousemove mouseup mouseout', '.resizeImage,.bpp_resizeImage', function (event) {
            if (event.type === 'mousedown') {
                if (event.which === 1) {
                    pos = [event.offsetX, event.offsetY];
                }
            } else if (event.type === 'mousemove') {
                if (pos !== null) {
                    var dif = (pos[0] - event.offsetX) + (pos[1] - event.offsetY) / 2;
                    $(this).css({
                        "width": '-=' + dif,
                        "height": "auto"
                    });
                    pos = [event.offsetX, event.offsetY];
                    event.preventDefault();
                }
            } else if (event.type === 'mouseup') {
                if (event.which === 1 && pos !== null) {
                    pos = null;
                    event.preventDefault();
                }
            } else if (event.type === 'mouseout') {
                pos = null;
            }
        });
    }

    function replaceYoutubeVideos() {
        $('.message:not(.quickReply):not(.deleted) .messageContentInner object').each(function () {
            var $object = $(this),
                videoId = $object.attr('data').substr(-17, 11);
            $object.replaceWith('<a href="http://www.youtube.com/watch?v=' + videoId + '" class="externalURL">http://www.youtube.com/watch?v=' + videoId + '</a>');
        });
    }

    function removeDeletedPosts() {
        $('.messageMinimized:not(.quickReply) > .messageInner > img[src="icon/postTrashM.png"]').closest('.messageMinimized').remove();
    }

    function removeThanko() {
        $('li.postThankButton, .thankStats').remove();
    }

    function removeIgnored() {
        $('.messageMinimized:not(.quickReply) > .messageInner > img[src="wcf/icon/warningM.png"]').closest('.messageMinimized').remove();
    }

    function removeBestAnswer() {
        GM_addStyle('#helpfulAnswer{display:none!important;}.helpfulAnswerPost .messageInner .messageSidebar{background-image: none!important;}');
    }

    function signatureHeight() {
        $('.signature').css('max-height', 'none');
    }

    function removeUserCredits() {
        $('.userCredits').each(function () {
            var $elem = $(this);
            if ($elem.children().length === 0) {
                $elem.remove();
            }
        });
    }

    function removePostcount() {
        $('.userCredits p > a:contains("Beiträge")').parent('p').remove();
        removeUserCredits();
    }

    function removeUsertitle() {
        $('.userTitle').remove();
    }

    function removeUserrank() {
        $('.messageAuthor').each(function () {
            $(this).find('.userRank').first().remove();
        });
    }

    function removeAdditionalUserrank() {
        $('.messageAuthor').each(function () {
            if ($(this).find('.userRank').length > 1) {
                $(this).find('.userRank').last().remove();
            }
        });
    }

    function removeRegDate() {
        $('.userCredits p:contains("Registrierungsdatum: ")').remove();
        removeUserCredits();
    }

    function removeUserSymbols() {
        $('.userSymbols').each(function () {
            var $elem = $(this);
            if ($elem.find('ul').children().length === 0) {
                $elem.remove();
            }
        });
    }

    function removeGender() {
        $('.userSymbols img[src="wcf/icon/genderMaleS.png"], .userSymbols img[src="wcf/icon/genderFemaleS.png"]').parent('li').remove();
        removeUserSymbols();
    }

    function removeXblGamertag() {
        $('.userCredits p:contains("XBL Gamertag: ")').remove();
        removeUserCredits();
    }

    function removePsnid() {
        $('.userCredits p:contains("PSN ID: ")').remove();
        removeUserCredits();
    }

    function removeSteam() {
        $('.userCredits p:contains("Steam: ")').remove();
        removeUserCredits();
    }

    function removeOrigin() {
        $('.userCredits p:contains("Origin: ")').remove();
        removeUserCredits();
    }

    function removeUserMessenger() {
        $('.userMessenger').each(function () {
            var $elem = $(this);
            if ($elem.find('ul').children().length === 0) {
                $elem.remove();
            }
        });
    }

    function removeSkype() {
        $('.userMessenger img[src="wcf/icon/skypeS.png"]').closest('li').remove();
        removeUserMessenger();
    }

    function removeWindowsLiveMessenger() {
        $('.userMessenger img[src="wcf/icon/msnS.png"]').closest('li').remove();
        removeUserMessenger();
    }

    function removeIcq() {
        $('.userMessenger img[src="wcf/icon/icqS.png"]').closest('li').remove();
        removeUserMessenger();
    }

    function removeWebsite() {
        $('.userMessenger img[src="wcf/icon/websiteS.png"]').closest('li').remove();
        removeUserMessenger();
    }

    function setupNicknames() {
        $('.message:not(.quickReply):not(.deleted)').each(function () {
            var $element = $(this),
                userId = parseInt(BPPUtils.getParameterByName('userID', $element.find('.messageSidebar .messageAuthor .userName a').attr('href')), 10),
                nick = BPPUtils.nicknames.get(userId);
            if (nick.length > 0) {
                $element.find('.messageAuthor .userName a, .userAvatar a').attr('title', 'Benutzerprofil von »' + nick + '« aufrufen');
                $element.find('.messageAuthor .userName a span').last().text(nick);
                $element.find('.messageAuthor .userName img[src="wcf/icon/offlineS.png"]').attr('title', '»' + nick + '« ist offline');
                $element.find('.messageAuthor .userName img[src="wcf/icon/onlineS.png"]').attr('title', '»' + nick + '« ist online');
                $element.find('.userSymbols ul li img[src="wcf/icon/genderMaleS.png"]').attr('title', '»' + nick + '« ist männlich');
                $element.find('.userSymbols ul li img[src="wcf/icon/genderFemaleS.png"]').attr('title', '»' + nick + '« ist weiblich');
                $element.find('.userMessenger ul li a img[src="wcf/icon/websiteS.png"]').attr('title', 'Persönliche Website von »' + nick + '« besuchen');
                $element.find('.userMessenger ul li a img[src="wcf/icon/skypeS.png"]').attr('title', '»' + nick + '« über Skype kontaktieren');
            }
        });
    }

    function setupUsernoteIcon() {
        $('.message:not(.quickReply):not(.deleted)').each(function () {
            var $element = $(this),
                userId = parseInt(BPPUtils.getParameterByName('userID', $element.find('.messageSidebar .messageAuthor .userName a').attr('href')), 10),
                note = BPPUtils.usernotes.get(userId) || 'Notiz hinzufügen';
            $element.find('.messageSidebar .userMessenger ul').prepend('<li><a href="index.php?page=User&userID=' + userId + '&userNote=go" id="showNote" title="' + note + '"><img src="wcf/icon/fileTypeIconTextM.png" height="16"></a></li>');
        });
    }

    $(document).ready(function () {
        if (BPPUtils.isTemplate('tplThread')) {
            GM_addStyle(Template.css.posts);
            if (GM_getValue('option_posts_extension_shorturl', false)) {
                addShortUrls();
            }
            if (GM_getValue('option_posts_extension_youtubePreview', false) && !GM_getValue('option_posts_filter_youtube', false)) {
                showYoutubePreview();
            }
            if (GM_getValue('option_posts_extension_thanks', false)) {
                showThanks();
            }
            if (GM_getValue('option_posts_extension_signatureHeight', false)) {
                signatureHeight();
            }
            if (GM_getValue('option_posts_extension_imageResize', false)) {
                setupImageresize();
            }
            if (GM_getValue('option_posts_filter_youtube', false)) {
                replaceYoutubeVideos();
            }
            if (GM_getValue('option_posts_filter_deleted', false)) {
                removeDeletedPosts();
            }
            if (GM_getValue('option_posts_filter_thanko', false)) {
                removeThanko();
            }
            if (GM_getValue('option_posts_filter_ignored', false)) {
                removeIgnored();
            }
            if (GM_getValue('option_posts_filter_bestans', false)) {
                removeBestAnswer();
            }
            if (GM_getValue('option_posts_filter_postcount', false)) {
                removePostcount();
            }
            if (GM_getValue('option_posts_filter_usertitle', false)) {
                removeUsertitle();
            }
            if (GM_getValue('option_posts_filter_userrank', false)) {
                removeUserrank();
            }
            if (GM_getValue('option_posts_filter_additionalUserrank', false)) {
                removeAdditionalUserrank();
            }
            if (GM_getValue('option_posts_filter_regdate', false)) {
                removeRegDate();
            }
            if (GM_getValue('option_posts_filter_gender', false)) {
                removeGender();
            }
            if (GM_getValue('option_posts_filter_xblGamertag', false)) {
                removeXblGamertag();
            }
            if (GM_getValue('option_posts_filter_psnid', false)) {
                removePsnid();
            }
            if (GM_getValue('option_posts_filter_steam', false)) {
                removeSteam();
            }
            if (GM_getValue('option_posts_filter_origin', false)) {
                removeOrigin();
            }
            if (GM_getValue('option_posts_filter_website', false)) {
                removeWebsite();
            }
            if (GM_getValue('option_posts_filter_icq', false)) {
                removeIcq();
            }
            if (GM_getValue('option_posts_filter_msn', false)) {
                removeWindowsLiveMessenger();
            }
            if (GM_getValue('option_posts_filter_skype', false)) {
                removeSkype();
            }
            setupNicknames();
            setupUsernoteIcon();
        }
    });
});