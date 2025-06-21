'use strict';

const bcrypt = require("bcryptjs");
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
    return queryInterface.bulkInsert(options, [
      {
        id: 1,
        email: "demo@user.io",
        username: "Demo-lition",
        hashedPassword: bcrypt.hashSync("password"),
        firstName: "Demo",
        lastName: "User",
        totalPurchases: 0,
        rewardDiscount: 0.00,
        isSubscribedToEmails: true,
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        email: "user1@user.io",
        username: "FakeUser1",
        hashedPassword: bcrypt.hashSync("password2"),
        firstName: "Fake",
        lastName: "User",
        totalPurchases: 0,
        rewardDiscount: 0.00,
        isSubscribedToEmails: true,
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        email: "adamelh1999@gmail.com",
        username: "DoomsProd",
        hashedPassword: bcrypt.hashSync("Track5117"),
        firstName: "Dooms",
        lastName: "Prod",
        totalPurchases: 0,
        rewardDiscount: 0.00,
        isSubscribedToEmails: true,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ["Demo-lition", "FakeUser1", "DoomsProd"] }
    }, {});
  }
};
