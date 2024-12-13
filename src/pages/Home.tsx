import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

const Home = () => {
  const role = useSelector((state: RootState) => state.auth.role);

  useEffect(() => {
    if (role === "user") {
      location.replace("/lessons");
    } else if (role === "admin") {
      location.replace("/dashboard/lessons");
    }

    if (role === "") {
      location.replace("/login");
    }
  }, [role]);

  return <div></div>;
};

export default Home;
