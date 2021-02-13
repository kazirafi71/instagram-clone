import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";

const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const renderList = () => {
    if (state) {
      return [
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Home
          </Link>
        </li>,
        <li className="nav-item">
          <Link className="nav-link" to="/create-post">
            Create-post
          </Link>
        </li>,
        <li className="nav-item">
          <Link className="nav-link" to="/profile">
            Profile
          </Link>
        </li>,
      ];
    } else {
      return [
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>,
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Register
          </Link>
        </li>,
      ];
    }
  };
  return (
    <div className="mb-5 pb-5">
      <nav className="navbar fixed-top  navbar-expand-sm navbar-light bg-light ">
        <div className="container-fluid">
          <Link
            className="navbar-brand"
            style={{ fontFamily: "Grand Hotel", fontSize: "30px" }}
            to={state ? "/" : ("/login")}
          >
            Instagram-Clone
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav m-auto">{renderList()}</ul>
            {state ? (
              <form class="d-flex">
                <Link
                  onClick={() => {
                    dispatch({ type: "CLEAR_USER" });
                    localStorage.clear("jwt");
                    localStorage.clear("user");
                    return history.push('/login')
                  }}
                  className="nav-link btn btn-danger text-light "
                  to="/login"
                >
                  Logout
                </Link>
              </form>
            ) : null}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
