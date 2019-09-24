import React, { useState, useEffect } from "react";
import SignUp from "../SignUp/SignUp";
import Login from "../Login/Login";

const Home = props => {
  const [newUser, setNewUser] = useState(true);
  const toggleUserStatus = e => {
    e.preventDefault();
    setNewUser(!newUser);
  };
  if (localStorage.getItem("token")) {
    props.history.push("/profile");
  }
  return (
    <div>
      <h1>Hi Hungry</h1>
      <h3>I'm Dad.</h3>
      {newUser ? <SignUp /> : <Login />}
      <button onClick={toggleUserStatus}>
        {newUser ? "Already Have an Account?" : "Don't have an account?"}
      </button>
    </div>
  );
};

export default Home;
