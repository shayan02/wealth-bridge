import axios from "axios";

const baseURL = "http://localhost:8000/api";

export const getUser = () => {
    return JSON.parse(localStorage.getItem("user"));
}

export const getToken = () => {
    const fetchUser = getUser();
    let setToken;

    if (fetchUser) {
        setToken = fetchUser.access_token;
    }
    else {
        setToken = null
    }
    return setToken;
}

export const getAuthorizationHeader = () => `Bearer ${getToken()}`;

export const axiosInstance = axios.create({
  baseURL,
  headers: { Authorization: getAuthorizationHeader() },
});