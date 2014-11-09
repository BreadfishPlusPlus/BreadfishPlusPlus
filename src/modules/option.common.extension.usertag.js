/*var register    = require('../settings').register;
var storage     = require('../storage');
var utils       = require('../utils');
var $           = require('lib/jquery');

register({
    'key': 'option.common.extension.usertag.enabled',
    'name': 'Usertags aktivieren',
    'tab': 'Einstellungen',
    'subtab': 'Allgemeine Einstellungen',
    'category': 'Erweiterungen',
    'type': 'toggle',
    'default': false,
    'description': 'Fügt in Themen die Möglichkeit hinzu einem Benutzer einen bestimmten Tag zuzuweisen.'
});

var setupTags = function () {
    $('.message:not(.quickReply):not(.deleted)').each(function () {
        var $elem = $(this),
            userID = parseInt(utils.getParameterByName('userID', $elem.find('.messageAuthor .userName a').attr('href')), 10);
        $elem.find('.messageSidebar').css('position', 'relative').append(require('templates').usertag({
            userID: userID
        }));
    });
};

if (storage.get('option.common.extension.usertag.enabled', false)) {
    if (utils.isTemplate('tplThread')) {
        require('./../styles/usertag.less');
        setupTags();
    }
}*/