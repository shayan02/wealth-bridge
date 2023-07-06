import React, { Component } from "react";
import AuthService from "../../services/auth.service";
import ChatService from "../../services/chat.service";
import withRouter from "../../helper/HOC";
import { convertISODateTime } from "../../helper/date";
import { getUser } from "../../helper/http-common";
import Navbar from "../navbar.component";
import "./contact.css";

export default withRouter(
  class Chat extends Component {
    constructor(props) {
      super(props);

      const udata = getUser();

      this.state = {
        user: udata?.user,
        chats: [],
        members: [],
        member: {},
        message: "",
      };

      this.onChangeChatHandler = this.onChangeChatHandler.bind(this);
      this.onChangeMessage = this.onChangeMessage.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.navigate = this.props.navigate;
    }

    componentDidMount() {
      AuthService.getUsers().then((res) => {
        this.setState({ members: res.data.users });
      });
    }

    onChangeMessage(e) {
      this.setState({ message: e.target.value });
    }

    onChangeChatHandler(member) {
      this.setState({ member });

      ChatService.getChats(this.state.user.id, member.id).then((res) => {
        this.setState({ chats: res.data.chats });
      });
    }

    onSubmit(e) {
      e.preventDefault();

      if (this.state.message.length <= 0) {
        alert("Cant send empty message");
      }

      const chatObj = {
        userId: this.state.user.id,
        memberId: this.state.member.id,
        message: this.state.message,
      };

      ChatService.createChat(chatObj).then((res) => {
        this.navigate("/chats");
        // console.log(res);
      });

      this.setState({ message: "" });
    }

    render() {
      return (
        <>
          <Navbar />
          <section className="message-area">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="chat-area">
                    <div className="chatlist">
                      <div className="modal-dialog-scrollable">
                        <div className="modal-content">
                          <div className="chat-header">
                            <ul
                              className="nav nav-tabs"
                              id="myTab"
                              role="tablist"
                            >
                              <li className="nav-item" role="presentation">
                                <button
                                  className="nav-link active"
                                  id="Open-tab"
                                  data-bs-toggle="tab"
                                  data-bs-target="#Open"
                                  type="button"
                                  role="tab"
                                  aria-controls="Open"
                                  aria-selected="true"
                                >
                                  Relation Manager
                                </button>
                              </li>
                            </ul>
                          </div>
                          <div className="modal-body">
                            <div className="chat-lists">
                              <div className="tab-content" id="myTabContent">
                                <div
                                  className="tab-pane fade show active"
                                  id="Open"
                                  role="tabpanel"
                                  aria-labelledby="Open-tab"
                                >
                                  <div className="chat-list">
                                    {this.state.members.map((member) => (
                                      <div
                                        key={member.id}
                                        className="d-flex align-items-center"
                                      >
                                        <button
                                          onClick={() =>
                                            this.onChangeChatHandler(member)
                                          }
                                          style={{
                                            textAlign: "start",
                                          }}
                                          className="flex-grow-1 ms-3 btn"
                                        >
                                          <h3>{member.full_name}</h3>
                                          <p>{member.category}</p>
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="chatbox">
                      <div className="modal-dialog-scrollable">
                        <div className="modal-content">
                          <div className="msg-head">
                            <div className="row">
                              <div className="col-12">
                                <div className="d-flex align-items-center">
                                  <span className="chat-icon">
                                    <img
                                      className="img-fluid"
                                      src="https://mehedihtml.com/chatbox/assets/img/arroleftt.svg"
                                      alt="arrowleft"
                                    />
                                  </span>
                                  <div className="flex-grow-1 ms-3">
                                    <h3>
                                      {this.state.member.full_name ??
                                        "Select your RM to start chat"}
                                    </h3>
                                    <p>
                                      {this.state.member.category ??
                                        "see left side"}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="modal-body">
                            <div className="msg-body">
                              <ul>
                                {this.state.chats.map((chat) => (
                                  <li key={chat.id} className="repaly">
                                    <span className="time">
                                      {chat.title}- {chat.category}
                                    </span>
                                    <p>{chat.message}</p>
                                    <span className="time">
                                      {convertISODateTime(chat.updated_at)}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <div className="send-box">
                            <form onSubmit={this.onSubmit}>
                              <input
                                type="text"
                                className="form-control"
                                // aria-label="message…"
                                placeholder="Write message…"
                                name="message"
                                onChange={this.onChangeMessage}
                                value={this.state.message}
                              />
                              <button type="submit">
                                <i
                                  className="fa fa-paper-plane"
                                  aria-hidden="true"
                                ></i>
                                Send
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      );
    }
  }
);
