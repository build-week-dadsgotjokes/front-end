import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from 'styled-components';

const SignInDiv = styled.div`
background:  #4FB5C8
`;

const SignIn = props => {
  const [user, setUser] = useState({});

  const handleChanges = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post(
        "https://api-dadjokes.herokuapp.com/login",
        `grant_type=password&username=${user.username}&password=${user.password}`,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Basic bGFtYmRhOmxhbWJkYS1zZWNyZXQ="
          }
        }
      )
      .then(res => {
        localStorage.setItem("token", res.data["access_token"]);
        props.history.push("/profile");
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <SignInDiv className="signInDiv" onSubmit={e => handleSubmit(e)}>
      <h2>Welcome back</h2>
      <input
        className="default"
        type="text"
        placeholder="username"
        name="username"
        onChange={e => handleChanges(e)}
      />

      <input
        className="default"
        type="password"
        placeholder="password"
        name="password"
        onChange={e => handleChanges(e)}
      />
      <button>Sign in</button>
    </SignInDiv>
  );
};
export default SignIn;
