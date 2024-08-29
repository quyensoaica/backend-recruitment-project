import { ENV } from "../constants/env";
import { Dialect, Sequelize } from "sequelize";

console.log(ENV.DB_NAME, ENV.DB_USERNAME, ENV.DB_PASSWORD, ENV.DB_HOST, ENV.DB_PORT, ENV.DB_DIALECT);
let sequelizeConnection: Sequelize = new Sequelize(ENV.DB_NAME, ENV.DB_USERNAME, ENV.DB_PASSWORD, {
  host: ENV.DB_HOST,
  dialect: (ENV.DB_DIALECT as Dialect) || "mysql",
  port: Number(ENV.DB_PORT),
});

export default sequelizeConnection;
