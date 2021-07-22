import React, { useEffect, useState } from "react";

const Home = () => {
  const [userName, setUserName] = useState("");
  const [show, setShow] = useState(false);

  const userHomePage = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      setUserName(data.name);
      setShow(true);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    userHomePage();
  }, []);

  return (
    <>
      <div className="home">
        <p className="text-center">WELCOME</p>
        <h1 className="text-center">{userName}</h1>
        <h2 className="text-center mt-5">
          {show ? "😃 Happy, to see you back 😃" : "We Are The Mern Developers"}
        </h2>
      </div>
    </>
  );
};

export default Home;
