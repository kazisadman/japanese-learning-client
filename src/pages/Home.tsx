import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const Home = () => {
  const navigate = useNavigate();

  axiosInstance
    .get("/check-auth")
    .then((data) => {
      const role = data?.data?.data.role;

      if (role === "user") {
        navigate("/");
      } else if (role === "admin") {
        navigate("/deshboard");
      } else {
        navigate("/login");
      }
    })
    .catch((err) => console.log(err));
  return (
    <div>
      <h1>this is the homepage</h1>
    </div>
  );
};

export default Home;
