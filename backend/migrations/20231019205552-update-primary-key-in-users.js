"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("users", "users_pkey");

    await queryInterface.addConstraint("users", {
      fields: ["id"],
      type: "primary key",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("users", "users_pkey");
    await queryInterface.changeColumn("users", "auth0Id", {
      type: Sequelize.STRING,
      unique: true,
    });
    await queryInterface.addConstraint("users", {
      fields: ["auth0Id"],
      type: "primary key",
    });
  },
};
