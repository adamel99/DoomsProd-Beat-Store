"use strict";
const bcrypt = require("bcryptjs");
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Products";
    return queryInterface.bulkInsert(
      options,
      [
        {
          productName: "Demo Beat 1",
          productType: "Beat",
          price: 19.99,
          description: "A demo beat for testing",
          uploadDate: new Date(),
          filePath: "/path/to/demo-beat-1.mp3",
          createdAt: new Date(),
          updatedAt: new Date(),
          genre: 'Drill'
        },
        {
          productName: "Demo Loop 1",
          productType: "Loop",
          price: 14.99,
          description: "A demo loop for testing",
          uploadDate: new Date(),
          filePath: "/path/to/demo-loop-1.zip",
          createdAt: new Date(),
          updatedAt: new Date(),
          genre: 'Jersey'
        },
        {
          productName: "Demo Kit 1",
          productType: "Kit",
          price: 29.99,
          description: "A demo kit for testing",
          uploadDate: new Date(),
          filePath: "/path/to/demo-kit-1.zip",
          createdAt: new Date(),
          updatedAt: new Date(),
          genre: 'R&B Drill'
        },
      ],
      {}
    );
  },
  down: async (queryInterface, Sequelize) => {
    options.tableName = "Products";
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
