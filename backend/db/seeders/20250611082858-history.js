'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'History';

    return queryInterface.bulkInsert(options, [
      {
        userId: 1,
        actionType: 'User Login',
        actionDetails: 'User logged in from IP 123.45.67.89',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        actionType: 'Password Change',
        actionDetails: 'User changed their password.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: null, // system generated action
        actionType: 'System Maintenance',
        actionDetails: 'Scheduled maintenance performed on database.',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'History';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      actionType: {
        [Op.in]: ['User Login', 'Password Change', 'System Maintenance'],
      },
    }, {});
  }
};
