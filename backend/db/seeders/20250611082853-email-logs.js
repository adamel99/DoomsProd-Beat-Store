'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'EmailLogs';

    return queryInterface.bulkInsert(options, [
      {
        userId: 1,
        subject: 'Welcome to BeatStore!',
        body: 'Thanks for signing up. Check out our latest beats and offers.',
        sentAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        subject: 'Purchase Receipt',
        body: 'Thanks for your purchase of the Premium Lease license for "Chill Vibes".',
        sentAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        subject: 'New Beat Released',
        body: 'Check out our new exclusive beat "Sunset Groove" now available.',
        sentAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: null,  // Example system-generated email log with no user
        subject: 'System Maintenance Notice',
        body: 'Our system will be down for maintenance on Sunday from 1-3 AM.',
        sentAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'EmailLogs';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      subject: {
        [Op.in]: [
          'Welcome to BeatStore!',
          'Purchase Receipt',
          'New Beat Released',
          'System Maintenance Notice',
        ],
      },
    }, {});
  },
};
