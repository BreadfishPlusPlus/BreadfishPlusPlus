![](http://i.imgur.com/XuJvTm2.jpg)

### Allgemeine Änderungen
* Alles wurde soweit auf das neue Forum angepasst.
* Link zur offiziellen Wobsite in den B++ Einstellungen öffnet nun in einem neuen Tab.
* Sollte ein Modul nicht richtig laden werden die anderen davon nicht mehr beeinflusst. Zudem gibts ne Informative Debug/Fehler Nachricht.
* Alle Module wurden umgeschrieben auf ES6 Code. Das macht die Codebase schön und den Coder glücklich.

### Neue Module
##### `Themenübersicht` → `Filter` → `Teilen entfernen`
* Entfernt die Teilen-Optionen aus den Themen.

### Modul spezifische Änderungen
##### `Forenübersicht` → `Erweiterungen` → `"Die letzten 10 Beiträge"-Aktualisierung`
* Nachricht wird nun auf der Rechten Seite angezeigt
* Wurde die Anzahl der angezeigten Beiträge durch die "Die letzten X Beiträge"-Option verändert, so wird die Anzahl nun auch nach dem Aktualisieren angepasst.
* Es wird nun eine andere Meldung angezeigt wenn die Beiträge gerade aktualisiert werden. Dadurch sollte es nicht mehr zu Negativen Sekunden kommen (ausser dem sieht es besser aus :smile_cat:)

##### `Forenübersicht` → `Erweiterungen` → `Teamspeak 3 Anzeige`
* Anzeige aktualisiert nun deutlich schneller (~0.2 Sekunden schneller pro gefundener Benutzer auf dem Teamspeak)

##### `Forenübersicht` → `Filter` → `Geburtstage`
* Wurde entfernt, da die Infobox nicht mehr existiert.

##### `Forenübersicht` → `Filter` → `Statistik`
* Entfernt nun auch die Statistik in Unterforen.

### Entfernte Module
##### `Allgemeine Einstellungen` → `Filter` → `Geburtstage`
* Existiert nicht mehr im Forum.

##### `Allgemeine Einstellungen` → `Fehlerbehebungen` → `Expander`
* Ist nicht mehr Fehlerhaft bzw BBCode wurde durch den Umstieg gewechselt.
