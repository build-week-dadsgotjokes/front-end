import React, { useState, useEffect } from "react";
import Joke from "./Joke/Joke";
import axios from "axios";

const JokeList = () => {
  const [joke, setJoke] = useState([]);

  axios
    .get("https://official-joke-api.appspot.com/random_ten")
    .then(res => console.log(res.data));
  return <div>JokeList</div>;
};

export default JokeList;
