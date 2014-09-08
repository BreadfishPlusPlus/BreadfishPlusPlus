/*jslint nomen: true*/
"use strict";
var _           = require('lib/underscore');
var $           = require('lib/jquery');
var utils       = require('./../utils');

require('./../styles/notification.less');

var Notification = function (options) {
    this.timestamp = Date.now();
    this.type = options.type || 'info';
    this.title = options.title || null;
    this.onClick = options.onClick || null;
    this.onClose = options.onClose || null;
    this.icon = options.icon || null;
    this.width = options.width || null;
    this.message = options.message;
    this.new = true;
};

var Queue = function () {
    var $queueElem, _queue, _remove, _redraw, _add;

    _queue = [];

    _add = function (_n) {
        _queue.push(_n);
        _queue = _.sortBy(_queue, function (_no) {
            return -_no.timestamp;
        });
        _redraw();
    };

    _remove = function (index) {
        _queue.splice(index, 1);
        _redraw();
    };

    _redraw = function () {
        if ($queueElem) {
            $queueElem.remove();
            $queueElem = null;
        }
        $queueElem = $(require('templates').notification({
            notifications: _queue
        }));

        _.each(_queue, function (m, index) {
            if (m.icon) {
                $queueElem.find('.bpp-notification').eq(index).css('background-image', m.icon ? 'url(' + m.icon + ')' : 'none');
            }
            if (m.width) {
                $queueElem.find('.bpp-notification').eq(index).css('width', m.width + 'px');
            }
        });

        $queueElem.appendTo('body');
        $queueElem.find('.bpp-notification').each(function (index) {
            if (_queue[index].new) {
                _queue[index].new = false;
                $(this).hide().fadeIn(150);
            }
        });
        $queueElem.find('.bpp-notification-close').click(function (event) {
            event.preventDefault();
            var $notification = $(this).parent('.bpp-notification'),
                index = parseInt($notification.attr('data-index'), 10);
            if (_queue[index].onClose) {
                _queue[index].onClose(_queue[index]);
            }
            $notification.fadeOut(150, function () {
                _remove(index);
            });
        });
        $queueElem.find('.bpp-notification-clickable').click(function (event) {
            event.preventDefault();
            var index = parseInt($(this).attr('data-index'), 10);
            if (_queue[index].onClick) {
                _queue[index].onClick(_queue[index]);
            }
        });
    };

    return {
        add: _add,
        remove: _remove,
        redraw: _redraw
    };
};
var notificationQueue = new Queue();

var create = function (options) {
    if (!_.isObject(options)) {
        options = {
            message: options
        };
    }
    var _n = new Notification(options);
    notificationQueue.add(_n);
    return _n;
};
exports.create = create;