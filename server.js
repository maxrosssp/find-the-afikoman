const cookieSession = require('cookie-session');
const express = require('express');
const http = require('http');
const path = require('path');
const afikoman = require('./server/routes/afikoman');
const openWebSockets = require('./server/websockets');
const WSMap = require('./server/wsmap');

const PORT = process.env.HTTP_PORT || 4001;
const WS_PORT = process.env.WS_PORT || 3030;

const sessionParser = cookieSession({
  name: 'session',
  keys: ['ShMTsvTcaLJags5gWAG4mBguFjF9frkN'],
  httpOnly: false
});

const app = express();

const wsMap = WSMap();

app.use(sessionParser);

app.use(express.static(path.join(__dirname, 'client', 'build')));

app.use('/afikoman', afikoman(wsMap));

app.get('*', (req, res) =>{
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Express server listening at port ${PORT}.`);
});

const server = http.createServer(app);

openWebSockets(server, sessionParser, wsMap);

server.listen(WS_PORT, () => {
  console.log(`WebSocket server listening at port ${WS_PORT}`);
});
