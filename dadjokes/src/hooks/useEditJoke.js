import React, { useState, useEffect } from "react";
import axios from "axios";

const useEditJoke = initialValue => {
  const [value, setValue] = useState(initialValue);
  const handleEdit = value => {
    editItem(value);
  };

  const editItem = value => {
    const token = localStorage.getItem("token");
    axios
      .put(
        `https://api-dadjokes.herokuapp.com/jokes/auth/update/${value.id}`,
        JSON.stringify({
          ...value,
          setup: value.setup,
          punchline: value.punchline,
          isprivate: value.isprivate
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer" + token
          }
        }
      )
      .then(() => (window.location.href = window.location.href))
      .catch(err => console.log(err));
  };

  return [value, setValue, handleEdit];
};

export default useEditJoke;
