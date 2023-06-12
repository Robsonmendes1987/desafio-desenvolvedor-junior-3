'use strict'

const { DataTypes } = require('sequelize')
const { v4: uuidv4 } = require('uuid')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('posts', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
        defaultValue: () => uuidv4(),
      },
      authorId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          // Informa a tabela da referência da associação
          model: 'users',
          // Informa a coluna da referência que é a chave correspondente
          key: 'id',
        },
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING,
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('posts')
  },
}
