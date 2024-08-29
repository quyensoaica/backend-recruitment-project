import { Model, DataTypes } from "sequelize";
import connection from "../connection";

interface UserAttributes {
  id?: number;
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
  avatar: string;
  groupRole: string;
  isBlocked: boolean;
  isDeleted: boolean;
  isActive: boolean;
  isUpdated: boolean;

  updatedAt?: Date;
  createdAt?: Date;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public email!: string;
  public password!: string;
  public fullName!: string;
  public phoneNumber!: string;
  public avatar!: string;
  public groupRole!: string;
  public isBlocked!: boolean;
  public isDeleted!: boolean;
  public isActive!: boolean;
  public isUpdated!: boolean;

  public readonly updatedAt!: Date;
  public readonly createdAt!: Date;
}

User.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    fullName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    phoneNumber: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    avatar: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    groupRole: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    isBlocked: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
    isUpdated: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
    modelName: "Users",
    timestamps: true,
  }
);

export default User;
