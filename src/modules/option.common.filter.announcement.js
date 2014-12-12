var $           = require('lib/jquery');
var storage     = require('../storage');
var register    = require('../settings').register;

register({
    'key': 'option.common.filter.announcement.enabled',
    'name': 'Ankündigungen',
    'tab': 'Einstellungen',
    'subtab': 'Allgemeine Einstellungen',
    'category': 'Filter',
    'type': 'toggle',
    'default': false,
    'description': 'Aktiviert die Option, permanente Anküdigungen individuell auszublenden.'
});
register({
    'key': 'option.common.filter.announcement.suppressed',
    'type': 'invis',
    'default': [],
});

if (storage.get('option.common.filter.announcement.enabled', false)) {
    var $globalAnnouncement = $('#globalAnnouncement'),
        text = $globalAnnouncement.text().trim(),
        suppressedGlobalAnnouncement = storage.get('option.common.filter.announcement.suppressed', []);

    if (suppressedGlobalAnnouncement.indexOf(text) !== -1) {
        $globalAnnouncement.hide();
    } else {
        $globalAnnouncement.addClass('deletable');
        $globalAnnouncement.prepend('<a href="#" style="float:right;" class="close deleteButton"><img src="wcf/icon/closeS.png" alt="" title="Ankündigung ausblenden"></a>');

        $globalAnnouncement.find('.close').click(function (event) {
            event.preventDefault();
            suppressedGlobalAnnouncement.push(text);
            storage.set('option.common.filter.announcement.suppressed', suppressedGlobalAnnouncement);
            $globalAnnouncement.fadeOut();
        });
    }
}
