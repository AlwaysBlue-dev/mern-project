import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";

import { UserContext } from "../App";

const Logout = () => {

  const { state, dispatch } = useContext(UserContext);

  const history = useHistory();
  // promises
  useEffect(() => {
    fetch("logout", {
      mehtod: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application.json",
      },
      credentials: "include",
    })
      .then((res) => {
        dispatch({ type: "USER", payload: false });
        history.push("/login", { replace: true });
        if (!res.status === 200) {
          const error = new Error(res.error);
          throw error;
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
  return (
    <>
      <h1>Logout page</h1>
    </>
  );
};

export default Logout;
