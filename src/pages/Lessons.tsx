import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axiosInstance from "../utils/axiosInstance";
import LessonCard from "../components/LessonCard";

export type TData = {
  _id: string;
  name: string;
  number: number;
};

const Lessons = () => {
  const [data, setData] = useState<TData[]>([]);

  useEffect(() => {
    axiosInstance
      .get("/lesson")
      .then((data) => setData(data.data.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="font-outFit max-w-[1440px] mx-auto">
      <Navbar></Navbar>
      <div className="grid grid-cols-4 gap-8 items-center">
        {data?.map((item) => (
          <LessonCard key={item?._id} data={item}></LessonCard>
        ))}
      </div>
    </div>
  );
};

export default Lessons;
