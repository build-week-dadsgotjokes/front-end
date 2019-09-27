import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = props => {
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(
        "https://api-dadjokes.herokuapp.com/users/getusername?credentials=%7B%7D&details=%7B%7D&principal=%7B%7D",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer" + token
          }
        }
      )
      .then(res => setCurrentUser(res.data.username));
  }, []);

  return (
    <UserContext.Provider value={[currentUser, setCurrentUser]}>
      {props.children}
    </UserContext.Provider>
  );
};
