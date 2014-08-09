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