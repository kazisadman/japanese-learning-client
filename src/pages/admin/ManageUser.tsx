import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

type TData = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

const ManageUser = () => {
  const [data, setData] = useState<TData[]>([]);

  const role = useSelector((state: RootState) => state.auth.role);

  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "admin") {
      navigate("/");
    }
    axiosInstance
      .get("/")
      .then((data) => setData(data.data.data))
      .catch((err) => console.log(err));
  }, [navigate, role]);

  const handleAdmin = (_id: string) => {
    axiosInstance
      .patch(`/${_id}`)
      .then(() => {
        axiosInstance
          .get("/")
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
              <th>Email</th>
              <th>Role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
                <td>
                  <button className="btn" onClick={() => handleAdmin(item._id)}>
                    {item.role === "user" ? "Admin" : "User"}
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

export default ManageUser;
