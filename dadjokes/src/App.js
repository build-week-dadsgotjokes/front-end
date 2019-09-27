import React from "react";
import "./App.css";
import { Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import Profile from "./components/Profile/Profile";
import JokeList from "./components/JokeList/JokeList";
import SignUp from "./components/SignUp/SignUp";
import PrivateRoute from "./utils/PrivateRoute";
import Home from "./components/Home/Home";
import { JokeProvider } from "./contexts/JokeContext";
import { FlagProvider } from "./contexts/FlagContext";

function App() {
  return (
    <div className="App">
      <JokeProvider>
        <FlagProvider>
          <Route path="/" component={NavBar} />
          <Route path="/jokes" component={JokeList} />
          <PrivateRoute path="/profile" component={Profile} />
        </FlagProvider>
      </JokeProvider>
      <Route exact path="/" component={Home} />
      <Route path="/signup" component={SignUp} />
    </div>
  );
}

export default App;
