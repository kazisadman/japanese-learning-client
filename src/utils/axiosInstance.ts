import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://japanese-learning-backend-2.onrender.com/api/v1",
  withCredentials: true,
});

export default axiosInstance;
