import React from "react";
import { Link } from "react-router-dom";
import ProfileJokes from "../Profile/ProfileJokes/ProfileJokes";

const Profile = props => {
  console.log(props);
  const logout = e => {
    e.preventDefault();
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div>
      <button onClick={logout}>Logout</button>
      <ProfileJokes />
    </div>
  );
};

export default Profile;
