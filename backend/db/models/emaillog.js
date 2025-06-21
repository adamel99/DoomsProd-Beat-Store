'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class EmailLog extends Model {
    static associate(models) {
      EmailLog.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      });
    }
  }

  EmailLog.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    sentAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'EmailLog',
    tableName: 'EmailLogs',
  });

  return EmailLog;
};
