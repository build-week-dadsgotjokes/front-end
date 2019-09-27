import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

export const UserJokeContext = createContext();

export const UserJokeProvider = props => {
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(`https://api-dadjokes.herokuapp.com/jokes/auth/mine`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer" + token
        }
      })
      .then(response => {
        setJokes(response.data);
      })
      .catch(error => {
        console.log("The data was not returned", error);
      });
  }, []);

  return (
    <UserJokeContext.Provider value={[jokes, setJokes]}>
      {props.children}
    </UserJokeContext.Provider>
  );
};
