import React, { useState } from 'react';
import { 
  Row,
  Col,
  Form,
  Button,
  ButtonGroup
} from 'react-bootstrap';
import './CreateGameForm.css';

function CreateGameForm({
  onSubmit
}) {
  const [title, setTitle] = useState(null);
  const [password, setPassword] = useState(null);
  const [difficulty, setDifficulty] = useState(0);
  const [name, setName] = useState(null);
  
  return (
    <Form className="create-game-form">
      <Form.Group as={Row} controlId="name">
        <Form.Label column sm="2">
          Title
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text" 
            placeholder="Title of the game"
            onChange={event => setTitle(event.target.value)}
          />
        </Col>
      </Form.Group>

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

      <Form.Group as={Row} controlId="difficulty">
        <Form.Label column sm="2">
          Difficulty
        </Form.Label>
        <Col sm="10">
          <ButtonGroup aria-label="Difficulty" className="difficulty-buttons">
            <Button variant="secondary" active={difficulty === 0} onClick={() => setDifficulty(0)}>Easy (3 places)</Button>
            <Button variant="secondary" active={difficulty === 1} onClick={() => setDifficulty(1)}>Medium (6 places)</Button>
            <Button variant="secondary" active={difficulty === 2} onClick={() => setDifficulty(2)}>Hard (9 places)</Button>
          </ButtonGroup>
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
          <Button className="create-button" variant="primary" type="button" onClick={() => onSubmit(title, password, difficulty, name)}>
            Create
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default CreateGameForm;