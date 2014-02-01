$(function () {
    "use strict";
    window.BPPUtils = {
        templateName: function () {
            return document.querySelector('body').id;
        },
        isTemplate: function (arr) {
            if (!(arr instanceof Array)) {
                arr = [arr];
            }
            return arr.indexOf(document.querySelector('body').id) > -1;
        },
        getParameterByName: function (name, from) { //http://stackoverflow.com/a/901144
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(from);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        },
        getQuery: function (name) {
            return this.getParameterByName(name, document.URL) || null;
        },
        escapeHtml: function (html) {
            return $('<div/>').text(html).html();
        },
        nano: function (templateName, data) {
            return Template.html[templateName].replace(/\{([\w\.]*)\}/g, function (str, key) {
                var keys = key.split("."), v = data[keys.shift()], i, l;
                for (i = 0, l = keys.length; i < l; i += 1) {
                    v = v[keys[i]];
                }
                return (v !== undefined && v !== null) ? v : "";
            });
        },
        thanks: {
            getAll: function () {
                try {
                    return JSON.parse(GM_getValue('thanks_cache', '{}'));
                } catch (e) {
                    return {};
                }
            },
            get: function (userId) {
                var thanksCache = this.getAll();
                return thanksCache[userId] || -1;
            },
            set: function (userId, count) {
                var thanksCache = this.getAll();
                thanksCache[userId] = count;
                GM_setValue('thanks_cache', JSON.stringify(thanksCache));
            }
        },
        nicknames: {
            getAll: function () {
                try {
                    return JSON.parse(GM_getValue('nicknames', '{}'));
                } catch (e) {
                    return {};
                }
            },
            get: function (userId) {
                var nicknames = this.getAll();
                if (nicknames.hasOwnProperty(userId)) {
                    return nicknames[userId].nick || '';
                }
                return '';
            },
            set: function (userId, name, nick) {
                var nicknames = this.getAll();
                nicknames[userId] = {
                    'name': name,
                    'nick': nick
                };
                GM_setValue('nicknames', JSON.stringify(nicknames));
            },
            remove: function (userId) {
                var nicknames = this.getAll();
                if (nicknames.hasOwnProperty(userId)) {
                    delete nicknames[userId];
                    GM_setValue('nicknames', JSON.stringify(nicknames));
                }
            }
        },
        usernotes: {
            getAll: function () {
                try {
                    return JSON.parse(GM_getValue('usernotes', '{}'));
                } catch (e) {
                    return {};
                }
            },
            get: function (userId) {
                var usernotes = this.getAll();
                if (usernotes.hasOwnProperty(userId)) {
                    return usernotes[userId].note || '';
                }
                return '';
            },
            set: function (userId, name, note) {
                var usernotes = this.getAll();
                usernotes[userId] = {
                    'name': name,
                    'note': note
                };
                GM_setValue('usernotes', JSON.stringify(usernotes));
            },
            remove: function (userId) {
                var usernotes = this.getAll();
                if (usernotes.hasOwnProperty(userId)) {
                    delete usernotes[userId];
                    GM_setValue('usernotes', JSON.stringify(usernotes));
                }
            }
        }
    };
});