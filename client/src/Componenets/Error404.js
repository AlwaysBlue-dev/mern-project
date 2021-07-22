import React from "react";
import { NavLink } from "react-router-dom";

export const Error = () => {
  return (
    <>
      <div id="notfound">
        <div className="notfound">
          <div className="notfound-404">
            <h1>404</h1>
          </div>
          <h2>We Are Sorry Page, Not Found!!</h2>
          <p className="mb-5">
            The page you are looking for might have been removed, had it's name
            changed or is temporarily unavailable.
          </p>
          <NavLink to="/">Back To HomePage</NavLink>
        </div>
      </div>
    </>
  );
};
export default Error;
