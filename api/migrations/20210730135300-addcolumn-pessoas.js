"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Pessoas", "deletedAt", {
        allowNull: true,
        type: Sequelize.DATE
    });
  },
  // eslint-disable-next-line no-unused-vars
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Pessoas", "deletedAt");
  },
};
