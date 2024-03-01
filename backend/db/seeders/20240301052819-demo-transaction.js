"use strict";
const bcrypt = require("bcryptjs");
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in the options object
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Transactions";
    return queryInterface.bulkInsert(
      options,
      [
        {
          userId: 1,
          productId: 1,
          quantity: 2,
          totalAmount: 39.98,
          paymentStatus: "Completed",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          productId: 2,
          quantity: 1,
          totalAmount: 14.99,
          paymentStatus: "Pending",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          productId: 3,
          quantity: 3,
          totalAmount: 89.97,
          paymentStatus: "Processing",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Add more seed data as needed
      ],
      {}
    );
  },
  down: async (queryInterface, Sequelize) => {
    options.tableName = "Transactions";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        // Add conditions for deleting seed data if needed
      },
      {}
    );
  },
};
