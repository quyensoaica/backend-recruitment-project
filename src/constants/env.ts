import "dotenv/config";
export const ENV = {
  APP_PORT: process.env.APP_PORT || 5555,
  DATABASE_URL: process.env.DATABASE_URL || "mongodb://: process.env.db://,localhost:27017/recruitment-project",
  SECRET_KEY: process.env.SECRET_KEY || "secret",
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/recruitment-project",
  DATABASE_NAME: process.env.DATABASE_NAME || "recruitment-project",
  DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || "password",
  DATABASE_USERNAME: process.env.DATABASE_USERNAME || "username",
  APP_HOST: process.env.APP_HOST || "localhost",
  APP_ORIGIN: process.env.APP_ORIGIN || "http://localhost:3000",

  DB_USERNAME: process.env.DB_USERNAME || "postgres",
  DB_PASSWORD: process.env.DB_PASSWORD || "quyen",
  DB_NAME: process.env.DB_NAME || "recruitment",
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_PORT: process.env.DB_PORT || 5432,
  DB_DIALECT: process.env.DB_DIALECT || "postgres",
  DB_POOL_MAX: process.env.DB_POOL_MAX,
  DB_POOL_MIN: process.env.DB_POOL_MIN,
  DB_POOL_ACQUIRE: process.env.DB_POOL_ACQUIRE,
  DB_POOL_IDLE: process.env.DB_POOL_IDLE,
};
