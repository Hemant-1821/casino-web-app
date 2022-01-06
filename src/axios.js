import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://casino-app-server.herokuapp.com/",
});
