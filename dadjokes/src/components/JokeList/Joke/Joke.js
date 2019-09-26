import React, { useState, useEffect } from "react";
import "./Joke.css";
import axios from "axios";
import {
  CardContainer,
  CardContent,
  Emphasized,
  CardInfo,
  ButtonRow,
  TextBtn,
  PrivCheckbox,
  CheckboxLabel,
  Input,
  FlexRow,
  Button,
  CardPunch,
  ShowPunch,
  CardId
} from "../../../styles/globalStyles";

const AddJoke = props => {
  const [editing, setEditing] = useState(false);
  const [joke, setJoke] = useState({
    setup: props.setup,
    punchline: props.punchline,
    id: props.id,
    isprivate: false
  });
  const [show, setShow] = useState(false);

  const deleteJoke = () => {
    const token = localStorage.getItem("token");
    axios
      .delete(
        `https://api-dadjokes.herokuapp.com/jokes/auth/delete/${joke.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
          }
        }
      )

      .then(res => console.log(res))
      .then(res => (window.location.href = window.location.href))
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

  return (
    <CardContainer className="joke">
      <CardInfo>
        <CardId>#{props.id}</CardId>
        <CardContent>{props.setup}</CardContent>
        {show ? (
          <CardPunch onClick={() => setShow(false)}>
            {props.punchline}
          </CardPunch>
        ) : (
          <ShowPunch onClick={() => setShow(true)}>Show Punchline</ShowPunch>
        )}
        <Emphasized>By: {props.user}</Emphasized>
      </CardInfo>
      {localStorage.getItem("token") ? (
        <ButtonRow>
          {!editing ? <TextBtn onClick={deleteJoke}>Delete</TextBtn> : <></>}
          <TextBtn onClick={() => setEditing(!editing)}>
            {!editing ? "Edit" : "Cancel"}
          </TextBtn>
        </ButtonRow>
      ) : (
        <></>
      )}
      {editing ? (
        <div>
          <form onSubmit={editJoke}>
            <Input
              type="text"
              name="setup"
              placeholder="Setup"
              value={joke.setup}
              onChange={handleChange}
            />
            <Input
              type="text"
              name="punchline"
              placeholder="Punchline"
              value={joke.punchline}
              onChange={handleChange}
            />
            <FlexRow>
              <CheckboxLabel for="private">
                <PrivCheckbox type="checkbox" name="private" />
                Private
              </CheckboxLabel>
              <Button>save</Button>
            </FlexRow>
          </form>
        </div>
      ) : (
        <></>
      )}
    </CardContainer>
  );
};

export default AddJoke;
