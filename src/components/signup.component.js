import React, { Component } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Navbar from "./navbar.component";

export default class SignUp extends Component {
  constructor(props) {
    super(props);

    let loggedIN = true;
    const udata = JSON.parse(localStorage.getItem("user"));

    if (udata == null) loggedIN = false;

    this.onChangeFullName = this.onChangeFullName.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeUserEmail = this.onChangeUserEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePasswordConfirmation =
      this.onChangePasswordConfirmation.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      full_name: "",
      phone: "",
      email: "",
      category: "",
      password: "",
      password_confirmation: "",
      loggedIN,
    };
  }

  onChangeFullName(e) {
    this.setState({ full_name: e.target.value });
  }
  onChangePhone(e) {
    this.setState({ phone: e.target.value });
  }
  onChangeUserEmail(e) {
    this.setState({ email: e.target.value });
  }
  onChangeCategory(e) {
    this.setState({category: e.target.value})
  }
  onChangePassword(e) {
    this.setState({ password: e.target.value });
  }
  onChangePasswordConfirmation(e) {
    this.setState({ password_confirmation: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.state.full_name.length < 4 || this.state.full_name.length > 20) {
      alert("Full-name should be between 4-20 charaters");
    }
    if (this.state.phone.length < 5 || this.state.phone.length > 12) {
      alert("Phone number should be between 5-12 digits");
    }
    if (this.state.category <= 0) {
      alert("Category must be selected")
    }  
    if (this.state.password.length < 6) {
      alert("Password should be greater then 5 charaters");
    }
    if (this.state.password !== this.state.password_confirmation) {
      alert("Enter same password in both fields");
    }

    const userObject = {
      full_name: this.state.full_name,
      phone: this.state.phone,
      email: this.state.email,
      category: this.state.category,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation,
      role: "CUSTOMER",
    };

    axios
      .post("http://127.0.0.1:8000/api/auth/register", userObject)
      .then((res) => {
        if (res.data.message === "User successfully registered") {
          alert("Registration Successful");
          window.location = "/sign-in";
        }
      })
      .catch((error) => {
        if (
          error.response.data ===
          '{"email":["The email has already been taken."]}'
        ) {
          alert("The email has already been taken.");
        }
      });

    this.setState({
      full_name: "",
      phone: "",
      email: "",
      category: "",
      password: "",
      password_confirmation: "",
    });
  }

  render() {
    if (this.state.loggedIN === true) {
      return <Navigate to="/dashboard" />;
    }
    return (
      <div className="App">
        <Navbar />
        <div className="auth-wrapper" style={{marginTop: 50}}>
          <div className="auth-inner">
            <form onSubmit={this.onSubmit}>
              <h3>Sign Up</h3>
              <div>
                <div className="mb-3">
                  <label>Full name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Full name"
                    onChange={this.onChangeFullName}
                    name="fullname"
                    value={this.state.full_name}
                  />
                </div>
                <div className="mb-3">
                  <label>Phone Number</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter phone number"
                    onChange={this.onChangePhone}
                    name="phone"
                    value={this.state.phone}
                  />
                </div>
                <div className="mb-3">
                <label>Category</label>
                      <select
                        className="form-select"
                        id="category"
                        name="category"
                        value={this.state.category}
                        onChange={this.onChangeCategory}
                      >
                        <option value="" disabled>
                          Select a category
                        </option>
                        <option value="Bond">Bond</option>
                        <option value="Equity">Equity</option>
                        <option value="Realestate">Real Estate</option>
                        <option value="Gold">Gold</option>
                        <option value="Crypto">Crypto</option>
                        <option value="Stocks">Stocks</option>
                      </select>
                </div>
                <div className="mb-3">
                  <label>Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    onChange={this.onChangeUserEmail}
                    name="email"
                    value={this.state.email}
                  />
                </div>
                <div className="mb-3">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    onChange={this.onChangePassword}
                    name="password"
                    value={this.state.password}
                  />
                </div>
                <div className="mb-3">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    onChange={this.onChangePasswordConfirmation}
                    name="confirmpassword"
                    value={this.state.password_confirmation}
                  />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Sign Up
                  </button>
                </div>
                <p className="forgot-password text-right">
                  Already registered <a href="/sign-in">sign in?</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
