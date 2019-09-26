import React, { useState, useEffect } from "react";
import SignUp from "../SignUp/SignUp";
import Login from "../Login/Login";
import styled from "styled-components";
import { Greeting, Button } from "../../styles/globalStyles";

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
      {newUser ? (
        <SignUp history={props.history} />
      ) : (
        <Login history={props.history} />
      )}
      <Button onClick={toggleUserStatus}>
        {newUser ? "Already Have an Account?" : "Don't have an account?"}
      </Button>
    </Greeting>
  );
};

export default Home;
