import React from "react";
import SearchBar from "./SearchBar/SearchBar";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.div`
	background: #e56166;
`;

const Title = styled.h1`
	color: #173947;
	font-family: "Rock Salt", cursive;
`;

const NavBar = () => {
	return (
		<Nav>
			<Title>Hi Hungry, I'm Dad</Title>
			<Link to="/">Home</Link>
			<Link to="/jokes">Jokes</Link>
			<Link to="/profile">Profile</Link>
		</Nav>
	);
};

export default NavBar;
