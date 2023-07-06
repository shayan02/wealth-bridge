import { axiosInstance, getAuthorizationHeader } from "../helper/http-common";

export default new (class PostService {
  async getPosts() {
    try {
      const response = await axiosInstance.get("/posts", {
        headers: { Authorization: getAuthorizationHeader() },
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getById(postId) {
    try {
      const response = await axiosInstance.get("/post/" + postId, {
        headers: { Authorization: getAuthorizationHeader() },
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async createPost(post) {
    try {
      const response = await axiosInstance.post("/post", post, {
        headers: { Authorization: getAuthorizationHeader() },
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async updatePost(post, postId) {
    try {
      const response = await axiosInstance.put("/post/" + postId, post, {
        headers: { Authorization: getAuthorizationHeader() },
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async deletePost(postId) {
    try {
      const response = await axiosInstance.delete("/post/" + postId, {
        headers: { Authorization: getAuthorizationHeader() },
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  }
})();