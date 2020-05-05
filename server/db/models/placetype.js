const { DataTypes } = require('sequelize');

module.exports = function(sequelize) {
  return sequelize.define('placetype', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      field: 'id'
    },
    description: {
      type: DataTypes.STRING(45),
      allowNull: false,
      field: 'description'
    },
    level: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      defaultValue: '0',
      field: 'level'
    }
  }, {
    tableName: 'placetype'
  });
};
