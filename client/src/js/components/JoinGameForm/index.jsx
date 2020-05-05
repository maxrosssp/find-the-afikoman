import React, { useState } from 'react';
import { 
  Row,
  Col,
  Form,
  Button
} from 'react-bootstrap';
import './JoinGameForm.css';

function JoinGameForm({
  onSubmit
}) {
  const [password, setPassword] = useState(null);
  const [name, setName] = useState(null);
  
  return (
    <Form className="join-game-form">
      <Form.Group as={Row} controlId="password">
        <Form.Label column sm="2">
          Password
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text" 
            placeholder="Password required to join the game"
            onChange={event => setPassword(event.target.value)}
          />
        </Col>
      </Form.Group>
      
      <Form.Group as={Row} controlId="username">
        <Form.Label column sm="2">
          Name
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text" 
            placeholder="Player name"
            onChange={event => setName(event.target.value)}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Col sm={{ span: 10, offset: 2 }}>
          <Button className="join-button" variant="primary" type="button" onClick={() => onSubmit(password, name)}>
            Join
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default JoinGameForm;