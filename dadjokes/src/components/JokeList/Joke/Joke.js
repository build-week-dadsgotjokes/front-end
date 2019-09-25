import React, { useState, useEffect } from "react";
import "./Joke.css";
import axios from "axios";

const AddJoke = props => {
  const [editing, setEditing] = useState(false);
  const [joke, setJoke] = useState({
    setup: props.setup,
    punchline: props.punchline,
    id: props.id,
    isprivate: false
  });

  useEffect(() => {
    console.log("editing");
  }, [editing]);

  const deleteJoke = () => {
    const token = localStorage.getItem("token");
    axios.delete(
      `https://api-dadjokes.herokuapp.com/jokes/auth/delete/${joke.id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer" + token
        }
      }
    );
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

  return (
    <div className="joke">
      <p>{props.setup}</p>
      <p>{props.punchline}</p>
      <p>
        <em>By: {props.user}</em>
      </p>
      {
      joke.isprivate ? 
      <p onClick={() => deleteJoke}>Delete</p>
      <p onClick={() => setEditing(!editing)}>Edit</p> :
      <></>
      }
      
      <div>
        <form onSubmit={e => editJoke(e)}>
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
          <label for="private">Private</label>
          <input type="checkbox" name="private" />
          <p onClick={() => setEditing(!editing)}>Cancel</p>
          <button>save</button>
        </form>
      </div>
    </div>
  );
};

export default AddJoke;
