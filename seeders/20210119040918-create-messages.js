'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('messages', [
      {
        uuid: '7648485a-6657-48d7-87d6-6a98931d3598',
        content: 'Hey edna!',
        from: 'mike',
        to: 'edna',
        createdAt,
        updatedAt,
      },
      {
        uuid: 'ae4df4f1-a428-400d-bb16-edd4237e0c47',
        content: "Hey mike, how's it going?",
        from: 'edna',
        to: 'mike',
        createdAt,
        updatedAt,
      },
      {
        uuid: '0a7c92ac-f69c-4799-8aad-9663a4afb47d',
        content: 'Not too bad, just getting to work, you?',
        from: 'mike',
        to: 'edna',
        createdAt,
        updatedAt,
      },
      {
        uuid: '240dd560-5825-4d5d-b089-12a67e8ec84c',
        content: "I'm working from home now",
        from: 'edna',
        to: 'mike',
        createdAt,
        updatedAt,
      },
      {
        uuid: 'fd4cee68-5caf-4b1b-80a9-5b9add7fd863',
        content: 'Hey mike, are you done with that task?',
        from: 'lukas',
        to: 'mike',
        createdAt,
        updatedAt,
      },
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('messages', null, {})
  },
}