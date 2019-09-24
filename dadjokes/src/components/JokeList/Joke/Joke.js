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

  useEffect(() => {
    console.log("editing");
  }, [editing]);

  const deleteJoke = () => {
    console.log("Attempting to delete");
  };

  const submitJoke = () => {};

  const handleChange = () => {};
  const editJoke = () => {
    console.log("editing");
  };

  return (
    <div className="joke">
      <p>{props.id}</p>
      <p>{props.setup}</p>
      <p>{props.punchline}</p>
      <p onClick={deleteJoke}>Delete</p>
      {editing ? (
        <p onClick={() => setEditing(!editing)}>Edit</p>
      ) : (
        <div>
          <form onSubmit={submitJoke}>
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
            <button type="submit">Save</button>
            <p onClick={() => setEditing(!editing)}>Cancel</p>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddJoke;
