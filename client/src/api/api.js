import axios from "axios";

const API = axios.create({
  baseURL: "https://your-frontend-app-name.onrender.com" //"http://localhost:3001/api/v1",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API; 