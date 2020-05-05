import sc from '@supercharge/strings';

let ws;

let WS_PORT = 3030;

let onMessageCallbacks = {};

function closeWs() {
  if (ws) {
    ws.onopen = ws.onclose = ws.onmessage = null;
    ws.close();
  }
}

export function open() {
  closeWs();

  ws = new WebSocket(`ws://${window.location.host}/ws`);
  ws.onopen = function() {
    emitUpdate('Player joined!');
  };
  ws.onclose = function() {
    ws = null;
  };
  ws.onmessage = function(event) {
    Object.values(onMessageCallbacks).forEach(callback => callback(event.data));
  };
}

export function close() {
  closeWs();
  onMessageCallbacks = {};
}

export function subscribe(callback) {
  const key = sc.random(10);
  onMessageCallbacks[key] = callback;
  return key;
}

export function unsubscribe(key) {
  return delete onMessageCallbacks[key];
}

export function emitUpdate(message) {
  if (!ws) return;
  try {
    ws.send(message || 'Game updated!');
  } catch (error) {
    console.log(error);
  }
}
