import React, { Component } from "react";
import CartService from "../../services/cart.service";
import AuthService from "../../services/auth.service";
import ChatService from "../../services/chat.service";
import withRouter from "../../helper/HOC";
import { convertISODateTime } from "../../helper/date";
import { getUser } from "../../helper/http-common";
import Navbar from "../navbar.component";

export default withRouter(
  class Cart extends Component {
    constructor(props) {
      super(props);

      const udata = getUser();

      this.state = {
        user: udata?.user,
        carts: [],
        members: [],
        title: "",
        category: "",
        relation_manager: "",
        message: "",
      };

      this.onChangeManager = this.onChangeManager.bind(this);
      this.onChangeMessage = this.onChangeMessage.bind(this);
      this.onSubmit = this.onSubmit.bind(this);

      this.deleteCart = this.deleteCart.bind(this);

      this.navigate = this.props.navigate;
    }

    onChangeMessage(e) {
      this.setState({ message: e.target.value });
    }

    onChangeManager(e) {
      this.setState({ relation_manager: e.target.value });
    }

    onSubmit(e) {
      e.preventDefault();

      if (this.state.message.length < 1) {
        alert("Message field cant be empty");
      }

      if (this.state.relation_manager.length <= 0) {
        alert("select your relation managet");
      }

      let post = {
        userId: this.state.user.id,
        memberId: this.state.relation_manager,
        title: this.state.title,
        category: this.state.category,
        message: this.state.message,
      };

      ChatService.createChat(post).then((res) => {
        this.navigate("/chats");
      });
    }

    deleteCart(id) {
      CartService.deleteCart(id).then((res) => {
        this.setState({
          carts: this.state.carts.filter((cart) => cart.id !== id),
        });
      });
    }

    componentDidMount() {
      CartService.getCarts(this.state.user.id).then((res) => {
        this.setState({ carts: res.data.cart });
      });

      AuthService.getUsers().then((res) => {
        this.setState({ members: res.data.users });
      });
    }

    showCarts() {
      return this.state.carts.map((cart) => (
        <div key={cart.id} className="col-md-4 col-xs-8 col-12 my-2">
          <div className="card shadow-sm text-center h-100" key={cart.id}>
            <div className="card-body">
              <figure>
                <blockquote className="blockquote">
                  <p>{cart.title}</p>
                </blockquote>
                <figcaption className="blockquote-footer">
                  {cart.category}
                </figcaption>
              </figure>
            </div>
            <small className="text-muted my-2">
              {convertISODateTime(cart.updated_at)}
            </small>
            <div className="card-footer">
              <button
                className="btn btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={() => this.showModal(cart.title, cart.category)}
                value={cart.id}
              >
                Contact RM
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => this.deleteCart(cart.id)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ));
    }

    showModal(title, category) {
      return this.setState({ title, category });
    }

    render() {
      return (
        <>
          <Navbar />
          <main className="container">
            <header className="mt-5">
              <h4>Wallet</h4>
            </header>
            <div className="row">{this.showCarts()}</div>

            <div
              className="modal fade"
              id="exampleModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <form className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Contact Realtion Manager
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <p className="d-flex justify-content-center align-items-center gap-3">
                      <span className="text-muted">UserId: </span>{" "}
                      <input
                        className="form-control"
                        type="text"
                        value={this.state.user.id}
                        disabled
                      />
                    </p>
                    <p className="d-flex justify-content-center align-items-center gap-3">
                      <span className="text-muted">Title: </span>{" "}
                      <input
                        className="form-control"
                        type="text"
                        value={this.state.title}
                        disabled
                      />
                    </p>
                    <p className="d-flex justify-content-center align-items-center gap-3">
                      <span className="text-muted">Category: </span>{" "}
                      <input
                        className="form-control"
                        type="text"
                        value={this.state.category}
                        disabled
                      />
                    </p>
                    <p className="d-flex justify-content-center align-items-center gap-3">
                      <span className="text-muted">Select RM: </span>{" "}
                      <select
                        className="form-select"
                        id="category"
                        name="category"
                        value={this.state.relation_manager}
                        onChange={this.onChangeManager}
                      >
                        <option value="" disabled>
                          Select a category
                        </option>
                        {this.state.members.map((member) => (
                          <option key={member.id} value={member.id}>
                            {member.full_name} - {member.category}
                          </option>
                        ))}
                      </select>
                    </p>
                    <p className="d-flex justify-content-center align-items-center gap-3">
                      <span className="text-muted">Message: </span>{" "}
                      <input
                        className="form-control"
                        value={this.state.message}
                        onChange={this.onChangeMessage}
                        type="text"
                        required
                      />
                    </p>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="submit"
                      className="btn btn-success"
                      onClick={this.onSubmit}
                    >
                      Send
                    </button>
                    <button
                      type="button"
                      className="btn"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </main>
        </>
      );
    }
  }
);
