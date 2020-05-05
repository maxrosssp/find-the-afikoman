import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { Redirect } from "react-router-dom";
import Header from '../../components/Header';
import ShareLink from '../../components/ShareLink';
import Places from '../../components/Places';
import Players from '../../components/Players';
import { open, start, leave, state as getState } from '../../services';
import { getUrlid, endSession } from '../../utils/session';
import { open as openWs, close, subscribe, unsubscribe, emitUpdate } from '../../utils/websocket';
import './Game.css';

function Game() {
  const urlid = getUrlid();
  const [gameEnded, setGameEnded] = useState(false);
  const [isUpdated, setIsUpdated] = useState(true);
  const [state, setState] = useState({});
  const [places, setPlaces] = useState([]);
  const [players, setPlayers] = useState([]);

  function getLatestState() {
    getState().then(state => {
      console.log(state);
      setState(state);
      setPlaces(state.places);
      setPlayers(state.players);
      setIsUpdated(false);
    }).catch(() => {
      endSession();
      setGameEnded(true);
    });
  }

  useEffect(() => {
    openWs();
    const key = subscribe(getLatestState);
    return () => {
      close();
      unsubscribe(key);
    }
  }, []);

  useEffect(() => {
    if (isUpdated) { 
      getLatestState();
    }
  }, [isUpdated]);

  function setUpdated(message) {
    emitUpdate(message);
    setIsUpdated(true);
  }
 
  function openPlace(placeId) {
    if (state.completed) return;
    return open(placeId).then(() => setUpdated());
  }

  function startGame() {
    return start().then(() => setUpdated('Game started!'));
  }

  function onLeave() {
    return leave().then(() => setUpdated('Player left.'));
  }

  if (gameEnded) {
    return <Redirect to="/" />;
  }

  return (
    <div className="game">
      <Header state={state} onLeave={onLeave} onStart={startGame} />

      <Container>
        {!state.started && (
          <Row>
            <Col>
            <ShareLink urlid={urlid} />
            </Col>
          </Row>
        )}

        <Row>
          {state.started && (
            <Col sm={8}>
              <Places places={places} onOpen={openPlace} />
            </Col>
          )}

          <Col sm={state.started ? 4 : 12}>
            <Players players={players} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Game;
