import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

const Lessons = () => {
  const [data, setData] = useState([]);

  const role = useSelector((state: RootState) => state.auth.role);

  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "user") {
      navigate("/");
    }
    axiosInstance
      .get("/lesson/")
      .then((data) => setData(data.data.data))
      .catch((err) => console.log(err));
  }, [navigate, role]);

  const handleDelete = (_id) => {
    axiosInstance
      .delete(`/lesson/${_id}`)
      .then(() => {
        axiosInstance
          .get("/lesson/")
          .then((data) => setData(data.data.data))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <th>{item.number}</th>
                <td>{item.name}</td>
                <td>
                  <button className="btn">Update</button>
                </td>
                <td>
                  <button
                    className="btn btn-error"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Lessons;
