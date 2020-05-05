const express = require('express');
const bcrypt = require('bcrypt');
const game = require('./game');
const { Game, Player } = require('../db');

const SALT_ROUNDS = 10;

function afikoman(wsMap) {
  var router = express.Router();

  router.use(express.json());

  router.post('/create', async function (req, res) {
    const { name, password, level, username } = req.body;
    try {
      const game = await Game.create(name, await bcrypt.hash(password, await bcrypt.genSalt(SALT_ROUNDS)), level);
      const player = await Player.finalizeCreator(username, game.id);

      req.session = { urlid: game.urlid, uuid: player.uuid };

      res.json(await Game.getState(game.urlid, player));
    } catch (error) {
      res.status(400).send(error);
    }
  });

  router.post('/join', async function(req, res) {
    const { urlid, password, name } = req.body;

    try {
      const game = await Game.getByUrlid(urlid);
      if (!(await bcrypt.compare(password, game.password))) {
        throw 'Incorrect password entered.' 
      }
      const player = await Player.create(name, game.id);

      req.session = { urlid, uuid: player.uuid };

      res.json(await Game.getState(urlid, player));
    } catch (error) {
      res.status(400).send(error);
    }
  });

  router.use('/game', game(wsMap));

  return router;
}

module.exports = afikoman;