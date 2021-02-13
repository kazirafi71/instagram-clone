import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../App";


toast.configure();

const Login = () => {
  const {state,dispatch}=useContext(UserContext)
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [data, setData] = useState("");
  const [Loading, setLoading] = useState(false);
  const history = useHistory();


  

  

  const SubmitHandler = (e) => {
    e.preventDefault();
    setLoading(true)

    fetch("/auth/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) =>
        res.json())
      .then((result) => {
        setLoading(false)
        console.log(result);
        if (result.error) {
          
          return setError(result.error);
        } else {
          
          
          localStorage.setItem("jwt", result.token)
          localStorage.setItem("user",JSON.stringify (result.user))
          dispatch({type:"USER",payload: result.user})
          return history.push("/");
        }
      })
      .catch((e) => console.log(e));
  };



  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto card p-4 my-4">
            <h2 className="text-center">Login Here</h2>
            {error ? (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            ) : null}
            <br />
            <form onSubmit={SubmitHandler}>
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
              <p>
                Don't have an account?<Link to="/register">Register here</Link>
              </p>

              <button type="submit" className="btn btn-primary">
                Login
              </button>
              <div>
     
      
    </div>
              {Loading ? (
              <div class="spinner-border text-danger text-center" role="status">
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

export default Login;
