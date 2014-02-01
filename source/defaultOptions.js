var DefaultOptions = [
    {
        'name': 'Allgemeine Einstellungen',
        'key': 'common',
        'panels': {
            'Erweiterungen': [
                {
                    'name': 'Alternative PN Benachrichtigung',
                    'key': 'option_common_extension_privateMessageNotification',
                    'type': 'toggle',
                    'desc': 'Versteckt den Hinweis auf neue Private Nachrichten, und zeigt ihn statdessen am unteren rechten Bildschirmrand an (FF) bzw ersetzt ihn durch eine Desktopbenachrichtigung (Chrome). Es wird in regelmäßigen abständen überprüft ob du eine neue PN hast, und die Benachrichtigung wird autmatisch aktualisiert.'
                },
                {
                    'name': 'Asynchrone Datenübertragung <b>(TODO)</b>',
                    'key': 'option_common_extension_ajaxify',
                    'type': 'toggle',
                    'desc': 'Lässt verschiedene Operationen durch <a href="http://de.wikipedia.org/wiki/Ajax_(Programmierung)">Ajax</a> im Hintergrund ausführen anstatt die Seite neu zu laden.'
                },
                {
                    'name': 'Alternative Tooltips',
                    'key': 'option_common_extension_tooltip',
                    'type': 'toggle',
                    'desc': 'Ersetzt die Standard Browser Tooltips durch <abbr title="Ich bin ein Tooltip \\o/">eigene</abbr>'
                },
                {
                    'name': 'Spitznamen für Benutzer',
                    'key': 'option_common_extension_nicknames',
                    'type': 'toggle',
                    'desc': 'Fügt im Benutzerprofil eine Option hinzu, die es ermöglicht dem benutzer einen eigenen Spitznamen zu geben. Dieser Spitzname wird dann, anstatt des eigentlichen Benutzernamens, in Forum angezeigt.'
                },
                {
                    'name': 'Mitglieder Notizen',
                    'key': 'option_common_extension_nicknames',
                    'type': 'toggle',
                    'desc': 'Bietet die möglichkeit, jedem Benutzer eine eigene Notiz hinzuzufügen. <span style="color:#FF4136;font-weight:bold;">Deine Notizen werden auf deinem Computer gespeichert und können nicht von dritten eingesehen werden.</span>'
                }
            ],
            'Fehlerbehebungen': [
                {
                    'name': 'Header-Fix',
                    'key': 'option_common_bugfix_headerFix',
                    'type': 'toggle',
                    'desc': 'Behebt den Fehler im Header-Fix Stil, bei dem die Breadcrumbs verschwinden. Mehr Informationen zu diesem Fehler findest du hier: <a target="_blank" href="http://sa-mp.de/B++/p1643494-/">Header Fix buggt</a>.'
                },
                {
                    'name': 'Expander',
                    'key': 'option_common_bugfix_expander',
                    'type': 'toggle',
                    'desc': 'Behebt den Expander-Bug, der auftritt wenn ein Benutzer mehrere Expander auf einer Seite nutzt. Mehr Informationen zu diesem Fehler findest du hier: <a target="_blank" href="http://sa-mp.de/B++/p1701085-/">Spoiler</a>.'
                },
                {
                    'name': 'Tabmenu',
                    'key': 'option_common_bugfix_tabmenu',
                    'type': 'toggle',
                    'desc': 'Behebt den Fehler im Tumek Design, bei dem die Schrift im Tabmenu nur schwer erkennbar ist. Mehr Informationen zu diesem Fehler findest du hier: <a target="_blank" href="http://sa-mp.de/B++/p1662628-/">Manglhafte Farbwahl beim neuen Design</a>.'
                },
                {
                    'name': 'Bildverkleinerung',
                    'key': 'option_common_bugfix_imageResize',
                    'type': 'toggle',
                    'desc': 'Passt Bilder, die zu groß sind und deshalb vom WBB verkleiner wurde, auf die exakte Breite des Beitrags an.'
                }
            ],
            'Filter': [
                {
                    'name': 'Ankündigungen',
                    'key': 'option_common_filter_announce',
                    'type': 'toggle',
                    'desc': 'Blendet permanente Ankündigungen aus.'
                }
            ]
        }
    },
    {
        'name': 'Forenübersicht',
        'key': 'boards',
        'panels': {
            'Erweiterungen': [
                {
                    'name': 'Die letzten X Beiträge',
                    'key': 'option_boards_extension_lastPosts',
                    'type': 'range',
                    'range': [1, 10],
                    'desc': 'Passt die Anzahl der Letzten X Beiträge Box auf der Startseite an.'
                },
                {
                    'name': 'IRC Shoutbox',
                    'key': 'option_boards_extension_ircShoutbox',
                    'type': 'toggle',
                    'desc': 'Zeigt eine Shoutbox auf der Startseite an, mit der du dich direkt mit unserem Chat Verbinden kannst. Mehr Informationen zu unserem Chat findest du hier: <a href="http://sa-mp.de/B++/p924945-/">IRC-Chat</a>.'
                }
            ],
            'Fehlerbehebungen': [
                {
                    'name': 'Suche Icon',
                    'key': 'option_boards_extension_searchIcon',
                    'type': 'toggle',
                    'desc': 'Zeigt das Icon für die Suche im Footer wieder richtig an.'
                }
            ],
            'Filter': [
                {
                    'name': 'Zur Zeit sind X Benutzer online',
                    'key': 'option_boards_filter_usersOnline',
                    'type': 'toggle',
                    'desc': 'Entfernt die Infobox auf der Startseite, die anzeigt wer gerade Online ist.'
                },
                {
                    'name': 'Statistik',
                    'key': 'option_boards_filter_statistics',
                    'type': 'toggle',
                    'desc': 'Entfernt die Infobox auf der Startseite, die die Forenstatistik anzeigt.'
                },
                {
                    'name': 'Geburtstage',
                    'key': 'option_boards_filter_birthdays',
                    'type': 'toggle',
                    'desc': 'Entfernt die Infobox auf der Startseite, die anzeigt wer heute geburtstag hat.'
                }
            ]
        }
    },
    {
        'name': 'Themenübersicht',
        'key': 'threads',
        'panels': {
            'Erweiterungen': [
                {
                    'name': 'Ankündigungen und wichtige Themen',
                    'key': 'option_threads_extension_sticky',
                    'type': 'toggle',
                    'desc': 'Trennt Ankündigungen und wichtige Themen von einander.'
                }
            ],
            'Filter': [
                {
                    'name': 'Gelöschte Themen',
                    'key': 'option_threads_filter_deleted',
                    'type': 'toggle',
                    'desc': 'Blendet gelöschte Themen komplett aus.'
                }
            ]
        }
    },
    {
        'name': 'Beiträge & Nachrichten',
        'key': 'posts',
        'panels': {
            'Erweiterungen': [
                {
                    'name': 'Kurz-URL',
                    'key': 'option_posts_extension_shorturl',
                    'type': 'toggle',
                    'desc': 'Zeigt in der Beitragsansicht zu jedem Beitrag einen Kurzen Link (~25 Zeichen) an, der direkt zum Beitrag führt.'
                },
                {
                    'name': 'Youtube Vorschau',
                    'key': 'option_posts_extension_youtubePreview',
                    'type': 'toggle',
                    'desc': 'Ersetzt Youtube-Videos durch eine Vorschau-Box mit Informationen zu dem Video.'
                },
                {
                    'name': 'Danksagungen anzeigen',
                    'key': 'option_posts_extension_thanks',
                    'type': 'toggle',
                    'desc': 'Zeigt die Anzahl der Danksagungen, die ein Benutzer bekommen hat, in Beiträgen an.'
                },
                {
                    'name': 'Höhenbegrenzung für Signaturen',
                    'key': 'option_posts_extension_signatureHeight',
                    'type': 'toggle',
                    'desc': 'Entfernt die Scrollbars aus den Signaturen und zeigt sie in voller Höhe an.'
                },
                {
                    'name': 'Bilderzoom',
                    'key': 'option_posts_extension_imageResize',
                    'type': 'toggle',
                    'desc': 'Erlaubt es, die größe von Bildern in Signaturen und Posts per Drag & Drop zu ändern.'
                }
            ],
            'Filter': [
                {
                    'name': 'Youtube Videos',
                    'key': 'option_posts_filter_youtube',
                    'type': 'toggle',
                    'desc': 'Entfernt Videos aus Beiträgen und Signaturen, und ersetzt sie statdessen mit dem Link zum jeweiligen Video.'
                },
                {
                    'name': 'Gelöschte Beiträge',
                    'key': 'option_posts_filter_deleted',
                    'type': 'toggle',
                    'desc': 'Blendet gelöschte Beiträge komplett aus.'
                },
                {
                    'name': 'Bedankomat',
                    'key': 'option_posts_filter_thanko',
                    'type': 'toggle',
                    'desc': 'Blendet den bedankomat in Beiträgen aus.'
                },
                {
                    'name': 'Ignorierte Benutzer',
                    'key': 'option_posts_filter_ignored',
                    'type': 'toggle',
                    'desc': 'Blendet Beiträge von ignorierten Benutzern ganz aus.'
                },
                {
                    'name': 'Hilfreichste Antwort',
                    'key': 'option_posts_filter_bestans',
                    'type': 'toggle',
                    'desc': 'Entfernt die markierung der Hilfreichsten Antwort.'
                },
                {
                    'name': 'Beitragscounter',
                    'key': 'option_posts_filter_postcount',
                    'type': 'toggle',
                    'desc': 'Blendet den Beitragscounter aus.'
                },
                {
                    'name': 'Benutzertitel',
                    'key': 'option_posts_filter_usertitle',
                    'type': 'toggle',
                    'desc': 'Blendet den Benutzertitel aus.'
                },
                {
                    'name': 'Benutzerrang',
                    'key': 'option_posts_filter_userrank',
                    'type': 'toggle',
                    'desc': 'Blendet den Benutzerrang aus.'
                },
                {
                    'name': 'Zusätzlicher Benutzerrang',
                    'key': 'option_posts_filter_additionalUserrank',
                    'type': 'toggle',
                    'desc': 'Blendet den zusätzlichen Benutzerrang (falls vorhanden) aus.'
                },
                {
                    'name': 'Registrierungsdatum',
                    'key': 'option_posts_filter_regdate',
                    'type': 'toggle',
                    'desc': 'Blendet das Registrierungsdatum aus.'
                },
                {
                    'name': 'Geschlecht',
                    'key': 'option_posts_filter_gender',
                    'type': 'toggle',
                    'desc': 'Blendet das Geschlecht aus.'
                },
                {
                    'name': 'XBL Gamertag',
                    'key': 'option_posts_filter_xblGamertag',
                    'type': 'toggle',
                    'desc': 'Blendet den XBL Gamertag aus.'
                },
                {
                    'name': 'PSN ID',
                    'key': 'option_posts_filter_psnid',
                    'type': 'toggle',
                    'desc': 'Blendet die PSN ID aus.'
                },
                {
                    'name': 'Steam',
                    'key': 'option_posts_filter_steam',
                    'type': 'toggle',
                    'desc': 'Blendet den Steamnamen aus.'
                },
                {
                    'name': 'Origin',
                    'key': 'option_posts_filter_origin',
                    'type': 'toggle',
                    'desc': 'Blendet den Originnamen aus.'
                },
                {
                    'name': 'Website',
                    'key': 'option_posts_filter_website',
                    'type': 'toggle',
                    'desc': 'Blendet die Website aus.'
                },
                {
                    'name': 'ICQ',
                    'key': 'option_posts_filter_icq',
                    'type': 'toggle',
                    'desc': 'Blendet die Nummer des ICQ-Accounts aus.'
                },
                {
                    'name': 'Windows Live',
                    'key': 'option_posts_filter_msn',
                    'type': 'toggle',
                    'desc': 'Blendet den Windows Live Messenger Namen aus.'
                },
                {
                    'name': 'Skype',
                    'key': 'option_posts_filter_skype',
                    'type': 'toggle',
                    'desc': 'Blendet den Skype-Namen aus.'
                }
            ]
        }
    },
    {
        'name': 'Beitrag/Nachrichten erstellen',
        'key': 'postCreate',
        'panels': {
            'Erweiterungen': [
                {
                    'name': 'Benutzer-Autovervollständigung',
                    'key': 'option_postCreate_extension_nickcomplete',
                    'type': 'toggle',
                    'desc': 'Wenn du im post z.b "@madd" schreibst, erscheint, ähnlich wie bei der Mitgliedersuche, eine Auswahlliste mit Benutzernamen im Forum die auf die bereits getippten anfangsbuchstaben passen.'
                }
            ],
            'Smilies': [
                {
                    'name': 'My Little Pony',
                    'key': 'option_postCreate_smilies_mlp',
                    'type': 'toggle',
                    'desc': 'Fügt dem WYSIWYG-Editor eine neue Kategorie mit MLP Smilies hinzu.'
                },
                {
                    'name': 'Rageicons',
                    'key': 'option_postCreate_smilies_rage',
                    'type': 'toggle',
                    'desc': 'Fügt dem WYSIWYG-Editor eine neue Kategorie mit Rageicons hinzu.'
                },
                {
                    'name': 'Kolobok (ICQ)',
                    'key': 'option_postCreate_smilies_icq',
                    'type': 'toggle',
                    'desc': 'Fügt dem WYSIWYG-Editor eine neue Kategorie mit Kolobok Smilies hinzu.'
                },
                {
                    'name': 'Skype',
                    'key': 'option_postCreate_smilies_skype',
                    'type': 'toggle',
                    'desc': 'Fügt dem WYSIWYG-Editor eine neue Kategorie mit Skype Smilies hinzu.'
                },
                {
                    'name': 'Y o l k s',
                    'key': 'option_postCreate_smilies_yolks',
                    'type': 'toggle',
                    'desc': 'Fügt dem WYSIWYG-Editor eine neue Kategorie mit Y o l k s Smilies hinzu.'
                },
                {
                    'name': 'Emojicons',
                    'key': 'option_postCreate_smilies_emoji',
                    'type': 'toggle',
                    'desc': 'Fügt dem WYSIWYG-Editor eine neue Kategorie mit Emojicons hinzu.'
                }
            ],
            'BBCodes': [
                {
                    'name': 'E-Mail',
                    'key': 'option_postCreate_bbcode_email',
                    'type': 'toggle',
                    'desc': 'Fügt dem WYSIWYG-Editor das Icon für den E-Mail BBCode hinzu.'
                },
                {
                    'name': 'Text tiefstellen',
                    'key': 'option_postCreate_bbcode_sub',
                    'type': 'toggle',
                    'desc': 'Fügt dem WYSIWYG-Editor das Icon für den Text tiefstellen BBCode hinzu.'
                },
                {
                    'name': 'Text hochstellen',
                    'key': 'option_postCreate_bbcode_sup',
                    'type': 'toggle',
                    'desc': 'Fügt dem WYSIWYG-Editor das Icon für den Text hochstellen BBCode hinzu.'
                },
                {
                    'name': 'PHP-Quelltext',
                    'key': 'option_postCreate_bbcode_php',
                    'type': 'toggle',
                    'desc': 'Fügt dem WYSIWYG-Editor das Icon für den HTML-Quelltext BBCode hinzu.'
                },
                {
                    'name': 'Java-Quelltext',
                    'key': 'option_postCreate_bbcode_java',
                    'type': 'toggle',
                    'desc': 'Fügt dem WYSIWYG-Editor das Icon für den Java-Quelltext BBCode hinzu.'
                },
                {
                    'name': 'Cascading Style Sheet',
                    'key': 'option_postCreate_bbcode_css',
                    'type': 'toggle',
                    'desc': 'Fügt dem WYSIWYG-Editor das Icon für den Cascading Style Sheet BBCode hinzu.'
                },
                {
                    'name': 'HTML',
                    'key': 'option_postCreate_bbcode_html',
                    'type': 'toggle',
                    'desc': 'Fügt dem WYSIWYG-Editor das Icon für den HTML BBCode hinzu.'
                },
                {
                    'name': 'XML',
                    'key': 'option_postCreate_bbcode_xml',
                    'type': 'toggle',
                    'desc': 'Fügt dem WYSIWYG-Editor das Icon für den XML BBCode hinzu.'
                },
                {
                    'name': 'Javascript-Quelltext',
                    'key': 'option_postCreate_bbcode_js',
                    'type': 'toggle',
                    'desc': 'Fügt dem WYSIWYG-Editor das Icon für den Javascript-Quelltext BBCode hinzu.'
                },
                {
                    'name': 'C/C++-Quelltext',
                    'key': 'option_postCreate_bbcode_c',
                    'type': 'toggle',
                    'desc': 'Fügt dem WYSIWYG-Editor das Icon für den C/C++-Quelltext BBCode hinzu.'
                },
                {
                    'name': 'Dropbown',
                    'key': 'option_postCreate_bbcode_dropdown',
                    'type': 'toggle',
                    'desc': 'Fügt dem WYSIWYG-Editor das Icon für den Dropbown BBCode hinzu.'
                },
                {
                    'name': 'Sevenload',
                    'key': 'option_postCreate_bbcode_sevenload',
                    'type': 'toggle',
                    'desc': 'Fügt dem WYSIWYG-Editor das Icon für den Sevenload BBCode hinzu.'
                },
                {
                    'name': 'Clipfish',
                    'key': 'option_postCreate_bbcode_clipfish',
                    'type': 'toggle',
                    'desc': 'Fügt dem WYSIWYG-Editor das Icon für den Clipfish BBCode hinzu.'
                },
                {
                    'name': 'Googlevideo',
                    'key': 'option_postCreate_bbcode_googlevideo',
                    'type': 'toggle',
                    'desc': 'Fügt dem WYSIWYG-Editor das Icon für den Googlevideo BBCode hinzu.'
                },
                {
                    'name': 'MySpace',
                    'key': 'option_postCreate_bbcode_myspace',
                    'type': 'toggle',
                    'desc': 'Fügt dem WYSIWYG-Editor das Icon für den MySpace BBCode hinzu.'
                },
                {
                    'name': 'MyVideo',
                    'key': 'option_postCreate_bbcode_myvideo',
                    'type': 'toggle',
                    'desc': 'Fügt dem WYSIWYG-Editor das Icon für den MyVideo BBCode hinzu.'
                }
            ]
        }
    },
    {
        'name': 'Benutzerprofil',
        'key': 'profile',
        'panels': {
            'Filter': [
                {
                    'name': 'Danksagungen',
                    'key': 'option_profile_filter_thanks',
                    'type': 'toggle',
                    'desc': 'Blendet die Danksagungen in Benutzerprofilen aus.'
                },
                {
                    'name': 'Beitragscounter',
                    'key': 'option_profile_filter_postcount',
                    'type': 'toggle',
                    'desc': 'Blendet den Beitragscounter aus.'
                },
                {
                    'name': 'Benutzertitel',
                    'key': 'option_profile_filter_usertitle',
                    'type': 'toggle',
                    'desc': 'Blendet den Benutzertitel aus.'
                },
                {
                    'name': 'Benutzerrang',
                    'key': 'option_profile_filter_userrank',
                    'type': 'toggle',
                    'desc': 'Blendet den Benutzerrang aus.'
                },
                {
                    'name': 'Zusätzlicher Benutzerrang',
                    'key': 'option_profile_filter_additionalUserrank',
                    'type': 'toggle',
                    'desc': 'Blendet den zusätzlichen Benutzerrang (falls vorhanden) aus.'
                },
                {
                    'name': 'Geschlecht',
                    'key': 'option_profile_filter_gender',
                    'type': 'toggle',
                    'desc': 'Blendet das Geschlecht aus.'
                },
                {
                    'name': 'Registrierungsdatum',
                    'key': 'option_profile_filter_regdate',
                    'type': 'toggle',
                    'desc': 'Blendet das Registrierungsdatum aus.'
                },
                {
                    'name': 'Über Mich',
                    'key': 'option_profile_filter_aboutMe',
                    'type': 'toggle',
                    'desc': 'Blendet den "Über mich"-Block aus.'
                },
                {
                    'name': 'Geburtstag',
                    'key': 'option_profile_filter_birthday',
                    'type': 'toggle',
                    'desc': 'Blendet den Geburtstag aus.'
                },
                {
                    'name': 'Wohnort',
                    'key': 'option_profile_filter_location',
                    'type': 'toggle',
                    'desc': 'Blendet den Wohnort aus.'
                },
                {
                    'name': 'Beruf',
                    'key': 'option_profile_filter_occupation',
                    'type': 'toggle',
                    'desc': 'Blendet den Beruf aus.'
                },
                {
                    'name': 'Hobbys',
                    'key': 'option_profile_filter_hobbys',
                    'type': 'toggle',
                    'desc': 'Blendet die Hobbys aus.'
                },
                {
                    'name': 'Teamspeak UID',
                    'key': 'option_profile_filter_tsuid',
                    'type': 'toggle',
                    'desc': 'Blendet die Teamspeak UID aus.'
                },
                {
                    'name': 'XBL Gamertag',
                    'key': 'option_profile_filter_xblGamertag',
                    'type': 'toggle',
                    'desc': 'Blendet den XBL Gamertag aus.'
                },
                {
                    'name': 'PSN ID',
                    'key': 'option_profile_filter_psnid',
                    'type': 'toggle',
                    'desc': 'Blendet die PSN ID aus.'
                },
                {
                    'name': 'Steam',
                    'key': 'option_profile_filter_steam',
                    'type': 'toggle',
                    'desc': 'Blendet den Steam-Namen aus.'
                },
                {
                    'name': 'Origin',
                    'key': 'option_profile_filter_origin',
                    'type': 'toggle',
                    'desc': 'Blendet den Origin-Namen aus.'
                },
                {
                    'name': 'Website',
                    'key': 'option_profile_filter_website',
                    'type': 'toggle',
                    'desc': 'Blendet die Website aus.'
                },
                {
                    'name': 'ICQ',
                    'key': 'option_profile_filter_icq',
                    'type': 'toggle',
                    'desc': 'Blendet die Nummer des ICQ-Accounts aus.'
                },
                {
                    'name': 'Windows Live',
                    'key': 'option_profile_filter_msn',
                    'type': 'toggle',
                    'desc': 'Blendet den Windows Live Messenger Namen aus.'
                },
                {
                    'name': 'Skype',
                    'key': 'option_profile_filter_skype',
                    'type': 'toggle',
                    'desc': 'Blendet den Skype-Namen aus.'
                }
            ]
        }
    },
    {
        'name': 'Tastaturnavigation',
        'key': 'navigation',
        'panels': {
            'null': [
                {
                    'name': 'Vorheriger Post',
                    'key': 'option_keyboard_prev_post',
                    'type': 'keyboard',
                    'desc': 'Belege eine Taste mit der Funktion zum vorherigen Beitrags zu scrollen.'
                },
                {
                    'name': 'Nächster Post',
                    'key': 'option_keyboard_next_post',
                    'type': 'keyboard',
                    'desc': 'Belege eine Taste mit der Funktion zum nächsten Beitrags zu scrollen.'
                },
                {
                    'name': 'Vorherige Seite',
                    'key': 'option_keyboard_prev_page',
                    'type': 'keyboard',
                    'desc': 'Belege eine Taste mit der Funktion zur vorherigen Seite zu scrollen.'
                },
                {
                    'name': 'Nächste Seite',
                    'key': 'option_keyboard_next_page',
                    'type': 'keyboard',
                    'desc': 'Belege eine Taste mit der Funktion zur nächsten Seite zu scrollen.'
                }
            ]
        }
    }
];