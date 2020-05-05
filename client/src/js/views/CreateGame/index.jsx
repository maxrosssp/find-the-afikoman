import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Redirect } from "react-router-dom";
import Header from '../../components/Header';
import CreateGameForm from '../../components/CreateGameForm';
import { create } from '../../services';
import './CreateGame.css';

function CreateGame() {
  const [created, setCreated] = useState(false);

  function createGame(title, password, difficulty, name) {
    return create(title, password, difficulty, name).then(() => {
      setCreated(true);
    });
  }

  if (created) {
    return <Redirect to="/" />;
  }

  return (
    <div className="create-game">
      <Header />

      <Container>
        <h2 className="form-title">Create a new game</h2>

        <CreateGameForm onSubmit={createGame}/>
      </Container>
    </div>
  );
}

export default CreateGame;
