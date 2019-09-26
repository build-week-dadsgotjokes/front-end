import React, { useState, useEffect } from "react";
import SignUp from "../SignUp/SignUp";
import Login from "../Login/Login";
import styled from "styled-components";
import { Greeting, Button, SignIn } from "../../styles/globalStyles";

const Home = props => {
  const [newUser, setNewUser] = useState(false);
  const toggleUserStatus = e => {
    e.preventDefault();
    setNewUser(!newUser);
  };
  if (localStorage.getItem("token")) {
    props.history.push("/profile");
  }
  return (
    <Greeting>
      <SignIn>
        {newUser ? (
          <div>
            <SignUp history={props.history} />
            <Button onClick={toggleUserStatus}>Already Have an Account?</Button>
          </div>
        ) : (
          <div>
            <Login history={props.history} />
            <Button onClick={toggleUserStatus}>Don't have an account?</Button>
          </div>
        )}
      </SignIn>
    </Greeting>
  );
};

export default Home;
