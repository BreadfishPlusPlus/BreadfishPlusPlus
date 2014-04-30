// ==UserScript==
// @name        DesignFlat
// @namespace   BreadfishPlusPlus
// @include     http://forum.sa-mp.de/*
// @exclude     http://forum.sa-mp.de/acp/*
// @all-frames  false
// @run-at      document-start
// ==/UserScript==
/*jslint unparam: true, nomen: true, browser: true*/
/*global kango, BPPUtils, $, _*/

BPPUtils.immediately(function () {
    "use strict";

    var changeIcons = function () {
    
    };

    kango.invokeAsync('kango.storage.getItem', 'option_design_flat', function (active) {
        if (active) {


            //BPPUtils.addStyle('design_flat');
            $('link[href="http://forum.sa-mp.de/wcf/style/style-8.css"]').remove();
            $('head').append('<link rel="stylesheet" href="https://kittblog.com/wcf/style/style-42.css" type="text/css" />');

            /*changeIcons();

            $('.threadSort input[type="image"]').remove();
            $('.threadSort').parent('form').append('<input type="submit" class="threadSortSubmit" value="Absenden">');

            $('<div class="bes-right"></div>').insertAfter('#main');
            $('#main').addClass('bes-left');
            var $besRight = $('.bes-right');
            $('#globalAnnouncement').appendTo($besRight);
            $('#userPanel').appendTo($besRight);
            $('.border.infoBox').appendTo($besRight);
            $('.pageOptions').appendTo($besRight);
            $('#footer').appendTo($besRight);
            $('.copyright').html('<a href="http://www.woltlab.com/de/">Forensoftware: <strong>Burning Board®</strong>, entwickelt von <strong>WoltLab® GmbH</strong></a>');


            if (BPPUtils.isTemplate('tplThread')) {
                $('.message .messageNumber').each(function () {
                    $(this).text($(this).html().replace(/&nbsp;/g, ''));
                });
            }*/
        }
    });
});