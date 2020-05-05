import React from 'react';
import {
  Row,
  Col
} from 'react-bootstrap';
import Place from './Place';
import './Places.css';

function Places({
  places,
  onOpen
}) {
  return (
    <Row className="places">
      {places.map(place => (<Col className="places-col" key={place.id} sm={4}><Place place={place} onOpen={onOpen} /></Col>))}
    </Row>
  );
}

export default Places;
