'use strict';
const { Model, Validator } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // User.hasMany(models.Group, { foreignKey: 'organizerId' })
    }
  };

  User.init(
    {
      username: {
        type: DataTypes.STRING(50), // Change the length to 50
        allowNull: false,
        validate: {
          len: [4, 50], // Update the length validation
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          }
        }
      },
      email: {
        type: DataTypes.STRING(255), // Change the length to 255
        allowNull: false,
        validate: {
          len: [3, 255], // Update the length validation
          isEmail: true
        }
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY, // Remove .BINARY to match the discussed schema
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
        defaultValue: 0
      }
    },
    {
      sequelize,
      modelName: 'User'
    }
  );
  return User;
};
