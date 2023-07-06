import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getUser } from "../helper/http-common";

export default class Navbar extends Component {
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
  }

  render() {
    const isLoggedIn = this.state.loggedIN;
    const name = this.state.user?.full_name;

    let button;

    if (isLoggedIn) {
      button = (
        <>
          {this.state.user.role === "ADMIN" ? (
            <>
              <li className="nav-item me-auto">
                <Link className="nav-link" to="/add-post/_add">
                  Add Idea
                </Link>
              </li>
              <li className="nav-item me-auto">
                <Link className="nav-link" to="/add-member">
                  Add RM
                </Link>
              </li>
              <li className="nav-item me-auto">
                <Link className="nav-link" to="/list-member">
                  List RM
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item me-auto">
                <Link className="nav-link" to="/carts">
                  Wallet
                </Link>
              </li>
              <li className="nav-item me-auto">
                <Link className="nav-link" to="/chats">
                  Contact
                </Link>
              </li>
              <li className="nav-item me-auto">
                <Link className="nav-link" to="/notifications">
                  Notification
                </Link>
              </li>
            </>
          )}

          <li className="nav-item btn-group">
            <Link
              className="nav-link dropdown-toggle"
              id="navbarDarkDropdownMenuLink"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              to="#"
            >
              {name.split(" ")[0]}
            </Link>
            <ul
              className="dropdown-menu dropdown-menu-lg-end"
              aria-labelledby="navbarDarkDropdownMenuLink"
            >
              <li>
                <Link className="dropdown-item" to="/profile">
                  {" "}
                  Profile{" "}
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/logout">
                  {" "}
                  logout{" "}
                </Link>
              </li>
            </ul>
          </li>
        </>
      );
    } else {
      button = (
        <>
          <li className="nav-item me-auto">
            <Link className="nav-link" to="/sign-in">
              {" "}
              login{" "}
            </Link>
          </li>
          <li className="nav-item me-auto">
            <Link className="nav-link" to="/sign-up">
              {" "}
              Sign up{" "}
            </Link>
          </li>
        </>
      );
    }
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <Link className="navbar-brand ml-3" to="/">
              Wealth Bridge
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarToggler"
              aria-controls="navbarToggler"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarToggler">
              <ul className="navbar-nav me-auto">
                <li className="nav-item me-auto">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item me-auto">
                  <Link className="nav-link" to="/dashboard">
                    Dashboard
                  </Link>
                </li>
              </ul>
              <ul className="navbar-nav ">{button}</ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
