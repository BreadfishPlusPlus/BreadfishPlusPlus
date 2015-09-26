"use strict";

import React from "react";
import NotificationSystem from "react-notification-system";
const debug = require("debug")("Notification");

class NotificationLayer extends React.Component {
    componentDidMount() {
        debug("componentDidMount");
    }
    addNotification() {
        this.refs.notificationSystem.addNotification.apply(null, arguments);
    }
    error(title, position="br") {
        return this.addNotification({
            title,
            level: "error",
            position
        });
    }
    success(title, message=null) {
        return this.addNotification({
            title,
            message,
            level: "success",
            position: "br"
        });
    }
    render() {
        return <div><NotificationSystem ref="notificationSystem" /></div>;
    }
}
const NotificationInstace = React.render(<NotificationLayer />, document.body.appendChild(document.createElement("div")));
export default NotificationInstace;
