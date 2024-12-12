import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

type TData = {
  _id: string;
  name: string;
  number: number;
  word_count: number;
};

const Lessons = () => {
  const [data, setData] = useState<TData[]>([]);
  const role = useSelector((state: RootState) => state.auth.role);

  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "admin") {
      navigate("/");
    }
    axiosInstance
      .get("/lesson/admin/")
      .then((data) => setData(data.data.data))
      .catch((err) => console.log(err));
  }, [navigate, role]);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Word Count</th>
              <th>Lesson No</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.word_count}</td>
                <td>{item.number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Lessons;
