'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Product, { foreignKey: 'userId' });
      User.hasMany(models.Transaction, { foreignKey: 'userId' });
    }
  };

  User.init(
    {
      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          len: [4, 50],
        },
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          len: [3, 255],
          isEmail: {
            msg: "Invalid email format.",
          },
        },
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60],
        },
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      totalPurchases: {
        type: DataTypes.INTEGER,
        defaultValue: sequelize.literal('0'),
      },
      rewardDiscount: {
        type: DataTypes.DECIMAL(5, 2),
        defaultValue: sequelize.literal('0.00'),
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user',
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  return User;
};
