import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosInstance";
import { RootState } from "../../app/store";

const AddVocabulary = () => {
  const email = useSelector((state: RootState) => state.auth.email);

  const addVocabulary = (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target;

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
    console.log(data);

    axiosInstance
      .post("/vocabulary/", data)
      .then(() => {
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
      <div className="hero min-h-screen ">
        <div className="card shrink-0 w-full max-w-xl lg:max-w-3xl bg-base-100">
          <form className="card-body" onSubmit={addVocabulary}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Word</span>
              </label>
              <input
                type="text"
                name="Word"
                placeholder="Word"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Pronunciation</span>
              </label>
              <input
                type="text"
                name="Pronunciation"
                placeholder="Pronunciation"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Lesson Number</span>
              </label>
              <input
                type="text"
                name="number"
                placeholder="Lesson Number"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Admin Email</span>
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
                <span className="label-text">When to say</span>
              </label>
              <textarea
                placeholder="When to say"
                name="when"
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
          <span>Vocabulary added successfully</span>
        </div>
      </div>
    </div>
  );
};

export default AddVocabulary;
