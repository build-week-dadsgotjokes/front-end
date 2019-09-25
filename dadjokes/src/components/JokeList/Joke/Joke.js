import React, { useState, useEffect } from "react";
import "./Joke.css";
import styled from "styled-components";
import axios from "axios";

const Body = styled.tr`
	min-width: 100%;
	padding: 30vh;
	border: 1px solid black;
`;

const Item = styled.td`
	border: 1px solid black;
	border-collapse: collapse;
	background-color: #173947;
	color: #4fb5c8;
	font-family: "Neucha", cursive;
`;

const AddJoke = props => {
  const [editing, setEditing] = useState(false);
  const [joke, setJoke] = useState({
    setup: props.setup,
    punchline: props.punchline,
    id: props.id,
    isprivate: false
  });
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    console.log("editing");
  }, [editing]);

  const deleteJoke = () => {
    const token = localStorage.getItem("token");
    console.log(joke.id);
    axios
      .delete(
        `https://api-dadjokes.herokuapp.com/jokes/auth/delete/${joke.id}`,
        {
          headers: {
            accept: "application/json",
            Authorization: "Bearer" + token
          }
        }
      )
      .catch(err => console.log(err));
  };

  const handleChange = e => {
    setJoke({ ...joke, [e.target.name]: e.target.value });
  };

  const editJoke = e => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    axios
      .put(
        `https://api-dadjokes.herokuapp.com/jokes/auth/update/${joke.id}`,
        JSON.stringify({
          ...joke,
          setup: joke.setup,
          punchline: joke.punchline,
          isprivate: joke.isprivate
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer" + token
          }
        }
      )
      .catch(err => console.log(err));
  };

	const editJoke = () => {};

	return (
		<Body>
			<Item>{props.setup}</Item>
			<Item>{props.punchline}</Item>
			<Item>{props.user}</Item>

			{localStorage.getItem("token") ? (
				(<p onClick={deleteJoke}>Delete</p>,
				!editing ? (
					<i className="fa fa-edit" onClick={() => setEditing(!editing)}></i>
				) : (
					<div>
						<form onSubmit={editJoke}>
							<input
								type="text"
								name="setup"
								placeholder="Setup"
								value={joke.setup}
								onChange={handleChange}
							/>
							<input
								type="text"
								name="punchline"
								placeholder="Punchline"
								value={joke.punchline}
								onChange={handleChange}
							/>
							<label for="public">Public</label>
							<input type="checkbox" name="public" />
							<label for="private">Private</label>
							<input type="checkbox" name="private" />
							<p onClick={() => setEditing(!editing)}>Cancel</p>
							<button>save</button>
						</form>
					</div>
				))
			) : (
				<></>
			)}
		</Body>
	);
};

export default AddJoke;
