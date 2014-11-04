var $           = require('lib/jquery');
var hljs        = require('lib/highlight');
var storage     = require('../storage');
var utils       = require('../utils');
var register    = require('../settings').register;

register({
    'key': 'option.posts.extension.syntaxhighlightning.enabled',
    'name': 'Syntaxhervorhebung',
    'tab': 'Einstellungen',
    'subtab': 'Beiträge & Nachrichten',
    'category': 'Erweiterungen',
    'type': 'toggle',
    'default': false,
    'description': 'Ersetzt die Standard-Syntaxhervorhebung durch eine verbesserte Hervorhebung.'
});

if (storage.get('option.posts.extension.syntaxhighlightning.enabled', false) && utils.isTemplate('tplThread')) {
    require('../styles/highlightjs.less');
    $('.codeBox').each(function () {
        var $elem = $(this),
            code = $elem.find('.codeLines pre').text(),
            title = $elem.find('.codeLines h3').text();
        if (title === 'C/C++-Quelltext' || title === 'PAWN Quelltext') {
            $elem.find('.codeLines pre').html(hljs.highlight('cpp', code).value);
        } else if (title === 'Cascading Style Sheet') {
            $elem.find('.codeLines pre').html(hljs.highlight('css', code).value);
        } else if (title === 'HTML' || title === 'XML' || title === 'Template-Quelltext') {
            $elem.find('.codeLines pre').html(hljs.highlight('xml', code).value);
        } else if (title === 'Java-Quelltext') {
            $elem.find('.codeLines pre').html(hljs.highlight('java', code).value);
        } else if (title === 'Javascript-Quelltext') {
            $elem.find('.codeLines pre').html(hljs.highlight('javascript', code).value);
        } else if (title === 'MySQL-Abfrage(n)') {
            $elem.find('.codeLines pre').html(hljs.highlight('sql', code).value);
        } else if (title === 'PHP-Quelltext') {
            $elem.find('.codeLines pre').html(hljs.highlight('php', code).value);
        } else {
            $elem.find('.codeLines pre').html(hljs.highlightAuto(code).value);
        }
    });
}