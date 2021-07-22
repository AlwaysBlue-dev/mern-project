import React, { useState, useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";

import { UserContext } from "../App";

const Login = () => {
  
  const { state, dispatch } = useContext(UserContext);

  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();

    const res = await fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = res.json();

    if (res.status === 400 || !data) {
      window.alert("Invalid credentials");
    } else {
      dispatch({ type: "USER", payload: true });
      window.alert("Login Sucessfully");
      history.push("/");
    }
  };
  return (
    <>
      <div className="padding container d-flex justify-content-center">
        <div className="col-md-10 col-md-offset-1 mt-5">
          <form
            method="POST"
            className="signin-form mt-5 mx-auto"
            id="signin-form"
          >
            <h2 className="text-center">SIGN IN</h2>
            <hr />
            <div className="form-group mt-5">
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="off"
                className="form-control mt-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
                required="required"
              />
            </div>
            <div className="form-group">
              <input
                type="Password"
                name="password"
                id="password"
                autoComplete="off"
                className="form-control mt-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your Password"
                required="required"
              />
            </div>

            <div className="form-group text-center">
              <input
                type="submit"
                name="signin"
                id="signin"
                className="mt-3 btn btn-primary"
                value="Log In"
                onClick={loginUser}
              />
              <NavLink to="/signup" className="btn btn-danger ms-5 mt-3">
                Don't have an account?
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
