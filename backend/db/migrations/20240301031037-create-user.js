"use strict";

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true
      },
      hashedPassword: {
        type: Sequelize.STRING,
        allowNull: false
      },
      firstName: { // Add field for first name
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: { // Add field for last name
        type: Sequelize.STRING,
        allowNull: false
      },
      totalPurchases: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      rewardDiscount: {
        type: Sequelize.DECIMAL(5, 2),
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      role: {
        type: Sequelize.STRING, // Assuming role is a string
        allowNull: false,
        defaultValue: 'user' // Default role for regular users
      }
    }, options);
  },
  down: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
    return queryInterface.dropTable(options);
  }
};
