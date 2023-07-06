import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "./navbar.component";

export default class Logout extends Component {
  constructor(props) {
    super(props);
    localStorage.removeItem("user");
  }
  render() {
    return (
      <div>
        <Navbar />
        <h1>You have been logged-out</h1>
        <Link to="/sign-in">Login again</Link>
      </div>
    );
  }
}
