'use strict';

const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
        defaultValue: () => uuidv4(),
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
      }
    })

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users')

  }
};
