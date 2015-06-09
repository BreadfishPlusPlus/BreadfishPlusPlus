import _ from "lodash";
import $ from "jquery";
import NotificationTemplate from "templates/notification.hbs";

require("./styles/notification.less");

var Notification = function (options) {
    this.timestamp = Date.now();
    this.type = options.type || "info";
    this.title = options.title || null;
    this.onClick = options.onClick || null;
    this.onClose = options.onClose || null;
    this.icon = options.icon || null;
    this.width = options.width || null;
    this.message = options.message;
    this.hidedelay = options.hasOwnProperty("hidedelay") ? options.hidedelay : 5000;
    this.new = true;
    this.element = null;
};

var Queue = function () {
    var $queueElem, _queue, _remove, _redraw, _add, _checkHide;

    _queue = [];

    _checkHide = function () {
        var count = 0;
        _.each(_queue, function (m, index) {
            if (m.hidedelay) {
                if (Date.now() > (m.timestamp + m.hidedelay)) {
                    m.element.fadeOut(150, function () {
                        _remove(index);
                    });
                } else {
                    count += 1;
                }
            }
        });
        if (count > 0) {
            setTimeout(_checkHide, 1000);
        }
    };

    _add = function (_n) {
        _queue.push(_n);
        _queue = _.sortBy(_queue, function (_no) {
            return -_no.timestamp;
        });
        _redraw();
        _checkHide();
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
        $queueElem = $(NotificationTemplate({
            notifications: _queue
        }));

        _.each(_queue, function (m, index) {
            m.element = $queueElem.find(".bpp-notification").eq(index);
            if (m.icon) {
                m.element.css("background-image", m.icon ? "url(" + m.icon + ")" : "none");
            }
            if (m.width) {
                m.element.css("width", m.width + "px");
            }
        });

        $queueElem.appendTo("body");
        $queueElem.find(".bpp-notification").each(function (index) {
            if (_queue[index].new) {
                _queue[index].new = false;
                $(this).hide().fadeIn(150);
            }
        });
        $queueElem.find(".bpp-notification-close").click(function (event) {
            event.preventDefault();
            var $notification = $(this).parent(".bpp-notification"),
                index = parseInt($notification.attr("data-index"), 10);
            if (_queue[index].onClose) {
                _queue[index].onClose(_queue[index]);
            }
            $notification.fadeOut(150, function () {
                _remove(index);
            });
        });
        $queueElem.find(".bpp-notification-clickable").click(function (event) {
            event.preventDefault();
            var $notification = $(this);
            var index = parseInt($notification.attr("data-index"), 10);
            if (_queue[index].onClick) {
                _queue[index].onClick(_queue[index], function () {
                    $notification.fadeOut(150, function () {
                        _remove(index);
                    });
                });
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

let create = function (options) {
    if (!_.isObject(options)) {
        options = {
            message: options
        };
    }
    var _n = new Notification(options);
    notificationQueue.add(_n);
    return _n;
};
export default create;
