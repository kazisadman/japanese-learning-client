import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import axiosInstance from "../utils/axiosInstance";

const Register = () => {
  const [error, setError] = useState("");

  const handleRegister = (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const name = e.target.fullname.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const image = e.target.avatar.files[0];

    const formData = new FormData();
    formData.append("image", image);

    if (password.length < 6) {
      setError("Password should be ateast 6 characters");
    } else {
      axios
        .post(
          `https://api.imgbb.com/1/upload?key=4d2547e7bd3e3e8994fc5ce8fec358bc`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((data) => {
          const imageUrl = data?.data.data.url;
          const userData = {
            name,
            email,
            password,
            image: imageUrl,
          };
          axiosInstance
            .post(`/register`, userData)
            .then(() => {
          location.replace("/");
            })
            .catch((err) => {
              if (err.response.status === 409) {
                setError("Username or email already exits");
              } else if (err.response.status === 400) {
                setError("Input field is empty!");
              }
            });
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse ">
          <div className="text-center lg:text-right">
            <p className="py-6">
              <img src={""}></img>
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <h1 className="text-2xl text-center mt-5 font-bold">
              Register now!
            </h1>
            <form className="card-body" onSubmit={handleRegister}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  name="fullname"
                  type="text"
                  placeholder="John@alen"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="Jhon@example.com"
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  name="password"
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Avatar</span>
                </label>
                <input
                  name="avatar"
                  type="file"
                  className="file-input file-input-bordered file-input-primary w-full max-w-xs file-input-sm"
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Register</button>
              </div>
              <div>
                <p>
                  Already have an account?
                  <Link to="/login" className="text-purple-600">
                    Login
                  </Link>
                </p>
                {error && <div className="text-red-500">{error}</div>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
