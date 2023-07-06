import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import PostList from "./post/list.component";
import { getUser } from "../helper/http-common";
import Navbar from "./navbar.component";
import withRouter from "../helper/HOC";
import "./dashboard.component.css";

export default withRouter(
  class Dashboard extends Component {
    constructor(props) {
      super(props);

      const udata = getUser();
      let loggedIN = true;

      if (udata == null) {
        loggedIN = false;
      }

      this.state = {
        user: udata?.user,
        loggedIN,
      };

      this.navigate = this.props.navigate;
    }

    render() {
      if (this.state.loggedIN === false) {
        return <Navigate to="/sign-in" />;
      }
      return (
        <>
          <Navbar />
          <div className="container mt-5">
            <header>
              {this.state.user.role === "CUSTOMER" ? (
                <h2>Welcome {this.state.user.full_name}</h2>
              ) : (
                <h2>Dashboard</h2>
              )}
            </header>
            <div className="my-4">
              <h3 className="h3"> Idea Listing</h3>
              <PostList />
            </div>
          </div>
        </>
      );
    }
  }
);
