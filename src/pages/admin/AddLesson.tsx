import { useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate } from "react-router";
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";

const AddLesson = () => {
  const navigate = useNavigate();
  const role = useSelector((state: RootState) => state.auth.role);

  const addLesson = (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target;

    const name = form.Lesson_Title.value;
    const number = form.Lesson_Number.value;

    const data = {
      name,
      number,
    };

    axiosInstance
      .post("/lesson/", data)
      .then(() => {
        const successToast = document.getElementById("success-toast");
        successToast?.classList.remove("hidden");

        setTimeout(() => {
          successToast?.classList.add("hidden");
        }, 3000);
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    if (role !== "admin") {
      navigate("/");
    }
  }, [navigate,role]);
  return (
    <div>
      <div className="hero min-h-screen ">
        <div className="card shrink-0 w-full max-w-xl lg:max-w-3xl bg-base-100">
          <form className="card-body" onSubmit={addLesson}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Lesson Number</span>
              </label>
              <input
                type="text"
                name="Lesson_Number"
                placeholder="Lesson Number"
                className="input input-bordered"
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
                required
              ></textarea>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Add Lesson</button>
            </div>
          </form>
        </div>
      </div>
      <div id="success-toast" className="toast hidden">
        <div className="alert alert-success">
          <span>Lesson added successfully</span>
        </div>
      </div>
    </div>
  );
};

export default AddLesson;
