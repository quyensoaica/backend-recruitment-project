// import { Model, DataTypes } from "sequelize";
// import connection from "../connection";

// interface PermissionAttributes {
//   id?: string;
//   roleId: string;
//   functionId: string;
//   isDeleted: boolean;
//   isActive: boolean;
//   createdAt?: Date;
//   updatedAt?: Date;
// }

// class Permission extends Model<PermissionAttributes> implements PermissionAttributes {
//   public id!: string;
//   public roleId!: string;
//   public functionId!: string;
//   public isDeleted!: boolean;
//   public isActive!: boolean;

//   public readonly createdAt!: Date;
//   public readonly updatedAt!: Date;
// }

// Permission.init(
//   {
//     id: {
//       allowNull: false,
//       primaryKey: true,
//       type: DataTypes.STRING,
//     },
//     roleId: {
//       allowNull: false,
//       type: DataTypes.STRING,
//     },
//     functionId: {
//       allowNull: false,
//       type: DataTypes.STRING,
//     },
//     isDeleted: {
//       allowNull: false,
//       type: DataTypes.BOOLEAN,
//       defaultValue: false,
//     },
//     isActive: {
//       allowNull: false,
//       type: DataTypes.BOOLEAN,
//       defaultValue: true,
//     },
//     createdAt: {
//       allowNull: false,
//       type: DataTypes.DATE,
//       defaultValue: DataTypes.NOW,
//     },
//     updatedAt: {
//       allowNull: false,
//       type: DataTypes.DATE,
//       defaultValue: DataTypes.NOW,
//     },
//   },
//   {
//     sequelize: connection,
//     modelName: "Permissions",
//     timestamps: true,
//   }
// );

// export default Permission;
