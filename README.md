###License: [GPL v3](LICENSE)
___
Breadfish++ nutzt [Grunt](http://gruntjs.com/) als Build-Tool. Grunt automatisiert hier:
* Das automatische setzen von CSS-Prefixen durch [Autoprefixer](https://github.com/ai/autoprefixer).
* JS Code Minification durch [UglifyJS](http://lisperator.net/uglifyjs/).
* Das Erstellen eines [Browserify](http://browserify.org/) bundles, so das am ende eine einzige Datei herauskommt.
* Das generieren von Template files anhand der in `src/templates/` liegenden HTML-Datein.
* Das compilen von LESS → CSS, und das erstellen der `src/styles/index.js` Datei, in der die Strings verfügbar sind.
* Das automatische erstellen eines Userscripts.

___
###Lokale Kopie erstellen
Als erstes brauchst du [node.js](http://nodejs.org/) und [Grunt](http://gruntjs.com/getting-started). Wie man das installiert steht auf der jeweiligen Homepage.

Dann 
```bash
$ git clone https://github.com/BreadfishPlusPlus/BreadfishPlusPlus.git
```
um eine Lokale kopie zu erhalten, und 
```bash
$ npm install
```
um alle abhängigkeiten zu installieren.

___
###DEV-Build erstellen
Per
```bash
$ grunt build-dev
```
Wird ein DEV-Build erstellt. Der unterschied zum normalen ist, dass das userscript nicht minifiziert wird, und dadurch einfacher zu debuggen ist. 

Der Build-Task wird automatisch den Ordner `./.tmp` Erstellen, indem die generierten CSS Datein sind, sowie die durch Browserify erstelle Datei.

Der Ordner `./userscript` wurd auch automatisch erstellt, dort befindet sich das fertige userscript, `BreadfishPlusPlus.user.js` und `BreadfishPlusPlus.meta.js`.


Alternativ kann man auch nur
```bash
$ grunt
```
ausführen, dann wird der dev-build automatisch erstellt sobald man eine Datei verändert.

___
###HTML Templates nutzen
Einfach eine Datei, z.b `test.html` im Ordner `./src/templates/` erstellen. Grunt wird diese automatisch, zusammen mit den anderen HTML Datein als [Underscore-Template](http://underscorejs.org/#template) in die Datei `./src/templates/index.js` packen. Der zugriff darauf folgt dann per modul. Ein Beispiel findet man [hier](https://gist.github.com/maddin77/c97d7c2f09d154302564).

___
###CSS Nutzen
Einfach eine LESS-Datei in `./src/styles/` erstellen, und dann per `utils.addStyle('NAME_DER_LESS_DATEI')` den CSS code ausführen.