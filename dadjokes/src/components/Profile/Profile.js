import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ProfileJokes from "../Profile/ProfileJokes/ProfileJokes";
import { Body, ProfileBackground } from "../../styles/globalStyles";
import { UserProvider } from "../../contexts/UserContext";
import { UserJokeProvider } from "../../contexts/UserJokeContext";

const Profile = props => {
  return (
    <ProfileBackground>
      <UserJokeProvider>
        <UserProvider>
          <ProfileJokes />
        </UserProvider>
      </UserJokeProvider>
    </ProfileBackground>
  );
};

export default Profile;
