var _ = require('underscore');
exports["notification"] = function (obj) {
  var __t, __p = '',
      __j = Array.prototype.join,
      print = function () {
      __p += __j.call(arguments, '');
      };
  with(obj || {}) {
    __p += '<div class="bpp-notification-queue">\r\n    ';
    _.each(notifications, function (notification, index) {
      __p += '\r\n        <div data-index="' + ((__t = (index)) == null ? '' : __t) + '" class="bpp-notification ' + ((__t = ((notification.onClick ? 'bpp-notification-clickable ' : ''))) == null ? '' : __t) + 'bpp-notification-' + ((__t = (notification.type)) == null ? '' : __t) + '"' + ((__t = ((notification.icon ? ' style="background-image: url(' + notification.icon + ')"' : ''))) == null ? '' : __t) + '>\r\n            <button class="bpp-notification-close" role="button">×</button>\r\n            ';
      if (notification.title) {
        __p += '\r\n                <div class="bpp-notification-title">' + ((__t = (notification.title)) == null ? '' : __t) + '</div>\r\n            ';
      }
      __p += '\r\n            <div class="bpp-notification-message">' + ((__t = (notification.message)) == null ? '' : __t) + '</div>\r\n        </div>\r\n    ';
    });
    __p += '\r\n</div>';
  }
  return __p;
};
exports["optionImportExport"] = function (obj) {
  var __t, __p = '',
      __j = Array.prototype.join,
      print = function () {
      __p += __j.call(arguments, '');
      };
  with(obj || {}) {
    __p += '<h3 class="subHeadline">Einstellungen Importieren/Exportieren</h3>\n<fieldset>\n    <legend>Einstellungen importieren</legend>\n    <div class="formElement">\n        <div class="formField">\n            <label for="importOptions">\n                <input type="file" name="importOptions" id="importOptions">\n            </label>\n        </div>\n        <div class="formFieldDesc"><p>Wähle eine Sicherungsdatei von deinem Computer aus, um deine Einstellungen zu importieren.</p></div>\n    </div>\n</fieldset>\n<fieldset>\n    <legend>Einstellungen exportieren</legend>\n    <div class="formElement">\n        <div class="formField">\n            <label for="exportOptions">\n                <a href="' + ((__t = (blobURL)) == null ? '' : __t) + '" download="breadfishplusplus_options.json">Klicke hier, um deine aktuellen Einstellungen als Sicherungsdatei auf deinem Computer zu speichern.</a>\n            </label>\n        </div>\n    </div>\n</fieldset>';
  }
  return __p;
};
exports["optionNicknames"] = function (obj) {
  var __t, __p = '',
      __j = Array.prototype.join,
      print = function () {
      __p += __j.call(arguments, '');
      };
  with(obj || {}) {
    __p += '<h3 class="subHeadline">Spitznamen</h3>\n';
    if (alert) {
      __p += '\n<div class="info">' + ((__t = (alert)) == null ? '' : __t) + '</div>\n';
    }
    __p += '\n';
    if (nicknames.length > 0) {
      __p += '\n<div class="border">\n    <table class="tableList">\n        <thead>\n            <tr class="tableHead">\n                <th><div><span class="emptyHead">Benutzername</span></div></th>\n                <th><div><span class="emptyHead">Spitzname</span></div></th>\n            </tr>\n        </thead>\n        <tbody>\n            ';
      _.each(nicknames, function (nickname) {
        __p += '\n            <tr class="container-' + ((__t = (nickname.cycle)) == null ? '' : __t) + '">\n                <td><a href="http://forum.sa-mp.de/index.php?page=User&amp;userID=' + ((__t = (nickname.userId)) == null ? '' : __t) + '">' + ((__t = (nickname.name)) == null ? '' : __t) + '</a></td>\n                <td>' + ((__t = (nickname.nick)) == null ? '' : __t) + '</td>\n            </tr>\n            ';
      });
      __p += '\n        </tbody>\n    </table>\n</div>\n';
    }
    __p += '';
  }
  return __p;
};
exports["options"] = function (obj) {
  var __t, __p = '',
      __j = Array.prototype.join,
      print = function () {
      __p += __j.call(arguments, '');
      };
  with(obj || {}) {
    __p += '<ul class="breadCrumbs">\r\n    <li>\r\n        <a href="http://forum.sa-mp.de/breadfish-de-die-deutschsprachige-gta-community">\r\n            <img src="icon/indexS.png" alt=""> <span>breadfish.de - DIE deutschsprachige GTA-Community</span>\r\n        </a> »\r\n    </li>\r\n</ul>\r\n<div class="mainHeadline">\r\n    <img src="http://i.imgur.com/4K8jM2W.png" alt="">\r\n    <div class="headlineContainer">\r\n        <h2>Breadfish++</h2>\r\n    </div>\r\n</div>\r\n<div class="tabMenu">\r\n    <ul>\r\n        <li><a href="index.php?page=BreadfishPlusPlus/#/settings/"><img src="wcf/icon/settingsM.png" alt=""> <span>Einstellungen</span></a></li>\r\n        <li><a href="index.php?page=BreadfishPlusPlus/#/keyboard/"><img src="wcf/icon/settingsM.png" alt=""> <span>Tastaturnavigation</span></a></li>\r\n        <li><a href="index.php?page=BreadfishPlusPlus/#/nicknames/"><img src="wcf/icon/settingsM.png" alt=""> <span>Spitznamen</span></a></li>\r\n        <li><a href="index.php?page=BreadfishPlusPlus/#/importexport/"><img src="wcf/icon/settingsM.png" alt=""> <span>Einstellungen Importieren/Exportieren</span></a></li>\r\n    </ul>\r\n</div>\r\n<div class="subTabMenu">\r\n    <div class="containerHead">\r\n        <ul>\r\n            ';
    _.each(defaultOptions, function (tab) {
      __p += '\r\n                ';
      if (tab.key !== 'keyboardnav') {
        __p += '\r\n                <li><a href="index.php?page=BreadfishPlusPlus/#/settings/' + ((__t = (tab.key)) == null ? '' : __t) + '/"><span>' + ((__t = (tab.name)) == null ? '' : __t) + '</span></a></li>\r\n                ';
      }
      __p += '\r\n            ';
    });
    __p += '\r\n        </ul>\r\n    </div>\r\n</div>\r\n<div class="border tabMenuContent">\r\n    ';
    _.each(defaultOptions, function (tab) {
      __p += '\r\n    <div data-key="' + ((__t = (tab.key)) == null ? '' : __t) + '" class="container-1 bpp_option_category">\r\n        <h3 class="subHeadline">' + ((__t = (tab.name)) == null ? '' : __t) + '</h3>\r\n        ';
      _.each(tab.categories, function (category) {
        __p += '\r\n        <fieldset>\r\n            ';
        if (category.name) {
          __p += '\r\n            <legend>' + ((__t = (category.name)) == null ? '' : __t) + '</legend>\r\n            ';
        }
        __p += '\r\n            ';
        _.each(category.options, function (option) {
          __p += '\r\n                ';
          if (option.toggle) {
            __p += '\r\n                    <div class="formCheckBox formElement">\r\n                        <div class="formField">\r\n                            <label for="' + ((__t = (option.key)) == null ? '' : __t) + '">\r\n                                <input type="checkbox" class="bpp_option" id="' + ((__t = (option.key)) == null ? '' : __t) + '" name="' + ((__t = (option.key)) == null ? '' : __t) + '"> ' + ((__t = (option.name)) == null ? '' : __t) + '\r\n                            </label>\r\n                        </div>\r\n                        ';
            if (option.desc) {
              __p += '\r\n                        <div class="formFieldDesc"><p>' + ((__t = (option.desc)) == null ? '' : __t) + '</p></div>\r\n                        ';
            }
            __p += '\r\n                    </div>\r\n                ';
          } else if (option.range) {
            __p += '\r\n                    <div class="formElement">\r\n                        <div class="formFieldLabel">\r\n                            <label for="' + ((__t = (option.key)) == null ? '' : __t) + '">' + ((__t = (option.name)) == null ? '' : __t) + '</label>\r\n                        </div>\r\n                        <div class="formField">\r\n                            <input type="range" id="' + ((__t = (option.key)) == null ? '' : __t) + '" name="' + ((__t = (option.key)) == null ? '' : __t) + '" class="bpp_option" min="' + ((__t = (option.min)) == null ? '' : __t) + '" max="' + ((__t = (option.max)) == null ? '' : __t) + '" value="' + ((__t = (option.max)) == null ? '' : __t) + '">\r\n                            <span class="indicator">' + ((__t = (option.max)) == null ? '' : __t) + '</span>\r\n                        </div>\r\n                        ';
            if (option.desc) {
              __p += '\r\n                        <div class="formFieldDesc"><p>' + ((__t = (option.desc)) == null ? '' : __t) + '</p></div>\r\n                        ';
            }
            __p += '\r\n                    </div>\r\n                ';
          } else if (option.keyboard) {
            __p += '\r\n                    <div class="formElement">\r\n                        <div class="formFieldLabel">\r\n                            <label for="' + ((__t = (option.key)) == null ? '' : __t) + '">' + ((__t = (option.name)) == null ? '' : __t) + '</label>\r\n                        </div>\r\n                        <div class="formField">\r\n                            <input type="button" class="bpp_option" id="' + ((__t = (option.key)) == null ? '' : __t) + '" name="' + ((__t = (option.key)) == null ? '' : __t) + '" value="???">\r\n                        </div>\r\n                        ';
            if (option.desc) {
              __p += '\r\n                        <div class="formFieldDesc"><p>' + ((__t = (option.desc)) == null ? '' : __t) + '</p></div>\r\n                        ';
            }
            __p += '\r\n                    </div>\r\n                ';
          }
          __p += '\r\n            ';
        });
        __p += '\r\n        </fieldset>\r\n        ';
      });
      __p += '\r\n    </div>\r\n    ';
    });
    __p += '\r\n    <div data-key="nicknames" class="container-1 bpp_option_category"></div>\r\n    <div data-key="importexport" class="container-1 bpp_option_category"></div>\r\n</div>';
  }
  return __p;
};
exports["popupconfirm"] = function (obj) {
  var __t, __p = '',
      __j = Array.prototype.join,
      print = function () {
      __p += __j.call(arguments, '');
      };
  with(obj || {}) {
    __p += '<div class="bpp-popup-backdrop" tabindex="-1">\r\n    <div class="bpp-popup-confirm">\r\n        <p>' + ((__t = (question)) == null ? '' : __t) + '</p>\r\n        <button type="button" role="button">&times;</button>\r\n        <ul class="confirm-buttons">\r\n            <li><a href="#" class="confirm-button-first">' + ((__t = (leftLabel)) == null ? '' : __t) + '</a></li>\r\n            <li><a href="#" class="confirm-button-last">' + ((__t = (rightLabel)) == null ? '' : __t) + '</a></li>\r\n        </ul>\r\n    </div>\r\n</div>';
  }
  return __p;
};
exports["popupmessage"] = function (obj) {
  var __t, __p = '',
      __j = Array.prototype.join,
      print = function () {
      __p += __j.call(arguments, '');
      };
  with(obj || {}) {
    __p += '<div class="bpp-popup-backdrop" tabindex="-1">\r\n    ';
    if (status) {
      __p += '\r\n    <div class="bpp-popup-message ' + ((__t = (status.clazz)) == null ? '' : __t) + '">\r\n    ';
    } else {
      __p += '\r\n    <div class="bpp-popup-message">\r\n    ';
    }
    __p += '\r\n        ';
    if (status) {
      __p += '\r\n        <img src="' + ((__t = (status.icon)) == null ? '' : __t) + '">\r\n        ';
    }
    __p += '\r\n        <p>' + ((__t = (message)) == null ? '' : __t) + '</p>\r\n        <button type="button" role="button">&times;</button>\r\n    </div>\r\n</div>';
  }
  return __p;
};
exports["privateMessagePopupContent"] = function (obj) {
  var __t, __p = '',
      __j = Array.prototype.join,
      print = function () {
      __p += __j.call(arguments, '');
      };
  with(obj || {}) {
    __p += '';
    _.each(messages, function (msg) {
      __p += '\r\n<p><a href="index.php?page=PMView&amp;pmID=' + ((__t = (msg.id)) == null ? '' : __t) + '#pm' + ((__t = (msg.id)) == null ? '' : __t) + '" title="' + ((__t = (msg.text)) == null ? '' : __t) + '">' + ((__t = (msg.title)) == null ? '' : __t) + '</a> von <a href="index.php?page=User&amp;userID=' + ((__t = (msg.authorID)) == null ? '' : __t) + '">' + ((__t = (msg.author)) == null ? '' : __t) + '</a> (' + ((__t = (msg.dateStr)) == null ? '' : __t) + ')</p>\r\n';
    });
    __p += '';
  }
  return __p;
};
exports["userMenuItem"] = function (obj) {
  var __t, __p = '',
      __j = Array.prototype.join,
      print = function () {
      __p += __j.call(arguments, '');
      };
  with(obj || {}) {
    __p += '<li>\r\n    <a href="index.php?page=BreadfishPlusPlus/#/settings/">\r\n        <img src="favicon.ico" alt=""> <span>Breadfish++</span>\r\n    </a>\r\n</li>';
  }
  return __p;
};