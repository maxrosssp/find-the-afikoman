const { DataTypes } = require('sequelize');

module.exports = function(sequelize) {
  return sequelize.define('player', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    uuid: {
      type: DataTypes.STRING(20),
      allowNull: true,
      unique: false,
      field: 'uuid'
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      field: 'name'
    },
    lastMove: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'lastMove'
    },
    createdOn: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'createdOn'
    },
    gameid: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'game',
        key: 'id'
      },
      field: 'gameid'
    },
    creator: {
      type: DataTypes.INTEGER(3).UNSIGNED,
      allowNull: false,
      defaultValue: '0',
      field: 'creator'
    }
  }, {
    tableName: 'player'
  });
}
