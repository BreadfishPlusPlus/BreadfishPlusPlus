/*jslint nomen: true*/
"use strict";
var $           = require('lib/jquery');
var _           = require('lib/underscore');
var Templates   = require('templates');
var utils       = require('utils');
var $body       = $(document.body);

utils.addStyle('popup');

var message = function (msg, type) {
    var $modal, closeModal, modalCloseButtonClick, modalEscapePressed;

    $modal = $(Templates.popupmessage({
        message: msg,
        status: _.map([type], function (_type) {
            if (_type === 'info') {
                return {
                    icon: 'wcf/icon/infoM.png',
                    clazz: 'popup-info'
                };
            }
            if (_type === 'warning') {
                return {
                    icon: 'wcf/icon/warningM.png',
                    clazz: 'popup-warning'
                };
            }
            if (_type === 'error') {
                return {
                    icon: 'wcf/icon/errorM.png',
                    clazz: 'popup-error'
                };
            }
            if (_type === 'success') {
                return {
                    icon: 'wcf/icon/successM.png',
                    clazz: 'popup-success'
                };
            }
        })[0]
    }));

    $modal.appendTo($body);

    $modal.fadeIn(150, function () {
        $modal.find('.bpp-popup-message').animate({
            top: "+=40px",
            opacity: 1
        }, 150, function () {
            $modal.trigger('focus');
        });
    });

    closeModal = function () {
        $modal.off('keyup', modalEscapePressed);
        $modal.off('click', 'button', modalCloseButtonClick);
        $modal.find('.bpp-popup-message').animate({
            top: "-=40px",
            opacity: 0
        }, 150, function () {
            $modal.fadeOut(150, function () {
                $modal.remove();
            });
        });
    };

    modalCloseButtonClick = function () {
        closeModal();
    };
    $modal.on('click', 'button', modalCloseButtonClick);

    modalEscapePressed = function (event) {
        if (event.which === 27) {
            closeModal();
        }
    };
    $modal.on('keyup', modalEscapePressed);
};
exports.message = message;

var confirm = function (question, leftLabel, rightLabel, fn) {
    var $modal, closeModal, modalCloseButtonClick, modalEscapePressed, clickLeftButton, clickRightButton;

    $modal = $(Templates.popupconfirm({
        question: question,
        leftLabel: leftLabel,
        rightLabel: rightLabel
    }));

    $modal.appendTo($body);

    $modal.fadeIn(150, function () {
        $modal.find('.bpp-popup-confirm').animate({
            top: "+=40px",
            opacity: 1
        }, 150, function () {
            $modal.trigger('focus');
        });
    });

    closeModal = function () {
        $modal.off('click', 'button', modalCloseButtonClick);
        $modal.off('keyup', modalEscapePressed);
        $modal.off('click', '.confirm-button-first', clickLeftButton);
        $modal.off('click', '.confirm-button-last', clickRightButton);
        $modal.find('.bpp-popup-confirm').animate({
            top: "-=40px",
            opacity: 0
        }, 150, function () {
            $modal.fadeOut(150, function () {
                $modal.remove();
            });
        });
    };

    modalCloseButtonClick = function () {
        fn(0);
        closeModal();
    };
    $modal.on('click', 'button', modalCloseButtonClick);

    modalEscapePressed = function (event) {
        if (event.which === 27) {
            fn(0);
            closeModal();
        }
    };
    $modal.on('keyup', modalEscapePressed);

    clickLeftButton = function (event) {
        event.preventDefault();
        fn(1);
        closeModal();
    };
    $modal.on('click', '.confirm-button-first', clickLeftButton);

    clickRightButton = function (event) {
        event.preventDefault();
        fn(2);
        closeModal();
    };
    $modal.on('click', '.confirm-button-last', clickRightButton);
};
exports.confirm = confirm;