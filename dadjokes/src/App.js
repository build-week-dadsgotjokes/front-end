import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import JokeList from "./components/JokeList/JokeList";

function App() {
  return (
    <div className="App">
      <Route path="/" component={NavBar} />
      <Route exact path="/" component={Login} />
      <Route path="/profile" component={Profile} />
      <Route path="/jokes" component={JokeList} />
    </div>
  );
}

export default App;
