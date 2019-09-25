import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Profile from "./components/Profile/Profile";
import JokeList from "./components/JokeList/JokeList";
import SignUp from "./components/SignUp/SignUp";
import PrivateRoute from "./utils/PrivateRoute";
import Home from "./components/Home/Home";

function App() {
  return (
    <div className="App">
      <Route path="/" component={NavBar} />
      <Route exact path="/" component={Home} />
      <PrivateRoute path="/profile" component={Profile} />
      <Route path="/jokes" component={JokeList} />
      <Route path="/signup" component={SignUp} />
    </div>
  );
}

export default App;
