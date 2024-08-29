import { Model, DataTypes } from "sequelize";
import connection from "../connection";

interface EducationAttributes {
  id?: string;
  school: string;
  specialized: string;
  startTime: string;
  endTime: string;
  isWorking: boolean;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

class Education extends Model<EducationAttributes> implements EducationAttributes {
  public id!: string;
  public school!: string;
  public specialized!: string;
  public startTime!: string;
  public endTime!: string;
  public isWorking!: boolean;
  public description!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Education.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.STRING,
    },
    school: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    specialized: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    startTime: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    endTime: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    isWorking: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    description: {
      allowNull: true,
      type: DataTypes.TEXT,
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
    modelName: "Educations",
    timestamps: true,
  }
);

export default Education;
