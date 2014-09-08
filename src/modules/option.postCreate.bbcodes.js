/*jslint nomen:true */
/*globals unsafeWindow */
"use strict";
var $           = require('lib/jquery');
var _           = require('lib/underscore');
var storage     = require('../storage');
var utils       = require('../utils');
var register    = require("../settings").register;

var CDN_PATH = 'http://cdn.breadfishplusplus.eu/';

register({
    'key': 'option.postCreate.bbcode.email',
    'name': 'E-Mail',
    'tab': 'Einstellungen',
    'subtab': 'Beitrag & Nachrichten erstellen',
    'category': 'BBCodes',
    'type': 'toggle',
    'default': false,
    'description': 'Fügt dem WYSIWYG-Editor das Icon für den E-Mail-BBCode hinzu.'
});
register({
    'key': 'option.postCreate.bbcode.sub',
    'name': 'Text tiefstellen',
    'tab': 'Einstellungen',
    'subtab': 'Beitrag & Nachrichten erstellen',
    'category': 'BBCodes',
    'type': 'toggle',
    'default': false,
    'description': 'Fügt dem WYSIWYG-Editor das Icon für den BBCode hinzu, um Text tiefzustellen.'
});
register({
    'key': 'option.postCreate.bbcode.sup',
    'name': 'Text hochstellen',
    'tab': 'Einstellungen',
    'subtab': 'Beitrag & Nachrichten erstellen',
    'category': 'BBCodes',
    'type': 'toggle',
    'default': false,
    'description': 'Fügt dem WYSIWYG-Editor das Icon für den BBCode hinzu, um Text hochzustellen.'
});
register({
    'key': 'option.postCreate.bbcode.java',
    'name': 'Java-Quelltext',
    'tab': 'Einstellungen',
    'subtab': 'Beitrag & Nachrichten erstellen',
    'category': 'BBCodes',
    'type': 'toggle',
    'default': false,
    'description': 'Fügt dem WYSIWYG-Editor das Icon für den Java-Quelltext-BBCode hinzu.'
});
register({
    'key': 'option.postCreate.bbcode.css',
    'name': 'CSS-Quelltext',
    'tab': 'Einstellungen',
    'subtab': 'Beitrag & Nachrichten erstellen',
    'category': 'BBCodes',
    'type': 'toggle',
    'default': false,
    'description': 'Fügt dem WYSIWYG-Editor das Icon für den Cascading Style Sheet-Quelltext-BBCode hinzu.'
});
register({
    'key': 'option.postCreate.bbcode.html',
    'name': 'HTML-Quelltext',
    'tab': 'Einstellungen',
    'subtab': 'Beitrag & Nachrichten erstellen',
    'category': 'BBCodes',
    'type': 'toggle',
    'default': false,
    'description': 'Fügt dem WYSIWYG-Editor das Icon für den HTML-Quelltext-BBCode hinzu.'
});
register({
    'key': 'option.postCreate.bbcode.xml',
    'name': 'XML-Quelltext',
    'tab': 'Einstellungen',
    'subtab': 'Beitrag & Nachrichten erstellen',
    'category': 'BBCodes',
    'type': 'toggle',
    'default': false,
    'description': 'Fügt dem WYSIWYG-Editor das Icon für den XML-Quelltext-BBCode hinzu.'
});
register({
    'key': 'option.postCreate.bbcode.js',
    'name': 'Javascript-Quelltext',
    'tab': 'Einstellungen',
    'subtab': 'Beitrag & Nachrichten erstellen',
    'category': 'BBCodes',
    'type': 'toggle',
    'default': false,
    'description': 'Fügt dem WYSIWYG-Editor das Icon für den Javascript-Quelltext-BBCode hinzu.'
});
register({
    'key': 'option.postCreate.bbcode.c',
    'name': 'C/C++-Quelltext',
    'tab': 'Einstellungen',
    'subtab': 'Beitrag & Nachrichten erstellen',
    'category': 'BBCodes',
    'type': 'toggle',
    'default': false,
    'description': 'Fügt dem WYSIWYG-Editor das Icon für den C/C++-Quelltext-BBCode hinzu.'
});
register({
    'key': 'option.postCreate.bbcode.dropdown',
    'name': 'Dropdown',
    'tab': 'Einstellungen',
    'subtab': 'Beitrag & Nachrichten erstellen',
    'category': 'BBCodes',
    'type': 'toggle',
    'default': false,
    'description': 'Fügt dem WYSIWYG-Editor das Icon für den Dropdown-BBCode hinzu.'
});
register({
    'key': 'option.postCreate.bbcode.sevenload',
    'name': 'Sevenload',
    'tab': 'Einstellungen',
    'subtab': 'Beitrag & Nachrichten erstellen',
    'category': 'BBCodes',
    'type': 'toggle',
    'default': false,
    'description': 'Fügt dem WYSIWYG-Editor das Icon für den Sevenload-BBCode hinzu.'
});
register({
    'key': 'option.postCreate.bbcode.clipfish',
    'name': 'Clipfish',
    'tab': 'Einstellungen',
    'subtab': 'Beitrag & Nachrichten erstellen',
    'category': 'BBCodes',
    'type': 'toggle',
    'default': false,
    'description': 'Fügt dem WYSIWYG-Editor das Icon für den Clipfish-BBCode hinzu.'
});
register({
    'key': 'option.postCreate.bbcode.googlevideo',
    'name': 'Googlevideo',
    'tab': 'Einstellungen',
    'subtab': 'Beitrag & Nachrichten erstellen',
    'category': 'BBCodes',
    'type': 'toggle',
    'default': false,
    'description': 'Fügt dem WYSIWYG-Editor das Icon für den Googlevideo-BBCode hinzu.'
});
register({
    'key': 'option.postCreate.bbcode.myspace',
    'name': 'MySpace',
    'tab': 'Einstellungen',
    'subtab': 'Beitrag & Nachrichten erstellen',
    'category': 'BBCodes',
    'type': 'toggle',
    'default': false,
    'description': 'Fügt dem WYSIWYG-Editor das Icon für den MySpace-BBCode hinzu.'
});
register({
    'key': 'option.postCreate.bbcode.myvideo',
    'name': 'MyVideo',
    'tab': 'Einstellungen',
    'subtab': 'Beitrag & Nachrichten erstellen',
    'category': 'BBCodes',
    'type': 'toggle',
    'default': false,
    'description': 'Fügt dem WYSIWYG-Editor das Icon für den MyVideo-BBCode hinzu.'
});

