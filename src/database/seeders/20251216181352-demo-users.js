'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert('users', [
      {
        first_name: 'Diego',
        last_name: 'Portella',
        age: 21,
        email: 'diego.portella@encora.com',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        first_name: 'Rafael',
        last_name: 'Yamashita',
        age: 25,
        email: 'rafael.yamashita@encora.com',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  }
};