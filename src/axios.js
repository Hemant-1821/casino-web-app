import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://skinfotechies.xyz/demo/trading/api/"
});