"use strict";
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
          productName: "Imagination",
          productType: "VST Plugin",
          price: 0,
          description: "A Stereo Imager Plugin that gives users the ability to manipulate the stereo of any given audio!",
          uploadDate: new Date(),
          filePath: "/Images/Imager.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
          genre: 'Drill',
          userId: 3, // Replace with your admin user's ID
        },
        {
          productName: "LinkUp",
          productType: "Full Stack Website",
          price: 0,
          description: "A mock creation of the Meetup website!",
          uploadDate: new Date(),
          filePath: "/path/to/demo-loop-1.zip",
          createdAt: new Date(),
          updatedAt: new Date(),
          genre: 'Jersey',
          userId: 3,
        },
        {
          productName: "Reverb",
          productType: "VST Plugin",
          price: 0,
          description: "A basic Reverb Plugin that gives users the ability to add reverb to any given audio!",
          uploadDate: new Date(),
          filePath: "/Images/Reverb.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
          genre: 'Drill',
          userId: 3, // Replace with your admin user's ID
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
