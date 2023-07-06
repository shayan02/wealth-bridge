import { axiosInstance, getAuthorizationHeader } from "../helper/http-common";

export default new (class ChatService {
    async getChats(userId, memebreId) {
        try {
            const response = await axiosInstance.get("/chats/" + userId + "/member/" + memebreId, {
                headers: { Authorization: getAuthorizationHeader() },
            });

            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async getNotifications(userId) {
        try {
            const response = await axiosInstance.get("notifications/" + userId, {
                headers: { Authorization: getAuthorizationHeader() },
            });

            return response;
        } catch (error) {
            console.log(error);
        }
    } 

    async createChat(chat) {
        try {
            const response = await axiosInstance.post("/chat", chat, {
                headers: { Authorization: getAuthorizationHeader() },
            });

            return response;
        } catch (error) {
            console.log(error);
        }
    }
})();