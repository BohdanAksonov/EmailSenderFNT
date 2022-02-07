import axios, { AxiosInstance } from "axios";

const http = axios.create({
  baseURL: process.env.VUE_APP_BASE_API_URL
});

export default http;
