const { DataTypes } = require('sequelize');

module.exports = function(sequelize) {
  return sequelize.define('place', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    gameid: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'game',
        key: 'id'
      },
      field: 'gameid'
    },
    type: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'placetype',
        key: 'id'
      },
      field: 'type'
    },
    opened: {
      type: DataTypes.INTEGER(3).UNSIGNED,
      allowNull: false,
      defaultValue: '0',
      field: 'opened'
    },
    afikoman: {
      type: DataTypes.INTEGER(3).UNSIGNED,
      allowNull: false,
      defaultValue: '0',
      field: 'afikoman'
    },
    openedBy: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'player',
        key: 'id'
      },
      field: 'openedBy'
    },
    openedOn: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'openedOn'
    }
  }, {
    tableName: 'place'
  });
};
