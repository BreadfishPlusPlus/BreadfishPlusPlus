// ==UserScript==
// @name            Breadfish++
// @description     Eine Zusammenfassung von erweiterungen für breadfish.de
// @author          Martin Rump
// @version         3.0.0-DEV-4
// @namespace       http://maddin.cc
// @match           *://forum.sa-mp.de/*
// @exclude         *://forum.sa-mp.de/acp/*
// @require         http://cdn.breadfishplusplus.eu/js/Autolinker.min.js
// @require         http://cdn.breadfishplusplus.eu/js/async.min.js
// @require         http://cdn.breadfishplusplus.eu/js/desktop-notify-min.js
// @require         http://cdn.breadfishplusplus.eu/js/highlight.min.js
// @require         http://cdn.breadfishplusplus.eu/js/jquery.min.js
// @require         http://cdn.breadfishplusplus.eu/js/jquery-ui.min.js
// @require         http://cdn.breadfishplusplus.eu/js/jquery.lazyload.min.js
// @require         http://cdn.breadfishplusplus.eu/js/jquery.mousewheel.min.js
// @require         http://cdn.breadfishplusplus.eu/js/keyboard.min.js
// @require         http://cdn.breadfishplusplus.eu/js/moment-with-locales.min.js
// @require         http://cdn.breadfishplusplus.eu/js/tooltip.min.js
// @require         http://cdn.breadfishplusplus.eu/js/underscore.min.js
// ==/UserScript==
var VERSION = "3.0.0-DEV-4";
require = function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = typeof require == "function" && require;
                if (!u && a) return a(o, !0);
                if (i) return i(o, !0);
                throw new Error("Cannot find module '" + o + "'");
            }
            var f = n[o] = {
                exports: {}
            };
            t[o][0].call(f.exports, function(e) {
                var n = t[o][1][e];
                return s(n ? n : e);
            }, f, f.exports, e, t, n, r);
        }
        return n[o].exports;
    }
    var i = typeof require == "function" && require;
    for (var o = 0; o < r.length; o++) s(r[o]);
    return s;
}({
    templates: [ function(require, module, exports) {
        module.exports = require("94v5J1");
    }, {} ],
    "94v5J1": [ function(require, module, exports) {
        var templates = {};
        templates["bbcode"] = function(obj) {
            var __t, __p = "", __j = Array.prototype.join, print = function() {
                __p += __j.call(arguments, "");
            };
            with (obj || {}) {
                __p += '<li>\n    <a id="mce_editor_0_' + ((__t = name) == null ? "" : _.escape(__t)) + "\" href=\"javascript:tinyMCE.execInstanceCommand('mce_editor_0','mce_" + ((__t = name) == null ? "" : _.escape(__t)) + '\',false);" onmousedown="return false;" class="" target="_self"><img src="' + ((__t = img) == null ? "" : _.escape(__t)) + '" title="' + ((__t = title) == null ? "" : _.escape(__t)) + '"></a>\n</li>';
            }
            return __p;
        };
        templates["chat"] = function(obj) {
            var __t, __p = "", __j = Array.prototype.join, print = function() {
                __p += __j.call(arguments, "");
            };
            with (obj || {}) {
                __p += '<div class="border titleBarPanel bpp-chat-' + ((__t = small ? "small" : "large") == null ? "" : __t) + '" id="bpp-chat">\r\n    <div class="containerHead">\r\n        <div class="containerIcon">\r\n            <a href="#" id="bpp-toggleChat"><img src="wcf/icon/' + ((__t = open ? "minus" : "plus") == null ? "" : __t) + 'S.png" alt=""></a>\r\n        </div>\r\n        <div class="containerContent">\r\n            <img src="wcf/icon/iChatS.png" alt=""> Chat\r\n            <a href="#" class="bpp-toggleSize" title="Chat vergrößern/verkleinern"><img src="wcf/icon/externalURLHover.png" alt=""></a>\r\n        </div>\r\n    </div>\r\n    ';
                if (open) {
                    __p += '\r\n    <div class="bpp-chat-contents">\r\n    ';
                } else {
                    __p += '\r\n    <div class="bpp-chat-contents" style="display:none">\r\n    ';
                }
                __p += '\r\n        <div class="bpp-chat-messages"></div>\r\n        <input type="text" class="bpp-chat-input" placeholder="Hier schreiben">\r\n        <a class="bpp-chat-submit" title="Absenden"><img src="wcf/icon/searchSubmitS.png" alt=""></a>\r\n    </div>\r\n</div>';
            }
            return __p;
        };
        templates["chatMessage"] = function(obj) {
            var __t, __p = "", __j = Array.prototype.join, print = function() {
                __p += __j.call(arguments, "");
            };
            with (obj || {}) {
                __p += '<div class="bpp-chat-item">\r\n    ';
                if (type === "system") {
                    __p += '\r\n    <div class="bpp-chat-system">\r\n        <div class="bpp-chat-message-point"></div>\r\n        <div class="bpp-chat-message-body">\r\n            <div class="bpp-chat-body-message"><p>' + ((__t = message) == null ? "" : __t) + "</p></div>\r\n        </div>\r\n    </div>\r\n    ";
                } else if (type === "message") {
                    __p += "\r\n    ";
                    var fMessage = _.escape(message);
                    fMessage = Autolinker.link(fMessage, {
                        newWindow: true,
                        twitter: false
                    });
                    fMessage = fMessage.replace(/:lach:/gim, '<img src="wcf/images/smilies/mock.gif" title="lach" alt="lach">');
                    fMessage = fMessage.replace(/:schlaf:/gim, '<img src="wcf/images/smilies/penn.gif" title="schlaf" alt="schlaf">');
                    fMessage = fMessage.replace(/:guckb:/gim, '<img src="wcf/images/smilies/shok.gif" title="guckb" alt="guckb">');
                    fMessage = fMessage.replace(/:schrei:/gim, '<img src="wcf/images/smilies/shout.gif" title="schrei" alt="schrei">');
                    fMessage = fMessage.replace(/:bad:/gim, '<img src="wcf/images/smilies/thumbdown.gif" title="bad" alt="bad">');
                    fMessage = fMessage.replace(/:good:/gim, '<img src="wcf/images/smilies/thumbsup.gif" title="good" alt="good">');
                    fMessage = fMessage.replace(/:hm:/gim, '<img src="wcf/images/smilies/thinking.gif" title="hm" alt="hm">');
                    fMessage = fMessage.replace(/:peng:/gim, '<img src="wcf/images/smilies/suicide.gif" title="peng" alt="peng">');
                    fMessage = fMessage.replace(/:klugs:/gim, '<img src="wcf/images/smilies/chiffa.gif" title="klugs" alt="klugs">');
                    fMessage = fMessage.replace(/:dash:/gim, '<img src="wcf/images/smilies/wall.gif" title="dash" alt="dash">');
                    fMessage = fMessage.replace(/:bll:/gim, '<img src="wcf/images/smilies/bl.gif" title="bll" alt="bll">');
                    fMessage = fMessage.replace(/:fun:/gim, '<img src="wcf/images/smilies/fun.gif" title="fun" alt="fun">');
                    fMessage = fMessage.replace(/:rolleyes:/gim, '<img src="wcf/images/smilies/rolleyes.png" title="rolleyes" alt="rolleyes">');
                    fMessage = fMessage.replace(/:huh:/gim, '<img src="wcf/images/smilies/huh.png" title="huh" alt="huh">');
                    fMessage = fMessage.replace(/:love:/gim, '<img src="wcf/images/smilies/love.png" title="love" alt="love">');
                    fMessage = fMessage.replace(/:cursing:/gim, '<img src="wcf/images/smilies/cursing.png" title="cursing" alt="cursing">');
                    fMessage = fMessage.replace(/:thumbdown:/gim, '<img src="wcf/images/smilies/thumbdown.png" title="thumbdown" alt="thumbdown">');
                    fMessage = fMessage.replace(/:thumbsup:/gim, '<img src="wcf/images/smilies/thumbsup.png" title="thumbsup" alt="thumbsup">');
                    fMessage = fMessage.replace(/:thumbup:/gim, '<img src="wcf/images/smilies/thumbup.png" title="thumbup" alt="thumbup">');
                    fMessage = fMessage.replace(/:pinch:/gim, '<img src="wcf/images/smilies/pinch.png" title="pinch" alt="pinch">');
                    fMessage = fMessage.replace(/:sleeping:/gim, '<img src="wcf/images/smilies/sleeping.png" title="sleeping" alt="sleeping">');
                    fMessage = fMessage.replace(/:wacko:/gim, '<img src="wcf/images/smilies/wacko.png" title="wacko" alt="wacko">');
                    fMessage = fMessage.replace(/:whistling:/gim, '<img src="wcf/images/smilies/whistling.png" title="whistling" alt="whistling">');
                    fMessage = fMessage.replace(/:evil:/gim, '<img src="wcf/images/smilies/evil.png" title="evil" alt="evil">');
                    fMessage = fMessage.replace(/:\?:/gim, '<img src="wcf/images/smilies/question.png" title="question" alt="question">');
                    fMessage = fMessage.replace(/:!:/gim, '<img src="wcf/images/smilies/attention.png" title="attention" alt="attention">');
                    fMessage = fMessage.replace(/:\)/gim, '<img src="wcf/images/smilies/smile.png" title="smile" alt="smile">');
                    fMessage = fMessage.replace(/:\(/gim, '<img src="wcf/images/smilies/sad.png" title="sad" alt="sad">');
                    fMessage = fMessage.replace(/;\)/gim, '<img src="wcf/images/smilies/wink.png" title="wink" alt="wink">');
                    fMessage = fMessage.replace(/:P/gim, '<img src="wcf/images/smilies/tongue.png" title="tongue" alt="tongue">');
                    fMessage = fMessage.replace(/8\)/gim, '<img src="wcf/images/smilies/cool.png" title="cool" alt="cool">');
                    fMessage = fMessage.replace(/:D/gim, '<img src="wcf/images/smilies/biggrin.png" title="biggrin" alt="biggrin">');
                    fMessage = fMessage.replace(/\^\^/gim, '<img src="wcf/images/smilies/squint.png" title="squint" alt="squint">');
                    fMessage = fMessage.replace(/;\(/gim, '<img src="wcf/images/smilies/crying.png" title="crying" alt="crying">');
                    fMessage = fMessage.replace(/:S/gim, '<img src="wcf/images/smilies/unsure.png" title="unsure" alt="unsure">');
                    fMessage = fMessage.replace(/X\(/gim, '<img src="wcf/images/smilies/angry.png" title="angry" alt="angry">');
                    fMessage = fMessage.replace(/8\|/gim, '<img src="wcf/images/smilies/blink.png" title="blink" alt="blink">');
                    fMessage = fMessage.replace(/\?\(/gim, '<img src="wcf/images/smilies/confused.png" title="confused" alt="confused">');
                    fMessage = fMessage.replace(/:\|/gim, '<img src="wcf/images/smilies/mellow.png" title="mellow" alt="mellow">');
                    fMessage = fMessage.replace(/8o/gim, '<img src="wcf/images/smilies/w00t.png" title="w00t" alt="w00t">');
                    __p += '\r\n    <div class="bpp-chat-message">\r\n        <div class="bpp-chat-message-avatar">\r\n            <a href="index.php?page=User&amp;userID=' + ((__t = user.userId) == null ? "" : __t) + '" title="' + ((__t = user.name) == null ? "" : __t) + '">\r\n                <img src="' + ((__t = user.avatar) == null ? "" : __t) + '" alt="' + ((__t = user.name) == null ? "" : __t) + '">\r\n            </a>\r\n        </div>\r\n        <div class="bpp-chat-message-body">\r\n            <div class="bpp-chat-body-username"><a href="index.php?page=User&amp;userID=' + ((__t = user.userId) == null ? "" : __t) + '">' + ((__t = user.name) == null ? "" : __t) + '</a> <small title="' + ((__t = dateTime) == null ? "" : __t) + '">' + ((__t = displayTime) == null ? "" : __t) + '</small></div>\r\n            <div class="bpp-chat-body-message"><p>' + ((__t = fMessage) == null ? "" : __t) + "</p></div>\r\n        </div>\r\n    </div>\r\n    ";
                }
                __p += "\r\n</div>";
            }
            return __p;
        };
        templates["importantThreadsHeader"] = function(obj) {
            var __t, __p = "", __j = Array.prototype.join, print = function() {
                __p += __j.call(arguments, "");
            };
            with (obj || {}) {
                __p += '<tr>\r\n    <td colspan="7" style="padding:0;">\r\n        <div class="containerHead" style="border-radius:0;-moz-border-radius:0;-webkit-border-radius:0;margin-left:-1px;margin-right:-1px;">\r\n            <div class="containerContent">\r\n                <h3>Wichtige Themen</h3>\r\n            </div>\r\n        </div>\r\n    </td>\r\n</tr>';
            }
            return __p;
        };
        templates["nickAutocompleteList"] = function(obj) {
            var __t, __p = "", __j = Array.prototype.join, print = function() {
                __p += __j.call(arguments, "");
            };
            with (obj || {}) {
                __p += '<div class="popupMenu pageMenu" id="nickCompletionList">\r\n    ';
                if (nickList) {
                    __p += "\r\n    <ul>\r\n        ";
                    _.each(nickList, function(usr) {
                        __p += "\r\n        <li " + ((__t = usr.active ? 'class="active"' : "") == null ? "" : __t) + '><a href="#" data-index="' + ((__t = usr.index) == null ? "" : __t) + '">' + ((__t = usr.nick) == null ? "" : __t) + "</a></li>\r\n        ";
                    });
                    __p += "\r\n    </ul>\r\n    ";
                }
                __p += "\r\n</div>";
            }
            return __p;
        };
        templates["notification"] = function(obj) {
            var __t, __p = "", __j = Array.prototype.join, print = function() {
                __p += __j.call(arguments, "");
            };
            with (obj || {}) {
                __p += '<div class="bpp-notification-queue">\r\n    ';
                _.each(notifications, function(notification, index) {
                    __p += '\r\n        <div data-index="' + ((__t = index) == null ? "" : __t) + '" class="bpp-notification ' + ((__t = notification.onClick ? "bpp-notification-clickable " : "") == null ? "" : __t) + "bpp-notification-" + ((__t = notification.type) == null ? "" : __t) + '"' + ((__t = notification.icon ? ' style="background-image: url(' + notification.icon + ')"' : "") == null ? "" : __t) + '>\r\n            <button class="bpp-notification-close" role="button">×</button>\r\n            ';
                    if (notification.title) {
                        __p += '\r\n                <div class="bpp-notification-title">' + ((__t = notification.title) == null ? "" : __t) + "</div>\r\n            ";
                    }
                    __p += '\r\n            <div class="bpp-notification-message">' + ((__t = notification.message) == null ? "" : __t) + "</div>\r\n        </div>\r\n    ";
                });
                __p += "\r\n</div>";
            }
            return __p;
        };
        templates["options"] = function(obj) {
            var __t, __p = "", __j = Array.prototype.join, print = function() {
                __p += __j.call(arguments, "");
            };
            with (obj || {}) {
                __p += '<div id="main" class="bpp_options">\r\n    <div class="mainHeadline">\r\n        <img src="http://cdn.breadfishplusplus.eu/img/breadfish48.png">\r\n        <div class="headlineContainer">\r\n            <h2>Breadfish++</h2>\r\n            <p>Version ' + ((__t = version) == null ? "" : __t) + '</p>\r\n        </div>\r\n    </div>\r\n    <div id="profileEditContent" class="tabMenu">\r\n        <ul>\r\n            <li data-tab="about">\r\n                <a href="' + ((__t = location.pathname + location.search) == null ? "" : __t) + '#/breadfishplusplus/!/about">\r\n                    <img src="wcf/icon/infoM.png"> <span>Info</span>\r\n                </a>\r\n            </li>\r\n            ';
                _.each(optionsObject, function(tab) {
                    __p += '\r\n            <li data-tab="' + ((__t = tab.href) == null ? "" : __t) + '">\r\n                <a href="' + ((__t = location.pathname + location.search) == null ? "" : __t) + "#/breadfishplusplus/!/" + ((__t = tab.href) == null ? "" : __t) + '">\r\n                    <img src="wcf/icon/settingsM.png"> <span>' + ((__t = tab.name) == null ? "" : __t) + "</span>\r\n                </a>\r\n            </li>\r\n            ";
                });
                __p += '\r\n            <li data-tab="importexport">\r\n                <a href="' + ((__t = location.pathname + location.search) == null ? "" : __t) + '#/breadfishplusplus/!/importexport">\r\n                    <img src="wcf/icon/dbExportM.png"> <span>Einstellungen Importieren/Exportieren</span>\r\n                </a>\r\n            </li>\r\n        </ul>\r\n    </div>\r\n    <div class="subTabMenu">\r\n        <div class="containerHead">\r\n            ';
                _.each(optionsObject, function(tab) {
                    __p += '\r\n            <ul data-tab="' + ((__t = tab.href) == null ? "" : __t) + '">\r\n                ';
                    _.each(tab.subtabs, function(subtab) {
                        __p += '\r\n                    <li data-subtab="' + ((__t = subtab.href) == null ? "" : __t) + '"><a href="' + ((__t = location.pathname + location.search) == null ? "" : __t) + "#/breadfishplusplus/!/" + ((__t = tab.href) == null ? "" : __t) + "/" + ((__t = subtab.href) == null ? "" : __t) + '"><span>' + ((__t = subtab.name) == null ? "" : __t) + "</span></a></li>\r\n                ";
                    });
                    __p += "\r\n            </ul>\r\n            ";
                });
                __p += '\r\n        </div>\r\n    </div>\r\n    <div class="border tabMenuContent">\r\n        <div class="container-2" data-tab="about" data-subtab="null">\r\n            <div class="columnInner">\r\n                <div class="bpp-about-header">\r\n                    <img src="http://cdn.breadfishplusplus.eu/img/breadfish128.png">\r\n                </div>\r\n                <div class="formElement">\r\n                    <div class="formFieldLabel"><label>Version</label></div>\r\n                    <div class="formField">' + ((__t = version) == null ? "" : __t) + ' (<a href="https://github.com/BreadfishPlusPlus/BreadfishPlusPlus/releases/tag/v' + ((__t = version) == null ? "" : __t) + '">Release notes</a>)</div>\r\n                </div>\r\n                <div class="formElement">\r\n                    <div class="formFieldLabel"><label>Offizille Wobsite</label></div>\r\n                    <div class="formField"><a href="http://breadfishplusplus.eu/">breadfishplusplus.eu</a></div>\r\n                </div>\r\n                <div class="formElement">\r\n                    <div class="formFieldLabel"><label>Brauchst du hilfe?</label></div>\r\n                    <div class="formField"><a href="http://sa-mp.de/B++/p1886959-/">Dann stell deine Frage im Offiziellen Thema</a>  oder <a href="http://forum.sa-mp.de/index.php?form=PMNew&amp;userID=3066">per Privater Nachricht an mich</a></div>\r\n                </div>\r\n                <div class="formElement">\r\n                    <div class="formFieldLabel"><label>Hast du einen Bug gefunden?</label></div>\r\n                    <div class="formField"><a href="http://sa-mp.de/B++/p1886959-/">Dann poste ihn im offiziellen Thema</a>, <a href="http://git.io/hZumZQ">im Breadfish++ issue Tracker</a> oder <a href="http://forum.sa-mp.de/index.php?form=PMNew&amp;userID=3066">per Privater Nachricht an mich</a></div>\r\n                </div>\r\n                <h3 class="subHeadline">Danke an</h3>\r\n                <ul>\r\n                    <li><a href="http://forum.sa-mp.de/index.php?page=User&amp;userID=25433">Ditti</a> <small>(Vorabversionen testen, meine Rechtschreibfehler ausbessern)</small></li>\r\n                    <li><a href="http://forum.sa-mp.de/index.php?page=User&amp;userID=26698">JJJan</a> <small>(Vorabversionen testen, hosten des Chatservers)</small></li>\r\n                    <li><a href="http://forum.sa-mp.de/index.php?page=User&amp;userID=17121">loveBlu3</a> <small>(Vorabversionen testen, sinnloses Zeug vorschlagen)</small></li>\r\n                    <li><a href="http://forum.sa-mp.de/index.php?page=User&amp;userID=13423">seegras</a> <small>(Hilfe mit der TS-Query-API)</small></li>\r\n                    <li><a href="http://forum.sa-mp.de/index.php?page=User&amp;userID=5871">SSL</a> <small>(Vorabversionen testen)</small></li>\r\n                    <li><a href="http://forum.sa-mp.de/index.php?page=User&amp;userID=10755">The_Cop</a> <small>(Vorabversionen testen, meine Rechtschreibfehler ausbessern, neue Funktionen vorschlagen)</small></li>\r\n                </ul>\r\n                <h3 class="subHeadline">Hinweis</h3>\r\n                <p>Durch das Benutzen der <strong>Teamspeak 3 Anzeige</strong> wird deine IP-Adresse automatisch an dritte (mich) übermittelt.\r\n                Dies dient dazu, einzelne anfragen voneinander zu unterscheiden, und abzuschätzen, wie viele anfragen verursacht werden.</p>\r\n                <p><strong>Deine IP-Adresse wird dadurch nicht gespeichert.</strong></p>\r\n                <p>Solltest du das nicht wollen, reicht es einfach aus diese Option zu deaktivieren (Standard).</p>\r\n                <p>Den Quellcode der dafür verantwortlich ist findest du hier: <a target="_blank" href="http://git.io/bmtS9w">Teamspeak-Info</a>.</p>\r\n            </div>\r\n        </div>\r\n        ';
                _.each(optionsObject, function(tab) {
                    __p += "\r\n            ";
                    _.each(tab.subtabs, function(subtab) {
                        __p += '\r\n                <div class="container-1" data-tab="' + ((__t = tab.href) == null ? "" : __t) + '" data-subtab="' + ((__t = subtab.href) == null ? "" : __t) + '">\r\n                ';
                        _.each(subtab.categories, function(category) {
                            __p += "\r\n                    <fieldset>\r\n                        <legend>" + ((__t = category.name) == null ? "" : __t) + "</legend>\r\n                        ";
                            _.each(category.options, function(option) {
                                __p += "\r\n                            ";
                                if (option.type === "toggle") {
                                    __p += '\r\n                                <div class="formCheckBox formElement">\r\n                                    <div class="formField">\r\n                                        <label for="' + ((__t = option.key) == null ? "" : __t) + '">\r\n                                            <input type="checkbox" class="bpp-option" id="' + ((__t = option.key) == null ? "" : __t) + '" name="' + ((__t = option.key) == null ? "" : __t) + '" ' + ((__t = option.default ? "checked" : "") == null ? "" : __t) + "> " + ((__t = option.name) == null ? "" : __t) + "\r\n                                        </label>\r\n                                    </div>\r\n                                    ";
                                    if (option.description) {
                                        __p += '\r\n                                    <div class="formFieldDesc"><p>' + ((__t = option.description) == null ? "" : __t) + "</p></div>\r\n                                    ";
                                    }
                                    __p += "\r\n                                </div>\r\n                            ";
                                } else if (option.type === "range") {
                                    __p += '\r\n                                <div class="formElement">\r\n                                    <div class="formFieldLabel">\r\n                                        <label for="' + ((__t = option.key) == null ? "" : __t) + '">' + ((__t = option.name) == null ? "" : __t) + '</label>\r\n                                    </div>\r\n                                    <div class="formField">\r\n                                        <input type="range" id="' + ((__t = option.key) == null ? "" : __t) + '" name="' + ((__t = option.key) == null ? "" : __t) + '" class="bpp-option" min="' + ((__t = option.min) == null ? "" : __t) + '" max="' + ((__t = option.max) == null ? "" : __t) + '" value="' + ((__t = option.default) == null ? "" : __t) + '">\r\n                                        <span class="indicator">' + ((__t = option.default) == null ? "" : __t) + "</span>\r\n                                    </div>\r\n                                    ";
                                    if (option.description) {
                                        __p += '\r\n                                    <div class="formFieldDesc"><p>' + ((__t = option.description) == null ? "" : __t) + "</p></div>\r\n                                    ";
                                    }
                                    __p += "\r\n                                </div>\r\n                            ";
                                } else if (option.type === "keyboard") {
                                    __p += '\r\n                                <div class="formElement">\r\n                                    <div class="formFieldLabel">\r\n                                        <label for="' + ((__t = option.key) == null ? "" : __t) + '">' + ((__t = option.name) == null ? "" : __t) + '</label>\r\n                                    </div>\r\n                                    <div class="formField">\r\n                                        <input type="button" class="bpp-option" id="' + ((__t = option.key) == null ? "" : __t) + '" name="' + ((__t = option.key) == null ? "" : __t) + '" value="' + ((__t = option.default) == null ? "" : __t) + '">\r\n                                    </div>\r\n                                    ';
                                    if (option.description) {
                                        __p += '\r\n                                    <div class="formFieldDesc"><p>' + ((__t = option.description) == null ? "" : __t) + "</p></div>\r\n                                    ";
                                    }
                                    __p += "\r\n                                </div>\r\n                            ";
                                }
                                __p += "\r\n                        ";
                            });
                            __p += "\r\n                    </fieldset>\r\n                ";
                        });
                        __p += "\r\n                </div>\r\n            ";
                    });
                    __p += "\r\n        ";
                });
                __p += '\r\n        <div class="container-1" data-tab="importexport" data-subtab="null">\r\n            <h3 class="subHeadline">Einstellungen importieren</h3>\r\n            <fieldset>\r\n                <div class="formElement">\r\n                    <div class="formField">\r\n                        <label for="importOptions">\r\n                            <input type="file" name="importOptions" class="bpp-importOptions">\r\n                        </label>\r\n                    </div>\r\n                    <div class="formFieldDesc"><p>Wähle eine Sicherungsdatei von deinem Computer aus, um deine Einstellungen zu importieren.</p></div>\r\n                </div>\r\n            </fieldset>\r\n            <h3 class="subHeadline">Einstellungen exportieren</h3>\r\n            <fieldset>\r\n                <div class="formElement">\r\n                    <div class="formField">\r\n                        <label for="exportOptions">\r\n                            <a href="#" class="bpp-exportOptions" download="breadfishplusplus_options.json">Klicke hier, um deine aktuellen Einstellungen als Sicherungsdatei auf deinem Computer zu speichern.</a>\r\n                        </label>\r\n                    </div>\r\n                </div>\r\n            </fieldset>\r\n        </div>\r\n    </div>\r\n</div>';
            }
            return __p;
        };
        templates["popupconfirm"] = function(obj) {
            var __t, __p = "", __j = Array.prototype.join, print = function() {
                __p += __j.call(arguments, "");
            };
            with (obj || {}) {
                __p += '<div class="bpp-popup-backdrop" tabindex="-1">\r\n    <div class="bpp-popup-confirm">\r\n        <p>' + ((__t = question) == null ? "" : __t) + '</p>\r\n        <button type="button" role="button">&times;</button>\r\n        <ul class="confirm-buttons">\r\n            <li><a href="#" class="confirm-button-first">' + ((__t = leftLabel) == null ? "" : __t) + '</a></li>\r\n            <li><a href="#" class="confirm-button-last">' + ((__t = rightLabel) == null ? "" : __t) + "</a></li>\r\n        </ul>\r\n    </div>\r\n</div>";
            }
            return __p;
        };
        templates["popupmessage"] = function(obj) {
            var __t, __p = "", __j = Array.prototype.join, print = function() {
                __p += __j.call(arguments, "");
            };
            with (obj || {}) {
                __p += '<div class="bpp-popup-backdrop" tabindex="-1">\r\n    ';
                if (status) {
                    __p += '\r\n    <div class="bpp-popup-message ' + ((__t = status.clazz) == null ? "" : __t) + '">\r\n    ';
                } else {
                    __p += '\r\n    <div class="bpp-popup-message">\r\n    ';
                }
                __p += "\r\n        ";
                if (status) {
                    __p += '\r\n        <img src="' + ((__t = status.icon) == null ? "" : __t) + '">\r\n        ';
                }
                __p += "\r\n        <p>" + ((__t = message) == null ? "" : __t) + '</p>\r\n        <button type="button" role="button">&times;</button>\r\n    </div>\r\n</div>';
            }
            return __p;
        };
        templates["popupprompt"] = function(obj) {
            var __t, __p = "", __j = Array.prototype.join, print = function() {
                __p += __j.call(arguments, "");
            };
            with (obj || {}) {
                __p += '<div class="bpp-popup-backdrop" tabindex="-1">\r\n    <div class="bpp-popup-prompt">\r\n        <p>' + ((__t = question) == null ? "" : __t) + '</p>\r\n        <input type="text" class="prompt-input" placeholder="' + ((__t = placeholder) == null ? "" : __t) + '" value="' + ((__t = value) == null ? "" : __t) + '">\r\n        <button type="button" role="button">&times;</button>\r\n        <ul class="prompt-buttons">\r\n            <li><a href="#" class="prompt-button-first">' + ((__t = leftLabel) == null ? "" : __t) + '</a></li>\r\n            <li><a href="#" class="prompt-button-last">' + ((__t = rightLabel) == null ? "" : __t) + "</a></li>\r\n        </ul>\r\n    </div>\r\n</div>";
            }
            return __p;
        };
        templates["privateMessagePopupContent"] = function(obj) {
            var __t, __p = "", __j = Array.prototype.join, print = function() {
                __p += __j.call(arguments, "");
            };
            with (obj || {}) {
                __p += "";
                _.each(messages, function(msg) {
                    __p += '\r\n<p><a href="index.php?page=PMView&amp;pmID=' + ((__t = msg.id) == null ? "" : __t) + "#pm" + ((__t = msg.id) == null ? "" : __t) + '" title="' + ((__t = msg.text) == null ? "" : __t) + '">' + ((__t = msg.title) == null ? "" : __t) + '</a> von <a href="index.php?page=User&amp;userID=' + ((__t = msg.authorID) == null ? "" : __t) + '">' + ((__t = msg.author) == null ? "" : __t) + "</a> (" + ((__t = msg.dateStr) == null ? "" : __t) + ")</p>\r\n";
                });
                __p += "";
            }
            return __p;
        };
        templates["reportReasons"] = function(obj) {
            var __t, __p = "", __j = Array.prototype.join, print = function() {
                __p += __j.call(arguments, "");
            };
            with (obj || {}) {
                __p += '<div class="smallButtons reportReasons">\r\n    <ul>\r\n        ';
                _.each(reasons, function(reason) {
                    __p += '\r\n        <li><a href="#">' + ((__t = reason) == null ? "" : __t) + "</a></li>\r\n        ";
                });
                __p += "\r\n    </ul>\r\n</div>";
            }
            return __p;
        };
        templates["shortUrlButton"] = function(obj) {
            var __t, __p = "", __j = Array.prototype.join, print = function() {
                __p += __j.call(arguments, "");
            };
            with (obj || {}) {
                __p += '<li>\r\n    <a class="bpp-shorturl" href="' + ((__t = url) == null ? "" : __t) + '" title="Kurz-URL zu diesem Beitrag">\r\n        <img src="wcf/icon/wysiwyg/linkInsertM.png" height="14" alt="">\r\n        <span>Kurz-URL</span>\r\n        <input class="bpp-shorturl-input" type="text" value="' + ((__t = url) == null ? "" : __t) + '" readonly/>\r\n    </a>\r\n</li>';
            }
            return __p;
        };
        templates["smileyContainer"] = function(obj) {
            var __t, __p = "", __j = Array.prototype.join, print = function() {
                __p += __j.call(arguments, "");
            };
            with (obj || {}) {
                __p += '<ul class="hidden" id="smileyCategory-' + ((__t = index) == null ? "" : __t) + '">\r\n    ';
                _.each(category.smilies, function(s) {
                    __p += "\r\n        <li>\r\n            <img\r\n                onmouseover=\"this.style.cursor='pointer'\"\r\n                onclick=\"WysiwygInsert('smiley', '" + ((__t = category.fullPath) == null ? "" : __t) + "" + ((__t = s.img) == null ? "" : __t) + "', '" + ((__t = category.fullPath) == null ? "" : __t) + "" + ((__t = s.img) == null ? "" : __t) + "', '[img]" + ((__t = category.fullPath) == null ? "" : __t) + "" + ((__t = s.img) == null ? "" : __t) + '[/img]\');"\r\n                src="' + ((__t = category.fullPath) == null ? "" : __t) + "" + ((__t = s.img) == null ? "" : __t) + '"\r\n                alt="' + ((__t = s.name) == null ? "" : __t) + '"\r\n                title="' + ((__t = s.name) == null ? "" : __t) + '"\r\n            >\r\n        </li>\r\n    ';
                });
                __p += "\r\n</ul>";
            }
            return __p;
        };
        templates["ts3Viewer"] = function(obj) {
            var __t, __p = "", __j = Array.prototype.join, print = function() {
                __p += __j.call(arguments, "");
            };
            with (obj || {}) {
                __p += '<div class="container-2 infoBoxts3viewer">\r\n    <div class="containerIcon"> <img src="http://cdn.breadfishplusplus.eu/img/ts3/icon24.png" alt=""></div>\r\n    ';
                if (ts3data.error) {
                    __p += '\r\n    <div class="containerContent">\r\n        <div class="error" style="margin-bottom:0;">' + ((__t = ts3data.error) == null ? "" : __t) + "</div>\r\n    </div>\r\n    ";
                } else {
                    __p += '\r\n    <div class="containerContent">\r\n        <h3><a href="ts3server://' + ((__t = ts3data.address) == null ? "" : __t) + "?port=" + ((__t = ts3data.port) == null ? "" : __t) + "&nickname=" + ((__t = nickname) == null ? "" : __t) + '">' + ((__t = ts3data.name) == null ? "" : __t) + " - " + ((__t = ts3data.welcomemessage) == null ? "" : __t) + '</a></h3>\r\n        <p class="smallFont">\r\n            ' + ((__t = ts3data.plattform) == null ? "" : __t) + " " + ((__t = ts3data.version) == null ? "" : __t) + "\r\n            - Clients: " + ((__t = ts3data.clients.length) == null ? "" : __t) + "/" + ((__t = ts3data.maxclients) == null ? "" : __t) + "\r\n            - Channels: " + ((__t = ts3data.channels) == null ? "" : __t) + "\r\n            - Letzte aktualisierung: " + ((__t = lastUpdateTime) == null ? "" : __t) + '\r\n        </p>\r\n        <p class="smallFont">\r\n        ' + ((__t = _.map(ts3data.clients, function(c) {
                        return "<span><strong><u>" + c.name + "</u></strong> (" + c.channel + ")</span>";
                    }).join(", ")) == null ? "" : __t) + "\r\n        </p>\r\n    </div>\r\n    ";
                }
                __p += "\r\n</div>";
            }
            return __p;
        };
        templates["userMenuItem"] = function(obj) {
            var __t, __p = "", __j = Array.prototype.join, print = function() {
                __p += __j.call(arguments, "");
            };
            with (obj || {}) {
                __p += '<li>\r\n    <a href="" id="breadfishPlusPlusOptionsAnchor">\r\n        <img src="favicon.ico" alt=""> <span>Breadfish++</span>\r\n    </a>\r\n</li>';
            }
            return __p;
        };
        templates["youtubePreview"] = function(obj) {
            var __t, __p = "", __j = Array.prototype.join, print = function() {
                __p += __j.call(arguments, "");
            };
            with (obj || {}) {
                __p += '<div class="bpp-youtube-preview">\r\n    <div class="bpp-youtube-preview-thumbnail" style="background-image: url(\'' + ((__t = thumbnail) == null ? "" : __t) + '\')"></div>\r\n    <div class="bpp-youtube-preview-title">' + ((__t = title) == null ? "" : __t) + '</div>\r\n    <div class="bpp-youtube-preview-author">Von <a href="http://www.youtube.com/user/' + ((__t = author) == null ? "" : __t) + '" target="_blank">' + ((__t = author) == null ? "" : __t) + "</a>, hochgeladen am <span>" + ((__t = uploadTime) == null ? "" : __t) + '</span></div>\r\n    <div class="bpp-youtube-preview-length"><img src="wcf/icon/dateS.png"> ' + ((__t = length) == null ? "" : __t) + '</div>\r\n    <div class="bpp-youtube-preview-clicks"><img src="wcf/icon/visitsM.png"> ' + ((__t = clicks) == null ? "" : __t) + '</div>\r\n    <a class="bpp-youtube-preview-link" href="#">Videoplayer anzeigen</a>\r\n    <a class="bpp-youtube-preview-link-blank" target="_blank" href="http://www.youtube.com/watch?v=' + ((__t = videoId) == null ? "" : __t) + '">Video in einem neuen Tab öffnen</a>\r\n</div>';
            }
            return __p;
        };
        module.exports = templates;
    }, {} ],
    3: [ function(require, module, exports) {
        (function(global) {
            console.log("%c B%creadfish%c++ %cv" + VERSION + " %c http://breadfishplusplus.eu ", "background:#4d5460;color:#ff4136;border-top:1px solid #343a45;border-left:1px solid #343a45;border-bottom:1px solid #343a45", "background:#4d5460;color:#FFF;border-top:1px solid #343a45;border-bottom:1px solid #343a45", "background:#4d5460;color:#ff4136;border-top:1px solid #343a45;border-bottom:1px solid #343a45", "background:#4d5460;color:#FFF;border-top:1px solid #343a45;border-bottom:1px solid #343a45", "border-top:1px solid #343a45;border-bottom:1px solid #343a45;border-right:1px solid #343a45");
            (typeof window !== "undefined" ? window.moment : typeof global !== "undefined" ? global.moment : null).lang("de");
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {} ],
    4: [ function(require, module, exports) {
        (function(global) {
            "use strict";
            var $ = typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null;
            var storage = require("../storage");
            var utils = require("../utils");
            var register = require("../settings").register;
            register({
                key: "option.boards.extension.lastPosts.count",
                name: "Die letzten X Beiträge",
                tab: "Einstellungen",
                subtab: "Forenübersicht",
                category: "Erweiterungen",
                type: "range",
                "default": 10,
                min: 0,
                max: 10,
                description: 'Passt die Anzahl der "Letzte X Beiträge"-Box auf der Startseite an. "0" Entfernt die Box komplett.'
            });
            if (utils.isTemplate("tplIndex")) {
                var lastPostsCount = storage.get("option.boards.extension.lastPosts.count", 10);
                if (lastPostsCount > 0) {
                    $(".top5box .tableList tr").slice(lastPostsCount, 10).remove();
                    $(".top5box .containerContent").html('<img src="icon/postS.png" alt=""> Die letzten ' + lastPostsCount + " Beiträge");
                } else {
                    $(".top5box").remove();
                }
            }
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
        "../settings": 55,
        "../storage": 56,
        "../utils": 71
    } ],
    5: [ function(require, module, exports) {
        (function(global) {
            "use strict";
            var $ = typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null;
            var storage = require("../storage");
            var utils = require("../utils");
            var register = require("../settings").register;
            register({
                key: "option.boards.extension.searchIcon.enabled",
                name: "Suche Icon",
                tab: "Einstellungen",
                subtab: "Forenübersicht",
                category: "Fehlerbehebungen",
                type: "toggle",
                "default": false,
                description: "Zeigt das Icon für die Suche im Footer wieder richtig an."
            });
            if (storage.get("option.boards.extension.searchIcon.enabled", false) && utils.isTemplate("tplIndex")) {
                $('img[src="icon/searchS.png"]').attr("src", "wcf/icon/searchHeadS.png");
            }
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
        "../settings": 55,
        "../storage": 56,
        "../utils": 71
    } ],
    6: [ function(require, module, exports) {
        (function(global) {
            "use strict";
            var $ = typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null;
            var moment = typeof window !== "undefined" ? window.moment : typeof global !== "undefined" ? global.moment : null;
            var utils = require("../utils");
            var storage = require("../storage");
            var register = require("../settings").register;
            register({
                key: "option.boards.extension.ts3viewer.enabled",
                name: "Teamspeak 3 Anzeige",
                tab: "Einstellungen",
                subtab: "Forenübersicht",
                category: "Erweiterungen",
                type: "toggle",
                "default": false,
                description: "Fügt auf der Startseite eine Infobox hinzu, welche anzeigt wer gerade auf dem Teamspeak server ist."
            });
            if (storage.get("option.boards.extension.ts3viewer.enabled", false)) {
                if (utils.isTemplate("tplIndex")) {
                    $.ajax({
                        type: "GET",
                        url: "http://breadfishts.wheatley.maddin.cc/",
                        dataType: "JSON",
                        success: function(data) {
                            var $ts3viewer = $(require("templates").ts3Viewer({
                                ts3data: data,
                                nickname: $("#userNote a").text(),
                                lastUpdateTime: utils.formatWBBTimeFormat(moment(data.lastUpdate))
                            }));
                            $ts3viewer.prependTo(".border.infoBox");
                            $(".infoBox > div").each(function(index) {
                                $(this).removeClass("container-1").removeClass("container-2").addClass("container-" + (index % 2 + 1));
                            });
                        }
                    });
                }
            }
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
        "../settings": 55,
        "../storage": 56,
        "../utils": 71,
        templates: "94v5J1"
    } ],
    7: [ function(require, module, exports) {
        (function(global) {
            "use strict";
            var $ = typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null;
            var storage = require("../storage");
            var utils = require("../utils");
            var register = require("../settings").register;
            register({
                key: "option.boards.filter.birthdays.enabled",
                name: "Geburtstage",
                tab: "Einstellungen",
                subtab: "Forenübersicht",
                category: "Filter",
                type: "toggle",
                "default": false,
                description: "Entfernt die Infobox auf der Startseite, die anzeigt, wer heute Geburtstag hat."
            });
            if (storage.get("option.boards.filter.birthdays.enabled", false) && utils.isTemplate("tplIndex")) {
                $(".infoBox .containerContent h3:contains(Geburtstage:)").parent("div").parent("div").remove();
            }
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
        "../settings": 55,
        "../storage": 56,
        "../utils": 71
    } ],
    8: [ function(require, module, exports) {
        (function(global) {
            "use strict";
            var $ = typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null;
            var storage = require("../storage");
            var utils = require("../utils");
            var register = require("../settings").register;
            register({
                key: "option.boards.filter.statistics.enabled",
                name: "Statistik",
                tab: "Einstellungen",
                subtab: "Forenübersicht",
                category: "Filter",
                type: "toggle",
                "default": false,
                description: "Entfernt die Infobox auf der Startseite, die die Forenstatistik anzeigt."
            });
            if (storage.get("option.boards.filter.statistics.enabled", false) && utils.isTemplate("tplIndex")) {
                $(".infoBoxStatistics").remove();
            }
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
        "../settings": 55,
        "../storage": 56,
        "../utils": 71
    } ],
    9: [ function(require, module, exports) {
        (function(global) {
            "use strict";
            var $ = typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null;
            var storage = require("../storage");
            var utils = require("../utils");
            var register = require("../settings").register;
            register({
                key: "option.boards.filter.usersOnline.enabled",
                name: "Zur Zeit sind X Benutzer online",
                tab: "Einstellungen",
                subtab: "Forenübersicht",
                category: "Filter",
                type: "toggle",
                "default": false,
                description: "Entfernt die Infobox auf der Startseite, die anzeigt, wer gerade online ist."
            });
            if (storage.get("option.boards.filter.usersOnline.enabled", false) && utils.isTemplate("tplIndex")) {
                $(".infoBoxUsersOnline").remove();
            }
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
        "../settings": 55,
        "../storage": 56,
        "../utils": 71
    } ],
    10: [ function(require, module, exports) {
        (function(global) {
            "use strict";
            var $ = typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null;
            var storage = require("../storage");
            var utils = require("../utils");
            var register = require("../settings").register;
            register({
                key: "option.common.bugfix.expander.enabled",
                name: "Expander",
                tab: "Einstellungen",
                subtab: "Allgemeine Einstellungen",
                category: "Fehlerbehebungen",
                type: "toggle",
                "default": false,
                description: 'Behebt den Expander-Bug, der auftritt, wenn ein Benutzer mehrere Expander auf einer Seite nutzt. Mehr Informationen zu diesem Fehler findest du hier: <a target="_blank" href="http://sa-mp.de/B++/p1701085-/">Spoiler</a>.'
            });
            if (storage.get("option.common.bugfix.expander.enabled", false) && utils.isTemplate([ "tplPostAdd", "tplThreadAdd", "tplPmNew", "tplPostEdit", "tplThread", "tplUserProfile" ])) {
                $(".expander").each(function(i) {
                    var $expander = $(this);
                    $expander.parent(".expanderContainer").find("img").first().attr("onclick", "openList('expander" + i + "', { save: false })").unbind("click").attr("id", "expander" + i + "Image");
                    $expander.parent(".expanderContainer").find("span").first().attr("id", "expander" + i + "Teaser");
                    $expander.attr("id", "expander" + i);
                    $("#expander" + i).hide();
                });
            }
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
        "../settings": 55,
        "../storage": 56,
        "../utils": 71
    } ],
    11: [ function(require, module, exports) {
        (function(global) {
            "use strict";
            var $ = typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null;
            var storage = require("../storage");
            var register = require("../settings").register;
            register({
                key: "option.common.bugfix.headerFix.enabled",
                name: "Header-Fix",
                tab: "Einstellungen",
                subtab: "Allgemeine Einstellungen",
                category: "Fehlerbehebungen",
                type: "toggle",
                "default": false,
                description: 'Behebt den Fehler im Header-Fix Stil, bei dem die Breadcrumbs verschwinden. Mehr Informationen zu diesem Fehler findest du hier: <a target="_blank" href="http://sa-mp.de/B++/p1643494-/">Header Fix buggt</a>.'
            });
            if (storage.get("option.common.bugfix.headerFix.enabled", false)) {
                if ($("head").html().indexOf('href="http://forum.sa-mp.de/wcf/style/style-5.css"') >= 0) {
                    require("./../styles/headerfixBugfix.less");
                }
            }
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
        "../settings": 55,
        "../storage": 56,
        "./../styles/headerfixBugfix.less": 59
    } ],
    12: [ function(require, module, exports) {
        (function(global) {
            "use strict";
            var $ = typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null;
            var storage = require("../storage");
            var utils = require("../utils");
            var register = require("../settings").register;
            register({
                key: "option.common.bugfix.imageResize.enabled",
                name: "Bildverkleinerung",
                tab: "Einstellungen",
                subtab: "Allgemeine Einstellungen",
                category: "Fehlerbehebungen",
                type: "toggle",
                "default": false,
                description: "Passt Bilder, die zu groß sind und deshalb vom WBB verkleiner wurde, auf die exakte Breite des Beitrags an."
            });
            if (storage.get("option.common.bugfix.imageResize.enabled", false) && utils.isTemplate([ "tplPostAdd", "tplPmNew", "tplPostEdit", "tplThread" ])) {
                $(".resizeImage").each(function() {
                    var $img = $(this), parentWidth = $(this).first().closest("div").width();
                    $img.removeAttr("width").removeAttr("height");
                    $img.css({
                        maxWidth: parentWidth,
                        width: "auto",
                        height: "auto"
                    });
                    if ($img.closest("a").length === 0) {
                        $img.wrap('<a href="' + $img.attr("src") + '" class="externalURL"></a>');
                    }
                });
            }
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
        "../settings": 55,
        "../storage": 56,
        "../utils": 71
    } ],
    13: [ function(require, module, exports) {
        (function(global) {
            "use strict";
            var $ = typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null;
            var storage = require("../storage");
            var utils = require("../utils");
            var register = require("../settings").register;
            register({
                key: "option.common.bugfix.tabmenu.enabled",
                name: "Tabmenu",
                tab: "Einstellungen",
                subtab: "Allgemeine Einstellungen",
                category: "Fehlerbehebungen",
                type: "toggle",
                "default": false,
                description: 'Behebt den Fehler im Tumek Design, bei dem die Schrift im Tabmenu nur schwer erkennbar ist. Mehr Informationen zu diesem Fehler findest du hier: <a target="_blank" href="http://sa-mp.de/B++/p1662628-/">Manglhafte Farbwahl beim neuen Design</a>.'
            });
            if (storage.get("option.common.bugfix.tabmenu.enabled", false)) {
                if ($("head").html().indexOf('href="http://forum.sa-mp.de/wcf/style/style-8.css"') >= 0) {
                    require("./../styles/tabmenuBugfix.less");
                }
            }
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
        "../settings": 55,
        "../storage": 56,
        "../utils": 71,
        "./../styles/tabmenuBugfix.less": 66
    } ],
    14: [ function(require, module, exports) {
        (function(global) {
            "use strict";
            var $ = typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null;
            var _ = typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null;
            var moment = typeof window !== "undefined" ? window.moment : typeof global !== "undefined" ? global.moment : null;
            var utils = require("../utils");
            var notification = require("../ui/notification");
            var storage = require("../storage");
            var register = require("../settings").register;
            var messageCache = [];
            var forbiddenFolders = [ "http://forum.sa-mp.de/index.php?page=PMList&folderID=0", "http://forum.sa-mp.de/index.php?page=PMList&folderID=-1", "http://forum.sa-mp.de/index.php?page=PMList&folderID=-2", "http://forum.sa-mp.de/index.php?page=PMList&folderID=-3", "http://forum.sa-mp.de/index.php?form=PMFolderEdit", "http://forum.sa-mp.de/index.php?page=PMRuleList" ];
            var getDocFromUrl, getMessagesFromDoc, checkForNewMessage, generateNotification;
            getDocFromUrl = function(url, fn) {
                $.ajax({
                    type: "GET",
                    url: url
                }).done(function(doc) {
                    fn(null, doc);
                }).fail(function(jqXHR, textStatus) {
                    fn(textStatus, null);
                });
            };
            getMessagesFromDoc = function(doc, fn) {
                var messages = [];
                $(doc).find(".tableList tr > .columnTitle.new").each(function() {
                    var $element = $(this), $tr = $element.parent("tr"), pmId = parseInt(utils.getParameterByName("pmID", $element.find("a").attr("href")), 10);
                    if (messageCache.indexOf(pmId) === -1) {
                        messages.push({
                            title: $element.find("a").text(),
                            text: $element.attr("title"),
                            author: $tr.find(".columnAuthor p").text().trim(),
                            authorID: parseInt(utils.getParameterByName("userID", $tr.find(".columnAuthor a").attr("href")) || "-1", 10),
                            moment: utils.parseWBBTimeFormat($tr.find(".columnDate > p").text().split("\n")[0].trim()),
                            id: pmId
                        });
                        messageCache.push(pmId);
                    }
                });
                fn(null, messages);
            };
            generateNotification = function(messages) {
                var title = "Du hast " + messages.length + " neue Nachricht";
                if (messages.length !== 1) {
                    title += "en";
                }
                title += "!";
                _.map(messages, function(msg) {
                    return _.extend(msg, {
                        dateStr: storage.get("option.common.extension.timeago.enabled", false) ? msg.moment.from(moment()) : utils.formatWBBTimeFormat(msg.moment)
                    });
                });
                notification.create({
                    title: title,
                    message: require("templates").privateMessagePopupContent({
                        messages: messages
                    }),
                    icon: "http://forum.sa-mp.de/wcf/icon/pmUnreadM.png",
                    hidedelay: null
                });
            };
            checkForNewMessage = function(folderId) {
                $.get("http://forum.sa-mp.de/index.php?page=PMList&folderID=" + folderId, function(data) {
                    var folders = [];
                    $(data).find(".pmFolders .pageMenu ul li a").each(function() {
                        if (forbiddenFolders.indexOf($(this).attr("href")) === -1) {
                            folders.push($(this).attr("href"));
                        }
                    });
                    async.map(folders, getDocFromUrl, function(err, docs) {
                        docs.push(data);
                        async.map(docs, getMessagesFromDoc, function(err, results) {
                            var messages = _.flatten(results);
                            utils.log.debug("PMNotification.checkForNewMessage", err, messages);
                            if (messages.length > 0) {
                                generateNotification(messages);
                            }
                        });
                    });
                });
            };
            register({
                key: "option.common.extension.PMNotification.enabled",
                name: "Alternative PN Benachrichtigung",
                tab: "Einstellungen",
                subtab: "Allgemeine Einstellungen",
                category: "Erweiterungen",
                type: "toggle",
                "default": false,
                description: "Versteckt den Hinweis auf neue Private Nachrichten, und zeigt ihn stattdessen am unteren rechten Bildschirmrand an.<br>Es wird in regelmäßigen Abständen überprüft, ob du eine neue PN hast und die Benachrichtigung wird autmatisch aktualisiert."
            });
            register({
                key: "option.common.extension.PMNotification.desktop",
                name: "Desktopbenachrichtigung bei neuer PN",
                tab: "Einstellungen",
                subtab: "Allgemeine Einstellungen",
                category: "Erweiterungen",
                type: "toggle",
                "default": false,
                description: "Sendet bei einer neuen Privaten Nachricht eine Desktopbenachrichtigung."
            });
            register({
                key: "option.common.extension.PMNotification.interval",
                type: "invis",
                "default": 3e5
            });
            if (storage.get("option.common.extension.PMNotification.enabled", false)) {
                $(document).ready(function() {
                    $("#pmOutstandingNotifications").hide();
                });
                setInterval(function() {
                    checkForNewMessage(0);
                }, storage.get("option.common.extension.PMNotification.interval", 3e5));
                checkForNewMessage(0);
            }
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
        "../settings": 55,
        "../storage": 56,
        "../ui/notification": 69,
        "../utils": 71,
        templates: "94v5J1"
    } ],
    15: [ function(require, module, exports) {
        (function(global) {
            "use strict";
            var $ = typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null;
            var storage = require("../storage");
            var utils = require("../utils");
            var notification = require("../ui/notification");
            var register = require("../settings").register;
            var subscribeThread = function() {
                console.log("subscribeThread", $(".pageOptions > a:first-child"));
                $(document).on("click", ".pageOptions > a:first-child", function(event) {
                    event.preventDefault();
                    console.log("subscribeThread.click");
                    var SECURITY_TOKEN = utils.getSecurityToken(), threadID = $('input[name="threadID"]').val(), $element = $(this), url = $element.attr("href"), threadName = $(".headlineContainer h2 a").text().trim(), isSubscribed = utils.getParameterByName("action", url) === "ThreadSubscribe";
                    if (isSubscribed) {
                        $element.find("img").attr("src", "icon/thankLoadS.gif");
                        $element.find("span").text("Wird abonniert...");
                        $.get(url).done(function() {
                            $element.attr("href", "http://forum.sa-mp.de/index.php?action=ThreadUnsubscribe&threadID=" + threadID + "&t=" + SECURITY_TOKEN);
                            $element.find("img").attr("src", "icon/unsubscribeS.png");
                            $element.find("span").text("Thema abbestellen");
                            console.log(threadName);
                            notification.create("Das Thema »" + threadName + "« wurde abboniert!");
                        }).fail(function(jqXHR) {
                            notification.create({
                                message: "Das Thema »" + threadName + "« konnte nicht abboniert werden!",
                                type: "error",
                                hidedelay: null
                            });
                            utils.log.error("Konnte Thema »" + threadName + "« nicht abbonieren.", jqXHR.status, jqXHR.statusText);
                        });
                    } else {
                        $element.find("img").attr("src", "icon/thankLoadS.gif");
                        $element.find("span").text("Wird abbestellt...");
                        $.get(url).done(function() {
                            $element.attr("href", "http://forum.sa-mp.de/index.php?action=ThreadSubscribe&threadID=" + threadID + "&t=" + SECURITY_TOKEN);
                            $element.find("img").attr("src", "icon/subscribeS.png");
                            $element.find("span").text("Thema abonnieren");
                            notification.create("Das Thema »" + threadName + "« wurde abbestellt!");
                        }).fail(function(jqXHR) {
                            notification.create({
                                message: "Das Thema »" + threadName + "« konnte nicht abbestellt werden!",
                                type: "error",
                                hidedelay: null
                            });
                            utils.log.error("Konnte Thema »" + threadName + "« nicht abbestellen.", jqXHR.status, jqXHR.statusText);
                        });
                    }
                });
            };
            var rateThread = function() {
                var $threadRatingSpan = $("#threadRatingSpan"), $loading = $('<img src="icon/thankLoadS.gif" alt="loading" style="display:none" />'), rating = $threadRatingSpan.find('img[src="icon/ratingS.png"]').length, threadID = $('input[name="threadID"]').val(), pageNo = $('.pageOptions form input[name="pageNo"]').val(), threadName = $(".headlineContainer h2 a").text().trim();
                if ($threadRatingSpan.length > 0) {
                    $threadRatingSpan.replaceWith($threadRatingSpan.clone(false));
                }
                $threadRatingSpan = $("#threadRatingSpan");
                $loading.insertAfter($threadRatingSpan);
                $threadRatingSpan.find("img").css({
                    cursor: "pointer"
                }).click(function(event) {
                    event.preventDefault();
                    rating = parseInt($(this).attr("name"), 10);
                    $("#threadRating").val(rating);
                    $("#threadRatingSpan img").attr("src", "icon/noRatingS.png").slice(0, rating).attr("src", "icon/ratingS.png");
                    $loading.show();
                    $threadRatingSpan.hide();
                    $.ajax({
                        type: "POST",
                        url: "http://forum.sa-mp.de/index.php?page=Thread",
                        async: true,
                        data: {
                            threadID: threadID,
                            pageNo: pageNo,
                            rating: rating
                        }
                    }).done(function() {
                        $loading.hide();
                        $threadRatingSpan.show();
                        notification.create("Das Thema »" + threadName + "« wurde mit " + (rating === 1 ? "einem Stern" : rating + " Sternen") + " bewertet!");
                    }).fail(function(jqXHR) {
                        notification.create({
                            message: "Das Thema »" + threadName + "« konnte nicht bewertet werden!",
                            type: "error",
                            hidedelay: null
                        });
                        utils.log.error("Konnte Thema »" + threadName + "« nicht bewerten.", jqXHR.status, jqXHR.statusText);
                    });
                });
                $threadRatingSpan.find("img").mouseover(function() {
                    $threadRatingSpan.find("img").attr("src", "icon/noRatingS.png").slice(0, parseInt($(this).attr("name"), 10)).attr("src", "icon/ratingS.png");
                }).mouseout(function() {
                    $threadRatingSpan.find("img").attr("src", "icon/noRatingS.png").slice(0, rating).attr("src", "icon/ratingS.png");
                });
            };
            var subscribeBoard = function() {
                $(document).on("click", ".pageOptions > a:first-child", function(event) {
                    event.preventDefault();
                    var SECURITY_TOKEN = utils.getSecurityToken(), boardID = $('input[name="boardID"]').val(), $element = $(this), url = $element.attr("href"), isSubscribed = utils.getParameterByName("action", url) === "BoardSubscribe", boardName = $(".headlineContainer h2 a").text().trim();
                    if (isSubscribed) {
                        $element.find("img").attr("src", "icon/thankLoadS.gif");
                        $element.find("span").text("Wird abonniert...");
                        $.get(url).done(function() {
                            $element.attr("href", "http://forum.sa-mp.de/index.php?action=BoardUnsubscribe&boardID=" + boardID + "&t=" + SECURITY_TOKEN);
                            $element.find("img").attr("src", "icon/unsubscribeS.png");
                            $element.find("span").text("Forum abbestellen");
                            notification.create("Das Forum »" + boardName + "« wurde abboniert!");
                        }).fail(function(jqXHR) {
                            notification.create({
                                message: "Das Forum »" + boardName + "« konnte nicht abboniert werden!",
                                type: "error",
                                hidedelay: null
                            });
                            utils.log.error("Konnte Forum »" + boardName + "« nicht abbonieren.", jqXHR.status, jqXHR.statusText);
                        });
                    } else {
                        $element.find("img").attr("src", "icon/thankLoadS.gif");
                        $element.find("span").text("Wird abbestellt...");
                        $.get(url).done(function() {
                            $element.attr("href", "http://forum.sa-mp.de/index.php?action=BoardSubscribe&boardID=" + boardID + "&t=" + SECURITY_TOKEN);
                            $element.find("img").attr("src", "icon/subscribeS.png");
                            $element.find("span").text("Forum abonnieren");
                            notification.create("Das Forum »" + boardName + "« wurde abbestellt!");
                        }).fail(function(jqXHR) {
                            notification.create({
                                message: "Das Forum »" + boardName + "« konnte nicht abbestellt werden!",
                                type: "error",
                                hidedelay: null
                            });
                            utils.log.error("Konnte Forum »" + boardName + "« nicht abbestellen.", jqXHR.status, jqXHR.statusText);
                        });
                    }
                });
            };
            var markBoardAsRead = function() {
                $(document).on("click", ".pageOptions > a:last-child", function(event) {
                    event.preventDefault();
                    var $element = $(this), url = $element.attr("href"), boardName = $(".headlineContainer h2 a").text().trim();
                    $element.find("img").attr("src", "icon/thankLoadS.gif");
                    $element.find("span").text("Wird als gelesen markiert...");
                    $.get(url).done(function() {
                        $element.find("img").attr("src", "icon/boardMarkAsReadS.png");
                        $element.find("span").text("Forum wurde als gelesen markiert");
                        $(".topic.new").each(function() {
                            $(this).removeClass("new");
                            $(this).find(" > a").remove();
                        });
                        $('img[src$="threadNewM.png"]').attr("src", "icon/threadM.png");
                        $('img[src$="threadNewOptionsM.png"]').attr("src", "icon/threadOptionsM.png");
                        notification.create("Das Forum »" + boardName + "« wurde als gelesen markiert!");
                    }).fail(function(jqXHR) {
                        notification.create({
                            message: "Das Forum »" + boardName + "« konnte nicht als gelesen markiert werden!",
                            type: "error",
                            hidedelay: null
                        });
                        utils.log.error("Konnte Forum »" + boardName + "« nicht als gelesen markieren.", jqXHR.status, jqXHR.statusText);
                    });
                });
            };
            var markAllBoardsAsRead = function() {
                $(document).on("click", ".pageOptions > a:last-child", function(event) {
                    event.preventDefault();
                    var $element = $(this), url = $element.attr("href");
                    $element.find("img").attr("src", "icon/thankLoadS.gif");
                    $element.find("span").text("Alle Foren werden als gelesen markiert...");
                    $.get(url).done(function() {
                        $element.find("img").attr("src", "icon/boardMarkAsReadS.png");
                        $element.find("span").text("Alle Foren wurden als gelesen markiert");
                        $('a[id^="boardLink"]').removeClass("new").find("span").remove();
                        $(".columnTop5TopicTitle > a.new").each(function() {
                            $(this).removeClass("new");
                            $(this).parent(".columnTop5TopicTitle").find(" > img").attr("src", "icon/threadS.png");
                        });
                        notification.create("Alle Foren wurde als gelesen markiert!");
                    }).fail(function(jqXHR) {
                        notification.create({
                            message: "Konnte nicht alle Foren als gelesen markieren!",
                            type: "error",
                            hidedelay: null
                        });
                        utils.log.error("Konnte nicht alle Foren als gelesen markieren.", jqXHR.status, jqXHR.statusText);
                    });
                });
            };
            register({
                key: "option.common.extension.ajaxify.enabled",
                name: "Asynchrone Datenübertragung",
                tab: "Einstellungen",
                subtab: "Allgemeine Einstellungen",
                category: "Erweiterungen",
                type: "toggle",
                "default": false,
                description: 'Lässt verschiedene Operationen durch <a href="http://de.wikipedia.org/wiki/Ajax_(Programmierung)">Ajax</a> im Hintergrund ausführen anstatt die Seite neu zu laden.'
            });
            if (storage.get("option.common.extension.ajaxify.enabled", false)) {
                if (utils.isTemplate("tplThread")) {
                    subscribeThread();
                    rateThread();
                } else if (utils.isTemplate("tplBoard")) {
                    subscribeBoard();
                    markBoardAsRead();
                } else if (utils.isTemplate("tplIndex")) {
                    markAllBoardsAsRead();
                }
            }
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
        "../settings": 55,
        "../storage": 56,
        "../ui/notification": 69,
        "../utils": 71
    } ],
    16: [ function(require, module, exports) {
        (function(global) {
            "use strict";
            var $ = typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null;
            var storage = require("../storage");
            var utils = require("../utils");
            var register = require("../settings").register;
            register({
                key: "option.common.extension.chat.enabled",
                name: "Chat aktivieren",
                tab: "Einstellungen",
                subtab: "Allgemeine Einstellungen",
                category: "Chat",
                type: "toggle",
                "default": false,
                description: "Zeigt eine Chatbox auf der Startseite an. Optional kann diese auch an den Unterren Bildschirmrand gesetzt werden, wo sie auf jeder Seite zu finden ist."
            });
            register({
                key: "option.boards.extension.ircChat.open",
                type: "invis",
                "default": true
            });
            register({
                key: "option.boards.extension.ircChat.small",
                type: "invis",
                "default": false
            });
            var socket, $messages;
            var getuserInfo = function(callback) {
                var userinfo = {
                    name: null,
                    avatar: null,
                    userId: utils.getParameterByName("userID", $("#userNote > a").attr("href"))
                };
                $.get($("#userNote > a").attr("href")).done(function(data) {
                    var $profile = $(data);
                    userinfo.name = $profile.find(".userName span").text();
                    userinfo.avatar = "http://forum.sa-mp.de/" + $profile.find(".userAvatar a img").attr("src");
                    callback(userinfo);
                }).fail(function(jqXHR) {
                    utils.log.error("Konnte eigenes Benutzerprofil nicht aufrufen.", jqXHR.status, jqXHR.statusText);
                    callback(null);
                });
            };
            var sendMessage = function() {
                if (!socket) {
                    return;
                }
                var message = $(".bpp-chat-input").val();
                $(".bpp-chat-input").val("");
                if (!message.length) {
                    return;
                }
                socket.emit("cmessage", message);
            };
            var addMessage = function(data) {
                data.type = data.type || "message";
                $messages.append(require("templates").chatMessage(data));
                $messages[0].scrollTop = $messages[0].scrollHeight;
            };
            var connectToSocket = function(userinfo) {
                $.getScript("https://cdn.socket.io/socket.io-1.0.6.js").done(function() {
                    socket = io("http://gateway.trine.io:1338/", {
                        reconnection: true
                    });
                    socket.on("connect", function() {
                        addMessage({
                            type: "system",
                            message: "Verbindung wurde hergestellt!"
                        });
                        utils.log.debug("Verbindung wurde hergestellt.");
                        socket.emit("userinfo", userinfo);
                    });
                    socket.on("connect_error", function(err) {
                        addMessage({
                            type: "system",
                            message: "Verbindung konnte nicht hergestellt werden! :("
                        });
                        utils.log.error("Die Verbindung zum Chatserver konnte nicht hergestellt werden.", err);
                    });
                    socket.on("connect_timeout", function() {
                        addMessage({
                            type: "system",
                            message: "Deine Verbindung zum Chatserver wurde verloren!"
                        });
                        utils.log.error("Deine Verbindung zum Chatserver wurde verloren");
                    });
                    socket.on("reconnect", function(num) {
                        utils.log.debug("Verbindung wurde wiederhergestelllt.", num);
                    });
                    socket.on("reconnecting", function(num) {
                        addMessage({
                            type: "system",
                            message: "Versuche Verbindung wiederherzustellen... (" + num + ")"
                        });
                        utils.log.error("Versuche Verbindung wiederherzustellen...", num);
                    });
                    socket.on("reconnect_error", function(err) {
                        utils.log.error("Die Verbindung zum Chatserver konnte nicht wiederhergestellt werden.", err);
                    });
                    socket.on("reconnect_failed", function() {
                        addMessage({
                            type: "system",
                            message: "Konnte verbindung nicht wiederherstellen! :("
                        });
                        utils.log.error("Die Verbindung zum Chatserver konnte nicht wiederhergestellt werden.");
                    });
                    socket.on("smessage", function(data) {
                        utils.log.debug("Chatnachricht empfangen.", data);
                        addMessage(data);
                    });
                    socket.on("clearchat", function() {
                        $messages.empty();
                        addMessage({
                            type: "system",
                            message: "Der Chatlog wurde gelöscht!"
                        });
                    });
                    socket.on("banned", function(name) {
                        if (name) {
                            addMessage({
                                type: "system",
                                message: "Du wurdest von <b>" + name + "</b> gebannt. Du kannst nun keine Nachrichten mehr im Chat verfassen."
                            });
                        } else {
                            addMessage({
                                type: "system",
                                message: "Du wurdest im Chat gebannt. Du kannst keine Nachrichten verfassen."
                            });
                        }
                    });
                    socket.on("unbanned", function(name) {
                        addMessage({
                            type: "system",
                            message: "Du wurdest von <b>" + name + "</b> entbannt. Du kannst nun wieder Nachrichten im Chat verfassen."
                        });
                    });
                }).fail(function(jqXHR) {
                    utils.log.error("Konnte socket.io Bilbiothek nicht laden.", jqXHR.status, jqXHR.statusText);
                });
            };
            var createChat = function() {
                var $chat = $(require("templates").chat({
                    open: storage.get("option.common.extension.chat.open", true),
                    small: storage.get("option.common.extension.chat.small", false)
                }));
                $chat.insertAfter(".mainHeadline");
                $messages = $chat.find(".bpp-chat-messages");
                addMessage({
                    type: "system",
                    message: "Verbindung wird hergestellt..."
                });
                getuserInfo(function(data) {
                    if (data) {
                        connectToSocket(data);
                    }
                });
                $(".bpp-chat-input").keyup(function(event) {
                    if (event.keyCode === 13) {
                        event.preventDefault();
                        sendMessage();
                    }
                });
                $(".bpp-chat-submit").click(function(event) {
                    event.preventDefault();
                    sendMessage();
                });
                $("#bpp-toggleChat").click(function(event) {
                    event.preventDefault();
                    var open = storage.get("option.common.extension.chat.open", true);
                    if (open) {
                        $(".bpp-chat-contents").slideUp();
                    } else {
                        $(".bpp-chat-contents").slideDown();
                    }
                    $(this).find("img").attr("src", !open ? "wcf/icon/minusS.png" : "wcf/icon/plusS.png");
                    storage.set("option.common.extension.chat.open", !open);
                });
                $(".bpp-toggleSize").click(function(event) {
                    event.preventDefault();
                    if ($("#bpp-chat").hasClass("bpp-chat-small")) {
                        $("#bpp-chat").removeClass("bpp-chat-small").addClass("bpp-chat-large");
                        storage.set("option.common.extension.chat.small", false);
                    } else {
                        $("#bpp-chat").removeClass("bpp-chat-large").addClass("bpp-chat-small");
                        storage.set("option.common.extension.chat.small", true);
                    }
                });
            };
            if (storage.get("option.common.extension.chat.enabled", false)) {
                if (utils.isTemplate("tplIndex") && !storage.get("option.common.extension.chat.small", false) || storage.get("option.common.extension.chat.small", false)) {
                    require("./../styles/chat.less");
                    createChat();
                }
            }
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
        "../settings": 55,
        "../storage": 56,
        "../utils": 71,
        "./../styles/chat.less": 57,
        templates: "94v5J1"
    } ],
    17: [ function(require, module, exports) {
        (function(global) {
            "use strict";
            var $ = typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null;
            var _ = typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null;
            var utils = require("../utils");
            var storage = require("../storage");
            var popup = require("../ui/popup");
            var notification = require("../ui/notification");
            var register = require("../settings").register;
            var Nick = {
                get: {
                    name: function(name) {
                        var nicks = storage.get("option.common.extension.nicknames.list", []);
                        if (!name || !nicks.length) {
                            return null;
                        }
                        return _.find(nicks, function(n) {
                            return n.name === name;
                        }) || null;
                    },
                    nick: function(nick) {
                        var nicks = storage.get("option.common.extension.nicknames.list", []);
                        if (!nick || !nicks.length) {
                            return null;
                        }
                        return _.find(nicks, function(n) {
                            return n.nick === nick;
                        }) || null;
                    },
                    id: function(id) {
                        var nicks = storage.get("option.common.extension.nicknames.list", []);
                        if (!id || !nicks.length) {
                            return null;
                        }
                        return _.find(nicks, function(n) {
                            return n.userId === id;
                        }) || null;
                    },
                    all: function() {
                        var nicks = storage.get("option.common.extension.nicknames.list", []);
                        return nicks || null;
                    }
                },
                set: function(O) {
                    var nicks = storage.get("option.common.extension.nicknames.list", []), index = nicks.indexOf(O);
                    if (index > -1) {
                        nicks[index] = O;
                    } else {
                        nicks.push(O);
                    }
                    storage.set("option.common.extension.nicknames.list", nicks);
                },
                rem: {
                    name: function(name) {
                        storage.set("option.common.extension.nicknames.list", _.filter(storage.get("option.common.extension.nicknames.list", []), function(O) {
                            return O.name !== name;
                        }));
                    },
                    nick: function(nick) {
                        storage.set("option.common.extension.nicknames.list", _.filter(storage.get("option.common.extension.nicknames.list", []), function(O) {
                            return O.nick !== nick;
                        }));
                    },
                    id: function(id) {
                        storage.set("option.common.extension.nicknames.list", _.filter(storage.get("option.common.extension.nicknames.list", []), function(O) {
                            return O.userId !== id;
                        }));
                    }
                }
            };
            $.fn.replaceAttr = function(attr, search, replace) {
                this.each(function() {
                    var val = $(this).attr(attr);
                    if (val) {
                        $(this).attr(attr, val.replace(new RegExp($.ui.autocomplete.escapeRegex(search), "i"), replace));
                    }
                });
                return this;
            };
            $.fn.replaceText = function(search, replace) {
                this.each(function() {
                    var val = $(this).text();
                    if (val) {
                        $(this).text(val.replace(new RegExp($.ui.autocomplete.escapeRegex(search), "i"), replace));
                    }
                });
                return this;
            };
            $.fn.replaceHtml = function(search, replace) {
                this.each(function() {
                    var val = $(this).html();
                    if (val) {
                        $(this).html(val.replace(new RegExp($.ui.autocomplete.escapeRegex(search), "i"), replace));
                    }
                });
                return this;
            };
            var updateProfileNickname = function(oldName, newName) {
                utils.log.debug("nickname.updateProfileNickname", oldName, newName, Nick.get.name(oldName));
                document.title = document.title.replace(new RegExp($.ui.autocomplete.escapeRegex(oldName), "i"), newName);
                $(".headlineContainer h2 a").replaceText(oldName, newName);
                $(".userName > span").replaceText(oldName, newName);
                $('.twoRows li a img[src="wcf/icon/vCardM.png"]').parent("a").find("span").replaceText(oldName, newName);
                $(".friendsConnection > h3.light").replaceText(oldName, newName);
                $('.userName img[src="wcf/icon/onlineS.png"]').replaceAttr("title", oldName, newName);
                $('.userName img[src="wcf/icon/onlineS.png"]').replaceAttr("data-original-title", oldName, newName);
                $('.userName img[src="wcf/icon/offlineS.png"]').replaceAttr("title", oldName, newName);
                $('.userName img[src="wcf/icon/offlineS.png"]').replaceAttr("data-original-title", oldName, newName);
                $('.userStatus img[src="wcf/icon/genderMaleS.png"]').replaceAttr("title", oldName, newName);
                $('.userStatus img[src="wcf/icon/genderMaleS.png"]').replaceAttr("data-original-title", oldName, newName);
                $('.userStatus img[src="wcf/icon/genderFemaleS.png"]').replaceAttr("title", oldName, newName);
                $('.userStatus img[src="wcf/icon/genderFemaleS.png"]').replaceAttr("data-original-title", oldName, newName);
                $("ul.dataList .smallFont:contains(Beiträge)").parent(".containerContent").find("a").replaceAttr("title", oldName, newName);
                $("ul.dataList .smallFont:contains(Beiträge)").parent(".containerContent").find("a").replaceAttr("data-original-title", oldName, newName);
            };
            var updateThreadNicknames = function() {
                var userList = [];
                $(".message:not(.quickReply):not(.deleted)").each(function() {
                    userList.push($(this).find(".messageSidebar .messageAuthor .userName a").text().trim());
                });
                userList = _.uniq(userList);
                utils.log.debug("nickname.updateThreadNicknames", userList);
                _.each(userList, function(name) {
                    var NickO = Nick.get.name(name);
                    if (NickO) {
                        $(".messageAuthor .userName a span:contains(" + NickO.name + ")").replaceHtml(NickO.name, NickO.nick);
                        $([ '.messageAuthor .userName a[title="Benutzerprofil von »' + NickO.name + '« aufrufen"]', '.userAvatar a[title="Benutzerprofil von »' + NickO.name + '« aufrufen"]', '.messageAuthor .userName img[title="»' + NickO.name + '« ist online"]', '.messageAuthor .userName img[title="»' + NickO.name + '« ist offline"]', '.userSymbols ul li img[title="»' + NickO.name + '« ist männlich"]', '.userSymbols ul li img[title="»' + NickO.name + '« ist weiblich"]', '.userSymbols ul li img[title="»' + NickO.name + '« ist der Autor dieses Themas"]', '.userMessenger ul li a img[title="Persönliche Website von »' + NickO.name + '« besuchen"]', '.userMessenger ul li a img[title="»' + NickO.name + '« über ICQ kontaktieren"]', '.userMessenger ul li a img[title="»' + NickO.name + '« über Windows Live Messenger kontaktieren"]', '.userMessenger ul li a img[title="»' + NickO.name + '« über Skype kontaktieren"]' ].join(", ")).replaceAttr("title", NickO.name, NickO.nick);
                        $('div[id^="thankUser-"] .smallFont a:not([onclick]):contains(' + NickO.name + ")").filter(function() {
                            return $(this).text() === NickO.name;
                        }).replaceHtml(NickO.name, NickO.nick);
                        $("blockquote .quoteHeader h3 a:contains(Zitat von »" + NickO.name + "«)").replaceText(NickO.name, NickO.nick);
                    }
                });
            };
            var updateIndexNicknames = function() {
                var nicks = Nick.get.all();
                _.each(nicks, function(NickO) {
                    $(".columnTop5LastPost .containerContentSmall .smallFont a").filter(function() {
                        return $(this).text() === NickO.name;
                    }).text(NickO.nick);
                    $(".boardlistUsersOnline a").filter(function() {
                        return $(this).text() === NickO.name;
                    }).replaceHtml(NickO.name, NickO.nick);
                    $(".boardlistLastPost .containerContentSmall p a").filter(function() {
                        return $(this).text() === NickO.name;
                    }).text(NickO.nick);
                    $(".infoBoxUsersOnline .containerContent .smallFont a:contains(" + NickO.name + ")").filter(function() {
                        return $(this).text() === NickO.name;
                    }).replaceHtml(NickO.name, NickO.nick);
                });
            };
            var setupNickEdit = function() {
                var userId = parseInt($('input[name="userID"]').val(), 10), name = $(".userName > span").text(), nickO = Nick.get.id(userId), $editNickname = $('<li><a href="#" title="Spitzname ändern"><img src="wcf/icon/userEditL.png" style="width:24px;"><span>Spitzname ändern</span></a></li>');
                $(".userCardOptions ul").append($editNickname);
                $editNickname.find("a").click(function(event) {
                    event.preventDefault();
                    popup.prompt({
                        question: "Neuer Spitzname:",
                        leftLabel: "Spitzname Speichern",
                        rightLabel: "Spitzname löschen",
                        placeholder: name,
                        value: nickO ? nickO.nick : ""
                    }, function(num, input) {
                        if (num === 1 || num === 3) {
                            if (input.length > 0) {
                                if (input !== name) {
                                    nickO = {
                                        name: name,
                                        nick: input,
                                        userId: userId
                                    };
                                    Nick.set(nickO);
                                    updateProfileNickname(name, input);
                                    notification.create({
                                        title: "Spitzname gespeichert!",
                                        message: "Spitzname von »" + name + "« wurde zu »" + input + "« geändert."
                                    });
                                } else {
                                    Nick.rem.id(userId);
                                    updateProfileNickname(nickO ? nickO.nick : name, name);
                                    nickO = null;
                                    notification.create({
                                        title: "Spitzname gelöscht!",
                                        message: "Spitzname von »" + name + "« wurde gelöscht."
                                    });
                                }
                            }
                        } else if (num === 2) {
                            Nick.rem.id(userId);
                            updateProfileNickname(nickO ? nickO.nick : name, name);
                            nickO = null;
                            notification.create({
                                title: "Spitzname gelöscht!",
                                message: "Spitzname von »" + name + "« wurde gelöscht."
                            });
                        }
                    });
                });
            };
            register({
                key: "option.common.extension.nicknames.enabled",
                name: "Spitznamen für Benutzer",
                tab: "Einstellungen",
                subtab: "Allgemeine Einstellungen",
                category: "Erweiterungen",
                type: "toggle",
                "default": false,
                description: "Fügt im Benutzerprofil eine Option hinzu, die es ermöglicht dem Benutzer einen eigenen Spitznamen zu geben.<br>Dieser Spitzname wird dann, anstatt des eigentlichen Benutzernamens, im Forum angezeigt."
            });
            register({
                key: "option.common.extension.nicknames.list",
                type: "invis",
                "default": []
            });
            if (storage.get("option.common.extension.nicknames.enabled", false)) {
                if (utils.isTemplate("tplUserProfile")) {
                    setupNickEdit();
                    var name = $(".userName > span").text();
                    var nickO = Nick.get.name(name);
                    if (nickO) {
                        updateProfileNickname(name, nickO.nick);
                    }
                } else if (utils.isTemplate("tplThread")) {
                    updateThreadNicknames();
                } else if (utils.isTemplate("tplIndex")) {
                    updateIndexNicknames();
                }
            }
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
        "../settings": 55,
        "../storage": 56,
        "../ui/notification": 69,
        "../ui/popup": 70,
        "../utils": 71
    } ],
    18: [ function(require, module, exports) {
        (function(global) {
            "use strict";
            var $ = typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null;
            var utils = require("../utils");
            var storage = require("../storage");
            var register = require("../settings").register;
            register({
                key: "option.common.extension.reportReasons.enabled",
                name: "Meldungsgründe",
                tab: "Einstellungen",
                subtab: "Allgemeine Einstellungen",
                category: "Erweiterungen",
                type: "toggle",
                "default": false,
                description: "Fügt vordefinierte Gründe beim Melden eines Beitrags hinzu."
            });
            register({
                key: "option.common.extension.reportReasons.list",
                type: "invis",
                "default": {
                    "Anschuldigung ohne Beweise": "Dieser Beitrag erhebt folgende Anschuldigungen, ohne diese zu beweisen: ",
                    Beleidigung: "Dieser Beitrag ist Beleidigend, weil ",
                    Crossposting: "Dieser Beitrag ist ein Cross-Post von hier: <hier bitte den Link zum anderen Thema/Beitrag einfügen>",
                    Doppelpost: "Dieser Beitrag ist ein Doppelpost.",
                    "Falscher Bereich": "Dieser Beitrag ist im Falschen Bereich, weil ",
                    "Falscher Umgangston": "Dieser Beitrag weist einen falschen Umgangston auf, weil ",
                    Threadpushing: "Dieser Beitrag ist ausschließlich dazu da, das Thema zu Pushen.",
                    Spam: "Dieser Beitrag ist Spam, weil "
                }
            });
            if (storage.get("option.common.extension.reportReasons.enabled", false) && utils.isTemplate("tplPostReport")) {
                require("./../styles/reportReasons.less");
                var $formElement = $(".formElement"), $text = $("#text"), reportReasons = storage.get("option.common.extension.reportReasons.list", {});
                $formElement.css("position", "relative");
                $formElement.append(require("templates").reportReasons({
                    reasons: Object.keys(reportReasons)
                }));
                $(document).on("click", ".reportReasons a", function(event) {
                    event.preventDefault();
                    $text.focus();
                    var key = $(this).text();
                    $text.text(reportReasons[key]);
                });
            }
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
        "../settings": 55,
        "../storage": 56,
        "../utils": 71,
        "./../styles/reportReasons.less": 64,
        templates: "94v5J1"
    } ],
    19: [ function(require, module, exports) {
        (function(global) {
            "use strict";
            var $ = typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null;
            var moment = typeof window !== "undefined" ? window.moment : typeof global !== "undefined" ? global.moment : null;
            var utils = require("../utils");
            var storage = require("../storage");
            var register = require("../settings").register;
            register({
                key: "option.common.extension.timeago.enabled",
                name: "Relative Zeitangaben",
                tab: "Einstellungen",
                subtab: "Allgemeine Einstellungen",
                category: "Erweiterungen",
                type: "toggle",
                "default": false,
                description: 'Ersetzt die Zeitangaben im Forum. Aus "Heute, 12:34" wird dann z.b "vor 12 Minuten".'
            });
            if (storage.get("option.common.extension.timeago.enabled", false)) {
                if (utils.isTemplate("tplIndex")) {
                    $(".top5box .tableList tr .columnTop5LastPost .smallFont .light, .boardlistLastPost .containerContentSmall .light, .columnLastPost .containerContentSmall .smallFont.light").each(function() {
                        var dateStr = $(this).text().substr(1, $(this).text().length - 2);
                        $(this).html('(<abbr title="' + dateStr + '">' + utils.parseWBBTimeFormat(dateStr).from(moment()) + "</abbr>)");
                    });
                } else if (utils.isTemplate("tplBoard")) {
                    $(".boardlistLastPost .containerContentSmall .light, .columnLastPost .containerContentSmall .smallFont.light").each(function() {
                        var dateStr = $(this).text().substr(1, $(this).text().length - 2);
                        $(this).html('(<abbr title="' + dateStr + '">' + utils.parseWBBTimeFormat(dateStr).from(moment()) + "</abbr>)");
                    });
                } else if (utils.isTemplate("tplThread")) {
                    $(".message .messageContentInner .messageHeader .containerContent .smallFont.light").each(function() {
                        var dateStr = $(this).text();
                        $(this).html('<abbr title="' + dateStr + '">' + utils.parseWBBTimeFormat(dateStr).from(moment()) + "</abbr>");
                    });
                } else if (utils.isTemplate("tplUserProfile")) {
                    var $elem = $("ul.dataList .smallFont:contains(Letzte Aktivität)").parent(".containerContent").find("p").first();
                    var dateStr = $elem.text();
                    $elem.html('<abbr title="' + dateStr + '">' + utils.parseWBBTimeFormat(dateStr).from(moment()) + "</abbr>");
                    $(".contentBox .containerHead h3:contains(Profilbesucher)").parent(".containerHead").parent(".border").find(".dataList li .containerContent .smallFont.light").each(function() {
                        var dateStr = $(this).text();
                        $(this).html('<abbr title="' + dateStr + '">' + utils.parseWBBTimeFormat(dateStr).from(moment()) + "</abbr>");
                    });
                    $(".contentBox h3.subHeadline a:contains(Beiträge)").parent(".subHeadline").parent(".contentBox").find(".dataList li .containerContent .smallFont.light").each(function() {
                        var dateStr = $(this).text();
                        $(this).html('<abbr title="' + dateStr + '">' + utils.parseWBBTimeFormat(dateStr).from(moment()) + "</abbr>");
                    });
                }
            }
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
        "../settings": 55,
        "../storage": 56,
        "../utils": 71
    } ],
    20: [ function(require, module, exports) {
        (function(global) {
            "use strict";
            var $ = typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null;
            var utils = require("../utils");
            var storage = require("../storage");
            var register = require("../settings").register;
            register({
                key: "option.common.extension.tooltip.enabled",
                name: "Alternative Tooltips",
                tab: "Einstellungen",
                subtab: "Allgemeine Einstellungen",
                category: "Erweiterungen",
                type: "toggle",
                "default": false,
                description: "Ersetzt die Standard-Browser-Tooltips durch eigene."
            });
            register({
                key: "option.common.extension.tooltip.showDelay",
                type: "invis",
                "default": 1e3
            });
            register({
                key: "option.common.extension.tooltip.hideDelay",
                type: "invis",
                "default": 100
            });
            if (storage.get("option.common.extension.tooltip.enabled", false)) {
                require("./../styles/tooltip.less");
                $("body").tooltip({
                    delay: {
                        show: storage.get("option.common.extension.tooltip.showDelay", 1e3),
                        hide: storage.get("option.common.extension.tooltip.hideDelay", 100)
                    },
                    html: false,
                    placement: "auto",
                    container: "body",
                    selector: "[title]"
                });
                $(document).on("hidden.bs.tooltip", "[title]", function() {
                    $(this).css("display", "");
                });
            }
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
        "../settings": 55,
        "../storage": 56,
        "../utils": 71,
        "./../styles/tooltip.less": 67
    } ],
    21: [ function(require, module, exports) {
        (function(global) {
            "use strict";
            var $ = typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null;
            var storage = require("../storage");
            var utils = require("../utils");
            var register = require("../settings").register;
            register({
                key: "option.common.filter.announcement.enabled",
                name: "Ankündigungen",
                tab: "Einstellungen",
                subtab: "Allgemeine Einstellungen",
                category: "Filter",
                type: "toggle",
                "default": false,
                description: "Aktiviert die Option, Permanente Anküdigungen individuell auszublenden."
            });
            register({
                key: "option.common.filter.announcement.suppressed",
                type: "invis",
                "default": []
            });
            if (storage.get("option.common.filter.announcement.enabled", false)) {
                var $globalAnnouncement = $("#globalAnnouncement"), text = $globalAnnouncement.text().trim(), suppressedGlobalAnnouncement = storage.get("option.common.filter.announcement.suppressed", []);
                if (suppressedGlobalAnnouncement.indexOf(text) !== -1) {
                    $globalAnnouncement.hide();
                } else {
                    $globalAnnouncement.addClass("deletable");
                    $globalAnnouncement.prepend('<a href="#" style="float:right;" class="close deleteButton"><img src="wcf/icon/closeS.png" alt="" title="Ankündigung ausblenden"></a>');
                    $globalAnnouncement.find(".close").click(function(event) {
                        event.preventDefault();
                        suppressedGlobalAnnouncement.push(text);
                        storage.set("option.common.filter.announcement.suppressed", suppressedGlobalAnnouncement);
                        $globalAnnouncement.fadeOut();
                    });
                }
            }
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
        "../settings": 55,
        "../storage": 56,
        "../utils": 71
    } ],
    22: [ function(require, module, exports) {
        (function(global) {
            "use strict";
            var $ = typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null;
            var _ = typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null;
            var storage = require("../storage");
            var utils = require("../utils");
            var register = require("../settings").register;
            var CDN_PATH = "http://cdn.breadfishplusplus.eu/";
            register({
                key: "option.postCreate.bbcode.email",
                name: "E-Mail",
                tab: "Einstellungen",
                subtab: "Beitrag & Nachrichten erstellen",
                category: "BBCodes",
                type: "toggle",
                "default": false,
                description: "Fügt dem WYSIWYG-Editor das Icon für den E-Mail-BBCode hinzu."
            });
            register({
                key: "option.postCreate.bbcode.sub",
                name: "Text tiefstellen",
                tab: "Einstellungen",
                subtab: "Beitrag & Nachrichten erstellen",
                category: "BBCodes",
                type: "toggle",
                "default": false,
                description: "Fügt dem WYSIWYG-Editor das Icon für den BBCode hinzu, um Text tiefzustellen."
            });
            register({
                key: "option.postCreate.bbcode.sup",
                name: "Text hochstellen",
                tab: "Einstellungen",
                subtab: "Beitrag & Nachrichten erstellen",
                category: "BBCodes",
                type: "toggle",
                "default": false,
                description: "Fügt dem WYSIWYG-Editor das Icon für den BBCode hinzu, um Text hochzustellen."
            });
            register({
                key: "option.postCreate.bbcode.java",
                name: "Java-Quelltext",
                tab: "Einstellungen",
                subtab: "Beitrag & Nachrichten erstellen",
                category: "BBCodes",
                type: "toggle",
                "default": false,
                description: "Fügt dem WYSIWYG-Editor das Icon für den Java-Quelltext-BBCode hinzu."
            });
            register({
                key: "option.postCreate.bbcode.css",
                name: "CSS-Quelltext",
                tab: "Einstellungen",
                subtab: "Beitrag & Nachrichten erstellen",
                category: "BBCodes",
                type: "toggle",
                "default": false,
                description: "Fügt dem WYSIWYG-Editor das Icon für den Cascading Style Sheet-Quelltext-BBCode hinzu."
            });
            register({
                key: "option.postCreate.bbcode.html",
                name: "HTML-Quelltext",
                tab: "Einstellungen",
                subtab: "Beitrag & Nachrichten erstellen",
                category: "BBCodes",
                type: "toggle",
                "default": false,
                description: "Fügt dem WYSIWYG-Editor das Icon für den HTML-Quelltext-BBCode hinzu."
            });
            register({
                key: "option.postCreate.bbcode.xml",
                name: "XML-Quelltext",
                tab: "Einstellungen",
                subtab: "Beitrag & Nachrichten erstellen",
                category: "BBCodes",
                type: "toggle",
                "default": false,
                description: "Fügt dem WYSIWYG-Editor das Icon für den XML-Quelltext-BBCode hinzu."
            });
            register({
                key: "option.postCreate.bbcode.js",
                name: "Javascript-Quelltext",
                tab: "Einstellungen",
                subtab: "Beitrag & Nachrichten erstellen",
                category: "BBCodes",
                type: "toggle",
                "default": false,
                description: "Fügt dem WYSIWYG-Editor das Icon für den Javascript-Quelltext-BBCode hinzu."
            });
            register({
                key: "option.postCreate.bbcode.c",
                name: "C/C++-Quelltext",
                tab: "Einstellungen",
                subtab: "Beitrag & Nachrichten erstellen",
                category: "BBCodes",
                type: "toggle",
                "default": false,
                description: "Fügt dem WYSIWYG-Editor das Icon für den C/C++-Quelltext-BBCode hinzu."
            });
            register({
                key: "option.postCreate.bbcode.dropdown",
                name: "Dropdown",
                tab: "Einstellungen",
                subtab: "Beitrag & Nachrichten erstellen",
                category: "BBCodes",
                type: "toggle",
                "default": false,
                description: "Fügt dem WYSIWYG-Editor das Icon für den Dropdown-BBCode hinzu."
            });
            register({
                key: "option.postCreate.bbcode.sevenload",
                name: "Sevenload",
                tab: "Einstellungen",
                subtab: "Beitrag & Nachrichten erstellen",
                category: "BBCodes",
                type: "toggle",
                "default": false,
                description: "Fügt dem WYSIWYG-Editor das Icon für den Sevenload-BBCode hinzu."
            });
            register({
                key: "option.postCreate.bbcode.clipfish",
                name: "Clipfish",
                tab: "Einstellungen",
                subtab: "Beitrag & Nachrichten erstellen",
                category: "BBCodes",
                type: "toggle",
                "default": false,
                description: "Fügt dem WYSIWYG-Editor das Icon für den Clipfish-BBCode hinzu."
            });
            register({
                key: "option.postCreate.bbcode.googlevideo",
                name: "Googlevideo",
                tab: "Einstellungen",
                subtab: "Beitrag & Nachrichten erstellen",
                category: "BBCodes",
                type: "toggle",
                "default": false,
                description: "Fügt dem WYSIWYG-Editor das Icon für den Googlevideo-BBCode hinzu."
            });
            register({
                key: "option.postCreate.bbcode.myspace",
                name: "MySpace",
                tab: "Einstellungen",
                subtab: "Beitrag & Nachrichten erstellen",
                category: "BBCodes",
                type: "toggle",
                "default": false,
                description: "Fügt dem WYSIWYG-Editor das Icon für den MySpace-BBCode hinzu."
            });
            register({
                key: "option.postCreate.bbcode.myvideo",
                name: "MyVideo",
                tab: "Einstellungen",
                subtab: "Beitrag & Nachrichten erstellen",
                category: "BBCodes",
                type: "toggle",
                "default": false,
                description: "Fügt dem WYSIWYG-Editor das Icon für den MyVideo-BBCode hinzu."
            });
            if (utils.isTemplate([ "tplPostAdd", "tplThreadAdd", "tplPmNew", "tplPostEdit", "tplUserProfileEdit" ])) {
                if (storage.get("option.postCreate.bbcode.email", false)) {
                    $("#mce_editor_0_toolBar ul").last().append(require("templates").bbcode({
                        name: "email",
                        img: "http://cdn.breadfishplusplus.eu/img/bbcodes/email.png",
                        title: "Email einfügen"
                    }));
                }
                if (storage.get("option.postCreate.bbcode.sub", false)) {
                    $("#mce_editor_0_toolBar ul").last().append(require("templates").bbcode({
                        name: "sub",
                        img: "http://cdn.breadfishplusplus.eu/img/bbcodes/sub.png",
                        title: "Text tiefstellen"
                    }));
                }
                if (storage.get("option.postCreate.bbcode.sup", false)) {
                    $("#mce_editor_0_toolBar ul").last().append(require("templates").bbcode({
                        name: "sup",
                        img: "http://cdn.breadfishplusplus.eu/img/bbcodes/sup.png",
                        title: "Text tiefstellen"
                    }));
                }
                if (storage.get("option.postCreate.bbcode.java", false)) {
                    $("#mce_editor_0_toolBar ul").last().append(require("templates").bbcode({
                        name: "java",
                        img: "wcf/icon/wysiwyg/insertJavaM.png",
                        title: "Java-Quelltext"
                    }));
                }
                if (storage.get("option.postCreate.bbcode.css", false)) {
                    $("#mce_editor_0_toolBar ul").last().append(require("templates").bbcode({
                        name: "css",
                        img: "wcf/icon/wysiwyg/insertCssM.png",
                        title: "Cascading Style Sheet"
                    }));
                }
                if (storage.get("option.postCreate.bbcode.html", false)) {
                    $("#mce_editor_0_toolBar ul").last().append(require("templates").bbcode({
                        name: "html",
                        img: "wcf/icon/wysiwyg/insertHtmlM.png",
                        title: "HTML-Quelltext"
                    }));
                }
                if (storage.get("option.postCreate.bbcode.xml", false)) {
                    $("#mce_editor_0_toolBar ul").last().append(require("templates").bbcode({
                        name: "xml",
                        img: "wcf/icon/wysiwyg/insertHtmlM.png",
                        title: "XML-Quelltext"
                    }));
                }
                if (storage.get("option.postCreate.bbcode.js", false)) {
                    $("#mce_editor_0_toolBar ul").last().append(require("templates").bbcode({
                        name: "js",
                        img: "wcf/icon/wysiwyg/insertJavaScriptM.png",
                        title: "Javascript-Quelltext"
                    }));
                }
                if (storage.get("option.postCreate.bbcode.c", false)) {
                    $("#mce_editor_0_toolBar ul").last().append(require("templates").bbcode({
                        name: "c",
                        img: "wcf/icon/wysiwyg/insertCM.png",
                        title: "C/C++-Quelltext"
                    }));
                }
                if (storage.get("option.postCreate.bbcode.dropdown", false)) {
                    $("#mce_editor_0_toolBar ul").last().append(require("templates").bbcode({
                        name: "dropdown",
                        img: "wcf/icon/wysiwyg/editorResizeM.png",
                        title: "Dropdown"
                    }));
                }
                if (storage.get("option.postCreate.bbcode.sevenload", false)) {
                    $("#mce_editor_0_toolBar ul").last().append(require("templates").bbcode({
                        name: "sevenload",
                        img: "wcf/icon/wysiwyg/sevenLoadM.png",
                        title: "Sevenload"
                    }));
                }
                if (storage.get("option.postCreate.bbcode.clipfish", false)) {
                    $("#mce_editor_0_toolBar ul").last().append(require("templates").bbcode({
                        name: "clipfish",
                        img: "wcf/icon/wysiwyg/clipfishM.png",
                        title: "Clipfish"
                    }));
                }
                if (storage.get("option.postCreate.bbcode.googlevideo", false)) {
                    $("#mce_editor_0_toolBar ul").last().append(require("templates").bbcode({
                        name: "googlevideo",
                        img: "wcf/icon/wysiwyg/googleVideoM.png",
                        title: "Googlevideo"
                    }));
                }
                if (storage.get("option.postCreate.bbcode.myspace", false)) {
                    $("#mce_editor_0_toolBar ul").last().append(require("templates").bbcode({
                        name: "myspace",
                        img: "wcf/icon/wysiwyg/mySpaceM.png",
                        title: "MySpace"
                    }));
                }
                if (storage.get("option.postCreate.bbcode.myvideo", false)) {
                    $("#mce_editor_0_toolBar ul").last().append(require("templates").bbcode({
                        name: "myvideo",
                        img: "wcf/icon/wysiwyg/myVideoM.png",
                        title: "MyVideo"
                    }));
                }
            }
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
        "../settings": 55,
        "../storage": 56,
        "../utils": 71,
        templates: "94v5J1"
    } ],
    23: [ function(require, module, exports) {
        (function(global) {
            "use strict";
            var $ = typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null;
            var _ = typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null;
            var storage = require("../storage");
            var utils = require("../utils");
            var register = require("../settings").register;
            register({
                key: "option.postCreate.extension.nickautocomplete",
                name: "Benutzer-Autovervollständigung",
                tab: "Einstellungen",
                subtab: "Beitrag & Nachrichten erstellen",
                category: "Erweiterungen",
                type: "toggle",
                "default": false,
                description: "Schlägt beim Zitieren automatisch Benutzer vor, auf die die bereits geschriebenen Buchstaben passen."
            });
            if (storage.get("option.postCreate.extension.nickautocomplete", false) && utils.isTemplate([ "tplPostAdd", "tplThreadAdd", "tplPmNew", "tplPostEdit" ])) {
                var $editorCodeView = $(".editorCodeView"), nickCompletionlist = [], $nickCompletionList = null, getCaretPosition, setCaretPosition, getNick, reset = false, renderNickCompletionList, removeNickCompletionList, getActiveIndex, increaseIndex, addActiveSuggestedNick;
                getCaretPosition = function() {
                    if ($editorCodeView[0].setSelectionRange) {
                        return $editorCodeView[0].selectionEnd;
                    }
                    if (document.selection && document.selection.createRange) {
                        var range = document.selection.createRange(), start = range.duplicate().moveStart("character", -1e5);
                        return start + range.text.length;
                    }
                };
                setCaretPosition = function(pos) {
                    if ($editorCodeView[0].setSelectionRange) {
                        $editorCodeView[0].focus();
                        $editorCodeView[0].setSelectionRange(pos, pos);
                    } else if ($editorCodeView[0].createTextRange) {
                        var range = $editorCodeView[0].createTextRange();
                        range.collapse(true);
                        range.moveEnd("character", pos);
                        range.moveStart("character", pos);
                        range.select();
                    }
                };
                getNick = function() {
                    var result = /\S+$/.exec($editorCodeView.val().slice(0, getCaretPosition()));
                    return result ? result[0].indexOf("@") === 0 ? result[0].substr(1) : null : null;
                };
                getActiveIndex = function() {
                    var i;
                    for (i = 0; i < nickCompletionlist.length; i += 1) {
                        if (nickCompletionlist[i].active) {
                            return i;
                        }
                    }
                    return -1;
                };
                increaseIndex = function() {
                    if (!$nickCompletionList) {
                        return false;
                    }
                    var curIndex = getActiveIndex();
                    if (curIndex === -1) {
                        return false;
                    }
                    nickCompletionlist[curIndex].active = false;
                    if (curIndex < nickCompletionlist.length - 1) {
                        nickCompletionlist[curIndex + 1].active = true;
                    } else {
                        nickCompletionlist[0].active = true;
                    }
                    renderNickCompletionList();
                    return true;
                };
                renderNickCompletionList = function() {
                    removeNickCompletionList();
                    $nickCompletionList = $(require("templates").nickAutocompleteList({
                        nickList: nickCompletionlist
                    }));
                    $nickCompletionList.appendTo("body");
                    var offset = $editorCodeView.offset();
                    offset.left -= $nickCompletionList.outerWidth() + 5;
                    $nickCompletionList.css(offset).show();
                };
                removeNickCompletionList = function() {
                    if ($nickCompletionList) {
                        $nickCompletionList.empty().remove();
                        $nickCompletionList = null;
                    }
                };
                addActiveSuggestedNick = function() {
                    if (!$nickCompletionList) {
                        return false;
                    }
                    var curIndex = getActiveIndex(), suggestedNick = nickCompletionlist[curIndex].nick, insert = "", text = $editorCodeView.val(), caret = getCaretPosition(), nick = getNick();
                    if (suggestedNick && suggestedNick.length !== 0) {
                        insert = suggestedNick + ": ";
                        $editorCodeView.val(text.substr(0, caret - nick.length) + insert + text.substr(caret));
                        setCaretPosition((text.substr(0, caret - nick.length) + insert).length);
                        $nickCompletionList.hide().find("ul").empty();
                        return true;
                    }
                    return false;
                };
                $(document).on("click", "#nickCompletionList li a", function(event) {
                    nickCompletionlist[getActiveIndex()].active = false;
                    nickCompletionlist[parseInt($(this).attr("data-index"), 10)].active = true;
                    addActiveSuggestedNick();
                    event.preventDefault();
                });
                $editorCodeView.on("keydown", function(event) {
                    var nick = getNick(), charCode = event.which || event.keyCode;
                    if (charCode === 27) {
                        reset = true;
                        removeNickCompletionList();
                    } else if (charCode === 9) {
                        if (increaseIndex()) {
                            event.preventDefault();
                        }
                    } else if (charCode === 32) {
                        reset = false;
                        if (addActiveSuggestedNick()) {
                            event.preventDefault();
                        }
                    } else if (nick && nick.length >= 1 && !reset) {
                        $.post("index.php?page=PublicUserSuggest", {
                            query: nick
                        }, "xml").done(function(xmlDoc) {
                            nickCompletionlist = $.map($(xmlDoc).find("user").toArray(), function(val, i) {
                                return {
                                    index: i,
                                    active: i === 0,
                                    nick: val.textContent
                                };
                            });
                            renderNickCompletionList();
                        }).fail(function(jqXHR) {
                            removeNickCompletionList();
                            utils.log.error("Konnte keine Benutzervorschläge für »" + nick + "« abrufen.", jqXHR.status, jqXHR.statusText);
                        });
                    } else {
                        removeNickCompletionList();
                    }
                });
            }
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
        "../settings": 55,
        "../storage": 56,
        "../utils": 71,
        templates: "94v5J1"
    } ],
    24: [ function(require, module, exports) {
        (function(global) {
            "use strict";
            var $ = typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null;
            var _ = typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null;
            var storage = require("../storage");
            var utils = require("../utils");
            var register = require("../settings").register;
            var CDN_PATH = "http://cdn.breadfishplusplus.eu/";
            register({
                key: "option.postCreate.smilies.rage",
                name: "Rageicons",
                tab: "Einstellungen",
                subtab: "Beitrag & Nachrichten erstellen",
                category: "Smilies",
                type: "toggle",
                "default": false,
                description: "Fügt dem WYSIWYG-Editor eine neue Kategorie mit Rageicons hinzu."
            });
            register({
                key: "option.postCreate.smilies.skype",
                name: "Skype",
                tab: "Einstellungen",
                subtab: "Beitrag & Nachrichten erstellen",
                category: "Smilies",
                type: "toggle",
                "default": false,
                description: "Fügt dem WYSIWYG-Editor eine neue Kategorie mit Skype-Smilies hinzu."
            });
            register({
                key: "option.postCreate.smilies.yolks",
                name: "Y o l k s",
                tab: "Einstellungen",
                subtab: "Beitrag & Nachrichten erstellen",
                category: "Smilies",
                type: "toggle",
                "default": false,
                description: "Fügt dem WYSIWYG-Editor eine neue Kategorie mit Y o l k s-Smilies hinzu."
            });
            register({
                key: "option.postCreate.smilies.emoji",
                name: "Emoji",
                tab: "Einstellungen",
                subtab: "Beitrag & Nachrichten erstellen",
                category: "Smilies",
                type: "toggle",
                "default": false,
                description: "Fügt dem WYSIWYG-Editor eine neue Kategorie mit Emojicons hinzu."
            });
            var loadSmilies = function(smilieData) {
                utils.log.debug("loadSmilies", smilieData);
                var $smileyContainer = $("#smileyContainer"), win = unsafeWindow || window;
                smilieData = _.filter(smilieData, function(category) {
                    return storage.get("option.postCreate.smilies." + category.keyName, false);
                });
                _.each(smilieData, function(category, index) {
                    win.smileyCategories.set(index + 2, category.name + " (" + category.smilies.length + ")");
                    category.fullPath = CDN_PATH + "img/smilies" + category.path;
                    $smileyContainer.append(require("templates").smileyContainer({
                        index: index + 2,
                        category: category
                    }));
                });
                win.smileyCategorySwitcher.showSmileyCategories();
                if ($("#smiliesTab.activeTabMenu").length === 0) {
                    win.smileyCategorySwitcher.hideSmileyCategories();
                }
                $("#tabMenu li a").click(function() {
                    if ($(this).parent("li").attr("id") === "smiliesTab") {
                        win.smileyCategorySwitcher.showSmileyCategories();
                    } else {
                        win.smileyCategorySwitcher.hideSmileyCategories();
                    }
                });
            };
            if (utils.isTemplate([ "tplPostAdd", "tplThreadAdd", "tplPmNew", "tplPostEdit" ])) {
                if (storage.get("option.postCreate.smilies.rage", false) || storage.get("option.postCreate.smilies.skype", false) || storage.get("option.postCreate.smilies.yolks", false) || storage.get("option.postCreate.smilies.emoji", false)) {
                    $.getJSON("https://api.github.com/repos/BreadfishPlusPlus/cdn.breadfishplusplus.eu/contents/img/smilies/smilies.json").done(function(data) {
                        loadSmilies(JSON.parse(window.atob(data.content)));
                    }).fail(function(jqXHR) {
                        utils.log.error("Konnte Smilies nicht abrufen.", jqXHR.status, jqXHR.statusText);
                    });
                }
            }
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
        "../settings": 55,
        "../storage": 56,
        "../utils": 71,
        templates: "94v5J1"
    } ],
    25: [ function(require, module, exports) {
        (function(global) {
            "use strict";
            var $ = typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null;
            var storage = require("../storage");
            var utils = require("../utils");
            var register = require("../settings").register;
            register({
                key: "option.posts.extension.imageResize.enabled",
                name: "Bilderzoom",
                tab: "Einstellungen",
                subtab: "Beiträge & Nachrichten",
                category: "Erweiterungen",
                type: "toggle",
                "default": false,
                description: "Erlaubt es, die Größe von Bildern in Signaturen und Posts per Mausrad zu ändern."
            });
            var STEPS = 30;
            if (storage.get("option.posts.extension.imageResize.enabled", false) && utils.isTemplate("tplThread")) {
                $(document).on("mousewheel", ".resizeImage,.bpp_resizeImage", function(event) {
                    event.preventDefault();
                    var zoom = (event.deltaX || event.deltaY) * STEPS, $elem = $(this);
                    if ($elem.attr("height")) {
                        $elem.css("height", $elem.attr("height") + "px");
                        $elem.removeAttr("height");
                    }
                    if ($elem.attr("width")) {
                        $elem.removeAttr("width");
                    }
                    $elem.css("height", Math.max(STEPS, $elem.height() + zoom) + "px");
                });
            }
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
        "../settings": 55,
        "../storage": 56,
        "../utils": 71
    } ],
    26: [ function(require, module, exports) {}, {} ],
    27: [ function(require, module, exports) {
        (function(global) {
            "use strict";
            var $ = typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null;
            var storage = require("../storage");
            var utils = require("../utils");
            var register = require("../settings").register;
            register({
                key: "option.posts.extension.removeExternalImages.enabled",
                name: "Externen Bildern",
                tab: "Einstellungen",
                subtab: "Beiträge & Nachrichten",
                category: "Filter",
                type: "toggle",
                "default": false,
                description: "Entfernt Bilder, die nicht von sa-mp.de stammen, aus den Themen und zeigt stattdessen nur die URL des Bildes an."
            });
            if (storage.get("option.posts.extension.removeExternalImages.enabled", false) && utils.isTemplate("tplThread")) {
                $(".externalURL:has(.resizeImage), .externalURL:has(.bpp_resizeImage)").each(function() {
                    var url = $(this).find(".resizeImage, .bpp_resizeImage").attr("src");
                    $(this).html(url);
                });
                $(".resizeImage, .bpp_resizeImage").each(function() {
                    var url = $(this).attr("src");
                    $(this).replaceWith('<a href="' + url + '" class="externalURL">' + url + "</a>");
                });
            }
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
        "../settings": 55,
        "../storage": 56,
        "../utils": 71
    } ],
    28: [ function(require, module, exports) {
        (function(global) {
            "use strict";
            var $ = typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null;
            var storage = require("../storage");
            var utils = require("../utils");
            var register = require("../settings").register;
            register({
                key: "option.posts.extension.shorturl.enabled",
                name: "Kurz-URL",
                tab: "Einstellungen",
                subtab: "Beiträge & Nachrichten",
                category: "Erweiterungen",
                type: "toggle",
                "default": false,
                description: "Zeigt in der Beitragsansicht zu jedem Beitrag einen kurzen Link (~25 Zeichen) an, der direkt zum Beitrag führt."
            });
            if (storage.get("option.posts.extension.shorturl.enabled", false) && utils.isTemplate("tplThread")) {
                require("../styles/shortUrl.less");
                $(".message:not(.quickReply):not(.deleted)").each(function() {
                    var $elem = $(this), id = $elem.attr("id").substr(7);
                    $elem.find(".messageFooterRight .smallButtons > ul").append(require("templates").shortUrlButton({
                        url: "http://sa-mp.de/B++/p" + id + "-/"
                    }));
                });
                $(".bpp-shorturl").click(function(e) {
                    e.preventDefault();
                    $(this).find("span").hide();
                    $(this).find("input").show().focus().select();
                });
                $(".bpp-shorturl-input").blur(function() {
                    $(this).siblings("span").show();
                    $(this).hide();
                });
            }
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
        "../settings": 55,
        "../storage": 56,
        "../styles/shortUrl.less": 65,
        "../utils": 71,
        templates: "94v5J1"
    } ],
    29: [ function(require, module, exports) {
        (function(global) {
            "use strict";
            var $ = typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null;
            var storage = require("../storage");
            var utils = require("../utils");
            var register = require("../settings").register;
            register({
                key: "option.posts.extension.signatureHeight.enabled",
                name: "Höhenbegrenzung für Signaturen",
                tab: "Einstellungen",
                subtab: "Beiträge & Nachrichten",
                category: "Erweiterungen",
                type: "toggle",
                "default": false,
                description: "Entfernt die Scrollbars aus den Signaturen und zeigt sie in voller Höhe an."
            });
            if (storage.get("option.posts.extension.signatureHeight.enabled", false) && utils.isTemplate("tplThread")) {
                $(".signature").css("max-height", "none");
            }
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
        "../settings": 55,
        "../storage": 56,
        "../utils": 71
    } ],
    30: [ function(require, module, exports) {
        (function(global) {
            "use strict";
            var $ = typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null;
            var storage = require("../storage");
            var utils = require("../utils");
            var register = require("../settings").register;
            register({
                key: "option.posts.extension.syntaxhighlightning.enabled",
                name: "Syntaxhervorhebung",
                tab: "Einstellungen",
                subtab: "Beiträge & Nachrichten",
                category: "Erweiterungen",
                type: "toggle",
                "default": false,
                description: "Ersetzt die Standard-Syntaxhervorhebung durch eine verbesserte Hervorhebung."
            });
            if (storage.get("option.posts.extension.syntaxhighlightning.enabled", false) && utils.isTemplate("tplThread")) {
                require("../styles/highlightjs.less");
                $(".codeBox").each(function() {
                    var $elem = $(this), code = $elem.find(".codeLines pre").text(), title = $elem.find(".codeLines h3").text();
                    if (title === "C/C++-Quelltext" || title === "PAWN Quelltext") {
                        $elem.find(".codeLines pre").html(hljs.highlight("cpp", code).value);
                    } else if (title === "Cascading Style Sheet") {
                        $elem.find(".codeLines pre").html(hljs.highlight("css", code).value);
                    } else if (title === "HTML" || title === "XML" || title === "Template-Quelltext") {
                        $elem.find(".codeLines pre").html(hljs.highlight("xml", code).value);
                    } else if (title === "Java-Quelltext") {
                        $elem.find(".codeLines pre").html(hljs.highlight("java", code).value);
                    } else if (title === "Javascript-Quelltext") {
                        $elem.find(".codeLines pre").html(hljs.highlight("javascript", code).value);
                    } else if (title === "MySQL-Abfrage(n)") {
                        $elem.find(".codeLines pre").html(hljs.highlight("sql", code).value);
                    } else if (title === "PHP-Quelltext") {
                        $elem.find(".codeLines pre").html(hljs.highlight("php", code).value);
                    } else {
                        $elem.find(".codeLines pre").html(hljs.highlightAuto(code).value);
                    }
                });
            }
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
        "../settings": 55,
        "../storage": 56,
        "../styles/highlightjs.less": 60,
        "../utils": 71
    } ],
    31: [ function(require, module, exports) {
        (function(global) {
            "use strict";
            var $ = typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null;
            var _ = typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null;
            var storage = require("../storage");
            var utils = require("../utils");
            var register = require("../settings").register;
            register({
                key: "option.posts.extension.thanks.enabled",
                name: "Danksagungen anzeigen",
                tab: "Einstellungen",
                subtab: "Beiträge & Nachrichten",
                category: "Erweiterungen",
                type: "toggle",
                "default": false,
                description: "Zeigt die Anzahl der Danksagungen, die ein Benutzer bekommen hat, in Beiträgen an."
            });
            register({
                key: "option.posts.extension.thanks.cache",
                type: "invis",
                "default": {}
            });
            if (storage.get("option.posts.extension.thanks.enabled", false) && utils.isTemplate("tplThread")) {
                var thanksCache = storage.get("option.posts.extension.thanks.cache", {});
                var users = [], setSidebarThanks, getThanks;
                setSidebarThanks = function(userID, thanks) {
                    var $bpp_thanks = $('.bpp_thanks[data-userID="' + userID + '"]');
                    if (thanks === -2) {
                        $bpp_thanks.parent("p").hide();
                    } else if (thanks === -1) {
                        $bpp_thanks.html('<img src="icon/thankS.png" alt="" /> <img src="icon/thankLoadS.gif" alt="" />');
                    } else {
                        $bpp_thanks.html('<img src="icon/thankS.png" alt="" /> ' + thanks);
                    }
                };
                getThanks = function(userID, callback) {
                    $.get("http://forum.sa-mp.de/index.php?page=UserThankList&userID=" + userID).done(function(response) {
                        var $data = $(response), arr, pages, thanks;
                        if ($data.find(".error").length === 0) {
                            arr = $data.find(".pageNavigation ul li:not(.skip):not(.children)").toArray();
                            pages = parseInt($(arr[arr.length - 1]).text(), 10);
                            thanks = 0;
                            if (isNaN(pages)) {
                                thanks = parseInt($data.find(".tableList tbody tr").length, 10);
                                callback(thanks);
                            } else {
                                $.get("http://forum.sa-mp.de/index.php?page=UserThankList&userID=" + userID + "&pageNoGot=" + pages).done(function(response2) {
                                    thanks = parseInt($(response2).find(".tableList tbody tr").length, 10);
                                    thanks += (pages - 1) * 10;
                                    thanksCache[userID] = thanks;
                                    storage.set("option.posts.extension.thanks.cache", thanksCache);
                                    callback(thanks);
                                }).fail(function(jqXHR) {
                                    callback(-2);
                                    utils.log.error("Konnte keine Danksagungen von #" + userID + " abrufen.", jqXHR.status, jqXHR.statusText);
                                });
                            }
                        }
                    }).fail(function(jqXHR) {
                        thanksCache[userID] = -2;
                        storage.set("option.posts.extension.thanks.cache", thanksCache);
                        callback(-2);
                        if (jqXHR.status === 403) {
                            utils.log.debug("Danksagungen von #" + userID + " sind nicht öffentlich zugänglich.");
                        } else {
                            utils.log.error("Konnte keine Danksagungen von #" + userID + " abrufen.", jqXHR.status, jqXHR.statusText);
                        }
                    });
                };
                $(".message:not(.quickReply):not(.deleted)").each(function() {
                    var $elem = $(this), userID = parseInt(utils.getParameterByName("userID", $elem.find(".messageAuthor .userName a").attr("href")), 10);
                    if (users.indexOf(userID) === -1 && !isNaN(userID)) {
                        users.push(userID);
                    }
                    $elem.find(".userCredits").append('<p><a class="bpp_thanks" data-userID="' + userID + '" href="index.php?page=UserThankList&userID=' + userID + '"><img src="icon/thankS.png" alt="" /> <img src="icon/thankLoadS.gif" alt="" /></a></p>');
                });
                _.each(users, function(userId) {
                    var cachedThanks = thanksCache[userId] || -1;
                    if (cachedThanks !== -1) {
                        setSidebarThanks(userId, cachedThanks);
                    }
                    getThanks(userId, function(thanks) {
                        setSidebarThanks(userId, thanks);
                    });
                });
            }
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
        "../settings": 55,
        "../storage": 56,
        "../utils": 71
    } ],
    32: [ function(require, module, exports) {
        (function(global) {
            "use strict";
            var $ = typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null;
            var moment = typeof window !== "undefined" ? window.moment : typeof global !== "undefined" ? global.moment : null;
            var storage = require("../storage");
            var utils = require("../utils");
            var register = require("../settings").register;
            register({
                key: "option.posts.extension.youtubePreview.enabled",
                name: "Youtube Vorschau",
                tab: "Einstellungen",
                subtab: "Beiträge & Nachrichten",
                category: "Erweiterungen",
                type: "toggle",
                "default": false,
                description: "Ersetzt Youtube-Videos durch eine Vorschau-Box mit Informationen zu dem Video."
            });
            register({
                key: "option.posts.filter.youtube.enabled",
                type: "invis",
                "default": false
            });
            if (storage.get("option.posts.extension.youtubePreview.enabled", false) && utils.isTemplate("tplThread") && !storage.get("option.posts.filter.youtube.enabled", false)) {
                require("../styles/youtubePreview.less");
                var mNames = [ "Jan", "Feb", "Mrz", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez" ], width = $(".message:not(.quickReply):not(.deleted) .messageBody > div").first().width(), formatTime, pad;
                pad = function(num) {
                    var s = "0" + num;
                    return s.substr(s.length - 2);
                };
                formatTime = function(sec_num) {
                    var hours = Math.floor(sec_num / 3600), minutes = Math.floor((sec_num - hours * 3600) / 60), seconds = sec_num - hours * 3600 - minutes * 60, time = "";
                    if (hours > 0) {
                        time += hours + ":";
                        time += pad(minutes, 2) + ":";
                    } else {
                        time += minutes + ":";
                    }
                    time += pad(seconds, 2);
                    return time;
                };
                $(".message:not(.quickReply):not(.deleted) .messageContentInner object").each(function() {
                    var $object = $(this), videoId = $object.attr("data").substr(-17, 11);
                    $object.attr("id", "object-" + videoId);
                    $object.hide();
                    $.getJSON("https://gdata.youtube.com/feeds/api/videos/" + videoId + "?v=2&alt=json", function(data) {
                        var $preview = $(require("templates").youtubePreview({
                            thumbnail: data.entry.media$group.media$thumbnail[0].url,
                            title: data.entry.title.$t,
                            author: data.entry.author[0].name.$t,
                            uploadTime: moment(data.entry.media$group.yt$uploaded.$t).format("dddd, Do MMM YYYY, HH:mm [Uhr]"),
                            length: formatTime(data.entry.media$group.yt$duration.seconds),
                            clicks: data.entry.yt$statistics.viewCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
                            videoId: videoId
                        }));
                        $object.replaceWith($preview);
                        $preview.find(".bpp-youtube-preview-link").click(function(e) {
                            e.preventDefault();
                            $preview.replaceWith('<iframe width="' + width + '" height="' + width / 16 * 9 + '" src="//www.youtube-nocookie.com/embed/' + videoId + '?rel=0" frameborder="0" allowfullscreen></iframe>');
                        });
                        utils.log.debug("youtubePreview " + videoId, data);
                    }).fail(function(jqXHR, stauts, errorThrown) {
                        $object.show();
                        utils.log.error("Konnte keine Daten von gdata.youtube.com abrufen.", stauts, errorThrown);
                    });
                });
            }
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
        "../settings": 55,
        "../storage": 56,
        "../styles/youtubePreview.less": 68,
        "../utils": 71,
        templates: "94v5J1"
    } ],
    33: [ function(require, module, exports) {
        (function(global) {
            "use strict";
            var $ = typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null;
            var storage = require("../storage");
            var utils = require("../utils");
            var register = require("../settings").register;
            register({
                key: "option.posts.filter.additionalUserrank.enabled",
                name: "Zusätzlicher Benutzerrang",
                tab: "Einstellungen",
                subtab: "Beiträge & Nachrichten",
                category: "Filter",
                type: "toggle",
                "default": false,
                description: "Blendet den zusätzlichen Benutzerrang (falls vorhanden) aus."
            });
            if (storage.get("option.posts.filter.additionalUserrank.enabled", false) && utils.isTemplate("tplThread")) {
                $(".messageAuthor").each(function() {
                    if ($(this).find(".userRank").length === 2 || $(this).find(".userRank").length === 1 && storage.get("option.posts.filter.userrank.enabled", false)) {
                        $(this).find(".userRank").last().remove();
                    }
                });
            }
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
        "../settings": 55,
        "../storage": 56,
        "../utils": 71
    } ],
    34: [ function(require, module, exports) {
        (function(global) {
            "use strict";
            var $ = typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null;
            var storage = require("../storage");
            var utils = require("../utils");
            var register = require("../settings").register;
            register({
                key: "option.posts.filter.bestans.enabled",
                name: "Hilfreichste Antwort",
                tab: "Einstellungen",
                subtab: "Beiträge & Nachrichten",
                category: "Filter",
                type: "toggle",
                "default": false,
                description: "Entfernt die Markierung der hilfreichsten Antwort."
            });
            if (storage.get("option.posts.filter.bestans.enabled", false) && utils.isTemplate("tplThread")) {
                require("./../styles/filterBestans.less");
            }
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
        "../settings": 55,
        "../storage": 56,
        "../utils": 71,
        "./../styles/filterBestans.less": 58
    } ],
    35: [ function(require, module, exports) {
        (function(global) {
            "use strict";
            var $ = typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null;
            var storage = require("../storage");
            var utils = require("../utils");
            var register = require("../settings").register;
            register({
                key: "option.posts.filter.deleted.enabled",
                name: "Gelöschte Beiträge",
                tab: "Einstellungen",
                subtab: "Beiträge & Nachrichten",
                category: "Filter",
                type: "toggle",
                "default": false,
                description: "Blendet gelöschte Beiträge komplett aus."
            });
            if (storage.get("option.posts.filter.deleted.enabled", false) && utils.isTemplate("tplThread")) {
                $('.messageMinimized:not(.quickReply) > .messageInner > img[src="icon/postTrashM.png"]').closest(".messageMinimized").remove();
            }
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
        "../settings": 55,
        "../storage": 56,
        "../utils": 71
    } ],
    36: [ function(require, module, exports) {
        (function(global) {
            "use strict";
            var $ = typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null;
            var storage = require("../storage");
            var utils = require("../utils");
            var register = require("../settings").register;
            register({
                key: "option.posts.filter.gender.enabled",
                name: "Geschlecht",
                tab: "Einstellungen",
                subtab: "Beiträge & Nachrichten",
                category: "Filter",
                type: "toggle",
                "default": false,
                description: "Blendet das Geschlecht aus."
            });
            if (storage.get("option.posts.filter.gender.enabled", false) && utils.isTemplate("tplThread")) {
                $('.userSymbols img[src="wcf/icon/genderMaleS.png"], .userSymbols img[src="wcf/icon/genderFemaleS.png"]').parent("li").remove();
                $(".userCredits").each(function() {
                    if ($(this).children().length === 0) {
                        $(this).remove();
                    }
                });
            }
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
        "../settings": 55,
        "../storage": 56,
        "../utils": 71
    } ],
    37: [ function(require, module, exports) {
        (function(global) {
            "use strict";
            var $ = typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null;
            var storage = require("../storage");
            var utils = require("../utils");
            var register = require("../settings").register;
            register({
                key: "option.posts.filter.icq.enabled",
                name: "ICQ",
                tab: "Einstellungen",
                subtab: "Beiträge & Nachrichten",
                category: "Filter",
                type: "toggle",
                "default": false,
                description: "Blendet die Nummer des ICQ-Accounts aus."
            });
            if (storage.get("option.posts.filter.icq.enabled", false) && utils.isTemplate("tplThread")) {
                $('.userMessenger img[src="wcf/icon/icqS.png"]').closest("li").remove();
                $(".userCredits").each(function() {
                    if ($(this).children().length === 0) {
                        $(this).remove();
                    }
                });
            }
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
        "../settings": 55,
        "../storage": 56,
        "../utils": 71
    } ],
    38: [ function(require, module, exports) {
        (function(global) {
            "use strict";
            var $ = typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null;
            var storage = require("../storage");
            var utils = require("../utils");
            var register = require("../settings").register;
            register({
                key: "option.posts.filter.ignored.enabled",
                name: "Ignorierte Benutzer",
                tab: "Einstellungen",
                subtab: "Beiträge & Nachrichten",
                category: "Filter",
                type: "toggle",
                "default": false,
                description: "Blendet Beiträge von ignorierten Benutzern komplett aus."
            });
            if (storage.get("option.posts.filter.ignored.enabled", false) && utils.isTemplate("tplThread")) {
                $('.messageMinimized:not(.quickReply) > .messageInner > img[src="wcf/icon/warningM.png"]').closest(".messageMinimized").remove();
            }
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
        "../settings": 55,
        "../storage": 56,
        "../utils": 71
    } ],
    39: [ function(require, module, exports) {
        (function(global) {
            "use strict";
            var $ = typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null;
            var storage = require("../storage");
            var utils = require("../utils");
            var register = require("../settings").register;
            register({
                key: "option.posts.filter.bestans.enabled",
                name: "Hilfreichste Antwort",
                tab: "Einstellungen",
                subtab: "Beiträge & Nachrichten",
                category: "Filter",
                type: "toggle",
                "default": false,
                description: "Entfernt die Markierung der hilfreichsten Antwort."
            });
            if (storage.get("option.posts.filter.bestans.enabled", false) && utils.isTemplate("tplThread")) {
                require("./../styles/filterBestans.less");
            }
            register({
                key: "option.posts.filter.deleted.enabled",
                name: "Gelöschte Beiträge",
                tab: "Einstellungen",
                subtab: "Beiträge & Nachrichten",
                category: "Filter",
                type: "toggle",
                "default": false,
                description: "Blendet gelöschte Beiträge komplett aus."
            });
            if (storage.get("option.posts.filter.deleted.enabled", false) && utils.isTemplate("tplThread")) {
                $('.messageMinimized:not(.quickReply) > .messageInner > img[src="icon/postTrashM.png"]').closest(".messageMinimized").remove();
            }
            register({
                key: "option.posts.filter.gender.enabled",
                name: "Geschlecht",
                tab: "Einstellungen",
                subtab: "Beiträge & Nachrichten",
                category: "Filter",
                type: "toggle",
                "default": false,
                description: "Blendet das Geschlecht aus."
            });
            if (storage.get("option.posts.filter.gender.enabled", false) && utils.isTemplate("tplThread")) {
                $('.userSymbols img[src="wcf/icon/genderMaleS.png"], .userSymbols img[src="wcf/icon/genderFemaleS.png"]').parent("li").remove();
                $(".userCredits").each(function() {
                    if ($(this).children().length === 0) {
                        $(this).remove();
                    }
                });
            }
            register({
                key: "option.posts.filter.icq.enabled",
                name: "ICQ",
                tab: "Einstellungen",
                subtab: "Beiträge & Nachrichten",
                category: "Filter",
                type: "toggle",
                "default": false,
                description: "Blendet die Nummer des ICQ-Accounts aus."
            });
            if (storage.get("option.posts.filter.icq.enabled", false) && utils.isTemplate("tplThread")) {
                $('.userMessenger img[src="wcf/icon/icqS.png"]').closest("li").remove();
                $(".userCredits").each(function() {
                    if ($(this).children().length === 0) {
                        $(this).remove();
                    }
                });
            }
            register({
                key: "option.posts.filter.additionalUserrank.enabled",
                name: "Zusätzlicher Benutzerrang",
                tab: "Einstellungen",
                subtab: "Beiträge & Nachrichten",
                category: "Filter",
                type: "toggle",
                "default": false,
                description: "Blendet den zusätzlichen Benutzerrang (falls vorhanden) aus."
            });
            if (storage.get("option.posts.filter.additionalUserrank.enabled", false) && utils.isTemplate("tplThread")) {
                $(".messageAuthor").each(function() {
                    if ($(this).find(".userRank").length === 2 || $(this).find(".userRank").length === 1 && storage.get("option.posts.filter.userrank.enabled", false)) {
                        $(this).find(".userRank").last().remove();
                    }
                });
            }
            register({
                key: "option.posts.filter.ignored.enabled",
                name: "Ignorierte Benutzer",
                tab: "Einstellungen",
                subtab: "Beiträge & Nachrichten",
                category: "Filter",
                type: "toggle",
                "default": false,
                description: "Blendet Beiträge von ignorierten Benutzern komplett aus."
            });
            if (storage.get("option.posts.filter.ignored.enabled", false) && utils.isTemplate("tplThread")) {
                $('.messageMinimized:not(.quickReply) > .messageInner > img[src="wcf/icon/warningM.png"]').closest(".messageMinimized").remove();
            }
            register({
                key: "option.posts.filter.msn.enabled",
                name: "Windows Live",
                tab: "Einstellungen",
                subtab: "Beiträge & Nachrichten",
                category: "Filter",
                type: "toggle",
                "default": false,
                description: "Blendet den Windows Live Messenger-Namen aus."
            });
            if (storage.get("option.posts.filter.msn.enabled", false) && utils.isTemplate("tplThread")) {
                $('.userMessenger img[src="wcf/icon/msnS.png"]').closest("li").remove();
                $(".userCredits").each(function() {
                    if ($(this).children().length === 0) {
                        $(this).remove();
                    }
                });
            }
            register({
                key: "option.posts.filter.origin.enabled",
                name: "Origin",
                tab: "Einstellungen",
                subtab: "Beiträge & Nachrichten",
                category: "Filter",
                type: "toggle",
                "default": false,
                description: "Blendet den Originnamen aus."
            });
            if (storage.get("option.posts.filter.origin.enabled", false) && utils.isTemplate("tplThread")) {
                $('.userCredits p:contains("Origin: ")').remove();
                $(".userCredits").each(function() {
                    if ($(this).children().length === 0) {
                        $(this).remove();
                    }
                });
            }
            register({
                key: "option.posts.filter.postcount.enabled",
                name: "Beitragscounter",
                tab: "Einstellungen",
                subtab: "Beiträge & Nachrichten",
                category: "Filter",
                type: "toggle",
                "default": false,
                description: "Blendet den Beitragscounter aus."
            });
            if (storage.get("option.posts.filter.postcount.enabled", false) && utils.isTemplate("tplThread")) {
                $('.userCredits p > a:contains("Beiträge")').parent("p").remove();
                $(".userCredits").each(function() {
                    if ($(this).children().length === 0) {
                        $(this).remove();
                    }
                });
            }
            register({
                key: "option.posts.filter.psnid.enabled",
                name: "PSN ID",
                tab: "Einstellungen",
                subtab: "Beiträge & Nachrichten",
                category: "Filter",
                type: "toggle",
                "default": false,
                description: "Blendet die PSN ID aus."
            });
            if (storage.get("option.posts.filter.psnid.enabled", false) && utils.isTemplate("tplThread")) {
                $('.userCredits p:contains("PSN ID: ")').remove();
                $(".userCredits").each(function() {
                    if ($(this).children().length === 0) {
                        $(this).remove();
                    }
                });
            }
            register({
                key: "option.posts.filter.regdate.enabled",
                name: "Registrierungsdatum",
                tab: "Einstellungen",
                subtab: "Beiträge & Nachrichten",
                category: "Filter",
                type: "toggle",
                "default": false,
                description: "Blendet das Registrierungsdatum aus."
            });
            if (storage.get("option.posts.filter.regdate.enabled", false) && utils.isTemplate("tplThread")) {
                $('.userCredits p:contains("Registrierungsdatum: ")').remove();
                $(".userCredits").each(function() {
                    if ($(this).children().length === 0) {
                        $(this).remove();
                    }
                });
            }
            register({
                key: "option.posts.filter.skype.enabled",
                name: "Skype",
                tab: "Einstellungen",
                subtab: "Beiträge & Nachrichten",
                category: "Filter",
                type: "toggle",
                "default": false,
                description: "Blendet den Skype-Namen aus."
            });
            if (storage.get("option.posts.filter.skype.enabled", false) && utils.isTemplate("tplThread")) {
                $('.userMessenger img[src="wcf/icon/skypeS.png"]').closest("li").remove();
                $(".userCredits").each(function() {
                    if ($(this).children().length === 0) {
                        $(this).remove();
                    }
                });
            }
            register({
                key: "option.posts.filter.steam.enabled",
                name: "Steam",
                tab: "Einstellungen",
                subtab: "Beiträge & Nachrichten",
                category: "Filter",
                type: "toggle",
                "default": false,
                description: "Blendet den Steamnamen aus."
            });
            if (storage.get("option.posts.filter.steam.enabled", false) && utils.isTemplate("tplThread")) {
                $('.userCredits p:contains("Steam: ")').remove();
                $(".userCredits").each(function() {
                    if ($(this).children().length === 0) {
                        $(this).remove();
                    }
                });
            }
            register({
                key: "option.posts.filter.thanko.enabled",
                name: "Bedankomat",
                tab: "Einstellungen",
                subtab: "Beiträge & Nachrichten",
                category: "Filter",
                type: "toggle",
                "default": false,
                description: "Blendet den Bedankomat in Beiträgen aus."
            });
            if (storage.get("option.posts.filter.thanko.enabled", false) && utils.isTemplate("tplThread")) {
                $("li.postThankButton, .thankStats").remove();
            }
            register({
                key: "option.posts.filter.userrank.enabled",
                name: "Benutzerrang",
                tab: "Einstellungen",
                subtab: "Beiträge & Nachrichten",
                category: "Filter",
                type: "toggle",
                "default": false,
                description: "Blendet den Benutzerrang aus."
            });
            if (storage.get("option.posts.filter.userrank.enabled", false) && utils.isTemplate("tplThread")) {
                $(".messageAuthor").each(function() {
                    $(this).find(".userRank").first().remove();
                });
            }
            register({
                key: "option.posts.filter.usertitle.enabled",
                name: "Benutzertitel",
                tab: "Einstellungen",
                subtab: "Beiträge & Nachrichten",
                category: "Filter",
                type: "toggle",
                "default": false,
                description: "Blendet den Benutzertitel aus."
            });
            if (storage.get("option.posts.filter.usertitle.enabled", false) && utils.isTemplate("tplThread")) {
                $(".userTitle").remove();
            }
            register({
                key: "option.posts.filter.website.enabled",
                name: "Website",
                tab: "Einstellungen",
                subtab: "Beiträge & Nachrichten",
                category: "Filter",
                type: "toggle",
                "default": false,
                description: "Blendet die Website aus."
            });
            if (storage.get("option.posts.filter.website.enabled", false) && utils.isTemplate("tplThread")) {
                $('.userMessenger img[src="wcf/icon/websiteS.png"]').closest("li").remove();
                $(".userCredits").each(function() {
                    if ($(this).children().length === 0) {
                        $(this).remove();
                    }
                });
            }
            register({
                key: "option.posts.filter.xblGamertag.enabled",
                name: "XBL Gamertag",
                tab: "Einstellungen",
                subtab: "Beiträge & Nachrichten",
                category: "Filter",
                type: "toggle",
                "default": false,
                description: "Blendet den XBL Gamertag aus."
            });
            if (storage.get("option.posts.filter.xblGamertag.enabled", false) && utils.isTemplate("tplThread")) {
                $('.userCredits p:contains("XBL Gamertag: ")').remove();
                $(".userCredits").each(function() {
                    if ($(this).children().length === 0) {
                        $(this).remove();
                    }
                });
            }
            register({
                key: "option.posts.filter.youtube.enabled",
                name: "Youtube-Videos",
                tab: "Einstellungen",
                subtab: "Beiträge & Nachrichten",
                category: "Filter",
                type: "toggle",
                "default": false,
                description: "Entfernt Youtube-Videos aus Beiträgen und Signaturen und ersetzt sie stattdessen mit dem Link zum jeweiligen Video."
            });
            if (storage.get("option.posts.filter.youtube.enabled", false) && utils.isTemplate("tplThread")) {
                $(".message:not(.quickReply):not(.deleted) .messageContentInner object").each(function() {
                    var $object = $(this), videoId = $object.attr("data").substr(-17, 11);
                    $object.replaceWith('<a href="http://www.youtube.com/watch?v=' + videoId + '" class="externalURL">http://www.youtube.com/watch?v=' + videoId + "</a>");
                });
            }
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
        "../settings": 55,
        "../storage": 56,
        "../utils": 71,
        "./../styles/filterBestans.less": 58
    } ],
    40: [ function(require, module, exports) {
        (function(global) {
            "use strict";
            var $ = typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null;
            var storage = require("../storage");
            var utils = require("../utils");
            var register = require("../settings").register;
            register({
                key: "option.posts.filter.msn.enabled",
                name: "Windows Live",
                tab: "Einstellungen",
                subtab: "Beiträge & Nachrichten",
                category: "Filter",
                type: "toggle",
                "default": false,
                description: "Blendet den Windows Live Messenger-Namen aus."
            });
            if (storage.get("option.posts.filter.msn.enabled", false) && utils.isTemplate("tplThread")) {
                $('.userMessenger img[src="wcf/icon/msnS.png"]').closest("li").remove();
                $(".userCredits").each(function() {
                    if ($(this).children().length === 0) {
                        $(this).remove();
                    }
                });
            }
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
        "../settings": 55,
        "../storage": 56,
        "../utils": 71
    } ],
    41: [ function(require, module, exports) {
        (function(global) {
            "use strict";
            var $ = typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null;
            var storage = require("../storage");
            var utils = require("../utils");
            var register = require("../settings").register;
            register({
                key: "option.posts.filter.origin.enabled",
                name: "Origin",
                tab: "Einstellungen",
                subtab: "Beiträge & Nachrichten",
                category: "Filter",
                type: "toggle",
                "default": false,
                description: "Blendet den Originnamen aus."
            });
            if (storage.get("option.posts.filter.origin.enabled", false) && utils.isTemplate("tplThread")) {
                $('.userCredits p:contains("Origin: ")').remove();
                $(".userCredits").each(function() {
                    if ($(this).children().length === 0) {
                        $(this).remove();
                    }
                });
            }
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
        "../settings": 55,
        "../storage": 56,
        "../utils": 71
    } ],
    42: [ function(require, module, exports) {
        (function(global) {
            "use strict";
            var $ = typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null;
            var storage = require("../storage");
            var utils = require("../utils");
            var register = require("../settings").register;
            register({
                key: "option.posts.filter.postcount.enabled",
                name: "Beitragscounter",
                tab: "Einstellungen",
                subtab: "Beiträge & Nachrichten",
                category: "Filter",
                type: "toggle",
                "default": false,
                description: "Blendet den Beitragscounter aus."
            });
            if (storage.get("option.posts.filter.postcount.enabled", false) && utils.isTemplate("tplThread")) {
                $('.userCredits p > a:contains("Beiträge")').parent("p").remove();
                $(".userCredits").each(function() {
                    if ($(this).children().length === 0) {
                        $(this).remove();
                    }
                });
            }
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
        "../settings": 55,
        "../storage": 56,
        "../utils": 71
    } ],
    43: [ function(require, module, exports) {
        (function(global) {
            "use strict";
            var $ = typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null;
            var storage = require("../storage");
            var utils = require("../utils");
            var register = require("../settings").register;
            register({
                key: "option.posts.filter.psnid.enabled",
                name: "PSN ID",
                tab: "Einstellungen",
                subtab: "Beiträge & Nachrichten",
                category: "Filter",
                type: "toggle",
                "default": false,
                description: "Blendet die PSN ID aus."
            });
            if (storage.get("option.posts.filter.psnid.enabled", false) && utils.isTemplate("tplThread")) {
                $('.userCredits p:contains("PSN ID: ")').remove();
                $(".userCredits").each(function() {
                    if ($(this).children().length === 0) {
                        $(this).remove();
                    }
                });
            }
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
        "../settings": 55,
        "../storage": 56,
        "../utils": 71
    } ],
    44: [ function(require, module, exports) {
        (function(global) {
            "use strict";
            var $ = typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null;
            var storage = require("../storage");
            var utils = require("../utils");
            var register = require("../settings").register;
            register({
                key: "option.posts.filter.regdate.enabled",
                name: "Registrierungsdatum",
                tab: "Einstellungen",
                subtab: "Beiträge & Nachrichten",
                category: "Filter",
                type: "toggle",
                "default": false,
                description: "Blendet das Registrierungsdatum aus."
            });
            if (storage.get("option.posts.filter.regdate.enabled", false) && utils.isTemplate("tplThread")) {
                $('.userCredits p:contains("Registrierungsdatum: ")').remove();
                $(".userCredits").each(function() {
                    if ($(this).children().length === 0) {
                        $(this).remove();
                    }
                });
            }
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
        "../settings": 55,
        "../storage": 56,
        "../utils": 71
    } ],
    45: [ function(require, module, exports) {
        (function(global) {
            "use strict";
            var $ = typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null;
            var storage = require("../storage");
            var utils = require("../utils");
            var register = require("../settings").register;
            register({
                key: "option.posts.filter.skype.enabled",
                name: "Skype",
                tab: "Einstellungen",
                subtab: "Beiträge & Nachrichten",
                category: "Filter",
                type: "toggle",
                "default": false,
                description: "Blendet den Skype-Namen aus."
            });
            if (storage.get("option.posts.filter.skype.enabled", false) && utils.isTemplate("tplThread")) {
                $('.userMessenger img[src="wcf/icon/skypeS.png"]').closest("li").remove();
                $(".userCredits").each(function() {
                    if ($(this).children().length === 0) {
                        $(this).remove();
                    }
                });
            }
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
        "../settings": 55,
        "../storage": 56,
        "../utils": 71
    } ],
    46: [ function(require, module, exports) {
        (function(global) {
            "use strict";
            var $ = typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null;
            var storage = require("../storage");
            var utils = require("../utils");
            var register = require("../settings").register;
            register({
                key: "option.posts.filter.steam.enabled",
                name: "Steam",
                tab: "Einstellungen",
                subtab: "Beiträge & Nachrichten",
                category: "Filter",
                type: "toggle",
                "default": false,
                description: "Blendet den Steamnamen aus."
            });
            if (storage.get("option.posts.filter.steam.enabled", false) && utils.isTemplate("tplThread")) {
                $('.userCredits p:contains("Steam: ")').remove();
                $(".userCredits").each(function() {
                    if ($(this).children().length === 0) {
                        $(this).remove();
                    }
                });
            }
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
        "../settings": 55,
        "../storage": 56,
        "../utils": 71
    } ],
    47: [ function(require, module, exports) {
        (function(global) {
            "use strict";
            var $ = typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null;
            var storage = require("../storage");
            var utils = require("../utils");
            var register = require("../settings").register;
            register({
                key: "option.posts.filter.thanko.enabled",
                name: "Bedankomat",
                tab: "Einstellungen",
                subtab: "Beiträge & Nachrichten",
                category: "Filter",
                type: "toggle",
                "default": false,
                description: "Blendet den Bedankomat in Beiträgen aus."
            });
            if (storage.get("option.posts.filter.thanko.enabled", false) && utils.isTemplate("tplThread")) {
                $("li.postThankButton, .thankStats").remove();
            }
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
        "../settings": 55,
        "../storage": 56,
        "../utils": 71
    } ],
    48: [ function(require, module, exports) {
        (function(global) {
            "use strict";
            var $ = typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null;
            var storage = require("../storage");
            var utils = require("../utils");
            var register = require("../settings").register;
            register({
                key: "option.posts.filter.userrank.enabled",
                name: "Benutzerrang",
                tab: "Einstellungen",
                subtab: "Beiträge & Nachrichten",
                category: "Filter",
                type: "toggle",
                "default": false,
                description: "Blendet den Benutzerrang aus."
            });
            if (storage.get("option.posts.filter.userrank.enabled", false) && utils.isTemplate("tplThread")) {
                $(".messageAuthor").each(function() {
                    $(this).find(".userRank").first().remove();
                });
            }
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
        "../settings": 55,
        "../storage": 56,
        "../utils": 71
    } ],
    49: [ function(require, module, exports) {
        (function(global) {
            "use strict";
            var $ = typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null;
            var storage = require("../storage");
            var utils = require("../utils");
            var register = require("../settings").register;
            register({
                key: "option.posts.filter.usertitle.enabled",
                name: "Benutzertitel",
                tab: "Einstellungen",
                subtab: "Beiträge & Nachrichten",
                category: "Filter",
                type: "toggle",
                "default": false,
                description: "Blendet den Benutzertitel aus."
            });
            if (storage.get("option.posts.filter.usertitle.enabled", false) && utils.isTemplate("tplThread")) {
                $(".userTitle").remove();
            }
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
        "../settings": 55,
        "../storage": 56,
        "../utils": 71
    } ],
    50: [ function(require, module, exports) {
        (function(global) {
            "use strict";
            var $ = typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null;
            var storage = require("../storage");
            var utils = require("../utils");
            var register = require("../settings").register;
            register({
                key: "option.posts.filter.website.enabled",
                name: "Website",
                tab: "Einstellungen",
                subtab: "Beiträge & Nachrichten",
                category: "Filter",
                type: "toggle",
                "default": false,
                description: "Blendet die Website aus."
            });
            if (storage.get("option.posts.filter.website.enabled", false) && utils.isTemplate("tplThread")) {
                $('.userMessenger img[src="wcf/icon/websiteS.png"]').closest("li").remove();
                $(".userCredits").each(function() {
                    if ($(this).children().length === 0) {
                        $(this).remove();
                    }
                });
            }
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
        "../settings": 55,
        "../storage": 56,
        "../utils": 71
    } ],
    51: [ function(require, module, exports) {
        (function(global) {
            "use strict";
            var $ = typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null;
            var storage = require("../storage");
            var utils = require("../utils");
            var register = require("../settings").register;
            register({
                key: "option.posts.filter.xblGamertag.enabled",
                name: "XBL Gamertag",
                tab: "Einstellungen",
                subtab: "Beiträge & Nachrichten",
                category: "Filter",
                type: "toggle",
                "default": false,
                description: "Blendet den XBL Gamertag aus."
            });
            if (storage.get("option.posts.filter.xblGamertag.enabled", false) && utils.isTemplate("tplThread")) {
                $('.userCredits p:contains("XBL Gamertag: ")').remove();
                $(".userCredits").each(function() {
                    if ($(this).children().length === 0) {
                        $(this).remove();
                    }
                });
            }
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
        "../settings": 55,
        "../storage": 56,
        "../utils": 71
    } ],
    52: [ function(require, module, exports) {
        (function(global) {
            "use strict";
            var $ = typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null;
            var storage = require("../storage");
            var utils = require("../utils");
            var register = require("../settings").register;
            register({
                key: "option.posts.filter.youtube.enabled",
                name: "Youtube-Videos",
                tab: "Einstellungen",
                subtab: "Beiträge & Nachrichten",
                category: "Filter",
                type: "toggle",
                "default": false,
                description: "Entfernt Youtube-Videos aus Beiträgen und Signaturen und ersetzt sie stattdessen mit dem Link zum jeweiligen Video."
            });
            if (storage.get("option.posts.filter.youtube.enabled", false) && utils.isTemplate("tplThread")) {
                $(".message:not(.quickReply):not(.deleted) .messageContentInner object").each(function() {
                    var $object = $(this), videoId = $object.attr("data").substr(-17, 11);
                    $object.replaceWith('<a href="http://www.youtube.com/watch?v=' + videoId + '" class="externalURL">http://www.youtube.com/watch?v=' + videoId + "</a>");
                });
            }
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
        "../settings": 55,
        "../storage": 56,
        "../utils": 71
    } ],
    53: [ function(require, module, exports) {
        (function(global) {
            "use strict";
            var $ = typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null;
            var storage = require("../storage");
            var utils = require("../utils");
            var register = require("../settings").register;
            register({
                key: "option.threads.extension.sticky.enabled",
                name: "Ankündigungen und wichtige Themen trennen",
                tab: "Einstellungen",
                subtab: "Themenübersicht",
                category: "Erweiterungen",
                type: "toggle",
                "default": false,
                description: "Trennt Ankündigungen und wichtige Themen voneinander."
            });
            if (storage.get("option.threads.extension.sticky.enabled", false) && utils.isTemplate("tplBoard")) {
                $("#topThreadsStatus").siblings(".titleBarPanel").first().find(".containerHead .containerContent h3").text("Ankündigungen");
                var announcementCount = $('#topThreadsStatus .columnIcon > img[src*="Announcement"]').length, importantThreadsCount = $('#topThreadsStatus .columnIcon > img[src*="Important"]').length;
                if (importantThreadsCount > 0) {
                    $(require("templates").importantThreadsHeader()).insertAfter($("#topThreadsStatus tbody tr").eq(announcementCount - 1));
                }
            }
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
        "../settings": 55,
        "../storage": 56,
        "../utils": 71,
        templates: "94v5J1"
    } ],
    54: [ function(require, module, exports) {
        (function(global) {
            "use strict";
            var $ = typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null;
            var storage = require("../storage");
            var utils = require("../utils");
            var register = require("../settings").register;
            register({
                key: "option.threads.filter.deleted.enabled",
                name: "Gelöschte Themen",
                tab: "Einstellungen",
                subtab: "Themenübersicht",
                category: "Filter",
                type: "toggle",
                "default": false,
                description: "Blendet gelöschte Themen komplett aus."
            });
            if (storage.get("option.threads.filter.deleted.enabled", false) && utils.isTemplate("tplBoard")) {
                $('#normalThreadsStatus tbody > tr .columnIcon > img[src*="Trash"]').closest("tr").remove();
                setTimeout(function() {
                    $("#normalThreadsStatus tbody > tr").each(function(index) {
                        $(this).attr("class", index % 2 === 0 ? "container-1" : "container-2");
                    });
                }, 1e3);
            }
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
        "../settings": 55,
        "../storage": 56,
        "../utils": 71
    } ],
    55: [ function(require, module, exports) {
        (function(global) {
            "use strict";
            var $ = typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null;
            var _ = typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null;
            var KeyboardJS = typeof window !== "undefined" ? window.KeyboardJS : typeof global !== "undefined" ? global.KeyboardJS : null;
            var utils = require("./utils");
            var storage = require("./storage");
            var notification = require("./ui/notification");
            var optionsArray = [];
            var $optionsFrame, isOptionsFrameOpen = false, setOptionsToValues, getKeyName, showOptions, generateHref, parseHash, generateOptionsObject;
            getKeyName = function(key) {
                var names = KeyboardJS.key.name(key);
                if (names.length === 0) {
                    return "Keine Taste zugewiesen";
                }
                if (names.length === 1) {
                    return names[0].toUpperCase();
                }
                if (names.length > 1) {
                    return names[0].toUpperCase() + " (" + names[1].toUpperCase() + ")";
                }
            };
            setOptionsToValues = function() {
                $(".bpp-option").each(function() {
                    var name = $(this).attr("name"), type = $(this).attr("type"), value;
                    if (type === "checkbox") {
                        $(this).prop("checked", storage.get(name, false));
                    } else if (type === "range") {
                        value = storage.get(name, $(this).attr("value"));
                        $(this).val(value).parent(".formField").find(".indicator").text(value);
                    } else if (type === "button") {
                        $(this).val(getKeyName(storage.get(name, -1)));
                    }
                });
            };
            showOptions = function() {
                $("#main").hide();
                var optionsObject = generateOptionsObject(), parsedHash = parseHash(optionsObject);
                if ($optionsFrame) {
                    $optionsFrame.remove();
                    $optionsFrame = null;
                }
                $optionsFrame = $(require("templates").options({
                    version: VERSION,
                    optionsObject: optionsObject
                }));
                $optionsFrame.insertAfter("#headerContainer");
                $optionsFrame.find('li[data-tab="' + parsedHash.tab + '"]').addClass("activeTabMenu");
                $optionsFrame.find('ul[data-tab="' + parsedHash.tab + '"]').show();
                $optionsFrame.find('li[data-subtab="' + parsedHash.subtab + '"]').addClass("activeSubTabMenu");
                $optionsFrame.find('div[data-tab="' + parsedHash.tab + '"][data-subtab="' + parsedHash.subtab + '"]').show();
                $optionsFrame.show();
                isOptionsFrameOpen = true;
                setOptionsToValues();
            };
            parseHash = function(optionsObject) {
                var ret = {
                    tab: null,
                    subtab: null,
                    highligh: null
                }, s;
                if (location.hash.length > 2) {
                    s = location.hash.substr(2).split("/");
                    if (s.length > 1 && s[0] === "breadfishplusplus" && s[1] === "!") {
                        if (s.length > 2 && s[2].length > 0) {
                            ret.tab = s[2];
                        }
                        if (s.length > 3 && s[3].length > 0) {
                            ret.subtab = s[3];
                        }
                        if (s.length > 4 && s[4].length > 0) {
                            ret.highligh = s[4];
                        }
                    }
                }
                if (!ret.tab) {
                    ret.tab = "about";
                }
                if (!ret.subtab) {
                    if (ret.tab !== "importexport" && ret.tab !== "about") {
                        ret.subtab = optionsObject[optionsObject.indexOf(_.find(optionsObject, function(opt) {
                            return opt.href === ret.tab;
                        }))].subtabs[0].href;
                    }
                }
                return ret;
            };
            generateHref = function(name) {
                return name.replace(/[\W]/gi, "").toLowerCase();
            };
            generateOptionsObject = function() {
                var tmp = [];
                _.each(optionsArray, function(opt) {
                    if (opt.type !== "invis") {
                        var tab, subtab, category;
                        tab = _.find(tmp, function(_tab) {
                            return _tab.name === opt.tab;
                        });
                        if (tab === undefined) {
                            tab = {
                                name: opt.tab,
                                href: generateHref(opt.tab),
                                subtabs: []
                            };
                            tmp.push(tab);
                        }
                        subtab = _.find(tab.subtabs, function(_subtab) {
                            return _subtab.name === opt.subtab;
                        });
                        if (subtab === undefined) {
                            subtab = {
                                name: opt.subtab,
                                href: generateHref(opt.subtab),
                                categories: []
                            };
                            tab.subtabs.push(subtab);
                        }
                        category = _.find(subtab.categories, function(_category) {
                            return _category.name === opt.category;
                        });
                        if (category === undefined) {
                            category = {
                                name: opt.category,
                                options: []
                            };
                            subtab.categories.push(category);
                        }
                        subtab.categories = _.sortBy(subtab.categories, function(c) {
                            return c.name;
                        });
                        category.options.push({
                            key: opt.key,
                            name: opt.name,
                            type: opt.type,
                            min: opt.min,
                            max: opt.max,
                            "default": opt.default,
                            description: opt.description
                        });
                        subtab.options = _.sortBy(subtab.options, function(c) {
                            return c.name;
                        });
                    }
                });
                return tmp;
            };
            var showSaveBadge = function(elem) {
                var $label = $(elem).parent("label");
                if ($label.find(".bpp-saved-badge").length > 0) {
                    $label.find(".bpp-saved-badge").remove();
                }
                $('<span class="bpp-saved-badge">Gespeichert!</span>').appendTo($label).fadeOut(1e3, function() {
                    $(this).remove();
                });
            };
            $(document).ready(function() {
                require("./styles/options.less");
                var $userMenuItem;
                $userMenuItem = $(require("templates").userMenuItem());
                $("#userMenu ul").append($userMenuItem);
                $userMenuItem.find("a").click(function(event) {
                    event.preventDefault();
                    if (!$optionsFrame) {
                        location.hash = "#/breadfishplusplus/!/about/";
                    } else {
                        location.href = location.origin + location.pathname + location.search;
                    }
                });
                $(window).on("hashchange", function() {
                    if (location.hash.indexOf("#/breadfishplusplus/!/") === 0) {
                        showOptions();
                    }
                });
                $(document).ready(function() {
                    if (location.hash.indexOf("#/breadfishplusplus/!/") === 0) {
                        showOptions();
                    }
                });
                $(document).on("change", 'input[type="checkbox"].bpp-option', function() {
                    storage.set($(this).attr("name"), $(this).is(":checked"));
                    showSaveBadge(this);
                });
                $(document).on("change", 'input[type="range"].bpp-option', function() {
                    var val = parseInt($(this).val(), 10);
                    storage.set($(this).attr("name"), val);
                    $(this).parent(".formField").find(".indicator").text(val);
                    showSaveBadge(this);
                });
                $(document).on("click", 'input[type="button"].bpp-option', function(e) {
                    e.preventDefault();
                    var $btn = $(this), name = $btn.attr("name");
                    $btn.focus().val("Zuzuweisende Taste drücken...").addClass("disabled").on("keydown", function(event) {
                        event.preventDefault();
                        var charCode = event.which || event.keyCode;
                        if (charCode === 27) {
                            storage.set(name, -1);
                            $btn.blur().val("Keine Taste zugewiesen").removeClass("disabled").off(event).unbind("blur");
                        } else {
                            storage.set(name, charCode);
                            $btn.blur().val(getKeyName(charCode)).removeClass("disabled").off(event).unbind("blur");
                        }
                    }).on("blur", function(event) {
                        event.preventDefault();
                        $btn.val("Keine Taste zugewiesen").removeClass("disabled").off(event).unbind("blur");
                    });
                    showSaveBadge(this);
                });
                $(document).on("click", ".bpp-exportOptions", function() {
                    var url = window.webkitURL || window.URL, obj = {};
                    _.each(optionsArray, function(opt) {
                        obj[opt.key] = storage.get(opt.key, opt.default);
                    });
                    $(this).attr("href", url.createObjectURL(new Blob([ Object.toJSON(obj, null, 4) ], {
                        type: "application/json"
                    })));
                });
                $(document).on("change", ".bpp-importOptions", function(event) {
                    if (event.target.files.length > 0) {
                        var file = event.target.files[0], reader = new FileReader();
                        reader.onloadend = function(evt) {
                            try {
                                var importedOptions = evt.target.result.evalJSON();
                                utils.log.error("Einstellungen werden importiert:", importedOptions);
                                _.each(importedOptions, function(value, key) {
                                    storage.set(key, value);
                                });
                                setOptionsToValues();
                                notification.create({
                                    type: "success",
                                    message: "Es wurden " + Object.keys(importedOptions).length + " Einstellungen importiert!"
                                });
                            } catch (e) {
                                notification.create({
                                    type: "error",
                                    message: "Die Sicherungsdatei ist ungültig!"
                                });
                            }
                        };
                        reader.readAsBinaryString(file);
                    }
                });
            });
            var register = function(block) {
                utils.log.debug("settings.register", block);
                storage.setDefault(block.key, block.default);
                optionsArray.push(block);
                if (isOptionsFrameOpen) {
                    showOptions();
                }
            };
            exports.register = register;
            register({
                key: "option.debugmode",
                name: "Debug-Modus",
                tab: "Einstellungen",
                subtab: "Allgemeine Einstellungen",
                category: "Debug",
                type: "toggle",
                "default": false,
                description: "Aktiviert den Debug-Modus und loggt zusätzliche Aktionen in die Konsole."
            });
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
        "./storage": 56,
        "./styles/options.less": 62,
        "./ui/notification": 69,
        "./utils": 71,
        templates: "94v5J1"
    } ],
    56: [ function(require, module, exports) {
        (function(global) {
            "use strict";
            var _ = typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null;
            if (!window.localStorage) {
                throw new Error("Dein Browser unterstüzt kein LocalStorage. http://caniuse.com/#feat=namevalue-storage");
            }
            var get, set, setDefault;
            set = function(key, value) {
                localStorage.setItem("bpp_" + key, Object.toJSON(value));
            };
            exports.set = set;
            setDefault = function(key, defaultValue) {
                if (!localStorage.getItem("bpp_" + key)) {
                    localStorage.setItem("bpp_" + key, Object.toJSON(defaultValue));
                }
            };
            exports.setDefault = setDefault;
            get = function(key, defaultValue) {
                var item = localStorage.getItem("bpp_" + key);
                if (item) {
                    return item.evalJSON();
                }
                return defaultValue || null;
            };
            exports.get = get;
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {} ],
    57: [ function(require, module, exports) {
        (function() {
            var head = document.getElementsByTagName("head")[0];
            style = document.createElement("style");
            style.type = "text/css";
            var css = "#bpp-chat{position:relative}.bpp-toggleSize{float:right;margin-right:5px}.bpp-chat-small{position:fixed!important;width:300px;bottom:0;margin:0;right:10px;z-index:999}.bpp-chat-messages{height:250px;margin-bottom:35px;overflow-x:hidden;overflow-y:scroll;position:relative;border-bottom:1px solid #e4e7ed;background-repeat:repeat-y;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAABCAYAAABQSMdZAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAB5JREFUeNpi/P//P8NAgacv3v1nYGBgAAAAAP//AwCgnwa5lTyvVQAAAABJRU5ErkJggg==)}.bpp-chat-input{border-radius:0!important;border:0!important;margin:0;bottom:0;background-image:none!important;left:0;height:35px;padding:0 25px 0 10px!important;width:calc(100% - 35px);position:absolute}.bpp-chat-submit{position:absolute;bottom:8px;right:3px}.bpp-chat-item{position:relative;margin-top:12px;margin-bottom:12px}.bpp-chat-item .bpp-chat-system .bpp-chat-message-point{background-color:#c6ccd2;border:2px solid #fff;width:10px;height:10px;margin:3px 10px;float:left;border-radius:50%}.bpp-chat-item .bpp-chat-system .bpp-chat-message-body{color:#96a1ab}.bpp-chat-item .bpp-chat-message,.bpp-chat-item .bpp-chat-system{padding-left:16px}.bpp-chat-item .bpp-chat-message .bpp-chat-message-avatar,.bpp-chat-item .bpp-chat-system .bpp-chat-message-avatar{float:left}.bpp-chat-item .bpp-chat-message .bpp-chat-message-avatar a,.bpp-chat-item .bpp-chat-system .bpp-chat-message-avatar a{line-height:27px}.bpp-chat-item .bpp-chat-message .bpp-chat-message-avatar a img,.bpp-chat-item .bpp-chat-system .bpp-chat-message-avatar a img{border-radius:50%;max-width:30px;max-height:30px}.bpp-chat-item .bpp-chat-message .bpp-chat-message-body,.bpp-chat-item .bpp-chat-system .bpp-chat-message-body{margin-left:46px}.bpp-chat-item .bpp-chat-message .bpp-chat-message-body .bpp-chat-body-username,.bpp-chat-item .bpp-chat-system .bpp-chat-message-body .bpp-chat-body-username{font-size:13px}.bpp-chat-item .bpp-chat-message .bpp-chat-message-body .bpp-chat-body-username a,.bpp-chat-item .bpp-chat-system .bpp-chat-message-body .bpp-chat-body-username a{font-weight:700;color:#2A3036}.bpp-chat-item .bpp-chat-message .bpp-chat-message-body .bpp-chat-body-username small,.bpp-chat-item .bpp-chat-system .bpp-chat-message-body .bpp-chat-body-username small{opacity:.5}.bpp-chat-item .bpp-chat-message .bpp-chat-message-body .bpp-chat-body-messag,.bpp-chat-item .bpp-chat-system .bpp-chat-message-body .bpp-chat-body-messag{position:relative}.bpp-chat-item .bpp-chat-message .bpp-chat-message-body .bpp-chat-body-messag p,.bpp-chat-item .bpp-chat-system .bpp-chat-message-body .bpp-chat-body-messag p{font-size:16px}";
            if (style.styleSheet) {
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }
            head.appendChild(style);
        })();
    }, {} ],
    58: [ function(require, module, exports) {
        (function() {
            var head = document.getElementsByTagName("head")[0];
            style = document.createElement("style");
            style.type = "text/css";
            var css = "#helpfulAnswer{display:none!important}.helpfulAnswerPost .messageInner .messageSidebar{background-image:none!important}";
            if (style.styleSheet) {
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }
            head.appendChild(style);
        })();
    }, {} ],
    59: [ function(require, module, exports) {
        (function() {
            var head = document.getElementsByTagName("head")[0];
            style = document.createElement("style");
            style.type = "text/css";
            var css = "#main{margin-top:162px}";
            if (style.styleSheet) {
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }
            head.appendChild(style);
        })();
    }, {} ],
    60: [ function(require, module, exports) {
        (function() {
            var head = document.getElementsByTagName("head")[0];
            style = document.createElement("style");
            style.type = "text/css";
            var css = ".hljs{display:block;padding:.5em;color:#333;background:#f8f8f8}.diff .hljs-header,.hljs-comment,.hljs-javadoc,.hljs-template_comment{color:#998;font-style:italic}.css .rule .hljs-keyword,.hljs-keyword,.hljs-request,.hljs-status,.hljs-subst,.hljs-winutils,.javascript .hljs-title,.nginx .hljs-title{color:#333;font-weight:700}.hljs-hexcolor,.hljs-number,.ruby .hljs-constant{color:#099}.hljs-phpdoc,.hljs-string,.hljs-tag .hljs-value,.tex .hljs-formula{color:#d14}.coffeescript .hljs-params,.hljs-id,.hljs-title,.scss .hljs-preprocessor{color:#900;font-weight:700}.clojure .hljs-title,.hljs-subst,.javascript .hljs-title,.lisp .hljs-title{font-weight:400}.haskell .hljs-type,.hljs-class .hljs-title,.tex .hljs-command,.vhdl .hljs-literal{color:#458;font-weight:700}.django .hljs-tag .hljs-keyword,.hljs-rules .hljs-property,.hljs-tag,.hljs-tag .hljs-title{color:navy;font-weight:400}.hljs-attribute,.hljs-variable,.lisp .hljs-body{color:teal}.hljs-regexp{color:#009926}.hljs-prompt,.hljs-symbol,.lisp .hljs-keyword,.ruby .hljs-symbol .hljs-string,.tex .hljs-special{color:#990073}.clojure .hljs-built_in,.hljs-built_in,.lisp .hljs-title{color:#0086b3}.hljs-cdata,.hljs-doctype,.hljs-pi,.hljs-pragma,.hljs-preprocessor,.hljs-shebang{color:#999;font-weight:700}.hljs-deletion{background:#fdd}.hljs-addition{background:#dfd}.diff .hljs-change{background:#0086b3}.hljs-chunk{color:#aaa}";
            if (style.styleSheet) {
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }
            head.appendChild(style);
        })();
    }, {} ],
    61: [ function(require, module, exports) {
        (function() {
            var head = document.getElementsByTagName("head")[0];
            style = document.createElement("style");
            style.type = "text/css";
            var css = ".bpp-notification-queue{position:fixed;z-index:1041;right:12px;bottom:12px}.bpp-notification-queue .bpp-notification{position:relative;margin:0 0 6px auto;padding:15px 15px 15px 50px;width:auto;color:#fff;background-position:15px center;background-repeat:no-repeat;border-radius:3px;box-shadow:0 0 12px #999;opacity:.8}.bpp-notification-queue .bpp-notification:hover{opacity:1}.bpp-notification-queue .bpp-notification.bpp-notification-clickable:hover{cursor:pointer;box-shadow:0 0 12px #000}.bpp-notification-queue .bpp-notification.bpp-notification-info{background-color:#2f96b4;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGwSURBVEhLtZa9SgNBEMc9sUxxRcoUKSzSWIhXpFMhhYWFhaBg4yPYiWCXZxBLERsLRS3EQkEfwCKdjWJAwSKCgoKCcudv4O5YLrt7EzgXhiU3/4+b2ckmwVjJSpKkQ6wAi4gwhT+z3wRBcEz0yjSseUTrcRyfsHsXmD0AmbHOC9Ii8VImnuXBPglHpQ5wwSVM7sNnTG7Za4JwDdCjxyAiH3nyA2mtaTJufiDZ5dCaqlItILh1NHatfN5skvjx9Z38m69CgzuXmZgVrPIGE763Jx9qKsRozWYw6xOHdER+nn2KkO+Bb+UV5CBN6WC6QtBgbRVozrahAbmm6HtUsgtPC19tFdxXZYBOfkbmFJ1VaHA1VAHjd0pp70oTZzvR+EVrx2Ygfdsq6eu55BHYR8hlcki+n+kERUFG8BrA0BwjeAv2M8WLQBtcy+SD6fNsmnB3AlBLrgTtVW1c2QN4bVWLATaIS60J2Du5y1TiJgjSBvFVZgTmwCU+dAZFoPxGEEs8nyHC9Bwe2GvEJv2WXZb0vjdyFT4Cxk3e/kIqlOGoVLwwPevpYHT+00T+hWwXDf4AJAOUqWcDhbwAAAAASUVORK5CYII=)}.bpp-notification-queue .bpp-notification.bpp-notification-error{background-color:#bd362f;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAHOSURBVEhLrZa/SgNBEMZzh0WKCClSCKaIYOED+AAKeQQLG8HWztLCImBrYadgIdY+gIKNYkBFSwu7CAoqCgkkoGBI/E28PdbLZmeDLgzZzcx83/zZ2SSXC1j9fr+I1Hq93g2yxH4iwM1vkoBWAdxCmpzTxfkN2RcyZNaHFIkSo10+8kgxkXIURV5HGxTmFuc75B2RfQkpxHG8aAgaAFa0tAHqYFfQ7Iwe2yhODk8+J4C7yAoRTWI3w/4klGRgR4lO7Rpn9+gvMyWp+uxFh8+H+ARlgN1nJuJuQAYvNkEnwGFck18Er4q3egEc/oO+mhLdKgRyhdNFiacC0rlOCbhNVz4H9FnAYgDBvU3QIioZlJFLJtsoHYRDfiZoUyIxqCtRpVlANq0EU4dApjrtgezPFad5S19Wgjkc0hNVnuF4HjVA6C7QrSIbylB+oZe3aHgBsqlNqKYH48jXyJKMuAbiyVJ8KzaB3eRc0pg9VwQ4niFryI68qiOi3AbjwdsfnAtk0bCjTLJKr6mrD9g8iq/S/B81hguOMlQTnVyG40wAcjnmgsCNESDrjme7wfftP4P7SP4N3CJZdvzoNyGq2c/HWOXJGsvVg+RA/k2MC/wN6I2YA2Pt8GkAAAAASUVORK5CYII=)}.bpp-notification-queue .bpp-notification.bpp-notification-success{background-color:#51a351;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADsSURBVEhLY2AYBfQMgf///3P8+/evAIgvA/FsIF+BavYDDWMBGroaSMMBiE8VC7AZDrIFaMFnii3AZTjUgsUUWUDA8OdAH6iQbQEhw4HyGsPEcKBXBIC4ARhex4G4BsjmweU1soIFaGg/WtoFZRIZdEvIMhxkCCjXIVsATV6gFGACs4Rsw0EGgIIH3QJYJgHSARQZDrWAB+jawzgs+Q2UO49D7jnRSRGoEFRILcdmEMWGI0cm0JJ2QpYA1RDvcmzJEWhABhD/pqrL0S0CWuABKgnRki9lLseS7g2AlqwHWQSKH4oKLrILpRGhEQCw2LiRUIa4lwAAAABJRU5ErkJggg==)}.bpp-notification-queue .bpp-notification.bpp-notification-warning{background-color:#f89406;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAGYSURBVEhL5ZSvTsNQFMbXZGICMYGYmJhAQIJAICYQPAACiSDB8AiICQQJT4CqQEwgJvYASAQCiZiYmJhAIBATCARJy+9rTsldd8sKu1M0+dLb057v6/lbq/2rK0mS/TRNj9cWNAKPYIJII7gIxCcQ51cvqID+GIEX8ASG4B1bK5gIZFeQfoJdEXOfgX4QAQg7kH2A65yQ87lyxb27sggkAzAuFhbbg1K2kgCkB1bVwyIR9m2L7PRPIhDUIXgGtyKw575yz3lTNs6X4JXnjV+LKM/m3MydnTbtOKIjtz6VhCBq4vSm3ncdrD2lk0VgUXSVKjVDJXJzijW1RQdsU7F77He8u68koNZTz8Oz5yGa6J3H3lZ0xYgXBK2QymlWWA+RWnYhskLBv2vmE+hBMCtbA7KX5drWyRT/2JsqZ2IvfB9Y4bWDNMFbJRFmC9E74SoS0CqulwjkC0+5bpcV1CZ8NMej4pjy0U+doDQsGyo1hzVJttIjhQ7GnBtRFN1UarUlH8F3xict+HY07rEzoUGPlWcjRFRr4/gChZgc3ZL2d8oAAAAASUVORK5CYII=)}.bpp-notification-queue .bpp-notification .bpp-notification-close{font-size:21px;font-weight:700;line-height:1;text-shadow:0 1px 0 #fff;position:absolute;top:0;right:5px;opacity:.2;padding:0;cursor:pointer;background:0 0;border:0;-webkit-appearance:none}.bpp-notification-queue .bpp-notification .bpp-notification-close:hover{opacity:.5}.bpp-notification-queue .bpp-notification .bpp-notification-title{font-weight:700}.bpp-notification-queue .bpp-notification .bpp-notification-message{word-wrap:break-word}.bpp-notification-queue .bpp-notification .bpp-notification-message a{color:#EEE;text-decoration:underline}";
            if (style.styleSheet) {
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }
            head.appendChild(style);
        })();
    }, {} ],
    62: [ function(require, module, exports) {
        (function() {
            var head = document.getElementsByTagName("head")[0];
            style = document.createElement("style");
            style.type = "text/css";
            var css = ".bpp_options .subTabMenu .containerHead ul,.bpp_options div[data-tab][data-subtab]{display:none}.bpp_options [data-tab=about] .subHeadline{margin:15px 0 10px!important}.bpp_options .bpp-about-header{text-align:center;border-bottom:1px solid #d7d7f4;margin-bottom:15px}.bpp_options .bpp-option{vertical-align:middle}.bpp_options .indicator{vertical-align:middle;border:1px solid #000;padding:1px 7px;background:#FFF}.bpp_options .bpp-saved-badge{background-color:#5cb85c;color:#FFF;border-radius:3px;padding:0 4px;font-size:12px}";
            if (style.styleSheet) {
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }
            head.appendChild(style);
        })();
    }, {} ],
    63: [ function(require, module, exports) {
        (function() {
            var head = document.getElementsByTagName("head")[0];
            style = document.createElement("style");
            style.type = "text/css";
            var css = '.bpp-popup-backdrop{position:fixed;top:0;right:0;bottom:0;left:0;z-index:1040;background-color:rgba(0,0,0,.5);display:none}.bpp-popup-confirm,.bpp-popup-prompt{position:fixed;top:calc(4em - 40px);left:50%;margin-left:-200px;width:400px;background:#FFF;border-radius:.25em .25em .4em .4em;text-align:center;box-shadow:0 0 20px rgba(0,0,0,.2);opacity:0;-webkit-backface-visibility:hidden;-webkit-font-smoothing:antialiased;z-index:1041}.bpp-popup-confirm>p,.bpp-popup-prompt>p{padding:30px 15px;font-size:16px}.bpp-popup-confirm.bpp-popup-prompt>p,.bpp-popup-prompt.bpp-popup-prompt>p{padding-bottom:15px}.bpp-popup-confirm>button,.bpp-popup-prompt>button{font-size:21px;font-weight:700;line-height:1;text-shadow:0 1px 0 #fff;position:absolute;top:5px;right:10px;opacity:.2;padding:0;cursor:pointer;background:0 0;border:0;-webkit-appearance:none}.bpp-popup-confirm>button:hover,.bpp-popup-prompt>button:hover{opacity:.5}.bpp-popup-confirm>.prompt-input,.bpp-popup-prompt>.prompt-input{border-radius:0;border:0;width:100%;text-align:center;padding:10px 0;margin-bottom:30px;font-size:16px;color:#666;box-shadow:inset 0 -1px 2px 0 #e5e5e5}.bpp-popup-confirm>.confirm-buttons,.bpp-popup-confirm>.prompt-buttons,.bpp-popup-prompt>.confirm-buttons,.bpp-popup-prompt>.prompt-buttons{list-style:none;margin:0;padding:0}.bpp-popup-confirm>.confirm-buttons li,.bpp-popup-confirm>.prompt-buttons li,.bpp-popup-prompt>.confirm-buttons li,.bpp-popup-prompt>.prompt-buttons li{float:left;width:50%}.bpp-popup-confirm>.confirm-buttons li a,.bpp-popup-confirm>.prompt-buttons li a,.bpp-popup-prompt>.confirm-buttons li a,.bpp-popup-prompt>.prompt-buttons li a{display:block;height:40px;line-height:40px;text-transform:uppercase;text-decoration:none;color:#FFF;transition:background-color .2s}.bpp-popup-confirm>.confirm-buttons li:first-child a,.bpp-popup-confirm>.prompt-buttons li:first-child a,.bpp-popup-prompt>.confirm-buttons li:first-child a,.bpp-popup-prompt>.prompt-buttons li:first-child a{background:#7dcf85;border-radius:0 0 0 .25em}.bpp-popup-confirm>.confirm-buttons li:first-child a:hover,.bpp-popup-confirm>.prompt-buttons li:first-child a:hover,.bpp-popup-prompt>.confirm-buttons li:first-child a:hover,.bpp-popup-prompt>.prompt-buttons li:first-child a:hover{background-color:#a2dda8}.bpp-popup-confirm>.confirm-buttons li:last-child a,.bpp-popup-confirm>.prompt-buttons li:last-child a,.bpp-popup-prompt>.confirm-buttons li:last-child a,.bpp-popup-prompt>.prompt-buttons li:last-child a{background:#fc7169;border-radius:0 0 .25em}.bpp-popup-confirm>.confirm-buttons li:last-child a:hover,.bpp-popup-confirm>.prompt-buttons li:last-child a:hover,.bpp-popup-prompt>.confirm-buttons li:last-child a:hover,.bpp-popup-prompt>.prompt-buttons li:last-child a:hover{background-color:#fc8982}.bpp-popup-confirm>.confirm-buttons:after,.bpp-popup-confirm>.prompt-buttons:after,.bpp-popup-prompt>.confirm-buttons:after,.bpp-popup-prompt>.prompt-buttons:after{content:"";display:table;clear:both}.bpp-popup-message{position:fixed;top:calc(4em - 40px);left:50%;margin-left:-200px;width:400px;background:#FFF;border-radius:.25em .25em .4em .4em;text-align:center;box-shadow:0 0 20px rgba(0,0,0,.2);opacity:0;-webkit-backface-visibility:hidden;-webkit-font-smoothing:antialiased;z-index:1041}.bpp-popup-message>img{position:absolute;top:-12px;left:-12px}.bpp-popup-message>p{padding:30px 15px;font-size:16px}.bpp-popup-message>button{font-size:21px;font-weight:700;line-height:1;text-shadow:0 1px 0 #fff;position:absolute;top:5px;right:10px;opacity:.2;padding:0;cursor:pointer;background:0 0;border:0;-webkit-appearance:none}.bpp-popup-message>button:hover{opacity:.5}.bpp-popup-message.popup-success{background-color:#dff0d8;border:1px solid #d6e9c6;color:#3c763d}.bpp-popup-message.popup-info{background-color:#d9edf7;border:1px solid #bce8f1;color:#31708f}.bpp-popup-message.popup-warning{background-color:#fcf8e3;border:1px solid #faebcc;color:#8a6d3b}.bpp-popup-message.popup-error{background-color:#f2dede;border:1px solid #ebccd1;color:#a94442}@media only screen and (min-width:1170px){.bpp-popup-confirm,.bpp-popup-message{top:8em}}';
            if (style.styleSheet) {
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }
            head.appendChild(style);
        })();
    }, {} ],
    64: [ function(require, module, exports) {
        (function() {
            var head = document.getElementsByTagName("head")[0];
            style = document.createElement("style");
            style.type = "text/css";
            var css = ".reportReasons{position:absolute;top:15px;left:0;width:200px}.reportReasons li{float:left;width:100%;text-align:center}";
            if (style.styleSheet) {
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }
            head.appendChild(style);
        })();
    }, {} ],
    65: [ function(require, module, exports) {
        (function() {
            var head = document.getElementsByTagName("head")[0];
            style = document.createElement("style");
            style.type = "text/css";
            var css = ".bpp-shorturl .bpp-shorturl-input{margin:0;padding:0!important;width:175px;text-align:center;display:none;border:0!important;background:transparent!important}";
            if (style.styleSheet) {
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }
            head.appendChild(style);
        })();
    }, {} ],
    66: [ function(require, module, exports) {
        (function() {
            var head = document.getElementsByTagName("head")[0];
            style = document.createElement("style");
            style.type = "text/css";
            var css = ".tabMenu li:not(.activeTabMenu) a:hover{color:#FFF}";
            if (style.styleSheet) {
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }
            head.appendChild(style);
        })();
    }, {} ],
    67: [ function(require, module, exports) {
        (function() {
            var head = document.getElementsByTagName("head")[0];
            style = document.createElement("style");
            style.type = "text/css";
            var css = ".tooltip{position:absolute;z-index:10070;display:block;visibility:visible;font-size:12px;line-height:1.4;opacity:0}.tooltip.in{opacity:.9}.tooltip.top{margin-top:-3px;padding:5px 0}.tooltip.right{margin-left:3px;padding:0 5px}.tooltip.bottom{margin-top:3px;padding:5px 0}.tooltip.left{margin-left:-3px;padding:0 5px}.tooltip-inner{max-width:500px;padding:3px 8px;color:#fff;text-align:center;text-decoration:none;background-color:#000;border-radius:4px}.tooltip-arrow{position:absolute;width:0;height:0;border-color:transparent;border-style:solid}.tooltip.top .tooltip-arrow{bottom:0;left:50%;margin-left:-5px;border-width:5px 5px 0;border-top-color:#000}.tooltip.top-left .tooltip-arrow{bottom:0;left:5px;border-width:5px 5px 0;border-top-color:#000}.tooltip.top-right .tooltip-arrow{bottom:0;right:5px;border-width:5px 5px 0;border-top-color:#000}.tooltip.right .tooltip-arrow{top:50%;left:0;margin-top:-5px;border-width:5px 5px 5px 0;border-right-color:#000}.tooltip.left .tooltip-arrow{top:50%;right:0;margin-top:-5px;border-width:5px 0 5px 5px;border-left-color:#000}.tooltip.bottom .tooltip-arrow{top:0;left:50%;margin-left:-5px;border-width:0 5px 5px;border-bottom-color:#000}.tooltip.bottom-left .tooltip-arrow{top:0;left:5px;border-width:0 5px 5px;border-bottom-color:#000}.tooltip.bottom-right .tooltip-arrow{top:0;right:5px;border-width:0 5px 5px;border-bottom-color:#000}";
            if (style.styleSheet) {
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }
            head.appendChild(style);
        })();
    }, {} ],
    68: [ function(require, module, exports) {
        (function() {
            var head = document.getElementsByTagName("head")[0];
            style = document.createElement("style");
            style.type = "text/css";
            var css = ".bpp-youtube-preview{border:10px solid #dc566d;position:relative;height:90px}.bpp-youtube-preview .bpp-youtube-preview-thumbnail{position:absolute;top:0;left:0;width:120px;height:90px;border-right:10px solid #dc566d;background-color:#dc566d;background-repeat:no-repeat;background-position:0 0}.bpp-youtube-preview .bpp-youtube-preview-thumbnail:after{display:none;content:'';width:120px;height:90px;background-color:#dc566d;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgEAAAC7CAYAAAD8KE1bAAAVI0lEQVR42u2diXnqzBVA3QF0AB1AB6KCyBVEdIA7EB3gDnAFkTuQKwjuQK8DvQqimPzDi0JYJM2d/Zzv07+8xbMwc+/RzCC9vAAA3KHruuXPtXlw7R9c7z/X14Cr6UCXIf388eTz2j74nNfMhijnN50AEMlkHpqgP0nEYElAbo2/1xvjdMkMRgIAUp2E86uA+DbgbhogdpqrMf85QChYrUACALxfWt/2EjsAmBOIiyjMiT5IAIDLxH++uz8RmwGc8anmIUKABABYmVwbFXgAwC/OByQ3RCkkAMDEpHrlrh8gCOrUZQAJAJCbTGsVVAAgPBlYIgEAMHUi7YmjAMGzRwIAYOzdP0v/APFwSmlVAAkAmD55znv/LTETIDraVM4KIAEA0ybOljgJED1bJAAAEAAARAAJAEAAEAAARAAJAEAAAAARQAIAkhCANTEQIHnWSABAegJwfstfQ/wDSJ62i+zdA0gAwPNJUhH7AEBRIwEA6QjAKzEPAK54RQIA0tgGaIl3ABDrtgASAHB/cpTEOgC4Q4kEALAKAADpskQCAFgFAIA0OSABAHFKAKsAAPCMc5yYIwEAcQlAQWwDgIEUSABAXBJQEdcAYCAVEgAQjwDMiWkAMJI5EgAQhwTkxDMASGVLAAkA+N8JURLPAGAkx6Al4Ocfe6Fra6nSb0L1fSXtwdXYqqWDgxKLmK9j4gmgEehDCHwMhC4BYgS2Z1uQ9uBqfLXCwWGTQJ9tEk8AXwJ9CIETugScBPsiD2jPdkbaA8PBGAlAApCANFiHLAE7wY44GK7wQaieNSkPrsZWhgQgAUgATCQLWQIWgh1xMlxhqVWLHWkPDK4yIQFIABKQFmWg8/fPf1SCnbE0VNmlYB0XpD24Gl8lEoAEIAHg4yq4DQkoBDujMFRZqTo2pDy4Mb6OSAASgARASlvMfQmYCXbG0fMgfSDlwY3xVSMBSAASACndXHb9LzYIbgk0hirbpHyAA4xPhg4JQAKQAJhKDBIguSWwFq6o1HmAlnQHSAASgASAAdYBzt//+R/JLYGdcEWlBOVIuoMb4ytDApAAJABSW2X+vwUMwS2BSriiUucBclIeIAFIABIABtgFOH+N3XF3whVtharFUwLh1vgqkQAkAAkATcoA56/RhJsJVXLt4+oEIAFIABKABEDIOeaeBEgtvR+EKrlLdakGrE2EGglAApAA0KQOcP7e/MVcqENOQpWUOqfAUwIBCUACkAAwRRvg/L37G1JbAnOBSra+CAlEm8g6JAAJQAJAl5gkQGpLoNCsoNR5AJ4SCC6C8JtKkhLXWjhxS11vSAASAH9YxyIBUlsCR80KlkL1WJHq4M4YW6aSbEg6SAAYJ4tCAgSX4RvNCtau6wDRS0CGBAASAELkMUnAQahTlo4nB08JhEdjLE8l2ZB0kAAwThmTBKyEOmU3sXJSd2g8JRBsbDkhAUgAnwfEIwHqDzQCnVK5DM6kOUACSDpIAFiijk0CJLYE2omVq10JCCQlAXUqyYakgwQAEjBWAqS2BLKRFZsLlVuQ5gAJIOkgAWCJJioJENwSKEdWLBf6QHhKIDwbayckAJAAkCJGCZDYEjiNrJj1MiFZCUgm2ZB0kABAAqZIwEKob+aW7854YRAgASQdJABss45KAgSTcj6wLKnzADwlEGyNNSQACeDzgAtZjBKwE+iYw8CycoGyeEogDBlrGRIASAAgAXa2BJqBZR1tCYeBDu2/WGWvrj+/RtpFApAAJEDw8ziv0NbdX2eoDuq/60D7senV/5wDSvXvy681AbVlF50ECG4JLAeUI/Fh5xY677yUvP25PkbWuf25Pru/3r629EBWplxzjT5zUvad+hRIgCi15tUEWLZNCWhVYswG/My1+rOth2P5XKdKrTCvR/bVWv09n2WnjFUCJLYEiidlSLzRrbWQQD+EA+c2sMNw2cRyM1dl36lPiQTIIVCvfYBl25CAtpv4zBMl3pUnY/ikxHsuNI7nag77tkpQjmjDFJmp74yd48AyT5OERWhLoLJwZ1YZSpxrw/bZ2NoyQAKQACQgGAk4SCRNtWrpcqn/1XBM23m06lE5koB2QHlLrVULgS2B1sJ5gMLAAHu3OYAkl7yRACQACQhSAlrpmwJHImBtadyjVY9asx3Z0HF9o+x85Ip+OcW2dFkbPg8wExxUy87NE+WazuB3TZEALQtHApAA0xJwMnUj0P11Fin4GDZAdlyuCriQgH8M2RJQY6vtxb7REiCxJVA+WG7X3nMSXv53OZDE7wSQACQACfBeAo4WkqTpcW9MYgKJ3y4k4O/PVtt7WwHHyRIgtCVQG1xl2EUiAH22SAASgAQkIQFHiwkyWgHwIY47kICsl5vzJ9ufua4ESCTr+Y2fK7GXsxAYOPPOr9OmrfSyGhIgJrRIABIgJQG15QT5GbMAWBIe3yRg90gmVV5rr26AJkmAxJZAfuPn6hpbE3FiaDvZ78cjAS/BPTQHCYhXAqwnz5/yXn2/WRE+I5CCBCzubQn0ZOioLQFCifJgwNYOAoOl9DgJVEgAEoAERCkBc0fJUXLF8/XFYxxs/c1tS8DVinp+9ecO/V+XkADdLYGTgS2GTHOQrANIBK9IABKABMQlAQ4To9RDz6oA2rq0fD4gcyQBxa0tgf5WgJQESGwJLAXPA7QCg6QOIBE0SAASgAQgAZ5tCSwDae8+AQmYXefE3g3uQUwChLYECsGgdNQcHJuAkkGBBIjdGSABSEDKEiCx+vkRUHvnFlcDnEjArS2B3lbASloCdhKJWygxFJqD4xhQMjghASIBIUMCkICUJUBoLGwS3QLxWQKKqxzbXK8iS0mA7pbA5asKpUCHzzTaIW2HJ9Wm/iW91bBGApAAJCBeCVArVW/df19Jvu8MnL7XXNFtLLT5fLJ/7tnqh+8S8GdL4NZWgJgECG0JSLyUp9JsQyG1X//IijvZRxCXSAASgATEJwFqa/JRTKyFk+KXxke+F1ymf9TmVqqs3p2xaUpXEnC1JfDP660AaQnQ3RLYCXT2TrMNElsBpyETUw12CRE4IQFIABIQjwR0415+MyjeDCxX5+VoG4HyxzzV7yjUZhtbAq4loHi0YiMpAbpbAv8S6OyFZhsktgLWIye7RJlzJAAJQALCl4CJq4RSCXFqu1uh8se2eydQ5quF+epaAma93zsYkwChLQGXd8QSJ8Q/bAY7oT0nJCCs1wgjAXFLwNSbgmXg7Z6yFdvqroJ0dr4ZpCMBMxUrs4Ex9XzNbvzeasDvLSQCysFhYDxo1j0XqMPG0SAskQAkAAmIQgKcbIWqsqe+Wvjd4d68RLtbw/O1fAkAganzxyhcsXKcCFqNsnVXUCokAAlAApKWgFqg7KnPSNkKnAVw2e4vJEBIAjSNzkkC7tW7chWYO70DOVoTAQlAApCAKCSgcygBG81yd47b/Y4EyErA0UFQPArUu9asw97BMpz2REACkAAkIA4J0D0XoCEBuvvyB5dxoDP/COE6NQnIHQTF3IN9oTcHkw8JQAKQACRAKhluHPV37TL+d+a/IZCWBJgMLKYGoVCdNy4loJv4BDEkAAlAApCAwCWgdNFuJMDs/voYqggkYO0wGSMBSAASEIcEFA6SoUSbT0hAfBKwsxgQJd6kt3QpAY6TMRKABCABcUhAGagEdI7bvUQC5CVgYTEgLgTqmyEBSAASgAQgAelJgIUt7PQkQP3AxkIwPAnVFQlAApAAJCBpCZhYPhKABNz9gQcLwbBEApAAJAAJQAKQACTAPwnILQTDFRLwhx0SMLnvj0gAEoAEIAFIgOwPnBnu2EawrjFIQIkETO77GglAApAAJAAJkP+hJ4Mde0QCkAAkAAlAApAAJMBfCTC515ojAUgAEoAEIAFIABLgrwRkhjq19bCeSAASgAQgAUgAEoAEWOjcCglAAjoOBiIBSEAMEpBpXgskwG8JMHEuoEACkICOrwgiAUhA8BLgSQJEAgxKwMFAp86QACQACUACkAAkAAnwXwJy4Q49GagjEoAEIAFIABKABCABBn7wQrhDdwbqiAQgAUgAEoAEIAFIgKEf3gp26MpA/ZAAJAAJQAKQACQACTD0w2uhzmwM1Q8JQAKQACQACUACkABDP7z0uTORACQACUACkAAkAAlAApAAJAAJQAKQACQACUACkAAkAAlAApAAJMBNbEYCkAAkAAlAApAAJAAJQAKQACQACUACkAAkAAlAApAAJAAJQAKQACQACUACkAAkQEwCMiQACUACkAAkAAlAApAAJAAJQALCaXMIIAFIABKABCABSAASgAQgAUgAEoAEIAFIABKQkgRkSAASgAQgAUgAEoAEIAFIABKABHgoAQskAAlAApAAJAAJQAISlIAAAxESgAQgAUgAEoAEIAFIABKABCABSAASgAQgAUgAEoAEIAE+MkMCkAAkAAlAApAAJCBBCXgJBCQACUhdAk5IABKABCABSAASgASkKQE1EoAEIAFIABKABCABSAASgAQgAeFIwMZjEamRACQACUACkAAkAAlAApAAJMDLZIwEvAT3OmEkAAlAApAAJAAJQAKQACQACUACPJaACglAApAAJAAJQAK8l4Cfv79GAsQpkQAkAAkIQwIKJAAJSFwCNiFKgM/zAAkIRAJc2+jP310iAc4lIEMCkIDAJWAXqASckAAkIHUJ2CABSAASgAS4nA9T45BAm78iloAMCUhHAt5cSkCA2xC+ScAMCUACkID0JEDoJgwJiEACTpp122uUvUUC3E8wJAAJCFwCVo6S4Vyz3I+IJWCFBIQjAbWrwKwT8BSnACXggAQgAQbmxDFVCXCYDDea5b5pNLv1WQJeAgIJ0K/jL1fLYTr94iIR//ydVx+X2rpwXiKEBNyRYd270oAl4OQwGW41y127nAtIABJwqWMhUL/1hHLnAuWWDpNAMWHCt55KQI0EBCsB5zG1FOqTECXgIFD21G3Jd4Gym4llv3ksAS0SEJYErATq92F5KexC7jAJlCPKmmtMdiQgLQnYjhSAtWCfuJSAqYK8CrzdU8teOizbWb5CAszVU4LlyKT42+XhE4GyjyPaKr3cnnk6TpOXgE7/sNjahQB4kAxXE0SgdtxuCembcoPwLtTuTyQACbjUsxKo4/fQANhpnopVNI6TQDswoLcGJhkS4K8EbCwsEZ+kBcC1BKjyZyNWpc7zauFaAoQ+7zFxQuT8hyr3l6E5UCIB4UnATqie349WBJT1Stnn0YMkUD5o595gopGWgBwJ8EoCHh0gPUglAd8koFeP4okINZ3gV9A6vQPKUnfl6wErhrWgAKwNzgEkIEAJWAgPgg+1t7lR16v6td+CZeSeJIFKta/fztZwMpSWgAwJ8EcCVP3O4+moAn+tRH1pOA54IQFXcnro9UGlBGEmXI6OBPwy3OZa5ZGNcDnvBudAjgQEJgGqrnUXDo1Ae09duEhLwAIJ8EsCHAVDryTAYruT+8wNbgWIxyckwJ4EFAElQYn3h9dIgJWkmJoEbJGAoNos8RKzj8DavDU8T1eB9QcS0KtvE0AiaCWWA5EAJMAQeyQgqDZLfVd+GVCbv01O0gDHABJwtR8V/SqA8GczRWJ8lIAaCRDh3VEgmyMBVtscZB9YWAVoAxwDSMBVnSufzwJIHQrq5L4RMYbzOYS/IQFRS8CXgyB2/jbKd8gS0Bn6xoPlu+JXz5Od1PNZvMhVSIC5Os8686fbne81dfZPxDeqbzNPJaBEAkT47UIAJJZhHUvAt4Pgv5T+7H3eFujMPRyoT4UEBC4BjhLkEAoD7bQpACvBvkUC/P7sl5bm6bx/Jxu4BJz5sBznTHxNbvBD0yy39c3SHA3qGQFIwOO6Fx4F/6OhNtpYAj/1tzA8loAMCRBja1sAIpEAayJgeGn8yycRsHAOoM8OCYhEAjwSgWPA7Ttdn2FAApKQgC/D83J5ay87EgmwIgKd2YfleLMiYFkAjMQmJMDxYQuVKF2dESgttK+1KS++SoDl7ZHYJeDMxtBntLl3BxuRBPxHBDpzj0deWxqv3y7PCDgQgK4L7BkBSMDwdqw6u0/Ya20ZZSf/tcj20fkFJCAZCfg28Pk8TNKRSYCRJNrZOSHf51zWq+V4LfmOllG8BAgSML49plcFjp3ws8EHtOsg9Tl1T95s5rkE1EiAKB9CdV13A77KFqEEXJLom8ltFEt82lgVUHf/vx21sXkJECRgfJtmKmm2BpL/wmG7djqDf2hi9lwCjkiAvAhMXdZWSWvwa7cjlYA/ZehssXR/vdzrtwdj+Px5rg0l/2/HbauRgNsBvxS4Ck8773xeoNIQgkol35kn7VmMTITn+ucTytAdDwtD7S89l4BfKlFJXLbrvR3xOWzGJP8eun3y5fBzGSwcY5bXVfL/8nAsnxP221QhUEv+57a9eyI3Zw5IQMKocwN5L1HVV9fhIjSd5ydI1WpHfqMdlzZkvoiLcLvzDkzvD3+qpHd5/fRG3cXt1e/9ppsG9+WX6re3O335K7C2vN9oz+Xa99r15Wk7SiQAIGwJyMgtAODTNiUSAGB3QgAATGGFBACELwEtsQwAxhJwzCPwA/QmRE04A4CRNEgAQBwSUBLPAGAkRyQAIA4JyIlnADCSAgkAiEMCZsQzABjJDAkAiEcEKmIaAAykCjzeEfQBriZFQVwDgNi3ApAAgPsToyW2AcAT2i7wp6ciAQC3J0ZJfAOAJxwiiHUEfIAbE2PGagAAPGGBBACwGgAA6VFGEucI9gCsBgDACM5xYYYEAMQvAjnxDgCuyCOKcQR6gCeTpCLmAYCijiy+EeQBBmwLNMQ+ALYBYtkGQAIAxk2UFfEPIHlWEcY2AjzAwMlSEAMBkqWINK4R3AEQAQBITQCQAABEAAASFQAkAAARAIBEBQAJANCbPHnHw4QAYuQ8r7NE4hjBHEBjAq1+rhMxEyAazvN5kVAMI5ADCEykktgJEDxlgrGLAA4guCpQE0cBgqNO6e4fCQAwO6lytggAgkn+WeLxiqANYGhyZR3vHQDwkWPqyR8JALA3yRY/147VAQCnVGoezohKSACASyEofq4D5wcAjNGo+VWq7TkSPxIA4O0knKmtg8u1U8Hrcl2EoX8BpJLI+1d5deVXc2dFREECAFKdzNmNq7xxVTeC6/lqyTswkdOdMXW4Mf6KG+N0wQxGAgDA3y2M7M6V3xGNy3W8kxxY2TDDkL4+PPnMsgcXy+pIAACA88A1e5KsYrhIuGBFAv4Nu4ntPSzuAlUAAAAASUVORK5CYII=);background-repeat:no-repeat;background-position:center center;background-size:110px;position:absolute;left:0}.bpp-youtube-preview .bpp-youtube-preview-thumbnail:hover:after{display:inline-block}.bpp-youtube-preview .bpp-youtube-preview-title{position:absolute;left:140px;color:#dc566d;font-weight:700;font-size:21px;overflow:hidden;white-space:nowrap}.bpp-youtube-preview .bpp-youtube-preview-author{position:absolute;left:140px;top:25px;color:#333;font-size:16px}.bpp-youtube-preview .bpp-youtube-preview-author a,.bpp-youtube-preview .bpp-youtube-preview-author span{color:#dc566d;font-weight:700}.bpp-youtube-preview .bpp-youtube-preview-length{position:absolute;left:140px;top:45px;color:#333;font-size:16px}.bpp-youtube-preview .bpp-youtube-preview-clicks{position:absolute;left:140px;top:65px;color:#333;font-size:16px}.bpp-youtube-preview .bpp-youtube-preview-clicks img{height:16px}.bpp-youtube-preview .bpp-youtube-preview-link{position:absolute;bottom:0;right:220px;display:block;padding:5px;color:#dc566d!important;text-decoration:none}.bpp-youtube-preview .bpp-youtube-preview-link:hover{color:#FFF!important;background-color:#dc566d;font-weight:700}.bpp-youtube-preview .bpp-youtube-preview-link-blank{position:absolute;bottom:0;right:0;display:block;padding:5px;color:#dc566d!important;text-decoration:none}.bpp-youtube-preview .bpp-youtube-preview-link-blank:hover{color:#FFF!important;background-color:#dc566d;font-weight:700}";
            if (style.styleSheet) {
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }
            head.appendChild(style);
        })();
    }, {} ],
    69: [ function(require, module, exports) {
        (function(global) {
            "use strict";
            var _ = typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null;
            var $ = typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null;
            var utils = require("./../utils");
            require("./../styles/notification.less");
            var Notification = function(options) {
                this.timestamp = Date.now();
                this.type = options.type || "info";
                this.title = options.title || null;
                this.onClick = options.onClick || null;
                this.onClose = options.onClose || null;
                this.icon = options.icon || null;
                this.width = options.width || null;
                this.message = options.message;
                this.hidedelay = options.hasOwnProperty("hidedelay") ? options.hidedelay : 5e3;
                this.new = true;
                this.element = null;
            };
            var Queue = function() {
                var $queueElem, _queue, _remove, _redraw, _add, _checkHide;
                _queue = [];
                _checkHide = function() {
                    console.log("_checkHide");
                    var count = 0;
                    _.each(_queue, function(m, index) {
                        if (m.hidedelay) {
                            if (Date.now() > m.timestamp + m.hidedelay) {
                                m.element.fadeOut(150, function() {
                                    _remove(index);
                                });
                            } else {
                                count += 1;
                            }
                        }
                    });
                    if (count > 0) {
                        setTimeout(_checkHide, 1e3);
                    }
                };
                _add = function(_n) {
                    _queue.push(_n);
                    _queue = _.sortBy(_queue, function(_no) {
                        return -_no.timestamp;
                    });
                    _redraw();
                    _checkHide();
                };
                _remove = function(index) {
                    _queue.splice(index, 1);
                    _redraw();
                };
                _redraw = function() {
                    if ($queueElem) {
                        $queueElem.remove();
                        $queueElem = null;
                    }
                    $queueElem = $(require("templates").notification({
                        notifications: _queue
                    }));
                    _.each(_queue, function(m, index) {
                        m.element = $queueElem.find(".bpp-notification").eq(index);
                        if (m.icon) {
                            m.element.css("background-image", m.icon ? "url(" + m.icon + ")" : "none");
                        }
                        if (m.width) {
                            m.element.css("width", m.width + "px");
                        }
                    });
                    $queueElem.appendTo("body");
                    $queueElem.find(".bpp-notification").each(function(index) {
                        if (_queue[index].new) {
                            _queue[index].new = false;
                            $(this).hide().fadeIn(150);
                        }
                    });
                    $queueElem.find(".bpp-notification-close").click(function(event) {
                        event.preventDefault();
                        var $notification = $(this).parent(".bpp-notification"), index = parseInt($notification.attr("data-index"), 10);
                        if (_queue[index].onClose) {
                            _queue[index].onClose(_queue[index]);
                        }
                        $notification.fadeOut(150, function() {
                            _remove(index);
                        });
                    });
                    $queueElem.find(".bpp-notification-clickable").click(function(event) {
                        event.preventDefault();
                        var index = parseInt($(this).attr("data-index"), 10);
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
            var create = function(options) {
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
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
        "./../styles/notification.less": 61,
        "./../utils": 71,
        templates: "94v5J1"
    } ],
    70: [ function(require, module, exports) {
        (function(global) {
            "use strict";
            var $ = typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null;
            var _ = typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null;
            var utils = require("./../utils");
            require("./../styles/popup.less");
            var message = function(msg, type) {
                var $modal, closeModal, modalCloseButtonClick, modalEscapePressed;
                $modal = $(require("templates").popupmessage({
                    message: msg,
                    status: _.map([ type ], function(_type) {
                        if (_type === "info") {
                            return {
                                icon: "wcf/icon/infoM.png",
                                clazz: "popup-info"
                            };
                        }
                        if (_type === "warning") {
                            return {
                                icon: "wcf/icon/warningM.png",
                                clazz: "popup-warning"
                            };
                        }
                        if (_type === "error") {
                            return {
                                icon: "wcf/icon/errorM.png",
                                clazz: "popup-error"
                            };
                        }
                        if (_type === "success") {
                            return {
                                icon: "wcf/icon/successM.png",
                                clazz: "popup-success"
                            };
                        }
                    })[0]
                }));
                $modal.appendTo("body");
                $modal.fadeIn(150, function() {
                    $modal.find(".bpp-popup-message").animate({
                        top: "+=40px",
                        opacity: 1
                    }, 150, function() {
                        $modal.trigger("focus");
                    });
                });
                closeModal = function() {
                    $modal.off("keyup", modalEscapePressed);
                    $modal.off("click", "button", modalCloseButtonClick);
                    $modal.find(".bpp-popup-message").animate({
                        top: "-=40px",
                        opacity: 0
                    }, 150, function() {
                        $modal.fadeOut(150, function() {
                            $modal.remove();
                        });
                    });
                };
                modalCloseButtonClick = function() {
                    closeModal();
                };
                $modal.on("click", "button", modalCloseButtonClick);
                modalEscapePressed = function(event) {
                    if (event.which === 27) {
                        closeModal();
                    }
                };
                $modal.on("keyup", modalEscapePressed);
            };
            exports.message = message;
            var confirm = function(question, leftLabel, rightLabel, fn) {
                var $modal, closeModal, modalCloseButtonClick, modalEscapePressed, clickLeftButton, clickRightButton;
                $modal = $(require("templates").popupconfirm({
                    question: question,
                    leftLabel: leftLabel,
                    rightLabel: rightLabel
                }));
                $modal.appendTo("body");
                $modal.fadeIn(150, function() {
                    $modal.find(".bpp-popup-confirm").animate({
                        top: "+=40px",
                        opacity: 1
                    }, 150, function() {
                        $modal.trigger("focus");
                    });
                });
                closeModal = function() {
                    $modal.off("click", "button", modalCloseButtonClick);
                    $modal.off("keyup", modalEscapePressed);
                    $modal.off("click", ".confirm-button-first", clickLeftButton);
                    $modal.off("click", ".confirm-button-last", clickRightButton);
                    $modal.find(".bpp-popup-confirm").animate({
                        top: "-=40px",
                        opacity: 0
                    }, 150, function() {
                        $modal.fadeOut(150, function() {
                            $modal.remove();
                        });
                    });
                };
                modalCloseButtonClick = function() {
                    fn(0);
                    closeModal();
                };
                $modal.on("click", "button", modalCloseButtonClick);
                modalEscapePressed = function(event) {
                    if (event.which === 27) {
                        fn(0);
                        closeModal();
                    }
                };
                $modal.on("keyup", modalEscapePressed);
                clickLeftButton = function(event) {
                    event.preventDefault();
                    fn(1);
                    closeModal();
                };
                $modal.on("click", ".confirm-button-first", clickLeftButton);
                clickRightButton = function(event) {
                    event.preventDefault();
                    fn(2);
                    closeModal();
                };
                $modal.on("click", ".confirm-button-last", clickRightButton);
            };
            exports.confirm = confirm;
            var prompt = function(options, fn) {
                var $modal, closeModal, modalCloseButtonClick, modalEscapePressed, clickLeftButton, clickRightButton, submitInput;
                options.question = options.question || "";
                options.leftLabel = options.leftLabel || "";
                options.rightLabel = options.rightLabel || "";
                options.placeholder = options.placeholder || "";
                options.value = options.value || "";
                $modal = $(require("templates").popupprompt({
                    question: options.question,
                    leftLabel: options.leftLabel,
                    rightLabel: options.rightLabel,
                    placeholder: options.placeholder,
                    value: options.value
                }));
                $modal.appendTo("body");
                $modal.fadeIn(150, function() {
                    $modal.find(".bpp-popup-prompt").animate({
                        top: "+=40px",
                        opacity: 1
                    }, 150, function() {
                        $modal.trigger("focus");
                    });
                });
                closeModal = function() {
                    $modal.off("click", "button", modalCloseButtonClick);
                    $modal.off("keyup", modalEscapePressed);
                    $modal.off("click", ".prompt-button-first", clickLeftButton);
                    $modal.off("click", ".prompt-button-last", clickRightButton);
                    $modal.off("keypress", ".prompt-input", submitInput);
                    $modal.find(".bpp-popup-prompt").animate({
                        top: "-=40px",
                        opacity: 0
                    }, 150, function() {
                        $modal.fadeOut(150, function() {
                            $modal.remove();
                        });
                    });
                };
                modalCloseButtonClick = function() {
                    fn(0, $modal.find(".prompt-input").val());
                    closeModal();
                };
                $modal.on("click", "button", modalCloseButtonClick);
                modalEscapePressed = function(event) {
                    if (event.which === 27) {
                        fn(0, $modal.find(".prompt-input").val());
                        closeModal();
                    }
                };
                $modal.on("keyup", modalEscapePressed);
                clickLeftButton = function(event) {
                    event.preventDefault();
                    fn(1, $modal.find(".prompt-input").val());
                    closeModal();
                };
                $modal.on("click", ".prompt-button-first", clickLeftButton);
                clickRightButton = function(event) {
                    event.preventDefault();
                    fn(2, $modal.find(".prompt-input").val());
                    closeModal();
                };
                $modal.on("click", ".prompt-button-last", clickRightButton);
                submitInput = function(event) {
                    if (event.which === 13) {
                        fn(3, $modal.find(".prompt-input").val());
                        closeModal();
                        return false;
                    }
                };
                $modal.on("keypress", ".prompt-input", submitInput);
            };
            exports.prompt = prompt;
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
        "./../styles/popup.less": 63,
        "./../utils": 71,
        templates: "94v5J1"
    } ],
    71: [ function(require, module, exports) {
        (function(global) {
            "use strict";
            var _ = typeof window !== "undefined" ? window._ : typeof global !== "undefined" ? global._ : null;
            var $ = typeof window !== "undefined" ? window.jQuery : typeof global !== "undefined" ? global.jQuery : null;
            var moment = typeof window !== "undefined" ? window.moment : typeof global !== "undefined" ? global.moment : null;
            var storage = require("./storage");
            var log = {
                error: function() {
                    var args = Array.prototype.slice.call(arguments, 0);
                    args.splice(0, 0, "background:#4d5460;color:#ff4136;border-top:1px solid #343a45;border-bottom:1px solid #343a45");
                    args.splice(0, 0, "background:#4d5460;color:#ff4136;border-top:1px solid #343a45;border-bottom:1px solid #343a45");
                    args.splice(0, 0, "background:#4d5460;color:#FFF;border-top:1px solid #343a45;border-bottom:1px solid #343a45");
                    args.splice(0, 0, "background:#4d5460;color:#ff4136;border-top:1px solid #343a45;border-left:1px solid #343a45;border-bottom:1px solid #343a45");
                    args.splice(0, 0, "%c B%creadfish%c++ %c[ERROR] ");
                    console.log.apply(console, args);
                },
                debug: function() {
                    if (storage.get("option.debugmode", false)) {
                        var args = Array.prototype.slice.call(arguments, 0);
                        args.splice(0, 0, "background:#4d5460;color:#FF851B;border-top:1px solid #343a45;border-bottom:1px solid #343a45");
                        args.splice(0, 0, "background:#4d5460;color:#ff4136;border-top:1px solid #343a45;border-bottom:1px solid #343a45");
                        args.splice(0, 0, "background:#4d5460;color:#FFF;border-top:1px solid #343a45;border-bottom:1px solid #343a45");
                        args.splice(0, 0, "background:#4d5460;color:#ff4136;border-top:1px solid #343a45;border-left:1px solid #343a45;border-bottom:1px solid #343a45");
                        args.splice(0, 0, "%c B%creadfish%c++ %c[DEBUG] ");
                        console.log.apply(console, args);
                    }
                }
            };
            exports.log = log;
            var getParameterByName = function(name, from) {
                name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
                var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(from);
                return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
            };
            exports.getParameterByName = getParameterByName;
            var getQuery = function(name) {
                return getParameterByName(name, document.URL) || null;
            };
            exports.getQuery = getQuery;
            var parseWBBTimeFormat = function(str) {
                if (str[0] === "(" && str.slice(-1) === ")") {
                    str = str.slice(1, -1);
                }
                if (str.indexOf("Heute") > -1) {
                    return moment(str, "[Heute, ]HH:mm");
                }
                if (str.indexOf("Gestern") > -1) {
                    var _m = moment(str, "[Gestern, ]HH:mm");
                    _m.subtract("days", 1);
                    return _m;
                }
                return moment(str, "DD.MM.YYYY[, ]HH:mm");
            };
            exports.parseWBBTimeFormat = parseWBBTimeFormat;
            var formatWBBTimeFormat = function(_m) {
                if (_m.isSame(moment(), "day")) {
                    return _m.format("[Heute, ]HH:mm");
                }
                if (_m.isSame(moment().subtract("days", 1), "day")) {
                    return _m.format("[Gestern, ]HH:mm");
                }
                return _m.format("DD.MM.YYYY[, ]HH:mm");
            };
            exports.formatWBBTimeFormat = formatWBBTimeFormat;
            var templateName = null;
            var getTemplateName = function() {
                if (!templateName) {
                    templateName = $("body").attr("id");
                }
                return templateName;
            };
            exports.getTemplateName = getTemplateName;
            var isTemplate = function(names) {
                names = _.isArray(names) ? names : [ names ];
                return names.indexOf(getTemplateName()) > -1;
            };
            exports.isTemplate = isTemplate;
            var getSecurityToken = function() {
                return this.getParameterByName("t", $("#userMenuLogout > a").attr("href"));
            };
            exports.getSecurityToken = getSecurityToken;
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
        "./storage": 56
    } ]
}, {}, [ 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54 ]);