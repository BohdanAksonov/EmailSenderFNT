import axios from "axios";

const http = axios.create({
    baseURL: "https://localhost:44377/api/v1"
});

export default http;