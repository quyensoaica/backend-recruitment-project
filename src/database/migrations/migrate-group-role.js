// "use strict";
// module.exports = {
//   async up(queryInterface, Sequelize) {
//     await queryInterface.createTable("GroupRoles", {
//       id: {
//         allowNull: false,
//         primaryKey: true,
//         type: Sequelize.STRING,
//       },
//       name: {
//         allowNull: false,
//         type: Sequelize.STRING,
//       },
//       displayName: {
//         allowNull: false,
//         type: Sequelize.STRING,
//       },
//       description: {
//         allowNull: true,
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
//       },
//       updatedAt: {
//         allowNull: false,
//         type: Sequelize.DATE,
//       },
//     });
//   },
//   async down(queryInterface, Sequelize) {
//     await queryInterface.dropTable("GroupRoles");
//   },
// };
