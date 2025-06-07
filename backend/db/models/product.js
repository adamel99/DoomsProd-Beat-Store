// models/product.js
'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.User, { foreignKey: 'userId' });
      Product.hasMany(models.Transaction, { foreignKey: 'productId' });
    }
  }

  Product.init(
    {
      productName: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      productType: {
        type: DataTypes.ENUM('Beat', 'Loop', 'Kit', 'VST Plugin', 'Full Stack Website'),
        allowNull: false,
        validate: {
          notNull: { msg: 'Type is required' },
        },
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      uploadDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      },
      filePath: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      },
      genre: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Product',
    }
  );

  return Product;
};
