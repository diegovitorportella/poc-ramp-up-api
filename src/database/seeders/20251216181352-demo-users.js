'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert('users', [
      {
        first_name: 'Lionel',
        last_name: 'Messi',
        age: 38,
        email: 'lionel.messi@barcelona.com',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        first_name: 'Cristiano',
        last_name: 'Ronaldo',
        age: 40,
        email: 'cristiano.ronaldo@realmadrid.com',
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  }
};