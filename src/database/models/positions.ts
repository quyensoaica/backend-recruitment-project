import { Model, DataTypes } from "sequelize";
import connection from "../connection";

interface PositionAttributes {
  id: string;
  name: string;
  description: string;
  isDeleted: boolean;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

class Position extends Model<PositionAttributes> implements PositionAttributes {
  public id!: string;
  public name!: string;
  public description!: string;
  public isDeleted!: boolean;
  public isActive!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Position.init(
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
    modelName: "Positions",
    timestamps: true,
  }
);

export default Position;
