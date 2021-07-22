import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";

const Signup = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    work: "",
    password: "",
    cpassword: "",
    rating: "",
  });

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();

    const { name, email, phone, work, password, cpassword, rating } = user;

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        work,
        password,
        cpassword,
        rating,
      }),
    });
    const data = await res.json();
    if (res.status === 422 || !data) {
      window.alert("Invalid Registeration Details");
      console.log("Invalid Registeration Details");
    } else {
      window.alert("Registeration Successfull");
      console.log("Registeration Successfull");
      history.push("/login");
    }
  };

  return (
    <>
      <div className="padding container d-flex justify-content-center">
        <div className="col-md-10 col-md-offset-1">
          <form
            method="POST"
            className="signup-form mt-5 mx-auto"
            id="signup-form"
          >
            <h2 className="text-center">SIGNUP NOW</h2>
            <hr />
            <div className="form-group">
              <input
                type="text"
                name="name"
                id="name"
                autoComplete="off"
                value={user.name}
                onChange={handleInputs}
                className="form-control mt-5"
                placeholder="Your Name"
                required="required"
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="off"
                value={user.email}
                onChange={handleInputs}
                className="form-control mt-3"
                placeholder="Your Email"
                required="required"
              />
            </div>
            <div className="form-group">
              <input
                type="Number"
                name="phone"
                id="phone"
                autoComplete="off"
                value={user.phone}
                onChange={handleInputs}
                className="form-control mt-3"
                placeholder="Your Phone"
                required="required"
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                name="work"
                id="work"
                autoComplete="off"
                value={user.work}
                onChange={handleInputs}
                className="form-control mt-3"
                placeholder="Your Profession"
                required="required"
              />
            </div>

            <div className="form-group">
              <input
                type="Number"
                name="rating"
                id="rating"
                autoComplete="off"
                value={user.rating}
                onChange={handleInputs}
                className="form-control mt-3"
                placeholder="Rate yourself between 1-10"
                required="required"
              />
            </div>

            <div className="form-group">
              <input
                type="Password"
                name="password"
                id="password"
                autoComplete="off"
                value={user.password}
                onChange={handleInputs}
                className="form-control  mt-3"
                placeholder="Your Password"
                required="required"
              />
            </div>
            <div className="form-group">
              <input
                type="Password"
                name="cpassword"
                id="cpassword"
                autoComplete="off"
                value={user.cpassword}
                onChange={handleInputs}
                className="form-control  mt-3"
                placeholder="Confrim Your Password"
                required="required"
              />
            </div>
            <div className="form-group text-center">
              <input
                type="submit"
                name="signup"
                id="signup"
                className="mt-3 btn btn-primary"
                value="Register"
                onClick={PostData}
              />
              <NavLink to="/login" className="btn btn-success ms-5 mt-3">
                Already have an account?
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
