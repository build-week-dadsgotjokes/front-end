import React from "react";
import SearchBar from "./SearchBar/SearchBar";
import styled from 'styled-components';

const Nav = styled.div`
background: #E56166
`;

const NavBar = () => {
  return (
    <Nav>
      Navbar
      <SearchBar />
    </Nav>
  );
};

export default NavBar;
