import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useParams } from "react-router-dom";

const Vocabulary = () => {
  const [data, setData] = useState<any[]>([]);
  const { lesson_no } = useParams();
  console.log(data);

  useEffect(() => {
    axiosInstance
      .get(`/lesson/${lesson_no}`)
      .then((data) => setData(data.data.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="font-outFit max-w-[1440px] mx-auto">
      <div className="flex justify-center items-center h-screen">
        <div className="card bg-primaryColor text-white w-96">
          <div className="card-body items-center text-center">
            <h2 className="card-title">Cookies!</h2>
            <p>We are using cookies for no reason.</p>
            <div className="card-actions justify-end">
              <button className="btn">Accept</button>
              <button className="btn">Deny</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vocabulary;
