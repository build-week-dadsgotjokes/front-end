import React, { useState, useEffect } from "react";
import axios from "axios";
import Joke from "../../JokeList/Joke/Joke";
import AddJoke from "../../AddJoke/AddJoke";
import { Link } from "react-router-dom";

function ProfileJokes() {
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

  const userLoggedIn = () => {
    return (
      <div>
        <AddJoke />
      </div>
    );
  };
  console.log(jokes);

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

export default ProfileJokes;
