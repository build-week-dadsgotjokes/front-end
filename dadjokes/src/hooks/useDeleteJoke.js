import React, { useState, useEffect } from "react";
import axios from "axios";

const useDeleteJoke = initialValue => {
  const [value, setValue] = useState(initialValue);
  const handleDelete = value => {
    deleteItem(value);
  };

  const deleteItem = value => {
    const token = localStorage.getItem("token");
    axios
      .delete(`https://api-dadjokes.herokuapp.com/jokes/auth/delete/${value}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer" + token
        }
      })
      .catch(err => console.log(err));
  };

  return [value, setValue, handleDelete];
};

export default useDeleteJoke;
