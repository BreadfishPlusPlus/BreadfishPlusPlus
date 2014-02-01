// ==UserScript==
// @name            Breadfish++
// @author          Martin Rump <admin@maddin.cc>
// @version         1.6.1
// @namespace       http://maddin.cc
// @include         *://forum.sa-mp.de/*
// @exclude         *://forum.sa-mp.de/acp/*
// @require         https://code.jquery.com/jquery-1.11.0.min.js
// @grant           GM_getValue
// @grant           GM_setValue
// @grant           GM_addStyle
// @grant           GM_xmlhttpRequest
// @grant           GM_listValues
// @grant           GM_log
// @grant           GM_notification
// @grant           GM_openInTab
// @grant           GM_info
// @noframes        true
// @downloadURL     https://raw.github.com/maddin77/BreadfishPlusPlus/master/dist/BreadfishPlusPlus.user.js
// @updateURL       https://raw.github.com/maddin77/BreadfishPlusPlus/master/dist/BreadfishPlusPlus.meta.js
// ==/UserScript==
var Template = { html: {}, css: {} };
Template.html['ircShoutbox'] = "<div class=\"border titleBarPanel\" id=\"ircShoutbox\">\n<div class=\"containerHead\">\n<div class=\"containerIcon\">\n<a href=\"#\"><img src=\"{icon}\" alt=\"\" id=\"ircShoutboxIframeImage\"></a>\n</div>\n<div class=\"containerContent\">\n<img alt=\"\" src=\"data:image/png;base64,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\" /> IRC-Shoutbox | <a href=\"http://sa-mp.de/BES/p924945-/\">Regeln & Informationen</a>\n</div>\n</div>\n</div>";
Template.html['nickCompletionList'] = "<div class=\"popupMenu pageMenu\" id=\"nickCompletionList\">\n<ul></ul>\n</div>";
Template.html['optionKeyboard'] = "<div class=\"formElement\">\n<div class=\"formFieldLabel\">\n<label for=\"{key}\">{name}</label>\n</div>\n<div class=\"formField\">\n<input type=\"button\" id=\"{key}\" name=\"{key}\" value=\"{value}\">\n</div>\n<div class=\"formFieldDesc\"><p>{desc}</p></div>\n</div>";
Template.html['optionNicknames'] = "<div id=\"nicknames\" class=\"container-1 bpp_option_category\">\n<div class=\"contentBox\">\n<h3 class=\"subHeadline\">{count} Spitznamen</h3>\n{alert}\n<div class=\"border\">\n<table class=\"tableList\">\n<thead>\n<tr class=\"tableHead\">\n<th><div><span class=\"emptyHead\">Benutzername</span></div></th>\n<th><div><span class=\"emptyHead\">Spitzname</span></div></th>\n</tr>\n</thead>\n<tbody>{body}</tbody>\n</table>\n</div>\n</div>\n</div>";
Template.html['optionRange'] = "<div class=\"formElement\">\n<div class=\"formFieldLabel\">\n<label for=\"{key}\">{name}</label>\n</div>\n<div class=\"formField\">\n<input type=\"range\" id=\"{key}\" name=\"{key}\" min=\"{min}\" max=\"{max}\" value=\"{value}\">\n<span class=\"indicator\">{value}</span>\n</div>\n<div class=\"formFieldDesc\"><p>{desc}</p></div>\n</div>";
Template.html['optionToggle'] = "<div class=\"formCheckBox formElement\">\n<div class=\"formField\">\n<label for\"{key}\"><input type=\"checkbox\" id=\"{key}\" name=\"{key}\" {checked}> {name}</label>\n</div>\n<div class=\"formFieldDesc\"><p>{desc}</p></div>\n</div>";
Template.html['optionUsernotes'] = "<div id=\"usernotes\" class=\"container-1 bpp_option_category\">\n<div class=\"contentBox\">\n<h3 class=\"subHeadline\">{count} Benutzernotizen</h3>\n{alert}\n<div class=\"border\">\n<table class=\"tableList\">\n<thead>\n<tr class=\"tableHead\">\n<th><div><span class=\"emptyHead\">Benutzername</span></div></th>\n<th><div><span class=\"emptyHead\">Notiz</span></div></th>\n</tr>\n</thead>\n<tbody>{body}</tbody>\n</table>\n</div>\n</div>\n</div>";
Template.html['youtubePreview'] = "<div class=\"bpp_youtube_preview\">\n<div class=\"bpp_youtube_preview_thumbnail\" style=\"background-image: url('{thumbnail}')\"></div>\n<div class=\"bpp_youtube_preview_title\">{title}</div>\n<div class=\"bpp_youtube_preview_author\">Von <a href=\"http://www.youtube.com/user/{author}\">{author}</a>, hochgeladen am <span>{day} {month}. {year}, {hours)}:{minutes} Uhr</span></div>\n<div class=\"bpp_youtube_preview_length\"><img src=\"wcf/icon/dateS.png\"> {length}</div>\n<div class=\"bpp_youtube_preview_clicks\"><img src=\"wcf/icon/visitsM.png\"> {clicks}</div>\n<a class=\"bpp_youtube_preview_link\" href=\"#\">Videoplayer anzeigen</a>\n<a class=\"bpp_youtube_preview_link_blank\" target=\"_blank\" href=\"http://www.youtube.com/watch?v={videoId}\">Video in einem neuen Tab öffnen</a>\n</div>";
Template.css['common'] = ".bpp_privateMessageNotification{position:fixed;right:15px;bottom:15px;display:block;background-color:#def;border:1px solid #06f;padding:5px 15px;border-radius:2px;display:none;opacity:.5;transition:opacity .2s linear}.bpp_privateMessageNotification:hover{opacity:1}.bpp_privateMessageNotification img{position:absolute;top:-10px;left:-10px}.bpp_privateMessageNotification .itemList li{list-style-type:square;list-style-image:url('http://forum.sa-mp.de/wcf/icon/pmUnreadS.png')}.bpp_privateMessageNotification .itemList li .itemListTitle{padding:0}.bpp_tooltip{display:none;position:absolute;z-index:100000;background-color:#383838;color:#fff;text-shadow:0 -1px 0 #000;padding:8px 10px;text-align:center;font-size:12px;line-height:12px;box-shadow:4px 4px 8px rgba(0,0,0,0.3);max-width:50%;pointer-events:none}.bpp_tooltip:after{top:100%;border:solid transparent;content:' ';height:0;width:0;position:absolute;pointer-events:none;border-color:rgba(56,56,56,0);border-top-color:#383838;border-width:5px;left:50%;margin-left:-5px}";
Template.css['options'] = ".bpp_option_category{display:none}.bpp_option_category .indicator{position:relative;top:-5px;padding:2px 5px;border:1px solid #ccc}";
Template.css['postCreate'] = "#nickCompletionList{position:absolute;top:0;left:0}";
Template.css['posts'] = ".bpp_shorturl_input{margin:0;padding:0 !important;width:200px;text-align:center;display:none;border:none !important;background:transparent !important}.bpp_youtube_preview{border:10px solid #dc566d;position:relative;height:90px}.bpp_youtube_preview .bpp_youtube_preview_thumbnail{position:absolute;top:0;left:0;width:120px;height:90px;border-right:10px solid #dc566d;background-color:#dc566d;background-repeat:no-repeat;background-position:0 0}.bpp_youtube_preview .bpp_youtube_preview_thumbnail:after{display:none;content:'';width:120px;height:90px;background-color:#dc566d;background-image:url('data:image/png;base64,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oJv4BDEkAAlAApCAwCWgdNFuJMDs/voYqggkYO0wGSMBSAASEIcEFA6SoUSbT0hAfBKwsxgQJd6kt3QpAY6TMRKABCABcUhAGagEdI7bvUQC5CVgYTEgLgTqmyEBSAASgAQgAelJgIUt7PQkQP3AxkIwPAnVFQlAApAAJCBpCZhYPhKABNz9gQcLwbBEApAAJAAJQAKQACTAPwnILQTDFRLwhx0SMLnvj0gAEoAEIAFIgOwPnBnu2EawrjFIQIkETO77GglAApAAJAAJkP+hJ4Mde0QCkAAkAAlAApAAJMBfCTC515ojAUgAEoAEIAFIABLgrwRkhjq19bCeSAASgAQgAUgAEoAEWOjcCglAAjoOBiIBSEAMEpBpXgskwG8JMHEuoEACkICOrwgiAUhA8BLgSQJEAgxKwMFAp86QACQACUACkAAkAAnwXwJy4Q49GagjEoAEIAFIABKABCABBn7wQrhDdwbqiAQgAUgAEoAEIAFIgKEf3gp26MpA/ZAAJAAJQAKQACQACTD0w2uhzmwM1Q8JQAKQACQACUACkABDP7z0uTORACQACUACkAAkAAlAApAAJAAJQAKQACQACUACkAAkAAlAApAAJMBNbEYCkAAkAAlAApAAJAAJQAKQACQACUACkAAkAAlAApAAJAAJQAKQACQACUACkAAkQEwCMiQACUACkAAkAAlAApAAJAAJQALCaXMIIAFIABKABCABSAASgAQgAUgAEoAEIAFIABKQkgRkSAASgAQgAUgAEoAEIAFIABKABHgoAQskAAlAApAAJAAJQAISlIAAAxESgAQgAUgAEoAEIAFIABKABCABSAASgAQgAUgAEoAEIAE+MkMCkAAkAAlAApAAJCBBCXgJBCQACUhdAk5IABKABCABSAASgASkKQE1EoAEIAFIABKABCABSAASgAQgAeFIwMZjEamRACQACUACkAAkAAlAApAAJMDLZIwEvAT3OmEkAAlAApAAJAAJQAKQACQACUACPJaACglAApAAJAAJQAK8l4Cfv79GAsQpkQAkAAkIQwIKJAAJSFwCNiFKgM/zAAkIRAJc2+jP310iAc4lIEMCkIDAJWAXqASckAAkIHUJ2CABSAASgAS4nA9T45BAm78iloAMCUhHAt5cSkCA2xC+ScAMCUACkID0JEDoJgwJiEACTpp122uUvUUC3E8wJAAJ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');background-repeat:no-repeat;background-position:center center;background-size:110px;position:absolute;left:0}.bpp_youtube_preview .bpp_youtube_preview_thumbnail:hover:after{display:inline-block}.bpp_youtube_preview .bpp_youtube_preview_title{position:absolute;left:140px;color:#dc566d;font-weight:bold;font-size:21px;overflow:hidden;white-space:nowrap}.bpp_youtube_preview .bpp_youtube_preview_author{position:absolute;left:140px;top:25px;color:#333;font-size:16px}.bpp_youtube_preview .bpp_youtube_preview_author a{color:#dc566d;font-weight:bold}.bpp_youtube_preview .bpp_youtube_preview_author span{color:#dc566d;font-weight:bold}.bpp_youtube_preview .bpp_youtube_preview_length{position:absolute;left:140px;top:45px;color:#333;font-size:16px}.bpp_youtube_preview .bpp_youtube_preview_clicks{position:absolute;left:140px;top:65px;color:#333;font-size:16px}.bpp_youtube_preview .bpp_youtube_preview_clicks img{height:16px}.bpp_youtube_preview .bpp_youtube_preview_link{position:absolute;bottom:0;right:220px;display:block;padding:5px;color:#dc566d !important;text-decoration:none}.bpp_youtube_preview .bpp_youtube_preview_link:hover{color:#fff !important;background-color:#dc566d;font-weight:bold}.bpp_youtube_preview .bpp_youtube_preview_link_blank{position:absolute;bottom:0;right:0;display:block;padding:5px;color:#dc566d !important;text-decoration:none}.bpp_youtube_preview .bpp_youtube_preview_link_blank:hover{color:#fff !important;background-color:#dc566d;font-weight:bold}";
var DefaultOptions=[{name:"Allgemeine Einstellungen",key:"common",panels:{Erweiterungen:[{name:"Alternative PN Benachrichtigung",key:"option_common_extension_privateMessageNotification",type:"toggle",desc:"Versteckt den Hinweis auf neue Private Nachrichten, und zeigt ihn statdessen am unteren rechten Bildschirmrand an (FF) bzw ersetzt ihn durch eine Desktopbenachrichtigung (Chrome). Es wird in regelmäßigen abständen überprüft ob du eine neue PN hast, und die Benachrichtigung wird autmatisch aktualisiert."},{name:"Asynchrone Datenübertragung <b>(TODO)</b>",key:"option_common_extension_ajaxify",type:"toggle",desc:'Lässt verschiedene Operationen durch <a href="http://de.wikipedia.org/wiki/Ajax_(Programmierung)">Ajax</a> im Hintergrund ausführen anstatt die Seite neu zu laden.'},{name:"Alternative Tooltips",key:"option_common_extension_tooltip",type:"toggle",desc:'Ersetzt die Standard Browser Tooltips durch <abbr title="Ich bin ein Tooltip \\o/">eigene</abbr>'},{name:"Spitznamen für Benutzer",key:"option_common_extension_nicknames",type:"toggle",desc:"Fügt im Benutzerprofil eine Option hinzu, die es ermöglicht dem benutzer einen eigenen Spitznamen zu geben. Dieser Spitzname wird dann, anstatt des eigentlichen Benutzernamens, in Forum angezeigt."},{name:"Mitglieder Notizen",key:"option_common_extension_nicknames",type:"toggle",desc:'Bietet die möglichkeit, jedem Benutzer eine eigene Notiz hinzuzufügen. <span style="color:#FF4136;font-weight:bold;">Deine Notizen werden auf deinem Computer gespeichert und können nicht von dritten eingesehen werden.</span>'}],Fehlerbehebungen:[{name:"Header-Fix",key:"option_common_bugfix_headerFix",type:"toggle",desc:'Behebt den Fehler im Header-Fix Stil, bei dem die Breadcrumbs verschwinden. Mehr Informationen zu diesem Fehler findest du hier: <a target="_blank" href="http://sa-mp.de/B++/p1643494-/">Header Fix buggt</a>.'},{name:"Expander",key:"option_common_bugfix_expander",type:"toggle",desc:'Behebt den Expander-Bug, der auftritt wenn ein Benutzer mehrere Expander auf einer Seite nutzt. Mehr Informationen zu diesem Fehler findest du hier: <a target="_blank" href="http://sa-mp.de/B++/p1701085-/">Spoiler</a>.'},{name:"Tabmenu",key:"option_common_bugfix_tabmenu",type:"toggle",desc:'Behebt den Fehler im Tumek Design, bei dem die Schrift im Tabmenu nur schwer erkennbar ist. Mehr Informationen zu diesem Fehler findest du hier: <a target="_blank" href="http://sa-mp.de/B++/p1662628-/">Manglhafte Farbwahl beim neuen Design</a>.'},{name:"Bildverkleinerung",key:"option_common_bugfix_imageResize",type:"toggle",desc:"Passt Bilder, die zu groß sind und deshalb vom WBB verkleiner wurde, auf die exakte Breite des Beitrags an."}],Filter:[{name:"Ankündigungen",key:"option_common_filter_announce",type:"toggle",desc:"Blendet permanente Ankündigungen aus."}]}},{name:"Forenübersicht",key:"boards",panels:{Erweiterungen:[{name:"Die letzten X Beiträge",key:"option_boards_extension_lastPosts",type:"range",range:[1,10],desc:"Passt die Anzahl der Letzten X Beiträge Box auf der Startseite an."},{name:"IRC Shoutbox",key:"option_boards_extension_ircShoutbox",type:"toggle",desc:'Zeigt eine Shoutbox auf der Startseite an, mit der du dich direkt mit unserem Chat Verbinden kannst. Mehr Informationen zu unserem Chat findest du hier: <a href="http://sa-mp.de/B++/p924945-/">IRC-Chat</a>.'}],Fehlerbehebungen:[{name:"Suche Icon",key:"option_boards_extension_searchIcon",type:"toggle",desc:"Zeigt das Icon für die Suche im Footer wieder richtig an."}],Filter:[{name:"Zur Zeit sind X Benutzer online",key:"option_boards_filter_usersOnline",type:"toggle",desc:"Entfernt die Infobox auf der Startseite, die anzeigt wer gerade Online ist."},{name:"Statistik",key:"option_boards_filter_statistics",type:"toggle",desc:"Entfernt die Infobox auf der Startseite, die die Forenstatistik anzeigt."},{name:"Geburtstage",key:"option_boards_filter_birthdays",type:"toggle",desc:"Entfernt die Infobox auf der Startseite, die anzeigt wer heute geburtstag hat."}]}},{name:"Themenübersicht",key:"threads",panels:{Erweiterungen:[{name:"Ankündigungen und wichtige Themen",key:"option_threads_extension_sticky",type:"toggle",desc:"Trennt Ankündigungen und wichtige Themen von einander."}],Filter:[{name:"Gelöschte Themen",key:"option_threads_filter_deleted",type:"toggle",desc:"Blendet gelöschte Themen komplett aus."}]}},{name:"Beiträge & Nachrichten",key:"posts",panels:{Erweiterungen:[{name:"Kurz-URL",key:"option_posts_extension_shorturl",type:"toggle",desc:"Zeigt in der Beitragsansicht zu jedem Beitrag einen Kurzen Link (~25 Zeichen) an, der direkt zum Beitrag führt."},{name:"Youtube Vorschau",key:"option_posts_extension_youtubePreview",type:"toggle",desc:"Ersetzt Youtube-Videos durch eine Vorschau-Box mit Informationen zu dem Video."},{name:"Danksagungen anzeigen",key:"option_posts_extension_thanks",type:"toggle",desc:"Zeigt die Anzahl der Danksagungen, die ein Benutzer bekommen hat, in Beiträgen an."},{name:"Höhenbegrenzung für Signaturen",key:"option_posts_extension_signatureHeight",type:"toggle",desc:"Entfernt die Scrollbars aus den Signaturen und zeigt sie in voller Höhe an."},{name:"Bilderzoom",key:"option_posts_extension_imageResize",type:"toggle",desc:"Erlaubt es, die größe von Bildern in Signaturen und Posts per Drag & Drop zu ändern."}],Filter:[{name:"Youtube Videos",key:"option_posts_filter_youtube",type:"toggle",desc:"Entfernt Videos aus Beiträgen und Signaturen, und ersetzt sie statdessen mit dem Link zum jeweiligen Video."},{name:"Gelöschte Beiträge",key:"option_posts_filter_deleted",type:"toggle",desc:"Blendet gelöschte Beiträge komplett aus."},{name:"Bedankomat",key:"option_posts_filter_thanko",type:"toggle",desc:"Blendet den bedankomat in Beiträgen aus."},{name:"Ignorierte Benutzer",key:"option_posts_filter_ignored",type:"toggle",desc:"Blendet Beiträge von ignorierten Benutzern ganz aus."},{name:"Hilfreichste Antwort",key:"option_posts_filter_bestans",type:"toggle",desc:"Entfernt die markierung der Hilfreichsten Antwort."},{name:"Beitragscounter",key:"option_posts_filter_postcount",type:"toggle",desc:"Blendet den Beitragscounter aus."},{name:"Benutzertitel",key:"option_posts_filter_usertitle",type:"toggle",desc:"Blendet den Benutzertitel aus."},{name:"Benutzerrang",key:"option_posts_filter_userrank",type:"toggle",desc:"Blendet den Benutzerrang aus."},{name:"Zusätzlicher Benutzerrang",key:"option_posts_filter_additionalUserrank",type:"toggle",desc:"Blendet den zusätzlichen Benutzerrang (falls vorhanden) aus."},{name:"Registrierungsdatum",key:"option_posts_filter_regdate",type:"toggle",desc:"Blendet das Registrierungsdatum aus."},{name:"Geschlecht",key:"option_posts_filter_gender",type:"toggle",desc:"Blendet das Geschlecht aus."},{name:"XBL Gamertag",key:"option_posts_filter_xblGamertag",type:"toggle",desc:"Blendet den XBL Gamertag aus."},{name:"PSN ID",key:"option_posts_filter_psnid",type:"toggle",desc:"Blendet die PSN ID aus."},{name:"Steam",key:"option_posts_filter_steam",type:"toggle",desc:"Blendet den Steamnamen aus."},{name:"Origin",key:"option_posts_filter_origin",type:"toggle",desc:"Blendet den Originnamen aus."},{name:"Website",key:"option_posts_filter_website",type:"toggle",desc:"Blendet die Website aus."},{name:"ICQ",key:"option_posts_filter_icq",type:"toggle",desc:"Blendet die Nummer des ICQ-Accounts aus."},{name:"Windows Live",key:"option_posts_filter_msn",type:"toggle",desc:"Blendet den Windows Live Messenger Namen aus."},{name:"Skype",key:"option_posts_filter_skype",type:"toggle",desc:"Blendet den Skype-Namen aus."}]}},{name:"Beitrag/Nachrichten erstellen",key:"postCreate",panels:{Erweiterungen:[{name:"Benutzer-Autovervollständigung",key:"option_postCreate_extension_nickcomplete",type:"toggle",desc:'Wenn du im post z.b "@madd" schreibst, erscheint, ähnlich wie bei der Mitgliedersuche, eine Auswahlliste mit Benutzernamen im Forum die auf die bereits getippten anfangsbuchstaben passen. Durch <strong>Tab</strong> kannst du durch die Liste schalten, und durch <strong>Space</strong> bestätigst du den ausgewählten Namen.'}],Smilies:[{name:"My Little Pony",key:"option_postCreate_smilies_mlp",type:"toggle",desc:"Fügt dem WYSIWYG-Editor eine neue Kategorie mit MLP Smilies hinzu."},{name:"Rageicons",key:"option_postCreate_smilies_rage",type:"toggle",desc:"Fügt dem WYSIWYG-Editor eine neue Kategorie mit Rageicons hinzu."},{name:"Kolobok (ICQ)",key:"option_postCreate_smilies_icq",type:"toggle",desc:"Fügt dem WYSIWYG-Editor eine neue Kategorie mit Kolobok Smilies hinzu."},{name:"Skype",key:"option_postCreate_smilies_skype",type:"toggle",desc:"Fügt dem WYSIWYG-Editor eine neue Kategorie mit Skype Smilies hinzu."},{name:"Y o l k s",key:"option_postCreate_smilies_yolks",type:"toggle",desc:"Fügt dem WYSIWYG-Editor eine neue Kategorie mit Y o l k s Smilies hinzu."},{name:"Emojicons",key:"option_postCreate_smilies_emoji",type:"toggle",desc:"Fügt dem WYSIWYG-Editor eine neue Kategorie mit Emojicons hinzu."}],BBCodes:[{name:"E-Mail",key:"option_postCreate_bbcode_email",type:"toggle",desc:"Fügt dem WYSIWYG-Editor das Icon für den E-Mail BBCode hinzu."},{name:"Text tiefstellen",key:"option_postCreate_bbcode_sub",type:"toggle",desc:"Fügt dem WYSIWYG-Editor das Icon für den Text tiefstellen BBCode hinzu."},{name:"Text hochstellen",key:"option_postCreate_bbcode_sup",type:"toggle",desc:"Fügt dem WYSIWYG-Editor das Icon für den Text hochstellen BBCode hinzu."},{name:"PHP-Quelltext",key:"option_postCreate_bbcode_php",type:"toggle",desc:"Fügt dem WYSIWYG-Editor das Icon für den HTML-Quelltext BBCode hinzu."},{name:"Java-Quelltext",key:"option_postCreate_bbcode_java",type:"toggle",desc:"Fügt dem WYSIWYG-Editor das Icon für den Java-Quelltext BBCode hinzu."},{name:"Cascading Style Sheet",key:"option_postCreate_bbcode_css",type:"toggle",desc:"Fügt dem WYSIWYG-Editor das Icon für den Cascading Style Sheet BBCode hinzu."},{name:"HTML",key:"option_postCreate_bbcode_html",type:"toggle",desc:"Fügt dem WYSIWYG-Editor das Icon für den HTML BBCode hinzu."},{name:"XML",key:"option_postCreate_bbcode_xml",type:"toggle",desc:"Fügt dem WYSIWYG-Editor das Icon für den XML BBCode hinzu."},{name:"Javascript-Quelltext",key:"option_postCreate_bbcode_js",type:"toggle",desc:"Fügt dem WYSIWYG-Editor das Icon für den Javascript-Quelltext BBCode hinzu."},{name:"C/C++-Quelltext",key:"option_postCreate_bbcode_c",type:"toggle",desc:"Fügt dem WYSIWYG-Editor das Icon für den C/C++-Quelltext BBCode hinzu."},{name:"Dropbown",key:"option_postCreate_bbcode_dropdown",type:"toggle",desc:"Fügt dem WYSIWYG-Editor das Icon für den Dropbown BBCode hinzu."},{name:"Sevenload",key:"option_postCreate_bbcode_sevenload",type:"toggle",desc:"Fügt dem WYSIWYG-Editor das Icon für den Sevenload BBCode hinzu."},{name:"Clipfish",key:"option_postCreate_bbcode_clipfish",type:"toggle",desc:"Fügt dem WYSIWYG-Editor das Icon für den Clipfish BBCode hinzu."},{name:"Googlevideo",key:"option_postCreate_bbcode_googlevideo",type:"toggle",desc:"Fügt dem WYSIWYG-Editor das Icon für den Googlevideo BBCode hinzu."},{name:"MySpace",key:"option_postCreate_bbcode_myspace",type:"toggle",desc:"Fügt dem WYSIWYG-Editor das Icon für den MySpace BBCode hinzu."},{name:"MyVideo",key:"option_postCreate_bbcode_myvideo",type:"toggle",desc:"Fügt dem WYSIWYG-Editor das Icon für den MyVideo BBCode hinzu."}]}},{name:"Benutzerprofil",key:"profile",panels:{Filter:[{name:"Danksagungen",key:"option_profile_filter_thanks",type:"toggle",desc:"Blendet die Danksagungen in Benutzerprofilen aus."},{name:"Beitragscounter",key:"option_profile_filter_postcount",type:"toggle",desc:"Blendet den Beitragscounter aus."},{name:"Benutzertitel",key:"option_profile_filter_usertitle",type:"toggle",desc:"Blendet den Benutzertitel aus."},{name:"Benutzerrang",key:"option_profile_filter_userrank",type:"toggle",desc:"Blendet den Benutzerrang aus."},{name:"Zusätzlicher Benutzerrang",key:"option_profile_filter_additionalUserrank",type:"toggle",desc:"Blendet den zusätzlichen Benutzerrang (falls vorhanden) aus."},{name:"Geschlecht",key:"option_profile_filter_gender",type:"toggle",desc:"Blendet das Geschlecht aus."},{name:"Registrierungsdatum",key:"option_profile_filter_regdate",type:"toggle",desc:"Blendet das Registrierungsdatum aus."},{name:"Über Mich",key:"option_profile_filter_aboutMe",type:"toggle",desc:'Blendet den "Über mich"-Block aus.'},{name:"Geburtstag",key:"option_profile_filter_birthday",type:"toggle",desc:"Blendet den Geburtstag aus."},{name:"Wohnort",key:"option_profile_filter_location",type:"toggle",desc:"Blendet den Wohnort aus."},{name:"Beruf",key:"option_profile_filter_occupation",type:"toggle",desc:"Blendet den Beruf aus."},{name:"Hobbys",key:"option_profile_filter_hobbys",type:"toggle",desc:"Blendet die Hobbys aus."},{name:"Teamspeak UID",key:"option_profile_filter_tsuid",type:"toggle",desc:"Blendet die Teamspeak UID aus."},{name:"XBL Gamertag",key:"option_profile_filter_xblGamertag",type:"toggle",desc:"Blendet den XBL Gamertag aus."},{name:"PSN ID",key:"option_profile_filter_psnid",type:"toggle",desc:"Blendet die PSN ID aus."},{name:"Steam",key:"option_profile_filter_steam",type:"toggle",desc:"Blendet den Steam-Namen aus."},{name:"Origin",key:"option_profile_filter_origin",type:"toggle",desc:"Blendet den Origin-Namen aus."},{name:"Website",key:"option_profile_filter_website",type:"toggle",desc:"Blendet die Website aus."},{name:"ICQ",key:"option_profile_filter_icq",type:"toggle",desc:"Blendet die Nummer des ICQ-Accounts aus."},{name:"Windows Live",key:"option_profile_filter_msn",type:"toggle",desc:"Blendet den Windows Live Messenger Namen aus."},{name:"Skype",key:"option_profile_filter_skype",type:"toggle",desc:"Blendet den Skype-Namen aus."}]}},{name:"Tastaturnavigation",key:"navigation",panels:{"null":[{name:"Vorheriger Post",key:"option_keyboard_prev_post",type:"keyboard",desc:"Belege eine Taste mit der Funktion zum vorherigen Beitrags zu scrollen."},{name:"Nächster Post",key:"option_keyboard_next_post",type:"keyboard",desc:"Belege eine Taste mit der Funktion zum nächsten Beitrags zu scrollen."},{name:"Vorherige Seite",key:"option_keyboard_prev_page",type:"keyboard",desc:"Belege eine Taste mit der Funktion zur vorherigen Seite zu scrollen."},{name:"Nächste Seite",key:"option_keyboard_next_page",type:"keyboard",desc:"Belege eine Taste mit der Funktion zur nächsten Seite zu scrollen."}]}}];
var Smilies={"My Little Pony":[["Mad","http://i.imgur.com/f3h2mxR.png"],["Grin","http://i.imgur.com/W7PH69O.png"],["Annoy","http://i.imgur.com/W259ngj.png"],["Shock","http://i.imgur.com/zXISgZ0.png"],["Whine","http://i.imgur.com/iaOfndZ.png"],["Shrug","http://i.imgur.com/iTHheSO.png"],["Squint","http://i.imgur.com/NsPFjxI.png"],["Derp","http://i.imgur.com/k7MPAR9.png"],["Shock","http://i.imgur.com/vKDXgbI.png"],["Awesome","http://i.imgur.com/ai92VCU.png"],["Squint2","http://i.imgur.com/qx6KPUA.png"],["Sad","http://i.imgur.com/hXZikdq.png"],["Supersad","http://i.imgur.com/Eu4f62W.png"],["Sad2","http://i.imgur.com/RotCs9S.png"],["Scared","http://i.imgur.com/hy2KXYd.png"],["Huh","http://i.imgur.com/gMoKl0C.png"],["Crown","http://i.imgur.com/ZYRc3Je.png"],["Whine2","http://i.imgur.com/MP05T2k.png"],["Winning","http://i.imgur.com/zeUdw32.png"],["Yay","http://i.imgur.com/2nfJjhk.png"],["Brohug","http://i.imgur.com/CvJaKoE.png"],["Grouphug","http://i.imgur.com/B2SBfFJ.png"],["Brohoof","http://i.imgur.com/pvZhLbL.png"],["OOps","http://i.imgur.com/OQ6h4dP.png"],["Ohgod","http://i.imgur.com/xXCK2JH.png"],["Rage","http://i.imgur.com/wjF9YAg.png"],["Moustache","http://i.imgur.com/djMfHp0.png"],["Lol","http://i.imgur.com/DodceOg.png"],["Wtf","http://i.imgur.com/7Yr9M2F.png"],["You Don't Say","http://i.imgur.com/7kmX8DW.png"],["Think","http://i.imgur.com/w4BMKS1.png"],["Hipster","http://i.imgur.com/712rwl2.png"],["Hipster","http://i.imgur.com/MWk0kKi.png"],["Deal With It","http://i.imgur.com/88nYIYB.png"],["Gasp","http://i.imgur.com/HDGVntS.png"],["Rofl","http://i.imgur.com/ebwrO4w.png"],["WIT","http://i.imgur.com/UaSFoYx.png"],["Woah","http://i.imgur.com/S3uqtd9.png"],["Deal With It","http://i.imgur.com/J62VTZ3.png"],["Dark","http://i.imgur.com/O280v32.png"],["Jedi","http://i.imgur.com/lW5PvfP.png"],["Twist","http://i.imgur.com/M7lyV4d.png"]],Rageicons:[["actually","http://i.imgur.com/yJnfzCl.png"],["aliens","http://i.imgur.com/nct5szo.jpg"],["all","http://i.imgur.com/meXdtwY.png"],["awesome","http://i.imgur.com/0ENwPkD.png"],["awyeah","http://i.imgur.com/NJo4GVZ.png"],["babytroll","http://i.imgur.com/ps4NQQW.png"],["badass","http://i.imgur.com/BaKnDIW.png"],["badpokerface","http://i.imgur.com/L3WD2Uw.png"],["baww","http://i.imgur.com/mkJCNv4.png"],["biggrin","http://i.imgur.com/XaChYu7.png"],["cereal","http://i.imgur.com/jGkzAA5.png"],["cerealspitting","http://i.imgur.com/y3vYMeq.png"],["challengeaccepted","http://i.imgur.com/KvSqLC7.png"],["citizen_cane","http://i.imgur.com/4MLejyD.gif"],["clint","http://i.imgur.com/uN4VICk.gif"],["closeenough","http://i.imgur.com/p3x0kar.png"],["cochran","http://i.imgur.com/i4CD4gp.gif"],["dance","http://i.imgur.com/SBVVC3L.gif"],["datash","http://i.imgur.com/h6ZAr0z.jpg"],["dealwithit","http://i.imgur.com/vapvzGG.gif"],["derp","http://i.imgur.com/m7BJ4i6.png"],["determined","http://i.imgur.com/HYWZFoO.png"],["disgusted","http://i.imgur.com/D3DJdyj.png"],["dolan","http://i.imgur.com/gsZuyy3.png"],["dudecomeon","http://i.imgur.com/TOoP5Sx.png"],["eddance","http://i.imgur.com/rdjzV9p.gif"],["edgrin","http://i.imgur.com/MdAbF1K.gif"],["ewbte","http://i.imgur.com/3AZOoq2.png"],["excitedtroll","http://i.imgur.com/JzyIIxp.png"],["falbulous","http://i.imgur.com/mYzGfHT.gif"],["fapfap","http://i.imgur.com/uVXIuup.png"],["feelsgood","http://i.imgur.com/Qn0neUF.png"],["fffuuu","http://i.imgur.com/eMOYawM.png"],["fffuuu-s","http://i.imgur.com/0agDevF.png"],["flip","http://i.imgur.com/VW2sLjz.png"],["foreveralone","http://i.imgur.com/wTUuZkX.png"],["friends","http://i.imgur.com/wazjdvq.png"],["fu","http://i.imgur.com/x7rC2c8.png"],["fuckyea","http://i.imgur.com/HZhzjUQ.png"],["fullpanel","http://i.imgur.com/2KUOck3.png"],["fumanchu","http://i.imgur.com/Mr3Ppgs.jpg"],["gasp","http://i.imgur.com/EPvK0Xy.png"],["gaytroll","http://i.imgur.com/7JM5HMT.png"],["god","http://i.imgur.com/PVFNMs4.png"],["gtfo","http://i.imgur.com/0EyUSP5.png"],["happy","http://i.imgur.com/luwPEBd.png"],["hehehe","http://i.imgur.com/cJfuA5Y.png"],["herpderp","http://i.imgur.com/4oC9fAx.png"],["high","http://i.imgur.com/eRNflhP.png"],["highexpectations","http://i.imgur.com/0Jn3Vpy.jpg"],["iamdisappointed","http://i.imgur.com/f83qMYJ.png"],["impossibru","http://i.imgur.com/IJsKgJZ.png"],["itsnotokay","http://i.imgur.com/d4uQD52.png"],["jackiechan","http://i.imgur.com/iGjHMWD.jpg"],["kidding","http://i.imgur.com/kFeRAIY.png"],["kobe","http://i.imgur.com/6xlbTeR.gif"],["lied","http://i.imgur.com/JJHley0.png"],["lod","http://i.imgur.com/Gg10Cps.jpg"],["lolnotext","http://i.imgur.com/pd1wpqx.png"],["mad","http://i.imgur.com/c0GpKlN.png"],["megusta","http://i.imgur.com/RxVUbho.png"],["melvin","http://i.imgur.com/wWlgCJg.png"],["milk","http://i.imgur.com/Wmy5bRG.png"],["mindblown","http://i.imgur.com/dmVMKtk.gif"],["mouthopen","http://i.imgur.com/12RWbvW.png"],["newspaperguy","http://i.imgur.com/eSXzUe7.png"],["newspaperguytear","http://i.imgur.com/Wtcl1XG.png"],["no","http://i.imgur.com/HdDcgQ3.png"],["notbad","http://i.imgur.com/Tocl7c0.jpg"],["ogw","http://i.imgur.com/EZLdz9V.png"],["ohno","http://i.imgur.com/TA9WruL.png"],["okay","http://i.imgur.com/49KRrCu.png"],["openmouth","http://i.imgur.com/5ZIvQ6e.png"],["pffftcchchchhfffttt","http://i.imgur.com/IS0dcMz.png"],["picard","http://i.imgur.com/on3efwD.png"],["pokerface","http://i.imgur.com/aVbv7Eb.png"],["popcorn","http://i.imgur.com/ZPwF1d9.gif"],["problem","http://i.imgur.com/4YyBg1S.png"],["racket","http://i.imgur.com/uAtTaHJ.jpg"],["rage2","http://i.imgur.com/YdxqpSp.png"],["redeyes","http://i.imgur.com/iD9SAMj.png"],["sad","http://i.imgur.com/GRnnjlf.png"],["sadmelvin","http://i.imgur.com/W5oScTm.png"],["sadtroll","http://i.imgur.com/ZG2hPL0.png"],["shaq","http://i.imgur.com/RL78dle.png"],["shocked","http://i.imgur.com/nkXW4eU.png"],["sidemouth","http://i.imgur.com/y2sd3oS.png"],["smirk","http://i.imgur.com/zlwo5g6.jpg"],["somuchwin","http://i.imgur.com/7nXovH0.png"],["staredad","http://i.imgur.com/mkJCnqu.png"],["steve","http://i.imgur.com/Pd4dNCX.jpg"],["stfi","http://i.imgur.com/6g8g9o6.jpg"],["suspicious","http://i.imgur.com/X1EKnGT.png"],["tdadjump","http://i.imgur.com/qD5atiX.png"],["thoughtful","http://i.imgur.com/mfz4H2d.png"],["tongue","http://i.imgur.com/I7zH7a3.png"],["trolldad","http://i.imgur.com/qOrL3Mo.png"],["truestory","http://i.imgur.com/izwfP8h.png"],["underbite","http://i.imgur.com/SUHKmoC.png"],["wasted","http://i.imgur.com/CkSu9O6.png"],["wat","http://i.imgur.com/7WjJFOz.jpg"],["what","http://i.imgur.com/CGEo3ej.png"],["whywithhands","http://i.imgur.com/4VRIr1C.png"],["wizard","http://i.imgur.com/4Sc1dTa.png"],["wut","http://i.imgur.com/OsNE9lV.png"],["yaoming","http://i.imgur.com/w3awxbN.png"],["yuno","http://i.imgur.com/Q381rgq.png"]],"Kolobok (ICQ)":[["acute","http://i.imgur.com/j6LrIBb.gif"],["agressive","http://i.imgur.com/enwmt9h.gif"],["air_kiss","http://i.imgur.com/ZP3on0U.gif"],["angel","http://i.imgur.com/X6IMyj3.gif"],["bad","http://i.imgur.com/xDVy0P3.gif"],["bb2","http://i.imgur.com/f4SEPlS.gif"],["beach","http://i.imgur.com/ToU8tbQ.gif"],["bee","http://i.imgur.com/RY0xC46.gif"],["biggrin","http://i.imgur.com/s3SOo3L.gif"],["blueeye","http://i.imgur.com/RGuZJXE.gif"],["blum3","http://i.imgur.com/KiRKoqx.gif"],["blush","http://i.imgur.com/RXZmaRB.gif"],["blush2","http://i.imgur.com/7H09LXw.gif"],["boat","http://i.imgur.com/pRynOh0.gif"],["boredom","http://i.imgur.com/kytNlQv.gif"],["bye","http://i.imgur.com/n7FSy7O.gif"],["clapping","http://i.imgur.com/zqQDs0k.gif"],["cray","http://i.imgur.com/wn37zSm.gif"],["crazy","http://i.imgur.com/FEJKMvE.gif"],["im_king","http://i.imgur.com/bwGYULL.gif"],["welcome_sign","http://i.imgur.com/c3Q9kDI.gif"],["hug","http://i.imgur.com/S9eEAmP.gif"],["sweeet","http://i.imgur.com/af6bU6w.gif"],["dance","http://i.imgur.com/GHKLDdS.gif"],["dance22","http://i.imgur.com/8j0VXTU.gif"],["dance4","http://i.imgur.com/bXoU0sM.gif"],["dash2","http://i.imgur.com/xC6Rhs5.gif"],["diablo","http://i.imgur.com/SQ4lIkt.gif"],["dirol","http://i.imgur.com/9lKwY5z.gif"],["idk","http://i.imgur.com/RzVFucM.gif"],["dont_mention","http://i.imgur.com/qHDPjUL.gif"],["drinks","http://i.imgur.com/k0yuQJN.gif"],["friends","http://i.imgur.com/vU4CUlF.gif"],["girl_sigh","http://i.imgur.com/zefYeBf.gif"],["girl_wink","http://i.imgur.com/fpDSxvP.gif"],["give_heart","http://i.imgur.com/l5yvmzm.gif"],["give_rose","http://i.imgur.com/52XMoK9.gif"],["good","http://i.imgur.com/qIL9Iuk.gif"],["good3","http://i.imgur.com/Ric3G1x.gif"],["hahaha","http://i.imgur.com/6UGUiQ2.gif"],["hang1","http://i.imgur.com/03To2P0.gif"],["heart","http://i.imgur.com/3DmaTab.gif"],["heat","http://i.imgur.com/w0ujgg8.gif"],["sos_help","http://i.imgur.com/g7o02u5.gif"],["hyron_02","http://i.imgur.com/fIEO19z.gif"],["hysteric","http://i.imgur.com/6tN0TUY.gif"],["so_happy","http://i.imgur.com/b6CoYVj.gif"],["jc_dance","http://i.imgur.com/7kvQWOS.gif"],["doubleup","http://i.imgur.com/oVAdEQt.gif"],["goodpost","http://i.imgur.com/7zMu6Uv.gif"],["goody","http://i.imgur.com/zgfSBcS.gif"],["angry","http://i.imgur.com/celQvj4.gif"],["king","http://i.imgur.com/NeVPPWl.gif"],["kiss3","http://i.imgur.com/7hzi60N.gif"],["i_dance","http://i.imgur.com/vX3byDD.gif"],["laugh2","http://i.imgur.com/hxk5UDp.gif"],["lazy","http://i.imgur.com/DONueKe.gif"],["lazy2","http://i.imgur.com/jSWDIHE.gif"],["meeting","http://i.imgur.com/UCwbgXw.gif"],["music","http://i.imgur.com/c9VZouO.gif"],["nea","http://i.imgur.com/zwEO3el.gif"],["negative","http://i.imgur.com/PivmUn6.gif"],["slang_yo","http://i.imgur.com/EK6nv26.gif"],["nono","http://i.imgur.com/llyDbEO.gif"],["not_i","http://i.imgur.com/zSCwyjI.gif"],["ok","http://i.imgur.com/5gJUq9D.gif"],["paint","http://i.imgur.com/UgZVBvh.gif"],["paint2","http://i.imgur.com/isEGYo5.gif"],["pardon","http://i.imgur.com/0zO0BZB.gif"],["parting","http://i.imgur.com/1hewhmf.gif"],["party","http://i.imgur.com/VOOqDrB.gif"],["pleaseantry","http://i.imgur.com/U8XIXXR.gif"],["popcorn","http://i.imgur.com/WzBFcFm.gif"],["popcorn2","http://i.imgur.com/N8r9ROo.gif"],["punish","http://i.imgur.com/VixLbza.gif"],["read","http://i.imgur.com/Ajbt8Ih.gif"],["resent","http://i.imgur.com/yEKwsmW.gif"],["rtfm","http://i.imgur.com/pESAEGu.gif"],["snowball","http://i.imgur.com/L5LLWj3.gif"],["sad","http://i.imgur.com/moJMX86.gif"],["sarcastic","http://i.imgur.com/Hf7MW5t.gif"],["scare","http://i.imgur.com/L0NpSPO.gif"],["scare2","http://i.imgur.com/0PbUF7F.gif"],["senic","http://i.imgur.com/qcXSACL.gif"],["sclerosis","http://i.imgur.com/TrnVFTi.gif"],["think","http://i.imgur.com/JGWSOEu.gif"],["search","http://i.imgur.com/rVeehgi.gif"],["secret","http://i.imgur.com/0wQVoaf.gif"],["shok","http://i.imgur.com/IMcYOBB.gif"],["shout","http://i.imgur.com/lQUhNtU.gif"],["smile3","http://i.imgur.com/4IF6yaq.gif"],["smoke","http://i.imgur.com/tdnOhKV.gif"],["spiteful","http://i.imgur.com/thJRHGO.gif"],["spruce_up","http://i.imgur.com/u0ybyPf.gif"],["swoon","http://i.imgur.com/Ced6tuN.gif"],["swoon2","http://i.imgur.com/V8wmmyl.gif"],["tease","http://i.imgur.com/moX4XOY.gif"],["tender","http://i.imgur.com/NS1qUDz.gif"],["thank_you","http://i.imgur.com/f6Zvd7E.gif"],["this","http://i.imgur.com/hF9cOcx.gif"],["victory","http://i.imgur.com/SY3d5p8.gif"],["wacko","http://i.imgur.com/SDfWo0f.gif"],["wacko2","http://i.imgur.com/M7hGj9Q.gif"],["whistle","http://i.imgur.com/JvBPglq.gif"],["whistle2","http://i.imgur.com/W4f9XMJ.gif"],["wink","http://i.imgur.com/i1EAQ5k.gif"],["wink3","http://i.imgur.com/meEgrtJ.gif"],["yahoo","http://i.imgur.com/moX4XOY.gif"],["yes","http://i.imgur.com/bzq896a.gif"]],Skype:[["Finger","http://i.imgur.com/Vq4tnfX.png"],["Bandit","http://i.imgur.com/HaE73Tn.png"],["Drunk","http://i.imgur.com/cOW3MvB.png"],["Smoking","http://i.imgur.com/6unXkzR.png"],["Toivo","http://i.imgur.com/79s0lGz.png"],["Rock","http://i.imgur.com/Y0dCJ3u.png"],["Headbang","http://i.imgur.com/WcXHZi6.png"],["Bug","http://i.imgur.com/mk8Gw5f.png"],["Fubar","http://i.imgur.com/npCrTlu.png"],["Poolparty","http://i.imgur.com/zBvkBgP.png"],["Swearing","http://i.imgur.com/GcjD5fj.png"],["TMI","http://i.imgur.com/mspnDLU.png"],["Heidy","http://i.imgur.com/DKCHaw2.png"],["Mooning","http://i.imgur.com/yMUAILh.png"],["High Five","http://i.imgur.com/tXCG3uW.png"],["Face Palm","http://i.imgur.com/vFuM5xA.png"],["Fingers Crossed","http://i.imgur.com/M1Eg5ef.png"],["Lalala","http://i.imgur.com/3JAitLU.png"],["Waiting","http://i.imgur.com/5f2Wcm2.png"],["Tumbleweed","http://i.imgur.com/LsfNlvh.png"],["Working From Home","http://i.imgur.com/kRI8JhR.png"],["Smile","http://i.imgur.com/3WHJDK8.png"],["Sad Smile","http://i.imgur.com/H4ieTji.png"],["Big Smile","http://i.imgur.com/QaxkvgL.png"],["Cool","http://i.imgur.com/Gvw3pCJ.png"],["Wink","http://i.imgur.com/m6MmVps.png"],["Crying","http://i.imgur.com/TI4L2Pl.png"],["Sweating","http://i.imgur.com/Jx6A13R.png"],["Speechless","http://i.imgur.com/0B4GI6z.png"],["Kiss","http://i.imgur.com/YmrF8fn.png"],["Tongue Out","http://i.imgur.com/GzVsg5V.png"],["Blush","http://i.imgur.com/30mN9BT.png"],["Wondering","http://i.imgur.com/iqdLo7g.png"],["Sleepy","http://i.imgur.com/EGIVG3t.png"],["Dull","http://i.imgur.com/sqpO2B8.png"],["In love","http://i.imgur.com/zE5DtVN.png"],["Evil grin","http://i.imgur.com/n4m8ILM.gif"],["Talking","http://i.imgur.com/RMqYJKp.gif"],["Yawn","http://i.imgur.com/hr7bK78.gif"],["Puke","http://i.imgur.com/IHuN5wl.gif"],["Doh!","http://i.imgur.com/7wT15FV.gif"],["Angry","http://i.imgur.com/dQ9YgfA.gif"],["It wasn't me","http://i.imgur.com/3GdH5yC.gif"],["Party!!!","http://i.imgur.com/1t42vCH.gif"],["Worried","http://i.imgur.com/YPJlAeT.gif"],["Mmm...","http://i.imgur.com/e7StHEb.gif"],["Nerd","http://i.imgur.com/0bn86QN.gif"],["Lips Sealed","http://i.imgur.com/GuslBRg.gif"],["Hi","http://i.imgur.com/Z9qM8in.gif"],["Call","http://i.imgur.com/MyVpfYu.gif"],["Devil","http://i.imgur.com/lW4VdN8.gif"],["Angel","http://i.imgur.com/Do7FhQh.gif"],["Envy","http://i.imgur.com/axwcNzU.gif"],["Wait","http://i.imgur.com/wVPXhM9.gif"],["Bear","http://i.imgur.com/6sIlzyC.gif"],["Make-up","http://i.imgur.com/UyDLehg.gif"],["Covered Laugh","http://i.imgur.com/cjaROQx.gif"],["Clapping Hands","http://i.imgur.com/WpdxGbB.gif"],["Thinking","http://i.imgur.com/qe7CdHA.gif"],["Bow","http://i.imgur.com/GUB4ciN.gif"],["Rolling on the floor laughing","http://i.imgur.com/w3POgGA.gif"],["Whew","http://i.imgur.com/mtpPDBB.gif"],["Happy","http://i.imgur.com/vGVqaTJ.gif"],["Smirking","http://i.imgur.com/ypbZPcd.gif"],["Nodding","http://i.imgur.com/zupZhXz.gif"],["Shaking","http://i.imgur.com/KimDZxP.gif"],["Punch","http://i.imgur.com/2Em3BBS.gif"],["Emo","http://i.imgur.com/3CsW8sK.gif"],["Yes","http://i.imgur.com/5pAEze4.gif"],["No","http://i.imgur.com/dN3cmR7.gif"],["Shaking Hands","http://i.imgur.com/2c896ls.gif"],["Skype","http://i.imgur.com/q5Y09kp.gif"],["Heart","http://i.imgur.com/cZ1Xn7D.gif"],["Broken heart","http://i.imgur.com/IyHUnee.gif"],["Mail","http://i.imgur.com/EP8Sduz.gif"],["Flower","http://i.imgur.com/r2HQLST.gif"],["Rain","http://i.imgur.com/CYxKRuN.gif"],["Sun","http://i.imgur.com/Ty8CyoQ.gif"],["Time","http://i.imgur.com/PgoFjr5.gif"],["Music","http://i.imgur.com/S45pmTi.gif"],["Movie","http://i.imgur.com/9Yf6FHY.gif"],["Phone","http://i.imgur.com/gL5yglU.gif"],["Coffee","http://i.imgur.com/PTWTU7J.gif"],["Pizza","http://i.imgur.com/YGi316s.gif"],["Cash","http://i.imgur.com/6FgSKTW.gif"],["Muscle","http://i.imgur.com/tMDUkBT.gif"],["Cake","http://i.imgur.com/NhVive3.gif"],["Beer","http://i.imgur.com/Xcc329B.gif"],["Drink","http://i.imgur.com/dg6zocD.gif"],["Dance","http://i.imgur.com/AigvYWH.gif"],["Ninja","http://i.imgur.com/q7Kd13N.gif"],["Star","http://i.imgur.com/eIHpD4Y.gif"]],"Y o l k s":[[";^^","http://i.imgur.com/Qj1jYUn.png"],["¯ε¯¯","http://i.imgur.com/xMOJmab.png"],["=B","http://i.imgur.com/VMCRUdi.png"],["² z  Z ","http://i.imgur.com/Bp9cABV.png"],["² z Z","http://i.imgur.com/ohrHsU5.png"],["angry","http://i.imgur.com/Grie0Xg.png"],["are you for real","http://i.imgur.com/DwtAAfc.png"],["beaten","http://i.imgur.com/CybAOGz.png"],["boo!","http://i.imgur.com/bowiEr8.png"],["bouaaaaah","http://i.imgur.com/LiZXh1D.png"],["brains...!","http://i.imgur.com/MVr8Ex0.png"],["brzzzzz","http://i.imgur.com/1jMvc8N.png"],["burnt","http://i.imgur.com/drCD5kY.png"],["confident","http://i.imgur.com/DlYmbDk.png"],["dark mood","http://i.imgur.com/DOwyBFs.png"],["disapointed","http://i.imgur.com/SqPfzd1.png"],["disappearing","http://i.imgur.com/zKDXsVa.png"],["dizzy","http://i.imgur.com/R1czhwD.png"],["enjoying mah playlist","http://i.imgur.com/dUeHciI.png"],["evilish","http://i.imgur.com/BdY2DmG.png"],["eyes on fire","http://i.imgur.com/qkYHEZw.png"],["faill","http://i.imgur.com/ryNiJp2.png"],["gangs","http://i.imgur.com/CZknUub.png"],["graffiti","http://i.imgur.com/C8eP21s.png"],["grin","http://i.imgur.com/vtPHuZP.png"],["have a nice day","http://i.imgur.com/msFqr4A.png"],["hidden","http://i.imgur.com/MXdDytN.png"],["high","http://i.imgur.com/QzcbZir.png"],["hope my fake smile works again","http://i.imgur.com/XNtSkB3.png"],["ignoring","http://i.imgur.com/Ufwu3yU.png"],["in love","http://i.imgur.com/zEC2JxN.png"],["indifferent","http://i.imgur.com/nGqpIgH.png"],["innocent","http://i.imgur.com/yXcWD0S.png"],["ka boom","http://i.imgur.com/tmBnTf8.png"],["lll._.","http://i.imgur.com/GwXgjQK.png"],["mah (chilling)","http://i.imgur.com/qtZ54Qp.png"],["meaw","http://i.imgur.com/99p1t55.png"],["ninja","http://i.imgur.com/6GcvsdV.png"],["nom nom","http://i.imgur.com/BFTlMoD.png"],["nose bleed","http://i.imgur.com/gLMSBZM.png"],["nose pick","http://i.imgur.com/gxy8J6V.png"],["O_O","http://i.imgur.com/NFvz2ka.png"],["oh noes","http://i.imgur.com/QRbiMkF.png"],["oh u !","http://i.imgur.com/ZKotFhn.png"],["omg","http://i.imgur.com/CXmdtje.png"],["on fire 2","http://i.imgur.com/newPOXU.png"],["on fire","http://i.imgur.com/ssA1wzR.png"],["ouch...it hurts","http://i.imgur.com/lA4dlKP.png"],["pissed off","http://i.imgur.com/AaY9Dpy.png"],["psychotic","http://i.imgur.com/RisdVDa.png"],["relief","http://i.imgur.com/vmoO40x.png"],["scared","http://i.imgur.com/OB4xeF4.png"],["secret laugh","http://i.imgur.com/iKPUbPY.png"],["serious business","http://i.imgur.com/sWrOVkY.png"],["shocked...again","http://i.imgur.com/XgLlbbl.png"],["shocked","http://i.imgur.com/y3vtebE.png"],["shout","http://i.imgur.com/Ju7aAL1.png"],["shy","http://i.imgur.com/staWjia.png"],["sick","http://i.imgur.com/0dm5qBR.png"],["slow","http://i.imgur.com/QWti72X.png"],["snooty","http://i.imgur.com/jzh5d4J.png"],["tastey","http://i.imgur.com/1T6CnoW.png"],["teeth brushing","http://i.imgur.com/Zr3F1Mv.png"],["that dood is up to something","http://i.imgur.com/sVAexPd.png"],["TT TT","http://i.imgur.com/oQMJ7eM.png"],["want !","http://i.imgur.com/hbnMNs9.png"],["want","http://i.imgur.com/6gRyjaP.png"],["we all gonna die","http://i.imgur.com/Ql4O7Gf.png"],["whisper","http://i.imgur.com/kjUpFs1.png"],["whistle","http://i.imgur.com/MpEZ1yK.png"],["wut","http://i.imgur.com/DDVX4dW.png"],["x_x","http://i.imgur.com/6lbq7hQ.png"],["X3","http://i.imgur.com/h3ptrWX.png"],["XD","http://i.imgur.com/0QuZqED.png"],["yaeh am not durnk","http://i.imgur.com/DBr5C09.png"],["yarr","http://i.imgur.com/iGVDlMT.png"],["yo !","http://i.imgur.com/RrkerJp.png"],["you seem to be serious","http://i.imgur.com/FxqJvcm.png"],["you're kidding, right","http://i.imgur.com/cLvlpOE.png"],["yum","http://i.imgur.com/kyr2wtl.png"],["yuush","http://i.imgur.com/G9dB8UQ.png"]],Emojicons:[["angry","http://i.imgur.com/fUiwRnr.png"],["anguished","http://i.imgur.com/o27inQs.png"],["astonished","http://i.imgur.com/TiaNfZ0.png"],["blush","http://i.imgur.com/OC3Umql.png"],["bowtie","http://i.imgur.com/UJ183ZD.png"],["cold_sweat","http://i.imgur.com/nhiWJ4L.png"],["confounded","http://i.imgur.com/VfhuYsP.png"],["confused","http://i.imgur.com/4OJws4A.png"],["cry","http://i.imgur.com/DPMIdlT.png"],["disappointed","http://i.imgur.com/ulwFM48.png"],["disappointed relieved","http://i.imgur.com/5Yz2Ghu.png"],["dizzy face","http://i.imgur.com/LlZAi6y.png"],["expressionless","http://i.imgur.com/CaMnWq2.png"],["fearful","http://i.imgur.com/0tZMLYZ.png"],["flushed","http://i.imgur.com/JEgIboY.png"],["frowning","http://i.imgur.com/8RaAEA5.png"],["grimacing","http://i.imgur.com/67JXuIP.png"],["grin","http://i.imgur.com/Du4Doch.png"],["grinning","http://i.imgur.com/ot0GDGa.png"],["heart_eyes","http://i.imgur.com/Ny7xHQ1.png"],["hushed","http://i.imgur.com/F3eoG7n.png"],["innocent","http://i.imgur.com/bVrgTNN.png"],["joy","http://i.imgur.com/ry1LQe6.png"],["kissing","http://i.imgur.com/QVDdRiW.png"],["kissing_closed_eyes","http://i.imgur.com/26TN3Hy.png"],["kissing_heart","http://i.imgur.com/VPedYLl.png"],["kissing_smiling_eyes","http://i.imgur.com/NjoCKUK.png"],["laughing","http://i.imgur.com/KcQBfwH.png"],["mask","http://i.imgur.com/WMpLNfy.png"],["neckbeard","http://i.imgur.com/9WOHp0C.png"],["neutral face","http://i.imgur.com/1OJZXtw.png"],["no mouth","http://i.imgur.com/ms44N9K.png"],["open mouth","http://i.imgur.com/mvvPb4B.png"],["pensive","http://i.imgur.com/HuhQkNs.png"],["persevere","http://i.imgur.com/ZCbzeOR.png"],["rage","http://i.imgur.com/0pLfg6A.png"],["relaxed","http://i.imgur.com/vvKoesU.png"],["relieved","http://i.imgur.com/Gk3lc1W.png"],["satisfied","http://i.imgur.com/Si1lLKV.png"],["scream","http://i.imgur.com/9w1ekP7.png"],["sleeping","http://i.imgur.com/SjmRavh.png"],["sleepy","http://i.imgur.com/tnhQs79.png"],["smile","http://i.imgur.com/VoBxxz1.png"],["smiley","http://i.imgur.com/zMf3ZjF.png"],["smirk","http://i.imgur.com/3vFOrQn.png"],["sob","http://i.imgur.com/PyFII2u.png"],["stuck out tongue","http://i.imgur.com/EWRKrDX.png"],["stuck out tongue closed eyes","http://i.imgur.com/Zmji6Fw.png"],["stuck out tongue winking eye","http://i.imgur.com/5uyMBJ3.png"],["sunglasses","http://i.imgur.com/LZN38AO.png"],["sweat","http://i.imgur.com/e0Jgvdj.png"],["sweat smile","http://i.imgur.com/S73pDeI.png"],["thumbsdown","http://i.imgur.com/SQfUD2S.png"],["thumbsup","http://i.imgur.com/T3gKIkU.png"],["tired face","http://i.imgur.com/9aIyd5A.png"],["triumph","http://i.imgur.com/TWIkYvu.png"],["unamused","http://i.imgur.com/waGTBzX.png"],["weary","http://i.imgur.com/qTcFHIL.png"],["wink","http://i.imgur.com/svggRUd.png"],["worried","http://i.imgur.com/ZugxQVF.png"],["yum","http://i.imgur.com/FTyoYkq.png"]]};
$(function () {
    "use strict";
    window.BPPUtils = {
        templateName: function () {
            return document.querySelector('body').id;
        },
        isTemplate: function (arr) {
            if (!(arr instanceof Array)) {
                arr = [arr];
            }
            return arr.indexOf(document.querySelector('body').id) > -1;
        },
        getParameterByName: function (name, from) { //http://stackoverflow.com/a/901144
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"), results = regex.exec(from);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        },
        getQuery: function (name) {
            return this.getParameterByName(name, document.URL) || null;
        },
        escapeHtml: function (html) {
            return $('<div/>').text(html).html();
        },
        nano: function (templateName, data) {
            return Template.html[templateName].replace(/\{([\w\.]*)\}/g, function (str, key) {
                var keys = key.split("."), v = data[keys.shift()], i, l;
                for (i = 0, l = keys.length; i < l; i += 1) {
                    v = v[keys[i]];
                }
                return (v !== undefined && v !== null) ? v : "";
            });
        },
        thanks: {
            getAll: function () {
                try {
                    return JSON.parse(GM_getValue('thanks_cache', '{}'));
                } catch (e) {
                    return {};
                }
            },
            get: function (userId) {
                var thanksCache = this.getAll();
                return thanksCache[userId] || -1;
            },
            set: function (userId, count) {
                var thanksCache = this.getAll();
                thanksCache[userId] = count;
                GM_setValue('thanks_cache', JSON.stringify(thanksCache));
            }
        },
        nicknames: {
            getAll: function () {
                try {
                    return JSON.parse(GM_getValue('nicknames', '{}'));
                } catch (e) {
                    return {};
                }
            },
            get: function (userId) {
                var nicknames = this.getAll();
                if (nicknames.hasOwnProperty(userId)) {
                    return nicknames[userId].nick || '';
                }
                return '';
            },
            set: function (userId, name, nick) {
                var nicknames = this.getAll();
                nicknames[userId] = {
                    'name': name,
                    'nick': nick
                };
                GM_setValue('nicknames', JSON.stringify(nicknames));
            },
            remove: function (userId) {
                var nicknames = this.getAll();
                if (nicknames.hasOwnProperty(userId)) {
                    delete nicknames[userId];
                    GM_setValue('nicknames', JSON.stringify(nicknames));
                }
            }
        },
        usernotes: {
            getAll: function () {
                try {
                    return JSON.parse(GM_getValue('usernotes', '{}'));
                } catch (e) {
                    return {};
                }
            },
            get: function (userId) {
                var usernotes = this.getAll();
                if (usernotes.hasOwnProperty(userId)) {
                    return usernotes[userId].note || '';
                }
                return '';
            },
            set: function (userId, name, note) {
                var usernotes = this.getAll();
                usernotes[userId] = {
                    'name': name,
                    'note': note
                };
                GM_setValue('usernotes', JSON.stringify(usernotes));
            },
            remove: function (userId) {
                var usernotes = this.getAll();
                if (usernotes.hasOwnProperty(userId)) {
                    delete usernotes[userId];
                    GM_setValue('usernotes', JSON.stringify(usernotes));
                }
            }
        }
    };
});
$(function () {
    "use strict";
    GM_log('executing boards.js');

    function changeLastPosts() {
        var posts = GM_getValue('option_boards_extension_lastPosts', 10);
        $('.top5box .tableList tr').slice(posts, 10).remove();
        $('.top5box .containerContent').html('<img src="icon/postS.png" alt=""> Die letzten ' + posts + ' Beiträge');
    }

    function showShoutbox() {
        var ircShoutbox_open = GM_getValue('ircShoutbox_open', true),
            $ircShoutbox = $(BPPUtils.nano('ircShoutbox', {
                icon: ircShoutbox_open ? 'wcf/icon/minusS.png' : 'scf/icon/plusS.png'
            })),
            width = 0,
            $iFrame;

        $(".top5box").before($ircShoutbox);
        width = $ircShoutbox.width();
        $ircShoutbox.hide();

        $iFrame = $('<iframe id="ircShoutboxIframe" src="http://webchat.kerat.net:3988/?nick=' + $("#userNote > a").text() + '&channels=#sa-mp.de&fg_color=57595A&fg_sec_color=57595A&bg_color=FFFFFF&prompt=0" width="' + width + '" height="400"></iframe>');
        $iFrame.css({
            'border': 'none',
            'margin-bottom': '-3px'
        });
        $ircShoutbox.append($iFrame);
        $iFrame.load(function () {
            if (!ircShoutbox_open) {
                $iFrame.hide();
            }
            $ircShoutbox.show();
        });

        $ircShoutbox.find('.containerIcon > a').click(function (e) {
            e.preventDefault();
            if (ircShoutbox_open) {
                $iFrame.slideUp();
            } else {
                $iFrame.slideDown();
            }
            ircShoutbox_open = !ircShoutbox_open;
            GM_setValue('ircShoutbox_open', ircShoutbox_open);
            $(this).find('img').attr('src', ircShoutbox_open ? 'wcf/icon/minusS.png' : 'wcf/icon/plusS.png');
        });
    }

    $(document).ready(function () {
        if (BPPUtils.isTemplate('tplIndex')) {
            if (GM_getValue('option_boards_extension_lastPosts', 10) !== 10) {
                changeLastPosts();
            }
            if (GM_getValue('option_boards_extension_ircShoutbox', false)) {
                showShoutbox();
            }
            if (GM_getValue('option_boards_extension_searchIcon', false)) {
                $('img[src="icon/searchS.png"]').attr('src', 'wcf/icon/searchHeadS.png'); //FK U BENVEI
            }
            if (GM_getValue('option_boards_filter_usersOnline', false)) {
                $('.infoBoxUsersOnline').remove();
            }
            if (GM_getValue('option_boards_filter_statistics', false)) {
                $('.infoBoxStatistics').remove();
            }
            if (GM_getValue('option_boards_filter_birthdays', false)) {
                $('.infoBox .container-1').not('.infoBoxUsersOnline').remove();
            }
        }
    });
});
$(function () {
    "use strict";
    GM_log('executing common.js');
    var $pmNotification;

    function showPrivateMessageNotification() {
        $('#pmOutstandingNotifications').hide();
        GM_xmlhttpRequest({
            method: 'GET',
            url: window.location.protocol + '//' + window.location.hostname + '/index.php?page=PMList',
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            onload: function (response) {
                if (response.status === 200) {
                    var $body = $(response.responseText),
                        messages = [];
                    $body.find('.tableList tr > .columnTitle.new').each(function () {
                        var $element = $(this),
                            tr = $element.parent('tr');
                        messages.push({
                            'title': $element.find('a').text(),
                            'text': $element.attr('title'),
                            'author': tr.find('.columnAuthor a').text(),
                            'authorID': BPPUtils.getParameterByName('userID', tr.find('.columnAuthor a').attr('href')),
                            'date': tr.find('.columnDate > p').text().split('\n')[0].trim(),
                            'id': BPPUtils.getParameterByName('pmID', $element.find('a').attr('href'))
                        });
                    });
                    if (messages.length > 0) {
                        //Fuck You Firefox
                        try {
                            $.each(messages, function (index, pm) {
                                GM_notification(pm.text, pm.title + ' von ' + pm.author + ' (' + pm.date + ')', 'http://forum.sa-mp.de/wcf/icon/pmNewL.png', function () {
                                    GM_openInTab(window.location.protocol + '//' + window.location.hostname + '/index.php?page=PMView&pmID=' + pm.id + '#pm' + pm.id);
                                }, {
                                    timeout: 5000
                                });
                            });
                        } catch (e) {
                            $pmNotification.find('.itemList').empty();
                            $.each(messages, function (index, pm) {
                                $pmNotification.find('.itemList').append('<li class="deletable"><p class="itemListTitle"><a href="index.php?page=PMView&pmID=' + pm.id + '#pm' + pm.id + '" title="' + pm.text + '">' + pm.title + '</a> von <a href="index.php?page=User&userID=' + pm.authorID + '">' + pm.author + '</a> (' + pm.date + ')</p></li>');
                            });
                            $pmNotification.show();
                        }
                    } else {
                        $pmNotification.hide();
                    }
                }
            }
        });
    }

    function setupPrivateMessageNotification() {
        showPrivateMessageNotification();
        $pmNotification = $('<div class="bpp_privateMessageNotification"><img src="wcf/icon/infoM.png"/><ul class="itemList"></ul></div>');
        $('body').append($pmNotification);

        setInterval(function () {
            showPrivateMessageNotification();
        }, 1000 * 60);
    }

    function setupTooltips() {
        var $tooltip = $('<div class="bpp_tooltip">Tooltip</div>');
        $('body').append($tooltip);
        $(document).on('mouseenter mouseleave', '[title],[data-title]', function (event) {
            var $elem = $(this),
                title = BPPUtils.escapeHtml($elem.attr('title') || $elem.attr('data-title')),
                offset = $elem.offset();
            if (event.type === 'mouseenter') {
                $elem.attr('data-title', title);
                $elem.removeAttr('title');
                $tooltip.html(title.replace(/\n/g, '<br />')).show();

                $tooltip.css({
                    'top': offset.top - $tooltip[0].offsetHeight - 5,
                    'left': offset.left + ($elem[0].offsetWidth / 2) - ($tooltip[0].offsetWidth / 2)
                });
            } else if (event.type === 'mouseleave') {
                $elem.attr('title', title);
                $elem.removeAttr('data-title');
                $tooltip.html('').hide();
            }
        });
    }

    function fixHeader() {
        if ($('head').html().indexOf('href="http://forum.sa-mp.de/wcf/style/style-5.css"') >= 0) {
            $('#main').css('margin-top', '162px');
        }
    }

    function hideGlobalAnnouncement() {
        $('#globalAnnouncement').hide();
    }

    function ajaxify_subscribeThread() {
        $('.pageOptions > a:first-child').click(function (e) {
            e.preventDefault();
            var $element = $(this),
                url = $element.attr('href'),
                isSubscribed = BPPUtils.getParameterByName('action', url) === 'ThreadSubscribe',
                baseUrl = window.location.protocol + '//' + window.location.hostname + '/';
            if (isSubscribed) {
                $element.find('img').attr('src', 'icon/thankLoadS.gif');
                $element.find('span').text('Wird abonniert...');
                GM_xmlhttpRequest({
                    method: 'GET',
                    url: url,
                    headers : {"Content-Type": "application/x-www-form-urlencoded"},
                    onload: function () {
                        $element.attr('href', baseUrl + 'index.php?action=ThreadUnsubscribe&threadID=' + unsafeWindow.threadID + '&t=' + unsafeWindow.SECURITY_TOKEN);
                        $element.find('img').attr('src', 'icon/unsubscribeS.png');
                        $element.find('span').text('Thema abbestellen');
                    }
                });
            } else {
                $element.find('img').attr('src', 'icon/thankLoadS.gif');
                $element.find('span').text('Wird abbestellt...');
                GM_xmlhttpRequest({
                    method: 'GET',
                    url: url,
                    headers : {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    onload: function () {
                        $element.attr('href', baseUrl + 'index.php?action=ThreadSubscribe&threadID=' + unsafeWindow.threadID + '&t=' + unsafeWindow.SECURITY_TOKEN);
                        $element.find('img').attr('src', 'icon/subscribeS.png');
                        $element.find('span').text('Thema abonnieren');
                    }
                });
            }
        });
    }

    function ajaxify_rateThread() {
        var $threadRatingSpan = $('#threadRatingSpan'),
            $loading = $('<img src="icon/thankLoadS.gif" alt="loading" style="display:none" />'),
            rating = $threadRatingSpan.find('img[src="icon/ratingS.png"]').length,
            threadID = unsafeWindow.threadID,
            pageNo = $('.pageOptions form input[name="pageNo"]').val();
        $threadRatingSpan.find('img').each(function () {
            $(this)[0].onclick = null;
            $(this)[0].onmouseover = null;
        });
        if ($threadRatingSpan.length > 0) {
            $threadRatingSpan[0].onmouseout = null;
        }

        $loading.insertAfter($threadRatingSpan);

        $threadRatingSpan.find('img').css({cursor: 'pointer'}).click(function (event) {
            event.preventDefault();
            rating = parseInt($(this).attr('name'), 10);
            $('#threadRating').val(rating);
            $threadRatingSpan.find('img').attr('src', 'icon/noRatingS.png').slice(0, rating).attr('src', 'icon/ratingS.png');

            $loading.show();
            $threadRatingSpan.hide();
            var baseUrl = window.location.protocol + '//' + window.location.hostname + '/';
            GM_xmlhttpRequest({
                method: "POST",
                synchronous: true,
                url: baseUrl + 'index.php?page=Thread',
                data: 'threadID=' + threadID + '&pageNo=' + pageNo + '&rating=' + rating,
                headers : {"Content-Type": "application/x-www-form-urlencoded"},
                onload: function () {
                    $loading.hide();
                    $threadRatingSpan.show();
                }
            });
        });
        $threadRatingSpan.find('img').mouseover(function () {
            $threadRatingSpan.find('img').attr('src', 'icon/noRatingS.png').slice(0, parseInt($(this).attr('name'), 10)).attr('src', 'icon/ratingS.png');
        }).mouseout(function () {
            $threadRatingSpan.find('img').attr('src', 'icon/noRatingS.png').slice(0, rating).attr('src', 'icon/ratingS.png');
        });
    }

    function ajaxify_subscribeBoard() {
        $('.pageOptions > a:first-child').click(function (event) {
            event.preventDefault();
            var $element = $(this),
                url = $element.attr('href'),
                isSubscribed = BPPUtils.getParameterByName('action', url) === 'BoardSubscribe',
                baseUrl = window.location.protocol + '//' + window.location.hostname + '/';
            if (isSubscribed) {
                $element.find('img').attr('src', 'icon/thankLoadS.gif');
                $element.find('span').text('Wird abonniert...');
                GM_xmlhttpRequest({
                    method: 'GET',
                    url: url,
                    headers : {"Content-Type": "application/x-www-form-urlencoded"},
                    onload: function () {
                        $element.attr('href', baseUrl + 'index.php?action=BoardUnsubscribe&boardID=' + unsafeWindow.boardID + '&t=' + unsafeWindow.SECURITY_TOKEN);
                        $element.find('img').attr('src', 'icon/unsubscribeS.png');
                        $element.find('span').text('Forum abbestellen');
                    }
                });
            } else {
                $element.find('img').attr('src', 'icon/thankLoadS.gif');
                $element.find('span').text('Wird abbestellt...');
                GM_xmlhttpRequest({
                    method: 'GET',
                    url: url,
                    headers : {"Content-Type": "application/x-www-form-urlencoded"},
                    onload: function () {
                        $element.attr('href', baseUrl + 'index.php?action=BoardSubscribe&boardID=' + unsafeWindow.boardID + '&t=' + unsafeWindow.SECURITY_TOKEN);
                        $element.find('img').attr('src', 'icon/subscribeS.png');
                        $element.find('span').text('Forum abonnieren');
                    }
                });
            }
        });
    }

    function ajaxify_markBoardAsRead() {
        $('.pageOptions > a:last-child').click(function (event) {
            event.preventDefault();
            var $element = $(this),
                url = $element.attr('href');
            $element.find('img').attr('src', 'icon/thankLoadS.gif');
            $element.find('span').text('Wird als gelesen markiert...');
            GM_xmlhttpRequest({
                method: 'GET',
                url: url,
                headers : {"Content-Type": "application/x-www-form-urlencoded"},
                onload: function () {
                    $element.find('img').attr('src', 'icon/boardMarkAsReadS.png');
                    $element.find('span').text('Forum wurde als gelesen markiert');
                    $('.topic.new').each(function () {
                        $(this).removeClass('new');
                        $(this).find(' > a').remove();
                    });
                    $('img[src$="threadNewM.png"]').attr('src', 'icon/threadM.png');
                    $('img[src$="threadNewOptionsM.png"]').attr('src', 'icon/threadOptionsM.png');
                }
            });
        });
    }

    function ajaxify_markAllBoardsAsRead() {
        $('.pageOptions > a:last-child').click(function (event) {
            event.preventDefault();
            var $element = $(this),
                url = $element.attr('href');
            $element.find('img').attr('src', 'icon/thankLoadS.gif');
            $element.find('span').text('Alle Foren werden als gelesen markiert...');
            GM_xmlhttpRequest({
                method: 'GET',
                url: url,
                headers : {"Content-Type": "application/x-www-form-urlencoded"},
                onload: function () {
                    $element.find('img').attr('src', 'icon/boardMarkAsReadS.png');
                    $element.find('span').text('Alle Foren wurden als gelesen markiert');
                    $('a[id^="boardLink"]').removeClass('new').find('span').remove();
                    $('.columnTop5TopicTitle > a.new').each(function () {
                        $(this).removeClass('new');
                        $(this).parent('.columnTop5TopicTitle').find(' > img').attr('src', 'icon/threadS.png');
                    });
                }
            });
        });
    }

    function ajaxify_changeStyle() {
        $('#changeStyleMenu > ul > li > a').click(function (event) {
            event.preventDefault();
            var styleURL = $(this).attr('href'),
                styleID = BPPUtils.getParameterByName('styleID', styleURL),
                baseUrl = window.location.protocol + '//' + window.location.hostname + '/',
                styleElement = $('link[href^="' + baseUrl + 'wcf/style/style-"]');
            $('#changeStyleMenu > ul > li.active').removeClass('active');
            $(this).parent('li').addClass('active');

            styleElement[0].disabled = true;
            styleElement.attr('href', baseUrl + 'wcf/style/style-' + styleID + '.css');
            styleElement[0].disabled = false;
            GM_xmlhttpRequest({
                method: 'GET',
                url: styleURL,
                headers : {"Content-Type": "application/x-www-form-urlencoded"}
            });
        });
    }

    function fixTabmenu() {
        if ($('head').html().indexOf('href="http://forum.sa-mp.de/wcf/style/style-8.css"') >= 0) {
            GM_addStyle('.tabMenu li:not(.activeTabMenu) a:hover{color: #FFF;}');
        }
    }

    function fixExpander() {
        if ($('.expander').length !== 0) {
            $('.expander').each(function (i) {
                var element = $(this);
                element.parent('.expanderContainer').find('img').first().attr('onclick', 'openList(\'expander' + i + '\', { save: false })').unbind('click').attr('id', 'expander' + i + 'Image');
                element.parent('.expanderContainer').find('span').first().attr('id', 'expander' + i + 'Teaser');
                element.attr('id', 'expander' + i);
                $('#expander' + i).hide();
            });
        }
    }

    function fixImageResize() {
        var width = $('.message:not(.quickReply):not(.deleted) .messageBody > div').first().width() - 20;
        $('.resizeImage').each(function () {
            var $img = $(this);
            $img.attr('class', 'bpp_resizeImage').css({
                maxWidth: width
            });
            if ($img.closest('a').length === 0) {
                $img.wrap('<a href="' + $img.attr('src') + '" class="externalURL"></a>');
            }
        });
    }

    $(document).ready(function () {
        GM_addStyle(Template.css.common);
        if (GM_getValue('option_common_extension_privateMessageNotification', false)) {
            setupPrivateMessageNotification();
        }
        if (GM_getValue('option_common_extension_tooltip', false)) {
            setupTooltips();
        }
        if (GM_getValue('option_common_bugfix_headerFix', false)) {
            fixHeader();
        }
        if (GM_getValue('option_common_bugfix_tabmenu', false)) {
            fixTabmenu();
        }
        if (GM_getValue('option_common_bugfix_expander', false)) {
            if (BPPUtils.isTemplate(['tplPostAdd', 'tplThreadAdd', 'tplPmNew', 'tplPostEdit', 'tplThread', 'tplUserProfile'])) {
                fixExpander();
            }
        }
        if (GM_getValue('option_common_bugfix_imageResize', false)) {
            if (BPPUtils.isTemplate(['tplPostAdd', 'tplPmNew', 'tplPostEdit', 'tplThread'])) {
                fixImageResize();
            }
        }
        if (GM_getValue('option_common_filter_announce', false)) {
            hideGlobalAnnouncement();
        }
        if (GM_getValue('option_common_extension_ajaxify', false)) {
            if (BPPUtils.isTemplate('tplThread')) {
                ajaxify_subscribeThread();
                ajaxify_rateThread();
            } else if (BPPUtils.isTemplate('tplBoard')) {
                ajaxify_subscribeBoard();
                ajaxify_markBoardAsRead();
            } else if (BPPUtils.isTemplate('tplIndex')) {
                ajaxify_markAllBoardsAsRead();
            }
            ajaxify_changeStyle();
        }
    });
});
$(function () {
    "use strict";
    GM_log('executing keyboard.js');

    function navigateThread() {
        $(document).keydown(function (event) {
            if (event.target.tagName.toLowerCase() !== 'input' && event.target.tagName.toLowerCase() !== 'textarea') {
                var vpDistance = $(window).scrollTop(),
                    $element = null,
                    $prev = null,
                    $next = null,
                    $messages = $('.message:not(.quickReply):not(.deleted)'),
                    prevPage = NaN,
                    nextPage = NaN;
                if (GM_getValue('option_keyboard_prev_page', -1) !== -1 && event.keyCode === GM_getValue('option_keyboard_prev_page', -1)) {
                    $('.pageNavigation ul li').each(function (i) {
                        if ($(this).hasClass('active')) {
                            prevPage = parseInt($($('.pageNavigation ul li').get(i - 1)).find('a').text(), 10);
                        }
                    });
                    if (!isNaN(prevPage)) {
                        window.location.href = 'index.php?page=Thread&threadID=' + unsafeWindow.threadID + '&pageNo=' + prevPage;
                    }
                    return false;
                }
                if (GM_getValue('option_keyboard_prev_post', -1) !== -1 && event.keyCode === GM_getValue('option_keyboard_prev_post', -1)) {
                    $('html, body').finish();
                    $messages.each(function (i) {
                        if ($element === null || Math.abs($(this).offset().top - vpDistance) < Math.abs($element.offset().top - vpDistance)) {
                            $element = $(this);
                            if (i > 0) {
                                $prev = $($messages.get(i - 1));
                            } else {
                                $prev = null;
                            }
                        }
                    });
                    if ((Math.round($element.offset().top) < (vpDistance + 10) && Math.round($element.offset().top) > (vpDistance - 10))) {
                        if ($prev !== null) {
                            $element = $prev;
                        } else {
                            $('.pageNavigation ul li').each(function (i) {
                                if ($(this).hasClass('active')) {
                                    prevPage = parseInt($($('.pageNavigation ul li').get(i - 1)).find('a').text(), 10);
                                }
                            });
                            if (!isNaN(prevPage)) {
                                window.location.href = 'index.php?page=Thread&threadID=' + unsafeWindow.threadID + '&pageNo=' + prevPage;
                            }
                        }
                    }
                    $('html, body').stop().animate({
                        scrollTop: $element.offset().top
                    }, 500);
                    return false;
                }
                if (GM_getValue('option_keyboard_next_page', -1) !== -1 && event.keyCode === GM_getValue('option_keyboard_next_page', -1)) {
                    $('.pageNavigation ul li').each(function (i) {
                        if ($(this).hasClass('active')) {
                            nextPage = parseInt($($('.pageNavigation ul li').get(i + 1)).find('a').text(), 10);
                        }
                    });
                    if (!isNaN(nextPage)) {
                        window.location.href = 'index.php?page=Thread&threadID=' + unsafeWindow.threadID + '&pageNo=' + nextPage;
                    }
                    return false;
                }
                if (GM_getValue('option_keyboard_next_post', -1) !== -1 && event.keyCode === GM_getValue('option_keyboard_next_post', -1)) {
                    $('html, body').finish();
                    $messages.each(function (i) {
                        if ($element === null || Math.abs($(this).offset().top - vpDistance) < Math.abs($element.offset().top - vpDistance)) {
                            $element = $(this);
                            if (i < $messages.length - 1) {
                                $next = $($messages.get(i + 1));
                            } else {
                                $next = null;
                            }
                        }
                    });
                    if ((Math.round($element.offset().top) < (vpDistance + 10) && Math.round($element.offset().top) > (vpDistance - 10))) {
                        if ($next !== null && ($(window).scrollTop() + $(window).height() !== $(document).height())) {
                            $element = $next;
                        } else {
                            $('.pageNavigation ul li').each(function (i) {
                                if ($(this).hasClass('active')) {
                                    nextPage = parseInt($($('.pageNavigation ul li').get(i + 1)).find('a').text(), 10);
                                }
                            });
                            if (!isNaN(nextPage)) {
                                window.location.href = 'index.php?page=Thread&threadID=' + unsafeWindow.threadID + '&pageNo=' + nextPage;
                            }
                        }
                    }
                    $('html, body').animate({
                        scrollTop: $element.offset().top
                    }, 500);
                    return false;
                }
            }
        });
    }

    $(document).ready(function () {
        if (BPPUtils.isTemplate('tplThread')) {
            navigateThread();
        }
    });

});
$(function () {
    "use strict";
    GM_log('executing options.js');
    var keyNames = {8: "Backspace", 9: "Tab", 13: "Enter", 16: "Shift", 17: "Ctrl", 18: "Alt", 19: "Pause/Break", 20: "Caps Lock", 27: "Esc", 32: "Space", 33: "Page Up", 34: "Page Down", 35: "End", 36: "Home", 37: "Left", 38: "Up", 39: "Right", 40: "Down", 45: "Insert", 46: "Delete", 48: "0", 49: "1", 50: "2", 51: "3", 52: "4", 53: "5", 54: "6", 55: "7", 56: "8", 57: "9", 65: "A", 66: "B", 67: "C", 68: "D", 69: "E", 70: "F", 71: "G", 72: "H", 73: "I", 74: "J", 75: "K", 76: "L", 77: "M", 78: "N", 79: "O", 80: "P", 81: "Q", 82: "R", 83: "S", 84: "T", 85: "U", 86: "V", 87: "W", 88: "X", 89: "Y", 90: "Z", 91: "Windows", 93: "Right Click", 96: "Numpad 0", 97: "Numpad 1", 98: "Numpad 2", 99: "Numpad 3", 100: "Numpad 4", 101: "Numpad 5", 102: "Numpad 6", 103: "Numpad 7", 104: "Numpad 8", 105: "Numpad 9", 106: "Numpad *", 107: "Numpad +", 109: "Numpad -", 110: "Numpad .", 111: "Numpad /", 112: "F1", 113: "F2", 114: "F3", 115: "F4", 116: "F5", 117: "F6", 118: "F7", 119: "F8", 120: "F9", 121: "F10", 122: "F11", 123: "F12", 144: "Num Lock", 145: "Scroll Lock", 182: "My Computer", 183: "My Calculator", 186: ";", 187: "=", 188: ", ", 189: "-", 190: ".", 191: "/", 192: "`", 219: "[", 220: "\\", 221: "]", 222: "'"};

    function getKeyName(key) {
        return keyNames[key] || 'Keine Taste zugewiesen';
    }

    function addNicknameOptions() {
        $('.subTabMenu ul').append('<li><a href="#nicknames"><span>Spitznamen</span></a></li>');
        var body = '', alert = '', nicknames = BPPUtils.nicknames.getAll(), index = 0;
        if (Object.keys(nicknames).length === 0) {
            alert = '<p class="info">Keine Spitznamen vergeben.</p>';
        }
        $.each(nicknames, function (userId, value) {
            body += '<tr class="container-' + ((index % 2) + 1) + '">';
            body += '<td style="text-align:center;"><a href="index.php?page=User&userID=' + userId + '#bpp_nickname_input">' + value.name + '</a></td>';
            body += '<td style="text-align:center;">' + value.nick + '</td>';
            body += '</tr>';
            index += 1;
        });
        $('.tabMenuContent').append($(BPPUtils.nano('optionNicknames', {
            'body': body,
            'alert': alert,
            'count': Object.keys(nicknames).length
        })));
        if (alert.length !== 0) {
            $('#nicknames .border').hide();
        }
    }

    function addUsernotes() {
        $('.subTabMenu ul').append('<li><a href="#usernotes"><span>Benutzernotizen</span></a></li>');
        var body = '', alert = '', usernotes = BPPUtils.usernotes.getAll(), index = 0;
        if (Object.keys(usernotes).length === 0) {
            alert = '<p class="info">Keine Notizen vorhanden.</p>';
        }
        $.each(usernotes, function (userId, value) {
            body += '<tr class="container-' + ((index % 2) + 1) + '">';
            body += '<td style="text-align:center;"><a href="index.php?page=User&userID=' + userId + '&userNote=go">' + value.name + '</a></td>';
            body += '<td style="text-align:center;">' + value.note + '</td>';
            body += '</tr>';
            index += 1;
        });
        $('.tabMenuContent').append($(BPPUtils.nano('optionUsernotes', {
            'body': body,
            'alert': alert,
            'count': Object.keys(usernotes).length
        })));
        if (alert.length !== 0) {
            $('#usernotes .border').hide();
        }
    }

    function getOption(option) {
        if (option.type === 'toggle') {
            GM_setValue(option.key, GM_getValue(option.key, false));
            return $(BPPUtils.nano('optionToggle', {
                'key': option.key,
                'name': option.name,
                'desc': option.desc,
                'checked': GM_getValue(option.key, false) ? 'checked="checked"' : ''
            }));
        }
        if (option.type === 'range') {
            GM_setValue(option.key, GM_getValue(option.key, 10));
            return $(BPPUtils.nano('optionRange', {
                'key': option.key,
                'name': option.name,
                'desc': option.desc,
                'min': option.range[0],
                'max': option.range[1],
                'value': GM_getValue(option.key, 10)
            }));
        }
        if (option.type === 'keyboard') {
            GM_setValue(option.key, GM_getValue(option.key, -1));
            return $(BPPUtils.nano('optionKeyboard', {
                'key': option.key,
                'name': option.name,
                'desc': option.desc,
                'value': getKeyName(GM_getValue(option.key, -1))
            }));
        }
    }

    function showOptions() {
        var $tabMenuContent = $('.tabMenuContent'),
            $subTabMenu = $('.subTabMenu ul');
        $tabMenuContent.empty();
        $subTabMenu.empty();

        $.each(DefaultOptions, function (key, category) {
            $subTabMenu.append('<li><a href="#' + category.key + '"><span>' + category.name + '</span></a></li>');

            var $bpp_option_category = $('<div id="' + category.key + '" class="container-1 bpp_option_category"><h3 class="subHeadline">' + category.name + '</h3></div>');
            $tabMenuContent.append($bpp_option_category);

            $.each(category.panels, function (name, options) {
                var $bpp_option_panel = $('<fieldset></fieldset>');
                if (name !== 'null') {
                    $bpp_option_panel.append('<legend>' + name + '</legend>');
                }
                $.each(options, function (index, option) {
                    $bpp_option_panel.append(getOption(option));
                });
                $bpp_option_category.append($bpp_option_panel);
            });
        });
        addNicknameOptions();
        addUsernotes();
        $subTabMenu.find('li').first().addClass('activeSubTabMenu');
        $tabMenuContent.find('.bpp_option_category').first().show();
        $('.formSubmit').remove();

        $subTabMenu.find('a').click(function (event) {
            event.preventDefault();
            $('.activeSubTabMenu').removeClass('activeSubTabMenu');
            $(this).parent('li').addClass('activeSubTabMenu');

            var key = $(this).attr('href').substr(1);
            $('.bpp_option_category').hide();
            $('.bpp_option_category#' + key).show();
        });

        $tabMenuContent.find('input[type="checkbox"]').change(function () {
            GM_setValue($(this).attr('name'), $(this).is(':checked'));
        });
        $tabMenuContent.find('input[type="range"]').change(function () {
            var val = parseInt($(this).val(), 10);
            GM_setValue($(this).attr('name'), val);
            $(this).parent('.formField').find('.indicator').text(val);
        });
        $tabMenuContent.find('input[type="button"]').click(function (e) {
            e.preventDefault();
            var $btn = $(this),
                name = $btn.attr('name');
            $btn.focus().val('Zuzuweisende Taste drücken...').addClass('disabled').on('keydown', function (event) {
                event.preventDefault();
                var charCode = event.which || event.keyCode;
                if (charCode === 27) {
                    GM_setValue(name, -1);
                    $btn.blur().val('Keine Taste zugewiesen').removeClass('disabled').off(event).unbind('blur');
                } else {
                    GM_setValue(name, charCode);
                    $btn.blur().val(getKeyName(charCode)).removeClass('disabled').off(event).unbind('blur');
                }
            }).on('blur', function (event) {
                event.preventDefault();
                $btn.val('Keine Taste zugewiesen').removeClass('disabled').off(event).unbind('blur');
            });
        });
    }

    $(document).ready(function () {
        GM_addStyle(Template.css.options);
        $('#userMenu ul').append('<li><a href="index.php?form=UserProfileEdit&category=settings.general&show=BreadfishPlusPlus"><img src="http://forum.sa-mp.de/favicon.ico" alt=""> <span>Breadfish++</span></a></li>');
        if (BPPUtils.isTemplate(['tplUserProfileEdit', 'tplSubscriptions', 'tplModerationOverview', 'tplAccountManagement', 'tplAvatarEdit', 'tplSignatureEdit', 'tplBoardIgnore', 'tplWhiteListEdit', 'tplBlackListEdit', 'tplUserAttachmentList', 'tplModerationReports', 'tplModerationPosts', 'tplModerationThreads'])) {
            $('#profileEditContent ul').append('<li><a href="index.php?form=UserProfileEdit&category=settings.general&show=BreadfishPlusPlus" id="bpp_options_open"><img height="24" src="data:image/png;base64,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" alt=""> <span>Breadfish++</span></a></li>');
        }
        if (BPPUtils.getQuery('form') === 'UserProfileEdit' && BPPUtils.getQuery('category') === 'settings.general' && BPPUtils.getQuery('show') === 'BreadfishPlusPlus') {
            $('#profileEditContent ul li.activeTabMenu').removeClass('activeTabMenu');
            $('#bpp_options_open').parent('li').addClass('activeTabMenu');
            showOptions();
        }
    });
});
$(function () {
    "use strict";
    GM_log('executing postCreate.js');

    function getCaretPosition(ctrl) {
        if (ctrl.setSelectionRange) {
            return ctrl.selectionEnd;
        }
        if (document.selection && document.selection.createRange) {
            var range = document.selection.createRange(), start = range.duplicate().moveStart('character', -100000);
            return start + range.text.length;
        }
    }

    function setCaretPosition(ctrl, pos) {
        if (ctrl.setSelectionRange) {
            ctrl.focus();
            ctrl.setSelectionRange(pos, pos);
        } else if (ctrl.createTextRange) {
            var range = ctrl.createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    }

    function getNick(text, caret) {
        var result = /\S+$/.exec(text.slice(0, caret));
        return result ? (result[0].indexOf('@') === 0 ? result[0].substr(1) : null) : null;
    }

    function addNickAutocomplete() {
        var $editorCodeView = $('.editorCodeView'),
            $nickCompletionList = $(Template.nickCompletionList),
            reset = false;

        $nickCompletionList.hide().appendTo('body');
        $editorCodeView.keydown(function (event) {
            var text = $editorCodeView.val(),
                caret = getCaretPosition(this),
                nick = getNick(text, caret),
                offset = $editorCodeView.offset(),
                charCode = event.which || event.keyCode,
                insert,
                listIndex;

            if (charCode === 27) { //ESC = Stop suggesting for this word
                reset = true;
            } else if (charCode === 9) { // Tabulator = select next name in list
                listIndex = $nickCompletionList.find('ul li.active').index();
                if (listIndex !== -1) {
                    $nickCompletionList.find('ul li.active').removeClass('active');
                    if (listIndex === $nickCompletionList.find('ul li').length - 1) {
                        $nickCompletionList.find('ul li').eq(0).addClass('active');
                    } else {
                        $nickCompletionList.find('ul li').eq(listIndex + 1).addClass('active');
                    }
                    event.preventDefault();
                }
            } else if (charCode === 32) { //Space = select current name
                reset = false;
                insert = $nickCompletionList.find('ul li.active a').text();
                if (insert.length !== 0) {
                    insert = insert.substr(nick.length) + ': ';
                    $editorCodeView.val(text.substr(0, caret) + insert + text.substr(caret));
                    setCaretPosition(this, caret + insert.length);
                    $nickCompletionList.hide().find('ul').empty();
                    event.preventDefault();
                    return;
                }
            } else if (nick && nick.length >= 1 && !reset) {//A-Z, 0-9, NUmpad
                GM_xmlhttpRequest({
                    method: 'POST',
                    url: window.location.protocol + '//' + window.location.hostname + '/index.php?page=PublicUserSuggest',
                    data: 'query=' + nick,
                    headers: {"Content-Type": "application/x-www-form-urlencoded"},
                    onload: function (response) {
                        $nickCompletionList.hide().find('ul').empty();
                        if (response.status === 200) {
                            $($.parseXML(response.responseText)).find('user').each(function (index) {
                                $nickCompletionList.find('ul').append('<li' + (index === 0 ? ' class="active"' : '') + '><a href="#">' + $(this).text() + '</a></li>');
                            });
                            offset.left -= $nickCompletionList.outerWidth() + 5;
                            $nickCompletionList.css(offset).show();
                        }
                    }
                });
            } else {
                $nickCompletionList.hide().find('ul').empty();
            }
        });
    }

    function addSmilies(smilieCategorys) {
        if (smilieCategorys.length > 0) {
            var $smileyContainer = $('#smileyContainer');
            $.each(smilieCategorys, function (cIndex, category) {
                unsafeWindow.smileyCategories.set(cIndex + 1, category + ' (' + Smilies[category].length + ')');
                $smileyContainer.append('<ul id="smileyCategory-' + (cIndex + 1) + '" class="hidden"></ul>');
            });
            unsafeWindow.smileyCategorySwitcher.showSmileyCategories();
            $.each(smilieCategorys, function (categoryIndex, categoryName) {
                $.each(Smilies[categoryName], function (sIndex, smilie) {
                    $('ul#smileyCategory-' + (categoryIndex + 1)).append('<li><img onmouseover="this.style.cursor=\'pointer\'" onclick="WysiwygInsert(\'smiley\', \'' + smilie[1] + '\', \'' + smilie[1] + '\', \'[img]' + smilie[1] + '[/img]\');" src="' + smilie[1] + '" alt="" title="' + smilie[0] + '" style="cursor: pointer;"></li>');
                });
            });
            if ($('#smiliesTab.activeTabMenu').length === 0) {
                unsafeWindow.smileyCategorySwitcher.hideSmileyCategories();
            }
            $('#tabMenu li a').click(function () {
                if ($(this).parent('li').attr('id') === 'smiliesTab') {
                    unsafeWindow.smileyCategorySwitcher.showSmileyCategories();
                } else {
                    unsafeWindow.smileyCategorySwitcher.hideSmileyCategories();
                }
            });
        }
    }

    if (BPPUtils.isTemplate(['tplPostAdd', 'tplThreadAdd', 'tplPmNew', 'tplPostEdit'])) {
        if (GM_getValue('option_postCreate_bbcode_email', false)) {
            unsafeWindow.language['email.title'] = 'E-mail address';
            unsafeWindow.language['email.attribute1.promptText'] = 'TODO:';
            unsafeWindow.extraBBCodes.email.icon = 'insertEmailM.png';
        }
        if (GM_getValue('option_postCreate_bbcode_sub', false)) {
            unsafeWindow.language['sub.title'] = 'Text tiefstellen';
            unsafeWindow.extraBBCodes.sub.icon = 'insertSubM.png';
        }
        if (GM_getValue('option_postCreate_bbcode_sup', false)) {
            unsafeWindow.language['sup.title'] = 'Text hochstellen';
            unsafeWindow.extraBBCodes.sup.icon = 'insertSupM.png';
        }
        if (GM_getValue('option_postCreate_bbcode_php', false)) {
            unsafeWindow.extraBBCodes.php.icon = 'insertPhpM.png';
        }
        if (GM_getValue('option_postCreate_bbcode_java', false)) {
            unsafeWindow.extraBBCodes.java.icon = 'insertJavaM.png';
        }
        if (GM_getValue('option_postCreate_bbcode_css', false)) {
            unsafeWindow.extraBBCodes.css.icon = 'insertCssM.png';
        }
        if (GM_getValue('option_postCreate_bbcode_html', false)) {
            unsafeWindow.extraBBCodes.html.icon = 'insertHtmlM.png';
        }
        if (GM_getValue('option_postCreate_bbcode_xml', false)) {
            unsafeWindow.extraBBCodes.xml.icon = 'insertHtmlM.png';
        }
        if (GM_getValue('option_postCreate_bbcode_js', false)) {
            unsafeWindow.extraBBCodes.js.icon = 'insertJavaScriptM.png';
        }
        if (GM_getValue('option_postCreate_bbcode_c', false)) {
            unsafeWindow.extraBBCodes.c.icon = 'insertCM.png';
        }
        if (GM_getValue('option_postCreate_bbcode_dropdown', false)) {
            unsafeWindow.language['dropdown.title'] = 'Dropdown';
            unsafeWindow.extraBBCodes.dropdown.icon = 'editorResizeM.png';
        }
        if (GM_getValue('option_postCreate_bbcode_sevenload', false)) {
            unsafeWindow.extraBBCodes.sevenload.icon = 'sevenLoadM.png';
        }
        if (GM_getValue('option_postCreate_bbcode_clipfish', false)) {
            unsafeWindow.extraBBCodes.clipfish.icon = 'clipfishM.png';
        }
        if (GM_getValue('option_postCreate_bbcode_googlevideo', false)) {
            unsafeWindow.extraBBCodes.googlevideo.icon = 'googleVideoM.png';
        }
        if (GM_getValue('option_postCreate_bbcode_myspace', false)) {
            unsafeWindow.extraBBCodes.myspace.icon = 'mySpaceM.png';
        }
        if (GM_getValue('option_postCreate_bbcode_myvideo', false)) {
            unsafeWindow.extraBBCodes.myvideo.icon = 'myVideoM.png';
        }



        $(document).ready(function () {
            GM_addStyle(Template.css.postCreate);
            if (GM_getValue('option_postCreate_extension_nickcomplete', false)) {
                addNickAutocomplete();
            }
            var smilieCategorys = [];
            if (GM_getValue('option_postCreate_smilies_mlp', false)) {
                smilieCategorys.push('My Little Pony');
            }
            if (GM_getValue('option_postCreate_smilies_rage', false)) {
                smilieCategorys.push('Rageicons');
            }
            if (GM_getValue('option_postCreate_smilies_icq', false)) {
                smilieCategorys.push('Kolobok (ICQ)');
            }
            if (GM_getValue('option_postCreate_smilies_skype', false)) {
                smilieCategorys.push('Skype');
            }
            if (GM_getValue('option_postCreate_smilies_yolks', false)) {
                smilieCategorys.push('Y o l k s');
            }
            if (GM_getValue('option_postCreate_smilies_emoji', false)) {
                smilieCategorys.push('Emojicons');
            }
            addSmilies(smilieCategorys);
            if (GM_getValue('option_postCreate_bbcode_email', false)) {
                $('img[src="wcf/icon/wysiwyg/insertEmailM.png"]').attr('src', 'http://i.imgur.com/cxDasR7.png');
            }
            if (GM_getValue('option_postCreate_bbcode_sub', false)) {
                $('img[src="wcf/icon/wysiwyg/insertSubM.png"]').attr('src', 'http://i.imgur.com/lDbBhzJ.png');
            }
            if (GM_getValue('option_postCreate_bbcode_sup', false)) {
                $('img[src="wcf/icon/wysiwyg/insertSupM.png"]').attr('src', 'http://i.imgur.com/8alKTkm.png');
            }
            if (GM_getValue('option_postCreate_bbcode_dropdown', false)) {
                $('img[src="wcf/icon/wysiwyg/insertSupM.png"]').attr('src', 'http://i.imgur.com/8alKTkm.png');
            }
        });
    }
});
$(function () {
    "use strict";
    GM_log('executing posts.js');

    function getYoutubeLength(totalSec) {
        var hours = parseInt(totalSec / 3600, 10) % 24, minutes = parseInt(totalSec / 60, 10) % 60, seconds = parseInt(totalSec % 60, 10);
        return (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds  < 10 ? "0" + seconds : seconds);
    }

    function showYoutubePreview() {
        var mNames = ['Jan', 'Feb', 'Mrz', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
            width = $('.message:not(.quickReply):not(.deleted) .messageBody > div').first().width();
        $('.message:not(.quickReply):not(.deleted) .messageContentInner object').each(function () {
            var $object = $(this),
                videoId = $object.attr('data').substr(-17, 11);

            $object.attr('id', 'object-' + videoId);
            $object.hide();

            GM_xmlhttpRequest({
                method: 'GET',
                url: 'http://gdata.youtube.com/feeds/api/videos/' + videoId + '?v=2&alt=json',
                headers : {"Content-Type": "application/x-www-form-urlencoded"},
                onload: function (response) {
                    if (response.status === 200) {
                        var data = JSON.parse(response.responseText),
                            date = new Date(data.entry.media$group.yt$uploaded.$t),
                            $preview = $(BPPUtils.nano('youtubePreview', {
                                'thumbnail': data.entry.media$group.media$thumbnail[0].url,
                                'title': data.entry.title.$t,
                                'author': data.entry.author[0].name.$t,
                                'day': date.getDate(),
                                'month': mNames[date.getMonth()],
                                'year': date.getFullYear(),
                                'hours': date.getHours(),
                                'minutes': date.getMinutes(),
                                'length': getYoutubeLength(data.entry.media$group.yt$duration.seconds),
                                'clicks': data.entry.yt$statistics.viewCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),
                                'videoId': videoId
                            }));
                        $object.replaceWith($preview);
                        $preview.find('.bpp_youtube_preview_link').click(function (e) {
                            e.preventDefault();
                            $preview.replaceWith('<iframe width="' + width + '" height="' + (width / 16 * 9) + '" src="//www.youtube-nocookie.com/embed/' + videoId + '?rel=0" frameborder="0" allowfullscreen></iframe>');
                        });
                    } else {
                        $object.show();
                    }
                }
            });
        });
    }

    function addShortUrls() {
        $('.message:not(.quickReply):not(.deleted)').each(function () {
            var $elem = $(this),
                id = $elem.attr('id').substr(7),
                url = 'http://sa-mp.de/B++/p' + id + '-/';
            $elem.find('.messageFooterRight .smallButtons > ul').append('<li><a class="bpp_shorturl" href="' + url + '" title="Kurz-URL zu diesem Beitrag"><img src="wcf/icon/wysiwyg/linkInsertM.png" height="14" alt=""> <span>Kurz-URL</span><input class="bpp_shorturl_input" type="text" value="' + url + '" /></a></li>');
        });
        $('.bpp_shorturl').click(function (e) {
            e.preventDefault();
            $(this).find('span').hide();
            $(this).find('input').show().select();
        });
        $('.bpp_shorturl_input').blur(function () {
            $(this).siblings('span').show();
            $(this).hide();
        });
    }

    function setSidebarThanks(userID, thanks) {
        var $bpp_thanks = $('.bpp_thanks[data-userID="' + userID + '"]');
        if (thanks === -2) {
            $bpp_thanks.parent('p').hide();
        } else if (thanks === -1) {
            $bpp_thanks.html('<img src="icon/thankS.png" alt="" /> <img src="icon/thankLoadS.gif" alt="" />');
        } else {
            $bpp_thanks.html('<img src="icon/thankS.png" alt="" /> ' + thanks);
        }
    }

    function getThanks(userID, callback) {
        var baseUrl = window.location.protocol + '//' + window.location.hostname + '/';
        GM_xmlhttpRequest({
            method: "GET",
            url: baseUrl + 'index.php?page=UserThankList&userID=' + userID,
            headers : {"Content-Type": "application/x-www-form-urlencoded"},
            onload: function (resp) {
                if (resp.status === 200) {
                    var data = $(resp.responseText), arr, pages, thanks;
                    if (data.find('.error').length === 0) {
                        arr = data.find('.pageNavigation ul li:not(.skip):not(.children)').toArray();
                        pages = parseInt($(arr[arr.length - 1]).text(), 10);
                        thanks = 0;
                        if (isNaN(pages)) {
                            thanks = parseInt(data.find('.tableList tbody tr').length, 10);
                            callback(thanks);
                        } else {
                            GM_xmlhttpRequest({
                                method: "GET",
                                url: baseUrl + 'index.php?page=UserThankList&userID=' + userID + '&pageNoGot=' + pages,
                                headers : {"Content-Type": "application/x-www-form-urlencoded"},
                                onload: function (resp2) {
                                    var data2 = $(resp2.responseText);
                                    thanks = parseInt(data2.find('.tableList tbody tr').length, 10);
                                    thanks += (pages - 1) * 10;
                                    BPPUtils.thanks.set(userID, thanks);
                                    callback(thanks);
                                }
                            });
                        }
                    }
                } else {
                    BPPUtils.thanks.set(userID, -2);
                    callback(-2);
                }
            }
        });
    }

    function showThanks() {
        var users = [];
        $('.message:not(.quickReply):not(.deleted)').each(function () {
            var $elem = $(this),
                userID = parseInt(BPPUtils.getParameterByName('userID', $elem.find('.messageAuthor .userName a').attr('href')), 10);
            if (users.indexOf(userID) === -1 && !isNaN(userID)) {
                users.push(userID);
            }
            $elem.find('.userCredits').append('<p><a class="bpp_thanks" data-userID="' + userID + '" href="index.php?page=UserThankList&userID=' + userID + '"><img src="icon/thankS.png" alt="" /> <img src="icon/thankLoadS.gif" alt="" /></a></p>');
        });
        $.each(users, function (index, userID) {
            var cachedThanks = BPPUtils.thanks.get(userID);
            if (cachedThanks !== -1) {
                setSidebarThanks(userID, cachedThanks);
            }
            getThanks(userID, function (thanks) {
                setSidebarThanks(userID, thanks);
            });
        });
    }

    function setupImageresize() {
        var pos = null;
        $(document).on('mousedown mousemove mouseup mouseout', '.resizeImage,.bpp_resizeImage', function (event) {
            if (event.type === 'mousedown') {
                if (event.which === 1) {
                    pos = [event.offsetX, event.offsetY];
                }
            } else if (event.type === 'mousemove') {
                if (pos !== null) {
                    var dif = (pos[0] - event.offsetX) + (pos[1] - event.offsetY) / 2;
                    $(this).css({
                        "width": '-=' + dif,
                        "height": "auto"
                    });
                    pos = [event.offsetX, event.offsetY];
                    event.preventDefault();
                }
            } else if (event.type === 'mouseup') {
                if (event.which === 1 && pos !== null) {
                    pos = null;
                    event.preventDefault();
                }
            } else if (event.type === 'mouseout') {
                pos = null;
            }
        });
    }

    function replaceYoutubeVideos() {
        $('.message:not(.quickReply):not(.deleted) .messageContentInner object').each(function () {
            var $object = $(this),
                videoId = $object.attr('data').substr(-17, 11);
            $object.replaceWith('<a href="http://www.youtube.com/watch?v=' + videoId + '" class="externalURL">http://www.youtube.com/watch?v=' + videoId + '</a>');
        });
    }

    function removeDeletedPosts() {
        $('.messageMinimized:not(.quickReply) > .messageInner > img[src="icon/postTrashM.png"]').closest('.messageMinimized').remove();
    }

    function removeThanko() {
        $('li.postThankButton, .thankStats').remove();
    }

    function removeIgnored() {
        $('.messageMinimized:not(.quickReply) > .messageInner > img[src="wcf/icon/warningM.png"]').closest('.messageMinimized').remove();
    }

    function removeBestAnswer() {
        GM_addStyle('#helpfulAnswer{display:none!important;}.helpfulAnswerPost .messageInner .messageSidebar{background-image: none!important;}');
    }

    function signatureHeight() {
        $('.signature').css('max-height', 'none');
    }

    function removeUserCredits() {
        $('.userCredits').each(function () {
            var $elem = $(this);
            if ($elem.children().length === 0) {
                $elem.remove();
            }
        });
    }

    function removePostcount() {
        $('.userCredits p > a:contains("Beiträge")').parent('p').remove();
        removeUserCredits();
    }

    function removeUsertitle() {
        $('.userTitle').remove();
    }

    function removeUserrank() {
        $('.messageAuthor').each(function () {
            $(this).find('.userRank').first().remove();
        });
    }

    function removeAdditionalUserrank() {
        $('.messageAuthor').each(function () {
            if ($(this).find('.userRank').length > 1) {
                $(this).find('.userRank').last().remove();
            }
        });
    }

    function removeRegDate() {
        $('.userCredits p:contains("Registrierungsdatum: ")').remove();
        removeUserCredits();
    }

    function removeUserSymbols() {
        $('.userSymbols').each(function () {
            var $elem = $(this);
            if ($elem.find('ul').children().length === 0) {
                $elem.remove();
            }
        });
    }

    function removeGender() {
        $('.userSymbols img[src="wcf/icon/genderMaleS.png"], .userSymbols img[src="wcf/icon/genderFemaleS.png"]').parent('li').remove();
        removeUserSymbols();
    }

    function removeXblGamertag() {
        $('.userCredits p:contains("XBL Gamertag: ")').remove();
        removeUserCredits();
    }

    function removePsnid() {
        $('.userCredits p:contains("PSN ID: ")').remove();
        removeUserCredits();
    }

    function removeSteam() {
        $('.userCredits p:contains("Steam: ")').remove();
        removeUserCredits();
    }

    function removeOrigin() {
        $('.userCredits p:contains("Origin: ")').remove();
        removeUserCredits();
    }

    function removeUserMessenger() {
        $('.userMessenger').each(function () {
            var $elem = $(this);
            if ($elem.find('ul').children().length === 0) {
                $elem.remove();
            }
        });
    }

    function removeSkype() {
        $('.userMessenger img[src="wcf/icon/skypeS.png"]').closest('li').remove();
        removeUserMessenger();
    }

    function removeWindowsLiveMessenger() {
        $('.userMessenger img[src="wcf/icon/msnS.png"]').closest('li').remove();
        removeUserMessenger();
    }

    function removeIcq() {
        $('.userMessenger img[src="wcf/icon/icqS.png"]').closest('li').remove();
        removeUserMessenger();
    }

    function removeWebsite() {
        $('.userMessenger img[src="wcf/icon/websiteS.png"]').closest('li').remove();
        removeUserMessenger();
    }

    function setupNicknames() {
        $('.message:not(.quickReply):not(.deleted)').each(function () {
            var $element = $(this),
                userId = parseInt(BPPUtils.getParameterByName('userID', $element.find('.messageSidebar .messageAuthor .userName a').attr('href')), 10),
                nick = BPPUtils.nicknames.get(userId);
            if (nick.length > 0) {
                $element.find('.messageAuthor .userName a, .userAvatar a').attr('title', 'Benutzerprofil von »' + nick + '« aufrufen');
                $element.find('.messageAuthor .userName a span').last().text(nick);
                $element.find('.messageAuthor .userName img[src="wcf/icon/offlineS.png"]').attr('title', '»' + nick + '« ist offline');
                $element.find('.messageAuthor .userName img[src="wcf/icon/onlineS.png"]').attr('title', '»' + nick + '« ist online');
                $element.find('.userSymbols ul li img[src="wcf/icon/genderMaleS.png"]').attr('title', '»' + nick + '« ist männlich');
                $element.find('.userSymbols ul li img[src="wcf/icon/genderFemaleS.png"]').attr('title', '»' + nick + '« ist weiblich');
                $element.find('.userMessenger ul li a img[src="wcf/icon/websiteS.png"]').attr('title', 'Persönliche Website von »' + nick + '« besuchen');
                $element.find('.userMessenger ul li a img[src="wcf/icon/skypeS.png"]').attr('title', '»' + nick + '« über Skype kontaktieren');
            }
        });
    }

    function setupUsernoteIcon() {
        $('.message:not(.quickReply):not(.deleted)').each(function () {
            var $element = $(this),
                userId = parseInt(BPPUtils.getParameterByName('userID', $element.find('.messageSidebar .messageAuthor .userName a').attr('href')), 10),
                note = BPPUtils.usernotes.get(userId) || 'Notiz hinzufügen';
            $element.find('.messageSidebar .userMessenger ul').prepend('<li><a href="index.php?page=User&userID=' + userId + '&userNote=go" id="showNote" title="' + note + '"><img src="wcf/icon/fileTypeIconTextM.png" height="16"></a></li>');
        });
    }

    $(document).ready(function () {
        if (BPPUtils.isTemplate('tplThread')) {
            GM_addStyle(Template.css.posts);
            if (GM_getValue('option_posts_extension_shorturl', false)) {
                addShortUrls();
            }
            if (GM_getValue('option_posts_extension_youtubePreview', false) && !GM_getValue('option_posts_filter_youtube', false)) {
                showYoutubePreview();
            }
            if (GM_getValue('option_posts_extension_thanks', false)) {
                showThanks();
            }
            if (GM_getValue('option_posts_extension_signatureHeight', false)) {
                signatureHeight();
            }
            if (GM_getValue('option_posts_extension_imageResize', false)) {
                setupImageresize();
            }
            if (GM_getValue('option_posts_filter_youtube', false)) {
                replaceYoutubeVideos();
            }
            if (GM_getValue('option_posts_filter_deleted', false)) {
                removeDeletedPosts();
            }
            if (GM_getValue('option_posts_filter_thanko', false)) {
                removeThanko();
            }
            if (GM_getValue('option_posts_filter_ignored', false)) {
                removeIgnored();
            }
            if (GM_getValue('option_posts_filter_bestans', false)) {
                removeBestAnswer();
            }
            if (GM_getValue('option_posts_filter_postcount', false)) {
                removePostcount();
            }
            if (GM_getValue('option_posts_filter_usertitle', false)) {
                removeUsertitle();
            }
            if (GM_getValue('option_posts_filter_userrank', false)) {
                removeUserrank();
            }
            if (GM_getValue('option_posts_filter_additionalUserrank', false)) {
                removeAdditionalUserrank();
            }
            if (GM_getValue('option_posts_filter_regdate', false)) {
                removeRegDate();
            }
            if (GM_getValue('option_posts_filter_gender', false)) {
                removeGender();
            }
            if (GM_getValue('option_posts_filter_xblGamertag', false)) {
                removeXblGamertag();
            }
            if (GM_getValue('option_posts_filter_psnid', false)) {
                removePsnid();
            }
            if (GM_getValue('option_posts_filter_steam', false)) {
                removeSteam();
            }
            if (GM_getValue('option_posts_filter_origin', false)) {
                removeOrigin();
            }
            if (GM_getValue('option_posts_filter_website', false)) {
                removeWebsite();
            }
            if (GM_getValue('option_posts_filter_icq', false)) {
                removeIcq();
            }
            if (GM_getValue('option_posts_filter_msn', false)) {
                removeWindowsLiveMessenger();
            }
            if (GM_getValue('option_posts_filter_skype', false)) {
                removeSkype();
            }
            setupNicknames();
            setupUsernoteIcon();
        }
    });
});
$(function () {
    "use strict";
    GM_log('executing profile.js');

    function setProfileNickname(userId, nick, name) {
        nick = nick || name;
        document.title = 'Profil von »' + nick + '« - Mitglieder - breadfish.de - DIE deutschsprachige GTA-Community';
        $('.headlineContainer h2 a').text('Profil von »' + nick + '«');
        $('.userName > span').text(nick);
        $('.twoRows li a img[src="wcf/icon/vCardM.png"]').parent('a').find('span').text(nick);
        $('.friendsConnection > h3.light').text('Ihre Verbindung zu »' + nick + '«');
        $('.userName img[src="wcf/icon/onlineS.png"]').attr('title', '»' + nick + '« ist online');
        $('.userName img[src="wcf/icon/offlineS.png"]').attr('title', '»' + nick + '« ist offline');
        $('.userStatus img[src="wcf/icon/genderMaleS.png"]').attr('title', '»' + nick + '« männlich');
        $('.userStatus img[src="wcf/icon/genderFemaleS.png"]').attr('title', '»' + nick + '« weiblich');
        $('ul.dataList .smallFont:contains(Beiträge)').parent('.containerContent').find('a').attr('title', 'Beiträge von »' + nick + '« suchen');
    }

    function setupNickname() {
        var userId = parseInt($('input[name="userID"]').val(), 10),
            $contentBox = $('.container-1.column.first .columnInner .contentBox .subHeadline:contains("Persönliche Informationen")').parent('.contentBox'),
            container = $contentBox.find('.dataList li').last().hasClass('container-1') ? 'container-2' : 'container-1',
            nick = BPPUtils.nicknames.get(userId),
            name = $('.userName > span').text(),
            $alert = $('<div class="success" id="nicknameMessage"></div>');
        $alert.insertAfter($contentBox.find('.subHeadline'));
        $alert.hide();
        $contentBox.find('.dataList').append('<li class="' + container + ' formElement"><p class="formFieldLabel">Spitzname</p><p class="formField"><input type="text" id="bpp_nickname_input" value="' + nick + '"><button id="bpp_nickname_submit">Speichern</button></p></li>');
        $('#bpp_nickname_submit').click(function (event) {
            event.preventDefault();
            nick = $('#bpp_nickname_input').val();
            if (nick.length > 0) {
                BPPUtils.nicknames.set(userId, name, nick);
                $alert.text('Spitzname gespeichert!').show().delay(5000).fadeOut();
            } else {
                BPPUtils.nicknames.remove(userId);
                $alert.text('Spitzname entfernt!').show().delay(5000).fadeOut();
            }
            setProfileNickname(userId, nick, name);
        });
        setProfileNickname(userId, nick, name);
    }

    function setupUsernote() {
        var userId = parseInt($('input[name="userID"]').val(), 10), $userNoteMessage;

        if ($("#profileContent").length !== 0) {
            $('#profileContent > ul').append('<li><a href="index.php?page=User&amp;userID=' + userId + '&userNote=go" id="editUserNote"><img src="wcf/icon/fileTypeIconTextM.png" alt=""> <span>Notiz</span></a></li>');
        } else {
            $("#main > .border:not(#userCard)").first().before('<div id="profileContent" class="tabMenu"><ul><li class="activeTabMenu"><a href="index.php?page=User&amp;userID=' + userId + '"><img src="wcf/icon/profileM.png" alt=""> <span>Profil</span></a></li><li><a href="index.php?page=User&amp;userID=' + userId + '&userNote=go" id="editUserNote"><img src="wcf/icon/fileTypeIconTextM.png" alt=""> <span>Notiz</span></a></li></ul></div><div class="subTabMenu"><div class="containerHead"><div></div></div></div>');
        }
        if (BPPUtils.getParameterByName('userNote', document.URL).length !== 0) {
            $("#profileContent li.activeTabMenu").removeClass("activeTabMenu");
            $('#editUserNote').closest("li").addClass("activeTabMenu");

            $(".columnContainer, .tabMenuContent").html('<div class="container-1 column first"><div class="columnInner"><div class="contentBox"><h3 class="subHeadline">Notiz</h3><div class="success" id="userNoteMessage">Notiz gespeichert!</div><textarea id="userNoteInput" style="min-height: 200px;">' + BPPUtils.usernotes.get(userId) + '</textarea><div class="formSubmit"><input type="submit" id="userNoteSubmit"></div></div></div></div>');
            $userNoteMessage = $('#userNoteMessage');
            $userNoteMessage.hide();
            $('#userNoteSubmit').click(function (event) {
                event.preventDefault();
                var note = $('#userNoteInput').val();
                if (note.length === 0) {
                    BPPUtils.usernotes.remove(userId);
                    $userNoteMessage.show().delay(5000).fadeOut();
                } else {
                    BPPUtils.usernotes.set(userId, $('.userName > span').text(), note);
                    $userNoteMessage.show().delay(5000).fadeOut();
                }
            });
        }
    }

    $(document).ready(function () {
        if (BPPUtils.isTemplate('tplUserProfile')) {
            if (GM_getValue('option_profile_filter_thanks', false)) {
                $('#profileContent ul li a img[src="icon/thankM.png"]').closest('li').remove();
            }
            if (GM_getValue('option_profile_filter_postcount', false)) {
                $('ul.dataList > li .containerContent > .smallFont:contains(Beiträge)').closest('li').remove();
                $('.subHeadline > a:contains("Beiträge")').siblings('span').remove();
            }
            if (GM_getValue('option_profile_filter_usertitle', false)) {
                $('.userPersonals .userTitle').remove();
            }
            if (GM_getValue('option_profile_filter_userrank', false)) {
                $('.userPersonals .userRank').first().remove();
            }
            if (GM_getValue('option_profile_filter_additionalUserrank', false)) {
                $('.userPersonals .userRank').last().remove();
            }
            if (GM_getValue('option_profile_filter_gender', false)) {
                $('ul.dataList > li.formElement > .formFieldLabel:contains(Geschlecht)').closest('li').remove();
            }
            if (GM_getValue('option_profile_filter_regdate', false)) {
                $('ul.dataList > li .containerContent > .smallFont:contains(Registrierungsdatum)').closest('li').remove();
            }
            if (GM_getValue('option_profile_filter_aboutMe', false)) {
                var $subH = $('h3.subHeadline:contains(Über mich)');
                $subH.parent('.contentBox').find('> .dataList').remove();
                $subH.parent('.contentBox').find('.signature').css('border-top', 'none');
                $subH.remove();
            }
            if (GM_getValue('option_profile_filter_birthday', false)) {
                $('ul.dataList > li.formElement > .formFieldLabel:contains(Geburtstag)').closest('li').remove();
            }
            if (GM_getValue('option_profile_filter_location', false)) {
                $('ul.dataList > li.formElement > .formFieldLabel:contains(Wohnort)').closest('li').remove();
            }
            if (GM_getValue('option_profile_filter_occupation', false)) {
                $('ul.dataList > li.formElement > .formFieldLabel:contains(Beruf)').closest('li').remove();
            }
            if (GM_getValue('option_profile_filter_hobbys', false)) {
                $('ul.dataList > li.formElement > .formFieldLabel:contains(Hobbys)').closest('li').remove();
            }
            if (GM_getValue('option_profile_filter_tsuid', false)) {
                $('ul.dataList > li.formElement > .formFieldLabel:contains(Teamspeak UID)').closest('li').remove();
            }
            if (GM_getValue('option_profile_filter_xblGamertag', false)) {
                $('ul.dataList > li.formElement > .formFieldLabel:contains(XBL Gamertag)').closest('li').remove();
            }
            if (GM_getValue('option_profile_filter_psnid', false)) {
                $('ul.dataList > li.formElement > .formFieldLabel:contains(PSN ID)').closest('li').remove();
            }
            if (GM_getValue('option_profile_filter_steam', false)) {
                $('ul.dataList > li.formElement > .formFieldLabel:contains(Steam)').closest('li').remove();
            }
            if (GM_getValue('option_profile_filter_origin', false)) {
                $('ul.dataList > li.formElement > .formFieldLabel:contains(Origin)').closest('li').remove();
            }
            if (GM_getValue('option_profile_filter_website', false)) {
                $('ul.twoRows > li > a > .smallFont:contains(Website)').closest('li').remove();
            }
            if (GM_getValue('option_profile_filter_icq', false)) {
                $('ul.twoRows > li > a > .smallFont:contains(ICQ)').closest('li').remove();
            }
            if (GM_getValue('option_profile_filter_msn', false)) {
                $('ul.twoRows > li > a > .smallFont:contains(Windows Live)').closest('li').remove();
            }
            if (GM_getValue('option_profile_filter_skype', false)) {
                $('ul.twoRows > li > a > .smallFont:contains(Skype)').closest('li').remove();
            }
            setupNickname();
            setupUsernote();
        }
    });
});
$(function () {
    "use strict";
    GM_log('executing threads.js');

    function seperateStickyThreads() {
        var $topThreadsStatus = $('#topThreadsStatus'),
            $containerHead = $('<div class="containerHead"><div class="containerContent"><h3>Wichtige Themen</h3></div></div>'),
            $importantThreadsList = $('<table class="tableList"></table>'),
            $importantThreads = $topThreadsStatus.find('tbody tr').filter(function (index) {
                return $(this).find('.columnIcon img[src*="Important"]').length !== 0;
            });
        $topThreadsStatus.siblings('.titleBarPanel').first().find('.containerHead .containerContent h3').text('Ankündigungen');
        $importantThreads.remove();

        $containerHead.css('border-radius', 0);

        $topThreadsStatus.append($containerHead);

        $importantThreads.each(function () {
            $importantThreadsList.append($(this));
        });

        $topThreadsStatus.append($importantThreadsList);
    }

    function removeDeletedThreads() {
        $('#normalThreadsStatus tbody > tr .columnIcon > img[src="icon/threadTrashM.png"]').closest('tr').remove();

        setTimeout(function () {
            $('#normalThreadsStatus tbody > tr').each(function (index) {
                $(this).attr('class', (index % 2 === 0) ? 'container-1' : 'container-2');
            });
        }, 1000);
    }

    $(document).ready(function () {
        if (BPPUtils.isTemplate('tplBoard')) {
            if (GM_getValue('option_threads_extension_sticky', false)) {
                seperateStickyThreads();
            }
            if (GM_getValue('option_threads_filter_deleted', false)) {
                removeDeletedThreads();
            }
        }
    });
});