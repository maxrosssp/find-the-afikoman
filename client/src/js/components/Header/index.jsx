import React from 'react';
import {
  Navbar,
  Button
} from 'react-bootstrap';
import './Header.css';

function Header({
  state,
  onLeave,
  onStart
}) {
  return (
    <Navbar className="header">
      <Navbar.Brand className="brand-name">Find The Afikoman</Navbar.Brand>
      <Navbar.Toggle />
      {state && state.name && (
        <>
          <Navbar.Text className="game-title">
            {state.name}
          </Navbar.Text>
          <Navbar.Collapse className="justify-content-end right-text">
            <Navbar.Text>
            {`Player: ${state.player.name}`}

              {!state.started && state.player.isCreator && <Button className="start header-button" variant="primary" onClick={onStart}>Start</Button>}
              
              <Button className="leave header-button" variant="outline-secondary" onClick={onLeave}>Leave</Button>
            </Navbar.Text>
          </Navbar.Collapse>
        </>
      )}
    </Navbar>
  );
}

export default Header;
