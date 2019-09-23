import React, { useState, useEffect } from "react";
import axios from "axios";
import Joke from "./Joke/Joke";

function JokeList() {
	const [jokes, setJokes] = useState([]);

	useEffect(() => {
		axios
			.get(`https://official-joke-api.appspot.com/random_ten`)
			.then(response => {
				console.log("Jokes", response);
				setJokes(response.data);
			})
			.catch(error => {
				console.log("The data was not returned", error);
			});
	}, []);

	return (
		<div>
			{jokes.map(joke => {
				return (
					<Joke id={joke.id} setup={joke.setup} punchline={joke.punchline} />
				);
			})}
		</div>
	);
}

export default JokeList;
