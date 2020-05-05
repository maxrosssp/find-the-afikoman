import React from 'react';
import {
  ListGroup
} from 'react-bootstrap';
import './Players.css';

function Players({
  players
}) {
  return (
    <ListGroup as="ul" variant="flush" className="players">
      {players.map(player => (
        <ListGroup.Item
          key={player.id} 
          as="li"
          className={{'bold-text': player.isYou}}
          variant={player.isTurn ? 'secondary' : ''}
        >
          {[player.name, player.isYou ? '(You)' : '', player.isWinner ? 'found the Afikoman!' : ''].join(' ').trim()}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
}

export default Players;
