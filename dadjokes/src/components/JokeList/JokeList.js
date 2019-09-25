import React, { useState, useEffect } from "react";
import axios from "axios";
import Joke from "./Joke/Joke";
import AddJoke from "../AddJoke/AddJoke";

import SearchBar from "../NavBar/SearchBar/SearchBar";
import { Link } from "react-router-dom";

function JokeList() {
  const [jokes, setJokes] = useState([]);
  const [input, setInput] = useState("");
  const [display, setDisplay] = useState([]);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    axios
      .get(`https://api-dadjokes.herokuapp.com/jokes/public`)
      .then(response => {
        console.log("Jokes", response);
        setJokes(response.data);
        setDisplay(response.data);
      })
      .catch(error => {
        console.log("The data was not returned", error);
      });
  }, []);

  useEffect(() => {
    setDisplay(
      jokes.filter(joke =>
        joke.setup.toLowerCase().includes(input.toLowerCase())
      )
    );
  }, [flag]);

  const changeHandler = e => {
    setInput(e.target.value);
  };

  const submitHandler = e => {
    e.preventDefault();
    setFlag(!flag);
  };
  const userLoggedIn = () => {
    return (
      <div>
        <Link to="/profile">Profile</Link>
        <AddJoke />
      </div>
    );
  };

  return (
    <div>
      {localStorage.getItem("token") ? (
        userLoggedIn()
      ) : (
        <h2>Hi Hungry, I'm Dad</h2>
      )}
      <form onSubmit={e => submitHandler(e)}>
        <input onChange={e => changeHandler(e)} />
        <button>Search</button>
      </form>
      {display.map(joke => {
        return (
          <Joke
            id={joke.id}
            key={joke.id}
            setup={joke.setup}
            punchline={joke.punchline}
            user={joke.owner.username}
          />
        );
      })}
    </div>
  );
}

export default JokeList;
