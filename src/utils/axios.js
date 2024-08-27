import axios from "axios";

const instance = axios.create({
  baseURL: "https://ares-elite-backend.vercel.app/",
  // baseURL: "http://localhost:5000",

  // baseURL:"https://ares-doctor.vercel.app"
  // baseURL: "https://ares.adaptable.app",
  // baseURL:"https://ares-backend-main.onrender.com"
});

export default instance;
