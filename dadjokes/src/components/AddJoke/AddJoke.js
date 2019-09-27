import React, { useState, useEffect } from "react";
import axios from "axios";
import { removePropertiesDeep } from "@babel/types";
import {
  PageHeader,
  Button,
  PrivCheckbox,
  EnterJoke,
  CheckboxLabel
} from "../../styles/globalStyles";

import { useInput } from "../../hooks/useInput";

const AddJoke = props => {
  const [setup, setSetup, setupHandler] = useInput("");
  const [punchline, setPunchline, punchlineHandler] = useInput("");
  const [isprivate, setIsprivate] = useState(false);

  const SubmitJoke = e => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    axios
      .post(
        "https://api-dadjokes.herokuapp.com/jokes/auth/create",
        JSON.stringify({
          setup: setup,
          punchline: punchline,
          isprivate: isprivate
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
          }
        }
      )
      .then(() => {
        setSetup("");
        setPunchline("");
        window.location.href = window.location.href;
      });
  };

  const checkboxChanged = e => {
    e.target.checked ? setIsprivate(true) : setIsprivate(false);
  };

  return (
    <div>
      <PageHeader>Add Joke</PageHeader>
      <form onSubmit={SubmitJoke}>
        <EnterJoke
          type="text"
          name="setup"
          placeholder="Setup"
          value={setup}
          onChange={e => setupHandler(e.target.value)}
        />
        <EnterJoke
          type="text"
          name="punchline"
          placeholder="Punchline"
          value={punchline}
          onChange={e => punchlineHandler(e.target.value)}
        />
        <CheckboxLabel for="private">
          <PrivCheckbox
            type="checkbox"
            name="private"
            onChange={e => checkboxChanged(e)}
          />
          Private
        </CheckboxLabel>
        <Button type="submit">Save</Button>
      </form>
    </div>
  );
};

export default AddJoke;
