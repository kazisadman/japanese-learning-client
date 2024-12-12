import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../app/features/authSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    axiosInstance
      .get("/check-auth")
      .then((data) => {
        const { role, name, email, id, image } = data.data.data;

        dispatch(login({ email, image, name, role, id }));

        if (role === "user") {
          navigate("/lessons");
        } else if (role === "admin") {
          navigate("/dashboard/lessons");
        } else {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  }, [navigate, dispatch]);

  return <div></div>;
};

export default Home;
