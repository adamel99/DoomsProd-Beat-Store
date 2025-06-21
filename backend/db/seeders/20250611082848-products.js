'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Products';

    return queryInterface.bulkInsert(options, [
      {
        userId: 3, // Must match an existing User ID from Users seed
        licenseId: 2, // Must match an existing License ID from Licenses seed
        title: 'Chill Vibes',
        description: 'Smooth and laid-back beat perfect for relaxing or study sessions.',
        price: 59.99,
        audioUrl: 'https://example.com/audio/chill-vibes.mp3',
        imageUrl: 'https://example.com/images/chill-vibes.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        licenseId: 1,
        title: 'Upbeat Energy',
        description: 'High-energy beat great for workout or hype videos.',
        price: 29.99,
        audioUrl: 'https://example.com/audio/upbeat-energy.mp3',
        imageUrl: 'https://example.com/images/upbeat-energy.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        licenseId: 4,
        title: 'Exclusive Trap Beat',
        description: 'Hard-hitting trap beat with exclusive rights.',
        price: 299.99,
        audioUrl: 'https://example.com/audio/exclusive-trap.mp3',
        imageUrl: 'https://example.com/images/exclusive-trap.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Products';
    const Op = Sequelize.Op;

    return queryInterface.bulkDelete(options, {
      title: {
        [Op.in]: ['Chill Vibes', 'Upbeat Energy', 'Exclusive Trap Beat']
      }
    }, {});
  },
};
