import { Model, DataTypes } from "sequelize";
import connection from "../connection";
import Function from "./functions";
import GroupRole from "./groupRoles";

interface PermissionAttributes {
  id?: string;
  groupRoleId: string;
  functionId: string;
  isDeleted: boolean;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

class Permission extends Model<PermissionAttributes> implements PermissionAttributes {
  public id!: string;
  public groupRoleId!: string;
  public functionId!: string;
  public isDeleted!: boolean;
  public isActive!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Permission.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
    },
    groupRoleId: {
      allowNull: false,
      type: DataTypes.STRING,
      references: {
        model: "GroupRoles",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    functionId: {
      allowNull: false,
      type: DataTypes.STRING,
      references: {
        model: "Functions",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    isDeleted: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isActive: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: connection,
    modelName: "Permissions",
    timestamps: true,
  }
);

Permission.belongsTo(Function, { foreignKey: "functionId", as: "functions" });
Permission.belongsTo(GroupRole, { foreignKey: "groupRoleId", as: "groupRole" });

export default Permission;
