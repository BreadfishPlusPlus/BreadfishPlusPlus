"use strict";

import React from "react";
import Moment from "moment";

export default class Preview extends React.Component {
    static propTypes = {
        channelId: React.PropTypes.string.isRequired,
        channelTitle: React.PropTypes.string.isRequired,
        commentCount: React.PropTypes.number.isRequired,
        debug: React.PropTypes.func.isRequired,
        dislikeCount: React.PropTypes.number.isRequired,
        likeCount: React.PropTypes.number.isRequired,
        publishedAt: React.PropTypes.string.isRequired,
        thumbnail: React.PropTypes.string.isRequired,
        title: React.PropTypes.string.isRequired,
        videoId: React.PropTypes.string.isRequired,
        viewCount: React.PropTypes.number.isRequired
    };
    getTimeElement() {
        const moment = Moment(this.props.publishedAt);
        return (<time
            className="datetime"
            data-date={moment.format("D. MMMM YYYY")}
            data-offset="7200"
            data-time={moment.format("HH:mm")}
            data-timestamp={moment.unix()}
            dateTime={moment.toISOString()}
        >{moment.format("D. MMMM YYYY, HH:mm")}</time>);
    }
    render() {
        this.props.debug("render", this.props);
        const videoUrl = `https://www.youtube.com/watch?v=${this.props.videoId}`;
        return (
            <div className="box128 userProfilePreview">
                <a href={videoUrl} target="_blank" title={this.props.title}>
                    <img src={this.props.thumbnail} style={{width: 128, height: 128}} />
                </a>
                <div className="userInformation">
                    <div className="containerHeadline">
                        <h3>
                            <a href={videoUrl} target="_blank">{this.props.title}</a>
                        </h3>
                    </div>
                    <dl className="plain inlineDataList userStats">
                        <dt>Hochgeladen von</dt>
                        <dd><a href={`http://www.youtube.com/user/${this.props.channelId}`} target="_blank">{this.props.channelTitle}</a>, {this.getTimeElement()}</dd>
                    </dl>
                    <dl className="plain inlineDataList userStats">
                        <dt title="Views"><i className="fa fa-eye" /></dt>
                        <dd title="Views">&nbsp;{this.props.viewCount}</dd>

                        <dt title="Kommentare">&nbsp;<i className="fa fa-comment-o" /></dt>
                        <dd title="Kommentare">&nbsp;{this.props.commentCount}</dd>

                        <dt title="Likes">&nbsp;<i className="fa fa-thumbs-o-up" /></dt>
                        <dd title="Likes">&nbsp;{this.props.likeCount}</dd>

                        <dt title="Dislikes">&nbsp;<i className="fa fa-thumbs-o-down" /></dt>
                        <dd title="Dislikes">&nbsp;{this.props.dislikeCount}</dd>
                    </dl>
                </div>
            </div>
        );
    }
}
