import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Redirect, useParams } from "react-router-dom";
import Header from '../../components/Header';
import JoinGameForm from '../../components/JoinGameForm';
import { join } from '../../services';
import './JoinGame.css';

function JoinGame() {
  const { urlid } = useParams();
  const [joined, setJoined] = useState(false);

  function onJoinGame(password, name) {
    return join(urlid, password, name).then(() => {
      setJoined(true);
    });
  }

  if (joined) {
    return <Redirect to="/" />;
  }

  return (
    <div className="join-game">
      <Header />

      <Container>
        <h2 className="form-title">Join game</h2>

        <JoinGameForm onSubmit={onJoinGame} />
      </Container>
    </div>
  );
}

export default JoinGame;
