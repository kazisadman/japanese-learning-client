import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://japanese-learning-backend.vercel.app/api/v1",
  withCredentials: true,
});

export default axiosInstance;
