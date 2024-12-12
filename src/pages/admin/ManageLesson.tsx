import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

type TData = {
  _id: string;
  name: string;
  number: number;
  word_count: number;
};

const ManageLesson = () => {
  const [data, setData] = useState<TData[]>([]);
  const role = useSelector((state: RootState) => state.auth.role);

  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "admin") {
      navigate("/");
    }
    axiosInstance
      .get("/lesson/")
      .then((data) => setData(data.data.data))
      .catch((err) => console.log(err));
  }, [navigate, role]);

  const handleDelete = (_id: string) => {
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

  const updateLesson = (e: React.FocusEvent<HTMLFormElement>, _id: string) => {
    e.preventDefault();
    const form = e.target;

    const name = form.Lesson_Title.value;
    const number = form.Lesson_Number.value;

    const data = {
      name,
      number,
    };

    axiosInstance
      .patch(`/lesson/${_id}`, data)
      .then(() => {
        axiosInstance
          .get("/lesson/")
          .then((data) => setData(data.data.data))
          .catch((err) => console.log(err));

        const successToast = document.getElementById("success-toast");
        successToast?.classList.remove("hidden");

        setTimeout(() => {
          successToast?.classList.add("hidden");
        }, 3000);
      })
      .catch((err) => console.error(err));
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
                <td>
                  {/* Open the modal using document.getElementById('ID').showModal() method */}
                  <button
                    className="btn"
                    onClick={() =>
                      document.getElementById("my_modal_4").showModal()
                    }
                  >
                    Update
                  </button>
                  <dialog id="my_modal_4" className="modal">
                    <div className="hero min-h-screen ">
                      <div className="card shrink-0 w-full max-w-xl lg:max-w-3xl bg-base-100">
                        <form
                          className="card-body"
                          onSubmit={(e) => updateLesson(e, item._id)}
                        >
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text">Lesson Number</span>
                            </label>
                            <input
                              type="text"
                              name="Lesson_Number"
                              placeholder="Lesson Number"
                              className="input input-bordered"
                              defaultValue={item.number}
                              required
                            />
                          </div>
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text">Lesson Title</span>
                            </label>
                            <textarea
                              placeholder="Lesson Title"
                              name="Lesson_Title"
                              className="textarea textarea-bordered textarea-lg w-full h-40 resize-none"
                              defaultValue={item.name}
                              required
                            ></textarea>
                          </div>
                          <div className="form-control mt-6">
                            <button className="btn btn-primary">
                              Update Lesson
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                      <button>close</button>
                    </form>
                  </dialog>
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
      <div id="success-toast" className="toast hidden">
        <div className="alert alert-success">
          <span>Lesson updated successfully</span>
        </div>
      </div>
    </div>
  );
};

export default ManageLesson;
