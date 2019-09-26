import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useInput } from "../../hooks/useInput";

const SignUpDiv = styled.div`
background: #4FB5C8,
color: #173947
`;

const SubButton = styled.button`
border-radius: 30px,
color: #173947,
background: #E56166
`;

const SignUp = props => {
  const [username, setUsername, handleUsername] = useInput("");
  const [password, setPassword, handlePassword] = useInput("");
  const [confirm, setConfirm, handleConfirm] = useInput("");

  const handleSubmit = e => {
    e.preventDefault();
    if (password === confirm) {
      axios
        .post(
          "https://api-dadjokes.herokuapp.com/createnewuser",
          JSON.stringify({ username, password }),
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(res => {
          console.log(res);
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
            .catch(err => {
              console.log(err);
            });
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      alert("Passwords must match.");
    }
  };

  return (
    <SignUpDiv className="signUpDiv">
      <h2>Create new account</h2>
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

        <input
          className="default"
          type="password"
          placeholder="confirm password"
          name="confirm"
          onChange={e => handleConfirm(e.target.value)}
          value={confirm}
        />

        <SubButton>Submit</SubButton>
      </form>
    </SignUpDiv>
  );
};

export default SignUp;
