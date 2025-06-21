'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    static associate(models) {
      History.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
    }
  }

  History.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    actionType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    actionDetails: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'History',
    tableName: 'History',
  });

  return History;
};
