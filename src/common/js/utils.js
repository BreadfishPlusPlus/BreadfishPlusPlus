// ==UserScript==
// @name        Options
// @namespace   BreadfishPlusPlus
// @require     js/lib/jquery-1.11.0.min.js
// @require     js/lib/keyboard-0.4.1.js
// @require     js/lib/hogan-2.0.0.min.js
// @require     js/lib/tooltip-3.1.1.js
// @require     js/lib/underscore-1.6.0.min.js
// @require     js/lib/jquery.withinViewport.js
// @require     js/lib/alertify.min.js
// @require     js/lib/highlight.pack.min.js
// @require     js/lib/jquery.lazyload.min.js
// @require     js/defaultOptions.js
// @require     js/templates.js
// @require     js/smilies.js
// @include     http://forum.sa-mp.de/*
// @exclude     http://forum.sa-mp.de/acp/*
// @all-frames  false
// ==/UserScript==
/*jslint unparam: true, nomen: true*/
/*global kango, $, Template, Hogan, _*/
"use strict";

var BPPUtils = {
    readyFn: [],
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
            time += (this.pad(minutes, 2) + ':');
        } else {
            time += (minutes + ':');
        }
        time += this.pad(seconds, 2);
        return time;
    },
    ready: function (fn) {
        this.readyFn.push(fn);
        fn();
    },
    doReady: function () {
        this.readyFn.forEach(function (fn) {
            fn();
        });
    },
    debug: function (module, msg) {
        kango.invokeAsync('kango.storage.getItem', 'option_debugmode', function (debugmode) {
            if (debugmode) {
                kango.console.log('[B++][DEBUG][' + module + '] ' + msg);
            }
        });
    }
};

$.fn.replaceAttr = function (attr, search, replace) {
    if (this.length > 0) {
        var val = this.attr(attr);
        this.attr(attr, val.replace(new RegExp(search, 'i'), replace));
    }
    return this;
};
$.fn.replaceText = function (search, replace) {
    if (this.length > 0) {
        var val = this.text();
        this.text(val.replace(new RegExp(search, 'i'), replace));
    }
    return this;
};
$.fn.replaceHtml = function (search, replace) {
    if (this.length > 0) {
        var val = this.html();
        this.html(val.replace(new RegExp(search, 'i'), replace));
    }
    return this;
};