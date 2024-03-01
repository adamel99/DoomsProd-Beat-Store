"use strict";

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      genre: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      productName: {
        type: Sequelize.STRING(255), // Adjust the length as needed
        allowNull: false
      },
      productType: {
        type: Sequelize.ENUM('Kit', 'Beat', 'Loop'), // Adjust the length as needed
        allowNull: false
      },
      price: {
        type: Sequelize.DECIMAL(10, 2), // Adjust the precision and scale as needed
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      uploadDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      filePath: {
        type: Sequelize.STRING, // Adjust the length as needed
        allowNull: false
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
    }, options);
  },
  down: async (queryInterface, Sequelize) => {
    options.tableName = "Products";
    return queryInterface.dropTable(options);
  }
};
