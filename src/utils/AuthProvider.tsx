import { useDispatch } from "react-redux";
import axiosInstance from "./axiosInstance";
import { login } from "../app/features/authSlice";
import { useEffect } from "react";

type AuthProviderProps = {
  children: React.ReactNode; 
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    axiosInstance
      .get("/check-auth")
      .then((data) => {
        const { role, name, email, id, image } = data.data.data;

        dispatch(login({ email, image, name, role, id }));
      })
      .catch((err) => console.log(err));
  }, [dispatch]);

  return children;
};

export default AuthProvider;
