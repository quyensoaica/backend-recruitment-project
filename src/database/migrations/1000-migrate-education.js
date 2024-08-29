"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Educations", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      school: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      specialized: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      startTime: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      endTime: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      isWorking: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      description: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Educations");
  },
};
