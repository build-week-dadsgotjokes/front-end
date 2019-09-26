import React, { useState, useEffect } from "react";
import axios from "axios";
import Joke from "./Joke/Joke";
import AddJoke from "../AddJoke/AddJoke";
import styled from "styled-components";
import SearchBar from "../NavBar/SearchBar/SearchBar";
import { Link } from "react-router-dom";
import { useInput } from "../../hooks/useInput";
import {
  Body,
  AddJokeMain,
  SearchInput,
  Button
} from "../../styles/globalStyles";

const JokeList = props => {
  const [jokes, setJokes] = useState([]);
  const [input, setInput, handleInput] = useInput("");
  const [display, setDisplay] = useState([]);
  const [flag, setFlag] = useState(false);
  console.log(props);

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

  ///Search Functionality
  useEffect(() => {
    setDisplay(
      jokes.filter(joke =>
        joke.setup.toLowerCase().includes(input.toLowerCase())
      )
    );
  }, [flag]);

  const submitHandler = e => {
    e.preventDefault();
    setFlag(!flag);
  };
  ///

  ///renders link to profile and addJoke form if user is logged in
  const userLoggedIn = () => {
    return (
      <AddJokeMain>
        <AddJoke history={props.history} />
      </AddJokeMain>
    );
  };

  return (
    <Body>
      <form onSubmit={e => submitHandler(e)}>
        <SearchInput
          onChange={e => handleInput(e.target.value)}
          value={input}
        />
        <Button>Search</Button>
      </form>
      {localStorage.getItem("token") ? (
        userLoggedIn()
      ) : (
        <h2>Hi Hungry, I'm Dad</h2>
      )}

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
    </Body>
  );
};

export default JokeList;
