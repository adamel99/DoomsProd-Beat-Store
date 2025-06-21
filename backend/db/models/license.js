'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class License extends Model {
    static associate(models) {
      License.hasMany(models.Product, {
        foreignKey: 'licenseId',
        onDelete: 'SET NULL',   // ensure Sequelize knows about the behavior
        hooks: true             // needed if you want Sequelize to manage the FK SET NULL in JS hooks
      });
    }
  }

  License.init({
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    usageTerms: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  }, {
    sequelize,
    modelName: 'License',
    tableName: 'Licenses',
  });

  return License;
};
