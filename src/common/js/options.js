// ==UserScript==
// @name        Options
// @namespace   BreadfishPlusPlus
// @include     http://forum.sa-mp.de/*
// @exclude     http://forum.sa-mp.de/acp/*
// @all-frames  false
// @run-at      document-start
// ==/UserScript==
/*jslint unparam: true, nomen: true, browser: true*/
/*global BPPUtils, $, _, DefaultOptions, KeyboardJS, URL, webkitURL, Blob, FileReader, PNotify*/

BPPUtils.ready(function () {
    "use strict";

    $('#userMenu ul').append(BPPUtils.template('userMenuItem'));
    if (BPPUtils.getQuery('page') === 'BreadfishPlusPlus') {
        var showCategory, getKeyName, setOptionsToValues;

        BPPUtils.addMStyle(['pnotify_custom', 'jquery-ui', 'pnotify']);

        getKeyName = function (key) {
            var names = KeyboardJS.key.name(key);
            if (names.length === 0) {
                return 'Keine Taste zugewiesen';
            }
            if (names.length === 1) {
                return names[0].toUpperCase();
            }
            if (names.length > 1) {
                return names[0].toUpperCase() + ' (' + names[1].toUpperCase() + ')';
            }
        };

        showCategory = function () {
            //remove all actives from the tabmenu
            $('.activeTabMenu').removeClass('activeTabMenu');

            //remove all actives from the subtabmenu
            $('.activeSubTabMenu').removeClass('activeSubTabMenu');

            //hide subtabmenu
            $('.subTabMenu ul').hide();

            //Hide all categories except the first, or the one in the hash, + set subnav to active
            $('.bpp_option_category').hide();

            //if hash is empty, set to first settings category
            if (window.location.hash.substr(1).length === 0) {
                window.location.hash = '#settings-' + $('.bpp_option_category').first().attr('data-key');
            } else {
                //if hash is settings
                if (window.location.hash.substr(1, 8) === 'settings') {
                    //set active tabmenu
                    $('a[href="index.php?page=BreadfishPlusPlus#settings"]').parent('li').addClass('activeTabMenu');

                    //show subtabmenu
                    $('.subTabMenu ul').show();

                    //if hash has subcategory show it, else show first
                    if (window.location.hash.length > 9) {
                        $('a[href="index.php?page=BreadfishPlusPlus#' + window.location.hash.substr(1) + '"]').parent('li').addClass('activeSubTabMenu');
                        $('[data-key="' + window.location.hash.substr(10) + '"]').show();
                    } else {
                        window.location.hash = '#settings-' + $('.bpp_option_category').first().attr('data-key');
                    }
                } else if (window.location.hash.substr(1, 11) === 'keyboardnav') {
                    $('a[href="index.php?page=BreadfishPlusPlus#keyboardnav"]').parent('li').addClass('activeTabMenu');
                    $('[data-key="keyboardnav"]').show();
                } else if (window.location.hash.substr(1, 11) === 'nicknames') {
                    $('a[href="index.php?page=BreadfishPlusPlus#nicknames"]').parent('li').addClass('activeTabMenu');
                    var tmpNicknames = BPPUtils.storage.get('option.common.extension.nicknames', {}), index = 0, alert;
                    delete tmpNicknames.active;
                    if (Object.keys(tmpNicknames).length > 0) {
                        tmpNicknames = _.map(tmpNicknames, function (value, key) {
                            return _.extend(value, {
                                userId: key
                            });
                        });
                        for (index = 0; index < Object.keys(tmpNicknames).length; index += 1) {
                            tmpNicknames[index].cycle =  (index % 2) + 1;
                        }
                    } else {
                        alert = 'Du hast keine Spitznamen vergeben.';
                    }
                    $('[data-key="nicknames"]').html(BPPUtils.template('optionNicknames', {
                        nicknames: tmpNicknames,
                        alert: alert,
                        hasNicknames: Object.keys(tmpNicknames).length > 0
                    })).show();
                } else if (window.location.hash.substr(1, 12) === 'importexport') {
                    $('a[href="index.php?page=BreadfishPlusPlus#importexport"]').parent('li').addClass('activeTabMenu');

                    $('[data-key="importexport"]').html(BPPUtils.template('optionImportExport', {
                        blobURL: (window.webkitURL || window.URL).createObjectURL(new Blob([JSON.stringify(BPPUtils.storage.getAll(), null, 4)], {type: "application/json"}))
                    })).show();

                    $('#importOptions').change(function (event) {
                        if (event.target.files.length > 0) {
                            var file = event.target.files[0],
                                reader = new FileReader();
                            reader.onloadend = function (evt) {
                                try {
                                    var importedOptions = JSON.parse(evt.target.result);
                                    BPPUtils.log.debug('importedOptions', importedOptions);
                                    BPPUtils.storage.setAll(importedOptions);
                                    setOptionsToValues();
                                    new PNotify({
                                        title: '<strong>Die Sicherungsdatei wurde eingespielt.</srong>',
                                        type: 'success'
                                    });
                                } catch (e) {
                                    new PNotify({
                                        title: '<strong>Die Sicherungsdatei ist ungültig!</srong>',
                                        text: e.message,
                                        type: 'error'
                                    });
                                }
                            };
                            reader.readAsBinaryString(file);
                        }
                    });
                }
            }
        };

        setOptionsToValues = function () {
            $('.bpp_option').each(function () {
                var name = $(this).attr('name'),
                    type = $(this).attr('type'),
                    value;
                if (type === 'checkbox') {
                    $('input[name="' + name + '"]').prop('checked', BPPUtils.storage.get(name, false));
                } else if (type === 'range') {
                    value = BPPUtils.storage.get(name, $(this).attr('value'));
                    $('input[name="' + name + '"]').val(value).parent('.formField').find('.indicator').text(value);
                } else if (type === 'button') {
                    $('input[name="' + name + '"]').val(getKeyName(BPPUtils.storage.get(name, -1)));
                }
            });
        };

        //Change Page title
        document.title = 'Breadfish++ - breadfish.de - DIE deutschsprachige GTA-Community';

        //Remove content & Render Options template
        $('#main').empty().html(BPPUtils.template('options', {
            headlineIcon: 'http://i.imgur.com/4K8jM2W.png',
            defaultOptions: DefaultOptions
        }));

        //remove keyboard subnav entry
        $('a[href="index.php?page=BreadfishPlusPlus#settings-keyboardnav"]').parent('li').remove();

        //Set options to current values
        setOptionsToValues();

        //show categories and listen for hashchange
        showCategory();
        $(window).on('hashchange', showCategory);

        //listen for settings change)
        $('.bpp_option_category').on('change', 'input[type="checkbox"]', function () {
            BPPUtils.storage.set($(this).attr('name'), $(this).is(':checked'));
        });
        $('.bpp_option_category').on('change', 'input[type="range"]', function () {
            var val = parseInt($(this).val(), 10);
            BPPUtils.storage.set($(this).attr('name'), val);
            $(this).parent('.formField').find('.indicator').text(val);
        });
        $('.bpp_option_category').on('click', 'input[type="button"]', function (e) {
            e.preventDefault();
            var $btn = $(this),
                name = $btn.attr('name');
            $btn.focus().val('Zuzuweisende Taste drücken...').addClass('disabled').on('keydown', function (event) {
                event.preventDefault();
                var charCode = event.which || event.keyCode;
                if (charCode === 27) {
                    BPPUtils.storage.set(name, -1);
                    $btn.blur().val('Keine Taste zugewiesen').removeClass('disabled').off(event).unbind('blur');
                } else {
                    BPPUtils.storage.set(name, charCode);
                    $btn.blur().val(getKeyName(charCode)).removeClass('disabled').off(event).unbind('blur');
                }
            }).on('blur', function (event) {
                event.preventDefault();
                $btn.val('Keine Taste zugewiesen').removeClass('disabled').off(event).unbind('blur');
            });
        });
    }
});