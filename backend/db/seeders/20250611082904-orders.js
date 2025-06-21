'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Orders';

    return queryInterface.bulkInsert(options, [
      {
        userId: 1,
        orderStatus: 'completed',
        totalPrice: 29.99,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        orderStatus: 'pending',
        totalPrice: 9.99,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        orderStatus: 'cancelled',
        totalPrice: 0.00,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Orders';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      orderStatus: {
        [Op.in]: ['completed', 'pending', 'cancelled'],
      },
    }, {});
  }
};
