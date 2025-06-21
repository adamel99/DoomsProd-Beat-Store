'use strict';

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Licenses';

    return queryInterface.bulkInsert(options, [
      {
        name: 'Basic Lease',
        price: 29.99,
        description: 'Non-exclusive use for up to 50,000 streams. MP3 included.',
        usageTerms: 'Cannot distribute to radio or perform on TV.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Premium Lease',
        price: 59.99,
        description: 'Non-exclusive use for up to 100,000 streams. MP3 + WAV included.',
        usageTerms: 'Limited monetization and distribution rights.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Unlimited Lease',
        price: 99.99,
        description: 'Unlimited streams, distribution, and monetization. MP3 + WAV + Stems.',
        usageTerms: 'No expiration. Still non-exclusive.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Exclusive License',
        price: 299.99,
        description: 'Exclusive rights to the beat. No one else can license it.',
        usageTerms: 'Full monetization, performance, and sync rights. One-time payment.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Licenses';
    const Op = Sequelize.Op;

    return queryInterface.bulkDelete(options, {
      name: {
        [Op.in]: ['Basic Lease', 'Premium Lease', 'Unlimited Lease', 'Exclusive License']
      }
    }, {});
  },
};
