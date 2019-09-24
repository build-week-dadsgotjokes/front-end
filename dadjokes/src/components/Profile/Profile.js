import React from "react";
import { Link } from "react-router-dom";
import JokeList from "../JokeList/JokeList";

const Profile = props => {
	console.log(props);
	const logout = e => {
		e.preventDefault();
		localStorage.clear();
		window.location.href = "/";
	};
	return (
		<div>
			hello user!<button onClick={logout}>Logout</button>
			<Link to="/jokes">Joke List</Link>
			<JokeList />
		</div>
	);
};

export default Profile;
