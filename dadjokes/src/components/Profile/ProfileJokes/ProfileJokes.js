import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Joke from "../../JokeList/Joke/Joke";
import AddJoke from "../../AddJoke/AddJoke";
import { Link } from "react-router-dom";
import { UserJokeContext } from "../../../contexts/UserJokeContext";
import { UserContext } from "../../../contexts/UserContext";
import {
  ProfileJokeContainer,
  ScrollJokes,
  ProfileDiv,
  ProfileInfo,
  CardContainer
} from "../../../styles/globalStyles";

const ProfileJokes = () => {
  const [jokes, setJokes] = useContext(UserJokeContext);
  const [currentUser, setCurrentUser] = useContext(UserContext);

  return (
    <ProfileDiv>
      <ProfileInfo>
        <h2>{`Hello, ${currentUser}`}</h2>
        <CardContainer>
          <AddJoke />
        </CardContainer>
      </ProfileInfo>
      <ProfileJokeContainer>
        <ScrollJokes>
          {jokes.length === 0 ? (
            <div>
              <h3>You haven't created any jokes!</h3>
              <p>
                <em>Jokes you create will display here</em>
              </p>
            </div>
          ) : (
            jokes.map(joke => {
              return (
                <Joke
                  id={joke.id}
                  key={joke.id}
                  setup={joke.setup}
                  punchline={joke.punchline}
                  user={currentUser}
                />
              );
            })
          )}
        </ScrollJokes>
      </ProfileJokeContainer>
    </ProfileDiv>
  );
};

export default ProfileJokes;
