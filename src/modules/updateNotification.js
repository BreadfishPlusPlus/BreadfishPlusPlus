var storage         = require('../storage');
var register        = require('../settings').register;
var notification    = require('../ui/notification');
var utils           = require('../utils');

/* 
 * @copyright Jon Papaioannou 
 * @source https://gist.github.com/TheDistantSea/8021359
 */
var versionCompare = function(v1, v2) {
    var v1parts = v1.split('.'),
        v2parts = v2.split('.');
 
    var isValidPart = function(x) {
        return /^\d+[A-Za-z]*$/.test(x);
    };
 
    if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
        return NaN;
    }
 
    while (v1parts.length < v2parts.length) {
        v1parts.push('0');
    }
    while (v2parts.length < v1parts.length) {
        v2parts.push('0');
    }
 
    for (var i = 0; i < v1parts.length; ++i) {
        if (v2parts.length === i) {
            return 1;
        }
 
        if (v1parts[i] === v2parts[i]) {
            continue;
        }
        else if (v1parts[i] > v2parts[i]) {
            return 1;
        }
        else {
            return -1;
        }
    }
 
    if (v1parts.length !== v2parts.length) {
        return -1;
    }
 
    return 0;
};

var onUpdateClick = function (nData, close) {
    utils.getWindow().open('https://github.com/BreadfishPlusPlus/BreadfishPlusPlus/releases', '_blank');
    close();
};

register({
    'key': 'version',
    'type': 'invis',
    'default': '0.0.0'
});

if (versionCompare(storage.get('version'), VERSION) === -1) {
    storage.set('version', VERSION);
    notification.create({
        title: 'Breadfish++ wurde aktualisiert!',
        message: 'Breadfish++ wurde auf version ' + VERSION + ' aktualisiert!<br>Klicke hier um zu sehen was verändert wurde.',
        icon: 'http://forum.sa-mp.de/wcf/icon/packageUpdateM.png',
        type: 'success',
        hidedelay: null,
        onClick: onUpdateClick
    });
}