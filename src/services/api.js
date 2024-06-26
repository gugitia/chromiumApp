import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "localhost:3420",
});

export default api;
