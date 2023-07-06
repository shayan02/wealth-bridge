import React, { Component } from "react";
import PostService from "../../services/post.service";
import withRouter from "../../helper/HOC";
import Navbar from "../navbar.component";

export default withRouter(
  class Add extends Component {
    constructor(props) {
      super(props);

      this.state = {
        id: this.props.params.id,
        title: "",
        description: "",
        category: "",
      };

      this.changeTitleHandler = this.changeTitleHandler.bind(this);
      this.changeDescriptionHandler = this.changeDescriptionHandler.bind(this);
      this.changeCategoryHandler = this.changeCategoryHandler.bind(this);
      this.saveOrUpdatePost = this.saveOrUpdatePost.bind(this);

      this.navigate = this.props.navigate;
    }

    componentDidMount() {
      if (this.state.id === "_add") {
        return;
      } else {
        PostService.getById(this.state.id).then((res) => {
          let post = res.data.post;
          this.setState({
            title: post.title,
            description: post.description,
            category: post.category,
          });
        });
      }
    }

    saveOrUpdatePost = (e) => {
      e.preventDefault();

      if (
        !this.state.title ||
        !this.state.description ||
        !this.state.category
      ) {
        alert("Please Fill The Form Completly");
        return;
      }

      let post = {
        title: this.state.title,
        description: this.state.description,
        category: this.state.category,
      };

      if (this.state.id === "_add") {
        PostService.createPost(post).then((res) => {
          this.navigate("/dashboard");
        });
      } else {
        PostService.updatePost(post, this.state.id).then((res) => {
          this.navigate("/dashboard");
        });
      }
    };

    changeTitleHandler = (event) => {
      this.setState({ title: event.target.value });
    };

    changeDescriptionHandler = (event) => {
      this.setState({ description: event.target.value });
    };

    changeCategoryHandler = (event) => {
      this.setState({ category: event.target.value });
    };

    cancel() {
      this.navigate("/dashboard");
    }

    getTitle() {
      if (this.state.id === "_add") {
        return <h3 className="text-center">Add Idea</h3>;
      } else {
        return <h3 className="text-center">Update Idea</h3>;
      }
    }
    render() {
      return (
        <>
          <Navbar />
          <div className="container my-3">
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="card shadow-lg border-0 rounded-lg">
                  <div className="card-header">{this.getTitle()}</div>
                  <div className="card-body">
                    <form>
                      <div className="mb-3">
                        <label htmlFor="title" className="form-label">
                          Title
                        </label>
                        <input
                          type="text"
                          placeholder="Enter a title"
                          id="title"
                          name="title"
                          className="form-control"
                          value={this.state.title}
                          onChange={this.changeTitleHandler}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="category" className="form-label">
                          Category
                        </label>
                        <select
                          className="form-select"
                          id="category"
                          name="category"
                          value={this.state.category}
                          onChange={this.changeCategoryHandler}
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
                        <label htmlFor="description" className="form-label">
                          Description
                        </label>
                        <textarea
                          required
                          placeholder="Enter a description"
                          id="description"
                          name="description"
                          className="form-control"
                          rows="5"
                          value={this.state.description}
                          onChange={this.changeDescriptionHandler}
                        ></textarea>
                      </div>
                      <div className="d-flex justify-content-end">
                        <button
                          type="submit"
                          className="btn btn-success me-3"
                          onClick={this.saveOrUpdatePost}
                        >
                          Submit
                        </button>
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={this.cancel.bind(this)}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
  }
);
