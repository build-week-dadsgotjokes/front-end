import React, { useState } from "react";
import axios from "axios";

const SignUp = props => {
  const [newUser, setNewUser] = useState({});

  const handleChanges = e => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };
  const handleSubmit = e => {
    const password = newUser.password;
    const username = newUser.username;
    e.preventDefault();
    if (password === newUser.confirm) {
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
    <form className="signUpDiv" onSubmit={e => handleSubmit(e)}>
      <h2>Create new account</h2>
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

      <input
        className="default"
        type="password"
        placeholder="confirm password"
        name="confirm"
        onChange={e => handleChanges(e)}
      />

      <button>accept and submit</button>

      <div>By submitting you accept the terms and conditions.</div>
    </form>
  );
};

export default SignUp;
