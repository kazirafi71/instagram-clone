import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [Loading, setLoading] = useState(false);
  const history = useHistory();

  const SubmitHandler = (e) => {
    e.preventDefault();
    setLoading(true);

    fetch("/auth/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        confirmPassword,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        // console.log(result)
        if (result.error) {
          return setError(result.error);
        } else {
          history.push("/login");
        }
        // console.log(result)
      })
      .catch((e) => console.log(e));
  };
  return (
    <div>
      <div className="container ">
        <div className="row">
          <div className="col-md-6 mx-auto card p-4 my-5">
            <h2 className="text-center">Register here</h2>
            <br />
            {error ? (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            ) : null}

            <form onSubmit={SubmitHandler}>
              <p>{error.error}</p>
              <div className="form-group">
                <label>UserName</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Please enter your name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <br />
              <div className="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Please enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <br />
              <div className="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Please enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <br />
              <div className="form-group">
                <label for="exampleInputPassword1">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  placeholder="Please enter your Confirm Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <br />
              <p>
                Already have an account?<Link to="/login">Login here</Link>
              </p>

              <button type="submit" className="btn btn-primary">
                Register
              </button>
              {Loading ? (
                <div
                  class="spinner-border text-danger text-center"
                  role="status"
                >
                  <span class="sr-only">Loading...</span>
                </div>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
