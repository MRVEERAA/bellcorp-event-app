import axios from "axios";

// Hard-coded backend URL (works for local + production)
const API_BASE_URL = "https://bellcorp-event-app-backend.onrender.com/api"; // ✅ hard-coded

const API = axios.create({
  baseURL: API_BASE_URL,
});

// Attach JWT token if user is logged in
API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) req.headers.Authorization = `Bearer ${user.token}`;
  return req;
});

export default API;
