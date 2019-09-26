import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useInput } from "../../hooks/useInput";
import {
  PageHeader,
  Button,
  Input,
  SignInForm
} from "../../styles/globalStyles";

const Login = props => {
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
    <div className="signInDiv">
      <PageHeader>Welcome back</PageHeader>
      <SignInForm onSubmit={e => handleSubmit(e)}>
        <Input
          className="default"
          type="text"
          placeholder="username"
          name="username"
          onChange={e => handleUsername(e.target.value)}
          value={username}
        />

        <Input
          className="default"
          type="password"
          placeholder="password"
          name="password"
          onChange={e => handlePassword(e.target.value)}
          value={password}
        />
        <Button>Sign in</Button>
      </SignInForm>
    </div>
  );
};
export default Login;