if (utils.isTemplate(['tplPostAdd', 'tplThreadAdd', 'tplPmNew', 'tplPostEdit', 'tplUserProfileEdit'])) {
    if (storage.get('option.postCreate.bbcode.email', false)) {
        $('#mce_editor_0_toolBar ul').last().append(require('templates').bbcode({
            name: 'email',
            img: 'http://cdn.breadfishplusplus.eu/img/bbcodes/email.png',
            title: 'Email einfügen'
        }));
    }
    if (storage.get('option.postCreate.bbcode.sub', false)) {
        $('#mce_editor_0_toolBar ul').last().append(require('templates').bbcode({
            name: 'sub',
            img: 'http://cdn.breadfishplusplus.eu/img/bbcodes/sub.png',
            title: 'Text tiefstellen'
        }));
    }
    if (storage.get('option.postCreate.bbcode.sup', false)) {
        $('#mce_editor_0_toolBar ul').last().append(require('templates').bbcode({
            name: 'sup',
            img: 'http://cdn.breadfishplusplus.eu/img/bbcodes/sup.png',
            title: 'Text tiefstellen'
        }));
    }
    if (storage.get('option.postCreate.bbcode.java', false)) {
        $('#mce_editor_0_toolBar ul').last().append(require('templates').bbcode({
            name: 'java',
            img: 'wcf/icon/wysiwyg/insertJavaM.png',
            title: 'Java-Quelltext'
        }));
    }
    if (storage.get('option.postCreate.bbcode.css', false)) {
        $('#mce_editor_0_toolBar ul').last().append(require('templates').bbcode({
            name: 'css',
            img: 'wcf/icon/wysiwyg/insertCssM.png',
            title: 'Cascading Style Sheet'
        }));
    }
    if (storage.get('option.postCreate.bbcode.html', false)) {
        $('#mce_editor_0_toolBar ul').last().append(require('templates').bbcode({
            name: 'html',
            img: 'wcf/icon/wysiwyg/insertHtmlM.png',
            title: 'HTML-Quelltext'
        }));
    }
    if (storage.get('option.postCreate.bbcode.xml', false)) {
        $('#mce_editor_0_toolBar ul').last().append(require('templates').bbcode({
            name: 'xml',
            img: 'wcf/icon/wysiwyg/insertHtmlM.png',
            title: 'XML-Quelltext'
        }));
    }
    if (storage.get('option.postCreate.bbcode.js', false)) {
        $('#mce_editor_0_toolBar ul').last().append(require('templates').bbcode({
            name: 'js',
            img: 'wcf/icon/wysiwyg/insertJavaScriptM.png',
            title: 'Javascript-Quelltext'
        }));
    }
    if (storage.get('option.postCreate.bbcode.c', false)) {
        $('#mce_editor_0_toolBar ul').last().append(require('templates').bbcode({
            name: 'c',
            img: 'wcf/icon/wysiwyg/insertCM.png',
            title: 'C/C++-Quelltext'
        }));
    }
    if (storage.get('option.postCreate.bbcode.dropdown', false)) {
        $('#mce_editor_0_toolBar ul').last().append(require('templates').bbcode({
            name: 'dropdown',
            img: 'wcf/icon/wysiwyg/editorResizeM.png',
            title: 'Dropdown'
        }));
    }
    if (storage.get('option.postCreate.bbcode.sevenload', false)) {
        $('#mce_editor_0_toolBar ul').last().append(require('templates').bbcode({
            name: 'sevenload',
            img: 'wcf/icon/wysiwyg/sevenLoadM.png',
            title: 'Sevenload'
        }));
    }
    if (storage.get('option.postCreate.bbcode.clipfish', false)) {
        $('#mce_editor_0_toolBar ul').last().append(require('templates').bbcode({
            name: 'clipfish',
            img: 'wcf/icon/wysiwyg/clipfishM.png',
            title: 'Clipfish'
        }));
    }
    if (storage.get('option.postCreate.bbcode.googlevideo', false)) {
        $('#mce_editor_0_toolBar ul').last().append(require('templates').bbcode({
            name: 'googlevideo',
            img: 'wcf/icon/wysiwyg/googleVideoM.png',
            title: 'Googlevideo'
        }));
    }
    if (storage.get('option.postCreate.bbcode.myspace', false)) {
        $('#mce_editor_0_toolBar ul').last().append(require('templates').bbcode({
            name: 'myspace',
            img: 'wcf/icon/wysiwyg/mySpaceM.png',
            title: 'MySpace'
        }));
    }
    if (storage.get('option.postCreate.bbcode.myvideo', false)) {
        $('#mce_editor_0_toolBar ul').last().append(require('templates').bbcode({
            name: 'myvideo',
            img: 'wcf/icon/wysiwyg/myVideoM.png',
            title: 'MyVideo'
        }));
    }
}