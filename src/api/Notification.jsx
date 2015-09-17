"use strict";

import React from "react";
import NotificationSystem from "react-notification-system";
const debug = require("debug")("Notification");

class NotificationLayer extends React.Component {
    addNotification() {
        this.refs.notificationSystem.addNotification.apply(null, arguments);
    }
    componentDidMount() {
        debug("componentDidMount");
    }
    render() {
        return <div><NotificationSystem ref="notificationSystem" /></div>;
    }
}
const NotificationInstace = React.render(<NotificationLayer />, document.body.appendChild(document.createElement("div")));
export default NotificationInstace;
