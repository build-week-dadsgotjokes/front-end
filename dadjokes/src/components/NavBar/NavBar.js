import React from "react";
import { NavContainer, NavLink } from "../../styles/globalStyles";

const NavBar = () => {
  return (
    <NavContainer>
      <NavLink href="/">Home</NavLink>
      <NavLink href="/jokes">Jokes</NavLink>
      <NavLink href="/profile">
        {localStorage.getItem("token") ? "Profile" : "Log In"}
      </NavLink>
    </NavContainer>
  );
};

export default NavBar;
