###License: [GPL v3](LICENSE)
___
Breadfish++ nutzt [gulp.js](http://gulpjs.com/) als Build-Tool. Gulp.js automatisiert hier:
* Hinzufügen der Bibliotheken aus `/libraries` (Nur die, die in der `package.json` unter `libraries` angetragen sind. Die reihenfolge wird auch umgesetzt.)
* Hinzufügen der Templates aus `/src/templates` als `ejs` Templates.
* Das compilen von LESS → CSS´.
* Das zusammenführen durch Browserify.
* JS Code Minification durch [UglifyJS](http://lisperator.net/uglifyjs/).
* Das automatische erstellen eines Userscripts.

Das automatische erstellen von den jeweiligen Browser erweiterungen folgt sobald die Basis hier steht.

___
###Ein eigenes Modul hinzufügen:
Irgendwann werde ich dazu nen Wiki EIntrag verfassen, bis dahin muss das beispiel herhalten (`src/modules/option.boards.filter.statistics.js`):
```javascript
/*
Der Name ist theoretisch egal, sollte aber wenn möglich so gehalten werden wie die anderen. Machts einfach übersichtlicher.
*/
//ECMAScript 5 strict mode, siehe https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions_and_function_scope/Strict_mode
"use strict";
//andere Module, auf die dieses Modul zurückgreift. Pfadangaben sind relativ zur Datei.
var $           = require('lib/jquery');
var storage     = require('../storage');
var utils       = require('../utils');
var register    = require("../settings").register;

//Plugin registrieren, damits in den Optionen angezeigt wird und Standard werte für die Option angelegt werden.
register({
    //Unter diesem Namen wird die Option gespeichert. Am besten so nennen wie die Datei.
    'key': 'option.boards.filter.statistics.enabled',

    //Der Name, der in den Optionen angezeigt wird.
    'name': 'Statistik',

    //Unter welchem Tab die Option zu finden ist. Wenn kein tab mit dem Namen existiert wird automatisch ein neuer erstellt.
    'tab': 'Einstellungen',

    //Selbste spiel wie beim Tab, nur eben der Subtab.
    'subtab': 'Forenübersicht',

    //In welche Kategorie (`<fieldset>`) die Option soll.
    'category': 'Filter',

    //Typ der Option. Mögliche werte sind toggle, range oder keyboard.
    'type': 'toggle',

    //Standardwert der Option. Wird gesetzt wenn das Modul das erste mal geladen wird.
    'default': false,

    //Beschreibung der Option.
    'description': 'Entfernt die Infobox auf der Startseite, die die Forenstatistik anzeigt.'
});

//Es wird überprüft ob die option aktiviert ist. storage.get nimmt als ersten paramter den key, und als zweiten einen Standardwert.
//Per utils.isTemplate('tplIndex') wird überprüft, ob wir uns gerade auf der Startseite befinden. Das jeweilige Template findet man als id des body-tags auf der jeweiligen Seite.
if (storage.get('option.boards.filter.statistics.enabled', false) && utils.isTemplate('tplIndex')) {
    //Benutzer hat die option aktiviert und wir befinden uns auf der Startseite, also weg mit der Statistik.
    $('.infoBoxStatistics').remove();
}
```
Wenn da noch irgendwas unklar ist, einfach schauen wie es in einem anderen Modul gelöst wurde, oder mich fragen (Issue, PM).

___
###Lokale Kopie erstellen
Als erstes brauchst du [node.js](http://nodejs.org/). Wie man das installiert steht auf der jeweiligen Homepage.

Dann 
```bash
$ git clone https://github.com/BreadfishPlusPlus/BreadfishPlusPlus.git
```
um eine Lokale kopie zu erhalten, und 
```bash
$ npm install
```
um alle abhängigkeiten zu installieren.

Solltest du [gulp.js](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md#getting-started) noch nciht installiert haben, geht das einfach per
```bash
$ npm install -g gulp
```

___
###DEV-Build erstellen
Per
```bash
$ gulp build-dev
```
Wird ein DEV-Build erstellt. Der unterschied zum normalen ist, dass das userscript nicht minifiziert wird, und dadurch einfacher zu debuggen ist. 

Der Build-Task wird automatisch den Ordner `./.tmp` Erstellen, indem enige Datein, die während des build-prozesses benötigt werden, erstellt werden.

Der Ordner `/userscript` wurd auch automatisch erstellt, dort befindet sich das fertige userscript, `BreadfishPlusPlus.user.js` und `BreadfishPlusPlus.meta.js`.


Alternativ kann man auch nur
```bash
$ gulp
```
ausführen, dann wird der dev-build automatisch erstellt sobald man eine Datei verändert.

___
###HTML Templates nutzen
Einfach eine Datei, z.b `test.html` im Ordner `./src/templates/` erstellen. Gulp.js wird diese automatisch als `ejs` Templates hinzufügen. 

Darauf zugreifen kann man wie folgt. Ein Beispiel:

**meinTemplate.html**
```ejs
<div id="example">Mein Name ist <%= name %></div>
```
**meinScript.js**
```javascript
var compiled = require('templates').meinTemplate({
    "name": "Beispiel"
});
console.log(compiled);
```
**Ausgabe:**
```
<div id="example">Mein Name ist Beispiel</div>
```

___
###LESS/CSS Nutzen
Einfach eine LESS-Datei in `./src/styles/` erstellen. Durch den aufruf von
```javascript
require('./../styles/meineDatei.less');
```
Wird diese dann automatisch dem Header hinzugefügt. Bitte beachten das der Pfad immer relativ zum Script sein muss, in dem sie angegeben wird.