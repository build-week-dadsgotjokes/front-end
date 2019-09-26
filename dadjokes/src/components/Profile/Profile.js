import React from "react";
import { Link } from "react-router-dom";
import ProfileJokes from "../Profile/ProfileJokes/ProfileJokes";
import { Body, ProfileBackground } from "../../styles/globalStyles";
const Profile = props => {
  return (
    <ProfileBackground>
      <ProfileJokes />
    </ProfileBackground>
  );
};

export default Profile;
