'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert("accounts", [
      {
        username: "Jason",
        email: "jason@mail.com",
        password: "12345",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "Supratno",
        email: "supratno@mail.com",
        password: "12345",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "Suparman",
        email: "suparman@mail.com",
        password: "12345",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
