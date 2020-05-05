const { DataTypes } = require('sequelize');

module.exports = function(sequelize) {
  return sequelize.define('game', {
    id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        field: 'id'
    },
    urlid: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
        field: 'urlid'
    },
    name: {
        type: DataTypes.STRING(20),
        allowNull: false,
        field: 'name'
    },
    password: {
        type: DataTypes.STRING(60),
        allowNull: false,
        field: 'password'
    },
    lastupdate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        field: 'lastupdate'
    },
    completed: {
        type: DataTypes.INTEGER(3).UNSIGNED,
        allowNull: false,
        defaultValue: '0',
        field: 'completed'
    },
    level: {
        type: DataTypes.INTEGER(10).UNSIGNED,
        allowNull: false,
        defaultValue: '0',
        field: 'level'
    },
    playerid: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        references: {
            model: 'player',
            key: 'id'
        },
        field: 'playerid'
    },
    started: {
        type: DataTypes.INTEGER(4),
        allowNull: false,
        defaultValue: '0',
        field: 'started'
    },
    winner: {
        type: DataTypes.INTEGER(11),
        allowNull: true,
        references: {
            model: 'player',
            key: 'id'
        },
        field: 'winner'
    }
  }, {
    tableName: 'game'
  });
}
