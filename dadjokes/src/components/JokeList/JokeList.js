import React, { useState, useEffect } from "react";
import axios from "axios";
import Joke from "./Joke/Joke";
import AddJoke from "../AddJoke/AddJoke";

function JokeList() {
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

  ///renders AddJoke and random message if user is logged in
  const userLoggedIn = () => {
    const messageArray = [
      "The Lawn's Looking Great Today!",
      "Beer is an acquired taste, so acquire a taste for cheap beer.",
      "Pro Tip: You don't have to pick a favorite child if you don't like any of them",
      "Never raise your hand to your kids. It leaves your groin unprotected.",
      "A friendly reminder to sharpen your mower blades this month.",
      "On the floor, in the office, next to the desk. If it ain't there, blame the kids.",
      "Why would anyone do drugs when they can just mow a lawn?"
    ];
    let randomNum = Math.floor(Math.random() * messageArray.length);
    return (
      <div>
        {messageArray[randomNum]}
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

      {jokes.map(joke => {
        return (
          <Joke
            id={joke.id}
            key={joke.id}
            setup={joke.setup}
            punchline={joke.punchline}
          />
        );
      })}
    </div>
  );
}

export default JokeList;
