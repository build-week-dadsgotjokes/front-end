import React, { useState, createContext, useEffect } from "react";
import JokeList from "../components/JokeList/JokeList";
import Joke from "../components/JokeList/Joke/Joke";
import Profile from "../components/Profile/Profile";
import ProfileJokes from "../components/Profile/ProfileJokes/ProfileJokes";

export const FlagContext = createContext();

export const FlagProvider = props => {
  const [flag, setFlag] = useState("");

  useEffect(() => {
    setFlag(false);
  }, []);

  return (
    <FlagContext.Provider value={[flag, setFlag]}>
      {props.children}
    </FlagContext.Provider>
  );
};
