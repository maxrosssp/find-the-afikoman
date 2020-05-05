import axios from 'axios';

export function join(urlid, password, name) {
  return axios.post('/afikoman/join', { urlid, password, name })
    .then(response => response.data);
}

export function create(name, password, level, username) {
  return axios.post('/afikoman/create', { name, password, level, username })
    .then(response => response.data);
}

export function state() {
  return axios.get('/afikoman/game').then(response => response.data);
}

export function start() {
  return axios.get('/afikoman/game/start').then(response => response.data);
}

export function leave() {
  return axios.get('/afikoman/game/leave').then(response => response.data);
}

export function open(placeId) {
  return axios.post('/afikoman/game/place/open', { placeId }).then(response => response.data);
}
