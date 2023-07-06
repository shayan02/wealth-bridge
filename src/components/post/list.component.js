import React, { Component } from "react";
import PostService from "../../services/post.service";
import CartService from "../../services/cart.service";
import withRouter from "../../helper/HOC";
import { convertISODateTime } from "../../helper/date";
import { getUser } from "../../helper/http-common";
import "./list.component.css";

export default withRouter(
  class List extends Component {
    constructor(props) {
      super(props);

      const udata = getUser();

      this.state = {
        user: udata?.user,
        posts: [],
      };

      this.editPost = this.editPost.bind(this);
      this.deletePost = this.deletePost.bind(this);

      this.addCart = this.addCart.bind(this);

      this.navigate = this.props.navigate;
    }

    deletePost(id) {
      PostService.deletePost(id).then((res) => {
        this.setState({
          posts: this.state.posts.filter((post) => post.id !== id),
        });
      });
    }

    editPost(id) {
      this.navigate(`/add-post/${id}`);
    }

    componentDidMount() {
      PostService.getPosts().then((res) => {
        this.setState({ posts: res.data.posts });
      });
    }

    addCart(title, description, category) {
      let cart = {
        title: title,
        description: description,
        category: category,
        userId: this.state.user.id,
      };

      CartService.createCart(cart).then((res) => {
        alert("added to Wallet");
      });
    }

    showPosts() {
      return this.state.posts.map((post) => (
        <div key={post.id} className="col-md-4 col-xs-8 col-12 my-2 ">
          <div className="card shadow-sm text-center h-100" key={post.id}>
            <div className="card-header">
              <figure>
                <blockquote className="blockquote">
                  <p>{post.title}</p>
                </blockquote>
                <figcaption className="blockquote-footer">
                  {post.category}
                </figcaption>
              </figure>
            </div>
            <div className="card-body">
              <p className="card-text">{post.description}</p>
            </div>
            <small className="text-muted my-2">
              {convertISODateTime(post.updated_at)}
            </small>
            <div className="card-footer">
              {this.state.user.role === "ADMIN" ? (
                <>
                  <button
                    className="btn btn-sm"
                    onClick={() => this.editPost(post.id)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.deletePost(post.id)}
                  >
                    Delete
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="btn btn-sm btn-dark"
                    onClick={() =>
                      this.addCart(post.title, post.description, post.category)
                    }
                  >
                    Add to Wallet
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ));
    }

    render() {
      return (
        <>
          <main className="row">{this.showPosts()}</main>
        </>
      );
    }
  }
);
