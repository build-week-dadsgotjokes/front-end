import React, { useState, useEffect } from "react";
import "./Joke.css";

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

  useEffect(() => {
    console.log("updating");
  }, [flag]);

  const deleteJoke = () => {
    console.log("Attempting to delete");
  };

  const handleChange = e => {
    setJoke({ ...joke, [e.target.name]: e.target.value });
  };

  const editJoke = () => {};

  return (
    <div className="joke">
      <p>{props.setup}</p>
      <p>{props.punchline}</p>
      <p>
        <em>By: {props.user}</em>
      </p>

      {localStorage.getItem("token") ? (
        (<p onClick={deleteJoke}>Delete</p>,
        !editing ? (
          <p onClick={() => setEditing(!editing)}>Edit</p>
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
    </div>
  );
};

export default AddJoke;
