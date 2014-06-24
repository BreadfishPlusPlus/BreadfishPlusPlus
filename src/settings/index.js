/*jslint nomen: true*/
/*globals Blob, FileReader*/
"use strict";
var $               = require('lib/jquery');
var _               = require('lib/underscore');
var KeyboardJS      = require('lib/keyboard');
var Templates       = require('templates');
var utils           = require('utils');
var defaultOptions  = require('settings/default');
var storage         = require('storage')();
var popup           = require('ui/popup');

module.exports = function () {
    $('#userMenu ul').append(Templates.userMenuItem());

    //console.log(KeyboardJS);

    if (utils.getQuery('page') === 'BreadfishPlusPlus') {
        window.location.href = 'index.php?page=BreadfishPlusPlus/#/settings/';
    }

    if (utils.getQuery('page') === 'BreadfishPlusPlus/') {
        var setOptionsToValues, getKeyName, showCategory, parseHash;

        parseHash = function () {
            var hash = window.location.hash;
            if (hash[1] !== '/' || hash.slice(-1) !== '/') {
                return [];
            }
            return window.location.hash.slice(2, -1).split('/');
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
                window.location.hash = '#/settings/' + $('.bpp_option_category').first().attr('data-key') + '/';
            } else {
                var hash = parseHash();
                //if hash is settings
                if (hash[0] === 'settings') {
                    //set active tabmenu
                    $('a[href="index.php?page=BreadfishPlusPlus/#/settings/"]').parent('li').addClass('activeTabMenu');

                    //show subtabmenu
                    $('.subTabMenu ul').show();

                    //if hash has subcategory show it, else show first
                    if (hash.length > 1) {
                        if ($('[data-key="' + hash[1] + '"]').length > 0) {
                            $('a[href="index.php?page=BreadfishPlusPlus/#/' + hash[0] + '/' + hash[1] + '/"]').parent('li').addClass('activeSubTabMenu');
                            $('[data-key="' + hash[1] + '"]').show();
                        } else {
                            window.location.hash = '#';
                        }
                    } else {
                        window.location.hash = '#/settings/' + $('.bpp_option_category').first().attr('data-key') + '/';
                    }
                } else if (hash[0] === 'keyboard') {
                    $('a[href="index.php?page=BreadfishPlusPlus/#/keyboard/"]').parent('li').addClass('activeTabMenu');
                    $('[data-key="keyboardnav"]').show();
                } else if (hash[0] === 'nicknames') {
                    $('a[href="index.php?page=BreadfishPlusPlus/#/nicknames/"]').parent('li').addClass('activeTabMenu');
                    var tmpNicknames = storage.get('option.common.extension.nicknames') || {}, index = 0, alert;
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
                    $('[data-key="nicknames"]').html(Templates.optionNicknames({
                        nicknames: tmpNicknames,
                        alert: alert
                    })).show();
                } else if (hash[0] === 'importexport') {
                    $('a[href="index.php?page=BreadfishPlusPlus/#/importexport/"]').parent('li').addClass('activeTabMenu');

                    $('[data-key="importexport"]').html(Templates.optionImportExport({
                        blobURL: (window.webkitURL || window.URL).createObjectURL(new Blob([JSON.stringify(storage.getAll(), null, 4)], {type: "application/json"}))
                    })).show();

                    $('#importOptions').change(function (event) {
                        if (event.target.files.length > 0) {
                            var file = event.target.files[0],
                                reader = new FileReader();
                            reader.onloadend = function (evt) {
                                try {
                                    var importedOptions = JSON.parse(evt.target.result);
                                    storage.setAll(importedOptions);
                                    setOptionsToValues();
                                    console.log('Die Sicherungsdatei ist gültig!', importedOptions);
                                    popup.message('Die Sicherungsdatei wurde eingespielt.', 'info');
                                } catch (e) {
                                    console.log('Die Sicherungsdatei ist ungültig!', e);
                                    //popup.message('Die Sicherungsdatei ist ungültig!<br><code>' + e.toString() + '</code>', 'error');
                                    popup.confirm('Lorem Ipsum', 'Links', 'Rechts', function (button) {
                                        console.log('ajajajaja', button);
                                        popup.message('Button: ' + button);
                                    });
                                }
                            };
                            reader.readAsBinaryString(file);
                        }
                    });
                } else {
                    window.location.hash = '#';
                }
            }
        };

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

        setOptionsToValues = function () {
            $('.bpp_option').each(function () {
                var name = $(this).attr('name'),
                    type = $(this).attr('type'),
                    value;
                if (type === 'checkbox') {
                    $('input[name="' + name + '"]').prop('checked', storage.get(name) || false);
                } else if (type === 'range') {
                    value = storage.get(name) || $(this).attr('value');
                    $('input[name="' + name + '"]').val(value).parent('.formField').find('.indicator').text(value);
                } else if (type === 'button') {
                    $('input[name="' + name + '"]').val(getKeyName(storage.get(name) || -1));
                }
            });
        };

        //Change Page title
        document.title = 'Breadfish++ - breadfish.de - DIE deutschsprachige GTA-Community';

        //Remove content & Render Options template
        $('#errorMessage').hide();
        $('#main').append(Templates.options({
            defaultOptions: defaultOptions
        }));

        //Set options to current values
        setOptionsToValues();

        //show categories and listen for hashchange
        showCategory();
        $(window).on('hashchange', showCategory);

        //listen for settings change)
        $('.bpp_option_category').on('change', 'input[type="checkbox"]', function () {
            storage.set($(this).attr('name'), $(this).is(':checked'));
        });
        $('.bpp_option_category').on('change', 'input[type="range"]', function () {
            var val = parseInt($(this).val(), 10);
            storage.set($(this).attr('name'), val);
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
                    storage.set(name, -1);
                    $btn.blur().val('Keine Taste zugewiesen').removeClass('disabled').off(event).unbind('blur');
                } else {
                    storage.set(name, charCode);
                    $btn.blur().val(getKeyName(charCode)).removeClass('disabled').off(event).unbind('blur');
                }
            }).on('blur', function (event) {
                event.preventDefault();
                $btn.val('Keine Taste zugewiesen').removeClass('disabled').off(event).unbind('blur');
            });
        });
    }
};