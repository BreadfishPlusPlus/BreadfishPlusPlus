// ==UserScript==
// @name        Options
// @namespace   BreadfishPlusPlus
// @include     http://forum.sa-mp.de/*
// @exclude     http://forum.sa-mp.de/acp/*
// @all-frames  false
// @run-at      document-start
// @require     js/lib/highlight.pack.min.js
// @require     js/lib/hogan-2.0.0.min.js
// @require     js/lib/jquery-1.11.1.min.js
// @require     js/lib/jquery-ui-1.10.4.min.js
// @require     js/lib/jquery.lazyload.min.js
// @require     js/lib/jquery.withinViewport.js
// @require     js/lib/keyboard-0.4.1.js
// @require     js/lib/moment-with-langs.min.js
// @require     js/lib/pnotify.custom.min.js
// @require     js/lib/tooltip-3.1.1.js
// @require     js/lib/underscore-1.6.0.min.js
// @require     js/config.js
// @require     js/defaultOptions.js
// @require     js/smilies.js
// @require     js/templates.js
// ==/UserScript==
/*jslint unparam: true, nomen: true*/
/*global $, Template, Hogan, _, moment, PNotify, Config*/
"use strict";

//change moment lang globally
moment.lang('de');

//change notify style
PNotify.prototype.options.styling = 'jqueryui';
PNotify.prototype.options.addclass = 'stack-bottomright';
PNotify.prototype.options.stack = {
    "dir1": "up",
    "dir2": "left"
};
PNotify.prototype.options.buttons.labels = {
    close: "Schliessen",
    stick: "Anpinnen"
};

var BPPUtils = {
    version: '2.1.2',
    templateName: function () {
        if (!this._templateName) {
            this._templateName = document.querySelector('body').id;
        }
        return this._templateName;
    },
    isTemplate: function (arr) {
        if (!(arr instanceof Array)) {
            arr = [arr];
        }
        return arr.indexOf(this.templateName()) > -1;
    },
    getParameterByName: function (name, from) { //http://stackoverflow.com/a/901144
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(from);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    },
    getSecurityToken: function () {
        return this.getParameterByName('t', $('#userMenuLogout > a').attr('href'));
    },
    getQuery: function (name) {
        return this.getParameterByName(name, document.URL) || null;
    },
    escapeHtml: function (html) {
        return $('<div/>').text(html).html();
    },
    template: function (templateName, data) {
        return Hogan.compile(Template.html[templateName]).render(data);
    },
    addStyle: function (name, css) {
        var style = document.createElement('style'), head = document.getElementsByTagName('head')[0];
        style.textContent = name ? Template.css[name] : css;
        if (head) {
            head.appendChild(style);
        }
    },
    addMStyle: function (arr) {
        if (!(arr instanceof Array)) {
            arr = [arr];
        }
        var style = '';
        _.each(arr, function (name) {
            style += Template.css[name] + '\n';
        });
        return BPPUtils.addStyle(null, style);
    },
    addScript: function (js) {
        var s = document.createElement('script');
        s.type = 'text/javascript';
        try {
            s.appendChild(document.createTextNode(js));
        } catch (e) {
            s.text = js;
        } finally {
            document.body.appendChild(s);
        }
    },
    pad: function (num) {
        var s = "0" + num;
        return s.substr(s.length - 2);
    },
    formatTime: function (sec_num) {
        var hours = Math.floor(sec_num / 3600),
            minutes = Math.floor((sec_num - (hours * 3600)) / 60),
            seconds = sec_num - (hours * 3600) - (minutes * 60),
            time = '';

        if (hours > 0) {
            time += (hours + ':');
            time += (BPPUtils.pad(minutes, 2) + ':');
        } else {
            time += (minutes + ':');
        }
        time += BPPUtils.pad(seconds, 2);
        return time;
    },
    immediately: function (fn) {
        fn();
    },
    ready: function (fn) {
        $(document).ready(fn);
    },
    load: function (fn) {
        $(window).load(fn);
    },
    asyncLoop: function (iterations, func, callback) { //http://stackoverflow.com/a/4288992
        var index = 0, done = false, loop = {
            next: function () {
                if (done) {
                    return;
                }
                if (index < iterations) {
                    index += 1;
                    func(loop);
                } else {
                    done = true;
                    callback();
                }
            },
            iteration: function () {
                return index - 1;
            },
            break: function () {
                done = true;
                callback();
            }
        };
        loop.next();
        return loop;
    },
    storage: new Config(),
    log: {
        error: function () {
            var args = Array.prototype.slice.call(arguments, 0);
            args.splice(0, 0, "[B++][ERROR]");
            console.log.apply(console, args);
        },
        debug: function () {
            if (BPPUtils.storage.get('option.debugmode', false)) {
                var args = Array.prototype.slice.call(arguments, 0);
                args.splice(0, 0, "[B++][DEBUG]");
                console.log.apply(console, args);
           }
        }
    },
    ajax: function (options, callback) {
        $.ajax(_.extend(options, {
            complete: function (jqXHR) {
                callback(jqXHR.responseText, jqXHR.status, jqXHR);
            }
        }));
    }
};



$.fn.replaceAttr = function (attr, search, replace) {
    this.each(function () {
        var val = $(this).attr(attr);
        $(this).attr(attr, val.replace(new RegExp($.ui.autocomplete.escapeRegex(search), 'i'), replace));
    });
    return this;
};
$.fn.replaceText = function (search, replace) {
    this.each(function () {
        var val = $(this).text();
        $(this).text(val.replace(new RegExp($.ui.autocomplete.escapeRegex(search), 'i'), replace));
    });
    return this;
};
$.fn.replaceHtml = function (search, replace) {
    this.each(function () {
        var val = $(this).html();
        $(this).html(val.replace(new RegExp($.ui.autocomplete.escapeRegex(search), 'i'), replace));
    });
    return this;
};