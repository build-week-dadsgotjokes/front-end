import React, { useState, useEffect } from "react";
import axios from "axios";
import Joke from "./Joke/Joke";
import AddJoke from "../AddJoke/AddJoke";
import styled from "styled-components";
import SearchBar from "../NavBar/SearchBar/SearchBar";
import { Link } from "react-router-dom";

const Table = styled.table`
	width: 100%;
`;

const JokeList = props => {
	const [jokes, setJokes] = useState([]);
	const [input, setInput] = useState("");
	const [display, setDisplay] = useState([]);
	const [flag, setFlag] = useState(false);
	console.log(props);

	useEffect(() => {
		axios
			.get(`https://api-dadjokes.herokuapp.com/jokes/public`)
			.then(response => {
				console.log("Jokes", response);
				setJokes(response.data);
				setDisplay(response.data);
			})
			.catch(error => {
				console.log("The data was not returned", error);
			});
	}, []);

	///Search Functionality
	useEffect(() => {
		setDisplay(
			jokes.filter(joke =>
				joke.setup.toLowerCase().includes(input.toLowerCase())
			)
		);
	}, [flag]);

	const changeHandler = e => {
		setInput(e.target.value);
	};

	const submitHandler = e => {
		e.preventDefault();
		setFlag(!flag);
	};
	///

	///renders link to profile and addJoke form if user is logged in
	const userLoggedIn = () => {
		return (
			<div>
				<AddJoke history={props.history} />
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
			<form onSubmit={e => submitHandler(e)}>
				<input onChange={e => changeHandler(e)} />
				<button>Search</button>
			</form>
			<Table>
				<thead>
					<tr>
						<th>Setup</th>
						<th>Punchline</th>
						<th>Username</th>
					</tr>
				</thead>

				{display.map(joke => {
					return (
						<tbody>
							<Joke
								id={joke.id}
								key={joke.id}
								setup={joke.setup}
								punchline={joke.punchline}
								user={joke.owner.username}
							/>
						</tbody>
					);
				})}
			</Table>
		</div>
	);
};

export default JokeList;
