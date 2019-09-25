import React, { useState, useEffect } from "react";
import SignUp from "../SignUp/SignUp";
import Login from "../Login/Login";
import styled from "styled-components";

const Greeting = styled.div`
background: #4FB5C8
color: #173947
`;

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
    <Greeting>
      <h1>Hi Hungry</h1>
      <h3>I'm Dad.</h3>
      {newUser ? (
        <SignUp history={props.history} />
      ) : (
        <Login history={props.history} />
      )}
      <button onClick={toggleUserStatus}>
        {newUser ? "Already Have an Account?" : "Don't have an account?"}
      </button>
    </Greeting>
  );
};

export default Home;
