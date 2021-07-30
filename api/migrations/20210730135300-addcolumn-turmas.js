"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Turmas", "deletedAt", {
        allowNull: true,
        type: Sequelize.DATE
    });
  },
  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Turmas", "deletedAt");
  },
};
