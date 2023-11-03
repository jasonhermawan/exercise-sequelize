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
    await queryInterface.bulkInsert("products", [
      {
        userid: 8,
        name: "Jacket Kutub Utara",
        price: 150000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userid: 8,
        name: "Tas Kutub Utara",
        price: 250000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userid: 8,
        name: "Sabuk Kutub Utara",
        price: 50000,
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
