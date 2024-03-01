"use strict";
const bcrypt = require("bcryptjs");
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
    return queryInterface.bulkInsert(
      options,
      [
        {
          email: "demo@user.io",
          username: "Demo-lition",
          hashedPassword: bcrypt.hashSync("password"),
          firstName: "asdfasdf",
          lastName: "asdaf",
          totalPurchases: 0, // Add default value for totalPurchases
          rewardDiscount: 0, // Add default value for rewardDiscount
          createdAt: new Date(),
          updatedAt: new Date(),
          role: 'user'
        },
        {
          email: "user1@user.io",
          username: "FakeUser1",
          hashedPassword: bcrypt.hashSync("password2"),
          firstName: "asdfasdf",
          lastName: "asdaf",
          totalPurchases: 0,
          rewardDiscount: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
          role: 'user'
        },
        {
          email: "adamelh1999@gmail.com",
          username: "DoomsProd",
          hashedPassword: bcrypt.hashSync("Track5117"),
          firstName: "Dooms",
          lastName: "Prod",
          totalPurchases: 0,
          rewardDiscount: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
          role: 'admin'
        },
      ],
      {}
    );
  },
  down: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        username: { [Op.in]: ["Demo-lition", "FakeUser1", "FakeUser2"] },
      },
      {}
    );
  },
};
