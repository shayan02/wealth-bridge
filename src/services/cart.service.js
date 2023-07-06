import { axiosInstance, getAuthorizationHeader } from "../helper/http-common";

export default new (class CartService {
  async getCarts(userId) {
    try {
      const response = await axiosInstance.get("/carts/" + userId, {
        headers: { Authorization: getAuthorizationHeader() },
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async createCart(cart) {
    try {
      const response = await axiosInstance.post("/cart", cart, {
        headers: { Authorization: getAuthorizationHeader() },
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteCart(cartId) {
    try {
      const response = await axiosInstance.delete("/cart/" + cartId, {
        headers: { Authorization: getAuthorizationHeader() },
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  }
})();
