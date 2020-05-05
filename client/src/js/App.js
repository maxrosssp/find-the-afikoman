import React from 'react';
import { Switch, Route } from "react-router-dom";
import { CreateGame, JoinGame, Game } from './views';
import { inGame } from './utils/session';
import './App.css';

function App() {
  return (
    <div className="app">
      <Switch>
        <Route path="/join/:urlid" component={JoinGame} />

        <Route path="/" render={() => inGame() ? <Game /> : <CreateGame />} />
      </Switch>
    </div>
  );
}

export default App;
