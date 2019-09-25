import React, { useState, useEffect } from "react";
import axios from "axios";
import Joke from "../../JokeList/Joke/Joke";
import AddJoke from "../../AddJoke/AddJoke";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Table = styled.table`
  width: 100%;
`;

const Head = styled.tr``;

const Body = styled.tr``;

function ProfileJokes() {
  const [jokes, setJokes] = useState([]);
  const [username, setUsername] = useState("");

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
      .then(res => setUsername(res.data.username));
  }, [jokes]);

  console.log(jokes);

  const userLoggedIn = () => {
    return (
      <div>
        <h2>{`Hello, ${username}`}</h2>
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

      <Table>
        <thead>
          <Body>
            <th>Setup</th>
            <th>Punchline</th>
            <th>Username</th>
          </Body>
        </thead>

        {jokes.map(joke => {
          return (
            <tbody>
              <Joke
                id={joke.id}
                key={joke.id}
                setup={joke.setup}
                punchline={joke.punchline}
                user={username}
              />
            </tbody>
          );
        })}
      </Table>
    </div>
  );
}

export default ProfileJokes;
