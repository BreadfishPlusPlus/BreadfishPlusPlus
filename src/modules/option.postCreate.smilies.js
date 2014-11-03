var $           = require('lib/jquery');
var _           = require('lib/underscore');
var storage     = require('../storage');
var utils       = require('../utils');
var register    = require('../settings').register;

register({
    'key': 'option.postCreate.smilies.rage',
    'name': 'Rageicons',
    'tab': 'Einstellungen',
    'subtab': 'Beitrag & Nachrichten erstellen',
    'category': 'Smilies',
    'type': 'toggle',
    'default': false,
    'description': 'Fügt dem WYSIWYG-Editor eine neue Kategorie mit Rageicons hinzu.'
});
register({
    'key': 'option.postCreate.smilies.skype',
    'name': 'Skype',
    'tab': 'Einstellungen',
    'subtab': 'Beitrag & Nachrichten erstellen',
    'category': 'Smilies',
    'type': 'toggle',
    'default': false,
    'description': 'Fügt dem WYSIWYG-Editor eine neue Kategorie mit Skype-Smilies hinzu.'
});
register({
    'key': 'option.postCreate.smilies.yolks',
    'name': 'Y o l k s',
    'tab': 'Einstellungen',
    'subtab': 'Beitrag & Nachrichten erstellen',
    'category': 'Smilies',
    'type': 'toggle',
    'default': false,
    'description': 'Fügt dem WYSIWYG-Editor eine neue Kategorie mit Y o l k s-Smilies hinzu.'
});
register({
    'key': 'option.postCreate.smilies.emoji',
    'name': 'Emoji',
    'tab': 'Einstellungen',
    'subtab': 'Beitrag & Nachrichten erstellen',
    'category': 'Smilies',
    'type': 'toggle',
    'default': false,
    'description': 'Fügt dem WYSIWYG-Editor eine neue Kategorie mit Emojicons hinzu.'
});

var loadSmilies = function (smilieData) {
    utils.log.debug('loadSmilies', smilieData);
    var $smileyContainer = $('#smileyContainer'),
        win = utils.getWindow();

    smilieData = _.filter(smilieData, function (category) {
        return storage.get('option.postCreate.smilies.' + category.keyName, false);
    });

    _.each(smilieData, function (category, index) {
        win.smileyCategories.set(index + 2, category.name + ' (' + category.smilies.length + ')');
        category.fullPath = CDNDOMAIN + 'img/smilies' + category.path;
        $smileyContainer.append(require('templates').smileyContainer({
            index: index + 2,
            category: category
        }));
    });

    win.smileyCategorySwitcher.showSmileyCategories();

    if ($('#smiliesTab.activeTabMenu').length === 0) {
        win.smileyCategorySwitcher.hideSmileyCategories();
    }

    $('#tabMenu li a').click(function () {
        if ($(this).parent('li').attr('id') === 'smiliesTab') {
            win.smileyCategorySwitcher.showSmileyCategories();
        } else {
            win.smileyCategorySwitcher.hideSmileyCategories();
        }
    });
};

if (utils.isTemplate(['tplPostAdd', 'tplThreadAdd', 'tplPmNew', 'tplPostEdit'])) {
    if (storage.get('option.postCreate.smilies.rage', false) || storage.get('option.postCreate.smilies.skype', false) ||
        storage.get('option.postCreate.smilies.yolks', false) || storage.get('option.postCreate.smilies.emoji', false)) {
        $.getJSON('https://api.github.com/repos/BreadfishPlusPlus/cdn.breadfishplusplus.eu/contents/img/smilies/smilies.json').done(function (data) {
            loadSmilies(JSON.parse(window.atob(data.content)));
        }).fail(function (jqXHR) {
            utils.log.error('Konnte Smilies nicht abrufen.', jqXHR.status, jqXHR.statusText);
        });
    }
}