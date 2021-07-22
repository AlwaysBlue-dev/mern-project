import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import userpic from "../Images/userpic.png";
import mypic from "../Images/mypic.png";

const About = () => {
  const history = useHistory();
  const [userData, setUserData] = useState({});

  const callAboutPage = async () => {
    try {
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      setUserData(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      history.push("/login");
    }
  };

  useEffect(() => {
    callAboutPage();
  }, []);
  return (
    <>
      <div className="container emp-profile mt-5">
        <form method="GET">
          <div className="row">
            <div className="col-md-4">
              <div className="profile-img mt-5">
                <img
                  src={
                    userData.name === "Mirza Abdullah Baig" ? mypic : userpic
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="col-md-8">
              <div className="profile-head mt-5">
                <h5>{userData.name}</h5>
                <h6>{userData.work}</h6>
                <p className="profile-rating mt-3 mb-5">
                  RANKINGS: <span>{userData.rating}/10</span>
                </p>
                {/* right side data*/}
                <h6 className="about">About</h6>
                <div className="col-md-8 mt-5 about-info">
                  <div className="row">
                    <div className="col-md-6">
                      <label className="font">User ID</label>
                    </div>
                    <div className="col-md-6">
                      <p className="font">{userData._id}</p>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label className="font">Name</label>
                    </div>
                    <div className="col-md-6">
                      <p className="font">{userData.name}</p>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label className="font">Email</label>
                    </div>
                    <div className="col-md-6">
                      <p className="font">{userData.email}</p>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label className="font">Phone</label>
                    </div>
                    <div className="col-md-6">
                      <p className="font">{userData.phone}</p>
                    </div>
                  </div>

                  <div className="row mt-3">
                    <div className="col-md-6">
                      <label className="font">Profession</label>
                    </div>
                    <div className="col-md-6">
                      <p className="font">{userData.work}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-2">
              <input
                type="submit"
                className="profile-edit-btn btn btn-danger mt-3 "
                name="btnAddMore"
                value="Edit Profile"
              />
            </div>
          </div>
          <div className="row">
            {/* left side url */}
            <div className="col-md-4">
              <div className="profile-work mt-3 mb-3">
                <p>WORK LINKS</p>
                <a
                  href="https://www.facebook.com/a4abdullah/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Facebook
                </a>
                <br />
                <a
                  href="https://www.instagram.com/abd.baig/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram
                </a>
                <br />
                <a
                  href="https://alwaysblue-dev.github.io/portfolio/"
                  target="_blank"
                  rel="noreferrer"
                >
                  My Website
                </a>
                <br />
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default About;
