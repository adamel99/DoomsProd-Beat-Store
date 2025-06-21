'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });

      // If you have order items or related models, associate here
      // Order.hasMany(models.OrderItem, { foreignKey: 'orderId' });
    }
  }

  Order.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    orderStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'pending',
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00,
    },
  }, {
    sequelize,
    modelName: 'Order',
    tableName: 'Orders',
  });

  return Order;
};
