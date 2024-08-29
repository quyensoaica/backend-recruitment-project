// "use strict";
// module.exports = {
//   async up(queryInterface, Sequelize) {
//     await queryInterface.createTable("Permissions", {
//       id: {
//         allowNull: false,
//         primaryKey: true,
//         type: Sequelize.STRING,
//       },
//       roleId: {
//         allowNull: false,
//         type: Sequelize.STRING,
//       },
//       functionId: {
//         allowNull: false,
//         type: Sequelize.STRING,
//       },
//       isDeleted: {
//         allowNull: false,
//         type: Sequelize.BOOLEAN,
//         defaultValue: false,
//       },
//       isActive: {
//         allowNull: false,
//         type: Sequelize.BOOLEAN,
//         defaultValue: true,
//       },
//       createdAt: {
//         allowNull: false,
//         type: Sequelize.DATE,
//         defaultValue: Sequelize.NOW,
//       },
//       updatedAt: {
//         allowNull: false,
//         type: Sequelize.DATE,
//         defaultValue: Sequelize.NOW,
//       },
//     });
//   },
//   async down(queryInterface, Sequelize) {
//     await queryInterface.dropTable("Permissions");
//   },
// };
