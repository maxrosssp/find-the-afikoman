var express = require('express');
const { Game, Place } = require('../db');

var router = express.Router();

router.use(async function(req, res, next) {
  try {
    if (req.body) {
      const { id, gameid, opened } = (await Place.getById(req.body.placeId)).toJSON();
      req.place = { id, gameid, opened };
    }
    next();
  } catch (error) {
    console.log(error.stack);
    res.status(400).send('Place is not in game.');
  }
});

router.use(async function(req, res, next) {
  req.game.completed !== 1 ? next() : res.status(400).send('The game is already completed.');
});

router.use(async function(req, res, next) {
  req.game.id === req.place.gameid ? next() : res.status(400).send('Place is not in game.');
});

router.post('/open', async function(req, res) {
  if (req.game.playerid !== req.player.id) {
    res.status(400).send('It is not your turn.');
  } else if (req.place.opened === 1) {
    res.status(400).send('This place is already open.');
  } else {
    await Place.open(req.place.id, req.player.id);
    res.json(await Game.getState(req.session.urlid, req.player));
  }
});

module.exports = router;
