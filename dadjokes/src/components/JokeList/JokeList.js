import React, { useState, useEffect } from "react";
import axios from "axios";
import Joke from "./Joke/Joke";
import AddJoke from "../AddJoke/AddJoke";
import SearchBar from  "../NavBar/SearchBar/SearchBar";

function JokeList() {
  const [jokes, setJokes] = useState([]);
  const [display, setDisplay] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    axios
      .get(`https://official-joke-api.appspot.com/random_ten`)
      .then(response => {
        console.log("Jokes", response);
        setJokes(response.data);
      })
      .catch(error => {
        console.log("The data was not returned", error);
      });
  }, []);

  useEffect(() => {
    setDisplay(jokes.filter(joke=> joke.setup.toLowerCase().includes(input.toLowerCase())))
  },[input]);

  useEffect(() => {
    setDisplay(jokes);
  }, [jokes]); 

  return (
    <div>
      <AddJoke />
      <SearchBar onChange={setInput} value={input} />
      {display.map(joke => {
        return (
          <Joke id={joke.id} setup={joke.setup} punchline={joke.punchline} />
        );
      })}
    </div>
  );
}

export default JokeList;
