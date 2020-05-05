const WebSocket = require('ws');

const WS_PORT = process.env.WS_PORT || 3030;

function openWebSockets(server, sessionParser, wsMap) {
  const wss = new WebSocket.Server({ clientTracking: false, noServer: true });

  server.on('upgrade', function(request, socket, head) { 
    sessionParser(request, {}, () => {
      if (!request.session.urlid || !request.session.uuid) {
        socket.destroy();
        return;
      }
      wss.handleUpgrade(request, socket, head, function(ws) {
        wss.emit('connection', ws, request);
      });
    });
  });

  wss.on('connection', function(ws, request) {
    if (!request.session) {
      return;
    }

    const { urlid, uuid } = request.session;
  
    wsMap.setUser(urlid, uuid, ws);
  
    ws.on('message', function(message) {
      wsMap.forEachUserInGame(urlid, client => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    });
  
    ws.on('close', function() {
      wsMap.deleteUser(urlid, uuid);
    });
  });
}

module.exports = openWebSockets;
