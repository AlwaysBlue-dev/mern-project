import React, { createContext, useReducer } from "react";
import { Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from "./Componenets/Navbar";
import Home from "./Componenets/Home";
import About from "./Componenets/About";
import Contact from "./Componenets/Contact";
import Login from "./Componenets/Login";
import Signup from "./Componenets/Signup";
import Logout from "./Componenets/Logout";
import Error404 from "./Componenets/Error404";

import { initialState, reducer } from "./Reducer/useReducer";

// using contextAPI
export const UserContext = createContext();

const Routing = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/about" component={About} />
      <Route exact path="/contact" component={Contact} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/logout" component={Logout} />
      <Route component={Error404} />
    </Switch>
  );
};
const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <Navbar />
        <Routing />
      </UserContext.Provider>
    </>
  );
};
export default App;
