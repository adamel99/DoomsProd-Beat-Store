'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
options.tableName = 'Carts';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(options, [
      {
        userId: 1,
        total: 49.99,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 2,
        total: 19.99,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        userId: 3,
        total: 0.00,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
