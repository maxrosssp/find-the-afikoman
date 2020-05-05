import React from 'react';
import {
  Button
} from 'react-bootstrap';
import './Place.css';

function Place({
  place,
  onOpen
}) {
  return (
    <Button 
      id={`place-${place.id}`} 
      className={['place', {'afikoman': place.afikoman, 'opened': place.opened}]} 
      disabled={place.afikoman ? false : place.opened}
      variant={place.afikoman ? 'success' : 'info'}
      onClick={() => onOpen(place.id)}
    >
      <p className="description">{place.description}</p>

      {place.opened && <p className="opened-by">Checked by {place.openedBy}</p>}
    </Button>
  );
}

export default Place;
