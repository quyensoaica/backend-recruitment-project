import { Model, DataTypes } from "sequelize";
import connection from "../connection";
import Permission from "./permissions";

interface FunctionAttributes {
  id?: string;

  name: string;
  displayName: string;
  description: string;
  functionLink: string;
  parentId: string;

  isDeleted: boolean;
  isActive: boolean;

  updatedAt?: Date;
  createdAt?: Date;
}

class Function extends Model<FunctionAttributes> implements FunctionAttributes {
  public id!: string;

  public name!: string;
  public description!: string;
  public displayName!: string;
  public functionLink!: string;
  public parentId!: string;

  public isDeleted!: boolean;
  public isActive!: boolean;

  public readonly updatedAt!: Date;
  public readonly createdAt!: Date;
}

Function.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: false,
      type: DataTypes.STRING,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    displayName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    description: {
      allowNull: true,
      type: DataTypes.TEXT,
    },
    functionLink: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    parentId: {
      allowNull: true,
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
    modelName: "Functions",
    timestamps: true,
  }
);

Function.hasMany(Function, { foreignKey: "parentId", as: "children" });
Function.belongsTo(Function, { foreignKey: "parentId", as: "parent" });
Function.hasMany(Permission, { foreignKey: "functionId", as: "permissions" });

export default Function;
