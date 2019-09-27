import React, { useState, useEffect, useContext } from "react";
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

import useDeleteJoke from "../../../hooks/useDeleteJoke";
import useEditJoke from "../../../hooks/useEditJoke";
const AddJoke = props => {
  const [editing, setEditing] = useState(false);
  const [joke, setJoke] = useState({
    setup: props.setup,
    punchline: props.punchline,
    id: props.id,
    isprivate: false
  });
  const [show, setShow] = useState(false);
  const [jokeid, setJokeid, handleDelete] = useDeleteJoke(joke.id);
  const [editJoke, setEditJoke, handleEdit] = useEditJoke(joke);

  const handleChange = e => {
    setJoke({ ...joke, [e.target.name]: e.target.value });
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
          {!editing ? (
            <TextBtn onClick={e => handleDelete(e.target.id)} id={joke.id}>
              Delete
            </TextBtn>
          ) : (
            <></>
          )}
          <TextBtn onClick={() => setEditing(!editing)}>
            {!editing ? "Edit" : "Cancel"}
          </TextBtn>
        </ButtonRow>
      ) : (
        <></>
      )}
      {editing ? (
        <div>
          <form
            onSubmit={e => {
              e.preventDefault();
              handleEdit(joke);
            }}
            id={joke.id}
          >
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
