import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useInput } from "../../hooks/useInput";

const SignInDiv = styled.div`
  background: #4fb5c8;
`;

const SignIn = props => {
  const [username, setUsername, handleUsername] = useInput("");
  const [password, setPassword, handlePassword] = useInput("");

  const handleSubmit = e => {
    e.preventDefault();
    axios
      .post(
        "https://api-dadjokes.herokuapp.com/login",
        `grant_type=password&username=${username}&password=${password}`,
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
    <SignInDiv className="signInDiv">
      <h2>Welcome back</h2>
      <form onSubmit={e => handleSubmit(e)}>
        <input
          className="default"
          type="text"
          placeholder="username"
          name="username"
          onChange={e => handleUsername(e.target.value)}
          value={username}
        />

        <input
          className="default"
          type="password"
          placeholder="password"
          name="password"
          onChange={e => handlePassword(e.target.value)}
          value={password}
        />
        <button>Sign in</button>
      </form>
    </SignInDiv>
  );
};
export default SignIn;
