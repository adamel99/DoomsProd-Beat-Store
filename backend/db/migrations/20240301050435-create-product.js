// migrations/<timestamp>-create-products.js
'use strict';

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
      productName: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      productType: {
        type: Sequelize.ENUM('Beat', 'Loop', 'Kit', 'VST/SU Plugin', 'Full Stack Website'),
        allowNull: false,
        validate: {
          notNull: { msg: 'Type is required' },
        },
      },
      price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      uploadDate: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      filePath: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      genre: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    }, options);
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Products";
    return queryInterface.dropTable(options);
  }
};
