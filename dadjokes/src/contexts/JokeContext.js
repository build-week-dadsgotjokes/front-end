import React, { useState, useEffect, createContext } from "react";
import axios from "axios";

export const JokeContext = createContext();

export const JokeProvider = props => {
  const [jokes, setJokes] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api-dadjokes.herokuapp.com/jokes/public`)
      .then(response => {
        console.log("Jokes", response);
        setJokes(response.data);
      })
      .catch(error => {
        console.log("The data was not returned", error);
      });
  }, []);
  return (
    <JokeContext.Provider value={[jokes, setJokes]}>
      {props.children}
    </JokeContext.Provider>
  );
};
