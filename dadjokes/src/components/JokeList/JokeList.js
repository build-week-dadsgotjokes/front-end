import React, { useState, useEffect } from "react";
import axios from "axios";
import Joke from "./Joke/Joke";
import AddJoke from "../AddJoke/AddJoke";
import { Link } from "react-router-dom";

function JokeList() {
	const [jokes, setJokes] = useState([]);

	useEffect(() => {
		axios
			.get(`https://api-dadjokes.herokuapp.com/jokes/public`)
			.then(response => {
				console.log("Jokes", response);
				setJokes(response.data);
			})
			.catch(error => {
				console.log("The data was not returned", error);
			});
	}, []);

	///renders AddJoke and profile link if user is logged in (profile link will be moved to navbar once ayomide pushes his branch.  Waiting for his push to avoid merge conflicts)
	const userLoggedIn = () => {
		return (
			<div>
				<Link to="/profile">Profile</Link>
				<AddJoke />
			</div>
		);
	};

	return (
		<div>
			{localStorage.getItem("token") ? (
				userLoggedIn()
			) : (
				<h2>Hi Hungry, I'm Dad</h2>
			)}

			{jokes.map(joke => {
				return (
					<Joke
						id={joke.id}
						key={joke.id}
						setup={joke.setup}
						punchline={joke.punchline}
					/>
				);
			})}
		</div>
	);
}

export default JokeList;
