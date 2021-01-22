'use strict';
const bcrypt = require('bcryptjs')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const password = await bcrypt.hash('123456', 6)
    const password1 = await bcrypt.hash('654321', 6)
    const password2 = await bcrypt.hash('012345', 6)
    const createdAt = new Date()
    const updatedAt = createdAt

    await queryInterface.bulkInsert('users', [
      {
        username: 'mike',
        email: 'mike@email.com',
        password: password,
        imageUrl:
          'https://images.unsplash.com/photo-1543871595-e11129e271cc?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=80',
        createdAt,
        updatedAt,
      },
      {
        username: 'edna',
        email: 'edna@email.com',
        password: password1,
        imageUrl:
          'https://images.unsplash.com/photo-1521132293557-5b908a59d1e1?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=667&q=80',
        createdAt,
        updatedAt,
      },
      {
        username: 'lukas',
        email: 'lukas@email.com',
        password: password2,
        imageUrl:
          'https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=500&q=80',
        createdAt,
        updatedAt,
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('users', null, {})
  }
};
