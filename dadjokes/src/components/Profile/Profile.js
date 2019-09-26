import React from "react";
import { Link } from "react-router-dom";
import ProfileJokes from "../Profile/ProfileJokes/ProfileJokes";
import { Body } from "../../styles/globalStyles";
const Profile = props => {
  console.log(props);
  const logout = e => {
    e.preventDefault();
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <Body>
      <button onClick={logout}>Logout</button>
      <ProfileJokes />
    </Body>
  );
};

export default Profile;
