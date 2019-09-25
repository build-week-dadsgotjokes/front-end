import React from "react";
import SearchBar from "./SearchBar/SearchBar";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.div`
	background: #e56166;
`;

const NavBar = () => {
	return (
		<Nav>
			<h1>Hi Hungry, I'm Dad</h1>
			<Link to="/">Home</Link>
			<Link to="/jokes">Jokes</Link>
			<Link to="/profile">Profile</Link>
		</Nav>
	);
};

export default NavBar;
