import { Model, DataTypes } from "sequelize";
import connection from "../connection";
import User from "./users";
import Function from "./functions";

interface GroupRoleAttributes {
  id?: number;
  name: string;
  description: string;
  displayName: string;

  isDeleted: boolean;
  isActive: boolean;

  updatedAt?: Date;
  createdAt?: Date;
}

class GroupRole extends Model<GroupRoleAttributes> implements GroupRoleAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public displayName!: string;

  public isDeleted!: boolean;
  public isActive!: boolean;

  public readonly updatedAt!: Date;
  public readonly createdAt!: Date;
}

GroupRole.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    displayName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    description: {
      allowNull: true,
      type: DataTypes.TEXT,
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
      defaultValue: new Date(),
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
  },
  {
    sequelize: connection,
    modelName: "GroupRoles",
    timestamps: true,
  }
);

GroupRole.hasMany(User, { foreignKey: "groupRoleId", as: "users" });
// GroupRole.hasMany(Function, { foreignKey: "groupRoleId", as: "functions" });

export default GroupRole;
