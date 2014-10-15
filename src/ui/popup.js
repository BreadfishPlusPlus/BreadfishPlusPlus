var $           = require('lib/jquery');
var _           = require('lib/underscore');

require('./../styles/popup.less');

var message = function (msg, type) {
    var $modal, closeModal, modalCloseButtonClick, modalEscapePressed;

    $modal = $(require('templates').popupmessage({
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

    $modal.appendTo('body');

    $modal.fadeIn(150, function () {
        $modal.find('.bpp-popup-message').animate({
            top: '+=40px',
            opacity: 1
        }, 150, function () {
            $modal.trigger('focus');
        });
    });

    closeModal = function () {
        $modal.off('keyup', modalEscapePressed);
        $modal.off('click', 'button', modalCloseButtonClick);
        $modal.find('.bpp-popup-message').animate({
            top: '-=40px',
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

    $modal = $(require('templates').popupconfirm({
        question: question,
        leftLabel: leftLabel,
        rightLabel: rightLabel
    }));

    $modal.appendTo('body');

    $modal.fadeIn(150, function () {
        $modal.find('.bpp-popup-confirm').animate({
            top: '+=40px',
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
            top: '-=40px',
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

/*  fn(num, text)
        num
            0 === modal close (esc, X)
            1 === left button
            2 === right button
            3 === submit input
*/
var prompt = function (options, fn) {
    var $modal, closeModal, modalCloseButtonClick, modalEscapePressed, clickLeftButton, clickRightButton, submitInput;

    options.question = options.question || '';
    options.leftLabel = options.leftLabel || '';
    options.rightLabel = options.rightLabel || '';
    options.placeholder = options.placeholder || '';
    options.value = options.value || '';


    $modal = $(require('templates').popupprompt({
        question: options.question,
        leftLabel: options.leftLabel,
        rightLabel: options.rightLabel,
        placeholder: options.placeholder,
        value: options.value
    }));

    $modal.appendTo('body');

    $modal.fadeIn(150, function () {
        $modal.find('.bpp-popup-prompt').animate({
            top: '+=40px',
            opacity: 1
        }, 150, function () {
            $modal.trigger('focus');
        });
    });

    closeModal = function () {
        $modal.off('click', 'button', modalCloseButtonClick);
        $modal.off('keyup', modalEscapePressed);
        $modal.off('click', '.prompt-button-first', clickLeftButton);
        $modal.off('click', '.prompt-button-last', clickRightButton);
        $modal.off('keypress', '.prompt-input', submitInput);
        $modal.find('.bpp-popup-prompt').animate({
            top: '-=40px',
            opacity: 0
        }, 150, function () {
            $modal.fadeOut(150, function () {
                $modal.remove();
            });
        });
    };

    modalCloseButtonClick = function () {
        fn(0, $modal.find('.prompt-input').val());
        closeModal();
    };
    $modal.on('click', 'button', modalCloseButtonClick);

    modalEscapePressed = function (event) {
        if (event.which === 27) {
            fn(0, $modal.find('.prompt-input').val());
            closeModal();
        }
    };
    $modal.on('keyup', modalEscapePressed);

    clickLeftButton = function (event) {
        event.preventDefault();
        fn(1, $modal.find('.prompt-input').val());
        closeModal();
    };
    $modal.on('click', '.prompt-button-first', clickLeftButton);

    clickRightButton = function (event) {
        event.preventDefault();
        fn(2, $modal.find('.prompt-input').val());
        closeModal();
    };
    $modal.on('click', '.prompt-button-last', clickRightButton);

    submitInput = function (event) {
        if (event.which === 13) {
            fn(3, $modal.find('.prompt-input').val());
            closeModal();
            return false;
        }
    };
    $modal.on('keypress', '.prompt-input', submitInput);
};
exports.prompt = prompt;