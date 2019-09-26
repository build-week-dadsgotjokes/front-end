import React from "react";
import {
  NavContainer,
  NavLinkContainer,
  NavLink,
  LogoContainer,
  Logo
} from "../../styles/globalStyles";

const NavBar = () => {
  const logout = e => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <NavContainer>
      <LogoContainer>
        <Logo src="https://cdn2.bigcommerce.com/server1700/01wp0ckw/products/2548/images/7569/Dads_002__24151.1496974722.500.500.png?c=2" />
      </LogoContainer>
      <NavLinkContainer>
        <NavLink href="/jokes">Jokes</NavLink>
        <NavLink href="/">
          {localStorage.getItem("token") ? "Profile" : "Log In"}
        </NavLink>

        {localStorage.getItem("token") ? (
          <NavLink
            onClick={e => {
              logout(e);
            }}
          >
            Log Out
          </NavLink>
        ) : (
          <></>
        )}
      </NavLinkContainer>
    </NavContainer>
  );
};

export default NavBar;
