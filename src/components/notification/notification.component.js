import React, { Component } from "react";
import withRouter from "../../helper/HOC";
import ChatService from "../../services/chat.service";
import { getUser } from "../../helper/http-common";
import { convertISODateTime } from "../../helper/date";
import Navbar from "../navbar.component";
import "./notification.css";

export default withRouter(
  class Notification extends Component {
    constructor(props) {
      super(props);

      const udata = getUser();

      this.state = {
        user: udata?.user,
        notifications: [],
      };

      this.navigate = this.props.navigate;
    }

    componentDidMount() {
      ChatService.getNotifications(this.state.user.id).then((res) => {
        const notifications = res.data.notifications;

        this.setState({ notifications });
        console.log(this.state.notifications);
      });
    }

    render() {
      return (
        <>
          <Navbar />
          <main className="mt-5 container">
            <h2 className="text-center">My Notifications</h2>
            {this.state.notifications.map(notification => (
              <div className="card my-3">
              <div className="card-body w-100">
                <div className="card-title mb-4">
                  <h5>{notification.message}</h5>
                </div>
                  <span className="text-muted">from RM @ {convertISODateTime(notification.updated_at)}</span>
              </div>
            </div>
            ))}
            
          </main>
        </>
      );
    }
  }
);
