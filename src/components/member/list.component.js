import React, { Component } from "react";
import withRouter from "../../helper/HOC";
import AuthService from "../../services/auth.service";
import { convertISODateTime } from "../../helper/date";
import Navbar from "../navbar.component";

export default withRouter(
  class List extends Component {
    constructor(props) {
      super(props);

      this.state = {
        users: [],
      };

      this.deleteUser = this.deleteUser.bind(this);

      this.navigate = this.props.navigate;
    }

    deleteUser(id) {
      AuthService.deleteUser(id).then((res) => {
        this.setState({
          users: this.state.users.filter((usr) => usr.id !== id),
        });
      });
    }

    componentDidMount() {
      AuthService.getUsers().then((res) => {
        const user = res.data.users;

        this.setState({ users: user });
      });
    }

    showUsers() {
      return this.state.users.map((user) => (
        <div key={user.id} className="col-md-4 col-xs-8 col-12 my-2">
          <div className="card shadow-sm text-center h-100" key={user.id}>
            <div className="card-body">
              <figure>
                <blockquote className="blockquote">
                  <p>{user.full_name}</p>
                </blockquote>
                <figcaption className="blockquote-footer">
                  {user.email}
                </figcaption>
                <figcaption className="blockquote-footer">
                  {user.category}
                </figcaption>
              </figure>
            </div>
            <small className="text-muted my-2">
              {convertISODateTime(user.updated_at)}
            </small>
            <div className="card-footer">
              <button
                className="btn btn-danger btn-sm"
                onClick={() => this.deleteUser(user.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ));
    }

    render() {
      return (
        <>
          <Navbar />
          <main className="container mt-5">
            <h3 className="h3"> RM Listing</h3>
            <div className="row">{this.showUsers()}</div>
          </main>
        </>
      );
    }
  }
);
