import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axiosInstance from "../utils/axiosInstance";
import LessonCard from "../components/LessonCard";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { useNavigate } from "react-router-dom";

export type TData = {
  _id: string;
  name: string;
  number: number;
};

const Lessons = () => {
  const [data, setData] = useState<TData[]>([]);

  const role = useSelector((state: RootState) => state.auth.role);

  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "user") {
      navigate("/");
    }
    axiosInstance
      .get("/lesson")
      .then((data) => setData(data.data.data))
      .catch((err) => console.log(err));
  }, [navigate, role]);

  return (
    <div className="font-outFit max-w-[1440px] mx-auto ">
      <Navbar></Navbar>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 place-items-center">
        {data?.map((item) => (
          <LessonCard key={item?._id} data={item}></LessonCard>
        ))}
      </div>
    </div>
  );
};

export default Lessons;
