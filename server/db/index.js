const { Sequelize } = require('sequelize');
const sc = require('@supercharge/strings');
const uuidv4 = require('uuid').v4;
const getGame = require('./models/game');
const getPlayer = require('./models/player');
const getPlace = require('./models/place');
const getPlacetype = require('./models/placetype');

const sequelize = new Sequelize({
  dialect: 'mysql',
  database: 'afikoman',
  host: process.env.RDS_HOSTNAME || 'aa17p2o57k51fr1.cqrluvkmh03n.us-east-2.rds.amazonaws.com',
  port: process.env.RDS_PORT || '3306',
  username: process.env.RDS_USERNAME || 'afikoman', 
  password: process.env.RDS_PASSWORD || 'afikoman1',
  pool: { max: 10, min: 0, acquire: 30000, idle: 10000 },
  define: {
    timestamps: false
  }
});

const game = getGame(sequelize);
const player = getPlayer(sequelize);
const place = getPlace(sequelize);
const placetype = getPlacetype(sequelize);

game.hasMany(place, { as: 'places', foreignKey: 'gameid' });
game.hasMany(player, { as: 'players', foreignKey: 'gameid' });
place.belongsTo(placetype, { as: 'placetype', foreignKey: 'type' });
place.belongsTo(player, { as: 'openedByPlayer', foreignKey: 'openedBy' });

const Game = {
  create: async (name, password, level) => {
    async function createNew() {
      const urlid = sc.random(20);
      if (await game.findOne({ where: { urlid } })) {
        return await createNew();
      }
      await game.create({ urlid, name, password, level });
      return await game.findOne({ where: { urlid } });
    }
    return await createNew();
  },
  getByUrlid: async (urlid) => await game.findOne({ where: { urlid } }),
  start: async (urlid) => await game.update({ started: 1 }, { where: { urlid } }),
  getState: async (urlid, currentPlayer) => {
    const { 
      name, completed, started, playerid, winner, players, places 
    } = (await game.findOne({ where: { urlid }, include: [
      { model: player, as: 'players'}, 
      { model: place, as: 'places', include: [{ model: placetype, as: 'placetype' }, { model: player, as: 'openedByPlayer' }] }
    ] })).toJSON();

    return {
      name,
      completed: Boolean(completed),
      started: Boolean(started),
      player: {
        id: currentPlayer.id,
        name: currentPlayer.name,
        isTurn: currentPlayer.id === playerid,
        isWinner: Boolean(currentPlayer.id === winner),
        isCreator: Boolean(currentPlayer.creator)
      },
      players: players.map(player => ({
        id: player.id,
        name: player.name, 
        lastmove: player.lastmove,
        isTurn: player.id === (winner || playerid),
        isWinner: player.id === winner,
        isYou: player.id === currentPlayer.id
      })),
      places: places.map(place => ({ 
        id: place.id, 
        opened: Boolean(place.opened),
        afikoman: Boolean(place.opened) ? place.afikoman : false,
        description: place.placetype.description, 
        openedBy: place.openedByPlayer ? (players.find(player => player.id === place.openedByPlayer.id) || {name: 'Unknown'}).name : null 
      })).sort((p1, p2) => p1.id - p2.id)
    };
  }
};

const Player = {
  create: async (name, gameid) => await player.create({ uuid: uuidv4(), gameid, name }),
  finalizeCreator: async (name, gameid) => {
    const uuid = uuidv4();
    await player.update({ uuid, name }, { where: { gameid, creator: 1 } });
    return await player.findOne({ where: { uuid } });
  },
  getByUuid: async (uuid) => await player.findOne({ where: { uuid } }),
  remove: async (uuid) => await player.destroy({ where: { uuid }})
};

const Place = {
  getById: async (id) => await place.findOne({ where: { id }}),
  open: async (id, openedBy) => await place.update({ opened: 1, openedBy }, { where: { id } }),
};

module.exports = { Game, Player, Place };
