"use strict";

import {DefaultModule} from "../../api";
import $ from "jquery";
import React from "react";
import ReactDOMServer from "react-dom/server";
const debug = require("debug")("B++:module:thread.extension.youtubePreview");
import UrlParse from "url-parse";
import Preview from "./Preview.jsx";

const YT_API_KEY = "AIzaSyB7neE19c690kEZKDMCkPn4AsTEEI2Bflc";

export default class Module extends DefaultModule {
    constructor() {
        super();
        debug("Wird geladen...");

        this.register({
            "key": "option.thread.extension.youtubePreview.enabled",
            "name": "YouTube-Vorschau",
            "tab": "Einstellungen",
            "subtab": "Themenansicht",
            "category": "Erweiterungen",
            "type": "toggle",
            "default": false,
            "description": "Zeigt Informationen zum Video an, wenn man mit der Maus über einen YouTube-Link fährt."
        });

        if (!this.storage.get("option.thread.extension.youtubePreview.enabled", false)) {
            debug("Deaktiviert -> SKIP");
            return;
        }

        if (!this.isTemplate("thread")) {
            debug("Falsches template -> SKIP");
            return;
        }

        this.setupYoutubePreview();
    }
    setupYoutubePreview() {
        debug("setupYoutubePreview");

        const Popup = this.wcf.Popover.extend({
            init: function() {
                this._super("article.wbbPost a[href^=\"https://www.youtube.com\"]");
                //this._super(".externalURL");
                debug("init");
            },
            _loadContent: function() {
                debug("_loadContent");

                const $element = $("#" + this._activeElementID);
                debug("$element", videoId);

                const videoId = UrlParse($element.attr("href"), true).query.v;
                debug("videoId", videoId);

                $.getJSON(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet,statistics&id=${videoId}&key=${YT_API_KEY}`, (data) => {
                    debug("getJSON", data);
                    this._insertContent(this._activeElementID, ReactDOMServer.renderToStaticMarkup(<Preview
                        channelId={data.items[0].snippet.channelId}
                        channelTitle={data.items[0].snippet.channelTitle}
                        commentCount={~~data.items[0].statistics.commentCount}
                        debug={debug}
                        dislikeCount={~~data.items[0].statistics.dislikeCount}
                        likeCount={~~data.items[0].statistics.likeCount}
                        publishedAt={data.items[0].snippet.publishedAt}
                        thumbnail={data.items[0].snippet.thumbnails.default.url}
                        title={data.items[0].snippet.title}
                        videoId={videoId}
                        viewCount={~~data.items[0].statistics.viewCount}
                    />), true);

                    //new window.WCF.Date.Time();
                });
            }
        });
        new Popup();
    }
}
