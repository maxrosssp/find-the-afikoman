const express = require('express');
const { Game, Player } = require('../db');
const place = require('./place');

function game(wsMap) {
  var router = express.Router();

  function endSession(req) {
    const ws = wsMap.getUser(req.session.urlid, req.session.uuid);
    if (ws) {
      ws.close();
    }
    req.session = null;
  }

  router.use(async function(req, res, next) {
    try {
      const { id, urlid, started, completed, playerid } = (await Game.getByUrlid(req.session.urlid)).toJSON();
      req.game = { id, urlid, started, completed, playerid };
      next();
    } catch (error) {
      endSession(req);
      console.log(error.stack);
      res.status(400).send('Game does not exist.');
    }
  });

  router.use(async function(req, res, next) {
    try {
      const { id, name, uuid, gameid, creator } = (await Player.getByUuid(req.session.uuid)).toJSON();
      req.player = { id, name, uuid, gameid, creator };
      next();
    } catch (error) {
      endSession(req);
      console.log(error.stack);
      res.status(400).send('Player does not exist.');
    }
  });

  router.use(function(req, res, next) {
    req.game.id === req.player.gameid ? next() : res.status(400).send('Player is not in game.');
  });

  router.get('/start', async function(req, res) {
    if (req.player.creator !== 1) {
      res.status(400).send('Only the creator of the game can start it.');
    } else if (req.game.started === 1) {
      res.status(400).send('The game is already started.');
    } else {
      await Game.start(req.session.urlid);
      res.json(await Game.getState(req.session.urlid, req.player));
    }
  });

  router.get('/leave', async function(req, res) {
    try {
      await Player.remove(req.player.uuid);
      res.send('Game successfully left.');
    } catch (error) {
      console.log(error.stack);
      res.status(400).send('Player could not leave game.');
    }
  });

  router.get('/', async function(req, res) {
    try {
      res.json(await Game.getState(req.session.urlid, req.player));
    } catch (error) {
      endSession(req);
      res.status(400).send(error);
    }
  });

  router.use('/place', place);

  return router;
}

module.exports = game;
