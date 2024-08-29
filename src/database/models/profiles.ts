// import { Model, DataTypes } from "sequelize";
// import connection from "../connection";

// interface ProfileAttributes {
//   id: string;
//   userId: string;
//   address: string;
//   description: string;
//   phoneNumber: string;
//   email: string;
//   birthday: string;
//   sex: "0" | "1" | "2";
//   banner: string;
//   profession: string;
//   position: string;
//   createdAt?: Date;
//   updatedAt?: Date;
// }

// class Profile extends Model<ProfileAttributes> implements ProfileAttributes {
//   public id!: string;
//   public userId!: string;
//   public address!: string;
//   public description!: string;
//   public phoneNumber!: string;
//   public email!: string;
//   public birthday!: string;
//   public sex!: "0" | "1" | "2";
//   public banner!: string;
//   public profession!: string;
//   public position!: string;

//   public readonly createdAt!: Date;
//   public readonly updatedAt!: Date;
// }

// Profile.init(
//   {
//     id: {
//       allowNull: false,
//       primaryKey: true,
//       type: DataTypes.STRING,
//     },
//     userId: {
//       allowNull: false,
//       type: DataTypes.STRING,
//     },
//     address: {
//       allowNull: true,
//       type: DataTypes.STRING,
//     },
//     description: {
//       allowNull: true,
//       type: DataTypes.TEXT,
//     },
//     phoneNumber: {
//       allowNull: true,
//       type: DataTypes.STRING,
//     },
//     email: {
//       allowNull: true,
//       type: DataTypes.STRING,
//     },
//     birthday: {
//       allowNull: true,
//       type: DataTypes.STRING,
//     },
//     sex: {
//       allowNull: true,
//       type: DataTypes.ENUM("0", "1", "2"),
//     },
//     banner: {
//       allowNull: true,
//       type: DataTypes.STRING,
//     },
//     profession: {
//       allowNull: true,
//       type: DataTypes.STRING,
//     },
//     position: {
//       allowNull: true,
//       type: DataTypes.STRING,
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
//     modelName: "Profiles",
//     timestamps: true,
//   }
// );

// export default Profile;
