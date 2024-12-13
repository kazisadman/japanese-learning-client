import React, { useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const Login = () => {
  const [error, setError] = useState("");

  const handleLogin = (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const email = e.target.text.value;
    const password = e.target.password.value;

    const data = {
      email,
      password,
    };

    if (password.length < 6) {
      setError("Password should be ateast 6 characters");
    } else {
      axiosInstance
        .post("/login", data, {
          headers: {
            withCredentials: true,
          },
        })
        .then(() => {
          location.replace("/");
        })
        .catch((err) => {
          if (err.response.status === 404) {
            setError("User not found");
          } else if (err.response.status === 401) {
            setError("Password is incorrect");
          }
          console.log(err);
        });
    }
  };
  return (
    <div>
      <div>
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <p className="py-6">
                <img src=""></img>
              </p>
            </div>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <h1 className="text-2xl text-center mt-5 font-bold">
                Login now!
              </h1>
              <form className="card-body" onSubmit={handleLogin}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    name="text"
                    type="text"
                    placeholder="email"
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
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Login</button>
                </div>
                <div>
                  <p>
                    Don&apos;t have an account?
                    <Link to="/register" className="text-purple-600">
                      Register
                    </Link>
                  </p>
                </div>
                {error && <div className="text-red-500">{error}</div>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
