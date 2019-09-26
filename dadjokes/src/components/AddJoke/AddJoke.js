import React, { useState, useEffect } from "react";
import axios from "axios";
import { removePropertiesDeep } from "@babel/types";
import { PageHeader, SaveJoke, PrivCheckbox } from "../../styles/globalStyles";
const AddJoke = props => {
  const [addJoke, setAddJoke] = useState({});
  const [setupValue, setSetupValue] = useState("");
  const [punchlineValue, setPunchlineValue] = useState("");
  const [isprivate, setIsprivate] = useState(false);

  console.log(window.location.href);
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
          isprivate: isprivate
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
        window.location.href = "/jokes";
      });
  };

  const checkboxChanged = e => {
    e.target.checked ? setIsprivate(true) : setIsprivate(false);
  };

  return (
    <div>
      <PageHeader>Add Joke</PageHeader>
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
        <label className="PrivCheckbox" for="private">Private</label>
        <input
          type="checkbox"
          name="private"
          onChange={e => checkboxChanged(e)}
        />
        <SaveJoke type="submit">Save</SaveJoke>
      </form>
    </div>
  );
};

export default AddJoke;
