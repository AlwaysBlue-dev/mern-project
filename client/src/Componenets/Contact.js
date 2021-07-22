import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Contact = () => {
  const history = useHistory();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const userContact = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      setUserData({
        ...userData,
        name: data.name,
        email: data.email,
        phone: data.phone,
      });

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
    userContact();
  }, []);

  // we are storing data in state
  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setUserData({ ...userData, [name]: value });
  };

  // send data to backend
  const contactForm = async (e) => {
    e.preventDefault();

    const { name, email, phone, message } = userData;

    const res = await fetch("/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        message,
      }),
    });

    const data = res.json();

    if (!data) {
      console.log("message not send");
    } else {
      alert("Message Send Successfully");
      setUserData({ ...userData, message: "" });
    }
  };

  return (
    <>
      <div>
        <div className="container contact-form">
          <form method="POST" className="contact_form" id="contact_form">
            <h2 className="text-center mt-5">Drop Us a Message</h2>
            <hr />
            <div className="row">
              <div className="col-md-8 mt-5 mx-auto">
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-control mt-3"
                    onChange={handleInputs}
                    value={userData.name}
                    placeholder="Your Name *"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="form-control mt-3"
                    onChange={handleInputs}
                    value={userData.email}
                    placeholder="Your Email *"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="Number"
                    name="phone"
                    id="phone"
                    className="form-control mt-3"
                    onChange={handleInputs}
                    value={userData.phone}
                    placeholder="Your Phone Number *"
                  />
                </div>

                <div className="col-md-12">
                  <div className="form-group mt-5">
                    <textarea
                      name="message"
                      id="message"
                      className="form-control"
                      onChange={handleInputs}
                      value={userData.message}
                      placeholder="Your Message *"
                      style={{ width: "100%", height: "150px" }}
                    />
                  </div>
                  <div className="form-group">
                    <button
                      type="submit"
                      className="btnContactSubmit mt-3"
                      onClick={contactForm}
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
