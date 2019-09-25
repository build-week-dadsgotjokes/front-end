import React, { useState, useEffect } from "react";
import axios from "axios";

const AddJoke = props => {
  const [addJoke, setAddJoke] = useState({});
  const [setupValue, setSetupValue] = useState("");
  const [punchlineValue, setPunchlineValue] = useState("");

  const handleChange = effect => {
    setAddJoke({
      ...addJoke,
      [effect.target.name]: effect.target.value
    });
    if (effect.target.name === "setup") {
      setSetupValue(effect.target.value);
    }
    if (effect.target.name === "punchline") {
      setPunchlineValue(effect.target.value);
    }
  };

  const SubmitJoke = e => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    axios
      .post(
        "https://api-dadjokes.herokuapp.com/jokes/auth/create",
        JSON.stringify({
          setup: setupValue,
          punchline: punchlineValue,
          isprivate: false
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer" + token
          }
        }
      )
      .then(() => {
        setSetupValue("");
        setPunchlineValue("");
      });
  };

  return (
    <div>
      <form onSubmit={SubmitJoke}>
        <input
          type="text"
          name="setup"
          placeholder="Setup"
          value={setupValue}
          onChange={handleChange}
        />
        <input
          type="text"
          name="punchline"
          placeholder="Punchline"
          value={punchlineValue}
          onChange={handleChange}
        />
        <label for="public">Public</label>
        <input type="checkbox" name="public" checked={addJoke.public} />
        <label for="private">Private</label>
        <input type="checkbox" name="private" checked={addJoke.private} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default AddJoke;
