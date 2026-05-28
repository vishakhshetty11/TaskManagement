import axios from "axios";

const API = axios.create({
  baseURL: "https://task-manager-backend-5efm.onrender.com/api/v1" //"http://localhost:3001/api/v1",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API; 