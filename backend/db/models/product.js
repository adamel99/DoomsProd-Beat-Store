'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.User, { foreignKey: 'userId' });

      Product.belongsTo(models.License, {
        foreignKey: 'licenseId',
        onDelete: 'SET NULL',   // keep model consistent with DB FK behavior
        hooks: true             // ensures Sequelize can manage this if you delete via model methods
      });
    }
  }

  Product.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    licenseId: {
      type: DataTypes.INTEGER,
      allowNull: true,  // 🔑 match migration — allow null when license is deleted
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    audioUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'Product',
    tableName: 'Products',
  });

  return Product;
};
