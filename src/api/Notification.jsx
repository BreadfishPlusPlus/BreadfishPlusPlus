"use strict";

import React from "react";
import ReactDOM from "react-dom";
import NotificationSystem from "react-notification-system";
const debug = require("debug")("B++:Notification");

class NotificationLayer extends React.Component {
    componentDidMount() {
        debug("componentDidMount");
    }

    create({
        title=null,
        message=null,
        level="info",
        position="br",
        autoDismiss=0,
        dismissible=true,
        action=null,
        onRemove=null,
        uid=null
    } = {}) {
        return this.refs.notificationSystem.addNotification({
            title,
            message,
            level,
            position,
            autoDismiss,
            dismissible,
            action,
            onRemove,
            uid
        });
    }
    remove(notification) {
        this.refs.notificationSystem.removeNotification(notification);
    }

    render() {
        return <div><NotificationSystem ref="notificationSystem" /></div>;
    }
}
const NotificationInstace = ReactDOM.render(<NotificationLayer />, document.body.appendChild(document.createElement("div")));
export default NotificationInstace;
