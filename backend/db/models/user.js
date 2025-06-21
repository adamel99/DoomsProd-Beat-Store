'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Product, { foreignKey: 'userId' });
      User.hasMany(models.Order, { foreignKey: 'userId' });  
      User.hasMany(models.EmailLog, { foreignKey: 'userId' });
      User.hasOne(models.Cart, { foreignKey: 'userId' });
    }
  }

  User.init({
    username: {
      type: DataTypes.STRING(30),
      allowNull: false,
      validate: {
        len: [4, 30]
      }
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: [3, 255],
        isEmail: true
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    totalPurchases: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    rewardDiscount: {
      type: DataTypes.DECIMAL(5, 2),
      defaultValue: 0.00
    },
    isSubscribedToEmails: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      allowNull: false,
      defaultValue: 'user'
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users'
  });

  return User;
};
