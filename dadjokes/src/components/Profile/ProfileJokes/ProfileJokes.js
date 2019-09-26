import React, { useState, useEffect } from "react";
import axios from "axios";
import Joke from "../../JokeList/Joke/Joke";
import AddJoke from "../../AddJoke/AddJoke";
import { Link } from "react-router-dom";
import {
  ProfileJokeContainer,
  ScrollJokes,
  ProfileDiv,
  ProfileInfo,
  CardContainer
} from "../../../styles/globalStyles";

const ProfileJokes = () => {
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

  return (
    <ProfileDiv>
      <ProfileInfo>
        <h2>{`Hello, ${username}`}</h2>
        <CardContainer>
          <AddJoke />
        </CardContainer>
      </ProfileInfo>
      <ProfileJokeContainer>
        <ScrollJokes>
          {jokes.map(joke => {
            return (
              <Joke
                id={joke.id}
                key={joke.id}
                setup={joke.setup}
                punchline={joke.punchline}
                user={username}
              />
            );
          })}
        </ScrollJokes>
      </ProfileJokeContainer>
    </ProfileDiv>
  );
};

export default ProfileJokes;
