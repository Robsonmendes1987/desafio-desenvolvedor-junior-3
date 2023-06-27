"use strict";

// src/database/migrations/20230610231800-posts.js
var { v4: uuidv4 } = require("uuid");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("posts", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
        defaultValue: () => uuidv4()
      },
      authorId: {
        allowNull: false,
        // primaryKey: true,
        type: Sequelize.STRING,
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        references: {
          // Informa a tabela da referência da associação
          model: "users",
          // Informa a coluna da referência que é a chave correspondente
          key: "id",
          field: "author_id"
        }
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("posts");
  }
};
