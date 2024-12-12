import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

type TData = {
  _id: string;
  word: string;
  pronunciation: string;
  when_to_say: string;
  lesson_no: number;
};

const ManageVocabulary = () => {
  const [data, setData] = useState<TData[]>([]);
  const role = useSelector((state: RootState) => state.auth.role);

  const navigate = useNavigate();

  useEffect(() => {
    if (role !== "admin") {
      navigate("/");
    }
    axiosInstance
      .get("/vocabulary/")
      .then((data) => setData(data.data.data))
      .catch((err) => console.log(err));
  }, [navigate, role]);

  const handleDelete = (_id: string) => {
    axiosInstance
      .delete(`/vocabulary/${_id}`)
      .then(() => {
        axiosInstance
          .get("/vocabulary/")
          .then((data) => setData(data.data.data))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  const email = useSelector((state: RootState) => state.auth.email);

  const updateVocabulary = (
    e: React.FormEvent<HTMLFormElement>,
    _id: string
  ) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const word = form.Word.value;
    const pronunciation = form.Pronunciation.value;
    const lesson_no = form.number.value;
    const admin_email = form.email.value;
    const when_to_say = form.when.value;

    const data = {
      word,
      pronunciation,
      lesson_no,
      admin_email,
      when_to_say,
    };

    axiosInstance
      .patch(`/vocabulary/${_id}`, data)
      .then(() => {
        axiosInstance
          .get("/vocabulary/")
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
              <th>Word</th>
              <th>Pronanciatin</th>
              <th>Description</th>
              <th>Lesson No</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td>{item.word}</td>
                <td>{item.pronunciation}</td>
                <td>{item.when_to_say}</td>
                <td>{item.lesson_no}</td>
                <td>
                  {/* Open the modal using document.getElementById('ID').showModal() method */}
                  <button
                    className="btn"
                    onClick={() =>
                      (
                        document.getElementById("my_modal_1") as HTMLFormElement
                      ).showModal()
                    }
                  >
                    Update
                  </button>
                  <dialog id="my_modal_1" className="modal">
                    <div className="modal-box">
                      <div>
                        <div className="hero min-h-screen ">
                          <div className="card shrink-0 w-full max-w-xl lg:max-w-3xl bg-base-100">
                            <form
                              className="card-body"
                              onSubmit={(e) => updateVocabulary(e, item._id)}
                            >
                              <div className="form-control">
                                <label className="label">
                                  <span className="label-text">Word</span>
                                </label>
                                <input
                                  type="text"
                                  name="Word"
                                  placeholder="Word"
                                  defaultValue={item.word}
                                  className="input input-bordered"
                                  required
                                />
                              </div>
                              <div className="form-control">
                                <label className="label">
                                  <span className="label-text">
                                    Pronunciation
                                  </span>
                                </label>
                                <input
                                  type="text"
                                  name="Pronunciation"
                                  placeholder="Pronunciation"
                                  className="input input-bordered"
                                  defaultValue={item.pronunciation}
                                  required
                                />
                              </div>
                              <div className="form-control">
                                <label className="label">
                                  <span className="label-text">
                                    Lesson Number
                                  </span>
                                </label>
                                <input
                                  type="text"
                                  name="number"
                                  placeholder="Lesson Number"
                                  className="input input-bordered"
                                  defaultValue={item.lesson_no}
                                  required
                                />
                              </div>
                              <div className="form-control">
                                <label className="label">
                                  <span className="label-text">
                                    Admin Email
                                  </span>
                                </label>
                                <input
                                  type="text"
                                  name="email"
                                  defaultValue={email}
                                  placeholder="Admin Email"
                                  className="input input-bordered"
                                  required
                                  disabled
                                />
                              </div>
                              <div className="form-control">
                                <label className="label">
                                  <span className="label-text">
                                    When to say
                                  </span>
                                </label>
                                <textarea
                                  placeholder="When to say"
                                  name="when"
                                  className="textarea textarea-bordered textarea-lg w-full h-40 resize-none"
                                  defaultValue={item.when_to_say}
                                  required
                                ></textarea>
                              </div>
                              <div className="form-control mt-6">
                                <button className="btn btn-primary">
                                  Update Vocabulary
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>

                      <div className="modal-action">
                        <form method="dialog">
                          {/* if there is a button in form, it will close the modal */}
                          <button className="btn">Close</button>
                        </form>
                      </div>
                    </div>
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
          <span>Vocabulary updated successfully</span>
        </div>
      </div>
    </div>
  );
};

export default ManageVocabulary;
