import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Joke from "./Joke/Joke";
import AddJoke from "../AddJoke/AddJoke";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useInput } from "../../hooks/useInput";
import { JokeContext } from "../../contexts/JokeContext";
import {
  Body,
  AddJokeMain,
  SearchInput,
  Button
} from "../../styles/globalStyles";

const JokeList = props => {
  const [jokes, setJokes] = useContext(JokeContext);
  const [flag, setFlag] = useState(false);
  const [input, setInput, handleInput] = useInput("");
  const [display, setDisplay] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api-dadjokes.herokuapp.com/jokes/public`)
      .then(response => {
        console.log("Jokes", response);
        setDisplay(response.data);
      })
      .catch(error => {
        console.log("The data was not returned", error);
      });
  }, [jokes]);

  ///Search Functionality
  useEffect(() => {
    setDisplay(
      jokes.filter(joke =>
        joke.setup.toLowerCase().includes(input.toLowerCase())
      )
    );
  }, [flag]);

  const userLoggedIn = () => {
    return (
      <AddJokeMain>
        <AddJoke history={props.history} />
      </AddJokeMain>
    );
  };

  useEffect(() => {
    setDisplay(jokes);
  }, []);

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

  return (
    <Body>
      <form onSubmit={e => submitHandler(e)}>
        <SearchInput
          onChange={e => handleInput(e.target.value)}
          value={input}
          placeholder="Search By Punchline"
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
